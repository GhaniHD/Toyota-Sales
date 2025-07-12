import React from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle } from 'lucide-react';

const CTASection = ({ salesInfo }) => {
  return (
    <section className="py-16 text-white bg-gradient-to-r from-red-600 to-rose-700">
      {/* Structured Data for CTA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CallToAction",
          "name": "Konsultasi Toyota Cimahi",
          "description": "Dapatkan konsultasi gratis dan penawaran eksklusif untuk mobil Toyota di Cimahi",
          "url": "https://websitekamu.com/#cta"
        })}
      </script>
      <div className="container px-4 mx-auto text-center">
        <motion.h2 
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Wujudkan Toyota Impian Anda di Cimahi Sekarang!
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto mb-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Dapatkan konsultasi gratis dan penawaran eksklusif untuk mobil Toyota pilihan Anda di dealer resmi Cimahi.
        </motion.p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a 
            href={`https://wa.me/${salesInfo.phone}?text=Halo%20${salesInfo.name},%20saya%20ingin%20konsultasi%20dan%20penawaran%20terbaik%20Toyota%20di%20Cimahi`} 
            className="flex items-center px-8 py-3 space-x-2 font-semibold text-white transition-all duration-300 bg-green-500 rounded-full hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
          >
            <Phone className="w-5 h-5" />
            <span>Konsultasi Gratis Sekarang</span>
          </motion.a>
          
          <motion.a 
            href={`tel:${salesInfo.phone}`} 
            className="flex items-center px-8 py-3 space-x-2 font-semibold text-red-600 transition-all duration-300 bg-white rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            rel="nofollow"
            aria-label="Telepon langsung"
          >
            <Phone className="w-5 h-5" />
            <span>Telepon Langsung</span>
          </motion.a>
        </div>
        
        <motion.div 
          className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            "Konsultasi Gratis",
            "Proses Cepat",
            "Harga Terbaik"
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;