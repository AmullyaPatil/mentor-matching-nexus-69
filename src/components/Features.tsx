
import { motion } from "framer-motion";
import { 
  Search, 
  UserCircle, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Briefcase 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "Our intelligent algorithm connects you with the perfect mentors, co-founders, or investors based on your specific needs and goals."
  },
  {
    icon: UserCircle,
    title: "Role-Based Profiles",
    description: "Whether you're a mentor, mentee, investor, service provider, or co-founder, customize your profile to showcase your unique value."
  },
  {
    icon: MessageSquare,
    title: "Community Hub",
    description: "Engage with a vibrant community of startup enthusiasts through discussions, questions, and shared knowledge."
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Track your progress, measure your impact, and visualize your network growth with comprehensive analytics."
  },
  {
    icon: Users,
    title: "Curated Connections",
    description: "Connect with pre-vetted professionals who have demonstrated expertise in your specific industry or technology."
  },
  {
    icon: Briefcase,
    title: "Resource Marketplace",
    description: "Access exclusive tools, templates, and resources to accelerate your startup journey."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Designed to accelerate your startup journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform provides all the tools and connections you need to take your
            startup to the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
