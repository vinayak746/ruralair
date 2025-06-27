"use client"

import AQIMap from "./aqi-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Eye, Layers } from "lucide-react"

export default function MapDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Interactive AQI Map</h1>
          <p className="text-gray-600">Hover over markers to see detailed air quality information</p>
        </div>

        {/* Main Map Component */}
        <AQIMap />

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Color-Coded Markers</h3>
              </div>
              <p className="text-sm text-gray-600">
                Each monitoring station is represented by a color-coded marker showing real-time AQI levels with
                animated pulse effects.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Interactive Tooltips</h3>
              </div>
              <p className="text-sm text-gray-600">
                Hover over any marker to see detailed information including location name, AQI value, status, and
                station type.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Compact Design</h3>
              </div>
              <p className="text-sm text-gray-600">
                Integrated legend sidebar with AQI scale reference and area statistics in a space-efficient layout.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map Legend Explanation */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Map Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Visual Elements</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Stylized city map with geographic features</li>
                  <li>• Animated pulse effects on markers</li>
                  <li>• Color-coded AQI levels (green to purple)</li>
                  <li>• Hover effects with scale animations</li>
                  <li>• Current location indicator</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Interactive Features</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Rich tooltips with detailed AQI information</li>
                  <li>• Sidebar legend with color scale reference</li>
                  <li>• Area average calculation and display</li>
                  <li>• Station type identification</li>
                  <li>• Responsive design for all devices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Use the Map</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Hover over any colored marker to see detailed air quality information for that monitoring station. The
                  sidebar legend shows the AQI color scale and provides area statistics.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Note:</strong> This is a demonstration with mock data. In a production environment, this would
                  connect to real air quality monitoring APIs and mapping services.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
