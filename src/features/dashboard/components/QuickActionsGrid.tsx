import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useToast } from '../../../components/ui';

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route?: string;
  onClickKey?: 'addClient' | 'newJob' | 'assignTask' | 'uploadDoc' | 'logComm' | 'reviewPaper';
}

interface QuickActionsGridProps {
  onAddClient: () => void;
  onNewJob: () => void;
  onAssignTask: () => void;
  onUploadDoc: () => void;
  onLogComm: () => void;
  onReviewPaper: () => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onAddClient,
  onNewJob,
  onAssignTask,
  onUploadDoc,
  onLogComm,
  onReviewPaper,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const ACTIONS: QuickActionItem[] = [
    {
      id: 'qa1',
      title: 'Add New Client',
      description: 'Onboard a corporate or individual client profile',
      icon: 'UserPlus',
      onClickKey: 'addClient'
    },
    {
      id: 'qa2',
      title: 'Create New Job',
      description: 'Open a statutory audit or NBR representation case',
      icon: 'Briefcase',
      onClickKey: 'newJob'
    },
    {
      id: 'qa3',
      title: 'Assign Student Task',
      description: 'Delegate analytical substantive reviews to article students',
      icon: 'ClipboardList',
      onClickKey: 'assignTask'
    },
    {
      id: 'qa4',
      title: 'Upload Document',
      description: 'Upload client trial balances and invoices to local sandbox storage',
      icon: 'FileUp',
      onClickKey: 'uploadDoc'
    },
    {
      id: 'qa5',
      title: 'Log Communication',
      description: 'Record minutes, NBR letters, or official emails',
      icon: 'MessageSquare',
      onClickKey: 'logComm'
    },
    {
      id: 'qa6',
      title: 'Review Working Paper',
      description: 'Sign off, reject, or comment on submitted sampling sheets',
      icon: 'CheckSquare',
      onClickKey: 'reviewPaper'
    },
    {
      id: 'qa7',
      title: 'Open Compliance Calendar',
      description: 'Inspect upcoming corporate VAT/Tax filing dates',
      icon: 'Calendar',
      route: '/compliance/calendar'
    },
    {
      id: 'qa8',
      title: 'Manage Users',
      description: 'Configure registrations, roles, and administrative claims',
      icon: 'ShieldAlert',
      route: '/admin/users'
    }
  ];

  const handleActionClick = (action: QuickActionItem) => {
    if (action.route) {
      navigate(action.route);
      return;
    }

    if (action.onClickKey) {
      switch (action.onClickKey) {
        case 'addClient':
          onAddClient();
          break;
        case 'newJob':
          onNewJob();
          break;
        case 'assignTask':
          onAssignTask();
          break;
        case 'uploadDoc':
          onUploadDoc();
          break;
        case 'logComm':
          onLogComm();
          break;
        case 'reviewPaper':
          onReviewPaper();
          break;
        default:
          showToast(`Action ${action.title} selected.`, 'info');
      }
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
      <div className="border-b border-slate-50 pb-3 mb-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Icons.Zap className="w-4 h-4 text-slate-800" />
          Quick Actions Hub
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Perform standard office work sequences or navigate directly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTIONS.map((act) => {
          const IconComp = (Icons as any)[act.icon] || Icons.Plus;

          return (
            <button
              key={act.id}
              onClick={() => handleActionClick(act)}
              className="group text-left p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/75 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 group-hover:bg-white border border-slate-100 group-hover:border-slate-200 rounded-xl text-slate-600 transition-all duration-200 shrink-0">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500 leading-relaxed transition-colors">
                    {act.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
