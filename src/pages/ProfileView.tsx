
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { MessageCircle, Phone, Video, Star, MapPin, BookOpen, Briefcase, Calendar, Users, Award, ArrowLeft, Shield, Trophy, Clock, Medal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ConnectionService {
  id: string;
  type: "chat" | "voice" | "video" | "meeting";
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

interface Milestone {
  title: string;
  type: string;
  icon: React.ReactNode;
}

interface ProfileData {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  bio: string;
  expertise: string[];
  interests: string[];
  location: string;
  connections: number;
  yearsOfExperience: number;
  education: string[];
  company?: string;
  position?: string;
  startup?: string;
  connectionServices: ConnectionService[];
  testimonials: Testimonial[];
  about: string;
  milestones: Milestone[];
}

const mockProfiles: ProfileData[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    role: UserRole.MENTOR,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop",
    bio: "Tech executive with 15+ years of experience helping startups scale their operations",
    expertise: ["Leadership", "Scaling", "Operations", "Product Strategy", "Mentorship"],
    interests: ["AI", "Climate Tech", "Health Tech"],
    location: "San Francisco, CA",
    connections: 275,
    yearsOfExperience: 15,
    education: ["MBA, Stanford University", "BS Computer Science, MIT"],
    company: "GrowthLabs",
    position: "Chief Operating Officer",
    about: "I'm a seasoned tech executive with a passion for helping startups scale successfully. Having led operations at two unicorn startups and mentored dozens of founders, I bring practical experience in navigating growth challenges. My approach combines strategic vision with hands-on problem solving. I'm particularly interested in companies applying artificial intelligence to solve meaningful problems.",
    milestones: [
      { title: "Top Mentor", type: "achievement", icon: <Award className="h-3 w-3 mr-1" /> },
      { title: "250+ Connections", type: "milestone", icon: <Users className="h-3 w-3 mr-1" /> },
      { title: "Verified Mentor", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> },
      { title: "Early Adopter", type: "pro", icon: <Star className="h-3 w-3 mr-1" /> }
    ],
    connectionServices: [
      {
        id: "s1",
        type: "chat",
        name: "Quick Advice",
        description: "Text-based consultation for specific questions and quick feedback",
        price: 75,
        duration: "1 week of messaging",
        icon: <MessageCircle className="h-5 w-5" />
      },
      {
        id: "s2",
        type: "voice",
        name: "Strategy Call",
        description: "In-depth voice consultation focused on strategic planning",
        price: 150,
        duration: "45 minutes",
        icon: <Phone className="h-5 w-5" />
      },
      {
        id: "s3",
        type: "video",
        name: "Deep Dive Session",
        description: "Comprehensive video consultation with screen sharing and document review",
        price: 250,
        duration: "1 hour",
        icon: <Video className="h-5 w-5" />
      },
      {
        id: "s4",
        type: "meeting",
        name: "Monthly Mentorship",
        description: "Ongoing mentorship with weekly check-ins and priority support",
        price: 1000,
        duration: "1 month",
        icon: <Users className="h-5 w-5" />
      }
    ],
    testimonials: [
      {
        id: "t1",
        author: "David Chen",
        role: "Founder, TechStart",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 5,
        content: "Emma's guidance was transformative for our startup. Her strategic insights helped us navigate a critical growth phase and secure our Series A funding.",
        date: "October 15, 2023"
      },
      {
        id: "t2",
        author: "Sarah Johnson",
        role: "CEO, HealthAI",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww",
        rating: 5,
        content: "Working with Emma has been incredible. She quickly identified operational inefficiencies we hadn't seen and helped us implement solutions that doubled our team's productivity.",
        date: "August 3, 2023"
      },
      {
        id: "t3",
        author: "Michael Patel",
        role: "CTO, DataFlow",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4,
        content: "Emma's extensive experience in scaling operations is evident in every conversation. She provided practical advice that we could implement immediately.",
        date: "June 22, 2023"
      }
    ]
  },
  {
    id: "2",
    name: "Marcus Washington",
    role: UserRole.INVESTOR,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    bio: "Angel investor with a portfolio of 20+ early-stage startups in fintech and B2B SaaS",
    expertise: ["Seed Funding", "FinTech", "SaaS", "Market Analysis", "Pitch Decks"],
    interests: ["Financial Inclusion", "Enterprise Software", "AI"],
    location: "New York, NY",
    connections: 420,
    yearsOfExperience: 8,
    education: ["MBA, Harvard Business School", "BA Economics, Princeton"],
    company: "Horizon Ventures",
    position: "Managing Partner",
    about: "I'm an angel investor and venture partner focusing on early-stage startups in the fintech and B2B SaaS spaces. Prior to investing, I co-founded a fintech company that was acquired in 2018. I look for founders with deep domain expertise who are solving real problems with scalable solutions. I'm particularly passionate about startups working on financial inclusion and democratizing access to financial services.",
    milestones: [
      { title: "Angel Investor", type: "founder", icon: <Trophy className="h-3 w-3 mr-1" /> },
      { title: "400+ Connections", type: "milestone", icon: <Users className="h-3 w-3 mr-1" /> },
      { title: "Verified Investor", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> },
      { title: "5+ Years Member", type: "achievement", icon: <Clock className="h-3 w-3 mr-1" /> }
    ],
    connectionServices: [
      {
        id: "s1",
        type: "chat",
        name: "Pitch Review",
        description: "Written feedback on your pitch deck and business model",
        price: 200,
        duration: "48-hour turnaround",
        icon: <MessageCircle className="h-5 w-5" />
      },
      {
        id: "s2",
        type: "voice",
        name: "Fundraising Strategy",
        description: "Guidance on fundraising approach and investor targeting",
        price: 300,
        duration: "60 minutes",
        icon: <Phone className="h-5 w-5" />
      },
      {
        id: "s3",
        type: "video",
        name: "Investor Readiness",
        description: "Comprehensive review of your startup's investment potential",
        price: 500,
        duration: "90 minutes",
        icon: <Video className="h-5 w-5" />
      }
    ],
    testimonials: [
      {
        id: "t1",
        author: "Jennifer Lee",
        role: "Founder, PaySimple",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
        rating: 5,
        content: "Marcus's feedback completely transformed our pitch deck. His insights into what investors look for helped us secure $2M in seed funding.",
        date: "November 10, 2023"
      },
      {
        id: "t2",
        author: "Alex Rivera",
        role: "CEO, CloudAccounts",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 5,
        content: "The investor strategy session with Marcus was worth every penny. He has an incredible network and helped us connect with the perfect investors for our Series A.",
        date: "September 5, 2023"
      }
    ]
  },
  {
    id: "3",
    name: "Sophia Chen",
    role: UserRole.MENTOR,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
    bio: "Product leader specializing in user-centered design and agile methodologies",
    expertise: ["Product Management", "UX Design", "Agile", "Product Strategy", "User Research"],
    interests: ["EdTech", "Productivity", "Accessibility"],
    location: "Seattle, WA",
    connections: 198,
    yearsOfExperience: 12,
    education: ["MS Human-Computer Interaction, Carnegie Mellon", "BA Psychology, UC Berkeley"],
    company: "TechGiants",
    position: "Senior Product Director",
    about: "I'm a product leader with experience building consumer and enterprise products used by millions. I've led product teams at both startups and large tech companies, with a focus on creating intuitive, user-centered experiences. My passion is helping product managers and designers develop their skills and create products that truly solve user problems. I believe in data-informed decision making balanced with strong design intuition.",
    milestones: [
      { title: "Product Expert", type: "pro", icon: <Medal className="h-3 w-3 mr-1" /> },
      { title: "UX Specialist", type: "achievement", icon: <Award className="h-3 w-3 mr-1" /> },
      { title: "Verified Profile", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> },
      { title: "100+ Connections", type: "milestone", icon: <Users className="h-3 w-3 mr-1" /> }
    ],
    connectionServices: [
      {
        id: "s1",
        type: "chat",
        name: "Product Feedback",
        description: "Detailed feedback on your product with actionable improvements",
        price: 100,
        duration: "1 week of messaging",
        icon: <MessageCircle className="h-5 w-5" />
      },
      {
        id: "s2",
        type: "voice",
        name: "Product Strategy Call",
        description: "Discussion of product roadmap and prioritization",
        price: 175,
        duration: "45 minutes",
        icon: <Phone className="h-5 w-5" />
      },
      {
        id: "s3",
        type: "video",
        name: "UX Review Session",
        description: "In-depth review of your product's user experience with live feedback",
        price: 250,
        duration: "60 minutes",
        icon: <Video className="h-5 w-5" />
      }
    ],
    testimonials: [
      {
        id: "t1",
        author: "Ryan Torres",
        role: "Product Manager, LearnApp",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 5,
        content: "Sophia's product guidance was exactly what we needed. She helped us reimagine our onboarding flow, resulting in a 40% increase in user activation.",
        date: "October 20, 2023"
      },
      {
        id: "t2",
        author: "Lisa Kim",
        role: "UX Designer, WorkFlow",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4,
        content: "The UX review session with Sophia transformed how we approach design problems. Her framework for user-centered design is practical and effective.",
        date: "August 15, 2023"
      }
    ]
  }
];

export default function ProfileView() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    // In a real application, this would be an API call
    setTimeout(() => {
      const foundProfile = mockProfiles.find(p => p.id === id) || null;
      setProfile(foundProfile);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookService = (service: ConnectionService) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book this service.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: "Date required",
        description: "Please select a date for your booking.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Service booked!",
      description: `You've booked ${service.name} with ${profile?.name} on ${format(selectedDate, 'PPP')}.`,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="flex space-x-6">
              <div className="rounded-full bg-cobalt-100 h-32 w-32"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-cobalt-100 rounded w-3/4"></div>
                <div className="h-6 bg-cobalt-100 rounded w-1/4"></div>
                <div className="h-4 bg-cobalt-100 rounded w-5/6"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-cobalt-100 rounded"></div>
              <div className="h-4 bg-cobalt-100 rounded w-5/6"></div>
              <div className="h-4 bg-cobalt-100 rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-cobalt-100 rounded"></div>
              <div className="h-48 bg-cobalt-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-semibold text-gray-800">Profile not found</h2>
          <p className="text-muted-foreground mt-2">The profile you're looking for doesn't exist or has been removed.</p>
          <Button onClick={goBack} className="mt-6 bg-cobalt-600 hover:bg-cobalt-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-4">
        <Button onClick={goBack} className="flex items-center text-cobalt-700 hover:text-cobalt-800 bg-transparent hover:bg-cobalt-50">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-cobalt-50 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-cobalt-900">{profile.name}</h1>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-cobalt-600 hover:bg-cobalt-700 mr-2">
                      {USER_ROLE_LABELS[profile.role]}
                    </Badge>
                    <div className="flex items-center text-cobalt-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-cobalt-100 px-3 py-1 rounded-full text-cobalt-800">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{profile.connections} connections</span>
                  </div>
                  <Button variant="outline" className="border-cobalt-300 text-cobalt-700 hover:bg-cobalt-50">
                    Connect
                  </Button>
                  <Button className="bg-cobalt-600 hover:bg-cobalt-700">
                    Message
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-cobalt-800">{profile.bio}</p>
              
              {/* Badge Images Section */}
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.milestones.map((milestone, index) => (
                  <Badge key={index} variant={milestone.type as any} className="flex items-center px-3 py-1">
                    {milestone.icon}
                    {milestone.title}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-white border-cobalt-200 text-cobalt-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="about" className="p-6">
          <TabsList className="bg-cobalt-50">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Connection Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
                    
                    {/* Achievement Badges */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4 text-cobalt-700">Badges & Achievements</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {profile.milestones.map((milestone, index) => (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 
                              ${milestone.type === 'achievement' ? 'bg-amber-100' : 
                                milestone.type === 'milestone' ? 'bg-purple-100' : 
                                milestone.type === 'verified' ? 'bg-green-100' : 
                                milestone.type === 'pro' ? 'bg-blue-100' : 'bg-red-100'}`}>
                              <span className="text-2xl">
                                {milestone.type === 'achievement' ? <Award className="h-8 w-8 text-amber-600" /> : 
                                  milestone.type === 'milestone' ? <Users className="h-8 w-8 text-purple-600" /> : 
                                  milestone.type === 'verified' ? <Shield className="h-8 w-8 text-green-600" /> : 
                                  milestone.type === 'pro' ? <Medal className="h-8 w-8 text-blue-600" /> : 
                                  <Trophy className="h-8 w-8 text-red-600" />}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-cobalt-800">{milestone.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {(profile.company || profile.position) && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-cobalt-600" />
                        Current Position
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">{profile.position}</p>
                      <p className="text-muted-foreground">{profile.company}</p>
                    </CardContent>
                  </Card>
                )}

                {profile.education && profile.education.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-cobalt-600" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {profile.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="mr-2 h-5 w-5 text-cobalt-600" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="bg-cobalt-100 text-cobalt-800 font-semibold rounded-full h-14 w-14 flex items-center justify-center">
                        {profile.yearsOfExperience}+
                      </div>
                      <div>
                        <p className="font-medium">Years of experience</p>
                        <p className="text-sm text-muted-foreground">Professional experience</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.connectionServices.map((service) => (
                <Card key={service.id} className="overflow-hidden border-cobalt-100 hover:border-cobalt-300 transition-all">
                  <div className="bg-cobalt-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-cobalt-600 text-white rounded-full p-2">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-cobalt-900">{service.name}</h3>
                        <p className="text-sm text-cobalt-700">{service.duration}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <p className="text-xl font-bold text-cobalt-800">${service.price}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 py-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-cobalt-600 hover:bg-cobalt-700">Book Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book {service.name} with {profile.name}</DialogTitle>
                          <DialogDescription>
                            You're about to book a {service.duration} {service.type} session for ${service.price}.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4 space-y-4">
                          <h4 className="font-semibold mb-2">Select a Date</h4>
                          <div className="flex justify-center">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("rounded-md border p-3 pointer-events-auto")}
                            />
                          </div>
                          
                          <h4 className="font-semibold mt-4 mb-2">Service Details</h4>
                          <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                          
                          <div className="bg-cobalt-50 p-4 rounded-md">
                            <div className="flex justify-between mb-2">
                              <span>Service Fee</span>
                              <span className="font-semibold">${service.price}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span>Platform Fee</span>
                              <span className="font-semibold">${Math.round(service.price * 0.05)}</span>
                            </div>
                            <div className="flex justify-between font-bold pt-2 border-t">
                              <span>Total</span>
                              <span>${service.price + Math.round(service.price * 0.05)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" className="border-cobalt-200">Cancel</Button>
                          <Button 
                            className="bg-cobalt-600 hover:bg-cobalt-700"
                            onClick={() => handleBookService(service)}
                            disabled={!selectedDate}
                          >
                            {selectedDate ? `Book for ${format(selectedDate, 'MMM d, yyyy')}` : 'Select a date'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-cobalt-100">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.author}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500' : 'fill-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">"{testimonial.content}"</p>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
