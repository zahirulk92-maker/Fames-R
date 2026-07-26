import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { useToast, DemoBadge } from '../ui';

// ==========================================
// 1. AppShell Component (Main Layout Wrapper)
// ==========================================
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop (hidden on mobile, fixed width w-64) */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 h-screen sticky top-0">
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
          <div className="relative flex flex-col w-64 bg-slate-900 text-slate-300 h-full z-10 border-r border-slate-800 animate-slide-in">
            <div className="absolute top-4 right-4 z-20 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-hidden"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Side Content Area */}
      <div className="grow flex flex-col min-w-0">
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="grow overflow-y-auto px-4 md:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          <Breadcrumbs />
          <ContentContainer>{children}</ContentContainer>
        </main>
        <footer className="py-4 border-t border-slate-100 bg-white text-center text-xs text-slate-400">
          <p>© 2026 FAMES & R Office PRO. All rights reserved. (Frontend Foundation Only)</p>
        </footer>
      </div>
    </div>
  );
};

// ==========================================
// 2. Sidebar Component
// ==========================================
export const Sidebar: React.FC<{ onItemClick?: () => void }> = ({ onItemClick }) => {
  // Group navigation items by section
  const sections = ['Dashboard', 'Clients', 'Staff', 'Jobs', 'Audit', 'Compliance', 'Administration'] as const;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/40 shrink-0 gap-2.5">
        <div className="w-8 h-8 bg-white text-slate-900 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter">
          FR
        </div>
        <div>
          <h1 className="font-bold text-sm text-white tracking-wide leading-none">FAMES & R</h1>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 block">Office PRO</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="grow overflow-y-auto p-4 space-y-5 custom-scrollbar">
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

      {/* Quick Status Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/15 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase leading-none">Sandbox Mode</p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Changes reset after refresh</p>
          </div>
        </div>
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
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 select-none">
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
        `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
          isActive
            ? 'bg-slate-800 text-white shadow-xs'
            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
        }`
      }
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <IconComponent className="w-4 h-4 shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      {badge !== undefined && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700/50">
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

  const userEmail = localStorage.getItem('fames_pro_user_email') || 'zahirulk92@gmail.com';
  const userName = localStorage.getItem('fames_pro_user_name') || 'A. R. Chowdhury, FCA';
  const userRole = localStorage.getItem('fames_pro_user_role') || 'Partner';
  
  // Calculate dynamic initials for avatar
  const initials = userName
    .replace('Mr. ', '')
    .split(' ')
    .filter(n => n.length > 0 && n[0] !== n[0].toLowerCase())
    .map(n => n[0])
    .join('')
    .substring(0, 2) || 'AR';

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
    <header className="bg-white border-b border-slate-150 h-16 shrink-0 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      {/* Left side: Hamburger (on mobile) and Global Search */}
      <div className="flex items-center grow gap-4 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-55 text-slate-600 focus:outline-hidden"
          aria-label="Open sidebar"
        >
          <Icons.Menu className="w-5 h-5" />
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
            className="block w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/15 focus:border-slate-900 focus:bg-white transition-all"
            placeholder="Global Search (Press Enter to search)..."
          />
        </form>
      </div>

      {/* Right side: Action utilities, Notifications, Profile dropdown */}
      <div className="flex items-center gap-3">
        {/* Connection status badge using centralized component */}
        <DemoBadge />

        {/* Alert/Notification trigger */}
        <button
          onClick={() => showToast('No new notifications today.', 'info')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg relative transition-all"
          aria-label="View notifications"
        >
          <Icons.Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>

        {/* User profile dropdown placeholder */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 text-left transition-all"
            aria-label="Open user profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0 uppercase">
              {initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-800 leading-none">{userName.split(',')[0]}</p>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{userRole}</span>
            </div>
            <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-50 text-xs text-slate-600 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="font-semibold text-slate-850">{userName}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{userEmail}</p>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    showToast('Role switching is disabled on this foundation blueprint.', 'info');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Icons.User className="w-3.5 h-3.5 text-slate-400" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    showToast('Settings saved successfully (Frontend only).', 'success');
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
