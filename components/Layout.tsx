
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/properties', label: t.nav.properties },
    { path: '/guide', label: t.nav.guide },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 tracking-tight serif">VENDÉE GITES</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Villas & Cottages</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
             <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-all uppercase"
            >
              <Globe size={14} className="text-slate-400" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <Link to="/admin" className="text-xs font-semibold text-slate-400 hover:text-slate-600 uppercase">
              {t.nav.admin}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-xl">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
             <button
              onClick={() => {
                setLanguage(language === 'en' ? 'fr' : 'en');
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-100 text-sm font-medium"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'Passer en Français' : 'Switch to English'}</span>
            </button>
            <Link to="/admin" className="text-sm font-medium text-blue-600" onClick={() => setIsMenuOpen(false)}>
              {t.nav.admin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold serif">Vendée Gites</h3>
            <p className="text-sm leading-relaxed">
              Family-run holiday rental agency based in the heart of Vendée. We specialize in luxury villas with private pools and charming countryside cottages.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="hover:text-blue-400 cursor-pointer" />
              <Instagram size={20} className="hover:text-pink-400 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">{t.nav.properties}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/properties?region=coastal" className="hover:text-white">Coastal Villas</Link></li>
              <li><Link to="/properties?region=countryside" className="hover:text-white">Country Gites</Link></li>
              <li><Link to="/properties?pool=true" className="hover:text-white">Properties with Pool</Link></li>
              <li><Link to="/properties?pets=true" className="hover:text-white">Pet Friendly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Helpful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guide" className="hover:text-white">Region Guide</Link></li>
              <li><Link to="/about" className="hover:text-white">Terms & Privacy</Link></li>
              <li><Link to="/contact" className="hover:text-white">Support</Link></li>
              <li><Link to="/admin" className="hover:text-white">Owner Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <span>+33 (0) 2 51 98 00 00</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <span>bookings@vendee-gites.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vendée Gites & Villas Luxe. All rights reserved. Made for Vendée enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
