import React, { useState, useEffect } from 'react';
import { PortalAccessRecord, Client, PortalInvitationDraft } from '../../../types/clients';
import { StatusBadge, Modal } from '../../../components/ui';
import { 
  Key, 
  Send, 
  ShieldX, 
  Settings, 
  AlertTriangle,
  History,
  Unlock
} from 'lucide-react';

// =========================================================
// 1. PORTAL ACCESS TABLE
// =========================================================
interface PortalAccessTableProps {
  records: PortalAccessRecord[];
  onPrepareInvitation?: (client: Client) => void;
  onResendPreview: (recordId: string) => void;
  onChangeRolePreview: (recordId: string) => void;
  onSuspendPreview: (recordId: string) => void;
  onRestorePreview: (recordId: string) => void;
  onRevokePreview: (recordId: string) => void;
  onViewAccessHistory: (record: PortalAccessRecord) => void;
}

export const PortalAccessTable: React.FC<PortalAccessTableProps> = ({
  records,
  onPrepareInvitation: _onPrepareInvitation,
  onResendPreview,
  onChangeRolePreview,
  onSuspendPreview,
  onRestorePreview,
  onRevokePreview,
  onViewAccessHistory,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getInviteStatusBadgeType = (status: PortalAccessRecord['invitationStatus']): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending Acceptance':
      case 'Invitation Prepared':
        return 'warning';
      case 'Suspended':
      case 'Revoked':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getAccessStatusBadgeType = (status: PortalAccessRecord['accessStatus']): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Suspended':
        return 'warning';
      case 'Revoked':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-2xs" id="portal-access-table-container">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="portal-access-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3.5">Client Organization</th>
              <th className="px-6 py-3.5">Portal User</th>
              <th className="px-6 py-3.5">Email</th>
              <th className="px-6 py-3.5">Assigned Role</th>
              <th className="px-6 py-3.5">Invitation Status</th>
              <th className="px-6 py-3.5">Access Status</th>
              <th className="px-6 py-3.5">Last Login Session</th>
              <th className="px-6 py-3.5">Configured By</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {records.map((rec) => (
              <tr key={rec.id} id={`portal-row-${rec.id}`} className="hover:bg-slate-50/40 transition-colors">
                {/* Client */}
                <td className="px-6 py-4 font-semibold text-slate-850">
                  {rec.clientName}
                </td>

                {/* Portal User */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{rec.portalUser}</div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                  {rec.email}
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <Key className="w-3 h-3 text-slate-400" />
                    <span>{rec.role}</span>
                  </span>
                </td>

                {/* Invitation Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={rec.invitationStatus} type={getInviteStatusBadgeType(rec.invitationStatus)} />
                </td>

                {/* Access Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={rec.accessStatus} type={getAccessStatusBadgeType(rec.accessStatus)} />
                </td>

                {/* Last Login */}
                <td className="px-6 py-4 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                  {rec.lastLogin || <span className="text-slate-300">Never Authenticated</span>}
                </td>

                {/* Assigned By */}
                <td className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                  {rec.assignedBy}
                </td>

                {/* Actions Button / Dropdown */}
                <td className="px-6 py-4 text-right whitespace-nowrap relative">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewAccessHistory(rec)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                      title="View Access History"
                    >
                      <History className="w-4 h-4" />
                    </button>

                    <div className="relative inline-block">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === rec.id ? null : rec.id)}
                        className="p-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer flex items-center gap-0.5 text-[10px] font-semibold"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>

                      {activeMenuId === rec.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg border border-slate-150 shadow-md py-1.5 z-20 text-left">
                            <button
                              onClick={() => {
                                onResendPreview(rec.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <Send className="w-3.5 h-3.5 text-slate-400" />
                              <span>Resend Invite Draft</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                onChangeRolePreview(rec.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <Key className="w-3.5 h-3.5 text-slate-400" />
                              <span>Change Role Access</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            {rec.accessStatus === 'Active' ? (
                              <button
                                onClick={() => {
                                  onSuspendPreview(rec.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-amber-600 hover:bg-amber-50 flex items-center gap-2 cursor-pointer font-semibold text-xs"
                              >
                                <ShieldX className="w-3.5 h-3.5" />
                                <span>Suspend Access</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onRestorePreview(rec.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer font-semibold text-xs"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                                <span>Restore Access</span>
                              </button>
                            )}

                            <button
                              onClick={() => {
                                onRevokePreview(rec.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-semibold text-xs"
                            >
                              <ShieldX className="w-3.5 h-3.5" />
                              <span>Revoke Access</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// =========================================================
// 2. PORTAL INVITATION MODAL
// =========================================================
interface PortalInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (draft: PortalInvitationDraft) => void;
  clients: Client[];
  initialClient?: Client | null;
}

export const PortalInvitationModal: React.FC<PortalInvitationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  clients,
  initialClient,
}) => {
  const [selectedClientId, setSelectedClientId] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Client Admin');
  const [expiry, setExpiry] = useState('Never Expires');
  const [invitationNote, setInvitationNote] = useState('');
  const [scopes, setScopes] = useState<string[]>(['Own Documents', 'Requests', 'Communications']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableScopes = [
    'Own Documents',
    'Requests',
    'Communications',
    'Engagement Status',
    'Compliance Status',
    'Billing Summary placeholder'
  ];

  // Load selected client data
  useEffect(() => {
    if (initialClient) {
      setSelectedClientId(initialClient.id);
      setContactName(initialClient.primaryContact.name);
      setEmail(initialClient.primaryContact.email);
    } else {
      setSelectedClientId('');
      setContactName('');
      setEmail('');
    }
    setErrors({});
  }, [initialClient, isOpen]);

  const handleClientSelectionChange = (clientId: string) => {
    setSelectedClientId(clientId);
    const clientObj = clients.find(c => c.id === clientId);
    if (clientObj) {
      setContactName(clientObj.primaryContact.name);
      setEmail(clientObj.primaryContact.email);
    } else {
      setContactName('');
      setEmail('');
    }
  };

  const handleScopeToggle = (scopeName: string) => {
    setScopes(prev => 
      prev.includes(scopeName)
        ? prev.filter(s => s !== scopeName)
        : [...prev, scopeName]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!selectedClientId) errs.client = 'Please select a registered client organization';
    if (!contactName.trim()) errs.contactName = 'Representative contact name is required';
    if (!email.trim()) {
      errs.email = 'Representative email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Provide a valid email format';
    }
    if (scopes.length === 0) errs.scopes = 'At least one security access scope must be checked';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      clientId: selectedClientId,
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      role,
      accessScope: scopes,
      invitationNote: invitationNote.trim() || undefined,
    });

    // Reset Form
    setSelectedClientId('');
    setContactName('');
    setEmail('');
    setRole('Client Admin');
    setScopes(['Own Documents', 'Requests', 'Communications']);
    setInvitationNote('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prepare Secure Client Portal Access">
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-slate-700" id="portal-invite-form">
        
        {/* Notice of simulation */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2.5">
          <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-950 text-xs">Access Invitation Blueprint Preview</span>
            <p className="text-[10px] text-amber-700 leading-relaxed">
              No real invitation email is dispatched to the client, nor are security keys generated. This interface tracks portal credential status logs locally.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Client */}
          <div className="space-y-1.5 col-span-2">
            <label className="font-semibold block">Select Client Organization <span className="text-rose-500">*</span></label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
              value={selectedClientId}
              onChange={(e) => handleClientSelectionChange(e.target.value)}
              disabled={!!initialClient}
            >
              <option value="">-- Choose Corporate Client --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
            {errors.client && <span className="text-rose-600 font-semibold block text-[10px]">{errors.client}</span>}
          </div>

          {/* Contact Details */}
          <div className="space-y-1">
            <label className="font-semibold block">Contact Representative Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg"
              placeholder="Prefilled Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            {errors.contactName && <span className="text-rose-600 block text-[10px]">{errors.contactName}</span>}
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Representative Business Email <span className="text-rose-500">*</span></label>
            <input
              type="email"
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg"
              placeholder="Prefilled Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-rose-600 block text-[10px]">{errors.email}</span>}
          </div>

          {/* Role and Expiry */}
          <div className="space-y-1">
            <label className="font-semibold block">Assigned Security Role</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Client Admin">Client Admin (Full Management)</option>
              <option value="Finance Contact">Finance Contact (Billing & Taxes)</option>
              <option value="Document Contributor">Document Contributor (Uploads)</option>
              <option value="Read Only">Read Only (Review Schedules)</option>
              <option value="Management Contact">Management Contact (Signoffs)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Credential Expiry Period</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            >
              <option value="Never Expires">Never Expires (Corporate standard)</option>
              <option value="Expires in 30 days">Expires in 30 days</option>
              <option value="Expires in 90 days">Expires in 90 days</option>
              <option value="One-time login session">One-time login session</option>
            </select>
          </div>

          {/* Scope selection checkbox */}
          <div className="space-y-1.5 col-span-2">
            <label className="font-bold text-slate-800 block">Configure Portal Access Scopes <span className="text-rose-500">*</span></label>
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              {availableScopes.map(scope => {
                const isChecked = scopes.includes(scope);
                return (
                  <label 
                    key={scope} 
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors bg-white border ${
                      isChecked ? 'border-slate-800 text-slate-850 font-bold' : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleScopeToggle(scope)}
                      className="rounded-sm border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                    />
                    <span className="text-[10px]">{scope}</span>
                  </label>
                );
              })}
            </div>
            {errors.scopes && <span className="text-rose-600 font-semibold block text-[10px]">{errors.scopes}</span>}
          </div>

          {/* Note */}
          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Email / Invitation Invitation Note (Optional)</label>
            <textarea
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg h-20"
              placeholder="Add a personalized secure note containing special instructions for tax uploads or document delivery dates..."
              value={invitationNote}
              onChange={(e) => setInvitationNote(e.target.value)}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-150">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-600 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Preview & Log Invitation</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
