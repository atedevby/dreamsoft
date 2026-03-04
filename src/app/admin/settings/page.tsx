import { AdminNav } from "@/components/admin-nav";
import { updateSiteSettingsAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  await requireAdminAuth();

  const settings = await prisma.siteSettings.findFirst({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="stack">
      <AdminNav />
      <section className="adminPanel stack">
        <h1>Настройки сайта</h1>
        <form action={updateSiteSettingsAction} className="adminFormGrid">
          <input
            name="siteName"
            defaultValue={settings?.siteName ?? ""}
            placeholder="Название сайта"
            required
          />
          <input
            name="phone"
            defaultValue={settings?.phone ?? ""}
            placeholder="+375..."
            required
          />
          <input
            name="email"
            defaultValue={settings?.email ?? ""}
            placeholder="hello@dreamsoft.by"
            required
          />
          <input
            name="address"
            defaultValue={settings?.address ?? ""}
            placeholder="Адрес"
            required
          />
          <input
            name="copyright"
            defaultValue={settings?.copyright ?? ""}
            placeholder="© ..."
            className="fullRow"
            required
          />
          <button className="buttonPrimary fullRow" type="submit">
            Сохранить настройки
          </button>
        </form>
      </section>
    </div>
  );
}
import { AdminNav } from "@/components/admin-nav";
import { updateSiteSettingsAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  await requireAdminAuth();

  const settings = await prisma.siteSettings.findFirst({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="stack">
      <AdminNav />
      <section className="adminPanel stack">
        <h1>Настройки сайта</h1>
        <form action={updateSiteSettingsAction} className="adminFormGrid">
          <input
            name="siteName"
            defaultValue={settings?.siteName ?? ""}
            placeholder="Название сайта"
            required
          />
          <input
            name="phone"
            defaultValue={settings?.phone ?? ""}
            placeholder="+375..."
            required
          />
          <input
            name="email"
            defaultValue={settings?.email ?? ""}
            placeholder="hello@dreamsoft.by"
            required
          />
          <input
            name="address"
            defaultValue={settings?.address ?? ""}
            placeholder="Адрес"
            required
          />
          <input
            name="copyright"
            defaultValue={settings?.copyright ?? ""}
            placeholder="© ..."
            className="fullRow"
            required
          />
          <button className="buttonPrimary fullRow" type="submit">
            Сохранить настройки
          </button>
        </form>
      </section>
    </div>
  );
}
