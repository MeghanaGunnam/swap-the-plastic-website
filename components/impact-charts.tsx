"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Area,
  AreaChart,
  Legend,
} from "recharts"
import { Recycle, Trash2, TreePine, Waves, Factory, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

// Data for different comparison charts
const lifespanComparison = [
  { item: "Plastic Bottle", plastic: 450, sustainable: 5, sustainableItem: "Steel Bottle" },
  { item: "Plastic Bag", plastic: 20, sustainable: 10, sustainableItem: "Cloth Bag" },
  { item: "Plastic Straw", plastic: 200, sustainable: 999, sustainableItem: "Steel Straw" },
  { item: "Plastic Container", plastic: 50, sustainable: 10, sustainableItem: "Glass Container" },
  { item: "Plastic Wrap", plastic: 1000, sustainable: 1, sustainableItem: "Beeswax Wrap" },
]

const co2EmissionsData = [
  {
    category: "Water Bottles",
    plastic: 12.5,
    sustainable: 0.8,
    plasticItem: "365 Plastic Bottles/Year",
    sustainableItem: "1 Steel Bottle (5 years)",
  },
  {
    category: "Food Storage",
    plastic: 8.3,
    sustainable: 1.2,
    plasticItem: "500 Plastic Bags/Year",
    sustainableItem: "6 Silicone Bags (10 years)",
  },
  {
    category: "Straws",
    plastic: 2.1,
    sustainable: 0.1,
    plasticItem: "1000 Plastic Straws/Year",
    sustainableItem: "4 Steel Straws (Lifetime)",
  },
  {
    category: "Food Wrap",
    plastic: 5.7,
    sustainable: 0.9,
    plasticItem: "200m Plastic Wrap/Year",
    sustainableItem: "Beeswax Wraps (2 years)",
  },
]

const costOverTimeData = [
  { year: 0, plastic: 0, sustainable: 1899 },
  { year: 1, plastic: 3650, sustainable: 1899 },
  { year: 2, plastic: 7300, sustainable: 1899 },
  { year: 3, plastic: 10950, sustainable: 1899 },
  { year: 4, plastic: 14600, sustainable: 1899 },
  { year: 5, plastic: 18250, sustainable: 1899 },
]

const wasteGenerationData = [
  { month: "Jan", plastic: 30, sustainable: 0 },
  { month: "Feb", plastic: 60, sustainable: 0 },
  { month: "Mar", plastic: 90, sustainable: 0 },
  { month: "Apr", plastic: 120, sustainable: 0 },
  { month: "May", plastic: 150, sustainable: 0 },
  { month: "Jun", plastic: 180, sustainable: 0 },
  { month: "Jul", plastic: 210, sustainable: 0 },
  { month: "Aug", plastic: 240, sustainable: 0 },
  { month: "Sep", plastic: 270, sustainable: 0 },
  { month: "Oct", plastic: 300, sustainable: 0 },
  { month: "Nov", plastic: 330, sustainable: 0 },
  { month: "Dec", plastic: 365, sustainable: 0 },
]

const globalImpactData = [
  { name: "Recycled", value: 9, color: "#10B981" },
  { name: "Incinerated", value: 14, color: "#F59E0B" },
  { name: "Landfill/Ocean", value: 77, color: "#EF4444" },
]

const COLORS = {
  plastic: "#EF4444",
  sustainable: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
}

export function ImpactChartsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Plastic vs Sustainable: The Real Impact</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Visual comparison showing why sustainable alternatives make a massive difference for our planet
        </p>
      </div>

      <Tabs defaultValue="lifespan" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="lifespan">Lifespan</TabsTrigger>
          <TabsTrigger value="emissions">CO2 Emissions</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="waste">Waste Generation</TabsTrigger>
          <TabsTrigger value="global">Global Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="lifespan" className="space-y-6">
          <LifespanComparisonChart />
        </TabsContent>

        <TabsContent value="emissions" className="space-y-6">
          <CO2EmissionsChart />
        </TabsContent>

        <TabsContent value="cost" className="space-y-6">
          <CostAnalysisChart />
        </TabsContent>

        <TabsContent value="waste" className="space-y-6">
          <WasteGenerationChart />
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <GlobalImpactChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LifespanComparisonChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Product Lifespan Comparison (Years)
          </CardTitle>
          <CardDescription>How long plastic items vs sustainable alternatives last before disposal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifespanComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} years`,
                    name === "plastic" ? "Plastic Version" : "Sustainable Alternative",
                  ]}
                />
                <Legend />
                <Bar dataKey="plastic" fill={COLORS.plastic} name="Plastic Version" />
                <Bar dataKey="sustainable" fill={COLORS.sustainable} name="Sustainable Alternative" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <h4 className="font-semibold text-red-800">Plastic Problem</h4>
              </div>
              <p className="text-sm text-red-700">
                Plastic items are designed for single use but persist in the environment for decades or centuries,
                creating massive waste accumulation.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">Sustainable Solution</h4>
              </div>
              <p className="text-sm text-green-700">
                Sustainable alternatives are built to last years or decades, dramatically reducing the need for constant
                replacement and waste generation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Product Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lifespanComparison.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">{item.item}</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600">Plastic Version</span>
                    <span className="font-semibold">{item.plastic} years</span>
                  </div>
                  <Progress value={Math.min((item.plastic / 1000) * 100, 100)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600">{item.sustainableItem}</span>
                    <span className="font-semibold">
                      {item.sustainable === 999 ? "Lifetime" : `${item.sustainable} years`}
                    </span>
                  </div>
                  <Progress
                    value={item.sustainable === 999 ? 100 : Math.min((item.sustainable / 1000) * 100, 100)}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <strong>Impact:</strong> Sustainable option lasts{" "}
                {item.sustainable === 999 ? "forever" : `${Math.round(item.plastic / item.sustainable)}x longer`}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CO2EmissionsChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TreePine className="h-5 w-5 mr-2 text-green-600" />
            Annual CO2 Emissions Comparison (kg/year)
          </CardTitle>
          <CardDescription>Greenhouse gas emissions from plastic vs sustainable alternatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={co2EmissionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} kg CO2/year`,
                    name === "plastic" ? "Plastic Option" : "Sustainable Option",
                  ]}
                />
                <Legend />
                <Bar dataKey="plastic" fill={COLORS.plastic} name="Plastic Option" />
                <Bar dataKey="sustainable" fill={COLORS.sustainable} name="Sustainable Option" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-4">CO2 Savings Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {co2EmissionsData.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">{item.category}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600">{item.plasticItem}:</span>
                      <span className="font-semibold">{item.plastic} kg CO2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">{item.sustainableItem}:</span>
                      <span className="font-semibold">{item.sustainable} kg CO2</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-blue-600 font-medium">Annual Savings:</span>
                      <span className="font-bold text-blue-600">
                        {(item.plastic - item.sustainable).toFixed(1)} kg CO2
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CostAnalysisChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            5-Year Cost Comparison: Water Bottles (₹)
          </CardTitle>
          <CardDescription>Total cost over time: Buying plastic bottles vs one steel bottle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `₹${value.toLocaleString()}`,
                    name === "plastic" ? "Plastic Bottles" : "Steel Bottle",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="plastic"
                  stroke={COLORS.plastic}
                  strokeWidth={3}
                  name="Plastic Bottles (₹10 each)"
                />
                <Line
                  type="monotone"
                  dataKey="sustainable"
                  stroke={COLORS.sustainable}
                  strokeWidth={3}
                  name="Steel Bottle (₹1,899 once)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">₹18,250</div>
                <div className="text-sm text-red-700">5-year plastic bottle cost</div>
                <div className="text-xs text-red-600 mt-1">365 bottles × ₹10 × 5 years</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₹1,899</div>
                <div className="text-sm text-green-700">Steel bottle one-time cost</div>
                <div className="text-xs text-green-600 mt-1">Lasts 5+ years</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₹16,351</div>
                <div className="text-sm text-blue-700">Total savings in 5 years</div>
                <div className="text-xs text-blue-600 mt-1">90% cost reduction</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WasteGenerationChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trash2 className="h-5 w-5 mr-2 text-orange-600" />
            Annual Waste Generation: Plastic vs Sustainable
          </CardTitle>
          <CardDescription>Cumulative plastic bottles discarded throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteGenerationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} bottles`,
                    name === "plastic" ? "Plastic Bottles Discarded" : "Sustainable Bottles Discarded",
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="plastic"
                  stackId="1"
                  stroke={COLORS.plastic}
                  fill={COLORS.plastic}
                  fillOpacity={0.6}
                  name="Plastic Bottles Discarded"
                />
                <Area
                  type="monotone"
                  dataKey="sustainable"
                  stackId="2"
                  stroke={COLORS.sustainable}
                  fill={COLORS.sustainable}
                  fillOpacity={0.6}
                  name="Sustainable Bottles Discarded"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 bg-gradient-to-r from-red-50 to-green-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Plastic Bottle Impact
                </h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• 365 bottles discarded per year</li>
                  <li>• Each takes 450+ years to decompose</li>
                  <li>• Releases microplastics into environment</li>
                  <li>• Contributes to ocean pollution</li>
                  <li>• Harms marine life and ecosystems</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Recycle className="h-4 w-4 mr-2" />
                  Sustainable Alternative Impact
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• 0 bottles discarded per year</li>
                  <li>• One bottle lasts 5+ years</li>
                  <li>• Made from renewable materials</li>
                  <li>• Prevents 1,825+ plastic bottles over lifetime</li>
                  <li>• Protects marine ecosystems</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GlobalImpactChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Waves className="h-5 w-5 mr-2 text-blue-600" />
            Global Plastic Waste Fate
          </CardTitle>
          <CardDescription>What happens to plastic waste worldwide (% of total plastic produced)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalImpactData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {globalImpactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Global Plastic Crisis Facts</h4>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-red-800">77% Landfill/Ocean</div>
                    <div className="text-sm text-red-700">
                      Most plastic ends up polluting our environment, taking centuries to decompose
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-yellow-800">14% Incinerated</div>
                    <div className="text-sm text-yellow-700">
                      Burned for energy but releases harmful emissions into the atmosphere
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-green-800">9% Recycled</div>
                    <div className="text-sm text-green-700">
                      Only a small fraction gets properly recycled into new products
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Your Impact Matters</h5>
                <p className="text-sm text-blue-700">
                  By choosing sustainable alternatives, you're directly reducing the 77% that ends up polluting our
                  environment. Every sustainable choice prevents plastic from entering this harmful cycle.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* India-specific statistics */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Factory className="h-5 w-5 mr-2 text-orange-600" />
            India's Plastic Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3.4M</div>
              <div className="text-sm text-gray-600">Tons of plastic waste generated annually</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-red-600">40%</div>
              <div className="text-sm text-gray-600">Remains uncollected and pollutes environment</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">60%</div>
              <div className="text-sm text-gray-600">Gets recycled (better than global average!)</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">11kg</div>
              <div className="text-sm text-gray-600">Per person plastic consumption annually</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Good News:</strong> India has one of the world's highest plastic recycling rates! By choosing
              sustainable alternatives and supporting recycling, we can make it even better.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
