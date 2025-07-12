import { motion } from 'framer-motion';
import { Phone, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Hero = ({ salesInfo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const backgroundImages = [
    {
      url: '/images/innova-zenix.jpg',
      mobileUrl: '/images/innova-zenix.jpg',
      title: 'All New Kijang Innova Zenix',
      subtitle: 'MPV Hybrid Keluarga',
      alt: 'Toyota Kijang Innova Zenix di Toyota Cimahi'
    },
    {
      url: '/images/yaris-cross.jpg',
      mobileUrl: '/images/yaris-cross.jpg',
      title: 'Yaris Cross',
      subtitle: 'SUV Kompak Hybrid',
      alt: 'Toyota Yaris Cross di Toyota Cimahi'
    },
    {
      url: '/images/avanza.jpg',
      mobileUrl: '/images/avanza.jpg',
      title: 'All New Avanza',
      subtitle: 'MPV Favorit Keluarga',
      alt: 'Toyota Avanza di Toyota Cimahi'
    },
    {
      url: '/images/fortuner.jpg',
      mobileUrl: '/images/fortuner.jpg',
      title: 'All New Fortuner',
      subtitle: 'SUV Premium',
      alt: 'Toyota Fortuner di Toyota Cimahi'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden min-h-screen flex items-center">
      {/* Structured Data for Carousel */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": backgroundImages.map((image, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": image.title,
              "image": image.url,
              "description": image.subtitle
            }
          }))
        })}
      </script>

      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent opacity-80 md:bg-gradient-to-b md:from-black/60 md:via-black/40 md:to-black/80"></div>
        
        {/* Navigation Arrows - Responsif */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-10 flex space-x-2 sm:space-x-4">
          <motion.button
            onClick={prevSlide}
            className="text-white bg-gradient-to-r from-red-500 to-red-700 p-2 sm:p-3 lg:p-5 rounded-full shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="text-white bg-gradient-to-r from-red-500 to-red-700 p-2 sm:p-3 lg:p-5 rounded-full shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
          </motion.button>
        </div>
        
        {/* Slide Indicators - Responsif */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 sm:space-x-3">
          {backgroundImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative w-8 h-2 sm:w-10 sm:h-2 lg:w-12 lg:h-3 rounded-full transition-all duration-300 shadow-sm ${
                index === currentSlide ? 'bg-red-500' : 'bg-white/40'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-white/50 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-20 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 lg:flex-row">
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Dynamic Title Based on Current Slide */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-white bg-red-500 rounded-full">
                {backgroundImages[currentSlide].subtitle}
              </span>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-red-400 mb-2">
                {backgroundImages[currentSlide].title}
              </h2>
            </motion.div>

            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-tight tracking-tight transition duration-300 text-white">
              Wujudkan <span className="text-red-500">Mimpi</span> Anda Bersama Toyota Cimahi
            </h1>
            <p className="max-w-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg xl:text-xl text-gray-200 lg:mx-0 mx-auto">
              Temukan mobil Toyota impian Anda di Cimahi, Bandung! Dapatkan penawaran eksklusif, kredit ringan, dan pelayanan terbaik dari dealer resmi Toyota.
            </p>
            
            {/* Features List - Responsif */}
            <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-lg lg:mx-0 mx-auto">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">Teknologi Hybrid</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">Efisiensi Bahan Bakar</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">Fitur Keselamatan</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">Desain Modern</span>
              </div>
            </div>
            
            {/* Buttons - Responsif */}
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center lg:justify-start">
              <motion.a 
                href={`https://wa.me/${salesInfo?.phone || '6281234567890'}?text=Halo%20${salesInfo?.name || 'Sales'},%20saya%20ingin%20info%20promo%20Toyota%20di%20Cimahi`} 
                className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-x-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 rounded-full shadow-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                rel="nofollow"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Hubungi Dealer Cimahi</span>
              </motion.a>
              <motion.a 
                href="#catalog" 
                className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-x-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 border-2 border-white rounded-full shadow-lg hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Lihat Model Toyota</span>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Image Section - Hanya tampil di tablet dan desktop */}
          <motion.div 
            className="hidden lg:block lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <motion.img 
                key={currentSlide}
                src={backgroundImages[currentSlide].url} 
                alt={backgroundImages[currentSlide].alt}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold">{backgroundImages[currentSlide].title}</h3>
                <p className="text-xs sm:text-sm opacity-80">{backgroundImages[currentSlide].subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Particles Effect - Responsif */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-8 sm:left-12 lg:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-16 sm:right-24 lg:right-32 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-24 sm:bottom-32 left-8 sm:left-12 lg:left-16 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-12 lg:right-20 w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;