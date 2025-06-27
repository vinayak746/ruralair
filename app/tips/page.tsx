"use client"
import Navigation from "../../navigation"
import InfoTipCard from "../../info-tip-card"
import AppFooter from "../../app-footer"

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation currentPage="Tips" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Air Quality Tips & Recommendations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how to protect your health and improve indoor air quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoTipCard autoRotate={false} />
            <InfoTipCard autoRotate={false} />
            <InfoTipCard autoRotate={false} />
            <InfoTipCard autoRotate={false} />
            <InfoTipCard autoRotate={false} />
            <InfoTipCard autoRotate={false} />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
