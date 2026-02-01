import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Swap the Plastic</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Make simple, lasting swaps to reduce plastic waste in your daily life.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/impact">Start Tracking Impact</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/alternatives">Explore Alternatives</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="font-semibold text-gray-900">Track Your Progress</h3>
            <p className="mt-2 text-sm text-gray-600">Set goals, log your swaps, and see your impact grow over time.</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="font-semibold text-gray-900">Find Better Options</h3>
            <p className="mt-2 text-sm text-gray-600">Discover durable, reusable alternatives for everyday items.</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="font-semibold text-gray-900">Join the Community</h3>
            <p className="mt-2 text-sm text-gray-600">Participate in challenges, share tips, and learn from others.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
