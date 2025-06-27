"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Dumbbell, Home, AlertTriangle } from "lucide-react"

interface HealthRecommendationsProps {
  aqi: number
  className?: string
}

export default function HealthRecommendations({ aqi, className }: HealthRecommendationsProps) {
  const getRecommendations = (aqiValue: number) => {
    if (aqiValue <= 50) {
      return {
        general: "Air quality is good. Perfect for all outdoor activities.",
        sensitive: "No restrictions. Enjoy outdoor activities.",
        exercise: "Great conditions for running, cycling, and sports.",
        indoor: "Normal ventilation is fine.",
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/20",
      }
    } else if (aqiValue <= 100) {
      return {
        general: "Air quality is acceptable for most people.",
        sensitive: "Consider reducing prolonged outdoor activities.",
        exercise: "Moderate outdoor exercise is generally fine.",
        indoor: "Keep windows open for natural ventilation.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      }
    } else if (aqiValue <= 150) {
      return {
        general: "Reduce prolonged outdoor activities.",
        sensitive: "Avoid outdoor activities. Stay indoors when possible.",
        exercise: "Consider indoor exercise alternatives.",
        indoor: "Keep windows closed. Use air purifiers if available.",
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
      }
    } else if (aqiValue <= 200) {
      return {
        general: "Avoid outdoor activities. Stay indoors.",
        sensitive: "Remain indoors and keep activity levels low.",
        exercise: "Avoid all outdoor exercise. Indoor activities only.",
        indoor: "Keep windows and doors closed. Use air purifiers.",
        color: "text-red-600",
        bgColor: "bg-red-50 dark:bg-red-900/20",
      }
    } else {
      return {
        general: "Health alert: avoid all outdoor activities.",
        sensitive: "Remain indoors and avoid physical activities.",
        exercise: "Avoid all physical activities outdoors and indoors.",
        indoor: "Seal windows and doors. Use high-efficiency air purifiers.",
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
      }
    }
  }

  const recommendations = getRecommendations(aqi)

  const groups = [
    {
      title: "General Public",
      icon: Users,
      advice: recommendations.general,
    },
    {
      title: "Sensitive Groups",
      icon: Heart,
      advice: recommendations.sensitive,
      subtitle: "Children, elderly, heart/lung conditions",
    },
    {
      title: "Exercise & Sports",
      icon: Dumbbell,
      advice: recommendations.exercise,
    },
    {
      title: "Indoor Environment",
      icon: Home,
      advice: recommendations.indoor,
    },
  ]

  return (
    <Card className={`${recommendations.bgColor} border-2 ${className}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${recommendations.color}`}>
          <AlertTriangle className="w-5 h-5" />
          Health Recommendations (AQI {aqi})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, index) => {
            const IconComponent = group.icon
            return (
              <div key={index} className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`w-5 h-5 ${recommendations.color}`} />
                  <h4 className={`font-semibold ${recommendations.color}`}>{group.title}</h4>
                </div>
                {group.subtitle && <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{group.subtitle}</p>}
                <p className="text-sm text-gray-700 dark:text-gray-300">{group.advice}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
