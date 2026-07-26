/**
 * FAMES & R Office PRO - Core TypeScript Types
 */

export type UserRole = 'PARTNER' | 'SUPER_ADMIN' | 'MANAGER' | 'SENIOR' | 'STUDENT' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: string; // Name of Lucide React icon
  section: 'Dashboard' | 'Clients' | 'Staff' | 'Jobs' | 'Audit' | 'Compliance' | 'Administration';
  allowedRoles?: UserRole[];
  badge?: string | number;
  enabled: boolean;
}

// Future-ready API response structures
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Core entities for future integration
export interface Client {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  partnerInCharge: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
  attendanceToday?: 'PRESENT' | 'ABSENT' | 'LATE';
}

export interface Job {
  id: string;
  title: string;
  clientName: string;
  assignedTo: string[];
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED';
  deadline: string;
  progress: number; // 0 - 100
}

export interface Task {
  id: string;
  title: string;
  jobId?: string;
  assignedTo: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

export * from './staffAndJobs';

