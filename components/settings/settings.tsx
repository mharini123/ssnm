"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SettingsIcon, User, Bell, Shield, Globe, Eye, Lock, Smartphone, Mail, Save } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface SettingsProps {
  onNavigate: (page: string) => void
}

export function Settings({ onNavigate }: SettingsProps) {
  const { t, language, setLanguage } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    // Profile Settings
    profileVisibility: "public",
    showContactInfo: false,
    showLastSeen: true,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newMessageNotifications: true,
    interestNotifications: true,
    profileViewNotifications: false,

    // Privacy Settings
    whoCanViewProfile: "all",
    whoCanSendMessages: "all",
    whoCanSeeContactInfo: "interested",
    blockAnonymousViews: false,

    // Communication Settings
    autoReplyEnabled: false,
    autoReplyMessage: "",

    // Account Settings
    twoFactorEnabled: false,
    loginAlerts: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // In real app, save to backend
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    })
  }

  const handleLanguageChange = (newLanguage: "en" | "ta") => {
    setLanguage(newLanguage)
    toast({
      title: "Language Updated",
      description: `Language changed to ${newLanguage === "en" ? "English" : "Tamil"}`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            {t("settings")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* Profile Visibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Eye className="w-5 h-5 mr-2" />
                    Profile Visibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to all</SelectItem>
                        <SelectItem value="members">Members Only</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Contact Information</Label>
                      <p className="text-sm text-gray-600">Allow others to see your contact details</p>
                    </div>
                    <Switch
                      checked={settings.showContactInfo}
                      onCheckedChange={(checked) => handleSettingChange("showContactInfo", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Last Seen</Label>
                      <p className="text-sm text-gray-600">Let others know when you were last active</p>
                    </div>
                    <Switch
                      checked={settings.showLastSeen}
                      onCheckedChange={(checked) => handleSettingChange("showLastSeen", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Globe className="w-5 h-5 mr-2" />
                    Language Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Interface Language</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              {/* Email Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Message Notifications</Label>
                      <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                    </div>
                    <Switch
                      checked={settings.newMessageNotifications}
                      onCheckedChange={(checked) => handleSettingChange("newMessageNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Interest Notifications</Label>
                      <p className="text-sm text-gray-600">Get notified when someone expresses interest</p>
                    </div>
                    <Switch
                      checked={settings.interestNotifications}
                      onCheckedChange={(checked) => handleSettingChange("interestNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile View Notifications</Label>
                      <p className="text-sm text-gray-600">Get notified when someone views your profile</p>
                    </div>
                    <Switch
                      checked={settings.profileViewNotifications}
                      onCheckedChange={(checked) => handleSettingChange("profileViewNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Mobile Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              {/* Profile Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2" />
                    Profile Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Who can view your profile</Label>
                    <Select
                      value={settings.whoCanViewProfile}
                      onValueChange={(value) => handleSettingChange("whoCanViewProfile", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="mutual">Mutual Interests Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Who can send you messages</Label>
                    <Select
                      value={settings.whoCanSendMessages}
                      onValueChange={(value) => handleSettingChange("whoCanSendMessages", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="interested">Interested Members Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Who can see your contact information</Label>
                    <Select
                      value={settings.whoCanSeeContactInfo}
                      onValueChange={(value) => handleSettingChange("whoCanSeeContactInfo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No One</SelectItem>
                        <SelectItem value="interested">Interested Members</SelectItem>
                        <SelectItem value="mutual">Mutual Interests</SelectItem>
                        <SelectItem value="premium">Premium Members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Block Anonymous Profile Views</Label>
                      <p className="text-sm text-gray-600">Prevent anonymous users from viewing your profile</p>
                    </div>
                    <Switch
                      checked={settings.blockAnonymousViews}
                      onCheckedChange={(checked) => handleSettingChange("blockAnonymousViews", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Communication Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Bell className="w-5 h-5 mr-2" />
                    Communication Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Reply</Label>
                      <p className="text-sm text-gray-600">Automatically reply to new messages</p>
                    </div>
                    <Switch
                      checked={settings.autoReplyEnabled}
                      onCheckedChange={(checked) => handleSettingChange("autoReplyEnabled", checked)}
                    />
                  </div>

                  {settings.autoReplyEnabled && (
                    <div className="space-y-2">
                      <Label>Auto Reply Message</Label>
                      <Input
                        placeholder="Enter your auto reply message..."
                        value={settings.autoReplyMessage}
                        onChange={(e) => handleSettingChange("autoReplyMessage", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Lock className="w-5 h-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorEnabled}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => handleSettingChange("loginAlerts", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Account Type</Label>
                      <p className="font-semibold">{user?.role === "admin" ? "Administrator" : "User"}</p>
                    </div>
                    <div>
                      <Label>Member Since</Label>
                      <p className="font-semibold">January 2024</p>
                    </div>
                    <div>
                      <Label>Subscription</Label>
                      <p className="font-semibold capitalize">{user?.subscriptionCategory || "Basic"}</p>
                    </div>
                    <div>
                      <Label>Profile Status</Label>
                      <p className="font-semibold text-green-600">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
              <Save className="w-4 h-4 mr-2" />
              {t("save")} {t("settings")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
