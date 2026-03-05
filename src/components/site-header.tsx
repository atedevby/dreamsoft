import Link from "next/link";
import { HeaderNav } from "@/components/header-nav";
import { getHeaderItems, getSiteSettings } from "@/lib/site-data";

export async function SiteHeader() {
  const [settings, menu] = await Promise.all([getSiteSettings(), getHeaderItems()]);

  return (
    <header className="siteHeader">
      <div className="container rowBetween">
        <Link href="/" className="brand">
          {settings.siteName}
        </Link>
        <HeaderNav items={menu} />
      </div>
    </header>
  );
}
