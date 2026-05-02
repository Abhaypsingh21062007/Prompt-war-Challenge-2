import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { lat, lng } = await req.json();

    if (!lat || !lng) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_MAPS_API_KEY is not defined.");
      // Return a fallback pincode for demo purposes if API key is missing
      return NextResponse.json({ pincode: "110001", city: "New Delhi", state: "Delhi" });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      return NextResponse.json({ error: 'Failed to geocode location' }, { status: 404 });
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

    return NextResponse.json({ pincode, city, state });
  } catch (error) {
    console.error('Error in geocode API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
