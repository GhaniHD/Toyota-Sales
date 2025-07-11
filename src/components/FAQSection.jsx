// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const FAQSection = ({ faqs }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">Pertanyaan Umum</h2>
        <p className="mb-12 text-base text-center text-gray-600">Jawaban atas pertanyaan Anda tentang pembelian Toyota</p>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-white shadow-md rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-lg font-bold text-gray-900">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;