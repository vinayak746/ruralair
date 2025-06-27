"use client"

import { useState } from "react"
import InfoTipCard from "./info-tip-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Lightbulb, RotateCcw, Play, Pause } from "lucide-react"

export default function TipCardDemo() {
  const [autoRotate, setAutoRotate] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Air Quality Info Card</h1>
          <p className="text-gray-600">Educational tips with calming design and smooth animations</p>
        </div>

        {/* Main Info Card */}
        <div className="flex justify-center">
          <InfoTipCard autoRotate={autoRotate} rotateInterval={5000} className="max-w-lg" />
        </div>

        {/* Controls */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Card Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Auto-rotate tips</label>
                <p className="text-xs text-gray-500">Automatically cycle through tips every 5 seconds</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={autoRotate} onCheckedChange={setAutoRotate} />
                {autoRotate ? <Play className="w-4 h-4 text-green-600" /> : <Pause className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800 mb-1">How to interact:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Click the refresh icon to manually change tips</li>
                <li>• Click the dots at the bottom to jump to specific tips</li>
                <li>• Toggle auto-rotate to see tips change automatically</li>
                <li>• Each tip is color-coded by category (health, indoor, outdoor, general)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Educational Content</h3>
              </div>
              <p className="text-sm text-gray-600">
                9 different air quality tips covering health, indoor air quality, outdoor activities, and general
                knowledge.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Interactive Design</h3>
              </div>
              <p className="text-sm text-gray-600">
                Manual tip rotation, auto-rotate feature, progress indicators, and smooth transition animations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Calming Design</h3>
              </div>
              <p className="text-sm text-gray-600">
                Soft gradient backgrounds, rounded corners, subtle shadows, and color-coded categories for visual
                appeal.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tip Categories */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>Tip Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-100">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Health</h4>
                <p className="text-xs text-gray-600 mt-1">Health-related air quality tips</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Indoor</h4>
                <p className="text-xs text-gray-600 mt-1">Indoor air quality improvements</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Outdoor</h4>
                <p className="text-xs text-gray-600 mt-1">Outdoor activity recommendations</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">General</h4>
                <p className="text-xs text-gray-600 mt-1">General air quality knowledge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
