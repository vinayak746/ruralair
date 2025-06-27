"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AQIMeterProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function AQIMeter({ value, size = 200, strokeWidth = 12, className }: AQIMeterProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Ensure we never pass NaN to calculations or the SVG
  const safeValue = Number.isFinite(value) && value >= 0 ? value : 0

  // Animation effect
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      // Animate the value gradually
      let currentValue = 0
      const increment = safeValue / 50 // 50 steps for smooth animation
      const animationTimer = setInterval(() => {
        currentValue += increment
        if (currentValue >= safeValue) {
          currentValue = safeValue
          clearInterval(animationTimer)
        }
        setAnimatedValue(currentValue)
      }, 20) // Update every 20ms for smooth animation

      return () => clearInterval(animationTimer)
    }, 300)

    return () => clearTimeout(timer)
  }, [safeValue])

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const center = size / 2

  // AQI level configuration
  const getAQIConfig = (aqi: number) => {
    if (aqi <= 50) {
      return {
        color: "#10B981", // green-500
        bgColor: "from-green-400/20 to-green-600/20",
        borderColor: "border-green-400/30",
        label: "Good",
        textColor: "text-green-600",
        description: "Air quality is satisfactory",
      }
    } else if (aqi <= 100) {
      return {
        color: "#F59E0B", // yellow-500
        bgColor: "from-yellow-400/20 to-yellow-600/20",
        borderColor: "border-yellow-400/30",
        label: "Moderate",
        textColor: "text-yellow-600",
        description: "Acceptable for most people",
      }
    } else if (aqi <= 150) {
      return {
        color: "#F97316", // orange-500
        bgColor: "from-orange-400/20 to-orange-600/20",
        borderColor: "border-orange-400/30",
        label: "Unhealthy for Sensitive Groups",
        textColor: "text-orange-600",
        description: "Sensitive people should limit outdoor exposure",
      }
    } else if (aqi <= 200) {
      return {
        color: "#EF4444", // red-500
        bgColor: "from-red-400/20 to-red-600/20",
        borderColor: "border-red-400/30",
        label: "Unhealthy",
        textColor: "text-red-600",
        description: "Everyone may experience health effects",
      }
    } else if (aqi <= 300) {
      return {
        color: "#8B5CF6", // purple-500
        bgColor: "from-purple-400/20 to-purple-600/20",
        borderColor: "border-purple-400/30",
        label: "Very Unhealthy",
        textColor: "text-purple-600",
        description: "Health alert: everyone may experience serious effects",
      }
    } else {
      return {
        color: "#7C2D12", // brown-800
        bgColor: "from-red-600/20 to-red-800/20",
        borderColor: "border-red-600/30",
        label: "Hazardous",
        textColor: "text-red-800",
        description: "Emergency conditions: entire population at risk",
      }
    }
  }

  // Compute config from the safe value
  const config = getAQIConfig(safeValue)

  // Calculate progress (normalize to 0-1 range, max at 500 for visual purposes)
  const maxValue = 500
  const normalizedValue = Math.min(safeValue, maxValue)
  const progress = normalizedValue / maxValue

  // Calculate stroke dash offset for the progress circle
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Circular Meter */}
      <div
        className={cn(
          "relative rounded-full backdrop-blur-md bg-gradient-to-br border shadow-2xl transition-all duration-700 ease-out",
          config.bgColor,
          config.borderColor,
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
        style={{
          width: size + 40,
          height: size + 40,
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />

        {/* SVG Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90 drop-shadow-lg">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={strokeWidth}
              className="drop-shadow-sm"
            />

            {/* Progress circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={config.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-md"
              style={{
                filter: `drop-shadow(0 0 8px ${config.color}60)`,
              }}
            />

            {/* Inner glow effect */}
            <circle
              cx={center}
              cy={center}
              r={radius - strokeWidth / 2}
              fill="none"
              stroke={config.color}
              strokeWidth={1}
              opacity={0.4}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={cn(
              "text-4xl font-bold transition-all duration-700 ease-out drop-shadow-lg",
              config.textColor,
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
            style={{
              textShadow: `0 0 20px ${config.color}40`,
            }}
          >
            {Math.round(animatedValue)}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-1">AQI</div>
        </div>

        {/* Animated particles effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${15 + Math.random() * 70}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Label */}
      <div className="text-center space-y-2 max-w-xs">
        <div
          className={cn(
            "text-lg font-semibold transition-all duration-500 ease-out",
            config.textColor,
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          {config.label}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{config.description}</div>
        <div className="text-xs text-gray-500 dark:text-gray-500">Air Quality Index</div>
      </div>
    </div>
  )
}
