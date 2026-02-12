import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-dark pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* CTA Section */}
        <div className="mb-20 bg-gradient-to-r from-teal-dark to-charcoal p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-teal/30">
          <div className="relative z-10 max-w-xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience the Magic?</h2>
            <p className="font-body text-slate-300 mb-6">Join 11,400+ souls who have found their vibe on Sarza.</p>
          </div>
          <div className="relative z-10">
             <button className="bg-white text-teal font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform font-heading tracking-wide">
               Browse Events ➜
             </button>
          </div>
          {/* Abstract BG Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-slate-400 text-sm">
          <div>
            <h4 className="text-white font-heading text-xl mb-6">SARZA</h4>
            <p className="mb-4 leading-relaxed">Transforming event discovery from transactional browsing into immersive storytelling. Find your vibe.</p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 hover:text-teal cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-teal cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-teal cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h5>
            <ul className="space-y-3">
              <li className="hover:text-teal cursor-pointer">Browse Events</li>
              <li className="hover:text-teal cursor-pointer">Sponsor Marketplace</li>
              <li className="hover:text-teal cursor-pointer">Organizer Analytics</li>
              <li className="hover:text-teal cursor-pointer">Sarza Pass</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Community</h5>
            <ul className="space-y-3">
              <li className="hover:text-teal cursor-pointer">Our Story</li>
              <li className="hover:text-teal cursor-pointer">Blog</li>
              <li className="hover:text-teal cursor-pointer">Careers</li>
              <li className="hover:text-teal cursor-pointer">Help Center</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact</h5>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4" />
              <span>hello@sarza.com</span>
            </div>
            <p>Mumbai • Bangalore • Delhi</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Sarza. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};