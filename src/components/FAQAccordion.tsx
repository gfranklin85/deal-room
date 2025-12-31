'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does Deal Room handle multiple offers?",
    answer: "All offers are submitted through the same official channel and time-stamped automatically. The listing agent receives each offer in a secure dashboard, ensuring fair and transparent handling of every submission."
  },
  {
    question: "Is there a cost to use Deal Room?",
    answer: "Deal Room is completely free. No credit card required, no hidden fees, no premium tiers. We believe transparent offer handling should be accessible to everyone."
  },
  {
    question: "Can I use this for commercial properties?",
    answer: "Yes, Deal Room works for any property type including residential, commercial, multi-family, and land. The submission process is the same regardless of property type."
  },
  {
    question: "How are offers kept confidential?",
    answer: "Only the listing agent can view submitted offers. Buyers and buyer agents receive confirmation of submission but cannot see other offers. No offer details are displayed publicly."
  },
  {
    question: "What happens after the deadline passes?",
    answer: "After the deadline, new submissions are marked as late. The listing agent can still view and consider late offers at their discretion, but the timestamp clearly shows when each offer was received."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required to submit an offer or create a Deal Room. We prioritize simplicity and accessibility over user registration."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50"
          >
            <span className="text-lg font-medium text-slate-900">
              {item.question}
            </span>
            <svg
              className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`faq-content ${openIndex === index ? 'open' : ''}`}>
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
