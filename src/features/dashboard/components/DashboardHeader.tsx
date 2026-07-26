import React from 'react';
import * as Icons from 'lucide-react';

interface DashboardHeaderProps {
  onNewJob: () => void;
  onAddClient: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewJob, onAddClient }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300">
      <div className="space-y-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Icons.Database className="w-3 h-3 text-amber-600" />
            Demo Data Only
          </span>
          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Icons.User className="w-3 h-3 text-slate-500" />
            Role: Partner
          </span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back, Md. Zahirul Islam
        </h2>
        
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Here is today’s operational overview for <strong className="text-slate-800">FAMES & R Chartered Accountants</strong>. 
          The workspace is operating in Frontend Foundation Blueprint Mode. To establish persistent storage, configure active endpoints in administration settings.
        </p>

        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pt-1">
          <Icons.Calendar className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Main Call to Actions */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 self-start md:self-center">
        <button
          onClick={onAddClient}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-xs hover:shadow-sm"
        >
          <Icons.UserPlus className="w-4 h-4 text-slate-500" />
          Add Client
        </button>
        <button
          onClick={onNewJob}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Icons.Plus className="w-4 h-4 text-slate-200" />
          New Job
        </button>
      </div>
    </div>
  );
};
