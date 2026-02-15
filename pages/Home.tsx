import React, { useState, useEffect } from 'react';
import { EVENTS, VIBES } from '../constants';
import { EventCard } from '../components/EventCard';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

export const Home: React.FC = () => {
  const [showShowreel, setShowShowreel] = useState(false);
  const [showDocu, setShowDocu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black min-h-screen selection:bg-teal selection:text-black">
      
      {/* 1. HERO SECTION - Cinematic & Bold */}
      <section className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden flex items-center py-16">
        {/* Showreel Modal */}
        {showShowreel && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              <button
                onClick={() => setShowShowreel(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <video autoPlay controls className="w-full h-full object-cover">
                  <source src="https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}
        {/* Background Video with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4" type="video/mp4" />
          </video>
          {/* Multi-layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12">
            <div className="max-w-5xl">
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-sm bg-white text-black font-black text-[10px] uppercase tracking-[0.3em]">
                    <span>The Future of Discovery</span>
                </div>
                
                <h1 className="font-display font-black text-6xl md:text-[10rem] lg:text-[12rem] text-white mb-8 leading-[0.85] tracking-tightest uppercase">
                    Every Event <br/> 
                    <span className="text-stroke hover:text-white transition-all duration-700 cursor-default">Has a Soul.</span>
                </h1>
                
                <div className="flex flex-col gap-6 mt-8 md:mt-6">
                    <div className="flex flex-wrap gap-6 items-center">
                        <button 
                            onClick={() => window.location.hash = '#/events'}
                            className="group relative overflow-hidden bg-teal text-black font-black py-5 px-10 rounded-full text-sm uppercase tracking-widest transition-all hover:pr-14"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get In <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                        
                        <button 
                            onClick={() => setShowShowreel(true)}
                            className="group flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest hover:text-teal transition-colors"
                        >
                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal group-hover:bg-teal group-hover:text-black transition-all duration-300">
                                <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-current border-b-[8px] border-b-transparent"></div>
                            </div>
                            <span>Showreel</span>
                        </button>
                    </div>
                    
                    <p className="font-sans font-medium text-lg md:text-xl text-white/60 max-w-md leading-relaxed">
                        Don't just buy a ticket. Discover the vibe, understand the crowd, and find the experiences that match your energy.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 2. DISCOVER BY VIBE (RA Editorial Style) */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter">Find Your Community</h2>
                    <p className="text-white/40 font-sans text-lg font-medium leading-relaxed">
                        Beyond genres. We categorize events by the energy they emit, the crowd they attract, and the memories they leave behind.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="h-[1px] w-24 bg-white/20 self-center"></div>
                    <span className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Explore All Vibes</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {VIBES.map((vibe, index) => (
                    <div key={vibe.id} className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-neutral-900 border border-white/5">
                        <img 
                            src={vibe.image} 
                            alt={vibe.name} 
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <div className="mb-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <vibe.icon className="w-5 h-5" />
                            </div>
                            
                            <h3 className="text-white font-display font-black text-3xl uppercase tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                {vibe.name}
                            </h3>
                            <p className="text-white/40 font-sans text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-75">
                                {vibe.description}
                            </p>
                        </div>
                        
                        {/* RA-style index number */}
                        <div className="absolute top-10 right-10 text-white/10 font-display font-black text-6xl italic group-hover:text-white/20 transition-colors">
                            0{index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. FEATURED EVENTS (DICE Grid Style) */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4 uppercase tracking-tighter">Trending Now</h2>
                    <p className="text-white/40 font-sans text-lg font-medium leading-relaxed">The most anticipated experiences happening this week.</p>
                </div>
                <button className="group flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.3em] hover:text-teal transition-colors">
                    View All Events
                    <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-teal transition-all"></div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {EVENTS.map((event) => (
                    <div key={event.id}>
                        <EventCard event={event} featured={true} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. RISING TALENT / PROMOTIONAL SECTION */}
      <section className="py-20 bg-charcoal">
          <div className="container mx-auto px-4">
              <div className="bg-gradient-to-br from-charcoal-light to-charcoal border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2">
                      <span className="text-terracotta font-bold text-xs tracking-widest uppercase mb-2 block">Featured Series</span>
                      <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Sunburn Reload: The Documentary</h2>
                      <p className="text-slate-300 font-body mb-8 text-lg">
                          Before you step onto the dance floor, witness the journey. 4 editions, 8,500 attendees, one massive cultural movement.
                      </p>
                      <button className="bg-white text-charcoal font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-colors">
                          Watch The Story
                      </button>
                  </div>
                  <div className="md:w-1/2 relative">
                       <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-teal/10 border border-white/10 relative group cursor-pointer">
                            <img src="https://picsum.photos/seed/docu/800/450" alt="Documentary" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                </div>
                            </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};
