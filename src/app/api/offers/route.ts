import { NextRequest, NextResponse } from 'next/server';
import { createOffer, getListing } from '@/lib/data';
import { sendEmail } from '@/lib/email';
import {
  buyerConfirmationEmail,
  listingAgentOfferNotificationEmail,
} from '@/lib/email-templates';

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

    // Get listing for email data
    const listing = getListing(listingId);
    const propertyAddress = listing?.address || 'Property';
    const lobbyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/lobby/${listingId}`;

    // Send buyer confirmation email (don't block response on email)
    const buyerEmail = buyerConfirmationEmail({ propertyAddress, lobbyUrl });
    sendEmail({
      to: buyerAgentEmail,
      subject: buyerEmail.subject,
      html: buyerEmail.html,
    }).catch((err) => console.error('Failed to send buyer confirmation:', err));

    // Send listing agent notification if email is configured
    if (listing?.listingAgentEmail) {
      const agentEmail = listingAgentOfferNotificationEmail({
        propertyAddress,
        lobbyUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/${listingId}`,
        buyerAgentName,
      });
      sendEmail({
        to: listing.listingAgentEmail,
        subject: agentEmail.subject,
        html: agentEmail.html,
      }).catch((err) => console.error('Failed to send listing agent notification:', err));
    }

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
