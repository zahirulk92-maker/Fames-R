import React, { useState, useEffect } from 'react';
import { PageHeader, ContentContainer } from '../../components/layout';
import { DataTableShell, StatusBadge, useToast } from '../../components/ui';
import { apiClient } from '../../services/apiClient';

// ==========================================
// 1. COMPLIANCE TAX & VAT VIEW
// ==========================================
export const ComplianceTaxVatView: React.FC = () => {
  const { showToast } = useToast();
  const [records, setRecords] = useState([
    { id: '1', client: 'Apex Holdings Ltd.', type: 'VAT Returns (VAT-9.1)', period: 'June 2026', status: 'COMPLETED' },
    { id: '2', client: 'Square Pharmaceuticals', type: 'Tax Deduction Source (TDS)', period: 'Q4 2025-26', status: 'IN_PROGRESS' },
    { id: '3', client: 'Beximco Communications', type: 'Annual Corporate Income Tax', period: 'FY 2025-26', status: 'PENDING' }
  ]);

  const handleUpdateStatus = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'COMPLETED' } : r))
    );
    showToast('Tax/VAT return status marked as completed.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Tax & VAT Board" description="National Board of Revenue (NBR) corporate direct tax assessments and monthly VAT return ledger." />
      <DataTableShell
        headers={['Corporate Client', 'Compliance Return Type', 'Filing Cycle Period', 'Filing Status', 'Operations']}
        totalCount={records.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {records.map((rec) => (
          <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{rec.client}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-650">{rec.type}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-500">{rec.period}</td>
            <td className="px-6 py-4">
              <StatusBadge status={rec.status} type={rec.status === 'COMPLETED' ? 'success' : rec.status === 'IN_PROGRESS' ? 'warning' : 'danger'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {rec.status !== 'COMPLETED' ? (
                <button
                  onClick={() => handleUpdateStatus(rec.id)}
                  className="text-slate-900 hover:text-slate-950 font-bold underline cursor-pointer"
                >
                  Mark Filed
                </button>
              ) : (
                <span className="text-slate-400 italic">Successfully Dispatched</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 2. COMPLIANCE RJSC CORPORATE VIEW
// ==========================================
export const ComplianceRjscView: React.FC = () => {
  const { showToast } = useToast();
  const [filings, setFilings] = useState([
    { id: '1', client: 'Beximco Communications', form: 'Schedule X (Annual Return)', regNo: 'C-98124/2012', status: 'IN_PROGRESS' },
    { id: '2', client: 'Runner Automobiles', form: 'Form XII (Director Changes)', regNo: 'C-72431/2005', status: 'COMPLETED' },
    { id: '3', client: 'Jamuna Oil Company', form: 'Form XV (Share Allocations)', regNo: 'C-3142/1975', status: 'PENDING' }
  ]);

  const handleFileFiling = (id: string) => {
    setFilings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'COMPLETED' } : f))
    );
    showToast('RJSC Form successfully lodged with Registrar.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="RJSC Corporate Filings" description="Registrar of Joint Stock Companies and Firms (RJSC) statutory fillings and company formations ledger." />
      <DataTableShell
        headers={['Company Registered', 'Form / filing Scope', 'RJSC Registration No.', 'Status', 'Lodge Action']}
        totalCount={filings.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {filings.map((fil) => (
          <tr key={fil.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{fil.client}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{fil.form}</td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{fil.regNo}</td>
            <td className="px-6 py-4">
              <StatusBadge status={fil.status} type={fil.status === 'COMPLETED' ? 'success' : fil.status === 'IN_PROGRESS' ? 'warning' : 'danger'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {fil.status !== 'COMPLETED' ? (
                <button
                  onClick={() => handleFileFiling(fil.id)}
                  className="bg-slate-900 text-white font-bold text-[10px] px-3 py-1 rounded-md"
                >
                  Submit Form
                </button>
              ) : (
                <span className="text-slate-400 italic">Form Lodged</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 3. COMPLIANCE RETURNS CHECKLIST VIEW
// ==========================================
export const ComplianceReturnsView: React.FC = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReminders = async () => {
      setLoading(true);
      const res = await apiClient.compliance.getReminders();
      if (res.success && res.data) {
        setReminders(res.data);
      }
      setLoading(false);
    };
    loadReminders();
  }, []);

  return (
    <ContentContainer>
      <PageHeader title="Corporate Returns Checklist" description="Continuous auditing tracking checklist for statutory income and indirect tax returns." />
      <DataTableShell
        headers={['Taxpaying Entity', 'Return Category', 'Agency Body', 'Filing Deadline', 'Filing State']}
        totalCount={reminders.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
        loading={loading}
      >
        {reminders.map((rem) => (
          <tr key={rem.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{rem.entity}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{rem.type}</td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{rem.filingAgency}</td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-600">{rem.dueDate}</td>
            <td className="px-6 py-4">
              <StatusBadge status={rem.status} type={rem.status === 'COMPLETED' ? 'success' : rem.status === 'IN_PROGRESS' ? 'warning' : 'danger'} />
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 4. COMPLIANCE CALENDAR VIEW
// ==========================================
export const ComplianceCalendarView: React.FC = () => {
  const { showToast } = useToast();
  const calendarDates = [
    { date: '2026-07-15', event: 'VAT Return Filing (Monthly NBR)', priority: 'HIGH', clientScope: 'All Active VAT Clients' },
    { date: '2026-07-20', event: 'Quarterly withholding Tax Ledger submission', priority: 'MEDIUM', clientScope: 'Large Taxpaying Units' },
    { date: '2026-07-31', event: 'RJSC Annual Return filing (Firms with June closing)', priority: 'HIGH', clientScope: 'Beximco & Subsidiaries' },
    { date: '2026-08-15', event: 'Income Tax Return (Salaried Employees)', priority: 'LOW', clientScope: 'Firm Internal Staff' }
  ];

  return (
    <ContentContainer>
      <PageHeader
        title="Compliance Calendar Reminders"
        description="Statutory dates and compliance timelines for Bangladeshi business regulations."
      />
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-3 mb-4">Regulatory Deadlines Calendar</h3>
        <div className="space-y-4">
          {calendarDates.map((cal, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-150 rounded-lg gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 text-white font-mono font-bold text-xs p-2.5 rounded-lg text-center shrink-0 min-w-24">
                  {cal.date}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-850">{cal.event}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">Applies to: {cal.clientScope}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <StatusBadge status={cal.priority} type={cal.priority === 'HIGH' ? 'danger' : cal.priority === 'MEDIUM' ? 'warning' : 'neutral'} />
                <button
                  onClick={() => showToast(`Synchronized deadline reminder for ${cal.event}`, 'success')}
                  className="text-slate-900 hover:text-slate-950 font-bold text-xs underline cursor-pointer"
                >
                  Remind Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};
