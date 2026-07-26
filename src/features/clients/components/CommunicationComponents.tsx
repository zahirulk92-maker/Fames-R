import React, { useState, useEffect } from 'react';
import { ClientCommunication, ClientFollowUp, Client } from '../../../types/clients';
import { StatusBadge, Modal } from '../../../components/ui';
import { 
  Mail, 
  Phone, 
  Users, 
  MessageSquare, 
  FileText, 
  Bookmark, 
  Clock, 
  Plus, 
  Search, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

// Helpers to render corresponding communication type icons
export const getCommTypeIcon = (type: ClientCommunication['type']) => {
  switch (type) {
    case 'Email':
      return <Mail className="w-3.5 h-3.5 text-blue-500" />;
    case 'Phone Call':
      return <Phone className="w-3.5 h-3.5 text-emerald-500" />;
    case 'Meeting':
      return <Users className="w-3.5 h-3.5 text-indigo-500" />;
    case 'WhatsApp':
      return <MessageSquare className="w-3.5 h-3.5 text-teal-500" />;
    case 'Letter':
      return <FileText className="w-3.5 h-3.5 text-amber-500" />;
    case 'Portal Message':
      return <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />;
    default: // Internal Note
      return <Bookmark className="w-3.5 h-3.5 text-rose-500" />;
  }
};

// =========================================================
// 1. COMMUNICATIONS TABLE VIEW
// =========================================================
interface CommunicationTableProps {
  comms: ClientCommunication[];
  onViewDetails: (comm: ClientCommunication) => void;
  onAddFollowUp?: (clientId: string, clientName: string) => void;
  onMarkCompleted: (recordId: string) => void;
}

export const CommunicationTable: React.FC<CommunicationTableProps> = ({
  comms,
  onViewDetails,
  onAddFollowUp: _onAddFollowUp,
  onMarkCompleted,
}) => {
  const getStatusType = (s: ClientCommunication['status']): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (s) {
      case 'Completed':
        return 'success';
      case 'Follow-up Required':
      case 'Waiting for Client':
        return 'warning';
      case 'Overdue':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-2xs" id="comm-table-container">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="comms-master-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Contact Person</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Subject</th>
              <th className="px-5 py-3">Owner / Staff</th>
              <th className="px-5 py-3">Follow-up Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {comms.map((c) => (
              <tr 
                key={c.id} 
                id={`comm-row-${c.id}`}
                className={`hover:bg-slate-50/40 transition-colors ${c.isInternalNote ? 'bg-rose-50/10' : ''}`}
              >
                {/* Date */}
                <td className="px-5 py-4 font-mono font-medium text-slate-500 whitespace-nowrap">
                  {c.date}
                </td>

                {/* Client */}
                <td className="px-5 py-4 font-bold text-slate-850">
                  {c.clientName}
                </td>

                {/* Contact Person */}
                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">
                  {c.contactPerson}
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {getCommTypeIcon(c.type)}
                    <span className="font-semibold text-slate-700 text-[11px]">{c.type}</span>
                  </div>
                </td>

                {/* Subject */}
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-800 line-clamp-1 max-w-xs">{c.subject}</div>
                  {c.isInternalNote && (
                    <span className="text-[8px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1 py-0.5 rounded-sm uppercase tracking-wider">
                      Internal Note
                    </span>
                  )}
                </td>

                {/* Owner */}
                <td className="px-5 py-4 font-medium text-slate-600">
                  {c.owner}
                </td>

                {/* Follow up date */}
                <td className="px-5 py-4 font-mono font-bold text-slate-500 whitespace-nowrap">
                  {c.followUpDate || <span className="text-slate-300">—</span>}
                </td>

                {/* Status */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <StatusBadge status={c.status} type={getStatusType(c.status)} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewDetails(c)}
                      className="px-2 py-1 text-[10px] border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-bold rounded-md cursor-pointer"
                    >
                      View Details
                    </button>
                    {c.status !== 'Completed' && c.followUpRequired && (
                      <button
                        onClick={() => onMarkCompleted(c.id)}
                        className="px-2 py-1 text-[10px] border border-emerald-200 text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 font-bold rounded-md cursor-pointer"
                      >
                        Complete
                      </button>
                    )}
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
// 2. LOG COMMUNICATIONS MODAL
// =========================================================
interface CommunicationLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Omit<ClientCommunication, 'id' | 'date'>) => void;
  clients: Client[];
}

export const CommunicationLogModal: React.FC<CommunicationLogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  clients,
}) => {
  const [selectedClientId, setSelectedClientId] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [type, setType] = useState<ClientCommunication['type']>('Email');
  const [subject, setSubject] = useState('');
  const [summary, setSummary] = useState('');
  const [outcome, setOutcome] = useState('');
  const [owner, setOwner] = useState('Kabir Hasan');
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setSelectedClientId('');
      setContactPerson('');
      setType('Email');
      setSubject('');
      setSummary('');
      setOutcome('');
      setFollowUpRequired(false);
      setFollowUpDate('');
      setIsInternalNote(false);
      setErrors({});
    }
  }, [isOpen]);

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setContactPerson(client.primaryContact.name);
    } else {
      setContactPerson('');
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!selectedClientId && !isInternalNote) errs.client = 'Select a client organization';
    if (!contactPerson.trim() && !isInternalNote) errs.contactPerson = 'Contact Person is required';
    if (!subject.trim()) errs.subject = 'Subject is required';
    if (!summary.trim()) errs.summary = 'Summary / Log Details is required';
    if (followUpRequired && !followUpDate) errs.followUpDate = 'Specify a follow-up deadline date';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const clientObj = clients.find(c => c.id === selectedClientId);

    onSubmit({
      clientId: selectedClientId || 'internal',
      clientName: clientObj ? clientObj.name : 'Internal Team Only',
      contactPerson: isInternalNote ? 'Internal Team Only' : contactPerson.trim(),
      type,
      subject: subject.trim(),
      summary: summary.trim(),
      outcome: outcome.trim() || undefined,
      owner,
      followUpRequired,
      followUpDate: followUpRequired ? followUpDate : undefined,
      status: followUpRequired ? 'Follow-up Required' : 'Completed',
      isInternalNote,
      attachmentPlaceholder: 'Sample_Attached_Doc_Placeholder.pdf',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Secure Client Communication">
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-slate-700" id="log-comm-form">
        
        {/* Notice of file storage placeholder */}
        <div className="bg-slate-50 border border-slate-150 p-3 rounded-lg flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800">Local Engagement Registry</span>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Demo attachment selected; no actual file storage is configured. Entered parameters will be recorded locally inside your browser's memory.
            </p>
          </div>
        </div>

        {/* Check internal note checkbox */}
        <div className="flex items-center gap-2 p-2 bg-rose-50/50 border border-rose-150 rounded-lg">
          <input
            type="checkbox"
            checked={isInternalNote}
            onChange={(e) => {
              setIsInternalNote(e.target.checked);
              if (e.target.checked) {
                setType('Internal Note');
              } else {
                setType('Email');
              }
            }}
            className="rounded-sm border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
          />
          <div className="space-y-0.5">
            <span className="font-bold text-rose-800">This is an internal-only team note</span>
            <p className="text-[10px] text-rose-600">
              Check this if the correspondence is an internal briefing, review query, or draft memo, and should not be displayed in external portal views.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Select Client */}
          {!isInternalNote && (
            <div className="space-y-1 col-span-2">
              <label className="font-semibold block">Select Client Organization <span className="text-rose-500">*</span></label>
              <select
                className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
                value={selectedClientId}
                onChange={(e) => handleClientChange(e.target.value)}
              >
                <option value="">-- Choose Corporate Client --</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                ))}
              </select>
              {errors.client && <span className="text-rose-600 font-semibold block text-[10px]">{errors.client}</span>}
            </div>
          )}

          {/* Contact Representative */}
          {!isInternalNote && (
            <div className="space-y-1">
              <label className="font-semibold block">Contact Representative Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                className="w-full p-2.5 border border-slate-200 bg-white rounded-lg"
                placeholder="Tanvir Hossain"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
              {errors.contactPerson && <span className="text-rose-600 font-semibold block text-[10px]">{errors.contactPerson}</span>}
            </div>
          )}

          {/* Comm Type */}
          <div className="space-y-1">
            <label className="font-semibold block">Communication Channel Type</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value as ClientCommunication['type'])}
              disabled={isInternalNote}
            >
              <option value="Email">Email Message</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Meeting">In-Person Meeting</option>
              <option value="WhatsApp">WhatsApp Conversation</option>
              <option value="Letter">Formal Printed Letter</option>
              <option value="Portal Message">Portal Inbox Message</option>
              <option value="Internal Note">Internal Team Briefing Note</option>
            </select>
          </div>

          {/* Subject */}
          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Subject line / Brief Heading <span className="text-rose-500">*</span></label>
            <input
              type="text"
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg"
              placeholder="e.g. Discussed VAT Circle 11 physical verification sheets"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {errors.subject && <span className="text-rose-600 font-semibold block text-[10px]">{errors.subject}</span>}
          </div>

          {/* Summary Details */}
          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Summary of discussion & Key minutes <span className="text-rose-500">*</span></label>
            <textarea
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg h-20"
              placeholder="Write the central points discussed, outstanding action items, or document requests..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            {errors.summary && <span className="text-rose-600 font-semibold block text-[10px]">{errors.summary}</span>}
          </div>

          {/* Outcome */}
          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Outcome / Agreed Next Step (Optional)</label>
            <input
              type="text"
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg"
              placeholder="e.g. Client CFO agreed to provide trial ledger by Monday morning"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
          </div>

          {/* Responsible Person */}
          <div className="space-y-1">
            <label className="font-semibold block">Responsible Staff Member</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg cursor-pointer"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="Kabir Hasan">Kabir Hasan (Manager)</option>
              <option value="Tahmid Rahman">Tahmid Rahman (Student)</option>
              <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA (Partner)</option>
              <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA (Partner)</option>
              <option value="S. K. Nandy, FCA">S. K. Nandy, FCA (Partner)</option>
            </select>
          </div>

          {/* Follow-up Checkbox */}
          <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-150 col-span-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={followUpRequired}
                onChange={(e) => setFollowUpRequired(e.target.checked)}
                className="rounded-sm cursor-pointer"
              />
              <span>Is follow-up action required?</span>
            </label>

            {followUpRequired && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200 mt-2">
                <div className="space-y-1">
                  <label className="font-semibold block">Follow-up Deadline Date <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    className="w-full p-2 border border-slate-200 bg-white text-slate-700 rounded-md"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                  {errors.followUpDate && <span className="text-rose-600 font-semibold block text-[10px]">{errors.scopes}</span>}
                </div>
                <div className="text-[10px] text-slate-400 mt-5">
                  This task will automatically register on the firm's follow-up tracker panel to prompt timely client chase downs.
                </div>
              </div>
            )}
          </div>

        </div>

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
            <Plus className="w-4 h-4" />
            <span>Log Correspondence</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};


// =========================================================
// 3. CONVERSATION VIEW (SPLIT-PANE CONVERSATIONS)
// =========================================================
interface ConversationPanelProps {
  comms: ClientCommunication[];
  clients: Client[];
  onSendMessage: (clientId: string, subject: string, body: string) => void;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  comms,
  clients,
  onSendMessage,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>('1');
  const [typedMessage, setTypedMessage] = useState('');
  const [typedSubject, setTypedSubject] = useState('Portal Correspondence Reconnect');
  const [convoSearch, setConvoSearch] = useState('');

  // Extract communications matched with selected client
  const clientCommunications = comms.filter(c => c.clientId === selectedClientId);

  // Search within selected conversation
  const searchedCommunications = clientCommunications.filter(c => 
    !convoSearch ||
    c.subject.toLowerCase().includes(convoSearch.toLowerCase()) ||
    c.summary.toLowerCase().includes(convoSearch.toLowerCase())
  );

  const selectedClientObj = clients.find(c => c.id === selectedClientId) || clients[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !typedSubject.trim()) return;

    onSendMessage(selectedClientId, typedSubject.trim(), typedMessage.trim());
    setTypedMessage('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-2xs h-[550px] flex" id="conversation-split-panel">
      
      {/* Left Pane - Clients list */}
      <div className="w-1/3 border-r border-slate-150 flex flex-col h-full bg-slate-50/50">
        <div className="p-3.5 border-b border-slate-150 bg-slate-50">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Corporate Client Channels</span>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Quick jump client..."
              className="w-full pl-8 pr-3 py-1.5 text-[11px] border border-slate-200 rounded-md bg-white focus:outline-hidden"
              // Internal filter of left client list if helpful, simple prefilled list for now
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {clients.map(c => {
            const isSelected = c.id === selectedClientId;
            const clientCommsCount = comms.filter(m => m.clientId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedClientId(c.id);
                  setTypedSubject(`Regarding ${c.name} - Audit Update`);
                }}
                className={`w-full p-4 text-left transition-colors cursor-pointer block ${
                  isSelected ? 'bg-white border-l-4 border-slate-800' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <strong className="text-xs text-slate-800 block truncate max-w-[140px]">{c.name}</strong>
                  <span className="text-[9px] font-mono font-bold text-slate-400 shrink-0">{c.code}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-medium">
                  <span>{c.primaryContact.name}</span>
                  <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-slate-500 shrink-0">
                    {clientCommsCount} entries
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane - Chat feeds */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {selectedClientObj ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-850 text-xs">{selectedClientObj.name}</h4>
                <div className="flex gap-2 text-[10px] text-slate-400 font-medium">
                  <span>Primary: <strong>{selectedClientObj.primaryContact.name}</strong></span>
                  <span>•</span>
                  <span>Preferred: <strong className="text-slate-600">{selectedClientObj.primaryContact.preferredMethod}</strong></span>
                </div>
              </div>

              {/* Chat Thread Search */}
              <div className="relative w-44">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-400">
                  <Search className="w-3 h-3" />
                </span>
                <input
                  type="text"
                  placeholder="Filter messages..."
                  className="w-full pl-7 pr-2.5 py-1 text-[10px] border border-slate-200 rounded-md"
                  value={convoSearch}
                  onChange={(e) => setConvoSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Conversation Timeline Stream */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/20">
              {searchedCommunications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <MessageSquare className="w-8 h-8 text-slate-350 mb-2" />
                  <p className="text-xs font-semibold">No secure message entries found</p>
                  <p className="text-[10px] text-slate-400 max-w-xs mt-0.5">
                    Start of secure chat bridge. Select another client or dispatch a message below.
                  </p>
                </div>
              ) : (
                searchedCommunications.map((msg) => (
                  <div 
                    key={msg.id} 
                    id={`message-bubble-${msg.id}`}
                    className={`p-4 rounded-xl max-w-lg border ${
                      msg.isInternalNote 
                        ? 'ml-auto bg-rose-50/40 border-rose-250 shadow-2xs' 
                        : 'mr-auto bg-white border-slate-150 shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1 flex-wrap gap-2 font-medium">
                      <span className="font-bold text-slate-600">{msg.owner}</span>
                      <span>{msg.date}</span>
                    </div>

                    <h5 className="font-bold text-slate-850 text-xs mb-1.5">{msg.subject}</h5>
                    <p className="text-slate-700 leading-relaxed text-[11px] font-medium">{msg.summary}</p>
                    
                    {msg.outcome && (
                      <p className="text-[10px] text-slate-500 italic mt-1.5 border-t border-slate-100 pt-1">
                        Agreed Outcome: "{msg.outcome}"
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-slate-600 font-mono">
                        {getCommTypeIcon(msg.type)}
                        <span className="font-bold">{msg.type}</span>
                      </div>
                      
                      {msg.followUpRequired && (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          <span>Chase {msg.followUpDate}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Reply Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-150 bg-white flex flex-col gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Subject of message..."
                  className="p-2 border border-slate-200 rounded-md text-[10px] font-bold"
                  value={typedSubject}
                  onChange={(e) => setTypedSubject(e.target.value)}
                />
                <span className="text-[10px] text-slate-400 text-right mt-1.5">
                  Replying to: <strong className="text-slate-600">{selectedClientObj.primaryContact.name}</strong>
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a secure message and press Send..."
                  className="flex-1 p-2.5 border border-slate-200 rounded-md focus:outline-hidden text-xs"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!typedMessage.trim()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-md font-bold text-xs hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>Send</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="h-full flex items-center justify-center p-6 text-slate-400">
            Select a corporate client to open their encrypted communication stream.
          </div>
        )}
      </div>

    </div>
  );
};


// =========================================================
// 4. FOLLOW-UP PANEL (CRITICAL TOAST / MILESTONES)
// =========================================================
interface FollowUpPanelProps {
  followUps: ClientFollowUp[];
  onMarkCompleted: (id: string) => void;
  onAddFollowUpClick: () => void;
}

export const FollowUpPanel: React.FC<FollowUpPanelProps> = ({
  followUps,
  onMarkCompleted,
  onAddFollowUpClick,
}) => {
  const getFollowUpCategory = (item: ClientFollowUp) => {
    const today = new Date('2026-07-16'); // Mock system date from metadata: 2026-07-16
    const due = new Date(item.dueDate);
    
    // Check if overdue
    if (item.status === 'Overdue' || due < today) {
      return 'overdue';
    }
    
    // Calculate difference in days
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'today';
    } else if (diffDays > 0 && diffDays <= 3) {
      return 'soon';
    } else {
      return 'normal';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 p-5 shadow-2xs space-y-4" id="follow-up-task-panel">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div className="space-y-0.5">
          <h3 className="font-bold text-slate-850 text-xs">Firm Follow-up Tracker</h3>
          <p className="text-[10px] text-slate-400">Chased items requiring staff remediation</p>
        </div>
        <button
          onClick={onAddFollowUpClick}
          className="flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-150 px-2 py-1 rounded-md cursor-pointer transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>Add Follow-up</span>
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {followUps.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-6">All client follow-ups are completed!</p>
        ) : (
          followUps.map((item) => {
            const category = getFollowUpCategory(item);
            
            // Highlight styling based on urgency
            let borderClass = 'border-slate-150';
            let bgClass = 'bg-white';
            let urgencyText = 'Upcoming';

            if (category === 'overdue') {
              borderClass = 'border-red-250';
              bgClass = 'bg-red-50/10';
              urgencyText = 'Overdue';
            } else if (category === 'today') {
              borderClass = 'border-amber-200';
              bgClass = 'bg-amber-50/20';
              urgencyText = 'Due Today';
            } else if (category === 'soon') {
              borderClass = 'border-orange-200';
              bgClass = 'bg-orange-50/10';
              urgencyText = 'Due within 3 Days';
            }

            return (
              <div 
                key={item.id} 
                id={`followup-item-${item.id}`}
                className={`p-3.5 rounded-xl border ${borderClass} ${bgClass} space-y-2 relative group`}
              >
                <div className="flex justify-between items-start gap-1">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      {item.clientName}
                    </span>
                    <strong className="text-[11px] font-bold text-slate-800 block mt-0.5 group-hover:text-slate-950">
                      {item.task}
                    </strong>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${
                      category === 'overdue' ? 'bg-red-50 text-red-600' :
                      category === 'today' ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {urgencyText}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 block mt-0.5">{item.dueDate}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1.5 border-t border-slate-100/60 text-[10px]">
                  <span className="text-slate-500">Chased by: <strong className="text-slate-600 font-semibold">{item.assignedStaff}</strong></span>
                  
                  {item.status !== 'Completed' && (
                    <button
                      onClick={() => onMarkCompleted(item.id)}
                      className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
