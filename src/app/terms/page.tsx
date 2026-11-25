import type { Metadata } from "next";
import LegalPage from "@/components/company/LegalPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { LEGAL } from "@/content/legal";

const page = LEGAL.terms;

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.summary,
  path: page.path,
});

export default function TermsPage() {
  return <LegalPage {...page} />;
}
