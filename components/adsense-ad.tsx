"use client";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

import { useEffect } from "react";

export function AdSenseAd({ slot, format = "auto", className = "" }: { slot: string; format?: string; className?: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={`rounded-3xl border border-dashed border-white/10 bg-white/5 p-3 ${className}`}>
      <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">Sponsored</div>
      <ins
        className="adsbygoogle block min-h-[90px] w-full overflow-hidden rounded-2xl"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
