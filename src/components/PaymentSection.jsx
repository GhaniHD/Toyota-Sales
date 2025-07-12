import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Phone } from 'lucide-react';

const PaymentSection = ({ paymentMethods, activeTab, setActiveTab, salesInfo }) => {
  return (
    <section id="payment" className="py-16 bg-white">
      {/* Structured Data for Payment Methods */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": paymentMethods.map((method, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "PaymentMethod",
              "name": method.title,
              "description": method.benefits.join(", ")
            }
          }))
        })}
      </script>
      <div className="container px-4 mx-auto">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">Metode Pembayaran Toyota Cimahi</h2>
        <p className="mb-12 text-base text-center text-gray-600">Pilih opsi pembayaran yang sesuai dengan kebutuhan Anda di dealer resmi Toyota Cimahi</p>
        
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-full">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === method.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-red-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Pilih metode pembayaran ${method.title}`}
              >
                {method.title}
              </motion.button>
            ))}
          </div>
        </div>
        
        <AnimatePresence>
          {paymentMethods.map((method) => (
            activeTab === method.id && (
              <motion.div 
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="p-8 shadow-xl bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 text-white bg-red-600 rounded-full">
                      {method.icon()}
                    </div>
                  </div>
                  
                  <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">{method.title}</h3>
                  
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">✨ Keuntungan</h4>
                      <ul className="space-y-3">
                        {method.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">📋 Proses</h4>
                      <ol className="space-y-3">
                        {method.process.map((step, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-red-600 rounded-full">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <motion.a 
                      href={`https://wa.me/${salesInfo.phone}?text=Halo%20${salesInfo.name},%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20${method.title}%20di%20Toyota%20Cimahi`} 
                      className="inline-flex items-center px-8 py-3 space-x-2 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-full hover:bg-red-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      aria-label={`Konsultasi ${method.title} via WhatsApp`}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Konsultasi {method.title}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PaymentSection;