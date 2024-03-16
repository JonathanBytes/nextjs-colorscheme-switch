import { Inter } from "next/font/google";
import "./globals.css";
import { getCookieColorScheme, getCookieTheme } from "@/lib/userColorsCookies";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tailwind ColorScheme Switcher",
  description: "A simple Tailwind CSS color scheme switch",
};

export default async function RootLayout({ children }) {
  const initialTheme = await getCookieTheme();
  const initialColorScheme = await getCookieColorScheme();
  const initialUserColors = {
    theme: initialTheme,
    colorScheme: initialColorScheme,
  };
  return (
    <html lang="en" data-theme={initialUserColors.theme}>
      <body
        className={`${initialUserColors.colorScheme} ${inter.className} flex flex-col items-center transition-colors duration-300`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode(initialUserColors.theme),
          }}
        ></script>
        {children}
        <ThemeSwitch initialUserColors={initialUserColors} />
      </body>
    </html>
  );
}

function setInitialColorScheme(initialUserColors) {
  function getInitialTheme() {
    const persistedTheme = initialUserColors;
    const hasPersistedTheme = typeof persistedTheme === "string";
    /**
     * If the user has explicitly chosen light or dark, use it
     */
    if (hasPersistedTheme) {
      if (persistedTheme !== "system") {
        return persistedTheme;
      }
    }
    /**
     * If they haven't been explicit, check the media query
     */
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasSystemThemePreference = typeof mql.matches === "boolean";

    if (hasSystemThemePreference) {
      return mql.matches ? "dark" : "light";
    }

    /**
     * If they are using a browser/OS that doesn't support
     * color themes, default to 'light'.
     */
    return "light";
  }

  const theme = getInitialTheme();
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

function blockingSetInitialColorMode(initialUserColors) {
  return `(function() {
		${setInitialColorScheme.toString()}
		setInitialColorScheme(${JSON.stringify(initialUserColors)});
})()
`;
}
