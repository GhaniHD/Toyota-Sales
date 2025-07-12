import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaWhatsapp } from 'react-icons/fa';

const CatalogSection = ({ catalogByType, carTypes, salesInfo }) => {
  const [selectedType, setSelectedType] = React.useState('All');
  const navigate = useNavigate();

  const allCars = selectedType === 'All' 
    ? Object.values(catalogByType).flat()
    : catalogByType[selectedType] || [];
  
  const filteredTypes = selectedType === 'All' ? ['All'] : [selectedType];

  const handleDetailClick = (carId) => {
    const car = allCars.find(c => c.id === carId) || catalogByType[selectedType].find(c => c.id === carId);
    navigate(`/products/${carId}`, { state: { car } });
  };

  const handleContactClick = (e, car) => {
    e.stopPropagation();
    window.open(`https://wa.me/${salesInfo.phone}?text=Halo%20${salesInfo.name},%20saya%20tertarik%20dengan%20${car.name}%20${car.variant}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catalog" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Structured Data for Products */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": allCars.map((car, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": `${car.name} ${car.variant}`,
              "image": car.image,
              "description": car.description,
              "url": `https://websitekamu.com/products/${car.id}`,
              "offers": {
                "@type": "Offer",
                "price": car.price,
                "priceCurrency": "IDR",
                "availability": "http://schema.org/InStock"
              }
            }
          }))
        })}
      </script>
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl leading-tight font-extrabold text-red-500">
            Katalog Mobil Toyota Cimahi
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 font-medium mb-8 md:mb-12 px-4">
            Temukan model Toyota terbaik untuk kebutuhan Anda di dealer resmi Toyota Cimahi
          </p>
        </div>

        <div className="mb-8 md:mb-12 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2">
          <motion.button
            className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
              selectedType === 'All'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedType('All')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Lihat semua tipe mobil"
          >
            Semua Tipe
          </motion.button>
          {carTypes.map(type => (
            <motion.button
              key={type}
              className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                selectedType === type
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Lihat mobil tipe ${type}`}
            >
              {type}
            </motion.button>
          ))}
        </div>

        {filteredTypes.map(type => (
          <div key={type} className="mb-12 md:mb-16">
            {type !== 'All' && (
              <h3 className="relative mb-6 md:mb-10 text-2xl md:text-3xl font-extrabold text-gray-900 px-4">
                {type}
                <div className="absolute left-4 md:left-0 w-16 md:w-24 h-1 sm:h-1.5 rounded-full -bottom-2 md:-bottom-3 bg-gradient-to-r from-red-600 to-red-700"></div>
              </h3>
            )}
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
              {(type === 'All' ? allCars : catalogByType[type]).map((car, index) => (
                <motion.div 
                  key={car.id}
                  className="relative overflow-hidden transition-all duration-500 bg-white shadow-lg group rounded-xl md:rounded-2xl hover:shadow-xl md:hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-100/50 group-hover:opacity-100"></div>
                  
                  <div className="relative">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl md:rounded-t-2xl">
                      <img 
                        src={car.image} 
                        alt={`${car.name} ${car.variant} di Toyota Cimahi`} 
                        className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105" 
                        loading="lazy"
                      />
                      <div className="absolute px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm">
                        <span className="text-xs font-bold text-gray-700">OTR</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-4 sm:p-5 md:p-6">
                    <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                      {car.name} <span className="font-normal text-gray-600 text-sm sm:text-base">{car.variant}</span>
                    </h3>
                    
                    <div className="p-3 sm:p-4 mb-4 sm:mb-6 border border-red-100 bg-gradient-to-r from-red-50/80 to-red-100/80 rounded-lg sm:rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Harga OTR</span>
                        <span className="text-base sm:text-lg font-bold text-red-600">{car.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-nowrap gap-2">
                      <motion.button
                        onClick={() => handleDetailClick(car.id)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex-1"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label={`Lihat detail ${car.name} ${car.variant}`}
                      >
                        <FaInfoCircle className="text-xs sm:text-sm" />
                        <span className="truncate">Detail</span>
                      </motion.button>
                      <motion.a
                        href={`https://wa.me/${salesInfo.phone}?text=Halo%20${salesInfo.name},%20saya%20tertarik%20dengan%20${car.name}%20${car.variant}`}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex-1"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={`Hubungi via WhatsApp untuk ${car.name} ${car.variant}`}
                      >
                        <FaWhatsapp className="text-xs sm:text-sm" />
                        <span className="truncate">WhatsApp</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatalogSection;