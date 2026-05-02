import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { lat, lng, pincode: searchPincode } = await req.json();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_MAPS_API_KEY is not defined.");
      // Return a fallback for demo if key is missing
      return NextResponse.json({ pincode: searchPincode || "110001", city: "New Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 });
    }

    let url = "";
    if (lat && lng) {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    } else if (searchPincode) {
      url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${searchPincode}|country:IN&key=${apiKey}`;
    } else {
      return NextResponse.json({ error: 'Latitude/longitude or pincode is required' }, { status: 400 });
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Maps API Error:', data);
      return NextResponse.json({ 
        error: `Google Maps Error: ${data.status}`,
        details: data.error_message || 'No additional details'
      }, { status: 400 });
    }

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ error: 'No results found for this location' }, { status: 404 });
    }

    // Extract postal_code, city, and state from address components
    let pincode = '';
    let city = '';
    let state = '';

    for (const result of data.results) {
      for (const component of result.address_components) {
        if (component.types.includes('postal_code') && !pincode) {
          pincode = component.long_name;
        }
        if (component.types.includes('locality') && !city) {
          city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1') && !state) {
          state = component.long_name;
        }
      }
      if (pincode && city && state) break;
    }

    if (!pincode) {
      return NextResponse.json({ error: 'Postal code not found for this location' }, { status: 404 });
    }

    const location = data.results[0].geometry.location;

    return NextResponse.json({ 
      pincode, 
      city, 
      state, 
      lat: location.lat, 
      lng: location.lng 
    });
  } catch (error) {
    console.error('Error in geocode API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
