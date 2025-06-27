"use client"

import AppFooter from "./app-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind, BarChart3, MapPin, Settings, Smartphone, Monitor, LinkIcon } from "lucide-react"

export default function FooterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Air Quality App Footer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Compact, responsive footer with navigation links and social icons
            </p>
          </div>

          {/* Mock App Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Real-time air quality monitoring and analytics for your location.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  Air Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Current AQI levels, pollutant breakdown, and health recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Monitor air quality across multiple locations and regions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Customize notifications, units, and personal preferences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Features */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                Footer Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <LinkIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Navigation Links</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• About page link</li>
                    <li>• Contact information</li>
                    <li>• Privacy Policy</li>
                    <li>• Powered by IQAir attribution</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Responsive Design</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Mobile-first approach</li>
                    <li>• Stacked layout on small screens</li>
                    <li>• Horizontal layout on desktop</li>
                    <li>• Touch-friendly social icons</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Visual Design</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Dark background (gray-800)</li>
                    <li>• Muted text colors</li>
                    <li>• Smooth hover transitions</li>
                    <li>• Proper contrast ratios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Specifications */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                Design Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Layout Structure</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>Container:</strong> max-w-7xl with responsive padding
                    </li>
                    <li>
                      • <strong>Main row:</strong> Flexbox with space-between alignment
                    </li>
                    <li>
                      • <strong>Links section:</strong> Left-aligned navigation and attribution
                    </li>
                    <li>
                      • <strong>Social section:</strong> Right-aligned icon buttons
                    </li>
                    <li>
                      • <strong>Copyright:</strong> Bottom row with divider
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Color Scheme</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>Background:</strong> bg-gray-800 (dark theme)
                    </li>
                    <li>
                      • <strong>Primary text:</strong> text-gray-300 (muted white)
                    </li>
                    <li>
                      • <strong>Hover text:</strong> text-white (bright white)
                    </li>
                    <li>
                      • <strong>Accent links:</strong> text-blue-400 (IQAir link)
                    </li>
                    <li>
                      • <strong>Borders:</strong> border-gray-700 (subtle dividers)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spacer to show footer positioning */}
          <div className="h-32 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-gray-600 dark:text-gray-300">Scroll down to see the footer</p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
