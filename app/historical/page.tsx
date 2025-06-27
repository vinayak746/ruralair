"use client"
import Navigation from "../../navigation"
import AQITrendChart from "../../aqi-trend-chart"
import AppFooter from "../../app-footer"

export default function HistoricalPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation currentPage="Historical" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Historical Air Quality Data</h1>
            <p className="text-gray-600 dark:text-gray-400">Analyze past trends and patterns in air quality</p>
          </div>

          <AQITrendChart />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
