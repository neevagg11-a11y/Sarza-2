import React, { useState, useEffect } from 'react';
import { EVENTS, VIBES } from '../constants';
import { EventCard } from '../components/EventCard';
import { ArrowRight, ChevronDown, X } from 'lucide-react';

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
    <div className="bg-charcoal min-h-screen">
      
      {/* 1. HERO SECTION - Cinematic */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video with 3D Parallax Effect */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-200 ease-out"
          style={{
            transform: `scale(1.1) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
            perspective: '1000px'
          }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
            onLoadedMetadata={(e) => (e.target as HTMLVideoElement).play()}
          >
            <source src="https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-transparent"></div>
          
          {/* Dynamic Glow Layer */}
          <div 
            className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal/30 via-transparent to-transparent pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`
            }}
          ></div>
        </div>

        {/* Video Overlays */}
        {(showShowreel || showDocu) && (
          <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-in">
            <button 
              onClick={() => { setShowShowreel(false); setShowDocu(false); }}
              className="absolute top-8 right-8 text-white hover:text-teal z-[110] bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full h-full max-w-6xl max-h-[80vh] px-4">
              <video 
                autoPlay 
                controls 
                className="w-full h-full rounded-2xl shadow-2xl"
              >
                <source 
                  src={showShowreel 
                    ? "https://cdn.pixabay.com/video/2021/08/04/83956-584735313_large.mp4" 
                    : "https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4"
                  } 
                  type="video/mp4" 
                />
              </video>
            </div>
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur-md">
                <span className="text-xs font-bold tracking-[0.2em] text-teal-300 uppercase">Next Gen Ticketing</span>
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                Every Event <br/> Has a Soul.
            </h1>
            <p className="font-body text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Don't just buy a ticket. Discover the vibe, understand the crowd, and find the experiences that match your energy.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => window.location.hash = '#/events'}
                  className="bg-teal hover:bg-teal-dark text-white font-heading font-bold py-4 px-8 rounded-full shadow-lg shadow-teal/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                    Find Yours <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowShowreel(true)}
                  className="text-white font-heading font-semibold py-4 px-8 flex items-center gap-2 hover:text-teal transition-colors"
                >
                   Watch Showreel <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">▶</div>
                </button>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
            <span className="text-xs uppercase tracking-widest mb-2 block text-center">Discover</span>
            <ChevronDown className="w-6 h-6 mx-auto" />
        </div>
      </section>

      {/* 2. DISCOVER BY VIBE */}
      <section className="py-20 bg-charcoal relative">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3">Discover By Vibe</h2>
                    <p className="text-slate-400 font-body">Curated experiences for every mood.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {VIBES.map((vibe) => (
                    <div key={vibe.id} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                        <img src={vibe.image} alt={vibe.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                            <div className="text-2xl mb-1">{vibe.icon}</div>
                            <h3 className="text-white font-heading font-bold text-lg leading-tight group-hover:text-teal transition-colors">{vibe.name}</h3>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                <p className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{vibe.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. FEATURED EVENTS (Netflix Carousel Style) */}
      <section className="py-20 bg-charcoal-dark border-t border-white/5">
        <div className="container mx-auto px-4">
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Trending This Week <span className="text-terracotta text-2xl align-top">🔥</span></h2>
                <button className="text-teal hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">View All</button>
            </div>

            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
                {EVENTS.map((event) => (
                    <div key={event.id} className="snap-start shrink-0 w-[85vw] md:w-[350px]">
                        <EventCard event={event} featured={true} />
                    </div>
                ))}
                {/* Mock duplicates to show scroll */}
                 {EVENTS.map((event) => (
                    <div key={`${event.id}-dup`} className="snap-start shrink-0 w-[85vw] md:w-[350px]">
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
