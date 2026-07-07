# Toyota Sales — Landing Page Multi-Website

Landing page penjualan mobil Toyota untuk sales/dealer, dibangun dengan
**React 18 + Vite + Tailwind CSS**. Mendukung **multi-website (multi-domain)**
dari satu codebase yang sama — konten (profil sales, katalog mobil, promo,
testimonial, FAQ) diambil dari backend berdasarkan domain yang mengakses
halaman, dan bisa dikelola lewat Admin Panel bawaan.

## Fitur

- **Landing page publik**
  - Hero section, profil sales (`SalesProfile`), dan info kontak.
  - Katalog mobil (`CatalogSection`) dengan halaman detail per mobil
    (`/products/:slug`).
  - Simulasi kredit (`CreditCalculator`) dan perbandingan metode pembayaran
    tunai vs kredit (`PaymentSection`).
  - Promo aktif (`PromoBanner`, `PromoSection`), testimonial pelanggan, dan
    FAQ.
  - Lokasi dealer di peta interaktif (`DealerMap`, via Leaflet).
  - Halaman kebijakan privasi (`/privacy-policy`).
- **Multi-website (multi-tenant) berbasis domain**
  - Saat halaman dibuka, frontend mendeteksi `window.location.hostname` dan
    memanggil backend untuk mencari `website_id` yang cocok dengan domain
    tersebut. Semua data (sales info, katalog mobil, testimonial, FAQ) lalu
    diambil khusus untuk `website_id` itu — sehingga satu build frontend bisa
    dipakai di banyak domain/sales dengan konten yang berbeda-beda.
- **Admin Panel** (`/admin`, `/admin/websites`, `/admin/sales_info`,
  `/admin/cars`, `/admin/testimonials`, `/admin/faqs`, `/admin/admins`)
  - Login admin (JWT, disimpan di `localStorage`).
  - CRUD penuh untuk: daftar website/domain, info sales per website, mobil
    (katalog), testimonial, FAQ, dan akun admin lain.
  - Dilindungi `ErrorBoundary` per route agar error di satu section admin
    tidak menjatuhkan seluruh panel.

## Tech Stack

- **Framework**: React 18 + Vite 7
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS 3
- **HTTP client**: Axios (dengan interceptor auto-attach JWT dari
  `localStorage`)
- **Peta**: React Leaflet
- **Lainnya**: Framer Motion (animasi), React Icons / lucide-react (ikon),
  React Helmet & React Helmet Async (SEO/meta tag per halaman), React GA
  (Google Analytics), React Intersection Observer

## Struktur Proyek

```
src/
  api.js                 semua pemanggilan API backend (axios + JWT interceptor)
  App.jsx                routing (halaman publik + admin)
  components/
    Header.jsx, Hero.jsx, Footer.jsx        layout & landing sections
    CatalogSection.jsx, ProductDetail.jsx   katalog & detail mobil
    SalesProfile.jsx                        profil sales
    PaymentSection.jsx, CreditCalculator.jsx pembayaran & simulasi kredit
    PromoBanner.jsx, PromoSection.jsx       promo
    Testimonials.jsx, FAQSection.jsx        testimonial & FAQ
    DealerMap.jsx                           peta lokasi dealer
    CTASection.jsx                          call-to-action
    ErrorBoundary.jsx                       error boundary untuk route admin
  pages/
    Home.jsx                landing page utama (resolve website_id dari domain)
    ProductDetail.jsx       (re-export komponen ProductDetail sebagai halaman)
    AdminPanel.jsx           admin panel (login + CRUD semua resource)
    PrivacyPolicy.jsx       halaman kebijakan privasi
  utils/
    imageUrl.js             helper resolusi URL gambar dari backend
public/
  images/                  aset gambar statis (logo, foto mobil, promo)
```

## Menjalankan Proyek

Proyek ini adalah **frontend saja** — butuh backend API terpisah yang
menyediakan endpoint di bawah `VITE_API_URL`.

```bash
npm install
```

Buat file `.env` di root:

```env
VITE_API_URL=http://localhost:5000/api
```

Jalankan mode development:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
npm run preview   # preview hasil build secara lokal
```

## Environment Variable

| Variabel | Keterangan |
| --- | --- |
| `VITE_API_URL` | Base URL backend API. Semua request (`getWebsites`, `getCars`, `loginAdmin`, dll di `src/api.js`) memakai variabel ini. |

## Endpoint Backend yang Digunakan

Semua dipanggil lewat `src/api.js`, dengan JWT otomatis disisipkan di header
`Authorization` untuk request yang butuh login (kecuali `/admin/login`):

| Resource | Endpoint |
| --- | --- |
| Auth admin | `POST /admin/login` |
| Website (domain) | `GET/POST/PUT/DELETE /websites` |
| Info sales | `GET/POST/PUT/DELETE /sales_info` |
| Mobil (katalog) | `GET/POST/PUT/DELETE /cars` |
| Testimonial | `GET/POST/PUT/DELETE /testimonials` |
| FAQ | `GET/POST/PUT/DELETE /faqs` |
| Admin | `GET/POST/PUT/DELETE /admins` |

Sebagian besar endpoint `GET` menerima parameter `website_id` (atau `domain`
untuk `/websites`) untuk memfilter data sesuai website/domain yang sedang
diakses.

## Catatan

- Routing multi-domain bergantung pada data `website` yang cocok dengan
  `window.location.hostname` di backend; saat development di
  `localhost`, aplikasi fallback ke `website_id = 1` jika tidak ditemukan
  kecocokan domain.
- Deployment: proyek sudah menyertakan `public/_redirects` (kompatibel dengan
  hosting seperti Netlify/Vercel) untuk menangani client-side routing React
  Router.