
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { MapPin, Users, Briefcase, Building2, Star, Heart } from "lucide-react";

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
  rating,
  compact = false,
  isWishlisted = false,
  onWishlistToggle
}: ProfileCardProps) {
  const skills = expertise || interests || [];
  
  if (compact) {
    return (
      <div className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300 hover:border-teal-300 card-hover h-full flex space-x-4 relative">
        <Link to={`/profiles/${id}`} className="flex space-x-4 flex-1">
          <div className="flex-shrink-0">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover border-2 border-teal-200"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-base mb-1">{name}</h3>
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 hover:bg-teal-200">
                {USER_ROLE_LABELS[role]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {bio}
            </p>
          </div>
        </Link>
        
        {onWishlistToggle && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onWishlistToggle();
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-teal-500 focus:outline-none"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-teal-500 text-teal-500" : ""}`} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300 card-hover overflow-hidden h-full flex flex-col relative">
      {onWishlistToggle && (
        <button 
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-teal-500 focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-6 w-6 ${isWishlisted ? "fill-teal-500 text-teal-500" : ""}`} />
        </button>
      )}
      
      <div className="p-6">
        <Link to={`/profiles/${id}`} className="block">
          <div className="flex items-start mb-4">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover border-2 border-teal-200"
            />
            <div className="ml-4">
              <h3 className="font-display font-medium text-lg">{name}</h3>
              <Badge variant="secondary" className="mt-1 bg-teal-100 text-teal-700 hover:bg-teal-200">
                {USER_ROLE_LABELS[role]}
              </Badge>
              
              {rating && (
                <div className="flex items-center mt-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={index} 
                      className={`h-4 w-4 ${index < Math.floor(rating) ? "fill-yellow-500" : "fill-gray-200"}`} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-3">{bio}</p>

          {skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-teal-200 text-teal-700">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="border-teal-200 text-teal-700">+{skills.length - 3}</Badge>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {industry && (
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1 text-teal-600" />
                <span>{industry}</span>
              </div>
            )}
            
            {experience && (
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-teal-600" />
                <span>{experience}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-teal-600" />
                <span>{location}</span>
              </div>
            )}
            
            {connections && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-teal-600" />
                <span>{connections} connections</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="mt-auto p-4 pt-0">
        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
          <Link to={`/profiles/${id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}
