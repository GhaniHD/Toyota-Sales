import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="py-4 text-center bg-amber-400">
      {/* Structured Data for SaleEvent */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SaleEvent",
          "name": "Promo Eksklusif Toyota Cimahi",
          "description": "Diskon hingga Rp 30 Juta + DP 0% untuk 100 pembeli pertama di Toyota Cimahi",
          "startDate": "2025-07-12",
          "endDate": "2025-12-31",
          "url": "https://websitekamu.com/#promo",
          "organizer": {
            "@type": "Organization",
            "name": "Toyota Cimahi",
            "url": "https://websitekamu.com"
          }
        })}
      </script>
      <div className="container px-4 mx-auto">
        <motion.div 
          className="flex items-center justify-center space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="w-6 h-6 text-amber-900" />
          <h2 className="text-lg font-semibold text-amber-900">
            🎉 Promo Eksklusif! Diskon hingga Rp 30 Juta + DP 0% untuk 100 pembeli pertama!{' '}
            <a href="#promo" className="underline hover:text-amber-700">
              Lihat Detail
            </a>
          </h2>
          <Zap className="w-6 h-6 text-amber-900" />
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;