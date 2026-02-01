"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Legend,
} from "recharts"
import {
  TreePine,
  Waves,
  Recycle,
  Target,
  Share2,
  Download,
  Trophy,
  Leaf,
  Factory,
  Users,
  Globe,
  Clock,
  CheckCircle,
  Star,
  Gift,
  Zap,
  Plus,
} from "lucide-react"

interface ImpactData {
  trackedAlternatives: number[]
  trackedRecyclers: number[]
  impactHistory: Array<{
    date: string
    co2Saved: number
    plasticAvoided: number
    moneySpent: number
    itemsAdded: number
  }>
  achievements: string[]
  goals: Array<{
    id: string
    title: string
    target: number
    current: number
    type: string
    deadline: string
  }>
}

export default function ImpactPage() {
  const [impactData, setImpactData] = useState<ImpactData>({
    trackedAlternatives: [],
    trackedRecyclers: [],
    impactHistory: [],
    achievements: [],
    goals: [],
  })
  const [mounted, setMounted] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showGoalsDialog, setShowGoalsDialog] = useState(false)

  // Sample alternatives data (in real app, this would come from API)
  const alternatives = [
    {
      id: 1,
      name: "Bamboo Water Bottle",
      price: 1899,
      co2_saved: 12.5,
      plastic_avoided: 365,
      category: "Drinkware",
    },
    {
      id: 2,
      name: "Reusable Silicone Food Bags",
      price: 1599,
      co2_saved: 8.3,
      plastic_avoided: 500,
      category: "Food Storage",
    },
    {
      id: 3,
      name: "Stainless Steel Straws",
      price: 999,
      co2_saved: 2.1,
      plastic_avoided: 1000,
      category: "Drinkware",
    },
    {
      id: 4,
      name: "Beeswax Food Wraps",
      price: 1299,
      co2_saved: 5.7,
      plastic_avoided: 200,
      category: "Food Storage",
    },
    {
      id: 5,
      name: "Bamboo Toothbrush Set",
      price: 699,
      co2_saved: 1.2,
      plastic_avoided: 4,
      category: "Personal Care",
    },
  ]

  // Sample recyclers data
  const recyclers = [
    { id: 1, name: "Visakha EcoRecycle Center", co2_impact: 1.2, plastic_processed: 450 },
    { id: 2, name: "Green Vizag Recycling", co2_impact: 1.8, plastic_processed: 720 },
    { id: 3, name: "Clean Andhra Facility", co2_impact: 0.95, plastic_processed: 280 },
  ]

  // Achievement definitions
  const achievementDefinitions = [
    {
      id: "first_alternative",
      title: "Eco Warrior",
      description: "Track your first sustainable alternative",
      icon: "🌱",
      requirement: 1,
    },
    {
      id: "five_alternatives",
      title: "Green Champion",
      description: "Track 5 sustainable alternatives",
      icon: "🏆",
      requirement: 5,
    },
    {
      id: "co2_saver",
      title: "Carbon Reducer",
      description: "Save 50kg CO2 annually",
      icon: "🌍",
      requirement: 50,
    },
    {
      id: "plastic_avoider",
      title: "Plastic Fighter",
      description: "Avoid 1000 plastic items annually",
      icon: "♻️",
      requirement: 1000,
    },
    {
      id: "month_streak",
      title: "Consistency King",
      description: "Track impact for 30 consecutive days",
      icon: "⚡",
      requirement: 30,
    },
    {
      id: "recycler_supporter",
      title: "Community Helper",
      description: "Track 3 local recyclers",
      icon: "🤝",
      requirement: 3,
    },
  ]

  useEffect(() => {
    setMounted(true)
    loadImpactData()
  }, [])

  const loadImpactData = () => {
    try {
      const trackedAlternatives = JSON.parse(localStorage.getItem("trackedAlternatives") || "[]")
      const trackedRecyclers = JSON.parse(localStorage.getItem("trackedRecyclers") || "[]")
      const impactHistory = JSON.parse(localStorage.getItem("impactHistory") || "[]")
      const achievements = JSON.parse(localStorage.getItem("achievements") || "[]")
      const goals = JSON.parse(localStorage.getItem("impactGoals") || "[]")

      setImpactData({
        trackedAlternatives,
        trackedRecyclers,
        impactHistory,
        achievements,
        goals,
      })

      // Check for new achievements
      checkAchievements(trackedAlternatives, trackedRecyclers, achievements)
    } catch (error) {
      console.error("Error loading impact data:", error)
    }
  }

  const checkAchievements = (trackedAlts: number[], trackedRecs: number[], currentAchievements: string[]) => {
    const newAchievements = [...currentAchievements]
    const totalImpact = calculateTotalImpact(trackedAlts, trackedRecs)

    achievementDefinitions.forEach((achievement) => {
      if (!newAchievements.includes(achievement.id)) {
        let earned = false

        switch (achievement.id) {
          case "first_alternative":
            earned = trackedAlts.length >= 1
            break
          case "five_alternatives":
            earned = trackedAlts.length >= 5
            break
          case "co2_saver":
            earned = totalImpact.totalCO2 >= 50
            break
          case "plastic_avoider":
            earned = totalImpact.totalPlastic >= 1000
            break
          case "recycler_supporter":
            earned = trackedRecs.length >= 3
            break
        }

        if (earned) {
          newAchievements.push(achievement.id)
        }
      }
    })

    if (newAchievements.length > currentAchievements.length) {
      localStorage.setItem("achievements", JSON.stringify(newAchievements))
      setImpactData((prev) => ({ ...prev, achievements: newAchievements }))
    }
  }

  const calculateTotalImpact = (trackedAlts: number[], trackedRecs: number[]) => {
    const trackedAlternatives = alternatives.filter((alt) => trackedAlts.includes(alt.id))
    const trackedRecyclersList = recyclers.filter((rec) => trackedRecs.includes(rec.id))

    const totalCO2 = trackedAlternatives.reduce((sum, item) => sum + item.co2_saved, 0)
    const totalPlastic = trackedAlternatives.reduce((sum, item) => sum + item.plastic_avoided, 0)
    const totalSpent = trackedAlternatives.reduce((sum, item) => sum + item.price, 0)
    const recyclerCO2 = trackedRecyclersList.reduce((sum, rec) => sum + rec.co2_impact, 0)
    const recyclerPlastic = trackedRecyclersList.reduce((sum, rec) => sum + rec.plastic_processed, 0)

    return {
      totalCO2: totalCO2 + recyclerCO2,
      totalPlastic: totalPlastic + recyclerPlastic,
      totalSpent,
      itemsTracked: trackedAlts.length,
      recyclersTracked: trackedRecs.length,
    }
  }

  const generateTimeSeriesData = () => {
    const data = []
    const now = new Date()
    const days = selectedTimeframe === "week" ? 7 : selectedTimeframe === "month" ? 30 : 365

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Simulate progressive impact growth
      const progress = (days - i) / days
      const impact = calculateTotalImpact(impactData.trackedAlternatives, impactData.trackedRecyclers)

      data.push({
        date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        co2Saved: Math.round(impact.totalCO2 * progress * 10) / 10,
        plasticAvoided: Math.round(impact.totalPlastic * progress),
        cumulativeCO2: Math.round(impact.totalCO2 * progress * 10) / 10,
      })
    }

    return data
  }

  const getCategoryBreakdown = () => {
    const trackedAlts = alternatives.filter((alt) => impactData.trackedAlternatives.includes(alt.id))
    const categoryData: { [key: string]: { co2: number; plastic: number; count: number } } = {}

    trackedAlts.forEach((alt) => {
      if (!categoryData[alt.category]) {
        categoryData[alt.category] = { co2: 0, plastic: 0, count: 0 }
      }
      categoryData[alt.category].co2 += alt.co2_saved
      categoryData[alt.category].plastic += alt.plastic_avoided
      categoryData[alt.category].count += 1
    })

    return Object.entries(categoryData).map(([category, data]) => ({
      category,
      co2: Math.round(data.co2 * 10) / 10,
      plastic: data.plastic,
      count: data.count,
    }))
  }

  const getImpactLevel = (co2Saved: number) => {
    if (co2Saved < 10) return { level: "Beginner", color: "bg-gray-500", next: 10 }
    if (co2Saved < 25) return { level: "Eco Warrior", color: "bg-green-500", next: 25 }
    if (co2Saved < 50) return { level: "Green Champion", color: "bg-blue-500", next: 50 }
    if (co2Saved < 100) return { level: "Carbon Crusher", color: "bg-purple-500", next: 100 }
    return { level: "Planet Protector", color: "bg-gold-500", next: null }
  }

  const shareImpact = () => {
    const impact = calculateTotalImpact(impactData.trackedAlternatives, impactData.trackedRecyclers)
    const text = `🌱 I've saved ${impact.totalCO2.toFixed(1)}kg CO2 and avoided ${impact.totalPlastic.toLocaleString()} plastic items with SwapThePlastic! Join me in making a difference. #SwapThePlastic #EcoWarrior`

    if (navigator.share) {
      navigator.share({
        title: "My Environmental Impact",
        text: text,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert("Impact shared to clipboard!")
    }
  }

  const downloadReport = () => {
    const impact = calculateTotalImpact(impactData.trackedAlternatives, impactData.trackedRecyclers)
    const report = `
SwapThePlastic Impact Report
Generated: ${new Date().toLocaleDateString()}

ENVIRONMENTAL IMPACT:
• CO2 Saved: ${impact.totalCO2.toFixed(1)} kg/year
• Plastic Items Avoided: ${impact.totalPlastic.toLocaleString()}/year
• Sustainable Products: ${impact.itemsTracked}
• Recyclers Supported: ${impact.recyclersTracked}

ACHIEVEMENTS UNLOCKED: ${impactData.achievements.length}
${achievementDefinitions
  .filter((a) => impactData.achievements.includes(a.id))
  .map((a) => `• ${a.icon} ${a.title}: ${a.description}`)
  .join("\n")}

Keep up the great work! 🌱
    `

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "swaptheplastic-impact-report.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your impact data...</p>
          </div>
        </div>
      </div>
    )
  }

  const totalImpact = calculateTotalImpact(impactData.trackedAlternatives, impactData.trackedRecyclers)
  const impactLevel = getImpactLevel(totalImpact.totalCO2)
  const timeSeriesData = generateTimeSeriesData()
  const categoryData = getCategoryBreakdown()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Environmental Impact</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Monitor your positive environmental contribution and see how your sustainable choices make a difference
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={shareImpact} className="bg-blue-600 hover:bg-blue-700" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              Share My Impact
            </Button>
            <Button onClick={downloadReport} variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Download Report
            </Button>
            <Button onClick={() => setShowGoalsDialog(true)} className="bg-purple-600 hover:bg-purple-700" size="lg">
              <Target className="h-5 w-5 mr-2" />
              Set Goals
            </Button>
          </div>
        </div>

        {/* Impact Level Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Your Impact Level: {impactLevel.level}
              </div>
              <Badge className={`${impactLevel.color} text-white`}>{impactLevel.level}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalImpact.totalCO2.toFixed(1)} kg</div>
                <div className="text-sm text-gray-600">CO2 Saved/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalImpact.totalPlastic.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Plastic Items Avoided/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{totalImpact.itemsTracked}</div>
                <div className="text-sm text-gray-600">Sustainable Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalImpact.recyclersTracked}</div>
                <div className="text-sm text-gray-600">Recyclers Supported</div>
              </div>
            </div>

            {impactLevel.next && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to next level</span>
                  <span>
                    {totalImpact.totalCO2.toFixed(1)} / {impactLevel.next} kg CO2
                  </span>
                </div>
                <Progress value={(totalImpact.totalCO2 / impactLevel.next) * 100} className="h-3" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Impact Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TreePine className="h-5 w-5 mr-2 text-green-600" />
                    Environmental Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <TreePine className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">CO2 Prevented</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{totalImpact.totalCO2.toFixed(1)} kg</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Waves className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">Plastic Avoided</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {totalImpact.totalPlastic.toLocaleString()} items
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <Recycle className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-medium">Products Tracked</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{totalImpact.itemsTracked}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <Factory className="h-5 w-5 text-orange-600 mr-2" />
                        <span className="font-medium">Investment</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">
                        ₹{totalImpact.totalSpent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />
                    Global Impact Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Trees Equivalent (CO2 absorption)</span>
                        <span className="font-semibold">{Math.round(totalImpact.totalCO2 / 22)} trees</span>
                      </div>
                      <Progress value={Math.min((totalImpact.totalCO2 / 100) * 100, 100)} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Car Miles Offset</span>
                        <span className="font-semibold">{Math.round(totalImpact.totalCO2 * 2.3)} miles</span>
                      </div>
                      <Progress value={Math.min((totalImpact.totalCO2 / 50) * 100, 100)} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Ocean Cleanup Impact</span>
                        <span className="font-semibold">{Math.round(totalImpact.totalPlastic / 100)} kg prevented</span>
                      </div>
                      <Progress value={Math.min((totalImpact.totalPlastic / 1000) * 100, 100)} className="h-2" />
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mt-4">
                      <p className="text-sm text-green-800">
                        <strong>Amazing!</strong> Your choices prevent {Math.round(totalImpact.totalPlastic / 365)}{" "}
                        plastic items from entering the environment every day!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  Recent Environmental Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {impactData.trackedAlternatives.slice(0, 5).map((altId, index) => {
                    const alt = alternatives.find((a) => a.id === altId)
                    if (!alt) return null

                    return (
                      <div key={altId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <div className="font-medium">{alt.name}</div>
                            <div className="text-sm text-gray-600">
                              Saves {alt.co2_saved}kg CO2 • Avoids {alt.plastic_avoided} plastic items
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{alt.category}</Badge>
                      </div>
                    )
                  })}

                  {impactData.trackedAlternatives.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start tracking sustainable alternatives to see your impact!</p>
                      <Button className="mt-4" onClick={() => (window.location.href = "/alternatives")}>
                        Explore Alternatives
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={selectedTimeframe === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("week")}
                >
                  Week
                </Button>
                <Button
                  variant={selectedTimeframe === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("month")}
                >
                  Month
                </Button>
                <Button
                  variant={selectedTimeframe === "year" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("year")}
                >
                  Year
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>CO2 Savings Over Time</CardTitle>
                <CardDescription>Your cumulative environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`${value} kg`, "CO2 Saved"]} />
                      <Area type="monotone" dataKey="cumulativeCO2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plastic Items Avoided</CardTitle>
                <CardDescription>Daily plastic waste prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`${value} items`, "Plastic Avoided"]} />
                      <Line type="monotone" dataKey="plasticAvoided" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impact by Category</CardTitle>
                  <CardDescription>Environmental impact breakdown by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="co2" fill="#10B981" name="CO2 Saved (kg)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Distribution</CardTitle>
                  <CardDescription>Your sustainable product portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, count }) => `${category}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"][index % 5]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={category.category} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{category.category}</h4>
                        <Badge>{category.count} products</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">CO2 Saved:</span>
                          <div className="font-semibold text-green-600">{category.co2} kg/year</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Plastic Avoided:</span>
                          <div className="font-semibold text-blue-600">{category.plastic.toLocaleString()} items</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Avg per Product:</span>
                          <div className="font-semibold">{(category.co2 / category.count).toFixed(1)} kg CO2</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievementDefinitions.map((achievement) => {
                const isUnlocked = impactData.achievements.includes(achievement.id)
                return (
                  <Card
                    key={achievement.id}
                    className={`${isUnlocked ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`text-4xl mb-3 ${isUnlocked ? "" : "grayscale opacity-50"}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? "text-green-800" : "text-gray-600"}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-3 ${isUnlocked ? "text-green-700" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                      {isUnlocked ? (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Unlocked!
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-orange-600" />
                  Achievement Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Unlocked Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        Profile badges and recognition
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-4 w-4 text-blue-500 mr-2" />
                        Priority customer support
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-green-500 mr-2" />
                        Community leader status
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Coming Soon:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Discount codes for sustainable products</li>
                      <li>• Exclusive access to new features</li>
                      <li>• Partner rewards and cashback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    Your Environmental Goals
                  </div>
                  <Button onClick={() => setShowGoalsDialog(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {impactData.goals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Set environmental goals to track your progress!</p>
                    <Button className="mt-4" onClick={() => setShowGoalsDialog(true)}>
                      Set Your First Goal
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {impactData.goals.map((goal) => (
                      <div key={goal.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <Badge variant="outline">{goal.type}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {goal.current} / {goal.target}
                            </span>
                          </div>
                          <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                          <div className="text-xs text-gray-600">Deadline: {goal.deadline}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Suggested Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Goals</CardTitle>
                <CardDescription>Popular goals from the SwapThePlastic community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-semibold mb-2">Save 100kg CO2 This Year</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Reduce your carbon footprint by 100kg through sustainable choices
                    </p>
                    <Badge className="bg-green-100 text-green-800">Popular</Badge>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-semibold mb-2">Zero Plastic Month</h4>
                    <p className="text-sm text-gray-600 mb-3">Avoid all single-use plastic items for an entire month</p>
                    <Badge className="bg-blue-100 text-blue-800">Challenge</Badge>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-semibold mb-2">10 Sustainable Swaps</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Replace 10 plastic products with eco-friendly alternatives
                    </p>
                    <Badge className="bg-purple-100 text-purple-800">Beginner</Badge>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-semibold mb-2">Community Leader</h4>
                    <p className="text-sm text-gray-600 mb-3">Help 5 friends start their sustainability journey</p>
                    <Badge className="bg-orange-100 text-orange-800">Social</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Share Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Environmental Impact</DialogTitle>
              <DialogDescription>Inspire others with your sustainability journey</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Your Impact Summary:</h4>
                <ul className="text-sm space-y-1">
                  <li>🌱 {totalImpact.totalCO2.toFixed(1)}kg CO2 saved annually</li>
                  <li>♻️ {totalImpact.totalPlastic.toLocaleString()} plastic items avoided</li>
                  <li>🏆 {impactData.achievements.length} achievements unlocked</li>
                  <li>📈 {impactLevel.level} impact level reached</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button onClick={shareImpact} className="flex-1">
                  Share on Social Media
                </Button>
                <Button variant="outline" onClick={downloadReport}>
                  Download Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Goals Dialog */}
        <Dialog open={showGoalsDialog} onOpenChange={setShowGoalsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Environmental Goals</DialogTitle>
              <DialogDescription>Choose goals to track your sustainability progress</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Goal setting feature coming soon! For now, track your progress manually and celebrate your achievements.
              </p>
              <Button onClick={() => setShowGoalsDialog(false)} className="w-full">
                Got it!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
