import { Listing, Offer } from '@/types/listing';
import { v4 as uuidv4 } from 'uuid';

// In-memory data store (replace with real database in production)
const listings: Map<string, Listing> = new Map();
const offers: Map<string, Offer[]> = new Map();

// Initialize with sample data
const sampleListing: Listing = {
  id: 'demo-123',
  address: '742 Evergreen Terrace',
  city: 'Springfield',
  state: 'IL',
  zip: '62701',
  primaryPhoto: '',
  description: 'Beautiful single-family home in a quiet neighborhood with updated kitchen and spacious backyard.',
  beds: 4,
  baths: 2,
  sqft: 2200,
  offerStatus: 'no_offers',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

listings.set(sampleListing.id, sampleListing);
offers.set(sampleListing.id, []);

export function getListing(id: string): Listing | undefined {
  return listings.get(id);
}

export function getAllListings(): Listing[] {
  return Array.from(listings.values());
}

export function createListing(data: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Listing {
  const id = uuidv4();
  const now = new Date().toISOString();
  const listing: Listing = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };
  listings.set(id, listing);
  offers.set(id, []);
  return listing;
}

export function updateListing(id: string, data: Partial<Listing>): Listing | undefined {
  const existing = listings.get(id);
  if (!existing) return undefined;

  const updated: Listing = {
    ...existing,
    ...data,
    id, // Prevent ID from being changed
    updatedAt: new Date().toISOString(),
  };
  listings.set(id, updated);
  return updated;
}

export function getOffers(listingId: string): Offer[] {
  return offers.get(listingId) || [];
}

export function createOffer(
  listingId: string,
  data: Omit<Offer, 'id' | 'listingId' | 'submittedAt'>
): Offer | undefined {
  const listing = listings.get(listingId);
  if (!listing) return undefined;

  const offer: Offer = {
    ...data,
    id: uuidv4(),
    listingId,
    submittedAt: new Date().toISOString(),
  };

  const listingOffers = offers.get(listingId) || [];
  listingOffers.push(offer);
  offers.set(listingId, listingOffers);

  // Update offer status based on count
  const count = listingOffers.length;
  let newStatus = listing.offerStatus;
  if (count === 1) {
    newStatus = 'offers_received';
  } else if (count > 1) {
    newStatus = 'multiple_offers';
  }

  if (newStatus !== listing.offerStatus) {
    updateListing(listingId, { offerStatus: newStatus });
  }

  return offer;
}

export function getOfferCount(listingId: string): number {
  return (offers.get(listingId) || []).length;
}
