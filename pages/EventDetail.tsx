import React, { useEffect, useState } from 'react';
import { EVENTS } from '../constants';
import { MapPin, Calendar, Clock, PlayCircle, Users, Activity, Heart, Share2, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const EventDetail: React.FC = () => {
  const { slug } = useParams();
  const event = EVENTS.find(e => e.slug === slug) || EVENTS[0];
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketQty, setTicketQty] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const [tickets, setTickets] = useState(event.tickets);
  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  useEffect(() => {
    // Update tickets when event changes (slug changes)
    setTickets(event.tickets);
    setSelectedTicketId(null);
    setTicketQty(1);
    setBookingComplete(false);
  }, [event.slug]);

  useEffect(() => {
    const key = 'sarza_history';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [event.slug, ...current.filter((s: string) => s !== event.slug)].slice(0, 20);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [event.slug]);

  const handleBooking = () => {
    const user = localStorage.getItem('sarza_user');
    if (!user) {
      window.location.hash = '#/auth';
      return;
    }
    setShowCheckout(true);
  };

  const confirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      const bookingsKey = 'sarza_bookings';
      const currentBookings = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
      const newBooking = {
        id: `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        eventSlug: event.slug,
        eventName: event.name,
        ticketName: selectedTicket?.name,
        qty: ticketQty,
        total: ((selectedTicket?.price || 0) + (selectedTicket?.fee || 150)) * ticketQty,
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Update local ticket inventory (simulated)
      const updatedTickets = tickets.map(t => {
        if (t.id === selectedTicketId) {
          const newAvailable = Math.max(0, t.available - ticketQty);
          return {
            ...t,
            available: newAvailable,
            status: newAvailable === 0 ? 'sold_out' : (newAvailable < 10 ? 'selling_fast' : t.status)
          };
        }
        return t;
      });
      setTickets(updatedTickets);
      
      localStorage.setItem(bookingsKey, JSON.stringify([newBooking, ...currentBookings]));
      
      setIsProcessing(false);
      setBookingComplete(true);
    }, 2000);
  };

  if (!event) return <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">Event not found</div>;

  return (
    <div className="bg-charcoal min-h-screen font-body text-slate-200">
      
      {/* 1. HERO SECTION: Full Viewport Takeover */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video Loop (Simulated) */}
        <div className="absolute inset-0">
             <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30"></div>
             {/* Text readability overlay */}
             <div className="absolute inset-0 bg-black/20"></div>
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
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-6 rounded-full flex items-center gap-2 transition-all">
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
                      {tickets.map((ticket) => (
                          <div 
                            key={ticket.id}
                            onClick={() => ticket.status !== 'sold_out' && setSelectedTicketId(ticket.id)}
                            className={`
                                relative p-4 rounded-xl border-2 transition-all cursor-pointer
                                ${ticket.status === 'sold_out' ? 'border-transparent bg-white/5 opacity-50 cursor-not-allowed' : 
                                  selectedTicketId === ticket.id ? 'border-teal bg-teal/10' : 'border-white/10 hover:border-white/30 bg-charcoal-dark'}
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
                  {selectedTicketId && (
                      <div className="animate-fade-in-up">
                          <div className="flex items-center justify-between mb-4 bg-charcoal-dark p-3 rounded-lg border border-white/5">
                              <span className="text-sm text-slate-400">Quantity</span>
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
                                  (selectedTicket?.price || 0) * ticketQty + (ticketQty * (selectedTicket?.fee || 150))
                              ).toLocaleString()}</span>
                          </div>

                          <button 
                            onClick={handleBooking}
                            className="w-full bg-teal hover:bg-teal-dark text-white font-heading font-bold py-4 rounded-xl shadow-lg transition-all mb-4"
                          >
                              Proceed to Pay
                          </button>
                          
                          <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-1">
                              <Info className="w-3 h-3" /> 100% Secure Payment • Refund Policy Applied
                          </p>
                      </div>
                  )}
                  
                  {!selectedTicketId && (
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

      {/* 5. CHECKOUT MODAL (Simulated) */}
      {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => {
                  if (!isProcessing) {
                      setShowCheckout(false);
                      setBookingComplete(false);
                  }
              }}></div>
              <div className="relative bg-charcoal-dark border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
                  {bookingComplete ? (
                      <div className="p-12 text-center">
                          <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 text-teal">
                              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <h2 className="text-3xl font-heading font-bold text-white mb-2">Booking Confirmed!</h2>
                          <p className="text-slate-400 mb-8">Your digital tickets have been sent to your Gmail and added to your profile.</p>
                          <button 
                            onClick={() => {
                                setShowCheckout(false);
                                setBookingComplete(false);
                                window.location.hash = '#/history';
                            }}
                            className="bg-teal hover:bg-teal-dark text-white px-8 py-3 rounded-full font-bold transition-all"
                          >
                              View My Tickets
                          </button>
                      </div>
                  ) : (
                      <>
                          <div className="p-8 border-b border-white/10 flex justify-between items-center">
                              <h3 className="text-xl font-bold text-white">Complete Secure Checkout</h3>
                              <button onClick={() => {
                                  setShowCheckout(false);
                                  setBookingComplete(false);
                              }} className="text-slate-500 hover:text-white">✕</button>
                          </div>
                          <div className="p-8 space-y-6">
                              <div className="bg-charcoal p-4 rounded-xl border border-white/5 space-y-2">
                                  <div className="flex justify-between text-sm">
                                      <span className="text-slate-400">{event.name}</span>
                                      <span className="text-white">₹{(selectedTicket?.price || 0) * ticketQty}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                      <span className="text-slate-400">Booking Fee x {ticketQty}</span>
                                      <span className="text-white">₹{(ticketQty * (selectedTicket?.fee || 150)).toLocaleString()}</span>
                                  </div>
                                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold">
                                      <span className="text-white">Total Amount</span>
                                      <span className="text-teal">₹{((selectedTicket?.price || 0) * ticketQty + (ticketQty * (selectedTicket?.fee || 150))).toLocaleString()}</span>
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Payment Method</div>
                                  <div className="grid grid-cols-2 gap-3">
                                      <div className="p-4 rounded-xl border border-teal bg-teal/5 flex items-center gap-3 cursor-pointer">
                                          <div className="w-4 h-4 rounded-full border-4 border-teal"></div>
                                          <span className="text-sm font-bold text-white">UPI / GPay</span>
                                      </div>
                                      <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 flex items-center gap-3 cursor-pointer grayscale opacity-50">
                                          <div className="w-4 h-4 rounded-full border-2 border-white/10"></div>
                                          <span className="text-sm font-bold text-slate-400">Card</span>
                                      </div>
                                  </div>
                              </div>

                              <button 
                                onClick={confirmPayment}
                                disabled={isProcessing}
                                className="w-full bg-teal hover:bg-teal-dark disabled:bg-teal/50 text-white font-heading font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all flex items-center justify-center gap-3"
                              >
                                  {isProcessing ? (
                                      <>
                                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                          Securing Payment...
                                      </>
                                  ) : (
                                      <>Securely Pay ₹{((selectedTicket?.price || 0) * ticketQty + (ticketQty * 150)).toLocaleString()}</>
                                  )}
                              </button>
                              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                  SSL Encrypted Transaction
                              </p>
                          </div>
                      </>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};
