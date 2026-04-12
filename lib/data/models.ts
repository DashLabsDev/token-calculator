export type ModelPricing = {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  cachedInputPerMillion?: number;
  contextWindow: string;
  description: string;
  source: string;
};

export const modelPricing: ModelPricing[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", inputPerMillion: 5, outputPerMillion: 15, cachedInputPerMillion: 2.5, contextWindow: "128K", description: "Multimodal flagship for live apps and production chat.", source: "OpenAI pricing references and 2026 market comparisons" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", inputPerMillion: 0.15, outputPerMillion: 0.6, cachedInputPerMillion: 0.075, contextWindow: "128K", description: "Fast, cheap general-purpose model for high-volume workloads.", source: "OpenAI pricing references and 2026 market comparisons" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", inputPerMillion: 2, outputPerMillion: 8, cachedInputPerMillion: 0.2, contextWindow: "1M", description: "Long-context model for codebases, documents, and agents.", source: "TLDL April 2026, sourced from OpenAI pricing" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 mini", provider: "OpenAI", inputPerMillion: 0.4, outputPerMillion: 1.6, cachedInputPerMillion: 0.04, contextWindow: "1M", description: "Budget long-context pick for extraction and automation.", source: "TLDL April 2026, sourced from OpenAI pricing" },
  { id: "gpt-4.1-nano", name: "GPT-4.1 nano", provider: "OpenAI", inputPerMillion: 0.1, outputPerMillion: 0.4, cachedInputPerMillion: 0.01, contextWindow: "1M", description: "Cheapest long-context OpenAI option.", source: "TLDL April 2026, sourced from OpenAI pricing" },
  { id: "o3", name: "o3", provider: "OpenAI", inputPerMillion: 2, outputPerMillion: 8, cachedInputPerMillion: 1, contextWindow: "200K", description: "Reasoning-heavy model for hard logic and code tasks.", source: "TLDL April 2026, sourced from OpenAI pricing" },
  { id: "o3-mini", name: "o3 mini", provider: "OpenAI", inputPerMillion: 1.1, outputPerMillion: 4.4, cachedInputPerMillion: 0.275, contextWindow: "200K", description: "Strong value reasoning option for planning and debugging.", source: "2026 public OpenAI pricing comparisons" },
  { id: "o4-mini", name: "o4 mini", provider: "OpenAI", inputPerMillion: 1.1, outputPerMillion: 4.4, cachedInputPerMillion: 0.275, contextWindow: "200K", description: "Fast reasoning tier with better economics than frontier models.", source: "TLDL April 2026, sourced from OpenAI pricing" },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", inputPerMillion: 1.25, outputPerMillion: 10, cachedInputPerMillion: 0.125, contextWindow: "128K", description: "General flagship for balanced quality and price.", source: "2026 public OpenAI pricing comparisons" },
  { id: "gpt-5-mini", name: "GPT-5 mini", provider: "OpenAI", inputPerMillion: 0.25, outputPerMillion: 2, cachedInputPerMillion: 0.025, contextWindow: "200K", description: "Affordable GPT-5-family model for shipping features fast.", source: "2026 public OpenAI pricing comparisons" },

  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", inputPerMillion: 3, outputPerMillion: 15, cachedInputPerMillion: 0.3, contextWindow: "200K", description: "Reliable coding and analysis model with strong instruction following.", source: "Anthropic official pricing" },
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic", inputPerMillion: 15, outputPerMillion: 75, cachedInputPerMillion: 1.5, contextWindow: "200K", description: "Premium reasoning and research model.", source: "Anthropic official pricing" },
  { id: "claude-haiku-3.5", name: "Claude Haiku 3.5", provider: "Anthropic", inputPerMillion: 0.8, outputPerMillion: 4, cachedInputPerMillion: 0.08, contextWindow: "200K", description: "Fast low-cost Claude for routing, extraction, and chat.", source: "Anthropic official pricing" },
  { id: "claude-sonnet-3.5", name: "Claude Sonnet 3.5", provider: "Anthropic", inputPerMillion: 3, outputPerMillion: 15, cachedInputPerMillion: 0.3, contextWindow: "200K", description: "Older but still capable balanced Claude tier.", source: "Anthropic historical pricing parity with Sonnet 4" },

  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", inputPerMillion: 1.25, outputPerMillion: 10, cachedInputPerMillion: 0.125, contextWindow: "2M", description: "Best fit for huge documents and multimodal workflows.", source: "Google Gemini pricing and TLDL April 2026" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", inputPerMillion: 0.3, outputPerMillion: 2.5, cachedInputPerMillion: 0.03, contextWindow: "1M", description: "Fast general-purpose Gemini option for product features.", source: "Google Gemini pricing and TLDL April 2026" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", inputPerMillion: 0.1, outputPerMillion: 0.4, cachedInputPerMillion: 0.025, contextWindow: "1M", description: "Cheap proven choice for classification, summarization, and chat.", source: "Google Gemini pricing and TLDL April 2026" },

  { id: "llama-4-scout", name: "Llama 4 Scout", provider: "Meta", inputPerMillion: 0.08, outputPerMillion: 0.3, contextWindow: "10M", description: "Open model with huge context and low cost on API hosts.", source: "2026 public provider pricing comparisons for hosted Llama 4" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", inputPerMillion: 0.15, outputPerMillion: 0.6, contextWindow: "1M", description: "Stronger Llama 4 hosted tier for more demanding tasks.", source: "2026 public provider pricing comparisons for hosted Llama 4" },

  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", inputPerMillion: 0.5, outputPerMillion: 1.5, contextWindow: "128K", description: "Affordable stronger model for EU-friendly production workloads.", source: "2026 public Mistral pricing comparisons" },
  { id: "mistral-small", name: "Mistral Small", provider: "Mistral", inputPerMillion: 0.1, outputPerMillion: 0.3, contextWindow: "128K", description: "Very cheap Mistral tier for bulk inference and automation.", source: "2026 public Mistral pricing comparisons" },

  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", inputPerMillion: 0.28, outputPerMillion: 0.42, cachedInputPerMillion: 0.028, contextWindow: "128K", description: "Best-value model for extraction, summarization, and app backends.", source: "DeepSeek official pricing" },
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", inputPerMillion: 0.55, outputPerMillion: 2.19, cachedInputPerMillion: 0.14, contextWindow: "128K", description: "Reasoning-focused DeepSeek tier that stays much cheaper than premium rivals.", source: "2026 public DeepSeek pricing comparisons" },

  { id: "grok-3", name: "Grok 3", provider: "xAI", inputPerMillion: 3, outputPerMillion: 15, contextWindow: "1M", description: "Higher-end xAI tier for heavier reasoning and assistant work.", source: "2026 public xAI pricing comparisons" },
  { id: "grok-3-mini", name: "Grok 3 Mini", provider: "xAI", inputPerMillion: 0.3, outputPerMillion: 0.5, contextWindow: "1M", description: "Cheap xAI model for fast replies and lightweight reasoning.", source: "2026 public xAI pricing comparisons" }
];

export const defaultModel = modelPricing[0];
