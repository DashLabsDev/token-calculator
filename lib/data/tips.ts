export const tokenTips = [
  {
    title: "Be painfully specific",
    body: "Short prompts are not always better, but vague prompts are almost always more expensive because they trigger follow-up questions, retries, and longer answers. Ask for exactly the format, tone, and output length you want the first time.",
  },
  {
    title: "Trim your system prompt",
    body: "Most teams carry way too much permanent context into every call. Keep the core instructions, remove repetition, and move long examples into optional retrieval only when they are actually needed.",
  },
  {
    title: "Use the cheap model first",
    body: "Route summarization, tagging, classification, and cleanup tasks to mini or flash models. Save premium reasoning models for hard edge cases, not every request that hits your API.",
  },
  {
    title: "Cap the answer length",
    body: "If you only need five bullets, ask for five bullets. Output tokens are often the biggest cost driver in production, especially for chat apps where the model loves to over-explain.",
  },
  {
    title: "Cache repeated context",
    body: "If the same docs, codebase instructions, or policy text gets sent over and over, use prompt caching or store that context elsewhere. Re-sending the same 20,000 tokens on every call burns money for no benefit.",
  },
  {
    title: "Batch background jobs",
    body: "Nightly enrichment, cleanup, labeling, and report generation usually do not need real-time latency. Batch APIs and async jobs can cut token cost dramatically when speed is not the main constraint.",
  },
  {
    title: "Chunk long documents intelligently",
    body: "Do not throw a 200-page document at a model if the user only asked about one section. Split content by headings or semantic boundaries, then retrieve just the chunk that matters.",
  },
  {
    title: "Measure before you optimize",
    body: "Track prompt length, response length, retries, and model choice by endpoint. Once you know which flows burn the most tokens, the savings opportunities get obvious fast.",
  },
];
