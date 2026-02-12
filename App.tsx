
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallbacks */}
            <Route path="/guide" element={<div className="py-24 text-center">Vendée Region Guide - Content Coming Soon</div>} />
            <Route path="/about" element={<div className="py-24 text-center">About Us & Terms - Content Coming Soon</div>} />
            <Route path="/contact" element={<div className="py-24 text-center">Contact Us - Content Coming Soon</div>} />
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
