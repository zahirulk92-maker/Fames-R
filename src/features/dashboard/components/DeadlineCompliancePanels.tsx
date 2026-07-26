import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { DeadlineSummary, ComplianceCalendarItem } from '../../../mock-data/dashboard';
import { StatusBadge, useToast } from '../../../components/ui';

interface DeadlineCompliancePanelsProps {
  deadlines: DeadlineSummary[];
  complianceItems: ComplianceCalendarItem[];
}

export const DeadlineCompliancePanels: React.FC<DeadlineCompliancePanelsProps> = ({
  deadlines,
  complianceItems,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRemindMe = (eventTitle: string, user: string) => {
    showToast(`Reminded dispatched to ${user} for "${eventTitle}" (Simulated Notification).`, 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* PANEL A: JOBS NEAR DEADLINE */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 text-white rounded-lg">
                <Icons.AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Critical Engagements Deadlines</h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">
              Audit filing timelines
            </span>
          </div>

          <div className="space-y-3">
            {deadlines.map((dl) => {
              // Highlight style based on days remaining
              const isOverdue = dl.daysRemaining < 0;
              const isCritical = dl.daysRemaining >= 0 && dl.daysRemaining <= 3;
              const isWarning = dl.daysRemaining > 3 && dl.daysRemaining <= 7;

              let alertBg = 'bg-slate-50 border-slate-100';
              let badgeType: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
              let highlightIndicator = 'bg-slate-300';

              if (isOverdue) {
                alertBg = 'bg-rose-50/50 border-rose-100';
                badgeType = 'danger';
                highlightIndicator = 'bg-rose-500';
              } else if (isCritical) {
                alertBg = 'bg-rose-50/20 border-amber-100';
                badgeType = 'danger';
                highlightIndicator = 'bg-amber-500';
              } else if (isWarning) {
                alertBg = 'bg-amber-50/20 border-amber-50';
                badgeType = 'warning';
                highlightIndicator = 'bg-amber-400';
              }

              return (
                <div
                  key={dl.id}
                  className={`border rounded-xl p-3.5 flex items-start gap-3 relative overflow-hidden transition-all duration-200 ${alertBg}`}
                >
                  {/* Decorative left bar indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${highlightIndicator}`} />

                  <div className="grow space-y-1 pl-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900">
                        {dl.client}
                      </h4>
                      <StatusBadge
                        status={isOverdue ? 'Overdue' : `${dl.daysRemaining} days left`}
                        type={badgeType}
                      />
                    </div>
                    
                    <p className="text-[11px] font-semibold text-slate-600">{dl.job}</p>
                    
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1.5 border-t border-slate-100/50">
                      <span>Owner: <strong className="text-slate-700">{dl.responsible}</strong></span>
                      <span className="font-mono text-slate-500">Due {dl.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-50 pt-3 mt-4">
          <button
            onClick={() => navigate('/jobs/deadlines')}
            className="w-full text-center text-xs font-bold text-slate-900 hover:text-slate-950 flex items-center justify-center gap-1.5 py-1"
          >
            Open Deadlines Manager
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PANEL B: COMPLIANCE CALENDAR */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 text-white rounded-lg">
                <Icons.CalendarDays className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Compliance Returns Ledger</h3>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
              NBR & RJSC Dates
            </span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {complianceItems.map((cal) => (
              <div
                key={cal.id}
                className="flex items-start justify-between p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-150 rounded-xl gap-3 transition-colors text-xs"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="bg-slate-900 text-white font-mono font-bold text-[10px] py-1 px-2.5 rounded-lg text-center shrink-0 min-w-20">
                    {cal.deadline}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-[11px] font-bold text-slate-800 truncate" title={cal.event}>
                      {cal.event}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-semibold truncate">
                      Client: {cal.client} | Staff: {cal.responsible}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <StatusBadge
                    status={cal.status}
                    type={cal.status === 'COMPLETED' ? 'success' : 'warning'}
                  />
                  {cal.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleRemindMe(cal.event, cal.responsible)}
                      className="text-[10px] font-bold text-slate-900 hover:text-slate-950 underline cursor-pointer"
                    >
                      Remind
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-50 pt-3 mt-4">
          <button
            onClick={() => navigate('/compliance/calendar')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Icons.Calendar className="w-4 h-4 text-slate-200" />
            Open Compliance Calendar
          </button>
        </div>
      </div>

    </div>
  );
};
