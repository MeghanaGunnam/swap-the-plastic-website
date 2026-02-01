"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, MessageCircle, Calendar, MapPin, Heart, Share2, Plus, TrendingUp, Award } from "lucide-react"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    level: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
}

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  attendees: number
  maxAttendees: number
  organizer: string
  category: string
}

interface Challenge {
  id: number
  title: string
  description: string
  participants: number
  duration: string
  reward: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Sarah Green",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Eco Warrior",
    },
    content:
      "Just completed my first month of zero plastic shopping! Here are my top 5 sustainable swaps that made the biggest difference. The bamboo toothbrush was a game-changer! 🌱",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
    tags: ["ZeroWaste", "Sustainable", "Tips"],
  },
  {
    id: 2,
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Green Champion",
    },
    content:
      "Organized a beach cleanup this weekend and collected over 200 plastic bottles! Amazing to see our community come together. Next cleanup is scheduled for next month - who's in?",
    image: "/placeholder.svg?height=200&width=400",
    likes: 45,
    comments: 12,
    timestamp: "5 hours ago",
    tags: ["BeachCleanup", "Community", "Action"],
  },
  {
    id: 3,
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Plastic Fighter",
    },
    content:
      "Found an amazing local recycling center that accepts electronics! They even gave me a tour of their facility. It's incredible how much they can recover and reuse.",
    likes: 18,
    comments: 5,
    timestamp: "1 day ago",
    tags: ["Recycling", "Electronics", "Local"],
  },
]

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Community Beach Cleanup",
    description: "Join us for a morning of beach cleaning and environmental awareness. All supplies provided!",
    date: "2024-02-15",
    location: "Sunset Beach Park",
    attendees: 23,
    maxAttendees: 50,
    organizer: "Green Warriors Group",
    category: "Cleanup",
  },
  {
    id: 2,
    title: "Sustainable Living Workshop",
    description:
      "Learn practical tips for reducing plastic waste in your daily life. Interactive session with expert speakers.",
    date: "2024-02-20",
    location: "Community Center",
    attendees: 15,
    maxAttendees: 30,
    organizer: "EcoEducate",
    category: "Workshop",
  },
  {
    id: 3,
    title: "Plastic-Free Market",
    description:
      "Discover local vendors offering sustainable alternatives to plastic products. Support local eco-businesses!",
    date: "2024-02-25",
    location: "Central Park",
    attendees: 67,
    maxAttendees: 100,
    organizer: "Sustainable City Initiative",
    category: "Market",
  },
]

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "7-Day Plastic-Free Challenge",
    description: "Go completely plastic-free for one week and document your journey",
    participants: 156,
    duration: "7 days",
    reward: "Eco Warrior Badge",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Recycle 50 Items",
    description: "Find and properly recycle 50 different plastic items",
    participants: 89,
    duration: "30 days",
    reward: "Recycling Master Badge",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Zero Waste Month",
    description: "Eliminate all single-use plastics for an entire month",
    participants: 34,
    duration: "30 days",
    reward: "Zero Waste Champion Badge",
    difficulty: "Hard",
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleNewPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: posts.length + 1,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Eco Enthusiast",
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      tags: ["Personal"],
    }

    setPosts([post, ...posts])
    setNewPost("")
    setIsPostDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Community Hub</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with eco-warriors, share your journey, and make a difference together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-1">2,847</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">156</div>
              <div className="text-sm text-gray-600">Events This Month</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">89</div>
              <div className="text-sm text-gray-600">Active Challenges</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600 mb-1">12.5k</div>
              <div className="text-sm text-gray-600">Tons Recycled</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Community Feed */}
          <TabsContent value="feed" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 justify-start text-gray-500 bg-transparent">
                            Share your eco journey...
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create a Post</DialogTitle>
                            <DialogDescription>
                              Share your sustainable living tips, achievements, or questions with the community.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="What's on your mind?"
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              rows={4}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleNewPost}>Post</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {post.author.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending Topics */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["#ZeroWaste", "#PlasticFree", "#BeachCleanup", "#SustainableLiving", "#EcoTips"].map(
                      (topic, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-blue-600 hover:underline cursor-pointer">{topic}</span>
                          <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 10} posts</span>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Start Challenge
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Find Groups
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{event.category}</Badge>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                    <div className="text-sm text-gray-600">Organized by {event.organizer}</div>
                    <Button className="w-full">Join Event</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          challenge.difficulty === "Easy"
                            ? "default"
                            : challenge.difficulty === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">{challenge.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {challenge.participants} participants
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <Award className="h-4 w-4 mr-1" />
                      Reward: {challenge.reward}
                    </div>
                    <Button className="w-full">Join Challenge</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="mt-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Eco Warriors This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Green",
                      points: 2847,
                      level: "Eco Warrior",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Mike Chen",
                      points: 2156,
                      level: "Green Champion",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Emma Wilson",
                      points: 1923,
                      level: "Plastic Fighter",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "David Park",
                      points: 1678,
                      level: "Carbon Reducer",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Lisa Johnson",
                      points: 1445,
                      level: "Consistency King",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                      <div className="text-lg font-bold text-gray-500 w-8">#{index + 1}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
