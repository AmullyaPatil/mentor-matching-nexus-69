
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roleItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary text-foreground/80 text-sm font-medium animate-fade-in">
            <span className="inline-block">Connect. Collaborate. Grow.</span>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight md:leading-tight lg:leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Fueling startup growth through meaningful connections
          </motion.h1>
          
          <motion.div 
            className="mt-4 mb-12 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="mb-4">
              Find the perfect{" "}
              <span className="relative inline-block">
                <span className="absolute top-0 left-0 overflow-hidden truncate whitespace-nowrap transition-all duration-500" style={{ width: "100%" }}>
                  {roleItems[currentRoleIndex].label}
                </span>
                <span className="invisible">{roleItems[currentRoleIndex].label}</span>
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
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[150px] bg-black text-white hover:bg-black/90 gap-2">
              <Link to="/auth?signup=true">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[150px]">
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
          <div className="glass-card px-6 py-8 rounded-2xl">
            <div className="text-3xl font-display font-semibold mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Active Mentors</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl">
            <div className="text-3xl font-display font-semibold mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Investors</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl">
            <div className="text-3xl font-display font-semibold mb-2">1,000+</div>
            <div className="text-sm text-muted-foreground">Growing Startups</div>
          </div>
          <div className="glass-card px-6 py-8 rounded-2xl">
            <div className="text-3xl font-display font-semibold mb-2">$50M+</div>
            <div className="text-sm text-muted-foreground">Funding Raised</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
