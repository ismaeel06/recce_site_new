/**
 * Next.js API proxy for Strapi
 * This route calls Strapi server-side with the API token (keeping it secret).
 * The client never sees the token or makes direct Strapi requests.
 */

import { NextRequest, NextResponse } from 'next/server';

// Prefer a server-only STRAPI_URL (set this in your deployment). Fall back to NEXT_PUBLIC for compatibility.
const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// Normalize: remove trailing slash to avoid accidental '//' when joining with paths
const STRAPI_URL = rawStrapiUrl.replace(/\/$/, '');
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
console.log("STRAPI URL: ", STRAPI_URL);
console.log("STRAPI_TOKEN: ", STRAPI_TOKEN);
if (!STRAPI_TOKEN) {
  console.warn('Warning: STRAPI_API_TOKEN is not set. Protected Strapi endpoints will return 403.');
}

// Helpful warning if someone sets the API base to a CDN (CloudFront) which usually serves assets,
// not the Strapi API. This commonly causes errors like "Malicious Path" when requests are routed incorrectly.
if (/cloudfront\.net/i.test(STRAPI_URL)) {
  console.warn(`STRAPI_URL appears to be a CloudFront CDN (${STRAPI_URL}). Ensure STRAPI_URL points to your Strapi API origin, and use NEXT_PUBLIC_STRAPI_URL for CDN image hosts.`);
}

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
