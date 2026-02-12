import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Facebook } from 'lucide-react';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [user, setUser] = useState<any>(null);

  const sendOtp = async () => {
    setIsVerifying(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { 
        shouldCreateUser: true,
        data: { full_name: name }
      },
    });

    setIsVerifying(false);
    if (error) {
      alert(error.message);
    } else {
      setMode('otp');
    }
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email",
    });

    setIsVerifying(false);
    if (error) {
      alert("Invalid OTP");
    } else {
      window.location.hash = '#/';
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOtp();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.hash = '#/auth';
  };

  if (user) {
    return (
      <div className="min-h-screen bg-charcoal pt-24 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="bg-charcoal-dark border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center text-teal text-3xl font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h1 className="font-heading text-3xl font-bold">Account Dashboard</h1>
                <p className="text-slate-400">Manage your profile and bookings</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Profile Info</h3>
                <div className="text-xl font-bold mb-1">{user.name}</div>
                <div className="text-slate-400 text-sm">{user.email}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-teal text-xs font-bold">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
                  Verified Account
                </div>
              </div>
              <div className="bg-charcoal p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Security</h3>
                  <div className="text-sm text-slate-300">Two-factor authentication is active via Gmail.</div>
                </div>
                <button className="text-teal text-xs font-bold hover:underline text-left mt-4">Change Password</button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#/history" className="bg-teal hover:bg-teal-dark text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                My Bookings & History
              </a>
              <button onClick={logout} className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full font-bold transition-all">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'otp') {
    return (
      <div className="min-h-screen bg-charcoal pt-24 text-white flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-charcoal-dark border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-bold mb-2">Verify your email</h2>
            <p className="text-slate-400 text-sm mb-8">We've sent an 8-digit code to <span className="text-white font-medium">{email}</span></p>
            
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Enter 8-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={8}
                className="w-full bg-charcoal text-white text-center text-2xl tracking-[0.5em] font-bold p-4 rounded-xl border border-white/10 focus:border-teal outline-none transition-all"
                required
              />
              <button type="submit" className="w-full bg-teal hover:bg-teal-dark text-white font-heading font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all">
                Verify & Continue
              </button>
            </form>
            
            <div className="mt-8 text-sm text-slate-500">
              Didn't receive the code? <button onClick={() => setMode('signin')} className="text-teal font-bold hover:underline">Resend</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal pt-24 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-charcoal-dark border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold mb-2">{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-400">{mode === 'signin' ? 'Sign in to access your tickets' : 'Join the Sarza community'}</p>
          </div>

          <div className="flex p-1 bg-charcoal rounded-xl mb-8">
            <button
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'signin' ? 'bg-teal text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setMode('signin')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'signup' ? 'bg-teal text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleInitialSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-charcoal text-white p-4 rounded-xl border border-white/10 focus:border-teal outline-none transition-all"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal text-white p-4 rounded-xl border border-white/10 focus:border-teal outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal text-white p-4 rounded-xl border border-white/10 focus:border-teal outline-none transition-all"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isVerifying}
              className="w-full bg-teal hover:bg-teal-dark disabled:bg-teal/50 text-white font-heading font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending OTP...
                </>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-charcoal-dark px-2 text-slate-500 font-bold">Or continue with</span></div>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
