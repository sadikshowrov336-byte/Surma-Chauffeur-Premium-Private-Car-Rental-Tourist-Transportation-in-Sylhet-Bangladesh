import React from 'react';
import { Car, Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                <Car className="w-4 h-4 text-emerald-200" />
              </span>
              <span>Surma Chauffeur</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Premium private tourist car rental and chauffeur service based in Sylhet, Bangladesh. Dedicated to offering safe, transparent, and comfortable travel for foreign visitors, expatriates, and local travelers.
            </p>
            <div className="text-stone-400">
              Licensed Tour Transport Operator · Sylhet Division
            </div>
          </div>

          {/* Quick Destinations */}
          <div>
            <h4 className="text-stone-100 font-bold uppercase tracking-wider text-xs mb-3">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Bholaganj Sada Pathor
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Ratargul Swamp Forest
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Jaflong Zero Point &amp; Lalakhal
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Bisnakandi &amp; Panthumai
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Sreemangal Tea Gardens &amp; Lawachara
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Osmani Airport (ZYL) VIP Transfer
                </a>
              </li>
            </ul>
          </div>

          {/* Vehicle Fleet */}
          <div>
            <h4 className="text-stone-100 font-bold uppercase tracking-wider text-xs mb-3">
              Vehicle Categories
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Executive Sedan (Premio / Allion)
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Tourist Microbus (Toyota Noah 7-Seat)
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Grand Cabin (Toyota HiAce 11-Seat)
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Expedition 4x4 (Toyota Prado SUV)
                </a>
              </li>
              <li>
                <a href="#itinerary" className="hover:text-white transition-colors">
                  Custom Multi-Day Family Hire
                </a>
              </li>
            </ul>
          </div>

          {/* Local Dispatch Office */}
          <div className="space-y-3">
            <h4 className="text-stone-100 font-bold uppercase tracking-wider text-xs mb-3">
              Sylhet Dispatch Desk
            </h4>
            <div className="flex items-start gap-2 text-stone-400">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Suite 4B, Noor Manzil, Amberkhana Point (Near Airport Road), Sylhet 3100, Bangladesh
              </span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+880 1711 000000 / +880 1819 000000</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>WhatsApp: +880 1700 000000 (24/7 Response)</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>dispatch@surmachauffeur.com</span>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Surma Chauffeur Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Non-Smoking Fleet</span>
            <span aria-hidden="true">·</span>
            <span>English &amp; Sylheti Drivers</span>
            <span aria-hidden="true">·</span>
            <span>Punctuality Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
