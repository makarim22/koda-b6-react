# My App - Frontend

Aplikasi frontend e-commerce modern yang dibangun dengan React, Redux, dan Tailwind CSS. Aplikasi ini menyediakan pengalaman berbelanja yang lengkap dengan fitur autentikasi, manajemen keranjang, pemesanan, dan dashboard admin.

## 🚀 Teknologi yang Digunakan

- **React** (v19.2.0) - Library UI
- **Redux & Redux Toolkit** (v2.11.2) - State management
- **React Router DOM** (v7.13.0) - Routing
- **Tailwind CSS** (v4.1.18) - Styling
- **Vite** (v7.2.4) - Build tool & dev server
- **React Hook Form** (v7.71.1) - Form management
- **Recharts** (v3.8.1) - Data visualization
- **Lucide React** (v0.563.0) - Icon library
- **React Modal** (v3.16.3) - Modal components

## 📋 Fitur Utama

### User Features
- **Autentikasi**: Login, Register, Forgot Password, Reset Password
- **Homepage**: Halaman beranda dengan produk unggulan
- **Produk**: Melihat daftar produk, detail produk, review produk
- **Chat**: Fitur chat dengan support/admin
- **Keranjang**: Manajemen keranjang belanja
- **Checkout**: Proses pembelian produk
- **Order History**: Melihat riwayat pemesanan
- **Profile**: Manajemen profil pengguna

### Admin Features
- **Dashboard**: Overview statistik penjualan
- **Manajemen Produk**: Tambah, edit, hapus produk
- **Manajemen Pesanan**: Kelola semua pesanan
- **Manajemen Pengguna**: Lihat dan kelola data pengguna

## 📁 Struktur Folder

```
my-app/
├── src/
│   ├── pages/               # Halaman-halaman aplikasi
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── ProductReview.jsx
│   │   ├── HistoryOrder.jsx
│   │   ├── DetailOrder.jsx
│   │   ├── ProductCheckout.jsx
│   │   ├── Profile.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ListProducts.jsx
│   │   ├── ListOrders.jsx
│   │   ├── ListUsers.jsx
│   │   └── NotFoundPage.jsx
│   ├── component/           # Komponen reusable
│   │   └── ProtectedRoutes.jsx
│   ├── context/             # Context API
│   │   └── CartContext.jsx
│   ├── features/            # Redux slices
│   │   └── user/
│   │       └── authSlice.js
│   ├── utils/               # Utility functions
│   │   └── scrollRestoration.js
│   ├── App.jsx              # Root component dengan routing
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Instalasi & Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat file `.env` (jika diperlukan)**
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`

## 📜 Scripts yang Tersedia

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔐 Sistem Autentikasi & Proteksi Rute

Aplikasi menggunakan `ProtectedRoute` dan `AdminRoute` untuk mengamankan akses:

- **ProtectedRoute**: Hanya user yang sudah login yang bisa mengakses
- **AdminRoute**: Hanya user dengan role admin yang bisa mengakses dashboard admin

Fitur autentikasi di-initialize saat aplikasi pertama kali dimuat melalui Redux (`authSlice`).

## 🎯 Rute Aplikasi

### Public Routes
- `/login` - Halaman login
- `/register` - Halaman register
- `/forgot-password` - Lupa password
- `/reset-password` - Reset password

### Protected User Routes
- `/` - Homepage
- `/product` - Daftar produk
- `/product-review` - Review produk
- `/product-review/:productId` - Detail review produk
- `/chat` - Chat dengan support
- `/product-checkout` - Checkout produk
- `/product-checkout/:productId` - Checkout produk spesifik
- `/order-history` - Riwayat pesanan
- `/detail-order/:id` - Detail pesanan
- `/profile` - Profil pengguna

### Admin Routes
- `/admin-dashboard` - Dashboard admin
- `/admin-products` - Manajemen produk
- `/admin-orders` - Manajemen pesanan
- `/admin-users` - Manajemen pengguna

## 🧩 State Management (Redux)

Aplikasi menggunakan Redux Toolkit untuk state management:

- **authSlice**: Mengelola state autentikasi dan user
- **CartContext**: Mengelola state keranjang belanja

## 🎨 Styling

Styling menggunakan **Tailwind CSS** untuk utility-first CSS framework yang memudahkan pembuatan UI yang responsif dan modern.

## 🚢 Deployment

### Build untuk Production
```bash
npm run build
```

Output akan tersimpan di folder `dist/`. Deploy folder ini ke hosting pilihan Anda (Vercel, Netlify, GitHub Pages, dll).

### Environment Variables untuk Production
Pastikan environment variables sudah dikonfigurasi di hosting Anda sesuai dengan backend API.

## 📝 Catatan Pengembangan

- Pastikan backend API sudah berjalan sebelum menjalankan frontend
- Sesuaikan `VITE_API_URL` dengan endpoint backend Anda
- Untuk development, gunakan `npm run dev`
- Jalankan linting sebelum commit: `npm run lint`

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License.

## 📞 Kontak & Support

Jika ada pertanyaan atau butuh bantuan, silakan buka issue di repository ini.

---

**Happy Coding! 🎉**
