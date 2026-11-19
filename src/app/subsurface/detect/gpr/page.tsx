import ProductPage from "@/components/product/ProductPage";
import { buildProductMetadata } from "@/components/product/productSeo";
import { gpr } from "@/content/products/gpr";

export const metadata = buildProductMetadata(gpr);

export default function GprPage() {
  return <ProductPage content={gpr} />;
}
