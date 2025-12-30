export type OfferStatus =
  | 'no_offers'
  | 'offers_received'
  | 'multiple_offers'
  | 'review_in_progress'
  | 'deadline_passed';

export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  primaryPhoto: string;
  description?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  offerStatus: OfferStatus;
  offerDeadline?: string; // ISO date string
  reviewWindow?: string; // e.g., "Friday 2pm-5pm"
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  listingId: string;
  submittedAt: string;
  buyerAgentName: string;
  buyerAgentLicense: string;
  buyerAgentEmail: string;
  // Note: No price or details visible in MVP
}

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  no_offers: 'No offers received',
  offers_received: 'Offers received',
  multiple_offers: 'Multiple offers received',
  review_in_progress: 'Offer review in progress',
  deadline_passed: 'Offer deadline passed',
};
