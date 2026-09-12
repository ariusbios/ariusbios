import type { BusinessHoursRule } from "@/lib/types";

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function isOpenNow(
  rules: BusinessHoursRule[],
  statusOverride: "open" | "closed" | null | undefined,
  now: Date = new Date(),
): boolean {
  if (statusOverride === "open") return true;
  if (statusOverride === "closed") return false;

  const rule = rules.find((r) => r.dayOfWeek === now.getDay());
  if (!rule) return false;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= toMinutes(rule.openTime) && nowMinutes < toMinutes(rule.closeTime);
}
