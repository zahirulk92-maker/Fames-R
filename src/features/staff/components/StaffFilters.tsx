import React from 'react';
import { Search, RotateCcw, ArrowUpDown } from 'lucide-react';

interface StaffFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  filters: {
    role: string;
    status: string;
    department: string;
    manager: string;
    articleshipYear: string;
    availability: string;
  };
  onFilterChange: (key: string, val: string) => void;
  onReset: () => void;
  sortBy: 'name' | 'joiningDate' | 'performance';
  onSortChange: (val: 'name' | 'joiningDate' | 'performance') => void;
}

export const StaffFilters: React.FC<StaffFiltersProps> = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onReset,
  sortBy,
  onSortChange,
}) => {
  const hasActiveFilters = 
    search !== '' || 
    Object.values(filters).some((v) => v !== '');

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-4">
      {/* Primary Search Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
            placeholder="Search by name, staff code, mobile, or email..."
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort By
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-medium text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5 transition-colors grow"
          >
            <option value="name">Name (Alphabetical)</option>
            <option value="joiningDate">Joining Date</option>
            <option value="performance">Performance Score</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role</label>
          <select
            value={filters.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Roles</option>
            <option value="Partner">Partner</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Manager">Manager</option>
            <option value="Senior">Senior</option>
            <option value="Article Student">Article Student</option>
            <option value="Intern">Intern</option>
            <option value="Accounts Officer">Accounts Officer</option>
            <option value="Tax Officer">Tax Officer</option>
            <option value="VAT Officer">VAT Officer</option>
            <option value="Admin Staff">Admin Staff</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Suspended">Suspended</option>
            <option value="Inactive">Inactive</option>
            <option value="Articleship Completed">Articleship Completed</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</label>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange('department', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Departments</option>
            <option value="Audit & Assurance">Audit & Assurance</option>
            <option value="Tax & Compliance">Tax & Compliance</option>
            <option value="IT & Administration">IT & Administration</option>
            <option value="VAT Officer">VAT Officer</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Manager</label>
          <select
            value={filters.manager}
            onChange={(e) => onFilterChange('manager', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Managers</option>
            <option value="A. R. Chowdhury, FCA">A. R. Chowdhury</option>
            <option value="Kabir Hasan">Kabir Hasan</option>
            <option value="Nusrat Jahan">Nusrat Jahan</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Articleship Year</label>
          <select
            value={filters.articleshipYear}
            onChange={(e) => onFilterChange('articleshipYear', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Students</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Availability</label>
          <select
            value={filters.availability}
            onChange={(e) => onFilterChange('availability', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5"
          >
            <option value="">All Availabilities</option>
            <option value="Available">Available</option>
            <option value="Partially Allocated">Partially Allocated</option>
            <option value="Fully Allocated">Fully Allocated</option>
            <option value="On Leave">On Leave</option>
            <option value="Training">Training</option>
            <option value="Examination Leave">Examination Leave</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end pt-1">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Active Filters & Search
          </button>
        </div>
      )}
    </div>
  );
};
