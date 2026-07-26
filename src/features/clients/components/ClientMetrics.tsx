import React from 'react';
import { Client } from '../../../types/clients';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  FileSpreadsheet, 
  Percent
} from 'lucide-react';

interface ClientMetricsProps {
  clients: Client[];
}

export const ClientMetrics: React.FC<ClientMetricsProps> = ({ clients }) => {
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const pendingOnboarding = clients.filter(c => c.status === 'Pending Onboarding').length;
  const inactiveClients = clients.filter(c => c.status === 'Inactive' || c.status === 'Suspended' || c.status === 'Archived').length;
  
  const auditClients = clients.filter(c => 
    c.services.includes('Statutory Audit') || c.services.includes('Internal Audit')
  ).length;
  
  const taxVatClients = clients.filter(c => 
    c.services.includes('Income Tax') || c.services.includes('VAT')
  ).length;
  
  const portalAccessEnabled = clients.filter(c => 
    c.portalStatus === 'Active'
  ).length;
  
  const missingInfo = clients.filter(c => 
    !c.tin || !c.bin || !c.registrationNumber || !c.website
  ).length;

  const metrics = [
    {
      id: 'metric-total',
      label: 'Total Clients',
      value: totalClients,
      icon: Users,
      color: 'text-slate-600 bg-slate-50 border-slate-150',
    },
    {
      id: 'metric-active',
      label: 'Active Clients',
      value: activeClients,
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'metric-pending',
      label: 'Pending Onboarding',
      value: pendingOnboarding,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: 'metric-inactive',
      label: 'Inactive Clients',
      value: inactiveClients,
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      id: 'metric-audit',
      label: 'Audit Clients',
      value: auditClients,
      icon: FileSpreadsheet,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      id: 'metric-tax-vat',
      label: 'Tax & VAT Clients',
      value: taxVatClients,
      icon: Percent,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      id: 'metric-portal',
      label: 'Portal Enabled',
      value: portalAccessEnabled,
      icon: ShieldCheck,
      color: 'text-violet-600 bg-violet-50 border-violet-100',
    },
    {
      id: 'metric-missing',
      label: 'Missing Regulatory Info',
      value: missingInfo,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 border-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="client-metrics-grid">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div 
            key={m.id} 
            id={m.id}
            className="bg-white p-4 rounded-xl border border-slate-150 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {m.label}
              </span>
              <span className="text-xl md:text-2xl font-bold text-slate-850 tracking-tight block">
                {m.value}
              </span>
            </div>
            <div className={`p-2 rounded-lg border ${m.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
