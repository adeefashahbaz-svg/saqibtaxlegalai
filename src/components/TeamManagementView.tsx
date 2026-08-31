import React, { useState } from 'react';
import {
  LawFirmTeamMember,
  CaseAssignment,
  ClientLedgerProfile,
  FirmBrandingSettings
} from '../types';
import {
  getStoredTeamMembers,
  saveStoredTeamMembers,
  getStoredCaseAssignments,
  saveStoredCaseAssignments,
  getStoredClientLedger
} from '../utils/enterpriseStore';
import { generateCaseAssignmentMemoPDF } from '../utils/pdfGenerator';
import {
  Users,
  UserPlus,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Shield,
  Phone,
  Mail,
  Award,
  ChevronRight,
  ArrowUpRight,
  X,
  Save,
  Check
} from 'lucide-react';

interface TeamManagementViewProps {
  firmBranding: FirmBrandingSettings;
}

export const TeamManagementView: React.FC<TeamManagementViewProps> = ({ firmBranding }) => {
  const [teamMembers, setTeamMembers] = useState<LawFirmTeamMember[]>(() => getStoredTeamMembers());
  const [caseAssignments, setCaseAssignments] = useState<CaseAssignment[]>(() => getStoredCaseAssignments());
  const [clientLedger] = useState<ClientLedgerProfile[]>(() => getStoredClientLedger());

  const [activeTab, setActiveTab] = useState<'team_directory' | 'case_dispatch' | 'workload_matrix'>('case_dispatch');
  const [selectedAssociateFilter, setSelectedAssociateFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');

  // Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<LawFirmTeamMember | null>(null);

  // New Assignment Form State
  const [newAssignment, setNewAssignment] = useState<Partial<CaseAssignment>>({
    clientId: clientLedger[0]?.id || '',
    associateId: teamMembers.find((m) => m.role.includes('associate'))?.id || teamMembers[0]?.id || '',
    assignedByPartnerId: teamMembers.find((m) => m.role.includes('partner'))?.id || teamMembers[0]?.id || '',
    assignedDate: new Date().toISOString().slice(0, 10),
    deadlineDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    taskScope: 'Annual Income Tax Return E-Filing & Section 116 Wealth Reconciliation Audit',
    priority: 'normal',
    status: 'assigned',
    internalNotes: 'Ensure bank statements and foreign remittance PRC certificates are thoroughly cross-checked before partner signoff.',
    estimatedHours: 12
  });

  // New Member Form State
  const [memberForm, setMemberForm] = useState<Partial<LawFirmTeamMember>>({
    name: '',
    email: '',
    phone: '',
    role: 'junior_associate',
    designation: 'Junior Tax Associate',
    barOrRegNumber: '',
    specialization: ['Income Tax Filing', 'Wealth Statements'],
    hourlyRatePKR: 12000,
    isActive: true,
    avatarColor: '#0f3c28'
  });

  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showStatus = (text: string, type: 'success' | 'info' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Handlers
  const handleSaveMember = () => {
    if (!memberForm.name || !memberForm.email) {
      alert('Please provide member name and email.');
      return;
    }

    if (editingMember) {
      const updated = teamMembers.map((m) => (m.id === editingMember.id ? ({ ...m, ...memberForm } as LawFirmTeamMember) : m));
      setTeamMembers(updated);
      saveStoredTeamMembers(updated);
      showStatus(`Team member profile for ${memberForm.name} updated.`, 'success');
    } else {
      const newMem: LawFirmTeamMember = {
        id: `team-${Date.now().toString().slice(-4)}`,
        name: memberForm.name || 'New Member',
        email: memberForm.email || '',
        phone: memberForm.phone || '',
        role: memberForm.role || 'junior_associate',
        designation: memberForm.designation || 'Tax Associate',
        barOrRegNumber: memberForm.barOrRegNumber || 'Reg Pending',
        specialization: memberForm.specialization || ['Tax Compliance'],
        assignedClientsCount: 0,
        hourlyRatePKR: memberForm.hourlyRatePKR || 10000,
        isActive: true,
        joinedDate: new Date().toISOString().slice(0, 10),
        avatarColor: memberForm.avatarColor || '#1e3a8a'
      };
      const updated = [...teamMembers, newMem];
      setTeamMembers(updated);
      saveStoredTeamMembers(updated);
      showStatus(`Added ${newMem.name} to firm roster.`, 'success');
    }

    setIsMemberModalOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the firm team directory?`)) {
      const updated = teamMembers.filter((m) => m.id !== id);
      setTeamMembers(updated);
      saveStoredTeamMembers(updated);
      showStatus(`Removed ${name} from roster.`, 'info');
    }
  };

  const handleCreateAssignment = () => {
    const client = clientLedger.find((c) => c.id === newAssignment.clientId);
    const associate = teamMembers.find((m) => m.id === newAssignment.associateId);
    const partner = teamMembers.find((m) => m.id === newAssignment.assignedByPartnerId);

    if (!client || !associate || !partner) {
      alert('Please select valid client, associate, and partner.');
      return;
    }

    const assignmentRecord: CaseAssignment = {
      id: `case-${Date.now().toString().slice(-4)}`,
      clientId: client.id,
      clientName: client.clientName,
      associateId: associate.id,
      associateName: associate.name,
      assignedByPartnerId: partner.id,
      assignedByPartnerName: partner.name,
      assignedDate: newAssignment.assignedDate || new Date().toISOString().slice(0, 10),
      deadlineDate: newAssignment.deadlineDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      taskScope: newAssignment.taskScope || 'Statutory Tax Audit & Iris Filing',
      status: (newAssignment.status as any) || 'assigned',
      priority: (newAssignment.priority as any) || 'normal',
      internalNotes: newAssignment.internalNotes || '',
      estimatedHours: newAssignment.estimatedHours || 10
    };

    const updatedAssignments = [assignmentRecord, ...caseAssignments];
    setCaseAssignments(updatedAssignments);
    saveStoredCaseAssignments(updatedAssignments);

    // Update associate count
    const updatedMembers = teamMembers.map((m) =>
      m.id === associate.id ? { ...m, assignedClientsCount: m.assignedClientsCount + 1 } : m
    );
    setTeamMembers(updatedMembers);
    saveStoredTeamMembers(updatedMembers);

    setIsAssignModalOpen(false);
    showStatus(`Assigned case for ${client.clientName} to ${associate.name}.`, 'success');
  };

  const handleUpdateCaseStatus = (caseId: string, newStatus: CaseAssignment['status']) => {
    const updated = caseAssignments.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c));
    setCaseAssignments(updated);
    saveStoredCaseAssignments(updated);
    showStatus(`Case status updated to "${newStatus.replace('_', ' ').toUpperCase()}".`, 'info');
  };

  const handleExportCaseMemo = (assignment: CaseAssignment) => {
    const client = clientLedger.find((c) => c.id === assignment.clientId);
    generateCaseAssignmentMemoPDF(assignment, client, firmBranding);
    showStatus(`Case Assignment Memo PDF generated for ${assignment.clientName}.`, 'success');
  };

  // Filtered cases
  const filteredCases = caseAssignments.filter((c) => {
    if (selectedAssociateFilter !== 'all' && c.associateId !== selectedAssociateFilter) return false;
    if (selectedStatusFilter !== 'all' && c.status !== selectedStatusFilter) return false;
    if (selectedPriorityFilter !== 'all' && c.priority !== selectedPriorityFilter) return false;
    return true;
  });

  const getRoleBadge = (role: LawFirmTeamMember['role']) => {
    switch (role) {
      case 'managing_partner':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950/80 border border-amber-500/80 text-amber-300">Managing Partner</span>;
      case 'senior_partner':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-950/80 border border-purple-500/80 text-purple-300">Senior Partner</span>;
      case 'senior_associate':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-950/80 border border-blue-500/80 text-blue-300">Senior Associate</span>;
      case 'junior_associate':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950/80 border border-emerald-500/80 text-emerald-300">Junior Associate</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 border border-slate-700 text-slate-300">CA Trainee</span>;
    }
  };

  const getStatusBadge = (status: CaseAssignment['status']) => {
    switch (status) {
      case 'assigned':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950 border border-blue-600 text-blue-300">Assigned</span>;
      case 'in_review':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 border border-amber-600 text-amber-300">In Review</span>;
      case 'partner_approved':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 border border-emerald-600 text-emerald-300">Partner Approved</span>;
      case 'filed_iris':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-950 border border-purple-600 text-purple-300">Filed on Iris</span>;
      case 'delayed':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 border border-rose-600 text-rose-300">Action Delayed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">Law Firm Multi-Tenant & Team Management</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
                  {teamMembers.length} Counsel Members
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage Practice Roles, Associate Task Delegation, and Client Case Governance for {firmBranding.firmName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-assign-case-partner"
              onClick={() => setIsAssignModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Case to Associate</span>
            </button>

            <button
              id="btn-add-team-member"
              onClick={() => {
                setEditingMember(null);
                setMemberForm({
                  name: '',
                  email: '',
                  phone: '',
                  role: 'junior_associate',
                  designation: 'Junior Tax Associate',
                  barOrRegNumber: '',
                  specialization: ['Income Tax Filing', 'Wealth Statements'],
                  hourlyRatePKR: 12000,
                  isActive: true,
                  avatarColor: '#1e3a8a'
                });
                setIsMemberModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition"
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span>Add Team Member</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-lg text-xs font-medium flex items-center gap-2 bg-emerald-950/80 border border-emerald-600 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-2 pb-1">
        {[
          { id: 'case_dispatch', label: 'Case Assignment Dispatch Board', icon: Briefcase, count: caseAssignments.length },
          { id: 'team_directory', label: 'Counsel & Associate Directory', icon: Users, count: teamMembers.length },
          { id: 'workload_matrix', label: 'Workload & Hourly Rate Matrix', icon: Award, count: null },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-team-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                  isActive ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Case Dispatch Board */}
      {activeTab === 'case_dispatch' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-850 border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span>Filter By:</span>
              </div>

              <select
                value={selectedAssociateFilter}
                onChange={(e) => setSelectedAssociateFilter(e.target.value)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200"
              >
                <option value="all">All Counsel Members</option>
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role.replace('_', ' ')})</option>
                ))}
              </select>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200"
              >
                <option value="all">All Case Statuses</option>
                <option value="assigned">Assigned</option>
                <option value="in_review">In Review</option>
                <option value="partner_approved">Partner Approved</option>
                <option value="filed_iris">Filed on Iris</option>
                <option value="delayed">Delayed</option>
              </select>

              <select
                value={selectedPriorityFilter}
                onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200"
              >
                <option value="all">All Priorities</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="text-slate-400">
              Showing <span className="font-bold text-slate-200">{filteredCases.length}</span> active legal mandates
            </div>
          </div>

          {/* Cases List */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredCases.length === 0 ? (
              <div className="p-8 text-center bg-slate-850 border border-slate-800 rounded-xl text-slate-400 text-xs">
                No active case assignments found matching your filter criteria.
              </div>
            ) : (
              filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-850 border border-slate-700/80 hover:border-slate-600 rounded-xl p-4 transition shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        c.priority === 'urgent' ? 'bg-rose-500 animate-pulse' :
                        c.priority === 'high' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <h3 className="text-sm font-bold text-slate-100">{c.clientName}</h3>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                        c.priority === 'urgent' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        c.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {c.priority} Priority
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(c.status)}

                      <button
                        onClick={() => handleExportCaseMemo(c)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
                        title="Export Official Assignment Memo PDF with High Court Stamp"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Export Memo PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Task Scope Box */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{c.taskScope}</span>
                    </div>
                    {c.internalNotes && (
                      <p className="text-slate-400 text-[11px] pl-5 italic">
                        Partner Directives: {c.internalNotes}
                      </p>
                    )}
                  </div>

                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 gap-2">
                    <div className="flex flex-wrap items-center gap-4">
                      <span>
                        <strong className="text-slate-300">Assigned Associate:</strong>{' '}
                        <span className="text-emerald-400 font-medium">{c.associateName}</span>
                      </span>
                      <span>
                        <strong className="text-slate-300">Directing Partner:</strong> {c.assignedByPartnerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Deadline: <strong className="text-slate-200">{c.deadlineDate}</strong></span>
                      </span>
                      <span>
                        Est. Time: <span className="font-mono text-slate-300">{c.estimatedHours} hrs</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <label className="text-[11px] text-slate-400">Update Status:</label>
                      <select
                        value={c.status}
                        onChange={(e) => handleUpdateCaseStatus(c.id, e.target.value as any)}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs"
                      >
                        <option value="assigned">Assigned</option>
                        <option value="in_review">In Review</option>
                        <option value="partner_approved">Partner Approved</option>
                        <option value="filed_iris">Filed on Iris</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Counsel Directory */}
      {activeTab === 'team_directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 shadow-sm space-y-4 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: member.avatarColor || '#0f3c28' }}
                  >
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{member.name}</h3>
                    <p className="text-xs text-slate-400">{member.designation}</p>
                  </div>
                </div>
                {getRoleBadge(member.role)}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enrolment: <strong className="text-slate-200 font-mono">{member.barOrRegNumber}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {member.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400">Hourly Rate:</span>{' '}
                  <strong className="text-emerald-400 font-mono">PKR {member.hourlyRatePKR.toLocaleString()}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setMemberForm({ ...member });
                      setIsMemberModalOpen(true);
                    }}
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-300 transition"
                    title="Edit profile"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {member.role !== 'managing_partner' && (
                    <button
                      onClick={() => handleDeleteMember(member.id, member.name)}
                      className="p-1.5 rounded hover:bg-rose-950 text-rose-400 transition"
                      title="Remove from roster"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Workload & Rate Matrix */}
      {activeTab === 'workload_matrix' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Law Firm Capacity & Billing Rate Structure</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review active mandates assigned per counsel member along with billable hourly schedules.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Counsel Member</th>
                  <th className="py-2.5 px-3">Role Designation</th>
                  <th className="py-2.5 px-3">Active Case Load</th>
                  <th className="py-2.5 px-3">Hourly Rate (PKR)</th>
                  <th className="py-2.5 px-3">Primary Legal Competency</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {teamMembers.map((m) => {
                  const casesCount = caseAssignments.filter((c) => c.associateId === m.id).length;
                  return (
                    <tr key={m.id} className="hover:bg-slate-800/40 font-sans">
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{m.name}</td>
                      <td className="py-2.5 px-3">{getRoleBadge(m.role)}</td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          casesCount > 4 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          casesCount > 2 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {casesCount} Active Mandates
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                        PKR {m.hourlyRatePKR.toLocaleString()} / hr
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-xs">
                        {m.specialization.join(' • ')}
                      </td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          Active Counsel
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Case Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Assign Case Mandate to Associate
              </h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Select Client</label>
                  <select
                    value={newAssignment.clientId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, clientId: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    {clientLedger.map((c) => (
                      <option key={c.id} value={c.id}>{c.clientName} ({c.taxYear})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Assign to Associate</label>
                  <select
                    value={newAssignment.associateId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, associateId: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.designation})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Directing Partner</label>
                  <select
                    value={newAssignment.assignedByPartnerId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, assignedByPartnerId: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    {teamMembers.filter((m) => m.role.includes('partner')).map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    value={newAssignment.deadlineDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, deadlineDate: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Scope of Legal Mandate & Task Description</label>
                <input
                  type="text"
                  value={newAssignment.taskScope}
                  onChange={(e) => setNewAssignment({ ...newAssignment, taskScope: e.target.value })}
                  placeholder="e.g. Section 114 Return E-Filing, Section 111 Notice Reply"
                  className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Priority Level</label>
                  <select
                    value={newAssignment.priority}
                    onChange={(e) => setNewAssignment({ ...newAssignment, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Estimated Billable Hours</label>
                  <input
                    type="number"
                    value={newAssignment.estimatedHours}
                    onChange={(e) => setNewAssignment({ ...newAssignment, estimatedHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Partner Directives & Audit Notes</label>
                <textarea
                  rows={3}
                  value={newAssignment.internalNotes}
                  onChange={(e) => setNewAssignment({ ...newAssignment, internalNotes: e.target.value })}
                  placeholder="Provide specific instructions for the associate..."
                  className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssignment}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Dispatch Assignment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                {editingMember ? 'Edit Counsel Profile' : 'Add New Team Member'}
              </h3>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="e.g. Advocate Hamza Malik, ACA"
                  className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Role Hierarchy</label>
                  <select
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    <option value="managing_partner">Managing Partner</option>
                    <option value="senior_partner">Senior Partner</option>
                    <option value="senior_associate">Senior Associate</option>
                    <option value="junior_associate">Junior Associate</option>
                    <option value="tax_trainee">CA Trainee / Paralegal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Professional Designation</label>
                  <input
                    type="text"
                    value={memberForm.designation}
                    onChange={(e) => setMemberForm({ ...memberForm, designation: e.target.value })}
                    placeholder="e.g. Senior Associate (Direct Tax)"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Bar / Reg Enrolment No.</label>
                  <input
                    type="text"
                    value={memberForm.barOrRegNumber}
                    onChange={(e) => setMemberForm({ ...memberForm, barOrRegNumber: e.target.value })}
                    placeholder="e.g. LHC/38491/2020"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Hourly Billing Rate (PKR)</label>
                  <input
                    type="number"
                    value={memberForm.hourlyRatePKR}
                    onChange={(e) => setMemberForm({ ...memberForm, hourlyRatePKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    placeholder="counsel@firm.com.pk"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMember}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Member</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
