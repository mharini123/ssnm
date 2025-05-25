"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AdvancedSearchProps {
  onNavigate: (page: string) => void
}

export function AdvancedSearch({ onNavigate }: AdvancedSearchProps) {
  const { t } = useLanguage()
  const [searchFilters, setSearchFilters] = useState({
    lookingFor: "",
    ageRange: [21, 35],
    heightRange: [150, 180],
    maritalStatus: "",
    education: "",
    occupation: "",
    location: "",
    religion: "",
    caste: "",
    motherTongue: "",
    income: "",
    physicalStatus: "",
    familyType: "",
    familyStatus: "",
    familyValues: "",
    diet: "",
    smoking: "",
    drinking: "",
  })

  const handleFilterChange = (key: string, value: any) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setSearchFilters({
      lookingFor: "",
      ageRange: [21, 35],
      heightRange: [150, 180],
      maritalStatus: "",
      education: "",
      occupation: "",
      location: "",
      religion: "",
      caste: "",
      motherTongue: "",
      income: "",
      physicalStatus: "",
      familyType: "",
      familyStatus: "",
      familyValues: "",
      diet: "",
      smoking: "",
      drinking: "",
    })
  }

  const handleSearch = () => {
    // Implement search logic here
    onNavigate("profiles")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Advanced Search</span>
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Basic Information</h3>

              <div className="space-y-2">
                <Label>Looking For</Label>
                <Select
                  value={searchFilters.lookingFor}
                  onValueChange={(value) => handleFilterChange("lookingFor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bride">Bride</SelectItem>
                    <SelectItem value="groom">Groom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Age Range: {searchFilters.ageRange[0]} - {searchFilters.ageRange[1]} years
                </Label>
                <Slider
                  value={searchFilters.ageRange}
                  onValueChange={(value) => handleFilterChange("ageRange", value)}
                  max={60}
                  min={18}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Height Range: {searchFilters.heightRange[0]} - {searchFilters.heightRange[1]} cm
                </Label>
                <Slider
                  value={searchFilters.heightRange}
                  onValueChange={(value) => handleFilterChange("heightRange", value)}
                  max={200}
                  min={140}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Select
                  value={searchFilters.maritalStatus}
                  onValueChange={(value) => handleFilterChange("maritalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never-married">Never Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Enter city or state"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
            </div>

            {/* Education & Career */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Education & Career</h3>

              <div className="space-y-2">
                <Label>Education</Label>
                <Select
                  value={searchFilters.education}
                  onValueChange={(value) => handleFilterChange("education", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Occupation</Label>
                <Select
                  value={searchFilters.occupation}
                  onValueChange={(value) => handleFilterChange("occupation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software Professional</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="government">Government Employee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Annual Income</Label>
                <Select value={searchFilters.income} onValueChange={(value) => handleFilterChange("income", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0 - 3 Lakhs</SelectItem>
                    <SelectItem value="3-5">3 - 5 Lakhs</SelectItem>
                    <SelectItem value="5-10">5 - 10 Lakhs</SelectItem>
                    <SelectItem value="10-15">10 - 15 Lakhs</SelectItem>
                    <SelectItem value="15+">15+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Religious & Cultural */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Religious & Cultural</h3>

              <div className="space-y-2">
                <Label>Religion</Label>
                <Select value={searchFilters.religion} onValueChange={(value) => handleFilterChange("religion", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                    <SelectItem value="muslim">Muslim</SelectItem>
                    <SelectItem value="sikh">Sikh</SelectItem>
                    <SelectItem value="buddhist">Buddhist</SelectItem>
                    <SelectItem value="jain">Jain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Caste</Label>
                <Select value={searchFilters.caste} onValueChange={(value) => handleFilterChange("caste", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="devangar">Devangar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mother Tongue</Label>
                <Select
                  value={searchFilters.motherTongue}
                  onValueChange={(value) => handleFilterChange("motherTongue", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="malayalam">Malayalam</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Family Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Family Details</h3>

              <div className="space-y-2">
                <Label>Family Type</Label>
                <Select
                  value={searchFilters.familyType}
                  onValueChange={(value) => handleFilterChange("familyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint Family</SelectItem>
                    <SelectItem value="nuclear">Nuclear Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Family Status</Label>
                <Select
                  value={searchFilters.familyStatus}
                  onValueChange={(value) => handleFilterChange("familyStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="middle">Middle Class</SelectItem>
                    <SelectItem value="upper-middle">Upper Middle Class</SelectItem>
                    <SelectItem value="rich">Rich</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Family Values</Label>
                <Select
                  value={searchFilters.familyValues}
                  onValueChange={(value) => handleFilterChange("familyValues", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orthodox">Orthodox</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="liberal">Liberal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Lifestyle</h3>

              <div className="space-y-2">
                <Label>Diet</Label>
                <Select value={searchFilters.diet} onValueChange={(value) => handleFilterChange("diet", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="jain">Jain Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Smoking</Label>
                <Select value={searchFilters.smoking} onValueChange={(value) => handleFilterChange("smoking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Drinking</Label>
                <Select value={searchFilters.drinking} onValueChange={(value) => handleFilterChange("drinking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800">Physical Attributes</h3>

              <div className="space-y-2">
                <Label>Physical Status</Label>
                <Select
                  value={searchFilters.physicalStatus}
                  onValueChange={(value) => handleFilterChange("physicalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="physically-challenged">Physically Challenged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={handleSearch} size="lg" className="bg-red-700 hover:bg-red-800">
              <Search className="w-5 h-5 mr-2" />
              Search Profiles
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
