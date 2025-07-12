import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimoni" className="py-16 bg-white">
      {/* Structured Data for Reviews */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "Organization",
            "name": "Toyota Cimahi"
          },
          "review": testimonials.map((testimonial) => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": testimonial.name
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": testimonial.stars,
              "bestRating": "5"
            },
            "reviewBody": testimonial.text,
            "itemReviewed": {
              "@type": "Product",
              "name": testimonial.car
            }
          }))
        })}
      </script>
      <div className="container px-4 mx-auto">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">Apa Kata Pelanggan Toyota Cimahi?</h2>
        <p className="mb-12 text-base text-center text-gray-600">Ulasan asli dari pelanggan yang puas di dealer resmi Toyota Cimahi</p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="p-6 transition-shadow duration-300 shadow-lg bg-gray-50 rounded-3xl hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`Avatar ${testimonial.name}, pelanggan Toyota Cimahi`} 
                  className="w-12 h-12 mr-4 rounded-full"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.car}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                ))}
              </div>
              
              <p className="mb-4 italic text-gray-700">"{testimonial.text}"</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Pembelian Terverifikasi</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.div 
            className="inline-flex items-center px-6 py-3 space-x-4 rounded-full bg-green-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-green-800">4.9/5 dari 500+ ulasan di Toyota Cimahi</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;