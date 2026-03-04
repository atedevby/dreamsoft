"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { logoutAdmin, requireAdminAuth } from "@/lib/admin-auth";

function toInt(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value ?? fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toDecimalString(value: FormDataEntryValue | null, fallback = "0") {
  const normalized = String(value ?? fallback).replace(",", ".").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : fallback;
}

function toBool(value: FormDataEntryValue | null) {
  return value === "on";
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  await requireAdminAuth();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!title || !slug) return;

  await prisma.product.create({
    data: {
      title,
      slug,
      description: String(formData.get("description") ?? "").trim(),
      price: toDecimalString(formData.get("price"), "0.00"),
      currency: "BYN",
      stockQty: toInt(formData.get("stockQty"), 0),
      isPublished: toBool(formData.get("isPublished")),
      images: imageUrl
        ? { create: [{ url: imageUrl, alt: title, position: 0 }] }
        : undefined,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath("/");
}

export async function updateProductAction(formData: FormData) {
  await requireAdminAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const title = String(formData.get("title") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  await prisma.product.update({
    where: { id },
    data: {
      title,
      price: toDecimalString(formData.get("price"), "0.00"),
      stockQty: toInt(formData.get("stockQty"), 0),
      isPublished: toBool(formData.get("isPublished")),
    },
  });

  const firstImage = await prisma.productImage.findFirst({
    where: { productId: id },
    orderBy: { position: "asc" },
    select: { id: true },
  });

  if (imageUrl && firstImage) {
    await prisma.productImage.update({
      where: { id: firstImage.id },
      data: { url: imageUrl, alt: title },
    });
  } else if (imageUrl && !firstImage) {
    await prisma.productImage.create({
      data: { productId: id, url: imageUrl, alt: title, position: 0 },
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath("/");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath("/");
}

export async function createMenuItemAction(formData: FormData) {
  await requireAdminAuth();

  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  if (!label || !href) return;

  await prisma.menuItem.create({
    data: {
      label,
      href,
      position: toInt(formData.get("position"), 0),
      isVisible: toBool(formData.get("isVisible")),
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function updateMenuItemAction(formData: FormData) {
  await requireAdminAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.menuItem.update({
    where: { id },
    data: {
      label: String(formData.get("label") ?? "").trim(),
      href: String(formData.get("href") ?? "").trim(),
      position: toInt(formData.get("position"), 0),
      isVisible: toBool(formData.get("isVisible")),
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function deleteMenuItemAction(formData: FormData) {
  await requireAdminAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function createFooterLinkAction(formData: FormData) {
  await requireAdminAuth();

  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const section = String(formData.get("section") ?? "").trim();

  if (!label || !href || !section) return;

  await prisma.footerLink.create({
    data: {
      section,
      label,
      href,
      position: toInt(formData.get("position"), 0),
      isVisible: toBool(formData.get("isVisible")),
    },
  });

  revalidatePath("/admin/footer");
  revalidatePath("/");
}

export async function updateFooterLinkAction(formData: FormData) {
  await requireAdminAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.footerLink.update({
    where: { id },
    data: {
      section: String(formData.get("section") ?? "").trim(),
      label: String(formData.get("label") ?? "").trim(),
      href: String(formData.get("href") ?? "").trim(),
      position: toInt(formData.get("position"), 0),
      isVisible: toBool(formData.get("isVisible")),
    },
  });

  revalidatePath("/admin/footer");
  revalidatePath("/");
}

export async function deleteFooterLinkAction(formData: FormData) {
  await requireAdminAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.footerLink.delete({ where: { id } });
  revalidatePath("/admin/footer");
  revalidatePath("/");
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdminAuth();

  const siteName = String(formData.get("siteName") ?? "").trim();
  if (!siteName) return;

  const data = {
    siteName,
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    copyright: String(formData.get("copyright") ?? "").trim(),
  };

  const existing = await prisma.siteSettings.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
