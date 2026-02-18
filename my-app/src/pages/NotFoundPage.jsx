import React from 'react';
import NotFound from '../assets/404_2.jpg'; 

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto">
        <img
          src={NotFound}
          alt="Halaman Tidak Ditemukan"
          className="mx-auto mb-8 w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          404 - Halaman Tidak Ditemukan
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dihapus, dipindahkan, atau alamatnya salah ketik.
        </p>

        <a
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;