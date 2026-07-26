import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, ContentContainer } from '../../components/layout';
import {
  DataTableShell,
  StatusBadge,
  FormField,
  Modal,
  useToast,
} from '../../components/ui';

// Shared Session Store
import {
  getSharedJobs,
  setSharedJobs,
  getSharedJobAssignments,
  getSharedJobDeadlines,
  setSharedJobDeadlines,
  getSharedJobDocuments,
  setSharedJobDocuments,
  getSharedReviewQueue,
  setSharedReviewQueue,
} from '../sessionState';

import { 
  Job, 
  JobAssignment, 
  JobDeadline, 
  JobDocument, 
  ReviewQueueItem 
} from '../../types/staffAndJobs';

import * as Icons from 'lucide-react';

const DEMO_NOTICE = (
  <div className="bg-slate-900 border-l-4 border-slate-500 p-3 rounded-xl mb-6 text-slate-100 flex items-start gap-2.5">
    <Icons.Info className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
    <div>
      <div className="font-bold text-slate-200">Simulation Mode: Demo Workspace</div>
      <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
        All changes added or edited (job engagements, staff allocations, leave approvals, payroll disbursements) are simulated locally. No data is stored on remote servers or sent to external databases. <strong>Changes reset after browser refresh.</strong>
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
    case 'Received':
    case 'Sign Off':
    case 'Approved Demo':
      return 'success';
    case 'On Leave':
    case 'Under Review':
    case 'Partially Allocated':
    case 'Submitted':
    case 'Pending':
    case 'Late':
    case 'Draft':
    case 'In Progress':
    case 'Query Raised':
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
    case 'Requested':
      return 'danger';
    case 'Planning':
    case 'Training':
    case 'Examination Leave':
    case 'Upcoming':
      return 'info';
    default:
      return 'neutral';
  }
};

// ============================================================================
// 1. ALL JOBS INDEX VIEW
// ============================================================================
export const JobsIndexView: React.FC = () => {
  const { showToast } = useToast();

  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for creating job
  const [jobCode, setJobCode] = useState('');
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('Statutory Audit');
  const [period, setPeriod] = useState('FY 2025-26');
  const [partnerName, setPartnerName] = useState('A. R. Chowdhury, FCA');
  const [managerName, setManagerName] = useState('Kabir Hasan');
  const [teamText, setTeamText] = useState('Nusrat Jahan, Tahmid Rahman');
  const [dueDate, setDueDate] = useState('2026-08-31');
  const [priority, setPriority] = useState<Job['priority']>('Normal');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setJobs(getSharedJobs());
  }, []);

  const handleLaunchJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobCode.trim() || !clientName.trim()) {
      showToast('Please specify unique Job Code and Client Name.', 'error');
      return;
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      jobCode: jobCode.trim().toUpperCase(),
      clientName: clientName.trim(),
      clientId: 'c-' + Math.floor(Math.random() * 100),
      serviceType,
      period,
      partnerId: '1',
      partnerName,
      managerId: '2',
      managerName,
      teamMemberIds: ['3', '5'],
      teamMembersText: teamText,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0] || '',
      dueDate,
      status: 'Planning',
      priority,
      description: description.trim(),
      requiredDocuments: ['Trial Balance', 'Audit Evidence Ledger'],
      reviewLevel: 'Manager',
    };

    const updated = [...jobs, newJob];
    setJobs(updated);
    setSharedJobs(updated);
    setIsModalOpen(false);

    // Reset Form
    setJobCode('');
    setClientName('');
    setDescription('');

    // Generate deadline automatically
    const newDeadline: JobDeadline = {
      id: `dl-${Date.now()}`,
      dueDate,
      clientName: clientName.trim(),
      jobId: newJob.id,
      jobTitle: `${serviceType} ${period}`,
      milestone: 'Initialize engagement and preliminary planning',
      responsiblePersonId: '2',
      responsiblePersonName: managerName,
      daysRemaining: Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 3600 * 24)),
      priority,
      status: 'Upcoming',
    };
    const updatedDeadlines = [newDeadline, ...getSharedJobDeadlines()];
    setSharedJobDeadlines(updatedDeadlines);

    showToast(`New Job Engagement "${jobCode}" initialized locally.`, 'success');
  };

  const handleUpdateProgress = (jobId: string) => {
    const updated = jobs.map((j) => {
      if (j.id === jobId) {
        const nextProgress = j.progress >= 90 ? 100 : j.progress + 15;
        const nextStatus = nextProgress === 100 ? 'Completed' : 'In Progress';
        return { ...j, progress: nextProgress, status: nextStatus as any };
      }
      return j;
    });
    setJobs(updated);
    setSharedJobs(updated);
    showToast('Temporary progress level updated locally.', 'success');
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.clientName.toLowerCase().includes(search.toLowerCase()) ||
      j.jobCode.toLowerCase().includes(search.toLowerCase()) ||
      j.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      j.managerName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || j.status === statusFilter;
    const matchesPriority = !priorityFilter || j.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <ContentContainer>
      <PageHeader
        title="Active Jobs Registry"
        description="FAMES & R core client engagements, regulatory tax review deadlines, and statutory audits progress meters."
        action={{
          label: 'Launch Job Engagement',
          onClick: () => {
            setJobCode(`JB-APX-2026-00${jobs.length + 1}`);
            setIsModalOpen(true);
          },
          icon: 'Briefcase',
        }}
      />

      {DEMO_NOTICE}

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
            placeholder="Search jobs by code, client, auditor lead..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
            >
              <option value="">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
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
        </div>
      </div>

      <DataTableShell
        headers={['Job Code', 'Client Name / Scope', 'Service Category', 'Auditor Lead', 'Priority', 'Target Due', 'Status', 'Progress Meter']}
        totalCount={filteredJobs.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {filteredJobs.map((job) => (
          <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">{job.jobCode}</td>
            <td className="px-6 py-4">
              <div className="text-xs font-bold text-slate-900">{job.clientName}</div>
              <div className="text-[10px] text-slate-400 font-medium">Period: {job.period}</div>
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{job.serviceType}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">
              <div>M: {job.managerName}</div>
              <div className="text-[10px] text-slate-400">Team: {job.teamMembersText}</div>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={job.priority} type={getStatusBadgeType(job.priority)} />
            </td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{job.dueDate}</td>
            <td className="px-6 py-4">
              <StatusBadge status={job.status} type={getStatusBadgeType(job.status)} />
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="grow w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-900 h-full rounded-full transition-all" style={{ width: `${job.progress}%` }} />
                </div>
                <button
                  onClick={() => handleUpdateProgress(job.id)}
                  className="text-[10px] font-mono font-bold text-indigo-600 hover:underline"
                  title="Update progress"
                >
                  {job.progress}%
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTableShell>

      {/* Launch Job Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Launch New Engagement Assignment">
        <form onSubmit={handleLaunchJob} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assigned Job Code (Unique)" required>
              <input
                type="text"
                value={jobCode}
                onChange={(e) => setJobCode(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white uppercase font-mono font-bold"
              />
            </FormField>

            <FormField label="Corporate Client Name" required>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                placeholder="e.g. Apex Holdings Ltd."
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Service Type Category">
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Statutory Audit">Statutory Audit</option>
                <option value="Tax Representation">Tax Representation</option>
                <option value="Internal Audit">Internal Audit</option>
                <option value="RJSC Compliance">RJSC Compliance</option>
                <option value="Special Purpose Audit">Special Purpose Audit</option>
              </select>
            </FormField>

            <FormField label="Audited Period / Assessment Year">
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Engagement Signing Partner">
              <select
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA</option>
                <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA</option>
                <option value="S. K. Nandy, FCA">S. K. Nandy, FCA</option>
              </select>
            </FormField>

            <FormField label="Assigned Audit Manager">
              <select
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Kabir Hasan">Kabir Hasan (Manager)</option>
                <option value="Nusrat Jahan">Nusrat Jahan (Senior)</option>
              </select>
            </FormField>
          </div>

          <FormField label="Assigned Field Team (Comma separated)">
            <input
              type="text"
              value={teamText}
              onChange={(e) => setTeamText(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Corporate Due Date">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              />
            </FormField>

            <FormField label="Priority Classification">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </FormField>
          </div>

          <FormField label="Audit Assignment Description & Scope">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white resize-none"
              placeholder="Outline specific objectives or audit milestones..."
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
              Launch Engagement
            </button>
          </div>
        </form>
      </Modal>
    </ContentContainer>
  );
};

// ============================================================================
// 2. JOB ASSIGNMENTS VIEW
// ============================================================================
export const JobAssignmentsView: React.FC = () => {
  const [assignments, setAssignments] = useState<JobAssignment[]>([]);

  useEffect(() => {
    setAssignments(getSharedJobAssignments());
  }, []);

  return (
    <ContentContainer>
      <PageHeader
        title="Staff Job Assignments Ledger"
        description="FAMES & R resource allocation capacity, team roles in audits, and allocated focus levels."
      />

      {DEMO_NOTICE}

      <DataTableShell
        headers={['Job Assignment ID', 'Client / Job Code', 'Assigned Consultant', 'Allocated Capacity', 'Designated Role in Job', 'Period Dates', 'Workload Check']}
        totalCount={assignments.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {assignments.map((asg) => (
          <tr key={asg.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">{asg.id}</td>
            <td className="px-6 py-4">
              <div className="text-xs font-bold text-slate-900">{asg.clientName}</div>
              <div className="text-[10px] text-indigo-600 font-semibold font-mono">{asg.jobCode}</div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-slate-800">{asg.staffName}</div>
            </td>
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">{asg.allocationPercentage}% Focus</td>
            <td className="px-6 py-4 font-semibold text-slate-600">{asg.roleInJob}</td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">
              {asg.startDate} to {asg.dueDate}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={asg.workloadStatus} type={getStatusBadgeType(asg.workloadStatus)} />
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ============================================================================
// 3. JOB DEADLINES VIEW
// ============================================================================
export const JobDeadlinesView: React.FC = () => {
  const [deadlines, setDeadlines] = useState<JobDeadline[]>([]);

  useEffect(() => {
    setDeadlines(getSharedJobDeadlines());
  }, []);

  return (
    <ContentContainer>
      <PageHeader
        title="Critical Milestones & Filing Deadlines"
        description="Track physical signature dates, statutory submission milestones, and days remaining indices."
      />

      {DEMO_NOTICE}

      <DataTableShell
        headers={['Milestone ID', 'Milestone Objective', 'Client / Engagement Title', 'Target Deadline', 'Days Remaining', 'Priority Rating', 'Ledger Status']}
        totalCount={deadlines.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {deadlines.map((dl) => {
          const isOverdue = dl.daysRemaining < 0;
          return (
            <tr key={dl.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">{dl.id}</td>
              <td className="px-6 py-4">
                <div className="text-xs font-bold text-slate-900">{dl.milestone}</div>
                <div className="text-[10px] text-slate-400 font-medium">Lead: {dl.responsiblePersonName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-700">{dl.clientName}</div>
                <div className="text-[10px] text-slate-500">{dl.jobTitle}</div>
              </td>
              <td className="px-6 py-4 text-xs font-mono font-bold text-slate-600">{dl.dueDate}</td>
              <td className="px-6 py-4">
                {isOverdue ? (
                  <span className="font-bold text-rose-600 font-mono bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">
                    {Math.abs(dl.daysRemaining)} Days Overdue
                  </span>
                ) : dl.daysRemaining === 0 ? (
                  <span className="font-bold text-rose-700 font-mono bg-rose-50 border border-rose-200 px-2 py-0.5 rounded animate-pulse">
                    Due Today
                  </span>
                ) : (
                  <span className="font-bold text-slate-700 font-mono">
                    {dl.daysRemaining} Days Left
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={dl.priority} type={getStatusBadgeType(dl.priority)} />
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={dl.status} type={getStatusBadgeType(dl.status)} />
              </td>
            </tr>
          );
        })}
      </DataTableShell>
    </ContentContainer>
  );
};

// ============================================================================
// 4. JOB DOCUMENTS VIEW
// ============================================================================
export const JobDocumentsView: React.FC = () => {
  const { showToast } = useToast();
  
  // State
  const [documents, setDocuments] = useState<JobDocument[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');

  useEffect(() => {
    setDocuments(getSharedJobDocuments());
  }, []);

  const simulateDocUpload = (fileName: string) => {
    const newDoc: JobDocument = {
      id: `doc-${Date.now()}`,
      clientId: '1',
      clientName: 'Apex Holdings Ltd.',
      jobId: '1',
      jobTitle: 'Statutory Audit FY 2025-26',
      documentTitle: fileName,
      category: 'Audit Evidence',
      requestedDate: new Date().toISOString().split('T')[0],
      ownerId: '2',
      ownerName: 'Kabir Hasan',
      status: 'Received',
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    setSharedJobDocuments(updated);
    showToast(`Document "${fileName}" securely uploaded to temporary vault.`, 'success');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateDocUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateDocUpload(e.target.files[0].name);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = !categoryFilter || doc.category === categoryFilter;
    const matchesClient = !clientFilter || doc.clientId === clientFilter;
    return matchesCategory && matchesClient;
  });

  return (
    <ContentContainer>
      <PageHeader
        title="Secured Audit Documents Registry"
        description="Verify evidence uploaded by clients, trace trial balances spreadsheets, and upload physical working papers."
      />

      {DEMO_NOTICE}

      {/* Touch-Friendly Drag and Drop File Upload Container */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-6 ${
          dragActive
            ? 'border-slate-900 bg-slate-50'
            : 'border-slate-200 bg-white hover:border-slate-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center">
          <Icons.Upload className="w-10 h-10 text-slate-400 mb-3" />
          <p className="text-xs font-bold text-slate-800">Drag and drop file here, or click to choose manual upload</p>
          <p className="text-[10px] text-slate-400 mt-1">Accepted formats: .XLSX, .PDF, .DOCX, .ZIP (Max size 50MB)</p>
        </div>
      </div>

      {/* Advanced Filter Row */}
      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filter by Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
          >
            <option value="">All Categories</option>
            <option value="Trial Balance">Trial Balance</option>
            <option value="Legal Documents">Legal Documents</option>
            <option value="Confirmations">Confirmations</option>
            <option value="Audit Evidence">Audit Evidence</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filter by Client</label>
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1.5 font-medium text-slate-700"
          >
            <option value="">All Clients</option>
            <option value="1">Apex Holdings Ltd.</option>
            <option value="2">Square Pharmaceuticals</option>
            <option value="3">Beximco Communications</option>
          </select>
        </div>
      </div>

      <DataTableShell
        headers={['File Name', 'Category', 'Client Name / Job', 'Requested Date', 'Owner / Auditor', 'Tracker Status']}
        totalCount={filteredDocs.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {filteredDocs.map((doc) => (
          <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{doc.documentTitle}</td>
            <td className="px-6 py-4">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 border border-slate-200 text-slate-600 uppercase tracking-wide font-mono">
                {doc.category}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="font-semibold text-slate-700">{doc.clientName}</div>
              <div className="text-[10px] text-slate-400">{doc.jobTitle}</div>
            </td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{doc.requestedDate}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{doc.ownerName}</td>
            <td className="px-6 py-4">
              <StatusBadge status={doc.status} type={getStatusBadgeType(doc.status)} />
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ============================================================================
// 5. JOB REVIEW QUEUE VIEW
// ============================================================================
export const JobReviewQueueView: React.FC = () => {
  const { showToast } = useToast();

  const [queue, setQueue] = useState<ReviewQueueItem[]>([]);

  useEffect(() => {
    setQueue(getSharedReviewQueue());
  }, []);

  const handleReviewAction = (id: string, action: 'Approve' | 'Query') => {
    const nextStatus = action === 'Approve' ? 'Approved Demo' : 'Query Raised';
    const updated = queue.map((item) => {
      if (item.id === id) {
        return { ...item, status: nextStatus as any };
      }
      return item;
    });
    setQueue(updated);
    setSharedReviewQueue(updated);

    showToast(`Review action simulated; no persistent approval recorded.`, 'success');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Manager & Partner Sign-off Review Queue"
        description="Verify drafted accounts, sub-task checklists, and working papers prior to signing off physical audit opinions."
      />

      {DEMO_NOTICE}

      <DataTableShell
        headers={['Review Item ID', 'Working Paper Segment', 'Prepared By', 'Assigned Reviewer', 'Client Name / Job Link', 'Submitted Date', 'Priority', 'Review Status', 'Operations Action']}
        totalCount={queue.length}
        page={1}
        limit={100}
        onPageChange={() => {}}
      >
        {queue.map((q) => (
          <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">{q.id}</td>
            <td className="px-6 py-4">
              <div className="text-xs font-bold text-slate-900">{q.itemTitle}</div>
              <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{q.type}</div>
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-700">{q.preparedByName}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{q.reviewerName}</td>
            <td className="px-6 py-4">
              <div className="font-semibold text-slate-700">{q.clientName}</div>
              <div className="text-[10px] text-slate-400">{q.jobTitle}</div>
            </td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{q.submittedDate}</td>
            <td className="px-6 py-4">
              <StatusBadge status={q.priority} type={getStatusBadgeType(q.priority)} />
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={q.status} type={getStatusBadgeType(q.status)} />
            </td>
            <td className="px-6 py-4">
              {q.status === 'Submitted' || q.status === 'Under Review' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReviewAction(q.id, 'Approve')}
                    className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[10px] hover:bg-slate-800 transition-colors"
                  >
                    Sign Off (Demo)
                  </button>
                  <button
                    onClick={() => handleReviewAction(q.id, 'Query')}
                    className="px-2 py-1 border border-slate-200 text-slate-600 font-bold rounded text-[10px] hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    Raise Query
                  </button>
                </div>
              ) : (
                <span className="text-slate-400 font-bold italic text-[11px]">Completed</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};
