
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USERS } from "@/lib/constants";
import ProfileCard from "@/components/ProfileCard";
import { UserRole, USER_ROLE_LABELS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Filter, X, Search as SearchIcon } from "lucide-react";

// Expertise options
const expertiseOptions = [
  "Product Strategy", "Growth", "Fundraising", "Marketing", "Sales", 
  "Technology", "UX/UI Design", "Legal", "Finance", "Operations", 
  "HR", "Machine Learning", "Blockchain", "Web3", "Mobile Development", 
  "E-commerce", "SaaS", "Fintech", "Healthtech", "Edtech", "AI"
];

// Industry options
const industryOptions = [
  "Technology", "Healthcare", "Finance", "Education", "Retail", 
  "Manufacturing", "Entertainment", "Real Estate", "Transportation", 
  "Energy", "Agriculture", "Telecommunications"
];

// Experience level options
const experienceLevels = [
  "0-2 years", "3-5 years", "6-10 years", "10+ years"
];

// Location options
const locationOptions = [
  "San Francisco", "New York", "London", "Berlin", "Singapore", 
  "Tokyo", "Sydney", "Toronto", "Remote"
];

export default function Search() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Load wishlisted items from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlisted(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlisted items to localStorage when changed
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlisted));
  }, [wishlisted]);

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add profiles to your wishlist",
        variant: "destructive"
      });
      return;
    }

    setWishlisted(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });

    toast({
      title: wishlisted.includes(id) ? "Removed from Wishlist" : "Added to Wishlist",
      description: wishlisted.includes(id) 
        ? "Profile has been removed from your wishlist" 
        : "Profile has been added to your wishlist"
    });
  };

  // Helper function to add/remove filter
  const toggleFilter = (value: string, currentFilters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(item => item !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  // Helper function to handle role toggle
  const toggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Filter users based on all filters
  const filteredUsers = MOCK_USERS.filter((user) => {
    // Search by name, bio, or expertise
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.expertise && user.expertise.some(exp => 
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    // Filter by role
    const matchesRole = selectedRoles.length === 0 || 
      selectedRoles.includes(user.role);
    
    // Filter by expertise
    const matchesExpertise = selectedExpertise.length === 0 || 
      (user.expertise && user.expertise.some(exp => 
        selectedExpertise.includes(exp)
      ));
    
    // Filter by industry
    const matchesIndustry = selectedIndustries.length === 0 ||
      (user.industry && selectedIndustries.includes(user.industry));
      
    // Filter by experience
    const matchesExperience = selectedExperience === "" ||
      (user.experience && user.experience === selectedExperience);
      
    // Filter by location
    const matchesLocation = selectedLocation === "" ||
      (user.location && user.location === selectedLocation);

    return matchesSearch && matchesRole && matchesExpertise && 
           matchesIndustry && matchesExperience && matchesLocation;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedRoles([]);
    setSelectedExpertise([]);
    setSelectedIndustries([]);
    setSelectedExperience("");
    setSelectedLocation("");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedExpertise.length > 0 || 
                          selectedIndustries.length > 0 || selectedExperience !== "" || 
                          selectedLocation !== "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-teal-600 py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 text-white">
                Find Your Perfect Connection
              </h1>
              <p className="text-lg text-white/80">
                Search our network of mentors, investors, founders, and service providers
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-4"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name, expertise, or keywords..."
                  className="w-full h-14 px-6 py-4 border-0 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-3">
                  <Button 
                    className="rounded-full bg-teal-700 hover:bg-teal-800 text-white p-2"
                    size="icon"
                    aria-label="Search"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full bg-white text-teal-600 border-teal-200"
              >
                <Filter className="h-5 w-5 mr-1" />
                Filters {hasActiveFilters && `(${selectedRoles.length + selectedExpertise.length + selectedIndustries.length + (selectedExperience ? 1 : 0) + (selectedLocation ? 1 : 0)})`}
              </Button>
            </motion.div>

            {/* Horizontal filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto mb-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-lg">Filters</h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Role filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-gray-700">Role</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(UserRole).map(role => (
                        <Badge
                          key={role}
                          variant={selectedRoles.includes(role) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedRoles.includes(role) 
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200" 
                              : "bg-white hover:bg-gray-100 text-gray-800"
                          }`}
                          onClick={() => toggleRole(role)}
                        >
                          {USER_ROLE_LABELS[role]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Expertise filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-gray-700">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => toggleFilter(value, selectedExpertise, setSelectedExpertise)}
                      >
                        <SelectTrigger className="w-[200px] border-teal-200 focus:ring-teal-400 h-9">
                          <SelectValue placeholder="Select expertise" />
                        </SelectTrigger>
                        <SelectContent>
                          {expertiseOptions.map(option => (
                            <SelectItem 
                              key={option} 
                              value={option}
                              className={selectedExpertise.includes(option) ? "bg-teal-50 text-teal-700" : ""}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedExpertise.map(expertise => (
                        <Badge
                          key={expertise}
                          variant="default"
                          className="bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200"
                        >
                          {expertise}
                          <button 
                            className="ml-1 hover:text-teal-600" 
                            onClick={() => toggleFilter(expertise, selectedExpertise, setSelectedExpertise)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Industry filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-gray-700">Industry</h4>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => toggleFilter(value, selectedIndustries, setSelectedIndustries)}
                      >
                        <SelectTrigger className="w-[200px] border-teal-200 focus:ring-teal-400 h-9">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map(option => (
                            <SelectItem 
                              key={option} 
                              value={option}
                              className={selectedIndustries.includes(option) ? "bg-teal-50 text-teal-700" : ""}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedIndustries.map(industry => (
                        <Badge
                          key={industry}
                          variant="default"
                          className="bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200"
                        >
                          {industry}
                          <button 
                            className="ml-1 hover:text-teal-600" 
                            onClick={() => toggleFilter(industry, selectedIndustries, setSelectedIndustries)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience and Location on same row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-gray-700">Experience</h4>
                      <Select
                        value={selectedExperience}
                        onValueChange={setSelectedExperience}
                      >
                        <SelectTrigger className="w-full border-teal-200 focus:ring-teal-400">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any experience</SelectItem>
                          {experienceLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Location filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-gray-700">Location</h4>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger className="w-full border-teal-200 focus:ring-teal-400">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any location</SelectItem>
                          {locationOptions.map(location => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'Result' : 'Results'}
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-muted-foreground">Sort by:</label>
                <select
                  id="sort"
                  className="text-sm border border-gray-200 rounded-md p-1 bg-white"
                  defaultValue="relevance"
                >
                  <option value="relevance">Relevance</option>
                  <option value="recent">Recently Active</option>
                  <option value="connections">Most Connections</option>
                </select>
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredUsers.map((user) => (
                  <motion.div key={user.id} variants={itemVariants}>
                    <ProfileCard
                      id={user.id}
                      name={user.name}
                      role={user.role}
                      avatar={user.avatar}
                      bio={user.bio}
                      expertise={user.expertise}
                      location={user.location}
                      connections={user.connections}
                      industry={user.industry}
                      experience={user.experience}
                      rating={user.rating}
                      isWishlisted={wishlisted.includes(user.id)}
                      onWishlistToggle={() => toggleWishlist(user.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No matches found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
