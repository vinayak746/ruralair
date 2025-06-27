"use client"

import DarkModeToggle from "./dark-mode-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, Palette, Zap, Eye, Smartphone } from "lucide-react"

export default function DarkModeDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4 pt-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Dark Mode Toggle
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Smooth theme switching with sun and moon icons in the top-right corner
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Light Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Clean, bright interface with blue accents and white backgrounds for daytime use.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Dark Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Easy on the eyes with dark backgrounds and warm accents for nighttime viewing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  Smooth Transitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  All elements transition smoothly between themes with 300-500ms animations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                Toggle Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    Visual Elements
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Animated sun and moon icons with rotation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Backdrop blur effect for modern appearance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Floating particle effects
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Hover and active state animations
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    Functionality
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Remembers preference in localStorage
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Respects system dark mode preference
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Accessible with proper ARIA labels
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      Prevents hydration mismatches
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white transition-colors duration-300">
                <Palette className="w-5 h-5" />
                Theme Demonstration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Background</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smooth gradient transitions between light and dark backgrounds.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Cards</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All cards and components adapt their colors and borders automatically.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Text</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Typography maintains proper contrast ratios in both themes.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-blue-200 dark:border-gray-600 transition-all duration-300">
                <p className="text-sm text-blue-800 dark:text-blue-200 transition-colors duration-300">
                  <strong>Try it out:</strong> Click the toggle button in the top-right corner to switch between light
                  and dark modes. Notice how all elements transition smoothly with proper timing and easing.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Spacer for better visibility of toggle */}
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  )
}
