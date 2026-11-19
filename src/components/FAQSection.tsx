import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/sylhetData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Tourist Support &amp; Information
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Everything you need to know about renting a private car and chauffeur in Sylhet.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm sm:text-base hover:text-emerald-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick WhatsApp Support Callout */}
        <div className="mt-10 bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold">Have custom requirements or travel questions?</h3>
            <p className="text-xs text-emerald-100 mt-1 max-w-xl">
              Our 24/7 Sylhet dispatch team is on WhatsApp to assist with itinerary planning, train timings, or airport connections.
            </p>
          </div>
          <a
            href="https://wa.me/8801700000000?text=Hello%20Surma%20Chauffeur%2C%20I%20have%20an%20inquiry%20regarding%20private%20car%20rental%20in%20Sylhet."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
