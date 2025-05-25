"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Heart, MessageCircle, Eye, Star, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

interface UserDashboardProps {
  onNavigate: (page: string) => void
}

const recentProfiles = [
  {
    id: "1",
    name: "Anitha K",
    age: 23,
    location: "Bangalore",
    education: "M.A",
    occupation: "Teacher",
    avatar: "/placeholder.svg?height=60&width=60",
    compatibility: 85,
  },
  {
    id: "2",
    name: "Senthil R",
    age: 31,
    location: "Chennai",
    education: "MBA",
    occupation: "Business",
    avatar: "/placeholder.svg?height=60&width=60",
    compatibility: 78,
  },
  {
    id: "3",
    name: "Lakshmi P",
    age: 25,
    location: "Coimbatore",
    education: "B.Sc",
    occupation: "Nurse",
    avatar: "/placeholder.svg?height=60&width=60",
    compatibility: 92,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "profile_view",
    message: "Your profile was viewed by Priya S",
    time: "2 hours ago",
    icon: Eye,
  },
  {
    id: 2,
    type: "interest",
    message: "You received interest from Karthik M",
    time: "5 hours ago",
    icon: Heart,
  },
  {
    id: 3,
    type: "message",
    message: "New message from Anitha K",
    time: "1 day ago",
    icon: MessageCircle,
  },
]

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const { t } = useLanguage()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-red-700 to-red-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
              <p className="text-red-100">Find your perfect life partner today</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-yellow-300" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interests Received</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-muted-foreground">2 unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">Saved profiles</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onNavigate("profiles")}
                className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
              >
                <Users className="w-6 h-6 mb-2" />
                Browse Profiles
              </Button>

              <Button
                onClick={() => onNavigate("search")}
                className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700"
              >
                <Search className="w-6 h-6 mb-2" />
                Advanced Search
              </Button>

              <Button
                onClick={() => onNavigate("favorites")}
                className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700"
              >
                <Heart className="w-6 h-6 mb-2" />
                My Favorites
              </Button>

              <Button
                onClick={() => onNavigate("messages")}
                className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700"
              >
                <MessageCircle className="w-6 h-6 mb-2" />
                Messages
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Profiles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recommended for You</span>
              <Button variant="outline" onClick={() => onNavigate("profiles")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentProfiles.map((profile) => (
                <Card key={profile.id} className="border-2 hover:border-red-300 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-600">{profile.age} years</p>
                      <p className="text-sm text-gray-600">{profile.location}</p>
                      <p className="text-sm text-gray-600">{profile.occupation}</p>

                      <div className="mt-3 flex items-center justify-center">
                        <Badge className="bg-green-100 text-green-800">{profile.compatibility}% Match</Badge>
                      </div>

                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700">Your profile is 75% complete</p>
              <p className="text-sm text-yellow-600">Add more details to get better matches</p>
            </div>
            <Button onClick={() => onNavigate("profile")} className="bg-yellow-600 hover:bg-yellow-700">
              Complete Profile
            </Button>
          </div>
          <div className="mt-3 w-full bg-yellow-200 rounded-full h-2">
            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
