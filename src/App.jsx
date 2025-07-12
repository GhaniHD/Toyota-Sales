import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

// Komponen utama untuk routing aplikasi
// Rute "/" menampilkan halaman Home
// Rute "/products/:slug" menampilkan detail produk berdasarkan slug (ramah SEO)
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;