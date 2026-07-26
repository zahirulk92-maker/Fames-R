import React, { useState } from 'react';
import { ClientRequest } from '../../../types/clients';
import { StatusBadge, Modal } from '../../../components/ui';
import { 
  Eye, 
  CheckCircle, 
  UserPlus, 
  Plus, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText,
  AlertOctagon,
  FileCheck
} from 'lucide-react';

// =========================================================
// 1. CLIENT REQUEST TABLE
// =========================================================
interface ClientRequestTableProps {
  requests: ClientRequest[];
  onViewRequest: (request: ClientRequest) => void;
  onAskMoreInfo: (requestId: string) => void;
  onApprove: (requestId: string) => void;
  onConvertToClient: (request: ClientRequest) => void;
}

export const ClientRequestTable: React.FC<ClientRequestTableProps> = ({
  requests,
  onViewRequest,
  onAskMoreInfo,
  onApprove,
  onConvertToClient,
}) => {
  const getStatusBadgeType = (s: ClientRequest['status']) => {
    switch (s) {
      case 'Approved':
      case 'Converted to Client':
        return 'success';
      case 'Submitted':
      case 'Under Review':
        return 'warning';
      case 'Need More Info':
        return 'neutral';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-2xs" id="client-requests-table-container">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="client-requests-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3.5">Request ID</th>
              <th className="px-6 py-3.5">Client / Prospect Name</th>
              <th className="px-6 py-3.5">Request Type</th>
              <th className="px-6 py-3.5">Submitted By</th>
              <th className="px-6 py-3.5">Submitted Date</th>
              <th className="px-6 py-3.5">Assigned Reviewer</th>
              <th className="px-6 py-3.5">Priority</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Last Update</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {requests.map((req) => (
              <tr key={req.id} id={`request-row-${req.id}`} className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-700">{req.id}</td>
                <td className="px-6 py-4 font-semibold text-slate-850 hover:text-slate-950 cursor-pointer" onClick={() => onViewRequest(req)}>
                  {req.clientName}
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{req.requestType}</td>
                <td className="px-6 py-4 text-slate-600">{req.submittedBy}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{req.submittedDate}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{req.assignedReviewer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    req.priority === 'Urgent' ? 'bg-red-50 text-red-700 border border-red-150' :
                    req.priority === 'High' ? 'bg-amber-50 text-amber-700 border border-amber-150' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={req.status} type={getStatusBadgeType(req.status)} />
                </td>
                <td className="px-6 py-4 font-mono text-[10px] text-slate-400">{req.lastUpdate}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewRequest(req)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                      title="View Request Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {req.status !== 'Converted to Client' && req.status !== 'Rejected' && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => onAskMoreInfo(req.id)}
                          className="px-1.5 py-1 text-[10px] border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-md cursor-pointer font-semibold"
                          title="Ask for More Info"
                        >
                          Info
                        </button>
                        <button
                          onClick={() => onApprove(req.id)}
                          className="px-1.5 py-1 text-[10px] border border-emerald-100 text-emerald-600 bg-emerald-50/30 hover:bg-emerald-50 rounded-md cursor-pointer font-semibold"
                          title="Approve Proposal"
                        >
                          Approve
                        </button>
                        {req.status === 'Approved' && (
                          <button
                            onClick={() => onConvertToClient(req)}
                            className="px-2 py-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer font-semibold flex items-center gap-0.5"
                            title="Convert to Client Record"
                          >
                            <UserPlus className="w-3 h-3" />
                            <span>Convert</span>
                          </button>
                        )}
                      </div>
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
// 2. CLIENT REQUEST DETAILS DRAWER / MODAL
// =========================================================
interface ClientRequestDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  request: ClientRequest | null;
  onAskMoreInfo: (requestId: string) => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onConvertToClient: (request: ClientRequest) => void;
}

export const ClientRequestDetails: React.FC<ClientRequestDetailsProps> = ({
  isOpen,
  onClose,
  request,
  onAskMoreInfo,
  onApprove,
  onReject,
  onConvertToClient,
}) => {
  if (!isOpen || !request) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request Review: ${request.id}`} size="lg">
      <div className="space-y-5 text-xs text-slate-700" id="client-request-details-panel">
        
        {/* Wording Warning: Demo Review Action Notice */}
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-start gap-2.5">
          <AlertOctagon className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-indigo-900 text-xs">Simulated Triage Review Desk</span>
            <p className="text-[10px] text-indigo-700 leading-relaxed">
              Status changes below represent a **demo-review action**. No actual statutory agreements are drafted, nor are any legal database commits recorded.
            </p>
          </div>
        </div>

        {/* Prospect Contact Card */}
        <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Prospect Organization</span>
              <strong className="text-sm font-bold text-slate-800 block">{request.clientName}</strong>
            </div>
            <StatusBadge status={request.status} type={request.status === 'Approved' ? 'success' : 'warning'} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2.5 border-t border-slate-200 text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">{request.contactPerson}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-slate-500">{request.contactEmail}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{request.contactPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Priority Level</span>
                <span className="font-bold text-slate-700">{request.priority}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requested Mandate Details */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800">Inbound Proposal Description</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-lg border border-slate-100">
            {request.description}
          </p>
        </div>

        {/* Selected Services Check */}
        {request.requestedServices && request.requestedServices.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800">Requested Relationship Services</h4>
            <div className="flex flex-wrap gap-1.5">
              {request.requestedServices.map(srv => (
                <span key={srv} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {srv}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attached Document Placeholders */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800">Submitted Document Verification</h4>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="font-mono text-[10px] text-slate-600">
                {request.supportingDocPlaceholder || 'No files attached'}
              </span>
            </div>
            <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
              Encrypted Sandbox Storage Only
            </span>
          </div>
        </div>

        {/* Timeline Activities */}
        {request.timeline && request.timeline.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-800">Triage Lifecycle Timeline</h4>
            <div className="relative border-l border-slate-200 pl-3.5 space-y-3 ml-1.5">
              {request.timeline.map((item, idx) => (
                <div key={idx} className="relative text-[11px]">
                  <div className="absolute -left-[19.5px] top-1 w-2 h-2 rounded-full bg-slate-400" />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>{item.date}</span>
                    <span className="font-semibold text-slate-600">{item.actor}</span>
                  </div>
                  <p className="font-semibold text-slate-700 mt-0.5">{item.status}</p>
                  {item.comment && <p className="text-[10px] text-slate-500 italic">"{item.comment}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Action Area */}
        <div className="pt-4 border-t border-slate-150 bg-slate-50 -mx-6 -mb-6 p-6 flex flex-col md:flex-row gap-3 items-center justify-between rounded-b-lg">
          <div className="text-slate-500 text-[10px] font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Assigned Reviewer: {request.assignedReviewer}</span>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            {request.status !== 'Converted to Client' && request.status !== 'Rejected' && (
              <>
                <button
                  onClick={() => {
                    onAskMoreInfo(request.id);
                    onClose();
                  }}
                  className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Ask More Info
                </button>
                <button
                  onClick={() => {
                    onReject(request.id);
                    onClose();
                  }}
                  className="px-3 py-2 border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-600 font-semibold rounded-lg cursor-pointer"
                >
                  Reject Proposal
                </button>
                <button
                  onClick={() => {
                    onApprove(request.id);
                    onClose();
                  }}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              </>
            )}

            {request.status === 'Approved' && (
              <button
                onClick={() => {
                  onConvertToClient(request);
                  onClose();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Convert to Client Profile</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
};


// =========================================================
// 3. CREATE NEW REQUEST FORM MODAL
// =========================================================
interface ClientRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Omit<ClientRequest, 'id' | 'submittedDate' | 'lastUpdate' | 'timeline'>) => void;
}

export const ClientRequestForm: React.FC<ClientRequestFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [clientName, setClientName] = useState('');
  const [requestType, setRequestType] = useState<ClientRequest['requestType']>('New Client Onboarding');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ClientRequest['priority']>('Normal');
  const [assignedReviewer, setAssignedReviewer] = useState('A. R. Chowdhury, FCA');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicesList = [
    'Statutory Audit',
    'Internal Audit',
    'Accounting',
    'Income Tax',
    'VAT',
    'RJSC',
    'Advisory',
    'Payroll',
    'Company Secretarial',
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Client/Prospect name is required';
    if (!contactPerson.trim()) errs.contactPerson = 'Contact Person name is required';
    if (!contactEmail.trim()) {
      errs.contactEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      errs.contactEmail = 'Provide a valid email';
    }
    if (!contactPhone.trim()) errs.contactPhone = 'Phone number is required';
    if (!description.trim()) errs.description = 'Brief requirement details are required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      clientName: clientName.trim(),
      requestType,
      submittedBy: `${contactPerson.trim()} (${requestType === 'New Client Onboarding' ? 'Prospect' : 'Client Representative'})`,
      assignedReviewer,
      priority,
      status: 'Submitted',
      contactPerson: contactPerson.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      contactPhone: contactPhone.trim(),
      requestedServices: selectedServices,
      description: description.trim(),
      supportingDocPlaceholder: 'Trade License Upload Draft.pdf',
    });

    // Reset Form
    setClientName('');
    setRequestType('New Client Onboarding');
    setContactPerson('');
    setContactEmail('');
    setContactPhone('');
    setDescription('');
    setPriority('Normal');
    setSelectedServices([]);
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="File Onboarding/Consultation Request">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700" id="client-request-creation-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Prospect / Company Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg focus:outline-hidden"
              placeholder="e.g. Orion Infotech Ltd."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            {errors.clientName && <span className="text-rose-600 block text-[10px] font-semibold">{errors.clientName}</span>}
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Request Category</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg focus:outline-hidden cursor-pointer"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as ClientRequest['requestType'])}
            >
              <option value="New Client Onboarding">New Client Onboarding</option>
              <option value="Service Addition">Service Addition (Existing Client)</option>
              <option value="Portal Access Request">Portal Access Request</option>
              <option value="Information Update">Information Update</option>
              <option value="Document Request">Document Request</option>
              <option value="Engagement Renewal">Engagement Renewal</option>
              <option value="Other">Other Category</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Priority Urgency</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg focus:outline-hidden cursor-pointer"
              value={priority}
              onChange={(e) => setPriority(e.target.value as ClientRequest['priority'])}
            >
              <option value="Normal">Normal Review</option>
              <option value="High">High Urgency</option>
              <option value="Urgent">Urgent Review</option>
            </select>
          </div>

          <div className="space-y-1 col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-150">
            <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-2">Primary Inbound Representative</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-slate-500 block">Contact Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-200 bg-white rounded-md"
                  placeholder="e.g. Zamil Hossain"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
                {errors.contactPerson && <span className="text-rose-600 block text-[10px]">{errors.contactPerson}</span>}
              </div>
              <div className="space-y-1">
                <label className="font-medium text-slate-500 block">Contact Email <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  className="w-full p-2 border border-slate-200 bg-white rounded-md"
                  placeholder="zamil@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                {errors.contactEmail && <span className="text-rose-600 block text-[10px]">{errors.contactEmail}</span>}
              </div>
              <div className="space-y-1">
                <label className="font-medium text-slate-500 block">Direct Mobile <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-200 bg-white rounded-md"
                  placeholder="+880-17..."
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
                {errors.contactPhone && <span className="text-rose-600 block text-[10px]">{errors.contactPhone}</span>}
              </div>
            </div>
          </div>

          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Which engagements are you proposing? (Checkboxes)</label>
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200">
              {servicesList.map(srv => (
                <label key={srv} className="flex items-center gap-2 p-1 border border-transparent hover:border-slate-150 rounded-md cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(srv)}
                    onChange={() => handleServiceToggle(srv)}
                    className="cursor-pointer"
                  />
                  <span className="font-medium text-[10px] text-slate-600">{srv}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Detailed Requirements / Description <span className="text-rose-500">*</span></label>
            <textarea
              className="w-full p-2.5 border border-slate-200 bg-white rounded-lg h-20"
              placeholder="Provide a summary of client operations, financial data scale, or bookkeeping platforms used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className="text-rose-600 block text-[10px] font-semibold">{errors.description}</span>}
          </div>

          <div className="space-y-1 col-span-2">
            <label className="font-semibold block">Select Assigned Reviewer</label>
            <select
              className="w-full p-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg focus:outline-hidden cursor-pointer"
              value={assignedReviewer}
              onChange={(e) => setAssignedReviewer(e.target.value)}
            >
              <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA</option>
              <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA</option>
              <option value="S. K. Nandy, FCA">S. K. Nandy, FCA</option>
            </select>
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
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Proposal</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
