import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tailwind ColorScheme Switcher",
  description: "A simple Tailwind CSS color scheme switch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col items-center transition-colors duration-300`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode,
          }}
        ></script>
        {children}
      </body>
    </html>
  );
}

function setInitialColorScheme() {
  function getInitialColorScheme() {
    const persistedColorScheme = window.localStorage.getItem("color-scheme");
    const hasPersistedColorScheme = typeof persistedColorScheme === "string";
    /**
     * If the user has explicitly chosen light or dark, use it
     */
    if (hasPersistedColorScheme) {
      const root = window.document.documentElement;
      root.style.setProperty("--initial-color-scheme", persistedColorScheme);

      if (persistedColorScheme !== "system") {
        return persistedColorScheme;
      }
    }
    /**
     * If they haven't been explicit, check the media query
     */
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasSystemColorSchemePreference = typeof mql.matches === "boolean";

    if (hasSystemColorSchemePreference) {
      return mql.matches ? "dark" : "light";
    }

    /**
     * If they are using a browser/OS that doesn't support
     * color themes, default to 'light'.
     */
    return "light";
  }

  const colorScheme = getInitialColorScheme();
  if (colorScheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

const blockingSetInitialColorMode = `(function() {
		${setInitialColorScheme.toString()}
		setInitialColorScheme();
})()
`;
