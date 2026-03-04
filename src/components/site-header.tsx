import Link from "next/link";
import { CartLink } from "@/components/cart-link";
import { getHeaderItems, getSiteSettings } from "@/lib/site-data";

export async function SiteHeader() {
  const [settings, menu] = await Promise.all([getSiteSettings(), getHeaderItems()]);

  return (
    <header className="siteHeader">
      <div className="container rowBetween">
        <Link href="/" className="brand">
          {settings.siteName}
        </Link>
        <nav className="nav">
          {menu.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href}>
              {item.label}
            </Link>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
