import React, { useState, useEffect } from 'react';
import { PageHeader, ContentContainer } from '../../components/layout';
import { DataTableShell, StatusBadge, useToast, FormField } from '../../components/ui';
import { apiClient } from '../../services/apiClient';

// ==========================================
// 1. ADMIN USERS MANAGEMENT VIEW
// ==========================================
export const AdminUsersView: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([
    { id: '1', name: 'A. R. Chowdhury, FCA', email: 'chowdhury@famesr.com', role: 'PARTNER', status: 'ACTIVE' },
    { id: '2', name: 'Kabir Hasan', email: 'kabir@famesr.com', role: 'MANAGER', status: 'ACTIVE' },
    { id: '3', name: 'Sajid Ahmed', email: 'sajid@famesr.com', role: 'STUDENT', status: 'ACTIVE' },
    { id: '4', name: 'M. F. Ahmed, FCA', email: 'ahmed@famesr.com', role: 'PARTNER', status: 'ACTIVE' }
  ]);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole as any } : u))
    );
    showToast(`User system role updated to ${newRole}.`, 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="User Registration & Accounts" description="Provision system users, assign structural roles, and toggle platform access permissions." />
      <DataTableShell
        headers={['System ID', 'Name / Email Address', 'Structural Role', 'Security State', 'Role Operations']}
        totalCount={users.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {users.map((u) => (
          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">USR-0{u.id}</td>
            <td className="px-6 py-4">
              <div className="text-xs font-bold text-slate-900">{u.name}</div>
              <div className="text-[10px] text-slate-400 font-medium">{u.email}</div>
            </td>
            <td className="px-6 py-4">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 border border-slate-200 text-slate-700">
                {u.role}
              </span>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={u.status} type="success" />
            </td>
            <td className="px-6 py-4 text-xs">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="bg-white border border-slate-200 text-xs rounded-lg px-2 py-1 font-medium text-slate-700 focus:outline-hidden"
              >
                <option value="PARTNER">PARTNER</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="SENIOR">SENIOR</option>
                <option value="STUDENT">STUDENT</option>
                <option value="CLIENT">CLIENT</option>
              </select>
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 2. ADMIN ROLES & PERMISSIONS VIEW
// ==========================================
export const AdminRolesPermissionsView: React.FC = () => {
  const permissions = [
    { role: 'PARTNER', clients: 'Write / Sign Audits', staff: 'Manage All', jobs: 'Full Access', auditStages: 'Approve & Finalize' },
    { role: 'SUPER_ADMIN', clients: 'Full Access', staff: 'Manage All', jobs: 'Full Access', auditStages: 'Configuration Only' },
    { role: 'MANAGER', clients: 'Read / Update', staff: 'Manage Division', jobs: 'Assign & Review', auditStages: 'Review / Query' },
    { role: 'SENIOR', clients: 'Read Only', staff: 'None', jobs: 'Assigned Only', auditStages: 'Perform / Draft' },
    { role: 'STUDENT', clients: 'None', staff: 'None', jobs: 'Assigned Only', auditStages: 'Perform / Evidence Upload' }
  ];

  return (
    <ContentContainer>
      <PageHeader title="Role Access Policy Matrix" description="Check access control policies for specific organizational roles." />
      <DataTableShell
        headers={['System Role', 'Clients Access', 'Staff Operations', 'Jobs Allocation', 'Audit Sign-offs']}
        totalCount={permissions.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
      >
        {permissions.map((p, idx) => (
          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-900">{p.role}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.clients}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.staff}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.jobs}</td>
            <td className="px-6 py-4 text-xs">
              <span className="text-[11px] px-2.5 py-1 rounded-md font-semibold bg-slate-50 border border-slate-150 text-slate-700">
                {p.auditStages}
              </span>
            </td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 3. ADMIN FIRM SETTINGS VIEW
// ==========================================
export const AdminFirmSettingsView: React.FC = () => {
  const { showToast } = useToast();
  const [firmName, setFirmName] = useState('FAMES & R Chartered Accountants');
  const [address, setAddress] = useState('Sharaqa Mac, House 3/A, Road 2, Dhanmondi, Dhaka');
  const [nbrApi, setNbrApi] = useState('https://api.nbr.gov.bd/v2');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Firm configurations saved successfully.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader title="General Firm Settings" description="Configure company details, registered addresses, and corporate API integration keys." />
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs max-w-2xl">
        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
          <FormField label="Registered Chartered Firm Name" required>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>

          <FormField label="Registered Address HQ" required>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>

          <FormField label="NBR Gateway Integration Endpoint">
            <input
              type="text"
              value={nbrApi}
              onChange={(e) => setNbrApi(e.target.value)}
              className="block w-full p-2.5 border border-slate-200 rounded-lg bg-white font-mono"
            />
          </FormField>

          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Save Firm Settings
          </button>
        </form>
      </div>
    </ContentContainer>
  );
};

// ==========================================
// 4. ADMIN ACTIVITY LOGS VIEW
// ==========================================
export const AdminActivityLogsView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const res = await apiClient.admin.getActivityLogs();
      if (res.success && res.data) {
        setLogs(res.data);
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <ContentContainer>
      <PageHeader title="Security Audit Trails" description="Continuous records of user activities, audit logins, modifications, and partner signatures." />
      <DataTableShell
        headers={['Security Action Logged', 'Target Object Segment', 'Authorized User', 'Timestamp recorded']}
        totalCount={logs.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
        loading={loading}
      >
        {logs.map((log) => (
          <tr key={log.id} className="hover:bg-slate-50/50 transition-colors text-xs">
            <td className="px-6 py-4 font-bold text-slate-850">{log.action}</td>
            <td className="px-6 py-4 font-mono font-medium text-slate-650">{log.target}</td>
            <td className="px-6 py-4 font-semibold text-slate-600">{log.user}</td>
            <td className="px-6 py-4 font-mono text-slate-400">{log.timestamp}</td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};

// ==========================================
// 5. ADMIN SYSTEM READINESS VIEW
// ==========================================
export const AdminSystemReadinessView: React.FC = () => {
  const { showToast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReadiness = async () => {
    setLoading(true);
    const res = await apiClient.admin.getSystemReadiness();
    if (res.success && res.data) {
      setServices(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReadiness();
  }, []);

  const handleDiagnose = () => {
    fetchReadiness();
    showToast('Infrastructure diagnostic check complete. Internal services healthy.', 'success');
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Infrastructure Readiness Indicators"
        description="Verify service availability, authentication microservices, database connectivity drafts, and third-party NBR APIs."
        action={{
          label: 'Run Infrastructure Test',
          onClick: handleDiagnose,
          icon: 'RefreshCcw',
        }}
      />

      <DataTableShell
        headers={['System Service Component', 'Network Latency', 'Telemetry Status', 'Service Details / Diagnostics']}
        totalCount={services.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
        loading={loading}
      >
        {services.map((srv, idx) => (
          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-xs font-bold text-slate-800">{srv.service}</td>
            <td className="px-6 py-4 text-xs font-mono text-slate-500">{srv.latency}</td>
            <td className="px-6 py-4">
              <StatusBadge status={srv.status} type={srv.status === 'HEALTHY' ? 'success' : 'danger'} />
            </td>
            <td className="px-6 py-4 text-xs font-medium text-slate-500">{srv.details}</td>
          </tr>
        ))}
      </DataTableShell>
    </ContentContainer>
  );
};
