
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Users, Star, ArrowUpRight, CheckCircle, Calendar, BellRing, Briefcase } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Top Stats Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-navy-700 to-navy-800 text-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white/90">Active Projects</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">4</div>
            <div className="flex items-center text-white/80 text-sm">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">+2</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cobalt-600 to-cobalt-700 text-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white/90">Total Earnings</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">$24,500</div>
            <div className="flex items-center text-white/80 text-sm">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">15%</span>
              <span>increase this quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white/90">Client Rating</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <Star className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">4.8/5</div>
            <div className="flex items-center text-white/80 text-sm">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">↑</span>
              <span>Based on 28 reviews</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cobalt-500 to-cobalt-600 text-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white/90">Completion Rate</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">98.5%</div>
            <div className="flex items-center text-white/80 text-sm">
              <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-xs mr-2">+2.5%</span>
              <span>above industry average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart - Column 1 */}
        <div className="col-span-1">
          <Card className="overflow-hidden shadow-sm border-navy-100 h-full">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0047CC" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0047CC" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#0047CC" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 bg-navy-50 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-navy-800">Revenue target: $35,000</span>
                  <span className="text-sm font-medium text-navy-800">78%</span>
                </div>
                <div className="w-full bg-navy-200 rounded-full h-2">
                  <div className="bg-cobalt-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Service Distribution - Column 2 */}
        <div className="col-span-1">
          <Card className="overflow-hidden shadow-sm border-navy-100 h-full">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Service Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {serviceTypeData.map((item, index) => (
                  <div key={index} className="p-2 bg-navy-50 rounded-lg text-center">
                    <div className="text-sm font-medium text-navy-800">{item.name}</div>
                    <div className="text-xs text-navy-600">{item.value}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Client Satisfaction - Column 3 */}
        <div className="col-span-1">
          <Card className="overflow-hidden shadow-sm border-navy-100 h-full">
            <CardHeader className="bg-navy-50 border-b border-navy-100">
              <CardTitle className="text-navy-800">Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
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
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-center mt-4 bg-navy-50 p-3 rounded-lg">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-navy-800 font-medium">90% of clients would recommend your services</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Row - Services Completed & Upcoming Deadlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services Completed */}
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-navy-800">Services Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0047CC" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3372FF" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d6e3ff' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" name="Projects Completed" fill="#0047CC" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="amount" name="Revenue ($)" fill="#3372FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
            <CardTitle className="text-navy-800">Upcoming Deadlines</CardTitle>
            <Button variant="outline" size="sm" className="h-8 border-navy-200 text-navy-700 hover:bg-navy-100">View Calendar</Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="p-4 bg-navy-50 rounded-lg border-l-4 border-navy-500 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-navy-800">{
                      i === 0 ? "E-commerce Website Redesign" :
                      i === 1 ? "Mobile App UI Handoff" :
                      i === 2 ? "Branding Package Delivery" :
                      "Digital Marketing Strategy"
                    }</div>
                    <div className="text-sm text-navy-600 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{
                        i === 0 ? "Due in 2 days" :
                        i === 1 ? "Due tomorrow" :
                        i === 2 ? "Due next week" :
                        "Due in 10 days"
                      }</span>
                    </div>
                  </div>
                  <Badge className={
                    i === 0 ? "bg-orange-100 text-orange-800" :
                    i === 1 ? "bg-red-100 text-red-800" :
                    i === 2 ? "bg-green-100 text-green-800" :
                    "bg-blue-100 text-blue-800"
                  }>
                    {i === 0 ? "Urgent" :
                     i === 1 ? "Critical" :
                     i === 2 ? "On Track" :
                     "Planned"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card className="overflow-hidden shadow-sm border-navy-100">
        <CardHeader className="bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
          <CardTitle className="text-navy-800">New Service Requests</CardTitle>
          <Button variant="outline" size="sm" className="h-8 border-navy-200 text-navy-700 hover:bg-navy-100">View All Requests</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((client, i) => (
              <div key={client.id} className="p-4 bg-navy-50 rounded-lg flex items-center gap-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-navy-100"
                />
                <div className="flex-grow">
                  <div className="font-medium text-navy-800">{client.name}</div>
                  <div className="text-sm text-navy-600">
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-navy-200 text-navy-700 hover:bg-navy-100">
                    Details
                  </Button>
                  <Button 
                    className="bg-navy-700 hover:bg-navy-800 h-8 text-white"
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

      {/* Bottom Row - Recent Client Feedback & Active Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Client Feedback */}
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="bg-navy-50 border-b border-navy-100">
            <CardTitle className="text-navy-800">Recent Client Feedback</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {MOCK_USERS.slice(0, 3).map((client, i) => (
                <div key={client.id} className="p-4 bg-navy-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-8 h-8 rounded-full object-cover mr-2 border border-navy-100"
                    />
                    <div className="font-medium text-navy-800">{client.name}</div>
                    <div className="ml-auto text-amber-500 flex">
                      {Array(5).fill(0).map((_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < 5 - i % 2 ? "fill-yellow-500" : "fill-navy-200"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-navy-600">
                    "{i === 0 ? "Exceptional service! The quality of work exceeded my expectations. Communication was clear and timely throughout the project." : 
                      i === 1 ? "Great work on our branding project. The designs perfectly captured our company's vision and values." : 
                      "The strategic consulting provided was invaluable to our business growth. Highly recommend!"}"
                  </div>
                  <div className="mt-2 text-xs text-navy-600 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {i === 0 ? "2 days ago" : i === 1 ? "1 week ago" : "2 weeks ago"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects Status */}
        <Card className="overflow-hidden shadow-sm border-navy-100">
          <CardHeader className="bg-navy-50 border-b border-navy-100 flex flex-row justify-between items-center">
            <CardTitle className="text-navy-800">Active Projects</CardTitle>
            <Button variant="outline" size="sm" className="h-8 border-navy-200 text-navy-700 hover:bg-navy-100">Manage Projects</Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="p-4 bg-navy-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-navy-800">{
                      i === 0 ? "E-commerce Website Development" :
                      i === 1 ? "Mobile App UI Design" :
                      i === 2 ? "Brand Identity Redesign" :
                      "Digital Marketing Strategy"
                    }</div>
                    <Badge className={
                      i === 0 ? "bg-orange-100 text-orange-800" :
                      i === 1 ? "bg-green-100 text-green-800" :
                      i === 2 ? "bg-blue-100 text-blue-800" :
                      "bg-purple-100 text-purple-800"
                    }>
                      {i === 0 ? "In Progress" :
                       i === 1 ? "On Track" :
                       i === 2 ? "Review" :
                       "Planning"}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-navy-600">
                    Client: {["TechSolutions Inc.", "GrowthApp", "Fashion Brand", "Marketing Agency"][i]}
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-navy-600 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Due: {["July 15", "July 30", "August 10", "August 22"][i]}
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="bg-navy-200 h-2 w-24 rounded-full overflow-hidden">
                        <div 
                          className="bg-cobalt-500 h-full rounded-full" 
                          style={{ width: [`75%`, `40%`, `90%`, `20%`][i] }}
                        ></div>
                      </div>
                      <span className="ml-2 text-navy-800">{["75%", "40%", "90%", "20%"][i]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
