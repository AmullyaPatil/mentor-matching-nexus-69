
import { User } from "@/context/AuthContext";
import { MOCK_USERS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  Check, 
  Clock, 
  Star, 
  ArrowUpRight, 
  Calendar,
  Target
} from "lucide-react";

// Mock data
const matchData = [
  { name: "Tech", value: 85 },
  { name: "Business", value: 65 },
  { name: "Vision", value: 90 },
  { name: "Work Style", value: 78 },
  { name: "Communication", value: 82 }
];

const progressData = [
  { month: "Jan", progress: 15 },
  { month: "Feb", progress: 25 },
  { month: "Mar", progress: 30 },
  { month: "Apr", progress: 45 },
  { month: "May", progress: 60 },
  { month: "Jun", progress: 75 },
];

const skillsData = [
  { name: "Technical", cofounder: 35, you: 80 },
  { name: "Business", cofounder: 90, you: 40 },
  { name: "Design", cofounder: 70, you: 30 },
  { name: "Marketing", cofounder: 85, you: 55 },
  { name: "Operations", cofounder: 60, you: 65 }
];

const COLORS = ["#0047CC", "#3372FF", "#85AAFF", "#D6E3FF"];

interface CofounderDashboardProps {
  user: User;
}

export default function CofounderDashboard({ user }: CofounderDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Top Cards - Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-navy-700 to-navy-800 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">85%</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">With Sarah Johnson (Co-Founder)</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cobalt-600 to-cobalt-700 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Startup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">75%</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Check className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">On track for MVP launch</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Next Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">Today</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">3:00 PM - Strategy Session</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column - takes 3/5 */}
        <div className="lg:col-span-3 space-y-6">
          {/* Compatibility Score */}
          <Card className="overflow-hidden shadow-sm border-navy-100">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Co-Founder Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={matchData}
                    layout="vertical"
                    margin={{ top: 20, right: 20, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Compatibility"]}
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {matchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value > 80 ? '#0047CC' : entry.value > 60 ? '#3372FF' : '#85AAFF'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Skills Comparison */}
          <Card className="overflow-hidden shadow-sm border-navy-100">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Skills Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillsData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} />
                    <Legend />
                    <Bar dataKey="you" name="Your Skills" fill="#0047CC" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cofounder" name="Co-Founder" fill="#3372FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - takes 2/5 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Co-Founder Profile */}
          <Card className="overflow-hidden shadow-sm border-navy-100">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Your Co-Founder</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Sarah Johnson" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-cobalt-200"
                />
                <div>
                  <h3 className="font-medium text-lg text-navy-900">Sarah Johnson</h3>
                  <div className="text-navy-600 text-sm">Former Product Manager at Tech Giant</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-navy-50 p-3 rounded-lg">
                  <div className="text-xs text-navy-600">Expertise</div>
                  <div className="font-medium text-navy-800">Product, Strategy</div>
                </div>
                <div className="bg-navy-50 p-3 rounded-lg">
                  <div className="text-xs text-navy-600">Experience</div>
                  <div className="font-medium text-navy-800">8+ years</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Business Development</Badge>
                <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Growth</Badge>
                <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Leadership</Badge>
                <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Product Strategy</Badge>
              </div>
              
              <Button className="w-full bg-navy-700 hover:bg-navy-800">
                Message Co-Founder
              </Button>
            </CardContent>
          </Card>

          {/* Startup Progress */}
          <Card className="overflow-hidden shadow-sm border-navy-100">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Startup Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={progressData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} />
                    <Area type="monotone" dataKey="progress" stroke="#0047CC" fill="#d6e3ff" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-navy-800">MVP Development</div>
                  <div className="text-xs text-navy-600">90%</div>
                </div>
                <div className="w-full bg-navy-100 rounded-full h-2">
                  <div className="bg-cobalt-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-navy-800">Customer Validation</div>
                  <div className="text-xs text-navy-600">65%</div>
                </div>
                <div className="w-full bg-navy-100 rounded-full h-2">
                  <div className="bg-cobalt-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-navy-800">Funding Preparation</div>
                  <div className="text-xs text-navy-600">40%</div>
                </div>
                <div className="w-full bg-navy-100 rounded-full h-2">
                  <div className="bg-cobalt-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Tasks and Meetings */}
      <Card className="overflow-hidden shadow-sm border-navy-100">
        <CardHeader className="bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
          <CardTitle className="text-navy-800">Upcoming Tasks & Meetings</CardTitle>
          <Button variant="outline" size="sm" className="h-8 border-navy-200 text-navy-700 hover:bg-navy-100">View Calendar</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-navy-800 mb-2">Today</h3>
              
              <div className="p-3 bg-navy-50 rounded-lg border-l-4 border-cobalt-600">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-navy-900">Strategy Session</div>
                    <div className="text-xs text-navy-600">3:00 PM - 4:00 PM</div>
                  </div>
                  <Badge className="bg-cobalt-100 text-cobalt-800 hover:bg-cobalt-200">Meeting</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-navy-50 rounded-lg border-l-4 border-navy-600">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-navy-900">Finalize MVP Features</div>
                    <div className="text-xs text-navy-600">Due by 6:00 PM</div>
                  </div>
                  <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Task</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-navy-800 mb-2">Tomorrow</h3>
              
              <div className="p-3 bg-navy-50 rounded-lg border-l-4 border-navy-600">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-navy-900">Review Design Mockups</div>
                    <div className="text-xs text-navy-600">Due by 11:00 AM</div>
                  </div>
                  <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-200">Task</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-navy-50 rounded-lg border-l-4 border-cobalt-600">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-navy-900">Investor Pitch Prep</div>
                    <div className="text-xs text-navy-600">2:00 PM - 3:30 PM</div>
                  </div>
                  <Badge className="bg-cobalt-100 text-cobalt-800 hover:bg-cobalt-200">Meeting</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
