import { Component, ErrorInfo, ReactNode } from 'react';
import * as Icons from 'lucide-react';
import { runtimeConfig } from '../../config/runtime';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class RootErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // You could also log this error to an external logging service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/dashboard';
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = runtimeConfig.appEnv === 'development';

      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-slate-200/60 rounded-2xl shadow-xl max-w-xl w-full p-8 text-slate-800 space-y-6">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-rose-50 rounded-full text-rose-500 mb-4 animate-bounce">
                <Icons.AlertOctagon className="w-12 h-12" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Something went wrong
              </h1>
              <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
                The application encountered an unexpected runtime crash. This has been intercepted safely by our system.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-xs"
              >
                <Icons.RefreshCw className="w-3.5 h-3.5" />
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
              >
                <Icons.Home className="w-3.5 h-3.5" />
                Return to Dashboard
              </button>
            </div>

            {isDev && this.state.error && (
              <div className="text-left border border-slate-100 bg-slate-50 rounded-xl p-4 overflow-x-auto space-y-2">
                <p className="text-[11px] font-bold text-rose-700 font-mono">
                  [DEV MODE] Exception Details:
                </p>
                <p className="text-xs font-semibold text-slate-700 font-mono">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-[10px] text-slate-500 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto pt-2 border-t border-slate-200/50">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
