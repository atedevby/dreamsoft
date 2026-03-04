"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartLink() {
  const { totalCount } = useCart();

  return (
    <Link href="/cart" className="cartLink" aria-label="Перейти в корзину">
      <span>Корзина</span>
      {totalCount > 0 ? <span className="cartBadge">{totalCount}</span> : null}
    </Link>
  );
}
