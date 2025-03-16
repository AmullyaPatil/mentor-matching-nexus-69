
// User roles
export enum UserRole {
  MENTOR = "mentor",
  MENTEE = "mentee",
  INVESTOR = "investor",
  SERVICE_PROVIDER = "service_provider",
  COFOUNDER = "cofounder"
}

export const USER_ROLE_LABELS = {
  [UserRole.MENTOR]: "Mentor",
  [UserRole.MENTEE]: "Mentee",
  [UserRole.INVESTOR]: "Investor",
  [UserRole.SERVICE_PROVIDER]: "Service Provider",
  [UserRole.COFOUNDER]: "Co-founder"
};

export const USER_ROLE_DESCRIPTIONS = {
  [UserRole.MENTOR]: "Guide startups with your expertise and experience",
  [UserRole.MENTEE]: "Get guidance and support for your startup journey",
  [UserRole.INVESTOR]: "Find promising startups to invest in",
  [UserRole.SERVICE_PROVIDER]: "Offer your professional services to startups",
  [UserRole.COFOUNDER]: "Find partners to build a startup with"
};

// Navigation
export const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },
  { name: "Community", path: "/community" },
  { name: "Dashboard", path: "/dashboard" },
];

// Mock data for development
export const MOCK_USERS = [
  {
    id: "1",
    name: "Alex Morgan",
    role: UserRole.MENTOR,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    bio: "Serial entrepreneur with 3 successful exits. I help early-stage startups refine their product strategy and go-to-market approach.",
    expertise: ["Product Strategy", "Growth", "Fundraising"],
    location: "San Francisco, CA",
    connections: 158,
    yearsOfExperience: 12,
    industry: "Technology",
    experience: "10+ years",
    rating: 4.9
  },
  {
    id: "2",
    name: "David Chen",
    role: UserRole.INVESTOR,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    bio: "Angel investor focused on B2B SaaS and fintech. Former VP of Product at a Fortune 500 company.",
    expertise: ["SaaS", "Fintech", "Seed Funding"],
    location: "New York, NY",
    connections: 207,
    investment: { stage: "Seed to Series A", range: "$100K - $1M" },
    industry: "Finance",
    experience: "10+ years",
    rating: 4.8
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: UserRole.SERVICE_PROVIDER,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
    bio: "Corporate lawyer specializing in startup incorporation, fundraising, and IP protection.",
    expertise: ["Legal", "IP Law", "Fundraising"],
    location: "Boston, MA",
    connections: 124,
    services: ["Legal Consultation", "Contract Review", "IP Strategy"],
    industry: "Legal",
    experience: "6-10 years",
    rating: 4.7
  },
  {
    id: "4",
    name: "Michael Johnson",
    role: UserRole.COFOUNDER,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    bio: "Technical co-founder looking for a business partner. 10+ years experience in machine learning and AI.",
    expertise: ["Machine Learning", "AI", "Technical Leadership"],
    location: "Austin, TX",
    connections: 96,
    lookingFor: ["Business Co-founder", "Seed Funding", "B2B SaaS"],
    industry: "Technology",
    experience: "10+ years",
    rating: 4.6
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    role: UserRole.MENTEE,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2888&auto=format&fit=crop",
    bio: "First-time founder building a sustainability focused e-commerce platform. Looking for guidance on product-market fit.",
    interests: ["E-commerce", "Sustainability", "Product-Market Fit"],
    location: "Portland, OR",
    connections: 42,
    startup: { name: "EcoMarket", stage: "Pre-seed" },
    industry: "E-commerce",
    experience: "0-2 years",
    rating: 4.2
  }
];

export const MOCK_POSTS = [
  {
    id: "1",
    author: MOCK_USERS[0],
    title: "5 Key Metrics Every Early-Stage Startup Should Track",
    content: "After mentoring dozens of startups, I've noticed that many founders aren't tracking the right metrics. Here are the 5 most important ones to focus on...",
    likes: 42,
    comments: 12,
    createdAt: "2023-05-15T12:34:56Z",
    tags: ["Metrics", "Startup", "Growth"]
  },
  {
    id: "2",
    author: MOCK_USERS[1],
    title: "What I Look for Before Investing in Pre-Seed Startups",
    content: "As an angel investor, I review dozens of pitch decks every month. Here's what catches my attention and what raises red flags...",
    likes: 84,
    comments: 24,
    createdAt: "2023-05-10T10:23:45Z",
    tags: ["Investment", "Pre-Seed", "Funding"]
  },
  {
    id: "3",
    author: MOCK_USERS[4],
    title: "First-time Founder Looking for Advice on Bootstrapping",
    content: "We're 6 months into building our product and trying to decide between bootstrapping further or seeking seed funding. Any advice from those who've been in this position?",
    likes: 17,
    comments: 32,
    createdAt: "2023-05-18T15:12:23Z",
    tags: ["Bootstrapping", "Funding", "First-time Founder"]
  }
];
