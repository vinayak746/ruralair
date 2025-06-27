"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Smartphone, Mail, MessageSquare } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function AirQualityAlerts() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
  })

  const [thresholds, setThresholds] = useState({
    moderate: true,
    unhealthy: true,
    veryUnhealthy: true,
  })

  const alertTypes = [
    {
      id: "push",
      name: "Push Notifications",
      description: "Get instant alerts on your device",
      icon: Smartphone,
    },
    {
      id: "email",
      name: "Email Alerts",
      description: "Receive detailed reports via email",
      icon: Mail,
    },
    {
      id: "sms",
      name: "SMS Alerts",
      description: "Text message alerts for urgent conditions",
      icon: MessageSquare,
    },
  ]

  const thresholdTypes = [
    {
      id: "moderate",
      name: "Moderate (51-100 AQI)",
      description: "Alert when air quality becomes moderate",
      color: "text-yellow-600",
    },
    {
      id: "unhealthy",
      name: "Unhealthy (101-200 AQI)",
      description: "Alert for unhealthy air quality levels",
      color: "text-orange-600",
    },
    {
      id: "veryUnhealthy",
      name: "Very Unhealthy (201+ AQI)",
      description: "Critical air quality alerts",
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <div
                key={type.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{type.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{type.description}</div>
                  </div>
                </div>
                <Switch
                  checked={notifications[type.id as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [type.id]: checked }))}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {thresholdTypes.map((threshold) => (
            <div
              key={threshold.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <div className={`font-medium ${threshold.color}`}>{threshold.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{threshold.description}</div>
              </div>
              <Switch
                checked={thresholds[threshold.id as keyof typeof thresholds]}
                onCheckedChange={(checked) => setThresholds((prev) => ({ ...prev, [threshold.id]: checked }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
