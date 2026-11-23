import type { ReactNode } from "react";

// Re-mounts on every route change in the App Router, so each page fades in gently.
// The header and footer live in layout.tsx and do not re-animate. Motion is disabled
// for users who prefer reduced motion (see globals.css).
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
