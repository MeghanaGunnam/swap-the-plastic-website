export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SwapThePlastic</h1>
          <p className="text-xl text-gray-600">
            Our mission to create a plastic-free future through community action and sustainable alternatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              SwapThePlastic is dedicated to reducing plastic waste by connecting people with local recyclers and
              sustainable alternatives. We believe that small actions, when multiplied by millions of people, can
              transform the world.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where plastic pollution is eliminated through community-driven initiatives, innovative
              recycling solutions, and widespread adoption of sustainable alternatives.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why It Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">8 Million</div>
              <p className="text-gray-600">Tons of plastic enter oceans annually</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">400 Years</div>
              <p className="text-gray-600">Time for plastic to decompose</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">91%</div>
              <p className="text-gray-600">Of plastic is not recycled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
