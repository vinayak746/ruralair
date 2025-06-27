"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Loader2, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface LocationInputProps {
  onLocationSelect?: (location: LocationSuggestion) => void
  placeholder?: string
  className?: string
}

export default function LocationInput({
  onLocationSelect,
  placeholder = "Search for a city or town...",
  className,
}: LocationInputProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Mock city data - in real app, this would come from an API
  const mockCities: LocationSuggestion[] = [
    // US Cities
    { id: "1", name: "New York", state: "NY", country: "United States", coordinates: { lat: 40.7128, lng: -74.006 } },
    {
      id: "2",
      name: "Los Angeles",
      state: "CA",
      country: "United States",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
    { id: "3", name: "Chicago", state: "IL", country: "United States", coordinates: { lat: 41.8781, lng: -87.6298 } },
    { id: "4", name: "Houston", state: "TX", country: "United States", coordinates: { lat: 29.7604, lng: -95.3698 } },
    { id: "5", name: "Phoenix", state: "AZ", country: "United States", coordinates: { lat: 33.4484, lng: -112.074 } },

    // Indian Cities
    { id: "21", name: "Mumbai", state: "Maharashtra", country: "India", coordinates: { lat: 19.076, lng: 72.8777 } },
    { id: "22", name: "Delhi", state: "Delhi", country: "India", coordinates: { lat: 28.7041, lng: 77.1025 } },
    { id: "23", name: "Bangalore", state: "Karnataka", country: "India", coordinates: { lat: 12.9716, lng: 77.5946 } },
    { id: "24", name: "Hyderabad", state: "Telangana", country: "India", coordinates: { lat: 17.385, lng: 78.4867 } },
    { id: "25", name: "Chennai", state: "Tamil Nadu", country: "India", coordinates: { lat: 13.0827, lng: 80.2707 } },
    { id: "26", name: "Kolkata", state: "West Bengal", country: "India", coordinates: { lat: 22.5726, lng: 88.3639 } },
    { id: "27", name: "Pune", state: "Maharashtra", country: "India", coordinates: { lat: 18.5204, lng: 73.8567 } },
    { id: "28", name: "Ahmedabad", state: "Gujarat", country: "India", coordinates: { lat: 23.0225, lng: 72.5714 } },
    { id: "29", name: "Jaipur", state: "Rajasthan", country: "India", coordinates: { lat: 26.9124, lng: 75.7873 } },
    {
      id: "30",
      name: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { lat: 26.8467, lng: 80.9462 },
    },

    // International Cities
    { id: "16", name: "London", country: "United Kingdom", coordinates: { lat: 51.5074, lng: -0.1278 } },
    { id: "17", name: "Paris", country: "France", coordinates: { lat: 48.8566, lng: 2.3522 } },
    { id: "18", name: "Tokyo", country: "Japan", coordinates: { lat: 35.6762, lng: 139.6503 } },
    { id: "19", name: "Sydney", country: "Australia", coordinates: { lat: -33.8688, lng: 151.2093 } },
    { id: "20", name: "Toronto", country: "Canada", coordinates: { lat: 43.6532, lng: -79.3832 } },
  ]

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockCities
        .filter(
          (city) =>
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            (city.state && city.state.toLowerCase().includes(query.toLowerCase())) ||
            city.country.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8) // Limit to 8 suggestions

      setSuggestions(filtered)
      setIsOpen(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.name)
    setIsOpen(false)
    onLocationSelect?.(suggestion)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Auto-detect current location
  const handleAutoDetect = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.")
      return
    }

    setIsDetecting(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        // In a real app, you'd reverse geocode these coordinates
        // For demo purposes, we'll simulate this
        setTimeout(() => {
          const detectedLocation: LocationSuggestion = {
            id: "current",
            name: "Current Location",
            country: "Detected",
            coordinates: { lat: latitude, lng: longitude },
          }

          setQuery("Current Location")
          setIsDetecting(false)
          onLocationSelect?.(detectedLocation)
        }, 1500)
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsDetecting(false)
        alert("Unable to detect your location. Please try again or enter manually.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Choose your location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          {/* Input Field */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Suggestions Dropdown */}
          {isOpen && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors",
                    "border-b border-gray-100 last:border-b-0",
                    selectedIndex === index && "bg-blue-50 text-blue-700",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{suggestion.name}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {suggestion.state ? `${suggestion.state}, ` : ""}
                        {suggestion.country}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auto-detect Button */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500 px-2">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button
          onClick={handleAutoDetect}
          disabled={isDetecting}
          variant="outline"
          className="w-full border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Detecting location...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Use current location
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
