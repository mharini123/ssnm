"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Search, Users, MessageCircle, Heart, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface UserSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function UserSidebar({ currentPage, onNavigate }: UserSidebarProps) {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      key: "user-dashboard",
      label: t("home"),
      icon: Home,
    },
    {
      key: "profiles",
      label: "Browse Profiles",
      icon: Users,
    },
    {
      key: "search",
      label: "Advanced Search",
      icon: Search,
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: Heart,
    },
    {
      key: "messages",
      label: "Messages",
      icon: MessageCircle,
    },
    {
      key: "report-issue",
      label: t("reportIssue"),
      icon: AlertCircle,
    },
  ]

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col bg-red-800 text-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-red-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-semibold">Navigation</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-red-700"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.key

            return (
              <li key={item.key}>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(item.key)}
                  className={cn(
                    "w-full justify-start text-white hover:bg-red-700",
                    isActive && "bg-red-900 hover:bg-red-900",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <Icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
