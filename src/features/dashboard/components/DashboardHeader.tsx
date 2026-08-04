import React from 'react';
import * as Icons from 'lucide-react';
import { useToast } from '../../../components/ui';

interface DashboardHeaderProps {
  onNewJob: () => void;
  onAddClient: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewJob, onAddClient }) => {
  const { showToast } = useToast();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Partner Workspace
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Icons.Calendar className="w-3 h-3 text-slate-400" />
            {currentDate}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Welcome back, Mr. Shafi Uddin Ahmed FCA
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-0.5">
          Here is today's operational overview for <strong className="text-slate-800 font-semibold">FAMES & R Chartered Accountants</strong>.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
        <button
          onClick={() => showToast('Issue reporting portal opened.', 'info')}
          className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <Icons.AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Report Problem</span>
        </button>
        <button
          onClick={onAddClient}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <Icons.UserPlus className="w-3.5 h-3.5 text-slate-500" />
          <span>Add Client</span>
        </button>
        <button
          onClick={onNewJob}
          className="inline-flex items-center gap-1.5 bg-[#0d1726] hover:bg-[#132238] text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          <Icons.Plus className="w-4 h-4 text-slate-200" />
          <span>New Job</span>
        </button>
      </div>
    </div>
  );
};
