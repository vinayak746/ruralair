"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Plus, X, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationData {
  name: string
  aqi: number
  trend: "up" | "down" | "stable"
  change: number
}

export default function AirQualityComparison() {
  const [locations, setLocations] = useState<LocationData[]>([
    { name: "New York", aqi: 85, trend: "down", change: -5 },
    { name: "Delhi", aqi: 201, trend: "up", change: 12 },
  ])
  const [newLocation, setNewLocation] = useState("")

  const mockLocationData: { [key: string]: LocationData } = {
    Mumbai: { name: "Mumbai", aqi: 168, trend: "stable", change: 0 },
    London: { name: "London", aqi: 67, trend: "down", change: -8 },
    Tokyo: { name: "Tokyo", aqi: 45, trend: "stable", change: 2 },
    Beijing: { name: "Beijing", aqi: 178, trend: "up", change: 15 },
    "Los Angeles": { name: "Los Angeles", aqi: 156, trend: "down", change: -3 },
    Paris: { name: "Paris", aqi: 73, trend: "stable", change: 1 },
  }

  const addLocation = () => {
    if (newLocation && mockLocationData[newLocation] && locations.length < 5) {
      setLocations([...locations, mockLocationData[newLocation]])
      setNewLocation("")
    }
  }

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index))
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-600 bg-green-100"
    if (aqi <= 100) return "text-yellow-600 bg-yellow-100"
    if (aqi <= 150) return "text-orange-600 bg-orange-100"
    if (aqi <= 200) return "text-red-600 bg-red-100"
    return "text-purple-600 bg-purple-100"
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-red-500" />
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-green-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Air Quality Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Location */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter city name..."
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addLocation()}
          />
          <Button onClick={addLocation} size="sm" disabled={locations.length >= 5}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Locations List */}
        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{location.name}</span>
                </div>
                <div className={cn("px-2 py-1 rounded-full text-sm font-medium", getAQIColor(location.aqi))}>
                  {location.aqi} AQI
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(location.trend, location.change)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {location.change > 0 ? `+${location.change}` : location.change}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => removeLocation(index)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Best/Worst Summary */}
        {locations.length > 1 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">Best Air Quality</div>
              <div className="font-semibold text-green-800 dark:text-green-300">
                {locations.reduce((best, loc) => (loc.aqi < best.aqi ? loc : best)).name}
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-sm text-red-600 dark:text-red-400 font-medium">Worst Air Quality</div>
              <div className="font-semibold text-red-800 dark:text-red-300">
                {locations.reduce((worst, loc) => (loc.aqi > worst.aqi ? loc : worst)).name}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
