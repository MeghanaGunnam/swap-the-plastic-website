"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Scan, CheckCircle, AlertCircle, Recycle } from "lucide-react"
import { plasticVisionModel, type PlasticClassificationResult } from "@/lib/ml-models"

export function PlasticScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<PlasticClassificationResult | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    setImagePreview(URL.createObjectURL(file))

    try {
      // Use ML model to classify plastic
      const classification = await plasticVisionModel.classifyPlastic(file)
      setResult(classification)
    } catch (error) {
      console.error("Classification failed:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const handleScanClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scan className="h-5 w-5 mr-2 text-blue-600" />
          AI Plastic Scanner
        </CardTitle>
        <CardDescription>Upload a photo to identify plastic type and get recycling information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

        {!imagePreview && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Take a photo or upload an image</p>
            <Button onClick={handleScanClick} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
        )}

        {imagePreview && (
          <div className="space-y-4">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Uploaded plastic item"
              className="w-full h-48 object-cover rounded-lg"
            />

            {isScanning && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Analyzing plastic type...</p>
              </div>
            )}

            {result && !isScanning && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Classification Result</h3>
                  <Badge variant={result.recyclable ? "default" : "destructive"}>
                    {result.recyclable ? "Recyclable" : "Non-Recyclable"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm">{Math.round(result.confidence * 100)}%</span>
                  </div>
                  <Progress value={result.confidence * 100} className="h-2" />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-blue-600">{result.recyclingCode}</span>
                    </div>
                    <h4 className="font-semibold">{result.plasticType}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-green-50 border border-green-200">
                  {result.recyclable ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">
                        This plastic can be recycled! Find nearby recycling centers.
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-sm text-red-800">
                        This plastic is not easily recyclable. Consider sustainable alternatives.
                      </span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <Recycle className="h-4 w-4 mr-2" />
                    Find Recyclers
                  </Button>
                  <Button className="flex-1">View Alternatives</Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setResult(null)
                    setImagePreview(null)
                  }}
                  className="w-full"
                >
                  Scan Another Item
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
