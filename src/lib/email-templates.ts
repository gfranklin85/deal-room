// Email templates with warm, calm, adult tone
// No emojis except 🎉 on selection

interface EmailData {
  propertyAddress: string;
  lobbyUrl: string;
}

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #1e293b;
`;

const buttonStyles = `
  display: inline-block;
  background-color: #1e40af;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
`;

function wrapTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="${baseStyles} background-color: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          ${content}
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
            Deal Room Lobby
          </div>
        </div>
      </body>
    </html>
  `;
}

// ============================================
// BUYER EMAILS
// ============================================

export function buyerConfirmationEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: "Offer submitted — you're officially in",
    html: wrapTemplate(`
      <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #0f172a;">
        Congratulations on submitting your offer.
      </h1>

      <p style="margin: 0 0 16px 0;">
        Your offer for <strong>${data.propertyAddress}</strong> has been successfully received and time-stamped in the Deal Room.
      </p>

      <h2 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #0f172a;">
        What happens next:
      </h2>

      <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #475569;">
        <li style="margin-bottom: 8px;">The seller will review all submitted offers according to their stated process</li>
        <li>You'll receive updates here if the status changes</li>
      </ul>

      <p style="margin: 0 0 24px 0;">
        You can view the current status at any time:
      </p>

      <a href="${data.lobbyUrl}" style="${buttonStyles}">
        View Deal Room
      </a>

      <p style="margin: 24px 0 0 0; color: #64748b;">
        Submitting an offer is a big step — we'll keep you informed as things move forward.
      </p>
    `),
  };
}

export function buyerUnderReviewEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: "Your offer is under review",
    html: wrapTemplate(`
      <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #0f172a;">
        Your offer is under review
      </h1>

      <p style="margin: 0 0 16px 0;">
        The seller is now reviewing offers for <strong>${data.propertyAddress}</strong>.
      </p>

      <p style="margin: 0 0 24px 0; color: #64748b;">
        No action is needed from you right now.
      </p>

      <p style="margin: 0 0 0 0;">
        We'll let you know as soon as a decision is made.
      </p>
    `),
  };
}

export function buyerSelectedEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: "Your offer has been selected 🎉",
    html: wrapTemplate(`
      <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #0f172a;">
        Good news — your offer has been selected.
      </h1>

      <p style="margin: 0 0 16px 0;">
        Your offer for <strong>${data.propertyAddress}</strong> has been selected.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 20px;">
        Congratulations 🎉
      </p>

      <p style="margin: 0 0 16px 0;">
        Your agent will guide you through the next steps as the transaction moves forward outside the Deal Room.
      </p>

      <p style="margin: 0 0 0 0; color: #64748b;">
        This system's role ends here, but we're glad to have helped you reach this point.
      </p>
    `),
  };
}

export function buyerNotSelectedEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: "Update on your offer",
    html: wrapTemplate(`
      <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #0f172a;">
        Update on your offer
      </h1>

      <p style="margin: 0 0 16px 0;">
        The seller has chosen a different offer for <strong>${data.propertyAddress}</strong>.
      </p>

      <p style="margin: 0 0 16px 0;">
        We know this isn't the outcome you hoped for. Submitting an offer takes effort and intention, and it matters.
      </p>

      <p style="margin: 0 0 0 0; color: #64748b;">
        Your agent can help you decide next steps and prepare for what comes next.
      </p>
    `),
  };
}

// ============================================
// LISTING AGENT EMAILS
// ============================================

export function listingAgentOfferNotificationEmail(data: EmailData & { buyerAgentName: string }): { subject: string; html: string } {
  return {
    subject: `Offer submitted — ${data.propertyAddress}`,
    html: wrapTemplate(`
      <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #0f172a;">
        New offer submitted
      </h1>

      <p style="margin: 0 0 16px 0;">
        An offer has been submitted for <strong>${data.propertyAddress}</strong>.
      </p>

      <p style="margin: 0 0 24px 0; color: #64748b;">
        Submitted by: ${data.buyerAgentName}
      </p>

      <a href="${data.lobbyUrl}" style="${buttonStyles}">
        View in Deal Room
      </a>
    `),
  };
}

// ============================================
// LENDER EMAILS (Future)
// ============================================

export function lenderOfferNotificationEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: `Offer submitted — ${data.propertyAddress}`,
    html: wrapTemplate(`
      <p style="margin: 0 0 16px 0;">
        An offer has been submitted for <strong>${data.propertyAddress}</strong> involving your borrower.
      </p>

      <p style="margin: 0 0 0 0; color: #64748b;">
        Please coordinate directly with the buyer and their agent.
      </p>
    `),
  };
}
