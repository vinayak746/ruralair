"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, Minus, Play, Pause, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineData {
  time: string
  hour: number
  aqi: number
  trend: "up" | "down" | "stable"
  events: string[]
  weather: {
    temp: number
    humidity: number
    wind: number
  }
}

interface AirQualityTimelineProps {
  location: string
  className?: string
}

export default function AirQualityTimeline({ location, className }: AirQualityTimelineProps) {
  const [currentHour, setCurrentHour] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  // Mock 24-hour timeline data
  const timelineData: TimelineData[] = [
    {
      time: "12 AM",
      hour: 0,
      aqi: 45,
      trend: "stable",
      events: ["Low traffic"],
      weather: { temp: 62, humidity: 78, wind: 5 },
    },
    {
      time: "1 AM",
      hour: 1,
      aqi: 42,
      trend: "down",
      events: ["Minimal activity"],
      weather: { temp: 61, humidity: 80, wind: 4 },
    },
    {
      time: "2 AM",
      hour: 2,
      aqi: 38,
      trend: "down",
      events: ["Night cleaning crews"],
      weather: { temp: 60, humidity: 82, wind: 3 },
    },
    {
      time: "3 AM",
      hour: 3,
      aqi: 35,
      trend: "down",
      events: ["Lowest pollution"],
      weather: { temp: 59, humidity: 85, wind: 3 },
    },
    {
      time: "4 AM",
      hour: 4,
      aqi: 40,
      trend: "up",
      events: ["Early commuters"],
      weather: { temp: 58, humidity: 83, wind: 4 },
    },
    {
      time: "5 AM",
      hour: 5,
      aqi: 52,
      trend: "up",
      events: ["Rush hour begins"],
      weather: { temp: 60, humidity: 80, wind: 6 },
    },
    {
      time: "6 AM",
      hour: 6,
      aqi: 68,
      trend: "up",
      events: ["Heavy traffic", "School buses"],
      weather: { temp: 63, humidity: 75, wind: 8 },
    },
    {
      time: "7 AM",
      hour: 7,
      aqi: 85,
      trend: "up",
      events: ["Peak traffic", "Industrial activity"],
      weather: { temp: 66, humidity: 70, wind: 10 },
    },
    {
      time: "8 AM",
      hour: 8,
      aqi: 95,
      trend: "up",
      events: ["Office hours", "Construction"],
      weather: { temp: 69, humidity: 65, wind: 12 },
    },
    {
      time: "9 AM",
      hour: 9,
      aqi: 88,
      trend: "down",
      events: ["Traffic subsides"],
      weather: { temp: 72, humidity: 60, wind: 14 },
    },
    {
      time: "10 AM",
      hour: 10,
      aqi: 75,
      trend: "down",
      events: ["Mid-morning lull"],
      weather: { temp: 75, humidity: 55, wind: 15 },
    },
    {
      time: "11 AM",
      hour: 11,
      aqi: 82,
      trend: "up",
      events: ["Increased activity"],
      weather: { temp: 78, humidity: 50, wind: 16 },
    },
    {
      time: "12 PM",
      hour: 12,
      aqi: 92,
      trend: "up",
      events: ["Lunch traffic", "Peak sun"],
      weather: { temp: 82, humidity: 45, wind: 18 },
    },
    {
      time: "1 PM",
      hour: 13,
      aqi: 105,
      trend: "up",
      events: ["Afternoon heat", "Ozone formation"],
      weather: { temp: 85, humidity: 42, wind: 20 },
    },
    {
      time: "2 PM",
      hour: 14,
      aqi: 118,
      trend: "up",
      events: ["Peak ozone", "Industrial emissions"],
      weather: { temp: 87, humidity: 40, wind: 22 },
    },
    {
      time: "3 PM",
      hour: 15,
      aqi: 125,
      trend: "up",
      events: ["School pickup", "Afternoon traffic"],
      weather: { temp: 86, humidity: 43, wind: 20 },
    },
    {
      time: "4 PM",
      hour: 16,
      aqi: 135,
      trend: "up",
      events: ["Rush hour", "Peak pollution"],
      weather: { temp: 84, humidity: 45, wind: 18 },
    },
    {
      time: "5 PM",
      hour: 17,
      aqi: 142,
      trend: "up",
      events: ["Heavy traffic", "Commuter peak"],
      weather: { temp: 81, humidity: 48, wind: 16 },
    },
    {
      time: "6 PM",
      hour: 18,
      aqi: 128,
      trend: "down",
      events: ["Traffic easing"],
      weather: { temp: 78, humidity: 52, wind: 14 },
    },
    {
      time: "7 PM",
      hour: 19,
      aqi: 115,
      trend: "down",
      events: ["Dinner time"],
      weather: { temp: 75, humidity: 55, wind: 12 },
    },
    {
      time: "8 PM",
      hour: 20,
      aqi: 98,
      trend: "down",
      events: ["Evening activities"],
      weather: { temp: 72, humidity: 60, wind: 10 },
    },
    {
      time: "9 PM",
      hour: 21,
      aqi: 82,
      trend: "down",
      events: ["Reduced traffic"],
      weather: { temp: 69, humidity: 65, wind: 8 },
    },
    {
      time: "10 PM",
      hour: 22,
      aqi: 68,
      trend: "down",
      events: ["Night begins"],
      weather: { temp: 66, humidity: 70, wind: 6 },
    },
    {
      time: "11 PM",
      hour: 23,
      aqi: 55,
      trend: "down",
      events: ["Low activity"],
      weather: { temp: 64, humidity: 75, wind: 5 },
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentHour((prev) => (prev + 1) % 24)
    }, 1000 / playbackSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed])

  const getAQIConfig = (aqi: number) => {
    if (aqi <= 50) return { color: "#10B981", status: "Good", bgColor: "bg-green-100" }
    if (aqi <= 100) return { color: "#F59E0B", status: "Moderate", bgColor: "bg-yellow-100" }
    if (aqi <= 150) return { color: "#F97316", status: "Unhealthy*", bgColor: "bg-orange-100" }
    if (aqi <= 200) return { color: "#EF4444", status: "Unhealthy", bgColor: "bg-red-100" }
    return { color: "#8B5CF6", status: "Very Unhealthy", bgColor: "bg-purple-100" }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const currentData = timelineData[currentHour]
  const config = getAQIConfig(currentData.aqi)

  return (
    <Card className={cn("bg-white shadow-lg border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          24-Hour Air Quality Timeline
        </CardTitle>
        <p className="text-sm text-gray-600">{location} • Hourly predictions and patterns</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current time display */}
        <div className={cn("text-center p-6 rounded-lg", config.bgColor)}>
          <div className="text-3xl font-bold mb-2" style={{ color: config.color }}>
            {currentData.time}
          </div>
          <div className="text-5xl font-bold mb-2" style={{ color: config.color }}>
            {currentData.aqi}
          </div>
          <div className="text-lg font-semibold mb-2" style={{ color: config.color }}>
            {config.status}
          </div>
          <div className="flex items-center justify-center gap-2">
            {getTrendIcon(currentData.trend)}
            <span className="text-sm text-gray-600">
              {currentData.trend === "up" ? "Increasing" : currentData.trend === "down" ? "Decreasing" : "Stable"}
            </span>
          </div>
        </div>

        {/* Timeline visualization */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">24-Hour Overview</h4>
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" size="sm">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : playbackSpeed === 2 ? 4 : 1)}
                variant="outline"
                size="sm"
              >
                <SkipForward className="w-4 h-4" />
                {playbackSpeed}x
              </Button>
            </div>
          </div>

          {/* Timeline bar */}
          <div className="relative">
            <div className="flex h-16 bg-gray-100 rounded-lg overflow-hidden">
              {timelineData.map((data, index) => {
                const config = getAQIConfig(data.aqi)
                const isActive = index === currentHour

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex-1 cursor-pointer transition-all duration-200 relative",
                      isActive && "ring-2 ring-blue-500 ring-inset",
                    )}
                    style={{ backgroundColor: config.color + "40" }}
                    onClick={() => setCurrentHour(index)}
                  >
                    <div
                      className="w-full transition-all duration-300"
                      style={{
                        height: `${(data.aqi / 200) * 100}%`,
                        backgroundColor: config.color,
                        marginTop: `${100 - (data.aqi / 200) * 100}%`,
                      }}
                    />
                    {isActive && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{data.time}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Hour labels */}
            <div className="flex mt-2">
              {timelineData
                .filter((_, i) => i % 4 === 0)
                .map((data, index) => (
                  <div key={index} className="flex-1 text-center">
                    <span className="text-xs text-gray-500">{data.time}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Current hour details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weather conditions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-semibold text-blue-800 mb-3">Weather Conditions</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700">Temperature:</span>
                <span className="font-semibold text-blue-900">{currentData.weather.temp}°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Humidity:</span>
                <span className="font-semibold text-blue-900">{currentData.weather.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Wind Speed:</span>
                <span className="font-semibold text-blue-900">{currentData.weather.wind} mph</span>
              </div>
            </div>
          </div>

          {/* Events and factors */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-3">Contributing Factors</h5>
            <div className="space-y-2">
              {currentData.events.map((event, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2">
                  {event}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Daily summary */}
        <div className="border-t border-gray-200 pt-4">
          <h5 className="font-semibold text-gray-900 mb-3">Daily Summary</h5>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{Math.min(...timelineData.map((d) => d.aqi))}</div>
              <div className="text-xs text-gray-500">Best AQI</div>
              <div className="text-xs text-gray-400">
                {timelineData.find((d) => d.aqi === Math.min(...timelineData.map((d) => d.aqi)))?.time}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{Math.max(...timelineData.map((d) => d.aqi))}</div>
              <div className="text-xs text-gray-500">Worst AQI</div>
              <div className="text-xs text-gray-400">
                {timelineData.find((d) => d.aqi === Math.max(...timelineData.map((d) => d.aqi)))?.time}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {Math.round(timelineData.reduce((sum, d) => sum + d.aqi, 0) / timelineData.length)}
              </div>
              <div className="text-xs text-gray-500">Average</div>
              <div className="text-xs text-gray-400">24 hours</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{timelineData.filter((d) => d.aqi > 100).length}</div>
              <div className="text-xs text-gray-500">Unhealthy Hours</div>
              <div className="text-xs text-gray-400">Today</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">Smart Recommendations</h5>
          <div className="text-sm text-yellow-700">
            {currentData.aqi <= 50
              ? "Perfect time for outdoor activities! Air quality is excellent."
              : currentData.aqi <= 100
                ? "Good time for most outdoor activities. Sensitive individuals should be cautious."
                : currentData.aqi <= 150
                  ? "Consider limiting outdoor activities. Best times today: 2-4 AM."
                  : "Avoid outdoor activities. Stay indoors and use air purifiers if available."}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
