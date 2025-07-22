import { useEffect } from 'react';
import { Phone, Clock, Car, Award, Users, Instagram } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

const SalesProfile = ({ salesInfo }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Sales Info details:', JSON.stringify(salesInfo, null, 2));
    console.log('Image URL used:', `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${salesInfo?.image_url || defaultSalesInfo.image_url}`);
  }, [controls, inView, salesInfo]);

  const defaultSalesInfo = {
    name: "Rifki",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    phone: "+6281234567890",
    experience: "10+ Tahun",
    soldCount: "500+ Unit",
    instagram_url: "https://www.instagram.com/rifki_sales_toyota",
    tiktok_url: "https://www.tiktok.com/@rifki_sales_toyota"
  };

  const data = { ...defaultSalesInfo, ...salesInfo };

  const handleNavigation = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.section 
      id="sales-profile"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-8 sm:py-16 bg-white"
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name,
          "jobTitle": "Sales Consultant Toyota Cimahi",
          "telephone": data.phone,
          "image": `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${data.image_url || defaultSalesInfo.image_url}`,
          "url": "https://websitekamu.com/#sales-profile",
          "sameAs": [data.instagram_url || defaultSalesInfo.instagram_url, data.tiktok_url || defaultSalesInfo.tiktok_url],
          "worksFor": {
            "@type": "Organization",
            "name": "Toyota Cimahi",
            "url": "https://websitekamu.com"
          }
        })}
      </script>
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.h2 
          variants={itemVariants}
          className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold text-center text-gray-900"
        >
          Sales Profesional Toyota Cimahi
        </motion.h2>
  
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          variants={cardVariants}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap

-6 sm:gap-8">
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-1/4 flex justify-center"
            >
              <img 
                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${data.image_url || defaultSalesInfo.image_url}`}
                alt={`Profil ${data.name}, Sales Toyota Cimahi`} 
                className="w-64 sm:w-80 h-80 sm:h-96 object-cover rounded-2xl shadow-md"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load, using fallback:', defaultSalesInfo.image_url);
                  e.target.src = defaultSalesInfo.image_url;
                }}
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-2/4 text-center lg:text-left"
            >
              <div className="mb-6">
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed"
                >
                  Informasi pemesanan unit/mobil Toyota secara Tunai maupun Kredit di Cimahi, Bandung, silahkan hubungi kontak saya di bawah ini. Dapatkan promo menarik dan pelayanan terbaik!
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="w-16 h-1 bg-red-500 mb-4 mx-auto lg:mx-0"
                />
                
                <motion.h3 
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                >
                  {data.name}
                </motion.h3>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-center lg:justify-start mb-6"
                >
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-green-500" />
                  <motion.a
                    href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`}
                    className="text-green-600 font-semibold text-base sm:text-lg hover:underline"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat with ${data.name} on WhatsApp`}
                  >
                    Phone/WA: {data.phone}
                  </motion.a>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
                >
                  <motion.a
                    href={data.instagram_url || defaultSalesInfo.instagram_url}
                    className="flex items-center px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md cursor-pointer focus:outline-none"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label={`Follow ${data.name} on Instagram`}
                    data-testid="instagram-button"
                  >
                    <Instagram className="w-6 h-6 mr-2" />
                    <span className="text-base font-medium">Instagram</span>
                  </motion.a>
                  
                  <motion.a
                    href={data.tiktok_url || defaultSalesInfo.tiktok_url}
                    className="flex items-center px-5 py-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-md cursor-pointer focus:outline-none"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label={`Follow ${data.name} on TikTok`}
                    data-testid="tiktok-button"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6 mr-2"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <span className="text-base font-medium">TikTok</span>
                  </motion.a>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
                >
                  <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  >
                    {[
                      { icon: <Clock className="w-8 h-8 mx-auto mb-2 text-gray-600" />, 
                        value: data.experience, label: "Pengalaman" },
                      { icon: <Car className="w-8 h-8 mx-auto mb-2 text-gray-600" />, 
                        value: data.soldCount, label: "Terjual" },
                      { icon: <Award className="w-8 h-8 mx-auto mb-2 text-gray-600" />, 
                        value: "Top Sales", label: "3 Tahun Berturut" },
                      { icon: <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />, 
                        value: "98%", label: "Kepuasan" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                        whileHover={{ y: -3 }}
                      >
                        {stat.icon}
                        <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-1/4 flex justify-center"
            >
              <div className="w-40 sm:w-48 h-40 sm:h-48 bg-white border-2 border-gray-200 rounded-2xl p-4 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center w-full h-full flex flex-col justify-center">
                    <img 
                      src="/images/barcode.png" 
                      alt={`QR Code WhatsApp ${data.name}, Sales Toyota Cimahi`} 
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                    />
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-2">Scan WhatsApp QR Code</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SalesProfile;