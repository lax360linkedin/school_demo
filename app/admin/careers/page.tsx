"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  GraduationCap,
  Copy,
  ExternalLink,
  ChevronRight,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  AdminStorage,
  AdminJobItem,
  AdminJobApplication,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminCareersPage() {
  const toast = useAdminToast();

  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [applications, setApplications] = useState<AdminJobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<AdminJobItem | null>(null);

  // Delete Confirm Modal State
  const [deletingJob, setDeletingJob] = useState<AdminJobItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    department: "Secondary School",
    schoolLevel: "Secondary School",
    employmentType: "Full-time",
    location: "Chennai",
    applicationDeadline: "30 Oct 2026",
    status: "Published" as AdminJobItem["status"],
    about: "",
    responsibilities: "",
    requirements: "",
    preferredExperience: "",
    whatWeValue: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setJobs(AdminStorage.getJobs());
    setApplications(AdminStorage.getJobApplications());
  };

  const departments = [
    "All",
    "Secondary School",
    "Middle School",
    "Primary School",
    "School Sports",
    "Student Wellbeing",
    "Academic Administration",
  ];

  const handleOpenAddModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      department: "Secondary School",
      schoolLevel: "Secondary School",
      employmentType: "Full-time",
      location: "Chennai",
      applicationDeadline: "30 Nov 2026",
      status: "Published",
      about: "",
      responsibilities:
        "Deliver rigorous inquiry-based instructional units\nDesign comprehensive assessments aligned with syllabus guidelines\nEngage students in collaborative problem-solving and mentorship",
      requirements:
        "Bachelor's or Master's degree in relevant discipline\nRecognized teaching credential (B.Ed or equivalent)\nStrong classroom management and pastoral care commitment",
      preferredExperience: "2+ years teaching experience in an accredited school environment.",
      whatWeValue: "Inquiry mindset, collaborative spirit, child empathy",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job: AdminJobItem) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      schoolLevel: job.schoolLevel,
      employmentType: job.employmentType,
      location: job.location,
      applicationDeadline: job.applicationDeadline,
      status: job.status,
      about: job.about,
      responsibilities: job.responsibilities ? job.responsibilities.join("\n") : "",
      requirements: job.requirements ? job.requirements.join("\n") : "",
      preferredExperience: job.preferredExperience || "",
      whatWeValue: job.whatWeValue ? job.whatWeValue.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a position title.");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })} ${now.getFullYear()}`;

    const parsedResponsibilities = formData.responsibilities
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedRequirements = formData.requirements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedWhatWeValue = formData.whatWeValue
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingJob) {
      // Update existing position
      const updated: AdminJobItem[] = jobs.map((j) =>
        j.id === editingJob.id
          ? {
              ...j,
              title: formData.title.trim(),
              department: formData.department,
              schoolLevel: formData.schoolLevel,
              employmentType: formData.employmentType,
              location: formData.location.trim(),
              applicationDeadline: formData.applicationDeadline.trim(),
              status: formData.status,
              about: formData.about.trim(),
              responsibilities: parsedResponsibilities,
              requirements: parsedRequirements,
              preferredExperience: formData.preferredExperience.trim(),
              whatWeValue: parsedWhatWeValue,
              lastUpdated: formattedDate,
            }
          : j
      );
      AdminStorage.saveJobs(updated);
      setJobs(updated);
      toast.success("Position updated successfully.");
    } else {
      // Add new position
      const newJob: AdminJobItem = {
        id: `job-${Date.now()}`,
        title: formData.title.trim(),
        department: formData.department,
        schoolLevel: formData.schoolLevel,
        employmentType: formData.employmentType,
        location: formData.location.trim() || "Chennai",
        applicationDeadline: formData.applicationDeadline.trim() || "30 Nov 2026",
        status: formData.status,
        about: formData.about.trim(),
        responsibilities: parsedResponsibilities,
        requirements: parsedRequirements,
        preferredExperience: formData.preferredExperience.trim(),
        whatWeValue: parsedWhatWeValue,
        applicationsCount: 0,
        lastUpdated: formattedDate,
      };
      const updated = [newJob, ...jobs];
      AdminStorage.saveJobs(updated);
      setJobs(updated);
      toast.success("Position added successfully.");
    }

    setIsModalOpen(false);
  };

  const handleDuplicateJob = (job: AdminJobItem) => {
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })} ${now.getFullYear()}`;

    const duplicated: AdminJobItem = {
      ...job,
      id: `job-${Date.now()}`,
      title: `${job.title} (Copy)`,
      status: "Draft",
      applicationsCount: 0,
      lastUpdated: formattedDate,
    };

    const updated = [duplicated, ...jobs];
    AdminStorage.saveJobs(updated);
    setJobs(updated);
    toast.success(`Position "${job.title}" duplicated as Draft.`);
  };

  const handleConfirmDelete = () => {
    if (!deletingJob) return;
    const updated = jobs.filter((j) => j.id !== deletingJob.id);
    AdminStorage.saveJobs(updated);
    setJobs(updated);
    toast.success(`Position "${deletingJob.title}" deleted.`);
    setDeletingJob(null);
  };

  // Filter calculations
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.schoolLevel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || job.status === statusFilter;
    const matchDept =
      departmentFilter === "All" || job.department === departmentFilter;

    return matchSearch && matchStatus && matchDept;
  });

  // Top Metrics
  const openPositionsCount = jobs.filter((j) => j.status === "Published").length;
  const totalApplicationsCount = applications.length;
  const newApplicationsCount = applications.filter((a) => a.status === "New").length;
  const closedPositionsCount = jobs.filter((j) => j.status === "Closed").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE3D7]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Careers</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              Talent Portal
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage opportunities and review career applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 bg-white border border-[#EAE3D7] hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Careers</span>
          </Link>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Position</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-[#EAE3D7] text-sm">
        <Link
          href="/admin/careers"
          className="px-4 py-2.5 font-semibold text-slate-900 border-b-2 border-slate-900 -mb-px transition-colors flex items-center gap-2"
        >
          <BriefcaseBusiness className="w-4 h-4 text-slate-900" />
          <span>Open Positions ({jobs.length})</span>
        </Link>
        <Link
          href="/admin/careers/applications"
          className="px-4 py-2.5 font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-slate-400" />
          <span>Career Applications ({applications.length})</span>
          {newApplicationsCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
              {newApplicationsCount}
            </span>
          )}
        </Link>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Open Positions"
          value={openPositionsCount}
          change="Active on public portal"
          icon={BriefcaseBusiness}
          changeType="neutral"
          accent="emerald"
        />
        <AdminStatCard
          title="Applications"
          value={totalApplicationsCount}
          change="All candidate profiles"
          icon={Users}
          changeType="positive"
          accent="amber"
        />
        <AdminStatCard
          title="New Applications"
          value={newApplicationsCount}
          change="Pending initial review"
          icon={Clock}
          changeType="positive"
          accent="purple"
        />
        <AdminStatCard
          title="Closed Positions"
          value={closedPositionsCount}
          change="Archived or filled"
          icon={CheckCircle2}
          changeType="neutral"
          accent="slate"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EAE3D7] shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by position title or level..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-[#EAE3D7] rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-[#EAE3D7] rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-800"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Department:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-[#EAE3D7] rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-800"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Open Positions Table */}
      <div className="bg-white rounded-2xl border border-[#EAE3D7] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#EAE3D7] text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Position</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">School Level</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-center">Applications</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">
                    No positions found matching the current search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const jobAppsCount = applications.filter(
                    (a) =>
                      a.jobId === job.id ||
                      (a.position && a.position.toLowerCase() === job.title.toLowerCase())
                  ).length;

                  return (
                    <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-900">
                        <div className="font-semibold text-slate-900">{job.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                          Deadline: {job.applicationDeadline}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-medium">
                        {job.department}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {job.schoolLevel}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-medium">
                        {job.employmentType}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {job.location}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            job.status === "Published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : job.status === "Draft"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Link
                          href={`/admin/careers/applications?job=${encodeURIComponent(job.title)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-colors border border-amber-200/60"
                          title="View received applications"
                        >
                          <Users className="w-3 h-3 text-amber-800" />
                          <span>{jobAppsCount}</span>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEditModal(job)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Edit position"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Applications Button */}
                          <Link
                            href={`/admin/careers/applications?job=${encodeURIComponent(job.title)}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="View applications"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Duplicate Button */}
                          <button
                            onClick={() => handleDuplicateJob(job)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Duplicate position"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeletingJob(job)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete position"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? "Edit Position" : "Add New Position"}
        description={
          editingJob
            ? "Update role requirements, status and details."
            : "Create a faculty or staff opening to publish on the school careers portal."
        }
      >
        <form onSubmit={handleSaveJob} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Position Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Mathematics Teacher"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              >
                <option value="Secondary School">Secondary School</option>
                <option value="Middle School">Middle School</option>
                <option value="Primary School">Primary School</option>
                <option value="School Sports">School Sports</option>
                <option value="Student Wellbeing">Student Wellbeing</option>
                <option value="Academic Administration">Academic Administration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* School Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                School Level <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.schoolLevel}
                onChange={(e) => setFormData({ ...formData, schoolLevel: e.target.value })}
                placeholder="e.g. Secondary School"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* Employment Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as AdminJobItem["status"],
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              >
                <option value="Published">Published (Live on Careers)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Chennai"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* Application Deadline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Application Deadline
              </label>
              <input
                type="text"
                value={formData.applicationDeadline}
                onChange={(e) =>
                  setFormData({ ...formData, applicationDeadline: e.target.value })
                }
                placeholder="30 Nov 2026"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>
          </div>

          {/* About the Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">About the Role</label>
            <textarea
              rows={3}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              placeholder="Describe the department ethos, role impact, and student context..."
              className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
            />
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) =>
                setFormData({ ...formData, responsibilities: e.target.value })
              }
              placeholder="Enter responsibilities, one per line"
              className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 font-mono text-[11px]"
            />
          </div>

          {/* Requirements & Qualifications */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Requirements & Qualifications (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Enter qualification and certification requirements, one per line"
              className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Preferred Experience
              </label>
              <input
                type="text"
                value={formData.preferredExperience}
                onChange={(e) =>
                  setFormData({ ...formData, preferredExperience: e.target.value })
                }
                placeholder="e.g. 3+ years in IB / Cambridge schools"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* What We Value */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                What We Value (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.whatWeValue}
                onChange={(e) => setFormData({ ...formData, whatWeValue: e.target.value })}
                placeholder="Inquiry mindset, child empathy, collaborative spirit"
                className="w-full px-3 py-2 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
            >
              {editingJob ? "Update Position" : "Publish Position"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRM MODAL */}
      <AdminModal
        isOpen={!!deletingJob}
        onClose={() => setDeletingJob(null)}
        title="Delete Position"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs leading-relaxed">
              Are you sure you want to delete position &quot;<strong>{deletingJob?.title}</strong>&quot;?
              This will remove the opening from both the admin portal and public careers page.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setDeletingJob(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
