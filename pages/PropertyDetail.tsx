
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Bed, Bath, Waves, Dog, Wifi, ShieldCheck, Mail, Send, Calendar, Star, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_PROPERTIES } from '../constants.tsx';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  if (!property) return <div className="py-24 text-center">Property not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Photo Gallery */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh]">
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-lg group">
              <img src={property.images[activeImg] || property.images[0]} className="w-full h-full object-cover" alt={property.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-4 col-span-1">
              {property.images.slice(1, 3).map((img, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveImg(idx + 1)}>
                  <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                </div>
              ))}
            </div>
            <div className="hidden md:block col-span-1 bg-slate-900 rounded-3xl relative overflow-hidden group">
               <img src={property.images[0]} className="w-full h-full object-cover opacity-60" alt="More" />
               <div className="absolute inset-0 flex items-center justify-center flex-col text-white cursor-pointer">
                  <span className="text-3xl font-bold">+{property.images.length}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">More Photos</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                <MapPin size={14} />
                <span>{property.location}, Vendée</span>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6">{property.name}</h1>
              
              <div className="flex flex-wrap gap-8 py-8 border-y border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{property.sleeps} {t.property.sleeps}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Capacity</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <Bed size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{property.bedrooms} {t.property.bedrooms}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Rooms</p>
                  </div>
                </div>
                {property.hasPool && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Waves size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.property.pool}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Feature</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{property.distanceToBeach}km</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.property.beach}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">About this Villa</h2>
              <p className="text-slate-600 leading-relaxed text-lg italic serif">
                "{property.description[language]}"
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-8">{t.property.amenities}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-700">
                    <ShieldCheck className="text-emerald-500" size={18} />
                    <span className="text-sm font-medium">{feat}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-3 text-slate-700">
                   <Wifi className="text-blue-500" size={18} />
                   <span className="text-sm font-medium">Free High-Speed WiFi</span>
                </div>
                {property.petFriendly && (
                  <div className="flex items-center space-x-3 text-slate-700">
                    <Dog className="text-amber-500" size={18} />
                    <span className="text-sm font-medium">Pets Welcome</span>
                  </div>
                )}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <h2 className="text-2xl font-bold mb-8">{t.property.availability}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AvailabilityCalendar availability={property.availability} />
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center">
                   <div className="space-y-6">
                      <h4 className="text-lg font-bold flex items-center space-x-2">
                         <Calendar className="text-blue-500" />
                         <span>Quick Pricing Guide</span>
                      </h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Low Season (Oct - Apr)</span>
                            <span className="font-bold">€{property.pricePerNight} / night</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Mid Season (May, Jun, Sep)</span>
                            <span className="font-bold">€{property.pricePerNight + 50} / night</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Peak Season (Jul - Aug)</span>
                            <span className="font-bold">€{property.pricePerNight + 150} / night</span>
                         </div>
                      </div>
                      <p className="text-xs text-slate-400 italic">Prices are indicative. Weekly discounts apply. Enquire for exact quote.</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
               <h2 className="text-2xl font-bold mb-8">{t.property.location}</h2>
               <div className="h-96 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                     <div className="text-center space-y-4">
                        <MapPin size={40} className="text-red-500 mx-auto" />
                        <p className="font-bold text-slate-800">Exact location visible after booking</p>
                        <p className="text-sm text-slate-400">Map centered on {property.location}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-bold">{t.property.reviews}</h2>
                  <div className="flex items-center space-x-2 bg-amber-50 px-4 py-2 rounded-xl text-amber-700 font-bold">
                     <Star size={18} fill="currentColor" />
                     <span>4.9 (12 reviews)</span>
                  </div>
               </div>
               <div className="space-y-12">
                  {[1, 2].map((r) => (
                    <div key={r} className="space-y-4 pb-8 border-b border-slate-50 last:border-0">
                       <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                          <div>
                             <p className="font-bold">Sarah Jenkins</p>
                             <p className="text-xs text-slate-400">August 2024</p>
                          </div>
                       </div>
                       <p className="text-slate-600 leading-relaxed italic">
                          "We had an absolutely magical time at {property.name}. The pool area is second to none, and being so close to {property.location} beach made our mornings so easy with the kids. We'll be back!"
                       </p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar - Enquiry Form */}
          <div className="space-y-8">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-full"></div>
                
                <div className="mb-8">
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Price from</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-slate-900">€{property.pricePerNight}</span>
                    <span className="text-slate-500">/ night</span>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">{t.home.checkIn}</label>
                      <input type="date" className="w-full bg-slate-50 border-slate-100 rounded-xl px-3 py-2 text-xs font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">{t.home.checkOut}</label>
                      <input type="date" className="w-full bg-slate-50 border-slate-100 rounded-xl px-3 py-2 text-xs font-medium" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.home.guests}</label>
                    <select className="w-full bg-slate-50 border-slate-100 rounded-xl px-3 py-2 text-xs font-medium">
                      <option>1 Adult</option>
                      <option selected>2 Adults</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Message</label>
                    <textarea 
                      placeholder="Hi, we're interested in..." 
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-3 py-3 text-xs min-h-[100px]"
                    ></textarea>
                  </div>

                  <button 
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>{t.property.enquire}</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setIsHolding(true)}
                    className={`w-full border-2 border-emerald-500/20 text-emerald-600 font-bold py-4 rounded-2xl transition-all ${isHolding ? 'bg-emerald-500 text-white border-emerald-500' : 'hover:bg-emerald-50'}`}
                  >
                    {isHolding ? 'Villa Held! Check your email' : t.property.holdBtn}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                   <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span>Direct Booking, No Service Fees</span>
                   </div>
                   <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <Mail size={16} className="text-blue-500" />
                      <span>Response within 24 hours</span>
                   </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] space-y-4 shadow-xl">
                 <h4 className="font-bold flex items-center space-x-2">
                    <Star className="text-yellow-400" size={18} />
                    <span>Owner's Guarantee</span>
                 </h4>
                 <p className="text-xs text-slate-400 leading-relaxed">
                    "We personally visit every property listed. Villa Beausoleil is one of our favorites for its exceptional pool and sunset views." - Marc, Owner.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
