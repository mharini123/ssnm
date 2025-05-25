"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, UserPlus, Printer, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      key: "dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      key: "profiles",
      label: "Profiles",
      icon: Users,
    },
    {
      key: "create-user",
      label: t("createUser"),
      icon: UserPlus,
    },
    {
      key: "bulk-print",
      label: t("bulkPrint"),
      icon: Printer,
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
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
          {!isCollapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
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
