/**
 * LAX360 Administration Portal - LocalStorage Demo Persistence Layer
 * Frontend-only demo state storage with realistic Indian school datasets.
 */

export interface AdminProgramItem {
  id: string;
  name: string;
  ageRange: string;
  grades: string;
  tagline: string;
  description: string;
  approach: string;
  highlight: string;
  status: "Active" | "Draft";
  updatedAt: string;
}

export interface AdminEventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: "Academic" | "Sports" | "Cultural" | "Parent Meeting" | "Leadership" | "Technology";
  description: string;
  location: string;
  image: string;
  status: "Published" | "Draft";
  targetGrades: string;
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Academics" | "Sports" | "Events" | "Student Life";
  image: string;
  uploadDate: string;
  caption: string;
}

export interface AdminEnquiryItem {
  id: string;
  name: string;
  parentName?: string;
  studentName?: string;
  targetGrade?: string;
  email: string;
  phone: string;
  type: "Admission" | "General" | "Campus Visit" | "Transfer";
  message: string;
  date: string;
  status: "New" | "Read" | "Resolved";
  notes?: string;
}

export interface AdminFacilityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string;
  features: string[];
  image: string;
  status: "Operational" | "Maintenance" | "Renovating";
}

export interface AdminContentSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  lastUpdated: string;
  status: "Published" | "Review Required";
}

export interface AdminSettings {
  schoolName: string;
  tagline: string;
  established: number;
  admissionsEmail: string;
  generalEmail: string;
  admissionsPhone: string;
  generalPhone: string;
  whatsApp: string;
  address: string;
  hours: string;
  primaryColor: string;
  academicCurriculum: string[];
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
}

export interface AdminCampusActivityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  tags: string[];
  status: "Active" | "Draft";
}

export interface AdminClubItem {
  id: string;
  name: string;
  category: "Academic" | "Sports" | "Arts & Culture" | "Leadership" | "STEM";
  patron: string;
  members: number;
  meetingDay: string;
  description: string;
  status: "Active" | "Archived";
}

export interface AdminHouseItem {
  id: string;
  name: string;
  color: string;
  captain: string;
  viceCaptain: string;
  mentor: string;
  points: number;
  motto: string;
}

export interface AdminAdmissionStepItem {
  id: string;
  stepNumber: number;
  title: string;
  timeline: string;
  description: string;
  requirements: string[];
  status: "Active" | "Paused";
}

export interface AdminAdmissionDeadline {
  id: string;
  round: string;
  targetGrades: string;
  submissionDeadline: string;
  interviewDate: string;
  resultDate: string;
  status: "Open" | "Closing Soon" | "Closed";
}

export interface AdminJobItem {
  id: string;
  title: string;
  department: string;
  schoolLevel: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | string;
  location: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  preferredExperience: string;
  whatWeValue: string[];
  applicationDeadline: string;
  status: "Published" | "Draft" | "Closed";
  applicationsCount: number;
  lastUpdated: string;
  // Aliases for compatibility
  description?: string;
  experience?: string;
}

export interface AdminJobApplication {
  id: string;
  jobId: string;
  position: string;
  fullName: string;
  email: string;
  phone: string;
  highestQualification: string;
  experienceYears: string;
  resumeFileName: string;
  coverLetter: string;
  portfolioUrl?: string;
  consentGiven: boolean;
  appliedDate: string;
  status: "New" | "Under Review" | "Shortlisted" | "Rejected" | "Selected";
  notes?: string;
  // Aliases for compatibility
  candidateName?: string;
  jobTitle?: string;
  submittedDate?: string;
}

export interface AdminPrivacyRequest {
  id: string;
  name: string;
  email: string;
  requestType:
    | "Access my personal data"
    | "Correct my personal data"
    | "Erase my personal data"
    | "Withdraw consent"
    | "Raise a grievance"
    | "Correction / Update details"
    | "Erasure / Deletion of data"
    | "Withdrawal of consent"
    | "Grievance / Question"
    | string;
  message: string;
  submittedDate: string;
  status: "Pending" | "In Review" | "Resolved" | "Fulfilled" | "Rejected";
  notes?: string;
  verifiedParent?: boolean;
}

export interface AdminConsentRecord {
  id: string;
  user?: string;
  subjectName?: string;
  subjectEmail?: string;
  consentType?: string;
  channel?: string;
  ipAddress?: string;
  noticeText?: string;
  timestamp?: string;
  purpose: "Contact Form" | "Career Application" | "Admissions Enquiry" | "Analytics Cookies" | "Marketing Communications" | string;
  consent?: "Granted" | "Withdrawn" | string;
  date?: string;
  status?: "Active" | "Archived" | string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  decided: boolean;
  lastUpdated?: string;
}

// Initial Realistic Indian School Demo Datasets
const DEFAULT_PROGRAMS: AdminProgramItem[] = [
  {
    id: "early-years",
    name: "Early Childhood & Kindergarten",
    ageRange: "Ages 3 – 5",
    grades: "Nursery to Kindergarten",
    tagline: "Wonder, Play, and Foundational Discovery",
    description:
      "Nurturing natural curiosity through an inquiry-rich Reggio-Emilia-inspired framework that builds linguistic confidence, sensory exploration, and emotional resilience.",
    approach: "Play-based inquiry & multimodal sensory discovery",
    highlight: "Dedicated bio-garden and tactile sensory discovery studios.",
    status: "Active",
    updatedAt: "12 Sep 2026",
  },
  {
    id: "primary-school",
    name: "Primary School",
    ageRange: "Ages 6 – 10",
    grades: "Grades 1 – 5",
    tagline: "Building Inquiring Minds & Critical Foundations",
    description:
      "Fostering conceptual understanding across math, science, and languages through the International Baccalaureate Primary Years Programme (PYP).",
    approach: "Transdisciplinary units of inquiry & experiential team challenges",
    highlight: "Annual student-led scientific showcase and multilingual literature festivals.",
    status: "Active",
    updatedAt: "14 Sep 2026",
  },
  {
    id: "middle-school",
    name: "Middle School",
    ageRange: "Ages 11 – 14",
    grades: "Grades 6 – 8",
    tagline: "Intellectual Agility & Self-Actualization",
    description:
      "Guiding adolescents through a rigorous academic curriculum linking theoretical concepts with authentic global challenges, ethical leadership, and innovation.",
    approach: "Interdisciplinary projects, Socratic seminars & design sprints",
    highlight: "Regional Model UN, robotics leagues, and 40 hrs/yr community service.",
    status: "Active",
    updatedAt: "15 Sep 2026",
  },
  {
    id: "secondary-school",
    name: "Secondary School (Grades 9–10)",
    ageRange: "Ages 14 – 16",
    grades: "Grades 9 – 10",
    tagline: "Disciplinary Mastery & Cambridge IGCSE Excellence",
    description:
      "Rigorous pre-university preparatory curriculum focusing on analytical depth, laboratory research, and bilingual proficiency under Cambridge CAIE specifications.",
    approach: "Collegiate seminars, laboratory thesis & debate colloquia",
    highlight: "100% distinction pass rate across international board exams.",
    status: "Active",
    updatedAt: "15 Sep 2026",
  },
  {
    id: "senior-secondary",
    name: "Senior Secondary & IB Diploma",
    ageRange: "Ages 16 – 18",
    grades: "Grades 11 – 12",
    tagline: "Pre-University Distinction & Global Leadership",
    description:
      "Offering the prestigious IB Diploma Programme and Cambridge International A-Levels, equipping graduates to excel at premier universities worldwide.",
    approach: "University-style colloquia, independent thesis & global mentorship",
    highlight: "100% placement across top global and premier Indian collegiate institutions.",
    status: "Active",
    updatedAt: "16 Sep 2026",
  },
];

const DEFAULT_EVENTS: AdminEventItem[] = [
  {
    id: "sports-day-2026",
    title: "Annual Athletics Meet & Sports Day",
    date: "25 Sep 2026",
    time: "08:30 AM – 03:30 PM",
    category: "Sports",
    description:
      "Inter-house track and field championships, relay races, archery exhibitions, and grand march past at the Olympic Sports Ground.",
    location: "Olympic Sports Ground & Pavilion",
    image: "/images/campus/athletics.jpg",
    status: "Published",
    targetGrades: "All Grades (1 to 12)",
  },
  {
    id: "science-expo-2026",
    title: "Inter-School Science & Innovation Exhibition",
    date: "02 Oct 2026",
    time: "09:00 AM – 04:00 PM",
    category: "Academic",
    description:
      "Students present working prototypes in clean energy, IoT water purification, robotics, and applied biotechnology to visiting scientists.",
    location: "Main Science Laboratories & Auditorium",
    image: "/images/campus/lab.jpg",
    status: "Published",
    targetGrades: "Grades 6 to 12",
  },
  {
    id: "cultural-fest-2026",
    title: "Annual Day & World Cultural Biennale",
    date: "14 Oct 2026",
    time: "05:00 PM – 09:00 PM",
    category: "Cultural",
    description:
      "A grand celebration of music, theatrical productions, classical and contemporary dance, folk literature, and world heritage cuisine.",
    location: "Music & Performing Arts Auditorium",
    image: "/images/campus/cultural-fest.jpg",
    status: "Published",
    targetGrades: "All Students & Families",
  },
  {
    id: "ptm-term-1",
    title: "Term 1 Parent-Teacher Academic Conference",
    date: "20 Oct 2026",
    time: "09:00 AM – 02:00 PM",
    category: "Parent Meeting",
    description:
      "Individual 1-on-1 consultations between parents and faculty discussing formative assessment outcomes, student well-being, and goals.",
    location: "Smart Classrooms & Academic Wings",
    image: "/images/campus/classroom.jpg",
    status: "Published",
    targetGrades: "Grades Nursery to 12",
  },
  {
    id: "mun-conference-2026",
    title: "LAX360 International Model UN (MUN)",
    date: "06 Nov 2026",
    time: "08:00 AM – 05:00 PM",
    category: "Leadership",
    description:
      "Over 350 student delegates from 30 leading schools debate multilateral treaties on climate resilience and global technological ethics.",
    location: "Central Conference Hall & Knowledge Commons",
    image: "/images/campus/mun.jpg",
    status: "Published",
    targetGrades: "Grades 8 to 12",
  },
  {
    id: "robotics-national-league",
    title: "National STEM & VEX Robotics Qualifier",
    date: "18 Nov 2026",
    time: "09:30 AM – 04:30 PM",
    category: "Technology",
    description:
      "Autonomous bot obstacle challenge, precision programming trials, and 3D prototyping showdown.",
    location: "Computer & Robotics Innovation Hub",
    image: "/images/campus/robotics-club.jpg",
    status: "Published",
    targetGrades: "Grades 6 to 12",
  },
  {
    id: "arts-vernissage-winter",
    title: "Winter Visual Arts & Photography Vernissage",
    date: "10 Dec 2026",
    time: "10:00 AM – 06:00 PM",
    category: "Cultural",
    description:
      "Public gallery exhibition showcasing student oil paintings, ceramic sculptures, architectural sketches, and digital art portfolios.",
    location: "Atrium Fine Arts Gallery",
    image: "/images/campus/visual-arts.jpg",
    status: "Draft",
    targetGrades: "Grades 9 to 12",
  },
];

const DEFAULT_GALLERY: AdminGalleryItem[] = [
  {
    id: "gal-1",
    title: "Championship Athletics Match",
    category: "Sports",
    image: "/images/campus/athletics.jpg",
    uploadDate: "16 Sep 2026",
    caption: "Inter-school football tournament finals on the campus turf.",
  },
  {
    id: "gal-2",
    title: "School Symphony Orchestra Performance",
    category: "Events",
    image: "/images/campus/music.jpg",
    uploadDate: "15 Sep 2026",
    caption: "60-piece orchestra performing on the auditorium stage.",
  },
  {
    id: "gal-3",
    title: "Fine Arts & Studio Painting",
    category: "Student Life",
    image: "/images/campus/visual-arts.jpg",
    uploadDate: "15 Sep 2026",
    caption: "Students exploring canvas and watercolor mediums.",
  },
  {
    id: "gal-4",
    title: "Robotics Guild Testing Session",
    category: "Academics",
    image: "/images/campus/robotics-club.jpg",
    uploadDate: "14 Sep 2026",
    caption: "Fine-tuning autonomous vision algorithms on the competitive bot.",
  },
  {
    id: "gal-5",
    title: "Model United Nations Delegation",
    category: "Student Life",
    image: "/images/campus/mun.jpg",
    uploadDate: "13 Sep 2026",
    caption: "Student delegate addressing the assembly at the podium.",
  },
  {
    id: "gal-6",
    title: "Ecological Nature Field Expedition",
    category: "Campus",
    image: "/images/campus/field-trips.jpg",
    uploadDate: "12 Sep 2026",
    caption: "Biodiversity survey and botanical field study in the hills.",
  },
  {
    id: "gal-7",
    title: "Annual Cultural Day Celebrations",
    category: "Events",
    image: "/images/campus/cultural-fest.jpg",
    uploadDate: "11 Sep 2026",
    caption: "Folk performance celebrating India's rich cultural heritage.",
  },
  {
    id: "gal-8",
    title: "Clean Energy & Filtration Prototype",
    category: "Academics",
    image: "/images/campus/social-impact.jpg",
    uploadDate: "10 Sep 2026",
    caption: "Students collaborating on solar-powered water filtration.",
  },
  {
    id: "gal-9",
    title: "Smart Classroom Digital Seminar",
    category: "Academics",
    image: "/images/campus/classroom.jpg",
    uploadDate: "09 Sep 2026",
    caption: "Interactive 85-inch digital display for global geography.",
  },
  {
    id: "gal-10",
    title: "Biotechnology & Chemistry Lab",
    category: "Academics",
    image: "/images/campus/lab.jpg",
    uploadDate: "08 Sep 2026",
    caption: "High school scholars conducting titration and microscopy.",
  },
  {
    id: "gal-11",
    title: "Double-Height Library Sanctuary",
    category: "Campus",
    image: "/images/campus/library.jpg",
    uploadDate: "07 Sep 2026",
    caption: "Over 35,000 volumes with silent acoustic reading pods.",
  },
  {
    id: "gal-12",
    title: "Indoor Heated Aquatic Complex",
    category: "Sports",
    image: "/images/campus/aquatic.jpg",
    uploadDate: "06 Sep 2026",
    caption: "25m 8-lane semi-Olympic swimming facility.",
  },
];

const DEFAULT_ENQUIRIES: AdminEnquiryItem[] = [
  {
    id: "enq-101",
    name: "Arun Kumar",
    parentName: "Mr. Arun Kumar & Dr. Vandana Kumar",
    studentName: "Rohan Kumar",
    targetGrade: "Grade 6 (Middle School)",
    email: "arun.kumar@globaltechnet.com",
    phone: "+91 98401 23456",
    type: "Admission",
    message:
      "We are relocating from Bangalore to Chennai this December and wish to enroll our son Rohan in Grade 6. We are keen on the Cambridge / IB framework and would like to review the curriculum syllabus and sports facilities.",
    date: "16 Sep 2026",
    status: "New",
    notes: "Follow-up call scheduled for Friday afternoon with Admissions Officer.",
  },
  {
    id: "enq-102",
    name: "Priya Sundaram",
    parentName: "Mrs. Priya Sundaram",
    studentName: "Ananya Sundaram",
    targetGrade: "Grade 11 (IB Diploma)",
    email: "priya.sundaram@creativemedia.in",
    phone: "+91 98200 87654",
    type: "Admission",
    message:
      "Inquiring about Higher Level (HL) Mathematics and Physics subject combinations for the 2027 IB Diploma cohort. Also interested in university counseling support for US & UK admissions.",
    date: "15 Sep 2026",
    status: "Read",
    notes: "Sent IBDP Prospectus and college placement matrix via email.",
  },
  {
    id: "enq-103",
    name: "Rahul Mukhopadhyay",
    parentName: "Mr. Rahul Mukhopadhyay",
    studentName: "Aryan Mukhopadhyay",
    targetGrade: "Grade 1 (Primary School)",
    email: "rahul.m@financesolutions.org",
    phone: "+91 97111 54321",
    type: "Campus Visit",
    message:
      "Requesting an in-person campus tour on Saturday morning for my family. We want to inspect the primary school classrooms, dining hall, and swimming facility.",
    date: "14 Sep 2026",
    status: "Resolved",
    notes: "Tour completed on 15 Sep. Parents submitted initial registration form.",
  },
  {
    id: "enq-104",
    name: "Sunita Verma",
    parentName: "Mrs. Sunita Verma",
    studentName: "Kabir Verma",
    targetGrade: "Grade 4",
    email: "sunita.verma@educare.org",
    phone: "+91 98190 11223",
    type: "General",
    message:
      "Could you kindly provide information on the school bus routes, GPS tracking, and safety attendants for the South Boulevard and Riverdale sectors?",
    date: "12 Sep 2026",
    status: "Read",
    notes: "Transport manager sent detailed route timings and fee schedule.",
  },
  {
    id: "enq-105",
    name: "Vikram Malhotra",
    parentName: "Mr. Vikram & Mrs. Ritu Malhotra",
    studentName: "Dev Malhotra",
    targetGrade: "Grade 9 (Cambridge IGCSE)",
    email: "v.malhotra@gulfholdings.ae",
    phone: "+971 50 123 4567",
    type: "Transfer",
    message:
      "International repatriation from Dubai. Looking for mid-term admission into Grade 9. Student has completed Cambridge Checkpoint examinations with outstanding distinctions.",
    date: "10 Sep 2026",
    status: "New",
    notes: "Requested student's previous 2 years academic transcripts.",
  },
  {
    id: "enq-106",
    name: "Deepa Nambiar",
    parentName: "Dr. K. Nambiar",
    studentName: "Meera Nambiar",
    targetGrade: "Kindergarten (Early Years)",
    email: "deepa.nambiar@hospitality.com",
    phone: "+91 94440 99887",
    type: "Campus Visit",
    message:
      "Would love to attend the upcoming Open House and understand the play-based learning approach and educator-student ratio for 4-year-olds.",
    date: "08 Sep 2026",
    status: "Resolved",
    notes: "Registered for the October 03 Early Years Open House workshop.",
  },
];

const DEFAULT_FACILITIES: AdminFacilityItem[] = [
  {
    id: "smart-classrooms",
    name: "Smart Classrooms",
    category: "Academic Environments",
    description:
      "Acoustically tuned, glare-free spaces equipped with 85-inch interactive touch surfaces, dual-mode ambient lighting, and modular furniture for rapid seminar reconfiguration.",
    specs: "42 Classrooms | 900 sq. ft. average",
    features: [
      "4K Interactive Touch Displays",
      "Active Acoustic Dampening",
      "Modular Ergonomic Furniture",
      "Ultra-wide Wireless Screen Casting",
    ],
    image: "/images/campus/classroom.jpg",
    status: "Operational",
  },
  {
    id: "science-laboratories",
    name: "Science Laboratories",
    category: "Research & Discovery",
    description:
      "Dedicated physics, organic chemistry, and cellular biology suites designed to university research specifications with fume extraction and digital sensor integration.",
    specs: "6 Specialized Labs | Biosafety Level 1+",
    features: [
      "Spectrophotometry Units",
      "High-res Digital Microscopes",
      "Laminar Flow Hoods",
      "Automated Sensor Probes",
    ],
    image: "/images/campus/lab.jpg",
    status: "Operational",
  },
  {
    id: "computer-robotics-lab",
    name: "Computer & Robotics Lab",
    category: "Technology & Engineering",
    description:
      "High-performance workstations for computational modeling, 3D laser prototyping, robotic arm programming, and full-court autonomous robot testing.",
    specs: "3,200 sq. ft. Dual-Bay Innovation Hub",
    features: [
      "3D Resin & Filament Printers",
      "CNC Precision Routers",
      "NVIDIA GPU Computing Racks",
      "FIRST Robotics Arena",
    ],
    image: "/images/campus/robotics.jpg",
    status: "Operational",
  },
  {
    id: "modern-library",
    name: "Modern Library & Media Center",
    category: "Knowledge Commons",
    description:
      "A double-height architectural sanctuary housing over 35,000 physical volumes, seamless access to JSTOR and global digital periodicals, and soundproof study pods.",
    specs: "12,000 sq. ft. over 2 levels",
    features: [
      "35,000+ Physical Volumes",
      "Global Academic Database Access",
      "Individual Acoustic Pods",
      "Colloquium Amphitheater",
    ],
    image: "/images/campus/library.jpg",
    status: "Operational",
  },
  {
    id: "sports-ground",
    name: "Olympic Sports Ground",
    category: "Athletics & Fitness",
    description:
      "FIFA-standard regulation turf pitch, 8-lane IAAF all-weather running track, floodlight illumination, and covered spectator grandstands.",
    specs: "400m Track | 1,200 Capacity Grandstand",
    features: [
      "FIFA-Certified Natural Turf",
      "8-Lane IAAF Tartan Track",
      "LED Broadcast Floodlights",
      "Electronic Timing Systems",
    ],
    image: "/images/campus/sports.jpg",
    status: "Operational",
  },
  {
    id: "indoor-activity-center",
    name: "Indoor Aquatic & Sports Complex",
    category: "Wellness & Athletics",
    description:
      "Heated 25m 8-lane semi-Olympic swimming pool, hardwood basketball arena conforming to FIBA regulations, squash courts, and aerobic conditioning studio.",
    specs: "24,000 sq. ft. Multi-Level Complex",
    features: [
      "25m Heated Swimming Pool",
      "FIBA Spring-Suspended Maple Court",
      "Glass Squash Courts",
      "Cardio & Conditioning Suite",
    ],
    image: "/images/campus/aquatic.jpg",
    status: "Operational",
  },
  {
    id: "music-arts-studio",
    name: "Music & Performing Arts Studio",
    category: "Creative Expression",
    description:
      "450-seat proscenium auditorium, Steinway grand piano concert room, recording studio with isolation booths, and naturally daylit fine arts ateliers.",
    specs: "Dedicated 3-Story Arts Wing",
    features: [
      "450-Seat Proscenium Theater",
      "ProTools Audio Engineering Suite",
      "Ceramics Kiln & Glaze Workshop",
      "Ballet Studio with Sprung Flooring",
    ],
    image: "/images/campus/arts.jpg",
    status: "Operational",
  },
  {
    id: "innovation-lab",
    name: "AI & Innovation Incubator",
    category: "Future Horizons",
    description:
      "An open-architecture venture space where high school students develop real-world startup prototypes, collaborate with industry mentors, and file patents.",
    specs: "4,500 sq. ft. Collaborative Loft",
    features: [
      "Venture Pitch Stage",
      "Spatial Computing (VR/AR) Rigs",
      "IoT Prototyping Benches",
      "Design Sprint Huddle Rooms",
    ],
    image: "/images/campus/innovation.jpg",
    status: "Operational",
  },
];

const DEFAULT_CONTENT_SECTIONS: AdminContentSection[] = [
  {
    id: "hero",
    title: "Cinematic Hero & Scrollytelling",
    subtitle: "500vh interactive HTML5 Canvas scroll with 4 narrative stages",
    description:
      "Controls the cinematic sequence, stage headings, subheadings, badges, and the 120-frame high-resolution campus journey.",
    badge: "Interactive Canvas Engine",
    lastUpdated: "16 Sep 2026",
    status: "Published",
  },
  {
    id: "academic-excellence",
    title: "Academic Philosophy & Excellence",
    subtitle: "Core pedagogical pillars and distinguished academic indicators",
    description:
      "Highlighting our student-educator ratio, global faculty qualifications, STEM and IB diploma distinction averages.",
    badge: "Key Metrics & Pillars",
    lastUpdated: "15 Sep 2026",
    status: "Published",
  },
  {
    id: "programs",
    title: "Academic Programs (Nursery to Grade 12)",
    subtitle: "5 developmental academic tiers with transdisciplinary focus",
    description:
      "Early Childhood, Primary School, Middle School, Secondary, and Senior Secondary IB Diploma curriculum specifications.",
    badge: "5 Published Programs",
    lastUpdated: "15 Sep 2026",
    status: "Published",
  },
  {
    id: "campus-life",
    title: "Vibrant Student Life",
    subtitle: "More than a classroom — athletic grit, arts, and leadership",
    description:
      "8 dynamic activity categories featuring Championship Athletics, Philharmonic Orchestra, Robotics Guild, and Model UN.",
    badge: "8 Dedicated Activities",
    lastUpdated: "16 Sep 2026",
    status: "Published",
  },
  {
    id: "facilities",
    title: "Campus Infrastructure & Spaces",
    subtitle: "Spaces that inspire learning across 68 acres",
    description:
      "8 architectural showcase cards detailing smart classrooms, laboratories, library commons, and aquatic sports complex.",
    badge: "8 Campus Facilities",
    lastUpdated: "16 Sep 2026",
    status: "Published",
  },
  {
    id: "admissions",
    title: "Admissions Roadmap & Guidance",
    subtitle: "4-step application guide and key dates for 2026–2027",
    description:
      "Holistic admissions process, evaluation criteria, deadlines, campus visit booking, and interactive enquiry modal.",
    badge: "Admissions Cycle Open",
    lastUpdated: "14 Sep 2026",
    status: "Published",
  },
  {
    id: "contact-footer",
    title: "Institutional Footer & Connect",
    subtitle: "Official contact details, admissions line, and campus address",
    description:
      "Dark navy footer with 4-column balanced architecture, social media channels, and admissions contact numbers.",
    badge: "Institutional Brand Scope",
    lastUpdated: "16 Sep 2026",
    status: "Published",
  },
];

const DEFAULT_SETTINGS: AdminSettings = {
  schoolName: "LAX360",
  tagline: "Inspire. Learn. Lead.",
  established: 2004,
  admissionsEmail: "admissions@lax360.edu",
  generalEmail: "info@lax360.edu",
  admissionsPhone: "+1 (800) 459-3382",
  generalPhone: "+1 (800) 459-3380",
  whatsApp: "+1 (800) 459-3382",
  address: "LAX360 Boulevard, Innovation Campus, Chennai / Bangalore Corridor",
  hours: "Monday – Saturday: 08:00 AM – 04:30 PM",
  primaryColor: "#0F172A",
  academicCurriculum: [
    "International Baccalaureate (IB) World School",
    "Cambridge Assessment International Education (CAIE)",
    "Council of International Schools (CIS)",
  ],
  social: {
    instagram: "https://instagram.com/lax360school",
    facebook: "https://facebook.com/lax360school",
    youtube: "https://youtube.com/@lax360school",
    linkedin: "https://linkedin.com/school/lax360",
  },
};

// Campus Activities Default Data
const DEFAULT_CAMPUS_ACTIVITIES: AdminCampusActivityItem[] = [
  {
    id: "sports",
    title: "Championship Athletics",
    category: "Sports & Athletics",
    description: "16 competitive inter-school sports disciplines coaching students in grit, strategic sportsmanship, and physical wellness.",
    image: "/images/campus/athletics.jpg",
    badge: "16 Varsity Teams",
    tags: ["Football", "Swimming", "Basketball", "Track & Field"],
    status: "Active",
  },
  {
    id: "music",
    title: "Philharmonic & Contemporary Music",
    category: "Music & Performance",
    description: "A 60-piece orchestra performing classical masterworks and modern symphonic film scores, alongside jazz ensembles.",
    image: "/images/campus/music.jpg",
    badge: "European Tour '25",
    tags: ["Symphony", "Chamber Choir", "Jazz Band", "Studio Sound"],
    status: "Active",
  },
  {
    id: "arts",
    title: "Fine Arts & Visual Curation",
    category: "Arts & Expression",
    description: "Sculptural installations, darkroom photography, oil canvases, and digital media showcased in annual public vernissages.",
    image: "/images/campus/visual-arts.jpg",
    badge: "Curated Showcase",
    tags: ["Oil Painting", "Ceramics", "Digital Illustration", "Photography"],
    status: "Active",
  },
  {
    id: "robotics",
    title: "LAX360 Robotics & AI Guild",
    category: "Clubs & Innovation",
    description: "Engineering autonomous robots, participating in global VEX and FIRST competitions, and exploring generative intelligence.",
    image: "/images/campus/robotics-club.jpg",
    badge: "Global Finalists",
    tags: ["Autonomous Vision", "FIRST Robotics", "3D Printing", "Python"],
    status: "Active",
  },
  {
    id: "leadership",
    title: "LAX360 Global Diplomacy (MUN)",
    category: "Student Leadership",
    description: "Debating resolution frameworks for global humanitarian crises, economic inequality, and environmental treaties.",
    image: "/images/campus/mun.jpg",
    badge: "Hague & NYC Delegation",
    tags: ["Public Speaking", "Geopolitics", "Treaty Drafting", "Ethics"],
    status: "Active",
  },
  {
    id: "field-trips",
    title: "Alpine Expeditions & Field Studies",
    category: "Field Trips & Outdoors",
    description: "Annual scientific fieldwork in glacier ecology, marine biodiversity surveys, and wilderness leadership expeditions.",
    image: "/images/campus/field-trips.jpg",
    badge: "Eco-Fellowship",
    tags: ["Glacier Ecology", "Marine Biology", "Orienteering", "Field Botany"],
    status: "Active",
  },
  {
    id: "culture",
    title: "World Cultural Biennale",
    category: "Cultural Activities",
    description: "A weeklong campus-wide celebration of literature, heritage cuisines, folk traditions, and international theater.",
    image: "/images/campus/cultural-fest.jpg",
    badge: "48+ Nations",
    tags: ["Multicultural Fest", "World Literature", "Culinary Arts", "Folklore"],
    status: "Active",
  },
  {
    id: "team-projects",
    title: "Collaborative Social Impact Lab",
    category: "Team Projects",
    description: "Multi-grade student syndicates partnering with NGOs to deploy renewable micro-grids and clean water monitoring.",
    image: "/images/campus/social-impact.jpg",
    badge: "UN SDG Partner",
    tags: ["Clean Water Tech", "Micro-Forestry", "Solar Audits", "Social Equity"],
    status: "Active",
  },
];

const DEFAULT_CLUBS: AdminClubItem[] = [
  {
    id: "club-1",
    name: "Debating & Public Speaking Society",
    category: "Academic",
    patron: "Dr. Ananya Sharma",
    members: 42,
    meetingDay: "Tuesdays & Thursdays (3:30 PM)",
    description: "Parliamentary debating, Oxford Union style disputations, and public oratory coaching.",
    status: "Active",
  },
  {
    id: "club-2",
    name: "Robotics & Embedded Systems Guild",
    category: "STEM",
    patron: "Prof. Rajesh Menon",
    members: 58,
    meetingDay: "Wednesdays & Saturdays (4:00 PM)",
    description: "Building competition-grade VEX autonomous robots and IoT environmental sensor networks.",
    status: "Active",
  },
  {
    id: "club-3",
    name: "Philharmonic Chamber Ensemble",
    category: "Arts & Culture",
    patron: "Maestro David Chen",
    members: 36,
    meetingDay: "Mondays & Fridays (3:30 PM)",
    description: "Classical symphony rehearsals, violin/cello chamber quartets, and audio engineering.",
    status: "Active",
  },
  {
    id: "club-4",
    name: "Green Earth Eco-Council",
    category: "Leadership",
    patron: "Mrs. Revathi Sundaram",
    members: 45,
    meetingDay: "Thursdays (4:00 PM)",
    description: "Overseeing zero-waste campus initiatives, rooftop solar auditing, and micro-forest cultivation.",
    status: "Active",
  },
  {
    id: "club-5",
    name: "Grandmaster Chess Guild",
    category: "Sports",
    patron: "Coach R. Narayanan",
    members: 28,
    meetingDay: "Wednesdays (3:45 PM)",
    description: "FIDE-rated tournament prep, opening theory masterclasses, and inter-school blitz championships.",
    status: "Active",
  },
  {
    id: "club-6",
    name: "Thespian Drama & Stagecraft Guild",
    category: "Arts & Culture",
    patron: "Ms. Shalini Iyer",
    members: 34,
    meetingDay: "Tuesdays & Fridays (4:00 PM)",
    description: "Stage acting, lighting design, scriptwriting, and production for the Annual Shakespeare Play.",
    status: "Active",
  },
];

const DEFAULT_HOUSES: AdminHouseItem[] = [
  {
    id: "tagore",
    name: "Tagore House",
    color: "#059669",
    captain: "Aditya Verma (Gr 12)",
    viceCaptain: "Tara Swaminathan (Gr 11)",
    mentor: "Dr. K. Swamy",
    points: 1240,
    motto: "Where the mind is without fear",
  },
  {
    id: "raman",
    name: "Raman House",
    color: "#2563EB",
    captain: "Siddharth Rao (Gr 12)",
    viceCaptain: "Sneha Nair (Gr 11)",
    mentor: "Mrs. Meenakshi Sundar",
    points: 1180,
    motto: "Illuminating truth through discovery",
  },
  {
    id: "kalam",
    name: "Kalam House",
    color: "#DC2626",
    captain: "Zaid Ahmed (Gr 12)",
    viceCaptain: "Diya Pillai (Gr 11)",
    mentor: "Mr. T. Krishnan",
    points: 1290,
    motto: "Courage to fly beyond the horizons",
  },
  {
    id: "teresa",
    name: "Teresa House",
    color: "#D97706",
    captain: "Nisha Patel (Gr 12)",
    viceCaptain: "Varun Shenoy (Gr 11)",
    mentor: "Sister Agnes Mary",
    points: 1150,
    motto: "Service with profound compassion",
  },
];

const DEFAULT_ADMISSION_STEPS: AdminAdmissionStepItem[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "Online Enquiry & Application",
    timeline: "Step 1 • 20 Mins",
    description: "Submit student details, recent report cards, and parental background through our secure admissions portal.",
    requirements: ["Birth Certificate copy", "Previous 2 years academic transcripts", "Passport photo of applicant", "Transfer Certificate (if applicable)"],
    status: "Active",
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Campus Tour & Interactive Assessment",
    timeline: "Step 2 • Within 5 Days",
    description: "Experience our 68-acre campus firsthand. Applicants undergo an age-appropriate conceptual diagnostic assessment.",
    requirements: ["In-person student attendance", "Math & English baseline interaction", "Informal educator observation (Early Years)"],
    status: "Active",
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Family Dialogue with Leadership",
    timeline: "Step 3 • 45 Mins",
    description: "An exploratory conversation between parents, the student, and the Head of School to align educational values.",
    requirements: ["Both parents presence recommended", "Discussion on co-curricular aspirations", "Pastoral care & language support review"],
    status: "Active",
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Provisional Offer & Enrolment",
    timeline: "Step 4 • Within 48 Hours",
    description: "Successful candidates receive a formal admission offer package. Enrolment is confirmed upon fee settlement.",
    requirements: ["Acceptance form signature", "Enrolment fee payment receipt", "Medical immunization record", "School transport registration"],
    status: "Active",
  },
];

const DEFAULT_ADMISSION_DEADLINES: AdminAdmissionDeadline[] = [
  {
    id: "round-1",
    round: "Early Bird Admissions Cycle 2026–27",
    targetGrades: "Early Childhood (Nursery – KG) & Grade 1",
    submissionDeadline: "15 Oct 2026",
    interviewDate: "22 – 25 Oct 2026",
    resultDate: "30 Oct 2026",
    status: "Open",
  },
  {
    id: "round-2",
    round: "Regular Admission Cohort",
    targetGrades: "Grades 2 to 9 (Middle & Secondary)",
    submissionDeadline: "30 Nov 2026",
    interviewDate: "05 – 10 Dec 2026",
    resultDate: "18 Dec 2026",
    status: "Open",
  },
  {
    id: "round-3",
    round: "Senior Secondary IB Diploma Merit Track",
    targetGrades: "Grade 11 (IBDP / Cambridge A-Level)",
    submissionDeadline: "15 Jan 2027",
    interviewDate: "20 – 24 Jan 2027",
    resultDate: "01 Feb 2027",
    status: "Open",
  },
];

// Careers & Job Openings Default Data
export const DEFAULT_JOBS: AdminJobItem[] = [
  {
    id: "job-math-sec",
    title: "Mathematics Teacher",
    department: "Secondary School",
    schoolLevel: "Secondary School",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "We are seeking an inspiring Mathematics educator to foster analytical problem-solving, mathematical inquiry, and conceptual clarity across Grades 9 and 10.",
    responsibilities: [
      "Deliver rigorous, concept-focused Mathematics lessons incorporating interactive computational tools.",
      "Prepare students for secondary board examinations and national Olympiad competitions.",
      "Conduct formative evaluations, student mentorship, and pastoral advisory sessions.",
      "Collaborate with the STEM faculty to design transdisciplinary student projects.",
    ],
    requirements: [
      "Master's or Bachelor's degree in Mathematics or Applied Statistics with a recognized B.Ed.",
      "Minimum 3 years of secondary school classroom teaching experience.",
      "Demonstrated proficiency with inquiry-based pedagogy and differentiated instruction.",
      "Strong classroom management and positive student mentorship skills.",
    ],
    preferredExperience: "Experience with modern inquiry-based curricula and digital mathematical modeling tools.",
    whatWeValue: [
      "Dedication to conceptual clarity over rote memorization",
      "Patience and encouragement for every student's learning journey",
      "Collaborative spirit with fellow faculty members",
    ],
    applicationDeadline: "25 Oct 2026",
    status: "Published",
    applicationsCount: 4,
    lastUpdated: "16 Sep 2026",
  },
  {
    id: "job-eng-mid",
    title: "English Teacher",
    department: "Middle School",
    schoolLevel: "Middle School",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "Foster a deep love for literature, creative expression, and articulate communication among middle school learners in Grades 6 to 8.",
    responsibilities: [
      "Facilitate guided reading circles, literary analyses, and creative writing workshops.",
      "Guide students in public speaking, elocution, debate, and dramatic reading.",
      "Develop linguistic fluency, vocabulary comprehension, and critical reasoning.",
      "Curate the middle school literary journal and student poetry showcases.",
    ],
    requirements: [
      "Bachelor's or Master's degree in English Literature with teaching certification (B.Ed).",
      "Minimum 2-3 years of teaching experience in middle school environments.",
      "Exceptional spoken and written communication in English.",
      "Warm, empathetic educator persona with strong classroom community skills.",
    ],
    preferredExperience: "Background in theatrical productions, creative writing workshops, or student debate clubs.",
    whatWeValue: [
      "Inspiring storytelling that sparks young imaginations",
      "Constructive and personalized writing feedback",
      "Fostering an inclusive, respectful classroom culture",
    ],
    applicationDeadline: "30 Oct 2026",
    status: "Published",
    applicationsCount: 6,
    lastUpdated: "15 Sep 2026",
  },
  {
    id: "job-pri-teach",
    title: "Primary School Teacher",
    department: "Primary School",
    schoolLevel: "Primary School",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "Guide foundational learning in literacy, numeracy, and environmental inquiry for energetic primary school students in Grades 1 to 5.",
    responsibilities: [
      "Conduct engaging classroom sessions across foundational subjects using experiential and play-based methods.",
      "Create a nurturing, positive classroom community where every child feels safe, curious, and valued.",
      "Assess student developmental milestones and hold collaborative parent-teacher dialogues.",
      "Organize thematic learning exhibitions, nature walks, and field explorations.",
    ],
    requirements: [
      "Bachelor's degree in Elementary Education (B.El.Ed), Early Childhood, or related field with B.Ed / D.El.Ed.",
      "Minimum 2 years of primary school teaching experience.",
      "Warm, patient, and energetic personality with genuine joy for teaching young learners.",
    ],
    preferredExperience: "Familiarity with activity-based learning and multi-sensory teaching tools.",
    whatWeValue: [
      "Empathy and keen observation of individual learning paces",
      "Joyful, interactive classroom environment",
      "Strong partnership with parents and families",
    ],
    applicationDeadline: "20 Oct 2026",
    status: "Published",
    applicationsCount: 9,
    lastUpdated: "14 Sep 2026",
  },
  {
    id: "job-pe-coach",
    title: "Physical Education Teacher",
    department: "School Sports",
    schoolLevel: "School Sports",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "Instill lifelong fitness habits, sportsmanship, and physical agility across primary and secondary athletics programs on our 68-acre campus.",
    responsibilities: [
      "Lead age-appropriate physical education modules across track and field, ball sports, and wellness routines.",
      "Coach inter-house and inter-school sports teams with an emphasis on fair play, grit, and teamwork.",
      "Coordinate annual Sports Day events, house tournaments, and fitness assessments.",
      "Ensure safety protocols and first-aid readiness across campus grounds and indoor sports arenas.",
    ],
    requirements: [
      "Bachelor's or Master's in Physical Education (B.P.Ed / M.P.Ed).",
      "Demonstrated coaching experience in school athletic programs (minimum 2 years).",
      "Valid First Aid and CPR certification.",
    ],
    preferredExperience: "Specialization in basketball, football, athletics, or swimming.",
    whatWeValue: [
      "Encouraging participation and effort across all student ability levels",
      "Role modeling discipline, respect, and perseverance",
      "Active commitment to student safety and physical wellbeing",
    ],
    applicationDeadline: "28 Oct 2026",
    status: "Published",
    applicationsCount: 5,
    lastUpdated: "13 Sep 2026",
  },
  {
    id: "job-counsellor",
    title: "School Counsellor",
    department: "Student Wellbeing",
    schoolLevel: "Student Wellbeing",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "Provide empathetic social-emotional counseling, adolescent guidance, and proactive mental health workshops in a confidential school setting.",
    responsibilities: [
      "Offer individual and small-group guidance sessions for students navigating academic or social transitions.",
      "Design wellness and mindfulness initiatives for students, faculty, and parents.",
      "Collaborate closely with educators to identify learning differences and support individual needs.",
      "Maintain confidential pastoral records in line with student safeguarding standards.",
    ],
    requirements: [
      "Master's degree in Psychology, Counseling Psychology, or Child Development.",
      "Minimum 3 years of counseling experience in an educational institution.",
      "Deep empathy, active listening skills, and high professional discretion.",
    ],
    preferredExperience: "Experience with adolescent emotional development, social-emotional learning (SEL), or career guidance.",
    whatWeValue: [
      "Unconditional positive regard for student mental health and dignity",
      "Proactive, preventive approaches to student wellbeing",
      "Collaborative mindset with parents and school leadership",
    ],
    applicationDeadline: "18 Oct 2026",
    status: "Published",
    applicationsCount: 3,
    lastUpdated: "15 Sep 2026",
  },
  {
    id: "job-acad-coord",
    title: "Academic Coordinator",
    department: "Academic Administration",
    schoolLevel: "Academic Administration",
    employmentType: "Full-time",
    location: "Chennai",
    about:
      "Oversee academic scheduling, curriculum delivery alignment, teacher planning coordination, and school timetable operations with high administrative excellence.",
    responsibilities: [
      "Coordinate academic timetables, exam calendars, and faculty substitution schedules.",
      "Liaise between department heads and the Principal's office for curriculum tracking.",
      "Support the administration of internal assessments, term reports, and board documentation.",
      "Facilitate faculty orientation, professional development workshops, and administrative records.",
    ],
    requirements: [
      "Master's or Bachelor's degree with educational administration or teaching credentials.",
      "Minimum 4 years of educational experience, with at least 2 years in an administrative/coordination capacity.",
      "Proficiency in school management systems, timetable software, and spreadsheet modeling.",
    ],
    preferredExperience: "Familiarity with school accreditation workflows, examination board compliance, and academic planning.",
    whatWeValue: [
      "Meticulous attention to detail and organizational excellence",
      "Clear, empathetic communication with faculty and administrative teams",
      "Problem-solving agility during dynamic school terms",
    ],
    applicationDeadline: "05 Nov 2026",
    status: "Published",
    applicationsCount: 7,
    lastUpdated: "16 Sep 2026",
  },
];

const DEFAULT_JOB_APPLICATIONS: AdminJobApplication[] = [
  {
    id: "app-201",
    jobId: "job-math-sec",
    position: "Mathematics Teacher",
    fullName: "Sunita Nair",
    email: "sunita.nair@academicmail.in",
    phone: "+91 98402 34567",
    highestQualification: "M.Sc. Mathematics, B.Ed. (Distinction)",
    experienceYears: "5 Years",
    resumeFileName: "Sunita_Nair_Curriculum_Vitae.pdf",
    coverLetter:
      "Having taught secondary Mathematics for five years with exceptional student outcomes, I am thrilled to apply for the Mathematics Teacher role at LAX360. My pedagogical philosophy emphasizes conceptual intuition, visual geometry, and coding-integrated problem solving.",
    portfolioUrl: "https://linkedin.com/in/sunitanair-math",
    consentGiven: true,
    appliedDate: "14 Sep 2026",
    status: "Shortlisted",
    notes: "Demonstrated strong grasp of secondary mathematics syllabus. Panel demo class scheduled for next Tuesday.",
  },
  {
    id: "app-202",
    jobId: "job-eng-mid",
    position: "English Teacher",
    fullName: "David Fernandez",
    email: "david.fernandez@litacademy.org",
    phone: "+91 97112 88901",
    highestQualification: "M.A. English Literature, B.Ed",
    experienceYears: "3 Years",
    resumeFileName: "David_Fernandez_Resume.pdf",
    coverLetter:
      "I am passionate about creating vibrant classroom storytelling circles and guiding middle school students to find their creative voices through poetry, public speaking, and collaborative theater.",
    portfolioUrl: "https://linkedin.com/in/davidfernandez-lit",
    consentGiven: true,
    appliedDate: "13 Sep 2026",
    status: "Under Review",
    notes: "Portfolio includes student illustrated literary magazines.",
  },
  {
    id: "app-203",
    jobId: "job-pri-teach",
    position: "Primary School Teacher",
    fullName: "Ananya Raman",
    email: "ananya.raman@teachfoundation.in",
    phone: "+91 98201 44567",
    highestQualification: "B.El.Ed, Early Childhood Specialist",
    experienceYears: "4 Years",
    resumeFileName: "Ananya_Raman_Teaching_Dossier.pdf",
    coverLetter:
      "I specialize in early literacy immersion, phonics games, and tactile learning. I love creating a joyful and curious classroom atmosphere where children build empathy and foundational confidence.",
    consentGiven: true,
    appliedDate: "12 Sep 2026",
    status: "New",
    notes: "Experienced with activity-based primary curricula. Excellent references from previous school head.",
  },
  {
    id: "app-204",
    jobId: "job-pe-coach",
    position: "Physical Education Teacher",
    fullName: "K. Karthik",
    email: "karthik.coach@aquasports.in",
    phone: "+91 94440 12389",
    highestQualification: "M.P.Ed, State Athletics Coach Certification",
    experienceYears: "6 Years",
    resumeFileName: "Karthik_Athletics_Profile.pdf",
    coverLetter:
      "Coached junior athletics medalists and managed state-of-the-art school sports facilities for over six years. Committed to building student fitness, discipline, and championship sportsmanship.",
    consentGiven: true,
    appliedDate: "09 Sep 2026",
    status: "Selected",
    notes: "Formal offer letter dispatched. Induction scheduled for 01 Oct 2026.",
  },
];

const DEFAULT_PRIVACY_REQUESTS: AdminPrivacyRequest[] = [
  {
    id: "pr-101",
    name: "Rahul Sharma",
    email: "rahul.sharma@enterprise.com",
    requestType: "Access my personal data",
    message: "Requesting a digital export of all application records, submitted contact documents, and communication logs associated with my email address.",
    submittedDate: "15 Sep 2026",
    status: "Resolved",
    notes: "Verified identity via registered phone. Sent encrypted archive summary to applicant email.",
  },
  {
    id: "pr-102",
    name: "Ananya Deshmukh",
    email: "ananya.deshmukh@lawfirm.in",
    requestType: "Correct my personal data",
    message: "We recently relocated to North Campus Corridor. Kindly update our residential address and emergency contact details in the admissions enquiry database.",
    submittedDate: "14 Sep 2026",
    status: "In Review",
    notes: "Cross-verified address proof. Updating pupil transport allocation.",
  },
  {
    id: "pr-103",
    name: "Vikramaditya Sen",
    email: "vikram.sen@techcorp.in",
    requestType: "Withdraw consent",
    message: "I wish to withdraw consent for general admissions marketing circulars and campus newsletters while retaining our active Grade 4 transfer application.",
    submittedDate: "12 Sep 2026",
    status: "Pending",
    notes: "Pending review by Communications Officer to update broadcast lists.",
  },
  {
    id: "pr-104",
    name: "Meenakshi Iyer",
    email: "m.iyer@healthsciences.org",
    requestType: "Raise a grievance",
    message: "Requesting formal clarification on the data retention period for diagnostic assessment answer sheets for Grade 6 entrance evaluations.",
    submittedDate: "10 Sep 2026",
    status: "Pending",
    notes: "Grievance Officer reviewing retention policy guidelines under school policy.",
  },
];

const DEFAULT_CONSENT_RECORDS: AdminConsentRecord[] = [
  {
    id: "cr-1",
    user: "arun.kumar@globaltechnet.com",
    purpose: "Admissions Enquiry",
    consent: "Granted",
    date: "16 Sep 2026",
    status: "Active",
  },
  {
    id: "cr-2",
    user: "priya.sundaram@creativemedia.in",
    purpose: "Admissions Enquiry",
    consent: "Granted",
    date: "15 Sep 2026",
    status: "Active",
  },
  {
    id: "cr-3",
    user: "sunita.nair@academicmail.in",
    purpose: "Career Application",
    consent: "Granted",
    date: "14 Sep 2026",
    status: "Active",
  },
  {
    id: "cr-4",
    user: "david.fernandez@litacademy.org",
    purpose: "Career Application",
    consent: "Granted",
    date: "13 Sep 2026",
    status: "Active",
  },
  {
    id: "cr-5",
    user: "vikram.sen@techcorp.in",
    purpose: "Marketing Communications",
    consent: "Withdrawn",
    date: "12 Sep 2026",
    status: "Active",
  },
  {
    id: "cr-6",
    user: "visitor-session-491@public",
    purpose: "Analytics Cookies",
    consent: "Granted",
    date: "11 Sep 2026",
    status: "Active",
  },
];

const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  preferences: false,
  marketing: false,
  decided: false,
  lastUpdated: "17 Sep 2026",
};

// Storage Keys
const KEYS = {
  AUTH: "school_admin_auth",
  PROGRAMS: "school_admin_programs",
  EVENTS: "school_admin_events",
  GALLERY: "school_admin_gallery",
  ENQUIRIES: "school_admin_enquiries",
  FACILITIES: "school_admin_facilities",
  CONTENT: "school_admin_content",
  SETTINGS: "school_admin_settings",
  CAMPUS_ACTIVITIES: "school_admin_campus_activities",
  CLUBS: "school_admin_clubs",
  HOUSES: "school_admin_houses",
  ADMISSION_STEPS: "school_admin_admission_steps",
  ADMISSION_DEADLINES: "school_admin_admission_deadlines",
  CAREERS_JOBS: "school_careers_jobs",
  CAREERS_APPLICATIONS: "school_careers_applications",
  PRIVACY_REQUESTS: "school_privacy_requests",
  PRIVACY_CONSENTS: "school_privacy_consents",
  COOKIE_PREFERENCES: "school_cookie_preferences",
};

// Safe LocalStorage Helper
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key ${key}:`, error);
    return fallback;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage key ${key}:`, error);
  }
}

// Authentication Service (Frontend Demo Only)
export const AdminAuth = {
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(KEYS.AUTH) === "true";
  },
  login(email: string, pass: string): boolean {
    if (typeof window === "undefined") return false;
    // Demo validation accepts predefined demo account or any valid demo credentials
    if (
      (email.trim().toLowerCase() === "admin@schooldemo.com" && pass === "admin123") ||
      (email.includes("@") && pass.length >= 6)
    ) {
      localStorage.setItem(KEYS.AUTH, "true");
      return true;
    }
    return false;
  },
  logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEYS.AUTH);
  },
};

// Storage APIs for Admin Sections
export const AdminStorage = {
  // Programs
  getPrograms(): AdminProgramItem[] {
    return getFromStorage<AdminProgramItem[]>(KEYS.PROGRAMS, DEFAULT_PROGRAMS);
  },
  savePrograms(items: AdminProgramItem[]): void {
    setToStorage(KEYS.PROGRAMS, items);
  },

  // Events
  getEvents(): AdminEventItem[] {
    return getFromStorage<AdminEventItem[]>(KEYS.EVENTS, DEFAULT_EVENTS);
  },
  saveEvents(items: AdminEventItem[]): void {
    setToStorage(KEYS.EVENTS, items);
  },

  // Gallery
  getGallery(): AdminGalleryItem[] {
    return getFromStorage<AdminGalleryItem[]>(KEYS.GALLERY, DEFAULT_GALLERY);
  },
  saveGallery(items: AdminGalleryItem[]): void {
    setToStorage(KEYS.GALLERY, items);
  },

  // Enquiries
  getEnquiries(): AdminEnquiryItem[] {
    return getFromStorage<AdminEnquiryItem[]>(KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  },
  saveEnquiries(items: AdminEnquiryItem[]): void {
    setToStorage(KEYS.ENQUIRIES, items);
  },

  // Facilities
  getFacilities(): AdminFacilityItem[] {
    return getFromStorage<AdminFacilityItem[]>(KEYS.FACILITIES, DEFAULT_FACILITIES);
  },
  saveFacilities(items: AdminFacilityItem[]): void {
    setToStorage(KEYS.FACILITIES, items);
  },

  // Content Sections
  getContentSections(): AdminContentSection[] {
    return getFromStorage<AdminContentSection[]>(KEYS.CONTENT, DEFAULT_CONTENT_SECTIONS);
  },
  saveContentSections(items: AdminContentSection[]): void {
    setToStorage(KEYS.CONTENT, items);
  },

  // Settings
  getSettings(): AdminSettings {
    return getFromStorage<AdminSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  saveSettings(settings: AdminSettings): void {
    setToStorage(KEYS.SETTINGS, settings);
  },

  // Campus Activities
  getCampusActivities(): AdminCampusActivityItem[] {
    return getFromStorage<AdminCampusActivityItem[]>(KEYS.CAMPUS_ACTIVITIES, DEFAULT_CAMPUS_ACTIVITIES);
  },
  saveCampusActivities(items: AdminCampusActivityItem[]): void {
    setToStorage(KEYS.CAMPUS_ACTIVITIES, items);
  },

  // Student Life Clubs
  getClubs(): AdminClubItem[] {
    return getFromStorage<AdminClubItem[]>(KEYS.CLUBS, DEFAULT_CLUBS);
  },
  saveClubs(items: AdminClubItem[]): void {
    setToStorage(KEYS.CLUBS, items);
  },

  // Student Life Houses
  getHouses(): AdminHouseItem[] {
    return getFromStorage<AdminHouseItem[]>(KEYS.HOUSES, DEFAULT_HOUSES);
  },
  saveHouses(items: AdminHouseItem[]): void {
    setToStorage(KEYS.HOUSES, items);
  },

  // Admission Steps
  getAdmissionSteps(): AdminAdmissionStepItem[] {
    return getFromStorage<AdminAdmissionStepItem[]>(KEYS.ADMISSION_STEPS, DEFAULT_ADMISSION_STEPS);
  },
  saveAdmissionSteps(items: AdminAdmissionStepItem[]): void {
    setToStorage(KEYS.ADMISSION_STEPS, items);
  },

  // Admission Deadlines
  getAdmissionDeadlines(): AdminAdmissionDeadline[] {
    return getFromStorage<AdminAdmissionDeadline[]>(KEYS.ADMISSION_DEADLINES, DEFAULT_ADMISSION_DEADLINES);
  },
  saveAdmissionDeadlines(items: AdminAdmissionDeadline[]): void {
    setToStorage(KEYS.ADMISSION_DEADLINES, items);
  },

  // Careers / Jobs
  getJobs(): AdminJobItem[] {
    return getFromStorage<AdminJobItem[]>(KEYS.CAREERS_JOBS, DEFAULT_JOBS);
  },
  saveJobs(items: AdminJobItem[]): void {
    setToStorage(KEYS.CAREERS_JOBS, items);
  },

  // Career Applications
  getJobApplications(): AdminJobApplication[] {
    return getFromStorage<AdminJobApplication[]>(KEYS.CAREERS_APPLICATIONS, DEFAULT_JOB_APPLICATIONS);
  },
  saveJobApplications(items: AdminJobApplication[]): void {
    setToStorage(KEYS.CAREERS_APPLICATIONS, items);
  },

  // Privacy Requests
  getPrivacyRequests(): AdminPrivacyRequest[] {
    return getFromStorage<AdminPrivacyRequest[]>(KEYS.PRIVACY_REQUESTS, DEFAULT_PRIVACY_REQUESTS);
  },
  savePrivacyRequests(items: AdminPrivacyRequest[]): void {
    setToStorage(KEYS.PRIVACY_REQUESTS, items);
  },

  // Consent Records
  getConsentRecords(): AdminConsentRecord[] {
    return getFromStorage<AdminConsentRecord[]>(KEYS.PRIVACY_CONSENTS, DEFAULT_CONSENT_RECORDS);
  },
  saveConsentRecords(items: AdminConsentRecord[]): void {
    setToStorage(KEYS.PRIVACY_CONSENTS, items);
  },

  // Cookie Preferences
  getCookiePreferences(): CookiePreferences {
    return getFromStorage<CookiePreferences>(KEYS.COOKIE_PREFERENCES, DEFAULT_COOKIE_PREFERENCES);
  },
  saveCookiePreferences(prefs: CookiePreferences): void {
    setToStorage(KEYS.COOKIE_PREFERENCES, prefs);
  },

  // Factory reset to initial demo state
  resetToDefaults(): void {
    if (typeof window === "undefined") return;
    setToStorage(KEYS.PROGRAMS, DEFAULT_PROGRAMS);
    setToStorage(KEYS.EVENTS, DEFAULT_EVENTS);
    setToStorage(KEYS.GALLERY, DEFAULT_GALLERY);
    setToStorage(KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
    setToStorage(KEYS.FACILITIES, DEFAULT_FACILITIES);
    setToStorage(KEYS.CONTENT, DEFAULT_CONTENT_SECTIONS);
    setToStorage(KEYS.SETTINGS, DEFAULT_SETTINGS);
    setToStorage(KEYS.CAMPUS_ACTIVITIES, DEFAULT_CAMPUS_ACTIVITIES);
    setToStorage(KEYS.CLUBS, DEFAULT_CLUBS);
    setToStorage(KEYS.HOUSES, DEFAULT_HOUSES);
    setToStorage(KEYS.ADMISSION_STEPS, DEFAULT_ADMISSION_STEPS);
    setToStorage(KEYS.ADMISSION_DEADLINES, DEFAULT_ADMISSION_DEADLINES);
    setToStorage(KEYS.CAREERS_JOBS, DEFAULT_JOBS);
    setToStorage(KEYS.CAREERS_APPLICATIONS, DEFAULT_JOB_APPLICATIONS);
    setToStorage(KEYS.PRIVACY_REQUESTS, DEFAULT_PRIVACY_REQUESTS);
    setToStorage(KEYS.PRIVACY_CONSENTS, DEFAULT_CONSENT_RECORDS);
    setToStorage(KEYS.COOKIE_PREFERENCES, DEFAULT_COOKIE_PREFERENCES);
  },
};
