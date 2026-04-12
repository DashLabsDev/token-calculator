"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Lock, Mail, Sparkles } from "lucide-react";

import { AdSenseAd } from "@/components/adsense-ad";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tokenExamples } from "@/lib/data/examples";
import { defaultModel, modelPricing } from "@/lib/data/models";
import { tokenTips } from "@/lib/data/tips";
import { estimateTokens, formatCurrency } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Token Cost Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate AI token costs, estimate token counts, and compare LLM pricing across OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and xAI.",
  url: "https://aitokencostcalculator.com",
};

export default function HomePage() {
  const [selectedModelId, setSelectedModelId] = useState(defaultModel.id);
  const [inputTokens, setInputTokens] = useState(2500);
  const [outputTokens, setOutputTokens] = useState(750);
  const [calculated, setCalculated] = useState(false);
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);
  const [textSample, setTextSample] = useState("Build me a pricing calculator that compares GPT-4.1, Claude Sonnet 4, Gemini 2.5 Flash, and Grok 3 Mini. Keep the layout clean and mobile-first.");

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("token-calculator-email");
    if (storedEmail) {
      setSavedEmail(storedEmail);
      setEmail(storedEmail);
    }
  }, []);

  const selectedModel = useMemo(
    () => modelPricing.find((model) => model.id === selectedModelId) ?? defaultModel,
    [selectedModelId]
  );

  const estimatedCount = useMemo(() => estimateTokens(textSample), [textSample]);
  const totalCost = useMemo(() => {
    const inputCost = (inputTokens / 1_000_000) * selectedModel.inputPerMillion;
    const outputCost = (outputTokens / 1_000_000) * selectedModel.outputPerMillion;
    return inputCost + outputCost;
  }, [inputTokens, outputTokens, selectedModel]);

  const monthlyCost = totalCost * 30 * 100;

  const unlockResults = () => {
    if (!email || !email.includes("@")) return;
    window.localStorage.setItem("token-calculator-email", email);
    setSavedEmail(email);
    setShowGate(false);
  };

  const runCalculation = () => {
    setCalculated(true);
    if (!savedEmail) setShowGate(true);
  };

  const copyEstimateToInput = () => setInputTokens(estimatedCount);

  return (
    <main className="glass-grid min-h-screen">
      <Script id="token-calculator-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/6 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-cyan-200 uppercase">
              <Sparkles className="h-3.5 w-3.5" /> AI pricing, without the guesswork
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">AI Token Cost Calculator</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Estimate what your prompts and responses cost across 25 popular AI models before you ship the feature and discover it was expensive for no good reason.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <AdSenseAd slot="1000000001" className="mb-8" />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                <BadgeDollarSign className="h-3.5 w-3.5" /> Main calculator
              </div>
              <CardTitle>What will this AI request cost?</CardTitle>
              <CardDescription>
                Pick a model, enter roughly how much text you send in and how much text you expect back, then we will estimate the cost per request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label>Choose an AI model</Label>
                  <Select value={selectedModelId} onValueChange={setSelectedModelId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelPricing.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.provider} · {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputTokens">How much text are you sending to the AI?</Label>
                  <Input id="inputTokens" type="number" min={0} value={inputTokens} onChange={(e) => setInputTokens(Number(e.target.value) || 0)} />
                  <p className="text-xs leading-5 text-slate-400">This is your prompt, instructions, pasted docs, chat history, or code you include in the request.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outputTokens">How much text do you want back?</Label>
                  <Input id="outputTokens" type="number" min={0} value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value) || 0)} />
                  <p className="text-xs leading-5 text-slate-400">This is the model's answer, summary, code output, or whatever response you expect it to generate.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={runCalculation}>Calculate cost <ArrowRight className="h-4 w-4" /></Button>
                <div className="text-sm text-slate-400">Reference pricing source: {selectedModel.source}</div>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
                <div className={!savedEmail && calculated ? "blur-md select-none" : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Estimated cost per request</p>
                      <p className="mt-2 text-4xl font-semibold text-white">{formatCurrency(totalCost)}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right text-xs text-cyan-100">
                      <div>{selectedModel.name}</div>
                      <div>{selectedModel.contextWindow} context</div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Input cost</p>
                      <p className="mt-2 text-lg font-semibold text-white">{formatCurrency((inputTokens / 1_000_000) * selectedModel.inputPerMillion)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Output cost</p>
                      <p className="mt-2 text-lg font-semibold text-white">{formatCurrency((outputTokens / 1_000_000) * selectedModel.outputPerMillion)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly at 100 runs/day</p>
                      <p className="mt-2 text-lg font-semibold text-white">{formatCurrency(monthlyCost)}</p>
                    </div>
                  </div>
                </div>

                {!savedEmail && calculated ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/45 p-4">
                    <div className="max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 p-6 text-center shadow-2xl shadow-cyan-950/20 backdrop-blur">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                        <Lock className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Unlock your exact result</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">You already did the work. Drop your email and we’ll reveal the full pricing breakdown instantly.</p>
                      <Button className="mt-5" variant="secondary" onClick={() => setShowGate(true)}>
                        Reveal my result
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why builders use this</CardTitle>
                <CardDescription>Useful before pricing a SaaS feature, estimating a chatbot bill, or choosing between premium and cheap models.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Compare 25 real model price points in one place",
                  "See per-request cost before you push to prod",
                  "Use the token counter when you do not know the token count yet",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <AdSenseAd slot="1000000002" />

            <Card>
              <CardHeader>
                <CardTitle>{selectedModel.name}</CardTitle>
                <CardDescription>{selectedModel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Input price</span><span>${selectedModel.inputPerMillion}/1M</span></div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Output price</span><span>${selectedModel.outputPerMillion}/1M</span></div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Cached input</span><span>{selectedModel.cachedInputPerMillion ? `$${selectedModel.cachedInputPerMillion}/1M` : "n/a"}</span></div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Context window</span><span>{selectedModel.contextWindow}</span></div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Token counter</CardTitle>
              <CardDescription>Paste a prompt, AI reply, article, or code snippet. We estimate the token count so you can use it in the cost calculator above.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={textSample} onChange={(e) => setTextSample(e.target.value)} placeholder="Paste text here..." />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estimated tokens</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{estimatedCount.toLocaleString()}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quick heuristic</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">We use a practical estimate based on roughly 4 characters per token, adjusted slightly by word count for more believable results.</p>
                </div>
              </div>
              <Button variant="secondary" onClick={copyEstimateToInput}>Use this as my input token count</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-world token examples</CardTitle>
              <CardDescription>These rough examples help non-technical users understand how fast token usage can climb.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokenExamples.map((example) => (
                  <div key={example.title} className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1.2fr_0.4fr_0.4fr] sm:items-center">
                    <div>
                      <p className="font-medium text-white">{example.title}</p>
                      <p className="text-sm text-slate-400">{example.description}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sent in</p>
                      <p className="text-sm font-semibold text-slate-200">~{example.inputTokens} tokens</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Got back</p>
                      <p className="text-sm font-semibold text-slate-200">~{example.outputTokens} tokens</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle>How to reduce AI token usage without hurting quality</CardTitle>
              <CardDescription>These are the boring habits that usually save the most money.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {tokenTips.map((tip) => (
                <div key={tip.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold text-white">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{tip.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="space-y-6">
            <AdSenseAd slot="1000000003" />
            <Card>
              <CardHeader>
                <CardTitle>Email unlock</CardTitle>
                <CardDescription>Stored in localStorage for now so returning users do not hit the gate again.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  <span>{savedEmail ?? "No email saved yet"}</span>
                </div>
                <p>This is intentionally simple. Swap in your backend later and keep the same conversion flow.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-slate-400">
          Pricing is a best-effort April 2026 reference using official provider docs where available and public hosted-model comparisons where provider docs are incomplete.
        </footer>
      </div>

      <Dialog open={showGate} onOpenChange={setShowGate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock your calculator result</DialogTitle>
            <DialogDescription>
              Enter your email and we’ll reveal the exact model cost instantly. For now, this is stored locally in your browser only.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <Button onClick={unlockResults} className="w-full">Unlock result</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
