import React from 'react';
import * as Icons from 'lucide-react';
import { DashboardActivity } from '../../../mock-data/dashboard';

interface RecentActivityTimelineProps {
  activities: DashboardActivity[];
}

export const RecentActivityTimeline: React.FC<RecentActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              <Icons.Activity className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Security Audit Trails & Activities</h3>
          </div>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Demo Logs
          </span>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-slate-100 pl-4 space-y-5 py-1 max-h-[380px] overflow-y-auto custom-scrollbar">
          {activities.map((act) => {
            const IconComponent = (Icons as any)[act.icon] || Icons.Clock;

            return (
              <div key={act.id} className="relative group">
                {/* Timeline node circle */}
                <div className="absolute -left-[24px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-slate-900 group-hover:border-slate-950 transition-colors">
                  <IconComponent className="w-2 h-2 text-slate-800 group-hover:text-white" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <strong className="text-slate-850 font-bold group-hover:text-slate-950 transition-colors">
                      {act.action}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-semibold font-mono shrink-0">
                      {act.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-500">
                    User: <span className="text-slate-700 font-bold">{act.actor}</span>
                  </p>

                  <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 p-1.5 rounded-lg text-[10px] font-mono font-bold text-slate-500">
                    <Icons.Link className="w-3 h-3 text-slate-350" />
                    <span>Target: {act.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-50 pt-3.5 mt-4">
        <div className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest select-none leading-none">
          Continuous Audit Trace Activated
        </div>
      </div>
    </div>
  );
};
