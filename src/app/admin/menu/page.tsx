import { AdminNav } from "@/components/admin-nav";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  createMenuItemAction,
  deleteMenuItemAction,
  updateMenuItemAction,
} from "@/app/admin/actions";

export default async function AdminMenuPage() {
  await requireAdminAuth();

  const menuItems = await prisma.menuItem.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="stack">
      <AdminNav />
      <section className="adminPanel stack">
        <h1>Хедер / Навигация</h1>
        <form action={createMenuItemAction} className="adminFormGrid">
          <input name="label" placeholder="Название пункта" required />
          <input name="href" placeholder="/catalog" required />
          <input name="position" placeholder="Позиция" defaultValue="0" />
          <label className="checkbox">
            <input type="checkbox" name="isVisible" defaultChecked />
            <span>Показывать</span>
          </label>
          <button className="buttonPrimary fullRow" type="submit">
            Добавить пункт меню
          </button>
        </form>
      </section>

      <section className="stack">
        {menuItems.map((item) => (
          <form action={updateMenuItemAction} key={item.id} className="adminPanel adminFormGrid">
            <input type="hidden" name="id" value={item.id} />
            <input name="label" defaultValue={item.label} required />
            <input name="href" defaultValue={item.href} required />
            <input name="position" defaultValue={item.position} required />
            <label className="checkbox">
              <input type="checkbox" name="isVisible" defaultChecked={item.isVisible} />
              <span>Показывать</span>
            </label>
            <div className="actions fullRow">
              <button className="buttonPrimary" type="submit">
                Сохранить
              </button>
              <button className="buttonGhost" formAction={deleteMenuItemAction} type="submit">
                Удалить
              </button>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
}
