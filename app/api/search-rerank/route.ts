import { NextResponse } from "next/server"

type SearchResult = {
  id: string
  title: string
  description?: string
  category?: string
}

export async function POST(request: Request) {
  try {
    const { query, results } = (await request.json()) as {
      query: string
      results: SearchResult[]
    }

    if (!query || !Array.isArray(results) || results.length === 0) {
      return NextResponse.json({ error: "Invalid request: missing query or results" }, { status: 400 })
    }

    // Check if XAI API key exists
    const apiKey = process.env.XAI_API_KEY
    if (!apiKey) {
      // Fallback: return results in original order
      console.info("XAI_API_KEY not set. Using original order.")
      return NextResponse.json({
        reranked: results,
        message: "AI reranking disabled. Set XAI_API_KEY in .env.local to enable.",
      })
    }

    try {
      // Dynamically import AI SDK modules
      const { generateText } = await import("ai")
      const { xai } = await import("@ai-sdk/xai")

      const resultsText = results
        .map(
          (r, i) =>
            `${i + 1}. Title: "${r.title}"\n   Description: "${r.description || "N/A"}"\n   Category: ${r.category || "General"}`,
        )
        .join("\n\n")

      const prompt = `You are a search ranking expert. Given a user search query and a list of results, rerank them by relevance (most relevant first).

User Query: "${query}"

Results to rank:
${resultsText}

Respond with ONLY a JSON array of result numbers in order of relevance (1-indexed). 
Example: [2, 1, 3]
No explanation, no other text. Just the JSON array.`

      const { text } = await generateText({
        model: xai("grok-3"),
        prompt,
        temperature: 0.2,
        maxTokens: 50,
      })

      // Parse the response
      let ranking: number[] = []
      try {
        const match = text.trim().match(/\[[\s\S]*\]/)
        ranking = JSON.parse(match ? match[0] : text.trim())
      } catch {
        console.warn("Failed to parse AI ranking, using original order")
        ranking = Array.from({ length: results.length }, (_, i) => i + 1)
      }

      // Convert to 0-indexed and reorder results
      const reranked = ranking
        .map((idx) => results[idx - 1])
        .filter(Boolean)
        .concat(results.filter((r) => !reranked.includes(r)))

      return NextResponse.json({
        reranked,
        message: "Successfully reranked with AI",
      })
    } catch (aiError) {
      console.error("AI reranking failed:", aiError)
      // Graceful fallback
      return NextResponse.json({
        reranked: results,
        message: "AI reranking failed. Returning original order.",
      })
    }
  } catch (error) {
    console.error("Route handler error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
