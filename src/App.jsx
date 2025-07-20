import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const AdminDashboard = () => <AdminPanel section="dashboard" />;
const AdminWebsites = () => <AdminPanel section="websites" />;
const AdminSalesInfo = () => <AdminPanel section="sales_info" />;
const AdminCars = () => <AdminPanel section="cars" />;
const AdminTestimonials = () => <AdminPanel section="testimonials" />;
const AdminFAQs = () => <AdminPanel section="faqs" />;
const AdminAdmins = () => <AdminPanel section="admins" />;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
          <Route path="/admin/websites" element={<ErrorBoundary><AdminPanel section="websites" /></ErrorBoundary>} />
          <Route path="/admin/sales_info" element={<ErrorBoundary><AdminPanel section="sales_info" /></ErrorBoundary>} />
          <Route path="/admin/cars" element={<ErrorBoundary><AdminPanel section="cars" /></ErrorBoundary>} />
          <Route path="/admin/testimonials" element={<ErrorBoundary><AdminPanel section="testimonials" /></ErrorBoundary>} />
          <Route path="/admin/faqs" element={<ErrorBoundary><AdminPanel section="faqs" /></ErrorBoundary>} />
          <Route path="/admin/admins" element={<ErrorBoundary><AdminPanel section="admins" /></ErrorBoundary>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;