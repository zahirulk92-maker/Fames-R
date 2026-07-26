import React, { useState } from 'react';
import { ContentContainer } from '../../components/layout';
import { Modal, FormField, useToast } from '../../components/ui';

// Import central mock data types and models
import {
  MOCK_LAUNCH_READINESS,
  MOCK_DASHBOARD_METRICS,
  MOCK_ACTIVE_JOBS,
  MOCK_PENDING_REVIEWS,
  MOCK_DEADLINES,
  MOCK_COMPLIANCE_CALENDAR,
  MOCK_STAFF_ACTIVITY,
  MOCK_WORKING_PAPER_PROGRESS,
  MOCK_DASHBOARD_ACTIVITIES,
  MOCK_ATTENTION_ITEMS,
  ActiveJobSummary,
  DashboardActivity,
} from '../../mock-data/dashboard';

// Import custom sub-components
import { DashboardHeader } from './components/DashboardHeader';
import { LaunchReadinessCard } from './components/LaunchReadinessCard';
import { DashboardMetricGrid } from './components/DashboardMetricGrid';
import { QuickActionsGrid } from './components/QuickActionsGrid';
import { ActiveJobsTable } from './components/ActiveJobsTable';
import { PendingReviewsPanel } from './components/PendingReviewsPanel';
import { DeadlineCompliancePanels } from './components/DeadlineCompliancePanels';
import { StaffActivityPanel } from './components/StaffActivityPanel';
import { WorkingPaperProgressPanel } from './components/WorkingPaperProgressPanel';
import { RecentActivityTimeline } from './components/RecentActivityTimeline';
import { AttentionRequiredPanel } from './components/AttentionRequiredPanel';
import { WhatsNewPanel } from './components/WhatsNewPanel';

export const DashboardPage: React.FC = () => {
  const { showToast } = useToast();
  
  // React State for interactive mock updates
  const [jobs, setJobs] = useState<ActiveJobSummary[]>(MOCK_ACTIVE_JOBS);
  const [activities, setActivities] = useState<DashboardActivity[]>(MOCK_DASHBOARD_ACTIVITIES);

  // Modal open states
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isLogCommOpen, setIsLogCommOpen] = useState(false);
  const [isReviewPaperOpen, setIsReviewPaperOpen] = useState(false);

  // Form states for sandbox additions
  const [newClientName, setNewClientName] = useState('');
  const [newClientPartner, setNewClientPartner] = useState('A. R. Chowdhury, FCA');
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobClient, setNewJobClient] = useState('Apex Holdings Ltd.');
  const [newJobManager, setNewJobManager] = useState('Kabir Hasan');
  const [newJobType, setNewJobType] = useState('Statutory Audit (FY 2025-26)');
  const [newJobDeadline, setNewJobDeadline] = useState('2026-09-30');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Sajid Ahmed');
  const [newDocName, setNewDocName] = useState('');
  const [newDocClient, setNewDocClient] = useState('Square Pharmaceuticals');
  const [newCommClient, setNewCommClient] = useState('Beximco Communications');
  const [newCommSubject, setNewCommSubject] = useState('');
  const [newPaperTitle, setNewPaperTitle] = useState('');

  // 1. Add Client Sandbox Handler
  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      showToast('Please enter a valid client name.', 'error');
      return;
    }

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: 'Registered client profile',
      actor: 'A. R. Chowdhury (Partner)',
      target: newClientName,
      timestamp: 'Just now',
      icon: 'UserPlus',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Successfully registered ${newClientName} in sandbox.`, 'success');
    
    // Reset and close
    setNewClientName('');
    setIsAddClientOpen(false);
  };

  // 2. Create Job Sandbox Handler (directly appends to ActiveJobsTable)
  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) {
      showToast('Please enter a job scope title.', 'error');
      return;
    }

    const newJobCode = `AUD-${newJobClient.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const newJob: ActiveJobSummary = {
      id: `job-${Date.now()}`,
      code: newJobCode,
      client: newJobClient,
      serviceType: newJobType,
      manager: newJobManager,
      team: ['Tahmid Rahman'],
      progress: 0,
      dueDate: newJobDeadline,
      status: 'Planning',
    };

    setJobs((prev) => [newJob, ...prev]);

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: `Created new assignment: ${newJobCode}`,
      actor: 'A. R. Chowdhury (Partner)',
      target: newJobClient,
      timestamp: 'Just now',
      icon: 'Briefcase',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Case ${newJobCode} created successfully under planning stage.`, 'success');

    // Reset and close
    setNewJobTitle('');
    setIsNewJobOpen(false);
  };

  // 3. Assign Task Sandbox Handler
  const handleAssignTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      showToast('Please enter a task description.', 'error');
      return;
    }

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: `Assigned task: "${newTaskTitle}"`,
      actor: 'Kabir Hasan (Manager)',
      target: newTaskAssignee,
      timestamp: 'Just now',
      icon: 'ClipboardList',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Task assigned to ${newTaskAssignee} successfully.`, 'success');

    setNewTaskTitle('');
    setIsAssignTaskOpen(false);
  };

  // 4. Upload Doc Sandbox Handler
  const handleUploadDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) {
      showToast('Please enter a document filename.', 'error');
      return;
    }

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: `Uploaded audit document: "${newDocName}"`,
      actor: 'Nusrat Jahan (Senior)',
      target: newDocClient,
      timestamp: 'Just now',
      icon: 'FileUp',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Document "${newDocName}" uploaded to local sandbox storage (will reset after page refresh).`, 'success');

    setNewDocName('');
    setIsUploadDocOpen(false);
  };

  // 5. Log Communication Sandbox Handler
  const handleLogCommSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommSubject.trim()) {
      showToast('Please enter a subject or minutes synopsis.', 'error');
      return;
    }

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: `Logged client email: "${newCommSubject}"`,
      actor: 'A. R. Chowdhury (Partner)',
      target: newCommClient,
      timestamp: 'Just now',
      icon: 'MessageSquare',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Communication trace registered for ${newCommClient}.`, 'success');

    setNewCommSubject('');
    setIsLogCommOpen(false);
  };

  // 6. Review Paper Sandbox Handler
  const handleReviewPaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) {
      showToast('Please enter a working paper reference.', 'error');
      return;
    }

    const newAct: DashboardActivity = {
      id: `act-${Date.now()}`,
      action: `Signed off working paper: "${newPaperTitle}"`,
      actor: 'A. R. Chowdhury (Partner)',
      target: 'Approved & Signed',
      timestamp: 'Just now',
      icon: 'CheckSquare',
    };

    setActivities((prev) => [newAct, ...prev]);
    showToast(`Working paper "${newPaperTitle}" signed off successfully.`, 'success');

    setNewPaperTitle('');
    setIsReviewPaperOpen(false);
  };

  return (
    <ContentContainer>
      {/* 1. Main Greeting Header with Action Hooks */}
      <DashboardHeader
        onNewJob={() => setIsNewJobOpen(true)}
        onAddClient={() => setIsAddClientOpen(true)}
      />

      {/* 2. System Launch Readiness Diagnostic card */}
      <LaunchReadinessCard
        items={MOCK_LAUNCH_READINESS}
      />

      {/* 3. Executive KPI Bento Cards Grid */}
      <DashboardMetricGrid metrics={MOCK_DASHBOARD_METRICS} />

      {/* 4. Attention Required Notifications block */}
      <AttentionRequiredPanel items={MOCK_ATTENTION_ITEMS} />

      {/* 5. Quick Operations Action Hub Grid */}
      <QuickActionsGrid
        onAddClient={() => setIsAddClientOpen(true)}
        onNewJob={() => setIsNewJobOpen(true)}
        onAssignTask={() => setIsAssignTaskOpen(true)}
        onUploadDoc={() => setIsUploadDocOpen(true)}
        onLogComm={() => setIsLogCommOpen(true)}
        onReviewPaper={() => setIsReviewPaperOpen(true)}
      />

      {/* 6. Comprehensive Double Column Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Heavy Data Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Job Engagements Table with Search & filters */}
          <ActiveJobsTable jobs={jobs} />

          {/* Side-by-side Near Deadlines & Compliance calendar panels */}
          <DeadlineCompliancePanels
            deadlines={MOCK_DEADLINES}
            complianceItems={MOCK_COMPLIANCE_CALENDAR}
          />

          {/* Active Article Students attendance & task tracking */}
          <StaffActivityPanel activities={MOCK_STAFF_ACTIVITY} />
        </div>

        {/* Right Executive Tracking Column (Span 1) */}
        <div className="space-y-6">
          {/* Review Queue Signoff panel */}
          <PendingReviewsPanel initialReviews={MOCK_PENDING_REVIEWS} />

          {/* Working Paper Completion Slider widgets */}
          <WorkingPaperProgressPanel progressList={MOCK_WORKING_PAPER_PROGRESS} />

          {/* Chronological Activity Logs */}
          <RecentActivityTimeline activities={activities} />

          {/* What's New Release notes panel */}
          <WhatsNewPanel />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE COMPONENT MODALS (SANDBOX BLUEPRINT ENVIRONMENT) */}
      {/* ========================================================================= */}

      {/* MODAL 1: ADD CLIENT */}
      <Modal isOpen={isAddClientOpen} onClose={() => setIsAddClientOpen(false)} title="Add New Corporate Client">
        <form onSubmit={handleAddClientSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Client Company Name" required helpText="Official registered entity name.">
            <input
              type="text"
              required
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="e.g. Acme Corporation Bangladesh"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <FormField label="Partner in Charge" required>
            <select
              value={newClientPartner}
              onChange={(e) => setNewClientPartner(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA</option>
              <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA</option>
              <option value="S. K. Nandy, FCA">S. K. Nandy, FCA</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsAddClientOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Register Client Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: CREATE NEW JOB */}
      <Modal isOpen={isNewJobOpen} onClose={() => setIsNewJobOpen(false)} title="Create New Job Assignment">
        <form onSubmit={handleCreateJobSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Audit / Case Scope Title" required>
            <input
              type="text"
              required
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              placeholder="e.g. Annual Statutory Audit FY 2026-27"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <FormField label="Client Profile Link" required>
            <select
              value={newJobClient}
              onChange={(e) => setNewJobClient(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Apex Holdings Ltd.">Apex Holdings Ltd.</option>
              <option value="Square Pharmaceuticals">Square Pharmaceuticals</option>
              <option value="Beximco Communications">Beximco Communications</option>
              <option value="Jamuna Oil Company">Jamuna Oil Company</option>
              <option value="Navana Motors">Navana Motors</option>
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Service Category" required>
              <select
                value={newJobType}
                onChange={(e) => setNewJobType(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Statutory Audit (FY 2025-26)">Statutory Audit</option>
                <option value="Internal Controls Review">Internal Controls Review</option>
                <option value="RJSC Annual Returns filing">RJSC Returns Filing</option>
                <option value="NBR Tax Assessment Representation">NBR Tax Representation</option>
              </select>
            </FormField>
            <FormField label="Assigned Engagement Manager" required>
              <select
                value={newJobManager}
                onChange={(e) => setNewJobManager(e.target.value)}
                className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Kabir Hasan">Kabir Hasan</option>
                <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA</option>
              </select>
            </FormField>
          </div>
          <FormField label="Filing Due Date Target" required>
            <input
              type="date"
              required
              value={newJobDeadline}
              onChange={(e) => setNewJobDeadline(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsNewJobOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Launch Case File
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: ASSIGN STUDENT TASK */}
      <Modal isOpen={isAssignTaskOpen} onClose={() => setIsAssignTaskOpen(false)} title="Delegate Task to Article Student">
        <form onSubmit={handleAssignTaskSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Substantive Task Scope" required>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Audit cash and ledger statements"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <FormField label="Assignee (Article Student)" required>
            <select
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Sajid Ahmed">Sajid Ahmed</option>
              <option value="Tahmid Rahman">Tahmid Rahman</option>
              <option value="Kamrul Islam">Kamrul Islam</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsAssignTaskOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Delegate Task
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 4: UPLOAD DOCUMENT */}
      <Modal isOpen={isUploadDocOpen} onClose={() => setIsUploadDocOpen(false)} title="Upload Document to Sandbox Storage">
        <form onSubmit={handleUploadDocSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Filename / Document Reference" required>
            <input
              type="text"
              required
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="e.g. TrialBalance_FY26.xlsx"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <FormField label="Client Folder Link" required>
            <select
              value={newDocClient}
              onChange={(e) => setNewDocClient(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Apex Holdings Ltd.">Apex Holdings Ltd.</option>
              <option value="Square Pharmaceuticals">Square Pharmaceuticals</option>
              <option value="Beximco Communications">Beximco Communications</option>
              <option value="Jamuna Oil Company">Jamuna Oil Company</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsUploadDocOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Upload Document
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 5: LOG COMMUNICATION */}
      <Modal isOpen={isLogCommOpen} onClose={() => setIsLogCommOpen(false)} title="Log Client Official Communication">
        <form onSubmit={handleLogCommSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Client Profile" required>
            <select
              value={newCommClient}
              onChange={(e) => setNewCommClient(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Apex Holdings Ltd.">Apex Holdings Ltd.</option>
              <option value="Square Pharmaceuticals">Square Pharmaceuticals</option>
              <option value="Beximco Communications">Beximco Communications</option>
              <option value="Jamuna Oil Company">Jamuna Oil Company</option>
            </select>
          </FormField>
          <FormField label="Subject / Minutes Synopsis" required>
            <input
              type="text"
              required
              value={newCommSubject}
              onChange={(e) => setNewCommSubject(e.target.value)}
              placeholder="e.g. Received official NBR query response details"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsLogCommOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Save Comm Audit Trace
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 6: REVIEW WORKING PAPER */}
      <Modal isOpen={isReviewPaperOpen} onClose={() => setIsReviewPaperOpen(false)} title="Sign Off Working Paper Checksheet">
        <form onSubmit={handleReviewPaperSubmit} className="space-y-4 text-xs font-semibold">
          <FormField label="Working Paper Reference / ID" required>
            <input
              type="text"
              required
              value={newPaperTitle}
              onChange={(e) => setNewPaperTitle(e.target.value)}
              placeholder="e.g. Cash & Bank Substantive Sampling Checks"
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsReviewPaperOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Approve and Sign
            </button>
          </div>
        </form>
      </Modal>

    </ContentContainer>
  );
};
