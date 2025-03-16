import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ProfileCard";
import { Link } from "react-router-dom";
import Post from "@/components/Post";

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

const COLORS = ["#0d9488", "#10b981", "#34d399"];

interface MentorDashboardProps {
  user: User;
}

export default function MentorDashboard({ user }: MentorDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Total Earnings</div>
          <div className="text-3xl font-semibold">$3,100</div>
          <div className="mt-2 text-xs text-green-600">↑ 18% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Active Mentees</div>
          <div className="text-3xl font-semibold">{user.connections || 0}</div>
          <div className="mt-2 text-xs text-green-600">↑ 5 new this month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Session Rating</div>
          <div className="text-3xl font-semibold">4.8/5</div>
          <div className="mt-2 text-xs text-green-600">↑ 0.2 from last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Monthly Earnings</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Session Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                  <div className="text-sm text-muted-foreground">
                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Friday"}, {2 + index}:00 PM • 45 min session
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Reschedule
                  </Button>
                  <Button variant="default" size="sm" className="h-8 bg-primary hover:bg-primary/90">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/calendar" className="text-sm text-primary hover:text-primary/90 font-medium">
              View full calendar →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((mentee) => (
              <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div className="font-medium">{mentee.name}</div>
                  <div className="ml-auto text-amber-500 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  "Great session! Really helped me understand the key concepts and provided practical advice."
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/reviews" className="text-sm text-primary hover:text-primary/90 font-medium">
              View all reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
