# Setup & Installation Guide

## What Changed

### ✅ Fixed in `lib/ml-models.ts`
1. **Removed duplicate `cosineSimilarity` method** - now shared utility function
2. **Fixed async/await issues** - removed await from non-async contexts
3. **Added "use client" directive** - proper client-side marker
4. **Improved type safety** - added explicit return types and parameters
5. **Better error handling** - graceful TensorFlow fallback
6. **Added JSDoc comments** - clear documentation for each class/method
7. **Fixed string parsing** - better punctuation removal in sentiment analyzer
8. **Extracted utility functions** - `cosineSimilarity`, `hashCode`, `generateDeterministicEmbedding`

### ✅ Components/UI - No Changes Needed
All required shadcn/ui components are already installed:
- ✓ Badge
- ✓ Card (with CardContent, CardDescription, CardHeader, CardTitle)
- ✓ Separator
- ✓ Button
- ✓ Input
- ✓ All other UI primitives

These came with your initial setup and are ready to use.

## Steps to Run

### 1. Install Dependencies
\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
\`\`\`

### 2. Environment Setup (Optional - for AI reranking)
Create `.env.local` in your project root:
\`\`\`env
# Only needed if you want AI-powered search reranking
XAI_API_KEY=your_xai_api_key_here
\`\`\`

If not set, the app gracefully falls back to semantic search without LLM reranking.

### 3. Development Server
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

Visit `http://localhost:3000`

### 4. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

## Verification Checklist

After setup, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] `/search` page loads and semantic search works
- [ ] `/impact` page displays impact tracking
- [ ] `/community` page shows community feed
- [ ] `/report` page loads report form
- [ ] Check browser console for no red errors

## Common Issues & Fixes

### Issue: "Module not found: @tensorflow/tfjs"
**Fix**: TensorFlow is optional. The app will work without it.
\`\`\`bash
npm install @tensorflow/tfjs @tensorflow-models/mobilenet --save-optional
\`\`\`

### Issue: "XAI_API_KEY is not defined"
**Fix**: This is optional. Remove the key or leave it unset to use semantic search only.

### Issue: "Error in ml-models.ts on import"
**Fix**: Make sure `lib/ml-models.ts` has `"use client"` at the top (now included).

### Issue: TypeScript errors
**Fix**: Run `npm run build` to check for type issues:
\`\`\`bash
npm run build
\`\`\`

## File Structure After Fix

\`\`\`
your-project/
├── lib/
│   └── ml-models.ts          ← FIXED (no duplicate methods, proper async)
├── components/
│   └── ui/                   ← Already complete
├── app/
│   ├── page.tsx
│   ├── search/page.tsx
│   ├── impact/page.tsx
│   ├── community/page.tsx
│   ├── report/page.tsx
│   ├── api/
│   │   └── search-rerank/route.ts
│   └── ...other pages
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
\`\`\`

## Next Steps

1. **Test the app**: `npm run dev`
2. **Add XAI key** (optional): Update `.env.local` for AI reranking
3. **Deploy**: Use Vercel, Netlify, or your preferred host
4. **Customize models**: Edit `lib/ml-models.ts` for your needs

## Support

If you hit issues:
1. Check the browser console for errors
2. Run `npm run build` to catch type errors
3. Verify `.env.local` is set correctly
4. Clear `.next` folder: `rm -rf .next && npm run dev`
