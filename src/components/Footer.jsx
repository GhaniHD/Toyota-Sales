import { Car, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ salesInfo, promoCars = [] }) => {
  const socialLinks = {
    facebook: "https://www.facebook.com/toyotacimahi",
    instagram: "https://www.instagram.com/toyotacimahi",
    youtube: "https://www.youtube.com/@toyotacimahi"
  };

  // Fallback data if promoCars is empty or undefined
  const defaultPromoCars = [
    { id: "avanza", name: "Avanza", variant: "Veloz" },
    { id: "rush", name: "Rush", variant: "TRD" },
    { id: "innova", name: "Innova", variant: "G" },
    { id: "fortuner", name: "Fortuner", variant: "VRZ" }
  ];

  const carsToDisplay = Array.isArray(promoCars) && promoCars.length > 0 ? promoCars : defaultPromoCars;

  return (
    <footer className="py-12 text-white bg-gray-800">
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Toyota Cimahi",
          "url": "https://websitekamu.com",
          "logo": "https://websitekamu.com/logo.webp",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": salesInfo.phone || "0812-2070-8018",
            "contactType": "Sales",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": salesInfo.location || "Jl. Raya Cimahi No.123",
            "addressLocality": "Cimahi",
            "addressRegion": "Jawa Barat",
            "postalCode": "40511",
            "addressCountry": "ID"
          },
          "sameAs": [
            socialLinks.facebook,
            socialLinks.instagram,
            socialLinks.youtube
          ]
        })}
      </script>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Car className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold">Toyota Cimahi</h3>
            </div>
            <p className="mb-4 text-gray-300">
              Dealer resmi Toyota di Cimahi, Bandung, dengan pengalaman lebih dari 10 tahun melayani kebutuhan otomotif Anda.
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.facebook} 
                className="text-gray-300 transition-colors duration-200 hover:text-white"
                rel="nofollow noopener noreferrer"
                target="_blank"
                aria-label="Ikuti Toyota Cimahi di Facebook"
              >
                Facebook
              </a>
              <a 
                href={socialLinks.instagram} 
                className="text-gray-300 transition-colors duration-200 hover:text-white"
                rel="nofollow noopener noreferrer"
                target="_blank"
                aria-label="Ikuti Toyota Cimahi di Instagram"
              >
                Instagram
              </a>
              <a 
                href={socialLinks.youtube} 
                className="text-gray-300 transition-colors duration-200 hover:text-white"
                rel="nofollow noopener noreferrer"
                target="_blank"
                aria-label="Ikuti Toyota Cimahi di YouTube"
              >
                YouTube
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Produk</h4>
            <ul className="space-y-2 text-gray-300">
              {carsToDisplay.slice(0, 4).map((car) => (
                <li key={car.id}>
                  <Link 
                    to={`/products/${car.id}`} 
                    state={{ car }}
                    className="transition-colors duration-200 hover:text-white"
                    aria-label={`Lihat detail ${car.name} ${car.variant} di Toyota Cimahi`}
                  >
                    {car.name} {car.variant}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="#credit-calculator" 
                  className="transition-colors duration-200 hover:text-white"
                  aria-label="Lihat simulasi kredit Toyota di Cimahi"
                >
                  Kredit Mobil
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="transition-colors duration-200 hover:text-white"
                  aria-label="Lihat informasi tukar tambah di Toyota Cimahi"
                >
                  Tukar Tambah
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="transition-colors duration-200 hover:text-white"
                  aria-label="Jadwalkan test drive di Toyota Cimahi"
                >
                  Test Drive
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="transition-colors duration-200 hover:text-white"
                  aria-label="Lihat layanan after sales di Toyota Cimahi"
                >
                  After Sales
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-bold">Kontak</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a 
                  href={`https://wa.me/${salesInfo.phone || '081220708018'}?text=Halo%20${salesInfo.name || 'Rifki'},%20saya%20ingin%20konsultasi%20Toyota%20di%20Cimahi`} 
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Hubungi Toyota Cimahi via WhatsApp"
                >
                  {salesInfo.phone || '0812-2070-8018'}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{salesInfo.location || 'Jl. Raya Cimahi No.123'}, Cimahi, Jawa Barat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Senin - Sabtu: 08.00 - 17.00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>© {new Date().getFullYear()} Toyota Cimahi - {salesInfo.name || 'Rifki'}. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm">Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
          <div className="mt-2 text-sm">
            <a 
              href="/sitemap.xml" 
              className="text-gray-300 transition-colors duration-200 hover:text-white"
              aria-label="Lihat sitemap website Toyota Cimahi"
            >
              Sitemap
            </a>
            {' | '}
            <a 
              href="/privacy-policy" 
              className="text-gray-300 transition-colors duration-200 hover:text-white"
              aria-label="Lihat kebijakan privasi Toyota Cimahi"
            >
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;