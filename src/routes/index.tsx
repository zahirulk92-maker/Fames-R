import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppShell } from '../components/layout';
import { LoadingSkeleton } from '../components/ui';
import { LoginPage } from '../features/auth/LoginPage';

// Simple AuthGuard to redirect to /login if not authenticated
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('fames_pro_logged_in') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Shared Loading fallback wrapper
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="p-6 space-y-6">
      <div className="h-8 bg-slate-100 rounded-md w-1/4 animate-pulse" />
      <LoadingSkeleton rows={6} cols={1} />
    </div>
  }>
    {children}
  </Suspense>
);

// Lazy Loaded Named Exports from Feature Pages
const DashboardPage = lazy(() =>
  import('../features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const ClientsDirectoryView = lazy(() =>
  import('../features/clients/ClientsPage').then((m) => ({ default: m.ClientsDirectoryView }))
);
const ClientRequestsView = lazy(() =>
  import('../features/clients/ClientsPage').then((m) => ({ default: m.ClientRequestsView }))
);
const PortalAccessView = lazy(() =>
  import('../features/clients/ClientsPage').then((m) => ({ default: m.PortalAccessView }))
);
const ClientCommunicationsView = lazy(() =>
  import('../features/clients/ClientsPage').then((m) => ({ default: m.ClientCommunicationsView }))
);

const StaffDirectoryView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffDirectoryView }))
);
const StaffTasksView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffTasksView }))
);
const StaffWorkLogsView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffWorkLogsView }))
);
const StaffAttendanceView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffAttendanceView }))
);
const StaffPerformanceView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffPerformanceView }))
);
const StaffHolidayCalendarView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffHolidayCalendarView }))
);
const StaffSalaryAllowanceView = lazy(() =>
  import('../features/staff/StaffPage').then((m) => ({ default: m.StaffSalaryAllowanceView }))
);

const JobsIndexView = lazy(() =>
  import('../features/jobs/JobsPage').then((m) => ({ default: m.JobsIndexView }))
);
const JobAssignmentsView = lazy(() =>
  import('../features/jobs/JobsPage').then((m) => ({ default: m.JobAssignmentsView }))
);
const JobDeadlinesView = lazy(() =>
  import('../features/jobs/JobsPage').then((m) => ({ default: m.JobDeadlinesView }))
);
const JobDocumentsView = lazy(() =>
  import('../features/jobs/JobsPage').then((m) => ({ default: m.JobDocumentsView }))
);
const JobReviewQueueView = lazy(() =>
  import('../features/jobs/JobsPage').then((m) => ({ default: m.JobReviewQueueView }))
);

const AuditPlanningView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditPlanningView }))
);
const AuditRequisitionView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditRequisitionView }))
);
const AuditEngagementView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditEngagementView }))
);
const AuditSubstantiveView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditSubstantiveView }))
);
const AuditWorkingPapersView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditWorkingPapersView }))
);
const AuditReviewIssuesView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditReviewIssuesView }))
);
const AuditFinalizationView = lazy(() =>
  import('../features/audit/AuditPage').then((m) => ({ default: m.AuditFinalizationView }))
);

const ComplianceTaxVatView = lazy(() =>
  import('../features/compliance/CompliancePage').then((m) => ({ default: m.ComplianceTaxVatView }))
);
const ComplianceRjscView = lazy(() =>
  import('../features/compliance/CompliancePage').then((m) => ({ default: m.ComplianceRjscView }))
);
const ComplianceReturnsView = lazy(() =>
  import('../features/compliance/CompliancePage').then((m) => ({ default: m.ComplianceReturnsView }))
);
const ComplianceCalendarView = lazy(() =>
  import('../features/compliance/CompliancePage').then((m) => ({ default: m.ComplianceCalendarView }))
);

const AdminUsersView = lazy(() =>
  import('../features/administration/AdminPage').then((m) => ({ default: m.AdminUsersView }))
);
const AdminRolesPermissionsView = lazy(() =>
  import('../features/administration/AdminPage').then((m) => ({ default: m.AdminRolesPermissionsView }))
);
const AdminFirmSettingsView = lazy(() =>
  import('../features/administration/AdminPage').then((m) => ({ default: m.AdminFirmSettingsView }))
);
const AdminActivityLogsView = lazy(() =>
  import('../features/administration/AdminPage').then((m) => ({ default: m.AdminActivityLogsView }))
);
const AdminSystemReadinessView = lazy(() =>
  import('../features/administration/AdminPage').then((m) => ({ default: m.AdminSystemReadinessView }))
);

/**
 * LayoutWrapper renders nested route views inside our main application shell.
 */
const LayoutWrapper = () => (
  <AuthGuard>
    <AppShell>
      <Outlet />
    </AppShell>
  </AuthGuard>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      // Base Redirect to /dashboard
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      // Dashboard
      {
        path: 'dashboard',
        element: <LazyRoute><DashboardPage /></LazyRoute>,
      },
      // Clients
      {
        path: 'clients',
        children: [
          { path: '', element: <LazyRoute><ClientsDirectoryView /></LazyRoute> },
          { path: ':clientId', element: <LazyRoute><ClientsDirectoryView /></LazyRoute> },
          { path: 'requests', element: <LazyRoute><ClientRequestsView /></LazyRoute> },
          { path: 'portal-access', element: <LazyRoute><PortalAccessView /></LazyRoute> },
          { path: 'communications', element: <LazyRoute><ClientCommunicationsView /></LazyRoute> },
        ],
      },
      // Alias for settings/portal-access
      {
        path: 'settings/portal-access',
        element: <Navigate to="/clients/portal-access" replace />,
      },
      // Staff
      {
        path: 'staff',
        children: [
          { path: '', element: <LazyRoute><StaffDirectoryView /></LazyRoute> },
          { path: 'tasks', element: <LazyRoute><StaffTasksView /></LazyRoute> },
          { path: 'work-logs', element: <LazyRoute><StaffWorkLogsView /></LazyRoute> },
          { path: 'attendance', element: <LazyRoute><StaffAttendanceView /></LazyRoute> },
          { path: 'performance', element: <LazyRoute><StaffPerformanceView /></LazyRoute> },
          { path: 'holiday-calendar', element: <LazyRoute><StaffHolidayCalendarView /></LazyRoute> },
          { path: 'salary-allowance', element: <LazyRoute><StaffSalaryAllowanceView /></LazyRoute> },
        ],
      },
      // Jobs
      {
        path: 'jobs',
        children: [
          { path: '', element: <LazyRoute><JobsIndexView /></LazyRoute> },
          { path: 'assignments', element: <LazyRoute><JobAssignmentsView /></LazyRoute> },
          { path: 'deadlines', element: <LazyRoute><JobDeadlinesView /></LazyRoute> },
          { path: 'documents', element: <LazyRoute><JobDocumentsView /></LazyRoute> },
          { path: 'review-queue', element: <LazyRoute><JobReviewQueueView /></LazyRoute> },
        ],
      },
      // Audit
      {
        path: 'audit',
        children: [
          { path: 'planning', element: <LazyRoute><AuditPlanningView /></LazyRoute> },
          { path: 'requisition', element: <LazyRoute><AuditRequisitionView /></LazyRoute> },
          { path: 'engagement-procedure', element: <LazyRoute><AuditEngagementView /></LazyRoute> },
          { path: 'substantive-procedure', element: <LazyRoute><AuditSubstantiveView /></LazyRoute> },
          { path: 'working-papers', element: <LazyRoute><AuditWorkingPapersView /></LazyRoute> },
          { path: 'review-issues', element: <LazyRoute><AuditReviewIssuesView /></LazyRoute> },
          { path: 'finalization', element: <LazyRoute><AuditFinalizationView /></LazyRoute> },
        ],
      },
      // Compliance
      {
        path: 'compliance',
        children: [
          { path: 'tax-vat', element: <LazyRoute><ComplianceTaxVatView /></LazyRoute> },
          { path: 'rjsc', element: <LazyRoute><ComplianceRjscView /></LazyRoute> },
          { path: 'returns', element: <LazyRoute><ComplianceReturnsView /></LazyRoute> },
          { path: 'calendar', element: <LazyRoute><ComplianceCalendarView /></LazyRoute> },
        ],
      },
      // Administration
      {
        path: 'admin',
        children: [
          { path: 'users', element: <LazyRoute><AdminUsersView /></LazyRoute> },
          { path: 'roles-permissions', element: <LazyRoute><AdminRolesPermissionsView /></LazyRoute> },
          { path: 'firm-settings', element: <LazyRoute><AdminFirmSettingsView /></LazyRoute> },
          { path: 'activity-logs', element: <LazyRoute><AdminActivityLogsView /></LazyRoute> },
          { path: 'system-readiness', element: <LazyRoute><AdminSystemReadinessView /></LazyRoute> },
        ],
      },
      // Fallback redirect
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);
