import { NextRequest, NextResponse } from 'next/server';
import { getListing, updateListing, createListingWithId } from '@/lib/data';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const listing = getListing(id);

  if (!listing) {
    // Return empty shell instead of 404 - Deal Room is an inbox, not a validator
    return NextResponse.json({
      id,
      address: '',
      city: '',
      state: '',
      zip: '',
      primaryPhoto: '',
      offerStatus: 'no_offers',
      showOfferCount: false,
      exists: false,
    });
  }

  return NextResponse.json({ ...listing, exists: true });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body = await request.json();

    // Check if listing exists, create if not
    let listing = getListing(id);
    if (!listing) {
      listing = createListingWithId(id, body);
    } else {
      listing = updateListing(id, body);
    }

    return NextResponse.json({ ...listing, exists: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
