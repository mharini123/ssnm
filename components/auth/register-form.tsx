"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, User, Phone, Lock, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RegisterFormProps {
  onNavigate: (page: string) => void
  isAdminCreating?: boolean
}

export function RegisterForm({ onNavigate, isAdminCreating = false }: RegisterFormProps) {
  const { t } = useLanguage()
  const { register, isLoading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "" as "male" | "female",
    dateOfBirth: "",
    maritalStatus: "" as "first" | "remarriage",
    phoneNumber: "",
    subscriptionCategory: "" as "yellow" | "green" | "blue",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Age validation
    if (formData.dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(formData.dateOfBirth)
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) {
        newErrors.dateOfBirth = t("ageValidation")
      }
    }

    // Phone validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t("phoneValidation")
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("passwordMatch")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const success = await register(formData)

    if (success) {
      toast({
        title: t("registrationSuccess"),
        description: "Welcome to SSNM!",
      })
      if (!isAdminCreating) {
        onNavigate("user-dashboard")
      }
    } else {
      toast({
        title: "Registration Failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-800">
            {isAdminCreating ? t("createUser") : t("register")}
          </CardTitle>
          <CardDescription>
            {isAdminCreating ? "Create a new user account" : "Create your account to find your life partner"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">{t("gender")}</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: "male" | "female") => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">{t("maritalStatus")}</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value: "first" | "remarriage") => setFormData({ ...formData, maritalStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">{t("first")}</SelectItem>
                    <SelectItem value="remarriage">{t("remarriage")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>

              {isAdminCreating && (
                <div className="space-y-2">
                  <Label htmlFor="subscriptionCategory">{t("subscriptionCategory")}</Label>
                  <Select
                    value={formData.subscriptionCategory}
                    onValueChange={(value: "yellow" | "green" | "blue") =>
                      setFormData({ ...formData, subscriptionCategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yellow">{t("yellow")}</SelectItem>
                      <SelectItem value="green">{t("green")}</SelectItem>
                      <SelectItem value="blue">{t("blue")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-700 hover:bg-red-800" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isAdminCreating ? "Creating..." : "Registering..."}
                </>
              ) : isAdminCreating ? (
                t("createUser")
              ) : (
                t("register")
              )}
            </Button>
          </form>

          {!isAdminCreating && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button onClick={() => onNavigate("login")} className="text-red-600 hover:underline font-medium">
                  {t("login")} here
                </button>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
