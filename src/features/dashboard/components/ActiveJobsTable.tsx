import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ActiveJobSummary } from '../../../mock-data/dashboard';
import { StatusBadge, LoadingSkeleton, EmptyState } from '../../../components/ui';

interface ActiveJobsTableProps {
  jobs: ActiveJobSummary[];
  loading?: boolean;
}

export const ActiveJobsTable: React.FC<ActiveJobsTableProps> = ({ jobs, loading = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedService, setSelectedService] = useState('ALL');
  const [sortAsc, setSortAsc] = useState<boolean | null>(null); // null means default mock sequence

  // Unique lists for filter dropdowns
  const statuses = useMemo(() => {
    return ['ALL', ...Array.from(new Set(jobs.map((j) => j.status)))];
  }, [jobs]);

  const serviceTypes = useMemo(() => {
    return ['ALL', 'Statutory Audit', 'Internal Controls', 'RJSC Returns', 'NBR Tax Representation', 'Special Purpose Audit'];
  }, []);

  const filteredAndSortedJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (j) =>
          j.code.toLowerCase().includes(term) ||
          j.client.toLowerCase().includes(term) ||
          j.serviceType.toLowerCase().includes(term) ||
          j.manager.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (selectedStatus !== 'ALL') {
      result = result.filter((j) => j.status === selectedStatus);
    }

    // Service Type filter helper
    if (selectedService !== 'ALL') {
      result = result.filter((j) => j.serviceType.toLowerCase().includes(selectedService.toLowerCase()));
    }

    // Due Date sort
    if (sortAsc !== null) {
      result.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [jobs, searchTerm, selectedStatus, selectedService, sortAsc]);

  const getStatusType = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (status) {
      case 'Planning':
        return 'info';
      case 'In Progress':
        return 'success';
      case 'Under Review':
        return 'warning';
      case 'Waiting for Client':
        return 'neutral';
      case 'Near Deadline':
        return 'warning';
      case 'Overdue':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4">
      {/* Table Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-50 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Icons.Briefcase className="w-4 h-4 text-slate-700" />
            Active Job Engagements
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status check for ongoing client audits and regulatory files.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'Job' : 'Jobs'} Match
          </span>
          <button
            onClick={() => navigate('/jobs')}
            className="text-xs font-bold text-slate-900 hover:text-slate-950 underline flex items-center gap-1"
          >
            View All Jobs
            <Icons.ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
        <div className="grow">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search code, client, service, or manager..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            {statuses.filter(s => s !== 'ALL').map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Service Select */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-white border border-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Services</option>
            {serviceTypes.filter(s => s !== 'ALL').map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>

          {/* Sort Button */}
          <button
            onClick={() => setSortAsc(sortAsc === true ? false : sortAsc === false ? null : true)}
            className={`px-2.5 py-1.5 border rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
              sortAsc !== null
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Icons.CalendarDays className="w-3.5 h-3.5" />
            Sort By Due Date {sortAsc === true ? '↑' : sortAsc === false ? '↓' : ''}
          </button>
        </div>
      </div>

      {/* Interactive Table with Horizontal Scroll */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs">
        {loading ? (
          <LoadingSkeleton rows={4} cols={8} />
        ) : filteredAndSortedJobs.length === 0 ? (
          <EmptyState
            title="No matching jobs found"
            description="Adjust your search term or select other filters to view active jobs."
            icon="Search"
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setSelectedStatus('ALL');
              setSelectedService('ALL');
              setSortAsc(null);
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider select-none">
                  <th className="px-5 py-3">Job Code</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Service Type</th>
                  <th className="px-5 py-3">Assigned Manager</th>
                  <th className="px-5 py-3">Team Allocations</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Due Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredAndSortedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-55/40 transition-colors">
                    {/* Job Code */}
                    <td className="px-5 py-4 font-mono font-bold text-slate-800">
                      {job.code}
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {job.client}
                    </td>

                    {/* Service Type */}
                    <td className="px-5 py-4 text-slate-600">
                      {job.serviceType}
                    </td>

                    {/* Manager */}
                    <td className="px-5 py-4 text-slate-650 font-semibold">
                      {job.manager}
                    </td>

                    {/* Team Allocations */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {job.team.map((m, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 border border-slate-150 text-[10px] px-1.5 py-0.5 rounded-md text-slate-600"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Compact Progress Meter */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 min-w-24">
                        <span className="font-mono font-bold text-slate-700 w-8 text-right">
                          {job.progress}%
                        </span>
                        <div className="grow bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              job.progress >= 90
                                ? 'bg-emerald-500'
                                : job.progress >= 50
                                ? 'bg-indigo-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4 font-mono font-semibold text-slate-600">
                      {job.dueDate}
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <StatusBadge status={job.status} type={getStatusType(job.status)} />
                    </td>

                    {/* Operations */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => navigate('/jobs')}
                          className="text-[11px] font-bold text-slate-900 hover:text-slate-950 hover:underline flex items-center gap-0.5"
                          title="Open Tasks for this Assignment"
                        >
                          <Icons.ListTodo className="w-3 h-3 text-slate-600" />
                          Tasks
                        </button>
                        <button
                          onClick={() => navigate('/jobs/documents')}
                          className="text-[11px] font-bold text-slate-900 hover:text-slate-950 hover:underline flex items-center gap-0.5"
                          title="Open Documents for this Client"
                        >
                          <Icons.File className="w-3 h-3 text-slate-600" />
                          Docs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
