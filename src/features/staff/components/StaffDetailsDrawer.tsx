import React, { useState } from 'react';
import { Drawer, StatusBadge } from '../../../components/ui';
import { 
  StaffMember, 
  StaffProfile, 
  StaffTask, 
  JobAssignment, 
  WorkLog, 
  AttendanceRecord, 
  LeaveRequest, 
  PerformanceReview, 
  SalaryStructure 
} from '../../../types/staffAndJobs';
import * as Icons from 'lucide-react';

interface StaffDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffMember | null;
  profile: StaffProfile | undefined;
  tasks: StaffTask[];
  assignments: JobAssignment[];
  workLogs: WorkLog[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  performance: PerformanceReview[];
  salaryStructure: SalaryStructure | undefined;
}

export const StaffDetailsDrawer: React.FC<StaffDetailsDrawerProps> = ({
  isOpen,
  onClose,
  staff,
  profile,
  tasks,
  assignments,
  workLogs,
  attendance,
  leaveRequests,
  performance,
  salaryStructure,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'tasks' | 'worklogs' | 'attendance' | 'performance' | 'leave' | 'salary'>('overview');

  if (!staff) return null;

  const getStatusBadgeType = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Present':
      case 'Approved Preview':
      case 'Accepted Preview':
      case 'HEALTHY':
      case 'Completed':
      case 'Available':
        return 'success';
      case 'On Leave':
      case 'Under Review':
      case 'Partially Allocated':
      case 'Submitted':
      case 'Pending':
      case 'Late':
      case 'Draft':
        return 'warning';
      case 'Suspended':
      case 'Absent':
      case 'Urgent':
      case 'High':
      case 'High Load':
      case 'Due Today':
      case 'Due Soon':
        return 'danger';
      case 'Planning':
      case 'Training':
      case 'Examination Leave':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const currentPerformance = performance.find((p) => p.staffId === staff.id);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Staff Profile: ${staff.name} (${staff.staffCode})`}
      position="right"
    >
      <div className="flex flex-col h-full text-xs">
        {/* Profile Header Block */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white font-bold flex items-center justify-center rounded-xl text-lg">
              {staff.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{staff.name}</h4>
              <p className="text-slate-500 font-medium">{staff.role} &bull; {staff.department}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200">
            <div>
              <span className="text-slate-400 block font-medium">Availability</span>
              <StatusBadge status={staff.availability} type={getStatusBadgeType(staff.availability)} />
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Employment Status</span>
              <StatusBadge status={staff.status} type={getStatusBadgeType(staff.status)} />
            </div>
          </div>
        </div>

        {/* Tab Selector Links */}
        <div className="flex border-b border-slate-100 mb-4 overflow-x-auto gap-2 pb-1.5 scrollbar-thin">
          {[
            { id: 'overview', label: 'Overview', icon: 'User' },
            { id: 'assignments', label: 'Allocations', icon: 'Briefcase' },
            { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
            { id: 'worklogs', label: 'Timesheets', icon: 'Clock' },
            { id: 'attendance', label: 'Attendance', icon: 'Calendar' },
            { id: 'performance', label: 'Quality Reviews', icon: 'Award' },
            { id: 'leave', label: 'Leaves', icon: 'Plane' },
            { id: 'salary', label: 'Salary Structures', icon: 'CreditCard' },
          ].map((tab) => {
            const IconComp = Icons[tab.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-[10.5px] transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Contents */}
        <div className="grow overflow-y-auto pr-1 space-y-4">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Contact Details</h5>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Email:</strong> <span className="text-slate-500 block break-all">{staff.email}</span></div>
                  <div><strong>Mobile:</strong> <span className="text-slate-500 block">{staff.mobile}</span></div>
                  <div className="col-span-2"><strong>Present Address:</strong> <span className="text-slate-500 block">{profile?.presentAddress || 'N/A'}</span></div>
                  <div className="col-span-2"><strong>Permanent Address:</strong> <span className="text-slate-500 block">{profile?.permanentAddress || 'N/A'}</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Employment Context</h5>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Date Joined:</strong> <span className="text-slate-500 block">{staff.joiningDate}</span></div>
                  <div><strong>Reporting Manager:</strong> <span className="text-slate-500 block">{staff.assignedManager || 'None (Direct Partner Report)'}</span></div>
                  <div><strong>Current Baseline Score:</strong> <span className="text-slate-500 block">{staff.performanceScore}%</span></div>
                  <div><strong>Current Workload:</strong> <span className="text-slate-500 block">{profile?.currentWorkload || 'N/A'}</span></div>
                </div>
              </div>

              {staff.role === 'Article Student' && (
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <h5 className="font-bold text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-1">
                    <Icons.GraduationCap className="w-4 h-4 text-slate-600" />
                    Articleship Information
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div><strong>ICAB Reg No:</strong> <span className="text-slate-700 font-semibold block">{profile?.articleshipRegNo || 'N/A'}</span></div>
                    <div><strong>Articleship Year:</strong> <span className="text-slate-700 font-semibold block">Year {staff.articleshipYear}</span></div>
                    <div><strong>Start Date:</strong> <span className="text-slate-500 block">{profile?.articleshipStartDate || 'N/A'}</span></div>
                    <div><strong>Expected Completion:</strong> <span className="text-slate-500 block">{profile?.articleshipExpectedEnd || 'N/A'}</span></div>
                    <div className="col-span-2"><strong>Principal Partner:</strong> <span className="text-slate-500 block">{profile?.principalPartner || 'N/A'}</span></div>
                    <div className="col-span-2"><strong>Study Leave Eligibility:</strong> <span className="text-slate-500 block">{profile?.examLeaveEligibility || 'N/A'}</span></div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Skills & Specializations</h5>
                <div className="space-y-1">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Core Audit Skills</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile?.skills && profile.skills.length > 0 ? (
                        profile.skills.map((s, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">{s}</span>
                        ))
                      ) : <span className="text-slate-400 italic">No custom skills specified</span>}
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Software Proficiency</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile?.softwareProficiency && profile.softwareProficiency.length > 0 ? (
                        profile.softwareProficiency.map((s, i) => (
                          <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md font-medium">{s}</span>
                        ))
                      ) : <span className="text-slate-400 italic">No software proficiencies specified</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-2.5 rounded-lg text-slate-400 border border-slate-150">
                <span className="font-bold text-slate-700 text-[11px] block">Emergency Contact</span>
                <div className="grid grid-cols-2 gap-1 text-slate-500">
                  <div><strong>Name:</strong> <span className="text-slate-700 font-medium block">{profile?.emergencyContact?.name || 'N/A'}</span></div>
                  <div><strong>Relationship:</strong> <span className="text-slate-700 block">{profile?.emergencyContact?.relation || 'N/A'}</span></div>
                  <div className="col-span-2"><strong>Emergency Mobile:</strong> <span className="text-rose-600 font-semibold block">{profile?.emergencyContact?.phone || 'N/A'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* ALLOCATIONS TAB */}
          {activeTab === 'assignments' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Job Allocations</h5>
              {assignments.length === 0 ? (
                <div className="text-slate-400 italic py-4 text-center">No jobs allocated to this staff member.</div>
              ) : (
                <div className="space-y-2.5">
                  {assignments.map((asg) => (
                    <div key={asg.id} className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-800 text-xs block">{asg.clientName}</strong>
                        <StatusBadge status={asg.workloadStatus} type={getStatusBadgeType(asg.workloadStatus)} />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-slate-500">
                        <div>Job Code: <span className="text-slate-800 block font-semibold">{asg.jobCode}</span></div>
                        <div>Allocation: <span className="text-slate-800 block font-semibold">{asg.allocationPercentage}%</span></div>
                        <div>Role in Job: <span className="text-slate-700 block">{asg.roleInJob}</span></div>
                        <div>Due Date: <span className="text-slate-700 block">{asg.dueDate}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Assigned Tasks</h5>
              {tasks.length === 0 ? (
                <div className="text-slate-400 italic py-4 text-center">No tasks assigned.</div>
              ) : (
                <div className="space-y-2.5">
                  {tasks.map((task) => (
                    <div key={task.id} className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-800 block">{task.title}</strong>
                        <StatusBadge status={task.status} type={getStatusBadgeType(task.status)} />
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{task.clientName}</p>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-500 border-t border-slate-100 pt-1.5 mt-1.5">
                        <div>Priority: <span className="text-slate-700 font-semibold">{task.priority}</span></div>
                        <div>Due: <span className="text-slate-700 font-semibold">{task.dueDate}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WORKLOGS TAB */}
          {activeTab === 'worklogs' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Logged Timesheets</h5>
              {workLogs.length === 0 ? (
                <div className="text-slate-400 italic py-4 text-center">No timesheet records found.</div>
              ) : (
                <div className="space-y-2.5">
                  {workLogs.map((log) => (
                    <div key={log.id} className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-slate-400 font-semibold text-[10px] uppercase">{log.date}</span>
                        <StatusBadge status={log.reviewStatus} type={getStatusBadgeType(log.reviewStatus)} />
                      </div>
                      <div>
                        <strong className="text-slate-800 text-[11px] block">{log.clientName} &bull; {log.jobTitle}</strong>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed italic">"{log.workDescription}"</p>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        <div>Hours: <span className="text-slate-700 font-semibold block">{log.totalHours} hrs</span></div>
                        <div>Billable: <span className="text-slate-700 font-semibold block">{log.billable ? 'Yes' : 'No'}</span></div>
                        <div>Time: <span className="text-slate-700 block">{log.startTime} - {log.endTime}</span></div>
                      </div>
                      {log.outcome && (
                        <div className="bg-slate-50 p-1.5 rounded text-[10px] text-slate-500 leading-normal border-l-2 border-slate-400">
                          <strong>Outcome:</strong> {log.outcome}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Daily Attendance Logs</h5>
              {attendance.length === 0 ? (
                <div className="text-slate-400 italic py-4 text-center">No attendance records logged for today.</div>
              ) : (
                <div className="space-y-2.5">
                  {attendance.map((att) => (
                    <div key={att.id} className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold text-[10px] uppercase">{att.date}</span>
                        <StatusBadge status={att.status} type={getStatusBadgeType(att.status)} />
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-slate-500">
                        <div>Check In: <span className="text-slate-800 font-semibold">{att.checkIn || '--'}</span></div>
                        <div>Check Out: <span className="text-slate-800 font-semibold">{att.checkOut || '--'}</span></div>
                        <div>Worked: <span className="text-slate-700">{att.workingHours ? `${att.workingHours} hrs` : '--'}</span></div>
                        <div>Late: <span className={`font-semibold ${att.lateMinutes && att.lateMinutes > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{att.lateMinutes ? `${att.lateMinutes} min` : '0 min'}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PERFORMANCE TAB */}
          {activeTab === 'performance' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Performance Evaluation</h5>
              {!currentPerformance ? (
                <div className="text-slate-400 italic py-4 text-center">No evaluation prepared for the current quarter.</div>
              ) : (
                <div className="space-y-3">
                  <div className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">{currentPerformance.period} Evaluation</span>
                      <StatusBadge status={currentPerformance.rating} type={getStatusBadgeType(currentPerformance.rating)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-500 text-[11px]">
                      <div>Overall Score: <span className="text-slate-900 font-bold">{currentPerformance.overallScore}%</span></div>
                      <div>Task Completion: <span className="text-slate-700 font-semibold">{currentPerformance.taskCompletion}%</span></div>
                      <div>Quality of Work: <span className="text-slate-700 font-semibold">{currentPerformance.reviewQuality}%</span></div>
                      <div>Punctuality Rate: <span className="text-slate-700 font-semibold">{currentPerformance.attendance}%</span></div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <span className="font-bold text-slate-700 block text-[10.5px]">Evaluator Comments:</span>
                      <p className="text-slate-500 leading-normal italic mt-1">"{currentPerformance.managerComments}"</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 block">Identified Strengths</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      {currentPerformance.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 block">Improvement Focus Areas</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      {currentPerformance.improvementAreas.map((imp, idx) => (
                        <li key={idx} className="text-amber-700">{imp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 block">Recommended Trainings</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      {currentPerformance.trainingRecommendations?.map((tr, idx) => (
                        <li key={idx} className="text-indigo-700">{tr}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LEAVE TAB */}
          {activeTab === 'leave' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Leave Requests</h5>
              {leaveRequests.length === 0 ? (
                <div className="text-slate-400 italic py-4 text-center">No leave requests found.</div>
              ) : (
                <div className="space-y-2.5">
                  {leaveRequests.map((req) => (
                    <div key={req.id} className="border border-slate-150 p-3 rounded-xl bg-white shadow-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <strong className="text-slate-800 text-xs block">{req.leaveType}</strong>
                        <StatusBadge status={req.status} type={getStatusBadgeType(req.status)} />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-slate-500 text-[11px]">
                        <div>Dates: <span className="text-slate-800 block font-medium">{req.startDate} to {req.endDate}</span></div>
                        <div>Duration: <span className="text-slate-800 block font-medium">{req.numberOfDays} Days</span></div>
                        <div className="col-span-2">Reason: <span className="text-slate-600 block italic">"{req.reason}"</span></div>
                        <div className="col-span-2">Handover Agent: <span className="text-slate-700 block font-semibold">{req.handoverPersonName}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SALARY TAB */}
          {activeTab === 'salary' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-1">Salary & Allowance Structure</h5>
              {!salaryStructure ? (
                <div className="text-slate-400 italic py-4 text-center">No salary structure loaded for this user level.</div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-slate-800">Monthly Compensation Model</span>
                      <span className="text-slate-400 text-[10px]">Effective: {salaryStructure.effectiveDate}</span>
                    </div>
                    <div className="space-y-1 text-slate-600 text-xs">
                      <div className="flex justify-between">
                        <span>Base Salary / Stipend:</span>
                        <strong className="text-slate-900">{salaryStructure.baseSalaryOrStipend.toLocaleString()} BDT</strong>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Conveyance Allowance:</span>
                        <span>+{salaryStructure.allowances.conveyance.toLocaleString()} BDT</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Medical Allowance:</span>
                        <span>+{salaryStructure.allowances.medical.toLocaleString()} BDT</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Mobile Allowance:</span>
                        <span>+{salaryStructure.allowances.mobile.toLocaleString()} BDT</span>
                      </div>
                      <div className="border-t border-slate-200 my-1 pt-1"></div>
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>Estimated Income Tax:</span>
                        <span>-{(salaryStructure.deductions?.tax ?? 0).toLocaleString()} BDT</span>
                      </div>
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>Provident Fund Cont.:</span>
                        <span>-{(salaryStructure.deductions?.providentFund ?? 0).toLocaleString()} BDT</span>
                      </div>
                      <div className="border-t border-slate-200 my-1.5 pt-1.5"></div>
                      <div className="flex justify-between text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-200">
                        <span>Estimated Net Pay:</span>
                        <span>
                          {(
                            salaryStructure.baseSalaryOrStipend +
                            salaryStructure.allowances.conveyance +
                            salaryStructure.allowances.medical +
                            salaryStructure.allowances.mobile -
                            (salaryStructure.deductions?.tax ?? 0) -
                            (salaryStructure.deductions?.providentFund ?? 0)
                          ).toLocaleString()} BDT
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-500 bg-white border border-slate-150 p-2.5 rounded-lg text-[11px]">
                    <div>Standard Method: <span className="text-slate-800 block font-semibold">{salaryStructure.paymentMethod}</span></div>
                    <div>Currency: <span className="text-slate-800 block font-semibold">BDT (Taka)</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-slate-100 pt-4 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors text-xs"
          >
            Close Profile View
          </button>
        </div>
      </div>
    </Drawer>
  );
};
