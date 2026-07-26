import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { PendingReviewSummary } from '../../../mock-data/dashboard';
import { useToast } from '../../../components/ui';

interface PendingReviewsPanelProps {
  initialReviews: PendingReviewSummary[];
}

export const PendingReviewsPanel: React.FC<PendingReviewsPanelProps> = ({ initialReviews }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<PendingReviewSummary[]>(initialReviews);

  const handleAction = (id: string, actionName: string) => {
    if (actionName === 'review') {
      showToast(`Marked review paper as reviewed & approved (Demo Simulation).`, 'success');
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else if (actionName === 'correct') {
      showToast(`Working paper returned with correction remarks to student.`, 'info');
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              <Icons.FileCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Review Queue</h3>
          </div>
          <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
            {reviews.length} Awaiting
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-medium text-xs flex flex-col items-center justify-center space-y-2">
            <Icons.CheckCircle className="w-8 h-8 text-emerald-500" />
            <p>Perfect! Your review queue is completely clear.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 space-y-3.5 pt-1 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-3.5 first:pt-0 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 hover:text-slate-950 transition-colors">
                      {rev.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Icons.Building className="w-3 h-3 text-slate-300" />
                      {rev.client}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    rev.priority === 'Urgent'
                      ? 'bg-rose-50 border-rose-100 text-rose-700'
                      : rev.priority === 'High'
                      ? 'bg-amber-50 border-amber-100 text-amber-700'
                      : 'bg-indigo-50 border-indigo-100 text-indigo-700'
                  }`}>
                    {rev.priority}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[10px] font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>Prep: <strong className="text-slate-700">{rev.preparedBy}</strong></span>
                    <span className="text-slate-300">|</span>
                    <span>Review: <strong className="text-slate-700">{rev.reviewer}</strong></span>
                  </div>
                  <span className="font-mono text-slate-400">{rev.submittedDate}</span>
                </div>

                {/* Simulated action row */}
                <div className="flex items-center justify-end gap-2.5 text-[10px] font-bold">
                  <button
                    onClick={() => handleAction(rev.id, 'correct')}
                    className="text-slate-500 hover:text-rose-600 transition-colors py-1 cursor-pointer flex items-center gap-0.5"
                  >
                    <Icons.RotateCcw className="w-3.5 h-3.5" />
                    Return for Correction
                  </button>
                  <span className="text-slate-200">|</span>
                  <button
                    onClick={() => handleAction(rev.id, 'review')}
                    className="text-slate-900 hover:text-emerald-600 transition-colors py-1 cursor-pointer flex items-center gap-0.5"
                  >
                    <Icons.CheckCircle2 className="w-3.5 h-3.5" />
                    Sign Off
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-slate-50 pt-3 mt-4">
        <button
          onClick={() => navigate('/jobs')}
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Icons.Layers className="w-4 h-4 text-slate-200" />
          Open Full Review Board
        </button>
      </div>
    </div>
  );
};
