/**
 * LAX360 School Assistant - Knowledge Base & Query Matcher
 * 100% Frontend-Only. Zero external AI services or API keys.
 * Synchronized with existing school datasets and route structures.
 */

export interface ChatbotActionLink {
  label: string;
  href: string;
}

export interface ChatbotResponse {
  text: string;
  actionLink?: ChatbotActionLink;
  suggestedQuestions?: string[];
}

export interface QuickQuestionItem {
  id: string;
  question: string;
  shortLabel: string;
}

export const QUICK_QUESTIONS: QuickQuestionItem[] = [
  {
    id: "about",
    question: "Tell me about LAX360",
    shortLabel: "About LAX360",
  },
  {
    id: "programs",
    question: "Explore our programs",
    shortLabel: "Academic Programs",
  },
  {
    id: "admissions",
    question: "How does admission work?",
    shortLabel: "Admission Roadmap",
  },
  {
    id: "facilities",
    question: "What facilities do you have?",
    shortLabel: "Campus Facilities",
  },
  {
    id: "campus-life",
    question: "Tell me about campus life",
    shortLabel: "Campus Life & Clubs",
  },
  {
    id: "careers",
    question: "What careers are available?",
    shortLabel: "Faculty Careers",
  },
  {
    id: "contact",
    question: "How can I contact the school?",
    shortLabel: "Contact & Location",
  },
];

export const ROUTE_AWARE_PROMPTS: Record<string, string> = {
  "/": "Welcome to LAX360 Academy. I can help you explore our curricula, campus infrastructure, student houses, admissions, or faculty careers.",
  "/about": "You're exploring About Us. I can share our founding story from 2012, Socratic pedagogy, 11:1 student-teacher ratio, or accreditations.",
  "/programs": "You're viewing our Academic Programs. I can guide you through our Early Years, Primary (IB PYP), Middle School, Cambridge IGCSE, or Senior IBDP & A-Levels.",
  "/campus-life": "You're exploring Campus Life. Ask me about our competitive sports, classical orchestra, robotics clubs, Model UN, or the Four-House system.",
  "/facilities": "You're exploring our Facilities. Ask me about our Olympic aquatic center, biotechnology labs, robotics incubator, or 35,000-volume library.",
  "/admissions": "You're exploring Admissions. I can answer questions about our 4-step roadmap, age eligibility criteria, required documents, or fee policies.",
  "/careers": "You're exploring Careers. Ask me about open teaching and leadership vacancies or how to submit your dossier.",
  "/contact": "You're on our Contact page. Ask for our admissions helpline, campus address on ECR, or visiting hours.",
};

interface KnowledgeItem {
  keywords: string[];
  response: ChatbotResponse;
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. About / Institutional Identity
  {
    keywords: [
      "about",
      "who are you",
      "vision",
      "mission",
      "story",
      "history",
      "founded",
      "established",
      "principal",
      "head of school",
      "rajeshwari",
      "ratio",
      "values",
      "ethos",
      "pillars",
      "accreditations",
      "board",
    ],
    response: {
      text: "Founded in 2012, LAX360 Academy is a premier international school situated on a 28-acre green bio-campus in Chennai. Led by Dr. Rajeshwari Sundaram, Ph.D., we provide Socratic, inquiry-driven learning with an 11:1 student-teacher ratio. We are accredited by Cambridge International (CAIE) and authorized for the International Baccalaureate (IB) programme.",
      actionLink: {
        label: "Explore About LAX360",
        href: "/about",
      },
      suggestedQuestions: [
        "Explore our programs",
        "How does admission work?",
        "What facilities do you have?",
      ],
    },
  },

  // 2. Academic Programs / Curriculum
  {
    keywords: [
      "program",
      "programs",
      "curriculum",
      "curricula",
      "academics",
      "classes",
      "grades",
      "levels",
      "kindergarten",
      "early years",
      "primary",
      "middle school",
      "secondary",
      "high school",
      "igcse",
      "cambridge",
      "ibdp",
      "ib diploma",
      "a-level",
      "a levels",
      "pyp",
      "syllabus",
      "subjects",
      "stem",
      "math",
      "science",
    ],
    response: {
      text: "LAX360 offers a unified international K–12 continuum: Early Years (play-based inquiry), Primary School (IB PYP with transdisciplinary units), Middle School (Cambridge Lower Secondary), Secondary (Cambridge IGCSE in Grades 9–10), and Senior Secondary (IB Diploma Programme and Cambridge A-Levels in Grades 11–12). Our students consistently achieve 100% university placement.",
      actionLink: {
        label: "View Academic Frameworks",
        href: "/programs",
      },
      suggestedQuestions: [
        "How does admission work?",
        "What facilities do you have?",
        "Tell me about campus life",
      ],
    },
  },

  // 3. Admissions / Applications / Fees / Eligibility
  {
    keywords: [
      "admission",
      "admissions",
      "apply",
      "application",
      "how to join",
      "enroll",
      "enrollment",
      "enrolment",
      "eligibility",
      "age",
      "age limit",
      "criteria",
      "documents",
      "certificate",
      "deadline",
      "dates",
      "round",
      "fee",
      "fees",
      "cost",
      "tuition",
      "scholarship",
    ],
    response: {
      text: "Admissions for the 2026–2027 academic session are currently open. Our transparent 4-step roadmap includes: 1) Online Enquiry, 2) Diagnostic Interaction, 3) Committee Review & Offer, and 4) Enrolment & Induction. In accordance with institutional policy, complete itemized fee schedules are shared in person during your Admissions Advisory Consultation.",
      actionLink: {
        label: "Explore Admissions Process",
        href: "/admissions",
      },
      suggestedQuestions: [
        "What facilities do you have?",
        "Explore our programs",
        "How can I contact the school?",
      ],
    },
  },

  // 4. Facilities / Infrastructure / Safety / Transport
  {
    keywords: [
      "facility",
      "facilities",
      "campus",
      "infrastructure",
      "library",
      "lab",
      "labs",
      "laboratory",
      "science lab",
      "robotics lab",
      "classroom",
      "classrooms",
      "smart classroom",
      "swimming",
      "pool",
      "aquatic",
      "ground",
      "sports ground",
      "pitch",
      "auditorium",
      "theater",
      "theatre",
      "eco",
      "bio-campus",
      "acre",
      "acres",
      "bus",
      "transport",
      "safety",
      "security",
      "medical",
      "infirmary",
      "nurse",
    ],
    response: {
      text: "Our 28-acre sustainable bio-campus features an Olympic 50m temperature-controlled aquatic center, FIFA-grade turf pitch, advanced Physics, Chemistry & Biology laboratories, a 3,200 sq. ft. robotics and maker incubator, a 35,000-volume Central Knowledge Commons, and an 800-seat performing arts auditorium. The campus is secured 24/7 with RFID entry and full-time medical staff.",
      actionLink: {
        label: "Tour Campus Infrastructure",
        href: "/facilities",
      },
      suggestedQuestions: [
        "Tell me about campus life",
        "How does admission work?",
        "How can I contact the school?",
      ],
    },
  },

  // 5. Campus Life / Clubs / Houses / Sports / Arts
  {
    keywords: [
      "campus life",
      "student life",
      "club",
      "clubs",
      "society",
      "societies",
      "house",
      "houses",
      "house system",
      "agni",
      "vayu",
      "prithvi",
      "jal",
      "sport",
      "sports",
      "athletics",
      "football",
      "basketball",
      "music",
      "orchestra",
      "art",
      "arts",
      "drama",
      "theatre",
      "mun",
      "model un",
      "debate",
      "field trip",
      "trip",
      "social impact",
      "service",
      "community",
      "cultural",
      "fest",
      "festival",
      "events",
    ],
    response: {
      text: "Student life at LAX360 is vibrant and holistic. Students belong to one of four elemental houses: Agni, Vayu, Prithvi, or Jal, fostering inter-grade mentorship. We offer over 18 student-led societies including Robotics, Model UN, Classical Orchestra, Fine Arts, and Eco-Restoration, alongside competitive inter-school athletics and community service.",
      actionLink: {
        label: "Discover Student Life",
        href: "/campus-life",
      },
      suggestedQuestions: [
        "Explore our programs",
        "What facilities do you have?",
        "How can I contact the school?",
      ],
    },
  },

  // 6. Careers / Jobs / Faculty Recruitment
  {
    keywords: [
      "career",
      "careers",
      "job",
      "jobs",
      "hiring",
      "vacancy",
      "vacancies",
      "work",
      "teacher",
      "teaching",
      "educator",
      "faculty",
      "position",
      "openings",
      "recruitment",
      "apply for job",
      "resume",
      "cv",
    ],
    response: {
      text: "LAX360 seeks visionary educators and administrators who are passionate about Socratic inquiry and pastoral excellence. We currently have published openings for IBDP Coordinator, Senior Physics Mentor, Primary Homeroom Educator, and Performing Arts Director. We offer competitive remuneration, faculty housing assistance, and continuous global professional development.",
      actionLink: {
        label: "View Faculty Openings",
        href: "/careers",
      },
      suggestedQuestions: [
        "Tell me about LAX360",
        "How can I contact the school?",
        "Explore our programs",
      ],
    },
  },

  // 7. Contact / Visiting Hours / Address / Phone / WhatsApp
  {
    keywords: [
      "contact",
      "reach",
      "phone",
      "telephone",
      "call",
      "helpline",
      "email",
      "mail",
      "address",
      "location",
      "where",
      "map",
      "directions",
      "visit",
      "tour",
      "hours",
      "timing",
      "whatsapp",
      "appointment",
    ],
    response: {
      text: "You can reach our Admissions Advisory desk at +91 98400 12345 or via email at admissions@lax360.edu.in. Our main campus is located on LAX360 Boulevard along the ECR Knowledge Corridor in Chennai. We are open Monday through Friday from 8:00 AM to 4:30 PM, and Saturdays by prior appointment.",
      actionLink: {
        label: "Visit Contact Page",
        href: "/contact",
      },
      suggestedQuestions: [
        "How does admission work?",
        "What facilities do you have?",
        "Tell me about LAX360",
      ],
    },
  },

  // 8. General Greetings
  {
    keywords: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "namaste",
      "vanakkam",
      "greetings",
    ],
    response: {
      text: "Hello and welcome to LAX360 Academy! I am your interactive school assistant. How can I assist you with information about our academic programs, admissions process, campus facilities, or student life?",
      actionLink: {
        label: "Explore Academic Programs",
        href: "/programs",
      },
      suggestedQuestions: [
        "Tell me about LAX360",
        "Explore our programs",
        "How does admission work?",
      ],
    },
  },
];

/**
 * Match a user's text query to local knowledge base.
 * Purely algorithmic in-browser matching.
 */
export function matchUserQuery(
  rawQuery: string,
  currentPathname?: string
): ChatbotResponse {
  const query = rawQuery.toLowerCase().trim();

  if (!query) {
    return {
      text: "Please enter a question or choose from the quick topics below.",
      suggestedQuestions: [
        "Tell me about LAX360",
        "Explore our programs",
        "How does admission work?",
      ],
    };
  }

  // Check against knowledge base
  let bestMatch: ChatbotResponse | null = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (query === kw) {
        score += 10;
      } else if (query.includes(kw)) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item.response;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch;
  }

  // Graceful Fallback if query didn't match specific knowledge items
  return {
    text: "Thanks for your question. I don't have that specific detail in my quick guide, but I can assist you with:\n\n• Our School Ethos & Story\n• Academic Programs (K–12)\n• Admissions & Eligibility\n• Campus Facilities & Sports\n• Student Life, Clubs & Houses\n• Careers & Openings\n• Campus Location & Contact\n\nPlease select one of the topics below or reach out directly to our admissions team.",
    actionLink: {
      label: "Contact School Desk",
      href: "/contact",
    },
    suggestedQuestions: [
      "Tell me about LAX360",
      "Explore our programs",
      "How does admission work?",
      "How can I contact the school?",
    ],
  };
}
