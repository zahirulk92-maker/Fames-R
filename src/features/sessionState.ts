import { 
  StaffMember, 
  StaffProfile, 
  StaffTask, 
  WorkLog, 
  AttendanceRecord, 
  AttendanceSummary, 
  PerformanceReview, 
  PerformanceGoal, 
  LeaveRequest, 
  Holiday, 
  SalaryStructure, 
  PayrollPreview, 
  Job, 
  JobAssignment, 
  JobDeadline, 
  JobDocument, 
  ReviewQueueItem 
} from '../types/staffAndJobs';

import { 
  MOCK_STAFF_MEMBERS, 
  MOCK_STAFF_PROFILES, 
  MOCK_STAFF_TASKS, 
  MOCK_WORK_LOGS, 
  MOCK_ATTENDANCE_RECORDS, 
  MOCK_ATTENDANCE_SUMMARIES, 
  MOCK_PERFORMANCE_REVIEWS, 
  MOCK_PERFORMANCE_GOALS, 
  MOCK_LEAVE_REQUESTS, 
  MOCK_HOLIDAYS, 
  MOCK_SALARY_STRUCTURES, 
  MOCK_PAYROLL_PREVIEWS, 
  MOCK_JOBS_REGISTER, 
  MOCK_JOB_ASSIGNMENTS, 
  MOCK_JOB_DEADLINES, 
  MOCK_JOB_DOCUMENTS, 
  MOCK_REVIEW_QUEUE 
} from '../mock-data';

import { runtimeConfig } from '../config/runtime';

// Session-level mutable storage
let sharedStaff: StaffMember[] = [...MOCK_STAFF_MEMBERS];
let sharedProfiles: Record<string, StaffProfile> = { ...MOCK_STAFF_PROFILES };
let sharedTasks: StaffTask[] = [...MOCK_STAFF_TASKS];
let sharedWorkLogs: WorkLog[] = [...MOCK_WORK_LOGS];
let sharedAttendanceRecords: AttendanceRecord[] = [...MOCK_ATTENDANCE_RECORDS];
let sharedAttendanceSummaries: AttendanceSummary[] = [...MOCK_ATTENDANCE_SUMMARIES];
let sharedPerformanceReviews: PerformanceReview[] = [...MOCK_PERFORMANCE_REVIEWS];
let sharedPerformanceGoals: PerformanceGoal[] = [...MOCK_PERFORMANCE_GOALS];
let sharedLeaveRequests: LeaveRequest[] = [...MOCK_LEAVE_REQUESTS];
let sharedHolidays: Holiday[] = [...MOCK_HOLIDAYS];
let sharedSalaryStructures: Record<string, SalaryStructure> = { ...MOCK_SALARY_STRUCTURES };
let sharedPayrollPreviews: PayrollPreview[] = [...MOCK_PAYROLL_PREVIEWS];
let sharedJobs: Job[] = [...MOCK_JOBS_REGISTER];
let sharedJobAssignments: JobAssignment[] = [...MOCK_JOB_ASSIGNMENTS];
let sharedJobDeadlines: JobDeadline[] = [...MOCK_JOB_DEADLINES];
let sharedJobDocuments: JobDocument[] = [...MOCK_JOB_DOCUMENTS];
let sharedReviewQueue: ReviewQueueItem[] = [...MOCK_REVIEW_QUEUE];

export const getSharedStaff = () => runtimeConfig.mockDataEnabled ? sharedStaff : [];
export const setSharedStaff = (val: StaffMember[]) => { sharedStaff = val; };

export const getSharedProfiles = () => runtimeConfig.mockDataEnabled ? sharedProfiles : {};
export const setSharedProfile = (id: string, val: StaffProfile) => { sharedProfiles[id] = val; };

export const getSharedTasks = () => runtimeConfig.mockDataEnabled ? sharedTasks : [];
export const setSharedTasks = (val: StaffTask[]) => { sharedTasks = val; };

export const getSharedWorkLogs = () => runtimeConfig.mockDataEnabled ? sharedWorkLogs : [];
export const setSharedWorkLogs = (val: WorkLog[]) => { sharedWorkLogs = val; };

export const getSharedAttendanceRecords = () => runtimeConfig.mockDataEnabled ? sharedAttendanceRecords : [];
export const setSharedAttendanceRecords = (val: AttendanceRecord[]) => { sharedAttendanceRecords = val; };

export const getSharedAttendanceSummaries = () => runtimeConfig.mockDataEnabled ? sharedAttendanceSummaries : [];
export const setSharedAttendanceSummaries = (val: AttendanceSummary[]) => { sharedAttendanceSummaries = val; };

export const getSharedPerformanceReviews = () => runtimeConfig.mockDataEnabled ? sharedPerformanceReviews : [];
export const setSharedPerformanceReviews = (val: PerformanceReview[]) => { sharedPerformanceReviews = val; };

export const getSharedPerformanceGoals = () => runtimeConfig.mockDataEnabled ? sharedPerformanceGoals : [];
export const setSharedPerformanceGoals = (val: PerformanceGoal[]) => { sharedPerformanceGoals = val; };

export const getSharedLeaveRequests = () => runtimeConfig.mockDataEnabled ? sharedLeaveRequests : [];
export const setSharedLeaveRequests = (val: LeaveRequest[]) => { sharedLeaveRequests = val; };

export const getSharedHolidays = () => runtimeConfig.mockDataEnabled ? sharedHolidays : [];
export const setSharedHolidays = (val: Holiday[]) => { sharedHolidays = val; };

export const getSharedSalaryStructures = () => runtimeConfig.mockDataEnabled ? sharedSalaryStructures : {};
export const setSharedSalaryStructure = (id: string, val: SalaryStructure) => { sharedSalaryStructures[id] = val; };

export const getSharedPayrollPreviews = () => runtimeConfig.mockDataEnabled ? sharedPayrollPreviews : [];
export const setSharedPayrollPreviews = (val: PayrollPreview[]) => { sharedPayrollPreviews = val; };

export const getSharedJobs = () => runtimeConfig.mockDataEnabled ? sharedJobs : [];
export const setSharedJobs = (val: Job[]) => { sharedJobs = val; };

export const getSharedJobAssignments = () => runtimeConfig.mockDataEnabled ? sharedJobAssignments : [];
export const setSharedJobAssignments = (val: JobAssignment[]) => { sharedJobAssignments = val; };

export const getSharedJobDeadlines = () => runtimeConfig.mockDataEnabled ? sharedJobDeadlines : [];
export const setSharedJobDeadlines = (val: JobDeadline[]) => { sharedJobDeadlines = val; };

export const getSharedJobDocuments = () => runtimeConfig.mockDataEnabled ? sharedJobDocuments : [];
export const setSharedJobDocuments = (val: JobDocument[]) => { sharedJobDocuments = val; };

export const getSharedReviewQueue = () => runtimeConfig.mockDataEnabled ? sharedReviewQueue : [];
export const setSharedReviewQueue = (val: ReviewQueueItem[]) => { sharedReviewQueue = val; };
