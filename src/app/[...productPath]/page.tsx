import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/product/ProductPage";
import { buildProductMetadata } from "@/components/product/productSeo";
import { products, getProductByPath } from "@/content/products";

/**
 * Product / capability pages, generated from src/content/products.
 *
 * Every entry in the products registry is prerendered at its `path`
 * (e.g. /subsurface/detect/gpr). To add a page, create a content file and
 * list it in src/content/products/index.ts; no route file is needed.
 * Static routes elsewhere in src/app always take precedence, and unknown
 * paths 404 because only registered paths are generated.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ productPath: string[] }> };

const toPath = (segments: string[]) => "/" + segments.join("/");

export function generateStaticParams() {
  return products.map((p) => ({
    productPath: p.path.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productPath } = await params;
  const content = getProductByPath(toPath(productPath));
  return content ? buildProductMetadata(content) : {};
}

export default async function ProductRoute({ params }: Props) {
  const { productPath } = await params;
  const content = getProductByPath(toPath(productPath));
  if (!content) notFound();
  return <ProductPage content={content} />;
}
