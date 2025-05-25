"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  GraduationCap,
  Users,
  Star,
  Phone,
  ChevronLeft,
  ChevronRight,
  Download,
  Flag,
  User,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface ProfileDetailProps {
  profileId?: string
  onNavigate: (page: string) => void
}

// Mock profile data
const mockProfile = {
  id: "1",
  name: "Priya Sharma",
  age: 27,
  gender: "Female",
  profileImage: "/placeholder.svg?height=400&width=400",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],

  // Basic Details
  dateOfBirth: "1997-03-15",
  height: "5'4\"",
  weight: "55 kg",
  maritalStatus: "Never Married",
  physicalStatus: "Normal",
  bodyType: "Average",
  complexion: "Fair",

  // Education & Career
  education: "Master of Computer Applications (MCA)",
  occupation: "Software Engineer",
  workingWith: "Private Company",
  workingAs: "Software Developer",
  employedIn: "Software/IT",
  annualIncome: "8-10 Lakhs",
  workLocation: "Bangalore",

  // Location
  country: "India",
  state: "Karnataka",
  city: "Bangalore",
  residentialStatus: "Citizen",

  // Religious Information
  religion: "Hindu",
  caste: "Devangar",
  subCaste: "Devangar",
  gotra: "Bharadwaj",
  star: "Rohini",
  rashi: "Vrishabha",
  motherTongue: "Kannada",

  // Family Details
  familyType: "Joint Family",
  familyStatus: "Middle Class",
  familyValues: "Traditional",
  fatherName: "Rajesh Sharma",
  fatherOccupation: "Business",
  motherName: "Sunita Sharma",
  motherOccupation: "Homemaker",
  brothers: 1,
  sisters: 0,

  // Lifestyle
  diet: "Vegetarian",
  smoking: "No",
  drinking: "No",

  // About
  aboutMe:
    "I am a software engineer working in Bangalore. I come from a traditional family and believe in maintaining a balance between modern thinking and traditional values. I enjoy reading, traveling, and spending time with family. Looking for a life partner who shares similar values and interests.",

  // Partner Preferences
  partnerPreferences: {
    ageRange: "25-30",
    heightRange: "5'6\" - 6'0\"",
    maritalStatus: "Never Married",
    education: "Graduate or above",
    occupation: "Any",
    income: "5 Lakhs and above",
    location: "Bangalore, Chennai, Hyderabad",
    caste: "Devangar",
    diet: "Vegetarian",
    smoking: "No",
    drinking: "No",
  },

  // Contact
  contactNumber: "9876543210",
  email: "priya.sharma@email.com",

  // Metadata
  profileCreated: "2024-01-15",
  lastActive: "2 hours ago",
  profileViews: 156,
  subscriptionCategory: "green",
  verified: true,
  compatibility: 92,
}

export function ProfileDetail({ profileId, onNavigate }: ProfileDetailProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const profile = mockProfile // In real app, fetch by profileId

  const handleExpressInterest = () => {
    toast({
      title: t("interestSent"),
      description: `Interest sent to ${profile.name}`,
    })
  }

  const handleSendMessage = () => {
    onNavigate("messages")
  }

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? t("removedFromFavorites") : t("addedToFavorites"),
      description: `${profile.name} ${isFavorite ? "removed from" : "added to"} favorites`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name}'s Profile`,
        text: `Check out ${profile.name}'s profile on SSNM`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard",
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profile.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profile.images.length) % profile.images.length)
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getCompatibilityText = (score: number) => {
    if (score >= 90) return t("perfectMatch")
    if (score >= 75) return t("goodMatch")
    if (score >= 60) return t("averageMatch")
    return t("lowMatch")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => onNavigate("profiles")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("back")}
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            {t("share")}
          </Button>
          {user?.role === "admin" && (
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t("download")}
            </Button>
          )}
          {user?.role === "user" && (
            <Button variant="outline">
              <Flag className="w-4 h-4 mr-2" />
              {t("reportIssue")}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={profile.images[currentImageIndex] || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                />

                {profile.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {profile.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                {profile.verified && <Badge className="absolute top-4 right-4 bg-green-600">{t("verified")}</Badge>}
              </div>

              <div className="p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-gray-600">
                    {profile.age} {t("age")}
                  </p>

                  <div className="flex items-center justify-center mt-2 space-x-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.city}, {profile.state}
                    </div>
                  </div>

                  {user?.role === "user" && (
                    <div className="mt-4">
                      <div className={`text-2xl font-bold ${getCompatibilityColor(profile.compatibility)}`}>
                        {profile.compatibility}% {t("compatibility")}
                      </div>
                      <p className="text-sm text-gray-600">{getCompatibilityText(profile.compatibility)}</p>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">{t("height")}</p>
                      <p className="font-semibold">{profile.height}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t("education")}</p>
                      <p className="font-semibold">{profile.education.split(" ")[0]}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t("occupation")}</p>
                      <p className="font-semibold">{profile.occupation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t("income")}</p>
                      <p className="font-semibold">{profile.annualIncome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {user?.role === "user" && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button onClick={handleExpressInterest} className="w-full bg-red-600 hover:bg-red-700">
                    <Heart className="w-4 h-4 mr-2" />
                    {t("expressInterest")}
                  </Button>
                  <Button onClick={handleSendMessage} variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("sendMessage")}
                  </Button>
                  <Button
                    onClick={handleAddToFavorites}
                    variant="outline"
                    className={`w-full ${isFavorite ? "bg-yellow-50 border-yellow-300" : ""}`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    {isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">{t("basicDetails")}</TabsTrigger>
              <TabsTrigger value="family">{t("familyDetails")}</TabsTrigger>
              <TabsTrigger value="preferences">{t("partnerPreferences")}</TabsTrigger>
              <TabsTrigger value="contact">{t("contactDetails")}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {t("basicDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("fullName")}</label>
                      <p className="font-semibold">{profile.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("age")}</label>
                      <p className="font-semibold">
                        {profile.age} {t("age")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("dateOfBirth")}</label>
                      <p className="font-semibold">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("gender")}</label>
                      <p className="font-semibold">{t(profile.gender.toLowerCase())}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("height")}</label>
                      <p className="font-semibold">{profile.height}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("weight")}</label>
                      <p className="font-semibold">{profile.weight}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("maritalStatus")}</label>
                      <p className="font-semibold">{t("neverMarried")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("physicalStatus")}</label>
                      <p className="font-semibold">{t("normal")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("bodyType")}</label>
                      <p className="font-semibold">Average</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("complexion")}</label>
                      <p className="font-semibold">Fair</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education & Career */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    {t("education")} & {t("occupation")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("education")}</label>
                      <p className="font-semibold">{profile.education}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("occupation")}</label>
                      <p className="font-semibold">{profile.occupation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Working With</label>
                      <p className="font-semibold">{profile.workingWith}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Working As</label>
                      <p className="font-semibold">{profile.workingAs}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Employed In</label>
                      <p className="font-semibold">{profile.employedIn}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("income")}</label>
                      <p className="font-semibold">{profile.annualIncome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Work Location</label>
                      <p className="font-semibold">{profile.workLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Religious Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    {t("religiousInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("religion")}</label>
                      <p className="font-semibold">{profile.religion}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("caste")}</label>
                      <p className="font-semibold">{profile.caste}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("subCaste")}</label>
                      <p className="font-semibold">{profile.subCaste}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("gotra")}</label>
                      <p className="font-semibold">{profile.gotra}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("star")}</label>
                      <p className="font-semibold">{profile.star}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("rashi")}</label>
                      <p className="font-semibold">{profile.rashi}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("motherTongue")}</label>
                      <p className="font-semibold">{profile.motherTongue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              <Card>
                <CardHeader>
                  <CardTitle>Lifestyle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("diet")}</label>
                      <p className="font-semibold">{t("vegetarian")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("smoking")}</label>
                      <p className="font-semibold">{t("no")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("drinking")}</label>
                      <p className="font-semibold">{t("no")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Me */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("aboutMe")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="family" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {t("familyDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("familyType")}</label>
                      <p className="font-semibold">{t("joint")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("familyStatus")}</label>
                      <p className="font-semibold">{t("middleClass")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("familyValues")}</label>
                      <p className="font-semibold">{t("traditional")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("fatherName")}</label>
                      <p className="font-semibold">{profile.fatherName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("fatherOccupation")}</label>
                      <p className="font-semibold">{profile.fatherOccupation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("motherName")}</label>
                      <p className="font-semibold">{profile.motherName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("motherOccupation")}</label>
                      <p className="font-semibold">{profile.motherOccupation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Brothers</label>
                      <p className="font-semibold">{profile.brothers}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sisters</label>
                      <p className="font-semibold">{profile.sisters}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("partnerPreferences")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("ageRange")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.ageRange}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("heightRange")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.heightRange}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("maritalStatus")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.maritalStatus}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("education")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.education}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("occupation")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.occupation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("income")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.income}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("location")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("caste")}</label>
                      <p className="font-semibold">{profile.partnerPreferences.caste}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("diet")}</label>
                      <p className="font-semibold">{t("vegetarian")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("smoking")}</label>
                      <p className="font-semibold">{t("no")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("drinking")}</label>
                      <p className="font-semibold">{t("no")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              {user?.role === "admin" || user?.id === profile.id ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      {t("contactDetails")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">{t("phoneNumber")}</label>
                        <p className="font-semibold">{profile.contactNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="font-semibold">{profile.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">{t("address")}</label>
                        <p className="font-semibold">
                          {profile.city}, {profile.state}, {profile.country}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Residential Status</label>
                        <p className="font-semibold">{profile.residentialStatus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Phone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">{t("contactDetails")}</h3>
                    <p className="text-gray-600 mb-4">Express interest or send a message to view contact details</p>
                    <div className="space-x-2">
                      <Button onClick={handleExpressInterest} className="bg-red-600 hover:bg-red-700">
                        <Heart className="w-4 h-4 mr-2" />
                        {t("expressInterest")}
                      </Button>
                      <Button onClick={handleSendMessage} variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t("sendMessage")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
