import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CreditCard, Calculator, Gift } from 'lucide-react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import PromoBanner from '../components/PromoBanner.jsx';
import PromoSection from '../components/PromoSection.jsx';
import CatalogSection from '../components/CatalogSection.jsx';
import SalesProfile from '../components/SalesProfile.jsx';
import PaymentSection from '../components/PaymentSection.jsx';
import CreditCalculator from '../components/CreditCalculator.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQSection from '../components/FAQSection.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';
import DealerMap from '../components/DealerMap.jsx';
import { getWebsites, getSalesInfo, getCars, getTestimonials, getFaqs } from '../api';

const Home = () => {
  const [salesInfo, setSalesInfo] = useState({});
  const [dealerMap, setDealerMap] = useState({});
  const [featuredCars, setFeaturedCars] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cash');
  const [websiteId, setWebsiteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getWebsiteId = async () => {
      try {
        const domain = window.location.hostname;
        const websites = await getWebsites(domain);
        setWebsiteId(websites[0]?.id || 1);
      } catch (err) {
        console.error('Error fetching website ID:', err);
        setWebsiteId(1);
        setError('Gagal memuat ID website');
      }
    };
    getWebsiteId();
  }, []);

  useEffect(() => {
    if (websiteId) {
      const fetchData = async () => {
        try {
          const [salesInfoData, carsData, testimonialsData, faqsData] = await Promise.all([
            getSalesInfo(websiteId),
            getCars(websiteId),
            getTestimonials(websiteId),
            getFaqs(websiteId),
          ]);

          setSalesInfo(salesInfoData[0] || {});
          setFeaturedCars(Array.isArray(carsData) ? carsData : []);
          setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
          setFaqs(Array.isArray(faqsData) ? faqsData : []);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Gagal memuat data');
        }
      };
      fetchData();

      setDealerMap({
        dealerAddress: 'Jl. Raya Cimahi No.123, Cimahi, Bandung, Jawa Barat, Indonesia',
        dealerCoordinates: [-6.8722, 107.5426],
      });
    }
  }, [websiteId]);

  const paymentMethods = [
    {
      id: 'cash',
      title: 'Pembayaran Tunai',
      icon: () => <CreditCard className="w-8 h-8" />,
      benefits: [
        'Diskon hingga Rp 25 juta',
        'Proses cepat, langsung jadi',
        'Bebas bunga dan administrasi',
        'Gratis extended warranty',
      ],
      process: [
        'Pilih mobil yang diinginkan',
        'Negosiasi harga terbaik',
        'Bayar langsung full payment',
        'Terima kunci & STNK',
      ],
    },
    {
      id: 'credit',
      title: 'Kredit/Cicilan',
      icon: () => <Calculator className="w-8 h-8" />,
      benefits: [
        'DP mulai dari 10%',
        'Tenor hingga 7 tahun',
        'Bunga kompetitif 6-8%',
        'Asuransi All Risk tersedia',
      ],
      process: [
        'Ajukan aplikasi kredit',
        'Survey & verifikasi data',
        'Approval dari leasing',
        'Bayar DP & terima mobil',
      ],
    },
    {
      id: 'trade',
      title: 'Tukar Tambah',
      icon: () => <Gift className="w-8 h-8" />,
      benefits: [
        'Harga trade-in terbaik',
        'Proses valuasi gratis',
        'Langsung potong harga baru',
        'Kemudahan administrasi',
      ],
      process: [
        'Bawa mobil lama untuk dinilai',
        'Dapatkan harga trade-in',
        'Bayar selisih harga',
        'Serah terima mobil baru',
      ],
    },
  ];

  const promoSpecials = [
    {
      title: 'Promo Akhir Tahun',
      discount: 'Diskon s/d 30 Juta',
      description: 'Berlaku untuk semua tipe Toyota',
      validUntil: '31 Desember 2025',
      color: 'bg-gradient-to-r from-red-600 to-rose-600',
    },
    {
      title: 'Cicilan 0% Bunga',
      discount: '6 Bulan Pertama',
      description: 'Khusus Fortuner & Innova',
      validUntil: 'Terbatas',
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    },
    {
      title: 'Cashback Spesial',
      discount: 'Hingga 15 Juta',
      description: 'Untuk pembelian cash',
      validUntil: 'Stock terbatas',
      color: 'bg-gradient-to-r from-green-600 to-emerald-600',
    },
  ];

  const promoCars = Array.isArray(featuredCars)
    ? featuredCars.filter(
        (car) =>
          car.promo &&
          (car.validUntil === 'Terbatas' ||
            car.validUntil === 'Stock terbatas' ||
            new Date(car.validUntil) >= new Date('2025-07-12'))
      )
    : [];

  const carTypes = Array.isArray(featuredCars) ? [...new Set(featuredCars.map((car) => car.type))] : [];
  const catalogByType = Array.isArray(featuredCars)
    ? carTypes.reduce((acc, type) => {
        acc[type] = featuredCars.filter((car) => car.type === type);
        return acc;
      }, {})
    : {};

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Helmet>
        <title>Toyota Cimahi - Dealer Resmi Toyota</title>
        <meta
          name="description"
          content="Dealer resmi Toyota di Cimahi. Temukan mobil Toyota terbaru seperti Avanza, Fortuner, Innova, dan promo menarik."
        />
        <meta
          name="keywords"
          content="Toyota Cimahi, dealer Toyota, mobil Toyota, promo Toyota, Avanza, Fortuner, Innova, Rush, kredit Toyota"
        />
        <meta property="og:title" content="Toyota Cimahi - Dealer Resmi Toyota" />
        <meta
          property="og:description"
          content="Temukan mobil Toyota impian Anda di dealer resmi Toyota Cimahi dengan harga terbaik dan promo menarik."
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-logo.jpg"
        />
        <meta property="og:url" content="https://websitekamu.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
      <Header salesInfo={salesInfo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Hero salesInfo={salesInfo} />
        <PromoBanner />
        <PromoSection promoCars={promoCars} promoSpecials={promoSpecials} salesInfo={salesInfo} />
        <CatalogSection catalogByType={catalogByType} carTypes={carTypes} salesInfo={salesInfo} />
        <SalesProfile salesInfo={salesInfo} />
        <PaymentSection
          paymentMethods={paymentMethods}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          salesInfo={salesInfo}
        />
        <CreditCalculator salesInfo={salesInfo} />
        <Testimonials testimonials={testimonials} />
        <FAQSection faqs={faqs} />
        <DealerMap dealerAddress={dealerMap.dealerAddress} dealerCoordinates={dealerMap.dealerCoordinates} />
        <CTASection salesInfo={salesInfo} />
      </main>
      <Footer salesInfo={salesInfo} />
    </div>
  );
};

export default Home;