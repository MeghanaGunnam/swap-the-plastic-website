# Technology Stack & ML Models Used

## 🏗️ Frontend Framework
- **Next.js 15** - React-based framework for production apps
  - App Router for file-based routing
  - Server Components for optimal performance
  - API Routes for backend logic

- **React 19 RC** - UI library for building interactive interfaces
  - Hooks for state management
  - Components for modularity

## 🎨 Styling & UI Components
- **Tailwind CSS** - Utility-first CSS framework
  - Rapid UI development
  - Responsive design by default
  - Built-in dark mode support

- **shadcn/ui** - High-quality React components
  - Button, Input, Card, Dialog, etc.
  - Built on Radix UI primitives
  - Accessible and customizable

- **Radix UI** - Unstyled, accessible components
  - Dialog, Dropdown, Avatar, Select, Progress
  - Keyboard navigation support
  - ARIA attributes built-in

- **Lucide React** - Icon library
  - 400+ customizable SVG icons
  - Lightweight and tree-shakeable

## 📊 Data Visualization & Charts
- **Recharts** - Composable React charting library
  - Line, Bar, Pie, Area charts
  - Responsive and interactive
  - Used for: Impact tracking, environmental metrics

## 🤖 AI & Machine Learning

### AI for Search Ranking
- **AI SDK (Vercel)** - Unified API for AI models
  - Standardized interface across providers
  - Easy model switching
  
- **xAI (Grok-3)** - LLM for intelligent search reranking
  - API: https://console.x.ai/
  - Used for: Search result optimization
  - Why: Fast, accurate, and developer-friendly

### Client-Side ML (No External Dependencies)
We implemented lightweight ML models directly in JavaScript:

1. **SearchNLPModel** - Semantic search
   - Tokenization algorithm
   - Jaccard similarity for text comparison
   - Why: Privacy-first, instant results, no API calls

2. **SentimentAnalyzer** - Community post sentiment detection
   - Positive/negative word matching
   - Confidence scoring
   - Why: Real-time feedback, no latency

3. **RecommendationEngine** - Product recommendations
   - Collaborative filtering
   - Content-based similarity
   - Why: Personalized suggestions without external ML services

4. **ImpactCalculator** - Environmental impact metrics
   - Regression-based predictions
   - CO2, water, energy savings calculations
   - Why: Accurate, deterministic, privacy-preserving

### Optional: Computer Vision (TensorFlow.js)
- **TensorFlow.js** - Client-side ML in browser
- **MobileNet** - Pre-trained image classifier
- Used for: Plastic detection from photos (optional, gracefully falls back)
- Why: Privacy-first image analysis, no uploads to servers

## 📝 Form & Validation
- **React Hook Form** - Performant form state management
  - Minimal re-renders
  - Easy integration with UI components

- **Zod** - TypeScript-first schema validation
  - Type inference
  - Runtime validation
  - Better error messages

- **@hookform/resolvers** - Integration between React Hook Form and Zod

## 🌐 Utilities & Helpers
- **date-fns** - Date manipulation library
  - Parse, format, compare dates
  - Used for: Impact tracking timelines

- **clsx / tailwind-merge** - CSS class utilities
  - Conditional class names
  - Prevent Tailwind conflicts

- **class-variance-authority** - Variant-based styling
  - Type-safe component variants

## 🔧 Development Tools
- **TypeScript** - Static type checking
  - Better IDE support
  - Fewer runtime errors

- **Next.js built-in features**:
  - Hot Module Replacement (HMR)
  - Fast Refresh
  - Automatic code splitting

---

## 🧠 Why These ML Technologies?

### ✅ Why JavaScript-Based ML (Not Python/TensorFlow Server)?
1. **Privacy First** - All data stays on user's device
2. **No Server Costs** - No ML infrastructure needed
3. **Instant Feedback** - No API latency
4. **Works Offline** - Feature availability without internet
5. **Scalability** - Processing happens client-side

### ✅ Why xAI (Grok-3) for Search?
1. **Cost-Effective** - Pay per API call, no subscriptions
2. **Fast Inference** - Quick response times for search
3. **Good Quality** - Competitive with GPT-4 for ranking
4. **Developer-Friendly** - Easy integration via AI SDK
5. **Optional** - Gracefully degrades if API key not set

### ✅ Why Avoid Expensive ML?
- **LLaMA/GPT-4**: $0.01-0.15 per 1K tokens (adds up fast)
- **Custom Models**: Require GPU infrastructure (~$100+/month)
- **Our Approach**: $0 for client-side ML + minimal cost for optional AI

---

## 📈 Performance Metrics

| Technology | Bundle Size | Type |
|-----------|------------|------|
| React 19 | ~42KB | Framework |
| Tailwind CSS | ~35KB (optimized) | Styling |
| shadcn/ui | Per component | Components |
| Lucide Icons | ~2KB (tree-shaken) | Icons |
| TensorFlow.js | ~80KB (lazy loaded) | Optional ML |
| Total (optimized) | ~200-250KB | Gzipped |

---

## 🚀 Getting Started

\`\`\`bash
# 1. Clone/download project
# 2. Install dependencies
npm install

# 3. Set up XAI API key (optional)
echo "XAI_API_KEY=your_key" > .env.local

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
\`\`\`

### To Get XAI API Key:
1. Visit: https://console.x.ai/
2. Sign up (free account)
3. Create new API key
4. Add to `.env.local`: `XAI_API_KEY=your_key`
5. Restart dev server

---

## 📚 Architecture Summary

\`\`\`
┌─────────────────────────────────────────┐
│         Next.js 15 (App Router)         │
├─────────────────────────────────────────┤
│  Frontend (React 19 + Tailwind CSS)     │
│  ├─ UI Components (shadcn/ui)          │
│  ├─ Client-Side ML (JS pure)           │
│  └─ Charts (Recharts)                  │
├─────────────────────────────────────────┤
│  API Routes                             │
│  ├─ Search Rerank (xAI Grok-3)         │
│  └─ Data processing                    │
├─────────────────────────────────────────┤
│  Optional                               │
│  ├─ TensorFlow.js (image classification)
│  └─ Database integration                │
└─────────────────────────────────────────┘
\`\`\`

All technologies chosen for:
✅ Developer Experience
✅ Performance
✅ Cost Efficiency
✅ User Privacy
✅ Scalability
