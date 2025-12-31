import { NextRequest, NextResponse } from 'next/server';
import { createOffer } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { listingId, buyerAgentName, buyerAgentLicense, buyerAgentEmail } = body;

    if (!listingId || !buyerAgentName || !buyerAgentLicense || !buyerAgentEmail) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // createOffer auto-creates listing if needed - no validation required
    const offer = createOffer(listingId, {
      buyerAgentName,
      buyerAgentLicense,
      buyerAgentEmail,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Offer submitted successfully',
        offerId: offer.id,
        submittedAt: offer.submittedAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
