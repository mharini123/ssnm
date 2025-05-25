"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Phone, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LoginFormProps {
  onNavigate: (page: string) => void
}

export function LoginForm({ onNavigate }: LoginFormProps) {
  const { t } = useLanguage()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await login(formData.phoneNumber, formData.password)

    if (success) {
      toast({
        title: t("loginSuccess"),
        description: "Welcome back!",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid phone number or password",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-800">{t("login")}</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-700 hover:bg-red-800" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                t("login")
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button onClick={() => onNavigate("register")} className="text-red-600 hover:underline font-medium">
                {t("register")} here
              </button>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo credentials:</p>
            <p className="text-xs">Admin: 9876543210 / admin123</p>
            <p className="text-xs">User: 9876543211 / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
