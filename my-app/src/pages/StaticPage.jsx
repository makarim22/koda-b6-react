import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { ChevronLeft, ChevronUp } from "lucide-react";

export default function StaticPage({ title, content }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-orange-500/30" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header bgColor="bg-zinc-950" />
      
      {/* Dynamic Hero Section */}
      <div className="relative bg-zinc-950 pt-48 pb-32 px-6 md:px-8 overflow-hidden isolate">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full animate-fade-in-up">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-orange-400 transition-colors mb-8 font-medium text-sm group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-orange-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-orange-400/50"></span>
                Official Documentation
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none drop-shadow-2xl">
                {title}
              </h1>
            </div>
            
            {/* Scroll indicator */}
            <div className="hidden md:flex flex-col items-center gap-3 opacity-50">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest rotate-90 translate-y-4">Scroll</span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-400 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom overlapping curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 rounded-t-[3rem] translate-y-1" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-16 relative">
        
        {/* Sticky Sidebar / Table of Contents (Visual only) */}
        <aside className="hidden lg:block w-64 shrink-0 relative">
          <div className="sticky top-32">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Overview</h4>
            <div className="flex flex-col gap-4 border-l border-slate-200 pl-4 relative">
              {/* Active scroll tracker line */}
              <div 
                className="absolute left-[-1px] top-0 w-[2px] bg-orange-500 transition-all duration-300"
                style={{ height: '30%', transform: `translateY(${Math.min(scrollY / 10, 200)}px)` }}
              />
              <span className="text-sm font-semibold text-zinc-900 transition-colors cursor-default">{title} Details</span>
              <span className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors cursor-not-allowed">Information</span>
              <span className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors cursor-not-allowed">Key Policies</span>
              <span className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors cursor-not-allowed">Contact Us</span>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 w-full max-w-3xl animate-fade-in-up animation-delay-300">
          <div className="custom-prose">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="py-24 flex flex-col items-center text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <span className="text-3xl">⏳</span>
                </div>
                <h3 className="text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">Content Brewing...</h3>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
                  We are currently hand-crafting the details for this section. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-zinc-900/20 hover:-translate-y-2 hover:bg-orange-500 transition-all duration-300 z-50 ${
          scrollY > 300 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronUp size={20} />
      </button>

      <Footer />

      <style jsx>{`
        /* Custom Keyframes */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        /* Custom Highly-Spaced Typography */
        .custom-prose h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #09090b; /* zinc-950 */
          letter-spacing: -0.02em;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .custom-prose h2:first-child {
          margin-top: 0;
        }
        .custom-prose h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #18181b; /* zinc-900 */
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .custom-prose p {
          font-size: 1.125rem; /* text-lg */
          line-height: 1.8;
          color: #52525b; /* zinc-500 */
          margin-bottom: 1.5rem;
        }
        .custom-prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }
        .custom-prose li {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #52525b;
          margin-bottom: 0.75rem;
        }
        .custom-prose strong {
          color: #18181b;
          font-weight: 600;
        }
        .custom-prose hr {
          border-color: #e2e8f0; /* slate-200 */
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
      `}</style>
    </div>
  );
}
