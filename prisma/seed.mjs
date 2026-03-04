import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProduct(data) {
  return prisma.product.upsert({
    where: { slug: data.slug },
    update: {
      title: data.title,
      description: data.description,
      sku: data.sku,
      price: data.price,
      currency: "BYN",
      stockQty: data.stockQty,
      isPublished: true,
      categoryId: data.categoryId,
      images: {
        deleteMany: {},
        create: data.images.map((url, index) => ({
          url,
          position: index,
          alt: data.title,
        })),
      },
      specs: {
        deleteMany: {},
        create: data.specs.map((item, index) => ({
          name: item.name,
          value: item.value,
          position: index,
        })),
      },
    },
    create: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      sku: data.sku,
      price: data.price,
      currency: "BYN",
      stockQty: data.stockQty,
      isPublished: true,
      categoryId: data.categoryId,
      images: {
        create: data.images.map((url, index) => ({
          url,
          position: index,
          alt: data.title,
        })),
      },
      specs: {
        create: data.specs.map((item, index) => ({
          name: item.name,
          value: item.value,
          position: index,
        })),
      },
    },
  });
}

async function main() {
  const livingCategory = await prisma.category.upsert({
    where: { slug: "living-room" },
    update: { name: "Гостиная" },
    create: { name: "Гостиная", slug: "living-room" },
  });

  const bedroomCategory = await prisma.category.upsert({
    where: { slug: "bedroom" },
    update: { name: "Спальня" },
    create: { name: "Спальня", slug: "bedroom" },
  });

  const diningCategory = await prisma.category.upsert({
    where: { slug: "dining" },
    update: { name: "Столовая" },
    create: { name: "Столовая", slug: "dining" },
  });

  const chair = await createProduct({
    slug: "loft-soft-chair",
    title: "Кресло Loft Soft",
    sku: "CHAIR-001",
    description:
      "Компактное и выразительное кресло для акцентной зоны. Отлично сочетается с торшерами и журнальными столиками.",
    price: "2490.00",
    stockQty: 6,
    categoryId: livingCategory.id,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467043198406-dc953a3defa0?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: [
      { name: "Материал обивки", value: "Шенилл премиум" },
      { name: "Каркас", value: "Массив бука" },
      { name: "Ширина", value: "88 см" },
      { name: "Глубина", value: "86 см" },
      { name: "Высота", value: "79 см" },
    ],
  });

  const sofa = await createProduct({
    slug: "scandinavia-3-sofa",
    title: "Диван Scandinavia 3",
    sku: "SOFA-003",
    description:
      "Трехместный диван с глубокой посадкой и лаконичным силуэтом в стиле modern nordic.",
    price: "6990.00",
    stockQty: 3,
    categoryId: livingCategory.id,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: [
      { name: "Материал", value: "Ткань рогожка" },
      { name: "Ширина", value: "238 см" },
      { name: "Глубина", value: "97 см" },
      { name: "Механизм", value: "Еврокнижка" },
      { name: "Спальное место", value: "198 x 150 см" },
    ],
  });

  const table = await createProduct({
    slug: "nordic-oak-table",
    title: "Обеденный стол Nordic Oak",
    sku: "TABLE-017",
    description:
      "Стол из натурального дуба для ежедневных семейных ужинов и приема гостей.",
    price: "4590.00",
    stockQty: 8,
    categoryId: diningCategory.id,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617104551722-3b2d5136641b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: [
      { name: "Материал столешницы", value: "Дуб" },
      { name: "Основание", value: "Металл, порошковая окраска" },
      { name: "Размер", value: "180 x 90 см" },
      { name: "Высота", value: "75 см" },
      { name: "Количество мест", value: "6-8 персон" },
    ],
  });

  const bed = await createProduct({
    slug: "calm-line-bed",
    title: "Кровать Calm Line",
    sku: "BED-042",
    description:
      "Минималистичная кровать с высоким мягким изголовьем и встроенными опорами.",
    price: "5290.00",
    stockQty: 2,
    categoryId: bedroomCategory.id,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-3a7f8cc13d84?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: [
      { name: "Размер спального места", value: "160 x 200 см" },
      { name: "Материал", value: "Ткань велюр" },
      { name: "Каркас", value: "Ламели + массив сосны" },
      { name: "Высота изголовья", value: "112 см" },
      { name: "Основание", value: "Подъемный механизм" },
    ],
  });

  await prisma.productRecommendation.deleteMany({});
  await prisma.productRecommendation.createMany({
    data: [
      { sourceProductId: chair.id, recommendedProductId: sofa.id, position: 0 },
      { sourceProductId: chair.id, recommendedProductId: table.id, position: 1 },
      { sourceProductId: sofa.id, recommendedProductId: chair.id, position: 0 },
      { sourceProductId: sofa.id, recommendedProductId: bed.id, position: 1 },
      { sourceProductId: table.id, recommendedProductId: chair.id, position: 0 },
      { sourceProductId: bed.id, recommendedProductId: sofa.id, position: 0 },
    ],
  });

  await prisma.siteSettings.upsert({
    where: { id: "main-site-settings" },
    update: {
      siteName: "DreamSoft Furniture Boutique",
      phone: "+375259405396",
      email: "hello@dreamsoft.by",
      address: "Минск, ул. Петра Мстиславца, 9",
      copyright: "© DreamSoft Furniture Boutique",
    },
    create: {
      id: "main-site-settings",
      siteName: "DreamSoft Furniture Boutique",
      phone: "+375259405396",
      email: "hello@dreamsoft.by",
      address: "Минск, ул. Петра Мстиславца, 9",
      copyright: "© DreamSoft Furniture Boutique",
    },
  });

  await prisma.menuItem.deleteMany({});
  await prisma.menuItem.createMany({
    data: [
      { label: "Каталог", href: "/catalog", position: 0, isVisible: true },
      { label: "Коллекции", href: "/page/collections", position: 1, isVisible: true },
      { label: "Доставка", href: "/page/delivery", position: 2, isVisible: true },
      { label: "Контакты", href: "/page/contacts", position: 3, isVisible: true },
    ],
  });

  await prisma.footerLink.deleteMany({});
  await prisma.footerLink.createMany({
    data: [
      {
        section: "Покупателям",
        label: "Оплата и доставка",
        href: "/page/delivery",
        position: 0,
        isVisible: true,
      },
      {
        section: "Покупателям",
        label: "Гарантия",
        href: "/page/warranty",
        position: 1,
        isVisible: true,
      },
      {
        section: "Компания",
        label: "О бренде",
        href: "/page/about",
        position: 0,
        isVisible: true,
      },
      {
        section: "Компания",
        label: "Шоурум",
        href: "/page/showroom",
        position: 1,
        isVisible: true,
      },
    ],
  });

  await prisma.page.upsert({
    where: { slug: "about" },
    update: {
      title: "О бренде",
      content:
        "DreamSoft - бутик мебельных коллекций с фокусом на мягкие формы, натуральные материалы и долговечный комфорт.",
      isPublished: true,
    },
    create: {
      title: "О бренде",
      slug: "about",
      content:
        "DreamSoft - бутик мебельных коллекций с фокусом на мягкие формы, натуральные материалы и долговечный комфорт.",
      isPublished: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
