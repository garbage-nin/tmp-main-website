import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ["anrede", "vorname", "familienname", "email", "selectedService"];

    for (const field of required) {
      if (!body[field] || (typeof body[field] === "string" && !body[field].trim())) {
        return NextResponse.json(
          { error: `Feld "${field}" ist erforderlich.` },
          { status: 400 }
        );
      }
    }

    // Placeholder: In production, forward data to backend/CRM/email
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
