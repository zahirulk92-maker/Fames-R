/**
 * FAMES & R Office PRO - Dashboard Data Architecture and Models
 */

export interface LaunchReadinessItem {
  id: string;
  name: string;
  status: 'READY' | 'PENDING' | 'BLOCKED';
  details?: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  supportingText: string;
  icon: string; // Lucide icon name
  trend?: {
    value: string;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  route: string;
}

export interface ActiveJobSummary {
  id: string;
  code: string;
  client: string;
  serviceType: string;
  manager: string;
  team: string[];
  progress: number; // percentage 0 to 100
  dueDate: string;
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Waiting for Client' | 'Near Deadline' | 'Overdue';
}

export interface PendingReviewSummary {
  id: string;
  title: string;
  client: string;
  preparedBy: string;
  reviewer: string;
  submittedDate: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: string;
}

export interface DeadlineSummary {
  id: string;
  client: string;
  job: string;
  dueDate: string;
  daysRemaining: number;
  responsible: string;
  status: 'OVERDUE' | 'CRITICAL' | 'WARNING' | 'NORMAL';
}

export interface ComplianceCalendarItem {
  id: string;
  event: string;
  deadline: string;
  client: string;
  responsible: string;
  status: 'PENDING' | 'FILED' | 'OVERDUE' | 'COMPLETED';
}

export interface StaffActivitySummary {
  id: string;
  name: string;
  role: string;
  currentTask: string;
  assignedClient: string;
  checkInStatus: 'Working' | 'On Leave' | 'Not Checked In' | 'Available' | 'In Review';
  workHours: number;
  availability: string;
}

export interface WorkingPaperProgress {
  id: string;
  client: string;
  period: string;
  total: number;
  completed: number;
  underReview: number;
  outstanding: number;
  percentage: number;
}

export interface DashboardActivity {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string; // e.g. "10m ago" or "2 hours ago"
  icon: string;
}

export interface AttentionItem {
  id: string;
  message: string;
  severity: 'Information' | 'Warning' | 'Critical';
  details?: string;
}

// ==========================================================
// MOCK DATA INSTANCES (Clearly marked as Demo Data)
// ==========================================================

export const MOCK_LAUNCH_READINESS: LaunchReadinessItem[] = [
  { id: '1', name: 'Firm profile configured', status: 'READY', details: 'FAMES & R DHaka HQ details set' },
  { id: '2', name: 'System users & roles prepared', status: 'READY', details: 'Partner, Manager, Student assignments live' },
  { id: '3', name: 'Security role permissions mapped', status: 'READY', details: 'Access token permissions established' },
  { id: '4', name: 'NBR VAT & Tax API Gateway client verified', status: 'READY', details: 'Connection status draft simulation active' },
  { id: '5', name: 'Initial client directories uploaded', status: 'READY', details: '5 corporate client profiles live' },
  { id: '6', name: 'Standard audit workflow checklist compiled', status: 'READY', details: '7-stage compliance checkpoints ready' },
  { id: '7', name: 'Document cloud storage connected', status: 'PENDING', details: 'Local sandbox storage enabled; remote pending' },
  { id: '8', name: 'Direct relational database synchronized', status: 'BLOCKED', details: 'No active SQL DB connected; running in Frontend Demo Mode' },
  { id: '9', name: 'Central User Sign-In Security (Auth SDK)', status: 'BLOCKED', details: 'Standard sandbox simulation active' }
];

export const MOCK_DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: 'm1',
    label: 'Total Corporate Clients',
    value: 5,
    supportingText: '5 active entities managed in workspace',
    icon: 'Building2',
    trend: { value: '+20% MoM', isPositive: true },
    status: 'info',
    route: '/clients'
  },
  {
    id: 'm2',
    label: 'Active Audit Jobs',
    value: 4,
    supportingText: 'Statutory and special purpose audits',
    icon: 'Briefcase',
    trend: { value: 'On Track', isPositive: true },
    status: 'success',
    route: '/jobs'
  },
  {
    id: 'm3',
    label: 'Pending Working Paper Reviews',
    value: 5,
    supportingText: 'Awaiting Manager/Partner sign-off',
    icon: 'CheckSquare',
    trend: { value: 'Action Required', isPositive: false },
    status: 'warning',
    route: '/jobs/review-queue'
  },
  {
    id: 'm4',
    label: 'Jobs Near Deadline',
    value: 2,
    supportingText: 'Regulatory filings due in < 7 days',
    icon: 'AlertTriangle',
    trend: { value: 'High Priority', isPositive: false },
    status: 'danger',
    route: '/jobs/deadlines'
  },
  {
    id: 'm5',
    label: 'Documents Vault Pending',
    value: 12,
    supportingText: 'Unclassified client audit uploads',
    icon: 'FileText',
    status: 'neutral',
    route: '/jobs/documents'
  },
  {
    id: 'm6',
    label: 'Students Active Today',
    value: '3 / 4',
    supportingText: 'Article students tracked in system',
    icon: 'Users',
    status: 'success',
    route: '/staff'
  },
  {
    id: 'm7',
    label: 'Working Paper Completion',
    value: '68%',
    supportingText: 'Global completed sections average',
    icon: 'ClipboardCheck',
    trend: { value: '+4% this week', isPositive: true },
    status: 'info',
    route: '/audit/working-papers'
  },
  {
    id: 'm8',
    label: 'Monthly Payroll Verification',
    value: 'PENDING',
    supportingText: 'Article student stipends & allowances',
    icon: 'CreditCard',
    status: 'warning',
    route: '/staff/salary-allowance'
  }
];

export const MOCK_ACTIVE_JOBS: ActiveJobSummary[] = [
  {
    id: 'job-1',
    code: 'AUD-APX-26',
    client: 'Apex Holdings Ltd.',
    serviceType: 'Statutory Audit (FY 2025-26)',
    manager: 'Kabir Hasan',
    team: ['Nusrat Jahan', 'Tahmid Rahman'],
    progress: 45,
    dueDate: '2026-08-31',
    status: 'In Progress'
  },
  {
    id: 'job-2',
    code: 'AUD-SQR-26',
    client: 'Square Pharmaceuticals',
    serviceType: 'Internal Controls Review',
    manager: 'Kabir Hasan',
    team: ['Tahmid Rahman'],
    progress: 80,
    dueDate: '2026-07-25',
    status: 'Near Deadline'
  },
  {
    id: 'job-3',
    code: 'RJSC-BEX-26',
    client: 'Beximco Communications',
    serviceType: 'RJSC Annual Returns filing',
    manager: 'Kabir Hasan',
    team: ['Sajid Ahmed'],
    progress: 95,
    dueDate: '2026-07-20',
    status: 'Under Review'
  },
  {
    id: 'job-4',
    code: 'TAX-JAM-26',
    client: 'Jamuna Oil Company',
    serviceType: 'NBR Tax Assessment Representation',
    manager: 'M. F. Ahmed, FCA',
    team: ['Nusrat Jahan'],
    progress: 10,
    dueDate: '2026-09-15',
    status: 'Planning'
  },
  {
    id: 'job-5',
    code: 'AUD-NAV-26',
    client: 'Navana Motors',
    serviceType: 'Special Purpose Audit',
    manager: 'Kabir Hasan',
    team: ['Tahmid Rahman'],
    progress: 0,
    dueDate: '2026-07-10',
    status: 'Overdue'
  }
];

export const MOCK_PENDING_REVIEWS: PendingReviewSummary[] = [
  {
    id: 'rev-1',
    title: 'Cash & Bank Substantive Sampling',
    client: 'Apex Holdings Ltd.',
    preparedBy: 'Tahmid Rahman',
    reviewer: 'Kabir Hasan',
    submittedDate: '2026-07-16',
    priority: 'High',
    status: 'Awaiting Review'
  },
  {
    id: 'rev-2',
    title: 'Board of Directors Meeting Minutes (Form XII Audit)',
    client: 'Beximco Communications',
    preparedBy: 'Sajid Ahmed',
    reviewer: 'Kabir Hasan',
    submittedDate: '2026-07-15',
    priority: 'Normal',
    status: 'Awaiting Sign-off'
  },
  {
    id: 'rev-3',
    title: 'Deferred Tax Asset Provision & Reconciliations',
    client: 'Square Pharmaceuticals',
    preparedBy: 'Nusrat Jahan',
    reviewer: 'M. F. Ahmed, FCA',
    submittedDate: '2026-07-16',
    priority: 'Urgent',
    status: 'Awaiting Partner Signature'
  },
  {
    id: 'rev-4',
    title: 'Fixed Assets Registry Sampling Checksheet',
    client: 'Apex Holdings Ltd.',
    preparedBy: 'Nusrat Jahan',
    reviewer: 'Kabir Hasan',
    submittedDate: '2026-07-14',
    priority: 'Normal',
    status: 'Awaiting Review'
  },
  {
    id: 'rev-5',
    title: 'VAT-9.1 Monthly Ledger Reconciliations',
    client: 'Square Pharmaceuticals',
    preparedBy: 'Sajid Ahmed',
    reviewer: 'Kabir Hasan',
    submittedDate: '2026-07-16',
    priority: 'Urgent',
    status: 'Re-Submitted Review'
  }
];

export const MOCK_DEADLINES: DeadlineSummary[] = [
  {
    id: 'dl-1',
    client: 'Navana Motors',
    job: 'Special Purpose Audit Filing',
    dueDate: '2026-07-10',
    daysRemaining: -6,
    responsible: 'Tahmid Rahman',
    status: 'OVERDUE'
  },
  {
    id: 'dl-2',
    client: 'Beximco Communications',
    job: 'RJSC Annual Returns filing',
    dueDate: '2026-07-20',
    daysRemaining: 4,
    responsible: 'Sajid Ahmed',
    status: 'CRITICAL'
  },
  {
    id: 'dl-3',
    client: 'Square Pharmaceuticals',
    job: 'Internal Controls Review File',
    dueDate: '2026-07-25',
    daysRemaining: 9,
    responsible: 'Kabir Hasan',
    status: 'WARNING'
  }
];

export const MOCK_COMPLIANCE_CALENDAR: ComplianceCalendarItem[] = [
  {
    id: 'cal-1',
    event: 'NBR Monthly VAT Return Filing (VAT-9.1)',
    deadline: '2026-07-15',
    client: 'Apex Holdings Ltd.',
    responsible: 'Sajid Ahmed',
    status: 'COMPLETED'
  },
  {
    id: 'cal-2',
    event: 'Quarterly withholding Tax (TDS) submission',
    deadline: '2026-07-20',
    client: 'Square Pharmaceuticals',
    responsible: 'Nusrat Jahan',
    status: 'PENDING'
  },
  {
    id: 'cal-3',
    event: 'RJSC Annual Returns statutory filing',
    deadline: '2026-07-31',
    client: 'Beximco Communications',
    responsible: 'Sajid Ahmed',
    status: 'PENDING'
  },
  {
    id: 'cal-4',
    event: 'Regulatory License Renewal',
    deadline: '2026-08-15',
    client: 'Jamuna Oil Company',
    responsible: 'Kabir Hasan',
    status: 'PENDING'
  }
];

export const MOCK_STAFF_ACTIVITY: StaffActivitySummary[] = [
  {
    id: 'staff-1',
    name: 'Kabir Hasan',
    role: 'MANAGER',
    currentTask: 'Reviewing statutory working papers & planning memos',
    assignedClient: 'Apex Holdings Ltd.',
    checkInStatus: 'Working',
    workHours: 6.5,
    availability: 'Partially Available'
  },
  {
    id: 'staff-2',
    name: 'Nusrat Jahan',
    role: 'SENIOR',
    currentTask: 'Compiling deferred tax computations',
    assignedClient: 'Square Pharmaceuticals',
    checkInStatus: 'Working',
    workHours: 7.2,
    availability: 'Busy'
  },
  {
    id: 'staff-3',
    name: 'Sajid Ahmed',
    role: 'STUDENT',
    currentTask: 'Verifying RJSC form fields',
    assignedClient: 'Beximco Communications',
    checkInStatus: 'Working',
    workHours: 5.0,
    availability: 'Available'
  },
  {
    id: 'staff-4',
    name: 'Tahmid Rahman',
    role: 'STUDENT',
    currentTask: 'Drafting bank reconciliation schedules',
    assignedClient: 'Navana Motors',
    checkInStatus: 'In Review',
    workHours: 6.0,
    availability: 'Available'
  },
  {
    id: 'staff-5',
    name: 'Kamrul Islam',
    role: 'STUDENT',
    currentTask: 'N/A - Regulatory Exam Prep Leave',
    assignedClient: 'None',
    checkInStatus: 'On Leave',
    workHours: 0,
    availability: 'Unavailable'
  }
];

export const MOCK_WORKING_PAPER_PROGRESS: WorkingPaperProgress[] = [
  {
    id: 'wp-1',
    client: 'Apex Holdings Ltd.',
    period: 'FY 2025-26',
    total: 18,
    completed: 10,
    underReview: 4,
    outstanding: 4,
    percentage: 55
  },
  {
    id: 'wp-2',
    client: 'Square Pharmaceuticals',
    period: 'Q2 Audit review',
    total: 12,
    completed: 9,
    underReview: 2,
    outstanding: 1,
    percentage: 75
  },
  {
    id: 'wp-3',
    client: 'Beximco Communications',
    period: 'Annual filing prep',
    total: 8,
    completed: 7,
    underReview: 1,
    outstanding: 0,
    percentage: 87
  },
  {
    id: 'wp-4',
    client: 'Jamuna Oil Company',
    period: 'FY 25 Tax review',
    total: 14,
    completed: 2,
    underReview: 1,
    outstanding: 11,
    percentage: 14
  }
];

export const MOCK_DASHBOARD_ACTIVITIES: DashboardActivity[] = [
  {
    id: 'act-1',
    action: 'Submitted working papers for review',
    actor: 'Tahmid Rahman (Student)',
    target: 'Apex Holdings Ltd.',
    timestamp: '15m ago',
    icon: 'FileUp'
  },
  {
    id: 'act-2',
    action: 'Lodged RJSC Form XII with registrar',
    actor: 'Sajid Ahmed (Student)',
    target: 'Beximco Communications',
    timestamp: '1h ago',
    icon: 'Send'
  },
  {
    id: 'act-3',
    action: 'Added new tax filing event',
    actor: 'Rashedul Bari (Admin)',
    target: 'Compliance calendar',
    timestamp: '3h ago',
    icon: 'Calendar'
  },
  {
    id: 'act-4',
    action: 'Uploaded Trial Balance v2',
    actor: 'Nusrat Jahan (Senior)',
    target: 'Square Pharmaceuticals',
    timestamp: '5h ago',
    icon: 'FileSpreadsheet'
  },
  {
    id: 'act-5',
    action: 'Registered corporate client profile',
    actor: 'A. R. Chowdhury (Partner)',
    target: 'Apex Holdings Ltd.',
    timestamp: 'Yesterday',
    icon: 'UserPlus'
  }
];

export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    message: 'Navana Motors special audit is overdue (Exceeded target deadline: 2026-07-10).',
    severity: 'Critical',
    details: 'Draft report not signed off'
  },
  {
    id: 'att-2',
    message: 'Square Pharmaceuticals Internal controls review file is due in 9 days with 2 outstanding review notes.',
    severity: 'Warning',
    details: 'Checklists pending partner signoff'
  },
  {
    id: 'att-3',
    message: 'Direct Supabase client relational DB is not configured. Running in Front-End sandbox mode.',
    severity: 'Information',
    details: 'Connect database through administrator configuration when backend goes live'
  },
  {
    id: 'att-4',
    message: 'Corporate User authentication endpoints are mock simulations.',
    severity: 'Information',
    details: 'Verify OAuth and Firebase keys in administration settings'
  }
];
