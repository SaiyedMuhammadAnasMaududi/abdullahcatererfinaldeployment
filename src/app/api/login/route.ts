// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { customerData } from '../../../../scripts/customermigration.mjs';



export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock credentials for testing
    if (email === customerData.email && password === customerData.password) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error occurred during login' });
  }
}
