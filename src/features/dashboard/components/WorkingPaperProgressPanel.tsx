import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { WorkingPaperProgress } from '../../../mock-data/dashboard';

interface WorkingPaperProgressPanelProps {
  progressList: WorkingPaperProgress[];
}

export const WorkingPaperProgressPanel: React.FC<WorkingPaperProgressPanelProps> = ({ progressList }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              <Icons.ClipboardCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Working Paper Completion Rate</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
            By Engagement
          </span>
        </div>

        <div className="space-y-4 pt-1">
          {progressList.map((wp) => (
            <div key={wp.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div>
                  <h4 className="text-slate-900 font-bold leading-tight">{wp.client}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{wp.period}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-slate-800">{wp.percentage}%</span>
                  <p className="text-[9px] text-slate-400 font-medium font-mono">
                    {wp.completed} / {wp.total} Filed
                  </p>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    wp.percentage >= 80
                      ? 'bg-emerald-500'
                      : wp.percentage >= 50
                      ? 'bg-indigo-500'
                      : wp.percentage >= 20
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                  style={{ width: `${wp.percentage}%` }}
                />
              </div>

              {/* Breakdown detail row */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100/50 p-2 rounded-lg">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Completed: <strong className="text-slate-700">{wp.completed}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Under Review: <strong className="text-slate-700">{wp.underReview}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Outstanding: <strong className="text-slate-700">{wp.outstanding}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-50 pt-3.5 mt-4 flex flex-wrap sm:flex-nowrap gap-3">
        <button
          onClick={() => navigate('/audit/working-papers')}
          className="w-full py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
        >
          <Icons.Archive className="w-3.5 h-3.5 text-slate-500" />
          Working Papers
        </button>
        <button
          onClick={() => navigate('/jobs')}
          className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
        >
          <Icons.CheckSquare className="w-3.5 h-3.5 text-slate-200" />
          Review Queue
        </button>
      </div>
    </div>
  );
};
