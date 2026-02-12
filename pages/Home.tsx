
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Calendar, ShieldCheck, Euro, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_PROPERTIES } from '../constants.tsx';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const featured = MOCK_PROPERTIES.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?q=${search}`);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Vendée House"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t.home.heroTitle}</h1>
          <p className="text-xl md:text-2xl text-slate-100 font-light max-w-2xl mx-auto">
            {t.home.heroSubtitle}
          </p>

          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4 text-slate-800"
          >
            <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 px-2 flex items-center space-x-3">
              <MapPin className="text-blue-500" size={20} />
              <input 
                type="text" 
                placeholder={t.home.searchPlaceholder}
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 px-2 flex items-center space-x-3">
              <Calendar className="text-blue-500" size={20} />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase">{t.home.checkIn}</p>
                <p className="text-sm font-medium">Add dates</p>
              </div>
            </div>
            <div className="flex-1 w-full px-2 flex items-center space-x-3">
              <Users className="text-blue-500" size={20} />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase">{t.home.guests}</p>
                <p className="text-sm font-medium">Any guest count</p>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
            >
              <Search size={18} />
              <span>{t.home.searchBtn}</span>
            </button>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">{t.home.featuredTitle}</h2>
            <div className="h-1.5 w-24 bg-blue-500 rounded-full"></div>
          </div>
          <Link to="/properties" className="text-blue-600 font-semibold flex items-center space-x-2 hover:translate-x-1 transition-transform">
            <span>View all</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(prop => (
            <Link key={prop.id} to={`/property/${prop.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={prop.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur py-1 px-3 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  From €{prop.pricePerNight}
                </div>
                {prop.hasPool && (
                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white py-1 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    Private Pool
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{prop.name}</h3>
                <p className="text-sm text-slate-500 mb-4 flex items-center space-x-1">
                  <MapPin size={14} className="text-blue-400" />
                  <span>{prop.location}</span>
                </p>
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center space-x-1.5">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{prop.sleeps} guests</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-600">{prop.bedrooms} beds</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Book */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.home.whyBookTitle}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">Everything you need for a stress-free French holiday.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.whyBook1}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.home.whyBook1Desc}</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Euro size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.whyBook2}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.home.whyBook2Desc}</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.whyBook3}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.home.whyBook3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Region Map Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden relative flex flex-col md:flex-row items-center gap-16">
          <div className="relative z-10 md:w-1/2 text-white space-y-6">
            <h2 className="text-4xl font-bold">Explore the Vendée</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              From the wild islands of Noirmoutier to the historic salt marshes and pristine beaches of Les Sables, 
              discover the diverse beauty of France's sunniest Atlantic coast.
            </p>
            <Link to="/guide" className="inline-block bg-white text-slate-900 font-bold py-4 px-8 rounded-2xl hover:bg-slate-100 transition-colors">
              Read Our Travel Guide
            </Link>
          </div>
          <div className="md:w-1/2 w-full h-80 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1548232962-d621df2626e2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" alt="Map" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3 text-slate-900">
                <MapPin className="text-red-500" />
                <span className="font-bold">Our Top Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t.home.newsletterTitle}</h2>
        <p className="text-slate-500 mb-8">{t.home.newsletterDesc}</p>
        <form className="flex flex-col md:flex-row gap-4">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 bg-white border border-slate-200 py-4 px-6 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
          />
          <button className="bg-blue-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            {t.home.subscribe}
          </button>
        </form>
      </section>
    </div>
  );
};
