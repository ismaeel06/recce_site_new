import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { first_name, last_name, email, message } = await req.json();

        if (!first_name || !last_name || !email) {
            return NextResponse.json(
                { error: "first_name, last_name, and email are required" },
                { status: 400 }
            );
        }

        // Strapi POST request
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/join-requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
                data: {
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    message: message || null,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Join request error response:", data);
            return NextResponse.json(
                { error: data.error || "Failed to create join request" },
                { status: response.status }
            );
        }

        return NextResponse.json({ joinRequest: data.data }, { status: 201 });
    } catch (error) {
        console.error("Join request error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
