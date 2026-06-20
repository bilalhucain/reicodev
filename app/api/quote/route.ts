import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Quote API Error: RESEND_API_KEY is not set');
      return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const body = await req.json();
    // Use 'details' to match your form's textarea name
    const { name, email, service, budget, timeline, phone, website, details } = body;

    await resend.emails.send({
      from: 'Reicodev <info@mail.reicodev.com>',
      to: 'info@reicodev.com',
      subject: `💰 New Quote Request: ${service} from ${name}`,
      text: `
        NEW PROJECT INQUIRY
        -------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Website: ${website || 'N/A'}

        PROJECT SPECIFICATIONS
        -------------------
        Service: ${service}
        Budget: ${budget}
        Timeline: ${timeline}

        PROJECT DETAILS:
        ${details || 'No additional details provided.'}
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Quote API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
