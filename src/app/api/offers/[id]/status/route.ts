import { NextRequest, NextResponse } from 'next/server';
import {
  getListing,
  getOffers,
  updateOfferOutcome,
  selectOffer,
} from '@/lib/data';
import { sendEmail } from '@/lib/email';
import {
  buyerUnderReviewEmail,
  buyerSelectedEmail,
  buyerNotSelectedEmail,
} from '@/lib/email-templates';
import { OfferOutcome } from '@/types/listing';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: offerId } = await params;
    const body = await request.json();
    const { listingId, outcome } = body as { listingId: string; outcome: OfferOutcome };

    if (!listingId || !outcome) {
      return NextResponse.json(
        { error: 'listingId and outcome are required' },
        { status: 400 }
      );
    }

    const validOutcomes: OfferOutcome[] = ['pending', 'under_review', 'selected', 'not_selected'];
    if (!validOutcomes.includes(outcome)) {
      return NextResponse.json(
        { error: 'Invalid outcome value' },
        { status: 400 }
      );
    }

    const listing = getListing(listingId);
    const propertyAddress = listing?.address || 'Property';
    const lobbyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/lobby/${listingId}`;

    // Handle selection - this marks one as selected and all others as not_selected
    if (outcome === 'selected') {
      const selectedOffer = selectOffer(listingId, offerId);
      if (!selectedOffer) {
        return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
      }

      // Get all offers to send emails
      const allOffers = getOffers(listingId);

      // Send emails to all buyers
      for (const offer of allOffers) {
        if (offer.id === offerId) {
          // Send selected email
          const email = buyerSelectedEmail({ propertyAddress, lobbyUrl });
          sendEmail({
            to: offer.buyerAgentEmail,
            subject: email.subject,
            html: email.html,
          }).catch((err) => console.error('Failed to send selected email:', err));
        } else {
          // Send not selected email
          const email = buyerNotSelectedEmail({ propertyAddress, lobbyUrl });
          sendEmail({
            to: offer.buyerAgentEmail,
            subject: email.subject,
            html: email.html,
          }).catch((err) => console.error('Failed to send not selected email:', err));
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Offer selected successfully',
        offer: selectedOffer,
      });
    }

    // Handle other status updates
    const updatedOffer = updateOfferOutcome(listingId, offerId, outcome);
    if (!updatedOffer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    // Send appropriate email
    if (outcome === 'under_review') {
      const email = buyerUnderReviewEmail({ propertyAddress, lobbyUrl });
      sendEmail({
        to: updatedOffer.buyerAgentEmail,
        subject: email.subject,
        html: email.html,
      }).catch((err) => console.error('Failed to send under review email:', err));
    } else if (outcome === 'not_selected') {
      const email = buyerNotSelectedEmail({ propertyAddress, lobbyUrl });
      sendEmail({
        to: updatedOffer.buyerAgentEmail,
        subject: email.subject,
        html: email.html,
      }).catch((err) => console.error('Failed to send not selected email:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Offer status updated successfully',
      offer: updatedOffer,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
