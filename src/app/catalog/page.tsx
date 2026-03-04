import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/site-data";

export default async function CatalogPage() {
  const products = await getFeaturedProducts();

  return (
    <div className="stack">
      <h1>Каталог</h1>
      <p className="muted">Бутик-подборка мебели для гостиной, спальни и офиса.</p>
      <div className="productGrid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
