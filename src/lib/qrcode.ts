import QRCode from 'qrcode';

export async function generateQRCodeDataURL(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
}

export function getLobbyUrl(listingId: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${base}/lobby/${listingId}`;
}
