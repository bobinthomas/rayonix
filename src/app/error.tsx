"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#080f12] text-[#f5f6f6] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-[480px] bg-[#10181c] border border-[#253035] rounded-[4px] p-8 flex flex-col gap-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#e22328]">
          System Notice
        </p>
        <h1 className="type-h3 text-[#f5f6f6]">Something went wrong</h1>
        <p className="type-body text-[#bdc4c8]">
          An unexpected error occurred while loading this page. Please try again or return to the homepage.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-[#e22328] hover:bg-[#b81b20] text-white text-[14px] font-medium px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#253035] hover:border-[#7f8a91] text-[#f5f6f6] text-[14px] font-medium px-5 py-2.5 rounded-[4px] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
