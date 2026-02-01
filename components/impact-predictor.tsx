"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Leaf, Calendar, Target } from "lucide-react"
import { impactPredictionModel, type ImpactPrediction } from "@/lib/ml-models"

export function ImpactPredictor() {
  const [timeframe, setTimeframe] = useState("6")
  const [prediction, setPrediction] = useState<ImpactPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userScore, setUserScore] = useState(75) // Mock user behavior score

  const generatePrediction = async () => {
    setIsLoading(true)

    try {
      // Mock current user data
      const currentPlasticAmount = 15.5 // kg per month
      const months = Number.parseInt(timeframe)

      const result = await impactPredictionModel.predictImpact(currentPlasticAmount, months, userScore)

      setPrediction(result)
    } catch (error) {
      console.error("Prediction failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    generatePrediction()
  }, [timeframe])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Impact Predictor
        </CardTitle>
        <CardDescription>AI-powered predictions of your environmental impact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Prediction Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">1 Year</SelectItem>
                <SelectItem value="24">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Behavior Score</label>
            <div className="flex items-center space-x-2">
              <Progress value={userScore} className="flex-1" />
              <span className="text-sm font-medium">{userScore}%</span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Generating AI predictions...</p>
          </div>
        )}

        {prediction && !isLoading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">CO₂ Saved</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{prediction.co2Saved} kg</div>
                <div className="text-xs text-green-600">
                  ±{Math.abs(prediction.confidenceInterval[1] - prediction.co2Saved).toFixed(1)} kg
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Plastic Reduced</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{prediction.plasticReduced} kg</div>
                <div className="text-xs text-blue-600">Over {prediction.timeframe}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Prediction Details
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Based on your current recycling habits and behavior score</p>
                <p>
                  • Confidence interval: {prediction.confidenceInterval[0]} - {prediction.confidenceInterval[1]} kg CO₂
                </p>
                <p>• Prediction accuracy: ~85% based on historical data</p>
                <p>• Model considers seasonal variations and behavior trends</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                View Detailed Report
              </Button>
              <Button className="flex-1">Set Impact Goals</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
