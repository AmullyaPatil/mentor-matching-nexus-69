
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
    onLocationChange("");
    onExperienceChange("");
    onIndustryChange([]);
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedExpertise.length > 0 || 
                           selectedLocation !== "" || selectedExperience !== "" || 
                           selectedIndustry.length > 0;

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Role filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-gray-700">Role</Label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserRole).map((role) => (
                  <SelectItem 
                    key={role} 
                    value={role}
                    onClick={() => handleRoleChange(role)}
                    className={selectedRoles.includes(role) ? "bg-teal-50 text-teal-700" : ""}
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
                    className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                  >
                    <span>{USER_ROLE_LABELS[role]}</span>
                    <button
                      onClick={() => handleRoleChange(role)}
                      className="ml-1 hover:text-teal-900"
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
            <Label className="mb-2 block font-medium text-sm text-gray-700">Expertise</Label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {availableExpertise.map((expertise) => (
                  <SelectItem 
                    key={expertise} 
                    value={expertise}
                    onClick={() => handleExpertiseChange(expertise)}
                    className={selectedExpertise.includes(expertise) ? "bg-teal-50 text-teal-700" : ""}
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
                    className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                  >
                    <span>{expertise}</span>
                    <button
                      onClick={() => handleExpertiseChange(expertise)}
                      className="ml-1 hover:text-teal-900"
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
            <Label className="mb-2 block font-medium text-sm text-gray-700">Location</Label>
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {/* Use placeholder value with a non-empty string */}
                <SelectItem value="any-location">Any location</SelectItem>
                {availableLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Experience filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-gray-700">Experience</Label>
            <Select value={selectedExperience} onValueChange={onExperienceChange}>
              <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                <SelectValue placeholder="Years of experience" />
              </SelectTrigger>
              <SelectContent>
                {/* Use placeholder value with a non-empty string */}
                <SelectItem value="any-experience">Any experience</SelectItem>
                {availableExperience.map(exp => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Industry filter */}
          <div>
            <Label className="mb-2 block font-medium text-sm text-gray-700">Industry</Label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {availableIndustries.map((industry) => (
                  <SelectItem 
                    key={industry} 
                    value={industry}
                    onClick={() => handleIndustryChange(industry)}
                    className={selectedIndustry.includes(industry) ? "bg-teal-50 text-teal-700" : ""}
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
                    className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                  >
                    <span>{industry}</span>
                    <button
                      onClick={() => handleIndustryChange(industry)}
                      className="ml-1 hover:text-teal-900"
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
              className="text-sm text-teal-600 hover:text-teal-700 hover:bg-teal-50"
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
