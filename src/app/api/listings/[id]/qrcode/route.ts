import { NextRequest, NextResponse } from 'next/server';
import { generateQRCodeDataURL, getLobbyUrl } from '@/lib/qrcode';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  // Generate QR for any valid ID - no validation needed
  try {
    // Get the base URL from the request headers
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const lobbyUrl = getLobbyUrl(id, baseUrl);
    const qrCode = await generateQRCodeDataURL(lobbyUrl);

    return NextResponse.json({ qrCode, lobbyUrl });
  } catch {
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
