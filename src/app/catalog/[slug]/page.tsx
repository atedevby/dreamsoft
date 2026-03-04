import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format-price";
import { getProductBySlug } from "@/lib/site-data";

type ProductParams = {
  slug: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductParams>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stockQty > 0;

  return (
    <div className="stack">
      <Link href="/catalog" className="muted">
        Назад в каталог
      </Link>

      <section className="productPage">
        <ProductGallery images={product.images} title={product.title} />

        <article className="productInfo">
          <p className="productMeta">{product.categoryName ?? "Коллекция"}</p>
          <h1>{product.title}</h1>
          <p className="price bigPrice">{formatPrice(product.price, product.currency)}</p>

          <p className={inStock ? "stockTag inStock" : "stockTag outStock"}>
            {inStock ? `В наличии: ${product.stockQty} шт.` : "Нет в наличии"}
          </p>

          <p>{product.description}</p>
          <AddToCartButton product={product} />
        </article>
      </section>

      <section className="stack">
        <h2>Характеристики</h2>
        <div className="specGrid">
          {product.specs.map((spec) => (
            <article key={`${spec.name}-${spec.value}`} className="specRow">
              <span className="muted">{spec.name}</span>
              <b>{spec.value}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="stack">
        <h2>Рекомендуем также</h2>
        <div className="productGrid">
          {product.recommendations.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
