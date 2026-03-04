import { AdminNav } from "@/components/admin-nav";
import { formatPrice } from "@/lib/format-price";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-auth";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "@/app/admin/actions";

export default async function AdminProductsPage() {
  await requireAdminAuth();

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
    },
  });

  return (
    <div className="stack">
      <AdminNav />
      <section className="adminPanel stack">
        <h1>Товары</h1>
        <p className="muted">Создание и редактирование карточек каталога.</p>

        <form action={createProductAction} className="adminFormGrid">
          <input name="title" placeholder="Название" required />
          <input name="slug" placeholder="slug (например, soft-sofa)" required />
          <input name="price" placeholder="Цена (BYN)" required />
          <input name="stockQty" placeholder="Наличие, шт" defaultValue="0" />
          <input name="imageUrl" placeholder="URL фото обложки" />
          <label className="checkbox">
            <input type="checkbox" name="isPublished" defaultChecked />
            <span>Опубликован</span>
          </label>
          <textarea
            name="description"
            placeholder="Описание товара"
            className="fullRow"
            rows={2}
          />
          <button className="buttonPrimary fullRow" type="submit">
            Создать товар
          </button>
        </form>
      </section>

      <section className="stack">
        {products.map((product) => (
          <form action={updateProductAction} key={product.id} className="adminPanel stack">
            <input type="hidden" name="id" value={product.id} />
            <div className="adminFormGrid">
              <input name="title" defaultValue={product.title} required />
              <input
                name="price"
                defaultValue={product.price.toString()}
                placeholder="Цена (BYN)"
                required
              />
              <input
                name="stockQty"
                defaultValue={product.stockQty}
                placeholder="Наличие, шт"
                required
              />
              <input
                name="imageUrl"
                defaultValue={product.images[0]?.url ?? ""}
                placeholder="URL фото обложки"
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={product.isPublished}
                />
                <span>Опубликован</span>
              </label>
            </div>

            <div className="rowBetween">
              <p className="muted">
                {product.slug} · {formatPrice(product.price.toString(), product.currency)}
              </p>
              <div className="actions">
                <button className="buttonPrimary" type="submit">
                  Сохранить
                </button>
                <button className="buttonGhost" formAction={deleteProductAction} type="submit">
                  Удалить
                </button>
              </div>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
}
