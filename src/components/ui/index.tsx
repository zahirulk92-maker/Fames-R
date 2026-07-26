import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { runtimeConfig } from '../../config/runtime';

// ==========================================
// 1. MetricCard Component
// ==========================================
export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Icons;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  loading = false,
}) => {
  const IconComponent = Icons[icon] as React.ComponentType<{ className?: string }>;

  if (loading) {
    return <LoadingSkeleton rows={1} cols={1} />;
  }

  const changeColors = {
    increase: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400',
    decrease: 'text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400',
    neutral: 'text-slate-600 bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {IconComponent && (
          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">{value}</h3>
        {change && (
          <div className="flex items-center mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
            <span className="text-xs text-slate-400 ml-2">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. StatusBadge Component
// ==========================================
export interface StatusBadgeProps {
  status: string;
  type?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
    warning: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
    danger: 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30',
    info: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
    neutral: 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-700/30',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      {status}
    </span>
  );
};

// ==========================================
// 3. SearchInput Component
// ==========================================
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search records...',
}) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icons.Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

// ==========================================
// 4. FilterBar Component
// ==========================================
export interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters = Object.values(activeFilters).some((v) => v !== '');

  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-150">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
        <Icons.Filter className="w-3.5 h-3.5" />
        Filter By
      </div>
      <div className="flex flex-wrap gap-2 grow">
        {filters.map((f) => (
          <div key={f.key} className="flex items-center">
            <select
              value={activeFilters[f.key] || ''}
              onChange={(e) => onFilterChange(f.key, e.target.value)}
              className="bg-white border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-medium text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-950/5 transition-colors"
            >
              <option value="">All {f.label}</option>
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Icons.RotateCcw className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 5. DataTableShell Component
// ==========================================
export interface DataTableShellProps {
  headers: string[];
  children: React.ReactNode;
  totalCount: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  loading?: boolean;
}

export const DataTableShell: React.FC<DataTableShellProps> = ({
  headers,
  children,
  totalCount,
  page,
  limit,
  onPageChange,
  loading = false,
}) => {
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="p-0">
                  <LoadingSkeleton rows={4} cols={headers.length} />
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      {!loading && totalCount > 0 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{(page - 1) * limit + 1}</strong> to{' '}
            <strong className="text-slate-800">
              {Math.min(page * limit, totalCount)}
            </strong>{' '}
            of <strong className="text-slate-800">{totalCount}</strong> entries
          </span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

// ==========================================
// 6. EmptyState Component
// ==========================================
export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof Icons;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'FolderOpen',
  actionLabel,
  onAction,
}) => {
  const IconComponent = Icons[icon] as React.ComponentType<{ className?: string }>;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-xl shadow-xs">
      <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
        {IconComponent && <IconComponent className="w-10 h-10" />}
      </div>
      <h3 className="text-md font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Icons.Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// ==========================================
// 7. LoadingSkeleton Component
// ==========================================
export const LoadingSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 3,
  cols = 1,
}) => {
  return (
    <div className="w-full p-6 space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex gap-4">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <div key={cIdx} className="grow h-4 bg-slate-100 rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 8. ErrorState Component
// ==========================================
export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'An error occurred',
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-rose-50 border border-rose-100 rounded-xl text-center">
      <Icons.AlertOctagon className="w-10 h-10 text-rose-500 mb-3" />
      <h3 className="text-md font-semibold text-rose-800 mb-1">{title}</h3>
      <p className="text-sm text-rose-600 max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-rose-100/50 transition-colors"
        >
          <Icons.RefreshCcw className="w-3.5 h-3.5" />
          Retry Request
        </button>
      )}
    </div>
  );
};

// ==========================================
// 9. ConfirmDialog Component
// ==========================================
export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onCancel} />
      {/* Dialog body */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-md w-full relative z-10 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 10. FormField Component
// ==========================================
export interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  helpText?: string;
  id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  required = false,
  helpText,
  id,
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="relative">{children}</div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helpText && !error && <p className="text-xs text-slate-400">{helpText}</p>}
    </div>
  );
};

// ==========================================
// 11. Modal Component
// ==========================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />
      {/* Container */}
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} relative z-10 overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]`}>
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-md font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-6 overflow-y-auto grow">{children}</div>
      </div>
    </div>
  );
};

// ==========================================
// 12. Drawer Component
// ==========================================
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
}) => {
  if (!isOpen) return null;

  const sideClass = position === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs" onClick={onClose} />
      {/* Drawer Body */}
      <div className={`fixed inset-y-0 ${sideClass} max-w-md w-full bg-white shadow-2xl relative z-10 flex flex-col h-full border-l border-slate-100`}>
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-md font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-6 overflow-y-auto grow">{children}</div>
      </div>
    </div>
  );
};

// ==========================================
// 13. Pagination Component
// ==========================================
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <Icons.ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
              currentPage === pageNum
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <Icons.ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// ==========================================
// 14. Toast Component & Toast Trigger Context
// ==========================================
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Floating Toast Notification Area */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2.5 max-w-sm w-full">
        {toasts.map((t) => {
          const style = {
            success: 'bg-slate-900 border-emerald-500 text-white',
            error: 'bg-rose-900 border-rose-500 text-white',
            info: 'bg-slate-900 border-indigo-500 text-white',
          }[t.type];

          const Icon = {
            success: Icons.CheckCircle,
            error: Icons.AlertTriangle,
            info: Icons.Info,
          }[t.type];

          return (
            <ToastItem
              key={t.id}
              toast={t}
              style={style}
              icon={Icon}
              onClose={() => removeToast(t.id)}
            />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{
  toast: Toast;
  style: string;
  icon: React.ComponentType<{ className?: string }>;
  onClose: () => void;
}> = ({ toast, style, icon: Icon, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border-l-4 ${style} transition-all duration-300 transform translate-y-0`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-xs font-semibold grow">{toast.message}</span>
      <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors">
        <Icons.X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ==========================================
// 15. DemoBadge Component
// ==========================================
export const DemoBadge: React.FC = () => {
  if (!runtimeConfig.isDemoMode) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/25 animate-pulse">
      <Icons.Layers className="w-3.5 h-3.5 text-amber-600" />
      Demo Mode (Local Preview)
    </span>
  );
};

// ==========================================
// 16. FeedbackNotice Component
// ==========================================
export interface FeedbackNoticeProps {
  message?: string;
}

export const FeedbackNotice: React.FC<FeedbackNoticeProps> = ({ message }) => {
  if (!runtimeConfig.isDemoMode) return null;
  return (
    <div className="bg-amber-50/50 border border-amber-200/40 rounded-xl p-4 text-xs text-amber-800 flex items-start gap-3 max-w-2xl">
      <Icons.AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h4 className="font-semibold text-amber-900">Local Sandbox Notice</h4>
        <p className="text-amber-700 leading-relaxed">
          {message || 'This action is simulated in-memory in your browser. Since no backend API or database is currently connected, these changes are temporary and will be reset upon page refresh.'}
        </p>
      </div>
    </div>
  );
};

export { RootErrorBoundary } from './ErrorBoundary';
