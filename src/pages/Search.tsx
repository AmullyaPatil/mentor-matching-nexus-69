
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USERS } from "@/lib/constants";
import ProfileCard from "@/components/ProfileCard";
import SearchFilters from "@/components/SearchFilters";
import { UserRole } from "@/lib/constants";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-to-b from-purple-50 to-white py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Find Your Perfect Connection
              </h1>
              <p className="text-lg text-muted-foreground">
                Search our network of mentors, investors, founders, and service providers
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, expertise, or keywords..."
                  className="w-full h-14 px-6 py-4 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <div className="lg:w-1/4">
                <SearchFilters 
                  selectedRoles={selectedRoles}
                  onRoleChange={setSelectedRoles}
                  selectedExpertise={selectedExpertise}
                  onExpertiseChange={setSelectedExpertise}
                  availableExpertise={allExpertise}
                />
              </div>
              
              {/* Results */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    {filteredUsers.length} {filteredUsers.length === 1 ? 'Result' : 'Results'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-muted-foreground">Sort by:</label>
                    <select
                      id="sort"
                      className="text-sm border border-gray-200 rounded-md p-1"
                      defaultValue="relevance"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="recent">Recently Active</option>
                      <option value="connections">Most Connections</option>
                    </select>
                  </div>
                </div>

                {filteredUsers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredUsers.map((user) => (
                      <ProfileCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        role={user.role}
                        avatar={user.avatar}
                        bio={user.bio}
                        expertise={user.expertise}
                        location={user.location}
                        connections={user.connections}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No matches found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search or filters to find what you're looking for
                    </p>
                  </div>
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
