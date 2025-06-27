"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Lightbulb,
  Wind,
  Leaf,
  Home,
  Clock,
  CloudRain,
  Heart,
  Shield,
  RefreshCw,
  Car,
  Factory,
  Thermometer,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AirQualityTip {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  category: "health" | "indoor" | "outdoor" | "general" | "transport" | "industrial"
}

interface InfoTipCardProps {
  autoRotate?: boolean
  rotateInterval?: number
  className?: string
  startIndex?: number // Add this to make each card start with different tip
}

export default function InfoTipCard({
  autoRotate = false,
  rotateInterval = 8000,
  className,
  startIndex = 0,
}: InfoTipCardProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(startIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  // Expanded collection of air quality tips
  const airQualityTips: AirQualityTip[] = [
    {
      id: "plants",
      icon: Leaf,
      title: "Indoor plants naturally purify air",
      description:
        "Spider plants, peace lilies, and snake plants remove formaldehyde, benzene, and other toxins from indoor air effectively.",
      category: "indoor",
    },
    {
      id: "morning-exercise",
      icon: Clock,
      title: "Exercise early morning for cleaner air",
      description:
        "Air pollution levels are typically 40% lower in early morning hours (5-7 AM), making it ideal for outdoor workouts.",
      category: "outdoor",
    },
    {
      id: "ventilation",
      icon: Wind,
      title: "Strategic ventilation improves indoor air",
      description:
        "Open windows when outdoor AQI is below 100, and use cross-ventilation to create airflow that removes indoor pollutants.",
      category: "indoor",
    },
    {
      id: "n95-masks",
      icon: Shield,
      title: "N95 masks block 95% of particles",
      description:
        "High-quality N95 or KN95 masks filter out PM2.5 particles that are most dangerous to respiratory health during high pollution days.",
      category: "health",
    },
    {
      id: "rain-effect",
      icon: CloudRain,
      title: "Rain naturally cleans the atmosphere",
      description:
        "Rainfall can reduce air pollution by 30-50% by washing particulates from the air, creating temporary clean air windows.",
      category: "general",
    },
    {
      id: "cooking-pollution",
      icon: Home,
      title: "Cooking creates significant indoor pollution",
      description:
        "Gas stoves produce NO2 and PM2.5. Always use exhaust fans and consider electric alternatives for better indoor air quality.",
      category: "indoor",
    },
    {
      id: "traffic-timing",
      icon: Car,
      title: "Avoid peak traffic hours outdoors",
      description:
        "Vehicle emissions peak during rush hours (7-9 AM, 5-7 PM). Plan outdoor activities during off-peak times when possible.",
      category: "transport",
    },
    {
      id: "air-purifiers",
      icon: Wind,
      title: "HEPA filters capture microscopic particles",
      description:
        "Air purifiers with True HEPA filters remove 99.97% of particles 0.3 microns or larger, including PM2.5 and allergens.",
      category: "indoor",
    },
    {
      id: "children-vulnerability",
      icon: Heart,
      title: "Children breathe 50% more air per body weight",
      description:
        "Kids are more vulnerable to air pollution due to faster breathing rates and developing lungs. Limit outdoor play when AQI > 100.",
      category: "health",
    },
    {
      id: "industrial-zones",
      icon: Factory,
      title: "Industrial areas have 3x higher pollution",
      description:
        "Avoid prolonged exposure near factories, construction sites, and industrial zones where PM2.5 levels can be extremely elevated.",
      category: "industrial",
    },
    {
      id: "temperature-pollution",
      icon: Thermometer,
      title: "Hot weather worsens air quality",
      description:
        "High temperatures increase ground-level ozone formation and can trap pollutants closer to the ground, especially in summer.",
      category: "general",
    },
    {
      id: "indoor-sources",
      icon: Home,
      title: "Common household items pollute indoor air",
      description:
        "Cleaning products, air fresheners, and furniture can release VOCs. Choose natural alternatives and ensure good ventilation.",
      category: "indoor",
    },
  ]

  // Initialize with the provided start index
  useEffect(() => {
    setCurrentTipIndex(startIndex % airQualityTips.length)
  }, [startIndex, airQualityTips.length])

  const currentTip = airQualityTips[currentTipIndex]

  // Auto-rotate tips
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % airQualityTips.length)
        setIsAnimating(false)
      }, 200)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, rotateInterval, airQualityTips.length])

  // Manual tip rotation
  const handleNextTip = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % airQualityTips.length)
      setIsAnimating(false)
    }, 200)
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "from-red-50 to-pink-50 border-red-200 dark:from-red-900/20 dark:to-pink-900/20"
      case "indoor":
        return "from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20"
      case "outdoor":
        return "from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20"
      case "transport":
        return "from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20"
      case "industrial":
        return "from-gray-50 to-slate-50 border-gray-200 dark:from-gray-900/20 dark:to-slate-900/20"
      case "general":
        return "from-purple-50 to-indigo-50 border-purple-200 dark:from-purple-900/20 dark:to-indigo-900/20"
      default:
        return "from-gray-50 to-slate-50 border-gray-200 dark:from-gray-900/20 dark:to-slate-900/20"
    }
  }

  const IconComponent = currentTip.icon

  return (
    <Card
      className={cn(
        "bg-gradient-to-br shadow-lg border-2 transition-all duration-300 hover:shadow-xl",
        getCategoryColor(currentTip.category),
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Did You Know?</h3>
            </div>

            {/* Manual refresh button */}
            <Button
              onClick={handleNextTip}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              aria-label="Next tip"
            >
              <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-200 ease-in-out",
              isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100",
            )}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm border border-white/50 dark:border-gray-700/50">
                  <IconComponent className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-2">
                <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                  {currentTip.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{currentTip.description}</p>

                {/* Category badge */}
                <div className="inline-flex items-center px-2 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/50 dark:border-gray-700/50">
                  {currentTip.category.charAt(0).toUpperCase() + currentTip.category.slice(1)} Tip
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-1 pt-2">
            {airQualityTips.slice(0, 8).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentTipIndex(index)
                    setIsAnimating(false)
                  }, 200)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentTipIndex % 8
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500",
                )}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
