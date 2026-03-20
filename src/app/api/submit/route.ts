import { NextResponse } from "next/server";
import { transporter } from "@/lib/email";
import { serviceOptions } from "../../_data/services";

interface SubmitBody {
  anrede: string;
  vorname: string;
  familienname: string;
  email: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  country: string;
  selectedService: string;
  agbAccepted: boolean;
}

function buildConfirmationHtml(body: SubmitBody, serviceLabel: string): string {
  const anredeText =
    body.anrede === "herr"
      ? "Sehr geehrter Herr"
      : body.anrede === "frau"
        ? "Sehr geehrte Frau"
        : "Guten Tag";

  const greeting =
    body.anrede === "divers"
      ? `${anredeText} ${body.vorname} ${body.familienname}`
      : `${anredeText} ${body.familienname}`;

  const dateStr = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background-color:#0F2440;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:22px;color:#ffffff;">Regis Datasec LTD</h1>
    </div>

    <div style="padding:32px 24px;">
      <p style="font-size:16px;color:#333;">${greeting},</p>
      <p style="font-size:15px;color:#555;line-height:1.6;">
        vielen Dank für Ihre Anfrage. Wir haben Ihre Daten erfolgreich erhalten
        und werden uns in Kürze bei Ihnen melden.
      </p>

      <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin:24px 0;">
        <h2 style="font-size:16px;color:#0F2440;margin:0 0 12px;">Ihre Angaben</h2>
        <p style="margin:4px 0;font-size:14px;color:#555;">
          <strong>Datum:</strong> ${dateStr}<br>
          <strong>Name:</strong> ${body.vorname} ${body.familienname}<br>
          <strong>E-Mail:</strong> ${body.email}<br>
          <strong>Adresse:</strong> ${body.strasse} ${body.hausnummer}, ${body.plz} ${body.ort}<br>
          <strong>Service:</strong> ${serviceLabel}
        </p>
      </div>

      <div style="margin-top:28px;">
        <h2 style="font-size:16px;color:#0F2440;">Nächste Schritte</h2>
        <p style="font-size:14px;color:#555;line-height:1.6;">
          Unser Team wird Ihre Anfrage prüfen und sich zeitnah mit Ihnen in Verbindung setzen.
          Bei dringenden Fragen können Sie uns jederzeit per E-Mail erreichen.
        </p>
      </div>

      <p style="font-size:14px;color:#555;margin-top:20px;">
        Mit freundlichen Grüßen,<br>
        <strong>Ihr Team von Regis Datasec LTD</strong>
      </p>

      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e0e0e0;">
        <p style="font-size:12px;color:#777;line-height:1.5;margin:0;">
          Regis Datasec LTD<br>
          E-Mail: info@regis-datasec.com
        </p>
      </div>
    </div>

    <div style="background-color:#0F2440;padding:16px 24px;text-align:center;font-size:12px;color:#ffffff99;">
      <p style="margin:0;">Regis Datasec LTD &mdash; Alle Rechte vorbehalten</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;

    const required: (keyof SubmitBody)[] = [
      "anrede", "vorname", "familienname", "email",
      "strasse", "hausnummer", "plz", "ort", "country",
      "selectedService",
    ];

    for (const field of required) {
      const val = body[field];
      if (!val || (typeof val === "string" && !val.trim())) {
        return NextResponse.json(
          { error: `Feld "${field}" ist erforderlich.` },
          { status: 400 },
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
        { status: 400 },
      );
    }

    if (!/^\d{5}$/.test(body.plz.trim())) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige 5-stellige PLZ ein." },
        { status: 400 },
      );
    }

    const service = serviceOptions.find((s) => s.id === body.selectedService);
    const serviceLabel = service?.label ?? body.selectedService;

    const html = buildConfirmationHtml(body, serviceLabel);

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "info@regis-datasec.com",
      to: body.email,
      subject: "Bestätigung Ihrer Anfrage – Regis Datasec LTD",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }
}
