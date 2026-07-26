import React, { useState } from 'react';
import { PageHeader, ContentContainer } from '../../components/layout';
import { DataTableShell, StatusBadge, useToast } from '../../components/ui';

// Shared mock of standard audit clients to work with
const MOCK_AUDITS = [
  { id: '1', client: 'Apex Holdings Ltd.', year: '2025-26', partner: 'A. R. Chowdhury, FCA', lead: 'Kabir Hasan' },
  { id: '2', client: 'Square Pharmaceuticals', year: '2025-26', partner: 'M. F. Ahmed, FCA', lead: 'Kabir Hasan' },
  { id: '3', client: 'Beximco Communications', year: '2025-26', partner: 'A. R. Chowdhury, FCA', lead: 'Nusrat Jahan' }
];

// ==========================================
// 1. AUDIT PLANNING VIEW
// ==========================================
export const AuditPlanningView: React.FC = () => {
  const { showToast } = useToast();
  const [auditPlans, setAuditPlans] = useState(
    MOCK_AUDITS.map((a) => ({ ...a, planningStatus: 'IN_PREPARATION', riskRating: 'MEDIUM' }))
  );

  const handleApprovePlan = (id: string) => {
    setAuditPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, planningStatus: 'APPROVED_PARTNER' } : p))
    );
    showToast('Audit planning memorandum formally approved by Partner.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Audit Planning Memorandums" description="Document risk assessments, materiality thresholds, and scope constraints before starting field work." />
      <DataTableShell
        headers={['Client', 'Audit Year', 'Materiality Target', 'Audit Risk Rating', 'Memo Status', 'Actions']}
        totalCount={auditPlans.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {auditPlans.map((plan) => (
          <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{plan.client}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-500">{plan.year}</td>
            <td className="px-6 py-4 text-xs font-mono font-semibold text-slate-600">
              {plan.id === '1' ? 'BDT 12.5M' : plan.id === '2' ? 'BDT 45.0M' : 'BDT 4.2M'}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={plan.riskRating} type={plan.id === '2' ? 'danger' : 'neutral'} />
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={plan.planningStatus} type={plan.planningStatus === 'APPROVED_PARTNER' ? 'success' : 'warning'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {plan.planningStatus === 'IN_PREPARATION' ? (
                <button
                  onClick={() => handleApprovePlan(plan.id)}
                  className="text-slate-900 hover:text-slate-950 underline font-semibold cursor-pointer"
                >
                  Approve Memo
                </button>
              ) : (
                <span className="text-slate-400 italic">No action required</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 2. AUDIT REQUISITION VIEW
// ==========================================
export const AuditRequisitionView: React.FC = () => {
  const { showToast } = useToast();
  const [requisitions] = useState([
    { id: '1', item: 'Fixed Assets Register & Valuation Reports', client: 'Apex Holdings Ltd.', dueDate: '2026-07-20', status: 'PENDING_CLIENT' },
    { id: '2', item: 'Bank Statements & Ledger Accounts for FY 25-26', client: 'Square Pharmaceuticals', dueDate: '2026-07-18', status: 'RECEIVED' },
    { id: '3', item: 'Articles of Association & Board Resolutions', client: 'Beximco Communications', dueDate: '2026-07-25', status: 'PENDING_CLIENT' }
  ]);

  const handleRemindClient = (_id: string, clientName: string) => {
    showToast(`Automated reminder email dispatched to ${clientName} finance division.`, 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Client Requisition Ledger" description="Register and track document requirements requested from client management." />
      <DataTableShell
        headers={['Requested Item', 'Client Organization', 'Requested Deadline', 'Status', 'Reminders']}
        totalCount={requisitions.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {requisitions.map((req) => (
          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{req.item}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{req.client}</td>
            <td className="px-6 py-4 text-xs font-mono font-medium text-slate-500">{req.dueDate}</td>
            <td className="px-6 py-4">
              <StatusBadge status={req.status} type={req.status === 'RECEIVED' ? 'success' : 'warning'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {req.status === 'PENDING_CLIENT' ? (
                <button
                  onClick={() => handleRemindClient(req.id, req.client)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded-md text-[10px] font-bold"
                >
                  Send Reminder
                </button>
              ) : (
                <span className="text-slate-400 italic">Ready to review</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 3. AUDIT ENGAGEMENT PROCEDURE VIEW
// ==========================================
export const AuditEngagementView: React.FC = () => {
  const { showToast } = useToast();
  const [engagements, setEngagements] = useState(
    MOCK_AUDITS.map((a) => ({ ...a, letterSigned: 'COMPLETED', teamBriefing: 'PENDING' }))
  );

  const handleBriefing = (id: string) => {
    setEngagements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, teamBriefing: 'COMPLETED' } : e))
    );
    showToast('Audit team briefing documented and signed off.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Engagement Letters & Briefings" description="Confirm contractual engagement scopes and register required audit team briefings." />
      <DataTableShell
        headers={['Corporate Client', 'Audit Partner In Charge', 'Engagement Letter', 'Team Allocation Briefing', 'Actions']}
        totalCount={engagements.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {engagements.map((eng) => (
          <tr key={eng.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{eng.client}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{eng.partner}</td>
            <td className="px-6 py-4">
              <StatusBadge status={eng.letterSigned} type="success" />
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={eng.teamBriefing} type={eng.teamBriefing === 'COMPLETED' ? 'success' : 'warning'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {eng.teamBriefing === 'PENDING' ? (
                <button
                  onClick={() => handleBriefing(eng.id)}
                  className="text-slate-900 hover:text-slate-950 font-bold underline cursor-pointer"
                >
                  Complete Briefing
                </button>
              ) : (
                <span className="text-slate-400 italic">No actions pending</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 4. AUDIT SUBSTANTIVE PROCEDURE VIEW
// ==========================================
export const AuditSubstantiveView: React.FC = () => {
  const { showToast } = useToast();
  const [procedures, setProcedures] = useState([
    { id: '1', area: 'Cash & Bank Balances Verification', client: 'Apex Holdings Ltd.', completed: true },
    { id: '2', area: 'Trade Receivables Circularization & Confirmations', client: 'Apex Holdings Ltd.', completed: false },
    { id: '3', area: 'Inventory Valuation physical sampling', client: 'Square Pharmaceuticals', completed: true },
    { id: '4', area: 'Trade Payables search for unrecorded liabilities', client: 'Square Pharmaceuticals', completed: false }
  ]);

  const toggleProcedure = (id: string, current: boolean) => {
    setProcedures((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !current } : p))
    );
    showToast(`Substantive audit testing area status changed.`, 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Substantive Audit Procedures" description="Perform ledger testings, verify bank reconciliation certificates, and circularize trade balances." />
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-3 mb-4">Active Field Testing Log</h3>
        <div className="space-y-4">
          {procedures.map((proc) => (
            <div key={proc.id} className="flex items-start gap-3 p-3 bg-slate-50/50 border border-slate-150 rounded-lg">
              <input
                type="checkbox"
                checked={proc.completed}
                onChange={() => toggleProcedure(proc.id, proc.completed)}
                className="mt-0.5 h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded-sm"
              />
              <div className="grow">
                <p className={`text-xs font-bold text-slate-800 ${proc.completed ? 'line-through text-slate-400' : ''}`}>
                  {proc.area}
                </p>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Assigned Client: {proc.client}</span>
              </div>
              <StatusBadge status={proc.completed ? 'VERIFIED' : 'PENDING'} type={proc.completed ? 'success' : 'warning'} />
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

// ==========================================
// 5. AUDIT WORKING PAPERS VIEW
// ==========================================
export const AuditWorkingPapersView: React.FC = () => {
  const { showToast } = useToast();
  const [papers, setPapers] = useState([
    { id: 'wp-1', ref: 'A-01', name: 'Cash and Bank balances link sheet', client: 'Apex Holdings Ltd.', linked: 'YES' },
    { id: 'wp-2', ref: 'B-02', name: 'Receivables aging analytics worksheet', client: 'Apex Holdings Ltd.', linked: 'YES' },
    { id: 'wp-3', ref: 'C-01', name: 'Fixed asset capital additions register', client: 'Square Pharmaceuticals', linked: 'NO' }
  ]);

  const handleLinkPaper = (id: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, linked: 'YES' } : p))
    );
    showToast('Working paper link successfully verified and locked.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Audit Working Papers (WP)" description="Link corporate ledger balances to audit evidence files and trial balances." />
      <DataTableShell
        headers={['Reference Code', 'Working Paper Name', 'Client Organization', 'Linked to TB?', 'Link Operations']}
        totalCount={papers.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {papers.map((p) => (
          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-900">{p.ref}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-800">{p.name}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.client}</td>
            <td className="px-6 py-4">
              <StatusBadge status={p.linked} type={p.linked === 'YES' ? 'success' : 'danger'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {p.linked === 'NO' ? (
                <button
                  onClick={() => handleLinkPaper(p.id)}
                  className="bg-slate-900 text-white text-[10px] px-3 py-1 rounded-md font-bold"
                >
                  Link Ledger Sheet
                </button>
              ) : (
                <span className="text-slate-400 italic">Evidences verified</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 6. AUDIT REVIEW ISSUES VIEW
// ==========================================
export const AuditReviewIssuesView: React.FC = () => {
  const { showToast } = useToast();
  const [issues, setIssues] = useState([
    { id: 'iss-1', query: 'Please verify the valuation of raw material stock.', raiser: 'M. F. Ahmed, FCA (Partner)', client: 'Square Pharmaceuticals', status: 'UNRESOLVED' },
    { id: 'iss-2', query: 'Missing bank confirmation letter from Dutch-Bangla Bank.', raiser: 'Kabir Hasan (Manager)', client: 'Apex Holdings Ltd.', status: 'RESOLVED' }
  ]);

  const handleResolveIssue = (id: string) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'RESOLVED' } : i))
    );
    showToast('Review issue resolved and signed off.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Audit Review Queries" description="Partner and Manager queries raised on working papers. Every query must be resolved prior to final report sign-off." />
      <DataTableShell
        headers={['Audit Query', 'Raiser Partner/Manager', 'Corporate Client', 'Query Status', 'Resolve Triage']}
        totalCount={issues.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {issues.map((i) => (
          <tr key={i.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-850">{i.query}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-500">{i.raiser}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{i.client}</td>
            <td className="px-6 py-4">
              <StatusBadge status={i.status} type={i.status === 'RESOLVED' ? 'success' : 'danger'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {i.status === 'UNRESOLVED' ? (
                <button
                  onClick={() => handleResolveIssue(i.id)}
                  className="text-slate-900 hover:text-slate-950 font-bold underline cursor-pointer"
                >
                  Mark Resolved
                </button>
              ) : (
                <span className="text-slate-400 italic">Query Cleared</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 7. AUDIT FINALIZATION VIEW
// ==========================================
export const AuditFinalizationView: React.FC = () => {
  const { showToast } = useToast();
  const [finalStatus, setFinalStatus] = useState(
    MOCK_AUDITS.map((a) => ({ ...a, signOffStatus: 'PENDING_PARTNER_SIGN' }))
  );

  const handleSignOffReport = (id: string) => {
    setFinalStatus((prev) =>
      prev.map((f) => (f.id === id ? { ...f, signOffStatus: 'REPORT_SIGNED_ISSUED' } : f))
    );
    showToast('Independent Auditor Report signed off and management letter issued.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="Audit Finalization & Sign Offs" description="Drafting final audit opinion and issuing the Independent Auditor signature." />
      <DataTableShell
        headers={['Client', 'Audit Year', 'Audit Lead', 'Sign Off Status', 'Operations']}
        totalCount={finalStatus.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {finalStatus.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{item.client}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.year}</td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-600">{item.lead}</td>
            <td className="px-6 py-4">
              <StatusBadge status={item.signOffStatus} type={item.signOffStatus === 'REPORT_SIGNED_ISSUED' ? 'success' : 'warning'} />
            </td>
            <td className="px-6 py-4 text-xs">
              {item.signOffStatus === 'PENDING_PARTNER_SIGN' ? (
                <button
                  onClick={() => handleSignOffReport(item.id)}
                  className="bg-slate-900 hover:bg-slate-850 text-white text-[10px] font-bold px-3 py-1 rounded-md"
                >
                  Sign Auditor Opinion
                </button>
              ) : (
                <span className="text-slate-400 italic">Audit Signed Off</span>
              )}
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};
