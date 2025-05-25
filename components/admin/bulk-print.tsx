"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Printer, Download, FileText, X, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface BulkPrintProps {
  onNavigate: (page: string) => void
}

const mockSelectedProfiles = [
  {
    id: "1",
    name: "Priya S",
    age: 27,
    gender: "Female",
    location: "Bangalore",
    education: "B.Com",
    occupation: "Accountant",
    subscriptionCategory: "yellow",
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
    subscriptionCategory: "green",
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
    subscriptionCategory: "yellow",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function BulkPrint({ onNavigate }: BulkPrintProps) {
  const { t } = useLanguage()
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(mockSelectedProfiles.map((p) => p.id))
  const [printFormat, setPrintFormat] = useState("detailed")
  const [paperSize, setPaperSize] = useState("a4")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId) ? prev.filter((id) => id !== profileId) : [...prev, profileId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProfiles.length === mockSelectedProfiles.length) {
      setSelectedProfiles([])
    } else {
      setSelectedProfiles(mockSelectedProfiles.map((p) => p.id))
    }
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a mock PDF download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `profiles_${new Date().toISOString().split("T")[0]}.pdf`
    link.click()

    setIsGenerating(false)
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bulk Print Profiles</span>
            <Button variant="outline" onClick={() => onNavigate("profiles")}>
              <X className="w-4 h-4 mr-2" />
              Back to Profiles
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Print Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Print Format</label>
              <Select value={printFormat} onValueChange={setPrintFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">Detailed Profile</SelectItem>
                  <SelectItem value="summary">Summary Only</SelectItem>
                  <SelectItem value="biodata">Traditional Biodata</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Paper Size</label>
              <Select value={paperSize} onValueChange={setPaperSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleGeneratePDF}
                disabled={selectedProfiles.length === 0 || isGenerating}
                className="w-full bg-red-700 hover:bg-red-800"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Selected Profiles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Profiles ({selectedProfiles.length})</h3>
              <Button variant="outline" onClick={handleSelectAll}>
                {selectedProfiles.length === mockSelectedProfiles.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="grid gap-4">
              {mockSelectedProfiles.map((profile) => (
                <Card key={profile.id} className="border-2 border-dashed">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedProfiles.includes(profile.id)}
                          onCheckedChange={() => handleSelectProfile(profile.id)}
                        />

                        <Avatar>
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-semibold">{profile.name}</h4>
                          <p className="text-sm text-gray-600">
                            {profile.age} years • {profile.gender} • {profile.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {profile.education} • {profile.occupation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getSubscriptionColor(profile.subscriptionCategory)}>
                          {profile.subscriptionCategory}
                        </Badge>
                        {selectedProfiles.includes(profile.id) && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProfiles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No profiles selected for printing</p>
                <p className="text-sm">Select profiles from the list above to generate PDF</p>
              </div>
            )}
          </div>

          {/* Print Preview Info */}
          {selectedProfiles.length > 0 && (
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Printer className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Print Preview</h4>
                    <p className="text-sm text-blue-700">
                      {selectedProfiles.length} profile(s) will be printed in {printFormat} format on{" "}
                      {paperSize.toUpperCase()} paper.
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Estimated pages: {selectedProfiles.length * (printFormat === "detailed" ? 2 : 1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
