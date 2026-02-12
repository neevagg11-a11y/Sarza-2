import React, { useState, useEffect } from 'react';
import { EVENTS } from '../constants';
import { EventCard } from '../components/EventCard';
import { Ticket, Clock, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const History: React.FC = () => {
  const [tab, setTab] = useState<'tickets' | 'viewed'>('tickets');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [slugs, setSlugs] = useState<string[]>(() => JSON.parse(localStorage.getItem('sarza_history') || '[]'));
  const viewedItems = slugs.map(s => EVENTS.find(e => e.slug === s)).filter(Boolean);
  
  const [bookings, setBookings] = useState<any[]>(() => JSON.parse(localStorage.getItem('sarza_bookings') || '[]'));

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.hash = '#/auth';
      } else {
        setSession(session);
        console.log("Logged in user:", session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="bg-charcoal min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal/30 border-t-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  const clearViewed = () => {
    localStorage.removeItem('sarza_history');
    setSlugs([]);
  };

  const clearBookings = () => {
    if (confirm('Are you sure you want to clear your booking history? This will not cancel your actual tickets.')) {
      localStorage.removeItem('sarza_bookings');
      setBookings([]);
    }
  };

  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">Your Activity</h1>
            <p className="text-slate-400">Manage your bookings and recently viewed experiences.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex p-1 bg-charcoal-dark border border-white/10 rounded-xl">
              <button 
                onClick={() => setTab('tickets')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${tab === 'tickets' ? 'bg-teal text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Ticket className="w-4 h-4" /> My Tickets
              </button>
              <button 
                onClick={() => setTab('viewed')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${tab === 'viewed' ? 'bg-teal text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Clock className="w-4 h-4" /> Recently Viewed
              </button>
            </div>
            
            {tab === 'tickets' && bookings.length > 0 && (
              <button onClick={clearBookings} className="text-xs text-slate-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest">Clear All</button>
            )}
            {tab === 'viewed' && viewedItems.length > 0 && (
              <button onClick={clearViewed} className="text-xs text-slate-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest">Clear History</button>
            )}
          </div>
        </div>

        {tab === 'tickets' ? (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-charcoal-dark border border-white/10 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ticket className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No tickets yet</h3>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto">You haven't booked any experiences. Explore our curated events to find your next vibe.</p>
                <a href="#/events" className="inline-block bg-teal hover:bg-teal-dark text-white px-8 py-3 rounded-full font-bold transition-all">
                  Browse Events
                </a>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => {
                  const event = EVENTS.find(e => e.slug === booking.eventSlug);
                  return (
                    <div key={booking.id} className={`bg-charcoal-dark border rounded-3xl overflow-hidden flex flex-col md:flex-row group transition-all duration-500 ${activeId === booking.id ? 'border-teal ring-1 ring-teal/50' : 'border-white/10 hover:border-teal/30'}`}>
                      <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                        <img src={event?.image} alt={booking.eventName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                           <span className="bg-teal text-[10px] font-bold px-2 py-1 rounded text-white uppercase tracking-tighter">Verified</span>
                        </div>
                      </div>
                      <div className="flex-grow p-6 md:p-8 flex flex-col justify-between" onClick={() => setActiveId(activeId === booking.id ? null : booking.id)}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="text-teal text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></div>
                                Booking Confirmed
                              </div>
                              <h3 className="text-2xl font-heading font-bold text-white group-hover:text-teal transition-colors">{booking.eventName}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order ID</div>
                              <div className="text-xs font-mono text-slate-300 bg-white/5 px-2 py-1 rounded mt-1">{booking.id}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-400 mb-6">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-teal/50" /> {event?.date}</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-teal/50" /> {event?.venue}</div>
                            <div className="flex items-center gap-2"><Ticket className="w-4 h-4 text-teal/50" /> {booking.qty} x {booking.ticketName}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <button className="bg-teal/10 hover:bg-teal text-teal hover:text-white text-xs font-bold px-4 py-2 rounded-xl border border-teal/20 transition-all flex items-center gap-2">
                              <Ticket className="w-3 h-3" /> Get QR Code
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 transition-all">
                              Invoice
                            </button>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Paid</div>
                             <div className="text-xl font-bold text-white">₹{booking.total.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        {activeId === booking.id && (
                          <div className="mt-6 pt-6 border-t border-white/5 animate-fade-in-up">
                            <div className="bg-charcoal p-4 rounded-2xl space-y-3">
                               <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Booking Date</span>
                                  <span className="text-slate-300">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                               </div>
                               <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Payment Status</span>
                                  <span className="text-teal font-bold uppercase tracking-widest">Success • UPI</span>
                               </div>
                               <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Venue Entry</span>
                                  <span className="text-slate-300 italic">Valid with Govt. ID</span>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {viewedItems.length === 0 ? (
              <div className="bg-charcoal-dark border border-white/10 rounded-3xl p-12 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Your history is empty</h3>
                <p className="text-slate-400">Browse events and we'll keep track of them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {viewedItems.map(e => (
                  <EventCard key={e!.id} event={e!} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
