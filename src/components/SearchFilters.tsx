
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

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
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

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    roles: [],
    expertise: [],
    location: "",
  });

  const handleRoleChange = (role: UserRole) => {
    const newRoles = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role];

    const newFilters = { ...filters, roles: newRoles };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleExpertiseChange = (value: string) => {
    const newExpertise = filters.expertise.includes(value)
      ? filters.expertise.filter((e) => e !== value)
      : [...filters.expertise, value];

    const newFilters = { ...filters, expertise: newExpertise };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, query: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, location: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      query: "",
      roles: [],
      expertise: [],
      location: "",
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters =
    filters.roles.length > 0 ||
    filters.expertise.length > 0 ||
    filters.location !== "";

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium font-display">Filters</h3>
          <div className="flex items-center">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm mr-2"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
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
          <div>
            <Label htmlFor="search-query">Search</Label>
            <Input
              id="search-query"
              type="text"
              placeholder="Name, skills or keywords"
              value={filters.query}
              onChange={handleQueryChange}
              className="mt-1"
            />
          </div>

          <div className={`${expanded ? "block" : "hidden lg:block"}`}>
            <Label className="mb-2 block">Role</Label>
            <div className="space-y-2">
              {Object.values(UserRole).map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={filters.roles.includes(role)}
                    onCheckedChange={() => handleRoleChange(role)}
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="City, state, or country"
              value={filters.location}
              onChange={handleLocationChange}
              className="mt-1"
            />
          </div>

          <div className={`${expanded ? "block" : "hidden lg:block"}`}>
            <Label className="mb-2 block">Expertise</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertiseOptions.map((expertise) => (
                  <SelectItem 
                    key={expertise} 
                    value={expertise}
                    onSelect={() => handleExpertiseChange(expertise)}
                    className={filters.expertise.includes(expertise) ? "bg-primary" : ""}
                  >
                    {expertise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {filters.expertise.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {filters.expertise.map((expertise) => (
                  <div
                    key={expertise}
                    className="bg-primary text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    <span>{expertise}</span>
                    <button
                      onClick={() => handleExpertiseChange(expertise)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
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
