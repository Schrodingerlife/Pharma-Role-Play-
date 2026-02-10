import React from 'react';
import { MOCK_HISTORY } from '../../constants';
import { ScoreRing } from '../../components/ScoreRing';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Award, Calendar } from 'lucide-react';

export default function Dashboard() {
  const averageScore = Math.round(MOCK_HISTORY.reduce((acc, curr) => acc + curr.score, 0) / MOCK_HISTORY.length);

  return (
    <div className="min-h-screen pt-24 px-6 container mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Your training progress overview.</p>
        </div>
        <Button>Download Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-cyan-neon/10 flex items-center justify-center">
             <TrendingUp className="text-cyan-neon w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm uppercase">Avg. Score</p>
            <p className="text-3xl font-bold text-white">{averageScore}%</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-purple-neon/10 flex items-center justify-center">
             <Award className="text-purple-neon w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm uppercase">Sessions Completed</p>
            <p className="text-3xl font-bold text-white">{MOCK_HISTORY.length}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
             <Calendar className="text-green-500 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm uppercase">Last Active</p>
            <p className="text-xl font-bold text-white">Oct 25, 2023</p>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-navy-light text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Scenario</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.scenario}</td>
                  <td className="px-6 py-4 text-gray-400">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-cyan-neon">{item.score}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
