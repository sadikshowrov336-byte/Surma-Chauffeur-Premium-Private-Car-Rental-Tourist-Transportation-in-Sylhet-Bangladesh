import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/sylhetData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Tourist Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Trusted by Expatriates &amp; Global Travelers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Read real feedback from British-Bangladeshi families, domestic tourists, and international adventurers exploring Sylhet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{test.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80">
                <div className="font-bold text-stone-900 text-sm">{test.name}</div>
                <div className="text-xs text-stone-500">{test.location}</div>
                <div className="mt-2 text-[11px] text-emerald-800 font-medium">
                  {test.tour} · {test.vehicleUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
