/**
 * FAMES & R Office PRO - Client Management Type Definitions
 */

export interface ClientContact {
  id?: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  altPhone?: string;
  preferredMethod: 'Email' | 'Phone' | 'WhatsApp' | 'In-Person';
}

export interface ClientService {
  id: string;
  name: string;
  status: 'Active' | 'Suspended' | 'Completed' | 'Not Started';
  assignedTeam?: string[];
  startDate: string;
  lastCompletedJob?: string;
  nextRequiredAction?: string;
}

export interface ClientJobSummary {
  id: string;
  code: string;
  jobType: string;
  period: string;
  manager: string;
  progress: number; // 0 - 100
  dueDate: string;
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Waiting for Client' | 'Near Deadline' | 'Overdue' | 'Completed';
}

export interface ClientDocumentSummary {
  id: string;
  title: string;
  category: string;
  period: string;
  requestedDate: string;
  receivedDate?: string;
  status: 'Pending' | 'Received' | 'Approved' | 'Rejected';
}

export interface ClientComplianceSummary {
  id: string;
  filingType: string;
  period: string;
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  responsiblePerson: string;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  action: 'Client added' | 'Details updated' | 'Service assigned' | 'Job created' | 'Communication logged' | 'Portal invitation prepared' | string;
  actor: string;
  timestamp: string;
  details?: string;
}

export interface Client {
  id: string;
  name: string;
  tradingName?: string;
  code: string;
  type: 'Private Limited Company' | 'Public Limited Company' | 'Partnership' | 'Proprietorship' | 'NGO' | 'Trust' | 'Association' | 'Individual' | 'Other';
  registrationNumber?: string;
  incorporationDate?: string;
  financialYearEnd: string;
  industry?: string;
  businessDescription?: string;
  tin?: string;
  bin?: string;
  vatCircle?: string;
  taxCircle?: string;
  rjscRegistrationNumber?: string;
  regulatoryBody?: string;
  listedStatus?: 'Listed' | 'Unlisted';
  primaryContact: ClientContact;
  additionalContacts?: ClientContact[];
  officeAddress?: string;
  registeredAddress?: string;
  website?: string;
  services: string[]; // Statutory Audit, Internal Audit, Accounting, Income Tax, VAT, RJSC, Advisory, Payroll, Company Secretarial
  assignedPartner: string;
  assignedManager?: string;
  assignedSenior?: string;
  engagementStartDate?: string;
  portalRequired: boolean;
  portalContactEmail?: string;
  portalRolePlaceholder?: string;
  portalStatus: 'Not Invited' | 'Invitation Prepared' | 'Invited' | 'Active' | 'Suspended' | 'Revoked';
  status: 'Active' | 'Pending Onboarding' | 'Inactive' | 'Suspended' | 'Archived';
  lastActivity?: string;
}

export interface ClientRequestReview {
  status: string;
  date: string;
  actor: string;
  comment?: string;
}

export interface ClientRequest {
  id: string;
  clientName: string;
  requestType: 'New Client Onboarding' | 'Service Addition' | 'Portal Access Request' | 'Information Update' | 'Document Request' | 'Engagement Renewal' | 'Other';
  submittedBy: string;
  submittedDate: string;
  assignedReviewer: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Need More Info' | 'Approved' | 'Rejected' | 'Converted to Client';
  lastUpdate: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  requestedServices?: string[];
  description: string;
  supportingDocPlaceholder?: string;
  reviewNotes?: string;
  timeline?: ClientRequestReview[];
}

export interface PortalAccessRecord {
  id: string;
  clientId: string;
  clientName: string;
  portalUser: string;
  email: string;
  role: 'Client Admin' | 'Finance Contact' | 'Document Contributor' | 'Read Only' | 'Management Contact';
  invitationStatus: 'Not Invited' | 'Invitation Prepared' | 'Pending Acceptance' | 'Active' | 'Suspended' | 'Revoked';
  accessStatus: 'Active' | 'Suspended' | 'Revoked';
  lastLogin?: string;
  assignedBy: string;
  expiryPlaceholder?: string;
  invitationNote?: string;
  accessScope?: string[];
}

export interface PortalInvitationDraft {
  clientId: string;
  contactName: string;
  email: string;
  role: string;
  accessScope: string[];
  invitationNote?: string;
}

export interface ClientCommunication {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  contactPerson: string;
  type: 'Email' | 'Phone Call' | 'Meeting' | 'WhatsApp' | 'Letter' | 'Portal Message' | 'Internal Note';
  subject: string;
  summary: string;
  outcome?: string;
  owner: string;
  followUpRequired: boolean;
  followUpDate?: string;
  status: 'Logged' | 'Follow-up Required' | 'Waiting for Client' | 'Completed' | 'Overdue';
  isInternalNote?: boolean;
  attachmentPlaceholder?: string;
}

export interface ClientFollowUp {
  id: string;
  clientId: string;
  clientName: string;
  task: string;
  dueDate: string;
  assignedStaff: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'Pending' | 'Completed' | 'Overdue';
}
