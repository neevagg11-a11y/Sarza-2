import React, { useState } from 'react';
import { EVENTS } from '../constants';
import { MapPin, Calendar, Clock, PlayCircle, Users, Activity, Heart, Share2, Info, X } from 'lucide-react';

export const EventDetail: React.FC = () => {
  // Using the first event as the demo
  const event = EVENTS[0];
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketQty, setTicketQty] = useState(1);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  if (!event) return <div>Event not found</div>;

  return (
    <div className="bg-charcoal min-h-screen font-body text-slate-200">
      
      {/* 1. HERO SECTION: Full Viewport Takeover */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video Loop */}
        <div className="absolute inset-0 z-0">
             {isPlayingTrailer ? (
               <div className="fixed inset-0 z-[100] bg-black">
                 <button 
                   onClick={() => setIsPlayingTrailer(false)}
                   className="absolute top-8 right-8 text-white hover:text-teal z-[110] bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
                 >
                   <X className="w-8 h-8" />
                 </button>
                 <video 
                   autoPlay 
                   controls 
                   className="w-full h-full object-contain"
                 >
                   <source src={event.videoPreview} type="video/mp4" />
                 </video>
               </div>
             ) : (
               <video 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 className="w-full h-full object-cover"
               >
                 <source src={event.videoPreview} type="video/mp4" />
               </video>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30"></div>
             <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-20">
            <div className="container mx-auto">
                <div className="max-w-4xl">
                     <div className="text-terracotta font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm animate-pulse-slow">
                        {event.tagline}
                    </div>
                    <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none shadow-black drop-shadow-lg">
                        {event.name}
                    </h1>
                    
                    {/* Critical Info Bar */}
                    <div className="flex flex-wrap gap-6 md:gap-10 text-white font-medium text-sm md:text-base mb-10 items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-teal" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-teal" />
                            <span>{event.venue}, {event.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-teal" />
                            <span>6 Hours Non-Stop</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button 
                            onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-teal hover:bg-teal-dark text-white font-heading font-bold py-4 px-10 rounded-full shadow-lg shadow-teal/30 hover:scale-105 transition-all text-lg"
                        >
                            Get Tickets
                        </button>
                        <button 
                            onClick={() => setIsPlayingTrailer(true)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-6 rounded-full flex items-center gap-2 transition-all"
                        >
                            <PlayCircle className="w-5 h-5" /> Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12 relative">
          
          {/* LEFT CONTENT */}
          <div className="lg:w-2/3 space-y-20">
              
              {/* 2. ORIGIN STORY */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] bg-teal w-12"></div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-teal">The Soul</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                      <p className="font-heading text-3xl md:text-4xl text-white leading-tight mb-8">
                          "{event.description}"
                      </p>
                      <div className="grid md:grid-cols-2 gap-8 text-slate-300 leading-relaxed">
                          <p>
                             {event.originStory} 
                             <br/><br/>
                             What started as a small gathering has evolved into a massive celebration of sound, light, and community. We don't just host events; we curate memories.
                          </p>
                          <div className="bg-charcoal-light p-6 rounded-xl border border-white/5">
                             <h4 className="font-bold text-white mb-4">Curator's Note</h4>
                             <p className="italic text-sm">"This edition is special. We're bringing back the intimate warehouse vibe but with production levels we've never attempted before."</p>
                             <div className="mt-4 flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                                 <div className="text-xs">
                                     <div className="text-white font-bold">Arjun & Team</div>
                                     <div className="text-slate-500">Founders</div>
                                 </div>
                             </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* 3. THE CROWD (Demographics) */}
              <section>
                 <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] bg-teal w-12"></div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-teal">The Crowd</h2>
                  </div>
                  <h3 className="font-heading text-3xl text-white mb-8">Who You'll Meet</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Card 1: Vibe Check */}
                      <div className="bg-charcoal-dark border border-white/10 rounded-2xl p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-terracotta" /> Vibe Check
                          </h4>
                          <div className="space-y-4">
                              <div>
                                  <div className="flex justify-between text-xs mb-1">
                                      <span>Energy Level</span>
                                      <span className="text-white">High (Peak Time)</span>
                                  </div>
                                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-teal to-terracotta w-[85%]"></div>
                                  </div>
                              </div>
                              <div className="flex gap-2 flex-wrap mt-4">
                                  {event.vibeTags.map(tag => (
                                      <span key={tag} className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-full border border-white/10">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* Card 2: Demographics */}
                      <div className="bg-charcoal-dark border border-white/10 rounded-2xl p-6">
                           <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <Users className="w-5 h-5 text-teal" /> Demographics
                          </h4>
                          <div className="flex items-center justify-between mb-6">
                              <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{event.stats.ageRange}</div>
                                  <div className="text-xs text-slate-500">Avg. Age</div>
                              </div>
                              <div className="h-8 w-[1px] bg-white/10"></div>
                              <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{event.stats.crowdSize}</div>
                                  <div className="text-xs text-slate-500">Expected</div>
                              </div>
                          </div>
                          
                          {/* Gender Bar */}
                          <div className="relative h-8 bg-slate-700 rounded-md overflow-hidden flex text-[10px] font-bold text-white/80">
                               <div style={{width: `${event.stats.genderRatio.male}%`}} className="bg-blue-600/60 h-full flex items-center justify-center">
                                   {event.stats.genderRatio.male}% M
                               </div>
                               <div style={{width: `${event.stats.genderRatio.female}%`}} className="bg-pink-600/60 h-full flex items-center justify-center">
                                   {event.stats.genderRatio.female}% F
                               </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* 4. PAST EDITIONS (Seasons) */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] bg-teal w-12"></div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-teal">The Journey</h2>
                  </div>
                  
                  <div className="relative border-l-2 border-white/10 ml-4 space-y-10 pl-8 py-2">
                      {event.pastEditions.map((edition, idx) => (
                          <div key={edition.year} className="relative">
                              {/* Dot */}
                              <div className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 border-charcoal ${edition.status === 'completed' ? 'bg-teal' : 'bg-slate-600'}`}></div>
                              
                              <div className="flex flex-col md:flex-row gap-6 hover:bg-white/5 p-4 rounded-xl transition-colors cursor-pointer group">
                                  <div className="md:w-48 h-28 rounded-lg overflow-hidden shrink-0">
                                      <img src={edition.image} alt={`${edition.year}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  </div>
                                  <div>
                                      <div className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                                          {edition.year} 
                                          {edition.status === 'cancelled' && <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded border border-red-500/20">Cancelled</span>}
                                      </div>
                                      <div className="text-teal text-sm font-semibold mb-2">{edition.highlight}</div>
                                      <div className="text-slate-400 text-sm">{edition.attendance.toLocaleString()} Souls Attended</div>
                                      {edition.status === 'completed' && (
                                          <button className="mt-3 text-xs flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                                              <PlayCircle className="w-3 h-3" /> Watch Aftermovie
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
                      
                      {/* Current Year */}
                      <div className="relative">
                          <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 border-charcoal bg-terracotta animate-pulse"></div>
                          <div className="pl-4">
                              <h3 className="text-2xl font-bold text-white">2026: The Next Chapter</h3>
                              <p className="text-terracotta text-sm font-bold mt-1">Happening Now. Write the history.</p>
                          </div>
                      </div>
                  </div>
              </section>

          </div>

          {/* RIGHT SIDEBAR (Sticky Ticket Selector) */}
          <div className="lg:w-1/3 relative z-30">
              <div className="sticky top-24 bg-charcoal-light border border-white/10 rounded-2xl p-6 shadow-2xl" id="tickets">
                  <h3 className="font-heading text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Select Experience</h3>
                  
                  <div className="space-y-4 mb-6">
                      {event.tickets.map((ticket) => (
                          <div 
                            key={ticket.id}
                            onClick={() => ticket.status !== 'sold_out' && setSelectedTicket(ticket.id)}
                            className={`
                                relative p-4 rounded-xl border-2 transition-all cursor-pointer
                                ${ticket.status === 'sold_out' ? 'border-transparent bg-white/5 opacity-50 cursor-not-allowed' : 
                                  selectedTicket === ticket.id ? 'border-teal bg-teal/10' : 'border-white/10 hover:border-white/30 bg-charcoal-dark'}
                            `}
                          >
                              {ticket.status === 'selling_fast' && (
                                  <div className="absolute -top-3 right-4 bg-terracotta text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                      Selling Fast
                                  </div>
                              )}
                              
                              <div className="flex justify-between items-center mb-2">
                                  <span className="font-bold text-white">{ticket.name}</span>
                                  <span className="font-heading text-lg font-bold text-teal">₹{ticket.price.toLocaleString()}</span>
                              </div>
                              
                              <div className="text-xs text-slate-400 mb-3 space-y-1">
                                  {ticket.benefits.map((benefit, i) => (
                                      <div key={i} className="flex items-center gap-1">
                                          <span className="w-1 h-1 bg-slate-500 rounded-full"></span> {benefit}
                                      </div>
                                  ))}
                              </div>

                              {ticket.status === 'sold_out' ? (
                                  <div className="text-red-400 text-xs font-bold uppercase flex items-center gap-1">
                                      Sold Out
                                  </div>
                              ) : (
                                  <div className="text-teal text-xs font-bold flex items-center gap-1">
                                      {ticket.available} / {ticket.total} Available
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  {/* Checkout Area */}
                  {selectedTicket && (
                      <div className="animate-fade-in-up">
                          <div className="flex items-center justify-between mb-4 bg-charcoal-dark p-3 rounded-lg border border-white/5">
                              <span className="text-sm">Quantity</span>
                              <div className="flex items-center gap-4">
                                  <button onClick={() => setTicketQty(Math.max(1, ticketQty - 1))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold">-</button>
                                  <span className="font-bold text-white">{ticketQty}</span>
                                  <button onClick={() => setTicketQty(Math.min(10, ticketQty + 1))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold">+</button>
                              </div>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm mb-6 text-slate-400">
                                <span>Booking Fee</span>
                                <span>₹{(ticketQty * 150).toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between items-center text-xl font-bold text-white mb-6 pt-4 border-t border-white/10">
                              <span>Total</span>
                              <span>₹{(
                                  (event.tickets.find(t => t.id === selectedTicket)?.price || 0) * ticketQty + (ticketQty * 150)
                              ).toLocaleString()}</span>
                          </div>

                          <button className="w-full bg-teal hover:bg-teal-dark text-white font-heading font-bold py-4 rounded-xl shadow-lg transition-colors mb-4">
                              Proceed to Pay
                          </button>
                          
                          <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-1">
                              <Info className="w-3 h-3" /> 100% Secure Payment • Refund Policy Applied
                          </p>
                      </div>
                  )}
                  
                  {!selectedTicket && (
                      <div className="text-center text-sm text-slate-500 py-4 italic">
                          Select a ticket tier to continue
                      </div>
                  )}

                  {/* Social Proof */}
                  <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <p className="text-xs text-slate-400 mb-2">42 people are viewing this event</p>
                      <div className="flex justify-center -space-x-2">
                          {[1,2,3,4].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-charcoal-light"></div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Utility Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                      <Heart className="w-4 h-4" /> Save
                  </button>
                  <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
