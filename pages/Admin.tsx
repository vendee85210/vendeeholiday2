
import React, { useState } from 'react';
import { LayoutDashboard, Home, Mail, Settings, Plus, Edit2, Trash2, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_PROPERTIES } from '../constants.tsx';

export const Admin: React.FC = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'enquiries'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vendee2024') setIsAuthenticated(true);
    else alert('Invalid Admin Password');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold serif mb-2">Owner Portal</h1>
            <p className="text-sm text-slate-400">Please enter your management password</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Admin Password"
              className="w-full bg-slate-50 border border-slate-200 py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all">
              Login to Dashboard
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-8 uppercase tracking-widest font-bold">Secure Access for Gite Owners</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 space-y-8">
        <div>
           <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'properties', label: 'My Biens', icon: Home },
            { id: 'enquiries', label: 'Enquiries', icon: Mail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="pt-8 border-t border-slate-50">
           <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
             <Settings size={18} />
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500">Your rental performance for this month.</p>
              </div>
              <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-500/20">
                <Plus size={18} />
                <span>Add Property</span>
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Total Revenue</p>
                  <p className="text-3xl font-black text-slate-900">€12,450.00</p>
                  <p className="text-xs text-emerald-500 font-bold mt-2">↑ 12% from last month</p>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Active Enquiries</p>
                  <p className="text-3xl font-black text-slate-900">24</p>
                  <p className="text-xs text-blue-500 font-bold mt-2">6 new today</p>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Properties Occupied</p>
                  <p className="text-3xl font-black text-slate-900">85%</p>
                  <p className="text-xs text-slate-400 font-bold mt-2">Peak Season Forecast</p>
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Recent Enquiries</h3>
                  <button className="text-sm text-blue-600 font-bold">View all</button>
               </div>
               <div className="divide-y divide-slate-50">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">M</div>
                          <div>
                             <p className="text-sm font-bold">Mila Kuznetsov</p>
                             <p className="text-xs text-slate-400">Villa Beausoleil • 12-19 Aug</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-3">
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Pending Reply</span>
                          <button className="p-2 text-slate-400 hover:text-blue-600"><Edit2 size={16} /></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Manage My Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROPERTIES.slice(0, 6).map(p => (
                <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-6">
                  <img src={p.images[0]} className="w-24 h-24 rounded-2xl object-cover" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{p.name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{p.location}</p>
                    <div className="flex space-x-3">
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-emerald-100 hover:text-emerald-600 transition-colors"><Calendar size={16} /></button>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-100 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'enquiries' && (
           <div className="space-y-8">
              <h1 className="text-3xl font-bold">All Messages</h1>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                       <tr>
                          <th className="p-6 text-[10px] font-bold text-slate-400 uppercase">Guest</th>
                          <th className="p-6 text-[10px] font-bold text-slate-400 uppercase">Property</th>
                          <th className="p-6 text-[10px] font-bold text-slate-400 uppercase">Dates</th>
                          <th className="p-6 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {[1, 2, 3, 4].map(i => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                             <td className="p-6">
                                <p className="text-sm font-bold">Jean Pierre</p>
                                <p className="text-xs text-slate-400">jp@example.com</p>
                             </td>
                             <td className="p-6 text-sm font-medium">Manoir de l'Océan</td>
                             <td className="p-6 text-sm text-slate-500">20/07 - 27/07</td>
                             <td className="p-6">
                                <div className="flex items-center space-x-1 text-emerald-600">
                                   <CheckCircle size={14} />
                                   <span className="text-[10px] font-bold uppercase">Confirmed</span>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};
