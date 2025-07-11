import { Car, Phone, MapPin, Clock } from 'lucide-react';

const Footer = ({ salesInfo }) => {
  return (
    <footer className="py-12 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Car className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold">Toyota Elite</h3>
            </div>
            <p className="mb-4 text-gray-300">
              Dealer resmi Toyota dengan pengalaman lebih dari 10 tahun melayani kebutuhan otomotif Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">YouTube</a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Produk</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Toyota Avanza</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Toyota Rush</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Toyota Innova</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Toyota Fortuner</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Kredit Mobil</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Tukar Tambah</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Test Drive</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">After Sales</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Kontak</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{salesInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{salesInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Senin - Sabtu: 08.00 - 17.00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>© {new Date().getFullYear()} Toyota Elite - {salesInfo.name}. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm">Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;