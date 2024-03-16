"use client";

export function getTheme() {
  return localStorage.getItem("theme") || "system";
}

export function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function getColorScheme() {
  return localStorage.getItem("colorScheme") || "gruvbox";
}

export function setColorScheme(colorScheme) {
  localStorage.setItem("colorScheme", colorScheme);
}
