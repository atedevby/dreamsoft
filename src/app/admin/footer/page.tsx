import { AdminNav } from "@/components/admin-nav";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  createFooterLinkAction,
  deleteFooterLinkAction,
  updateFooterLinkAction,
} from "@/app/admin/actions";

export default async function AdminFooterPage() {
  await requireAdminAuth();

  const footerLinks = await prisma.footerLink.findMany({
    orderBy: [{ section: "asc" }, { position: "asc" }],
  });

  return (
    <div className="stack">
      <AdminNav />
      <section className="adminPanel stack">
        <h1>Футер</h1>
        <form action={createFooterLinkAction} className="adminFormGrid">
          <input name="section" placeholder="Секция (например, Покупателям)" required />
          <input name="label" placeholder="Текст ссылки" required />
          <input name="href" placeholder="/page/delivery" required />
          <input name="position" placeholder="Позиция" defaultValue="0" />
          <label className="checkbox">
            <input type="checkbox" name="isVisible" defaultChecked />
            <span>Показывать</span>
          </label>
          <button className="buttonPrimary fullRow" type="submit">
            Добавить ссылку футера
          </button>
        </form>
      </section>

      <section className="stack">
        {footerLinks.map((item) => (
          <form
            action={updateFooterLinkAction}
            key={item.id}
            className="adminPanel adminFormGrid"
          >
            <input type="hidden" name="id" value={item.id} />
            <input name="section" defaultValue={item.section} required />
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
              <button className="buttonGhost" formAction={deleteFooterLinkAction} type="submit">
                Удалить
              </button>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
}
