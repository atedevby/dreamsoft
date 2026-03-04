import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/site-data";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="stack">
      <section className="heroBoutique">
        <div className="heroGlass">
          <p className="eyebrow">Boutique Interior Collection</p>
          <h1>Эксклюзивная мебель, созданная для эстетики вашего пространства</h1>
          <p>
            Подбираем коллекции, где каждая деталь работает на атмосферу: от мягких
            форм гостиной до акцентной мебели для спальни и кабинета.
          </p>
          <div className="actions">
            <Link className="buttonPrimary" href="/catalog">
              Смотреть коллекцию
            </Link>
            <Link className="buttonGhost" href="/cart">
              Перейти в корзину
            </Link>
          </div>
          <div className="statsRow">
            <article>
              <b>7 дней</b>
              <span>на доставку по Беларуси</span>
            </article>
            <article>
              <b>5 лет</b>
              <span>гарантии на каркас</span>
            </article>
            <article>
              <b>100+</b>
              <span>позиций в каталоге</span>
            </article>
          </div>
        </div>
      </section>

      <section className="stack">
        <div className="sectionTitle">
          <h2>Популярные товары</h2>
          <Link href="/catalog" className="muted">
            Весь каталог
          </Link>
        </div>
        <div className="productGrid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
