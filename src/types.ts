export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[]; // bullets or sections
  speakerNotes: string[];
  layoutType: 'title' | 'summary' | 'bullets' | 'split' | 'two-column' | 'conclusion' | 'marketing-plan' | 'management-plan';
  visualSuggestion?: string;
}

export const PRESENTATION_SLIDES: Slide[] = [
  {
    id: 1,
    title: "F & J Orthodontics & Smile Design Center",
    subtitle: "Modern Healthcare Digital Transformation Proposal",
    content: [
      "Prepared By: MetaWave Innovations",
      "Date: July 2026",
      "Status: Proposal Phase"
    ],
    speakerNotes: [
      "Welcome, Doctors and Board Members of F & J Orthodontics. We are MetaWave Innovations.",
      "Today, we are excited to present our modern healthcare digital transformation proposal for your clinic.",
      "Our goal is to align your clinical prestige with a high-performance, patient-first digital ecosystem that builds trust and drives growth.",
      "Note the '100% Success' badge in the corner: it represents our commitment to delivery, technical stability, and clinical compliance."
    ],
    layoutType: 'title',
    visualSuggestion: "Use the high-quality clinical imagery from your PDF. Place a prominent '100% Success' badge in the top right corner."
  },
  {
    id: 2,
    title: "Our Vision for F & J",
    subtitle: "Executive Summary",
    content: [
      "Objective: To design a modern, responsive, and user-friendly healthcare platform.",
      "Key Impact: Empower patients to easily find specialists, book appointments, and explore treatments from any device.",
      "Goal: To enhance the clinic’s digital presence, simplify administrative tasks, and provide a seamless, high-trust experience for every patient."
    ],
    speakerNotes: [
      "Let's look at the big picture. Why are we initiating this transformation?",
      "First, your patients deserve a seamless experience. We want them to find specialists, schedule visits, and view treatment paths easily.",
      "Second, we aim to reduce administrative bottlenecks by automating patient booking and medical inquiry management.",
      "Ultimately, we are building a high-trust channel where patients feel cared for even before they step into your clinic."
    ],
    layoutType: 'summary',
    visualSuggestion: "Clean minimalist layout with high contrast, centered highlights."
  },
  {
    id: 3,
    title: "Understanding Your Needs",
    subtitle: "Your Core Requirements",
    content: [
      "Patient-Focused Experience: Professional homepage & mobile-friendly interface designed for responsive accessibility.",
      "Efficiency: Interactive appointment scheduling system and seamless online consultation pathways.",
      "Trust & Credibility: Rich dentist/orthodontist profiles and transparent medical department insights with PMDC credential displays.",
      "Safety: Secure patient data handling protocols and clear physical location mapping / contact information."
    ],
    speakerNotes: [
      "Based on our initial consultations, we've boiled your requirements down to four pillars.",
      "1. Experience: It must look world-class, matching your modern workspace. It must also be fully responsive for mobile users, which accounts for over 70% of medical web traffic.",
      "2. Efficiency: Real-time schedule visibility and quick appointment submissions.",
      "3. Trust: Medical practices require verification. We will prominently showcase PMDC numbers and medical certifications.",
      "4. Safety: Patient privacy is paramount. Safe forms, secure database connections, and clear, transparent clinic locations."
    ],
    layoutType: 'bullets',
    visualSuggestion: "Four structured bento-cards representing the core requirements with visual icons."
  },
  {
    id: 4,
    title: "The Complete Digital Ecosystem",
    subtitle: "Proposed Website Solution",
    content: [
      "Website Pages: Home, About, Doctors, Specialties, Services, Health Blog, Appointment Booking, Testimonials, Contact, FAQ.",
      "Interactive Modules: Real-time Doctor Availability, Integrated Booking Engine, Newsletter Subscription, Google Maps & WhatsApp Instant Chat integration."
    ],
    speakerNotes: [
      "This slide outlines the architecture of the proposed F & J Orthodontics platform.",
      "On the left, we have a comprehensive list of pages that will cover all of your services, doctor backgrounds, patient reviews, and educational dental health articles.",
      "On the right, we highlight interactive modules that turn a passive brochure into an active patient-acquisition tool.",
      "With real-time availability and live WhatsApp integration, patient conversion rates typically see a 35% improvement."
    ],
    layoutType: 'split',
    visualSuggestion: "Split Screen Layout: Website pages on the left, interactive features on the right."
  },
  {
    id: 5,
    title: "Engineered for Excellence",
    subtitle: "Features & Functionalities",
    content: [
      "Patient Features (The Experience):",
      "Advanced Doctor Search & high-fidelity profiles",
      "Fast, ultra-responsive performance on all mobile devices",
      "Educational dental Health Articles & advice columns",
      "One-click emergency contact & interactive location mapping",
      "Admin Features (The Control):",
      "Secure dashboard with administrative statistics and clinic analytics",
      "Simplified real-time appointment tracking & content management",
      "Full website configurations and visual/content control panels"
    ],
    speakerNotes: [
      "Let's talk about the features that power this platform.",
      "For your patients: they get high-speed access to articles, profiles, and quick location mapping in case of a dental emergency.",
      "For your clinic administrators: they receive a secure backend dashboard. No more messy spreadsheets. You can approve or reschedule appointments, post articles to the health blog, and track daily appointment analytics at a glance."
    ],
    layoutType: 'two-column',
    visualSuggestion: "Two-Column Layout: Patient Features on the left, Admin Features on the right."
  },
  {
    id: 6,
    title: "Why Choose MetaWave Innovations?",
    subtitle: "MetaWave Advantage (New Update)",
    content: [
      "Clinical Trust: We don’t just build websites; we build trust through verified PMDC credential displays and secure data protocols.",
      "High Performance: Optimized for fast loading on local networks, ensuring patients never face lag.",
      "Scalable Architecture: Designed to grow with your clinic—from a single chair to a multi-specialty hospital.",
      "Local Expertise: A deep understanding of the local healthcare landscape and patient communication needs."
    ],
    speakerNotes: [
      "Why partner with MetaWave Innovations? We offer specialized expertise for the medical sector.",
      "First, clinical trust is built-in. We structure your team profiles around PMDC credentials to ensure full regulatory and professional compliance.",
      "Second, our builds are incredibly fast. We optimize assets and cache queries, so even patients on slow mobile connections experience zero delay.",
      "Third, it's highly scalable. When you open new branches or add more departments, the system grows with you without needing a rebuild."
    ],
    layoutType: 'bullets',
    visualSuggestion: "Modern grid highlighting clinical trust, performance, scale, and expertise with high contrast icons."
  },
  {
    id: 7,
    title: "Let’s Transform Your Smile Center",
    subtitle: "Conclusion & Contact",
    content: [
      "We are ready to build a digital platform that reflects the prestige of your practice.",
      "Call to Action: 'We look forward to partnering with you.'",
      "Website: www.metawaveinnovations.com",
      "Contact Email: team@metawaveinnovations.com",
      "Phone: 03390088458"
    ],
    speakerNotes: [
      "In conclusion, we are fully prepared to launch this project and partner with F & J Orthodontics.",
      "Your clinical excellence deserves a digital representation of equal caliber.",
      "We are ready to align, build, and deploy this within our proposed timeline.",
      "Thank you for your time today. Let's open the floor to any questions!"
    ],
    layoutType: 'conclusion',
    visualSuggestion: "A clean image of a doctor/patient interaction with a large 'Checkmark' badge to symbolize trust and completion."
  },
  {
    id: 8,
    title: "3-Month Digital Marketing Foundation Plan",
    subtitle: "Patient Acquisition • Brand Awareness • Local Visibility",
    content: [
      "Professional Social Media Presence: Facebook, Instagram, LinkedIn, Google Business Profile, Consistent Branding",
      "Content Marketing: Educational Posts, Reels, Health Tips, Patient Awareness, Before/After Success Stories, Monthly Content Calendar",
      "Local SEO: Google Business Optimization, Local Keywords, Maps Ranking, Reviews, Location Pages",
      "SEO + AEO + GEO: professionally optimize for Search Engine Optimization, Answer Engine Optimization, Generative Engine Optimization for Google Search, Google AI Overview, ChatGPT, Gemini, Claude, Perplexity, Voice Search, Medical Search Intent",
      "Paid Advertising: Meta Ads, Google Search Ads, Appointment Campaigns, Lead Generation, Retargeting",
      "Performance Tracking: Google Analytics, Search Console, Monthly Reports, Website Traffic, Calls, WhatsApp Leads, Appointment Tracking"
    ],
    speakerNotes: [
      "Now, let's explore our tactical approach. This is the 3-Month Digital Marketing Foundation Plan designed for patient acquisition and local visibility.",
      "We will establish a solid social media presence and execute a strong content marketing strategy with before-and-after success stories.",
      "Most importantly, we're optimizing not just for standard SEO, but also for AEO and GEO—meaning ChatGPT, Gemini, Claude, and Google AI Overviews.",
      "Through hyper-local paid advertising and transparent performance tracking, we ensure every rupee is spent efficiently to book actual appointments."
    ],
    layoutType: 'marketing-plan',
    visualSuggestion: "Six premium bento-style cards in a clean 3x2 grid layout, completed with a solid emerald call-out banner."
  },
  {
    id: 9,
    title: "Monthly Growth & Digital Management",
    subtitle: "Long-Term Growth Partnership",
    content: [
      "Social Media Management",
      "Monthly SEO Maintenance",
      "AEO & GEO Updates",
      "Google Business Management",
      "Blog Publishing",
      "Website Maintenance",
      "Performance Monitoring",
      "Reputation Management",
      "Monthly Reporting",
      "Technical Support"
    ],
    speakerNotes: [
      "Beyond the launch, we propose a long-term growth partnership to manage and scale your digital footprint.",
      "Our team handles full social media management, continuous SEO/GEO updates, regular website maintenance, and detailed monthly reports.",
      "We offer two distinct retainer phases: a comprehensive PKR 30,000/month Foundation Phase, followed by a PKR 15,000+/month Maintenance Phase.",
      "Your advertising budget remains entirely controlled by you. Let's collaborate to make F & J the most trusted smile center in the region."
    ],
    layoutType: 'management-plan',
    visualSuggestion: "A modern split-screen interface displaying professional management checklist services on the left, and three premium stacked pricing cards on the right."
  }
];
