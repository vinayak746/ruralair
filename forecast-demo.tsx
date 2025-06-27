"use client"

import AQIForecast from "./aqi-forecast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp } from "lucide-react"

export default function ForecastDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">AQI Forecast Component</h1>
          <p className="text-gray-600">Horizontal scrollable forecast cards with color-coded air quality levels</p>
        </div>

        {/* Main Forecast Component */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Air Quality Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AQIForecast />
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Color Coded</h3>
              </div>
              <p className="text-sm text-gray-600">
                Each card uses color gradients based on AQI levels - from green (good) to purple (very unhealthy).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Touch Friendly</h3>
              </div>
              <p className="text-sm text-gray-600">
                Optimized for mobile with smooth horizontal scrolling, proper spacing, and touch-friendly card sizes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-purple-600 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Complete Info</h3>
              </div>
              <p className="text-sm text-gray-600">
                Shows date, weather icon, temperature range, AQI value, and air quality status in a compact design.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Desktop</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Scroll horizontally with mouse wheel</li>
                  <li>• Click and drag to scroll</li>
                  <li>• Hover over cards for zoom effect</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Mobile</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Swipe left/right to scroll</li>
                  <li>• Tap cards for interaction</li>
                  <li>• Smooth snap-to-card scrolling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
