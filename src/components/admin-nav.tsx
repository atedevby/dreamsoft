import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/products", label: "Товары" },
  { href: "/admin/menu", label: "Хедер" },
  { href: "/admin/footer", label: "Футер" },
  { href: "/admin/settings", label: "Настройки" },
];

export function AdminNav() {
  return (
    <div className="adminPanel">
      <nav className="adminNav">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="adminNavLink">
            {link.label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction}>
        <button className="buttonGhost" type="submit">
          Выйти
        </button>
      </form>
    </div>
  );
}
