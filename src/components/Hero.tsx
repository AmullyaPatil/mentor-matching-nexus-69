
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";

const roleItems = Object.values(UserRole).map((role) => ({
  role,
  label: USER_ROLE_LABELS[role],
}));

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHighlighted(true);
      
      // Reset highlight after animation completes
      setTimeout(() => setIsHighlighted(false), 1800);
      
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roleItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cobalt-500/20 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-100 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-navy-700 text-white/90 text-sm font-medium animate-fade-in">
            <span className="inline-block">Connect. Collaborate. Grow.</span>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight md:leading-tight lg:leading-tight mb-6 text-navy-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Fueling startup growth through meaningful connections
          </motion.h1>
          
          <motion.div 
            className="mt-4 mb-12 text-xl text-navy-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="mb-4">
              Find the perfect{" "}
              <span className="relative inline-block">
                <span 
                  className={`role-word ${isHighlighted ? 'highlight-text' : ''}`}
                  style={{ 
                    color: '#0047cc', 
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {roleItems[currentRoleIndex].label}
                </span>
              </span>{" "}
              to accelerate your startup journey.
            </p>
            <p>
              Join our community of founders, mentors, investors, and service providers.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[150px] bg-navy-800 text-white hover:bg-navy-900 gap-2">
              <Link to="/auth?signup=true">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[150px] border-navy-300 text-navy-800 hover:bg-navy-100">
              <Link to="/search">
                Explore Network
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="glass-card px-6 py-8 rounded-2xl bg-white shadow-md border border-navy-100">
            <div className="text-3xl font-display font-semibold mb-2 text-navy-800">500+</div>
            <div className="text-sm text-navy-600">Active Mentors</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl bg-white shadow-md border border-navy-100">
            <div className="text-3xl font-display font-semibold mb-2 text-navy-800">200+</div>
            <div className="text-sm text-navy-600">Investors</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl bg-white shadow-md border border-navy-100">
            <div className="text-3xl font-display font-semibold mb-2 text-navy-800">1,000+</div>
            <div className="text-sm text-navy-600">Growing Startups</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl bg-white shadow-md border border-navy-100">
            <div className="text-3xl font-display font-semibold mb-2 text-navy-800">$50M+</div>
            <div className="text-sm text-navy-600">Funding Raised</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
