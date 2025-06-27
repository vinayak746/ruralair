"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Volume2, VolumeX, Bell, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "warning" | "danger" | "info"
  title: string
  message: string
  timestamp: Date
  location: string
  aqi: number
  dismissed: boolean
}

interface RealTimeAlertsProps {
  currentAQI: number
  location: string
  className?: string
}

export default function RealTimeAlerts({ currentAQI, location, className }: RealTimeAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasGeneratedInitialAlert, setHasGeneratedInitialAlert] = useState(false)

  // Generate alert based on AQI
  const generateAlert = (aqi: number, loc: string) => {
    const newAlert: Alert = {
      id: `${Date.now()}-${Math.random()}`,
      type: aqi > 200 ? "danger" : aqi > 150 ? "warning" : "info",
      title:
        aqi > 200 ? "Hazardous Air Quality Alert!" : aqi > 150 ? "Unhealthy Air Quality Warning" : "Air Quality Update",
      message: `Air quality in ${loc} is ${aqi} AQI. ${
        aqi > 200
          ? "Avoid all outdoor activities and stay indoors with air purifiers."
          : aqi > 150
            ? "Limit outdoor activities, especially for sensitive groups."
            : aqi > 100
              ? "Consider reducing prolonged outdoor activities."
              : "Air quality is acceptable for outdoor activities."
      }`,
      timestamp: new Date(),
      location: loc,
      aqi: aqi,
      dismissed: false,
    }

    setAlerts((prev) => [newAlert, ...prev.filter((alert) => !alert.dismissed).slice(0, 4)])

    // Play alert sound for high AQI
    if (soundEnabled && aqi > 100) {
      playAlertSound()
    }
  }

  // Generate initial alert when location/AQI changes
  useEffect(() => {
    if (currentAQI && location && !hasGeneratedInitialAlert) {
      generateAlert(currentAQI, location)
      setHasGeneratedInitialAlert(true)
    }
  }, [currentAQI, location, hasGeneratedInitialAlert, soundEnabled])

  // Reset when location changes
  useEffect(() => {
    setHasGeneratedInitialAlert(false)
    setAlerts([]) // Clear previous alerts when location changes
  }, [location])

  const playAlertSound = () => {
    setIsPlaying(true)
    // In a real app, you would play an actual sound file
    setTimeout(() => setIsPlaying(false), 1000)
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev
        .map((alert) => (alert.id === alertId ? { ...alert, dismissed: true } : alert))
        .filter((alert) => !alert.dismissed),
    )
  }

  const dismissAllAlerts = () => {
    setAlerts([])
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "danger":
        return "border-red-500 bg-red-50 dark:bg-red-900/20"
      case "warning":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
      case "info":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-blue-600" />
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.dismissed)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-600" />
            Real-Time Alerts
            {isPlaying && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
            {activeAlerts.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeAlerts.length}
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeAlerts.length > 1 && (
              <Button onClick={dismissAllAlerts} variant="ghost" size="sm" className="text-xs">
                Clear All
              </Button>
            )}
            <Button onClick={() => setSoundEnabled(!soundEnabled)} variant="ghost" size="sm" className="h-8 w-8 p-0">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-gray-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm">You'll be notified when air quality changes significantly</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg border-l-4 relative animate-in slide-in-from-top-2",
                  getAlertColor(alert.type),
                )}
              >
                <Button
                  onClick={() => dismissAlert(alert.id)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-200/50"
                >
                  <X className="w-3 h-3" />
                </Button>

                <div className="flex items-start gap-3 pr-8">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{alert.location}</span>
                      <span>AQI: {alert.aqi}</span>
                      <span>{alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alert Settings */}
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Sound Alerts</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Play sound when new alerts arrive</div>
            </div>
            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              variant={soundEnabled ? "default" : "outline"}
              size="sm"
            >
              {soundEnabled ? "On" : "Off"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
