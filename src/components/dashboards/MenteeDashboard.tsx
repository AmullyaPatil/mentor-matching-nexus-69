
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Calendar, Phone, CheckCircle2, XCircle, Video, Headphones } from "lucide-react";

const connectionsData = [
  { name: "Jan", connections: 4 },
  { name: "Feb", connections: 7 },
  { name: "Mar", connections: 12 },
  { name: "Apr", connections: 15 },
  { name: "May", connections: 18 },
  { name: "Jun", connections: 24 }
];

const skillsData = [
  { subject: 'Programming', A: 75, fullMark: 100 },
  { subject: 'Design', A: 65, fullMark: 100 },
  { subject: 'Marketing', A: 45, fullMark: 100 },
  { subject: 'Business', A: 80, fullMark: 100 },
  { subject: 'Communication', A: 90, fullMark: 100 },
  { subject: 'Leadership', A: 60, fullMark: 100 },
];

const progressData = [
  { name: 'Learning', value: 68 },
  { name: 'To Learn', value: 32 },
];

const sessionCountData = [
  { name: 'Jan', sessions: 3 },
  { name: 'Feb', sessions: 5 },
  { name: 'Mar', sessions: 8 },
  { name: 'Apr', sessions: 6 },
  { name: 'May', sessions: 9 },
  { name: 'Jun', sessions: 12 },
];

const COLORS = ['#3372ff', '#1a2b59'];

interface MenteeDashboardProps {
  user: User;
}

export default function MenteeDashboard({ user }: MenteeDashboardProps) {
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
          <div className="text-sm text-navy-600 mb-2">Total Mentors</div>
          <div className="text-3xl font-semibold">{user.connections || 0}</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Upcoming Sessions</div>
          <div className="text-3xl font-semibold">3</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 2 more than last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Learning Progress</div>
          <div className="text-3xl font-semibold">68%</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 15% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Hours Mentored</div>
          <div className="text-3xl font-semibold">42</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 8 hours this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Connection Growth</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={connectionsData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="connections" fill="#3372ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Learning Progress</h3>
          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Skills Analysis</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 8}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 8}} />
                <Radar name="Skills" dataKey="A" stroke="#3372ff" fill="#3372ff" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Sessions</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionCountData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="sessions" fill="#1a2b59" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connection Requests</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((mentor) => (
              <div key={mentor.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-navy-600">
                    {mentor.role} • {mentor.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-navy-200" onClick={() => handleConnectionAction(mentor.name, 'decline')}>
                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                    Decline
                  </Button>
                  <Button variant="default" size="sm" className="h-8 bg-cobalt-600 hover:bg-cobalt-700" onClick={() => handleConnectionAction(mentor.name, 'accept')}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 2).map((mentor, idx) => (
              <div key={mentor.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-navy-600">
                    {idx === 0 ? "Today" : "Tomorrow"}, {2 + idx}:00 PM • 45 min session
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'message')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'call')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'video')}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm" 
                    className="h-8 bg-cobalt-600 hover:bg-cobalt-700"
                    onClick={() => handleStartCall(mentor.name, 'meeting')}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/search" className="text-sm text-cobalt-600 hover:text-cobalt-700 font-medium">
              Find more mentors →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Active Connections</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(3, 6).map((mentor) => (
              <div key={mentor.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-navy-600">
                    {mentor.role} • {mentor.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'message')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'call')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(mentor.name, 'video')}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recommended Mentors</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((suggestedUser) => (
              <div key={suggestedUser.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <img
                  src={suggestedUser.avatar}
                  alt={suggestedUser.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{suggestedUser.name}</div>
                  <div className="text-xs text-navy-600">
                    {suggestedUser.role} • {suggestedUser.location}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs border-navy-200 text-cobalt-700">
                  Connect
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/search" className="text-sm text-cobalt-600 hover:text-cobalt-700 font-medium">
              Find more mentors →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
