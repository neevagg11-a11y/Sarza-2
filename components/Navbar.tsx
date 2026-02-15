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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-heading font-black text-2xl tracking-tighter">S</div>
          <span className="font-heading font-black text-2xl tracking-tightest text-white group-hover:text-teal transition-all duration-300">SARZA</span>
        </a>

        {/* Desktop Search - Refined like DICE */}
        <div className="hidden md:flex items-center bg-white/5 hover:bg-white/10 rounded-full px-6 py-2.5 w-[450px] transition-all duration-300 border border-white/5 focus-within:border-white/20 focus-within:w-[500px]">
          <Search className="w-4 h-4 text-slate-500 mr-3" />
          <input 
            type="text" 
            placeholder="Search events, artists, or vibes..." 
            className="bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm w-full font-sans font-medium"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <button className="hidden md:flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-all">
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">Bookings</span>
          </button>
          
          <button className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-[13px] font-bold uppercase tracking-widest hover:bg-teal transition-all">
            <User className="w-4 h-4" />
            <span className="hidden lg:inline">Sign In</span>
          </button>
          
          <button className="md:hidden text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </nav>
  );
};
