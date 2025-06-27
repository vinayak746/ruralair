"use client"

import AQITrendChart from "./aqi-trend-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Eye } from "lucide-react"

export default function ChartDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">AQI Trend Chart</h1>
          <p className="text-gray-600">Interactive line chart showing air quality trends over the past week</p>
        </div>

        {/* Main Chart */}
        <AQITrendChart />

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Interactive Tooltips</h3>
              </div>
              <p className="text-sm text-gray-600">
                Hover over any point to see detailed AQI information including date, level, status, and visual progress
                bar.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Gradient Fill</h3>
              </div>
              <p className="text-sm text-gray-600">
                Beautiful gradient area fill below the line with smooth color transitions and transparency effects.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Summary Stats</h3>
              </div>
              <p className="text-sm text-gray-600">
                Quick overview with lowest, highest, average AQI values and trend direction for the past week.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Chart Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Visual Elements</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Smooth area chart with gradient fill</li>
                  <li>• Color-coded line based on AQI levels</li>
                  <li>• Interactive data points with hover effects</li>
                  <li>• Subtle grid lines for better readability</li>
                  <li>• Animated chart entrance</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Interactive Features</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Rich tooltips with detailed information</li>
                  <li>• Responsive design for all screen sizes</li>
                  <li>• Summary statistics below the chart</li>
                  <li>• AQI reference scale for context</li>
                  <li>• Trend direction indicator</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
