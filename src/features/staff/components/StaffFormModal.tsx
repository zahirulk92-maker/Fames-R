import React, { useState, useEffect } from 'react';
import { Modal, FormField, useToast } from '../../../components/ui';
import { StaffMember, StaffProfile } from '../../../types/staffAndJobs';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staff: StaffMember, profile: StaffProfile) => void;
  staffToEdit?: StaffMember;
  profileToEdit?: StaffProfile;
  existingCodes: string[];
}

export const StaffFormModal: React.FC<StaffFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  staffToEdit,
  profileToEdit,
  existingCodes,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'personal' | 'employment' | 'articleship' | 'professional' | 'compensation'>('personal');

  // Form states - StaffMember
  const [name, setName] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Article Student');
  const [status, setStatus] = useState<StaffMember['status']>('Active');
  const [department, setDepartment] = useState('Audit & Assurance');
  const [assignedManager, setAssignedManager] = useState('');
  const [joiningDate, setJoiningDate] = useState('2026-07-16');
  const [availability, setAvailability] = useState<StaffMember['availability']>('Available');
  const [performanceScore, setPerformanceScore] = useState(85);
  const [articleshipYear, setArticleshipYear] = useState<number | undefined>(1);

  // Form states - StaffProfile
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [education, setEducation] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [softwareText, setSoftwareText] = useState('');
  const [specializationText, setSpecializationText] = useState('');
  const [articleshipRegNo, setArticleshipRegNo] = useState('');
  const [articleshipStartDate, setArticleshipStartDate] = useState('');
  const [articleshipExpectedEnd, setArticleshipExpectedEnd] = useState('');
  const [principalPartner, setPrincipalPartner] = useState('');
  const [examLeaveEligibility, setExamLeaveEligibility] = useState('');
  const [currentWorkload, setCurrentWorkload] = useState('0 Active Audits');

  // Compensation Preview (Part E)
  const [baseSalary, setBaseSalary] = useState('15000');
  const [conveyance, setConveyance] = useState('2000');
  const [medical, setMedical] = useState('1000');
  const [mobileAllowance, setMobileAllowance] = useState('500');
  const [paymentMethod, setPaymentMethod] = useState('Bank Account Deposit');

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (staffToEdit) {
      setName(staffToEdit.name);
      setStaffCode(staffToEdit.staffCode);
      setEmail(staffToEdit.email);
      setMobile(staffToEdit.mobile);
      setRole(staffToEdit.role);
      setStatus(staffToEdit.status);
      setDepartment(staffToEdit.department);
      setAssignedManager(staffToEdit.assignedManager || '');
      setJoiningDate(staffToEdit.joiningDate);
      setAvailability(staffToEdit.availability);
      setPerformanceScore(staffToEdit.performanceScore);
      setArticleshipYear(staffToEdit.articleshipYear);
    } else {
      setName('');
      setStaffCode(`EMP-0${Math.floor(100 + Math.random() * 900)}`);
      setEmail('');
      setMobile('');
      setRole('Article Student');
      setStatus('Active');
      setDepartment('Audit & Assurance');
      setAssignedManager('');
      setJoiningDate(new Date().toISOString().split('T')[0] || '');
      setAvailability('Available');
      setPerformanceScore(85);
      setArticleshipYear(1);
    }

    if (profileToEdit) {
      setPresentAddress(profileToEdit.presentAddress || '');
      setPermanentAddress(profileToEdit.permanentAddress || '');
      setEmergencyContactName(profileToEdit.emergencyContact?.name || '');
      setEmergencyContactRelation(profileToEdit.emergencyContact?.relation || '');
      setEmergencyContactPhone(profileToEdit.emergencyContact?.phone || '');
      setDateOfBirth(profileToEdit.dateOfBirth || '');
      setEducation(profileToEdit.education || '');
      setSkillsText(profileToEdit.skills?.join(', ') || '');
      setSoftwareText(profileToEdit.softwareProficiency?.join(', ') || '');
      setSpecializationText(profileToEdit.specialization?.join(', ') || '');
      setArticleshipRegNo(profileToEdit.articleshipRegNo || '');
      setArticleshipStartDate(profileToEdit.articleshipStartDate || '');
      setArticleshipExpectedEnd(profileToEdit.articleshipExpectedEnd || '');
      setPrincipalPartner(profileToEdit.principalPartner || '');
      setExamLeaveEligibility(profileToEdit.examLeaveEligibility || '');
      setCurrentWorkload(profileToEdit.currentWorkload || '0 Active Audits');
    } else {
      setPresentAddress('');
      setPermanentAddress('');
      setEmergencyContactName('');
      setEmergencyContactRelation('');
      setEmergencyContactPhone('');
      setDateOfBirth('');
      setEducation('');
      setSkillsText('');
      setSoftwareText('');
      setSpecializationText('');
      setArticleshipRegNo('');
      setArticleshipStartDate('');
      setArticleshipExpectedEnd('');
      setPrincipalPartner('A. R. Chowdhury, FCA');
      setExamLeaveEligibility('Eligible for standard study leave');
      setCurrentWorkload('0 Active Audits');
    }

    setErrors({});
    setActiveTab('personal');
  }, [staffToEdit, profileToEdit, isOpen]);

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Full name is required';
    if (!staffCode.trim()) errs.staffCode = 'Staff code is required';
    
    // Unique check (only when adding or when code has changed)
    if ((!staffToEdit || staffToEdit.staffCode !== staffCode) && existingCodes.includes(staffCode)) {
      errs.staffCode = 'Staff code must be unique in current demo data';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email';
    }

    if (!mobile.trim()) {
      errs.mobile = 'Mobile phone number is required';
    } else if (mobile.replace(/\D/g, '').length < 8) {
      errs.mobile = 'Please provide a valid mobile number';
    }

    if (!role) errs.role = 'Employment role is required';
    if (!joiningDate) errs.joiningDate = 'Joining date is required';

    // Articleship requirements
    if (role === 'Article Student') {
      if (!articleshipRegNo.trim()) errs.articleshipRegNo = 'ICAB Registration number is required for students';
      if (!articleshipStartDate) errs.articleshipStartDate = 'Articleship start date is required for students';
      if (!articleshipExpectedEnd) errs.articleshipExpectedEnd = 'Expected completion date is required for students';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please resolve the highlighted validation errors.', 'error');
      // Auto switch tabs to where the error is
      if (errs.name || errs.staffCode || errs.email || errs.mobile) {
        setActiveTab('personal');
      } else if (errs.role || errs.joiningDate) {
        setActiveTab('employment');
      } else if (errs.articleshipRegNo || errs.articleshipStartDate || errs.articleshipExpectedEnd) {
        setActiveTab('articleship');
      }
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const parsedId = staffToEdit ? staffToEdit.id : Math.floor(10 + Math.random() * 90).toString();

    const staffMember: StaffMember = {
      id: parsedId,
      staffCode: staffCode.trim(),
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      role,
      status,
      department,
      assignedManager: role !== 'Partner' ? assignedManager : undefined,
      joiningDate,
      availability,
      attendanceStatus: staffToEdit?.attendanceStatus || 'Not Checked In',
      performanceScore: Number(performanceScore) || 85,
      articleshipYear: role === 'Article Student' ? Number(articleshipYear) : undefined,
    };

    const staffProfile: StaffProfile = {
      staffId: parsedId,
      presentAddress,
      permanentAddress,
      emergencyContact: {
        name: emergencyContactName,
        relation: emergencyContactRelation,
        phone: emergencyContactPhone,
      },
      dateOfBirth,
      education,
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      softwareProficiency: softwareText.split(',').map((s) => s.trim()).filter(Boolean),
      specialization: specializationText.split(',').map((s) => s.trim()).filter(Boolean),
      articleshipRegNo: role === 'Article Student' ? articleshipRegNo : undefined,
      articleshipStartDate: role === 'Article Student' ? articleshipStartDate : undefined,
      articleshipExpectedEnd: role === 'Article Student' ? articleshipExpectedEnd : undefined,
      principalPartner: role === 'Article Student' ? principalPartner : undefined,
      examLeaveEligibility: role === 'Article Student' ? examLeaveEligibility : undefined,
      currentWorkload,
    };

    onSubmit(staffMember, staffProfile);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={staffToEdit ? `Edit Staff Member Profile: ${staffToEdit.name}` : 'Add New FAMES & R Staff Profile'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 -mx-6 px-6 pb-2.5 overflow-x-auto gap-4">
          {[
            { id: 'personal', label: 'A. Personal Information' },
            { id: 'employment', label: 'B. Employment Information' },
            { id: 'articleship', label: 'C. Articleship Information', visible: role === 'Article Student' },
            { id: 'professional', label: 'D. Skills & Specializations' },
            { id: 'compensation', label: 'E. Compensation Preview' },
          ].map((tab) => {
            if (tab.visible === false) return null;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1.5 px-1 font-semibold border-b-2 text-[11px] whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name" required error={errors.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="e.g. Adnan Chowdhury"
                />
              </FormField>

              <FormField label="Staff Code" required error={errors.staffCode}>
                <input
                  type="text"
                  value={staffCode}
                  onChange={(e) => setStaffCode(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white uppercase"
                  placeholder="e.g. EMP-020"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="name@famesr.com"
                />
              </FormField>

              <FormField label="Mobile Number" required error={errors.mobile}>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="+880-17XX-XXXXXX"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Date of Birth">
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>
              <FormField label="Education Level / Degrees">
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="e.g. BBA in Finance (DU)"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Present Address">
                <textarea
                  value={presentAddress}
                  onChange={(e) => setPresentAddress(e.target.value)}
                  rows={2}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white resize-none"
                  placeholder="Full local address..."
                />
              </FormField>
              <FormField label="Permanent Address">
                <textarea
                  value={permanentAddress}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  rows={2}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white resize-none"
                  placeholder="Full village/hometown address..."
                />
              </FormField>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-3">
              <h4 className="font-bold text-slate-800 text-[11px]">Emergency Contact Information</h4>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Contact Person Name">
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                    placeholder="e.g. Kamal Hossain"
                  />
                </FormField>
                <FormField label="Relationship">
                  <input
                    type="text"
                    value={emergencyContactRelation}
                    onChange={(e) => setEmergencyContactRelation(e.target.value)}
                    className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                    placeholder="Father, Spouse, etc."
                  />
                </FormField>
                <FormField label="Contact Mobile">
                  <input
                    type="text"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                    placeholder="+880-1XXX-XXXXXX"
                  />
                </FormField>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employment' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Official Role" required error={errors.role}>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value as any);
                    if (e.target.value === 'Article Student') {
                      setBaseSalary('15000');
                    } else if (e.target.value === 'Manager') {
                      setBaseSalary('65000');
                    } else if (e.target.value === 'Senior') {
                      setBaseSalary('45000');
                    }
                  }}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Partner">Partner</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Senior">Senior</option>
                  <option value="Article Student">Article Student</option>
                  <option value="Intern">Intern</option>
                  <option value="Accounts Officer">Accounts Officer</option>
                  <option value="Tax Officer">Tax Officer</option>
                  <option value="VAT Officer">VAT Officer</option>
                  <option value="Admin Staff">Admin Staff</option>
                </select>
              </FormField>

              <FormField label="Assigned Department" required>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Audit & Assurance">Audit & Assurance</option>
                  <option value="Tax & Compliance">Tax & Compliance</option>
                  <option value="IT & Administration">IT & Administration</option>
                  <option value="VAT Officer">VAT Officer</option>
                  <option value="Management">Management</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Joining Date" required error={errors.joiningDate}>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>

              {role !== 'Partner' && (
                <FormField label="Reporting Manager">
                  <select
                    value={assignedManager}
                    onChange={(e) => setAssignedManager(e.target.value)}
                    className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="">No Manager Assigned</option>
                    <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA (Partner)</option>
                    <option value="Kabir Hasan">Kabir Hasan (Manager)</option>
                    <option value="Nusrat Jahan">Nusrat Jahan (Senior)</option>
                  </select>
                </FormField>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField label="Employment Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Articleship Completed">Articleship Completed</option>
                  <option value="Resigned">Resigned</option>
                </select>
              </FormField>

              <FormField label="Current Availability Status">
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Available">Available</option>
                  <option value="Partially Allocated">Partially Allocated</option>
                  <option value="Fully Allocated">Fully Allocated</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Training">Training</option>
                  <option value="Examination Leave">Examination Leave</option>
                </select>
              </FormField>

              <FormField label="Assigned Workload Summary">
                <input
                  type="text"
                  value={currentWorkload}
                  onChange={(e) => setCurrentWorkload(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="e.g. 2 Active Audits"
                />
              </FormField>
            </div>

            <FormField label="Performance Baseline Score (0-100)">
              <input
                type="number"
                min="0"
                max="100"
                value={performanceScore}
                onChange={(e) => setPerformanceScore(Number(e.target.value))}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              />
            </FormField>
          </div>
        )}

        {activeTab === 'articleship' && role === 'Article Student' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="ICAB Registration Number" required error={errors.articleshipRegNo}>
                <input
                  type="text"
                  value={articleshipRegNo}
                  onChange={(e) => setArticleshipRegNo(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white uppercase"
                  placeholder="REG-ICAB-202X-XXXX"
                />
              </FormField>

              <FormField label="Current Articleship Year" required>
                <select
                  value={articleshipYear}
                  onChange={(e) => setArticleshipYear(Number(e.target.value))}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value={1}>Year 1 (Fresh Associate)</option>
                  <option value={2}>Year 2 (Intermediate)</option>
                  <option value={3}>Year 3 (Senior Student)</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Articleship Start Date" required error={errors.articleshipStartDate}>
                <input
                  type="date"
                  value={articleshipStartDate}
                  onChange={(e) => setArticleshipStartDate(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>

              <FormField label="Expected Completion Date" required error={errors.articleshipExpectedEnd}>
                <input
                  type="date"
                  value={articleshipExpectedEnd}
                  onChange={(e) => setArticleshipExpectedEnd(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Articleship Principal Partner">
                <select
                  value={principalPartner}
                  onChange={(e) => setPrincipalPartner(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA (Senior Partner)</option>
                  <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA (Partner)</option>
                  <option value="S. K. Nandy, FCA">S. K. Nandy, FCA (Partner)</option>
                </select>
              </FormField>

              <FormField label="ICAB Exam Leave Eligibility Info">
                <input
                  type="text"
                  value={examLeaveEligibility}
                  onChange={(e) => setExamLeaveEligibility(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  placeholder="e.g. Eligible for 45 days of leave in Nov 2026"
                />
              </FormField>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="space-y-4">
            <FormField label="Education Summary" helpText="Specify board/university and professional certificates.">
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                placeholder="e.g. BBA in Accounting (Dhaka University), ICAB Certificate level completed"
              />
            </FormField>

            <FormField label="Technical Audit Skills" helpText="Separate skills with commas.">
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                placeholder="Bookkeeping, Vouching, Trial Balance Reconciliation, Tax Filing"
              />
            </FormField>

            <FormField label="Accounting Software Proficiency" helpText="Separate entries with commas.">
              <input
                type="text"
                value={softwareText}
                onChange={(e) => setSoftwareText(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                placeholder="TallyPrime, QuickBooks, Caseware, Excel Advanced, Xero"
              />
            </FormField>

            <FormField label="Specialization Areas" helpText="Separate areas with commas.">
              <input
                type="text"
                value={specializationText}
                onChange={(e) => setSpecializationText(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                placeholder="Corporate Tax Calculations, VAT Auditing, Company Incorporations"
              />
            </FormField>
          </div>
        )}

        {activeTab === 'compensation' && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
              <h4 className="font-bold text-slate-800 text-[11px] mb-1">Financial Disclaimer Notice</h4>
              <p className="text-[10px] text-slate-500 leading-normal">
                This compensation and payroll structural overview is for demo simulation purposes only. No actual accounting ledger updates, bank instructions, or tax deductions are transacted upon submission.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Base Monthly Salary / Stipend (BDT)">
                <input
                  type="number"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>

              <FormField label="Effective Date">
                <input
                  type="date"
                  value={joiningDate}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                  disabled
                />
              </FormField>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormField label="Conveyance Allowance">
                <input
                  type="number"
                  value={conveyance}
                  onChange={(e) => setConveyance(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>

              <FormField label="Medical Allowance">
                <input
                  type="number"
                  value={medical}
                  onChange={(e) => setMedical(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>

              <FormField label="Mobile Allowance">
                <input
                  type="number"
                  value={mobileAllowance}
                  onChange={(e) => setMobileAllowance(e.target.value)}
                  className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
                />
              </FormField>
            </div>

            <FormField label="Payment Method Placeholder">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Bank Transfer (EFT)">Bank Transfer (EFT)</option>
                <option value="Bank Account Deposit">Bank Account Deposit</option>
                <option value="Cash Disbursement">Cash Disbursement (Office Petty Cash)</option>
              </select>
            </FormField>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {activeTab !== 'personal' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'employment') setActiveTab('personal');
                  else if (activeTab === 'articleship') setActiveTab('employment');
                  else if (activeTab === 'professional') setActiveTab(role === 'Article Student' ? 'articleship' : 'employment');
                  else if (activeTab === 'compensation') setActiveTab('professional');
                }}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Previous Section
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            
            {activeTab !== 'compensation' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'personal') setActiveTab('employment');
                  else if (activeTab === 'employment') setActiveTab(role === 'Article Student' ? 'articleship' : 'professional');
                  else if (activeTab === 'articleship') setActiveTab('professional');
                  else if (activeTab === 'professional') setActiveTab('compensation');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
              >
                Next Section
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs transition-colors"
              >
                {staffToEdit ? 'Save Changes' : 'Add Staff Member'}
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
