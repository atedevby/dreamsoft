import { prisma } from "@/lib/prisma";
import type { ProductCard, ProductDetails } from "@/lib/types";

type HeaderItem = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: HeaderItem[];
};

export type SiteSettingsView = {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
};

const fallbackSettings: SiteSettingsView = {
  siteName: "DreamSoft Furniture Belarus",
  phone: "+375259405396",
  email: "hello@dreamsoft.by",
  address: "Минск, ул. Примерная, 1",
  copyright: "© DreamSoft Furniture",
};

const fallbackHeader: HeaderItem[] = [
  { label: "Каталог", href: "/catalog" },
  { label: "О компании", href: "/page/about" },
  { label: "Доставка", href: "/page/delivery" },
  { label: "Контакты", href: "/page/contacts" },
];

const fallbackFooter: FooterSection[] = [
  {
    title: "Покупателям",
    links: [
      { label: "Доставка", href: "/page/delivery" },
      { label: "Оплата", href: "/page/payment" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/page/about" },
      { label: "Контакты", href: "/page/contacts" },
    ],
  },
];

const fallbackProducts: ProductCard[] = [
  {
    id: "demo-chair",
    title: "Кресло Loft Soft",
    slug: "loft-soft-chair",
    price: "2490",
    currency: "BYN",
    categoryName: "Кресла",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-sofa",
    title: "Диван Scandinavia 3",
    slug: "scandinavia-3-sofa",
    price: "6990",
    currency: "BYN",
    categoryName: "Диваны",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-table",
    title: "Обеденный стол Nordic Oak",
    slug: "nordic-oak-table",
    price: "4590",
    currency: "BYN",
    categoryName: "Столы",
    imageUrl:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-bed",
    title: "Кровать Calm Line",
    slug: "calm-line-bed",
    price: "5290",
    currency: "BYN",
    categoryName: "Спальня",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
];

const fallbackProductDetails: ProductDetails[] = [
  {
    ...fallbackProducts[0],
    description:
      "Кресло с акцентной геометрией и мягкой посадкой для гостиной или lounge-зоны.",
    stockQty: 6,
    images: [
      {
        id: "demo-chair-1",
        url: fallbackProducts[0].imageUrl,
        alt: "Кресло Loft Soft, общий вид",
      },
      {
        id: "demo-chair-2",
        url: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop",
        alt: "Кресло Loft Soft в интерьере",
      },
    ],
    specs: [
      { name: "Материал обивки", value: "Шенилл премиум" },
      { name: "Ширина", value: "88 см" },
      { name: "Глубина", value: "86 см" },
      { name: "Высота", value: "79 см" },
      { name: "Каркас", value: "Массив бука" },
    ],
    recommendations: [fallbackProducts[1], fallbackProducts[2]],
  },
  {
    ...fallbackProducts[1],
    description:
      "Трехместный диван в скандинавском стиле с глубоким комфортом и съемными чехлами.",
    stockQty: 3,
    images: [
      {
        id: "demo-sofa-1",
        url: fallbackProducts[1].imageUrl,
        alt: "Диван Scandinavia 3, фронтальный вид",
      },
      {
        id: "demo-sofa-2",
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
        alt: "Диван Scandinavia 3 в интерьере",
      },
    ],
    specs: [
      { name: "Материал", value: "Ткань рогожка" },
      { name: "Ширина", value: "238 см" },
      { name: "Глубина", value: "97 см" },
      { name: "Наполнение", value: "ППУ + memory foam" },
      { name: "Механизм", value: "Еврокнижка" },
    ],
    recommendations: [fallbackProducts[0], fallbackProducts[3]],
  },
];

export async function getSiteSettings(): Promise<SiteSettingsView> {
  try {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "asc" },
    });

    if (!settings) {
      return fallbackSettings;
    }

    return {
      siteName: settings.siteName,
      phone: settings.phone ?? fallbackSettings.phone,
      email: settings.email ?? fallbackSettings.email,
      address: settings.address ?? fallbackSettings.address,
      copyright: settings.copyright ?? fallbackSettings.copyright,
    };
  } catch {
    return fallbackSettings;
  }
}

export async function getHeaderItems(): Promise<HeaderItem[]> {
  try {
    const items = await prisma.menuItem.findMany({
      where: { isVisible: true },
      orderBy: { position: "asc" },
      select: { label: true, href: true },
    });

    return items.length ? items : fallbackHeader;
  } catch {
    return fallbackHeader;
  }
}

export async function getFooterSections(): Promise<FooterSection[]> {
  try {
    const links = await prisma.footerLink.findMany({
      where: { isVisible: true },
      orderBy: [{ section: "asc" }, { position: "asc" }],
      select: { section: true, label: true, href: true },
    });

    if (!links.length) {
      return fallbackFooter;
    }

    const grouped = new Map<string, HeaderItem[]>();

    for (const link of links) {
      const sectionLinks = grouped.get(link.section) ?? [];
      sectionLinks.push({ label: link.label, href: link.href });
      grouped.set(link.section, sectionLinks);
    }

    return Array.from(grouped.entries()).map(([title, sectionLinks]) => ({
      title,
      links: sectionLinks,
    }));
  } catch {
    return fallbackFooter;
  }
}

export async function getFeaturedProducts(): Promise<ProductCard[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
        images: {
          orderBy: { position: "asc" },
          take: 1,
          select: { url: true },
        },
      },
    });

    if (!products.length) {
      return fallbackProducts;
    }

    return products.map((product) => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price.toString(),
      currency: product.currency,
      categoryName: product.category?.name ?? null,
      imageUrl: product.images[0]?.url ?? fallbackProducts[0].imageUrl,
    }));
  } catch {
    return fallbackProducts;
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetails | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true } },
        images: {
          orderBy: { position: "asc" },
          select: { id: true, url: true, alt: true },
        },
        specs: {
          orderBy: { position: "asc" },
          select: { name: true, value: true },
        },
        recommendations: {
          orderBy: { position: "asc" },
          include: {
            recommendedProduct: {
              include: {
                category: { select: { name: true } },
                images: {
                  orderBy: { position: "asc" },
                  take: 1,
                  select: { url: true },
                },
              },
            },
          },
        },
      },
    });

    if (!product || !product.isPublished) {
      return fallbackProductDetails.find((item) => item.slug === slug) ?? null;
    }

    const recommendations = product.recommendations
      .filter((item) => item.recommendedProduct.isPublished)
      .map((item) => ({
        id: item.recommendedProduct.id,
        title: item.recommendedProduct.title,
        slug: item.recommendedProduct.slug,
        price: item.recommendedProduct.price.toString(),
        currency: item.recommendedProduct.currency,
        categoryName: item.recommendedProduct.category?.name ?? null,
        imageUrl:
          item.recommendedProduct.images[0]?.url ?? fallbackProducts[0].imageUrl,
      }));

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      description:
        product.description ?? "Описание товара скоро будет добавлено менеджером.",
      price: product.price.toString(),
      currency: product.currency,
      categoryName: product.category?.name ?? null,
      stockQty: product.stockQty,
      imageUrl: product.images[0]?.url ?? fallbackProducts[0].imageUrl,
      images: product.images.length
        ? product.images
        : [
            {
              id: "fallback-image",
              url: fallbackProducts[0].imageUrl,
              alt: "Изображение товара",
            },
          ],
      specs: product.specs,
      recommendations:
        recommendations.length > 0
          ? recommendations
          : fallbackProducts.filter((item) => item.slug !== product.slug).slice(0, 3),
    };
  } catch {
    return fallbackProductDetails.find((item) => item.slug === slug) ?? null;
  }
}
