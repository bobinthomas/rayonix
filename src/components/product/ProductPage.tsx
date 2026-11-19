import type { ProductPageContent } from "@/content/products/types";
import ProductHero from "./ProductHero";
import ProductCapabilities from "./ProductCapabilities";
import ProductUseCases from "./ProductUseCases";
import { buildProductJsonLd } from "./productSeo";

/**
 * Product / capability page template (GPR design).
 * Hero → capability tabs (+ technical repository) → use cases carousel.
 */
export default function ProductPage({ content }: { content: ProductPageContent }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(content)) }}
      />
      <main className="relative w-full min-h-screen bg-[#080f12]">
        <ProductHero hero={content.hero} breadcrumbs={content.breadcrumbs} />
        {content.capabilities && (
          <ProductCapabilities
            capabilities={content.capabilities}
            repository={content.repository}
          />
        )}
        <ProductUseCases useCases={content.useCases} />
      </main>
    </>
  );
}
