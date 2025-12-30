import { NextRequest, NextResponse } from 'next/server';
import { createListing, getAllListings } from '@/lib/data';
import { OfferStatus } from '@/types/listing';

export async function GET() {
  const listings = getAllListings();
  return NextResponse.json(listings);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { address, city, state, zip, primaryPhoto, description, beds, baths, sqft } = body;

    if (!address || !city || !state || !zip) {
      return NextResponse.json(
        { error: 'Address, city, state, and zip are required' },
        { status: 400 }
      );
    }

    const listing = createListing({
      address,
      city,
      state,
      zip,
      primaryPhoto: primaryPhoto || '',
      description,
      beds,
      baths,
      sqft,
      offerStatus: 'no_offers' as OfferStatus,
    });

    return NextResponse.json(listing, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
