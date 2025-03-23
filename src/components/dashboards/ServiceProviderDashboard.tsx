
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Users, Star, ArrowUpRight } from "lucide-react";

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

const COLORS = ["#0d9488", "#10b981", "#34d399"];

interface ServiceProviderDashboardProps {
  user: User;
}

export default function ServiceProviderDashboard({ user }: ServiceProviderDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">4</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">2 due this week</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">$4,200</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">↑ 15% from last month</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white/90">Client Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">4.8/5</div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Star className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 text-sm text-white/80">From 28 client reviews</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-lg font-medium">Services Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                  <YAxis yAxisId="right" orientation="right" stroke="#0d9488" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" name="Projects Completed" fill="#10b981" />
                  <Bar yAxisId="right" dataKey="amount" name="Revenue ($)" fill="#0d9488" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-lg font-medium">Service Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card className="overflow-hidden shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-100 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">Service Requests</CardTitle>
          <Button variant="outline" size="sm" className="h-8">View All</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((client, i) => (
              <div key={client.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {i === 0 ? "Website redesign and development" : 
                     i === 1 ? "Logo and brand identity design" : 
                     "Business strategy consultation"}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                      {i === 0 ? "Web Development" : i === 1 ? "Design" : "Consulting"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Budget: ${i === 0 ? "3,000" : i === 1 ? "1,200" : "2,500"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Details
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 h-8">
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card className="overflow-hidden shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-lg font-medium">Recent Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((client) => (
              <div key={client.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div className="font-medium">{client.name}</div>
                  <div className="ml-auto text-amber-500 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  "Exceptional service! The quality of work exceeded my expectations. Communication was clear and timely throughout the project. I'll definitely be coming back for future needs."
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Project: {client.id === "1" ? "Website Development" : client.id === "2" ? "Brand Identity Design" : "Marketing Strategy"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card className="overflow-hidden shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-100 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">Active Projects</CardTitle>
          <Button variant="outline" size="sm" className="h-8">Manage All</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border-l-4 border-teal-500">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{
                    i === 0 ? "E-commerce Website Development" :
                    i === 1 ? "Mobile App UI Design" :
                    i === 2 ? "Brand Identity Redesign" :
                    "Digital Marketing Strategy"
                  }</div>
                  <Badge className={
                    i === 0 ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                    i === 1 ? "bg-green-100 text-green-800 hover:bg-green-200" :
                    i === 2 ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                    "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  }>
                    {i === 0 ? "In Progress" :
                     i === 1 ? "On Track" :
                     i === 2 ? "Review" :
                     "Planning"}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Client: {["TechSolutions Inc.", "GrowthApp", "Fashion Brand", "Marketing Agency"][i]}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Deadline: {["July 15", "July 30", "August 10", "August 22"][i]}
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                      <div 
                        className="bg-teal-500 h-full rounded-full" 
                        style={{ width: [`75%`, `40%`, `90%`, `20%`][i] }}
                      ></div>
                    </div>
                    <span className="ml-2">{["75%", "40%", "90%", "20%"][i]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
