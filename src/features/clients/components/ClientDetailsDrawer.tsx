import React, { useState, useEffect } from 'react';
import { Client } from '../../../types/clients';
import { StatusBadge } from '../../../components/ui';
import { 
  MOCK_CLIENT_JOBS,
  MOCK_CLIENT_DOCUMENTS,
  MOCK_CLIENT_COMPLIANCE,
  MOCK_CLIENT_ACTIVITIES,
  MOCK_CLIENT_SERVICES
} from '../../../mock-data/clients';
import { 
  X, 
  Building2, 
  MapPin, 
  User, 
  FileText, 
  AlertTriangle, 
  HelpCircle,
  Mail,
  Phone,
  Bookmark
} from 'lucide-react';

interface ClientDetailsDrawerProps {
  isOpen: boolean;
  clientId: string | null;
  onClose: () => void;
  clients: Client[];
  initialTab?: string;
}

export const ClientDetailsDrawer: React.FC<ClientDetailsDrawerProps> = ({
  isOpen,
  clientId,
  onClose,
  clients,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab.toLowerCase());
    }
  }, [initialTab, clientId]);

  if (!isOpen || !clientId) return null;

  const client = clients.find(c => c.id === clientId);
  if (!client) return null;

  // Fetch contextual mock data
  const jobs = MOCK_CLIENT_JOBS[client.id] || [];
  const documents = MOCK_CLIENT_DOCUMENTS[client.id] || [];
  const compliance = MOCK_CLIENT_COMPLIANCE[client.id] || [];
  const services = MOCK_CLIENT_SERVICES[client.id] || [];
  const activities = MOCK_CLIENT_ACTIVITIES[client.id] || [];

  const missingInfoList = [];
  if (!client.tin) missingInfoList.push('Tax Identification Number (TIN)');
  if (!client.bin) missingInfoList.push('Business Identification Number (BIN)');
  if (!client.registrationNumber) missingInfoList.push('RJSC Registration Code');
  if (!client.website) missingInfoList.push('Corporate Website URL');
  if (client.services.length === 0) missingInfoList.push('Selected Engagements');

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="client-details-drawer-overlay">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300"
        id="client-details-drawer-body"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-150 flex justify-between items-start bg-slate-50">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                {client.code}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-600">
                {client.type}
              </span>
              <StatusBadge status={client.status} type={client.status === 'Active' ? 'success' : 'warning'} />
            </div>
            <h2 className="text-xl font-bold text-slate-850 tracking-tight">{client.name}</h2>
            {client.tradingName && (
              <p className="text-xs text-slate-400 italic font-medium">Trading as: {client.tradingName}</p>
            )}
            
            <div className="flex gap-4 text-[11px] text-slate-500 font-medium pt-2">
              <span>Partner: <strong className="text-slate-700">{client.assignedPartner}</strong></span>
              <span>•</span>
              <span>Manager: <strong className="text-slate-700">{client.assignedManager || 'Not Assigned'}</strong></span>
              <span>•</span>
              <span>Portal Status: <strong className="text-violet-600">{client.portalStatus}</strong></span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-150 px-6 overflow-x-auto whitespace-nowrap bg-white py-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'contacts', label: 'Contacts' },
            { id: 'services', label: 'Engaged Services' },
            { id: 'jobs', label: 'Active Jobs' },
            { id: 'documents', label: 'Vault Documents' },
            { id: 'communications', label: 'Communications' },
            { id: 'compliance', label: 'Compliance Tracker' },
            { id: 'activity', label: 'Firm Audit Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'border-slate-800 text-slate-850 bg-slate-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-250'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* NOTICE: Frontend Simulation Badges */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex items-start gap-2.5">
            <HelpCircle className="w-4.5 h-4.5 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-850 text-xs">Sandbox Session Simulator</span>
              <p className="text-[10px] text-slate-500">
                You are reviewing a mock audit database profile. Document links, timeline schedules, and task updates represent simulated activities for testing workflows.
              </p>
            </div>
          </div>

          {/* Tab Pages */}
          {activeTab === 'overview' && (
            <div className="space-y-6" id="tab-overview-content">
              {/* Missing Info Alert */}
              {missingInfoList.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-800 text-xs">Missing Required Firm Records</h4>
                    <p className="text-[10px] text-amber-600">
                      The following key compliance indicators are currently missing from this client record:
                    </p>
                    <ul className="list-disc pl-4 text-[10px] text-amber-700 font-medium space-y-0.5">
                      {missingInfoList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Bento Grid Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Legal Block */}
                <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-3.5">
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-1.5 flex items-center gap-1.5 text-xs">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>Legal & Registration Profile</span>
                  </h4>
                  <div className="space-y-2.5 text-[11px]">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">Incorporation Date</span>
                      <span className="font-bold text-slate-700">{client.incorporationDate || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">Registration Number</span>
                      <span className="font-bold text-slate-700">{client.registrationNumber || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">Financial Year End</span>
                      <span className="font-bold text-slate-800">{client.financialYearEnd}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">Industry Segment</span>
                      <span className="font-bold text-slate-700">{client.industry || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Listed Exchange Status</span>
                      <span className="font-bold text-slate-700">{client.listedStatus || 'Unlisted'}</span>
                    </div>
                  </div>
                </div>

                {/* Tax Block */}
                <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-3.5">
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-1.5 flex items-center gap-1.5 text-xs">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>NBR Tax Credentials</span>
                  </h4>
                  <div className="space-y-2.5 text-[11px]">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">TIN (Taxpayer Identification)</span>
                      <span className="font-mono font-bold text-slate-800">{client.tin || 'Pending Input'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">BIN (Business Identification)</span>
                      <span className="font-mono font-bold text-slate-800">{client.bin || 'Pending Input'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">Tax Circle Office</span>
                      <span className="font-bold text-slate-700">{client.taxCircle || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="text-slate-400">VAT Circle Office</span>
                      <span className="font-bold text-slate-700">{client.vatCircle || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RJSC Registration Code</span>
                      <span className="font-bold text-slate-700">{client.rjscRegistrationNumber || 'Not Provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address and Description */}
              <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">Corporate Business Summary</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {client.businessDescription || 'No description provided yet for this client corporate group.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-1 text-[11px]">
                    <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[9px]">Head Office Address</span>
                    <p className="text-slate-700 flex gap-1 items-start">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>{client.officeAddress || 'Not Provided'}</span>
                    </p>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[9px]">Registered/Legal Address</span>
                    <p className="text-slate-700 flex gap-1 items-start">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>{client.registeredAddress || 'Not Provided'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4" id="tab-contacts-content">
              <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-slate-500" />
                    <h3 className="font-bold text-slate-800 text-xs">Primary Contact Person</h3>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md">
                    Direct Point
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 text-[10px]">Full Name</span>
                      <div className="font-bold text-slate-800">{client.primaryContact.name}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Designation</span>
                      <div className="font-semibold text-slate-700">{client.primaryContact.designation}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono text-slate-700">{client.primaryContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{client.primaryContact.phone}</span>
                    </div>
                    {client.primaryContact.altPhone && (
                      <div className="text-slate-400 text-[10px] pl-5">Alt: {client.primaryContact.altPhone}</div>
                    )}
                  </div>
                </div>
              </div>

              {client.additionalContacts && client.additionalContacts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-xs">Additional Client Representatives</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {client.additionalContacts.map((c, idx) => (
                      <div key={idx} className="bg-white border border-slate-150 p-4 rounded-xl space-y-2.5">
                        <div className="font-bold text-slate-800">{c.name}</div>
                        <div className="text-slate-500 text-[11px] font-medium">{c.designation}</div>
                        <div className="space-y-1 pt-1 text-[11px] border-t border-slate-50">
                          <div className="text-slate-600 font-mono">{c.email}</div>
                          <div className="text-slate-600">{c.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4" id="tab-services-content">
              <h3 className="font-bold text-slate-850 text-xs">Active Relationship Mandates</h3>
              {services.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No historical service mandate files linked.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="bg-white border border-slate-150 p-5 rounded-xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-850 text-xs">{srv.name}</h4>
                          <span className="text-[10px] text-slate-400">Engaged since {srv.startDate}</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {srv.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-150">
                        <div>
                          <span className="text-slate-400 font-semibold block text-[9px] uppercase tracking-wider">Assigned Team</span>
                          <span className="font-bold text-slate-700">{(srv.assignedTeam || []).join(', ') || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block text-[9px] uppercase tracking-wider">Last Job Record</span>
                          <span className="font-bold text-slate-700">{srv.lastCompletedJob || 'None Completed'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block text-[9px] uppercase tracking-wider">Next Pending Step</span>
                          <span className="font-bold text-slate-800 text-[10px]">{srv.nextRequiredAction || 'No Actions Logged'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-4" id="tab-jobs-content">
              <h3 className="font-bold text-slate-850 text-xs">FAMES & R Audit & Advisory Jobs</h3>
              {jobs.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No job engagement workflows scheduled for this client.</p>
              ) : (
                <div className="bg-white border border-slate-150 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Job Code</th>
                        <th className="px-4 py-3">Job Type</th>
                        <th className="px-4 py-3">Period</th>
                        <th className="px-4 py-3">Manager</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">Due Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-mono font-bold text-slate-700">{job.code}</td>
                          <td className="px-4 py-3 font-semibold text-slate-800">{job.jobType}</td>
                          <td className="px-4 py-3 text-slate-500 font-medium">{job.period}</td>
                          <td className="px-4 py-3 text-slate-600 font-medium">{job.manager}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-slate-800 h-full" style={{ width: `${job.progress}%` }} />
                              </div>
                              <span className="font-mono text-[10px] font-bold text-slate-500">{job.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-500">{job.dueDate}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={job.status} type={job.status === 'Completed' ? 'success' : job.status === 'Near Deadline' ? 'danger' : 'warning'} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4" id="tab-documents-content">
              <h3 className="font-bold text-slate-850 text-xs">Shared Client Document Repository</h3>
              {documents.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No document schedule sheets have been uploaded or requested.</p>
              ) : (
                <div className="bg-white border border-slate-150 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Document Title</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Period</th>
                        <th className="px-4 py-3">Requested Date</th>
                        <th className="px-4 py-3">Received Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-850 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span>{doc.title}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-500 font-semibold">{doc.category}</td>
                          <td className="px-4 py-3 text-slate-500 font-medium">{doc.period}</td>
                          <td className="px-4 py-3 font-mono text-slate-400">{doc.requestedDate}</td>
                          <td className="px-4 py-3 font-mono text-slate-600">{doc.receivedDate || <span className="text-slate-300">Pending</span>}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={doc.status} type={doc.status === 'Approved' ? 'success' : 'warning'} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="space-y-4" id="tab-communications-content">
              <h3 className="font-bold text-slate-850 text-xs">Firm Correspondence Logs</h3>
              <p className="text-[11px] text-slate-500">
                Review email schedules, meetings, and internal advisory memos. To log a new entry, use the centralized **Client Communications** page.
              </p>
              {/* Filter communication for this client */}
              <div className="space-y-3">
                <div className="bg-white border border-slate-150 rounded-xl p-4 flex gap-4 items-start">
                  <Bookmark className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-slate-800">Client Communication Tracking Gateway</strong>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      FAMES & R runs a localized secure communications bridge. For deep chats and logging new calls, navigate to **Clients &gt; Communications** in the sidebar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4" id="tab-compliance-content">
              <h3 className="font-bold text-slate-850 text-xs">Regulatory Filing Schedules</h3>
              {compliance.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No statutory filing track logs matched.</p>
              ) : (
                <div className="bg-white border border-slate-150 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Filing Type</th>
                        <th className="px-4 py-3">Reporting Period</th>
                        <th className="px-4 py-3">Statutory Due Date</th>
                        <th className="px-4 py-3">Responsible Person</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      {compliance.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-850">{item.filingType}</td>
                          <td className="px-4 py-3 text-slate-500 font-semibold">{item.period}</td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-500">{item.dueDate}</td>
                          <td className="px-4 py-3 text-slate-600 font-medium">{item.responsiblePerson}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={item.status} type={item.status === 'Completed' ? 'success' : 'warning'} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4" id="tab-activity-content">
              <h3 className="font-bold text-slate-850 text-xs">Activity Audit Trail</h3>
              {activities.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No system modifications logged for this client session.</p>
              ) : (
                <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-5 py-2">
                  {activities.map((act) => (
                    <div key={act.id} className="relative space-y-1">
                      {/* Bullet Dot */}
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white" />
                      
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-mono text-slate-400">{act.timestamp}</span>
                        <span className="font-bold text-slate-700 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-sm uppercase tracking-wider text-[8px]">
                          {act.action}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-slate-800">{act.details}</p>
                      <span className="text-[10px] text-slate-400 font-medium">Logged by {act.actor}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-150 bg-slate-50 text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 rounded-lg font-semibold text-xs cursor-pointer"
          >
            Close Profile Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
