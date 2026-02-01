"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TreePine, Waves, Recycle, TrendingUp, Award, Target } from "lucide-react"

interface ImpactTrackerProps {
  trackedAlternatives?: number[]
  trackedRecyclers?: number[]
  showFullDetails?: boolean
}

export function ImpactTracker({
  trackedAlternatives = [],
  trackedRecyclers = [],
  showFullDetails = false,
}: ImpactTrackerProps) {
  const [mounted, setMounted] = useState(false)
  const [impactData, setImpactData] = useState({
    totalCO2: 0,
    totalPlastic: 0,
    totalSpent: 0,
    itemsTracked: 0,
    recyclersTracked: 0,
  })

  // Sample data - in real app this would come from API
  const alternatives = [
    { id: 1, co2_saved: 12.5, plastic_avoided: 365, price: 1899 },
    { id: 2, co2_saved: 8.3, plastic_avoided: 500, price: 1599 },
    { id: 3, co2_saved: 2.1, plastic_avoided: 1000, price: 999 },
    { id: 4, co2_saved: 5.7, plastic_avoided: 200, price: 1299 },
    { id: 5, co2_saved: 1.2, plastic_avoided: 4, price: 699 },
  ]

  const recyclers = [
    { id: 1, co2_impact: 1.2, plastic_processed: 450 },
    { id: 2, co2_impact: 1.8, plastic_processed: 720 },
    { id: 3, co2_impact: 0.95, plastic_processed: 280 },
  ]

  useEffect(() => {
    setMounted(true)
    calculateImpact()
  }, [trackedAlternatives, trackedRecyclers])

  const calculateImpact = () => {
    const trackedAlts = alternatives.filter((alt) => trackedAlternatives.includes(alt.id))
    const trackedRecs = recyclers.filter((rec) => trackedRecyclers.includes(rec.id))

    const totalCO2 =
      trackedAlts.reduce((sum, item) => sum + item.co2_saved, 0) +
      trackedRecs.reduce((sum, rec) => sum + rec.co2_impact, 0)

    const totalPlastic =
      trackedAlts.reduce((sum, item) => sum + item.plastic_avoided, 0) +
      trackedRecs.reduce((sum, rec) => sum + rec.plastic_processed, 0)

    const totalSpent = trackedAlts.reduce((sum, item) => sum + item.price, 0)

    setImpactData({
      totalCO2,
      totalPlastic,
      totalSpent,
      itemsTracked: trackedAlternatives.length,
      recyclersTracked: trackedRecyclers.length,
    })
  }

  const getImpactLevel = (co2Saved: number) => {
    if (co2Saved < 10) return { level: "Beginner", color: "bg-gray-500", progress: (co2Saved / 10) * 100 }
    if (co2Saved < 25) return { level: "Eco Warrior", color: "bg-green-500", progress: ((co2Saved - 10) / 15) * 100 }
    if (co2Saved < 50) return { level: "Green Champion", color: "bg-blue-500", progress: ((co2Saved - 25) / 25) * 100 }
    if (co2Saved < 100)
      return { level: "Carbon Crusher", color: "bg-purple-500", progress: ((co2Saved - 50) / 50) * 100 }
    return { level: "Planet Protector", color: "bg-yellow-500", progress: 100 }
  }

  if (!mounted) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    )
  }

  const impactLevel = getImpactLevel(impactData.totalCO2)

  if (!showFullDetails && impactData.itemsTracked === 0 && impactData.recyclersTracked === 0) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Your Environmental Impact
          </div>
          <Badge className={`${impactLevel.color} text-white`}>{impactLevel.level}</Badge>
        </CardTitle>
        <CardDescription>Track your positive environmental contribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-white rounded-lg">
            <TreePine className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{impactData.totalCO2.toFixed(1)} kg</div>
            <div className="text-sm text-gray-600">CO2 Saved/Year</div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <Waves className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{impactData.totalPlastic.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Plastic Items Avoided</div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <Recycle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{impactData.itemsTracked}</div>
            <div className="text-sm text-gray-600">Products Tracked</div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">₹{impactData.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Invested</div>
          </div>
        </div>

        {showFullDetails && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to next level</span>
                <span>{impactLevel.level}</span>
              </div>
              <Progress value={impactLevel.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-semibold mb-2">Environmental Equivalents</h4>
                <ul className="text-sm space-y-1">
                  <li>🌳 {Math.round(impactData.totalCO2 / 22)} trees worth of CO2 absorption</li>
                  <li>🚗 {Math.round(impactData.totalCO2 * 2.3)} miles of car emissions offset</li>
                  <li>🌊 {Math.round(impactData.totalPlastic / 100)} kg ocean plastic prevented</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-semibold mb-2">Daily Impact</h4>
                <ul className="text-sm space-y-1">
                  <li>📅 {(impactData.totalCO2 / 365).toFixed(2)} kg CO2 saved daily</li>
                  <li>🗑️ {Math.round(impactData.totalPlastic / 365)} plastic items avoided daily</li>
                  <li>💚 Making a difference every single day!</li>
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => (window.location.href = "/impact")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Target className="h-4 w-4 mr-2" />
            View Full Impact
          </Button>
          {!showFullDetails && (
            <Button size="sm" variant="outline" onClick={() => (window.location.href = "/alternatives")}>
              Track More Items
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
