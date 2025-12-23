import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetailPage';
import ProductEnergy from '@/pages/ProductEnergy';
import ProductSleep from '@/pages/ProductSleep';
import ProductStress from '@/pages/ProductStress';
import ProductProcrastination from '@/pages/ProductProcrastination';
import WheelOfLife from '@/pages/WheelOfLife';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Success from '@/pages/Success';
import ShoppingCart from '@/components/ShoppingCart';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
          <Navigation onOpenCart={() => setIsCartOpen(true)} />
          <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/energy" element={<ProductEnergy />} />
            <Route path="/products/sleep" element={<ProductSleep />} />
            <Route path="/products/stress" element={<ProductStress />} />
            <Route path="/products/procrastination" element={<ProductProcrastination />} />
            <Route path="/wheel-of-life" element={<WheelOfLife />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
