"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { TrendingUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface AQIDataPoint {
  date: string
  fullDate: string
  aqi: number
  status: string
  color: string
}

interface AQITrendChartProps {
  className?: string
}

export default function AQITrendChart({ className }: AQITrendChartProps) {
  // Generate mock data for the past 7 days
  const generatePastWeekData = (): AQIDataPoint[] => {
    const today = new Date()
    const mockAQIValues = [45, 38, 52, 41, 67, 48, 42] // Mock AQI values for past 7 days

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (6 - index)) // Start from 6 days ago to today

      const aqi = mockAQIValues[index]
      const getAQIStatus = (value: number) => {
        if (value <= 50) return { status: "Good", color: "#10B981" }
        if (value <= 100) return { status: "Moderate", color: "#F59E0B" }
        if (value <= 150) return { status: "Unhealthy for Sensitive", color: "#F97316" }
        if (value <= 200) return { status: "Unhealthy", color: "#EF4444" }
        return { status: "Very Unhealthy", color: "#8B5CF6" }
      }

      const { status, color } = getAQIStatus(aqi)

      return {
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        aqi,
        status,
        color,
      }
    })
  }

  const data = generatePastWeekData()

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px]">
          <div className="space-y-2">
            <div className="font-semibold text-gray-900">{data.fullDate}</div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AQI Level:</span>
              <span className="font-bold text-lg" style={{ color: data.color }}>
                {data.aqi}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-sm" style={{ color: data.color }}>
                {data.status}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: data.color,
                  width: `${Math.min((data.aqi / 200) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // Calculate average AQI for the week
  const averageAQI = Math.round(data.reduce((sum, day) => sum + day.aqi, 0) / data.length)
  const getAverageStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "text-green-600" }
    if (aqi <= 100) return { status: "Moderate", color: "text-yellow-600" }
    if (aqi <= 150) return { status: "Unhealthy for Sensitive", color: "text-orange-600" }
    if (aqi <= 200) return { status: "Unhealthy", color: "text-red-600" }
    return { status: "Very Unhealthy", color: "text-purple-600" }
  }

  const averageStatus = getAverageStatus(averageAQI)

  return (
    <Card className={cn("bg-white shadow-lg border-0 overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Past Week AQI Trend
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-gray-500">7-day average</div>
            <div className={cn("text-lg font-bold", averageStatus.color)}>{averageAQI}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <ChartContainer
          config={{
            aqi: {
              label: "AQI Level",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="25%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="75%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                domain={[0, "dataMax + 20"]}
                dx={-10}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3B82F6", strokeWidth: 2, strokeOpacity: 0.5 }} />

              <Area
                type="monotone"
                dataKey="aqi"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                fill="url(#aqiGradient)"
                dot={{
                  fill: "#3B82F6",
                  strokeWidth: 2,
                  stroke: "#FFFFFF",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: "#3B82F6",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  drop: true,
                }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Lowest</div>
            <div className="text-lg font-bold text-green-600">{Math.min(...data.map((d) => d.aqi))}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Highest</div>
            <div className="text-lg font-bold text-orange-600">{Math.max(...data.map((d) => d.aqi))}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Average</div>
            <div className={cn("text-lg font-bold", averageStatus.color)}>{averageAQI}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Trend</div>
            <div className="flex items-center justify-center">
              {data[6].aqi > data[0].aqi ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <TrendingUp className="w-5 h-5 text-green-500 rotate-180" />
              )}
            </div>
          </div>
        </div>

        {/* AQI Scale Reference */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-700">AQI Reference Scale</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">0-50 Good</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">51-100 Moderate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">101-150 Unhealthy*</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">151-200 Unhealthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">201+ Very Unhealthy</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">*Unhealthy for Sensitive Groups</p>
        </div>
      </CardContent>
    </Card>
  )
}
