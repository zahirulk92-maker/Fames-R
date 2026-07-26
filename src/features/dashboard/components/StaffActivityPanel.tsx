import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { StaffActivitySummary } from '../../../mock-data/dashboard';
import { StatusBadge } from '../../../components/ui';

interface StaffActivityPanelProps {
  activities: StaffActivitySummary[];
}

export const StaffActivityPanel: React.FC<StaffActivityPanelProps> = ({ activities }) => {
  const navigate = useNavigate();

  const getStatusBadgeType = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (status) {
      case 'Working':
        return 'success';
      case 'In Review':
        return 'warning';
      case 'On Leave':
        return 'danger';
      case 'Available':
        return 'info';
      case 'Not Checked In':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Icons.Users className="w-4 h-4 text-slate-700" />
            Article Students - Active Today
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Track student check-ins, active timesheets, and assignments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/staff/attendance')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <Icons.CalendarCheck className="w-3.5 h-3.5 text-slate-500" />
            Attendance Ledger
          </button>
          <button
            onClick={() => navigate('/staff/work-logs')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <Icons.Clock className="w-3.5 h-3.5 text-slate-500" />
            Timesheets Work-Logs
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider select-none">
              <th className="px-5 py-3">Student Name</th>
              <th className="px-5 py-3">Role Designation</th>
              <th className="px-5 py-3">Current Assignment Task</th>
              <th className="px-5 py-3">Active Client Engagement</th>
              <th className="px-5 py-3">Today Check-In</th>
              <th className="px-5 py-3">Work-Log Hours</th>
              <th className="px-5 py-3 text-right">Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {activities.map((staff) => (
              <tr key={staff.id} className="hover:bg-slate-55/45 transition-colors">
                {/* Name */}
                <td className="px-5 py-3.5">
                  <div className="font-bold text-slate-850 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] uppercase border border-slate-200">
                      {staff.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    {staff.name}
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-3.5">
                  <span className="bg-slate-100 border border-slate-200 text-[10px] px-2 py-0.5 rounded-md font-bold text-slate-600">
                    {staff.role}
                  </span>
                </td>

                {/* Current Task */}
                <td className="px-5 py-3.5 text-slate-650 max-w-xs truncate" title={staff.currentTask}>
                  {staff.currentTask}
                </td>

                {/* Client */}
                <td className="px-5 py-3.5 text-slate-800 font-semibold truncate max-w-[150px]">
                  {staff.assignedClient}
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <StatusBadge status={staff.checkInStatus} type={getStatusBadgeType(staff.checkInStatus)} />
                </td>

                {/* Hours */}
                <td className="px-5 py-3.5 font-mono font-bold text-slate-750">
                  {staff.workHours > 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      {staff.workHours} hrs
                    </span>
                  ) : (
                    <span className="text-slate-400">0.0 hrs</span>
                  )}
                </td>

                {/* Availability */}
                <td className="px-5 py-3.5 text-right font-semibold text-slate-500">
                  {staff.availability}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
