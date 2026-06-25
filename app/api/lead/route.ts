import { NextResponse } from "next/server";

// Never cache lead submissions.
export const dynamic = "force-dynamic";

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  intent?: string;
};

export async function POST(request: Request) {
  let body: Lead;
  try {
    body = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const intent = (body.intent ?? "").trim();

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required" },
      { status: 400 },
    );
  }

  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (!webhook) {
    // Not configured yet — log so nothing is lost during setup.
    console.warn("SHEETS_WEBHOOK_URL is not set; lead not stored:", {
      name,
      phone,
      email,
      intent,
    });
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        intent,
        source: "Greenz by Danube landing",
        timestamp: new Date().toISOString(),
      }),
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Failed to forward lead to sheet:", err);
    return NextResponse.json({ ok: false, error: "Upstream failed" }, { status: 502 });
  }
}
