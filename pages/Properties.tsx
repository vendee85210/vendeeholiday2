
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Map as MapIcon, Filter, MapPin, Users, Waves, Dog, Wifi, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_PROPERTIES } from '../constants.tsx';

export const Properties: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters
  const [capacity, setCapacity] = useState<number | null>(null);
  const [hasPool, setHasPool] = useState(false);
  const [isPets, setIsPets] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = [...MOCK_PROPERTIES];
    const query = searchParams.get('q')?.toLowerCase();
    
    if (query) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query)
      );
    }

    if (capacity) result = result.filter(p => p.sleeps >= capacity);
    if (hasPool) result = result.filter(p => p.hasPool);
    if (isPets) result = result.filter(p => p.petFriendly);

    return result;
  }, [searchParams, capacity, hasPool, isPets]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{t.nav.properties}</h1>
            <p className="text-slate-500">Discover {filteredProperties.length} hand-picked vacation homes in Vendée.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-xl flex p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={20} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <MapIcon size={20} />
              </button>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center space-x-2 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <Filter size={18} className="text-blue-500" />
              <span>{t.listing.filters}</span>
              <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        {isFilterOpen && (
          <div className="bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-100 flex flex-wrap gap-8 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.listing.capacity}</label>
              <select 
                onChange={(e) => setCapacity(Number(e.target.value) || null)}
                className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="2">2+ guests</option>
                <option value="4">4+ guests</option>
                <option value="8">8+ guests</option>
                <option value="12">12+ guests</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setHasPool(!hasPool)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  hasPool ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Waves size={16} />
                <span>{t.property.pool}</span>
              </button>
              <button 
                onClick={() => setIsPets(!isPets)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  isPets ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Dog size={16} />
                <span>Pet Friendly</span>
              </button>
            </div>
            <button 
              onClick={() => { setCapacity(null); setHasPool(false); setIsPets(false); }}
              className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase pb-3 transition-colors"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Property Views */}
        {viewMode === 'map' ? (
          <div className="h-[70vh] bg-slate-200 rounded-3xl overflow-hidden relative border-4 border-white shadow-xl">
             <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <MapPin size={32} className="text-blue-500" />
                   </div>
                   <p className="font-bold text-slate-600 tracking-tight text-xl">Interactive Map Interface</p>
                   <p className="text-slate-500 max-w-sm mx-auto">This area would display property pins using Google Maps API integration based on your coordinates.</p>
                </div>
             </div>
             {/* Simple markers for visual */}
             {filteredProperties.slice(0, 5).map(p => (
                <div key={p.id} className="absolute p-2 bg-white rounded-lg shadow-lg flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform" style={{ top: `${30 + Math.random() * 40}%`, left: `${30 + Math.random() * 40}%` }}>
                   <span className="text-xs font-bold">€{p.pricePerNight}</span>
                </div>
             ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map(prop => (
                <Link 
                  key={prop.id} 
                  to={`/property/${prop.id}`} 
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3 aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'}`}>
                    <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prop.name} />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                      {prop.region}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{prop.name}</h3>
                        <span className="text-lg font-bold text-slate-800">€{prop.pricePerNight}<span className="text-xs text-slate-400 font-normal">/night</span></span>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center space-x-1.5 mb-6">
                        <MapPin size={14} className="text-blue-400" />
                        <span>{prop.location}, Vendée</span>
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Users size={16} className="text-slate-400" />
                          <span className="text-xs font-semibold text-slate-700">{prop.sleeps} Sleeps</span>
                        </div>
                        {prop.hasPool && (
                          <div className="flex items-center space-x-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                            <Waves size={16} className="text-blue-500" />
                            <span className="text-xs font-semibold text-blue-700">Private Pool</span>
                          </div>
                        )}
                        {prop.petFriendly && (
                          <div className="flex items-center space-x-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                            <Dog size={16} className="text-amber-600" />
                            <span className="text-xs font-semibold text-amber-700">Pets Welcome</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="text-xs text-slate-400 font-medium italic">
                        Distance to beach: {prop.distanceToBeach}km
                      </div>
                      <button className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                        Explore Villa →
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-24 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                   <Filter size={32} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{t.listing.noResults}</h2>
                <button 
                  onClick={() => { setCapacity(null); setHasPool(false); setIsPets(false); }}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
