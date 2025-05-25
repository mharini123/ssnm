"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Eye, Ban, Heart, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProfilesListProps {
  onNavigate: (page: string, profileId?: string) => void
}

const mockProfiles = [
  {
    id: "1",
    name: "Priya S",
    age: 27,
    gender: "Female",
    location: "Bangalore",
    education: "B.Com",
    occupation: "Accountant",
    maritalStatus: "Never Married",
    subscriptionCategory: "yellow",
    status: "active",
    joinedDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Karthik M",
    age: 28,
    gender: "Male",
    location: "Chennai",
    education: "B.E",
    occupation: "Software Engineer",
    maritalStatus: "Never Married",
    subscriptionCategory: "green",
    status: "active",
    joinedDate: "2024-02-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Anitha K",
    age: 23,
    gender: "Female",
    location: "Coimbatore",
    education: "M.A",
    occupation: "Teacher",
    maritalStatus: "Never Married",
    subscriptionCategory: "blue",
    status: "pending",
    joinedDate: "2024-03-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Senthil R",
    age: 31,
    gender: "Male",
    location: "Madurai",
    education: "MBA",
    occupation: "Business",
    maritalStatus: "Divorced",
    subscriptionCategory: "yellow",
    status: "active",
    joinedDate: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Lakshmi P",
    age: 25,
    gender: "Female",
    location: "Salem",
    education: "B.Sc",
    occupation: "Nurse",
    maritalStatus: "Never Married",
    subscriptionCategory: "green",
    status: "active",
    joinedDate: "2024-02-28",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function ProfilesList({ onNavigate }: ProfilesListProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("")
  const [subscriptionFilter, setSubscriptionFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])

  const itemsPerPage = 5

  const filteredProfiles = mockProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.occupation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGender = !genderFilter || profile.gender.toLowerCase() === genderFilter
    const matchesSubscription = !subscriptionFilter || profile.subscriptionCategory === subscriptionFilter
    const matchesStatus = !statusFilter || profile.status === statusFilter

    return matchesSearch && matchesGender && matchesSubscription && matchesStatus
  })

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId) ? prev.filter((id) => id !== profileId) : [...prev, profileId],
    )
  }

  const getSubscriptionColor = (category: string) => {
    switch (category) {
      case "yellow":
        return "bg-yellow-100 text-yellow-800"
      case "green":
        return "bg-green-100 text-green-800"
      case "blue":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Profiles ({filteredProfiles.length})</span>
            {user?.role === "admin" && selectedProfiles.length > 0 && (
              <Button onClick={() => onNavigate("bulk-print")} className="bg-red-700 hover:bg-red-800">
                Print Selected ({selectedProfiles.length})
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            {user?.role === "admin" && (
              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subscriptions</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                </SelectContent>
              </Select>
            )}

            {user?.role === "admin" && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setGenderFilter("")
                setSubscriptionFilter("")
                setStatusFilter("")
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {user?.role === "admin" && (
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProfiles(paginatedProfiles.map((p) => p.id))
                          } else {
                            setSelectedProfiles([])
                          }
                        }}
                        checked={selectedProfiles.length === paginatedProfiles.length && paginatedProfiles.length > 0}
                      />
                    </TableHead>
                  )}
                  <TableHead>Profile</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Occupation</TableHead>
                  {user?.role === "admin" && <TableHead>Subscription</TableHead>}
                  {user?.role === "admin" && <TableHead>Status</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    {user?.role === "admin" && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedProfiles.includes(profile.id)}
                          onChange={() => handleSelectProfile(profile.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile.name}</p>
                          <p className="text-sm text-gray-600">{profile.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{profile.age}</TableCell>
                    <TableCell>{profile.location}</TableCell>
                    <TableCell>{profile.education}</TableCell>
                    <TableCell>{profile.occupation}</TableCell>
                    {user?.role === "admin" && (
                      <TableCell>
                        <Badge className={getSubscriptionColor(profile.subscriptionCategory)}>
                          {profile.subscriptionCategory}
                        </Badge>
                      </TableCell>
                    )}
                    {user?.role === "admin" && (
                      <TableCell>
                        <Badge className={getStatusColor(profile.status)}>{profile.status}</Badge>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => onNavigate("profile-detail", profile.id)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>

                        {user?.role === "user" && (
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                        )}

                        {user?.role === "admin" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Full Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="w-4 h-4 mr-2" />
                                Block Profile
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProfiles.length)} of{" "}
              {filteredProfiles.length} profiles
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
