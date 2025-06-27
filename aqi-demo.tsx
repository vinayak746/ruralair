"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import AQIMeter from "./aqi-meter"

export default function AQIDemo() {
  const [aqiValue, setAqiValue] = useState([42])

  const presetValues = [
    { label: "Good", value: 25 },
    { label: "Moderate", value: 75 },
    { label: "Unhealthy for Sensitive", value: 125 },
    { label: "Unhealthy", value: 175 },
    { label: "Very Unhealthy", value: 225 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Air Quality Index Meter</h1>
          <p className="text-blue-200">Interactive circular meter with glassmorphism effects</p>
        </div>

        {/* Main AQI Meter Display */}
        <div className="flex justify-center">
          <AQIMeter value={aqiValue[0]} size={240} strokeWidth={16} />
        </div>

        {/* Controls */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">AQI Value: {aqiValue[0]}</label>
              </div>
              <Slider value={aqiValue} onValueChange={setAqiValue} max={300} min={0} step={1} className="w-full" />
            </div>

            {/* Preset Buttons */}
            <div className="space-y-3">
              <label className="text-white font-medium block">Quick Presets:</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {presetValues.map((preset) => (
                  <Button
                    key={preset.value}
                    variant="outline"
                    size="sm"
                    onClick={() => setAqiValue([preset.value])}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Multiple Meters Demo */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Different Sizes & Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              <AQIMeter value={35} size={160} strokeWidth={12} />
              <AQIMeter value={85} size={160} strokeWidth={12} />
              <AQIMeter value={165} size={160} strokeWidth={12} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
