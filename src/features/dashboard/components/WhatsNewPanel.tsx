import React from 'react';
import * as Icons from 'lucide-react';

export const WhatsNewPanel: React.FC = () => {
  const releases = [
    {
      title: 'Client Communications page',
      description: 'Record minutes, letters, and emails directly under client profiles.',
      icon: 'MessageSquare',
    },
    {
      title: 'Improved Staff Task filters',
      description: 'Filter assignments by status, service scope, and manager in real-time.',
      icon: 'SlidersHorizontal',
    },
    {
      title: 'Working Paper progress tracking',
      description: 'Monitor complete, under-review, and outstanding files by engagement.',
      icon: 'ClipboardCheck',
    },
    {
      title: 'System Readiness checklist',
      description: 'Diagnose cloud storage connectivity and relational database adapters.',
      icon: 'ShieldAlert',
    },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              <Icons.Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">What’s New in Office PRO</h3>
          </div>
          <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
            v1.2 Release
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {releases.map((rel, idx) => {
            const IconComp = (Icons as any)[rel.icon] || Icons.HelpCircle;

            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 shrink-0">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-bold text-slate-800">
                    {rel.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    {rel.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-50 pt-3.5 mt-4">
        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Currently Running</span>
          <strong className="text-xs font-black text-slate-800 block mt-0.5">Frontend Sandbox Mode</strong>
        </div>
      </div>
    </div>
  );
};
