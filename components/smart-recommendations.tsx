"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Leaf, ShoppingCart } from "lucide-react"
import { recommendationEngine } from "@/lib/ml-models"

interface Product {
  id: string
  name: string
  description: string
  price: string
  rating: number
  ecoScore: number
  image: string
  category: string
  features: string[]
}

const products: Record<string, Product> = {
  bamboo_water_bottle: {
    id: "bamboo_water_bottle",
    name: "Bamboo Fiber Water Bottle",
    description: "Sustainable bamboo fiber bottle with leak-proof design",
    price: "$24.99",
    rating: 4.8,
    ecoScore: 95,
    image: "/placeholder.svg?height=200&width=200",
    category: "Drinkware",
    features: ["BPA-Free", "Biodegradable", "Lightweight"],
  },
  steel_containers: {
    id: "steel_containers",
    name: "Stainless Steel Food Containers",
    description: "Durable steel containers for food storage",
    price: "$34.99",
    rating: 4.7,
    ecoScore: 88,
    image: "/placeholder.svg?height=200&width=200",
    category: "Food Storage",
    features: ["Dishwasher Safe", "Stackable", "Airtight"],
  },
  glass_jars: {
    id: "glass_jars",
    name: "Glass Storage Jars Set",
    description: "Set of 6 glass jars with bamboo lids",
    price: "$19.99",
    rating: 4.6,
    ecoScore: 90,
    image: "/placeholder.svg?height=200&width=200",
    category: "Storage",
    features: ["Recyclable", "Non-toxic", "Versatile"],
  },
  silicone_bags: {
    id: "silicone_bags",
    name: "Reusable Silicone Food Bags",
    description: "Food-grade silicone bags for storage",
    price: "$29.99",
    rating: 4.5,
    ecoScore: 82,
    image: "/placeholder.svg?height=200&width=200",
    category: "Food Storage",
    features: ["Freezer Safe", "Microwave Safe", "Easy Clean"],
  },
  cotton_bags: {
    id: "cotton_bags",
    name: "Organic Cotton Shopping Bags",
    description: "Set of 3 organic cotton reusable bags",
    price: "$15.99",
    rating: 4.9,
    ecoScore: 92,
    image: "/placeholder.svg?height=200&width=200",
    category: "Shopping",
    features: ["Machine Washable", "Strong Handles", "Foldable"],
  },
}

export function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate user interactions and get recommendations
    const loadRecommendations = async () => {
      setIsLoading(true)

      // Mock user interactions (in real app, this would come from user data)
      const userInteractions = [
        { item: "bamboo_water_bottle", rating: 5 },
        { item: "cotton_bags", rating: 4 },
        { item: "glass_jars", rating: 4 },
      ]

      // Update user profile and get recommendations
      recommendationEngine.updateUserProfile("user123", userInteractions)
      const recs = recommendationEngine.getRecommendations("user123", 3)

      setRecommendations(recs)
      setIsLoading(false)
    }

    loadRecommendations()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Personalized sustainable alternatives based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((productId) => {
            const product = products[productId]
            if (!product) return null

            return (
              <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{product.description}</p>

                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Leaf className="h-3 w-3 mr-1" />
                      {product.ecoScore}% Eco
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">{product.price}</span>
                    <Button size="sm" className="h-7 text-xs">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
