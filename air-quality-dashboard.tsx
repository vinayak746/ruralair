"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Wind,
  Eye,
  Droplets,
  Thermometer,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
} from "lucide-react"

export default function Component() {
  // Mock data for the dashboard
  const currentAQI = 42
  const location = "Springfield"
  const lastUpdated = "2 minutes ago"

  const pollutants = [
    { name: "PM2.5", value: 12, unit: "μg/m³", status: "Good" },
    { name: "PM10", value: 24, unit: "μg/m³", status: "Good" },
    { name: "O3", value: 68, unit: "μg/m³", status: "Moderate" },
    { name: "NO2", value: 15, unit: "μg/m³", status: "Good" },
    { name: "SO2", value: 8, unit: "μg/m³", status: "Good" },
    { name: "CO", value: 0.4, unit: "mg/m³", status: "Good" },
  ]

  const forecast = [
    { day: "Today", aqi: 42, status: "Good" },
    { day: "Tomorrow", aqi: 38, status: "Good" },
    { day: "Wed", aqi: 55, status: "Moderate" },
    { day: "Thu", aqi: 48, status: "Good" },
    { day: "Fri", aqi: 52, status: "Moderate" },
  ]

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-600 bg-green-50 border-green-200"
    if (aqi <= 100) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    if (aqi <= 150) return "text-orange-600 bg-orange-50 border-orange-200"
    if (aqi <= 200) return "text-red-600 bg-red-50 border-red-200"
    return "text-purple-600 bg-purple-50 border-purple-200"
  }

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive Groups"
    if (aqi <= 200) return "Unhealthy"
    return "Very Unhealthy"
  }

  const getPollutantColor = (status: string) => {
    switch (status) {
      case "Good":
        return "text-green-600 bg-green-50"
      case "Moderate":
        return "text-yellow-600 bg-yellow-50"
      case "Unhealthy":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AirWatch</h1>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search location..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Current AQI */}
        <div className="mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <h2 className="text-2xl font-bold text-gray-900">{location}</h2>
                </div>

                <div className="mb-6">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{currentAQI}</div>
                  <Badge className={`text-lg px-4 py-2 ${getAQIColor(currentAQI)}`}>{getAQIStatus(currentAQI)}</Badge>
                </div>

                <div className="flex items-center justify-center space-x-2 text-gray-500 mb-8">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Updated {lastUpdated}</span>
                </div>

                {/* Current Pollutant Levels */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {pollutants.map((pollutant) => (
                    <div key={pollutant.name} className="text-center">
                      <div className="text-sm font-medium text-gray-500 mb-1">{pollutant.name}</div>
                      <div className="text-lg font-bold text-gray-900">{pollutant.value}</div>
                      <div className="text-xs text-gray-400 mb-2">{pollutant.unit}</div>
                      <Badge className={`text-xs ${getPollutantColor(pollutant.status)}`}>{pollutant.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 5-Day Forecast */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>5-Day Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecast.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900 w-16">{day.day}</div>
                      <Badge className={`text-xs ${getAQIColor(day.aqi)}`}>{day.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{day.aqi}</span>
                      {index > 0 &&
                        (day.aqi > forecast[index - 1].aqi ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historical Graph */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>24-Hour Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-1">
                {/* Mock chart bars */}
                {[32, 28, 35, 42, 38, 45, 52, 48, 44, 40, 38, 42].map((value, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div className="text-xs text-gray-500">{value}</div>
                    <div
                      className="w-6 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                      style={{ height: `${(value / 60) * 200}px` }}
                    />
                    <div className="text-xs text-gray-400">
                      {index % 4 === 0 ? `${6 + Math.floor(index / 2)}:00` : ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average (24h)</span>
                  <span className="font-semibold text-blue-600">40 AQI</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map and Weather Info */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Location & Weather</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock map placeholder */}
              <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Interactive Map</div>
                  <div className="text-xs text-gray-400">Air Quality Stations</div>
                </div>
              </div>

              {/* Weather conditions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Temperature</span>
                  </div>
                  <span className="font-semibold">72°F</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <span className="font-semibold">65%</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Wind Speed</span>
                  </div>
                  <span className="font-semibold">8 mph</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  <span className="font-semibold">10 mi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Recommendations */}
        <Card className="mt-8 bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Health Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">General Public</h4>
                <p className="text-sm text-green-700">
                  Air quality is good. Perfect for outdoor activities and exercise.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Sensitive Groups</h4>
                <p className="text-sm text-green-700">
                  Air quality is acceptable. Enjoy your normal outdoor activities.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Outdoor Exercise</h4>
                <p className="text-sm text-blue-700">
                  Great conditions for running, cycling, and other outdoor sports.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
