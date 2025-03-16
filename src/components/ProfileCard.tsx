
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { MapPin, Users } from "lucide-react";

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
  compact?: boolean;
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
  compact = false
}: ProfileCardProps) {
  const skills = expertise || interests || [];
  
  if (compact) {
    return (
      <Link to={`/profiles/${id}`}>
        <div className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300 hover:border-gray-200 h-full flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-base mb-1">{name}</h3>
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {USER_ROLE_LABELS[role]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {bio}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300 hover:border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-display font-medium text-lg">{name}</h3>
              <Badge variant="secondary" className="mt-1">
                {USER_ROLE_LABELS[role]}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-3">{bio}</p>

        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline">+{skills.length - 3}</Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
          {connections && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{connections} connections</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/profiles/${id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}
