"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory, Car, Flame, Wind, TreePine, Building } from "lucide-react"
import { cn } from "@/lib/utils"

interface PollutionSource {
  name: string
  percentage: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

interface PollutionSourceTrackerProps {
  location: string
  className?: string
}

export default function PollutionSourceTracker({ location, className }: PollutionSourceTrackerProps) {
  // Mock data - in real app, this would come from environmental APIs
  const pollutionSources: PollutionSource[] = [
    {
      name: "Vehicle Emissions",
      percentage: 35,
      icon: Car,
      color: "bg-red-500",
      description: "Cars, trucks, and motorcycles",
    },
    {
      name: "Industrial Activities",
      percentage: 28,
      icon: Factory,
      color: "bg-orange-500",
      description: "Factories and manufacturing",
    },
    {
      name: "Construction Dust",
      percentage: 15,
      icon: Building,
      color: "bg-yellow-500",
      description: "Building and road construction",
    },
    {
      name: "Biomass Burning",
      percentage: 12,
      icon: Flame,
      color: "bg-purple-500",
      description: "Agricultural and waste burning",
    },
    {
      name: "Natural Sources",
      percentage: 7,
      icon: Wind,
      color: "bg-blue-500",
      description: "Dust storms and wildfires",
    },
    {
      name: "Deforestation",
      percentage: 3,
      icon: TreePine,
      color: "bg-green-500",
      description: "Loss of natural air filters",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="w-5 h-5 text-orange-600" />
          Pollution Sources in {location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pollutionSources.map((source, index) => {
            const IconComponent = source.icon
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", source.color)}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{source.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{source.description}</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{source.percentage}%</div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={cn("h-2 rounded-full transition-all duration-500", source.color)}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Recommendations */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Reduction Strategies</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use public transport or electric vehicles</li>
            <li>• Support stricter industrial emission controls</li>
            <li>• Advocate for green construction practices</li>
            <li>• Promote urban tree planting initiatives</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
