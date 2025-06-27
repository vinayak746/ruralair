"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import BottomNavigation from "./bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, CloudSun, Settings, Smartphone, ContactIcon as Touch } from "lucide-react"

export default function BottomNavDemo() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "forecast" | "settings">("dashboard")

  // Demo content for different tabs
  const getTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return {
          title: "Dashboard",
          content: "View current air quality data, AQI levels, and real-time monitoring information.",
          icon: BarChart3,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        }
      case "forecast":
        return {
          title: "Forecast",
          content: "Check upcoming air quality predictions, weather conditions, and planning recommendations.",
          icon: CloudSun,
          color: "text-green-600",
          bgColor: "bg-green-50",
        }
      case "settings":
        return {
          title: "Settings",
          content: "Customize your preferences, notifications, location settings, and app configuration.",
          icon: Settings,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        }
    }
  }

  const tabContent = getTabContent()
  const IconComponent = tabContent.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-2xl font-bold text-gray-900">Mobile Bottom Navigation</h1>
          <p className="text-gray-600 text-sm">Touch-friendly navigation bar with active state highlighting</p>
        </div>

        {/* Current Tab Content */}
        <Card className={cn("shadow-lg border-0", tabContent.bgColor)}>
          <CardHeader className="pb-4">
            <CardTitle className={cn("flex items-center gap-3", tabContent.color)}>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <IconComponent className="w-5 h-5" />
              </div>
              {tabContent.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{tabContent.content}</p>
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-white/50">
              <p className="text-sm text-gray-600">
                <strong>Active Tab:</strong> {tabContent.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tap the navigation buttons below to switch between different sections.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Touch className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Touch-Friendly</h3>
              </div>
              <p className="text-xs text-gray-600">
                Large touch targets (44px+) with proper spacing for comfortable mobile interaction.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Mobile Optimized</h3>
              </div>
              <p className="text-xs text-gray-600">
                Fixed bottom positioning with safe area support for devices with home indicators.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Visual Feedback</h3>
              </div>
              <p className="text-xs text-gray-600">
                Active state highlighting with color changes, scale animations, and indicator dots.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Design Features */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Design Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong>Minimal Design:</strong> Clean icons with labels, no unnecessary visual clutter
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong>Active Highlighting:</strong> Blue color scheme with background tint and indicator dot
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong>Smooth Animations:</strong> Scale effects on tap, fade transitions, and hover states
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <strong>Accessibility:</strong> Proper ARIA labels, focus states, and keyboard navigation
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">Try the Navigation</h3>
              <p className="text-xs text-gray-600">
                Tap the buttons in the bottom navigation bar to switch between Dashboard, Forecast, and Settings.
              </p>
              <div className="flex justify-center space-x-2 pt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacer for bottom navigation */}
        <div className="h-8"></div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
