
import { User } from "@/context/AuthContext";
import { MOCK_USERS, MOCK_POSTS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ProfileCard";
import { Link } from "react-router-dom";
import Post from "@/components/Post";

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

const COLORS = ["#0d9488", "#10b981", "#34d399", "#6ee7b7"];

interface InvestorDashboardProps {
  user: User;
}

export default function InvestorDashboard({ user }: InvestorDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Total Investments</div>
          <div className="text-3xl font-semibold">$2.1M</div>
          <div className="mt-2 text-xs text-green-600">↑ 22% from last year</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Active Portfolio</div>
          <div className="text-3xl font-semibold">12 Companies</div>
          <div className="mt-2 text-xs text-green-600">↑ 2 new this year</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">Average ROI</div>
          <div className="text-3xl font-semibold">18.5%</div>
          <div className="mt-2 text-xs text-green-600">↑ 3.2% from last year</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Investment History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Investment"]} />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Portfolio Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {portfolioData.map((entry, index) => (
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

      <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Monthly Returns</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={returnData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Return"]} />
              <Line type="monotone" dataKey="return" stroke="#0d9488" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Potential Investments</h3>
          <div className="space-y-4">
            {MOCK_USERS.slice(0, 3).map((startup) => (
              <div key={startup.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={startup.avatar}
                    alt={startup.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium">{startup.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {startup.role} • {startup.location}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {startup.bio.substring(0, 120)}...
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {startup.expertise?.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-block bg-accent-light text-primary text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/search" className="text-sm text-primary hover:text-primary/90 font-medium">
              Discover more startups →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Portfolio Updates</h3>
          <div className="space-y-4">
            {MOCK_POSTS.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div className="font-medium">{post.author.name}</div>
                  <div className="ml-auto text-xs text-muted-foreground">3 days ago</div>
                </div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {post.content.substring(0, 100)}...
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full">Read Update</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
