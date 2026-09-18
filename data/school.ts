export interface HeroStoryStage {
  id: number;
  threshold: number;
  heading: string;
  subheading: string;
  description: string;
  badge: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  ageRange: string;
  grades: string;
  tagline: string;
  description: string;
  approach: string;
  coreSubjects: string[];
  developmentFocus: string[];
  keyStats: { label: string; value: string }[];
  highlight: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specs: string;
  image: string;
}

export interface CampusActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  participants: string;
  badge: string;
  image: string;
  tags: string[];
}

export interface AdmissionStep {
  step: string;
  title: string;
  timeline: string;
  description: string;
  details: string[];
}

export interface SchoolData {
  name: string;
  tagline: string;
  description: string;
  location: string;
  established: number;
  students: string;
  teachers: string;
  campusSize: string;
  studentTeacherRatio: string;
  accreditations: string[];
  themeColor: string;
  gradient: string;
  heroSections: HeroStoryStage[];
  academicPrograms: AcademicProgram[];
  facilities: Facility[];
  campusLife: CampusActivity[];
  admissions: {
    title: string;
    description: string;
    deadlines: { round: string; date: string }[];
    steps: AdmissionStep[];
    faqs: { question: string; answer: string }[];
  };
  contact: {
    address: string;
    phone: string;
    admissionsPhone: string;
    whatsApp?: string;
    email: string;
    admissionsEmail: string;
    hours: string;
    social: {
      platform: string;
      url: string;
    }[];
  };
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const schoolData: SchoolData = {
  name: "LAX360",
  tagline: "Inspire. Learn. Lead.",
  description:
    "A visionary educational institution dedicated to academic brilliance, technological innovation, artistic freedom, and holistic student growth at LAX360. We foster independent thinkers and ethical leaders for tomorrow's world.",
  location: "LAX360 Boulevard, Innovation Campus",
  established: 2004,
  students: "2,450+",
  teachers: "210+ Global Faculty",
  campusSize: "68 Acres of Architectural Excellence",
  studentTeacherRatio: "11:1",
  accreditations: [
    "International Baccalaureate (IB) World School",
    "Cambridge International Education (CAIE)",
    "Council of International Schools (CIS)",
    "New England Association of Schools & Colleges (NEASC)",
  ],
  themeColor: "#FAF8F5",
  gradient: "from-[#FAF8F5] via-[#F5F0E8] to-[#FFFFFF]",

  stats: [
    { label: "College Acceptance", value: "99.4%", detail: "Top 50 global universities" },
    { label: "Faculty with Advanced Degrees", value: "88%", detail: "Master's & Ph.D. level" },
    { label: "Student Nationalities", value: "48+", detail: "Vibrant multicultural community" },
    { label: "Average IB Diploma Score", value: "38.6", detail: "Global average: 30.2" },
  ],

  heroSections: [
    {
      id: 1,
      threshold: 0.1,
      badge: "Stage 01 • Morning Horizons",
      heading: "WHERE CURIOSITY BEGINS",
      subheading: "Every great journey starts with a question.",
      description:
        "As dawn lights the campus, our gates open to inquiring minds eager to explore, question, and discover.",
    },
    {
      id: 2,
      threshold: 0.3,
      badge: "Stage 02 • Immersive Exploration",
      heading: "LEARNING WITHOUT LIMITS",
      subheading:
        "Modern classrooms, innovative technology, and inspiring teachers create meaningful learning experiences.",
      description:
        "Collaborative glass-walled ateliers and interactive studio spaces break down boundaries between theory and hands-on invention.",
    },
    {
      id: 3,
      threshold: 0.6,
      badge: "Stage 03 • Creative Mastery",
      heading: "DISCOVER YOUR POTENTIAL",
      subheading:
        "From science and technology to arts and sports, every student gets the opportunity to explore their strengths.",
      description:
        "State-of-the-art biotech laboratories, robotics arenas, black-box theaters, and Olympic-grade courts fuel diverse passions.",
    },
    {
      id: 4,
      threshold: 0.85,
      badge: "Stage 04 • Global Impact",
      heading: "PREPARE FOR TOMORROW",
      subheading:
        "We empower students with knowledge, confidence, creativity, and leadership skills for the future.",
      description:
        "Graduating with the resilience, empathy, and intellectual agility to pioneer solutions on the global stage.",
    },
  ],

  academicPrograms: [
    {
      id: "early-years",
      name: "Early Years",
      ageRange: "Ages 3 – 5",
      grades: "Nursery to Kindergarten",
      tagline: "Wonder, Play, and Foundational Discovery",
      description:
        "Nurturing natural curiosity through an inquiry-rich, Reggio-Emilia-inspired framework that builds linguistic confidence, sensory exploration, and emotional resilience.",
      approach: "Play-based inquiry & multimodal sensory discovery",
      coreSubjects: [
        "Language & Phonics",
        "Foundational Mathematics",
        "Sensory & Nature Science",
        "Music & Expressive Arts",
        "Motor Skills & Wellness",
      ],
      developmentFocus: [
        "Social-emotional awareness",
        "Early literacy & bilingual expression",
        "Fine & gross motor coordination",
        "Imaginative problem-solving",
      ],
      keyStats: [
        { label: "Student-Educator Ratio", value: "6:1" },
        { label: "Outdoor Learning Daily", value: "120 Mins" },
      ],
      highlight: "Dedicated bio-garden and immersive tactile sensory zones.",
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
      coreSubjects: [
        "Advanced Mathematics",
        "Integrated Natural Sciences",
        "Global Literature & Writing",
        "World Languages (French / Spanish / Mandarin)",
        "Design Technology & Visual Arts",
      ],
      developmentFocus: [
        "Mathematical logic & reasoning",
        "Bilingual conversational fluency",
        "Collaborative debate & presentation",
        "Digital citizenship & coding basics",
      ],
      keyStats: [
        { label: "Annual Research Projects", value: "8+" },
        { label: "Language Immersion", value: "Daily" },
      ],
      highlight: "Annual student-led scientific showcase and literature festivals.",
    },
    {
      id: "middle-school",
      name: "Middle School",
      ageRange: "Ages 11 – 14",
      grades: "Grades 6 – 8",
      tagline: "Intellectual Agility & Self-Actualization",
      description:
        "Guiding adolescents through a rigorous academic curriculum that links theoretical concepts with authentic global challenges, ethical leadership, and innovation.",
      approach: "Interdisciplinary projects, Socratic seminars & design sprints",
      coreSubjects: [
        "Algebra & Geometry Foundations",
        "Physics, Chemistry & Biology",
        "World History & Geopolitics",
        "Applied Computer Science & Robotics",
        "Performing Arts & Rhetoric",
      ],
      developmentFocus: [
        "Abstract and analytical reasoning",
        "Scientific hypothesis testing",
        "Public speaking & rhetoric mastery",
        "Leadership and community impact",
      ],
      keyStats: [
        { label: "Electives Offered", value: "24+" },
        { label: "Community Service Hours", value: "40 Hrs/Yr" },
      ],
      highlight: "Full participation in Regional Model UN and Hackathons.",
    },
    {
      id: "high-school",
      name: "High School",
      ageRange: "Ages 15 – 18",
      grades: "Grades 9 – 12",
      tagline: "Pre-University Distinction & Global Leadership",
      description:
        "Offering the prestigious IB Diploma Programme and Cambridge International A-Levels. Equipping graduates to excel at the world's most selective collegiate institutions.",
      approach: "University-style colloquia, independent thesis & mentorship",
      coreSubjects: [
        "Higher Level Mathematics & Calculus",
        "Advanced Sciences & Biotech Research",
        "Economics, Business & Global Politics",
        "Artificial Intelligence & Advanced Computation",
        "Philosophy & Theory of Knowledge (TOK)",
      ],
      developmentFocus: [
        "Rigorous independent research & extended essay",
        "Entrepreneurial venture pitching",
        "Collegiate academic writing",
        "Global ethical leadership & sustainability",
      ],
      keyStats: [
        { label: "IB Diploma Average", value: "38.6" },
        { label: "Global College Counselors", value: "1:25" },
      ],
      highlight: "100% university placement across Ivy League, Oxbridge, and premier global universities.",
    },
  ],

  facilities: [
    {
      id: "smart-classrooms",
      name: "Smart Classrooms",
      category: "Academic Environments",
      description:
        "Acoustically tuned, glare-free spaces equipped with 85-inch interactive touch surfaces, dual-mode ambient lighting, and modular furniture for rapid seminar reconfiguration.",
      features: ["4K Interactive Displays", "Active Acoustic Dampening", "Modular Ergonomic Furniture", "Ultra-wide Wireless Screen Cast"],
      specs: "42 Classrooms | 900 sq. ft. average",
      image: "/images/campus/classroom.jpg",
    },
    {
      id: "science-laboratories",
      name: "Science Laboratories",
      category: "Research & Discovery",
      description:
        "Dedicated physics, organic chemistry, and cellular biology suites designed to university research specifications with fume extraction and digital sensor integration.",
      features: ["Spectrophotometry Units", "High-res Digital Microscopes", "Laminar Flow Hoods", "Automated Data Acquisition Sensors"],
      specs: "6 Specialized Labs | Biosafety Level 1+",
      image: "/images/campus/lab.jpg",
    },
    {
      id: "computer-robotics-lab",
      name: "Computer & Robotics Lab",
      category: "Technology & Engineering",
      description:
        "High-performance workstations for computational modeling, 3D laser prototyping, robotic arm programming, and full-court autonomous robot testing.",
      features: ["3D Resin & Filament Printers", "CNC Precision Routers", "NVIDIA GPU Computing Racks", "FIRST Robotics Competition Arena"],
      specs: "3,200 sq. ft. Dual-Bay Innovation Hub",
      image: "/images/campus/robotics.jpg",
    },
    {
      id: "modern-library",
      name: "Modern Library & Media Center",
      category: "Knowledge Commons",
      description:
        "A double-height architectural sanctuary housing over 35,000 physical volumes, seamless access to JSTOR and global digital periodicals, and soundproof study pods.",
      features: ["35,000+ Physical Volumes", "Global Academic Database Access", "Individual Acoustic Pods", "Co-working Colloquium Amphitheater"],
      specs: "12,000 sq. ft. over 2 levels",
      image: "/images/campus/library.jpg",
    },
    {
      id: "sports-ground",
      name: "Olympic Sports Ground",
      category: "Athletics & Fitness",
      description:
        "FIFA-standard regulation turf pitch, 8-lane IAAF all-weather running track, floodlight illumination, and covered spectator grandstands.",
      features: ["FIFA-Certified Natural Turf", "8-Lane IAAF Tartan Track", "LED Broadcast Floodlights", "Electronic Timing Systems"],
      specs: "400m Track | 1,200 Capacity Grandstand",
      image: "/images/campus/sports.jpg",
    },
    {
      id: "indoor-activity-center",
      name: "Indoor Aquatic & Sports Complex",
      category: "Wellness & Athletics",
      description:
        "Heated 25m 8-lane semi-Olympic swimming pool, hardwood basketball arena conforming to FIBA regulations, squash courts, and aerobic conditioning studio.",
      features: ["25m Heated Swimming Pool", "FIBA Spring-Suspended Maple Court", "Glass Squash Courts", "Technogym Cardio Suite"],
      specs: "24,000 sq. ft. Multi-Level Complex",
      image: "/images/campus/aquatic.jpg",
    },
    {
      id: "music-arts-studio",
      name: "Music & Performing Arts Studio",
      category: "Creative Expression",
      description:
        "450-seat proscenium auditorium, Steinway grand piano concert room, recording studio with isolation booths, and naturally daylit fine arts ateliers.",
      features: ["450-Seat Proscenium Theater", "ProTools Audio Engineering Suite", "Ceramics Kiln & Glaze Workshop", "Ballet Studio with Sprung Flooring"],
      specs: "Dedicated 3-Story Arts Wing",
      image: "/images/campus/arts.jpg",
    },
    {
      id: "innovation-lab",
      name: "AI & Innovation Incubator",
      category: "Future Horizons",
      description:
        "An open-architecture venture space where high school students develop real-world startup prototypes, collaborate with industry mentors, and file patents.",
      features: ["Venture Pitch Stage", "Spatial Computing (VR/AR) Rigs", "IoT Prototyping Benches", "Design Sprint Huddle Rooms"],
      specs: "4,500 sq. ft. Collaborative Loft",
      image: "/images/campus/innovation.jpg",
    },
  ],

  campusLife: [
    {
      id: "championship-athletics",
      title: "Championship Athletics",
      category: "Sports & Fitness",
      description:
        "16 competitive inter-school sports disciplines coaching students in grit, strategic sportsmanship, and peak physical conditioning.",
      participants: "85% Student Participation",
      badge: "National Champions '24",
      image: "/images/campus/athletics.jpg",
      tags: ["Football", "Swimming", "Basketball", "Track & Field", "Tennis"],
    },
    {
      id: "philharmonic-ensemble",
      title: "Symphony & Philharmonic",
      category: "Music & Performance",
      description:
        "A 60-piece orchestra performing classical masterworks and modern symphonic film scores, alongside jazz ensembles and choir.",
      participants: "120+ Musicians",
      badge: "European Tour '25",
      image: "/images/campus/music.jpg",
      tags: ["Orchestra", "Chamber Choir", "Jazz Band", "Studio Production"],
    },
    {
      id: "robotics-ai-guild",
      title: "NovaTech Robotics Syndicate",
      category: "STEM & Innovation",
      description:
        "Engineering autonomous robots, participating in global VEX and FIRST competitions, and exploring generative AI ethics.",
      participants: "18 International Awards",
      badge: "Global Finalists",
      image: "/images/campus/robotics-club.jpg",
      tags: ["VEX Robotics", "Autonomous Vision", "3D Fabrication", "Python/C++"],
    },
    {
      id: "model-united-nations",
      title: "LAX360 Global Diplomacy (MUN)",
      category: "Leadership & Debate",
      description:
        "Debating resolution frameworks for global humanitarian crises, economic inequality, and environmental treaties at world conferences.",
      participants: "Delegations to Hague & NYC",
      badge: "Best Large Delegation",
      image: "/images/campus/mun.jpg",
      tags: ["Geopolitics", "Treaty Drafting", "Public Oratory", "Crisis Simulation"],
    },
    {
      id: "visual-arts-biennale",
      title: "Visual Arts & Curation",
      category: "Arts & Culture",
      description:
        "Sculptural installations, darkroom photography, oil canvases, and digital media showcased in our annual public vernissage.",
      participants: "Annual City Exhibition",
      badge: "Curated Showcase",
      image: "/images/campus/visual-arts.jpg",
      tags: ["Oil Painting", "Ceramics", "Digital Illustration", "Film Photography"],
    },
    {
      id: "eco-restoration-fellowship",
      title: "Eco-Restoration Project",
      category: "Sustainability & Outdoors",
      description:
        "Managing our on-campus micro-forest, testing watershed purity, and leading solar energy generation audits across the campus.",
      participants: "Carbon Neutral by 2027",
      badge: "Green Flag Award",
      image: "/images/campus/eco.jpg",
      tags: ["Micro-Forest", "Hydroponics", "Solar Monitoring", "Biodiversity Mapping"],
    },
  ],

  admissions: {
    title: "Your Journey Starts Here",
    description:
      "Admission to LAX360 is holistic. We look for intellectual curiosity, integrity, collaborative spirit, and a desire to make a meaningful difference.",
    deadlines: [
      { round: "Early Decision Round", date: "November 15, 2026" },
      { round: "Regular Admission Round", date: "January 30, 2027" },
      { round: "Rolling Assessment", date: "Subject to Seat Availability" },
    ],
    steps: [
      {
        step: "01",
        title: "Submit Enquiry",
        timeline: "Day 1",
        description:
          "Complete our simple digital inquiry form. Receive our comprehensive academic prospectus and a personalized family admissions portal login.",
        details: ["Online dossier submission", "Academic transcripts of past 2 years", "Recommendation letters (Grades 6–12)"],
      },
      {
        step: "02",
        title: "Campus Visit",
        timeline: "Week 1 – 2",
        description:
          "Experience the school in action with an architecture and classroom tour guided by our senior student ambassadors and admissions director.",
        details: ["Shadow a student for half a day", "Classroom observation", "Faculty consultation session"],
      },
      {
        step: "03",
        title: "Student Interaction",
        timeline: "Week 3",
        description:
          "An informal, engaging conversation designed to understand your child's innate passions, curiosities, strengths, and personal aspirations.",
        details: ["Age-appropriate cognitive exploration", "Creative expression exercise", "Family educational alignment dialogue"],
      },
      {
        step: "04",
        title: "Admission Confirmation",
        timeline: "Week 4",
        description:
          "Review your official acceptance offer and welcome package. Join our vibrant international community of scholars and changemakers.",
        details: ["Official enrollment agreement", "House allocation and uniform sizing", "Orientation week timetable"],
      },
    ],
    faqs: [
      {
        question: "What curriculum does LAX360 follow?",
        answer:
          "LAX360 provides a continuous international pathway: the International Baccalaureate Primary Years Programme (PYP) in primary grades, transitioning to Cambridge Lower Secondary in middle grades, and culminating in either the full IB Diploma Programme (IBDP) or Cambridge International A-Levels in high school.",
      },
      {
        question: "How does LAX360 support English language learners (EAL)?",
        answer:
          "We maintain a dedicated English as an Additional Language (EAL) department providing individualized language scaffolding, bilingual co-teachers in primary grades, and intensive immersion cohorts without isolating students from mainstream coursework.",
      },
      {
        question: "Are merit and need-based scholarships offered?",
        answer:
          "Yes. LAX360 awards competitive academic, artistic, and athletic scholarships covering up to 75% of tuition fees for exceptional candidates entering Grades 9 through 11.",
      },
      {
        question: "What is the teacher-to-student ratio?",
        answer:
          "Our average teacher-to-student ratio is 1:11 across the school, with early years maintaining 1:6. Class sizes are strictly capped at 18 students to ensure individualized attention.",
      },
    ],
  },

  contact: {
    address: "LAX360 Boulevard, Innovation Corridor, Sector 4, Silicon District",
    phone: "+1 (800) 459-NOVA",
    admissionsPhone: "+1 (800) 459-3382",
    whatsApp: "+1 (800) 459-3382",
    email: "info@lax360.edu",
    admissionsEmail: "admissions@lax360.edu",
    hours: "Monday – Friday: 7:30 AM – 5:00 PM | Saturday: 8:30 AM – 1:00 PM",
    social: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "YouTube", url: "https://youtube.com" },
      { platform: "X (Twitter)", url: "https://x.com" },
    ],
  },
};

export const getWhatsAppUrl = (): string => {
  const rawNumber =
    schoolData.contact.whatsApp || schoolData.contact.admissionsPhone || "18004593382";
  const cleanPhone = rawNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=Hello%20LAX360%20Admissions%20Office`;
};

export const SOCIAL_LINKS = {
  whatsapp: getWhatsAppUrl(),
  instagram:
    schoolData.contact.social.find((s) => s.platform.toLowerCase() === "instagram")?.url ||
    "https://instagram.com",
  youtube:
    schoolData.contact.social.find((s) => s.platform.toLowerCase() === "youtube")?.url ||
    "https://youtube.com",
};

