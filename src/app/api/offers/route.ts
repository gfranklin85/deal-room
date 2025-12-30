import { NextRequest, NextResponse } from 'next/server';
import { createOffer, getListing } from '@/lib/data';

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

    const listing = getListing(listingId);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const offer = createOffer(listingId, {
      buyerAgentName,
      buyerAgentLicense,
      buyerAgentEmail,
    });

    if (!offer) {
      return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Offer submitted successfully', offerId: offer.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
