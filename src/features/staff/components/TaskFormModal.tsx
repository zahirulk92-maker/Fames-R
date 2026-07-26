import React, { useState, useEffect } from 'react';
import { Modal, FormField, useToast } from '../../../components/ui';
import { StaffTask, StaffMember, Job } from '../../../types/staffAndJobs';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: StaffTask) => void;
  taskToEdit?: StaffTask;
  staffList: StaffMember[];
  jobsList: Job[];
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
  staffList,
  jobsList,
}) => {
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [assigneeName, setAssigneeName] = useState('');
  const [dueDate, setDueDate] = useState('2026-07-20');
  const [status, setStatus] = useState<StaffTask['status']>('Assigned');
  const [priority, setPriority] = useState<StaffTask['priority']>('Normal');
  const [description, setDescription] = useState('');
  const [checklistText, setChecklistText] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setClientId(taskToEdit.clientId || '');
      setClientName(taskToEdit.clientName || '');
      setJobId(taskToEdit.jobId || '');
      setJobTitle(taskToEdit.jobTitle || '');
      setAssigneeId(taskToEdit.assigneeId);
      setAssigneeName(taskToEdit.assigneeName);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDescription(taskToEdit.description || '');
      setChecklistText(
        taskToEdit.checklist
          ? taskToEdit.checklist.map((c) => `${c.item}${c.completed ? ' [x]' : ''}`).join('\n')
          : ''
      );
    } else {
      setTitle('');
      setClientId('');
      setClientName('');
      setJobId('');
      setJobTitle('');
      setAssigneeId('');
      setAssigneeName('');
      setDueDate(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || ''); // 4 days later
      setStatus('Assigned');
      setPriority('Normal');
      setDescription('');
      setChecklistText('');
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  // Sync client name and job title when IDs are selected
  const handleJobSelect = (jId: string) => {
    setJobId(jId);
    const job = jobsList.find((j) => j.id === jId);
    if (job) {
      setJobTitle(job.serviceType);
      setClientId(job.clientId);
      setClientName(job.clientName);
    }
  };

  const handleStaffSelect = (sId: string) => {
    setAssigneeId(sId);
    const member = staffList.find((s) => s.id === sId);
    if (member) {
      setAssigneeName(member.name);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = 'Task title is required';
    if (!jobId) errs.jobId = 'Associated office job is required';
    if (!assigneeId) errs.assigneeId = 'Assigned staff member is required';
    if (!dueDate) errs.dueDate = 'Due date is required';

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please resolve the highlighted validation errors.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse checklist items
    const checklistItems = checklistText
      .split('\n')
      .map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        const isCompleted = trimmed.endsWith('[x]') || trimmed.endsWith('[X]');
        const itemTitle = isCompleted ? trimmed.slice(0, -3).trim() : trimmed;
        return {
          id: `item-${idx}-${Date.now()}`,
          item: itemTitle,
          completed: isCompleted,
        };
      })
      .filter((item): item is { id: string; item: string; completed: boolean } => item !== null);

    const task: StaffTask = {
      id: taskToEdit ? taskToEdit.id : Math.floor(100 + Math.random() * 900).toString(),
      taskCode: taskToEdit ? taskToEdit.taskCode : `TSK-00${Math.floor(10 + Math.random() * 90)}`,
      title: title.trim(),
      clientId,
      clientName,
      jobId,
      jobTitle,
      assigneeId,
      assigneeName,
      reviewerId: 'partner-1',
      reviewerName: 'A. R. Chowdhury, FCA',
      dueDate,
      startDate: new Date().toISOString().split('T')[0] || '',
      estimatedHours: 8,
      progress: status === 'Completed' ? 100 : status === 'Under Review' ? 80 : status === 'In Progress' ? 40 : 0,
      status,
      priority,
      description: description.trim(),
      checklist: checklistItems,
    };

    onSubmit(task);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? `Edit Task Assignment: ${taskToEdit.title}` : 'Create New Task Assignment'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormField label="Task Title" required error={errors.title}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            placeholder="e.g. Vouch petty cash ledger entries"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Associate with Job / Engagement" required error={errors.jobId}>
            <select
              value={jobId}
              onChange={(e) => handleJobSelect(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select an active job</option>
              {jobsList.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.jobCode} - {job.clientName} ({job.serviceType})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Assign To (Team Member)" required error={errors.assigneeId}>
            <select
              value={assigneeId}
              onChange={(e) => handleStaffSelect(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="">Select a staff member</option>
              {staffList
                .filter((s) => s.status === 'Active')
                .map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Task Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </FormField>

          <FormField label="Priority Level">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </FormField>

          <FormField label="Due Date" required error={errors.dueDate}>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full p-2 border border-slate-200 rounded-lg bg-white"
            />
          </FormField>
        </div>

        <FormField label="Detailed Instructions & Context">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="block w-full p-2 border border-slate-200 rounded-lg bg-white resize-none"
            placeholder="Outline the steps, files needed, or sample thresholds..."
          />
        </FormField>

        <FormField 
          label="Sub-Task Checklist (One item per line)" 
          helpText="Append ' [x]' (with a space) to complete an item."
        >
          <textarea
            value={checklistText}
            onChange={(e) => setChecklistText(e.target.value)}
            rows={3}
            className="block w-full p-2 border border-slate-200 rounded-lg bg-white font-mono text-[10.5px]"
            placeholder={`Verify opening balances\nVouch Cash Book payments [x]\nConfirm branch petty cash balances`}
          />
        </FormField>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs transition-colors"
          >
            {taskToEdit ? 'Save Changes' : 'Assign Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
