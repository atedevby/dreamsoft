"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format-price";

function formatAmount(value: number, currency = "BYN") {
  return formatPrice(value, currency);
}

export default function CartPage() {
  const { items, totalCount, totalPrice, incrementItem, decrementItem, removeItem, clearCart } =
    useCart();

  if (!items.length) {
    return (
      <section className="cartEmpty">
        <h1>Корзина пока пустая</h1>
        <p className="muted">Добавьте мебель из каталога, чтобы оформить заказ.</p>
        <Link href="/catalog" className="buttonPrimary">
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <div className="cartLayout">
      <section className="stack">
        <h1>Корзина</h1>
        <p className="muted">
          {totalCount} товаров на сумму {formatAmount(totalPrice)}
        </p>
        <div className="stack">
          {items.map((item) => (
            <article className="cartItem" key={item.id}>
              <div
                className="cartThumb"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />
              <div className="stack">
                <h3>{item.title}</h3>
                <p className="muted">
                  {formatAmount(Number(item.price), item.currency)}
                </p>
              </div>
              <div className="qtyControl">
                <button type="button" onClick={() => decrementItem(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => incrementItem(item.id)}>
                  +
                </button>
              </div>
              <button
                className="linkDanger"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                Удалить
              </button>
            </article>
          ))}
        </div>
      </section>

      <aside className="cartSummary">
        <h2>Ваш заказ</h2>
        <div className="summaryRow">
          <span>Товаров</span>
          <b>{totalCount}</b>
        </div>
        <div className="summaryRow">
          <span>Итого</span>
          <b>{formatAmount(totalPrice)}</b>
        </div>
        <button className="buttonPrimary buttonWide" type="button">
          Оформить заказ
        </button>
        <button className="buttonGhost buttonWide" type="button" onClick={clearCart}>
          Очистить корзину
        </button>
      </aside>
    </div>
  );
}
