/**
 * LAX360 Administration Portal - Admissions & Campus Analytics Dataset
 * Frontend-only dataset for admissions velocity, engagement, and conversion tracking.
 */

export interface MonthlyAnalyticsRecord {
  month: string;
  year: number;
  label: string; // e.g. "Oct '25" or "Sep '26"
  enquiries: number;
  campusVisits: number;
  enrolments: number;
  conversionRate: number; // percentage (enrolments / enquiries)
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
}

export interface GradeDistribution {
  level: string;
  grades: string;
  percentage: number;
  inquiries: number;
  color: string;
}

export interface WebEngagementMetric {
  path: string;
  name: string;
  uniqueViews: string;
  avgDuration: string;
  bounceRate: string;
}

// 12-Month Historical & Current Dataset (Oct 2025 to Sep 2026)
export const admissionsAnalyticsData: MonthlyAnalyticsRecord[] = [
  { month: "Oct", year: 2025, label: "Oct '25", enquiries: 52, campusVisits: 32, enrolments: 14, conversionRate: 26.9 },
  { month: "Nov", year: 2025, label: "Nov '25", enquiries: 64, campusVisits: 38, enrolments: 18, conversionRate: 28.1 },
  { month: "Dec", year: 2025, label: "Dec '25", enquiries: 48, campusVisits: 29, enrolments: 15, conversionRate: 31.2 },
  { month: "Jan", year: 2026, label: "Jan '26", enquiries: 88, campusVisits: 54, enrolments: 28, conversionRate: 31.8 },
  { month: "Feb", year: 2026, label: "Feb '26", enquiries: 98, campusVisits: 62, enrolments: 32, conversionRate: 32.6 },
  { month: "Mar", year: 2026, label: "Mar '26", enquiries: 115, campusVisits: 75, enrolments: 39, conversionRate: 33.9 },
  { month: "Apr", year: 2026, label: "Apr '26", enquiries: 128, campusVisits: 84, enrolments: 44, conversionRate: 34.3 },
  { month: "May", year: 2026, label: "May '26", enquiries: 142, campusVisits: 96, enrolments: 49, conversionRate: 34.5 },
  { month: "Jun", year: 2026, label: "Jun '26", enquiries: 120, campusVisits: 78, enrolments: 41, conversionRate: 34.1 },
  { month: "Jul", year: 2026, label: "Jul '26", enquiries: 95, campusVisits: 58, enrolments: 30, conversionRate: 31.5 },
  { month: "Aug", year: 2026, label: "Aug '26", enquiries: 135, campusVisits: 90, enrolments: 48, conversionRate: 35.5 },
  { month: "Sep", year: 2026, label: "Sep '26", enquiries: 148, campusVisits: 104, enrolments: 52, conversionRate: 35.1 },
];

/**
 * Returns either the last 6 months (Apr-Sep) or last 1 year (Oct-Sep) of data.
 */
export function getAdmissionsData(range: "6m" | "1y"): MonthlyAnalyticsRecord[] {
  if (range === "6m") {
    return admissionsAnalyticsData.slice(-6); // Apr, May, Jun, Jul, Aug, Sep
  }
  return admissionsAnalyticsData; // All 12 months
}

export function getAnalyticsSummary(data: MonthlyAnalyticsRecord[]) {
  const totalEnquiries = data.reduce((acc, curr) => acc + curr.enquiries, 0);
  const totalVisits = data.reduce((acc, curr) => acc + curr.campusVisits, 0);
  const totalEnrolments = data.reduce((acc, curr) => acc + curr.enrolments, 0);
  const avgConversion = totalEnquiries > 0 ? ((totalEnrolments / totalEnquiries) * 100).toFixed(1) : "0.0";

  return {
    totalEnquiries,
    totalVisits,
    totalEnrolments,
    avgConversion: `${avgConversion}%`,
  };
}

export const admissionsFunnelData: FunnelStage[] = [
  {
    stage: "Inquiries & Registrations",
    count: 1133,
    percentage: 100,
    color: "bg-slate-900 text-white",
    description: "Initial inquiries received via web forms, telephone desk, and direct parent walk-ins.",
  },
  {
    stage: "Campus Walkthroughs & Assessments",
    count: 800,
    percentage: 70.6,
    color: "bg-amber-600 text-white",
    description: "Escorted tours, laboratory visits, and student readiness diagnostic interactions.",
  },
  {
    stage: "Applications Under Evaluation",
    count: 520,
    percentage: 45.8,
    color: "bg-blue-600 text-white",
    description: "Verified academic transcripts, medical forms, and committee reviews.",
  },
  {
    stage: "Confirmed Enrolments",
    count: 410,
    percentage: 36.2,
    color: "bg-emerald-600 text-white",
    description: "Seat allocations finalized across Nursery through Senior Secondary IBDP.",
  },
];

export const gradeLevelDemands: GradeDistribution[] = [
  { level: "Early Childhood", grades: "Nursery, LKG, UKG", percentage: 28, inquiries: 317, color: "bg-amber-500" },
  { level: "Primary School", grades: "Grades 1 to 5", percentage: 32, inquiries: 362, color: "bg-slate-900" },
  { level: "Middle School", grades: "Grades 6 to 8", percentage: 21, inquiries: 238, color: "bg-blue-600" },
  { level: "Cambridge IGCSE", grades: "Grades 9 & 10", percentage: 11, inquiries: 125, color: "bg-emerald-600" },
  { level: "Senior Secondary (IBDP / A-Level)", grades: "Grades 11 & 12", percentage: 8, inquiries: 91, color: "bg-purple-600" },
];

export const digitalCampusEngagement: WebEngagementMetric[] = [
  { path: "/", name: "Home (Cinematic Campus Experience)", uniqueViews: "42,850", avgDuration: "2m 45s", bounceRate: "28.4%" },
  { path: "/programs", name: "Academic Programs & Stages", uniqueViews: "28,420", avgDuration: "3m 12s", bounceRate: "24.1%" },
  { path: "/admissions", name: "Admissions Roadmap & Application", uniqueViews: "24,960", avgDuration: "4m 05s", bounceRate: "19.8%" },
  { path: "/facilities", name: "Labs, Sports & Infrastructure", uniqueViews: "18,340", avgDuration: "2m 20s", bounceRate: "32.6%" },
  { path: "/campus-life", name: "Houses, Clubs & Annual Events", uniqueViews: "16,110", avgDuration: "2m 15s", bounceRate: "34.0%" },
  { path: "/careers", name: "Faculty Openings & Opportunities", uniqueViews: "12,480", avgDuration: "3m 35s", bounceRate: "22.5%" },
];
