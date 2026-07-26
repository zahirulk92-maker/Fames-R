import { Holiday, LeaveRequest } from '../types/staffAndJobs';

export const MOCK_HOLIDAYS: Holiday[] = [
  { id: 'hol-1', title: 'Eid-ul-Fitr Holiday', date: '2026-07-28', endDate: '2026-07-30', duration: '3 Days', type: 'Public Holiday' },
  { id: 'hol-2', title: 'National Mourning Day', date: '2026-08-15', duration: '1 Day', type: 'Public Holiday' },
  { id: 'hol-3', title: 'Janmashtami', date: '2026-09-04', duration: '1 Day', type: 'Public Holiday' },
  { id: 'hol-4', title: 'Durga Puja (Dashami)', date: '2026-10-20', duration: '1 Day', type: 'Public Holiday' },
  { id: 'hol-5', title: 'Firm Anniversary Celebration', date: '2026-12-01', duration: '1 Day', type: 'Firm Holiday' }
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'req-1',
    staffId: '4',
    staffName: 'Sajid Ahmed',
    leaveType: 'Examination Leave',
    startDate: '2026-07-20',
    endDate: '2026-07-25',
    numberOfDays: 6,
    reason: 'To sit for the ICAB Professional Level Examination papers.',
    handoverPersonId: '5',
    handoverPersonName: 'Tahmid Rahman',
    affectedTasksText: 'RJSC returns filing will be paused, Tahmid will monitor urgent portal emails.',
    status: 'Pending',
  },
  {
    id: 'req-2',
    staffId: '7',
    staffName: 'Farhana Yasmin',
    leaveType: 'Sick Leave',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    numberOfDays: 3,
    reason: 'Suffering from viral fever, advised bed rest by doctor.',
    handoverPersonId: '3',
    handoverPersonName: 'Nusrat Jahan',
    affectedTasksText: 'Individual tax filing spreadsheets handed over to Nusrat.',
    status: 'Approved Preview',
  },
  {
    id: 'req-3',
    staffId: '3',
    staffName: 'Nusrat Jahan',
    leaveType: 'Casual Leave',
    startDate: '2026-08-05',
    endDate: '2026-08-06',
    numberOfDays: 2,
    reason: 'Family urgent business in hometown.',
    handoverPersonId: '2',
    handoverPersonName: 'Kabir Hasan',
    affectedTasksText: 'Apex audit substantive procedures paused during this time.',
    status: 'Approved Preview',
  }
];
