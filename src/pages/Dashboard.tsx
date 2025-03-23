
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserRole } from "@/lib/constants";
import MenteeDashboard from "@/components/dashboards/MenteeDashboard";
import MentorDashboard from "@/components/dashboards/MentorDashboard";
import InvestorDashboard from "@/components/dashboards/InvestorDashboard";
import ServiceProviderDashboard from "@/components/dashboards/ServiceProviderDashboard";
import CofounderDashboard from "@/components/dashboards/CofounderDashboard";
import { 
  BarChart2, 
  Clock, 
  Bell, 
  MessageSquare, 
  Users, 
  Calendar, 
  BookOpen,
  Briefcase,
  Award
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'connections' | 'history' | 'notifications' | 'resources'>('dashboard');

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-medium mb-4">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              Please log in or sign up to access your dashboard
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/auth?signup=true">Sign Up</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Determine which dashboard to show based on user role
  const renderRoleDashboard = () => {
    switch (user.role) {
      case UserRole.MENTEE:
        return <MenteeDashboard user={user} />;
      case UserRole.MENTOR:
        return <MentorDashboard user={user} />;
      case UserRole.INVESTOR:
        return <InvestorDashboard user={user} />;
      case UserRole.SERVICE_PROVIDER:
        return <ServiceProviderDashboard user={user} />;
      case UserRole.COFOUNDER:
        return <CofounderDashboard user={user} />;
      default:
        return <MenteeDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-8">
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-display font-medium mb-2 text-white">
                  Welcome, {user.name}!
                </h1>
                <p className="text-white/80">
                  Your {user.role} dashboard - everything you need in one place
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-teal-700 hover:bg-white/90">
                  <Link to="/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20">
                  <Link to="/search">Find Connections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Menu Tabs */}
            <div className="mb-6 bg-white rounded-xl shadow-sm px-4 sm:px-6 py-2 border border-gray-200 flex items-center overflow-x-auto">
              <button
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart2 className="h-4 w-4" />
                Dashboard
              </button>
              <button
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'connections'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('connections')}
              >
                <Users className="h-4 w-4" />
                Connections
              </button>
              <button
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'history'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('history')}
              >
                <Clock className="h-4 w-4" />
                Activity
              </button>
              <button
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-4 w-4" />
                Notifications
                <span className="bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                <BookOpen className="h-4 w-4" />
                Resources
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.connections || 0}</div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Messages</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Meetings</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.role === UserRole.MENTOR ? "4.9" : "85%"}</div>
                  <div className="text-xs text-muted-foreground">{user.role === UserRole.MENTOR ? "Rating" : "Completion"}</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.role === UserRole.INVESTOR ? "$2.1M" : "8"}</div>
                  <div className="text-xs text-muted-foreground">{user.role === UserRole.INVESTOR ? "Invested" : "Projects"}</div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="overflow-hidden">
                {renderRoleDashboard()}
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <h3 className="text-lg font-medium mb-4 text-teal-900">Your Connections</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg hover:bg-teal-50 cursor-pointer">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 1}.jpg`} 
                            alt="User" 
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <div className="font-medium">Connection {i + 1}</div>
                            <div className="text-xs text-muted-foreground">Last active: 2h ago</div>
                          </div>
                          <div className="ml-auto flex">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link to="/search" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                        Find more connections →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <h3 className="text-lg font-medium mb-4 text-teal-900">Connection Requests</h3>
                    <div className="space-y-4">
                      {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                            alt="User" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <div className="font-medium">User {i + 1}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {i === 0 ? 'Looking to connect about AI development opportunities' : 
                               i === 1 ? 'Interested in discussing potential partnership' :
                               'Would like to schedule a mentorship session'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Decline
                            </Button>
                            <Button className="bg-teal-600 hover:bg-teal-700 h-8">
                              Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4 text-teal-900">Upcoming Sessions</h3>
                    <div className="space-y-4">
                      {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                            alt="User" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <div className="font-medium">Session with User {i + 1}</div>
                            <div className="text-sm text-muted-foreground">
                              {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Friday'}, {1 + i}:00 PM • 45 min
                            </div>
                          </div>
                          <Button className="bg-teal-600 hover:bg-teal-700">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-teal-900">Recent Activity</h3>
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="border-l-2 border-teal-500 pl-4 py-2">
                        <div className="flex items-center">
                          <div className="font-medium">{
                            i === 0 ? "Session completed with Jane Smith" :
                            i === 1 ? "New connection request from Alex Morgan" :
                            i === 2 ? "Shared a resource: 'Startup Funding Guide'" :
                            i === 3 ? "Updated your profile information" :
                            "Commented on a community post"
                          }</div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            {i === 0 ? "2 hours ago" :
                             i === 1 ? "Yesterday" :
                             i === 2 ? "2 days ago" :
                             i === 3 ? "3 days ago" :
                             "1 week ago"
                            }
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {i === 0 ? "45-minute mentor session discussing career growth strategies" :
                           i === 1 ? "Alex wants to connect with you about investment opportunities" :
                           i === 2 ? "You shared a PDF guide on securing early-stage funding" :
                           i === 3 ? "Updated your skills, experience and portfolio information" :
                           "You commented on 'How to find the right technical co-founder'"
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-teal-900">Notifications</h3>
                    <Button variant="outline" size="sm">Mark all as read</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-teal-600 mr-2" />
                        <div className="font-medium">New Connection Request</div>
                        <div className="ml-auto text-xs text-muted-foreground">10 min ago</div>
                      </div>
                      <p className="text-sm mt-1">Sarah Wilson wants to connect with you</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">View Profile</Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 h-8">Accept</Button>
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-teal-600 mr-2" />
                        <div className="font-medium">New Message</div>
                        <div className="ml-auto text-xs text-muted-foreground">1 hour ago</div>
                      </div>
                      <p className="text-sm mt-1">David Chen: "Thanks for the advice yesterday, it was really helpful!"</p>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="h-8">Reply</Button>
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                        <div className="font-medium">Upcoming Meeting</div>
                        <div className="ml-auto text-xs text-muted-foreground">2 hours ago</div>
                      </div>
                      <p className="text-sm mt-1">Reminder: You have a meeting with Emily Johnson tomorrow at 2:00 PM</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">Reschedule</Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 h-8">Confirm</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="font-medium">New Achievement</div>
                        <div className="ml-auto text-xs text-muted-foreground">2 days ago</div>
                      </div>
                      <p className="text-sm mt-1">You've reached the milestone of 10 successful connections!</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="font-medium">New Resource Available</div>
                        <div className="ml-auto text-xs text-muted-foreground">3 days ago</div>
                      </div>
                      <p className="text-sm mt-1">New article: "10 Tips for Effective Mentorship" has been published</p>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="h-8">Read Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-teal-900">Learning Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="font-medium">{
                          i === 0 ? "Building Your Mentor Network" :
                          i === 1 ? "Effective Pitching Strategies" :
                          i === 2 ? "Finding the Right Co-Founder" :
                          i === 3 ? "Startup Financial Planning" :
                          i === 4 ? "Product Market Fit Guide" :
                          "Scaling Your Business"
                        }</div>
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {i === 0 ? "Learn how to build and nurture meaningful relationships with mentors in your industry." :
                           i === 1 ? "Master the art of pitching your ideas to investors, partners, and customers." :
                           i === 2 ? "Tips and strategies for finding a compatible co-founder who complements your skills." :
                           i === 3 ? "Essential financial planning techniques for early-stage startups." :
                           i === 4 ? "How to identify, test, and validate product market fit for your startup." :
                           "Strategies for scaling your business while maintaining quality and culture."
                          }
                        </div>
                        <div className="mt-3 flex">
                          <div className="text-xs text-teal-600 mr-2">{Math.floor(Math.random() * 8) + 3} min read</div>
                          <div className="text-xs text-muted-foreground">{Math.floor(Math.random() * 600) + 100} reads</div>
                        </div>
                        <div className="mt-3">
                          <Button variant="outline" size="sm" className="w-full">Read Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link to="/knowledge-hub" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Browse all resources →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
