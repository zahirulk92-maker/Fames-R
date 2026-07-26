import { PortalAccessRecord } from '../types/clients';

export const INITIAL_PORTAL_RECORDS: PortalAccessRecord[] = [
  {
    id: 'port-1',
    clientId: '1',
    clientName: 'Apex Holdings Ltd.',
    portalUser: 'Tanvir Hossain',
    email: 'cfo@apexholdings.com',
    role: 'Client Admin',
    invitationStatus: 'Active',
    accessStatus: 'Active',
    lastLogin: '2026-07-16 10:45',
    assignedBy: 'Md. Zahirul Islam',
    expiryPlaceholder: 'Never Expires',
    invitationNote: 'Welcome to the FAMES & R Portal. You can view all outstanding tax schedules and upload audited sheets.',
    accessScope: ['Own Documents', 'Requests', 'Communications', 'Engagement Status', 'Compliance Status']
  },
  {
    id: 'port-2',
    clientId: '2',
    clientName: 'Square Pharmaceuticals PLC',
    portalUser: 'Sardar Zainuddin',
    email: 'szain@squarepharma.com',
    role: 'Management Contact',
    invitationStatus: 'Active',
    accessStatus: 'Active',
    lastLogin: '2026-07-15 15:30',
    assignedBy: 'Kabir Hasan',
    expiryPlaceholder: 'Never Expires',
    invitationNote: 'Corporate management interface for final signoffs.',
    accessScope: ['Own Documents', 'Engagement Status', 'Compliance Status']
  },
  {
    id: 'port-3',
    clientId: '4',
    clientName: 'Shasthya Foundation Bangladesh',
    portalUser: 'Dr. Nusrat Zaman',
    email: 'nusrat.zaman@shasthya.org',
    role: 'Client Admin',
    invitationStatus: 'Invitation Prepared',
    accessStatus: 'Suspended', // status initially not active/suspended until accepted
    assignedBy: 'Kabir Hasan',
    expiryPlaceholder: 'Expires in 30 days',
    invitationNote: 'Invitation drafted to allow direct uploads of foreign donor audit files.',
    accessScope: ['Own Documents', 'Requests', 'Communications']
  },
  {
    id: 'port-4',
    clientId: '5',
    clientName: 'Navana Motors Limited',
    portalUser: 'Mustafa Al-Hasan',
    email: 'mustafa@navanamotors.com',
    role: 'Finance Contact',
    invitationStatus: 'Revoked',
    accessStatus: 'Revoked',
    lastLogin: '2025-11-20 16:00',
    assignedBy: 'S. K. Nandy, FCA',
    expiryPlaceholder: 'Revoked 2026-01-10',
    invitationNote: 'Former Finance Controller access revoked following exit from company.',
    accessScope: ['Own Documents']
  }
];
