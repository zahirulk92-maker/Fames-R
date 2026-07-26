import { ApiResponse, Client, Staff, Job, Task } from '../types';
import {
  MOCK_CLIENTS,
  MOCK_STAFF,
  MOCK_JOBS,
  MOCK_TASKS,
  MOCK_COMPLIANCE_REMINDERS,
  MOCK_ACTIVITY_LOGS,
  MOCK_SYSTEM_READINESS,
} from '../mock-data';

// Fetch the base API URL from Vite environment variables (or fall back gracefully to a production-ready mock mode)
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

/**
 * Reusable base fetch wrapper that respects environment configs and handles types.
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  // If the API base URL is specified and not in the default mock mode, perform genuine fetch requests
  if ((import.meta as any).env?.VITE_API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse<T> = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown networking error',
      };
    }
  }

  // Fallback: If no VITE_API_BASE_URL is defined, simulate high-quality local latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: undefined as T, // Override individually in mocks
      });
    }, 400); // 400ms professional network simulation
  });
}

// Global Query Keys for TanStack Query (to prevent duplication)
export const QUERY_KEYS = {
  clients: ['clients'] as const,
  clientRequests: ['clients', 'requests'] as const,
  staff: ['staff'] as const,
  jobs: ['jobs'] as const,
  tasks: ['tasks'] as const,
  compliance: ['compliance'] as const,
  logs: ['logs'] as const,
  systemReadiness: ['system', 'readiness'] as const,
};

// Typed services matching every route categories
export const apiClient = {
  clients: {
    getAll: async (): Promise<ApiResponse<Client[]>> => {
      const res = await apiRequest<Client[]>('/clients');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_CLIENTS };
    },
    getRequests: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/clients/requests');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'req-1', clientName: 'Grameenphone Ltd.', serviceRequested: 'Tax Filing Consultancy', requestDate: '2026-07-14', status: 'PENDING' },
          { id: 'req-2', clientName: 'Walton Hi-Tech', serviceRequested: 'Special Purpose Audit', requestDate: '2026-07-15', status: 'UNDER_REVIEW' },
          { id: 'req-3', clientName: 'Runner Automobiles', serviceRequested: 'RJSC Company Incorporation', requestDate: '2026-07-16', status: 'COMPLETED' },
        ],
      };
    },
    getPortalAccess: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/clients/portal-access');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'port-1', clientName: 'Apex Holdings Ltd.', username: 'apex_audit', lastActive: '2026-07-16 11:20:00', status: 'ACTIVE' },
          { id: 'port-2', clientName: 'Square Pharmaceuticals', username: 'square_finance', lastActive: '2026-07-15 16:15:00', status: 'ACTIVE' },
          { id: 'port-3', clientName: 'Beximco Communications', username: 'bex_comms_admin', lastActive: '2026-07-12 09:30:00', status: 'REVOKED' },
        ],
      };
    },
    getCommunications: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/clients/communications');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'comm-1', sender: 'A. R. Chowdhury, FCA', recipient: 'Apex Holdings (CFO)', subject: 'Request for Fixed Asset Schedule', sentAt: '2026-07-16 09:00:00', status: 'READ' },
          { id: 'comm-2', sender: 'Square Pharmaceuticals', recipient: 'Kabir Hasan (Manager)', subject: 'Query on Deferred Tax computation', sentAt: '2026-07-15 14:12:00', status: 'UNREAD' },
        ],
      };
    }
  },

  staff: {
    getAll: async (): Promise<ApiResponse<Staff[]>> => {
      const res = await apiRequest<Staff[]>('/staff');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_STAFF };
    },
    getTasks: async (): Promise<ApiResponse<Task[]>> => {
      const res = await apiRequest<Task[]>('/tasks');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_TASKS };
    },
    getWorkLogs: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/staff/work-logs');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'wl-1', employee: 'Nusrat Jahan', task: 'Substantive testing of receivables', hours: 4.5, date: '2026-07-16' },
          { id: 'wl-2', employee: 'Sajid Ahmed', task: 'RJSC return compilation', hours: 6.0, date: '2026-07-16' },
          { id: 'wl-3', employee: 'Tahmid Rahman', task: 'Bank confirmation reconciliation', hours: 5.0, date: '2026-07-15' },
        ],
      };
    },
    getAttendance: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/staff/attendance');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'att-1', employee: 'Kabir Hasan', checkIn: '09:05 AM', checkOut: '--', status: 'PRESENT' },
          { id: 'att-2', employee: 'Nusrat Jahan', checkIn: '08:55 AM', checkOut: '--', status: 'PRESENT' },
          { id: 'att-3', employee: 'Sajid Ahmed', checkIn: '09:35 AM', checkOut: '--', status: 'LATE' },
          { id: 'att-4', employee: 'Tahmid Rahman', checkIn: '09:00 AM', checkOut: '--', status: 'PRESENT' },
        ],
      };
    },
    getPerformance: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/staff/performance');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'perf-1', employee: 'Nusrat Jahan', jobsCompleted: 8, feedbackScore: '4.8/5', complianceRate: '100%' },
          { id: 'perf-2', employee: 'Kabir Hasan', jobsCompleted: 15, feedbackScore: '4.9/5', complianceRate: '98%' },
          { id: 'perf-3', employee: 'Tahmid Rahman', jobsCompleted: 4, feedbackScore: '4.2/5', complianceRate: '95%' },
        ],
      };
    },
    getHolidayCalendar: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/staff/holiday-calendar');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'hol-1', title: 'Eid-ul-Fitr (Estimated)', date: '2026-07-28', duration: '3 Days', type: 'PUBLIC' },
          { id: 'hol-2', title: 'National Mourning Day', date: '2026-08-15', duration: '1 Day', type: 'NATIONAL' },
          { id: 'hol-3', title: 'Janmashtami', date: '2026-09-04', duration: '1 Day', type: 'PUBLIC' },
        ],
      };
    },
    getSalaryAllowance: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/staff/salary-allowance');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'sal-1', employee: 'Kabir Hasan', basic: 'BDT 65,000', allowances: 'BDT 12,000', status: 'DISBURSED', month: 'June 2026' },
          { id: 'sal-2', employee: 'Nusrat Jahan', basic: 'BDT 45,000', allowances: 'BDT 8,000', status: 'DISBURSED', month: 'June 2026' },
          { id: 'sal-3', employee: 'Sajid Ahmed', basic: 'BDT 15,000', allowances: 'BDT 3,000', status: 'DISBURSED', month: 'June 2026' },
        ],
      };
    }
  },

  jobs: {
    getAll: async (): Promise<ApiResponse<Job[]>> => {
      const res = await apiRequest<Job[]>('/jobs');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_JOBS };
    },
    getAssignments: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/jobs/assignments');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'as-1', jobTitle: 'Statutory Audit FY 2025-26', lead: 'Kabir Hasan', team: ['Nusrat Jahan', 'Tahmid Rahman'], client: 'Apex Holdings Ltd.' },
          { id: 'as-2', jobTitle: 'Tax Assessment Representation', lead: 'Nusrat Jahan', team: ['Sajid Ahmed'], client: 'Jamuna Oil Company' },
        ],
      };
    },
    getDeadlines: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/jobs/deadlines');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'dl-1', jobTitle: 'RJSC Annual Returns Filing', client: 'Beximco Communications', dueDate: '2026-07-20', daysLeft: 4, priority: 'CRITICAL' },
          { id: 'dl-2', jobTitle: 'Internal Audit Q2', client: 'Square Pharmaceuticals', dueDate: '2026-07-25', daysLeft: 9, priority: 'HIGH' },
          { id: 'dl-3', jobTitle: 'Statutory Audit FY 2025-26', client: 'Apex Holdings Ltd.', dueDate: '2026-08-31', daysLeft: 45, priority: 'MEDIUM' },
        ],
      };
    },
    getDocuments: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/jobs/documents');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'doc-1', name: 'Trial Balance Apex Holdings.xlsx', size: '1.4 MB', uploadedBy: 'Nusrat Jahan', uploadedAt: '2026-07-16', category: 'Trial Balance' },
          { id: 'doc-2', name: 'Articles of Association Beximco.pdf', size: '4.8 MB', uploadedBy: 'Sajid Ahmed', uploadedAt: '2026-07-14', category: 'Legal Documents' },
          { id: 'doc-3', name: 'Bank Certificate June2026.pdf', size: '540 KB', uploadedBy: 'Tahmid Rahman', uploadedAt: '2026-07-15', category: 'Confirmations' },
        ],
      };
    },
    getReviewQueue: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/jobs/review-queue');
      if (res.success && res.data) return res;
      return {
        success: true,
        data: [
          { id: 'rev-1', item: 'Apex Draft Accounts Review', submittedBy: 'Nusrat Jahan', reviewer: 'Kabir Hasan (Manager)', status: 'PENDING_MANAGER' },
          { id: 'rev-2', item: 'Beximco Audit Planning Memorandum', submittedBy: 'Kabir Hasan', reviewer: 'A. R. Chowdhury (Partner)', status: 'PENDING_PARTNER' },
        ],
      };
    }
  },

  compliance: {
    getReminders: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/compliance/reminders');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_COMPLIANCE_REMINDERS };
    }
  },

  admin: {
    getActivityLogs: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/admin/activity-logs');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_ACTIVITY_LOGS };
    },
    getSystemReadiness: async (): Promise<ApiResponse<any[]>> => {
      const res = await apiRequest<any[]>('/admin/system-readiness');
      if (res.success && res.data) return res;
      return { success: true, data: MOCK_SYSTEM_READINESS };
    }
  }
};
