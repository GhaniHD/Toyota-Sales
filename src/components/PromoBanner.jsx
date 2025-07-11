// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="py-4 text-center bg-amber-400">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="flex items-center justify-center space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="w-6 h-6 text-amber-900" />
          <p className="text-lg font-semibold text-amber-900">
            🎉 Promo Eksklusif! Diskon hingga Rp 30 Juta + DP 0% untuk 100 pembeli pertama!
          </p>
          <Zap className="w-6 h-6 text-amber-900" />
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;