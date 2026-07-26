import React, { useState, useEffect } from 'react';
import { PageHeader, ContentContainer } from '../../components/layout';
import {
  DataTableShell,
  StatusBadge,
  FormField,
  Modal,
  useToast,
  EmptyState,
} from '../../components/ui';

// Shared Session Store
import {
  getSharedStaff,
  setSharedStaff,
  getSharedProfiles,
  setSharedProfile,
  getSharedTasks,
  setSharedTasks,
  getSharedWorkLogs,
  setSharedWorkLogs,
  getSharedAttendanceRecords,
  setSharedAttendanceRecords,
  getSharedAttendanceSummaries,
  setSharedAttendanceSummaries,
  getSharedPerformanceReviews,
  setSharedPerformanceReviews,
  getSharedLeaveRequests,
  setSharedLeaveRequests,
  getSharedHolidays,
  getSharedSalaryStructures,
  getSharedPayrollPreviews,
  setSharedPayrollPreviews,
  getSharedJobs,
  getSharedJobAssignments,
} from '../sessionState';

import { 
  StaffMember, 
  StaffProfile, 
  StaffTask, 
  WorkLog, 
  AttendanceRecord, 
  AttendanceSummary, 
  PerformanceReview, 
  LeaveRequest, 
  PayrollPreview, 
} from '../../types/staffAndJobs';

// UI components for Staff
import { StaffMetrics } from './components/StaffMetrics';
import { StaffFilters } from './components/StaffFilters';
import { StaffFormModal } from './components/StaffFormModal';
import { StaffDetailsDrawer } from './components/StaffDetailsDrawer';
import { TaskFormModal } from './components/TaskFormModal';

import * as Icons from 'lucide-react';

const DEMO_NOTICE = (
  <div className="bg-slate-900 border-l-4 border-slate-500 p-3 rounded-xl mb-6 text-slate-100 flex items-start gap-2.5">
    <Icons.Info className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
    <div>
      <div className="font-bold text-slate-200">Simulation Mode: Demo Workspace</div>
      <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
        All changes added or edited (staff profiles, task allocations, leave approvals, payroll disbursements) are simulated locally. No data is stored on remote servers or sent to external databases. <strong>Changes reset after browser refresh.</strong>
      </p>
    </div>
  </div>
);

const getStatusBadgeType = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Present':
    case 'Approved Preview':
    case 'Accepted Preview':
    case 'Completed':
    case 'Available':
    case 'Disbursed Demo':
    case 'Approved Demo':
      return 'success';
    case 'On Leave':
    case 'Under Review':
    case 'Partially Allocated':
    case 'Submitted':
    case 'Pending':
    case 'Late':
    case 'Draft':
    case 'Prepared':
      return 'warning';
    case 'Suspended':
    case 'Absent':
    case 'Urgent':
    case 'High':
    case 'High Load':
    case 'Due Today':
    case 'Due Soon':
    case 'Inactive':
    case 'Resigned':
      return 'danger';
    case 'Planning':
    case 'Training':
    case 'Examination Leave':
    case 'Public Holiday':
      return 'info';
    default:
      return 'neutral';
  }
};

// ============================================================================
// 1. STAFF DIRECTORY VIEW
// ============================================================================
export const StaffDirectoryView: React.FC = () => {
  const { showToast } = useToast();
  
  // State
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [profiles, setProfiles] = useState<Record<string, StaffProfile>>({});
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'joiningDate' | 'performance'>('name');
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    department: '',
    manager: '',
    articleshipYear: '',
    availability: '',
  });

  // Modal/Drawer Controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaffToEdit, setSelectedStaffToEdit] = useState<StaffMember | undefined>(undefined);
  const [selectedProfileToEdit, setSelectedProfileToEdit] = useState<StaffProfile | undefined>(undefined);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStaffForDrawer, setSelectedStaffForDrawer] = useState<StaffMember | null>(null);

  // Assign Job Preview Modal State
  const [isAssignJobOpen, setIsAssignJobOpen] = useState(false);
  const [assignJobStaff, setAssignJobStaff] = useState<StaffMember | null>(null);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobRoleInJob, setJobRoleInJob] = useState('Assistant Auditor');
  const [jobAllocation, setJobAllocation] = useState('50');

  useEffect(() => {
    setStaff(getSharedStaff());
    setProfiles(getSharedProfiles());
  }, []);

  const handleFilterChange = (key: string, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      role: '',
      status: '',
      department: '',
      manager: '',
      articleshipYear: '',
      availability: '',
    });
  };

  const handleAddOrEditSubmit = (newStaff: StaffMember, newProfile: StaffProfile) => {
    let updatedStaff: StaffMember[];
    
    if (selectedStaffToEdit) {
      // Edit mode
      updatedStaff = staff.map((s) => (s.id === newStaff.id ? newStaff : s));
      showToast(`Demo staff profile "${newStaff.name}" updated locally.`, 'success');
    } else {
      // Create mode
      updatedStaff = [...staff, newStaff];
      showToast(`Demo staff profile "${newStaff.name}" added locally.`, 'success');
    }

    setStaff(updatedStaff);
    setSharedStaff(updatedStaff);
    setSharedProfile(newStaff.id, newProfile);
    
    // Refresh profiles state
    setProfiles(getSharedProfiles());
    setIsFormOpen(false);
    setSelectedStaffToEdit(undefined);
    setSelectedProfileToEdit(undefined);
  };

  const handleOpenEdit = (member: StaffMember) => {
    setSelectedStaffToEdit(member);
    setSelectedProfileToEdit(profiles[member.id]);
    setIsFormOpen(true);
  };

  const handleOpenDrawer = (member: StaffMember) => {
    setSelectedStaffForDrawer(member);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = (member: StaffMember) => {
    const newStatus: StaffMember['status'] = member.status === 'Active' ? 'Inactive' : 'Active';
    const updated = staff.map((s) => (s.id === member.id ? { ...s, status: newStatus } : s));
    setStaff(updated);
    setSharedStaff(updated);
    showToast(`Temporary status for ${member.name} changed to ${newStatus}.`, 'info');
  };

  const handleExport = () => {
    showToast('FAMES & R Office PRO: Excel export preview generated successfully.', 'success');
  };

  const handleAssignJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId || !assignJobStaff) {
      showToast('Please select a valid job to assign.', 'error');
      return;
    }

    const job = getSharedJobs().find((j) => j.id === selectedJobId);
    if (!job) return;

    // Simulate allocation
    showToast(`Demo job assignment of "${job.jobCode}" to ${assignJobStaff.name} simulated.`, 'success');
    setIsAssignJobOpen(false);
    setAssignJobStaff(null);
    setSelectedJobId('');
  };

  // Filtering Logic
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.staffCode.toLowerCase().includes(search.toLowerCase()) ||
      s.mobile.includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = !filters.role || s.role === filters.role;
    const matchesStatus = !filters.status || s.status === filters.status;
    const matchesDept = !filters.department || s.department === filters.department;
    const matchesManager = !filters.manager || s.assignedManager === filters.manager;
    const matchesYear = !filters.articleshipYear || s.articleshipYear === Number(filters.articleshipYear);
    const matchesAvail = !filters.availability || s.availability === filters.availability;

    return matchesSearch && matchesRole && matchesStatus && matchesDept && matchesManager && matchesYear && matchesAvail;
  });

  // Sorting Logic
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'joiningDate') {
      return new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime();
    } else {
      return b.performanceScore - a.performanceScore;
    }
  });

  return (
    <ContentContainer>
      <PageHeader
        title="Staff Master Registry"
        description="FAMES & R office hierarchy, student articleship details, allocations, and compliance baselines."
        action={{
          label: 'Add Staff Profile',
          onClick: () => {
            setSelectedStaffToEdit(undefined);
            setSelectedProfileToEdit(undefined);
            setIsFormOpen(true);
          },
          icon: 'UserPlus',
        }}
        secondaryAction={{
          label: 'Export Master list',
          onClick: handleExport,
          icon: 'Download',
        }}
      />

      {DEMO_NOTICE}

      <div className="space-y-6">
        {/* Metrics Cards Grid */}
        <StaffMetrics staffList={staff} />

        {/* Filters and Search Bar */}
        <StaffFilters
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Data Table Shell */}
        <DataTableShell
          headers={['Code / Name', 'Official Role', 'Assigned Dept', 'Manager Report', 'Baseline QA', 'Status', 'Actions']}
          totalCount={sortedStaff.length}
          page={1}
          limit={100}
          onPageChange={() => {}}
        >
          {sortedStaff.map((member) => (
            <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      {member.name}
                      <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-1 py-0.5 rounded">
                        {member.staffCode}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-700">{member.role}</div>
                {member.role === 'Article Student' && (
                  <div className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-1.5 py-0.25 rounded inline-block mt-0.5">
                    Year {member.articleshipYear} Student
                  </div>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-slate-500">{member.department}</td>
              <td className="px-6 py-4 font-semibold text-slate-600">{member.assignedManager || 'Partner Direct'}</td>
              <td className="px-6 py-4 font-bold text-slate-700 font-mono">{member.performanceScore}%</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 items-start">
                  <StatusBadge status={member.status} type={getStatusBadgeType(member.status)} />
                  <StatusBadge status={member.availability} type={getStatusBadgeType(member.availability)} />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleOpenDrawer(member)}
                    className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"
                    title="View Profile"
                  >
                    <Icons.Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Edit Profile"
                  >
                    <Icons.Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setAssignJobStaff(member);
                      setIsAssignJobOpen(true);
                    }}
                    className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                    title="Assign Job"
                  >
                    <Icons.UserPlus2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(member)}
                    className={`p-1 rounded ${
                      member.status === 'Active'
                        ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        : 'text-rose-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={member.status === 'Active' ? 'Deactivate' : 'Activate'}
                  >
                    <Icons.Power className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </DataTableShell>
      </div>

      {/* Staff Form Modal */}
      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddOrEditSubmit}
        staffToEdit={selectedStaffToEdit}
        profileToEdit={selectedProfileToEdit}
        existingCodes={staff.map((s) => s.staffCode)}
      />

      {/* Details Drawer */}
      {selectedStaffForDrawer && (
        <StaffDetailsDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedStaffForDrawer(null);
          }}
          staff={selectedStaffForDrawer}
          profile={profiles[selectedStaffForDrawer.id]}
          tasks={getSharedTasks().filter((t) => t.assigneeId === selectedStaffForDrawer.id)}
          assignments={getSharedJobAssignments().filter((a) => a.staffId === selectedStaffForDrawer.id)}
          workLogs={getSharedWorkLogs().filter((w) => w.staffId === selectedStaffForDrawer.id)}
          attendance={getSharedAttendanceRecords().filter((at) => at.staffId === selectedStaffForDrawer.id)}
          leaveRequests={getSharedLeaveRequests().filter((l) => l.staffId === selectedStaffForDrawer.id)}
          performance={getSharedPerformanceReviews().filter((p) => p.staffId === selectedStaffForDrawer.id)}
          salaryStructure={getSharedSalaryStructures()[selectedStaffForDrawer.id]}
        />
      )}

      {/* Assign Job Modal */}
      <Modal
        isOpen={isAssignJobOpen}
        onClose={() => {
          setIsAssignJobOpen(false);
          setAssignJobStaff(null);
        }}
        title={`Assign Job Engagement: ${assignJobStaff?.name}`}
      >
        <form onSubmit={handleAssignJobSubmit} className="space-y-4 text-xs">
          <FormField label="Select Active Office Engagement">
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Choose active job...</option>
              {getSharedJobs().map((job) => (
                <option key={job.id} value={job.id}>
                  {job.jobCode} - {job.clientName} ({job.serviceType})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Assigned Engagement Role">
            <input
              type="text"
              value={jobRoleInJob}
              onChange={(e) => setJobRoleInJob(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>

          <FormField label="Staff Allocation Percentage (%)" helpText="Specify resource allocation capacity.">
            <select
              value={jobAllocation}
              onChange={(e) => setJobAllocation(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="10">10% Allocation</option>
              <option value="25">25% Allocation</option>
              <option value="50">50% Allocation (Balanced)</option>
              <option value="80">80% Allocation (High Focus)</option>
              <option value="100">100% Full allocation</option>
            </select>
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsAssignJobOpen(false);
                setAssignJobStaff(null);
              }}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </Modal>
    </ContentContainer>
  );
};

// ============================================================================
// 2. STAFF TASKS VIEW
// ============================================================================
export const StaffTasksView: React.FC = () => {
  const { showToast } = useToast();

  const [tasks, setTasks] = useState<StaffTask[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StaffTask | undefined>(undefined);

  useEffect(() => {
    setTasks(getSharedTasks());
  }, []);

  const handleTaskSubmit = (task: StaffTask) => {
    let updated: StaffTask[];
    if (editingTask) {
      updated = tasks.map((t) => (t.id === task.id ? task : t));
      showToast(`Temporary task "${task.title}" updated locally.`, 'success');
    } else {
      updated = [task, ...tasks];
      showToast(`Temporary task "${task.title}" created successfully.`, 'success');
    }
    setTasks(updated);
    setSharedTasks(updated);
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id !== taskId) return t;
      const updatedChecklist = t.checklist?.map((item) =>
        item.id === subtaskId ? { ...item, completed: !item.completed } : item
      );
      return { ...t, checklist: updatedChecklist };
    });
    setTasks(updated);
    setSharedTasks(updated);
    showToast('Temporary checklist item toggled.', 'info');
  };

  const handleCycleStatus = (task: StaffTask) => {
    const statusCycle: Record<StaffTask['status'], StaffTask['status']> = {
      'Draft': 'Assigned',
      'Assigned': 'In Progress',
      'In Progress': 'Under Review',
      'Under Review': 'Completed',
      'Completed': 'Draft',
      'Blocked': 'In Progress',
      'Submitted': 'Under Review',
      'Correction Required': 'In Progress',
      'Cancelled': 'Draft',
    };
    const nextStatus = statusCycle[task.status] || 'Assigned';
    const updated = tasks.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t));
    setTasks(updated);
    setSharedTasks(updated);
    showToast(`Task status updated to "${nextStatus}" locally.`, 'success');
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || t.status === statusFilter;
    const matchesPriority = !priorityFilter || t.priority === priorityFilter;
    const matchesAssignee = !assigneeFilter || t.assigneeId === assigneeFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  return (
    <ContentContainer>
      <PageHeader
        title="Internal Task Assignment Sheet"
        description="Daily operational audit procedures, tax schedules, compliance checklists, and task monitoring."
        action={{
          label: 'Create Task Assignment',
          onClick: () => {
            setEditingTask(undefined);
            setIsTaskModalOpen(true);
          },
          icon: 'CheckSquare',
        }}
      />

      {DEMO_NOTICE}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white placeholder-slate-400"
            placeholder="Search tasks by title, client, or assignee..."
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
            >
              <option value="">All Statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="DONE">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assignee</label>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
            >
              <option value="">All Assignees</option>
              {getSharedStaff().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <EmptyState title="No Tasks Found" description="Try broadening your filter criteria or assign a new checklist task." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="border border-slate-100 bg-white rounded-xl shadow-xs p-4 flex flex-col justify-between space-y-3.5 hover:shadow-md transition-shadow">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono uppercase">
                    Job #{task.jobId}
                  </span>
                  <div className="flex gap-1.5">
                    <StatusBadge status={task.priority} type={getStatusBadgeType(task.priority)} />
                    <StatusBadge status={task.status} type={getStatusBadgeType(task.status)} />
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-xs leading-normal">{task.title}</h4>
                <p className="text-[11px] text-slate-400 font-semibold">{task.clientName} &bull; {task.jobTitle}</p>
                <p className="text-slate-500 text-[11px] leading-relaxed italic">{task.description}</p>

                {/* Subtask Checklist */}
                {task.checklist && task.checklist.length > 0 && (
                  <div className="border-t border-slate-100 pt-2.5 mt-2.5 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sub-Task Checklist</span>
                    {task.checklist.map((item) => (
                      <label key={item.id} className="flex items-center gap-2 text-slate-600 font-medium select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleSubtask(task.id, item.id)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-slate-950/5"
                        />
                        <span className={item.completed ? 'line-through text-slate-400' : ''}>{item.item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Icons.User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{task.assigneeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setIsTaskModalOpen(true);
                    }}
                    className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded"
                    title="Edit Task"
                  >
                    <Icons.Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCycleStatus(task)}
                    className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold px-2 py-1 rounded text-[10px]"
                  >
                    <Icons.RefreshCw className="w-3 h-3" />
                    Status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Modal */}
      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleTaskSubmit}
        taskToEdit={editingTask}
        staffList={getSharedStaff()}
        jobsList={getSharedJobs()}
      />
    </ContentContainer>
  );
};

// ============================================================================
// 3. STAFF WORK LOGS VIEW
// ============================================================================
export const StaffWorkLogsView: React.FC = () => {
  const { showToast } = useToast();

  const [logs, setLogs] = useState<WorkLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('4.0');
  const [billable, setBillable] = useState(true);
  const [outcome, setOutcome] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setLogs(getSharedWorkLogs());
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStaffId || !selectedJobId || !description.trim()) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    const staffMember = getSharedStaff().find((s) => s.id === selectedStaffId);
    const job = getSharedJobs().find((j) => j.id === selectedJobId);

    if (!staffMember || !job) return;

    const newLog: WorkLog = {
      id: `wl-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      staffId: staffMember.id,
      staffName: staffMember.name,
      clientId: job.clientId,
      clientName: job.clientName,
      jobId: job.id,
      jobTitle: job.serviceType,
      taskId: 'task-1',
      taskTitle: 'Standard Assignment Work',
      workDescription: description.trim(),
      startTime: '09:00',
      endTime: '17:00',
      totalHours: Number(hours) || 8.0,
      breakDuration: 30,
      billable,
      reviewStatus: 'Under Review',
      outcome: outcome.trim(),
      supportingNote: notes.trim() || undefined,
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    setSharedWorkLogs(updated);
    setIsModalOpen(false);

    // Reset Form
    setSelectedStaffId('');
    setSelectedJobId('');
    setDescription('');
    setHours('4.0');
    setBillable(true);
    setOutcome('');
    setNotes('');

    showToast('Demo work log added; no backend record was created.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Weekly Audit Work Logs & Timesheets"
        description="Verify or record billable audit working hours, inventory count timesheets, and draft sign-off schedules."
        action={{
          label: 'Submit Time Sheet Log',
          onClick: () => setIsModalOpen(true),
          icon: 'Clock',
        }}
      />

      {DEMO_NOTICE}

      <DataTableShell
        headers={['Staff Associate', 'Associated Job / Client', 'Task Activity Details', 'Duration', 'Billing', 'Review Check', 'Recorded Date']}
        totalCount={logs.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {logs.map((log) => (
          <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="font-bold text-slate-900">{log.staffName}</div>
              <div className="text-[10px] text-slate-400 font-mono font-bold">Ref ID: {log.id}</div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-slate-800">{log.clientName}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{log.jobTitle}</div>
            </td>
            <td className="px-6 py-4 max-w-sm">
              <div className="text-slate-700 leading-normal font-semibold">{log.workDescription}</div>
              {log.outcome && (
                <div className="text-[10px] text-indigo-600 mt-1 flex items-center gap-1 font-semibold">
                  <Icons.ArrowRight className="w-3 h-3" />
                  Outcome: {log.outcome}
                </div>
              )}
            </td>
            <td className="px-6 py-4 font-bold text-slate-800 font-mono">{log.totalHours} hrs</td>
            <td className="px-6 py-4">
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${
                log.billable 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
                {log.billable ? 'Billable Client' : 'Non-Billable'}
              </span>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={log.reviewStatus} type={getStatusBadgeType(log.reviewStatus)} />
            </td>
            <td className="px-6 py-4 text-slate-500 font-medium">{log.date}</td>
          </tr>
        ))}
      </DataTableShell>

      {/* Log Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Billable Work Timesheet">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <FormField label="Logging Consultant Staff Member" required>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Choose team member...</option>
              {getSharedStaff().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Associated Audit Engagement" required>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select active job reference...</option>
              {getSharedJobs().map((job) => (
                <option key={job.id} value={job.id}>
                  {job.jobCode} - {job.clientName} ({job.serviceType})
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Work Hours Logged" required>
              <select
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white font-mono"
              >
                <option value="1.0">1.0 Hour</option>
                <option value="2.5">2.5 Hours</option>
                <option value="4.0">4.0 Hours (Half-Day)</option>
                <option value="6.0">6.0 Hours</option>
                <option value="8.0">8.0 Hours (Full-Day)</option>
                <option value="10.0">10.0 Hours (Overtime)</option>
              </select>
            </FormField>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={billable}
                  onChange={(e) => setBillable(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/10"
                />
                <span className="font-bold text-slate-700">Billable to Client Account</span>
              </label>
            </div>
          </div>

          <FormField label="Activity & Substantive Details" required>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white resize-none"
              placeholder="e.g. Conducted substantive reconciliation of petty cash registers and scanned confirmation letters..."
            />
          </FormField>

          <FormField label="Work Deliverable / Outcome Description">
            <input
              type="text"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              placeholder="e.g. Completed audit notes workbook; posted to review queue"
            />
          </FormField>

          <FormField label="Reviewer Notes / Materiality References">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              placeholder="e.g. Discrepancies noted below calculated materiality limits"
            />
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs"
            >
              Post Timesheet Log
            </button>
          </div>
        </form>
      </Modal>
    </ContentContainer>
  );
};

// ============================================================================
// 4. STAFF ATTENDANCE VIEW
// ============================================================================
export const StaffAttendanceView: React.FC = () => {
  const { showToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'daily' | 'monthly'>('daily');
  
  // State
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summaries, setSummaries] = useState<AttendanceSummary[]>([]);

  // Simulator State
  const [simStaffId, setSimStaffId] = useState('');
  const [simCheckIn, setSimCheckIn] = useState('09:00 AM');
  const [simStatus, setSimStatus] = useState<'Present' | 'Late' | 'Absent' | 'On Leave'>('Present');

  useEffect(() => {
    setRecords(getSharedAttendanceRecords());
    setSummaries(getSharedAttendanceSummaries());
  }, []);

  const handleSimulateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simStaffId) {
      showToast('Select a staff member to simulate.', 'error');
      return;
    }

    const member = getSharedStaff().find((s) => s.id === simStaffId);
    if (!member) return;

    // Is there already a record?
    const exists = records.some((r) => r.staffId === simStaffId);
    let updatedRecords: AttendanceRecord[];

    const lateMin = simStatus === 'Late' ? 30 : 0;

    if (exists) {
      updatedRecords = records.map((r) =>
        r.staffId === simStaffId
          ? { ...r, checkIn: simCheckIn, status: simStatus, lateMinutes: lateMin }
          : r
      );
    } else {
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        staffId: member.id,
        staffName: member.name,
        role: member.role,
        checkIn: simCheckIn,
        checkOut: '--',
        workingHours: 8.0,
        lateMinutes: lateMin,
        status: simStatus,
        currentAvailability: member.availability,
      };
      updatedRecords = [newRec, ...records];
    }

    setRecords(updatedRecords);
    setSharedAttendanceRecords(updatedRecords);

    // Update staff availability state too if they checked-in/on-leave
    const updatedStaff = getSharedStaff().map((s) => {
      if (s.id === simStaffId) {
        return {
          ...s,
          attendanceStatus: simStatus,
          availability: simStatus === 'On Leave' ? 'On Leave' : s.availability,
        };
      }
      return s;
    });
    setSharedStaff(updatedStaff);

    // Update monthly summary
    const updatedSummaries = summaries.map((sum) => {
      if (sum.staffId === simStaffId) {
        return {
          ...sum,
          presentCount: simStatus === 'Present' || simStatus === 'Late' ? sum.presentCount + 1 : sum.presentCount,
          lateCount: simStatus === 'Late' ? sum.lateCount + 1 : sum.lateCount,
          absentCount: simStatus === 'Absent' ? sum.absentCount + 1 : sum.absentCount,
          leaveCount: simStatus === 'On Leave' ? sum.leaveCount + 1 : sum.leaveCount,
        };
      }
      return sum;
    });
    setSummaries(updatedSummaries);
    setSharedAttendanceSummaries(updatedSummaries);

    setSimStaffId('');
    showToast('Attendance entry updated locally; changes reset after refresh.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Duty Attendance Registry"
        description="FAMES & R daily punch-in times, late minutes parameters, and monthly attendance percentage metrics."
      />

      {DEMO_NOTICE}

      {/* Quick Clock-In Simulator Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <Icons.Cpu className="w-4 h-4 text-slate-600" />
          <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Quick Attendance & Clock-In Simulator</h4>
        </div>
        <form onSubmit={handleSimulateCheckIn} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs items-end">
          <FormField label="Staff Associate Member">
            <select
              value={simStaffId}
              onChange={(e) => setSimStaffId(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select teammate...</option>
              {getSharedStaff().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Simulated Check-In Time">
            <input
              type="text"
              value={simCheckIn}
              onChange={(e) => setSimCheckIn(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white font-mono"
            />
          </FormField>

          <FormField label="Clock-In Status">
            <select
              value={simStatus}
              onChange={(e) => setSimStatus(e.target.value as any)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Present">Present (Punctual)</option>
              <option value="Late">Late Entry</option>
              <option value="Absent">Absent Today</option>
              <option value="On Leave">On Leave</option>
            </select>
          </FormField>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg transition-colors border border-transparent shadow-xs text-xs"
          >
            Submit Clock Punch
          </button>
        </form>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-100 mb-6 gap-4">
        <button
          onClick={() => setActiveSubTab('daily')}
          className={`py-2 px-1 font-bold text-xs border-b-2 transition-colors ${
            activeSubTab === 'daily'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Daily Attendance Logs (Today)
        </button>
        <button
          onClick={() => setActiveSubTab('monthly')}
          className={`py-2 px-1 font-bold text-xs border-b-2 transition-colors ${
            activeSubTab === 'monthly'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Monthly Summary Ledger
        </button>
      </div>

      {activeSubTab === 'daily' ? (
        <DataTableShell
          headers={['Consultant Teammate', 'Staff Role', 'Check-In Punch', 'Check-Out Punch', 'Worked Hours', 'Late Metric', 'Availability', 'Status']}
          totalCount={records.length}
          page={1}
          limit={100}
          onPageChange={() => {}}
        >
          {records.map((rec) => (
            <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{rec.staffName}</div>
                <div className="text-[10px] text-slate-400 font-medium">Record date: {rec.date}</div>
              </td>
              <td className="px-6 py-4 font-semibold text-slate-600">{rec.role}</td>
              <td className="px-6 py-4 font-mono font-bold text-slate-700">{rec.checkIn || '--'}</td>
              <td className="px-6 py-4 font-mono text-slate-500">{rec.checkOut || '--'}</td>
              <td className="px-6 py-4 font-mono text-slate-600 font-semibold">{rec.workingHours ? `${rec.workingHours} hrs` : '--'}</td>
              <td className="px-6 py-4">
                {rec.lateMinutes && rec.lateMinutes > 0 ? (
                  <span className="font-semibold text-rose-600 font-mono bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">
                    {rec.lateMinutes} min late
                  </span>
                ) : (
                  <span className="text-emerald-600 font-semibold font-mono">Punctual</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-slate-500">{rec.currentAvailability || 'N/A'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={rec.status} type={getStatusBadgeType(rec.status)} />
              </td>
            </tr>
          ))}
        </DataTableShell>
      ) : (
        <DataTableShell
          headers={['Staff Associate', 'Designated Role', 'Present Count', 'Late Count', 'Absent Count', 'Total Leave Days', 'Total Billable Hours', 'Attendance Ratio']}
          totalCount={summaries.length}
          page={1}
          limit={100}
          onPageChange={() => {}}
        >
          {summaries.map((sum) => (
            <tr key={sum.staffId} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">{sum.staffName}</td>
              <td className="px-6 py-4 font-semibold text-slate-600">{sum.role}</td>
              <td className="px-6 py-4 font-mono font-bold text-slate-800">{sum.presentCount} days</td>
              <td className="px-6 py-4 font-mono text-rose-600 font-semibold">{sum.lateCount} entries</td>
              <td className="px-6 py-4 font-mono text-slate-400">{sum.absentCount} days</td>
              <td className="px-6 py-4 font-mono text-amber-600 font-semibold">{sum.leaveCount} days</td>
              <td className="px-6 py-4 font-mono text-slate-700 font-bold">{sum.totalHours} hrs</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded-full font-bold text-xs border ${
                  sum.attendanceRate >= 95 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {sum.attendanceRate}% Rate
                </span>
              </td>
            </tr>
          ))}
        </DataTableShell>
      )}
    </ContentContainer>
  );
};

// ============================================================================
// 5. STAFF PERFORMANCE VIEW
// ============================================================================
export const StaffPerformanceView: React.FC = () => {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);

  // Evaluator Simulator State
  const [evalStaffId, setEvalStaffId] = useState('');
  const [evalPeriod] = useState('Q2 2026');
  const [evalScore, setEvalScore] = useState(90);
  const [evalRating, setEvalRating] = useState<'Outstanding' | 'Very Good' | 'Good' | 'Needs Improvement'>('Very Good');
  const [evalComments, setEvalComments] = useState('');

  useEffect(() => {
    setReviews(getSharedPerformanceReviews());
  }, []);

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalStaffId || !evalComments.trim()) {
      showToast('Select a staff member and provide evaluator feedback comments.', 'error');
      return;
    }

    const member = getSharedStaff().find((s) => s.id === evalStaffId);
    if (!member) return;

    const newRev: PerformanceReview = {
      id: `perf-${Date.now()}`,
      staffId: member.id,
      staffName: member.name,
      role: member.role,
      period: evalPeriod,
      taskCompletion: evalScore - 5,
      timeliness: evalScore - 8,
      reviewQuality: evalScore,
      attendance: 98,
      teamwork: 92,
      overallScore: Number(evalScore) || 90,
      rating: evalRating,
      managerComments: evalComments.trim(),
      strengths: ['Analytical thoroughness', 'Accurate baseline audit vouching'],
      improvementAreas: ['Time efficiency under pressure'],
      trainingRecommendations: ['Advanced spreadsheet modeling'],
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    setSharedPerformanceReviews(updated);

    // Update member score
    const updatedStaff = getSharedStaff().map((s) => {
      if (s.id === evalStaffId) {
        return { ...s, performanceScore: Number(evalScore) };
      }
      return s;
    });
    setSharedStaff(updatedStaff);

    setEvalStaffId('');
    setEvalComments('');
    showToast('Demo performance review added; no backend record created.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Staff Quality & QA Performance Evaluations"
        description="Quarterly audit quality parameters, partner feedback indicators, and procedural compliances."
      />

      {DEMO_NOTICE}

      {/* Quality Evaluator Simulator Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <Icons.CheckSquare className="w-4 h-4 text-slate-600" />
          <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Quality Evaluator Simulator (Partner Panel)</h4>
        </div>
        <form onSubmit={handleSimulateSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs items-end">
          <FormField label="Teammate to Evaluate">
            <select
              value={evalStaffId}
              onChange={(e) => setEvalStaffId(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select teammate...</option>
              {getSharedStaff().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Assigned Performance Rating">
            <select
              value={evalRating}
              onChange={(e) => setEvalRating(e.target.value as any)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Outstanding">Outstanding (95%+)</option>
              <option value="Very Good">Very Good (85%+)</option>
              <option value="Good">Good (75%+)</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>
          </FormField>

          <FormField label="Overall Score (0-100)">
            <input
              type="number"
              min="1"
              max="100"
              value={evalScore}
              onChange={(e) => setEvalScore(Number(e.target.value))}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white font-mono"
            />
          </FormField>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg transition-colors border border-transparent shadow-xs text-xs"
          >
            Post Partner Review
          </button>

          <div className="md:col-span-4">
            <FormField label="Evaluator Constructive Feedback / Manager Comments">
              <input
                type="text"
                value={evalComments}
                onChange={(e) => setEvalComments(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                placeholder="e.g. Meticulous approach to audit working files and trial balances..."
              />
            </FormField>
          </div>
        </form>
      </div>

      <DataTableShell
        headers={['Evaluated Associate', 'Evaluation Period', 'Quality Rating', 'Overall QA Score', 'Feedback Summary', 'Action']}
        totalCount={reviews.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {reviews.map((rev) => (
          <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-bold text-slate-900">{rev.staffName}</td>
            <td className="px-6 py-4 font-semibold text-slate-500 font-mono">{rev.period}</td>
            <td className="px-6 py-4">
              <StatusBadge status={rev.rating} type={getStatusBadgeType(rev.rating)} />
            </td>
            <td className="px-6 py-4 font-bold text-slate-800 font-mono">{rev.overallScore}%</td>
            <td className="px-6 py-4 text-slate-500 max-w-xs truncate italic">"{rev.managerComments}"</td>
            <td className="px-6 py-4">
              <button
                onClick={() => setSelectedReview(rev)}
                className="text-slate-900 font-bold hover:underline"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </DataTableShell>

      {/* Review details modal */}
      {selectedReview && (
        <Modal
          isOpen={!!selectedReview}
          onClose={() => setSelectedReview(null)}
          title={`Performance Scorecard: ${selectedReview.staffName} (${selectedReview.period})`}
        >
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2 text-slate-500">
              <div>Employee: <strong className="text-slate-900">{selectedReview.staffName}</strong></div>
              <div>Rating: <StatusBadge status={selectedReview.rating} type={getStatusBadgeType(selectedReview.rating)} /></div>
              <div>Period: <span className="font-semibold">{selectedReview.period}</span></div>
              <div>Baseline Score: <strong className="text-indigo-600 text-sm">{selectedReview.overallScore}%</strong></div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Review Criteria Parameters</h5>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Task Completion:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedReview.taskCompletion}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeliness Rate:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedReview.timeliness}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Review Quality Index:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedReview.reviewQuality}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance Rate:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedReview.attendance}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Teamwork & Collaboration:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedReview.teamwork}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-slate-800 block">Evaluator Comments</strong>
              <p className="text-slate-500 italic font-medium leading-relaxed bg-amber-50/50 p-2 border border-amber-100 rounded">
                "{selectedReview.managerComments}"
              </p>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-slate-800 block">Identified Strengths</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                {selectedReview.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-slate-800 block">Improvement Focus Areas</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                {selectedReview.improvementAreas.map((s, i) => (
                  <li key={i} className="text-amber-700">{s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-slate-800 block">Recommended Training Programs</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                {selectedReview.trainingRecommendations?.map((s, i) => (
                  <li key={i} className="text-indigo-700">{s}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-3">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </Modal>
      )}
    </ContentContainer>
  );
};

// ============================================================================
// 6. STAFF HOLIDAY CALENDAR VIEW
// ============================================================================
export const StaffHolidayCalendarView: React.FC = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'calendar' | 'leaves'>('calendar');
  
  // State
  const [holidays, setHolidays] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // Form State for Leave Request
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [leaveStaffId, setLeaveStaffId] = useState('');
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysCount, setDaysCount] = useState('2');
  const [reason, setReason] = useState('');
  const [handoverId, setHandoverId] = useState('');
  const [affectedTasks, setAffectedTasks] = useState('');

  useEffect(() => {
    setHolidays(getSharedHolidays());
    setLeaveRequests(getSharedLeaveRequests());
  }, []);

  const handleLeaveRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStaffId || !startDate || !endDate || !reason.trim()) {
      showToast('Please resolve highlight validation errors.', 'error');
      return;
    }

    const member = getSharedStaff().find((s) => s.id === leaveStaffId);
    const handover = getSharedStaff().find((s) => s.id === handoverId);

    if (!member) return;

    const newReq: LeaveRequest = {
      id: `req-${Date.now()}`,
      staffId: member.id,
      staffName: member.name,
      leaveType: leaveType as any,
      startDate,
      endDate,
      numberOfDays: Number(daysCount) || 2,
      reason: reason.trim(),
      handoverPersonId: handover?.id,
      handoverPersonName: handover?.name || 'Unassigned',
      affectedTasksText: affectedTasks.trim(),
      status: 'Pending',
    };

    const updated = [newReq, ...leaveRequests];
    setLeaveRequests(updated);
    setSharedLeaveRequests(updated);
    setIsFormOpen(false);

    // Reset Form
    setLeaveStaffId('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setHandoverId('');
    setAffectedTasks('');

    showToast('Demo study/exam leave requested locally; pending simulation approval.', 'success');
  };

  const handleReviewRequest = (reqId: string, action: 'Approve' | 'Reject') => {
    const nextStatus = action === 'Approve' ? 'Approved Preview' : 'Rejected Preview';
    const updated = leaveRequests.map((req) => {
      if (req.id === reqId) {
        return { ...req, status: nextStatus as any };
      }
      return req;
    });
    setLeaveRequests(updated);
    setSharedLeaveRequests(updated);

    showToast(`Leave request review action simulated; no persistent changes recorded.`, 'info');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Firm Holiday Calendar & Leave Requests"
        description="FAMES & R corporate holiday schedules and article student study leave processing registry."
        action={
          activeTab === 'leaves'
            ? {
                label: 'Request Study Leave',
                onClick: () => setIsFormOpen(true),
                icon: 'Plane',
              }
            : undefined
        }
      />

      {DEMO_NOTICE}

      {/* Tab select links */}
      <div className="flex border-b border-slate-100 mb-6 gap-4">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`py-2 px-1 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'calendar'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          FAMES & R Firm Holidays
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`py-2 px-1 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'leaves'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Study & Exam Leave Requests
        </button>
      </div>

      {activeTab === 'calendar' ? (
        <DataTableShell
          headers={['Holiday Title', 'Start Date', 'Expected End Date', 'Total Duration', 'Classification Category']}
          totalCount={holidays.length}
          page={1}
          limit={100}
          onPageChange={() => {}}
        >
          {holidays.map((h) => (
            <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">{h.title}</td>
              <td className="px-6 py-4 font-semibold text-slate-500 font-mono">{h.date}</td>
              <td className="px-6 py-4 font-medium text-slate-400 font-mono">{h.endDate || h.date}</td>
              <td className="px-6 py-4 font-bold text-slate-700">{h.duration || '1 Day'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={h.type} type={getStatusBadgeType(h.type)} />
              </td>
            </tr>
          ))}
        </DataTableShell>
      ) : (
        <DataTableShell
          headers={['Teammate Requesting', 'Leave Class', 'Duration Dates', 'Days', 'Handover Alternate', 'Status/Approvals', 'Action Panel']}
          totalCount={leaveRequests.length}
          page={1}
          limit={100}
          onPageChange={() => {}}
        >
          {leaveRequests.map((req) => (
            <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{req.staffName}</div>
                <p className="text-[10px] text-slate-400 font-semibold max-w-xs leading-normal">
                  Reason: "{req.reason}"
                </p>
              </td>
              <td className="px-6 py-4 font-semibold text-slate-600">{req.leaveType}</td>
              <td className="px-6 py-4 font-mono font-medium text-slate-500">
                {req.startDate} to {req.endDate}
              </td>
              <td className="px-6 py-4 font-bold text-slate-700 font-mono">{req.numberOfDays} days</td>
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-700">{req.handoverPersonName}</div>
                <p className="text-[10px] text-slate-400 max-w-[150px] truncate leading-normal">
                  {req.affectedTasksText}
                </p>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={req.status} type={getStatusBadgeType(req.status)} />
              </td>
              <td className="px-6 py-4">
                {req.status === 'Pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReviewRequest(req.id, 'Approve')}
                      className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[10px]"
                    >
                      Approve (Demo)
                    </button>
                    <button
                      onClick={() => handleReviewRequest(req.id, 'Reject')}
                      className="px-2 py-1 border border-slate-200 text-slate-600 font-bold rounded text-[10px] hover:bg-rose-50 hover:text-rose-600"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-slate-400 font-bold italic text-[11px]">Reviewed</span>
                )}
              </td>
            </tr>
          ))}
        </DataTableShell>
      )}

      {/* Leave Request Form Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Request Study / Exam Study Leave">
        <form onSubmit={handleLeaveRequestSubmit} className="space-y-4 text-xs">
          <FormField label="Teammate Requesting Leave" required>
            <select
              value={leaveStaffId}
              onChange={(e) => setLeaveStaffId(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select team member...</option>
              {getSharedStaff().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Leave Classification Type">
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Examination Leave">Examination Leave (ICAB)</option>
              <option value="Study Leave">Study Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave (Medical Emergency)</option>
            </select>
          </FormField>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Start Date" required>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white font-mono"
              />
            </FormField>

            <FormField label="End Date" required>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white font-mono"
              />
            </FormField>

            <FormField label="Estimated Days Count">
              <input
                type="number"
                value={daysCount}
                onChange={(e) => setDaysCount(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white font-mono"
              />
            </FormField>
          </div>

          <FormField label="Justification / Reason Description" required>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2.5}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white resize-none"
              placeholder="e.g. Preparing for ICAB Professional Level Examination papers commencing next month..."
            />
          </FormField>

          <div className="border-t border-slate-100 pt-3 mt-3 space-y-3">
            <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Handover & Continuity Planning</h4>
            
            <FormField label="Select Handover Alternate Teammate">
              <select
                value={handoverId}
                onChange={(e) => setHandoverId(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="">Select teammate...</option>
                {getSharedStaff().map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Alternate Continuity Remarks">
              <input
                type="text"
                value={affectedTasks}
                onChange={(e) => setAffectedTasks(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                placeholder="e.g. Apex Holdings inventory audit files will be monitored by Tahmid..."
              />
            </FormField>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs"
            >
              Submit Study Leave Request
            </button>
          </div>
        </form>
      </Modal>
    </ContentContainer>
  );
};

// ============================================================================
// 7. STAFF SALARY ALLOWANCE VIEW
// ============================================================================
export const StaffSalaryAllowanceView: React.FC = () => {
  const { showToast } = useToast();

  const [previews, setPreviews] = useState<PayrollPreview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviews(getSharedPayrollPreviews());
  }, []);

  const handlePreparePayroll = () => {
    setLoading(true);
    // Simulate generation
    setTimeout(() => {
      const updated = previews.map((p) => ({ ...p, paymentStatus: 'Prepared' as const }));
      setPreviews(updated);
      setSharedPayrollPreviews(updated);
      setLoading(false);
      showToast('Payroll preview prepared; no payment was made.', 'success');
    }, 600);
  };

  const handleDisburseStipends = () => {
    setLoading(true);
    setTimeout(() => {
      const updated = previews.map((p) => ({ ...p, paymentStatus: 'Paid Demo' as const }));
      setPreviews(updated);
      setSharedPayrollPreviews(updated);
      setLoading(false);
      showToast('Disbursement simulated; no real transaction transacted.', 'success');
    }, 600);
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Allowances & Stipends Ledger"
        description="FAMES & R article student monthly stipends, managers' salary structures, and compensation previews."
        action={{
          label: 'Prepare Payroll (Demo)',
          onClick: handlePreparePayroll,
          icon: 'Calculator',
        }}
        secondaryAction={{
          label: 'Disburse Stipends (Demo)',
          onClick: handleDisburseStipends,
          icon: 'DollarSign',
        }}
      />

      {DEMO_NOTICE}

      <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl mb-6 flex justify-between items-center text-xs">
        <div>
          <strong className="text-slate-800 font-bold">Billing Cycles Month: July 2026</strong>
          <p className="text-slate-400 font-medium">Verify employee stipends prior to EFT electronic transfer preparations.</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge status="PREPARATION DRAFT" type="warning" />
        </div>
      </div>

      <DataTableShell
        headers={['Recipient Associate', 'Employment Role', 'Filing Period', 'Basic Stipend', 'Total Allowances', 'Deductions (Est. Tax)', 'Estimated Net Pay', 'Ledger Status']}
        totalCount={previews.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
        loading={loading}
      >
        {previews.map((pre) => (
          <tr key={pre.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="font-bold text-slate-900">{pre.staffName}</div>
              <div className="text-[10px] text-slate-400 font-mono font-bold">ID: {pre.staffId}</div>
            </td>
            <td className="px-6 py-4 font-semibold text-slate-600">{pre.role}</td>
            <td className="px-6 py-4 font-mono font-medium text-slate-500">{pre.period}</td>
            <td className="px-6 py-4 font-mono text-slate-700 font-bold">
              {pre.baseSalaryOrStipend.toLocaleString()} BDT
            </td>
            <td className="px-6 py-4 font-mono text-emerald-600 font-semibold">
              +{pre.allowances.toLocaleString()} BDT
            </td>
            <td className="px-6 py-4 font-mono text-rose-600 font-semibold">
              -{pre.deductions.toLocaleString()} BDT
            </td>
            <td className="px-6 py-4 font-mono text-slate-900 font-bold bg-slate-50/30">
              {pre.netPayPreview.toLocaleString()} BDT
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={pre.paymentStatus} type={getStatusBadgeType(pre.paymentStatus)} />
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};
