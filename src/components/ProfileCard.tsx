
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { MapPin, Users, Briefcase, Building2, Star, Heart, MessageSquare, Calendar, Phone, Shield, Award, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileCardProps {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio: string;
  expertise?: string[];
  interests?: string[];
  location?: string;
  connections?: number;
  industry?: string;
  experience?: string;
  rating?: number;
  compact?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
  milestones?: {
    title: string;
    type: string;
    icon: React.ReactNode;
  }[];
}

export default function ProfileCard({
  id,
  name,
  role,
  avatar,
  bio,
  expertise,
  interests,
  location,
  connections,
  industry,
  experience,
  rating = 4.5, // Default rating to ensure all cards have ratings
  compact = false,
  isWishlisted = false,
  onWishlistToggle,
  milestones = []
}: ProfileCardProps) {
  const [showActions, setShowActions] = useState(false);
  const skills = expertise || interests || [];
  
  // Ensure rating is a number to avoid "toFixed is not a function" error
  const ratingValue = typeof rating === 'number' ? rating : 4.5;
  
  // Default milestones if none provided
  const displayMilestones = milestones.length > 0 ? milestones : [
    { title: "Active Member", type: "achievement", icon: <Star className="h-3 w-3 mr-1" /> },
    role === UserRole.MENTOR ? 
      { title: "Verified Mentor", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> } :
    role === UserRole.INVESTOR ? 
      { title: "Verified Investor", type: "founder", icon: <Trophy className="h-3 w-3 mr-1" /> } :
      { title: "Verified Profile", type: "verified", icon: <Shield className="h-3 w-3 mr-1" /> }
  ];
  
  if (compact) {
    return (
      <div className="p-4 rounded-xl border border-navy-100 bg-white hover:shadow-md transition-all duration-300 hover:border-cobalt-300 card-hover h-full flex space-x-4 relative">
        <Link to={`/profiles/${id}`} className="flex space-x-4 flex-1">
          <div className="flex-shrink-0">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover border-2 border-cobalt-200"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-base mb-1 text-navy-900">{name}</h3>
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200">
                {USER_ROLE_LABELS[role]}
              </Badge>
              
              {/* Show one milestone badge in compact view */}
              {displayMilestones.length > 0 && (
                <Badge variant={displayMilestones[0].type as any} className="text-xs ml-1 flex items-center">
                  {displayMilestones[0].icon}
                  {displayMilestones[0].title}
                </Badge>
              )}
            </div>
            <p className="text-sm text-navy-600 line-clamp-2">
              {bio}
            </p>
            
            {/* Rating with proper number check */}
            <div className="flex items-center mt-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  className={`h-3 w-3 ${index < Math.floor(ratingValue) ? "fill-yellow-500" : "fill-navy-200"}`} 
                />
              ))}
              <span className="ml-1 text-xs text-navy-600">
                {ratingValue.toFixed(1)}
              </span>
            </div>
          </div>
        </Link>
        
        {onWishlistToggle && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onWishlistToggle();
            }}
            className="absolute top-4 right-4 text-navy-400 hover:text-cobalt-500 focus:outline-none"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-cobalt-500 text-cobalt-500" : ""}`} />
          </button>
        )}
      </div>
    );
  }

  const handleMessageClick = () => {
    toast({
      title: "Message Sent",
      description: `Your message request has been sent to ${name}`
    });
    setShowActions(false);
  };

  const handleScheduleClick = () => {
    toast({
      title: "Scheduling Available",
      description: `You can now schedule a meeting with ${name}`
    });
    setShowActions(false);
  };

  const handleCallClick = () => {
    toast({
      title: "Call Request Sent",
      description: `Your call request has been sent to ${name}`
    });
    setShowActions(false);
  };

  return (
    <div className="rounded-xl border border-navy-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-cobalt-300 card-hover overflow-hidden h-full flex flex-col relative">
      {onWishlistToggle && (
        <button 
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 z-10 text-navy-400 hover:text-cobalt-500 focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-6 w-6 ${isWishlisted ? "fill-cobalt-500 text-cobalt-500" : ""}`} />
        </button>
      )}
      
      <div className="p-6">
        <Link to={`/profiles/${id}`} className="block">
          <div className="flex items-start mb-4">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover border-2 border-cobalt-200"
            />
            <div className="ml-4">
              <h3 className="font-display font-medium text-lg text-navy-900">{name}</h3>
              <Badge variant="secondary" className="mt-1 bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200">
                {USER_ROLE_LABELS[role]}
              </Badge>
              
              {/* Rating with proper number check */}
              <div className="flex items-center mt-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star 
                    key={index} 
                    className={`h-4 w-4 ${index < Math.floor(ratingValue) ? "fill-yellow-500" : "fill-navy-200"}`} 
                  />
                ))}
                <span className="ml-1 text-sm text-navy-600">
                  {ratingValue.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-navy-600 mb-4 line-clamp-3">{bio}</p>

          {/* Milestone Badges */}
          {displayMilestones.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {displayMilestones.map((milestone, index) => (
                  <Badge 
                    key={index} 
                    variant={milestone.type as any} 
                    className="flex items-center text-xs px-2 py-0.5"
                  >
                    {milestone.icon}
                    {milestone.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-cobalt-200 text-cobalt-700">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="border-cobalt-200 text-cobalt-700">+{skills.length - 3}</Badge>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-navy-600">
            {industry && (
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1 text-cobalt-600" />
                <span>{industry}</span>
              </div>
            )}
            
            {experience && (
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-cobalt-600" />
                <span>{experience}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-cobalt-600" />
                <span>{location}</span>
              </div>
            )}
            
            {connections && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-cobalt-600" />
                <span>{connections} connections</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="mt-auto p-4 pt-0">
        <div className="flex space-x-2">
          <Button 
            asChild 
            className="w-full bg-navy-700 hover:bg-navy-800 text-white"
          >
            <Link to={`/profiles/${id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
