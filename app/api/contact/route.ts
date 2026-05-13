import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Debug Log: This will show up in Vercel Logs so we know the code started
    console.log("Attempting to send email for:", email);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Simplified this to rule out formatting errors
      to: 'info@reicodev.com',
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("Resend API Response:", data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // This is the "Silent Error" detector. It prints the REAL reason it failed to Vercel Logs.
    console.error("CATCH ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}