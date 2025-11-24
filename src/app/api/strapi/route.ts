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
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint parameter' },
        { status: 400 }
      );
    }

    // Parse the endpoint to extract path and query string
    const [path, queryString] = endpoint.split('?');

    // Validate endpoint path to prevent arbitrary requests
    if (!path.startsWith('/api/')) {
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

    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    };

    const response = await fetch(strapiUrl, config);

    if (!response.ok) {
      console.error(
        `Strapi API error: ${response.status} ${response.statusText} for ${strapiUrl}`
      );
      return NextResponse.json(
        { error: `Strapi API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
