import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft, FaCar, FaGasPump, FaUsers, FaCogs, FaInfoCircle } from 'react-icons/fa';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const car = state?.car;

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Produk tidak ditemukan</p>
      </div>
    );
  }

  const specifications = [
    { icon: <FaCar className="text-red-600" />, label: 'Tipe', value: car.type },
    { icon: <FaGasPump className="text-red-600" />, label: 'Bahan Bakar', value: car.specs.fuelType || 'Bensin' },
    { icon: <FaUsers className="text-red-600" />, label: 'Kapasitas', value: car.specs.capacity || '7 Orang' },
    { icon: <FaCogs className="text-red-600" />, label: 'Transmisi', value: car.specs.transmission || 'Automatic' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Metadata Dinamis */}
      <Helmet>
        <title>{`${car.name} ${car.variant} - Toyota Cimahi`}</title>
        <meta
          name="description"
          content={`Dapatkan ${car.name} ${car.variant} di Toyota Cimahi dengan harga ${car.price}. Lihat spesifikasi, fitur, dan promo eksklusif!`}
        />
        <meta
          name="keywords"
          content={`${car.name}, ${car.variant}, Toyota Cimahi, dealer Toyota, mobil Toyota, harga ${car.name}, promo Toyota`}
        />
        <meta property="og:title" content={`${car.name} ${car.variant} - Toyota Cimahi`} />
        <meta
          property="og:description"
          content={`Dapatkan ${car.name} ${car.variant} di Toyota Cimahi dengan harga ${car.price}. Lihat spesifikasi, fitur, dan promo eksklusif!`}
        />
        <meta property="og:image" content={car.image} />
        <meta property="og:url" content={`https://websitekamu.com/products/${car.id}`} />
        <meta property="og:type" content="product" />
      </Helmet>

      {/* Structured Data for Product */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": `${car.name} ${car.variant}`,
          "image": car.image,
          "description": car.description,
          "url": `https://websitekamu.com/products/${car.id}`,
          "offers": {
            "@type": "Offer",
            "price": car.price,
            "priceCurrency": "IDR",
            "availability": "http://schema.org/InStock",
            "validThrough": car.validUntil || "2025-12-31"
          }
        })}
      </script>

      {/* Breadcrumb */}
      <nav className="fixed top-4 left-4 z-10 flex items-center gap-2">
        <motion.button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Kembali ke halaman sebelumnya"
        >
          <FaArrowLeft />
          <span>Kembali</span>
        </motion.button>
        <div className="text-sm text-gray-600">
          <a href="/" className="hover:underline">Beranda</a> &gt; 
          <a href="#catalog" className="hover:underline">Katalog</a> &gt; 
          <span>{car.name} {car.variant}</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-200 flex items-center justify-center h-80 md:h-[38rem]">
              <img 
                src={car.image} 
                alt={`${car.name} ${car.variant} di Toyota Cimahi`}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {car.name} <span className="text-gray-600 font-normal">{car.variant}</span>
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  {car.type}
                </span>
                <span className="text-gray-500 text-sm">Kode: {car.id}</span>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-3">Deskripsi Produk</h3>
                <p className="text-gray-700">{car.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Fitur Utama</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 text-red-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Spesifikasi Teknis</h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-lg">{spec.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{spec.label}</p>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={`https://wa.me/${car.salesInfo?.phone || '6281234567890'}?text=Halo,%20saya%20tertarik%20dengan%20${car.name}%20${car.variant}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={`Hubungi via WhatsApp untuk ${car.name} ${car.variant}`}
                >
                  <FaWhatsapp className="text-sm" />
                  <span className="truncate">WhatsApp</span>
                </motion.a>
                <motion.button
                  onClick={() => alert('Test drive scheduled!')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Jadwalkan test drive untuk ${car.name} ${car.variant}`}
                >
                  <FaInfoCircle className="text-sm" />
                  <span className="truncate">Test Drive</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;