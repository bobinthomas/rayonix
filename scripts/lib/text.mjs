/**
 * Shared text helpers for the content import scripts.
 *
 * Site rule (client, Nov 2026): hero titles/subtitles and button labels are
 * sentence case. Acronyms stay upper case and brand spellings keep their
 * casing. Keys are matched case-insensitively; add new acronyms here.
 */
export const KEEP_CASE = Object.fromEntries(
  [
    // Sensors / tech
    "DAS", "GPR", "RF", "GNSS", "UAS", "UAV", "UAVs", "UGV", "UGVs", "AI", "2D", "3D", "4K",
    "EO", "IR", "MWIR", "VIS", "FPV", "C2", "C2I", "C3I", "SPIE", "IP65", "IP67",
    "CCTV", "ANPR", "IoT", "HD", "IED", "QRF",
    // Rayonix solutions / brands
    "ICCS", "GMTS", "SROP", "SDRR", "SEEKER", "AIBOX", "XOS", "DMS", "XTEND",
    "LiDAR", "MeduzaX", "TPiCore®",
  ].map((w) => [w.toLowerCase(), w])
);

export function sentenceCase(text) {
  let sentenceStart = true;
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token)) return token;
      // Handle hyphen / slash compounds part by part (GNSS-Based, 2D/3D, Real-Time).
      const out = token
        .split(/([-/–])/)
        .map((part, i) => {
          if (/^[-/–]$/.test(part)) return part;
          const m = part.match(/^([^A-Za-z0-9]*)([A-Za-z0-9®]+)(.*)$/);
          if (!m) return part;
          const [, pre, word, post] = m;
          const keep = KEEP_CASE[word.toLowerCase()];
          let w = keep ?? word.toLowerCase();
          if (!keep && sentenceStart && i === 0) w = w.charAt(0).toUpperCase() + w.slice(1);
          return pre + w + post;
        })
        .join("");
      sentenceStart = /[.!?]$/.test(token);
      return out;
    })
    .join("");
}

/** Fetch one tab of a public Google Doc as plain text. */
export async function fetchDocTab(docId, tab) {
  const url = `https://docs.google.com/document/d/${docId}/export?format=txt&tab=${tab}`;
  const res = await fetch(url, { redirect: "follow" });
  const type = res.headers.get("content-type") || "";
  if (!res.ok || !type.startsWith("text/plain")) {
    throw new Error(`Could not export ${docId} ${tab} (HTTP ${res.status}, ${type}). Is the doc shared publicly?`);
  }
  return res.text();
}
