import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useToast } from '../../components/ui';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Form states
  const [activeTab, setActiveTab] = useState<'login' | 'request'>('login');
  const [email, setEmail] = useState('manager.fames@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // In mock it is unchecked initially
  const [isLoading, setIsLoading] = useState(false);

  // Request Access states
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestRole, setRequestRole] = useState('Manager');
  const [requestReason, setRequestReason] = useState('');

  // Auto-fill credentials if they click the partner badge
  const handleFillPartnerCredentials = () => {
    setEmail('shafi@fames.com');
    setPassword('shafi001fca');
    setActiveTab('login');
    showToast('Pre-filled partner credentials for Mr. Shafi Uddin Ahmed.', 'success');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both workspace ID/email and password.', 'warning');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating animation
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('fames_pro_logged_in', 'true');
      localStorage.setItem('fames_pro_user_email', email);
      
      // Store user details based on who logged in
      if (email.includes('shafi')) {
        localStorage.setItem('fames_pro_user_name', 'Mr. Shafi Uddin Ahmed, FCA');
        localStorage.setItem('fames_pro_user_role', 'Partner');
      } else {
        localStorage.setItem('fames_pro_user_name', 'A. R. Chowdhury, FCA');
        localStorage.setItem('fames_pro_user_role', 'Partner');
      }

      showToast('Authenticated successfully! Welcome to FAMES & R Office PRO.', 'success');
      navigate('/dashboard');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    showToast('Redirecting to Google secure workspace directory...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('fames_pro_logged_in', 'true');
      localStorage.setItem('fames_pro_user_email', 'manager.fames@gmail.com');
      localStorage.setItem('fames_pro_user_name', 'A. R. Chowdhury, FCA');
      localStorage.setItem('fames_pro_user_role', 'Partner');
      showToast('Logged in via Google Workspace.', 'success');
      navigate('/dashboard');
    }, 1000);
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestEmail || !requestReason) {
      showToast('Please fill in all requested fields for access setup.', 'warning');
      return;
    }
    showToast(`Access request submitted for "${requestName}". An admin will review it shortly.`, 'success');
    setActiveTab('login');
    // Clear fields
    setRequestName('');
    setRequestEmail('');
    setRequestReason('');
  };

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('fames_pro_logged_in') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans">
      
      {/* LEFT COLUMN: BRAND PROMOTION & ACCENT DETAILS */}
      <div 
        className="w-full md:w-[50%] p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden shrink-0 text-white"
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0e4c76 50%, #126f9e 100%)',
        }}
      >
        {/* Subtle grid elements / ambient overlays */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.35) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-transparent pointer-events-none z-0" />

        {/* Top bar */}
        <div className="relative z-10 flex flex-col gap-1.5 animate-fade-in">
          <h2 className="text-[20px] font-extrabold tracking-wider text-white uppercase leading-none">
            FAMES & R Office PRO
          </h2>
          <p className="text-[9px] font-bold tracking-[0.18em] text-teal-300 uppercase leading-none opacity-90 mt-1">
            INTERNAL WORKSPACE FOR FAMES & R CHARTERED ACCOUNTANTS
          </p>
        </div>

        {/* Center content */}
        <div className="relative z-10 my-12 md:my-auto space-y-6">
          <h1 className="text-3xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.15] animate-slide-in">
            AI–Powered Internal Workspace for Modern <br /> CA Firms.
          </h1>
          <p className="text-xs lg:text-[13px] text-slate-100/90 leading-relaxed max-w-lg font-medium">
            Manage audit, tax, VAT, RJSC compliance, client workflow, team collaboration and firm operations from one secure intelligent platform.
          </p>

          {/* Badge groups */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Audit Workspace',
              'Tax & VAT',
              'RJSC Compliance',
              'Client Management',
              'Team Collaboration',
              'AI Workflow',
            ].map((badge) => (
              <span 
                key={badge} 
                className="px-3.5 py-1.5 rounded-full text-[10.5px] font-semibold bg-[#0e304f]/60 text-white/95 border border-white/10 backdrop-blur-xs shadow-xs hover:bg-[#0e304f]/80 transition-all cursor-default select-none"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Executive Workspace Card */}
          <div className="bg-[#052642]/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md max-w-lg shadow-inner mt-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
              <h3 className="text-[10px] font-bold tracking-wider text-teal-400 uppercase">
                EXECUTIVE WORKSPACE
              </h3>
            </div>
            <p className="text-[11.5px] text-slate-200/90 leading-relaxed font-medium">
              This workspace is operated by <span className="font-bold text-white">Shafi Uddin Ahmed, FCA</span> and his professional team for secure, smart and role-based firm operations.
            </p>
          </div>
        </div>

        {/* Left column footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[9.5px] font-extrabold text-slate-300 uppercase tracking-widest select-none">
            <span>Secure Workspace</span>
            <span className="w-1 h-1 bg-teal-400 rounded-full" />
            <span>Internal Access Only</span>
            <span className="w-1 h-1 bg-teal-400 rounded-full" />
            <span>Role-Based Access</span>
          </div>
          <p className="text-[9.5px] text-slate-400 font-semibold">
            © 2026 FAMES & R — Internal professional use only
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: LOGIN FORM & PARTNER PORTAL DETAILS */}
      <div className="w-full md:grow bg-[#f8fafc] p-6 md:p-12 lg:p-16 flex flex-col justify-center items-center relative overflow-y-auto">
        
        <div className="max-w-[430px] w-full space-y-6">
          
          {/* FLOATING VIP / PARTNER WORKSPACE ACCESS CARD */}
          <button 
            type="button"
            onClick={handleFillPartnerCredentials}
            className="w-full text-left bg-white border border-slate-100 rounded-2xl shadow-xs p-4 border-l-4 border-amber-500 hover:border-amber-600 hover:shadow-sm transition-all duration-300 flex items-center justify-between group active:scale-99"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] font-extrabold tracking-widest text-emerald-500 uppercase block">
                PARTNER WORKSPACE ACCESS
              </span>
              <span className="text-xs lg:text-[14px] font-black text-slate-800 block group-hover:text-amber-650 transition-colors">
                Mr. SHAFI UDDIN AHMED FCA
              </span>
              <span className="text-[10px] text-slate-500 block font-medium">
                Login ID: <span className="font-mono text-slate-650 font-bold bg-slate-50 px-1 py-0.5 rounded">Shafi@<span className="line-through text-slate-400">001</span></span> • Full Authority
              </span>
            </div>
            <span className="bg-[#0c2340] text-amber-400 text-[9px] font-extrabold px-2.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start shadow-xs">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              VIP - FCA
            </span>
          </button>

          {/* MAIN LOGIN CARD */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            
            {/* Header & Badges */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-black text-slate-900 tracking-tight">
                    Secure Workspace Login
                  </h2>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                    Access your approved internal workspace.
                  </p>
                </div>
              </div>
              
              {/* Pill badge showing Secure Internal Access Only */}
              <div className="inline-flex items-center gap-1.5 bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-md text-[11px] font-bold text-blue-600 w-fit">
                <Icons.ShieldCheck className="w-3.5 h-3.5" />
                Secure Internal Access Only
              </div>
            </div>

            {/* TAB SELECTOR TRACK */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`w-1/2 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-400 hover:text-slate-800'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('request')}
                className={`w-1/2 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'request'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-400 hover:text-slate-800'
                }`}
              >
                Request Access
              </button>
            </div>

            {/* TAB CONTENT: LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    WORKSPACE ID OR EMAIL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. manager.fames@gmail.com"
                      className="w-full px-4 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••"
                      className="w-full pl-4 pr-10 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-hidden"
                    >
                      {showPassword ? (
                        <Icons.EyeOff className="w-4 h-4" />
                      ) : (
                        <Icons.Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center gap-2 cursor-pointer select-none text-slate-650 font-semibold text-xs text-left"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      rememberMe 
                        ? 'border-sky-600 bg-sky-600 text-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {rememberMe && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span>Remember me on this device</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Credential recovery utility initiated. Check default system email.', 'info')}
                    className="text-slate-500 hover:text-slate-800 font-semibold hover:underline shrink-0"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1570b7] hover:bg-[#115b96] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <>
                      <Icons.Loader2 className="w-4 h-4 animate-spin" />
                      Securing Environment Connection...
                    </>
                  ) : (
                    "Enter Workspace"
                  )}
                </button>
              </form>
            )}

            {/* TAB CONTENT: REQUEST ACCESS FORM */}
            {activeTab === 'request' && (
              <form onSubmit={handleRequestAccess} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    E-mail Address
                  </label>
                  <input
                    type="email"
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="e.g. name@fames.com"
                    className="w-full px-4 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    Expected Workspace Role
                  </label>
                  <select
                    value={requestRole}
                    onChange={(e) => setRequestRole(e.target.value)}
                    className="w-full px-4 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="Partner">Partner / FCA</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff Auditor">Staff Auditor</option>
                    <option value="Client Admin">Client Representative</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                    Reason for Access
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Specify project, client audit unit, or supervisor name..."
                    className="w-full px-4 py-3 bg-[#eef4fc]/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-850 focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:bg-white transition-all resize-none animate-fade-in"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0c2340] hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98"
                >
                  Submit Access Request
                </button>
              </form>
            )}

            {/* OR CONTINUE WITH separator */}
            <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-400 tracking-widest uppercase select-none">
              <div className="grow h-px bg-slate-100" />
              <span>OR CONTINUE WITH</span>
              <div className="grow h-px bg-slate-100" />
            </div>

            {/* Google Authentication Option */}
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white border border-slate-150 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            {/* User guide and Help */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-bold pt-2 border-t border-slate-100 select-none">
              <button
                type="button"
                onClick={() => showToast('Opening internal user manual handbook...', 'info')}
                className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
              >
                <Icons.FileText className="w-4 h-4 text-slate-400" />
                User Guide
              </button>
              <button
                type="button"
                onClick={() => showToast('Routing connection to IT Help Desk...', 'info')}
                className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
              >
                <Icons.HelpCircle className="w-4 h-4 text-slate-400" />
                Help
              </button>
            </div>

          </div>

          {/* Subtitle / Footer */}
          <p className="text-center text-[10.5px] font-medium text-slate-450 leading-relaxed max-w-sm mx-auto select-none">
            Role-based access for Partners, Managers, Students and Clients — Contact System Admin.
          </p>

        </div>

      </div>

    </div>
  );
};
