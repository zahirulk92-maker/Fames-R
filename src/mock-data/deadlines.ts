import { JobDeadline } from '../types/staffAndJobs';

export const MOCK_JOB_DEADLINES: JobDeadline[] = [
  {
    id: 'dl-1',
    dueDate: '2026-07-20',
    clientName: 'Beximco Communications',
    jobId: '3',
    jobTitle: 'RJSC Annual Returns Filing',
    milestone: 'Submit AGM minutes and Form XII',
    responsiblePersonId: '4',
    responsiblePersonName: 'Sajid Ahmed',
    daysRemaining: 4,
    priority: 'High',
    status: 'Due Soon',
  },
  {
    id: 'dl-2',
    dueDate: '2026-07-25',
    clientName: 'Square Pharmaceuticals',
    jobId: '2',
    jobTitle: 'Internal Audit Q2',
    milestone: 'Draft operational report for manager review',
    responsiblePersonId: '5',
    responsiblePersonName: 'Tahmid Rahman',
    daysRemaining: 9,
    priority: 'Normal',
    status: 'Upcoming',
  },
  {
    id: 'dl-3',
    dueDate: '2026-07-16', // Today!
    clientName: 'Apex Holdings Ltd.',
    jobId: '1',
    jobTitle: 'Statutory Audit FY 2025-26',
    milestone: 'Deliver signed engagement letter and physical documents check',
    responsiblePersonId: '3',
    responsiblePersonName: 'Nusrat Jahan',
    daysRemaining: 0,
    priority: 'Urgent',
    status: 'Due Today',
  },
  {
    id: 'dl-4',
    dueDate: '2026-07-10', // Past
    clientName: 'Navana Motors',
    jobId: '5',
    jobTitle: 'Special Purpose Audit',
    milestone: 'Deliver signed opinion report',
    responsiblePersonId: '1',
    responsiblePersonName: 'A. R. Chowdhury, FCA',
    daysRemaining: -6,
    priority: 'High',
    status: 'Completed Preview',
  }
];
