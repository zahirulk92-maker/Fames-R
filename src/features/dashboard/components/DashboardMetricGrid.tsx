import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { DashboardMetric } from '../../../mock-data/dashboard';

interface DashboardMetricGridProps {
  metrics: DashboardMetric[];
}

export const DashboardMetricGrid: React.FC<DashboardMetricGridProps> = ({ metrics }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => {
        // Look up the specific Lucide icon component
        const IconComponent = (Icons as any)[m.icon] || Icons.HelpCircle;

        // Status border classes
        const borderStyles = {
          success: 'hover:border-emerald-200 border-slate-100',
          warning: 'hover:border-amber-200 border-slate-100',
          danger: 'hover:border-rose-200 border-slate-100',
          info: 'hover:border-indigo-200 border-slate-100',
          neutral: 'hover:border-slate-300 border-slate-100'
        }[m.status || 'neutral'];

        const iconBgStyles = {
          success: 'bg-emerald-50 text-emerald-600',
          warning: 'bg-amber-50 text-amber-600',
          danger: 'bg-rose-50 text-rose-600',
          info: 'bg-indigo-50 text-indigo-600',
          neutral: 'bg-slate-50 text-slate-500'
        }[m.status || 'neutral'];

        return (
          <div
            key={m.id}
            onClick={() => navigate(m.route)}
            className={`bg-white rounded-xl border p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${borderStyles}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {m.label}
              </span>
              <div className={`p-2 rounded-lg shrink-0 ${iconBgStyles}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {m.value}
              </h3>
              
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                <span className="text-[10px] text-slate-400 font-semibold truncate">
                  {m.supportingText}
                </span>
                {m.trend && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 border ${
                      m.trend.isPositive
                        ? 'text-emerald-700 bg-emerald-50/50 border-emerald-100'
                        : 'text-rose-700 bg-rose-50/50 border-rose-100'
                    }`}
                  >
                    {m.trend.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
