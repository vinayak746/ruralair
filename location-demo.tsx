"use client"

import { useState } from "react"
import LocationInput from "./location-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface LocationSuggestion {
  id: string
  name: string
  state?: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export default function LocationDemo() {
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null)

  const handleLocationSelect = (location: LocationSuggestion) => {
    setSelectedLocation(location)
    console.log("Selected location:", location)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Location Input Component</h1>
          <p className="text-gray-600">Search for cities or auto-detect your current location</p>
        </div>

        {/* Location Input */}
        <LocationInput onLocationSelect={handleLocationSelect} />

        {/* Selected Location Display */}
        {selectedLocation && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Selected Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{selectedLocation.name}</span>
                </div>
                {selectedLocation.state && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span className="font-medium">{selectedLocation.state}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{selectedLocation.country}</span>
                </div>
                {selectedLocation.coordinates && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium text-sm">
                      {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Usage Instructions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">How to use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong>Type to search:</strong> Start typing a city name to see suggestions
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong>Navigate with keyboard:</strong> Use arrow keys to navigate, Enter to select, Escape to close
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong>Auto-detect:</strong> Click "Use current location" to automatically detect your position
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
