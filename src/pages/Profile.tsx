
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserRole, USER_ROLE_LABELS } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, MapPin, Briefcase, User, Mail, Globe, Share2 } from "lucide-react";

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
    linkedin: "linkedin.com/in/username",
    twitter: "twitter.com/username",
    website: "mywebsite.com"
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
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2 gradient-text">Social</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                </svg>
                                <a href="#" className="text-sm text-highlight hover:underline">{formData.linkedin}</a>
                              </div>
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                <a href="#" className="text-sm text-highlight hover:underline">{formData.twitter}</a>
                              </div>
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 text-secondary mr-2" />
                                <a href="#" className="text-sm text-highlight hover:underline">{formData.website}</a>
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

                  {/* Share profile */}
                  <div className="bg-white p-6 rounded-xl border border-border shadow-sm gradient-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium gradient-text">Share Profile</h3>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="p-2 rounded-full bg-highlight/10 text-highlight hover:bg-highlight/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2]/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                        <Mail className="h-5 w-5" />
                      </button>
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
