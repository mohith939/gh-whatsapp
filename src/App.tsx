import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import BulkInquiry from './pages/BulkInquiry';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Collaborations from './pages/Collaborations';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { initGA, trackPageView } from './utils/analytics';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA('GA_MEASUREMENT_ID'); // Replace with actual GA4 measurement ID

    // Track initial page view
    trackPageView(window.location.pathname, document.title);
  }, []);

  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/bulk-inquiry" element={<BulkInquiry />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />

              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns-refunds" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toaster />
    </CartProvider>
  );
}

export default App;
