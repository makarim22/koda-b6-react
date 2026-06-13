import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import GrinderImage from '../assets/icons/homepage/coffee-grinder.svg';
import { Button } from '../component/Button';

function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header bgColor="bg-zinc-950" />
  
      <main className="flex-1">
        <section className="relative flex flex-col md:flex-row items-stretch min-h-screen bg-zinc-950 pt-20 md:pt-0 isolate overflow-hidden">
          {/* Abstract Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Text Content */}
          <div className="flex flex-col justify-center items-start text-left p-8 md:p-16 lg:p-24 w-full md:w-1/2 relative z-10 animate-fade-in-up">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4">Connect With Us</p>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-8">
              Start Your Day with <span className="text-orange-400">Coffee</span> and Good Meals
            </h1>
            <p className="text-lg lg:text-xl text-zinc-400 font-medium mb-12 max-w-lg leading-relaxed">
              We provide high-quality beans, good taste, and healthy meals made with
              love just for you. Start your day with us for a bigger smile!
            </p>
            
            <Button variant="primary" className="px-10 py-4 text-lg w-full sm:w-auto">
              Get Started
            </Button>
            
            <div className="flex flex-wrap gap-8 md:gap-16 mt-16 pt-10 border-t border-white/10 w-full">
              <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter">90+</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Staff</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter">30+</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Stores</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter">800+</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Customers</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 relative bg-zinc-900 overflow-hidden flex items-center justify-center p-8 lg:p-16 group">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950 z-10 pointer-events-none" />
            <img 
              src={GrinderImage} 
              alt="Coffee Grinder" 
              className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-1000 relative z-0" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/seed/chat/800/800";
              }}
            />
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default ChatPage;
