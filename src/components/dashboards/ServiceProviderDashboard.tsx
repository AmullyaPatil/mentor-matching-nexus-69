
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Users, Star, ArrowUpRight, CheckCircle, Calendar, BellRing, Briefcase, MessageSquare, Phone, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for the service provider dashboard
const serviceData = [
  { name: "Jan", completed: 4, amount: 2400 },
  { name: "Feb", completed: 6, amount: 3600 },
  { name: "Mar", completed: 5, amount: 3000 },
  { name: "Apr", completed: 8, amount: 4800 },
  { name: "May", completed: 9, amount: 5400 },
  { name: "Jun", completed: 7, amount: 4200 }
];

const serviceTypeData = [
  { name: "Design", value: 35 },
  { name: "Development", value: 45 },
  { name: "Consulting", value: 20 },
];

const monthlyRevenueData = [
  { name: "Jan", revenue: 3200 },
  { name: "Feb", revenue: 4500 },
  { name: "Mar", revenue: 3800 },
  { name: "Apr", revenue: 5100 },
  { name: "May", revenue: 6200 },
  { name: "Jun", revenue: 5400 },
];

const satisfactionData = [
  { name: "Very Satisfied", value: 68 },
  { name: "Satisfied", value: 22 },
  { name: "Neutral", value: 8 },
  { name: "Unsatisfied", value: 2 },
];

const COLORS = ["#0047CC", "#3372FF", "#85AAFF", "#D6E3FF"];
const SATISFACTION_COLORS = ["#0047CC", "#3372FF", "#85AAFF", "#FF5959"];

interface ServiceProviderDashboardProps {
  user: User;
}

export default function ServiceProviderDashboard({ user }: ServiceProviderDashboardProps) {
  const handleAcceptRequest = (clientName: string) => {
    toast({
      title: "Request Accepted",
      description: `You've accepted the service request from ${clientName}`
    });
  };

  const handleStartCall = (name: string, type: 'message' | 'meeting' | 'call' | 'video') => {
    const actions = {
      'message': `Chat started with ${name}`,
      'meeting': `Meeting scheduled with ${name}`,
      'call': `Calling ${name}...`,
      'video': `Video call started with ${name}...`
    };
    
    toast({
      title: type === 'message' ? 'New Message' : type === 'meeting' ? 'Meeting Scheduled' : type === 'call' ? 'Call Started' : 'Video Call Started',
      description: actions[type]
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-navy-700 to-navy-800 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white/90 text-sm">Active Projects</h3>
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">4</div>
            <div className="flex items-center text-white/80 text-xs">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">+2</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cobalt-600 to-cobalt-700 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white/90 text-sm">Total Earnings</h3>
              <div className="p-1.5 bg-white/20 rounded-lg">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">$24,500</div>
            <div className="flex items-center text-white/80 text-xs">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">15%</span>
              <span>increase this quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white/90 text-sm">Client Rating</h3>
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Star className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">4.8/5</div>
            <div className="flex items-center text-white/80 text-xs">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">↑</span>
              <span>Based on 28 reviews</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cobalt-500 to-cobalt-600 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white/90 text-sm">Completion Rate</h3>
              <div className="p-1.5 bg-white/20 rounded-lg">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">98.5%</div>
            <div className="flex items-center text-white/80 text-xs">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">+2.5%</span>
              <span>above industry average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="p-3 bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-sm font-medium text-navy-800">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0047CC" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0047CC" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 9}} />
                  <YAxis tick={{fontSize: 9}} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#0047CC" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="p-3 bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-sm font-medium text-navy-800">Service Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="p-3 bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-sm font-medium text-navy-800">Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[index % SATISFACTION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="p-3 bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-sm font-medium text-navy-800">Services Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 9}} />
                  <YAxis tick={{fontSize: 9}} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} />
                  <Bar dataKey="completed" name="Projects" fill="#0047CC" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card className="overflow-hidden shadow-sm border-navy-100">
        <CardHeader className="p-3 bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
          <CardTitle className="text-sm font-medium text-navy-800">New Service Requests</CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs border-navy-200 text-navy-700 hover:bg-navy-100">View All</Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {MOCK_USERS.slice(0, 3).map((client, i) => (
              <div key={client.id} className="p-3 bg-navy-50 rounded-lg flex items-center gap-3">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-navy-100"
                />
                <div className="flex-grow">
                  <div className="font-medium text-navy-800 text-sm">{client.name}</div>
                  <div className="text-xs text-navy-600">
                    {i === 0 ? "Website redesign and development" : 
                     i === 1 ? "Logo and brand identity design" : 
                     "Business strategy consultation"}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-navy-100 text-navy-700 border-navy-200">
                      {i === 0 ? "Web Development" : i === 1 ? "Design" : "Consulting"}
                    </Badge>
                    <span className="text-xs text-navy-600">
                      Budget: ${i === 0 ? "3,000" : i === 1 ? "1,200" : "2,500"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs border-navy-200 text-navy-700 hover:bg-navy-100">
                    Details
                  </Button>
                  <Button 
                    className="bg-navy-700 hover:bg-navy-800 h-7 text-white text-xs"
                    onClick={() => handleAcceptRequest(client.name)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card className="overflow-hidden shadow-sm border-navy-100">
        <CardHeader className="p-3 bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
          <CardTitle className="text-sm font-medium text-navy-800">Active Projects</CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs border-navy-200 text-navy-700 hover:bg-navy-100">Manage Projects</Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-3 bg-navy-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-navy-800 text-sm">{
                    i === 0 ? "E-commerce Website Development" :
                    i === 1 ? "Mobile App UI Design" :
                    "Brand Identity Redesign"
                  }</div>
                  <Badge className={
                    i === 0 ? "bg-orange-100 text-orange-800 text-xs" :
                    i === 1 ? "bg-cobalt-100 text-cobalt-800 text-xs" :
                    "bg-navy-100 text-navy-800 text-xs"
                  }>
                    {i === 0 ? "In Progress" :
                     i === 1 ? "On Track" :
                     "Review"}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-navy-600">
                  Client: {MOCK_USERS[i].name}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-navy-600 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Due: {["July 15", "July 30", "August 10"][i]}
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="bg-navy-200 h-1.5 w-20 rounded-full overflow-hidden">
                      <div 
                        className="bg-cobalt-500 h-full rounded-full" 
                        style={{ width: [`75%`, `40%`, `90%`][i] }}
                      ></div>
                    </div>
                    <span className="ml-1 text-navy-800">{["75%", "40%", "90%"][i]}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-6 w-6 p-0 border-navy-200"
                    onClick={() => handleStartCall(MOCK_USERS[i].name, 'message')}
                  >
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-6 w-6 p-0 border-navy-200"
                    onClick={() => handleStartCall(MOCK_USERS[i].name, 'call')}
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-6 w-6 p-0 border-navy-200"
                    onClick={() => handleStartCall(MOCK_USERS[i].name, 'video')}
                  >
                    <Video className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
