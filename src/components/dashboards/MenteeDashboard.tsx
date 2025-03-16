import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ProfileCard";
import { Link } from "react-router-dom";
import Post from "@/components/Post";

const connectionsData = [
  { name: "Jan", connections: 4 },
  { name: "Feb", connections: 7 },
  { name: "Mar", connections: 12 },
  { name: "Apr", connections: 15 },
  { name: "May", connections: 18 },
  { name: "Jun", connections: 24 }
];

interface MenteeDashboardProps {
  user: User;
}

export default function MenteeDashboard({ user }: MenteeDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Total Mentors</div>
          <div className="text-3xl font-semibold">{user.connections || 0}</div>
          <div className="mt-2 text-xs text-green-600">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Upcoming Sessions</div>
          <div className="text-3xl font-semibold">3</div>
          <div className="mt-2 text-xs text-green-600">↑ 2 more than last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Learning Progress</div>
          <div className="text-3xl font-semibold">68%</div>
          <div className="mt-2 text-xs text-green-600">↑ 15% from last month</div>
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Mentor Connections Growth</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={connectionsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="connections" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 2).map((mentor) => (
              <div key={mentor.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Tomorrow, 2:00 PM • 45 min session
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  Join
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/search" className="text-sm text-primary hover:text-primary/90 font-medium">
              Find more mentors →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recommended Mentors</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((suggestedUser) => (
              <div key={suggestedUser.id} className="flex items-center">
                <img
                  src={suggestedUser.avatar}
                  alt={suggestedUser.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div className="flex-grow">
                  <div className="font-medium">{suggestedUser.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {suggestedUser.role} • {suggestedUser.location}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Connect
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/search" className="text-sm text-primary hover:text-primary/90 font-medium">
              Find more mentors →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium line-clamp-1">{post.title}</div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {post.content.substring(0, 100)}...
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Read More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
