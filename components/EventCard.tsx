import React, { useState } from 'react';
import { MapPin, Users, Music } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group cursor-pointer bg-neutral-900 border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 ${featured ? 'h-full' : ''}`}
      onClick={() => window.location.hash = `#/event/${event.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800">
        <img 
          src={event.image} 
          alt={event.name} 
          className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'scale-110 blur-[2px] opacity-40' : 'scale-100 opacity-100'}`}
        />
        
        {/* Video Preview Overlay */}
        {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/40 px-6 py-2 bg-black/50 backdrop-blur-sm">
                    Watch Preview
                </div>
            </div>
        )}

        {/* Date Badge - Minimalist DICE style */}
        <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 font-black text-xs uppercase tracking-widest">
          {event.date.split('•')[0]}
        </div>

        {/* Price Badge - Bottom Right */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
          <span className="text-white text-xs font-black">FROM ₹{event.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
            {event.vibeTags.map(tag => (
                <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-teal">{tag}</span>
            ))}
        </div>

        <h3 className="text-2xl font-display font-black text-white mb-4 leading-[1.1] uppercase tracking-tighter group-hover:text-teal transition-colors duration-300">
            {event.name}
        </h3>
        
        <div className="flex items-center text-white/40 text-[11px] font-black uppercase tracking-widest mb-6">
          <MapPin className="w-3.5 h-3.5 mr-2 text-white/20" />
          <span className="truncate">{event.venue}, {event.city}</span>
        </div>

        {/* DICE-style progress bar for "selling fast" */}
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-teal w-3/4 animate-shimmer"></div>
        </div>
        <div className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
            Selling Fast
        </div>
      </div>
    </div>
  );
};