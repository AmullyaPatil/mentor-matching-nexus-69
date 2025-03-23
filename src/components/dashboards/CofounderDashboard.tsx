
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Target, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";

// Mock data for the cofounder dashboard
const progressData = [
  { name: "Idea", value: 100 },
  { name: "MVP", value: 85 },
  { name: "Validation", value: 60 },
  { name: "Seed Round", value: 30 },
  { name: "Product Launch", value: 15 },
];

const skillMatchData = [
  { name: "Technical", value: 35 },
  { name: "Business", value: 40 },
  { name: "Operations", value: 15 },
  { name: "Design", value: 10 },
];

const COLORS = ["#0d9488", "#10b981", "#34d399", "#6ee7b7"];

interface CofounderDashboardProps {
  user: User;
}

export default function CofounderDashboard({ user }: CofounderDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Startup Profile Card */}
      <Card className="overflow-hidden shadow-md border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Briefcase className="h-8 w-8" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">TechVenture Startup</h3>
              <p className="text-white/80 mt-1">AI-powered customer engagement platform for SaaS businesses</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">SaaS</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">AI</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">B2B</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Early-stage</Badge>
              </div>
            </div>
            <Button className="bg-white text-teal-600 hover:bg-white/90">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Co-founder Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <div className="p-2 rounded-lg bg-green-100 text-green-700">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Potential matches based on your criteria</div>
            <Button variant="link" size="sm" className="mt-2 h-8 p-0 text-teal-600">
              View matches <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Startup Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">MVP</div>
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">2 milestones completed, 3 remaining</div>
            <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: "40%" }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pending Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">5</div>
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Co-founder requests awaiting response</div>
            <Button variant="link" size="sm" className="mt-2 h-8 p-0 text-teal-600">
              Review requests <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Startup Progress & Skill Match */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-lg font-medium">Startup Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip formatter={(value) => [`${value}%`, "Completion"]} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-lg font-medium">Co-founder Skills Match</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillMatchData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillMatchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Required"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Co-founder Matches */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-100 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">Potential Co-founders</CardTitle>
          <Button variant="outline" size="sm" className="h-8">View All</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 4).map((user, i) => (
              <div key={user.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-md">
                    {user.bio?.substring(0, 100)}...
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.expertise?.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-teal-600">{85 - (i * 10)}%</div>
                  <div className="text-xs text-muted-foreground">Match Score</div>
                  <Button size="sm" className="mt-2 bg-teal-600 hover:bg-teal-700">
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Startup Milestones */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-lg font-medium">Startup Milestones</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative border-l-2 border-teal-500 pl-8 pb-2 space-y-8">
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-teal-500 -translate-x-1/2"></div>
            
            <div>
              <div className="absolute left-0 w-4 h-4 rounded-full bg-teal-500 -translate-x-1/2"></div>
              <div className="flex items-center">
                <h4 className="text-lg font-medium">Idea Validation</h4>
                <Badge className="ml-4 bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Market research and initial customer interviews completed
              </div>
              <div className="text-xs text-muted-foreground mt-2">Jan 15, 2023</div>
            </div>
            
            <div>
              <div className="absolute left-0 w-4 h-4 rounded-full bg-teal-500 -translate-x-1/2"></div>
              <div className="flex items-center">
                <h4 className="text-lg font-medium">MVP Development</h4>
                <Badge className="ml-4 bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Building core features and user interfaces for the minimum viable product
              </div>
              <div className="text-xs text-muted-foreground mt-2">Target: August 30, 2023</div>
            </div>
            
            <div>
              <div className="absolute left-0 w-4 h-4 rounded-full bg-gray-300 -translate-x-1/2"></div>
              <div className="flex items-center">
                <h4 className="text-lg font-medium">Beta Testing</h4>
                <Badge className="ml-4 bg-gray-100 text-gray-800 hover:bg-gray-200">Upcoming</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Engage early adopters and gather feedback for product improvements
              </div>
              <div className="text-xs text-muted-foreground mt-2">Target: October 15, 2023</div>
            </div>
            
            <div>
              <div className="absolute left-0 w-4 h-4 rounded-full bg-gray-300 -translate-x-1/2"></div>
              <div className="flex items-center">
                <h4 className="text-lg font-medium">Seed Funding</h4>
                <Badge className="ml-4 bg-gray-100 text-gray-800 hover:bg-gray-200">Upcoming</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Raise initial capital to fuel growth and team expansion
              </div>
              <div className="text-xs text-muted-foreground mt-2">Target: December 1, 2023</div>
            </div>
            
            <div>
              <div className="absolute left-0 w-4 h-4 rounded-full bg-gray-300 -translate-x-1/2"></div>
              <div className="flex items-center">
                <h4 className="text-lg font-medium">Public Launch</h4>
                <Badge className="ml-4 bg-gray-100 text-gray-800 hover:bg-gray-200">Upcoming</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Full market release with comprehensive marketing campaign
              </div>
              <div className="text-xs text-muted-foreground mt-2">Target: January 15, 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
