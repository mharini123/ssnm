"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Send, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface ReportIssueProps {
  onNavigate: (page: string) => void
}

export function ReportIssue({ onNavigate }: ReportIssueProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [issueForm, setIssueForm] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "medium",
  })

  const whatsappNumber = "9786543210"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `
*Issue Report from SSNM*

*User:* ${user?.fullName}
*Phone:* ${user?.phoneNumber}
*Category:* ${issueForm.category}
*Subject:* ${issueForm.subject}
*Priority:* ${issueForm.priority}

*Description:*
${issueForm.description}

*Reported at:* ${new Date().toLocaleString()}
    `.trim()

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Issue Reported",
      description: "Your issue has been sent via WhatsApp. We'll get back to you soon!",
    })

    // Reset form
    setIssueForm({
      category: "",
      subject: "",
      description: "",
      priority: "medium",
    })
  }

  const handleQuickMessage = (message: string) => {
    const quickMessage = `
*Quick Message from SSNM*

*User:* ${user?.fullName}
*Phone:* ${user?.phoneNumber}

*Message:* ${message}

*Sent at:* ${new Date().toLocaleString()}
    `.trim()

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            Report an Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Issue Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select
                    value={issueForm.category}
                    onValueChange={(value) => setIssueForm({ ...issueForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile">Profile Issues</SelectItem>
                      <SelectItem value="search">Search Problems</SelectItem>
                      <SelectItem value="messaging">Messaging Issues</SelectItem>
                      <SelectItem value="payment">Payment/Subscription</SelectItem>
                      <SelectItem value="technical">Technical Problems</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of the issue"
                    value={issueForm.subject}
                    onChange={(e) => setIssueForm({ ...issueForm, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={issueForm.priority}
                    onValueChange={(value) => setIssueForm({ ...issueForm, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your issue in detail..."
                    value={issueForm.description}
                    onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!issueForm.category || !issueForm.subject || !issueForm.description}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </div>

            {/* Quick Actions & Contact Info */}
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickMessage("I need help with my profile")}
                  >
                    Profile Help
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickMessage("I'm having trouble with search functionality")}
                  >
                    Search Issues
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickMessage("I need assistance with messaging")}
                  >
                    Messaging Help
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickMessage("I have a payment/subscription question")}
                  >
                    Payment Support
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">WhatsApp Support</p>
                      <p className="text-sm text-gray-600">+91 {whatsappNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-gray-600">Usually within 2-4 hours</p>
                    </div>
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-sm text-gray-600">9:00 AM - 8:00 PM (Mon-Sat)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Tips for Better Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>• Be specific about the issue you're facing</li>
                    <li>• Include screenshots if possible</li>
                    <li>• Mention the device/browser you're using</li>
                    <li>• Provide your registered phone number</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
