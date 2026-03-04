export function formatPrice(value: number | string, currency = "BYN") {
  const amount = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("be-BY", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
