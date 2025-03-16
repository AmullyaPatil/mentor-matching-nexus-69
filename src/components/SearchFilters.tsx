
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
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";

export interface SearchFiltersProps {
  selectedRoles: UserRole[];
  onRoleChange: (roles: UserRole[]) => void;
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
  availableExpertise: string[];
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
  availableExpertise 
}: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(false);

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

  const clearFilters = () => {
    onRoleChange([]);
    onExpertiseChange([]);
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedExpertise.length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium font-display text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className={`${expanded ? "block" : "hidden lg:block"}`}>
          {/* Horizontal filter layout */}
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
                      onSelect={() => handleRoleChange(role)}
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
                      onSelect={() => handleExpertiseChange(expertise)}
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
              <Select>
                <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any location</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Experience filter */}
            <div>
              <Label className="mb-2 block font-medium text-sm text-gray-700">Experience</Label>
              <Select>
                <SelectTrigger className="border-gray-200 focus:ring-teal-500">
                  <SelectValue placeholder="Years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any experience</SelectItem>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
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
                  <SelectItem value="any">Any industry</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Mobile toggle button */}
        <div className="mt-4 lg:hidden flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Filters
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show Filters
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
