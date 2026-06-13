import React from 'react';
import NotFound from '../assets/404_2.jpg'; 
import { Link } from 'react-router-dom';
import { Button } from '../component/Button';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header bgColor="bg-zinc-950" />
      
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 pt-32 pb-24">
        <div className="text-center bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200 max-w-2xl mx-auto flex flex-col items-center animate-fade-in-up">
          <div className="relative mb-10 w-full max-w-sm">
            <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[40px] -z-10 pointer-events-none" />
            <img
              src={NotFound}
              alt="Page Not Found"
              className="w-full object-contain mix-blend-multiply"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/seed/koda404/600/400";
              }}
            />
          </div>

          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 mb-4 tracking-tighter">
            Page Not Found.
          </h1>

          <p className="text-lg font-medium text-zinc-500 mb-10 leading-relaxed max-w-md">
            Sorry, we couldn't find the page you were looking for. It might have been removed, renamed, or did not exist in the first place.
          </p>

          <Link to="/">
            <Button variant="primary" className="px-10">
              Return Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;