import ProductPage from "@/components/product/ProductPage";
import { buildProductMetadata } from "@/components/product/productSeo";
import { commandIntelligence } from "@/content/products/command-intelligence";

export const metadata = buildProductMetadata(commandIntelligence);

export default function CommandIntelligencePage() {
  return <ProductPage content={commandIntelligence} />;
}
