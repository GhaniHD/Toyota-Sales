import React, { useState } from 'react';
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
import { CreditCard, Calculator, Gift } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('cash');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const salesInfo = {
    name: "Ahmad Santoso",
    experience: "10+ Tahun",
    soldCount: "500+ Unit",
    phone: "+6281234567890",
    location: "Toyota Jakarta Selatan",
    photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b916cfac-aa6a-4133-9783-d1fe7de489fa.png"
  };

  const featuredCars = [
    {
      id: "toyota-fortuner-1",
      type: "SUV",
      name: "Toyota Fortuner",
      variant: "2.4 VRZ AT",
      price: "Rp 560.000.000",
      cashPrice: "Rp 535.000.000",
      dpMin: "Rp 56.000.000",
      installment: "Rp 8.500.000",
      promo: "Free Aksesoris Premium + Extended Warranty",
      validUntil: "31 Desember 2025",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9565221-6604-464c-81cd-c5483ee0ae33.png",
      features: ["4WD", "Diesel 2.4L", "7 Seater", "Leather Seats", "Sunroof", "LED Headlights"],
      specs: { 
        engine: "2.4L Diesel", 
        power: "148 HP", 
        fuel: "12.8 km/L", 
        transmission: "Automatic",
        fuelType: "Diesel",
        capacity: "7 Orang"
      },
      description: "Toyota Fortuner VRZ adalah SUV tangguh dengan performa diesel 2.4L yang irit namun bertenaga. Dilengkapi dengan fitur premium seperti leather seat, sunroof, dan teknologi 4WD untuk berbagai medan."
    },
    {
      id: "toyota-rush-1",
      type: "SUV",
      name: "Toyota Rush",
      variant: "1.5 TRD Sportivo",
      price: "Rp 300.000.000",
      cashPrice: "Rp 285.000.000",
      dpMin: "Rp 30.000.000",
      installment: "Rp 4.200.000",
      promo: "DP Ringan 10% + Cashback Rp 5 Juta",
      validUntil: "Terbatas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0ac4130d-4b0d-45c4-a7a8-0a6e79760dd6.png",
      features: ["SUV Compact", "1.5L DOHC", "7 Seater", "6 Airbags", "ABS+EBD", "Smart Entry"],
      specs: { 
        engine: "1.5L DOHC", 
        power: "103 HP", 
        fuel: "13.8 km/L", 
        transmission: "Manual/CVT",
        fuelType: "Bensin",
        capacity: "7 Orang"
      },
      description: "Toyota Rush TRD Sportivo adalah SUV compact dengan desain sporty dan tangguh. Dilengkapi dengan fitur keselamatan lengkap 6 airbag dan teknologi Smart Entry untuk kenyamanan berkendara."
    },
    {
      id: "toyota-avanza-1",
      type: "MPV",
      name: "Toyota Avanza",
      variant: "1.3 Veloz CVT",
      price: "Rp 250.000.000",
      cashPrice: "Rp 238.000.000",
      dpMin: "Rp 25.000.000",
      installment: "Rp 3.500.000",
      promo: "Angsuran Ringan + Gratis Asuransi 1 Tahun",
      validUntil: "Stock terbatas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4b4a85eb-1c68-4967-a4cf-75e0f66d918a.png",
      features: ["MPV", "1.3L VVT-i", "7 Seater", "CVT", "Dual Airbags", "Eco Mode"],
      specs: { 
        engine: "1.3L VVT-i", 
        power: "95 HP", 
        fuel: "15.2 km/L", 
        transmission: "CVT",
        fuelType: "Bensin",
        capacity: "7 Orang"
      },
      description: "Avanza Veloz adalah MPV keluarga dengan transmisi CVT yang halus dan irit bahan bakar. Dilengkapi dengan Eco Mode untuk efisiensi bahan bakar yang lebih baik dan interior yang luas untuk 7 penumpang."
    },
    {
      id: "toyota-innova-1",
      type: "MPV",
      name: "Toyota Innova",
      variant: "2.0 G AT",
      price: "Rp 380.000.000",
      cashPrice: "Rp 365.000.000",
      dpMin: "Rp 38.000.000",
      installment: "Rp 5.200.000",
      promo: "Trade-in Bonus + Extended Warranty 5 Tahun",
      validUntil: "31 Oktober 2024",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e95fb478-7ce9-419d-bd5f-289d754d55f0.png",
      features: ["MPV Premium", "2.0L Bensin", "8 Seater", "Captain Seat", "Dual A/C", "Stability Control"],
      specs: { 
        engine: "2.0L VVT-i", 
        power: "138 HP", 
        fuel: "11.9 km/L", 
        transmission: "Automatic",
        fuelType: "Bensin",
        capacity: "8 Orang"
      },
      description: "Innova adalah MPV premium dengan kenyamanan kelas tinggi. Dilengkapi dengan captain seat baris kedua, dual zone AC, dan sistem stabilitas canggih untuk perjalanan keluarga yang aman dan nyaman."
    },
    {
      id: "toyota-camry-1",
      type: "Sedan",
      name: "Toyota Camry",
      variant: "2.5 V AT",
      price: "Rp 650.000.000",
      cashPrice: "Rp 620.000.000",
      dpMin: "Rp 65.000.000",
      installment: "Rp 9.500.000",
      promo: "Gratis Asuransi 2 Tahun + Paket Aksesoris",
      validUntil: "31 Desember 2025",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-camry-placeholder.png",
      features: ["Sedan Premium", "2.5L VVT-i", "5 Seater", "Leather Seats", "Adaptive Cruise Control", "Lane Departure Alert"],
      specs: { 
        engine: "2.5L VVT-i", 
        power: "181 HP", 
        fuel: "14.5 km/L", 
        transmission: "Automatic",
        fuelType: "Bensin",
        capacity: "5 Orang"
      },
      description: "Toyota Camry adalah sedan premium dengan desain elegan dan fitur canggih seperti Adaptive Cruise Control dan Lane Departure Alert. Cocok untuk eksekutif yang mengutamakan kenyamanan dan teknologi."
    },
    {
      id: "toyota-yaris-1",
      type: "Hatchback",
      name: "Toyota Yaris",
      variant: "1.5 TRD Sportivo CVT",
      price: "Rp 290.000.000",
      cashPrice: "Rp 275.000.000",
      dpMin: "Rp 29.000.000",
      installment: "Rp 4.000.000",
      promo: "Cashback Rp 10 Juta + Gratis Servis 2 Tahun",
      validUntil: "Terbatas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-yaris-placeholder.png",
      features: ["Hatchback Sporty", "1.5L VVT-i", "5 Seater", "Paddle Shift", "6 Airbags", "Touchscreen Audio"],
      specs: { 
        engine: "1.5L VVT-i", 
        power: "106 HP", 
        fuel: "14.8 km/L", 
        transmission: "CVT",
        fuelType: "Bensin",
        capacity: "5 Orang"
      },
      description: "Toyota Yaris TRD Sportivo adalah hatchback dengan desain sporty dan lincah, cocok untuk perkotaan. Dilengkapi dengan paddle shift dan sistem keamanan lengkap dengan 6 airbags."
    },
    {
      id: "toyota-hilux-1",
      type: "Pick-up",
      name: "Toyota Hilux",
      variant: "2.4 G MT",
      price: "Rp 420.000.000",
      cashPrice: "Rp 400.000.000",
      dpMin: "Rp 42.000.000",
      installment: "Rp 6.000.000",
      promo: "Gratis Paket Servis 3 Tahun",
      validUntil: "31 Desember 2025",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-hilux-placeholder.png",
      features: ["Double Cabin", "2.4L Diesel", "4WD", "Touchscreen Audio", "ABS", "Hill Start Assist"],
      specs: { 
        engine: "2.4L Diesel", 
        power: "148 HP", 
        fuel: "13.5 km/L", 
        transmission: "Manual",
        fuelType: "Diesel",
        capacity: "5 Orang"
      },
      description: "Toyota Hilux adalah pick-up double cabin yang tangguh untuk segala medan. Dilengkapi dengan teknologi 4WD dan fitur keselamatan seperti ABS dan Hill Start Assist."
    },
    {
      id: "toyota-corolla-1",
      type: "Sedan",
      name: "Toyota Corolla Altis",
      variant: "1.8 V AT",
      price: "Rp 480.000.000",
      cashPrice: "Rp 460.000.000",
      dpMin: "Rp 48.000.000",
      installment: "Rp 6.800.000",
      promo: "Diskon Rp 15 Juta + Gratis Asuransi",
      validUntil: "Stock terbatas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-corolla-placeholder.png",
      features: ["Sedan", "1.8L VVT-i", "5 Seater", "Push Start Button", "7 Airbags", "Lane Keep Assist"],
      specs: { 
        engine: "1.8L VVT-i", 
        power: "138 HP", 
        fuel: "15.0 km/L", 
        transmission: "Automatic",
        fuelType: "Bensin",
        capacity: "5 Orang"
      },
      description: "Toyota Corolla Altis adalah sedan dengan desain modern dan fitur keselamatan canggih seperti 7 airbags dan Lane Keep Assist, cocok untuk perjalanan kota atau jarak jauh."
    },
    {
      id: "toyota-hiace-1",
      type: "Minibus",
      name: "Toyota HiAce",
      variant: "Commuter MT",
      price: "Rp 550.000.000",
      cashPrice: "Rp 525.000.000",
      dpMin: "Rp 55.000.000",
      installment: "Rp 7.800.000",
      promo: "Gratis Servis 2 Tahun + Cashback Rp 10 Juta",
      validUntil: "31 Desember 2025",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-hiace-placeholder.png",
      features: ["Minibus", "2.8L Diesel", "15 Seater", "Sliding Door", "Dual A/C", "ABS"],
      specs: { 
        engine: "2.8L Diesel", 
        power: "154 HP", 
        fuel: "11.5 km/L", 
        transmission: "Manual",
        fuelType: "Diesel",
        capacity: "15 Orang"
      },
      description: "Toyota HiAce Commuter adalah minibus yang luas dan nyaman untuk transportasi kelompok. Dilengkapi dengan pintu geser dan dual A/C untuk kenyamanan penumpang."
    },
    {
      id: "toyota-veloz-1",
      type: "MPV",
      name: "Toyota Veloz",
      variant: "1.5 Q CVT",
      price: "Rp 310.000.000",
      cashPrice: "Rp 295.000.000",
      dpMin: "Rp 31.000.000",
      installment: "Rp 4.500.000",
      promo: "DP Ringan + Gratis Aksesoris",
      validUntil: "Terbatas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-veloz-placeholder.png",
      features: ["MPV", "1.5L VVT-i", "7 Seater", "Keyless Entry", "6 Airbags", "Rear Camera"],
      specs: { 
        engine: "1.5L VVT-i", 
        power: "104 HP", 
        fuel: "14.2 km/L", 
        transmission: "CVT",
        fuelType: "Bensin",
        capacity: "7 Orang"
      },
      description: "Toyota Veloz adalah MPV modern dengan desain stylish dan fitur keselamatan lengkap seperti 6 airbags dan rear camera, ideal untuk keluarga muda."
    },
    {
      id: "toyota-raize-1",
      type: "SUV",
      name: "Toyota Raize",
      variant: "1.0 Turbo GR Sport",
      price: "Rp 270.000.000",
      cashPrice: "Rp 255.000.000",
      dpMin: "Rp 27.000.000",
      installment: "Rp 3.800.000",
      promo: "Cashback Rp 8 Juta + Gratis Servis",
      validUntil: "Stock terbatas",
      image: " https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-raize-placeholder.png",
      features: ["Compact SUV", "1.0L Turbo", "5 Seater", "LED Headlights", "Smart Entry", "Paddle Shift"],
      specs: { 
        engine: "1.0L Turbo", 
        power: "97 HP", 
        fuel: "15.8 km/L", 
        transmission: "CVT",
        fuelType: "Bensin",
        capacity: "5 Orang"
      },
      description: "Toyota Raize GR Sport adalah SUV kompak dengan mesin turbo yang hemat bahan bakar dan desain sporty, cocok untuk gaya hidup urban."
    },
    {
      id: "toyota-aygo-1",
      type: "Hatchback",
      name: "Toyota Agyo",
      variant: "1.0 VVT-i MT",
      price: "Rp 200.000.000",
      cashPrice: "Rp 190.000.000",
      dpMin: "Rp 20.000.000",
      installment: "Rp 2.800.000",
      promo: "Gratis Asuransi 1 Tahun",
      validUntil: "31 Desember 2025",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/toyota-aygo-placeholder.png",
      features: ["City Car", "1.0L VVT-i", "5 Seater", "Compact Design", "Dual Airbags", "Touchscreen Audio"],
      specs: { 
        engine: "1.0L VVT-i", 
        power: "71 HP", 
        fuel: "17.0 km/L", 
        transmission: "Manual",
        fuelType: "Bensin",
        capacity: "5 Orang"
      },
      description: "Toyota Agyo adalah hatchback kompak yang lincah dan hemat bahan bakar, ideal untuk penggunaan sehari-hari di perkotaan."
    }
  ];

  const paymentMethods = [
    {
      id: 'cash',
      title: 'Pembayaran Tunai',
      icon: () => <CreditCard className="w-8 h-8" />,
      benefits: [
        'Diskon hingga Rp 25 juta',
        'Proses cepat, langsung jadi',
        'Bebas bunga dan administrasi',
        'Gratis extended warranty'
      ],
      process: [
        'Pilih mobil yang diinginkan',
        'Negosiasi harga terbaik',
        'Bayar langsung full payment',
        'Terima kunci & STNK'
      ]
    },
    {
      id: 'credit',
      title: 'Kredit/Cicilan',
      icon: () => <Calculator className="w-8 h-8" />,
      benefits: [
        'DP mulai dari 10%',
        'Tenor hingga 7 tahun',
        'Bunga kompetitif 6-8%',
        'Asuransi All Risk tersedia'
      ],
      process: [
        'Ajukan aplikasi kredit',
        'Survey & verifikasi data',
        'Approval dari leasing',
        'Bayar DP & terima mobil'
      ]
    },
    {
      id: 'trade',
      title: 'Tukar Tambah',
      icon: () => <Gift className="w-8 h-8" />,
      benefits: [
        'Harga trade-in terbaik',
        'Proses valuasi gratis',
        'Langsung potong harga baru',
        'Kemudahan administrasi'
      ],
      process: [
        'Bawa mobil lama untuk dinilai',
        'Dapatkan harga trade-in',
        'Bayar selisih harga',
        'Serah terima mobil baru'
      ]
    }
  ];

  const promoSpecials = [
    {
      title: "Promo Akhir Tahun",
      discount: "Diskon s/d 30 Juta",
      description: "Berlaku untuk semua tipe Toyota",
      validUntil: "31 Desember 2025",
      color: "bg-gradient-to-r from-red-600 to-rose-600"
    },
    {
      title: "Cicilan 0% Bunga",
      discount: "6 Bulan Pertama",
      description: "Khusus Fortuner & Innova",
      validUntil: "Terbatas",
      color: "bg-gradient-to-r from-blue-600 to-indigo-600"
    },
    {
      title: "Cashback Spesial",
      discount: "Hingga 15 Juta",
      description: "Untuk pembelian cash",
      validUntil: "Stock terbatas",
      color: "bg-gradient-to-r from-green-600 to-emerald-600"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Budi Hartono",
      car: "Toyota Fortuner",
      text: "Pelayanan sangat memuaskan, pak Ahmad membantu dari awal hingga dokumen selesai. Proses kredit sangat mudah dan cepat!",
      stars: 5,
      avatar: "https://ui-avatars.com/api/?name=Budi+Hartono&background=ef4444&color=fff"
    },
    {
      id: 2,
      name: "Siti Aminah",
      car: "Toyota Rush",
      text: "Proses cepat dan transparan, harga sesuai yang dijanjikan. Bonus aksesoris yang diberikan juga sangat menarik.",
      stars: 5,
      avatar: "https://ui-avatars.com/api/?name=Siti+Aminah&background=3b82f6&color=fff"
    },
    {
      id: 3,
      name: "Rudi Santoso",
      car: "Toyota Avanza",
      text: "Sangat puas dengan layanan after sales dan kemudahan dalam mengurus dokumen. Highly recommended!",
      stars: 5,
      avatar: "https://ui-avatars.com/api/?name=Rudi+Santoso&background=10b981&color=fff"
    }
  ];

  const faqs = [
    {
      question: "Berapa lama proses kredit Toyota?",
      answer: "Proses kredit Toyota biasanya memakan waktu 3-7 hari kerja setelah dokumen lengkap. Untuk kasus tertentu, bisa lebih cepat dalam 1-2 hari."
    },
    {
      question: "Apakah bisa tukar tambah mobil lama?",
      answer: "Ya, kami menerima tukar tambah dengan harga yang kompetitif. Tim kami akan melakukan survei dan memberikan harga terbaik untuk mobil lama Anda."
    },
    {
      question: "Bagaimana jika kredit ditolak?",
      answer: "Jika kredit ditolak, kami akan membantu mencari solusi alternatif seperti menggunakan leasing lain atau menyesuaikan tenor dan DP."
    },
    {
      question: "Apakah ada biaya tambahan?",
      answer: "Semua biaya sudah transparan dari awal. Tidak ada biaya tersembunyi. Kami akan menjelaskan detail semua biaya sebelum deal."
    }
  ];

  const promoCars = featuredCars.filter(car => 
    car.promo && (
      car.validUntil === "Terbatas" || 
      car.validUntil === "Stock terbatas" || 
      new Date(car.validUntil) >= new Date('2025-07-10')
    )
  );

  const carTypes = [...new Set(featuredCars.map(car => car.type))];
  const catalogByType = carTypes.reduce((acc, type) => {
    acc[type] = featuredCars.filter(car => car.type === type);
    return acc;
  }, {});

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header salesInfo={salesInfo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero salesInfo={salesInfo} />
      <PromoBanner />
      <PromoSection promoCars={promoCars} promoSpecials={promoSpecials} salesInfo={salesInfo} />
      <CatalogSection 
        catalogByType={catalogByType} 
        carTypes={carTypes} 
        salesInfo={salesInfo} 
      />
      <SalesProfile salesInfo={salesInfo} />
      <PaymentSection paymentMethods={paymentMethods} activeTab={activeTab} setActiveTab={setActiveTab} salesInfo={salesInfo} />
      <CreditCalculator salesInfo={salesInfo} />
      <Testimonials testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <CTASection salesInfo={salesInfo} />
      <Footer salesInfo={salesInfo} />
    </div>
  );
};

export default Home;