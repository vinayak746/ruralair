"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Cloudy, Wind } from "lucide-react"
import { cn } from "@/lib/utils"

interface ForecastDay {
  date: Date
  dayName: string
  weather: "sunny" | "cloudy" | "rainy" | "snowy" | "drizzle" | "overcast" | "windy"
  aqi: number
  temperature: {
    high: number
    low: number
  }
}

interface AQIForecastProps {
  className?: string
}

export default function AQIForecast({ className }: AQIForecastProps) {
  // Generate forecast data for next 5 days
  const generateForecast = (): ForecastDay[] => {
    const today = new Date()
    const weatherTypes: ForecastDay["weather"][] = ["sunny", "cloudy", "rainy", "overcast", "drizzle"]
    const aqiValues = [42, 38, 65, 48, 72] // Mock AQI values

    return Array.from({ length: 5 }, (_, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() + index)

      const dayNames = ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"]
      const dayName =
        index === 0 ? "Today" : index === 1 ? "Tomorrow" : date.toLocaleDateString("en-US", { weekday: "short" })

      return {
        date,
        dayName,
        weather: weatherTypes[index % weatherTypes.length],
        aqi: aqiValues[index],
        temperature: {
          high: 72 + Math.floor(Math.random() * 15),
          low: 58 + Math.floor(Math.random() * 10),
        },
      }
    })
  }

  const forecast = generateForecast()

  // Get weather icon component
  const getWeatherIcon = (weather: ForecastDay["weather"]) => {
    const iconProps = { className: "w-6 h-6" }

    switch (weather) {
      case "sunny":
        return <Sun {...iconProps} className="w-6 h-6 text-yellow-500" />
      case "cloudy":
        return <Cloudy {...iconProps} className="w-6 h-6 text-gray-500" />
      case "rainy":
        return <CloudRain {...iconProps} className="w-6 h-6 text-blue-500" />
      case "snowy":
        return <CloudSnow {...iconProps} className="w-6 h-6 text-blue-300" />
      case "drizzle":
        return <CloudDrizzle {...iconProps} className="w-6 h-6 text-blue-400" />
      case "overcast":
        return <Cloud {...iconProps} className="w-6 h-6 text-gray-600" />
      case "windy":
        return <Wind {...iconProps} className="w-6 h-6 text-gray-500" />
      default:
        return <Sun {...iconProps} className="w-6 h-6 text-yellow-500" />
    }
  }

  // Get AQI color classes
  const getAQIColors = (aqi: number) => {
    if (aqi <= 50) {
      return {
        bg: "bg-gradient-to-br from-green-400 to-green-500",
        text: "text-white",
        border: "border-green-300",
        shadow: "shadow-green-200",
      }
    } else if (aqi <= 100) {
      return {
        bg: "bg-gradient-to-br from-yellow-400 to-yellow-500",
        text: "text-white",
        border: "border-yellow-300",
        shadow: "shadow-yellow-200",
      }
    } else if (aqi <= 150) {
      return {
        bg: "bg-gradient-to-br from-orange-400 to-orange-500",
        text: "text-white",
        border: "border-orange-300",
        shadow: "shadow-orange-200",
      }
    } else if (aqi <= 200) {
      return {
        bg: "bg-gradient-to-br from-red-400 to-red-500",
        text: "text-white",
        border: "border-red-300",
        shadow: "shadow-red-200",
      }
    } else {
      return {
        bg: "bg-gradient-to-br from-purple-400 to-purple-500",
        text: "text-white",
        border: "border-purple-300",
        shadow: "shadow-purple-200",
      }
    }
  }

  // Get AQI status text
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive"
    if (aqi <= 200) return "Unhealthy"
    return "Very Unhealthy"
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">5-Day Air Quality Forecast</h3>
        <p className="text-sm text-gray-600">Scroll to see upcoming days</p>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {forecast.map((day, index) => {
            const colors = getAQIColors(day.aqi)

            return (
              <Card
                key={index}
                className={cn(
                  "flex-shrink-0 w-32 snap-start transition-all duration-300 hover:scale-105 cursor-pointer",
                  "border-2 shadow-lg hover:shadow-xl",
                  colors.border,
                  colors.shadow,
                )}
              >
                <CardContent className={cn("p-4 h-full", colors.bg, colors.text)}>
                  <div className="flex flex-col items-center space-y-3 text-center">
                    {/* Date */}
                    <div className="space-y-1">
                      <div className="text-sm font-semibold opacity-90">{day.dayName}</div>
                      <div className="text-xs opacity-75">
                        {day.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Weather Icon */}
                    <div className="flex justify-center">
                      <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">{getWeatherIcon(day.weather)}</div>
                    </div>

                    {/* Temperature */}
                    <div className="text-xs opacity-90">
                      <span className="font-medium">{day.temperature.high}°</span>
                      <span className="opacity-75">/{day.temperature.low}°</span>
                    </div>

                    {/* AQI */}
                    <div className="space-y-1">
                      <div className="text-2xl font-bold">{day.aqi}</div>
                      <div className="text-xs font-medium opacity-90">AQI</div>
                      <div className="text-xs opacity-75 leading-tight">{getAQIStatus(day.aqi)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-3 space-x-1">
          {forecast.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-200" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">AQI Scale</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">0-50 Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">51-100 Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">101-150 Unhealthy*</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">151-200 Unhealthy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-600">201+ Very Unhealthy</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">*Unhealthy for Sensitive Groups</p>
      </div>
    </div>
  )
}
