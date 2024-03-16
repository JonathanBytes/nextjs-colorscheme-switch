"use server";

import { cookies } from "next/headers";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

export async function getCookieTheme() {
  const theme = getCookie("theme", { cookies });
  if (!theme) return "system";
  return theme;
}

export async function setCookieTheme(theme) {
  if (theme === "system") {
    return deleteCookie("theme", { cookies });
  }
  setCookie("theme", theme, { cookies });
  revalidatePath("/", "layout");
}

export async function getCookieColorScheme() {
  const scheme = getCookie("colorScheme", { cookies });
  if (!scheme) return "gruvbox";
  return scheme;
}

export async function setCookieColorScheme(scheme) {
  setCookie("colorScheme", scheme, { cookies });
  revalidatePath("/", "layout");
}
