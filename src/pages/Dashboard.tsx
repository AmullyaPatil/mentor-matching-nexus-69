
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
import ConnectionInterface from "@/components/ConnectionInterface";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'connections'>('dashboard');

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
              <Button asChild className="bg-primary hover:bg-primary/90">
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
      // For other roles, we could create specific dashboards
      // or fall back to a default one
      default:
        return <MenteeDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-primary py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-display font-medium mb-2 text-white">
                  Dashboard
                </h1>
                <p className="text-white/80">
                  Welcome back, {user.name}! Here's what's happening with your {user.role}.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-primary hover:bg-white/90">
                  <Link to="/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20">
                  <Link to="/search">Find Connections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
              <div className="flex space-x-8">
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'connections'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('connections')}
                >
                  Connection Hub
                </button>
              </div>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                {renderRoleDashboard()}
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <h3 className="text-lg font-medium mb-4">Your Connections</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                      <Link to="/search" className="text-sm text-primary hover:text-primary/90 font-medium">
                        Find more connections →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <ConnectionInterface />
                  
                  <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
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
                          <Button className="bg-primary hover:bg-primary/90">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
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
