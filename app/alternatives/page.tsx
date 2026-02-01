"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Leaf,
  ShoppingCart,
  Plus,
  Check,
  Award,
  Info,
  Factory,
  Waves,
  TreePine,
  BarChart3,
  MapPin,
} from "lucide-react"
import { ImpactExplanation, DetailedImpactCard, ImpactMetricExplanation } from "@/components/impact-explanation"
import { ImpactChartsSection } from "@/components/impact-charts"
import { RegionalDataSection } from "@/components/regional-data"

function getOfferBadge(offer: any) {
  if (!offer) return null

  return (
    <div
      className={`absolute top-2 left-2 ${offer.color} text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg`}
    >
      {offer.value}
    </div>
  )
}

function ProductGridComponent({ products, trackedItems, onToggleTracking, onProductClick }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <Card key={product.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <CardHeader className="p-0">
            <div className="relative" onClick={() => onProductClick(product)}>
              {getOfferBadge(product.offer)}
              <img
                src={product.image || "/placeholder.svg?height=200&width=300"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=300"
                }}
              />
              <div className="absolute top-2 right-2">
                <Button
                  size="sm"
                  variant={trackedItems.includes(product.id) ? "default" : "secondary"}
                  className={`${
                    trackedItems.includes(product.id) ? "bg-green-600 hover:bg-green-700" : "bg-white/90 hover:bg-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleTracking(product.id)
                  }}
                >
                  {trackedItems.includes(product.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4" onClick={() => onProductClick(product)}>
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-green-100 text-green-800 text-xs">{product.category}</Badge>
              <div className="flex items-center">
                <Leaf className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-semibold text-green-600">{product.eco_score}/10</span>
              </div>
            </div>

            <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
            <CardDescription className="text-sm mb-3">{product.description}</CardDescription>

            <div className="flex items-center mb-2">
              <div className="flex items-center mr-3">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-xs text-gray-600">Environmental Impact: </span>
              <Badge variant="outline" className="text-xs text-green-700">
                {product.impact}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-green-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(product.buy_link, "_blank")
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProductDetailModal({ product, isTracked, onToggleTracking, onClose }: any) {
  return (
    <Dialog open={!!product} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            {product.name}
            {product.offer && (
              <Badge className={`${product.offer.color} text-white`}>
                {product.offer.value} - {product.offer.label}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg?height=300&width=400"}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=300&width=400"
                }}
              />
              {product.offer && (
                <div
                  className={`absolute top-4 left-4 ${product.offer.color} text-white px-3 py-2 rounded-full text-sm font-bold`}
                >
                  {product.offer.value}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="text-center">
                  <Leaf className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-600">{product.eco_score}/10</div>
                  <div className="text-xs text-gray-600">Eco Score</div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-center">
                  <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-lg font-bold">{product.rating}</div>
                  <div className="text-xs text-gray-600">{product.reviews} reviews</div>
                </div>
              </Card>
            </div>

            {/* Pricing */}
            <Card className="p-4 bg-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{product.price}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-semibold">
                      Save ₹
                      {Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
                        Number.parseInt(product.price.replace("₹", "").replace(",", ""))}
                    </div>
                    <div className="text-xs text-gray-600">
                      {Math.round(
                        ((Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
                          Number.parseInt(product.price.replace("₹", "").replace(",", ""))) /
                          Number.parseInt(product.originalPrice.replace("₹", "").replace(",", ""))) *
                          100,
                      )}
                      % off
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Product</h3>
              <p className="text-gray-700">{product.detailed_description}</p>
            </div>

            {/* Product Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Materials:</span>
                  <p>{product.materials}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Lifespan:</span>
                  <p>{product.lifespan}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">CO2 Saved:</span>
                  <p className="text-green-600 font-semibold">{product.co2_saved}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Warranty:</span>
                  <p>{product.warranty}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Environmental Impact Explained</h3>
              <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-800">CO2 Reduction</h4>
                  <p className="text-sm text-green-700">{product.impact_explanation.co2_calculation}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Plastic Reduction</h4>
                  <p className="text-sm text-green-700">{product.impact_explanation.plastic_reduction}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Resource Conservation</h4>
                  <p className="text-sm text-green-700">{product.impact_explanation.resource_saving}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.sustainability_certifications.map((cert: string, index: number) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Replaces These Items</h3>
              <div className="flex flex-wrap gap-2">
                {product.alternatives_to.map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <Card className="p-4 bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">Shipping & Delivery</h4>
              <p className="text-sm text-blue-700">{product.shipping}</p>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={onToggleTracking}
                variant={isTracked ? "default" : "outline"}
                className={isTracked ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isTracked ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Tracking Impact
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Track This Item
                  </>
                )}
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => window.open(product.buy_link, "_blank")}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now - {product.price}
                {product.originalPrice && (
                  <span className="ml-2 text-xs opacity-75 line-through">{product.originalPrice}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AlternativesPage() {
  const [trackedItems, setTrackedItems] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [showImpactInfo, setShowImpactInfo] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [showRegionalData, setShowRegionalData] = useState(false)

  const alternatives = [
    {
      id: 1,
      name: "Bamboo Water Bottle",
      description: "Sustainable bamboo fiber water bottle with leak-proof design",
      price: "₹1,899",
      originalPrice: "₹2,299",
      rating: 4.7,
      reviews: 234,
      category: "Drinkware",
      eco_score: 9.2,
      replaces: "Plastic Water Bottles",
      impact: "Saves 365 plastic bottles per year",
      materials: "Bamboo fiber, Stainless steel interior",
      lifespan: "5+ years",
      co2_saved: "12.5 kg CO2/year",
      image: "https://www.ippinka.com/wp-content/uploads/2018/10/bamboo-bottle-03.jpg",
      offer: {
        type: "discount",
        value: "18% OFF",
        label: "Limited Time",
        color: "bg-red-500",
      },
      detailed_description:
        "This premium bamboo water bottle combines sustainability with functionality. Made from renewable bamboo fiber with a food-grade stainless steel interior, it keeps drinks cold for 24 hours and hot for 12 hours. The ergonomic design fits perfectly in car cup holders and backpack pockets.",
      features: [
        "Leak-proof design",
        "Temperature retention",
        "BPA-free",
        "Dishwasher safe",
        "Lightweight",
        "Anti-slip grip",
      ],
      alternatives_to: ["Single-use plastic bottles", "Disposable cups", "Plastic sports bottles"],
      buy_link: "https://www.amazon.in/bamboo-water-bottle",
      impact_explanation: {
        co2_calculation:
          "Manufacturing 365 plastic bottles releases ~12.5kg CO2. Using one reusable bottle prevents this emission.",
        plastic_reduction:
          "Average person uses 365 plastic bottles/year. This bottle replaces all of them for 5+ years.",
        resource_saving: "Saves 1,825 plastic bottles over its lifetime, preventing ocean pollution.",
      },
      sustainability_certifications: ["FSC Certified", "Carbon Neutral Shipping", "Recyclable Packaging"],
      warranty: "2 years manufacturer warranty",
      shipping: "Free shipping across India",
    },
    {
      id: 2,
      name: "Reusable Silicone Food Bags",
      description: "Set of 6 food-grade silicone bags for food storage",
      price: "₹1,599",
      originalPrice: "₹1,999",
      rating: 4.5,
      reviews: 189,
      category: "Food Storage",
      eco_score: 8.8,
      replaces: "Plastic Zip Bags",
      impact: "Replaces 500+ plastic bags per year",
      materials: "100% food-grade silicone",
      lifespan: "10+ years",
      co2_saved: "8.3 kg CO2/year",
      image: "https://i5.walmartimages.com/asr/2dbad08d-66c5-4390-8596-42c64087ed98.b9cfaf3d6d90dfab12d46bdf9ce37540.jpeg",
      offer: {
        type: "bestseller",
        value: "BESTSELLER",
        label: "Most Popular",
        color: "bg-green-500",
      },
      detailed_description:
        "These versatile silicone bags are perfect for storing food, organizing items, and even cooking sous vide. They're airtight, leak-proof, and can go from freezer to microwave safely. The set includes various sizes for different storage needs.",
      features: [
        "Airtight seal",
        "Freezer to microwave safe",
        "Easy to clean",
        "Multiple sizes",
        "Transparent design",
        "Dishwasher safe",
      ],
      alternatives_to: ["Plastic zip bags", "Plastic food containers", "Disposable storage bags"],
      buy_link: "https://www.flipkart.com/silicone-food-bags",
      impact_explanation: {
        co2_calculation: "Plastic bag production emits CO2. These reusable bags prevent 500+ single-use bags annually.",
        plastic_reduction: "Average family uses 500+ plastic bags yearly. These 6 bags replace them all.",
        resource_saving: "Over 10-year lifespan, prevents 5,000+ plastic bags from entering landfills.",
      },
      sustainability_certifications: ["FDA Approved", "LFGB Certified", "BPA Free"],
      warranty: "5 years replacement guarantee",
      shipping: "Express delivery available",
    },
    {
      id: 3,
      name: "Stainless Steel Straws",
      description: "Set of 4 reusable straws with cleaning brush",
      price: "₹999",
      rating: 4.9,
      reviews: 456,
      category: "Drinkware",
      eco_score: 9.5,
      replaces: "Plastic Straws",
      impact: "Eliminates 1,000+ plastic straws per year",
      materials: "304 stainless steel",
      lifespan: "Lifetime",
      co2_saved: "2.1 kg CO2/year",
      image: "https://www.theenablenature.com/wp-content/uploads/2022/11/31etqtLCdbL.jpg",
      offer: {
        type: "new",
        value: "NEW ARRIVAL",
        label: "Just Launched",
        color: "bg-blue-500",
      },
      detailed_description:
        "Premium stainless steel straws that are perfect for smoothies, cocktails, and everyday drinks. Comes with a specialized cleaning brush and carrying pouch. Available in straight and bent designs.",
      features: [
        "Rust-resistant",
        "Easy to clean",
        "Multiple sizes",
        "Carrying pouch included",
        "Dishwasher safe",
        "Food-grade steel",
      ],
      alternatives_to: ["Plastic straws", "Paper straws", "Disposable stirrers"],
      buy_link: "https://www.amazon.in/steel-straws-set",
      impact_explanation: {
        co2_calculation: "Plastic straw manufacturing emits CO2. Reusable straws eliminate this ongoing emission.",
        plastic_reduction: "Heavy straw users consume 1,000+ straws yearly. These 4 straws replace them all.",
        resource_saving: "Lifetime use prevents thousands of plastic straws from polluting oceans.",
      },
      sustainability_certifications: ["Food Grade Certified", "Eco-Friendly Packaging"],
      warranty: "Lifetime replacement guarantee",
      shipping: "Same day delivery in major cities",
    },
    {
      id: 4,
      name: "Beeswax Food Wraps",
      description: "Organic cotton wraps coated with natural beeswax",
      price: "₹1,299",
      rating: 4.6,
      reviews: 312,
      category: "Food Storage",
      eco_score: 9.0,
      replaces: "Plastic Wrap",
      impact: "Replaces 200+ meters of plastic wrap per year",
      materials: "Organic cotton, natural beeswax, jojoba oil",
      lifespan: "1-2 years",
      co2_saved: "5.7 kg CO2/year",
      image: "https://m.media-amazon.com/images/I/71ZC2+Qah1L._AC_SL1200_.jpg",
      offer: {
        type: "bundle",
        value: "BUY 2 GET 1",
        label: "Bundle Offer",
        color: "bg-purple-500",
      },
      detailed_description:
        "These natural food wraps mold to any shape with the warmth of your hands. Perfect for wrapping sandwiches, covering bowls, or storing produce. Made with organic cotton and sustainably sourced beeswax.",
      features: [
        "Natural antibacterial properties",
        "Moldable with heat",
        "Compostable",
        "Various sizes",
        "Reusable",
        "Breathable fabric",
      ],
      alternatives_to: ["Plastic wrap", "Aluminum foil", "Plastic food covers"],
      buy_link: "https://www.nykaa.com/beeswax-wraps",
      impact_explanation: {
        co2_calculation: "Plastic wrap production is energy-intensive. Beeswax wraps eliminate this recurring impact.",
        plastic_reduction: "Average household uses 200m+ plastic wrap yearly. These wraps replace all of it.",
        resource_saving: "Made from renewable materials, completely biodegradable at end of life.",
      },
      sustainability_certifications: ["Organic Certified", "Compostable", "Plastic-Free Packaging"],
      warranty: "1 year quality guarantee",
      shipping: "Carbon-neutral shipping",
    },
    {
      id: 5,
      name: "Bamboo Toothbrush Set",
      description: "Pack of 4 biodegradable bamboo toothbrushes",
      price: "₹699",
      originalPrice: "₹899",
      rating: 4.4,
      reviews: 567,
      category: "Personal Care",
      eco_score: 8.9,
      replaces: "Plastic Toothbrushes",
      impact: "Prevents 4 plastic toothbrushes from landfills",
      materials: "Bamboo handle, nylon bristles",
      lifespan: "3 months each",
      co2_saved: "1.2 kg CO2/year",
      image: "https://www.bambootoothbrushes.us/wp-content/uploads/2024/07/2-1.png",
      offer: {
        type: "discount",
        value: "22% OFF",
        label: "Family Pack",
        color: "bg-orange-500",
      },
      detailed_description:
        "Sustainable bamboo toothbrushes with soft, effective bristles. The bamboo handle is naturally antimicrobial and biodegradable. Each toothbrush is individually wrapped in compostable packaging.",
      features: [
        "Biodegradable handle",
        "Soft bristles",
        "Ergonomic design",
        "Natural antimicrobial",
        "Compostable packaging",
        "Different colors",
      ],
      alternatives_to: ["Plastic toothbrushes", "Electric toothbrush heads", "Disposable travel toothbrushes"],
      buy_link: "https://www.amazon.in/bamboo-toothbrush-set",
      impact_explanation: {
        co2_calculation: "Plastic toothbrush production emits CO2. Bamboo grows naturally, absorbing CO2.",
        plastic_reduction: "People use 4 toothbrushes yearly. These bamboo ones replace plastic versions.",
        resource_saving: "Bamboo handles decompose in 6 months vs 400+ years for plastic.",
      },
      sustainability_certifications: ["FSC Certified Bamboo", "Biodegradable", "Vegan"],
      warranty: "Quality satisfaction guarantee",
      shipping: "Plastic-free packaging",
    },
    {
      id: 6,
      name: "Glass Food Containers",
      description: "Set of 5 borosilicate glass containers with bamboo lids",
      price: "₹2,799",
      rating: 4.8,
      reviews: 198,
      category: "Food Storage",
      eco_score: 9.3,
      replaces: "Plastic Containers",
      impact: "Replaces 5+ plastic containers permanently",
      materials: "Borosilicate glass, bamboo lids",
      lifespan: "10+ years",
      co2_saved: "15.2 kg CO2/year",
      image: "https://m.media-amazon.com/images/I/71Z0hzyV-fS._AC_SL1500_.jpg",
      offer: {
        type: "premium",
        value: "PREMIUM",
        label: "Chef's Choice",
        color: "bg-yellow-500",
      },
      detailed_description:
        "Premium borosilicate glass containers that are thermal shock resistant and perfect for meal prep, storage, and reheating. The bamboo lids create an airtight seal and are sustainably sourced.",
      features: [
        "Thermal shock resistant",
        "Airtight bamboo lids",
        "Microwave safe",
        "Stackable design",
        "Easy to clean",
        "Oven safe",
      ],
      alternatives_to: ["Plastic food containers", "Disposable takeout containers", "Plastic meal prep containers"],
      buy_link: "https://www.flipkart.com/glass-containers-set",
      impact_explanation: {
        co2_calculation: "Glass production has higher initial CO2 but lasts 10+ years vs frequent plastic replacement.",
        plastic_reduction: "Replaces multiple plastic containers that crack, stain, and need replacement.",
        resource_saving: "Glass is 100% recyclable infinitely without quality loss.",
      },
      sustainability_certifications: ["Lead-Free Glass", "Sustainable Bamboo", "Recyclable"],
      warranty: "3 years breakage protection",
      shipping: "Secure packaging with bubble wrap alternatives",
    },
    // NEW PRODUCTS START HERE
    {
      id: 7,
      name: "Copper Water Bottle",
      description: "Handcrafted pure copper bottle with health benefits",
      price: "₹2,499",
      originalPrice: "₹3,199",
      rating: 4.6,
      reviews: 423,
      category: "Drinkware",
      eco_score: 9.1,
      replaces: "Plastic Water Bottles",
      impact: "Saves 365 plastic bottles per year + health benefits",
      materials: "99.9% pure copper",
      lifespan: "Lifetime",
      co2_saved: "14.8 kg CO2/year",
      image: "https://m.media-amazon.com/images/I/51VmTGWRZML._SL1200_.jpg",
      offer: {
        type: "discount",
        value: "22% OFF",
        label: "Ayurvedic Special",
        color: "bg-red-500",
      },
      detailed_description:
        "Traditional Ayurvedic copper water bottle that naturally purifies water and provides health benefits. Handcrafted by skilled artisans, this bottle improves digestion, boosts immunity, and has antimicrobial properties.",
      features: [
        "Natural water purification",
        "Antimicrobial properties",
        "Handcrafted design",
        "Health benefits",
        "Leak-proof cap",
        "Easy maintenance",
      ],
      alternatives_to: ["Plastic water bottles", "Filtered water bottles", "Disposable bottles"],
      buy_link: "https://www.amazon.in/copper-water-bottle",
      impact_explanation: {
        co2_calculation: "Copper mining has initial impact but bottle lasts lifetime vs 365 plastic bottles yearly.",
        plastic_reduction: "Eliminates need for single-use plastic bottles completely.",
        resource_saving: "One copper bottle prevents thousands of plastic bottles over lifetime.",
      },
      sustainability_certifications: ["Pure Copper Certified", "Handmade", "Traditional Craft"],
      warranty: "Lifetime craftsmanship guarantee",
      shipping: "Handmade, ships in 3-5 days",
    },
    {
      id: 8,
      name: "Jute Shopping Bags Set",
      description: "Set of 3 sturdy jute bags for grocery shopping",
      price: "₹899",
      originalPrice: "₹1,299",
      rating: 4.3,
      reviews: 678,
      category: "Shopping",
      eco_score: 9.4,
      replaces: "Plastic Shopping Bags",
      impact: "Replaces 1,000+ plastic bags per year",
      materials: "Natural jute fiber, cotton handles",
      lifespan: "3-5 years",
      co2_saved: "6.2 kg CO2/year",
      image: "https://5.imimg.com/data5/YY/HR/MY-1329072/jute-shopping-bags-500x500.jpg",
      offer: {
        type: "discount",
        value: "31% OFF",
        label: "Eco Warrior",
        color: "bg-green-500",
      },
      detailed_description:
        "Durable jute shopping bags perfect for groceries, market visits, and daily shopping. Made from natural jute fiber with reinforced cotton handles. Each bag can carry up to 15kg weight.",
      features: [
        "High weight capacity",
        "Reinforced handles",
        "Washable",
        "Foldable",
        "Natural fiber",
        "Different sizes",
      ],
      alternatives_to: ["Plastic shopping bags", "Paper bags", "Disposable carry bags"],
      buy_link: "https://www.flipkart.com/jute-shopping-bags",
      impact_explanation: {
        co2_calculation: "Jute is carbon-negative crop that absorbs more CO2 than it produces.",
        plastic_reduction: "Average person uses 1,000+ plastic bags yearly for shopping.",
        resource_saving: "Jute is biodegradable and supports sustainable farming.",
      },
      sustainability_certifications: ["Natural Fiber", "Biodegradable", "Fair Trade"],
      warranty: "2 years stitching guarantee",
      shipping: "Supports rural artisans",
    },
    {
      id: 9,
      name: "Bamboo Cutlery Set",
      description: "Portable bamboo cutlery with carrying case",
      price: "₹799",
      rating: 4.7,
      reviews: 345,
      category: "Dining",
      eco_score: 9.0,
      replaces: "Plastic Disposable Cutlery",
      impact: "Eliminates 500+ plastic cutlery pieces per year",
      materials: "Bamboo, organic cotton pouch",
      lifespan: "2-3 years",
      co2_saved: "3.4 kg CO2/year",
      image: "https://ph-test-11.slatic.net/p/28fdb958acd11263daba79eeb486339b.jpg",
      offer: {
        type: "new",
        value: "NEW",
        label: "Travel Essential",
        color: "bg-blue-500",
      },
      detailed_description:
        "Complete bamboo cutlery set including fork, knife, spoon, chopsticks, and straw. Perfect for office lunches, travel, and outdoor dining. Comes with a convenient carrying pouch.",
      features: [
        "Complete cutlery set",
        "Portable carrying case",
        "Lightweight",
        "Easy to clean",
        "Smooth finish",
        "Travel-friendly",
      ],
      alternatives_to: ["Plastic disposable cutlery", "Takeaway plastic utensils", "Single-use cutlery"],
      buy_link: "https://www.amazon.in/bamboo-cutlery-set",
      impact_explanation: {
        co2_calculation: "Bamboo grows rapidly and absorbs CO2, making it carbon-negative.",
        plastic_reduction: "Office workers and travelers use 500+ plastic cutlery pieces yearly.",
        resource_saving: "Bamboo is renewable and biodegradable unlike plastic cutlery.",
      },
      sustainability_certifications: ["FSC Certified", "Biodegradable", "Renewable"],
      warranty: "1 year replacement guarantee",
      shipping: "Eco-friendly packaging",
    },
    {
      id: 10,
      name: "Organic Cotton Produce Bags",
      description: "Set of 6 mesh bags for fruits and vegetables",
      price: "₹699",
      originalPrice: "₹999",
      rating: 4.5,
      reviews: 234,
      category: "Shopping",
      eco_score: 8.7,
      replaces: "Plastic Produce Bags",
      impact: "Replaces 300+ plastic produce bags per year",
      materials: "Organic cotton mesh",
      lifespan: "5+ years",
      co2_saved: "2.8 kg CO2/year",
      image: "https://m.media-amazon.com/images/I/71zCTa7H15L._AC_SL1000_.jpg",
      offer: {
        type: "discount",
        value: "30% OFF",
        label: "Organic Choice",
        color: "bg-green-600",
      },
      detailed_description:
        "Breathable organic cotton mesh bags perfect for buying fruits and vegetables. The mesh design allows produce to breathe while keeping them organized. Includes different sizes for various produce types.",
      features: [
        "Breathable mesh",
        "Machine washable",
        "Drawstring closure",
        "See-through design",
        "Multiple sizes",
        "Tare weight labels",
      ],
      alternatives_to: ["Plastic produce bags", "Disposable vegetable bags", "Plastic mesh bags"],
      buy_link: "https://www.nykaa.com/cotton-produce-bags",
      impact_explanation: {
        co2_calculation: "Organic cotton production has lower environmental impact than plastic bags.",
        plastic_reduction: "Grocery shoppers use 300+ plastic produce bags yearly.",
        resource_saving: "Cotton bags are reusable for years and completely biodegradable.",
      },
      sustainability_certifications: ["GOTS Certified Organic", "Biodegradable", "Fair Trade"],
      warranty: "Quality guarantee",
      shipping: "Plastic-free packaging",
    },
    {
      id: 11,
      name: "Stainless Steel Lunch Box",
      description: "3-tier stainless steel lunch box with compartments",
      price: "₹1,899",
      originalPrice: "₹2,499",
      rating: 4.8,
      reviews: 567,
      category: "Food Storage",
      eco_score: 9.2,
      replaces: "Plastic Lunch Boxes",
      impact: "Replaces plastic lunch containers permanently",
      materials: "304 stainless steel",
      lifespan: "10+ years",
      co2_saved: "8.9 kg CO2/year",
      image: "https://sowbaghya.com/cdn/shop/products/stainless-steel-lunch-box-triple-sowbaghya-1.jpg?v=1705674061",
      offer: {
        type: "bestseller",
        value: "BESTSELLER",
        label: "Office Favorite",
        color: "bg-yellow-500",
      },
      detailed_description:
        "Traditional Indian-style 3-tier stainless steel lunch box perfect for office and school. Each compartment is leak-proof and can hold different food items. Easy to clean and maintain.",
      features: [
        "3 separate compartments",
        "Leak-proof design",
        "Easy to clean",
        "Stackable",
        "Durable construction",
        "Traditional design",
      ],
      alternatives_to: ["Plastic lunch boxes", "Disposable food containers", "Plastic tiffin boxes"],
      buy_link: "https://www.amazon.in/steel-lunch-box",
      impact_explanation: {
        co2_calculation: "Steel production has initial impact but lasts decades vs frequent plastic replacement.",
        plastic_reduction: "Eliminates daily use of plastic food containers and disposable packaging.",
        resource_saving: "Stainless steel is 100% recyclable and doesn't leach chemicals.",
      },
      sustainability_certifications: ["Food Grade Steel", "BPA Free", "Recyclable"],
      warranty: "5 years manufacturing defect warranty",
      shipping: "Secure packaging",
    },
    {
      id: 12,
      name: "Coconut Coir Scrubbers",
      description: "Pack of 4 natural coconut fiber scrubbers",
      price: "₹399",
      originalPrice: "₹599",
      rating: 4.2,
      reviews: 189,
      category: "Cleaning",
      eco_score: 9.6,
      replaces: "Plastic Scrubbers",
      impact: "Replaces 12+ plastic scrubbers per year",
      materials: "Natural coconut coir fiber",
      lifespan: "3-4 months each",
      co2_saved: "1.1 kg CO2/year",
      image: "https://satopradhan.com/cdn/shop/files/Preview-1CoconutCoirScrubber_1000x.jpg?v=1711174624",
      offer: {
        type: "discount",
        value: "33% OFF",
        label: "Natural Clean",
        color: "bg-brown-500",
      },
      detailed_description:
        "Natural coconut coir scrubbers that are tough on stains but gentle on surfaces. Made from coconut husk fiber, these scrubbers are completely biodegradable and compostable.",
      features: [
        "Natural abrasive",
        "Biodegradable",
        "Compostable",
        "Non-toxic",
        "Effective cleaning",
        "Sustainable source",
      ],
      alternatives_to: ["Plastic scrubbers", "Synthetic sponges", "Disposable cleaning pads"],
      buy_link: "https://www.flipkart.com/coconut-scrubbers",
      impact_explanation: {
        co2_calculation: "Coconut coir is a waste product that's upcycled, preventing waste and emissions.",
        plastic_reduction: "Households use 12+ plastic scrubbers yearly that don't biodegrade.",
        resource_saving: "Made from agricultural waste, completely compostable after use.",
      },
      sustainability_certifications: ["Natural Product", "Compostable", "Zero Waste"],
      warranty: "Natural product guarantee",
      shipping: "Minimal packaging",
    },
    {
      id: 13,
      name: "Hemp Rope Laundry Bag",
      description: "Large hemp fiber laundry bag with drawstring",
      price: "₹1,299",
      rating: 4.4,
      reviews: 156,
      category: "Home & Garden",
      eco_score: 8.9,
      replaces: "Plastic Laundry Baskets",
      impact: "Replaces plastic laundry storage permanently",
      materials: "Natural hemp fiber",
      lifespan: "5+ years",
      co2_saved: "4.2 kg CO2/year",
      image: "https://i.etsystatic.com/9256355/r/il/b58851/831812635/il_1080xN.831812635_3mxf.jpg",
      offer: {
        type: "premium",
        value: "PREMIUM",
        label: "Artisan Made",
        color: "bg-indigo-500",
      },
      detailed_description:
        "Handwoven hemp laundry bag that's both functional and sustainable. Hemp is one of the strongest natural fibers, making this bag extremely durable. Perfect for laundry, storage, or as a beach bag.",
      features: [
        "Extra strong hemp fiber",
        "Large capacity",
        "Drawstring closure",
        "Machine washable",
        "Multi-purpose use",
        "Handwoven",
      ],
      alternatives_to: ["Plastic laundry baskets", "Synthetic storage bags", "Plastic hampers"],
      buy_link: "https://www.amazon.in/hemp-laundry-bag",
      impact_explanation: {
        co2_calculation: "Hemp cultivation actually improves soil and absorbs more CO2 than it produces.",
        plastic_reduction: "Replaces plastic storage solutions that crack and need replacement.",
        resource_saving: "Hemp is renewable, biodegradable, and requires minimal water to grow.",
      },
      sustainability_certifications: ["Natural Hemp", "Handwoven", "Biodegradable"],
      warranty: "2 years craftsmanship warranty",
      shipping: "Supports traditional weavers",
    },
    {
      id: 14,
      name: "Wooden Comb Set",
      description: "Set of 3 neem wood combs for hair care",
      price: "₹899",
      originalPrice: "₹1,199",
      rating: 4.6,
      reviews: 298,
      category: "Personal Care",
      eco_score: 9.1,
      replaces: "Plastic Combs",
      impact: "Replaces plastic combs with natural alternative",
      materials: "Neem wood, natural finish",
      lifespan: "3-5 years",
      co2_saved: "0.8 kg CO2/year",
      image: "https://m.media-amazon.com/images/I/714brCSHzAL._SL1488_.jpg",
      offer: {
        type: "bundle",
        value: "FAMILY SET",
        label: "3 Combs",
        color: "bg-green-500",
      },
      detailed_description:
        "Handcrafted neem wood combs that are gentle on hair and scalp. Neem has natural antibacterial properties and helps reduce dandruff. The set includes combs for different hair types and lengths.",
      features: [
        "Natural neem wood",
        "Antibacterial properties",
        "Gentle on scalp",
        "Reduces static",
        "Different sizes",
        "Smooth finish",
      ],
      alternatives_to: ["Plastic combs", "Synthetic brushes", "Disposable combs"],
      buy_link: "https://www.nykaa.com/wooden-comb-set",
      impact_explanation: {
        co2_calculation: "Wood combs are carbon-neutral as trees absorb CO2 during growth.",
        plastic_reduction: "Replaces plastic combs that break easily and aren't biodegradable.",
        resource_saving: "Neem wood is sustainably harvested and completely biodegradable.",
      },
      sustainability_certifications: ["Natural Wood", "Handcrafted", "Biodegradable"],
      warranty: "1 year craftsmanship guarantee",
      shipping: "Eco-friendly packaging",
    },
    {
      id: 15,
      name: "Recycled Paper Notebooks",
      description: "Set of 5 notebooks made from recycled paper",
      price: "₹799",
      originalPrice: "₹1,099",
      rating: 4.3,
      reviews: 445,
      category: "Office Supplies",
      eco_score: 8.5,
      replaces: "Plastic-bound Notebooks",
      impact: "Saves trees and reduces plastic binding",
      materials: "100% recycled paper, cardboard cover",
      lifespan: "6 months each",
      co2_saved: "3.2 kg CO2/year",
      image: "https://www.sustainablejungle.com/wp-content/uploads/2024/09/Image-by-White-Dragon-Paper-sustainable-notebooks-2.jpg",
      offer: {
        type: "discount",
        value: "27% OFF",
        label: "Student Special",
        color: "bg-blue-500",
      },
      detailed_description:
        "High-quality notebooks made from 100% recycled paper with cardboard covers. Perfect for students, professionals, and artists. The paper is smooth and suitable for all types of pens and pencils.",
      features: [
        "100% recycled paper",
        "Smooth writing surface",
        "Durable cardboard cover",
        "Wire-free binding",
        "Multiple sizes",
        "Eco-friendly",
      ],
      alternatives_to: ["Plastic-bound notebooks", "Virgin paper notebooks", "Synthetic covers"],
      buy_link: "https://www.amazon.in/recycled-paper-notebooks",
      impact_explanation: {
        co2_calculation: "Recycled paper production uses 60% less energy than virgin paper production.",
        plastic_reduction: "Eliminates plastic spiral bindings and synthetic covers.",
        resource_saving: "Each ton of recycled paper saves 17 trees and 7,000 gallons of water.",
      },
      sustainability_certifications: ["100% Recycled", "FSC Certified", "Plastic-Free"],
      warranty: "Quality guarantee",
      shipping: "Carbon-neutral shipping",
    },
  ]

  // Load tracked items from localStorage on component mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("trackedAlternatives")
    if (saved) {
      try {
        setTrackedItems(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading tracked items:", error)
      }
    }
  }, [])

  const toggleTracking = (productId: number) => {
    const newTrackedItems = trackedItems.includes(productId)
      ? trackedItems.filter((id) => id !== productId)
      : [...trackedItems, productId]

    setTrackedItems(newTrackedItems)

    // Save to localStorage for persistence
    try {
      localStorage.setItem("trackedAlternatives", JSON.stringify(newTrackedItems))
    } catch (error) {
      console.error("Error saving tracked items:", error)
    }
  }

  const getTotalImpact = () => {
    const tracked = alternatives.filter((alt) => trackedItems.includes(alt.id))
    const totalCO2 = tracked.reduce((sum, item) => sum + Number.parseFloat(item.co2_saved.split(" ")[0]), 0)
    const totalPlasticItems = tracked.reduce((sum, item) => {
      const impactText = item.impact.toLowerCase()
      if (impactText.includes("bottles")) return sum + 365
      if (impactText.includes("bags")) return sum + 500
      if (impactText.includes("straws")) return sum + 1000
      if (impactText.includes("wrap")) return sum + 200
      if (impactText.includes("toothbrush")) return sum + 4
      if (impactText.includes("containers")) return sum + 5
      return sum + 100
    }, 0)

    return {
      itemsTracked: tracked.length,
      co2Saved: totalCO2.toFixed(1),
      plasticsReplaced: totalPlasticItems,
      moneySaved: tracked.reduce(
        (sum, item) => sum + Number.parseFloat(item.price.replace("₹", "").replace(",", "")),
        0,
      ),
    }
  }

  const impact = getTotalImpact()

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading alternatives...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sustainable Alternatives</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Discover eco-friendly alternatives to common plastic products and track your environmental impact
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowCharts(true)} className="bg-blue-600 hover:bg-blue-700" size="lg">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Impact Charts
            </Button>
            <Button onClick={() => setShowRegionalData(true)} className="bg-purple-600 hover:bg-purple-700" size="lg">
              <MapPin className="h-5 w-5 mr-2" />
              Visakhapatnam Data
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowImpactInfo(true)}
              className="text-green-600 border-green-600"
              size="lg"
            >
              <Info className="h-5 w-5 mr-2" />
              How Impact is Calculated
            </Button>
          </div>
        </div>

        {/* Impact Explanation */}
        <ImpactExplanation />

        {/* Impact Tracker */}
        {trackedItems.length > 0 && (
          <DetailedImpactCard title="Your Environmental Impact Dashboard">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Positive Impact</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCharts(true)}
                    className="text-blue-600 border-blue-600"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Charts
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRegionalData(true)}
                    className="text-purple-600 border-purple-600"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Local Data
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ImpactMetricExplanation
                  metric="Items Tracked"
                  value={impact.itemsTracked}
                  explanation="Sustainable products you're using instead of plastic alternatives"
                  icon={Leaf}
                  color="bg-green-500"
                />
                <ImpactMetricExplanation
                  metric="CO2 Prevented"
                  value={`${impact.co2Saved} kg/year`}
                  explanation="Greenhouse gases prevented from entering atmosphere by avoiding plastic production"
                  icon={TreePine}
                  color="bg-blue-500"
                />
                <ImpactMetricExplanation
                  metric="Plastic Items Avoided"
                  value={`${impact.plasticsReplaced.toLocaleString()}/year`}
                  explanation="Single-use plastic items you're not using thanks to sustainable alternatives"
                  icon={Waves}
                  color="bg-purple-500"
                />
                <ImpactMetricExplanation
                  metric="Investment"
                  value={`₹${impact.moneySaved.toLocaleString("en-IN")}`}
                  explanation="Your investment in sustainable products that will save money long-term"
                  icon={Factory}
                  color="bg-orange-500"
                />
              </div>
            </div>
          </DetailedImpactCard>
        )}

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="drinkware">Drinkware</TabsTrigger>
            <TabsTrigger value="food-storage">Food Storage</TabsTrigger>
            <TabsTrigger value="personal-care">Personal Care</TabsTrigger>
            <TabsTrigger value="shopping">Shopping</TabsTrigger>
            <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
            <TabsTrigger value="tracked">Tracked ({trackedItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ProductGridComponent
              products={alternatives}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="drinkware" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => p.category === "Drinkware")}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="food-storage" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => p.category === "Food Storage")}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="personal-care" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => p.category === "Personal Care")}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="shopping" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => p.category === "Shopping")}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="cleaning" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => p.category === "Cleaning")}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>

          <TabsContent value="tracked" className="mt-6">
            <ProductGridComponent
              products={alternatives.filter((p) => trackedItems.includes(p.id))}
              trackedItems={trackedItems}
              onToggleTracking={toggleTracking}
              onProductClick={setSelectedProduct}
            />
          </TabsContent>
        </Tabs>

        {/* Regional Data Modal */}
        <Dialog open={showRegionalData} onOpenChange={setShowRegionalData}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Andhra Pradesh & Visakhapatnam Environmental Data</DialogTitle>
              <DialogDescription>
                Real-time environmental statistics, pollution data, and sustainability initiatives in our region
              </DialogDescription>
            </DialogHeader>
            <RegionalDataSection />
          </DialogContent>
        </Dialog>

        {/* Impact Charts Modal */}
        <Dialog open={showCharts} onOpenChange={setShowCharts}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Plastic vs Sustainable: Visual Impact Comparison</DialogTitle>
              <DialogDescription>
                Comprehensive charts showing the real environmental, economic, and social impact differences
              </DialogDescription>
            </DialogHeader>
            <ImpactChartsSection />
          </DialogContent>
        </Dialog>

        {/* Impact Info Modal */}
        <Dialog open={showImpactInfo} onOpenChange={setShowImpactInfo}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>How We Calculate Environmental Impact</DialogTitle>
              <DialogDescription>
                Understanding the science behind our environmental impact calculations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <TreePine className="h-4 w-4 mr-2 text-green-600" />
                  CO2 Emissions Prevented
                </h4>
                <p className="text-sm text-gray-600">
                  We calculate CO2 based on the manufacturing emissions of plastic products you avoid. For example:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 1 plastic bottle = ~34g CO2 emissions</li>
                  <li>• 365 bottles/year = 12.4kg CO2</li>
                  <li>• Reusable bottle prevents this annual emission</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <Waves className="h-4 w-4 mr-2 text-blue-600" />
                  Plastic Items Avoided
                </h4>
                <p className="text-sm text-gray-600">Based on average consumption patterns in India:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Average person uses 365 plastic bottles/year</li>
                  <li>• Families use 500+ plastic bags/year</li>
                  <li>• Heavy straw users consume 1,000+ straws/year</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Real Impact:</strong> Your choices prevent plastic waste from entering landfills and oceans,
                  where it would take 400-1000 years to decompose, harming marine life and ecosystems.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isTracked={trackedItems.includes(selectedProduct.id)}
            onToggleTracking={() => toggleTracking(selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  )
}
