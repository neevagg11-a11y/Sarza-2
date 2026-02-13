import React, { useState, useEffect } from 'react';
import { Search, Menu, User, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal rounded-sm flex items-center justify-center font-heading font-bold text-white text-xl">S</div>
          <span className="font-heading font-bold text-2xl tracking-wide text-white group-hover:text-teal transition-colors">SARZA</span>
        </a>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-96 backdrop-blur-sm border border-white/20 focus-within:border-teal transition-colors">
          <Search className="w-4 h-4 text-slate-300 mr-2" />
          <input 
            type="text" 
            placeholder="Search events, artists, or vibes..." 
            className="bg-transparent border-none outline-none text-white placeholder-slate-400 text-sm w-full font-body"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-white hover:text-teal transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">My Bookings</span>
          </button>
          
          <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-teal transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden lg:inline">Sign In</span>
          </button>
          
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </nav>
  );
};
