
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, ZAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Calendar, Phone, CheckCircle2, XCircle, Video, TrendingUp } from "lucide-react";

// Mock data for the investor dashboard
const investmentData = [
  { name: "Q1 2022", amount: 250000 },
  { name: "Q2 2022", amount: 320000 },
  { name: "Q3 2022", amount: 180000 },
  { name: "Q4 2022", amount: 420000 },
  { name: "Q1 2023", amount: 350000 },
  { name: "Q2 2023", amount: 480000 }
];

const portfolioData = [
  { name: "SaaS", value: 45 },
  { name: "Fintech", value: 30 },
  { name: "Health Tech", value: 15 },
  { name: "Others", value: 10 },
];

const returnData = [
  { name: "Jan", return: 2.1 },
  { name: "Feb", return: 3.5 },
  { name: "Mar", return: 4.2 },
  { name: "Apr", return: 3.8 },
  { name: "May", return: 5.1 },
  { name: "Jun", return: 6.3 }
];

const startupAnalysisData = [
  { x: 35, y: 30, z: 300, name: 'Alpha AI' },
  { x: 65, y: 25, z: 200, name: 'Beta Robotics' },
  { x: 75, y: 70, z: 500, name: 'Gamma Tech' },
  { x: 45, y: 80, z: 400, name: 'Delta Health' },
  { x: 25, y: 50, z: 250, name: 'Epsilon Finance' },
  { x: 60, y: 40, z: 350, name: 'Zeta Security' }
];

const COLORS = ["#0047cc", "#3372ff", "#85aaff", "#b3c6eb"];

interface InvestorDashboardProps {
  user: User;
}

export default function InvestorDashboard({ user }: InvestorDashboardProps) {
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
          <div className="text-sm text-navy-600 mb-2">Total Investments</div>
          <div className="text-3xl font-semibold">$2.1M</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 22% from last year</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Active Portfolio</div>
          <div className="text-3xl font-semibold">12 Companies</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 2 new this year</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Average ROI</div>
          <div className="text-3xl font-semibold">18.5%</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 3.2% from last year</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <div className="text-sm text-navy-600 mb-2">Potential Deals</div>
          <div className="text-3xl font-semibold">8</div>
          <div className="mt-2 text-xs text-cobalt-600">↑ 3 this quarter</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Investment History</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={investmentData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Investment"]} />
                <Area type="monotone" dataKey="amount" stroke="#0047cc" fill="#3372ff" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Portfolio Distribution</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {portfolioData.map((entry, index) => (
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
          <h3 className="text-md font-medium mb-2">Monthly Returns</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={returnData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`${value}%`, "Return"]} />
                <Line type="monotone" dataKey="return" stroke="#0047cc" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-md font-medium mb-2">Startup Analysis</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Growth" tick={{fontSize: 10}} />
                <YAxis type="number" dataKey="y" name="Risk" tick={{fontSize: 10}} />
                <ZAxis type="number" dataKey="z" range={[60, 200]} name="Size" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={startupAnalysisData} fill="#3372ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connection Requests</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((startup) => (
              <div key={startup.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={startup.avatar}
                  alt={startup.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{startup.name}</div>
                  <div className="text-sm text-navy-600">
                    {startup.role} • {startup.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200" 
                    onClick={() => handleConnectionAction(startup.name, 'decline')}
                  >
                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                    Decline
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="h-8 bg-cobalt-600 hover:bg-cobalt-700" 
                    onClick={() => handleConnectionAction(startup.name, 'accept')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Meetings</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(3, 6).map((contact, index) => (
              <div key={contact.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-navy-600">
                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Friday"}, {3 + index}:00 PM • Pitch Meeting
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(contact.name, 'message')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(contact.name, 'call')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="h-8 border-navy-200 text-navy-700 hover:bg-navy-50"
                    onClick={() => handleStartCall(contact.name, 'video')}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 bg-cobalt-600 hover:bg-cobalt-700"
                    onClick={() => handleStartCall(contact.name, 'meeting')}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">{MOCK_USERS[index]?.name || `Startup ${index + 1}`}</div>
                <Badge className={
                  index === 0 ? "bg-green-100 text-green-800" :
                  index === 1 ? "bg-yellow-100 text-yellow-800" :
                  index === 2 ? "bg-cobalt-100 text-cobalt-800" :
                  "bg-navy-100 text-navy-800"
                }>
                  {item.name}
                </Badge>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-sm text-navy-600">Investment: ${(200000 + index * 50000).toLocaleString()}</div>
                <div className="ml-auto flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {(index * 2 + 6)}%
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 border-navy-200"
                    onClick={() => handleStartCall(MOCK_USERS[index]?.name || `Startup ${index + 1}`, 'message')}
                  >
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 border-navy-200"
                    onClick={() => handleStartCall(MOCK_USERS[index]?.name || `Startup ${index + 1}`, 'call')}
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 text-xs border-navy-200 bg-cobalt-600 hover:bg-cobalt-700"
                  >
                    Details
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
