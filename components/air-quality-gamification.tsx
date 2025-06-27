"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Zap, Award, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  unlocked: boolean
  progress: number
  maxProgress: number
}

interface AirQualityGamificationProps {
  currentAQI: number
  location: string
  className?: string
}

export default function AirQualityGamification({ currentAQI, location, className }: AirQualityGamificationProps) {
  const [userLevel, setUserLevel] = useState(3)
  const [totalPoints, setTotalPoints] = useState(1250)
  const [streak, setStreak] = useState(7)

  const achievements: Achievement[] = [
    {
      id: "first-check",
      name: "Air Quality Explorer",
      description: "Check air quality for the first time",
      icon: Target,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: "week-streak",
      name: "Weekly Warrior",
      description: "Check air quality for 7 consecutive days",
      icon: Zap,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
    },
    {
      id: "location-master",
      name: "Location Master",
      description: "Check air quality in 10 different cities",
      icon: Trophy,
      unlocked: false,
      progress: 6,
      maxProgress: 10,
    },
    {
      id: "health-conscious",
      name: "Health Conscious",
      description: "Follow health recommendations 20 times",
      icon: Award,
      unlocked: false,
      progress: 14,
      maxProgress: 20,
    },
  ]

  const getAQIPoints = (aqi: number) => {
    if (aqi <= 50) return 10 // Bonus for good air quality
    if (aqi <= 100) return 5
    if (aqi <= 150) return 3
    return 1 // Still get points for checking bad air quality
  }

  const levelProgress = ((totalPoints % 500) / 500) * 100

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Air Quality Champion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userLevel}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Level</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPoints}</div>
            <div className="text-sm text-green-600 dark:text-green-400">Points</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{streak}</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Day Streak</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Level {userLevel} Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(levelProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Today's Challenge */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">Daily Challenge</h4>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Check air quality in 3 different locations today
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full w-1/3" />
            </div>
            <span className="text-xs text-purple-600 dark:text-purple-400">1/3</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white">Achievements</h4>
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon
            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  achievement.unlocked
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    achievement.unlocked
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400",
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">{achievement.name}</h5>
                    {achievement.unlocked && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      Progress: {achievement.progress}/{achievement.maxProgress}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Points for current check */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              +{getAQIPoints(currentAQI)} points for checking {location}!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
