
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserRole, USER_ROLE_LABELS } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, MapPin, Briefcase, User, Mail, Award, Shield, Trophy, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  
  // Form state (in a real app, would be initialized with user data)
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    bio: "Passionate startup founder focused on educational technology. Looking for mentors and potential investors for my seed round.",
    location: "San Francisco, CA",
    expertise: ["Product Management", "UX Design", "EdTech"],
    experienceYears: "5",
    milestones: [
      { title: "Founding Member", type: "founder", icon: <Trophy className="h-3 w-3 mr-1" /> },
      { title: "50+ Connections", type: "milestone", icon: <Star className="h-3 w-3 mr-1" /> },
      { title: "Verified Profile", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> },
      { title: "1 Year Member", type: "achievement", icon: <Clock className="h-3 w-3 mr-1" /> },
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const userConnections = user?.connections || 0;

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle expertise changes (comma separated input)
  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expertiseArray = e.target.value.split(',').map(item => item.trim());
    setFormData((prev) => ({ ...prev, expertise: expertiseArray }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    toast({
      title: "Success",
      description: "Profile updated successfully"
    });
    setIsEditing(false);
  };

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-main">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm border border-border gradient-border"
          >
            <h1 className="text-2xl font-medium mb-4 gradient-text">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              Please log in or sign up to access your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild variant="outline" className="border-highlight text-highlight hover:bg-highlight/10">
                <Link to="/auth?signup=true">Sign Up</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-primary py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop"}
                    alt={user.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                    <Edit className="h-4 w-4 text-highlight" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-display font-medium mb-1 text-white">
                    {user.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                      {USER_ROLE_LABELS[user.role]}
                    </span>
                    <span className="text-white/80 text-sm flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {formData.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing 
                    ? "bg-white text-highlight hover:bg-white/90" 
                    : "bg-white text-highlight hover:bg-white/90"
                  }
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-main">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Tabs */}
            <div className="mb-8 border-b border-border">
              <div className="flex space-x-8">
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'text-highlight border-b-2 border-highlight'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'text-highlight border-b-2 border-highlight'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  Account Settings
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main profile content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-white p-6 rounded-xl border border-border shadow-sm gradient-border">
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expertise (comma separated)
                          </label>
                          <input
                            type="text"
                            name="expertise"
                            value={formData.expertise.join(', ')}
                            onChange={handleExpertiseChange}
                            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Years of Experience
                          </label>
                          <input
                            type="text"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            type="submit"
                            className="bg-gradient-primary hover:opacity-90"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <h3 className="text-lg font-medium mb-4 gradient-text">About</h3>
                        <p className="text-muted-foreground mb-6">
                          {formData.bio}
                        </p>

                        {/* Milestone Badges */}
                        <h3 className="text-lg font-medium mb-2 gradient-text">Achievements & Milestones</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {formData.milestones.map((milestone, index) => (
                            <Badge key={index} variant={milestone.type as any} className="flex items-center px-3 py-1">
                              {milestone.icon}
                              {milestone.title}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-lg font-medium mb-2 gradient-text">Expertise</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {formData.expertise.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-highlight/10 text-highlight rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2 gradient-text">Details</h3>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="w-32 text-sm text-muted-foreground flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-secondary" /> Location
                                </span>
                                <span className="text-sm">{formData.location}</span>
                              </div>
                              <div className="flex items-start">
                                <span className="w-32 text-sm text-muted-foreground flex items-center">
                                  <Briefcase className="h-4 w-4 mr-2 text-secondary" /> Experience
                                </span>
                                <span className="text-sm">{formData.experienceYears} years</span>
                              </div>
                              <div className="flex items-start">
                                <span className="w-32 text-sm text-muted-foreground flex items-center">
                                  <User className="h-4 w-4 mr-2 text-secondary" /> Role
                                </span>
                                <span className="text-sm">{USER_ROLE_LABELS[user.role]}</span>
                              </div>
                              <div className="flex items-start">
                                <span className="w-32 text-sm text-muted-foreground flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-secondary" /> Contact
                                </span>
                                <span className="text-sm">{user.email}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2 gradient-text">Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gradient-to-r from-highlight/5 to-transparent p-3 rounded-lg">
                                <div className="text-lg font-bold text-highlight">{userConnections}</div>
                                <div className="text-xs text-muted-foreground">Connections</div>
                              </div>
                              <div className="bg-gradient-to-r from-secondary/5 to-transparent p-3 rounded-lg">
                                <div className="text-lg font-bold text-secondary">12</div>
                                <div className="text-xs text-muted-foreground">Messages</div>
                              </div>
                              <div className="bg-gradient-to-r from-purple-100 to-transparent p-3 rounded-lg">
                                <div className="text-lg font-bold text-purple-600">8</div>
                                <div className="text-xs text-muted-foreground">Projects</div>
                              </div>
                              <div className="bg-gradient-to-r from-amber-100 to-transparent p-3 rounded-lg">
                                <div className="text-lg font-bold text-amber-600">92%</div>
                                <div className="text-xs text-muted-foreground">Completion</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-1 space-y-6"
                >
                  {/* Connection stats */}
                  <div className="bg-white p-6 rounded-xl border border-border shadow-sm gradient-border">
                    <h3 className="text-lg font-medium mb-4 gradient-text">Your Network</h3>
                    <div className="text-center py-4">
                      <div className="text-4xl font-semibold text-highlight mb-1">{userConnections}</div>
                      <div className="text-sm text-muted-foreground">Connections</div>
                    </div>
                    <Button className="w-full mt-2 bg-gradient-primary hover:opacity-90">
                      <Link to="/search">Find More Connections</Link>
                    </Button>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white p-6 rounded-xl border border-border shadow-sm gradient-border">
                    <h3 className="text-lg font-medium mb-4 gradient-text">Growth Opportunities</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-highlight/5 rounded-lg hover:bg-highlight/10 transition-colors cursor-pointer">
                        <div className="font-medium text-sm mb-1 text-highlight">Complete Your Profile</div>
                        <div className="text-xs text-muted-foreground">Add more details about your experience</div>
                      </div>
                      <div className="p-3 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="font-medium text-sm mb-1 text-secondary">Join Community Discussions</div>
                        <div className="text-xs text-muted-foreground">Engage with other members</div>
                      </div>
                      <div className="p-3 bg-accent-secondary/5 rounded-lg hover:bg-accent-secondary/10 transition-colors cursor-pointer">
                        <div className="font-medium text-sm mb-1 text-accent-secondary">Share Your Knowledge</div>
                        <div className="text-xs text-muted-foreground">Post articles or advice</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Button className="text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 py-1 h-auto">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Email Notifications</div>
                        <div className="text-xs text-muted-foreground">Receive updates via email</div>
                      </div>
                      <div className="w-10 h-5 bg-pink-600 rounded-full relative">
                        <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transform translate-x-4"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Connection Requests</div>
                        <div className="text-xs text-muted-foreground">Notifications for new connections</div>
                      </div>
                      <div className="w-10 h-5 bg-pink-600 rounded-full relative">
                        <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transform translate-x-4"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Community Activity</div>
                        <div className="text-xs text-muted-foreground">Updates from community posts</div>
                      </div>
                      <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                        <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <div className="font-medium text-sm">Deactivate Account</div>
                        <div className="text-xs text-muted-foreground">Temporarily disable your account</div>
                      </div>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Deactivate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <div className="font-medium text-sm">Delete Account</div>
                        <div className="text-xs text-muted-foreground">Permanently remove your account and data</div>
                      </div>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Delete
                      </Button>
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
