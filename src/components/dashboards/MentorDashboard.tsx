
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Calendar, Phone, CheckCircle2, XCircle, Video, Clock } from "lucide-react";

// Mock data for the mentor dashboard
const earningsData = [
  { name: "Jan", amount: 850 },
  { name: "Feb", amount: 1200 },
  { name: "Mar", amount: 1800 },
  { name: "Apr", amount: 2200 },
  { name: "May", amount: 2600 },
  { name: "Jun", amount: 3100 }
];

const sessionTypeData = [
  { name: "1:1 Calls", value: 65 },
  { name: "Group Sessions", value: 25 },
  { name: "Chat Support", value: 10 },
];

const menteesGrowthData = [
  { name: "Jan", mentees: 5 },
  { name: "Feb", mentees: 8 },
  { name: "Mar", mentees: 12 },
  { name: "Apr", mentees: 15 },
  { name: "May", mentees: 18 },
  { name: "Jun", mentees: 22 }
];

const ratingsData = [
  { name: "Jan", rating: 4.2 },
  { name: "Feb", rating: 4.3 },
  { name: "Mar", rating: 4.5 },
  { name: "Apr", rating: 4.7 },
  { name: "May", rating: 4.8 },
  { name: "Jun", rating: 4.9 }
];

const COLORS = ["#0047cc", "#3372ff", "#85aaff"];

interface MentorDashboardProps {
  user: User;
}

export default function MentorDashboard({ user }: MentorDashboardProps) {
  const handleConnectionAction = (name: string, action: 'accept' | 'decline') => {
    toast({
      title: action === 'accept' ? "Connection Accepted" : "Connection Declined",
      description: action === 'accept' 
        ? `You are now connected with ${name}` 
        : `You have declined the connection request from ${name}`
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Total Earnings</div>
          <div className="text-3xl font-semibold">$3,100</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 18% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Active Mentees</div>
          <div className="text-3xl font-semibold">{user.connections || 0}</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 5 new this month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Session Rating</div>
          <div className="text-3xl font-semibold">4.8/5</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 0.2 from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Hours Mentored</div>
          <div className="text-3xl font-semibold">86</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 14 hours this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Monthly Earnings</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                <Area type="monotone" dataKey="amount" fill="#3372ff" stroke="#0047cc" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Session Types</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Mentees Growth</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={menteesGrowthData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`${value}`, "Mentees"]} />
                <Bar dataKey="mentees" fill="#3372ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Rating Trend</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingsData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis domain={[3, 5]} tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`${value}`, "Rating"]} />
                <Line type="monotone" dataKey="rating" stroke="#0047cc" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((mentee, index) => (
              <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentee.avatar}
                  alt={mentee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentee.name}</div>
                  <div className="text-sm text-navy-600">
                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Friday"}, {2 + index}:00 PM • 45 min session
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentee.name, 'message')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentee.name, 'call')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentee.name, 'video')}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 bg-cobalt-600 hover:bg-cobalt-700"
                    onClick={() => handleStartCall(mentee.name, 'meeting')}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/calendar" className="text-sm text-cobalt-600 hover:text-cobalt-700 font-medium">
              View full calendar →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connection Requests</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(3, 6).map((mentee) => (
              <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentee.avatar}
                  alt={mentee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentee.name}</div>
                  <div className="text-sm text-navy-600">
                    {mentee.role} • {mentee.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200" 
                    onClick={() => handleConnectionAction(mentee.name, 'decline')}
                  >
                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                    Decline
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="h-8 bg-cobalt-600 hover:bg-cobalt-700" 
                    onClick={() => handleConnectionAction(mentee.name, 'accept')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Active Mentee Connections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_USERS.slice(0, 6).map((mentee) => (
            <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={mentee.avatar}
                  alt={mentee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{mentee.name}</div>
                  <div className="text-xs text-navy-600">{mentee.role}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-navy-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {Math.floor(Math.random() * 10) + 2} sessions
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 border-navy-200"
                    onClick={() => handleStartCall(mentee.name, 'message')}
                  >
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 border-navy-200"
                    onClick={() => handleStartCall(mentee.name, 'call')}
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 border-navy-200"
                    onClick={() => handleStartCall(mentee.name, 'video')}
                  >
                    <Video className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
