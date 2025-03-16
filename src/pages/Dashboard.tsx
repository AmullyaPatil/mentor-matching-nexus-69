
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ProfileCard from "@/components/ProfileCard";
import Post from "@/components/Post";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const connectionsData = [
  { name: "Jan", connections: 4 },
  { name: "Feb", connections: 7 },
  { name: "Mar", connections: 12 },
  { name: "Apr", connections: 15 },
  { name: "May", connections: 18 },
  { name: "Jun", connections: 24 }
];

const activitiesData = [
  { date: "Mon", posts: 2, comments: 5, likes: 8 },
  { date: "Tue", posts: 1, comments: 3, likes: 6 },
  { date: "Wed", posts: 3, comments: 7, likes: 12 },
  { date: "Thu", posts: 0, comments: 4, likes: 9 },
  { date: "Fri", posts: 2, comments: 6, likes: 14 },
  { date: "Sat", posts: 1, comments: 2, likes: 7 },
  { date: "Sun", posts: 0, comments: 1, likes: 4 }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'connections' | 'activities'>('overview');

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
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
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

  const userConnections = user.connections || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-display font-medium mb-2">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {user.name}! Here's what's happening with your network.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline">
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
                    activeTab === 'overview'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'connections'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('connections')}
                >
                  Connections
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'activities'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('activities')}
                >
                  Activities
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Total Connections</div>
                    <div className="text-3xl font-semibold">{userConnections}</div>
                    <div className="mt-2 text-xs text-green-600">↑ 12% from last month</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Profile Views</div>
                    <div className="text-3xl font-semibold">168</div>
                    <div className="mt-2 text-xs text-green-600">↑ 8% from last month</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Activity Score</div>
                    <div className="text-3xl font-semibold">72</div>
                    <div className="mt-2 text-xs text-red-600">↓ 3% from last month</div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Connection Growth</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={connectionsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="connections" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent activity and suggestions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent activity */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {MOCK_POSTS.slice(0, 2).map((post) => (
                        <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </div>
                          <div className="text-xs text-indigo-600 mt-2">
                            {post.likes} likes • {post.comments} comments
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link to="/community" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View all activity →
                      </Link>
                    </div>
                  </div>

                  {/* Connection suggestions */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Suggested Connections</h3>
                    <div className="space-y-4">
                      {MOCK_USERS.slice(0, 3).map((suggestedUser) => (
                        <div key={suggestedUser.id} className="flex items-center">
                          <img
                            src={suggestedUser.avatar}
                            alt={suggestedUser.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div className="flex-grow">
                            <div className="font-medium">{suggestedUser.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {suggestedUser.role} • {suggestedUser.location}
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="h-8 text-xs">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link to="/search" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        Find more connections →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-medium">Your Network</h2>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Link to="/search">Find More Connections</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_USERS.slice(0, 6).map((connectionUser) => (
                    <ProfileCard
                      key={connectionUser.id}
                      id={connectionUser.id}
                      name={connectionUser.name}
                      role={connectionUser.role}
                      avatar={connectionUser.avatar}
                      bio={connectionUser.bio}
                      expertise={connectionUser.expertise}
                      location={connectionUser.location}
                      connections={connectionUser.connections}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div>
                <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Weekly Activity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activitiesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                        <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                        <Bar dataKey="likes" fill="#ffc658" name="Likes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">Your Recent Posts</h3>
                <div className="space-y-6">
                  {MOCK_POSTS.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
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
