import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle } from "lucide-react"

export function ImpactExplanation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Leaf className="h-5 w-5 mr-2" />
            Why Environmental Impact Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <Badge className="bg-red-100 text-red-800 mt-1">Problem</Badge>
            <div>
              <p className="text-sm font-medium">Plastic Pollution Crisis</p>
              <p className="text-xs text-gray-600">
                India generates 3.4 million tons of plastic waste annually. Only 60% gets recycled.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Badge className="bg-green-100 text-green-800 mt-1">Solution</Badge>
            <div>
              <p className="text-sm font-medium">Your Positive Impact</p>
              <p className="text-xs text-gray-600">
                Every sustainable choice you make prevents plastic waste and reduces carbon emissions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Recycle className="h-5 w-5 mr-2" />
            Understanding Our Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">CO2 Saved</span>
            </div>
            <p className="text-xs text-gray-600 ml-5">
              Greenhouse gases prevented from entering the atmosphere by avoiding plastic production.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Plastic Items Replaced</span>
            </div>
            <p className="text-xs text-gray-600 ml-5">
              Number of single-use plastic items you avoid using per year with sustainable alternatives.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function DetailedImpactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-700">{title}</CardTitle>
        <CardDescription>Understanding your environmental contribution</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function ImpactMetricExplanation({ metric, value, explanation, icon: Icon, color }: any) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
      <div className={`p-2 rounded-full ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-gray-900">{metric}</span>
          <span className={`font-bold text-lg ${color.replace("bg-", "text-")}`}>{value}</span>
        </div>
        <p className="text-sm text-gray-600">{explanation}</p>
      </div>
    </div>
  )
}
