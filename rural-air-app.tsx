"use client"

import { useState } from "react"
import { Search, Navigation, Sun, Cloud, CloudRain, Lightbulb, AlertTriangle, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function RuralAirApp() {
  const [currentAQI] = useState(78) // Mock AQI value
  const [currentLocation, setCurrentLocation] = useState("Springfield")
  const [activeNav, setActiveNav] = useState("Home")
  const [showAlert, setShowAlert] = useState(true)
  const [locationQuery, setLocationQuery] = useState("")

  // Mock data
  const forecastData = [
    { day: "Today", date: "Dec 26", aqi: 78, weather: "sunny", temp: "72°" },
    { day: "Thu", date: "Dec 27", aqi: 65, weather: "cloudy", temp: "68°" },
    { day: "Fri", date: "Dec 28", aqi: 52, weather: "rainy", temp: "64°" },
    { day: "Sat", date: "Dec 29", aqi: 45, weather: "sunny", temp: "70°" },
    { day: "Sun", date: "Dec 30", aqi: 58, weather: "cloudy", temp: "66°" },
  ]

  const historicalData = [
    { day: "Mon", aqi: 65 },
    { day: "Tue", aqi: 72 },
    { day: "Wed", aqi: 68 },
    { day: "Thu", aqi: 85 },
    { day: "Fri", aqi: 92 },
    { day: "Sat", aqi: 78 },
    { day: "Sun", aqi: 78 },
  ]

  const nearbyLocations = [
    { name: "Downtown", aqi: 82, x: 30, y: 40 },
    { name: "Park Area", aqi: 45, x: 60, y: 25 },
    { name: "Industrial", aqi: 95, x: 20, y: 70 },
    { name: "Suburbs", aqi: 38, x: 75, y: 60 },
  ]

  // AQI utility functions
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "text-green-600", bgColor: "bg-green-500" }
    if (aqi <= 100) return { status: "Moderate", color: "text-yellow-600", bgColor: "bg-yellow-500" }
    if (aqi <= 150) return { status: "Unhealthy for Sensitive", color: "text-orange-600", bgColor: "bg-orange-500" }
    if (aqi <= 200) return { status: "Unhealthy", color: "text-red-600", bgColor: "bg-red-500" }
    return { status: "Very Unhealthy", color: "text-purple-600", bgColor: "bg-purple-500" }
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "sunny":
        return <Sun className="w-4 h-4 text-yellow-500" />
      case "cloudy":
        return <Cloud className="w-4 h-4 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-4 h-4 text-blue-500" />
      default:
        return <Sun className="w-4 h-4 text-yellow-500" />
    }
  }

  const shouldShowAlert = currentAQI > 100
  const aqiConfig = getAQIStatus(currentAQI)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold text-gray-900">RuralAir</h1>
            <div className="flex space-x-6">
              {["Home", "Forecast", "Map", "Settings"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeNav === item ? "text-blue-600" : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Alert Banner - Only if AQI is unhealthy */}
      {shouldShowAlert && showAlert && (
        <div className="bg-orange-500 text-white px-4 py-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Air quality is unhealthy for sensitive groups in {currentLocation}</span>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-white hover:text-orange-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* AQI Meter */}
        <div className="flex justify-center">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(currentAQI / 200) * 351.86} 351.86`}
                  className={aqiConfig.color}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-gray-900">{currentAQI}</div>
                <div className="text-xs text-gray-500">AQI</div>
              </div>
            </div>
            <div className={cn("text-sm font-medium", aqiConfig.color)}>{aqiConfig.status}</div>
            <div className="text-xs text-gray-500 mt-1">{currentLocation}</div>
          </div>
        </div>

        {/* Location Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search location..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm" className="px-3">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">5-Day Forecast</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {forecastData.map((day, index) => {
                const dayConfig = getAQIStatus(day.aqi)
                return (
                  <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div className="text-xs text-gray-500 mb-2">{day.date}</div>
                    <div className="mb-2">{getWeatherIcon(day.weather)}</div>
                    <div className="text-xs text-gray-600 mb-1">{day.temp}</div>
                    <div className={cn("text-sm font-medium", dayConfig.color)}>{day.aqi}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Graph */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Past 7 Days</h3>
              <div className="h-32 flex items-end justify-between space-x-1">
                {historicalData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                    <div className="text-xs text-gray-500">{day.aqi}</div>
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(day.aqi / 120) * 80}px` }} />
                    <div className="text-xs text-gray-400">{day.day}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Nearby Areas</h3>
              <div className="relative h-32 bg-gray-100 rounded">
                {nearbyLocations.map((location, index) => {
                  const locationConfig = getAQIStatus(location.aqi)
                  return (
                    <div
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${location.x}%`, top: `${location.y}%` }}
                    >
                      <div
                        className={cn("w-4 h-4 rounded-full border-2 border-white shadow-sm", locationConfig.bgColor)}
                        title={`${location.name}: ${location.aqi} AQI`}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Did You Know Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Did You Know?</h4>
                <p className="text-sm text-blue-800">
                  Air quality is typically best in the early morning hours, making it ideal for outdoor exercise and
                  activities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Compact Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex space-x-4 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="text-sm">
              Powered by{" "}
              <a href="https://iqair.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                IQAir
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
