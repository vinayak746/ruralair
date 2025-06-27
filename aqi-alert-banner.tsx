"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AQIAlertBannerProps {
  aqi: number
  location?: string
  onDismiss?: () => void
  className?: string
  autoShow?: boolean
}

export default function AQIAlertBanner({
  aqi,
  location = "your area",
  onDismiss,
  className,
  autoShow = true,
}: AQIAlertBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Determine if alert should be shown based on AQI level
  const shouldShowAlert = aqi > 50 // Show for moderate and above

  // Get alert configuration based on AQI level
  const getAlertConfig = (aqiValue: number) => {
    if (aqiValue <= 50) {
      return null // No alert needed for good air quality
    } else if (aqiValue <= 100) {
      return {
        level: "moderate",
        bgColor: "bg-yellow-500",
        borderColor: "border-yellow-600",
        textColor: "text-yellow-50",
        icon: Info,
        title: "Moderate Air Quality",
        message: `Air quality is acceptable in ${location}. Sensitive individuals may experience minor symptoms.`,
        recommendation: "Consider reducing prolonged outdoor activities if you're sensitive to air pollution.",
      }
    } else if (aqiValue <= 150) {
      return {
        level: "unhealthy_sensitive",
        bgColor: "bg-orange-500",
        borderColor: "border-orange-600",
        textColor: "text-orange-50",
        icon: AlertTriangle,
        title: "Unhealthy for Sensitive Groups",
        message: `Air quality may cause health concerns for sensitive individuals in ${location}.`,
        recommendation: "People with respiratory conditions should limit outdoor activities.",
      }
    } else if (aqiValue <= 200) {
      return {
        level: "unhealthy",
        bgColor: "bg-red-500",
        borderColor: "border-red-600",
        textColor: "text-red-50",
        icon: AlertTriangle,
        title: "Unhealthy Air Quality",
        message: `Air quality is unhealthy in ${location}. Everyone may experience health effects.`,
        recommendation: "Avoid prolonged outdoor activities. Keep windows closed.",
      }
    } else {
      return {
        level: "very_unhealthy",
        bgColor: "bg-red-600",
        borderColor: "border-red-700",
        textColor: "text-red-50",
        icon: AlertCircle,
        title: "Very Unhealthy Air Quality",
        message: `Air quality is very unhealthy in ${location}. Health alert for everyone.`,
        recommendation: "Avoid all outdoor activities. Stay indoors with air purification if possible.",
      }
    }
  }

  const alertConfig = getAlertConfig(aqi)

  // Show/hide alert with animation
  useEffect(() => {
    if (shouldShowAlert && autoShow && alertConfig) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 500) // Delay before showing

      return () => clearTimeout(timer)
    }
  }, [shouldShowAlert, autoShow, alertConfig])

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (isVisible && isAnimating) {
      const dismissTimer = setTimeout(() => {
        handleDismiss()
      }, 5000) // Auto-dismiss after 5 seconds

      return () => clearTimeout(dismissTimer)
    }
  }, [isVisible, isAnimating])

  // Handle dismiss
  const handleDismiss = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, 300) // Wait for slide-out animation
  }

  // Don't render if no alert needed or not visible
  if (!alertConfig || !isVisible) {
    return null
  }

  const IconComponent = alertConfig.icon

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out",
        isAnimating ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        className,
      )}
    >
      <div
        className={cn(
          "mx-4 mt-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm",
          alertConfig.bgColor,
          alertConfig.borderColor,
          alertConfig.textColor,
        )}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{alertConfig.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{alertConfig.message}</p>
                  <p className="text-xs opacity-75">{alertConfig.recommendation}</p>
                </div>

                {/* AQI Badge */}
                <div className="flex-shrink-0 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <span className="text-sm font-bold">AQI {aqi}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar for severity */}
        <div className="h-1 bg-black/10 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-white/30 transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min((aqi / 300) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
