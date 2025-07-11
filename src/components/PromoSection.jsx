// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const PromoSection = ({ salesInfo }) => {
  const promos = [
    {
      id: 1,
      name: "Innova Reborn",
      image: "/images/promo.jpg",
      discount: "Baru",
      description: "Angsuran RP 6.50.000/bulan",
      whatsappText: `Halo ${salesInfo.name}, saya tertarik dengan Innova Reborn`
    },
    {
      id: 2,
      name: "Hilux",
      image: "/images/promo.jpg",
      discount: "Baru",
      description: "Angsuran RP 6.50.000/bulan",
      whatsappText: `Halo ${salesInfo.name}, saya tertarik dengan Hilux`
    },
    {
      id: 3,
      name: "Avanza",
      image: "/images/promo.jpg",
      discount: "Baru",
      description: "Angsuran RP 4.50.000/bulan",
      whatsappText: `Halo ${salesInfo.name}, saya tertarik dengan Avanza`
    },
    {
      id: 4,
      name: "Calya",
      image: "/images/promo.jpg",
      discount: "Baru",
      description: "Angsuran RP 3.50.000/bulan",
      whatsappText: `Halo ${salesInfo.name}, saya tertarik dengan Calya`
    }
  ];

  return (
    <section id="promo" className="py-12 bg-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="mb-3 text-3xl font-bold text-center text-white">Promo Spesial</h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promos.map((promo, index) => (
            <motion.div 
              key={promo.id}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={promo.image} 
                alt={promo.name} 
                className="object-cover w-full h-96 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-50">
                <motion.a 
                  href={`https://wa.me/${salesInfo.phone}?text=${encodeURIComponent(promo.whatsappText)}`} 
                  className="px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Klik Disini
                </motion.a>
              </div>
              <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full top-4 left-4">
                {promo.discount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;