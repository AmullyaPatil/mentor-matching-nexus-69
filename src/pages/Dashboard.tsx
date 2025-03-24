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
  const [activeTab, setActiveTab<'dashboard' | 'connections' | 'history' | 'notifications' | 'resources'>('dashboard');

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
              <Button asChild className="bg-cobalt-600 hover:bg-cobalt-700">
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
        <section className="bg-gradient-to-r from-navy-700 to-cobalt-600 py-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-display font-medium mb-2 text-white">
                  Welcome, {user.name}!
                </h1>
                <p className="text-white/80 text-sm">
                  Your {user.role} dashboard - everything you need in one place
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-white text-navy-700 hover:bg-white/90 h-8 text-sm">
                  <Link to="/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20 h-8 text-sm">
                  <Link to="/search">Find Connections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Menu Tabs - More distinctive styles */}
            <div className="mb-4 bg-white rounded-xl shadow-sm px-2 sm:px-4 py-1 border border-gray-200 flex items-center overflow-x-auto">
              <button
                className={`px-3 py-2 whitespace-nowrap text-xs font-medium flex items-center gap-1 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-cobalt-600 text-white'
                    : 'text-gray-600 hover:text-cobalt-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart2 className="h-3 w-3" />
                Dashboard
              </button>
              <button
                className={`px-3 py-2 whitespace-nowrap text-xs font-medium flex items-center gap-1 rounded-lg transition-colors ${
                  activeTab === 'connections'
                    ? 'bg-cobalt-600 text-white'
                    : 'text-gray-600 hover:text-cobalt-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('connections')}
              >
                <Users className="h-3 w-3" />
                Connections
              </button>
              <button
                className={`px-3 py-2 whitespace-nowrap text-xs font-medium flex items-center gap-1 rounded-lg transition-colors ${
                  activeTab === 'history'
                    ? 'bg-cobalt-600 text-white'
                    : 'text-gray-600 hover:text-cobalt-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('history')}
              >
                <Clock className="h-3 w-3" />
                Activity
              </button>
              <button
                className={`px-3 py-2 whitespace-nowrap text-xs font-medium flex items-center gap-1 rounded-lg transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-cobalt-600 text-white'
                    : 'text-gray-600 hover:text-cobalt-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-3 w-3" />
                Notifications
                <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>
              <button
                className={`px-3 py-2 whitespace-nowrap text-xs font-medium flex items-center gap-1 rounded-lg transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-cobalt-600 text-white'
                    : 'text-gray-600 hover:text-cobalt-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                <BookOpen className="h-3 w-3" />
                Resources
              </button>
            </div>

            {/* Quick Stats - More compact */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="h-8 w-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center mb-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold">{user.connections || 0}</div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Messages</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Meetings</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="h-8 w-8 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center mb-1">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold">{user.role === UserRole.MENTOR ? "4.9" : "85%"}</div>
                  <div className="text-xs text-muted-foreground">{user.role === UserRole.MENTOR ? "Rating" : "Completion"}</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-1">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold">{user.role === UserRole.INVESTOR ? "$2.1M" : "8"}</div>
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

            {/* Connections Tab - Make more compact */}
            {activeTab === 'connections' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-md font-medium mb-3 text-navy-900">Your Connections</h3>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center p-2 rounded-lg hover:bg-cobalt-50 cursor-pointer">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 1}.jpg`} 
                            alt="User" 
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm">Connection {i + 1}</div>
                            <div className="text-xs text-muted-foreground">Last active: 2h ago</div>
                          </div>
                          <div className="ml-auto flex">
                            <div className="h-2 w-2 rounded-full bg-cobalt-500"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Link to="/search" className="text-xs text-cobalt-600 hover:text-cobalt-700 font-medium">
                        Find more connections →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-md font-medium mb-3 text-navy-900">Connection Requests</h3>
                      <div className="space-y-3">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                            <img 
                              src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                              alt="User" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-grow">
                              <div className="font-medium text-sm">User {i + 1}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {i === 0 ? 'Looking to connect about AI development opportunities' : 
                                i === 1 ? 'Interested in discussing potential partnership' :
                                'Would like to schedule a mentorship session'}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                Decline
                              </Button>
                              <Button className="bg-cobalt-600 hover:bg-cobalt-700 h-7 text-xs">
                                Accept
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-md font-medium mb-3 text-navy-900">Upcoming Sessions</h3>
                      <div className="space-y-3">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                            <img 
                              src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                              alt="User" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-grow">
                              <div className="font-medium text-sm">Session with User {i + 1}</div>
                              <div className="text-xs text-muted-foreground">
                                {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Friday'}, {1 + i}:00 PM
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                Message
                              </Button>
                              <Button className="bg-cobalt-600 hover:bg-cobalt-700 h-7 text-xs">
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History/Activity Tab with updated visual design */}
            {activeTab === 'history' && (
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 text-navy-900">Recent Activity</h3>
                  <div className="space-y-3">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                            ${i === 0 ? "bg-cobalt-100 text-cobalt-600" : 
                              i === 1 ? "bg-purple-100 text-purple-600" :
                              i === 2 ? "bg-amber-100 text-amber-600" :
                              i === 3 ? "bg-blue-100 text-blue-600" :
                              "bg-red-100 text-red-600"}`
                          }>
                            {i === 0 ? <Calendar className="h-4 w-4" /> :
                             i === 1 ? <Users className="h-4 w-4" /> :
                             i === 2 ? <BookOpen className="h-4 w-4" /> :
                             i === 3 ? <BarChart2 className="h-4 w-4" /> :
                             <MessageSquare className="h-4 w-4" />
                            }
                          </div>
                          <div>
                            <div className="font-medium text-sm">{
                              i === 0 ? "Session completed with Jane Smith" :
                              i === 1 ? "New connection request from Alex Morgan" :
                              i === 2 ? "Shared a resource: 'Startup Funding Guide'" :
                              i === 3 ? "Updated your profile information" :
                              "Commented on a community post"
                            }</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {i === 0 ? "2 hours ago" :
                               i === 1 ? "Yesterday" :
                               i === 2 ? "2 days ago" :
                               i === 3 ? "3 days ago" :
                               "1 week ago"
                              }
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 ml-11">
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

            {/* Notifications Tab with improved visuals */}
            {activeTab === 'notifications' && (
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-navy-900">Notifications</h3>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Mark all as read</Button>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-cobalt-50 p-3 rounded-lg border-l-3 border-cobalt-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-600 flex items-center justify-center mr-3">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">New Connection Request</div>
                          <div className="text-xs text-navy-600 mt-1">Sarah Wilson wants to connect with you</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">10 min ago</div>
                      </div>
                      <div className="mt-2 ml-11 flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">View Profile</Button>
                        <Button size="sm" className="bg-cobalt-600 hover:bg-cobalt-700 h-7 text-xs">Accept</Button>
                      </div>
                    </div>
                    
                    <div className="bg-cobalt-50 p-3 rounded-lg border-l-3 border-cobalt-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">New Message</div>
                          <div className="text-xs text-navy-600 mt-1">David Chen: "Thanks for the advice yesterday!"</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">1 hour ago</div>
                      </div>
                      <div className="mt-2 ml-11">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Reply</Button>
                      </div>
                    </div>
                    
                    <div className="bg-cobalt-50 p-3 rounded-lg border-l-3 border-cobalt-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Upcoming Meeting</div>
                          <div className="text-xs text-navy-600 mt-1">Meeting with Emily Johnson tomorrow at 2:00 PM</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">2 hours ago</div>
                      </div>
                      <div className="mt-2 ml-11 flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Reschedule</Button>
                        <Button size="sm" className="bg-cobalt-600 hover:bg-cobalt-700 h-7 text-xs">Confirm</Button>
                      </div>
                    </div>
                    
                    {/* Older notifications in gray */}
                    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-3">
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">New Achievement</div>
                          <div className="text-xs text-navy-600 mt-1">You've reached 10 successful connections!</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">2 days ago</div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">New Resource Available</div>
                          <div className="text-xs text-navy-600 mt-1">"10 Tips for Effective Mentorship" published</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">3 days ago</div>
                      </div>
                      <div className="mt-2 ml-11">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Read Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Resources Tab */}
            {activeTab === 'resources' && (
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 text-navy-900">Learning Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="font-medium text-sm">{
                          i === 0 ? "Building Your Mentor Network" :
                          i === 1 ? "Effective Pitching Strategies" :
                          i === 2 ? "Finding the Right Co-Founder" :
                          i === 3 ? "Startup Financial Planning" :
                          i === 4 ? "Product Market Fit Guide" :
                          "Scaling Your Business"
                        }</div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {i === 0 ? "Learn how to build and nurture meaningful relationships with mentors in your industry." :
                           i === 1 ? "Master the art of pitching your ideas to investors, partners, and customers." :
                           i === 2 ? "Tips and strategies for finding a compatible co-founder who complements your skills." :
                           i === 3 ? "Essential financial planning techniques for early-stage startups." :
                           i === 4 ? "How to identify, test, and validate product market fit for your startup." :
                           "Strategies for scaling your business while maintaining quality and culture."
                          }
                        </div>
                        <div className="mt-2 flex">
                          <div className="text-xs text-cobalt-600 mr-2">{Math.floor(Math.random() * 8) + 3} min read</div>
                          <div className="text-xs text-muted-foreground">{Math.floor(Math.random() * 600) + 100} reads</div>
                        </div>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="w-full h-7 text-xs">Read Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                    <Link to="/knowledge-hub" className="text-xs text-cobalt-600 hover:text-cobalt-700 font-medium">
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
