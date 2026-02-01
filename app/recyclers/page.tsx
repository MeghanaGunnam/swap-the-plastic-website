"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Phone, Clock, Star, Plus, Check, Navigation, TrendingUp } from "lucide-react"

export default function RecyclersPage() {
  const [trackedRecyclers, setTrackedRecyclers] = useState<number[]>([])
  const [selectedRecycler, setSelectedRecycler] = useState<any>(null)
  const [searchLocation, setSearchLocation] = useState("")

  const recyclers = [
    {
      id: 1,
      name: "Visakha EcoRecycle Center",
      address: "Plot No. 45, Industrial Estate, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026",
      phone: "+91 891-2345-678",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      rating: 4.8,
      materials: ["PET Bottles", "HDPE", "Cardboard", "Glass"],
      distance: "2.5 km",
      description:
        "Leading recycling facility in Visakhapatnam with state-of-the-art processing equipment and excellent customer service.",
      specialties: ["Electronics recycling", "Hazardous waste disposal", "Bulk commercial pickup"],
      certifications: ["Pollution Control Board Certified", "ISO 14001", "CPCB Authorized"],
      processing_capacity: "500 tons/month",
      established: "2015",
      website: "www.visakhaecorecycle.com",
      email: "info@visakhaecorecycle.com",
      services: ["Drop-off", "Pickup service", "Bulk processing", "Certificate of destruction"],
      accepted_items: {
        Plastics: ["PET bottles", "HDPE containers", "Plastic bags", "Food containers"],
        Paper: ["Newspapers", "Magazines", "Cardboard", "Office paper"],
        Glass: ["Bottles", "Jars", "Window glass"],
        Electronics: ["Computers", "Phones", "Batteries", "Cables"],
      },
      pricing: "Free for most items, ₹50 fee for electronics",
      impact_stats: {
        monthly_processed: "450 tons",
        co2_saved: "1,200 kg/month",
        jobs_created: 25,
      },
    },
    {
      id: 2,
      name: "Green Vizag Recycling",
      address: "Door No. 12-34-56, MVP Colony, Sector 7, Visakhapatnam, Andhra Pradesh 530017",
      phone: "+91 891-9876-543",
      hours: "Mon-Sat: 7AM-7PM",
      rating: 4.6,
      materials: ["All Plastics", "Electronics", "Metal", "Paper"],
      distance: "4.2 km",
      description:
        "Comprehensive recycling facility in MVP Colony specializing in electronic waste and rare material recovery.",
      specialties: ["Rare earth recovery", "Data destruction", "Industrial waste"],
      certifications: ["CPCB Certified", "NAID AAA", "e-Stewards"],
      processing_capacity: "800 tons/month",
      established: "2012",
      website: "www.greenvizag.com",
      email: "contact@greenvizag.com",
      services: ["Secure data destruction", "Corporate partnerships", "Educational tours"],
      accepted_items: {
        Electronics: ["All consumer electronics", "Industrial equipment", "Medical devices"],
        Metals: ["Aluminum", "Copper", "Steel", "Precious metals"],
        Plastics: ["All types 1-7", "Mixed plastics", "Film plastics"],
        Specialty: ["Batteries", "Fluorescent bulbs", "Ink cartridges"],
      },
      pricing: "Free drop-off, ₹100/pickup for bulk items",
      impact_stats: {
        monthly_processed: "720 tons",
        co2_saved: "1,800 kg/month",
        jobs_created: 35,
      },
    },
    {
      id: 3,
      name: "Clean Andhra Facility",
      address: "Survey No. 78/2, Duvvada Industrial Area, Visakhapatnam, Andhra Pradesh 530046",
      phone: "+91 891-4567-890",
      hours: "Daily: 6AM-8PM",
      rating: 4.9,
      materials: ["Plastic Bags", "Styrofoam", "Batteries", "Textiles"],
      distance: "6.8 km",
      description:
        "Innovative facility in Duvvada focusing on hard-to-recycle materials and textile recovery programs.",
      specialties: ["Textile recycling", "Styrofoam processing", "Battery recovery"],
      certifications: ["CPCB Certified", "GRS Certified", "OEKO-TEX"],
      processing_capacity: "300 tons/month",
      established: "2018",
      website: "www.cleanandhra.com",
      email: "hello@cleanandhra.com",
      services: ["Textile collection", "Community programs", "School partnerships"],
      accepted_items: {
        Textiles: ["Clothing", "Shoes", "Bedding", "Curtains"],
        Foam: ["Styrofoam containers", "Packaging foam", "Insulation"],
        Batteries: ["Household batteries", "Car batteries", "Lithium batteries"],
        Specialty: ["Plastic film", "Shopping bags", "Bubble wrap"],
      },
      pricing: "Free for all items",
      impact_stats: {
        monthly_processed: "280 tons",
        co2_saved: "950 kg/month",
        jobs_created: 18,
      },
    },
    {
      id: 4,
      name: "Port City Recyclers",
      address: "Near Fishing Harbour, Beach Road, Visakhapatnam, Andhra Pradesh 530001",
      phone: "+91 891-2468-135",
      hours: "Mon-Fri: 9AM-5PM",
      rating: 4.5,
      materials: ["Marine Plastics", "Fishing Nets", "Glass", "Metal"],
      distance: "3.1 km",
      description: "Specialized facility near the port focusing on marine waste and fishing industry recyclables.",
      specialties: ["Marine plastic recovery", "Fishing net recycling", "Port waste management"],
      certifications: ["Marine Stewardship Council", "CPCB Certified"],
      processing_capacity: "200 tons/month",
      established: "2020",
      website: "www.portcityrecyclers.in",
      email: "marine@portcityrecyclers.in",
      services: ["Marine cleanup", "Fishermen partnerships", "Coastal restoration"],
      accepted_items: {
        "Marine Waste": ["Plastic bottles from sea", "Fishing nets", "Rope", "Buoys"],
        Metals: ["Ship parts", "Anchors", "Marine equipment"],
        Glass: ["Bottles", "Navigation equipment"],
        Specialty: ["Life jackets", "Marine electronics", "Boat parts"],
      },
      pricing: "Free collection, ₹20/kg for fishing nets",
      impact_stats: {
        monthly_processed: "180 tons",
        co2_saved: "600 kg/month",
        jobs_created: 12,
      },
    },
  ]

  const toggleTracking = (recyclerId: number) => {
    const newTrackedRecyclers = trackedRecyclers.includes(recyclerId)
      ? trackedRecyclers.filter((id) => id !== recyclerId)
      : [...trackedRecyclers, recyclerId]

    setTrackedRecyclers(newTrackedRecyclers)
    localStorage.setItem("trackedRecyclers", JSON.stringify(newTrackedRecyclers))
  }

  const getTotalImpact = () => {
    const tracked = recyclers.filter((rec) => trackedRecyclers.includes(rec.id))
    const totalCO2 = tracked.reduce((sum, rec) => sum + Number.parseFloat(rec.impact_stats.co2_saved.split(" ")[0]), 0)
    const totalProcessed = tracked.reduce(
      (sum, rec) => sum + Number.parseFloat(rec.impact_stats.monthly_processed.split(" ")[0]),
      0,
    )
    return {
      recyclersTracked: tracked.length,
      co2Saved: totalCO2.toFixed(0),
      materialProcessed: totalProcessed.toFixed(0),
    }
  }

  const impact = getTotalImpact()

  // Load tracked recyclers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("trackedRecyclers")
    if (saved) {
      setTrackedRecyclers(JSON.parse(saved))
    }
  }, [])

  const handleSearch = () => {
    // In a real app, this would filter recyclers based on location
    alert(`Searching for recyclers near: ${searchLocation}`)
  }

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Recyclers in Visakhapatnam</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover certified recycling centers in Visakhapatnam and track your recycling impact
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Enter area in Visakhapatnam..."
              className="flex-1"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSearch}>
              <MapPin className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Impact Tracker */}
        {trackedRecyclers.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <TrendingUp className="h-5 w-5 mr-2" />
                Your Recycling Network Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{impact.recyclersTracked}</div>
                  <div className="text-sm text-gray-600">Recyclers Tracked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{impact.co2Saved} kg</div>
                  <div className="text-sm text-gray-600">CO2 Saved/Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{impact.materialProcessed} tons</div>
                  <div className="text-sm text-gray-600">Materials Processed/Month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="grid gap-6">
          {recyclers.map((recycler) => (
            <Card key={recycler.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1" onClick={() => setSelectedRecycler(recycler)}>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{recycler.name}</CardTitle>
                      <Button
                        size="sm"
                        variant={trackedRecyclers.includes(recycler.id) ? "default" : "secondary"}
                        className={`${
                          trackedRecyclers.includes(recycler.id)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTracking(recycler.id)
                        }}
                      >
                        {trackedRecyclers.includes(recycler.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{recycler.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {recycler.phone}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recycler.hours}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{recycler.rating}</span>
                    </div>
                    <Badge variant="secondary">{recycler.distance}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent onClick={() => setSelectedRecycler(recycler)}>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Accepted Materials:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recycler.materials.map((material) => (
                      <Badge key={material} className="bg-green-100 text-green-800">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      getDirections(recycler.address)
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recycler Detail Modal */}
        {selectedRecycler && (
          <Dialog open={!!selectedRecycler} onOpenChange={() => setSelectedRecycler(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  {selectedRecycler.name}
                  <Button
                    variant={trackedRecyclers.includes(selectedRecycler.id) ? "default" : "outline"}
                    onClick={() => toggleTracking(selectedRecycler.id)}
                    className={trackedRecyclers.includes(selectedRecycler.id) ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {trackedRecyclers.includes(selectedRecycler.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Tracking
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Track This Recycler
                      </>
                    )}
                  </Button>
                </DialogTitle>
                <DialogDescription>{selectedRecycler.description}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact & Basic Info */}
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {selectedRecycler.address}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${selectedRecycler.phone}`} className="text-blue-600 hover:underline">
                          {selectedRecycler.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {selectedRecycler.hours}
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Facility Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span>{selectedRecycler.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span>{selectedRecycler.processing_capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {selectedRecycler.rating}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Environmental Impact</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Processing:</span>
                        <span className="font-semibold text-green-600">
                          {selectedRecycler.impact_stats.monthly_processed}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CO2 Saved:</span>
                        <span className="font-semibold text-blue-600">{selectedRecycler.impact_stats.co2_saved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jobs Created:</span>
                        <span className="font-semibold">{selectedRecycler.impact_stats.jobs_created}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Detailed Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Accepted Materials</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedRecycler.accepted_items).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">{category}</h4>
                          <div className="flex flex-wrap gap-1">
                            {(items as string[]).map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecycler.services.map((service: string, index: number) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecycler.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecycler.certifications.map((cert: string, index: number) => (
                        <Badge key={index} className="bg-green-100 text-green-800">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Card className="p-4 bg-gray-50">
                    <h3 className="font-semibold mb-2">Pricing</h3>
                    <p className="text-sm text-gray-700">{selectedRecycler.pricing}</p>
                  </Card>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 flex-1"
                  onClick={() => getDirections(selectedRecycler.address)}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" onClick={() => window.open(`tel:${selectedRecycler.phone}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
