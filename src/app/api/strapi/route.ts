/**
 * Next.js API proxy for Strapi
 * This route calls Strapi server-side with the API token (keeping it secret).
 * The client never sees the token or makes direct Strapi requests.
 */

import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the client request
    const { searchParams } = request.nextUrl;
    let endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint parameter' },
        { status: 400 }
      );
    }

    // Decode the endpoint parameter (it may be URL-encoded by the client)
    try {
      endpoint = decodeURIComponent(endpoint);
    } catch (e) {
      console.error('Error decoding endpoint:', e);
      return NextResponse.json(
        { error: 'Invalid endpoint encoding' },
        { status: 400 }
      );
    }

    // Parse the endpoint to extract path and query string
    const questionMarkIndex = endpoint.indexOf('?');
    const path = questionMarkIndex === -1 ? endpoint : endpoint.substring(0, questionMarkIndex);
    const queryString = questionMarkIndex === -1 ? '' : endpoint.substring(questionMarkIndex + 1);

    // Validate endpoint path to prevent arbitrary requests
    if (!path.startsWith('/api/')) {
      console.error(`Invalid endpoint path: ${path}`);
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }

    // Reconstruct the full URL with query string if present
    let strapiUrl = `${STRAPI_URL}${path}`;
    if (queryString) {
      strapiUrl += `?${queryString}`;
    }

    console.log(`Fetching from Strapi: ${strapiUrl}`);

    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    };

    const response = await fetch(strapiUrl, config);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Strapi API error: ${response.status} ${response.statusText} for ${strapiUrl}`,
        errorText
      );
      return NextResponse.json(
        { error: `Strapi API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
