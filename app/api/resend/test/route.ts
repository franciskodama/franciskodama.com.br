import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: Request) {
  const session = await auth();

  // Protect API route
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { to, type } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        simulated: true,
        message: `Simulation: Test alert '${type}' dispatched to ${to}. Set RESEND_API_KEY in .env.local to send live emails via Resend.`,
      });
    }

    // Call Resend REST API if key is present
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Monkey Mori <alerts@franciskodama.com.br>',
        to: [to],
        subject: `[Monkey Mori Alert] ${type}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2>Monkey Mori Protocol Alert: ${type}</h2>
            <p>This is a verified test dispatch sent from <strong>franciskodama.com.br</strong>.</p>
            <hr />
            <p style="font-size: 12px; color: #666;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: true, simulated: false, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to dispatch email' },
      { status: 500 }
    );
  }
}
