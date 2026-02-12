import React from 'react';
import { EVENTS, VIBES } from '../constants';
import { EventCard } from '../components/EventCard';
import { SlidersHorizontal, MapPin, Calendar, Music } from 'lucide-react';

export const EventList: React.FC = () => {
  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">Upcoming Events</h1>
                <p className="text-slate-400">Curated experiences in your city.</p>
            </div>
            
            <div className="flex gap-3">
                <div className="relative">
                    <select className="appearance-none bg-charcoal-light text-white px-4 py-3 pr-10 rounded-lg border border-white/10 text-sm font-semibold focus:border-teal outline-none cursor-pointer">
                        <option>Sort by: Recommended</option>
                        <option>Date: Upcoming</option>
                        <option>Price: Low to High</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4 space-y-8">
                
                {/* Search / Filter Toggle Mobile */}
                <div className="lg:hidden mb-4">
                    <button className="w-full bg-charcoal-light py-3 rounded-lg text-white flex items-center justify-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                </div>

                {/* Desktop Filters */}
                <div className="hidden lg:block space-y-8 bg-charcoal-dark p-6 rounded-xl border border-white/5 sticky top-24">
                    
                    {/* Location */}
                    <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <MapPin className="w-4 h-4 text-teal" /> Location
                        </h4>
                        <select className="w-full bg-charcoal text-slate-300 p-2 rounded border border-white/10 text-sm">
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                            <option>Delhi</option>
                            <option>Goa</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                         <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Calendar className="w-4 h-4 text-teal" /> Date
                        </h4>
                        <div className="space-y-2">
                            {['This Weekend', 'Next Week', 'This Month'].map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-4 h-4 border border-slate-600 rounded-sm group-hover:border-teal"></div>
                                    <span className="text-slate-400 text-sm group-hover:text-white">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Vibe */}
                     <div>
                         <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Music className="w-4 h-4 text-teal" /> Vibe
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {VIBES.map(vibe => (
                                <button key={vibe.id} className="text-xs bg-charcoal-light hover:bg-teal hover:text-white text-slate-400 px-3 py-1 rounded-full transition-colors border border-white/5">
                                    {vibe.name.split('&')[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </aside>

            {/* Grid */}
            <main className="lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {EVENTS.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                
                {/* Pagination / Load More */}
                <div className="mt-16 text-center">
                    <button className="text-slate-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1 text-sm font-semibold tracking-widest uppercase">
                        Load More Events
                    </button>
                </div>
            </main>

        </div>
      </div>
    </div>
  );
};