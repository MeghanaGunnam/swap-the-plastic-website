"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Box, Code2, Gauge, Layers, type LucideIcon, PanelsTopLeft, Sparkles, Wand2 } from "lucide-react"

type Row = { label: string; items: string[]; icon?: LucideIcon }

const sections: Row[] = [
  {
    label: "Core",
    items: ["Next.js 14 (App Router)", "React 19", "TypeScript"],
    icon: PanelsTopLeft,
  },
  {
    label: "Styling & UI",
    items: [
      "Tailwind CSS",
      "shadcn/ui (Radix primitives)",
      "lucide-react (icons)",
      "geist (font)",
      "tailwindcss-animate",
    ],
    icon: Layers,
  },
  {
    label: "Forms & Validation",
    items: ["react-hook-form", "zod", "@hookform/resolvers"],
    icon: Code2,
  },
  {
    label: "Data Viz & UX",
    items: ["recharts", "embla-carousel-react", "react-resizable-panels", "sonner (toasts)"],
    icon: Gauge,
  },
  {
    label: "Dates & Inputs",
    items: ["date-fns", "react-day-picker", "input-otp"],
    icon: Box,
  },
  {
    label: "State & Utilities",
    items: ["clsx", "tailwind-merge", "class-variance-authority"],
    icon: Layers,
  },
  {
    label: "AI & Models",
    items: [
      "AI SDK (ai) for provider calls",
      "xAI provider (@ai-sdk/xai) for reranking (Grok-3)",
      "TensorFlow.js (@tensorflow/tfjs) for on-device inference",
      "@tensorflow-models/mobilenet for image features/classification",
    ],
    icon: Sparkles,
  },
  {
    label: "Other",
    items: ["@vercel/analytics", "next-themes"],
    icon: Wand2,
  },
]

export default function TechPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Technologies Used</h1>
        <p className="mt-2 text-muted-foreground">
          A concise overview of the frameworks, libraries, and models used in this project.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map(({ label, items, icon: Icon }, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {Icon ? <Icon className="h-5 w-5 text-muted-foreground" /> : null}
                {label}
              </CardTitle>
              <CardDescription>Key packages and tools</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {items.map((it) => (
                <Badge key={it} variant="secondary">
                  {it}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-10" />

      <Card>
        <CardHeader>
          <CardTitle>Models and Techniques (where and why)</CardTitle>
          <CardDescription>Clear mapping of intelligence in the codebase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Provider reranking (LLM)</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>Model: xAI Grok-3 via AI SDK</li>
              <li>Where: app/api/search-rerank/route.ts (server-only)</li>
              <li>Why: Optionally improves search result ordering with a provider model. Toggle on/off in UI.</li>
              <li>Notes: Requires XAI_API_KEY. Client never imports provider SDKs directly.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">On-device vision (DL)</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>Models: TensorFlow.js + MobileNet</li>
              <li>Where: used for local classification/feature extraction in image flows</li>
              <li>Why: Privacy-first and fast, no image leaves the browser.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Semantic ranking (NLP)</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>Technique: heuristic/cosine-like scoring across title/description/tags for baseline relevance</li>
              <li>Where: client search logic</li>
              <li>Why: Works offline and provides instant results; provider rerank is optional.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Predictive impact (Analytics)</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>Technique: simple, explainable compound growth projection</li>
              <li>Where: impact predictor component</li>
              <li>Why: Transparent estimates without heavy infra.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
