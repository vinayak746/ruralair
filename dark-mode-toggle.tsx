"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DarkModeToggleProps {
  className?: string
}

export default function DarkModeToggle({ className }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize theme on component mount
  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
    setIsLoaded(true)
  }, [])

  // Update theme in DOM and localStorage
  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
  }

  // Don't render until loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className={cn("fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gray-200 animate-pulse", className)} />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-4 right-4 z-50 group",
        "w-12 h-12 rounded-full shadow-lg border-2",
        "transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-4 focus:ring-offset-2",
        "hover:scale-110 active:scale-95",
        "backdrop-blur-md",
        isDark
          ? "bg-gray-800/90 border-gray-600 text-yellow-400 hover:bg-gray-700/90 focus:ring-yellow-400/50"
          : "bg-white/90 border-gray-200 text-blue-600 hover:bg-gray-50/90 focus:ring-blue-400/50",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={cn(
            "absolute w-5 h-5 transition-all duration-500 ease-in-out",
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 drop-shadow-sm",
          )}
        />

        {/* Moon Icon */}
        <Moon
          className={cn(
            "absolute w-5 h-5 transition-all duration-500 ease-in-out",
            isDark ? "opacity-100 rotate-0 scale-100 drop-shadow-sm" : "opacity-0 -rotate-90 scale-0",
          )}
        />

        {/* Animated background circle */}
        <div
          className={cn(
            "absolute inset-1 rounded-full transition-all duration-300 ease-in-out",
            isDark
              ? "bg-gradient-to-br from-gray-700 to-gray-900 opacity-20"
              : "bg-gradient-to-br from-blue-100 to-yellow-100 opacity-30",
          )}
        />

        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full bg-current opacity-0 group-active:opacity-20 transition-opacity duration-150" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full transition-all duration-1000",
              isDark ? "bg-yellow-400/40" : "bg-blue-400/40",
              "animate-pulse",
            )}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </button>
  )
}
