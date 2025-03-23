
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USERS } from "@/lib/constants";
import ProfileCard from "@/components/ProfileCard";
import { UserRole } from "@/lib/constants";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import SearchFilters from "@/components/SearchFilters";

// Expertise options
const expertiseOptions = [
  "Product Strategy", "Growth", "Fundraising", "Marketing", "Sales", 
  "Technology", "UX/UI Design", "Legal", "Finance", "Operations", 
  "HR", "Machine Learning", "Blockchain", "Web3", "Mobile Development", 
  "E-commerce", "SaaS", "Fintech", "Healthtech", "Edtech", "AI",
  "Data Science", "Cloud Computing", "IoT", "AR/VR", "Cybersecurity",
  "DevOps", "Project Management", "Business Development", "Content Strategy",
  "SEO", "Social Media", "PR", "Branding", "Customer Success"
];

// Industry options
const industryOptions = [
  "Technology", "Healthcare", "Finance", "Education", "Retail", 
  "Manufacturing", "Entertainment", "Real Estate", "Transportation", 
  "Energy", "Agriculture", "Telecommunications", "Food & Beverage",
  "Travel", "Hospitality", "Media", "Fashion", "Sports", "Gaming",
  "Construction", "Environmental", "Nonprofit", "Professional Services"
];

// Experience level options
const experienceLevels = [
  "0-2 years", "3-5 years", "6-10 years", "10+ years"
];

// Location options
const locationOptions = [
  "San Francisco", "New York", "London", "Berlin", "Singapore", 
  "Tokyo", "Sydney", "Toronto", "Remote", "Austin", "Boston",
  "Chicago", "Los Angeles", "Seattle", "Paris", "Amsterdam",
  "Bangalore", "Tel Aviv", "Shanghai", "Hong Kong", "Dubai",
  "Stockholm", "Helsinki", "Barcelona", "Madrid"
];

// Generate more mock data
const generateAdditionalProfiles = () => {
  const additionalProfiles = [];
  const roles = Object.values(UserRole);
  const names = [
    "Alex Morgan", "Jamie Taylor", "Casey Smith", "Jordan Lee", "Taylor Wilson",
    "Riley Johnson", "Avery Williams", "Quinn Harris", "Blake Davis", "Cameron Miller",
    "Dakota Brown", "Emerson Garcia", "Finley Robinson", "Harley Martinez", "Kendall Rodriguez",
    "Logan Thomas", "Morgan Anderson", "Parker White", "Reese Martin", "Sidney Thompson",
    "Skyler Walker", "Tyler Wright", "Adrian Scott", "Bailey Green", "Charlie King"
  ];
  
  for (let i = 0; i < 40; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const expertise = [];
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
      const exp = expertiseOptions[Math.floor(Math.random() * expertiseOptions.length)];
      if (!expertise.includes(exp)) expertise.push(exp);
    }
    
    const location = locationOptions[Math.floor(Math.random() * locationOptions.length)];
    const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    const industry = industryOptions[Math.floor(Math.random() * industryOptions.length)];
    
    additionalProfiles.push({
      id: `additional-${i}`,
      name: names[i % names.length] + ' ' + String.fromCharCode(65 + (i % 26)),
      role,
      avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${(i % 70) + 1}.jpg`,
      bio: `Experienced professional with a background in ${industry} and expertise in ${expertise.join(", ")}.`,
      expertise,
      location,
      experience,
      industry,
      connections: Math.floor(Math.random() * 500) + 50,
      rating: (Math.random() * 2 + 3).toFixed(1)
    });
  }
  
  return additionalProfiles;
};

export default function Search() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>("any-experience");
  const [selectedLocation, setSelectedLocation] = useState<string>("any-location");
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState([...MOCK_USERS, ...generateAdditionalProfiles()]);

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

  // Connect functionality
  const handleConnect = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to connect with other users",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent successfully"
    });
  };

  // Filter users based on all filters
  const filteredUsers = allUsers.filter((user) => {
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
      
    // Filter by experience - treat "any-experience" as no filter
    const matchesExperience = selectedExperience === "any-experience" ||
      (user.experience && user.experience === selectedExperience);
      
    // Filter by location - treat "any-location" as no filter
    const matchesLocation = selectedLocation === "any-location" ||
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

  return (
    <div className="min-h-screen flex flex-col bg-navy-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-navy-800 py-16">
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
              className="max-w-3xl mx-auto mb-6"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name, expertise, or keywords..."
                  className="w-full h-14 px-6 py-4 border-0 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-cobalt-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-3">
                  <Button 
                    className="rounded-full bg-navy-700 hover:bg-navy-900 text-white p-2"
                    size="icon"
                    aria-label="Search"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Horizontal filters below search bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-5xl mx-auto mb-8"
            >
              <SearchFilters
                selectedRoles={selectedRoles}
                onRoleChange={setSelectedRoles}
                selectedExpertise={selectedExpertise}
                onExpertiseChange={setSelectedExpertise}
                availableExpertise={expertiseOptions}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                selectedExperience={selectedExperience}
                onExperienceChange={setSelectedExperience}
                selectedIndustry={selectedIndustries}
                onIndustryChange={setSelectedIndustries}
                availableLocations={locationOptions}
                availableExperience={experienceLevels}
                availableIndustries={industryOptions}
              />
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-navy-900">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'Result' : 'Results'}
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-navy-600">Sort by:</label>
                <select
                  id="sort"
                  className="text-sm border border-navy-200 rounded-md p-1 bg-white text-navy-800"
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
                className="text-center py-12 border border-dashed border-navy-200 rounded-lg bg-white shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-navy-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium mb-2 text-navy-800">No matches found</h3>
                <p className="text-navy-600 max-w-md mx-auto">
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
