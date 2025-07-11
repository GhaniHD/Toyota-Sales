import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Calculator } from 'lucide-react';

const CreditCalculator = ({ salesInfo }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">Kalkulator Kredit</h2>
        <p className="mb-12 text-base text-center text-gray-600">Simulasikan cicilan mobil Toyota Anda dengan mudah</p>
        
        <motion.div 
          className="max-w-3xl p-8 mx-auto bg-white shadow-xl rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xl font-bold text-gray-900">Simulasi Kredit Toyota</h3>
              <div className="space-y-4">
                {[
                  { car: "Avanza Veloz", price: "Rp 3.5 jt/bln", color: "bg-red-50 text-red-600" },
                  { car: "Rush TRD", price: "Rp 4.2 jt/bln", color: "bg-blue-50 text-blue-600" },
                  { car: "Innova G", price: "Rp 5.2 jt/bln", color: "bg-green-50 text-green-600" },
                  { car: "Fortuner VRZ", price: "Rp 8.5 jt/bln", color: "bg-purple-50 text-purple-600" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`flex justify-between items-center p-4 ${item.color} rounded-lg`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="text-gray-700">{item.car}</span>
                    <span className="font-bold">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-6 text-xl font-bold text-gray-900">Syarat Kredit</h3>
              <div className="space-y-3">
                {[
                  "KTP & KK",
                  "Slip gaji 3 bulan terakhir",
                  "Rekening koran 3 bulan",
                  "NPWP",
                  "Akta nikah (jika sudah menikah)"
                ].map((req, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{req}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="p-4 mt-6 border rounded-lg bg-amber-50 border-amber-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <p className="text-sm text-amber-800">
                  <strong>💡 Tips:</strong> Untuk wiraswasta, siapkan juga surat keterangan usaha dan laporan keuangan
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <motion.a 
              href={`https://wa.me/${salesInfo.phone}?text=Halo%20${salesInfo.name},%20saya%20ingin%20simulasi%20kredit%20Toyota`} 
              className="inline-flex items-center px-8 py-3 space-x-2 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-full hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="w-5 h-5" />
              <span>Hitung Cicilan Saya</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreditCalculator;