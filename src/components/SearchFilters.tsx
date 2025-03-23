
import { useState } from "react";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export interface SearchFiltersProps {
  selectedRoles: UserRole[];
  onRoleChange: (roles: UserRole[]) => void;
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
  availableExpertise: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedExperience: string;
  onExperienceChange: (experience: string) => void;
  selectedIndustry: string[];
  onIndustryChange: (industry: string[]) => void;
  availableLocations: string[];
  availableExperience: string[];
  availableIndustries: string[];
}

export interface SearchFilters {
  query: string;
  roles: UserRole[];
  expertise: string[];
  location: string;
}

export default function SearchFilters({ 
  selectedRoles, 
  onRoleChange, 
  selectedExpertise, 
  onExpertiseChange, 
  availableExpertise,
  selectedLocation,
  onLocationChange,
  selectedExperience,
  onExperienceChange,
  selectedIndustry,
  onIndustryChange,
  availableLocations = [],
  availableExperience = [],
  availableIndustries = []
}: SearchFiltersProps) {
  const handleRoleChange = (role: UserRole) => {
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];

    onRoleChange(newRoles);
  };

  const handleExpertiseChange = (value: string) => {
    const newExpertise = selectedExpertise.includes(value)
      ? selectedExpertise.filter((e) => e !== value)
      : [...selectedExpertise, value];

    onExpertiseChange(newExpertise);
  };

  const handleIndustryChange = (value: string) => {
    const newIndustry = selectedIndustry.includes(value)
      ? selectedIndustry.filter((i) => i !== value)
      : [...selectedIndustry, value];

    onIndustryChange(newIndustry);
  };

  const clearFilters = () => {
    onRoleChange([]);
    onExpertiseChange([]);
    onLocationChange("any-location");
    onExperienceChange("any-experience");
    onIndustryChange([]);
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedExpertise.length > 0 || 
                          selectedLocation !== "any-location" || 
                          selectedExperience !== "any-experience" || 
                          selectedIndustry.length > 0;

  return (
    <div className="w-full bg-white rounded-xl border border-navy-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Role filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-navy-700">Role</Label>
            <Select>
              <SelectTrigger className="border-navy-200 focus:ring-cobalt-500">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserRole).map((role) => (
                  <SelectItem 
                    key={role} 
                    value={role}
                    onClick={() => handleRoleChange(role)}
                    className={selectedRoles.includes(role) ? "bg-cobalt-50 text-cobalt-700" : ""}
                  >
                    {USER_ROLE_LABELS[role]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedRoles.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedRoles.map((role) => (
                  <Badge
                    key={role}
                    variant="secondary"
                    className="bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
                  >
                    <span>{USER_ROLE_LABELS[role]}</span>
                    <button
                      onClick={() => handleRoleChange(role)}
                      className="ml-1 hover:text-cobalt-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Expertise filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-navy-700">Expertise</Label>
            <Select>
              <SelectTrigger className="border-navy-200 focus:ring-cobalt-500">
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {availableExpertise.map((expertise) => (
                  <SelectItem 
                    key={expertise} 
                    value={expertise}
                    onClick={() => handleExpertiseChange(expertise)}
                    className={selectedExpertise.includes(expertise) ? "bg-cobalt-50 text-cobalt-700" : ""}
                  >
                    {expertise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedExpertise.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedExpertise.map((expertise) => (
                  <Badge
                    key={expertise}
                    variant="secondary"
                    className="bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
                  >
                    <span>{expertise}</span>
                    <button
                      onClick={() => handleExpertiseChange(expertise)}
                      className="ml-1 hover:text-cobalt-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Location filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-navy-700">Location</Label>
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="border-navy-200 focus:ring-cobalt-500">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-location">Any location</SelectItem>
                {availableLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedLocation && selectedLocation !== "any-location" && (
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
                >
                  <span>{selectedLocation}</span>
                  <button
                    onClick={() => onLocationChange("any-location")}
                    className="ml-1 hover:text-cobalt-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>
          
          {/* Experience filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-navy-700">Experience</Label>
            <Select value={selectedExperience} onValueChange={onExperienceChange}>
              <SelectTrigger className="border-navy-200 focus:ring-cobalt-500">
                <SelectValue placeholder="Years of experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-experience">Any experience</SelectItem>
                {availableExperience.map(exp => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedExperience && selectedExperience !== "any-experience" && (
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
                >
                  <span>{selectedExperience}</span>
                  <button
                    onClick={() => onExperienceChange("any-experience")}
                    className="ml-1 hover:text-cobalt-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>
          
          {/* Industry filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-navy-700">Industry</Label>
            <Select>
              <SelectTrigger className="border-navy-200 focus:ring-cobalt-500">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {availableIndustries.map((industry) => (
                  <SelectItem 
                    key={industry} 
                    value={industry}
                    onClick={() => handleIndustryChange(industry)}
                    className={selectedIndustry.includes(industry) ? "bg-cobalt-50 text-cobalt-700" : ""}
                  >
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedIndustry.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedIndustry.map((industry) => (
                  <Badge
                    key={industry}
                    variant="secondary"
                    className="bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
                  >
                    <span>{industry}</span>
                    <button
                      onClick={() => handleIndustryChange(industry)}
                      className="ml-1 hover:text-cobalt-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-cobalt-600 hover:text-cobalt-700 hover:bg-cobalt-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
