
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USERS } from "@/lib/constants";
import ProfileCard from "@/components/ProfileCard";
import SearchFilters from "@/components/SearchFilters";
import { UserRole } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  // Filter users based on search and filters
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

    return matchesSearch && matchesRole && matchesExpertise;
  });

  // Get all unique expertise for filters
  const allExpertise = Array.from(
    new Set(
      MOCK_USERS.flatMap(user => user.expertise || [])
    )
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-primary py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
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
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, expertise, or keywords..."
                  className="w-full h-14 px-6 py-4 border-0 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-highlight/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-3 bg-gradient-primary hover:opacity-90 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-main">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/4"
              >
                <SearchFilters 
                  selectedRoles={selectedRoles}
                  onRoleChange={setSelectedRoles}
                  selectedExpertise={selectedExpertise}
                  onExpertiseChange={setSelectedExpertise}
                  availableExpertise={allExpertise}
                />
              </motion.div>
              
              {/* Results */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-medium gradient-text">
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
