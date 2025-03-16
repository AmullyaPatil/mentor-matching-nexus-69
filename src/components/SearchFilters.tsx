
import { useState } from "react";
import { USER_ROLE_LABELS, UserRole } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

const expertiseOptions = [
  "Product Strategy",
  "Growth",
  "Fundraising",
  "Marketing",
  "Sales",
  "Technology",
  "UX/UI Design",
  "Legal",
  "Finance",
  "Operations",
  "HR",
  "Machine Learning",
  "Blockchain",
  "Web3",
  "Mobile Development",
  "E-commerce",
  "SaaS",
  "Fintech",
  "Healthtech",
  "Edtech",
  "AI",
];

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
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden gradient-border">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium font-display gradient-text">Filters</h3>
          <div className="flex items-center">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm mr-2 text-highlight hover:text-highlight/80 hover:bg-highlight/10"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-highlight hover:text-highlight/80 hover:bg-highlight/10"
              onClick={() => setExpanded(!expanded)}
            >
              <Filter className="h-4 w-4 mr-1" />
              {expanded ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-4">
          <div className={`${expanded ? "block" : "hidden lg:block"}`}>
            <Label className="mb-2 block font-medium text-sm text-foreground/80">Role</Label>
            <div className="space-y-2">
              {Object.values(UserRole).map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleRoleChange(role)}
                    className="text-highlight border-muted-foreground/30 data-[state=checked]:bg-highlight data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={`role-${role}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {USER_ROLE_LABELS[role]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className={`${expanded ? "block" : "hidden lg:block"}`}>
            <Label className="mb-2 block font-medium text-sm text-foreground/80">Expertise</Label>
            <Select>
              <SelectTrigger className="border-border focus:ring-highlight">
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertiseOptions.map((expertise) => (
                  <SelectItem 
                    key={expertise} 
                    value={expertise}
                    onSelect={() => handleExpertiseChange(expertise)}
                    className={selectedExpertise.includes(expertise) ? "bg-highlight/10 text-highlight" : ""}
                  >
                    {expertise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedExpertise.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedExpertise.map((expertise) => (
                  <div
                    key={expertise}
                    className="bg-highlight/10 text-highlight text-xs px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{expertise}</span>
                    <button
                      onClick={() => handleExpertiseChange(expertise)}
                      className="ml-1 hover:text-highlight/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
