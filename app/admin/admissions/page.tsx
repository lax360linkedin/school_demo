"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  AdminStorage,
  AdminAdmissionStepItem,
  AdminAdmissionDeadline,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminAdmissionsPage() {
  const toast = useAdminToast();
  const [steps, setSteps] = useState<AdminAdmissionStepItem[]>([]);
  const [deadlines, setDeadlines] = useState<AdminAdmissionDeadline[]>([]);

  // Step modal
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<AdminAdmissionStepItem | null>(null);
  const [stepTitle, setStepTitle] = useState("");
  const [stepTimeline, setStepTimeline] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [stepRequirements, setStepRequirements] = useState("");

  // Deadline modal
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<AdminAdmissionDeadline | null>(null);
  const [roundName, setRoundName] = useState("");
  const [targetGrades, setTargetGrades] = useState("");
  const [subDeadline, setSubDeadline] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [deadlineStatus, setDeadlineStatus] = useState<AdminAdmissionDeadline["status"]>("Open");

  useEffect(() => {
    setSteps(AdminStorage.getAdmissionSteps());
    setDeadlines(AdminStorage.getAdmissionDeadlines());
  }, []);

  // Step handlers
  const handleOpenAddStep = () => {
    setEditingStep(null);
    setStepTitle("");
    setStepTimeline(`Step ${steps.length + 1} • Timeline`);
    setStepDescription("");
    setStepRequirements("Academic Records, ID Verification");
    setIsStepModalOpen(true);
  };

  const handleOpenEditStep = (st: AdminAdmissionStepItem) => {
    setEditingStep(st);
    setStepTitle(st.title);
    setStepTimeline(st.timeline);
    setStepDescription(st.description);
    setStepRequirements(st.requirements.join(", "));
    setIsStepModalOpen(true);
  };

  const handleSaveStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepTitle.trim() || !stepDescription.trim()) {
      toast.error("Please provide step title and description.");
      return;
    }

    const reqArr = stepRequirements
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const updated = [...steps];
    if (editingStep) {
      const idx = updated.findIndex((s) => s.id === editingStep.id);
      if (idx !== -1) {
        updated[idx] = {
          ...editingStep,
          title: stepTitle,
          timeline: stepTimeline,
          description: stepDescription,
          requirements: reqArr,
        };
        toast.success(`Admission step "${stepTitle}" updated.`);
      }
    } else {
      const newStep: AdminAdmissionStepItem = {
        id: `step-${Date.now()}`,
        stepNumber: steps.length + 1,
        title: stepTitle,
        timeline: stepTimeline || `Step ${steps.length + 1}`,
        description: stepDescription,
        requirements: reqArr,
        status: "Active",
      };
      updated.push(newStep);
      toast.success(`New admission step "${stepTitle}" added.`);
    }

    setSteps(updated);
    AdminStorage.saveAdmissionSteps(updated);
    setIsStepModalOpen(false);
  };

  const handleDeleteStep = (id: string, title: string) => {
    if (window.confirm(`Delete admission step "${title}"?`)) {
      const updated = steps.filter((s) => s.id !== id);
      setSteps(updated);
      AdminStorage.saveAdmissionSteps(updated);
      toast.info(`Step "${title}" deleted.`);
    }
  };

  // Deadline handlers
  const handleOpenAddDeadline = () => {
    setEditingDeadline(null);
    setRoundName("Late Admissions Cohort");
    setTargetGrades("All Grades (Nursery – 12)");
    setSubDeadline("28 Feb 2027");
    setInterviewDate("05 – 08 Mar 2027");
    setResultDate("15 Mar 2027");
    setDeadlineStatus("Open");
    setIsDeadlineModalOpen(true);
  };

  const handleOpenEditDeadline = (d: AdminAdmissionDeadline) => {
    setEditingDeadline(d);
    setRoundName(d.round);
    setTargetGrades(d.targetGrades);
    setSubDeadline(d.submissionDeadline);
    setInterviewDate(d.interviewDate);
    setResultDate(d.resultDate);
    setDeadlineStatus(d.status);
    setIsDeadlineModalOpen(true);
  };

  const handleSaveDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roundName.trim() || !subDeadline.trim()) {
      toast.error("Please provide round name and submission deadline.");
      return;
    }

    const updated = [...deadlines];
    if (editingDeadline) {
      const idx = updated.findIndex((d) => d.id === editingDeadline.id);
      if (idx !== -1) {
        updated[idx] = {
          ...editingDeadline,
          round: roundName,
          targetGrades,
          submissionDeadline: subDeadline,
          interviewDate,
          resultDate,
          status: deadlineStatus,
        };
        toast.success(`Admissions cohort "${roundName}" updated.`);
      }
    } else {
      const newD: AdminAdmissionDeadline = {
        id: `deadline-${Date.now()}`,
        round: roundName,
        targetGrades,
        submissionDeadline: subDeadline,
        interviewDate,
        resultDate,
        status: deadlineStatus,
      };
      updated.push(newD);
      toast.success(`New cohort deadline "${roundName}" created.`);
    }

    setDeadlines(updated);
    AdminStorage.saveAdmissionDeadlines(updated);
    setIsDeadlineModalOpen(false);
  };

  const handleDeleteDeadline = (id: string, name: string) => {
    if (window.confirm(`Delete deadline cohort "${name}"?`)) {
      const updated = deadlines.filter((d) => d.id !== id);
      setDeadlines(updated);
      AdminStorage.saveAdmissionDeadlines(updated);
      toast.info(`Cohort "${name}" removed.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Admissions Roadmap & Cohort Cycles
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure application procedures, parent evaluation stages, key deadlines, and merit interview dates
        </p>
      </div>

      {/* Section 1: 4-Step Application Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-slate-900" />
            <h3 className="text-sm font-bold text-slate-900">
              4-Step Application Architecture
            </h3>
          </div>
          <button
            type="button"
            onClick={handleOpenAddStep}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, index) => (
            <div
              key={st.id}
              className="p-5 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{st.timeline}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Required Docs:
                  </p>
                  <ul className="space-y-0.5">
                    {st.requirements.map((req, rIdx) => (
                      <li
                        key={rIdx}
                        className="text-[10px] text-slate-500 flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEditStep(st)}
                  className="px-2 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStep(st.id, st.title)}
                  className="px-2 py-1 rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Admissions Deadlines & Cohorts */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-900" />
            <h3 className="text-sm font-bold text-slate-900">
              Admission Cycles & Deadlines (2026–2027)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleOpenAddDeadline}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Cohort</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deadlines.map((d) => (
            <div
              key={d.id}
              className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      d.status === "Open"
                        ? "bg-emerald-50 text-emerald-800"
                        : d.status === "Closing Soon"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {d.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{d.id}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{d.round}</h4>
                  <p className="text-xs text-amber-800 font-medium mt-0.5">{d.targetGrades}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Submission Closes:</span>
                    <strong className="text-slate-900">{d.submissionDeadline}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Interviews & Visits:</span>
                    <span className="text-slate-800">{d.interviewDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Offer Notification:</span>
                    <span className="text-slate-800">{d.resultDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditDeadline(d)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteDeadline(d.id, d.round)}
                  className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Modal */}
      <AdminModal
        isOpen={isStepModalOpen}
        onClose={() => setIsStepModalOpen(false)}
        title={editingStep ? "Edit Admission Roadmap Step" : "Add Admission Roadmap Step"}
        description="Detail applicant instructions, timeline expectations, and mandatory documentation."
      >
        <form onSubmit={handleSaveStep} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Step Title *
            </label>
            <input
              type="text"
              required
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              placeholder="e.g. Online Enquiry & Registration"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Timeline Label
            </label>
            <input
              type="text"
              value={stepTimeline}
              onChange={(e) => setStepTimeline(e.target.value)}
              placeholder="e.g. Step 1 • 20 Mins"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Step Description *
            </label>
            <textarea
              rows={3}
              required
              value={stepDescription}
              onChange={(e) => setStepDescription(e.target.value)}
              placeholder="Guidance for parents on what occurs during this phase..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Required Documents (comma separated)
            </label>
            <input
              type="text"
              value={stepRequirements}
              onChange={(e) => setStepRequirements(e.target.value)}
              placeholder="e.g. Birth Certificate copy, Previous 2 years academic transcripts"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsStepModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Save Step
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Deadline Modal */}
      <AdminModal
        isOpen={isDeadlineModalOpen}
        onClose={() => setIsDeadlineModalOpen(false)}
        title={editingDeadline ? "Edit Cohort Cycle" : "Add Cohort Cycle"}
        description="Specify application deadlines, interview periods, and result notification schedules."
      >
        <form onSubmit={handleSaveDeadline} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Cohort / Round Name *
            </label>
            <input
              type="text"
              required
              value={roundName}
              onChange={(e) => setRoundName(e.target.value)}
              placeholder="e.g. Early Bird Admissions Cycle 2026–27"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Grades
              </label>
              <input
                type="text"
                value={targetGrades}
                onChange={(e) => setTargetGrades(e.target.value)}
                placeholder="e.g. Early Childhood & Grade 1"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Cycle Status
              </label>
              <select
                value={deadlineStatus}
                onChange={(e) =>
                  setDeadlineStatus(e.target.value as AdminAdmissionDeadline["status"])
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Open">Open</option>
                <option value="Closing Soon">Closing Soon</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Submission Deadline *
              </label>
              <input
                type="text"
                required
                value={subDeadline}
                onChange={(e) => setSubDeadline(e.target.value)}
                placeholder="15 Oct 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Interviews Period
              </label>
              <input
                type="text"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                placeholder="22 – 25 Oct 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Result Date
              </label>
              <input
                type="text"
                value={resultDate}
                onChange={(e) => setResultDate(e.target.value)}
                placeholder="30 Oct 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDeadlineModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Save Cohort
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
