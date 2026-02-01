"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, ServerCog, Rocket } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-muted-foreground">
          Install dependencies, run locally, and optionally enable provider reranking.
        </p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-muted-foreground" />
              1) Install
            </CardTitle>
            <CardDescription>Node 18+ recommended</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm">
              {`# in project root
pnpm install
# or
npm install
# or
yarn`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ServerCog className="h-5 w-5 text-muted-foreground" />
              2) Run locally
            </CardTitle>
            <CardDescription>Dev and production commands</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge variant="secondary">Development</Badge>
              <pre className="mt-2 rounded-md bg-muted p-4 text-sm">
                {`pnpm dev
# or npm run dev / yarn dev
# open http://localhost:3000`}
              </pre>
            </div>
            <div>
              <Badge variant="secondary">Production build</Badge>
              <pre className="mt-2 rounded-md bg-muted p-4 text-sm">
                {`pnpm build && pnpm start
# or npm run build && npm start
# or yarn build && yarn start`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-muted-foreground" />
              3) Optional: Enable provider reranking
            </CardTitle>
            <CardDescription>Use AI SDK with xAI provider for search rerank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Create an environment variable named XAI_API_KEY (Vercel Project Settings → Environment Variables or
                .env.local).
              </li>
              <li>Restart the dev server or redeploy on Vercel.</li>
              <li>
                In the Search page, toggle “Improve ranking with AI” to call the server route at /api/search-rerank.
              </li>
            </ol>
            <p className="text-muted-foreground">
              The server route uses the AI SDK’s generateText with xai("grok-3") to produce an ordering of results. The
              client never imports provider SDKs directly; it only fetches the route. This keeps your app
              provider-agnostic and easy to swap models later.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
