"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Map, ZoomIn, ZoomOut, Layers, Navigation, RefreshCw, Wind, Route, Camera, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface AQILocation {
  id: string
  name: string
  aqi: number
  coordinates: {
    x: number
    y: number
  }
  type: "monitoring_station" | "city_center" | "industrial" | "residential" | "school" | "hospital"
  details: {
    pm25: number
    pm10: number
    o3: number
    no2: number
    so2: number
    co: number
  }
  lastUpdated: string
}

interface WindData {
  direction: number // degrees
  speed: number // mph
  quality: "low" | "moderate" | "high"
}

interface RoutePoint {
  id: string
  name: string
  coordinates: { x: number; y: number }
  aqi: number
}

interface AQIMapProps {
  className?: string
}

export default function AQIMap({ className }: AQIMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<AQILocation | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<AQILocation | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [showWindData, setShowWindData] = useState(true)
  const [showRoutes, setShowRoutes] = useState(false)
  const [routeStart, setRouteStart] = useState("")
  const [routeEnd, setRouteEnd] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Wind data simulation
  const [windData, setWindData] = useState<WindData>({
    direction: 45, // NE direction
    speed: 12,
    quality: "moderate",
  })

  // Enhanced locations with realistic coordinates
  const locations: AQILocation[] = [
    {
      id: "1",
      name: "Downtown Central",
      aqi: 145,
      coordinates: { x: 45, y: 35 },
      type: "monitoring_station",
      details: { pm25: 65, pm10: 85, o3: 45, no2: 38, so2: 12, co: 8.5 },
      lastUpdated: "2 min ago",
    },
    {
      id: "2",
      name: "Green Park District",
      aqi: 32,
      coordinates: { x: 65, y: 25 },
      type: "residential",
      details: { pm25: 15, pm10: 22, o3: 35, no2: 18, so2: 5, co: 3.2 },
      lastUpdated: "5 min ago",
    },
    {
      id: "3",
      name: "Industrial Zone East",
      aqi: 178,
      coordinates: { x: 75, y: 60 },
      type: "industrial",
      details: { pm25: 85, pm10: 120, o3: 55, no2: 65, so2: 28, co: 12.8 },
      lastUpdated: "1 min ago",
    },
    {
      id: "4",
      name: "Riverside Heights",
      aqi: 28,
      coordinates: { x: 25, y: 70 },
      type: "residential",
      details: { pm25: 12, pm10: 18, o3: 28, no2: 15, so2: 3, co: 2.1 },
      lastUpdated: "3 min ago",
    },
    {
      id: "5",
      name: "Airport District",
      aqi: 165,
      coordinates: { x: 85, y: 40 },
      type: "monitoring_station",
      details: { pm25: 75, pm10: 95, o3: 48, no2: 55, so2: 18, co: 9.8 },
      lastUpdated: "4 min ago",
    },
    {
      id: "6",
      name: "University Campus",
      aqi: 38,
      coordinates: { x: 35, y: 55 },
      type: "school",
      details: { pm25: 18, pm10: 25, o3: 32, no2: 20, so2: 6, co: 3.8 },
      lastUpdated: "6 min ago",
    },
    {
      id: "7",
      name: "Harbor Industrial",
      aqi: 182,
      coordinates: { x: 15, y: 45 },
      type: "industrial",
      details: { pm25: 88, pm10: 125, o3: 58, no2: 68, so2: 32, co: 14.2 },
      lastUpdated: "2 min ago",
    },
    {
      id: "8",
      name: "Suburban Valley",
      aqi: 25,
      coordinates: { x: 55, y: 80 },
      type: "residential",
      details: { pm25: 10, pm10: 15, o3: 25, no2: 12, so2: 2, co: 1.8 },
      lastUpdated: "7 min ago",
    },
    {
      id: "9",
      name: "City General Hospital",
      aqi: 42,
      coordinates: { x: 50, y: 40 },
      type: "hospital",
      details: { pm25: 20, pm10: 28, o3: 35, no2: 22, so2: 7, co: 4.2 },
      lastUpdated: "3 min ago",
    },
    {
      id: "10",
      name: "Tech Business Park",
      aqi: 48,
      coordinates: { x: 60, y: 50 },
      type: "city_center",
      details: { pm25: 22, pm10: 32, o3: 38, no2: 25, so2: 8, co: 4.8 },
      lastUpdated: "5 min ago",
    },
  ]

  // Route planning data
  const routePoints: RoutePoint[] = [
    { id: "home", name: "Home", coordinates: { x: 30, y: 60 }, aqi: 45 },
    { id: "work", name: "Work", coordinates: { x: 70, y: 30 }, aqi: 85 },
    { id: "school", name: "School", coordinates: { x: 40, y: 40 }, aqi: 38 },
    { id: "mall", name: "Shopping Mall", coordinates: { x: 60, y: 65 }, aqi: 92 },
    { id: "hospital", name: "Hospital", coordinates: { x: 50, y: 40 }, aqi: 42 },
  ]

  // Update wind data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setWindData((prev) => ({
        direction: (prev.direction + Math.random() * 20 - 10) % 360,
        speed: Math.max(5, Math.min(25, prev.speed + Math.random() * 4 - 2)),
        quality: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "moderate" : "low",
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get AQI color configuration
  const getAQIConfig = (aqi: number) => {
    if (aqi <= 50) {
      return { color: "#10B981", bgColor: "#ECFDF5", status: "Good", textColor: "text-green-700" }
    } else if (aqi <= 100) {
      return { color: "#F59E0B", bgColor: "#FFFBEB", status: "Moderate", textColor: "text-yellow-700" }
    } else if (aqi <= 150) {
      return { color: "#F97316", bgColor: "#FFF7ED", status: "Unhealthy for Sensitive", textColor: "text-orange-700" }
    } else if (aqi <= 200) {
      return { color: "#EF4444", bgColor: "#FEF2F2", status: "Unhealthy", textColor: "text-red-700" }
    } else {
      return { color: "#8B5CF6", bgColor: "#FAF5FF", status: "Very Unhealthy", textColor: "text-purple-700" }
    }
  }

  // Generate heatmap zones
  const generateHeatmapZones = () => {
    const zones = []
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = 15 + Math.random() * 20
      const aqi = 20 + Math.random() * 180
      const config = getAQIConfig(aqi)

      zones.push(
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={size}
          ry={size * 0.8}
          fill={config.color}
          opacity="0.15"
          className="transition-opacity duration-1000"
        />,
      )
    }
    return zones
  }

  // Calculate optimal route
  const calculateOptimalRoute = () => {
    if (!routeStart || !routeEnd) return null

    const start = routePoints.find((p) => p.name.toLowerCase().includes(routeStart.toLowerCase()))
    const end = routePoints.find((p) => p.name.toLowerCase().includes(routeEnd.toLowerCase()))

    if (!start || !end) return null

    // Simple route calculation (in real app, this would use routing API)
    const midPoint = {
      x: (start.coordinates.x + end.coordinates.x) / 2,
      y: (start.coordinates.y + end.coordinates.y) / 2,
    }

    return { start, end, midPoint, avgAQI: Math.round((start.aqi + end.aqi) / 2) }
  }

  const optimalRoute = calculateOptimalRoute()

  // Handle interactions
  const handleMarkerHover = (location: AQILocation, event: React.MouseEvent) => {
    setHoveredLocation(location)
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
  }

  const handleMarkerClick = (location: AQILocation) => {
    setSelectedLocation(location)
  }

  const handleMarkerLeave = () => {
    setHoveredLocation(null)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.2, 2))
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))

  return (
    <Card className={cn("bg-white shadow-lg border-0 overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-600" />
            Real-Time Air Quality Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isRefreshing}>
              <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            </Button>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live Data
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex">
          {/* Main Map Area */}
          <div className="flex-1 relative bg-gray-100 h-[500px] overflow-hidden">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <Button
                onClick={handleZoomIn}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 bg-white/95 shadow-lg"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleZoomOut}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 bg-white/95 shadow-lg"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowHeatmap(!showHeatmap)}
                variant={showHeatmap ? "default" : "outline"}
                size="sm"
                className="w-10 h-10 p-0 bg-white/95 shadow-lg"
                title="Toggle Heatmap"
              >
                <Layers className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowWindData(!showWindData)}
                variant={showWindData ? "default" : "outline"}
                size="sm"
                className="w-10 h-10 p-0 bg-white/95 shadow-lg"
                title="Toggle Wind Data"
              >
                <Wind className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowRoutes(!showRoutes)}
                variant={showRoutes ? "default" : "outline"}
                size="sm"
                className="w-10 h-10 p-0 bg-white/95 shadow-lg"
                title="Route Planner"
              >
                <Route className="w-4 h-4" />
              </Button>
            </div>

            {/* Route Planner Panel */}
            {showRoutes && (
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 w-64">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Route className="w-4 h-4 text-blue-600" />
                  Clean Air Route Planner
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600">From</label>
                    <Input
                      placeholder="Enter starting point"
                      value={routeStart}
                      onChange={(e) => setRouteStart(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">To</label>
                    <Input
                      placeholder="Enter destination"
                      value={routeEnd}
                      onChange={(e) => setRouteEnd(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  {optimalRoute && (
                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                      <div className="text-xs font-medium text-blue-800">Optimal Route</div>
                      <div className="text-xs text-blue-600">
                        Average AQI: <span className="font-semibold">{optimalRoute.avgAQI}</span>
                      </div>
                      <div className="text-xs text-blue-600">
                        Status: <span className="font-semibold">{getAQIConfig(optimalRoute.avgAQI).status}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-xs text-gray-500">Try: Home, Work, School, Mall, Hospital</div>
              </div>
            )}

            {/* Wind Data Panel */}
            {showWindData && (
              <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-blue-600" />
                  Wind & Dispersion
                </h4>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center relative mb-2"
                      style={{ transform: `rotate(${windData.direction}deg)` }}
                    >
                      <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-blue-500" />
                    </div>
                    <div className="text-xs font-medium text-gray-700">{Math.round(windData.direction)}°</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{windData.speed} mph</div>
                    <div
                      className={cn(
                        "text-xs font-medium",
                        windData.quality === "high"
                          ? "text-green-600"
                          : windData.quality === "moderate"
                            ? "text-yellow-600"
                            : "text-red-600",
                      )}
                    >
                      {windData.quality === "high"
                        ? "Good Dispersion"
                        : windData.quality === "moderate"
                          ? "Moderate Dispersion"
                          : "Poor Dispersion"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Realistic Map Background */}
            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Base map with realistic features */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Background */}
                <rect width="100" height="100" fill="#F3F4F6" />

                {/* Major roads - realistic street grid */}
                <g stroke="#D1D5DB" strokeWidth="0.3" fill="none">
                  {/* Horizontal streets */}
                  <line x1="0" y1="20" x2="100" y2="20" />
                  <line x1="0" y1="35" x2="100" y2="35" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <line x1="0" y1="65" x2="100" y2="65" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="100" y2="80" />

                  {/* Vertical streets */}
                  <line x1="15" y1="0" x2="15" y2="100" />
                  <line x1="30" y1="0" x2="30" y2="100" strokeWidth="0.5" />
                  <line x1="45" y1="0" x2="45" y2="100" />
                  <line x1="60" y1="0" x2="60" y2="100" strokeWidth="0.5" />
                  <line x1="75" y1="0" x2="75" y2="100" />
                  <line x1="90" y1="0" x2="90" y2="100" />
                </g>

                {/* Water bodies */}
                <path
                  d="M0,70 Q20,65 40,70 T80,75 Q90,73 100,75 L100,85 Q80,83 60,85 T20,80 Q10,82 0,80 Z"
                  fill="#3B82F6"
                  opacity="0.4"
                />
                <circle cx="25" cy="25" r="8" fill="#3B82F6" opacity="0.3" />

                {/* Parks and green spaces */}
                <rect x="60" y="20" width="15" height="12" fill="#10B981" opacity="0.3" rx="2" />
                <circle cx="35" cy="55" r="10" fill="#10B981" opacity="0.3" />
                <rect x="70" y="70" width="20" height="15" fill="#10B981" opacity="0.3" rx="3" />

                {/* Urban blocks */}
                <rect x="40" y="30" width="12" height="15" fill="#6B7280" opacity="0.2" rx="1" />
                <rect x="20" y="40" width="15" height="20" fill="#6B7280" opacity="0.2" rx="1" />
                <rect x="80" y="25" width="10" height="18" fill="#6B7280" opacity="0.2" rx="1" />
                <rect x="50" y="60" width="18" height="12" fill="#6B7280" opacity="0.2" rx="1" />

                {/* Industrial areas */}
                <rect x="70" y="55" width="25" height="20" fill="#EF4444" opacity="0.1" rx="2" />
                <rect x="10" y="40" width="20" height="15" fill="#EF4444" opacity="0.1" rx="2" />

                {/* Heatmap overlay */}
                {showHeatmap && <g opacity="0.6">{generateHeatmapZones()}</g>}

                {/* Wind flow visualization */}
                {showWindData && (
                  <g opacity="0.4">
                    {Array.from({ length: 8 }, (_, i) => {
                      const x = 10 + i * 12
                      const y = 10 + Math.sin(i * 0.5) * 5
                      const length = 8 + Math.random() * 4
                      const angle = windData.direction * (Math.PI / 180)
                      const endX = x + Math.cos(angle) * length
                      const endY = y + Math.sin(angle) * length

                      return (
                        <g key={i}>
                          <line
                            x1={x}
                            y1={y}
                            x2={endX}
                            y2={endY}
                            stroke="#3B82F6"
                            strokeWidth="0.5"
                            markerEnd="url(#arrowhead)"
                          />
                        </g>
                      )
                    })}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                      </marker>
                    </defs>
                  </g>
                )}
              </svg>

              {/* Route visualization */}
              {showRoutes && optimalRoute && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={getAQIConfig(optimalRoute.start.aqi).color} />
                      <stop offset="100%" stopColor={getAQIConfig(optimalRoute.end.aqi).color} />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${optimalRoute.start.coordinates.x} ${optimalRoute.start.coordinates.y} Q ${optimalRoute.midPoint.x} ${optimalRoute.midPoint.y - 10} ${optimalRoute.end.coordinates.x} ${optimalRoute.end.coordinates.y}`}
                    stroke="url(#routeGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  {/* Route markers */}
                  <circle
                    cx={optimalRoute.start.coordinates.x}
                    cy={optimalRoute.start.coordinates.y}
                    r="3"
                    fill="#10B981"
                  />
                  <circle
                    cx={optimalRoute.end.coordinates.x}
                    cy={optimalRoute.end.coordinates.y}
                    r="3"
                    fill="#EF4444"
                  />
                </svg>
              )}

              {/* AQI Monitoring Points */}
              {locations.map((location) => {
                const config = getAQIConfig(location.aqi)
                const isSelected = selectedLocation?.id === location.id
                const isHovered = hoveredLocation?.id === location.id

                return (
                  <div
                    key={location.id}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
                      isHovered || isSelected ? "scale-125 z-30" : "hover:scale-110 hover:z-20",
                    )}
                    style={{
                      left: `${location.coordinates.x}%`,
                      top: `${location.coordinates.y}%`,
                    }}
                    onMouseEnter={(e) => handleMarkerHover(location, e)}
                    onMouseLeave={handleMarkerLeave}
                    onClick={() => handleMarkerClick(location)}
                  >
                    {/* Pulse effect */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{
                        backgroundColor: config.color,
                        width: "24px",
                        height: "24px",
                        left: "-2px",
                        top: "-2px",
                      }}
                    />

                    {/* Main marker */}
                    <div
                      className={cn(
                        "relative w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-200",
                        isSelected && "ring-4 ring-blue-400 ring-opacity-50",
                      )}
                      style={{ backgroundColor: config.color }}
                    >
                      {location.aqi}
                    </div>

                    {/* Shadow */}
                    <div
                      className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded-full opacity-20 blur-sm"
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Current location indicator */}
            <div className="absolute bottom-4 right-4 z-20">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-200">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">You are here</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Air Quality Data</h3>
                <Badge variant="outline" className="text-xs">
                  {locations.length} Stations
                </Badge>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{locations.filter((l) => l.aqi <= 50).length}</div>
                  <div className="text-xs text-green-600">Good</div>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {locations.filter((l) => l.aqi > 50 && l.aqi <= 100).length}
                  </div>
                  <div className="text-xs text-yellow-600">Moderate</div>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">{locations.filter((l) => l.aqi > 150).length}</div>
                  <div className="text-xs text-red-600">Unhealthy</div>
                </div>
              </div>
            </div>

            {/* Location Details or List */}
            <div className="flex-1 overflow-y-auto">
              {selectedLocation ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{selectedLocation.name}</h4>
                    <Button onClick={() => setSelectedLocation(null)} variant="ghost" size="sm" className="h-6 w-6 p-0">
                      ×
                    </Button>
                  </div>

                  {/* AQI Display */}
                  <div
                    className="text-center p-4 rounded-lg mb-4"
                    style={{ backgroundColor: getAQIConfig(selectedLocation.aqi).bgColor }}
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: getAQIConfig(selectedLocation.aqi).color }}
                    >
                      {selectedLocation.aqi}
                    </div>
                    <div className="text-sm font-medium" style={{ color: getAQIConfig(selectedLocation.aqi).color }}>
                      {getAQIConfig(selectedLocation.aqi).status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Updated {selectedLocation.lastUpdated}</div>
                  </div>

                  {/* Detailed pollutant breakdown */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900">Pollutant Levels</h5>
                    {[
                      {
                        name: "PM2.5",
                        value: selectedLocation.details.pm25,
                        unit: "μg/m³",
                        max: 100,
                        desc: "Fine particles",
                      },
                      {
                        name: "PM10",
                        value: selectedLocation.details.pm10,
                        unit: "μg/m³",
                        max: 150,
                        desc: "Coarse particles",
                      },
                      {
                        name: "O₃",
                        value: selectedLocation.details.o3,
                        unit: "ppb",
                        max: 100,
                        desc: "Ground-level ozone",
                      },
                      {
                        name: "NO₂",
                        value: selectedLocation.details.no2,
                        unit: "ppb",
                        max: 100,
                        desc: "Nitrogen dioxide",
                      },
                      {
                        name: "SO₂",
                        value: selectedLocation.details.so2,
                        unit: "ppb",
                        max: 50,
                        desc: "Sulfur dioxide",
                      },
                      { name: "CO", value: selectedLocation.details.co, unit: "ppm", max: 20, desc: "Carbon monoxide" },
                    ].map((pollutant) => (
                      <div key={pollutant.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-sm">{pollutant.name}</span>
                            <div className="text-xs text-gray-500">{pollutant.desc}</div>
                          </div>
                          <span className="text-sm font-semibold">
                            {pollutant.value} {pollutant.unit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all duration-500",
                              pollutant.value / pollutant.max > 0.8
                                ? "bg-red-500"
                                : pollutant.value / pollutant.max > 0.6
                                  ? "bg-orange-500"
                                  : pollutant.value / pollutant.max > 0.4
                                    ? "bg-yellow-500"
                                    : "bg-green-500",
                            )}
                            style={{ width: `${Math.min((pollutant.value / pollutant.max) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional features */}
                  <div className="mt-6 space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      View Live Camera Feed
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Community Reports (3)
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-center py-6 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">Select a monitoring station</p>
                    <p className="text-sm">Click any marker for detailed air quality data</p>
                  </div>

                  {/* Station list */}
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900 mb-3">Monitoring Stations</h5>
                    {locations.slice(0, 6).map((location) => {
                      const config = getAQIConfig(location.aqi)
                      return (
                        <div
                          key={location.id}
                          onClick={() => handleMarkerClick(location)}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">{location.name}</div>
                            <div className="text-xs text-gray-500">{location.lastUpdated}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg" style={{ color: config.color }}>
                              {location.aqi}
                            </div>
                            <div className="text-xs" style={{ color: config.color }}>
                              {config.status}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Tooltip */}
        {hoveredLocation && !selectedLocation && (
          <div
            className="fixed z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl p-3 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            <div className="space-y-1 min-w-[200px]">
              <div className="font-semibold text-gray-900">{hoveredLocation.name}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AQI:</span>
                <span className="font-bold text-lg" style={{ color: getAQIConfig(hoveredLocation.aqi).color }}>
                  {hoveredLocation.aqi}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium" style={{ color: getAQIConfig(hoveredLocation.aqi).color }}>
                  {getAQIConfig(hoveredLocation.aqi).status}
                </span>
              </div>
              <div className="text-xs text-gray-500">PM2.5: {hoveredLocation.details.pm25} μg/m³</div>
              <div className="text-xs text-blue-600 font-medium">Click for full details →</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
