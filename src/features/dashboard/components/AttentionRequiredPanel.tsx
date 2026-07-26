import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { AttentionItem } from '../../../mock-data/dashboard';

interface AttentionRequiredPanelProps {
  items: AttentionItem[];
}

export const AttentionRequiredPanel: React.FC<AttentionRequiredPanelProps> = ({ items }) => {
  const [list, setList] = useState<AttentionItem[]>(items);

  const handleDismiss = (id: string) => {
    setList((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-900 text-white rounded-lg">
            <Icons.AlertCircle className="w-4 h-4 animate-bounce" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Attention Required</h3>
        </div>
        <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100 uppercase tracking-wider">
          {list.length} Items
        </span>
      </div>

      {list.length === 0 ? (
        <div className="py-8 text-center text-slate-400 font-medium text-xs flex flex-col items-center justify-center space-y-2">
          <Icons.CheckCircle className="w-8 h-8 text-emerald-500" />
          <p>Excellent! No issues require attention currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((it) => {
            // Colors based on severity
            let colorClasses = 'bg-slate-50 border-slate-150 text-slate-800';
            let iconColor = 'text-slate-500';
            let label = 'Info';
            let IconComp = Icons.Info;

            if (it.severity === 'Critical') {
              colorClasses = 'bg-rose-50/50 border-rose-100 text-rose-900';
              iconColor = 'text-rose-600';
              label = 'Critical';
              IconComp = Icons.AlertOctagon;
            } else if (it.severity === 'Warning') {
              colorClasses = 'bg-amber-50/40 border-amber-150 text-amber-900';
              iconColor = 'text-amber-600';
              label = 'Warning';
              IconComp = Icons.AlertTriangle;
            } else if (it.severity === 'Information') {
              colorClasses = 'bg-indigo-50/50 border-indigo-100 text-indigo-900';
              iconColor = 'text-indigo-600';
              label = 'System Info';
              IconComp = Icons.HelpCircle;
            }

            return (
              <div
                key={it.id}
                className={`border rounded-xl p-4 flex gap-3.5 relative overflow-hidden transition-all duration-200 ${colorClasses}`}
              >
                <div className="shrink-0 mt-0.5">
                  <IconComp className={`w-4 h-4 ${iconColor}`} />
                </div>

                <div className="grow space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-white/70 border border-slate-200/50">
                      {label}
                    </span>
                    <button
                      onClick={() => handleDismiss(it.id)}
                      className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
                      title="Acknowledge Issue"
                    >
                      <Icons.X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-bold leading-relaxed">
                    {it.message}
                  </p>

                  {it.details && (
                    <p className="text-[10px] text-slate-500 font-semibold font-mono">
                      Diagnostics: {it.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
