"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { ProductCard } from "@/lib/types";

export function AddToCartButton({ product }: { product: ProductCard }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <button className="buttonPrimary buttonWide" onClick={onAdd} type="button">
      {added ? "Добавлено" : "В корзину"}
    </button>
  );
}
