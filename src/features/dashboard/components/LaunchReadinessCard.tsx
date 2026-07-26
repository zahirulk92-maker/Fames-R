import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { LaunchReadinessItem } from '../../../mock-data/dashboard';

interface LaunchReadinessCardProps {
  items: LaunchReadinessItem[];
}

export const LaunchReadinessCard: React.FC<LaunchReadinessCardProps> = ({ items }) => {
  const navigate = useNavigate();

  // Calculate stats
  const total = items.length;
  const readyCount = items.filter((x) => x.status === 'READY').length;
  const pendingCount = items.filter((x) => x.status === 'PENDING').length;
  const blockedCount = items.filter((x) => x.status === 'BLOCKED').length;
  const percentage = Math.round((readyCount / total) * 100);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              <Icons.ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">System Integration Launch Readiness</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking backend requirements, cloud sync adapters, and credentials.
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/system-readiness')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-950 font-bold bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-all duration-150 self-start sm:self-center"
        >
          <Icons.Activity className="w-3.5 h-3.5 text-slate-500" />
          View System Readiness
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Readiness Meter */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-center items-center text-center space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Readiness Level</span>
          <div className="relative flex items-center justify-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{percentage}%</span>
          </div>
          {/* Compact bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[10px] font-semibold text-slate-500 pt-1">
            <span>{readyCount} Active</span>
            <span>{blockedCount + pendingCount} Idle</span>
          </div>
        </div>

        {/* Categories breakdown */}
        <div className="md:col-span-2 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 text-center">
              <span className="block text-lg font-bold text-emerald-700 leading-none">{readyCount}</span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider mt-1 block">Ready</span>
            </div>
            <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-center">
              <span className="block text-lg font-bold text-amber-700 leading-none">{pendingCount}</span>
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider mt-1 block">Pending</span>
            </div>
            <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 text-center">
              <span className="block text-lg font-bold text-rose-700 leading-none">{blockedCount}</span>
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider mt-1 block">Blocked</span>
            </div>
          </div>

          {/* Core setup items summary slider or list */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Pending & Blocked Blocks</span>
            <div className="space-y-1.5 max-h-24 overflow-y-auto custom-scrollbar">
              {items.map((it) => {
                const badgeStyles = {
                  READY: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                  PENDING: 'text-amber-600 bg-amber-50 border-amber-100',
                  BLOCKED: 'text-rose-600 bg-rose-50 border-rose-100'
                }[it.status];

                return (
                  <div key={it.id} className="flex items-center justify-between text-[11px] font-medium py-0.5 border-b border-slate-100 last:border-none">
                    <span className="text-slate-650 truncate max-w-[280px]">{it.name}</span>
                    <span className={`px-1.5 py-0.2 rounded-md font-bold text-[9px] border ${badgeStyles}`}>
                      {it.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
