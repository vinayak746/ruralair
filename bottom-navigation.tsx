"use client"

import { BarChart3, CloudSun, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: "dashboard" | "forecast" | "settings"
  onTabChange: (tab: "dashboard" | "forecast" | "settings") => void
  className?: string
}

export default function BottomNavigation({ activeTab, onTabChange, className }: BottomNavigationProps) {
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      id: "forecast" as const,
      label: "Forecast",
      icon: CloudSun,
    },
    {
      id: "settings" as const,
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 safe-area-pb",
        className,
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 px-3 py-2 rounded-xl transition-all duration-200 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "active:scale-95 touch-manipulation",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100",
              )}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon */}
              <div className="relative">
                <IconComponent
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive ? "text-blue-600 scale-110" : "text-gray-500",
                  )}
                />
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-medium mt-1 transition-all duration-200 truncate",
                  isActive ? "text-blue-600 font-semibold" : "text-gray-500",
                )}
              >
                {item.label}
              </span>

              {/* Active background indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-blue-100 rounded-xl opacity-20 -z-10 animate-in fade-in duration-200" />
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95" />
    </nav>
  )
}
