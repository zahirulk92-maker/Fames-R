import React, { useState } from 'react';
import { Client } from '../../../types/clients';
import { StatusBadge } from '../../../components/ui';
import { 
  Eye, 
  Edit, 
  ShieldAlert, 
  Trash2, 
  FolderLock, 
  ChevronDown, 
  Briefcase, 
  FileText, 
  MessageSquare 
} from 'lucide-react';

interface ClientTableProps {
  clients: Client[];
  onViewClient: (clientId: string, defaultTab?: string) => void;
  onEditClient: (client: Client) => void;
  onPreparePortal: (client: Client) => void;
  onDeactivate: (clientId: string) => void;
  onArchive: (clientId: string) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onViewClient,
  onEditClient,
  onPreparePortal,
  onDeactivate,
  onArchive,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getPortalBadgeType = (status: Client['portalStatus']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Invited':
      case 'Invitation Prepared':
        return 'warning';
      case 'Suspended':
      case 'Revoked':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getClientStatusBadgeType = (status: Client['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending Onboarding':
        return 'warning';
      case 'Inactive':
        return 'neutral';
      case 'Suspended':
        return 'danger';
      case 'Archived':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-2xs" id="client-master-table-container">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="client-master-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3.5">Code</th>
              <th className="px-6 py-3.5">Client Name</th>
              <th className="px-6 py-3.5">Client Type</th>
              <th className="px-6 py-3.5">Primary Contact</th>
              <th className="px-6 py-3.5">Services</th>
              <th className="px-6 py-3.5">Manager</th>
              <th className="px-6 py-3.5">Portal Status</th>
              <th className="px-6 py-3.5">Client Status</th>
              <th className="px-6 py-3.5">Last Activity</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {clients.map((client) => (
              <tr 
                key={client.id} 
                id={`client-row-${client.id}`}
                className="hover:bg-slate-50/40 transition-colors group"
              >
                {/* Client Code */}
                <td className="px-6 py-4 font-mono font-bold text-slate-700">
                  {client.code}
                </td>

                {/* Client Name */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-850 hover:text-slate-950 cursor-pointer" onClick={() => onViewClient(client.id)}>
                    {client.name}
                  </div>
                  {client.tradingName && (
                    <div className="text-[10px] text-slate-400 italic">t/a {client.tradingName}</div>
                  )}
                </td>

                {/* Client Type */}
                <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                  {client.type}
                </td>

                {/* Primary Contact */}
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{client.primaryContact.name}</div>
                  <div className="text-[10px] text-slate-500">{client.primaryContact.designation}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{client.primaryContact.email}</div>
                </td>

                {/* Services */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {client.services.map((srv) => (
                      <span 
                        key={srv} 
                        className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-slate-50 text-slate-600 border border-slate-150"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Assigned Manager */}
                <td className="px-6 py-4 font-medium text-slate-700">
                  {client.assignedManager || (
                    <span className="text-slate-400 italic">Not Assigned</span>
                  )}
                </td>

                {/* Portal Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    status={client.portalStatus} 
                    type={getPortalBadgeType(client.portalStatus)} 
                  />
                </td>

                {/* Client Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    status={client.status} 
                    type={getClientStatusBadgeType(client.status)} 
                  />
                </td>

                {/* Last Activity */}
                <td className="px-6 py-4 text-slate-500 font-medium font-mono text-[10px] whitespace-nowrap">
                  {client.lastActivity || <span className="text-slate-300">—</span>}
                </td>

                {/* Actions Button / Dropdown */}
                <td className="px-6 py-4 text-right whitespace-nowrap relative">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewClient(client.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onEditClient(client)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      title="Edit Client"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <div className="relative inline-block">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === client.id ? null : client.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer flex items-center gap-0.5"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {activeMenuId === client.id && (
                        <>
                          {/* Overlay to close menu */}
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-slate-150 shadow-md py-1.5 z-20 text-left">
                            <button
                              onClick={() => {
                                onViewClient(client.id, 'jobs');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              <span>View Engagement Jobs</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                onViewClient(client.id, 'documents');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>View Shared Documents</span>
                            </button>

                            <button
                              onClick={() => {
                                onViewClient(client.id, 'communications');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                              <span>View Communications</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            <button
                              onClick={() => {
                                onPreparePortal(client);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <FolderLock className="w-3.5 h-3.5 text-violet-500" />
                              <span>Prepare Portal Invite</span>
                            </button>

                            <button
                              onClick={() => {
                                onDeactivate(client.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-semibold text-xs"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>{client.status === 'Active' ? 'Deactivate Client' : 'Activate Client'}</span>
                            </button>

                            <button
                              onClick={() => {
                                onArchive(client.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-1.5 text-slate-500 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium text-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                              <span>Archive Client</span>
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
