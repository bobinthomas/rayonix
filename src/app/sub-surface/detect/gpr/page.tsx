import ProductPage from "@/components/product/ProductPage";
import { buildProductMetadata } from "@/components/product/productSeo";
import { gpr } from "@/content/products/gpr";

// Legacy hyphenated URL; canonical points to /subsurface/detect/gpr.
export const metadata = buildProductMetadata(gpr);

export default function LegacyGprPage() {
  return <ProductPage content={gpr} />;
}
