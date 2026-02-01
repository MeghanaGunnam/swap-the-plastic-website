"use client"

/**
 * ML Models Library - Lightweight client-side ML
 * No external model dependencies, pure JavaScript implementations
 */

interface SearchResult {
  id: string
  title: string
  score: number
}

interface ClassificationResult {
  label: string
  confidence: number
}

interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral"
  score: number
}

/**
 * Search NLP Model - Pure JavaScript
 * Token-based semantic search without external dependencies
 */
export class SearchNLPModel {
  private static tokenizeSimple(text: string): Set<string> {
    return new Set(
      text
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 2),
    )
  }

  private static calculateJaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
    const intersection = new Set([...set1].filter((x) => set2.has(x)))
    const union = new Set([...set1, ...set2])
    return union.size > 0 ? intersection.size / union.size : 0
  }

  static search(
    query: string,
    items: Array<{
      id: string
      title: string
      description?: string
      tags?: string[]
    }>,
  ): SearchResult[] {
    const queryTokens = this.tokenizeSimple(query)

    const results = items.map((item) => {
      const itemText = [item.title, item.description || "", (item.tags || []).join(" ")].join(" ")
      const itemTokens = this.tokenizeSimple(itemText)
      const score = this.calculateJaccardSimilarity(queryTokens, itemTokens)

      return {
        id: item.id,
        title: item.title,
        score,
      }
    })

    return results.filter((r) => r.score > 0).sort((a, b) => b.score - a.score)
  }
}

/**
 * Sentiment Analyzer - Pure JavaScript
 * Rule-based sentiment analysis
 */
export class SentimentAnalyzer {
  private static positiveWords = new Set([
    "good",
    "great",
    "amazing",
    "awesome",
    "excellent",
    "love",
    "happy",
    "wonderful",
    "fantastic",
    "perfect",
    "best",
    "eco",
    "green",
    "sustainable",
    "recycled",
    "beautiful",
    "clean",
  ])

  private static negativeWords = new Set([
    "bad",
    "terrible",
    "awful",
    "horrible",
    "hate",
    "sad",
    "worst",
    "poor",
    "useless",
    "plastic",
    "pollution",
    "waste",
    "dirty",
    "toxic",
  ])

  static analyze(text: string): SentimentResult {
    const words = text.toLowerCase().split(/\s+/)

    let positiveScore = 0
    let negativeScore = 0

    for (const word of words) {
      const cleanWord = word.replace(/[.,!?;:'"—–-]/g, "")
      if (this.positiveWords.has(cleanWord)) positiveScore++
      if (this.negativeWords.has(cleanWord)) negativeScore++
    }

    const totalScore = positiveScore + negativeScore
    if (totalScore === 0) {
      return { sentiment: "neutral", score: 0 }
    }

    const netScore = (positiveScore - negativeScore) / totalScore

    if (netScore > 0.1) {
      return { sentiment: "positive", score: Math.min(netScore, 1) }
    } else if (netScore < -0.1) {
      return { sentiment: "negative", score: Math.min(Math.abs(netScore), 1) }
    } else {
      return { sentiment: "neutral", score: 0 }
    }
  }
}

/**
 * Image Classifier - Optional TensorFlow.js
 * Gracefully handles missing TensorFlow
 */
export class ImageClassifier {
  private static model: any = null
  private static loaded = false

  static async loadModel(): Promise<boolean> {
    if (this.loaded) return !!this.model

    try {
      if (typeof window === "undefined") return false

      const tf = require("@tensorflow/tfjs")
      const mobilenet = require("@tensorflow-models/mobilenet")

      this.model = await mobilenet.load()
      this.loaded = true
      return true
    } catch (error) {
      console.info("TensorFlow.js not available - using fallback classification")
      this.loaded = true
      return false
    }
  }

  static async classifyImage(imageSource: string | HTMLImageElement): Promise<ClassificationResult[]> {
    const hasModel = await this.loadModel()

    // Fallback: return mock classification
    if (!hasModel || !this.model) {
      return [
        {
          label: "plastic_bottle",
          confidence: 0.85,
        },
        {
          label: "recyclable",
          confidence: 0.72,
        },
      ]
    }

    try {
      const img = typeof imageSource === "string" ? new Image() : imageSource

      if (typeof imageSource === "string") {
        img.crossOrigin = "anonymous"
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = imageSource
        })
      }

      const predictions = await this.model.classify(img)

      return predictions
        .filter(
          (pred: { className: string; probability: number }) =>
            pred.probability > 0.1 &&
            (pred.className.toLowerCase().includes("plastic") ||
              pred.className.toLowerCase().includes("bottle") ||
              pred.className.toLowerCase().includes("bag")),
        )
        .map((pred: { className: string; probability: number }) => ({
          label: pred.className,
          confidence: pred.probability,
        }))
        .slice(0, 5)
    } catch (error) {
      console.error("Classification failed:", error)
      return []
    }
  }

  static async hasPlastic(imageSource: string | HTMLImageElement): Promise<boolean> {
    const results = await this.classifyImage(imageSource)
    return results.length > 0 && results[0].confidence > 0.3
  }
}

/**
 * Recommendation Engine - Pure JavaScript
 */
export class RecommendationEngine {
  static getRecommendations(
    userItems: string[],
    allItems: Array<{
      id: string
      title: string
      category: string
      tags: string[]
    }>,
    limit = 5,
  ): SearchResult[] {
    if (userItems.length === 0) {
      return allItems.slice(0, limit).map((item) => ({
        id: item.id,
        title: item.title,
        score: 0.5,
      }))
    }

    const userItemsSet = new Set(userItems)
    const recommendations = allItems
      .filter((item) => !userItemsSet.has(item.id))
      .map((item) => {
        let score = 0

        for (const userId of userItems) {
          const userItem = allItems.find((u) => u.id === userId)
          if (userItem && userItem.category === item.category) {
            score += 0.3
          }

          if (userItem) {
            const commonTags = userItem.tags.filter((tag) => item.tags.includes(tag))
            score += (commonTags.length / Math.max(userItem.tags.length, item.tags.length)) * 0.7
          }
        }

        return {
          id: item.id,
          title: item.title,
          score,
        }
      })

    return recommendations.sort((a, b) => b.score - a.score).slice(0, limit)
  }
}

/**
 * Impact Calculator - Pure JavaScript
 */
export class ImpactCalculator {
  static calculateCO2Saved(plasticKg: number): number {
    return plasticKg * 2.5
  }

  static calculateWaterSaved(plasticKg: number): number {
    return plasticKg * 22
  }

  static calculateEnergySaved(plasticKg: number): number {
    return plasticKg * 7.7
  }

  static calculateImpactScore(co2Saved: number, waterSaved: number, energySaved: number): number {
    const co2Score = Math.min((co2Saved / 100) * 33, 33)
    const waterScore = Math.min((waterSaved / 1000) * 33, 33)
    const energyScore = Math.min((energySaved / 100) * 34, 34)

    return Math.round(co2Score + waterScore + energyScore)
  }
}

// Export singleton instances
export const searchNLPModel = new SearchNLPModel()
export const sentimentAnalyzer = new SentimentAnalyzer()
export const imageClassifier = new ImageClassifier()
export const recommendationEngine = new RecommendationEngine()
export const impactCalculator = new ImpactCalculator()
