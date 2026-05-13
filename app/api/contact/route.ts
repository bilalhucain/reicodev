import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// This matches the name we just gave the variable in Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'Reicodev Contact <onboarding@resend.dev>',
      to: 'bilalhucain3@gmail.com', // Your email where you want to get leads
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}