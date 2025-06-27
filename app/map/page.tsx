"use client"
import Navigation from "../../navigation"
import AQIMap from "../../aqi-map"
import AppFooter from "../../app-footer"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation currentPage="Map" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px:4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Regional Air Quality Map</h1>
            <p className="text-gray-600 dark:text-gray-400">Explore air quality data in your area and nearby regions</p>
          </div>

          <AQIMap />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
