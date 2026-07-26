/**
 * FAMES & R Office PRO - Staff & Operations TypeScript Models
 */

export interface StaffMember {
  id: string;
  staffCode: string; // unique
  name: string;
  email: string;
  mobile: string;
  role: 
    | 'Partner'
    | 'Super Admin'
    | 'Manager'
    | 'Senior'
    | 'Article Student'
    | 'Intern'
    | 'Accounts Officer'
    | 'Tax Officer'
    | 'VAT Officer'
    | 'Admin Staff';
  status: 
    | 'Active'
    | 'On Leave'
    | 'Suspended'
    | 'Inactive'
    | 'Articleship Completed'
    | 'Resigned';
  department: string;
  assignedManager?: string; // Optional for Partner
  joiningDate: string;
  availability: 
    | 'Available'
    | 'Partially Allocated'
    | 'Fully Allocated'
    | 'On Leave'
    | 'Training'
    | 'Examination Leave';
  attendanceStatus?: 
    | 'Present'
    | 'Late'
    | 'Absent'
    | 'On Leave'
    | 'Half Day'
    | 'Remote'
    | 'Not Checked In';
  performanceScore: number; // 1-100 or 1-5 scale, let's use 1-100
  articleshipYear?: number; // 1, 2, 3 or undefined if not student
}

export interface StaffProfile {
  staffId: string;
  presentAddress: string;
  permanentAddress: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  dateOfBirth: string;
  education: string;
  skills: string[];
  softwareProficiency: string[];
  specialization: string[]; // e.g., Tax, VAT, Audit
  articleshipRegNo?: string; // ICAB registration number
  articleshipStartDate?: string;
  articleshipExpectedEnd?: string;
  principalPartner?: string;
  examLeaveEligibility?: string; // description
  currentWorkload: string; // e.g., "3 Active Audits"
}

export interface StaffAssignment {
  id: string;
  jobId: string;
  jobCode: string;
  clientName: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  roleInEngagement: string;
  allocationPercentage: number; // 0-100
  startDate: string;
  dueDate: string;
  status: 'Active' | 'On Leave' | 'Completed' | 'Pending';
  workloadStatus: 'Available' | 'Balanced' | 'High Load' | 'Overallocated' | 'On Leave';
}

export interface StaffTask {
  id: string;
  taskCode: string; // e.g. TSK-001
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  jobId: string;
  jobTitle: string;
  assigneeId: string;
  assigneeName: string;
  reviewerId: string;
  reviewerName: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  progress: number; // 0 to 100
  status: 
    | 'Draft'
    | 'Assigned'
    | 'In Progress'
    | 'Blocked'
    | 'Submitted'
    | 'Under Review'
    | 'Correction Required'
    | 'Completed'
    | 'Cancelled';
  checklist: { id: string; item: string; completed: boolean }[];
  dependencies?: string[]; // codes of other tasks
}

export interface WorkLog {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  clientId: string;
  clientName: string;
  jobId: string;
  jobTitle: string;
  taskId: string;
  taskTitle: string;
  workDescription: string;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  totalHours: number;
  breakDuration: number; // in hours or minutes, let's use minutes
  billable: boolean;
  reviewStatus: 
    | 'Draft'
    | 'Submitted'
    | 'Under Review'
    | 'Correction Required'
    | 'Approved Preview'
    | 'Rejected Preview';
  outcome: string;
  supportingNote?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  role: string;
  checkIn?: string; // HH:MM AM/PM
  checkOut?: string; // HH:MM AM/PM
  workingHours: number;
  lateMinutes: number;
  status: 
    | 'Present'
    | 'Late'
    | 'Absent'
    | 'On Leave'
    | 'Half Day'
    | 'Remote'
    | 'Not Checked In';
  currentAvailability: string;
}

export interface AttendanceSummary {
  staffId: string;
  staffName: string;
  role: string;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  leaveCount: number;
  halfDayCount: number;
  totalHours: number;
  attendanceRate: number; // e.g. 96 (%)
}

export interface PerformanceReview {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  period: string; // e.g., "Q2 2026", "FY 2025-26"
  taskCompletion: number; // 0-100
  timeliness: number; // 0-100
  reviewQuality: number; // 0-100
  attendance: number; // 0-100
  teamwork: number; // 0-100
  overallScore: number; // 1-100 or 1-5
  rating: 'Outstanding' | 'Very Good' | 'Good' | 'Needs Improvement' | 'Unsatisfactory';
  managerComments: string;
  employeeComments?: string;
  strengths: string[];
  improvementAreas: string[];
  trainingRecommendations: string[];
}

export interface PerformanceGoal {
  id: string;
  staffId: string;
  title: string;
  targetDate: string;
  status: 'Pending' | 'In Progress' | 'Achieved' | 'Deferred';
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  leaveType: 
    | 'Public Holiday'
    | 'Firm Holiday'
    | 'Annual Leave'
    | 'Casual Leave'
    | 'Sick Leave'
    | 'Examination Leave'
    | 'Training'
    | 'Unpaid Leave';
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  handoverPersonId?: string;
  handoverPersonName?: string;
  affectedTaskIds?: string[];
  affectedTasksText?: string;
  status: 'Pending' | 'Approved Preview' | 'Rejected Preview' | 'Under Clarification';
}

export interface Holiday {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  duration: string; // e.g., "3 Days", "1 Day"
  type: 'Public Holiday' | 'Firm Holiday' | 'Annual Leave' | 'Casual Leave' | 'Sick Leave' | 'Examination Leave' | 'Training' | 'Unpaid Leave';
}

export interface SalaryStructure {
  staffId: string;
  baseSalaryOrStipend: number;
  allowances: {
    conveyance: number;
    medical: number;
    mobile: number;
    special?: number;
  };
  deductions: {
    tax?: number;
    providentFund?: number;
    other?: number;
  };
  effectiveDate: string;
  paymentMethod: string;
}

export interface PayrollPreview {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  baseSalaryOrStipend: number;
  allowances: number; // sum of allowances
  deductions: number; // sum of deductions
  netPayPreview: number; // base + allowances - deductions
  paymentStatus: 
    | 'Not Prepared'
    | 'Draft'
    | 'Prepared'
    | 'Under Review'
    | 'Approved Preview'
    | 'On Hold'
    | 'Paid Demo';
  period: string; // e.g. "July 2026"
}

export interface Job {
  id: string;
  jobCode: string; // e.g. JB-APX-2026-01
  clientName: string;
  clientId: string;
  serviceType: string; // e.g. "Statutory Audit"
  period: string; // e.g. "FY 2025-26"
  partnerId: string;
  partnerName: string;
  managerId: string;
  managerName: string;
  teamMemberIds: string[];
  teamMembersText: string; // comma separated
  progress: number; // 0-100
  startDate: string;
  dueDate: string;
  status: 
    | 'Draft'
    | 'Planning'
    | 'In Progress'
    | 'Waiting for Client'
    | 'Under Review'
    | 'Finalization'
    | 'Completed'
    | 'On Hold'
    | 'Cancelled'
    | 'Overdue';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  description: string;
  requiredDocuments: string[];
  reviewLevel: 'Manager' | 'Partner' | 'Double (Manager & Partner)';
}

export interface JobAssignment {
  id: string;
  jobId: string;
  jobCode: string;
  clientName: string;
  staffId: string;
  staffName: string;
  roleInJob: string;
  allocationPercentage: number;
  startDate: string;
  dueDate: string;
  workloadStatus: 'Available' | 'Balanced' | 'High Load' | 'Overallocated' | 'On Leave';
}

export interface JobDeadline {
  id: string;
  dueDate: string;
  clientName: string;
  jobId: string;
  jobTitle: string;
  milestone: string;
  responsiblePersonId: string;
  responsiblePersonName: string;
  daysRemaining: number;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Upcoming' | 'Due Soon' | 'Due Today' | 'Overdue' | 'Completed Preview' | 'Extended Preview';
}

export interface JobDocument {
  id: string; // Document ID
  clientId: string;
  clientName: string;
  jobId: string;
  jobTitle: string;
  documentTitle: string;
  category: string; // Trial Balance, Bank Confirmations, Tax Receipts, etc.
  requestedDate?: string;
  dueDate?: string;
  receivedDate?: string;
  ownerId?: string;
  ownerName?: string;
  status: 
    | 'Not Requested'
    | 'Requested'
    | 'Pending'
    | 'Received'
    | 'Under Review'
    | 'Accepted Preview'
    | 'Rejected Preview'
    | 'Overdue'
    | 'Missing';
}

export interface ReviewQueueItem {
  id: string;
  itemTitle: string;
  type: 'Task Submission' | 'Work Log' | 'Working Paper' | 'Document Review' | 'Compliance Review' | 'Finalization Checklist';
  clientId: string;
  clientName: string;
  jobId: string;
  jobTitle: string;
  preparedById: string;
  preparedByName: string;
  reviewerId: string;
  reviewerName: string;
  submittedDate: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Submitted' | 'Under Review' | 'Correction Required' | 'Reviewed Demo' | 'Approved Demo' | 'Rejected Demo';
  referenceId: string; // e.g. task ID or worklog ID or doc ID
}

export interface ReviewNote {
  id: string;
  queueItemId: string;
  authorName: string;
  noteText: string;
  createdAt: string;
}
