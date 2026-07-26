import React from 'react';
import { MetricCard } from '../../../components/ui';
import { StaffMember } from '../../../types/staffAndJobs';

interface StaffMetricsProps {
  staffList: StaffMember[];
}

export const StaffMetrics: React.FC<StaffMetricsProps> = ({ staffList }) => {
  const total = staffList.length;
  const active = staffList.filter((s) => s.status === 'Active' || s.status === 'On Leave').length;
  const articleStudents = staffList.filter((s) => s.role === 'Article Student').length;
  const managers = staffList.filter((s) => s.role === 'Manager').length;
  const seniors = staffList.filter((s) => s.role === 'Senior').length;
  const onLeaveToday = staffList.filter((s) => s.attendanceStatus === 'On Leave' || s.status === 'On Leave').length;
  const availableForAssignment = staffList.filter((s) => s.availability === 'Available').length;
  const inactive = staffList.filter((s) => s.status === 'Inactive' || s.status === 'Suspended' || s.status === 'Resigned').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Total Team Members" value={total} icon="Users" />
      <MetricCard title="Active Staff" value={active} icon="UserCheck" />
      <MetricCard title="Article Students" value={articleStudents} icon="GraduationCap" />
      <MetricCard title="Managers & Seniors" value={`${managers} M / ${seniors} S`} icon="Briefcase" />
      <MetricCard title="On Leave Today" value={onLeaveToday} icon="CalendarX" />
      <MetricCard title="Available for Assignment" value={availableForAssignment} icon="CheckCircle2" />
      <MetricCard title="Inactive Profiles" value={inactive} icon="UserX" />
      <MetricCard title="Average Performance" value="88.2%" icon="TrendingUp" />
    </div>
  );
};
