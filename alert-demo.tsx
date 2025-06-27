"use client"

import { useState } from "react"
import AQIAlertBanner from "./aqi-alert-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, RotateCcw, Play } from "lucide-react"

export default function AlertDemo() {
  const [currentAQI, setCurrentAQI] = useState([75])
  const [showAlert, setShowAlert] = useState(true)
  const [alertKey, setAlertKey] = useState(0)

  const handleDismiss = () => {
    setShowAlert(false)
  }

  const handleShowAlert = () => {
    setShowAlert(true)
    setAlertKey((prev) => prev + 1) // Force re-render with new key
  }

  const presetAQIValues = [
    { label: "Good", value: 35, description: "No alert shown" },
    { label: "Moderate", value: 75, description: "Yellow warning" },
    { label: "Unhealthy for Sensitive", value: 125, description: "Orange warning" },
    { label: "Unhealthy", value: 175, description: "Red warning" },
    { label: "Very Unhealthy", value: 225, description: "Dark red warning" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      {/* Alert Banner */}
      {showAlert && (
        <AQIAlertBanner
          key={alertKey}
          aqi={currentAQI[0]}
          location="Springfield"
          onDismiss={handleDismiss}
          autoShow={true}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-8 pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">AQI Alert Banner</h1>
          <p className="text-gray-600">Dismissible warning banners with smooth animations and color coding</p>
        </div>

        {/* Controls */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Alert Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AQI Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Current AQI: {currentAQI[0]}</label>
                <div className="flex gap-2">
                  <Button onClick={handleShowAlert} size="sm" variant="outline" disabled={showAlert}>
                    <Play className="w-4 h-4 mr-1" />
                    Show Alert
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAlert(false)
                      setTimeout(() => setShowAlert(true), 100)
                      setAlertKey((prev) => prev + 1)
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Replay Animation
                  </Button>
                </div>
              </div>
              <Slider value={currentAQI} onValueChange={setCurrentAQI} max={300} min={0} step={5} className="w-full" />
            </div>

            {/* Preset Buttons */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Quick Presets:</label>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {presetAQIValues.map((preset) => (
                  <Button
                    key={preset.value}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentAQI([preset.value])
                      if (preset.value > 50) {
                        setShowAlert(true)
                        setAlertKey((prev) => prev + 1)
                      } else {
                        setShowAlert(false)
                      }
                    }}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="font-medium">{preset.label}</span>
                    <span className="text-xs text-gray-500">{preset.value} AQI</span>
                    <span className="text-xs text-gray-400">{preset.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Color Coded</h3>
              </div>
              <p className="text-sm text-gray-600">
                Automatically changes colors based on AQI levels - yellow for moderate, orange for sensitive groups, red
                for unhealthy conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Smooth Animation</h3>
              </div>
              <p className="text-sm text-gray-600">
                Slides in smoothly from the top with opacity transitions and slides out when dismissed with proper
                timing.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Smart Behavior</h3>
              </div>
              <p className="text-sm text-gray-600">
                Only shows when AQI is above 50, includes contextual icons, health recommendations, and dismissible
                functionality.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Types Reference */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Alert Types & Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Alert Levels</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>51-100 AQI: Moderate (Yellow)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span>101-150 AQI: Unhealthy for Sensitive (Orange)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>151-200 AQI: Unhealthy (Red)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                      <span>201+ AQI: Very Unhealthy (Dark Red)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Features</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Contextual icons for each alert level</li>
                    <li>• Health recommendations included</li>
                    <li>• AQI value badge display</li>
                    <li>• Smooth slide-in/out animations</li>
                    <li>• Dismissible with close button</li>
                    <li>• Progress bar showing severity</li>
                    <li>• Backdrop blur effects</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
