"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Menu,
  User,
  LogOut,
  Home,
  Users,
  Search,
  Heart,
  MessageCircle,
  AlertCircle,
  LayoutDashboard,
  UserPlus,
  Printer,
  Settings,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()

  const adminMenuItems = [
    { key: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { key: "profiles", label: t("browseProfiles"), icon: Users },
    { key: "create-user", label: t("createUser"), icon: UserPlus },
    { key: "bulk-print", label: t("bulkPrint"), icon: Printer },
    { key: "settings", label: t("settings"), icon: Settings },
  ]

  const userMenuItems = [
    { key: "user-dashboard", label: t("home"), icon: Home },
    { key: "profiles", label: t("browseProfiles"), icon: Users },
    { key: "search", label: t("advancedSearch"), icon: Search },
    { key: "favorites", label: t("favorites"), icon: Heart },
    { key: "messages", label: t("messages"), icon: MessageCircle },
    { key: "report-issue", label: t("reportIssue"), icon: AlertCircle },
  ]

  const guestMenuItems = [
    { key: "landing", label: t("home"), icon: Home },
    { key: "search", label: t("search"), icon: Search },
    { key: "about", label: t("about"), icon: Users },
    { key: "contact", label: t("contact"), icon: MessageCircle },
  ]

  const menuItems = user ? (user.role === "admin" ? adminMenuItems : userMenuItems) : guestMenuItems

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate(user ? (user.role === "admin" ? "dashboard" : "user-dashboard") : "landing")}
          >
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-tight">
                {t("matrimony")}
                <br />
                <span className="text-sm font-normal">SSNM</span>
              </h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold">SSNM</h1>
            </div>
          </div>

          {/* Desktop Navigation - Hidden when user is logged in (sidebar handles navigation) */}
          {!user && (
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    currentPage === item.key ? "bg-red-900 text-yellow-300" : "hover:bg-red-600",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              className="text-white hover:bg-red-600"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "en" ? "தமிழ்" : "English"}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
                    <User className="w-4 h-4 mr-2" />
                    {user.fullName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigate("profile")}>
                    <User className="w-4 h-4 mr-2" />
                    {t("myProfile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("settings")}>
                    <Settings className="w-4 h-4 mr-2" />
                    {t("settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("login")}
                  className="text-white hover:bg-red-600"
                >
                  {t("login")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate("register")}
                  className="bg-yellow-500 text-red-900 hover:bg-yellow-400"
                >
                  {t("register")}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              className="text-white hover:bg-red-600"
            >
              {language === "en" ? "த" : "En"}
            </Button>

            {/* Mobile Sidebar */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-red-800 text-white border-red-700">
                <SheetHeader>
                  <SheetTitle className="text-white text-left">
                    {user ? (user.role === "admin" ? t("dashboard") : t("home")) : t("matrimony")}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                  {/* User Info */}
                  {user && (
                    <div className="mb-6 p-4 bg-red-900 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-red-800" />
                        </div>
                        <div>
                          <p className="font-semibold">{user.fullName}</p>
                          <p className="text-sm text-red-200">{user.role === "admin" ? "Admin" : "User"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Menu */}
                  <nav className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = currentPage === item.key

                      return (
                        <button
                          key={item.key}
                          onClick={() => {
                            onNavigate(item.key)
                            setIsMobileMenuOpen(false)
                          }}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left",
                            isActive ? "bg-red-900 text-yellow-300" : "hover:bg-red-700",
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </nav>

                  {/* User Actions */}
                  {user && (
                    <div className="mt-6 pt-6 border-t border-red-700 space-y-2">
                      <button
                        onClick={() => {
                          onNavigate("profile")
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-700 text-left"
                      >
                        <User className="w-5 h-5" />
                        <span>{t("myProfile")}</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("settings")
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-700 text-left"
                      >
                        <Settings className="w-5 h-5" />
                        <span>{t("settings")}</span>
                      </button>
                      <button
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-700 text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>{t("logout")}</span>
                      </button>
                    </div>
                  )}

                  {/* Guest Actions */}
                  {!user && (
                    <div className="mt-6 pt-6 border-t border-red-700 space-y-2">
                      <button
                        onClick={() => {
                          onNavigate("login")
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-900 hover:bg-red-950"
                      >
                        {t("login")}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("register")
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-yellow-500 text-red-900 hover:bg-yellow-400"
                      >
                        {t("register")}
                      </button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
