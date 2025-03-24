
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
  Award,
  AlertCircle,
  CheckCircle2,
  User,
  FileText
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type DashboardTab = 'dashboard' | 'connections' | 'history' | 'notifications' | 'resources';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
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
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-1">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium mb-2 text-navy-900">Your Connections</h3>
                    <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center p-1.5 rounded-lg hover:bg-cobalt-50 cursor-pointer">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 1}.jpg`} 
                            alt="User" 
                            className="w-7 h-7 rounded-full mr-2 object-cover"
                          />
                          <div>
                            <div className="font-medium text-xs">Connection {i + 1}</div>
                            <div className="text-xs text-muted-foreground">Last active: 2h ago</div>
                          </div>
                          <div className="ml-auto flex">
                            <div className="h-2 w-2 rounded-full bg-cobalt-500"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link to="/search" className="text-xs text-cobalt-600 hover:text-cobalt-700 font-medium">
                        Find more connections →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-medium mb-2 text-navy-900">Connection Requests</h3>
                      <div className="space-y-2">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="p-2 bg-gray-50 rounded-lg flex items-center gap-2">
                            <img 
                              src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                              alt="User" 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-grow min-w-0">
                              <div className="font-medium text-xs">User {i + 1}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {i === 0 ? 'Looking to connect about AI development opportunities' : 
                                i === 1 ? 'Interested in discussing potential partnership' :
                                'Would like to schedule a mentorship session'}
                              </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <Button variant="outline" size="sm" className="h-6 text-xs px-2">
                                Decline
                              </Button>
                              <Button className="bg-cobalt-600 hover:bg-cobalt-700 h-6 text-xs px-2">
                                Accept
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-medium mb-2 text-navy-900">Upcoming Sessions</h3>
                      <div className="space-y-2">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="p-2 bg-gray-50 rounded-lg flex items-center gap-2">
                            <img 
                              src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 5}.jpg`} 
                              alt="User" 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-grow min-w-0">
                              <div className="font-medium text-xs">Session with User {i + 1}</div>
                              <div className="text-xs text-muted-foreground">
                                {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Friday'}, {1 + i}:00 PM
                              </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <Button variant="outline" size="sm" className="h-6 text-xs px-2">
                                Message
                              </Button>
                              <Button className="bg-cobalt-600 hover:bg-cobalt-700 h-6 text-xs px-2">
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

            {/* Activity Tab with enhanced visual design */}
            {activeTab === 'history' && (
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-navy-900 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-cobalt-600" />
                      Recent Activity
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs px-3 bg-white">
                        All
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs px-3">
                        Meetings
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs px-3">
                        Connections
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Today */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Today</div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-cobalt-50 to-white border border-cobalt-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-cobalt-100 text-cobalt-600 flex items-center justify-center mr-3">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">Session completed with Jane Smith</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span className="bg-cobalt-100 text-cobalt-600 rounded-full px-2 py-0.5 mr-2">Mentorship</span>
                                2 hours ago
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2">
                              <FileText className="h-4 w-4 mr-1" /> Notes
                            </Button>
                          </div>
                          <p className="text-sm text-navy-700 mt-2 ml-13">
                            45-minute mentor session discussing career growth strategies
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                              <Users className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">New connection request from Alex Morgan</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span className="bg-purple-100 text-purple-600 rounded-full px-2 py-0.5 mr-2">Network</span>
                                4 hours ago
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="h-8 text-xs">Decline</Button>
                              <Button size="sm" className="h-8 text-xs bg-cobalt-600">Accept</Button>
                            </div>
                          </div>
                          <p className="text-sm text-navy-700 mt-2 ml-13">
                            Alex wants to connect with you about investment opportunities
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Yesterday */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Yesterday</div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-white border border-amber-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">Shared a resource: 'Startup Funding Guide'</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5 mr-2">Resource</span>
                                Yesterday, 3:45 PM
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                              View
                            </Button>
                          </div>
                          <p className="text-sm text-navy-700 mt-2 ml-13">
                            You shared a PDF guide on securing early-stage funding
                          </p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                              <User className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">Updated your profile information</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 mr-2">Profile</span>
                                Yesterday, 10:30 AM
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2">
                              View Profile
                            </Button>
                          </div>
                          <p className="text-sm text-navy-700 mt-2 ml-13">
                            Updated your skills, experience and portfolio information
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Earlier */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Earlier</div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-50 to-white border border-red-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium text-navy-800">Commented on a community post</div>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center">
                              <span className="bg-red-100 text-red-600 rounded-full px-2 py-0.5 mr-2">Community</span>
                              1 week ago
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            View Thread
                          </Button>
                        </div>
                        <p className="text-sm text-navy-700 mt-2 ml-13">
                          You commented on 'How to find the right technical co-founder'
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-navy-900 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-cobalt-600" />
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs px-3 bg-white">
                          All
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs px-3">
                          Unread
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs px-3">
                          Important
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* New Notifications */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">New</div>
                      <div className="space-y-3">
                        {/* Connection Request */}
                        <div className="relative overflow-hidden rounded-xl group">
                          <div className="absolute left-0 top-0 w-1 h-full bg-cobalt-600"></div>
                          <div className="p-4 rounded-r-xl bg-gradient-to-r from-cobalt-50 to-white border border-l-0 border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cobalt-500 to-cobalt-700 text-white flex items-center justify-center mr-4">
                                <Users className="h-5 w-5" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <div className="font-medium text-navy-800">New Connection Request</div>
                                  <span className="ml-2 bg-cobalt-600 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                                </div>
                                <div className="text-sm text-navy-600 mt-1">Sarah Wilson wants to connect with you</div>
                                <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                              </div>
                              <div className="h-2 w-2 rounded-full bg-cobalt-600 mr-1"></div>
                            </div>
                            <div className="mt-3 pl-14 flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 text-xs px-3">View Profile</Button>
                              <Button size="sm" className="h-8 text-xs px-3 bg-cobalt-600 hover:bg-cobalt-700">Accept</Button>
                              <Button variant="outline" size="sm" className="h-8 text-xs px-3 text-red-600 border-red-200 hover:bg-red-50">Decline</Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* New Message */}
                        <div className="relative overflow-hidden rounded-xl group">
                          <div className="absolute left-0 top-0 w-1 h-full bg-blue-600"></div>
                          <div className="p-4 rounded-r-xl bg-gradient-to-r from-blue-50 to-white border border-l-0 border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center mr-4">
                                <MessageSquare className="h-5 w-5" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <div className="font-medium text-navy-800">New Message</div>
                                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                                </div>
                                <div className="text-sm text-navy-600 mt-1">David Chen: "Thanks for the advice yesterday!"</div>
                                <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                              </div>
                              <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
                            </div>
                            <div className="mt-3 pl-14">
                              <Button size="sm" className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700">Reply</Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Upcoming Meeting */}
                        <div className="relative overflow-hidden rounded-xl group">
                          <div className="absolute left-0 top-0 w-1 h-full bg-amber-600"></div>
                          <div className="p-4 rounded-r-xl bg-gradient-to-r from-amber-50 to-white border border-l-0 border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center mr-4">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <div className="font-medium text-navy-800">Upcoming Meeting</div>
                                  <span className="ml-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">Important</span>
                                </div>
                                <div className="text-sm text-navy-600 mt-1">Meeting with Emily Johnson tomorrow at 2:00 PM</div>
                                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                              </div>
                              <div className="h-2 w-2 rounded-full bg-amber-600 mr-1"></div>
                            </div>
                            <div className="mt-3 pl-14 flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 text-xs px-3">Reschedule</Button>
                              <Button size="sm" className="h-8 text-xs px-3 bg-cobalt-600 hover:bg-cobalt-700">Confirm</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Earlier Notifications */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Earlier</div>
                      <div className="space-y-3">
                        {/* Achievement */}
                        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 text-purple-700 flex items-center justify-center mr-4">
                              <Award className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">New Achievement</div>
                              <div className="text-sm text-navy-600 mt-1">You've reached 10 successful connections!</div>
                              <div className="text-xs text-muted-foreground mt-1">2 days ago</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* New Resource */}
                        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 text-amber-700 flex items-center justify-center mr-4">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-navy-800">New Resource Available</div>
                              <div className="text-sm text-navy-600 mt-1">"10 Tips for Effective Mentorship" published</div>
                              <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                          <div className="mt-3 pl-14">
                            <Button variant="outline" size="sm" className="h-8 text-xs px-3">Read Now</Button>
                          </div>
                        </div>
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
