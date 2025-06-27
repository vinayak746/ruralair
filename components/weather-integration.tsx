"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye } from "lucide-react"

interface WeatherIntegrationProps {
  location: string
  className?: string
}

export default function WeatherIntegration({ location, className }: WeatherIntegrationProps) {
  // Mock weather data - in real app, this would come from weather API
  const weatherData = {
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    condition: "partly_cloudy",
    uvIndex: 6,
    pressure: 1013,
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />
      case "partly_cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-500" />
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />
    }
  }

  const weatherMetrics = [
    {
      label: "Temperature",
      value: `${weatherData.temperature}°F`,
      icon: Thermometer,
      color: "text-orange-500",
    },
    {
      label: "Humidity",
      value: `${weatherData.humidity}%`,
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      label: "Wind Speed",
      value: `${weatherData.windSpeed} mph`,
      icon: Wind,
      color: "text-gray-500",
    },
    {
      label: "Visibility",
      value: `${weatherData.visibility} mi`,
      icon: Eye,
      color: "text-purple-500",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weatherData.condition)}
          Weather Conditions
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weatherMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <IconComponent className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{metric.value}</div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Weather Impact on Air Quality</h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Current wind conditions are helping to disperse pollutants. Humidity levels may affect particle
            concentration.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
