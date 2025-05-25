"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserCheck, UserX, TrendingUp, Eye, MessageSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AdminDashboardProps {
  onNavigate: (page: string) => void
}

const monthlyData = [
  { month: "Jan", registrations: 45, matches: 12 },
  { month: "Feb", registrations: 52, matches: 15 },
  { month: "Mar", registrations: 48, matches: 18 },
  { month: "Apr", registrations: 61, matches: 22 },
  { month: "May", registrations: 55, matches: 19 },
  { month: "Jun", registrations: 67, matches: 25 },
]

const genderData = [
  { name: "Male", value: 145, color: "#dc2626" },
  { name: "Female", value: 105, color: "#f59e0b" },
]

const subscriptionData = [
  { category: "Yellow", count: 120 },
  { category: "Green", count: 85 },
  { category: "Blue", count: 45 },
]

const pendingApprovals = [
  {
    id: 1,
    name: "Anitha K",
    age: 23,
    gender: "Female",
    location: "Bangalore",
    submittedAt: "2h ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Senthil R",
    age: 31,
    gender: "Male",
    location: "Chennai",
    submittedAt: "4h ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Priya M",
    age: 26,
    gender: "Female",
    location: "Coimbatore",
    submittedAt: "6h ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentMessages = [
  {
    id: 1,
    from: "Padma S",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    from: "Karthik M",
    message: "Need help with profile verification",
    time: "2h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">250</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">25</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">200</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Trends</CardTitle>
            <CardDescription>Monthly registrations and successful matches</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="registrations" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="matches" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Profile distribution by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Categories</CardTitle>
            <CardDescription>Distribution by subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Profiles waiting for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-gray-600">
                        {profile.age} yrs • {profile.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{profile.submittedAt}</Badge>
                    <Button size="sm" onClick={() => onNavigate("profiles")}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Latest messages from users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{message.from}</p>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
