import React from 'react';
import { MOCK_HISTORY } from '../../constants';
import { Search } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-24 px-6 container mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Session History</h1>
        <p className="text-gray-400">Review past performances and track your improvement.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search sessions..." 
            className="w-full bg-navy-light border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-neon"
          />
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_HISTORY.map((item) => (
          <div key={item.id} className="glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-all">
             <div>
               <h3 className="font-bold text-white">{item.scenario}</h3>
               <p className="text-sm text-gray-400">{item.date} • {item.id}</p>
             </div>
             <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-2xl font-bold text-cyan-neon">{item.score}</span>
                  <span className="text-xs text-gray-500 uppercase">Score</span>
                </div>
                <button className="text-sm text-cyan-neon hover:text-white underline">View Details</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
