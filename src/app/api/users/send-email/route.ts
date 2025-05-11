import { sendEmailHandler } from '@/app/lib/sendEmailHandler';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        await sendEmailHandler(body); // the actual sending logic (e.g. nodemailer)
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Send email failed:', error);
        return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }
}
