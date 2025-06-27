"use client"

import { useState } from "react"
import Navigation from "./navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, Menu, NavigationIcon as NavIcon } from "lucide-react"

export default function NavigationDemo() {
  const [currentPage, setCurrentPage] = useState("Home")

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  // Demo content for different pages
  const getPageContent = () => {
    switch (currentPage) {
      case "Home":
        return {
          title: "Welcome to RuralAir",
          content: "Monitor air quality in rural areas with real-time data and forecasts.",
        }
      case "Forecast":
        return {
          title: "Air Quality Forecast",
          content: "View upcoming air quality predictions for the next 7 days.",
        }
      case "Map":
        return {
          title: "Interactive Map",
          content: "Explore air quality data across different locations on an interactive map.",
        }
      case "Tips":
        return {
          title: "Health Tips",
          content: "Learn how to protect yourself during different air quality conditions.",
        }
      case "Settings":
        return {
          title: "Settings",
          content: "Customize your air quality monitoring preferences and notifications.",
        }
      default:
        return {
          title: "RuralAir",
          content: "Your rural air quality monitoring companion.",
        }
    }
  }

  const pageContent = getPageContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Content */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">{pageContent.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">{pageContent.content}</p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Current Page:</strong> {currentPage}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Try navigating to different sections using the navigation bar above, or test the mobile menu by
                  resizing your browser window.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Desktop</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Full navigation menu with hover effects and active states for larger screens.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Mobile</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Collapsible hamburger menu with smooth animations and backdrop blur.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Menu className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Sticky</h3>
                </div>
                <p className="text-sm text-gray-600">Stays at the top while scrolling with enhanced shadow effects.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <NavIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Interactive</h3>
                </div>
                <p className="text-sm text-gray-600">Active page indicators and smooth transitions between states.</p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Instructions */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Try the Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {["Home", "Forecast", "Map", "Tips", "Settings"].map((page) => (
                    <Button
                      key={page}
                      onClick={() => handleNavigate(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Desktop:</strong> Click navigation links in the top bar to see active states and hover
                    effects.
                  </p>
                  <p>
                    <strong>Mobile:</strong> Resize your browser window or use developer tools to test the hamburger
                    menu.
                  </p>
                  <p>
                    <strong>Scroll:</strong> Scroll down to see the enhanced shadow effect on the sticky navigation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spacer for scroll testing */}
          <div className="h-96 flex items-center justify-center">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Scroll Test Area</h3>
                <p className="text-gray-600">
                  Scroll up and down to see the navigation bar's sticky behavior and shadow effects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
