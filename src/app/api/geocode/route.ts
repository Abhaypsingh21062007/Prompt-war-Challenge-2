import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { lat, lng, pincode: searchPincode } = await req.json();

    // 1. Try free Postal API if we only have a pincode and no strict Google requirement
    if (searchPincode) {
      try {
        const postalRes = await fetch(`https://api.postalpincode.in/pincode/${searchPincode}`);
        const postalData = await postalRes.json();
        
        if (postalData && postalData[0].Status === 'Success') {
          const postOffice = postalData[0].PostOffice[0];
          return NextResponse.json({
            pincode: searchPincode,
            city: postOffice.District || postOffice.Region || postOffice.Block,
            state: postOffice.State,
            lat: null, // We don't get exact lat/lng, but we can use city/state for the map query
            lng: null,
            source: 'postal_api'
          });
        }
      } catch (e) {
        console.error("Postal API failed, falling back to Google Maps (if available)", e);
      }
    }

    // 2. Google Maps API Logic (requires API Key)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === '%GOOGLE_MAPS_API_KEY%') {
      return NextResponse.json({ error: 'Google Maps API Key is missing or invalid.' }, { status: 400 });
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

    // Extract postal_code, city, and state
    let pincode = '';
    let city = '';
    let state = '';

    for (const result of data.results) {
      for (const component of result.address_components) {
        if (component.types.includes('postal_code') && !pincode) {
          pincode = component.long_name;
        }
        if (!city && (
          component.types.includes('locality') || 
          component.types.includes('sublocality_level_1') ||
          component.types.includes('administrative_area_level_3') ||
          component.types.includes('administrative_area_level_2')
        )) {
          city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1') && !state) {
          state = component.long_name;
        }
      }
      if (pincode && city && state) break;
    }

    if (!pincode && !searchPincode) {
      return NextResponse.json({ error: 'Postal code not found for this location' }, { status: 404 });
    }

    if (!city) city = 'Unknown City';

    const location = data.results[0].geometry.location;

    return NextResponse.json({ 
      pincode: pincode || searchPincode, 
      city, 
      state, 
      lat: location.lat, 
      lng: location.lng,
      source: 'google_maps'
    });
  } catch (error) {
    console.error('Error in geocode API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
