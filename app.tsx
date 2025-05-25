"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { LandingPage } from "@/components/landing-page"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Toaster } from "@/components/ui/toaster"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserSidebar } from "@/components/user/user-sidebar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { UserDashboard } from "@/components/user/user-dashboard"
import { ProfilesList } from "@/components/profiles/profiles-list"
import { ProfileDetail } from "@/components/profiles/profile-detail"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { BulkPrint } from "@/components/admin/bulk-print"
import { ReportIssue } from "@/components/user/report-issue"
import { Favorites } from "@/components/user/favorites"
import { Messages } from "@/components/user/messages"
import { Settings } from "@/components/settings/settings"

function AppContent() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState("landing")
  const [selectedProfileId, setSelectedProfileId] = useState<string>()

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setCurrentPage("dashboard")
      } else {
        setCurrentPage("user-dashboard")
      }
    } else {
      setCurrentPage("landing")
    }
  }, [user])

  const handleNavigate = (page: string, profileId?: string) => {
    setCurrentPage(page)
    if (profileId) {
      setSelectedProfileId(profileId)
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />
      case "login":
        return <LoginForm onNavigate={handleNavigate} />
      case "register":
        return <RegisterForm onNavigate={handleNavigate} />
      case "create-user":
        return <RegisterForm onNavigate={handleNavigate} isAdminCreating={true} />
      case "dashboard":
        return <AdminDashboard onNavigate={handleNavigate} />
      case "user-dashboard":
        return <UserDashboard onNavigate={handleNavigate} />
      case "profiles":
        return <ProfilesList onNavigate={handleNavigate} />
      case "profile-detail":
        return <ProfileDetail profileId={selectedProfileId} onNavigate={handleNavigate} />
      case "search":
        return <AdvancedSearch onNavigate={handleNavigate} />
      case "bulk-print":
        return <BulkPrint onNavigate={handleNavigate} />
      case "report-issue":
        return <ReportIssue onNavigate={handleNavigate} />
      case "favorites":
        return <Favorites onNavigate={handleNavigate} />
      case "messages":
        return <Messages onNavigate={handleNavigate} selectedProfileId={selectedProfileId} />
      case "settings":
        return <Settings onNavigate={handleNavigate} />
      case "profile":
        return <Settings onNavigate={handleNavigate} />
      default:
        return (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace("-", " ")} Page
            </h1>
            <p className="text-gray-600 mb-8">This page is under development</p>
          </div>
        )
    }
  }

  const renderPage = () => {
    // Pages without sidebar (landing, auth pages)
    if (["landing", "login", "register"].includes(currentPage)) {
      return renderPageContent()
    }

    // Pages with sidebar for logged-in users
    if (user) {
      return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
          {user.role === "admin" ? (
            <AdminSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          ) : (
            <UserSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          )}
          <div className="flex-1 lg:ml-0">
            <div className="container mx-auto px-4 py-8">{renderPageContent()}</div>
          </div>
        </div>
      )
    }

    return renderPageContent()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <div className="pt-16">{renderPage()}</div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </LanguageProvider>
  )
}
