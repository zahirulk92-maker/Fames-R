import { ClientRequest } from '../types/clients';

export const INITIAL_MOCK_REQUESTS: ClientRequest[] = [
  {
    id: 'REQ-2026-001',
    clientName: 'Orion Infotech Ltd.',
    requestType: 'New Client Onboarding',
    submittedBy: 'Zamil Hossain (Director)',
    submittedDate: '2026-07-10',
    assignedReviewer: 'A. R. Chowdhury, FCA',
    priority: 'Normal',
    status: 'Under Review',
    lastUpdate: '2026-07-12 15:40',
    contactPerson: 'Zamil Hossain',
    contactEmail: 'zamil@orioninfotech.com',
    contactPhone: '+880-1714-123456',
    requestedServices: ['Accounting', 'Income Tax', 'Company Secretarial'],
    description: 'We are a rapidly growing software-as-a-service (SaaS) start-up with 45 employees. We need FAMES & R to reconstruct our accounting records, implement automated payroll structures, and prepare our annual corporate tax filings.',
    supportingDocPlaceholder: 'Trade License, Incorporation Certificate',
    reviewNotes: 'Initial documents are clear. Need to check if their bookkeeping was done on QuickBooks or Excel.',
    timeline: [
      { status: 'Submitted', date: '2026-07-10 10:00', actor: 'Zamil Hossain', comment: 'Proposal submitted via online portal.' },
      { status: 'Under Review', date: '2026-07-12 15:40', actor: 'A. R. Chowdhury, FCA', comment: 'Assigned to manager Kabir Hasan for preliminary feasibility report.' }
    ]
  },
  {
    id: 'REQ-2026-002',
    clientName: 'Apex Holdings Ltd.',
    requestType: 'Service Addition',
    submittedBy: 'Tanvir Hossain (CFO)',
    submittedDate: '2026-07-14',
    assignedReviewer: 'M. F. Ahmed, FCA',
    priority: 'High',
    status: 'Submitted',
    lastUpdate: '2026-07-14 09:12',
    contactPerson: 'Tanvir Hossain',
    contactEmail: 'cfo@apexholdings.com',
    contactPhone: '+880-1711-234567',
    requestedServices: ['RJSC', 'Advisory'],
    description: 'Requesting FAMES & R to handle RJSC share allotment submission for a new capital increase round of BDT 50,000,000, as well as advisory services for foreign direct investment compliance.',
    supportingDocPlaceholder: 'Board Resolution, Share Subscription Agreement',
    reviewNotes: '',
    timeline: [
      { status: 'Submitted', date: '2026-07-14 09:12', actor: 'Tanvir Hossain', comment: 'CFO submitted urgent RJSC service addition request.' }
    ]
  },
  {
    id: 'REQ-2026-003',
    clientName: 'Grameen Shakti Energy Ltd.',
    requestType: 'New Client Onboarding',
    submittedBy: 'Samia Tasnim (Secretary)',
    submittedDate: '2026-07-05',
    assignedReviewer: 'S. K. Nandy, FCA',
    priority: 'Urgent',
    status: 'Need More Info',
    lastUpdate: '2026-07-08 14:22',
    contactPerson: 'Samia Tasnim',
    contactEmail: 'samia@grameenshakti.org',
    contactPhone: '+880-1811-998877',
    requestedServices: ['Statutory Audit'],
    description: 'We require a Statutory Audit of our micro-finance operations and solar-home-system division for the year ended June 30, 2026. Audit must be completed and signed by October 15, 2026 for international donor compliance.',
    supportingDocPlaceholder: 'Previous Audit Report 2025, NGO License',
    reviewNotes: 'Waiting for previous auditor Clearance Certificate (NOC) and full donor list.',
    timeline: [
      { status: 'Submitted', date: '2026-07-05 11:30', actor: 'Samia Tasnim' },
      { status: 'Under Review', date: '2026-07-06 14:00', actor: 'S. K. Nandy, FCA' },
      { status: 'Need More Info', date: '2026-07-08 14:22', actor: 'S. K. Nandy, FCA', comment: 'Clearance certificate from predecessor firm is mandatory. Please provide.' }
    ]
  },
  {
    id: 'REQ-2026-004',
    clientName: 'Golden Jute Mills Co.',
    requestType: 'Engagement Renewal',
    submittedBy: 'Ataur Rahman (MD)',
    submittedDate: '2026-06-20',
    assignedReviewer: 'A. R. Chowdhury, FCA',
    priority: 'Normal',
    status: 'Approved',
    lastUpdate: '2026-06-25 11:00',
    contactPerson: 'Ataur Rahman',
    contactEmail: 'md@goldenjute.com',
    contactPhone: '+880-1712-990011',
    requestedServices: ['Statutory Audit', 'Income Tax'],
    description: 'Annual statutory audit and tax filing renewal for the financial year ending June 30, 2026. Fees are proposed at same levels as preceding financial year with 5% adjustment for inflation.',
    supportingDocPlaceholder: 'Signed Engagement Letter Draft',
    reviewNotes: 'Approved by executive committee. Moving forward with drafting final engagement letter.',
    timeline: [
      { status: 'Submitted', date: '2026-06-20 10:00', actor: 'Ataur Rahman' },
      { status: 'Approved', date: '2026-06-25 11:00', actor: 'A. R. Chowdhury, FCA', comment: 'Proposal approved. Assigned team led by Senior Tahmid.' }
    ]
  }
];
