// app/api/contact/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("📨 /api/contact called");

  try {
    const isDev = process.env.NODE_ENV !== "production";
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          error: "Invalid content type",
          ...(isDev ? { detail: `Expected application/json but received '${contentType || ''}'` } : {}),
        }),
        { status: 415 }
      );
    }

    // Read raw body to avoid JSON.parse throwing unhandled errors
    const raw = await req.text();
    if (!raw || raw.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Empty request body" }),
        { status: 400 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(raw);
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON body",
          ...(isDev ? { detail: String(e) } : {}),
        }),
        { status: 400 }
      );
    }

    console.log("➡️ Received:", body);

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      console.error("❌ Missing fields");
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    console.log("🔐 Email user:", user ? "Loaded" : "Missing");
    console.log("🔐 Email pass:", pass ? "Loaded" : "Missing");

    if (!user || !pass) {
      console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env.local");
      return new Response(
        JSON.stringify({
          error: "Email config missing",
          ...(isDev ? { detail: "Set EMAIL_USER and EMAIL_PASS in .env.local" } : {}),
        }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    console.log("🚀 Verifying transporter...");
    await transporter.verify();
    console.log("✅ Transporter verified");

    const mailOptions = {
      from: `Portfolio Contact <${user}>`,
      to: "ravithasakila@gmail.com",
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    console.log("📤 Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error("💥 Error sending email:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        detail: err.message || String(err),
      }),
      { status: 500 }
    );
  }
}
