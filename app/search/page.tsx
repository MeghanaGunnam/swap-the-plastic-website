"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Item = {
  id: number
  title: string
  description: string
  category?: string
  tags?: string[]
}

const SAMPLE_ITEMS: Item[] = [
  {
    id: 1,
    title: "Community Beach Cleanup",
    description: "Weekly plastic collection at Sunrise Beach",
    category: "event",
    tags: ["cleanup", "beach", "plastic"],
  },
  {
    id: 2,
    title: "HDPE Bottle Recycler - GreenCycle",
    description: "Drop-off point for HDPE (2) plastics",
    category: "recycler",
    tags: ["hdpe", "bottles", "recycling"],
  },
  {
    id: 3,
    title: "Reusable Bottle (Steel)",
    description: "Alternative to single-use PET bottles",
    category: "alternative",
    tags: ["pet", "bottle", "reusable"],
  },
  {
    id: 4,
    title: "City Park Litter Hotspot",
    description: "Reported plastic waste near the south gate",
    category: "report",
    tags: ["waste", "park", "cleanup"],
  },
]

function baselineRank(query: string, items: Item[]) {
  const q = query.toLowerCase().trim()
  if (!q) return items.map((it, i) => ({ index: i, score: 0 }))
  // Simple scoring: term occurrences in title/description/tags
  return items
    .map((it, i) => {
      const hay = `${it.title} ${it.description} ${(it.tags ?? []).join(" ")}`.toLowerCase()
      const score = q.split(/\s+/).reduce((acc, term) => acc + (hay.includes(term) ? 1 : 0), 0)
      return { index: i, score }
    })
    .sort((a, b) => b.score - a.score)
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [useAI, setUseAI] = useState(false)
  const [results, setResults] = useState<Item[]>(SAMPLE_ITEMS)
  const [order, setOrder] = useState<number[]>(results.map((_, i) => i))
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)

  useEffect(() => {
    // initial baseline
    const ranked = baselineRank(query, results)
    setOrder(ranked.map((r) => r.index))
  }, []) // eslint-disable-line

  const orderedResults = useMemo(() => order.map((i) => results[i]), [order, results])

  async function runSearch() {
    setWarning(null)
    const baseline = baselineRank(query, results).map((r) => r.index)
    setOrder(baseline)

    if (!useAI) return

    setLoading(true)
    try {
      const payload = {
        query,
        results: results.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          category: r.category,
          tags: r.tags ?? [],
        })),
      }

      const res = await fetch("/api/search-rerank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setWarning(data.error || "AI rerank unavailable. Showing baseline results.")
        setOrder(baseline)
        return
      }

      const data = (await res.json()) as { rerankedOrder: number[] }
      // data.rerankedOrder is 0-based indices
      setOrder(data.rerankedOrder)
    } catch {
      setWarning("Failed to contact rerank service. Showing baseline results.")
      setOrder(baseline)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Smart Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Search for recyclers, alternatives, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
            />
            <div className="flex items-center gap-2">
              <Switch id="ai" checked={useAI} onCheckedChange={setUseAI} />
              <Label htmlFor="ai">Improve ranking with AI</Label>
            </div>
            <Button onClick={runSearch} disabled={loading}>
              {loading ? "Reranking…" : "Search"}
            </Button>
          </div>

          {warning && <p className="text-sm text-amber-700">{warning}</p>}

          <ul className="grid gap-3 sm:grid-cols-2">
            {orderedResults.map((it) => (
              <li key={it.id} className="rounded border p-4">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-muted-foreground">{it.description}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
