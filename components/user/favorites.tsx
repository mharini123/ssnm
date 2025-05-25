"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, MessageCircle, Search, Filter, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

interface FavoritesProps {
  onNavigate: (page: string, profileId?: string) => void
}

const mockFavorites = [
  {
    id: "1",
    name: "Anitha K",
    age: 23,
    location: "Bangalore",
    education: "M.A",
    occupation: "Teacher",
    avatar: "/placeholder.svg?height=80&width=80",
    compatibility: 85,
    addedDate: "2024-03-01",
    lastActive: "2 hours ago",
    maritalStatus: "Never Married",
    height: "5'4\"",
  },
  {
    id: "2",
    name: "Lakshmi P",
    age: 25,
    location: "Coimbatore",
    education: "B.Sc",
    occupation: "Nurse",
    avatar: "/placeholder.svg?height=80&width=80",
    compatibility: 92,
    addedDate: "2024-02-28",
    lastActive: "1 day ago",
    maritalStatus: "Never Married",
    height: "5'3\"",
  },
  {
    id: "3",
    name: "Priya M",
    age: 26,
    location: "Chennai",
    education: "B.E",
    occupation: "Software Engineer",
    avatar: "/placeholder.svg?height=80&width=80",
    compatibility: 78,
    addedDate: "2024-02-25",
    lastActive: "3 days ago",
    maritalStatus: "Never Married",
    height: "5'5\"",
  },
  {
    id: "4",
    name: "Divya S",
    age: 24,
    location: "Madurai",
    education: "MBA",
    occupation: "Marketing",
    avatar: "/placeholder.svg?height=80&width=80",
    compatibility: 88,
    addedDate: "2024-02-20",
    lastActive: "1 week ago",
    maritalStatus: "Never Married",
    height: "5'2\"",
  },
]

export function Favorites({ onNavigate }: FavoritesProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState(mockFavorites)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("")

  const handleRemoveFromFavorites = (profileId: string, profileName: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== profileId))
    toast({
      title: t("removedFromFavorites"),
      description: `${profileName} removed from favorites`,
    })
  }

  const handleSendMessage = (profileId: string) => {
    onNavigate("messages", profileId)
  }

  const filteredFavorites = favorites
    .filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.occupation.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter =
        !filterBy ||
        (filterBy === "high-compatibility" && profile.compatibility >= 85) ||
        (filterBy === "recent" && new Date(profile.addedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (filterBy === "active" && profile.lastActive.includes("hours"))

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "compatibility":
          return b.compatibility - a.compatibility
        case "name":
          return a.name.localeCompare(b.name)
        case "age":
          return a.age - b.age
        case "recent":
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      }
    })

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              {t("favorites")} ({filteredFavorites.length})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`${t("search")} ${t("favorites").toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="compatibility">Compatibility</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Favorites</SelectItem>
                <SelectItem value="high-compatibility">High Compatibility (85%+)</SelectItem>
                <SelectItem value="recent">Added This Week</SelectItem>
                <SelectItem value="active">Recently Active</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSortBy("recent")
                setFilterBy("")
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              {t("clearFilters")}
            </Button>
          </div>

          {/* Favorites Grid */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((profile) => (
                <Card key={profile.id} className="border-2 hover:border-red-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-3">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-gray-600">
                        {profile.age} {t("age")} • {profile.height}
                      </p>
                      <p className="text-sm text-gray-600">{profile.location}</p>
                      <p className="text-sm text-gray-600">{profile.occupation}</p>

                      <div className="mt-3 flex items-center justify-center">
                        <Badge className={`${getCompatibilityColor(profile.compatibility)} bg-transparent border`}>
                          {profile.compatibility}% {t("compatibility")}
                        </Badge>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        <p>Added: {new Date(profile.addedDate).toLocaleDateString()}</p>
                        <p>Last active: {profile.lastActive}</p>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => onNavigate("profile-detail", profile.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t("view")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleSendMessage(profile.id)}>
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleRemoveFromFavorites(profile.id, profile.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || filterBy ? t("noResultsFound") : "No Favorites Yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterBy
                  ? t("refineSearch")
                  : "Start adding profiles to your favorites to see them here"}
              </p>
              {!searchTerm && !filterBy && (
                <Button onClick={() => onNavigate("profiles")} className="bg-red-600 hover:bg-red-700">
                  {t("browseProfiles")}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
