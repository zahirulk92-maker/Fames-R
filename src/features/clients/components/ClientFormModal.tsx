import React, { useState, useEffect } from 'react';
import { Client, ClientContact } from '../../../types/clients';
import { Modal } from '../../../components/ui';
import { Sparkles, Save, AlertCircle } from 'lucide-react';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: Omit<Client, 'id' | 'lastActivity'>) => void;
  editingClient?: Client | null;
  existingClients: Client[];
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingClient,
  existingClients,
}) => {
  // Tabs inside form for visual cleanliness and compact bento layout
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'tax' | 'contact' | 'services' | 'portal'>('basic');
  
  // State variables for form fields
  const [name, setName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<Client['type']>('Private Limited Company');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [incorporationDate, setIncorporationDate] = useState('');
  const [financialYearEnd, setFinancialYearEnd] = useState('June 30');
  const [industry, setIndustry] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');

  // Tax & Regulatory
  const [tin, setTin] = useState('');
  const [bin, setBin] = useState('');
  const [vatCircle, setVatCircle] = useState('');
  const [taxCircle, setTaxCircle] = useState('');
  const [rjscRegistrationNumber, setRjscRegistrationNumber] = useState('');
  const [regulatoryBody, setRegulatoryBody] = useState('');
  const [listedStatus, setListedStatus] = useState<'Listed' | 'Unlisted'>('Unlisted');

  // Contact Info
  const [contactName, setContactName] = useState('');
  const [contactDesignation, setContactDesignation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAltPhone, setContactAltPhone] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<ClientContact['preferredMethod']>('Email');
  const [officeAddress, setOfficeAddress] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [website, setWebsite] = useState('');

  // Service Relationship
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [assignedPartner, setAssignedPartner] = useState('A. R. Chowdhury, FCA');
  const [assignedManager, setAssignedManager] = useState('');
  const [assignedSenior, setAssignedSenior] = useState('');
  const [engagementStartDate, setEngagementStartDate] = useState('');
  const [status, setStatus] = useState<Client['status']>('Active');

  // Portal Preparation
  const [portalRequired, setPortalRequired] = useState(false);
  const [portalContactEmail, setPortalContactEmail] = useState('');
  const [portalRolePlaceholder, setPortalRolePlaceholder] = useState('Client Admin');

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load editing client if provided
  useEffect(() => {
    if (editingClient) {
      setName(editingClient.name);
      setTradingName(editingClient.tradingName || '');
      setCode(editingClient.code);
      setType(editingClient.type);
      setRegistrationNumber(editingClient.registrationNumber || '');
      setIncorporationDate(editingClient.incorporationDate || '');
      setFinancialYearEnd(editingClient.financialYearEnd);
      setIndustry(editingClient.industry || '');
      setBusinessDescription(editingClient.businessDescription || '');

      setTin(editingClient.tin || '');
      setBin(editingClient.bin || '');
      setVatCircle(editingClient.vatCircle || '');
      setTaxCircle(editingClient.taxCircle || '');
      setRjscRegistrationNumber(editingClient.rjscRegistrationNumber || '');
      setRegulatoryBody(editingClient.regulatoryBody || '');
      setListedStatus(editingClient.listedStatus || 'Unlisted');

      setContactName(editingClient.primaryContact.name);
      setContactDesignation(editingClient.primaryContact.designation);
      setContactPhone(editingClient.primaryContact.phone);
      setContactEmail(editingClient.primaryContact.email);
      setContactAltPhone(editingClient.primaryContact.altPhone || '');
      setPreferredMethod(editingClient.primaryContact.preferredMethod);
      setOfficeAddress(editingClient.officeAddress || '');
      setRegisteredAddress(editingClient.registeredAddress || '');
      setWebsite(editingClient.website || '');

      setSelectedServices(editingClient.services);
      setAssignedPartner(editingClient.assignedPartner);
      setAssignedManager(editingClient.assignedManager || '');
      setAssignedSenior(editingClient.assignedSenior || '');
      setEngagementStartDate(editingClient.engagementStartDate || '');
      setStatus(editingClient.status);

      setPortalRequired(editingClient.portalRequired);
      setPortalContactEmail(editingClient.portalContactEmail || '');
      setPortalRolePlaceholder(editingClient.portalRolePlaceholder || 'Client Admin');
    } else {
      // Reset to defaults
      setName('');
      setTradingName('');
      setCode('');
      setType('Private Limited Company');
      setRegistrationNumber('');
      setIncorporationDate('');
      setFinancialYearEnd('June 30');
      setIndustry('');
      setBusinessDescription('');
      setTin('');
      setBin('');
      setVatCircle('');
      setTaxCircle('');
      setRjscRegistrationNumber('');
      setRegulatoryBody('');
      setListedStatus('Unlisted');
      setContactName('');
      setContactDesignation('');
      setContactPhone('');
      setContactEmail('');
      setContactAltPhone('');
      setPreferredMethod('Email');
      setOfficeAddress('');
      setRegisteredAddress('');
      setWebsite('');
      setSelectedServices([]);
      setAssignedPartner('A. R. Chowdhury, FCA');
      setAssignedManager('');
      setAssignedSenior('');
      setEngagementStartDate('');
      setStatus('Active');
      setPortalRequired(false);
      setPortalContactEmail('');
      setPortalRolePlaceholder('Client Admin');
    }
    setErrors({});
    setActiveFormTab('basic');
  }, [editingClient, isOpen]);

  // Sync portal email with contact email
  useEffect(() => {
    if (!editingClient && portalRequired && !portalContactEmail) {
      setPortalContactEmail(contactEmail);
    }
  }, [portalRequired, contactEmail, editingClient, portalContactEmail]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Client Name Required
    if (!name.trim()) {
      newErrors.name = 'Client Registered Name is required';
    }

    // 2. Client Code Required
    if (!code.trim()) {
      newErrors.code = 'Client Code is required';
    } else {
      // Unique Code validation (excluding the current editing client)
      const isDuplicate = existingClients.some(
        c => c.code.toUpperCase() === code.trim().toUpperCase() && c.id !== editingClient?.id
      );
      if (isDuplicate) {
        newErrors.code = `Client Code "${code.toUpperCase()}" is already assigned to another client`;
      }
    }

    // 3. Email validation
    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Primary contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email format';
    }

    // 4. Phone validation
    if (!contactPhone.trim()) {
      newErrors.contactPhone = 'Primary contact phone is required';
    } else if (contactPhone.length < 5) {
      newErrors.contactPhone = 'Please provide a valid phone number';
    }

    // 5. Financial Year End Required
    if (!financialYearEnd.trim()) {
      newErrors.financialYearEnd = 'Financial Year End is required';
    }

    // 6. At least one service required
    if (selectedServices.length === 0) {
      newErrors.services = 'At least one service relationship must be selected';
    }

    // 7. TIN Text Validation Placeholder
    if (tin && !/^\d+$/.test(tin.replace(/\s|-/g, ''))) {
      newErrors.tin = 'TIN must contain numeric characters only';
    }

    // 8. BIN Text Validation Placeholder
    if (bin && !/^\d+$/.test(bin.replace(/\s|-/g, ''))) {
      newErrors.bin = 'BIN must contain numeric characters only';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      // Jump to first tab with error to assist user
      if (errors.name || errors.code || errors.financialYearEnd) {
        setActiveFormTab('basic');
      } else if (errors.tin || errors.bin) {
        setActiveFormTab('tax');
      } else if (errors.contactEmail || errors.contactPhone) {
        setActiveFormTab('contact');
      } else if (errors.services) {
        setActiveFormTab('services');
      }
      return;
    }

    setIsSubmitting(true);
    
    // Construct the structured Client payload
    const payload: Omit<Client, 'id' | 'lastActivity'> = {
      name: name.trim(),
      tradingName: tradingName.trim() || undefined,
      code: code.trim().toUpperCase(),
      type,
      registrationNumber: registrationNumber.trim() || undefined,
      incorporationDate: incorporationDate || undefined,
      financialYearEnd,
      industry: industry.trim() || undefined,
      businessDescription: businessDescription.trim() || undefined,
      tin: tin.trim() || undefined,
      bin: bin.trim() || undefined,
      vatCircle: vatCircle.trim() || undefined,
      taxCircle: taxCircle.trim() || undefined,
      rjscRegistrationNumber: rjscRegistrationNumber.trim() || undefined,
      regulatoryBody: regulatoryBody.trim() || undefined,
      listedStatus,
      primaryContact: {
        name: contactName.trim(),
        designation: contactDesignation.trim(),
        email: contactEmail.trim().toLowerCase(),
        phone: contactPhone.trim(),
        altPhone: contactAltPhone.trim() || undefined,
        preferredMethod,
      },
      additionalContacts: editingClient?.additionalContacts || [],
      officeAddress: officeAddress.trim() || undefined,
      registeredAddress: registeredAddress.trim() || undefined,
      website: website.trim() || undefined,
      services: selectedServices,
      assignedPartner,
      assignedManager: assignedManager || undefined,
      assignedSenior: assignedSenior || undefined,
      engagementStartDate: engagementStartDate || undefined,
      portalRequired,
      portalContactEmail: portalRequired ? (portalContactEmail || contactEmail).trim().toLowerCase() : undefined,
      portalRolePlaceholder: portalRequired ? portalRolePlaceholder : undefined,
      portalStatus: portalRequired 
        ? (editingClient?.portalStatus !== 'Not Invited' ? editingClient?.portalStatus || 'Invitation Prepared' : 'Invitation Prepared')
        : 'Not Invited',
      status,
    };

    // Simulate small latency for UX polish
    setTimeout(() => {
      onSubmit(payload);
      setIsSubmitting(false);
    }, 400);
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingClient ? `Edit Client: ${editingClient.name}` : 'Register Corporate Client'}
      size="xl"
    >
      <div className="flex flex-col h-full max-h-[80vh]" id="client-form-modal-inner">
        {/* Tab Navigation for high-density forms */}
        <div className="flex border-b border-slate-150 overflow-x-auto whitespace-nowrap bg-slate-50/50 p-1 rounded-t-lg">
          <button
            type="button"
            onClick={() => setActiveFormTab('basic')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFormTab === 'basic' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setActiveFormTab('tax')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFormTab === 'tax' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Tax & Regulatory
          </button>
          <button
            type="button"
            onClick={() => setActiveFormTab('contact')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFormTab === 'contact' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Contacts & Addresses
          </button>
          <button
            type="button"
            onClick={() => setActiveFormTab('services')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFormTab === 'services' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Relationship & Services
          </button>
          <button
            type="button"
            onClick={() => setActiveFormTab('portal')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFormTab === 'portal' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Portal Access Prep
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
          
          {/* NOTICE: Frontend Simulation Badges */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-850">Local Frontend Workspace Mode</span>
              <p className="text-[10px] text-slate-500">
                Changes made in this form will be stored in your browser's temporary session and reset upon page refresh. No physical backend queries or external authentications will trigger.
              </p>
            </div>
          </div>

          {/* Form Tab Sections */}
          {activeFormTab === 'basic' && (
            <div className="space-y-4" id="form-section-basic">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="font-semibold text-slate-700 block">Registered Client Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden ${errors.name ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-slate-200 focus:ring-1 focus:ring-slate-400'}`}
                    placeholder="e.g. Acme Industries Ltd."
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                  />
                  {errors.name && <span className="text-rose-600 font-medium block text-[10px]">{errors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Trading Name (Optional)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    placeholder="e.g. Acme Group"
                    value={tradingName}
                    onChange={(e) => setTradingName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Client Unique Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    className={`w-full p-2.5 border rounded-lg bg-white uppercase font-mono focus:outline-hidden ${errors.code ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-slate-200 focus:ring-1 focus:ring-slate-400'}`}
                    placeholder="e.g. ACM-01"
                    value={code}
                    disabled={!!editingClient} // Lock code in edit mode for consistency
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (errors.code) setErrors(prev => ({ ...prev, code: '' }));
                    }}
                  />
                  {errors.code && <span className="text-rose-600 font-medium block text-[10px]">{errors.code}</span>}
                  <p className="text-[10px] text-slate-400">Must be a unique code identifier for audit ledger linking.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Entity Type <span className="text-rose-500">*</span></label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
                    value={type}
                    onChange={(e) => setType(e.target.value as Client['type'])}
                  >
                    <option value="Private Limited Company">Private Limited Company</option>
                    <option value="Public Limited Company">Public Limited Company</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="NGO">NGO</option>
                    <option value="Trust">Trust</option>
                    <option value="Association">Association</option>
                    <option value="Individual">Individual</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Financial Year End <span className="text-rose-500">*</span></label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400 cursor-pointer text-slate-700"
                    value={financialYearEnd}
                    onChange={(e) => setFinancialYearEnd(e.target.value)}
                  >
                    <option value="June 30">June 30 (Traditional)</option>
                    <option value="December 31">December 31 (Calendar)</option>
                    <option value="March 31">March 31 (Quarterly Variant)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Registration/Incorporation Number</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    placeholder="e.g. C-10294/2018"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Incorporation Date</label>
                  <input
                    type="date"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400 text-slate-700"
                    value={incorporationDate}
                    onChange={(e) => setIncorporationDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="font-semibold text-slate-700 block">Industry Sectors</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. Information Technology, Food assembly"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="font-semibold text-slate-700 block">Business Description Overview</label>
                  <textarea
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden h-20"
                    placeholder="Provide a general summary of client's key operations..."
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeFormTab === 'tax' && (
            <div className="space-y-4" id="form-section-tax">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Tax Identification Number (TIN)</label>
                  <input
                    type="text"
                    className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden ${errors.tin ? 'border-rose-400' : 'border-slate-200'}`}
                    placeholder="12-digit numeric TIN (e.g. 102938475612)"
                    value={tin}
                    onChange={(e) => {
                      setTin(e.target.value);
                      if (errors.tin) setErrors(prev => ({ ...prev, tin: '' }));
                    }}
                  />
                  {errors.tin && <span className="text-rose-600 font-medium block text-[10px]">{errors.tin}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Business Identification Number (BIN)</label>
                  <input
                    type="text"
                    className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden ${errors.bin ? 'border-rose-400' : 'border-slate-200'}`}
                    placeholder="11-digit BIN (e.g. 00010293402)"
                    value={bin}
                    onChange={(e) => {
                      setBin(e.target.value);
                      if (errors.bin) setErrors(prev => ({ ...prev, bin: '' }));
                    }}
                  />
                  {errors.bin && <span className="text-rose-600 font-medium block text-[10px]">{errors.bin}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">VAT Circle Office</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. Circle-2 (Tejgaon)"
                    value={vatCircle}
                    onChange={(e) => setVatCircle(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Tax Circle Office</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. Circle-11 (LTU)"
                    value={taxCircle}
                    onChange={(e) => setTaxCircle(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">RJSC Entity Registration Code</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. REG-98124C"
                    value={rjscRegistrationNumber}
                    onChange={(e) => setRjscRegistrationNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Primary Regulatory Body</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. NBR, RJSC, BSEC"
                    value={regulatoryBody}
                    onChange={(e) => setRegulatoryBody(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">BSEC Exchange Listed Status</label>
                  <div className="flex gap-4 p-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={listedStatus === 'Unlisted'}
                        onChange={() => setListedStatus('Unlisted')}
                        className="cursor-pointer"
                      />
                      <span>Unlisted Company</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={listedStatus === 'Listed'}
                        onChange={() => setListedStatus('Listed')}
                        className="cursor-pointer"
                      />
                      <span>Exchange Listed PLC</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFormTab === 'contact' && (
            <div className="space-y-4" id="form-section-contact">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-150 space-y-4">
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">Primary Client Representative</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Contact Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                      placeholder="e.g. Tanvir Hossain"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Designation <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                      placeholder="e.g. Chief Financial Officer"
                      value={contactDesignation}
                      onChange={(e) => setContactDesignation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Mobile Phone <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden ${errors.contactPhone ? 'border-rose-400' : 'border-slate-200'}`}
                      placeholder="e.g. +880-1711-234567"
                      value={contactPhone}
                      onChange={(e) => {
                        setContactPhone(e.target.value);
                        if (errors.contactPhone) setErrors(prev => ({ ...prev, contactPhone: '' }));
                      }}
                    />
                    {errors.contactPhone && <span className="text-rose-600 font-medium block text-[10px]">{errors.contactPhone}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Business Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden ${errors.contactEmail ? 'border-rose-400' : 'border-slate-200'}`}
                      placeholder="e.g. cfo@apexholdings.com"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        if (errors.contactEmail) setErrors(prev => ({ ...prev, contactEmail: '' }));
                      }}
                    />
                    {errors.contactEmail && <span className="text-rose-600 font-medium block text-[10px]">{errors.contactEmail}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Alternative Phone (Optional)</label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                      placeholder="e.g. +880-2-9812345"
                      value={contactAltPhone}
                      onChange={(e) => setContactAltPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Preferred Correspondence Method</label>
                    <select
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700 cursor-pointer"
                      value={preferredMethod}
                      onChange={(e) => setPreferredMethod(e.target.value as ClientContact['preferredMethod'])}
                    >
                      <option value="Email">Email Only</option>
                      <option value="Phone">Direct Phone Call</option>
                      <option value="WhatsApp">WhatsApp Message</option>
                      <option value="In-Person">In-Person Meeting</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Corporate Web URL</label>
                  <input
                    type="url"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="https://www.example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Corporate Head Office Address</label>
                  <textarea
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden h-14"
                    placeholder="Plot & Road addresses..."
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Registered Address (Factory / Legal)</label>
                  <textarea
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden h-14"
                    placeholder="Factory/legal incorporation address..."
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeFormTab === 'services' && (
            <div className="space-y-4" id="form-section-services">
              <div className="space-y-2">
                <label className="font-bold text-slate-800 block">Select Active Relationship Engagements <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-slate-50 p-4 rounded-lg border border-slate-150">
                  {servicesList.map((service) => (
                    <label 
                      key={service} 
                      className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${
                        selectedServices.includes(service) 
                          ? 'bg-white border-slate-800 text-slate-850 font-bold shadow-2xs' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded-sm border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && <span className="text-rose-600 font-semibold block text-[10px]">{errors.services}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Lead Engagement Partner</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700 cursor-pointer"
                    value={assignedPartner}
                    onChange={(e) => setAssignedPartner(e.target.value)}
                  >
                    <option value="A. R. Chowdhury, FCA">A. R. Chowdhury, FCA</option>
                    <option value="M. F. Ahmed, FCA">M. F. Ahmed, FCA</option>
                    <option value="S. K. Nandy, FCA">S. K. Nandy, FCA</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Assigned Engagement Manager (Optional)</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700 cursor-pointer"
                    value={assignedManager}
                    onChange={(e) => setAssignedManager(e.target.value)}
                  >
                    <option value="">No Manager Assigned</option>
                    <option value="Kabir Hasan">Kabir Hasan (Manager)</option>
                    <option value="Nusrat Jahan">Nusrat Jahan (Senior)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Assigned Lead Senior/Student (Optional)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                    placeholder="e.g. Tahmid Rahman"
                    value={assignedSenior}
                    onChange={(e) => setAssignedSenior(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">Relationship Start Date</label>
                  <input
                    type="date"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700"
                    value={engagementStartDate}
                    onChange={(e) => setEngagementStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="font-semibold text-slate-700 block">Relationship Status</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700 cursor-pointer"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Client['status'])}
                  >
                    <option value="Active">Active Relationship</option>
                    <option value="Pending Onboarding">Pending Onboarding</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Archived">Archived & Retained</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeFormTab === 'portal' && (
            <div className="space-y-4" id="form-section-portal">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-150 space-y-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={portalRequired}
                    onChange={(e) => {
                      setPortalRequired(e.target.checked);
                      if (e.target.checked) {
                        setPortalStatus('Invitation Prepared');
                      } else {
                        setPortalStatus('Not Invited');
                      }
                    }}
                    className="rounded-sm border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800">Prepare Client Portal Access Credentials</span>
                    <p className="text-[10px] text-slate-500">
                      If checked, this client representative will be added to the portal configuration pipeline for file exchanges and secure tax document uploading.
                    </p>
                  </div>
                </label>

                {portalRequired && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Portal User Invitation Email</label>
                      <input
                        type="email"
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden"
                        placeholder="e.g. cfo@apexholdings.com"
                        value={portalContactEmail}
                        onChange={(e) => setPortalContactEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Default Portal Role Access</label>
                      <select
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden text-slate-700 cursor-pointer"
                        value={portalRolePlaceholder}
                        onChange={(e) => setPortalRolePlaceholder(e.target.value)}
                      >
                        <option value="Client Admin">Client Admin (Full Org Management)</option>
                        <option value="Finance Contact">Finance Contact (Billing & Tax Schedules)</option>
                        <option value="Document Contributor">Document Contributor (Uploads Only)</option>
                        <option value="Read Only">Read Only (Review & Download Reports)</option>
                        <option value="Management Contact">Management Contact (Signoffs)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-100 inline-block">
                        Authentication Integration Pending • No real activation email will be triggered
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <div>
              {Object.keys(errors).length > 0 && (
                <span className="text-rose-600 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Validation errors present. Please review basic or contact tabs.</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingClient ? 'Save Changes' : 'Register Corporate Client'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
