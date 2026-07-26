import { ClientCommunication, ClientFollowUp } from '../types/clients';

export const INITIAL_COMMUNICATIONS: ClientCommunication[] = [
  {
    id: 'comm-1',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    date: '2026-07-16 11:30',
    contactPerson: 'Tanvir Hossain (CFO)',
    type: 'Email',
    subject: 'Request for VAT Circle Circular 4 Clarifications',
    summary: 'Dispatched list of specific audit queries and required sales ledger rows requested by the NBR VAT audit division.',
    outcome: 'Awaiting client response with transaction ledger.',
    owner: 'Kabir Hasan',
    followUpRequired: true,
    followUpDate: '2026-07-19',
    status: 'Waiting for Client',
    isInternalNote: false,
    attachmentPlaceholder: 'VAT_Circular_Query_List_July.pdf'
  },
  {
    id: 'comm-2',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    date: '2026-07-15 14:00',
    contactPerson: 'Asif Rahman (Finance Manager)',
    type: 'Phone Call',
    subject: 'Clarification of Audit Sample #12-40',
    summary: 'Discussed minor discrepancies found in physical stock count vs warehouse journal entries for Gazipur depot.',
    outcome: 'Resolved. Client agreed to search the original supplier dispatch notes.',
    owner: 'Tahmid Rahman',
    followUpRequired: false,
    status: 'Completed',
    isInternalNote: false
  },
  {
    id: 'comm-3',
    clientId: '2',
    clientName: 'Square Pharmaceuticals PLC',
    date: '2026-07-16 09:15',
    contactPerson: 'Sardar Zainuddin (Director of Finance)',
    type: 'Meeting',
    subject: 'Audit Committee Agenda Sign-off Briefing',
    summary: 'Met at the client corporate headquarters Mohakhali to walk through outstanding draft disclosures and obtain management signoffs for the final audit package.',
    outcome: 'Management approved drafts with minor text changes. S. K. Nandy, FCA will sign tomorrow.',
    owner: 'S. K. Nandy, FCA',
    followUpRequired: true,
    followUpDate: '2026-07-16', // Due today!
    status: 'Follow-up Required',
    isInternalNote: false,
    attachmentPlaceholder: 'Signed_Board_Minutes_Pharma_Draft.pdf'
  },
  {
    id: 'comm-4',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    date: '2026-07-12 16:30',
    contactPerson: 'Internal Team Only',
    type: 'Internal Note',
    subject: 'Note on Apex internal controls weak point',
    summary: 'Observed that the inventory management system has high risk since entry edits can be made by store officers without secondary CFO authorization codes.',
    outcome: 'Must mention as a key audit matter in our management letter report.',
    owner: 'Kabir Hasan',
    followUpRequired: false,
    status: 'Logged',
    isInternalNote: true
  },
  {
    id: 'comm-5',
    clientId: '4',
    clientName: 'Shasthya Foundation Bangladesh',
    date: '2026-07-10 10:20',
    contactPerson: 'Dr. Nusrat Zaman',
    type: 'WhatsApp',
    subject: 'Grant Funding Certification Draft Review',
    summary: 'Exchanged WhatsApp draft copies of the special grant certification statement for the USAID maternal health fund.',
    outcome: 'Draft approved. Waiting for official stamp scan from Shasthya office.',
    owner: 'M. F. Ahmed, FCA',
    followUpRequired: true,
    followUpDate: '2026-07-13', // Overdue!
    status: 'Overdue',
    isInternalNote: false
  },
  {
    id: 'comm-6',
    clientId: '3',
    clientName: 'Beximco Communications Ltd.',
    date: '2026-07-08 14:00',
    contactPerson: 'Rahat Chowdhury (GM Accounts)',
    type: 'Portal Message',
    subject: 'Inbound Request on Foreign Remittance Tax Exemptions',
    summary: 'Client asked about double tax avoidance treaty implications with Norway supplier invoices.',
    outcome: 'Provided advisory feedback memo via email attachment.',
    owner: 'A. R. Chowdhury, FCA',
    followUpRequired: false,
    status: 'Completed',
    isInternalNote: false
  }
];

export const INITIAL_FOLLOW_UPS: ClientFollowUp[] = [
  {
    id: 'f-1',
    clientId: '2',
    clientName: 'Square Pharmaceuticals PLC',
    task: 'Obtain final signed Representation Letter from MD',
    dueDate: '2026-07-16', // Due today
    assignedStaff: 'S. K. Nandy, FCA',
    priority: 'Urgent',
    status: 'Pending'
  },
  {
    id: 'f-2',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    task: 'Verify physical stock reconciliation sheet for Tejgaon depot',
    dueDate: '2026-07-18', // Due within 3 days
    assignedStaff: 'Tahmid Rahman',
    priority: 'High',
    status: 'Pending'
  },
  {
    id: 'f-3',
    clientId: '4',
    clientName: 'Shasthya Foundation Bangladesh',
    task: 'Collect USAID project audit clearance certificate',
    dueDate: '2026-07-13', // Overdue
    assignedStaff: 'Kabir Hasan',
    priority: 'Normal',
    status: 'Overdue'
  },
  {
    id: 'f-4',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    task: 'Finalize corporate tax assessment schedules',
    dueDate: '2026-07-22', // Later
    assignedStaff: 'M. F. Ahmed, FCA',
    priority: 'Normal',
    status: 'Pending'
  }
];
