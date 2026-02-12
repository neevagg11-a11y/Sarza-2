import React from 'react';
import { MapPin, Users, Music } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  return (
    <div 
      className={`group relative bg-charcoal rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-teal/20 transition-all duration-300 cursor-pointer border border-white/5 ${featured ? 'min-w-[350px]' : 'w-full'}`}
      onClick={() => window.location.hash = `#/event/${event.slug}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Overlay Video Preview (Simulated with dark overlay) */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-xs font-bold uppercase tracking-widest border border-white px-3 py-1 rounded-sm">
                Watch Preview
            </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span className="text-white text-xs font-bold font-heading uppercase">{event.date.split('•')[0]}</span>
        </div>

        {/* Vibe Badge - Top Right */}
        <div className="absolute top-3 right-3 flex gap-1">
            {event.vibeTags.slice(0, 1).map(tag => (
                <div key={tag} className="bg-teal/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {tag}
                </div>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-teal transition-colors">
            {event.name}
        </h3>
        
        <div className="flex items-center text-slate-400 text-sm mb-3 font-body">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{event.venue}, {event.city}</span>
        </div>

        {/* Genre Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.musicalIdentity.slice(0, 2).map((genre) => (
            <span key={genre} className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-700">
              {genre}
            </span>
          ))}
          {event.musicalIdentity.length > 2 && <span className="text-xs text-slate-500">+ {event.musicalIdentity.length - 2}</span>}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
            <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1" title="Average Crowd Size">
                    <Users className="w-3 h-3" />
                    <span>{event.stats.crowdSize}</span>
                </div>
                <div className="flex items-center gap-1" title="BPM Range">
                    <Music className="w-3 h-3" />
                    <span>{event.stats.bpmRange}</span>
                </div>
            </div>
            
            <div className="text-white font-bold font-heading text-sm">
                ₹{event.price.toLocaleString()}
            </div>
        </div>
      </div>
    </div>
  );
};