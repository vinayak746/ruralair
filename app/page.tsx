"use client"

import { useState } from "react"
import Navigation from "../navigation"
import LocationInput from "../location-input"
import AQIMeter from "../aqi-meter"
import AQIAlertBanner from "../aqi-alert-banner"
import InfoTipCard from "../info-tip-card"
import AppFooter from "../app-footer"
import DarkModeToggle from "../dark-mode-toggle"
import { Wind, MapPin, TrendingUp, Calendar, Map, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import HealthRecommendations from "../components/health-recommendations"
import WeatherIntegration from "../components/weather-integration"
import AirQualityComparison from "../components/air-quality-comparison"
import PollutionSourceTracker from "../components/pollution-source-tracker"
import RealTimeAlerts from "../components/real-time-alerts"
import AirQualitySocialFeed from "../components/air-quality-social-feed"
import AirQualityTimeline from "../components/air-quality-timeline"

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState("")
  const [showLocationInput, setShowLocationInput] = useState(true)
  const [currentAQI, setCurrentAQI] = useState<number | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  // Enhanced AQI data with more Indian cities
  const getAQIForLocation = (location: string) => {
    const aqiData: { [key: string]: number } = {
      // US Cities
      "New York": 85,
      "Los Angeles": 156,
      Chicago: 42,
      Houston: 78,
      Phoenix: 134,
      Philadelphia: 67,
      "San Antonio": 45,
      "San Diego": 38,
      Dallas: 92,
      Austin: 56,

      // Indian Cities (Major metropolitan areas)
      Mumbai: 168,
      Delhi: 201,
      Bangalore: 89,
      Hyderabad: 134,
      Chennai: 112,
      Kolkata: 178,
      Pune: 95,
      Ahmedabad: 145,
      Jaipur: 167,
      Lucknow: 189,
      Kanpur: 195,
      Nagpur: 123,
      Indore: 156,
      Thane: 172,
      Bhopal: 134,
      Visakhapatnam: 98,
      Pimpri: 101,
      Patna: 203,
      Vadodara: 142,
      Ghaziabad: 187,

      // International
      London: 67,
      Paris: 73,
      Tokyo: 45,
      Sydney: 38,
      Toronto: 52,
      Beijing: 178,
      Shanghai: 145,
      "Current Location": 123,
    }
    return aqiData[location] || 75
  }

  const handleLocationSelect = (location: any) => {
    setCurrentLocation(location.name)
    const aqi = getAQIForLocation(location.name)
    setCurrentAQI(aqi)
    setShowLocationInput(false)
    setShowAlert(true)
  }

  const handleAlertDismiss = () => {
    setShowAlert(false)
  }

  const resetLocation = () => {
    setCurrentLocation("")
    setCurrentAQI(null)
    setShowLocationInput(true)
    setShowAlert(false)
  }

  // Navigation items for the main navigation cards
  const navigationItems = [
    {
      title: "5-Day Forecast",
      description: "View upcoming air quality predictions and weather",
      icon: Calendar,
      href: "/forecast",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Historical Data",
      description: "Analyze past air quality trends and patterns",
      icon: TrendingUp,
      href: "/historical",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Regional Map",
      description: "Explore air quality data across different locations",
      icon: Map,
      href: "/map",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Health Tips",
      description: "Get personalized air quality recommendations",
      icon: Lightbulb,
      href: "/tips",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <Navigation currentPage="Home" />

      {/* Alert Banner */}
      {showAlert && currentAQI && currentAQI > 100 && (
        <AQIAlertBanner aqi={currentAQI} location={currentLocation} onDismiss={handleAlertDismiss} />
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Wind className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">RuralAir</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Monitor air quality in your area with real-time data, forecasts, and health recommendations
            </p>

            {/* Dark Mode Toggle */}
            <div className="flex justify-center mb-8">
              <DarkModeToggle />
            </div>
          </div>

          {/* Main Navigation Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Explore Air Quality Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link key={item.title} href={item.href}>
                    <Card
                      className={`${item.bgColor} border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group h-full`}
                    >
                      <CardContent className="p-6 text-center h-full flex flex-col">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3
                          className={`font-semibold mb-2 ${item.iconColor} group-hover:scale-105 transition-transform duration-300`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{item.description}</p>
                        <div className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          Click to explore →
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Location Input or AQI Display */}
          {showLocationInput ? (
            <div className="max-w-md mx-auto mb-12">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Started</h3>
                <p className="text-gray-600 dark:text-gray-400">Enter your location to see current air quality</p>
              </div>
              <LocationInput
                onLocationSelect={handleLocationSelect}
                placeholder="Enter your location to get started..."
              />
            </div>
          ) : (
            <div className="mb-12">
              {/* Current Location Display */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{currentLocation}</span>
                  <button onClick={resetLocation} className="ml-2 text-sm text-blue-600 hover:text-blue-800 underline">
                    Change Location
                  </button>
                </div>
              </div>

              {/* AQI Meter */}
              {currentAQI && (
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="flex justify-center">
                    <AQIMeter value={currentAQI} size={240} strokeWidth={16} />
                  </div>
                </div>
              )}

              {/* Enhanced Feature Grid with New Components */}
              {currentAQI && (
                <div className="space-y-8 mb-12">
                  {/* First row - Real-time features */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RealTimeAlerts currentAQI={currentAQI} location={currentLocation} />
                    <HealthRecommendations aqi={currentAQI} />
                  </div>

                  {/* Second row - Timeline and Social Feed */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AirQualityTimeline location={currentLocation} />
                    <AirQualitySocialFeed />
                  </div>

                  {/* Third row - Weather and Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WeatherIntegration location={currentLocation} />
                    <PollutionSourceTracker location={currentLocation} />
                  </div>

                  {/* Fourth row - Comparison spans full width */}
                  <div>
                    <AirQualityComparison />
                  </div>
                </div>
              )}

              {/* Quick Actions for Current Location */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <Link
                  href="/forecast"
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">5-Day Forecast</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View upcoming air quality predictions</p>
                </Link>

                <Link
                  href="/historical"
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Historical Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Analyze past air quality trends</p>
                </Link>

                <Link
                  href="/map"
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Map className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Regional Map</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore nearby air quality data</p>
                </Link>

                <Link
                  href="/tips"
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Health Tips</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized recommendations</p>
                </Link>
              </div>
            </div>
          )}

          {/* Featured Tips - Now with different starting indices */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Air Quality Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoTipCard autoRotate={true} startIndex={0} />
              <InfoTipCard autoRotate={true} startIndex={3} />
              <InfoTipCard autoRotate={true} startIndex={6} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
