import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { useToast } from '../ui';

// ==========================================
// 1. AppShell Component (Main Layout Wrapper)
// ==========================================
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex font-sans antialiased">
      {/* Sidebar - Desktop (hidden on mobile, fixed width w-64) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0d1726] text-slate-300 border-r border-[#1e293b]/50 shrink-0 h-screen sticky top-0 select-none">
        <Sidebar />
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sliding drawer content */}
          <div className="relative flex flex-col w-64 bg-[#0d1726] text-slate-300 h-full z-10 border-r border-[#1e293b]/50 animate-slide-in">
            <div className="absolute top-4 right-4 z-20 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1a293e] focus:outline-hidden"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Side Content Area */}
      <div className="grow flex flex-col min-w-0 bg-[#f4f7fa]">
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="grow overflow-y-auto px-4 md:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          <Breadcrumbs />
          <ContentContainer>{children}</ContentContainer>
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 2. Sidebar Component
// ==========================================
export const Sidebar: React.FC<{ onItemClick?: () => void }> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const sections = [
    'DASHBOARD',
    'CLIENT MANAGEMENT',
    'STUDENT & STAFF MANAGEMENT',
    'JOBS & OPERATIONS',
    'AUDIT WORKFLOW',
    'COMPLIANCE',
    'ADMINISTRATION'
  ] as const;

  const handleSignOut = () => {
    localStorage.removeItem('fames_pro_logged_in');
    localStorage.removeItem('fames_pro_user_email');
    localStorage.removeItem('fames_pro_user_name');
    localStorage.removeItem('fames_pro_user_role');
    showToast('Logged out of secure workspace.', 'info');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0d1726]">
      {/* Brand / Logo */}
      <div className="h-18 flex items-center px-5 border-b border-[#18283d] shrink-0 gap-3">
        <div className="w-9 h-9 bg-[#172c47] text-white rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20 shadow-xs">
          <Icons.Building2 className="w-5 h-5 text-blue-400" />
        </div>
        <div className="min-w-0">
          <h1 className="font-extrabold text-sm text-white tracking-wide leading-tight">FAMES & R</h1>
          <p className="text-[11px] font-bold text-slate-200 leading-tight">Office PRO</p>
          <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">CHARTERED ACCOUNTANTS</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="grow overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
        {sections.map((section) => {
          const items = NAVIGATION_ITEMS.filter((item) => item.section === section && item.enabled);
          if (items.length === 0) return null;

          return (
            <SidebarSection key={section} title={section}>
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  label={item.label}
                  route={item.route}
                  icon={item.icon}
                  badge={item.badge}
                  onClick={onItemClick}
                />
              ))}
            </SidebarSection>
          );
        })}
      </nav>

      {/* Sidebar Footer User Section */}
      <div className="p-4 border-t border-[#18283d] bg-[#09101c] shrink-0 space-y-2">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-slate-300 truncate">manager.fames@gmail.com</p>
          <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase block">
            SUPER ADMIN
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white pt-1 transition-colors group"
        >
          <Icons.LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. SidebarSection Component
// ==========================================
export const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-1">
      <h3 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5 select-none opacity-80">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
};

// ==========================================
// 4. SidebarItem Component
// ==========================================
export interface SidebarItemProps {
  label: string;
  route: string;
  icon: string;
  badge?: string | number;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  route,
  icon,
  badge,
  onClick,
}) => {
  const IconComponent = (Icons as any)[icon] || Icons.HelpCircle;

  return (
    <NavLink
      to={route}
      end={route === '/dashboard'}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
          isActive
            ? 'bg-[#172a45] text-white shadow-xs font-bold'
            : 'text-slate-300 hover:bg-[#132238] hover:text-white'
        }`
      }
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <IconComponent className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
        <span className="truncate">{label}</span>
      </div>
      {badge !== undefined && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#1e324d] text-slate-200 border border-slate-700/50">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

// ==========================================
// 5. TopHeader Component
// ==========================================
export const TopHeader: React.FC<{ onOpenMobileMenu: () => void }> = ({ onOpenMobileMenu }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      showToast(`Global Search triggered for: "${searchValue}"`, 'info');
    }
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    localStorage.removeItem('fames_pro_logged_in');
    localStorage.removeItem('fames_pro_user_email');
    localStorage.removeItem('fames_pro_user_name');
    localStorage.removeItem('fames_pro_user_role');
    showToast('Logged out of secure workspace.', 'success');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200/80 h-16 shrink-0 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      {/* Left side: Panel Toggle & Search Bar */}
      <div className="flex items-center grow gap-3 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 focus:outline-hidden transition-colors"
          aria-label="Toggle sidebar"
        >
          <Icons.PanelLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Global Search form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs md:max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full pl-9 pr-3 py-1.5 bg-[#f1f5f9] border border-transparent rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            placeholder="Search clients, assignments, tasks..."
          />
        </form>
      </div>

      {/* Right side: Beta Badge, Help Desk, Mute, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Invite-only Beta Badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200/80 px-2.5 py-1 rounded-full text-[11px] font-bold select-none">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          Invite-only Beta
        </span>

        {/* Help Desk Button */}
        <button
          onClick={() => showToast('Opening Help Desk ticket portal...', 'info')}
          className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors select-none"
        >
          <Icons.HelpCircle className="w-4 h-4 text-slate-500" />
          <span>Help Desk</span>
        </button>

        {/* Audio Mute Icon */}
        <button
          onClick={() => showToast('Audio notifications toggled.', 'info')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
          aria-label="Toggle sound"
        >
          <Icons.Volume2 className="w-4 h-4" />
        </button>

        {/* Notification Bell Icon */}
        <button
          onClick={() => showToast('You have 18 pending notifications.', 'info')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-all"
          aria-label="View notifications"
        >
          <Icons.Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 shadow-xs border border-white">
            18
          </span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative pl-1">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 text-left transition-all"
            aria-label="Open user profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-[#132c4a] text-white font-extrabold text-xs flex items-center justify-center border border-slate-300 shrink-0">
              MS
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-none">Mr. Super Admin</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">SUPER ADMIN</span>
              </div>
            </div>
            <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-50 text-xs text-slate-600 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="font-bold text-slate-850">Mr. Super Admin</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">manager.fames@gmail.com</p>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    showToast('Profile management view.', 'info');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Icons.User className="w-3.5 h-3.5 text-slate-400" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    showToast('Account settings.', 'success');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Icons.Settings className="w-3.5 h-3.5 text-slate-400" />
                  Account Settings
                </button>
                <div className="border-t border-slate-50 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-600 font-semibold flex items-center gap-2"
                >
                  <Icons.LogOut className="w-3.5 h-3.5 text-rose-400" />
                  Logout Workspace
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

// ==========================================
// 6. PageHeader Component
// ==========================================
export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: keyof typeof Icons;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action, secondaryAction }) => {
  const ActionIcon = action?.icon ? ((Icons as any)[action.icon] || Icons.Plus) : null;
  const SecondaryActionIcon = secondaryAction?.icon ? ((Icons as any)[secondaryAction.icon] || Icons.Download) : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {description && <p className="text-xs text-slate-500 mt-1 max-w-2xl">{description}</p>}
      </div>
      <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-55 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {SecondaryActionIcon && <SecondaryActionIcon className="w-4 h-4" />}
            {secondaryAction.label}
          </button>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
          >
            {ActionIcon && <ActionIcon className="w-4 h-4" />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 7. Breadcrumbs Component
// ==========================================
export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((x) => x !== '');

  if (pathSegments.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
      <Link to="/dashboard" className="hover:text-slate-600 transition-colors">
        Home
      </Link>
      {pathSegments.map((segment, idx) => {
        const url = `/${pathSegments.slice(0, idx + 1).join('/')}`;
        const isLast = idx === pathSegments.length - 1;

        // Humanize the route parameter (e.g. 'tax-vat' -> 'Tax & VAT')
        const formattedSegment = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <React.Fragment key={url}>
            <Icons.ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-slate-600 truncate max-w-[120px] md:max-w-[200px]">
                {formattedSegment}
              </span>
            ) : (
              <Link to={url} className="hover:text-slate-600 transition-colors">
                {formattedSegment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// ==========================================
// 8. ContentContainer Component
// ==========================================
export const ContentContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-6 animate-fade-in">{children}</div>;
};
