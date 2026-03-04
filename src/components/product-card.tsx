import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice } from "@/lib/format-price";
import type { ProductCard as ProductCardType } from "@/lib/types";

export function ProductCard({ product }: { product: ProductCardType }) {
  return (
    <article className="productCard">
      <Link className="productImageWrap" href={`/catalog/${product.slug}`}>
        <div
          className="productImage"
          style={{ backgroundImage: `url(${product.imageUrl})` }}
        />
      </Link>

      <div className="productBody">
        <p className="productMeta">{product.categoryName ?? "Новая коллекция"}</p>
        <h3>{product.title}</h3>
        <p className="price">{formatPrice(product.price, product.currency)}</p>
      </div>

      <div className="productActions">
        <Link className="buttonGhost buttonWide" href={`/catalog/${product.slug}`}>
          Подробнее
        </Link>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
