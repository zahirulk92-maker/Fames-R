import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, ContentContainer } from '../../components/layout';
import { useToast, Modal, StatusBadge } from '../../components/ui';

// Central Types
import { 
  Client, 
  ClientRequest, 
  PortalAccessRecord, 
  ClientCommunication, 
  ClientFollowUp 
} from '../../types/clients';

// Mock Databases
import { 
  INITIAL_MOCK_CLIENTS
} from '../../mock-data/clients';
import { INITIAL_MOCK_REQUESTS } from '../../mock-data/clientRequests';
import { INITIAL_PORTAL_RECORDS } from '../../mock-data/portalAccess';
import { 
  INITIAL_COMMUNICATIONS, 
  INITIAL_FOLLOW_UPS 
} from '../../mock-data/clientCommunications';

// Sub-components
import { ClientMetrics } from './components/ClientMetrics';
import { ClientFilters } from './components/ClientFilters';
import { ClientTable } from './components/ClientTable';
import { ClientFormModal } from './components/ClientFormModal';
import { ClientDetailsDrawer } from './components/ClientDetailsDrawer';

import { 
  ClientRequestTable, 
  ClientRequestDetails, 
  ClientRequestForm 
} from './components/ClientRequestComponents';

import { 
  PortalAccessTable, 
  PortalInvitationModal 
} from './components/PortalAccessComponents';

import { 
  CommunicationTable, 
  CommunicationLogModal, 
  ConversationPanel, 
  FollowUpPanel 
} from './components/CommunicationComponents';

// =========================================================
// SANDBOX GLOBAL SIMULATOR BAR
// =========================================================
const SandboxBanner: React.FC = () => (
  <div className="bg-slate-900 text-slate-100 px-6 py-2 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs border border-slate-800 shadow-lg mb-6">
    <div className="flex items-center gap-2">
      <span className="flex h-2 w-2 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
      </span>
      <span className="font-bold text-slate-300">Sandbox Preview Mode</span>
      <span className="text-slate-500 hidden sm:inline">|</span>
      <p className="text-slate-400 font-medium">
        FAMES & R Office PRO Frontend. All state changes are tracked in-memory and will reset upon browser refresh.
      </p>
    </div>
    <span className="self-start sm:self-center bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm font-mono text-[10px] border border-slate-700">
      NO BACKEND COMMITS
    </span>
  </div>
);


// =========================================================
// VIEW 1: CLIENTS DIRECTORY (/clients & /clients/:clientId)
// =========================================================
export const ClientsDirectoryView: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // In-memory Client Database
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('fames_pro_clients');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CLIENTS;
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState('');
  const [portalFilter, setPortalFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Sync state changes to simple localStorage for page persistence stability
  useEffect(() => {
    localStorage.setItem('fames_pro_clients', JSON.stringify(clients));
  }, [clients]);

  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<Client, 'id' | 'status' | 'code'>) => {
    if (editingClient) {
      // Update Client record
      setClients(prev => 
        prev.map(c => c.id === editingClient.id ? { 
          ...c, 
          ...data,
          // Maintain system immutable code and id
        } : c)
      );
      showToast(`Corporate client profile for "${data.name}" updated successfully.`, 'success');
    } else {
      // Generate code dynamically
      const cleanName = data.name.trim().toUpperCase().replace(/[^A-Z]/g, '');
      const dynamicPrefix = cleanName.substring(0, 3) || 'CLM';
      const increment = (clients.length + 1).toString().padStart(2, '0');
      const generatedCode = `${dynamicPrefix}-${increment}`;

      const newClient: Client = {
        id: (clients.length + 1).toString(),
        code: generatedCode,
        status: 'Active',
        ...data,
      };

      setClients(prev => [...prev, newClient]);
      showToast(`New client "${data.name}" successfully registered with code "${generatedCode}".`, 'success');
    }
    setIsFormOpen(false);
  };

  const handleDeactivate = (id: string) => {
    setClients(prev => 
      prev.map(c => c.id === id ? { 
        ...c, 
        status: c.status === 'Active' ? 'Suspended' : 'Active' 
      } : c)
    );
    showToast('Client compliance status successfully toggled.', 'success');
  };

  const handleViewDetails = (id: string) => {
    navigate(`/clients/${id}`);
  };

  const handleCloseDetails = () => {
    navigate('/clients');
  };

  // Filter clients
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.primaryContact.name.toLowerCase().includes(search.toLowerCase()) ||
      c.primaryContact.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    const matchesType = typeFilter ? c.type === typeFilter : true;
    const matchesService = serviceFilter ? (c.services && c.services.includes(serviceFilter)) : true;
    const matchesManager = managerFilter ? c.assignedManager === managerFilter : true;
    const matchesPortal = portalFilter ? c.portalStatus === portalFilter : true;

    return matchesSearch && matchesStatus && matchesType && matchesService && matchesManager && matchesPortal;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'recent') return b.id.localeCompare(a.id);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <ContentContainer>
      <SandboxBanner />
      
      <PageHeader
        title="Corporate Clients Directory"
        description="Review active corporate mandates, statutory details, and tax circles for FAMES & R."
        action={{
          label: 'Onboard Corporate Client',
          onClick: handleAddClient,
          icon: 'UserPlus',
        }}
      />

      {/* KPI Cards */}
      <ClientMetrics clients={clients} />

      {/* Filter and Search Section */}
      <ClientFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        managerFilter={managerFilter}
        onManagerFilterChange={setManagerFilter}
        portalFilter={portalFilter}
        onPortalFilterChange={setPortalFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onClearFilters={() => {
          setSearch('');
          setStatusFilter('');
          setTypeFilter('');
          setServiceFilter('');
          setManagerFilter('');
          setPortalFilter('');
          setSortBy('name');
        }}
      />

      {/* Master Data Table */}
      <ClientTable
        clients={filteredClients}
        onViewClient={handleViewDetails}
        onEditClient={handleEditClient}
        onPreparePortal={(client) => {
          showToast(`Portal invite configuration blueprint pre-filled for "${client.name}".`, 'info');
        }}
        onDeactivate={handleDeactivate}
        onArchive={(id) => {
          setClients(prev => prev.filter(c => c.id !== id));
          showToast('Client record successfully archived.', 'info');
        }}
      />

      {/* Form Add/Edit Modal */}
      <ClientFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingClient={editingClient}
        existingClients={clients}
      />

      {/* URL Linked Profile Drawer */}
      <ClientDetailsDrawer
        isOpen={!!clientId}
        clientId={clientId || null}
        onClose={handleCloseDetails}
        clients={clients}
      />

    </ContentContainer>
  );
};


// =========================================================
// VIEW 2: CLIENT REQUESTS TRIAGE (/clients/requests)
// =========================================================
export const ClientRequestsView: React.FC = () => {
  const { showToast } = useToast();

  const [requests, setRequests] = useState<ClientRequest[]>(() => {
    const saved = localStorage.getItem('fames_pro_requests');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_REQUESTS;
  });

  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('fames_pro_requests', JSON.stringify(requests));
  }, [requests]);

  const handleAskMoreInfo = (id: string) => {
    setRequests(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        status: 'Need More Info',
        lastUpdate: 'Just now',
        timeline: [
          { date: '2026-07-16', status: 'Information Requested', actor: 'Kabir Hasan', comment: 'CFO has been queried regarding VAT documents.' },
          ...(r.timeline || [])
        ]
      } : r)
    );
    showToast('Triage ticket updated: Information Requested.', 'success');
  };

  const handleApprove = (id: string) => {
    setRequests(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        status: 'Approved',
        lastUpdate: 'Just now',
        timeline: [
          { date: '2026-07-16', status: 'Mandate Approved', actor: 'A. R. Chowdhury, FCA', comment: 'Engagement verified and approved.' },
          ...(r.timeline || [])
        ]
      } : r)
    );
    showToast('Onboarding proposal successfully approved.', 'success');
  };

  const handleReject = (id: string) => {
    setRequests(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        status: 'Rejected',
        lastUpdate: 'Just now',
        timeline: [
          { date: '2026-07-16', status: 'Proposal Declined', actor: 'M. F. Ahmed, FCA', comment: 'Conflict of interest found during checks.' },
          ...(r.timeline || [])
        ]
      } : r)
    );
    showToast('Onboarding proposal declined.', 'info');
  };

  const handleConvertToClient = (req: ClientRequest) => {
    // 1. Mark request as converted
    setRequests(prev => 
      prev.map(r => r.id === req.id ? { 
        ...r, 
        status: 'Converted to Client', 
        lastUpdate: 'Just now' 
      } : r)
    );

    // 2. Insert record into client list
    const savedClients = localStorage.getItem('fames_pro_clients');
    const currentClients: Client[] = savedClients ? JSON.parse(savedClients) : INITIAL_MOCK_CLIENTS;

    const exists = currentClients.some(c => c.name.toLowerCase() === req.clientName.toLowerCase());
    if (exists) {
      showToast('A client with this name already exists in the directory.', 'info');
      return;
    }

    const cleanName = req.clientName.toUpperCase().replace(/[^A-Z]/g, '');
    const dynamicPrefix = cleanName.substring(0, 3) || 'PRP';
    const increment = (currentClients.length + 1).toString().padStart(2, '0');
    const generatedCode = `${dynamicPrefix}-${increment}`;

    const convertedClient: Client = {
      id: (currentClients.length + 1).toString(),
      code: generatedCode,
      name: req.clientName,
      tradingName: req.clientName,
      type: 'Private Limited Company',
      status: 'Active',
      financialYearEnd: '30 June',
      assignedPartner: 'A. R. Chowdhury, FCA',
      assignedManager: 'Kabir Hasan',
      portalStatus: 'Not Invited',
      services: req.requestedServices || [],
      portalRequired: true,
      primaryContact: {
        name: req.contactPerson,
        email: req.contactEmail,
        phone: req.contactPhone,
        preferredMethod: 'Email',
        designation: 'Managing Director'
      }
    };

    const updated = [...currentClients, convertedClient];
    localStorage.setItem('fames_pro_clients', JSON.stringify(updated));

    showToast(`Successfully registered "${req.clientName}" into the clients database.`, 'success');
  };

  const handleCreateRequest = (data: Omit<ClientRequest, 'id' | 'submittedDate' | 'lastUpdate' | 'timeline'>) => {
    const idNum = requests.length + 1;
    const newReq: ClientRequest = {
      id: `REQ-${idNum.toString().padStart(3, '0')}`,
      submittedDate: '2026-07-16',
      lastUpdate: 'Just now',
      timeline: [
        { date: '2026-07-16', status: 'Submitted online', actor: data.submittedBy, comment: 'Initial requirements recorded.' }
      ],
      ...data,
    };

    setRequests(prev => [newReq, ...prev]);
    setIsFormOpen(false);
    showToast('Triage ticket submitted successfully.', 'success');
  };

  return (
    <ContentContainer>
      <SandboxBanner />
      
      <PageHeader
        title="Onboarding & Triage Desk"
        description="Triage prospect requests, perform conflict checks, and transition proposals into client master profiles."
        action={{
          label: 'File Inbound Proposal',
          onClick: () => setIsFormOpen(true),
          icon: 'Plus',
        }}
      />

      <div className="space-y-6">
        <ClientRequestTable
          requests={requests}
          onViewRequest={setSelectedRequest}
          onReview={setSelectedRequest}
          onAskMoreInfo={handleAskMoreInfo}
          onApprove={handleApprove}
          onReject={handleReject}
          onConvertToClient={handleConvertToClient}
        />
      </div>

      <ClientRequestDetails
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        onAskMoreInfo={handleAskMoreInfo}
        onApprove={handleApprove}
        onReject={handleReject}
        onConvertToClient={handleConvertToClient}
      />

      <ClientRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </ContentContainer>
  );
};


// =========================================================
// VIEW 3: PORTAL ACCESS CONTROLLER (/clients/portal-access)
// =========================================================
export const PortalAccessView: React.FC = () => {
  const { showToast } = useToast();

  const [records, setRecords] = useState<PortalAccessRecord[]>(() => {
    const saved = localStorage.getItem('fames_pro_portal_records');
    return saved ? JSON.parse(saved) : INITIAL_PORTAL_RECORDS;
  });

  const [clients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('fames_pro_clients');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CLIENTS;
  });

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [targetClient, setTargetClient] = useState<Client | null>(null);
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<PortalAccessRecord | null>(null);

  useEffect(() => {
    localStorage.setItem('fames_pro_portal_records', JSON.stringify(records));
  }, [records]);

  const handleResendPreview = (_id: string) => {
    showToast('Invitation dispatch preview prepared. Email client to verify link.', 'success');
  };

  const handleChangeRolePreview = (_id: string) => {
    showToast('Local security role reassigned.', 'success');
  };

  const handleSuspend = (id: string) => {
    setRecords(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        accessStatus: 'Suspended',
        invitationStatus: 'Suspended'
      } : r)
    );
    showToast('Secure portal credentials suspended.', 'info');
  };

  const handleRestore = (id: string) => {
    setRecords(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        accessStatus: 'Active',
        invitationStatus: 'Active'
      } : r)
    );
    showToast('Secure portal credentials restored.', 'success');
  };

  const handleRevoke = (id: string) => {
    setRecords(prev => 
      prev.map(r => r.id === id ? { 
        ...r, 
        accessStatus: 'Revoked',
        invitationStatus: 'Revoked'
      } : r)
    );
    showToast('Portal credential revocation completed.', 'error');
  };

  const handlePrepareInvitation = (draft: any) => {
    const clientObj = clients.find(c => c.id === draft.clientId);
    if (!clientObj) return;

    const newRecord: PortalAccessRecord = {
      id: (records.length + 1).toString(),
      clientId: draft.clientId,
      clientName: clientObj.name,
      portalUser: draft.contactName,
      email: draft.email,
      role: draft.role,
      invitationStatus: 'Invitation Prepared',
      accessStatus: 'Active',
      lastLogin: 'Never Authenticated',
      assignedBy: 'Kabir Hasan',
      accessScope: draft.accessScope,
    };

    setRecords(prev => [newRecord, ...prev]);
    setIsInviteModalOpen(false);

    // Update portal status in client directory list
    const updatedClients = clients.map(c => c.id === draft.clientId ? { ...c, portalStatus: 'Prepared' as const } : c);
    localStorage.setItem('fames_pro_clients', JSON.stringify(updatedClients));

    showToast(`Access config blueprint logged for "${clientObj.name}". Link prepared.`, 'success');
  };

  return (
    <ContentContainer>
      <SandboxBanner />
      
      <PageHeader
        title="Portal Configurations"
        description="Audit external portal authorization scopes, manage security roles, and revoke client credentials."
        action={{
          label: 'Setup Portal Access',
          onClick: () => {
            setTargetClient(null);
            setIsInviteModalOpen(true);
          },
          icon: 'Key',
        }}
      />

      <div className="space-y-6">
        <PortalAccessTable
          records={records}
          onPrepareInvitation={(client) => {
            setTargetClient(client);
            setIsInviteModalOpen(true);
          }}
          onResendPreview={handleResendPreview}
          onChangeRolePreview={handleChangeRolePreview}
          onSuspendPreview={handleSuspend}
          onRestorePreview={handleRestore}
          onRevokePreview={handleRevoke}
          onViewAccessHistory={setSelectedHistoryRecord}
        />
      </div>

      <PortalInvitationModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handlePrepareInvitation}
        clients={clients}
        initialClient={targetClient}
      />

      {/* History Log Modal */}
      {selectedHistoryRecord && (
        <Modal 
          isOpen={!!selectedHistoryRecord} 
          onClose={() => setSelectedHistoryRecord(null)}
          title={`Access Logs: ${selectedHistoryRecord.clientName}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-lg">
              <div className="font-semibold text-slate-800">User: {selectedHistoryRecord.portalUser}</div>
              <div className="font-mono text-slate-500 mt-0.5">{selectedHistoryRecord.email}</div>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-800">Assigned Scopes</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(selectedHistoryRecord.accessScope || ['Own Documents', 'Communications']).map(scope => (
                  <span key={scope} className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {scope}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-800">Security Audit Logs</h4>
              <div className="space-y-2 pl-3 border-l-2 border-slate-200">
                <div className="text-[11px]">
                  <span className="font-mono text-slate-400">2026-07-15 09:20 UTC • </span>
                  <span className="font-semibold text-slate-700">Login Session Succeeded</span>
                  <p className="text-slate-500 font-medium text-[10px]">OS: Windows 11 • IP: 103.88.22.1</p>
                </div>
                <div className="text-[11px]">
                  <span className="font-mono text-slate-400">2026-07-12 14:15 UTC • </span>
                  <span className="font-semibold text-slate-700">Document Uploaded: Trial Balance.xlsx</span>
                  <p className="text-slate-500 font-medium text-[10px]">Category: Audit Vault</p>
                </div>
                <div className="text-[11px]">
                  <span className="font-mono text-slate-400">2026-07-08 11:05 UTC • </span>
                  <span className="font-semibold text-slate-700">Credential Invitation Dispatched</span>
                  <p className="text-slate-500 font-medium text-[10px]">Actor: Kabir Hasan</p>
                </div>
              </div>
            </div>

            <div className="text-right pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedHistoryRecord(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold"
              >
                Close Audit Logs
              </button>
            </div>
          </div>
        </Modal>
      )}

    </ContentContainer>
  );
};


// =========================================================
// VIEW 4: COMMUNICATIONS BRIDGE (/clients/communications)
// =========================================================
export const ClientCommunicationsView: React.FC = () => {
  const { showToast } = useToast();

  const [clients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('fames_pro_clients');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CLIENTS;
  });

  const [comms, setComms] = useState<ClientCommunication[]>(() => {
    const saved = localStorage.getItem('fames_pro_comms');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNICATIONS;
  });

  const [followUps, setFollowUps] = useState<ClientFollowUp[]>(() => {
    const saved = localStorage.getItem('fames_pro_follow_ups');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOW_UPS;
  });

  const [activeTab, setActiveTab] = useState<'threads' | 'logs'>('threads');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [selectedComm, setSelectedComm] = useState<ClientCommunication | null>(null);

  useEffect(() => {
    localStorage.setItem('fames_pro_comms', JSON.stringify(comms));
  }, [comms]);

  useEffect(() => {
    localStorage.setItem('fames_pro_follow_ups', JSON.stringify(followUps));
  }, [followUps]);

  const handleLogCommunication = (data: Omit<ClientCommunication, 'id' | 'date'>) => {
    const newId = (comms.length + 1).toString();
    const newComm: ClientCommunication = {
      id: newId,
      date: '2026-07-16',
      ...data,
    };

    setComms(prev => [newComm, ...prev]);
    setIsLogOpen(false);
    showToast('Secure communication correspondence logged locally.', 'success');

    // Register a follow-up automatically if checked
    if (data.followUpRequired && data.followUpDate) {
      const followUpId = (followUps.length + 1).toString();
      const newFollowUp: ClientFollowUp = {
        id: followUpId,
        clientId: data.clientId,
        priority: 'Normal',
        clientName: data.clientName,
        task: `Chase down outcome: "${data.subject}"`,
        dueDate: data.followUpDate,
        assignedStaff: data.owner,
        status: 'Pending',
      };
      setFollowUps(prev => [newFollowUp, ...prev]);
    }
  };

  const handleSendMessage = (clientId: string, subject: string, body: string) => {
    const clientObj = clients.find(c => c.id === clientId);
    if (!clientObj) return;

    const newComm: ClientCommunication = {
      id: (comms.length + 1).toString(),
      date: '2026-07-16',
      clientId,
      clientName: clientObj.name,
      contactPerson: clientObj.primaryContact.name,
      type: 'Portal Message',
      subject,
      summary: body,
      owner: 'Kabir Hasan',
      followUpRequired: false,
      status: 'Completed',
    };

    setComms(prev => [newComm, ...prev]);
    showToast('Secure Portal Message dispatched instantly.', 'success');
  };

  const handleMarkFollowUpDone = (id: string) => {
    setFollowUps(prev => prev.filter(f => f.id !== id));
    showToast('Remediation follow-up task marked completed.', 'success');
  };

  const handleMarkCommFollowUpDone = (commId: string) => {
    setComms(prev => 
      prev.map(c => c.id === commId ? { ...c, status: 'Completed' } : c)
    );
    showToast('Communication timeline marked completed.', 'success');
  };

  return (
    <ContentContainer>
      <SandboxBanner />
      
      <PageHeader
        title="Client Correspondence Desk"
        description="Run secure communication bridges, log meeting minutes, and monitor follow-up alerts."
        action={{
          label: 'Log Correspondence',
          onClick: () => setIsLogOpen(true),
          icon: 'Plus',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Communication Panel Area */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Sub Tab selection */}
          <div className="flex border-b border-slate-150 bg-white p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('threads')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'threads' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Split-Pane Chat Thread
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'logs' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Unified Audit Logs List
            </button>
          </div>

          {activeTab === 'threads' ? (
            <ConversationPanel
              comms={comms}
              clients={clients}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <CommunicationTable
              comms={comms}
              onViewDetails={setSelectedComm}
              onMarkCompleted={handleMarkCommFollowUpDone}
              onAddFollowUp={(_id, _name) => {
                showToast('Log a new follow-up using the Follow-up Tracker.', 'info');
              }}
            />
          )}

        </div>

        {/* Right Sidebar - Follow-up Task Tracker */}
        <div>
          <FollowUpPanel
            followUps={followUps}
            onMarkCompleted={handleMarkFollowUpDone}
            onAddFollowUpClick={() => setIsLogOpen(true)}
          />
        </div>

      </div>

      <CommunicationLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        onSubmit={handleLogCommunication}
        clients={clients}
      />

      {/* Details Viewer Modal */}
      {selectedComm && (
        <Modal
          isOpen={!!selectedComm}
          onClose={() => setSelectedComm(null)}
          title={`Correspondence Details: ${selectedComm.id}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Client Corporate</span>
                  <strong className="text-sm font-bold text-slate-800">{selectedComm.clientName}</strong>
                </div>
                <StatusBadge status={selectedComm.status} type={selectedComm.status === 'Completed' ? 'success' : 'warning'} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] pt-1.5 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 block">Contact Representative</span>
                  <span className="font-semibold text-slate-700">{selectedComm.contactPerson}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date Processed</span>
                  <span className="font-mono font-semibold text-slate-700">{selectedComm.date}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-800">Subject</h4>
              <p className="font-semibold text-slate-800 bg-slate-50/50 p-2.5 rounded border border-slate-100">{selectedComm.subject}</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-800">Details / Summary Minutes</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-150">
                {selectedComm.summary}
              </p>
            </div>

            {selectedComm.outcome && (
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Outcome Agreed</h4>
                <p className="text-[11px] text-slate-600 font-medium italic">"{selectedComm.outcome}"</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 flex-wrap gap-2">
              <div className="text-slate-500">Owner: <strong className="text-slate-700">{selectedComm.owner}</strong></div>
              <button
                onClick={() => setSelectedComm(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </Modal>
      )}

    </ContentContainer>
  );
};
