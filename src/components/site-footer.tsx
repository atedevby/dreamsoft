import Link from "next/link";
import { getFooterSections, getSiteSettings } from "@/lib/site-data";

export async function SiteFooter() {
  const [settings, sections] = await Promise.all([
    getSiteSettings(),
    getFooterSections(),
  ]);

  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        {sections.map((section) => (
          <section key={section.title}>
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="container footerBottom">
        <span>{settings.copyright}</span>
        <span>{settings.phone}</span>
      </div>
    </footer>
  );
}
