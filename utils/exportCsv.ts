/**
 * LAX360 Administration Portal - Client-Side CSV Export Utility
 * Generates and triggers instant browser downloads without backend or external APIs.
 */

import { AdminEnquiryItem, AdminJobApplication } from "@/lib/adminStorage";
import { MonthlyAnalyticsRecord, admissionsAnalyticsData } from "@/data/analyticsData";

function downloadCsvBlob(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportEnquiriesCsv(enquiries: AdminEnquiryItem[]) {
  const headers = "ID,Name,Parent/Guardian,Student,Target Grade,Email,Phone,Enquiry Type,Date,Status,Notes\n";
  const rows = enquiries
    .map(
      (e) =>
        `"${e.id}","${e.name}","${e.parentName || ""}","${e.studentName || ""}","${
          e.targetGrade || ""
        }","${e.email}","${e.phone}","${e.type}","${e.date}","${e.status}","${(e.notes || "").replace(/"/g, '""')}"`
    )
    .join("\n");
  downloadCsvBlob(headers + rows, "lax360-enquiries.csv");
}

export function exportApplicationsCsv(applications: AdminJobApplication[]) {
  const headers = "Application ID,Applicant Name,Position,Email,Phone,Qualification,Experience,Date Applied,Status,Resume File\n";
  const rows = applications
    .map(
      (a) =>
        `"${a.id}","${a.fullName || a.candidateName || ""}","${a.position || a.jobTitle || ""}","${a.email}","${
          a.phone
        }","${a.highestQualification || ""}","${a.experienceYears || ""}","${a.appliedDate || a.submittedDate || ""}","${
          a.status
        }","${a.resumeFileName || ""}"`
    )
    .join("\n");
  downloadCsvBlob(headers + rows, "lax360-applications.csv");
}

export function exportAdmissionsAnalyticsCsv(data: MonthlyAnalyticsRecord[] = admissionsAnalyticsData) {
  const headers = "Month,Year,Period,Admission Enquiries,Campus Visits,Confirmed Enrolments,Conversion Ratio (%)\n";
  const rows = data
    .map((r) => `"${r.month}","${r.year}","${r.label}","${r.enquiries}","${r.campusVisits}","${r.enrolments}","${r.conversionRate}%"`)
    .join("\n");
  downloadCsvBlob(headers + rows, "lax360-admissions-analytics.csv");
}

export function exportCampusVisitsCsv(data: MonthlyAnalyticsRecord[] = admissionsAnalyticsData) {
  const headers = "Month,Year,Escorted Campus Tours,Enquiry Walkthrough Ratio (%),Enrolment Yield\n";
  const rows = data
    .map((r) => {
      const walkRatio = ((r.campusVisits / r.enquiries) * 100).toFixed(1);
      return `"${r.month}","${r.year}","${r.campusVisits}","${walkRatio}%","${r.enrolments}"`;
    })
    .join("\n");
  downloadCsvBlob(headers + rows, "lax360-campus-visits.csv");
}

export function exportCompleteAnalyticsReportCsv(
  data: MonthlyAnalyticsRecord[] = admissionsAnalyticsData,
  enquiriesCount = 148,
  applicationsCount = 12
) {
  let content = "LAX360 ACADEMY - INSTITUTIONAL ANALYTICS SUMMARY REPORT\n";
  content += `"Generated:","${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString()}"\n`;
  content += `"Total Active Enquiries:","${enquiriesCount}"\n`;
  content += `"Active Career Applications:","${applicationsCount}"\n\n`;

  content += "MONTHLY ADMISSIONS & ENGAGEMENT METRICS\n";
  content += "Period,Enquiries,Campus Visits,Enrolments,Conversion Rate\n";
  data.forEach((r) => {
    content += `"${r.label}","${r.enquiries}","${r.campusVisits}","${r.enrolments}","${r.conversionRate}%"\n`;
  });

  downloadCsvBlob(content, "lax360-analytics-report.csv");
}
