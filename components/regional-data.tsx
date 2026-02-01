"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Legend,
} from "recharts"
import {
  MapPin,
  Factory,
  Waves,
  TreePine,
  Recycle,
  AlertTriangle,
  TrendingUp,
  Building,
  Ship,
  Droplets,
  Wind,
} from "lucide-react"

// Andhra Pradesh waste generation data
const apWasteData = [
  { district: "Visakhapatnam", population: 2035922, wasteGenerated: 850, recyclingRate: 65, plasticWaste: 127 },
  { district: "Vijayawada", population: 1048240, wasteGenerated: 450, recyclingRate: 58, plasticWaste: 68 },
  { district: "Guntur", population: 743354, wasteGenerated: 320, recyclingRate: 52, plasticWaste: 48 },
  { district: "Nellore", population: 558676, wasteGenerated: 240, recyclingRate: 48, plasticWaste: 36 },
  { district: "Kurnool", population: 484327, wasteGenerated: 200, recyclingRate: 45, plasticWaste: 30 },
  { district: "Rajahmundry", population: 341831, wasteGenerated: 150, recyclingRate: 55, plasticWaste: 23 },
]

// Visakhapatnam specific data over years
const vizagTrendData = [
  { year: 2019, wasteGenerated: 720, recycled: 360, plasticWaste: 108, beachCleanup: 12 },
  { year: 2020, wasteGenerated: 680, recycled: 374, plasticWaste: 102, beachCleanup: 18 },
  { year: 2021, wasteGenerated: 750, recycled: 435, plasticWaste: 113, beachCleanup: 25 },
  { year: 2022, wasteGenerated: 800, recycled: 504, plasticWaste: 120, beachCleanup: 32 },
  { year: 2023, wasteGenerated: 850, recycled: 553, plasticWaste: 127, beachCleanup: 45 },
]

// Pollution sources in Visakhapatnam
const pollutionSources = [
  { source: "Industrial Waste", percentage: 35, color: "#EF4444" },
  { source: "Household Waste", percentage: 28, color: "#F59E0B" },
  { source: "Commercial Waste", percentage: 20, color: "#8B5CF6" },
  { source: "Construction Waste", percentage: 10, color: "#6B7280" },
  { source: "Medical Waste", percentage: 4, color: "#EC4899" },
  { source: "E-Waste", percentage: 3, color: "#10B981" },
]

// Beach pollution data
const beachPollutionData = [
  { beach: "RK Beach", plasticBottles: 2400, plasticBags: 3200, straws: 1800, otherPlastic: 1600 },
  { beach: "Rushikonda", plasticBottles: 1800, plasticBags: 2400, straws: 1200, otherPlastic: 1000 },
  { beach: "Bheemunipatnam", plasticBottles: 1200, plasticBags: 1600, straws: 800, otherPlastic: 600 },
  { beach: "Gangavaram", plasticBottles: 900, plasticBags: 1200, straws: 600, otherPlastic: 400 },
]

// Recycling infrastructure
const recyclingInfrastructure = [
  {
    facility: "Visakha EcoRecycle Center",
    location: "Gajuwaka",
    capacity: "500 tons/month",
    specialization: "Mixed Plastics",
    established: 2015,
    jobs: 25,
  },
  {
    facility: "Green Vizag Recycling",
    location: "MVP Colony",
    capacity: "800 tons/month",
    specialization: "E-Waste & Electronics",
    established: 2012,
    jobs: 35,
  },
  {
    facility: "Clean Andhra Facility",
    location: "Duvvada",
    capacity: "300 tons/month",
    specialization: "Textiles & Foam",
    established: 2018,
    jobs: 18,
  },
  {
    facility: "Port City Recyclers",
    location: "Beach Road",
    capacity: "200 tons/month",
    specialization: "Marine Plastics",
    established: 2020,
    jobs: 12,
  },
  {
    facility: "AP Waste Management",
    location: "Industrial Estate",
    capacity: "1200 tons/month",
    specialization: "Industrial Waste",
    established: 2010,
    jobs: 45,
  },
]

// Environmental initiatives
const environmentalInitiatives = [
  {
    name: "Swachh Visakhapatnam Mission",
    launched: 2014,
    impact: "45% reduction in street litter",
    focus: "Waste segregation and collection",
    budget: "₹125 crores",
  },
  {
    name: "Beach Clean-up Drive",
    launched: 2019,
    impact: "15 tons plastic removed from beaches",
    focus: "Marine pollution control",
    budget: "₹8 crores",
  },
  {
    name: "Plastic Ban Implementation",
    launched: 2021,
    impact: "60% reduction in single-use plastics",
    focus: "Alternative promotion",
    budget: "₹12 crores",
  },
  {
    name: "Green Vizag Initiative",
    launched: 2020,
    impact: "2000+ trees planted, 30% air quality improvement",
    focus: "Urban forestry and air quality",
    budget: "₹35 crores",
  },
]

const COLORS = {
  primary: "#10B981",
  secondary: "#3B82F6",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
  gray: "#6B7280",
}

export function RegionalDataSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Andhra Pradesh & Visakhapatnam Environmental Data</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real-time environmental statistics, pollution data, and sustainability initiatives in our region
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="waste">Waste Data</TabsTrigger>
          <TabsTrigger value="pollution">Pollution</TabsTrigger>
          <TabsTrigger value="beaches">Beach Impact</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <RegionalOverview />
        </TabsContent>

        <TabsContent value="waste" className="space-y-6">
          <WasteDataSection />
        </TabsContent>

        <TabsContent value="pollution" className="space-y-6">
          <PollutionAnalysis />
        </TabsContent>

        <TabsContent value="beaches" className="space-y-6">
          <BeachImpactSection />
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <InfrastructureSection />
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          <InitiativesSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RegionalOverview() {
  return (
    <div className="space-y-6">
      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">20.35 Lakh</div>
            <div className="text-sm text-blue-600">Visakhapatnam Population</div>
            <div className="text-xs text-blue-500 mt-1">3rd largest city in AP</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">65%</div>
            <div className="text-sm text-green-600">Recycling Rate</div>
            <div className="text-xs text-green-500 mt-1">Above national average</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <Factory className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">850</div>
            <div className="text-sm text-orange-600">Tons Waste/Day</div>
            <div className="text-xs text-orange-500 mt-1">127 tons plastic waste</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Waves className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">45 Tons</div>
            <div className="text-sm text-purple-600">Beach Cleanup 2023</div>
            <div className="text-xs text-purple-500 mt-1">15km coastline cleaned</div>
          </CardContent>
        </Card>
      </div>

      {/* Andhra Pradesh Districts Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Andhra Pradesh Major Cities - Waste Management Comparison
          </CardTitle>
          <CardDescription>Daily waste generation and recycling rates across major AP cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apWasteData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "wasteGenerated") return [`${value} tons/day`, "Waste Generated"]
                    if (name === "plasticWaste") return [`${value} tons/day`, "Plastic Waste"]
                    if (name === "recyclingRate") return [`${value}%`, "Recycling Rate"]
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="wasteGenerated" fill={COLORS.warning} name="Total Waste (tons/day)" />
                <Bar yAxisId="left" dataKey="plasticWaste" fill={COLORS.danger} name="Plastic Waste (tons/day)" />
                <Bar yAxisId="right" dataKey="recyclingRate" fill={COLORS.primary} name="Recycling Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🏆 Visakhapatnam Leads</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Highest recycling rate (65%)</li>
                <li>• Best waste management infrastructure</li>
                <li>• Most recycling facilities (5 major centers)</li>
                <li>• Active beach cleanup programs</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Regional Average</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Average recycling rate: 54%</li>
                <li>• Total AP waste: 2,210 tons/day</li>
                <li>• Plastic waste: 332 tons/day</li>
                <li>• Population served: 6.2 million</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">🎯 Improvement Areas</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Kurnool needs more facilities</li>
                <li>• Nellore recycling rate below 50%</li>
                <li>• Rural areas need better collection</li>
                <li>• E-waste management expansion needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visakhapatnam Highlights */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Why Visakhapatnam is Leading in Sustainability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Ship className="h-4 w-4 mr-2 text-blue-600" />
                Strategic Advantages
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <span>Major port city with established logistics network</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <span>Industrial hub with recycling infrastructure</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <span>Coastal location drives marine conservation efforts</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <span>Tech-savvy population embracing sustainable solutions</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                Recent Achievements
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                  <span>Swachh Survekshan ranking improved to 8th nationally</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                  <span>First AP city to ban single-use plastics effectively</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                  <span>15 tons of plastic removed from beaches in 2023</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                  <span>135 jobs created in recycling sector</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WasteDataSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Visakhapatnam Waste Management Trends (2019-2023)
          </CardTitle>
          <CardDescription>Progress in waste generation, recycling, and beach cleanup efforts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vizagTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    const labels = {
                      wasteGenerated: "Waste Generated (tons/day)",
                      recycled: "Recycled (tons/day)",
                      plasticWaste: "Plastic Waste (tons/day)",
                      beachCleanup: "Beach Cleanup (tons/year)",
                    }
                    return [value, labels[name as keyof typeof labels] || name]
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="wasteGenerated"
                  stroke={COLORS.warning}
                  strokeWidth={3}
                  name="Total Waste"
                />
                <Line type="monotone" dataKey="recycled" stroke={COLORS.primary} strokeWidth={3} name="Recycled" />
                <Line
                  type="monotone"
                  dataKey="plasticWaste"
                  stroke={COLORS.danger}
                  strokeWidth={3}
                  name="Plastic Waste"
                />
                <Line
                  type="monotone"
                  dataKey="beachCleanup"
                  stroke={COLORS.secondary}
                  strokeWidth={3}
                  name="Beach Cleanup"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-600">+18%</div>
                <div className="text-sm text-green-700">Recycling Rate Increase</div>
                <div className="text-xs text-green-600">2019-2023</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-600">275%</div>
                <div className="text-sm text-blue-700">Beach Cleanup Increase</div>
                <div className="text-xs text-blue-600">12 to 45 tons/year</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-orange-600">65%</div>
                <div className="text-sm text-orange-700">Current Recycling Rate</div>
                <div className="text-xs text-orange-600">Above national average</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-600">553</div>
                <div className="text-sm text-purple-700">Tons Recycled Daily</div>
                <div className="text-xs text-purple-600">2023 achievement</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Waste Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Waste Composition (850 tons/day)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Organic Waste</span>
                  <span className="text-sm">425 tons (50%)</span>
                </div>
                <Progress value={50} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Plastic Waste</span>
                  <span className="text-sm">127 tons (15%)</span>
                </div>
                <Progress value={15} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Paper & Cardboard</span>
                  <span className="text-sm">102 tons (12%)</span>
                </div>
                <Progress value={12} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Glass & Metal</span>
                  <span className="text-sm">85 tons (10%)</span>
                </div>
                <Progress value={10} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Construction Debris</span>
                  <span className="text-sm">68 tons (8%)</span>
                </div>
                <Progress value={8} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Other Waste</span>
                  <span className="text-sm">43 tons (5%)</span>
                </div>
                <Progress value={5} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recycling Success by Material</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Paper & Cardboard</span>
                  <span className="text-sm font-bold text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Glass & Metal</span>
                  <span className="text-sm font-bold text-green-600">78%</span>
                </div>
                <Progress value={78} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Plastic Waste</span>
                  <span className="text-sm font-bold text-orange-600">62%</span>
                </div>
                <Progress value={62} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Organic Waste</span>
                  <span className="text-sm font-bold text-blue-600">45%</span>
                </div>
                <Progress value={45} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">E-Waste</span>
                  <span className="text-sm font-bold text-purple-600">72%</span>
                </div>
                <Progress value={72} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Construction Debris</span>
                  <span className="text-sm font-bold text-gray-600">35%</span>
                </div>
                <Progress value={35} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PollutionAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Pollution Sources in Visakhapatnam
          </CardTitle>
          <CardDescription>Breakdown of waste generation by source category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pollutionSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {pollutionSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {pollutionSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: source.color }}>
                      {source.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">{Math.round((source.percentage / 100) * 850)} tons/day</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Air Quality and Environmental Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <Wind className="h-5 w-5 mr-2" />
              Air Quality Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">156</div>
              <Badge className="bg-red-100 text-red-800">Moderate to Poor</Badge>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>PM2.5:</span>
                  <span className="font-semibold">78 μg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span>PM10:</span>
                  <span className="font-semibold">145 μg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span>NO2:</span>
                  <span className="font-semibold">42 μg/m³</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Droplets className="h-5 w-5 mr-2" />
              Water Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6.8</div>
              <Badge className="bg-blue-100 text-blue-800">Acceptable</Badge>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>pH Level:</span>
                  <span className="font-semibold">6.8</span>
                </div>
                <div className="flex justify-between">
                  <span>TDS:</span>
                  <span className="font-semibold">420 ppm</span>
                </div>
                <div className="flex justify-between">
                  <span>Plastic particles:</span>
                  <span className="font-semibold">12/L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <TreePine className="h-5 w-5 mr-2" />
              Green Cover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">28%</div>
              <Badge className="bg-green-100 text-green-800">Improving</Badge>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Forest Cover:</span>
                  <span className="font-semibold">18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Urban Trees:</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Trees Planted 2023:</span>
                  <span className="font-semibold">2,000+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industrial Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Factory className="h-5 w-5 mr-2 text-gray-600" />
            Industrial Environmental Impact
          </CardTitle>
          <CardDescription>Major industries and their environmental footprint in Visakhapatnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Major Industries</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Visakhapatnam Steel Plant</div>
                    <div className="text-sm text-gray-600">Steel Manufacturing</div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Visakhapatnam Port</div>
                    <div className="text-sm text-gray-600">Shipping & Logistics</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Medium Impact</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Pharma Companies</div>
                    <div className="text-sm text-gray-600">Pharmaceutical</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">IT Companies</div>
                    <div className="text-sm text-gray-600">Information Technology</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Low Impact</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Environmental Initiatives by Industries</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <div className="font-medium text-green-800">Waste-to-Energy Plants</div>
                  <div className="text-sm text-green-700">3 plants operational, 50MW capacity</div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">Water Treatment Facilities</div>
                  <div className="text-sm text-blue-700">12 facilities treating 200 MLD</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="font-medium text-purple-800">Air Pollution Control</div>
                  <div className="text-sm text-purple-700">15 monitoring stations, real-time data</div>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <div className="font-medium text-orange-800">Green Belt Development</div>
                  <div className="text-sm text-orange-700">500 hectares under plantation</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BeachImpactSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Waves className="h-5 w-5 mr-2 text-blue-600" />
            Beach Plastic Pollution Data (Items collected per month)
          </CardTitle>
          <CardDescription>Plastic waste collected from major beaches during cleanup drives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={beachPollutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="beach" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} items`, name]} />
                <Legend />
                <Bar dataKey="plasticBottles" stackId="a" fill="#EF4444" name="Plastic Bottles" />
                <Bar dataKey="plasticBags" stackId="a" fill="#F59E0B" name="Plastic Bags" />
                <Bar dataKey="straws" stackId="a" fill="#8B5CF6" name="Straws" />
                <Bar dataKey="otherPlastic" stackId="a" fill="#6B7280" name="Other Plastic" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {beachPollutionData.map((beach, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">{beach.beach}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-bold">
                        {(
                          beach.plasticBottles +
                          beach.plasticBags +
                          beach.straws +
                          beach.otherPlastic
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bottles:</span>
                      <span>{beach.plasticBottles.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bags:</span>
                      <span>{beach.plasticBags.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marine Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Marine Ecosystem Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <div className="font-medium text-red-800">Critical Issues</div>
                  <ul className="text-sm text-red-700 mt-1 space-y-1">
                    <li>• 15% decline in fish catch due to plastic pollution</li>
                    <li>• 200+ marine animals rescued with plastic ingestion</li>
                    <li>• Microplastics found in 80% of fish samples</li>
                    <li>• Coral reef damage from plastic debris</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Waves className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <div className="font-medium text-blue-800">Conservation Efforts</div>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• 15 km coastline cleaned regularly</li>
                    <li>• 45 tons plastic removed in 2023</li>
                    <li>• Marine protected areas established</li>
                    <li>• Fishing community awareness programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-800">Beach Cleanup Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">45 Tons</div>
                <div className="text-sm text-green-700">Plastic removed in 2023</div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">RK Beach</span>
                    <span className="text-sm">18 tons (40%)</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Rushikonda</span>
                    <span className="text-sm">13.5 tons (30%)</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bheemunipatnam</span>
                    <span className="text-sm">9 tons (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Other Beaches</span>
                    <span className="text-sm">4.5 tons (10%)</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded">
                <div className="text-sm text-green-800">
                  <strong>Volunteer Impact:</strong> 2,500+ volunteers participated in beach cleanups, contributing
                  12,000+ hours of community service.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InfrastructureSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-gray-600" />
            Recycling Infrastructure in Visakhapatnam
          </CardTitle>
          <CardDescription>Major recycling facilities and their capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {recyclingInfrastructure.map((facility, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-green-800">{facility.facility}</h4>
                      <Badge className="bg-green-100 text-green-800">{facility.capacity}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-600">{facility.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Factory className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-600">Specializes in {facility.specialization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established: {facility.established}</span>
                        <span className="text-green-600 font-medium">{facility.jobs} jobs created</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Infrastructure Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Facilities:</span>
                      <span className="font-bold text-blue-600">5 Major Centers</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Combined Capacity:</span>
                      <span className="font-bold text-blue-600">3,000 tons/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Jobs Created:</span>
                      <span className="font-bold text-blue-600">135 Direct Jobs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Investment:</span>
                      <span className="font-bold text-blue-600">₹45 Crores</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Capacity Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Current Utilization</span>
                        <span className="text-sm">75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                    <div className="text-sm text-green-700">
                      <strong>Capacity Available:</strong> 750 tons/month additional capacity available for expansion
                    </div>
                    <div className="text-sm text-green-700">
                      <strong>Future Plans:</strong> 2 new facilities planned for 2024-25, adding 1,500 tons/month
                      capacity
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Collection Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Collection Points:</span>
                      <span className="font-semibold">150+ locations</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Collection Vehicles:</span>
                      <span className="font-semibold">45 trucks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage Area:</span>
                      <span className="font-semibold">95% of city</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Collections:</span>
                      <span className="font-semibold">850 tons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InitiativesSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {environmentalInitiatives.map((initiative, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-blue-800">{initiative.name}</CardTitle>
              <CardDescription>Launched in {initiative.launched}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium text-green-800">Impact Achieved</div>
                  <div className="text-sm text-green-700">{initiative.impact}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-medium text-blue-800">Focus Area</div>
                  <div className="text-sm text-blue-700">{initiative.focus}</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-medium text-orange-800">Budget Allocated</div>
                  <div className="text-sm text-orange-700">{initiative.budget}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Future Plans */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-800">Future Environmental Plans (2024-2026)</CardTitle>
          <CardDescription>Upcoming initiatives to make Visakhapatnam more sustainable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4 text-purple-800">Planned Initiatives</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Zero Waste to Landfill by 2025</div>
                    <div className="text-sm text-gray-600">100% waste processing through recycling and composting</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Plastic-Free Beaches Initiative</div>
                    <div className="text-sm text-gray-600">Complete elimination of plastic from all beaches</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Green Transportation Network</div>
                    <div className="text-sm text-gray-600">Electric buses and bike-sharing programs</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Smart Waste Management System</div>
                    <div className="text-sm text-gray-600">IoT-enabled bins and route optimization</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-800">Investment & Timeline</h4>
              <div className="space-y-4">
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total Investment</span>
                      <span className="text-xl font-bold text-purple-600">₹200 Crores</span>
                    </div>
                    <div className="text-sm text-gray-600">Over 3 years (2024-2026)</div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Expected Jobs</span>
                      <span className="text-xl font-bold text-green-600">500+</span>
                    </div>
                    <div className="text-sm text-gray-600">Direct and indirect employment</div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">CO2 Reduction Target</span>
                      <span className="text-xl font-bold text-blue-600">40%</span>
                    </div>
                    <div className="text-sm text-gray-600">By 2026 compared to 2020 levels</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Be Part of Visakhapatnam's Green Future</h3>
          <p className="mb-4">
            Join thousands of citizens making a difference through sustainable choices and community participation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold">Individual Action</div>
              <div>Use sustainable alternatives, reduce plastic consumption</div>
            </div>
            <div>
              <div className="font-semibold">Community Participation</div>
              <div>Join beach cleanups, volunteer for environmental drives</div>
            </div>
            <div>
              <div className="font-semibold">Spread Awareness</div>
              <div>Educate others about environmental impact and solutions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
