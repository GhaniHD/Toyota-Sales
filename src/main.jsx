import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ReactGA from 'react-ga';
import { HelmetProvider } from 'react-helmet-async';

// Inisialisasi Google Analytics (ganti UA-XXXXX-Y dengan kode pelacakan Anda)
ReactGA.initialize('UA-XXXXX-Y');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
  <App />
</HelmetProvider>
);