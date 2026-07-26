import { Client, Staff, Job, Task } from '../types';

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Apex Holdings Ltd.', code: 'APEX-01', email: 'audit@apexholdings.com', phone: '+880-2-9812345', status: 'ACTIVE', partnerInCharge: 'A. R. Chowdhury, FCA' },
  { id: '2', name: 'Square Pharmaceuticals', code: 'SQR-02', email: 'finance@square.com', phone: '+880-2-9856789', status: 'ACTIVE', partnerInCharge: 'M. F. Ahmed, FCA' },
  { id: '3', name: 'Beximco Communications', code: 'BEX-03', email: 'comms@beximco.net', phone: '+880-17-1111222', status: 'ACTIVE', partnerInCharge: 'A. R. Chowdhury, FCA' },
  { id: '4', name: 'Jamuna Oil Company', code: 'JOC-04', email: 'info@jamunaoil.gov.bd', phone: '+880-31-614321', status: 'ACTIVE', partnerInCharge: 'M. F. Ahmed, FCA' },
  { id: '5', name: 'Navana Motors', code: 'NAV-05', email: 'accounts@navanamotors.com', phone: '+880-2-8822334', status: 'PENDING', partnerInCharge: 'S. K. Nandy, FCA' }
];

export const MOCK_STAFF: Staff[] = [
  { id: '1', name: 'Kabir Hasan', email: 'kabir.hasan@famesr.com', role: 'MANAGER', department: 'Audit & Assurance', status: 'ACTIVE', attendanceToday: 'PRESENT' },
  { id: '2', name: 'Nusrat Jahan', email: 'nusrat.jahan@famesr.com', role: 'SENIOR', department: 'Audit & Assurance', status: 'ACTIVE', attendanceToday: 'PRESENT' },
  { id: '3', name: 'Sajid Ahmed', email: 'sajid.ahmed@famesr.com', role: 'STUDENT', department: 'Tax & Compliance', status: 'ACTIVE', attendanceToday: 'LATE' },
  { id: '4', name: 'Tahmid Rahman', email: 'tahmid.rahman@famesr.com', role: 'STUDENT', department: 'Audit & Assurance', status: 'ACTIVE', attendanceToday: 'PRESENT' },
  { id: '5', name: 'Rashedul Bari', email: 'rashed.bari@famesr.com', role: 'SUPER_ADMIN', department: 'IT & Administration', status: 'ACTIVE', attendanceToday: 'PRESENT' }
];

export const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Statutory Audit FY 2025-26', clientName: 'Apex Holdings Ltd.', assignedTo: ['Kabir Hasan', 'Nusrat Jahan'], status: 'IN_PROGRESS', deadline: '2026-08-31', progress: 45 },
  { id: '2', title: 'Internal Audit Q2', clientName: 'Square Pharmaceuticals', assignedTo: ['Kabir Hasan', 'Tahmid Rahman'], status: 'IN_PROGRESS', deadline: '2026-07-25', progress: 80 },
  { id: '3', title: 'RJSC Annual Returns Filing', clientName: 'Beximco Communications', assignedTo: ['Sajid Ahmed'], status: 'UNDER_REVIEW', deadline: '2026-07-20', progress: 95 },
  { id: '4', title: 'Tax Assessment Representation', clientName: 'Jamuna Oil Company', assignedTo: ['Nusrat Jahan'], status: 'NOT_STARTED', deadline: '2026-09-15', progress: 0 },
  { id: '5', title: 'Special Purpose Audit', clientName: 'Navana Motors', assignedTo: ['Tahmid Rahman'], status: 'COMPLETED', deadline: '2026-07-10', progress: 100 }
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Drafting planning memorandum', jobId: '1', assignedTo: 'Nusrat Jahan', status: 'DONE', priority: 'HIGH', dueDate: '2026-07-10' },
  { id: '2', title: 'Verifying cash and bank balances', jobId: '1', assignedTo: 'Tahmid Rahman', status: 'IN_PROGRESS', priority: 'MEDIUM', dueDate: '2026-07-22' },
  { id: '3', title: 'Reviewing trial balance & general ledger', jobId: '2', assignedTo: 'Kabir Hasan', status: 'IN_PROGRESS', priority: 'HIGH', dueDate: '2026-07-18' },
  { id: '4', title: 'Prepare RJSC Form XII filing', jobId: '3', assignedTo: 'Sajid Ahmed', status: 'DONE', priority: 'MEDIUM', dueDate: '2026-07-14' },
  { id: '5', title: 'Tax computation review', jobId: '4', assignedTo: 'Nusrat Jahan', status: 'TODO', priority: 'HIGH', dueDate: '2026-07-29' }
];

export const MOCK_AUDIT_STAGES = [
  { stage: 'Planning', count: 4, status: 'Active', description: 'Risk assessments and client acceptance checks.' },
  { stage: 'Requisitions', count: 12, status: 'Ongoing', description: 'Pending information and file requests sent to clients.' },
  { stage: 'Engagement Procedure', count: 2, status: 'Active', description: 'Finalizing engagement letters and team briefings.' },
  { stage: 'Substantive Procedure', count: 8, status: 'Active', description: 'Testing journal entries, sampling, and analytical reviews.' },
  { stage: 'Working Papers', count: 45, status: 'Drafting', description: 'Reviewing audit evidence files and trial balance linking.' },
  { stage: 'Review Issues', count: 7, status: 'Critical', description: 'Manager and Partner queries that require remediation.' },
  { stage: 'Finalization', count: 1, status: 'Pending', description: 'Drafting the auditor independent opinion and management letter.' }
];

export const MOCK_COMPLIANCE_REMINDERS = [
  { id: 'c1', entity: 'Apex Holdings Ltd.', type: 'VAT Returns', dueDate: '2026-07-15', status: 'COMPLETED', filingAgency: 'NBR' },
  { id: 'c2', entity: 'Beximco Communications', type: 'Annual RJSC Return', dueDate: '2026-07-31', status: 'IN_PROGRESS', filingAgency: 'RJSC' },
  { id: 'c3', entity: 'Square Pharmaceuticals', type: 'Quarterly TDS Return', dueDate: '2026-07-20', status: 'PENDING', filingAgency: 'NBR' },
  { id: 'c4', entity: 'Navana Motors', type: 'Income Tax Assessment', dueDate: '2026-08-15', status: 'PENDING', filingAgency: 'NBR' }
];

export const MOCK_ACTIVITY_LOGS = [
  { id: 'log-1', user: 'Kabir Hasan (Manager)', action: 'Approved audit working papers', target: 'Apex Holdings - cash & bank section', timestamp: '2026-07-16 11:24:00' },
  { id: 'log-2', user: 'Rashedul Bari (Admin)', action: 'Created new user account', target: 'Sajid Ahmed (Student)', timestamp: '2026-07-16 10:15:00' },
  { id: 'log-3', user: 'Nusrat Jahan (Senior)', action: 'Uploaded document', target: 'Square Pharma TB FY 25-26.xlsx', timestamp: '2026-07-16 09:44:00' },
  { id: 'log-4', user: 'Tahmid Rahman (Student)', action: 'Updated task progress', target: 'Cash verification to 100%', timestamp: '2026-07-15 17:30:00' },
  { id: 'log-5', user: 'A. R. Chowdhury (Partner)', action: 'Signed audit report', target: 'Navana Motors Special Audit', timestamp: '2026-07-15 15:10:00' }
];

export const MOCK_SYSTEM_READINESS = [
  { service: 'Active Directory (Auth Mock)', status: 'HEALTHY', latency: '45ms', details: 'No sync delays' },
  { service: 'Document Archival Vault', status: 'HEALTHY', latency: '120ms', details: 'Storage usage at 42%' },
  { service: 'NBR Tax Calculator Service', status: 'HEALTHY', latency: '210ms', details: 'API v2.4 integrated' },
  { service: 'RJSC Scraping Pipeline', status: 'HEALTHY', latency: '410ms', details: 'Scraper successfully verified' },
  { service: 'Supabase Adapter Draft', status: 'OFFLINE', latency: '0ms', details: 'Mock status (intentional frontend mode)' }
];

// Centralized Staff & Jobs Mock Modules
export * from './staff';
export * from './tasks';
export * from './workLogs';
export * from './attendance';
export * from './performance';
export * from './leave';
export * from './payroll';
export * from './jobs';
export * from './assignments';
export * from './deadlines';
export * from './documents';
export * from './reviewQueue';

