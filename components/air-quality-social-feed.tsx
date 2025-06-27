"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MapPin, Camera, AlertTriangle, Users, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialPost {
  id: string
  user: {
    name: string
    avatar: string
    location: string
    verified: boolean
  }
  content: string
  image?: string
  aqi: number
  location: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  type: "report" | "photo" | "alert" | "tip"
  isLiked: boolean
}

interface AirQualitySocialFeedProps {
  className?: string
}

export default function AirQualitySocialFeed({ className }: AirQualitySocialFeedProps) {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [newPost, setNewPost] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  // Mock social feed data
  const mockPosts: SocialPost[] = [
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Downtown",
        verified: true,
      },
      content:
        "Heavy smog visible from my office window today. AQI spiked to 165! Everyone please stay indoors and wear masks if you must go out. 😷",
      aqi: 165,
      location: "Downtown Central",
      timestamp: "2 min ago",
      likes: 24,
      comments: 8,
      shares: 12,
      type: "alert",
      isLiked: false,
    },
    {
      id: "2",
      user: {
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Green Park",
        verified: false,
      },
      content:
        "Beautiful clear morning at Green Park! Perfect for a jog. Air quality is excellent today at AQI 28. 🌱✨",
      image: "/placeholder.svg?height=200&width=300",
      aqi: 28,
      location: "Green Park District",
      timestamp: "15 min ago",
      likes: 45,
      comments: 12,
      shares: 6,
      type: "photo",
      isLiked: true,
    },
    {
      id: "3",
      user: {
        name: "Dr. Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "City Hospital",
        verified: true,
      },
      content:
        "💡 Pro tip: Indoor plants like spider plants and peace lilies can help improve indoor air quality naturally. Great for days when outdoor AQI is high!",
      aqi: 0,
      location: "",
      timestamp: "1 hour ago",
      likes: 89,
      comments: 23,
      shares: 34,
      type: "tip",
      isLiked: false,
    },
    {
      id: "4",
      user: {
        name: "Community Alert",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Industrial Zone",
        verified: true,
      },
      content:
        "🚨 Air quality alert: Industrial Zone East reporting AQI 182. Avoid outdoor activities. Emergency services are monitoring the situation.",
      aqi: 182,
      location: "Industrial Zone East",
      timestamp: "2 hours ago",
      likes: 156,
      comments: 45,
      shares: 78,
      type: "alert",
      isLiked: true,
    },
  ]

  useEffect(() => {
    setPosts(mockPosts)
  }, [])

  const getAQIConfig = (aqi: number) => {
    if (aqi <= 50) return { color: "#10B981", status: "Good" }
    if (aqi <= 100) return { color: "#F59E0B", status: "Moderate" }
    if (aqi <= 150) return { color: "#F97316", status: "Unhealthy*" }
    if (aqi <= 200) return { color: "#EF4444", status: "Unhealthy" }
    return { color: "#8B5CF6", status: "Very Unhealthy" }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "photo":
        return <Camera className="w-4 h-4 text-blue-500" />
      case "tip":
        return <Users className="w-4 h-4 text-green-500" />
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handlePost = async () => {
    if (!newPost.trim()) return

    setIsPosting(true)

    // Simulate posting delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPostData: SocialPost = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Your Location",
        verified: false,
      },
      content: newPost,
      aqi: 0,
      location: "",
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      type: "report",
      isLiked: false,
    }

    setPosts([newPostData, ...posts])
    setNewPost("")
    setIsPosting(false)
  }

  return (
    <Card className={cn("bg-white shadow-lg border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Community Air Quality Feed
        </CardTitle>
        <p className="text-sm text-gray-600">Real-time updates from your community</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post composer */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Input
                placeholder="Share air quality updates with your community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-0 bg-white"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Camera className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </Button>
                </div>
                <Button onClick={handlePost} disabled={!newPost.trim() || isPosting} size="sm">
                  <Send className="w-4 h-4 mr-1" />
                  {isPosting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts feed */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts.map((post) => {
            const aqiConfig = post.aqi > 0 ? getAQIConfig(post.aqi) : null

            return (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                {/* Post header */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{post.user.name}</span>
                      {post.user.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          Verified
                        </Badge>
                      )}
                      {getPostTypeIcon(post.type)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{post.user.location}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="mb-3">
                  <p className="text-gray-900 mb-2">{post.content}</p>

                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                  )}

                  {aqiConfig && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="border-2"
                        style={{
                          borderColor: aqiConfig.color,
                          color: aqiConfig.color,
                        }}
                      >
                        AQI {post.aqi} • {aqiConfig.status}
                      </Badge>
                      {post.location && <span className="text-sm text-gray-500">at {post.location}</span>}
                    </div>
                  )}
                </div>

                {/* Post actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={cn("text-gray-500 hover:text-red-500", post.isLiked && "text-red-500")}
                    >
                      <Heart className={cn("w-4 h-4 mr-1", post.isLiked && "fill-current")} />
                      {post.likes}
                    </Button>

                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>

                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Community stats */}
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">1,247</div>
              <div className="text-xs text-gray-500">Active Users</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">89</div>
              <div className="text-xs text-gray-500">Reports Today</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">23</div>
              <div className="text-xs text-gray-500">Alerts Active</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
