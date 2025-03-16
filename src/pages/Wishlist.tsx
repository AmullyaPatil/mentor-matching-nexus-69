
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";
import { MOCK_USERS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [wishlistedUsers, setWishlistedUsers] = useState<typeof MOCK_USERS>([]);

  // Load wishlisted items from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const wishlistIds = JSON.parse(storedWishlist);
      setWishlisted(wishlistIds);
      
      // Filter users to only those in wishlist
      const filteredUsers = MOCK_USERS.filter(user => wishlistIds.includes(user.id));
      setWishlistedUsers(filteredUsers);
    }
  }, []);

  // Toggle wishlist item
  const toggleWishlist = (id: string) => {
    const newWishlisted = wishlisted.filter(item => item !== id);
    setWishlisted(newWishlisted);
    localStorage.setItem("wishlist", JSON.stringify(newWishlisted));
    
    // Update filtered users
    setWishlistedUsers(prev => prev.filter(user => user.id !== id));
  };

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

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center p-8">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-medium mb-2">Please log in to view your wishlist</h1>
            <p className="text-muted-foreground">You need to be logged in to save and view profiles in your wishlist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-teal-600 py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-display font-medium mb-2 text-white">My Wishlist</h1>
              <p className="text-lg text-white/80">
                Profiles you've saved for future reference
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            {wishlistedUsers.length > 0 ? (
              <>
                <h2 className="text-xl font-medium mb-6">
                  {wishlistedUsers.length} Saved {wishlistedUsers.length === 1 ? 'Profile' : 'Profiles'}
                </h2>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {wishlistedUsers.map((user) => (
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
                        isWishlisted={true}
                        onWishlistToggle={() => toggleWishlist(user.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white shadow-sm">
                <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven't saved any profiles to your wishlist yet. Browse the community and click the heart icon to save profiles you're interested in.
                </p>
                <a href="/search" className="text-teal-600 hover:text-teal-700 font-medium">
                  Browse Profiles
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
