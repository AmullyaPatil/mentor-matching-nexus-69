
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { MOCK_USERS } from "@/lib/constants";
import ProfileCard from "@/components/ProfileCard";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* Featured Profiles */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Connect with top professionals
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Join our diverse community of startup founders, mentors, investors, and service providers.
              </motion.p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {MOCK_USERS.slice(0, 3).map((user) => (
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
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Ready to accelerate your startup growth?
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Join our platform today and connect with the resources, mentors, and investors 
                you need to take your startup to the next level.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <a
                  href="/auth?signup=true"
                  className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white bg-black rounded-full hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200"
                >
                  Get Started For Free
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
