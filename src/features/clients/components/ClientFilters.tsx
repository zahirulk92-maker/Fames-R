import React from 'react';
import { Search, RotateCcw, ArrowUpDown } from 'lucide-react';

interface ClientFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  typeFilter: string;
  onTypeFilterChange: (val: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (val: string) => void;
  managerFilter: string;
  onManagerFilterChange: (val: string) => void;
  portalFilter: string;
  onPortalFilterChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  onClearFilters: () => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  serviceFilter,
  onServiceFilterChange,
  managerFilter,
  onManagerFilterChange,
  portalFilter,
  onPortalFilterChange,
  sortBy,
  onSortByChange,
  onClearFilters,
}) => {
  const clientTypes = [
    'Private Limited Company',
    'Public Limited Company',
    'Partnership',
    'Proprietorship',
    'NGO',
    'Trust',
    'Association',
    'Individual',
    'Other',
  ];

  const services = [
    'Statutory Audit',
    'Internal Audit',
    'Accounting',
    'Income Tax',
    'VAT',
    'RJSC',
    'Advisory',
    'Payroll',
    'Company Secretarial',
  ];

  const clientStatuses = ['Active', 'Pending Onboarding', 'Inactive', 'Suspended', 'Archived'];

  const portalStatuses = ['Not Invited', 'Invitation Prepared', 'Invited', 'Active', 'Suspended', 'Revoked'];

  const managers = ['Kabir Hasan', 'M. F. Ahmed, FCA', 'Sajid Ahmed', 'Tahmid Rahman'];

  const isFiltered = 
    search !== '' ||
    statusFilter !== '' ||
    typeFilter !== '' ||
    serviceFilter !== '' ||
    managerFilter !== '' ||
    portalFilter !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-150 p-5 shadow-2xs space-y-4" id="client-filters-container">
      {/* Search Input and Basic Sort */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="client-master-search-input"
            type="text"
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors"
            placeholder="Search by name, code, TIN, BIN, phone, or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-max">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </div>
          <select
            id="client-master-sort-select"
            className="p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 w-full md:w-48 cursor-pointer font-medium text-slate-700"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="name">Client Name (A-Z)</option>
            <option value="name-desc">Client Name (Z-A)</option>
            <option value="recent">Recently Added</option>
            <option value="status">Operational Status</option>
          </select>
        </div>
      </div>

      {/* Advanced Filter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Status</label>
          <select
            id="filter-status-select"
            className="w-full p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            {clientStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Entity Type</label>
          <select
            id="filter-type-select"
            className="w-full p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
          >
            <option value="">All Types</option>
            {clientTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Service Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Relationship Service</label>
          <select
            id="filter-service-select"
            className="w-full p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
            value={serviceFilter}
            onChange={(e) => onServiceFilterChange(e.target.value)}
          >
            <option value="">All Services</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Assigned Manager Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Assigned Manager</label>
          <select
            id="filter-manager-select"
            className="w-full p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
            value={managerFilter}
            onChange={(e) => onManagerFilterChange(e.target.value)}
          >
            <option value="">All Managers</option>
            {managers.map(manager => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
          </select>
        </div>

        {/* Portal Access Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Portal Status</label>
          <select
            id="filter-portal-select"
            className="w-full p-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
            value={portalFilter}
            onChange={(e) => onPortalFilterChange(e.target.value)}
          >
            <option value="">All Portal Statuses</option>
            {portalStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Action */}
      {isFiltered && (
        <div className="flex justify-end pt-1" id="clear-filters-action-panel">
          <button
            id="clear-all-filters-btn"
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All Active Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
