import { NavigationItem } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  // Dashboard
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'LayoutDashboard',
    section: 'DASHBOARD',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },

  // Client Management
  {
    id: 'clients-index',
    label: 'Clients Directory',
    route: '/clients',
    icon: 'Users',
    section: 'CLIENT MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'clients-requests',
    label: 'Client Requests',
    route: '/clients/requests',
    icon: 'GitPullRequest',
    section: 'CLIENT MANAGEMENT',
    enabled: true,
    badge: 'New',
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'clients-portal',
    label: 'Portal Access',
    route: '/clients/portal-access',
    icon: 'ShieldCheck',
    section: 'CLIENT MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER']
  },
  {
    id: 'clients-comms',
    label: 'Client Communications',
    route: '/clients/communications',
    icon: 'MessageSquare',
    section: 'CLIENT MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT', 'CLIENT']
  },

  // Student & Staff Management
  {
    id: 'staff-index',
    label: 'Students / Staff',
    route: '/staff',
    icon: 'UserCheck',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER']
  },
  {
    id: 'staff-tasks',
    label: 'Student Tasks',
    route: '/staff/tasks',
    icon: 'CheckSquare',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    badge: 5,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'staff-worklogs',
    label: 'Work Logs',
    route: '/staff/work-logs',
    icon: 'FileText',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'staff-attendance',
    label: 'Attendance',
    route: '/staff/attendance',
    icon: 'Clock',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'staff-performance',
    label: 'Performance Reports',
    route: '/staff/performance',
    icon: 'Award',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER']
  },
  {
    id: 'staff-calendar',
    label: 'Holiday Calendar',
    route: '/staff/holiday-calendar',
    icon: 'Calendar',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT', 'CLIENT']
  },
  {
    id: 'staff-salary',
    label: 'Salary & Allowance',
    route: '/staff/salary-allowance',
    icon: 'DollarSign',
    section: 'STUDENT & STAFF MANAGEMENT',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },

  // Jobs & Operations
  {
    id: 'jobs-index',
    label: 'Job Register',
    route: '/jobs',
    icon: 'Briefcase',
    section: 'JOBS & OPERATIONS',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'jobs-assignments',
    label: 'Assignments',
    route: '/jobs/assignments',
    icon: 'UserPlus',
    section: 'JOBS & OPERATIONS',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'jobs-deadlines',
    label: 'Deadlines',
    route: '/jobs/deadlines',
    icon: 'CalendarClock',
    section: 'JOBS & OPERATIONS',
    enabled: true,
    badge: '3 Due',
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'jobs-documents',
    label: 'Documents Vault',
    route: '/jobs/documents',
    icon: 'FolderOpen',
    section: 'JOBS & OPERATIONS',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT', 'CLIENT']
  },
  {
    id: 'jobs-review',
    label: 'Review Queue',
    route: '/jobs/review-queue',
    icon: 'ClipboardList',
    section: 'JOBS & OPERATIONS',
    enabled: true,
    badge: 2,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },

  // Audit Workflow
  {
    id: 'audit-planning',
    label: '1. Audit Planning',
    route: '/audit/planning',
    icon: 'FileSpreadsheet',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'audit-requisition',
    label: '2. Requisitions',
    route: '/audit/requisition',
    icon: 'FileDown',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'audit-engagement',
    label: '3. Engagement Procedure',
    route: '/audit/engagement-procedure',
    icon: 'Award',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'audit-substantive',
    label: '4. Substantive Procedure',
    route: '/audit/substantive-procedure',
    icon: 'TrendingUp',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'audit-workingpapers',
    label: '5. Working Papers',
    route: '/audit/working-papers',
    icon: 'Files',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'audit-review',
    label: '6. Review Issues',
    route: '/audit/review-issues',
    icon: 'AlertTriangle',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'audit-finalization',
    label: '7. Finalization',
    route: '/audit/finalization',
    icon: 'FileCheck',
    section: 'AUDIT WORKFLOW',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER']
  },

  // Compliance
  {
    id: 'compliance-taxvat',
    label: 'Tax & VAT Board',
    route: '/compliance/tax-vat',
    icon: 'Percent',
    section: 'COMPLIANCE',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'compliance-rjsc',
    label: 'RJSC Filings',
    route: '/compliance/rjsc',
    icon: 'Globe',
    section: 'COMPLIANCE',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR']
  },
  {
    id: 'compliance-returns',
    label: 'Returns Tracker',
    route: '/compliance/returns',
    icon: 'TrendingDown',
    section: 'COMPLIANCE',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT']
  },
  {
    id: 'compliance-calendar',
    label: 'Compliance Calendar',
    route: '/compliance/calendar',
    icon: 'Calendar',
    section: 'COMPLIANCE',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN', 'MANAGER', 'SENIOR', 'STUDENT', 'CLIENT']
  },

  // Administration
  {
    id: 'admin-users',
    label: 'User Management',
    route: '/admin/users',
    icon: 'Users',
    section: 'ADMINISTRATION',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN']
  },
  {
    id: 'admin-roles',
    label: 'Roles & Permissions',
    route: '/admin/roles-permissions',
    icon: 'ShieldAlert',
    section: 'ADMINISTRATION',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN']
  },
  {
    id: 'admin-settings',
    label: 'Firm Settings',
    route: '/admin/firm-settings',
    icon: 'Sliders',
    section: 'ADMINISTRATION',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN']
  },
  {
    id: 'admin-logs',
    label: 'System Activity Logs',
    route: '/admin/activity-logs',
    icon: 'Activity',
    section: 'ADMINISTRATION',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN']
  },
  {
    id: 'admin-readiness',
    label: 'System Readiness',
    route: '/admin/system-readiness',
    icon: 'Cpu',
    section: 'ADMINISTRATION',
    enabled: true,
    allowedRoles: ['PARTNER', 'SUPER_ADMIN']
  }
];
