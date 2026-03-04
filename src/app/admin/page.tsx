import Link from "next/link";
import { AdminNav } from "@/components/admin-nav";
import { requireAdminAuth } from "@/lib/admin-auth";

const adminSections = [
  {
    title: "Товары",
    description: "Управление карточками товаров, ценой, публикацией и фото.",
    href: "/admin/products",
  },
  {
    title: "Хедер и навигация",
    description: "Редактирование пунктов меню и порядка отображения.",
    href: "/admin/menu",
  },
  {
    title: "Футер",
    description: "Ссылки по секциям: покупателям, компании и сервису.",
    href: "/admin/footer",
  },
  {
    title: "Настройки сайта",
    description: "Контакты, адрес, соцсети и общая информация бренда.",
    href: "/admin/settings",
  },
];

export default async function AdminPage() {
  await requireAdminAuth();

  return (
    <div className="stack">
      <AdminNav />
      <h1>Админка магазина</h1>
      <p className="muted">
        Быстрые разделы для управления товарами и контентом сайта.
      </p>

      <div className="adminGrid">
        {adminSections.map((section) => (
          <article className="card" key={section.title}>
            <div className="cardBody">
              <h2>{section.title}</h2>
              <p className="muted">{section.description}</p>
              <Link className="buttonGhost" href={section.href}>
                Открыть
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="actions">
        <Link className="buttonPrimary" href="/">
          На главную
        </Link>
      </div>
    </div>
  );
}
