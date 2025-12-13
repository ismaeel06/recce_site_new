import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Strapi POST request
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          email,
          isSubscribed: true,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Subscribe error response:", data);
      return NextResponse.json({ error: data.error || "Failed to subscribe" }, { status: response.status });
    }

    return NextResponse.json({ subscriber: data.data }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
