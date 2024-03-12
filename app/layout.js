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
      <body className={`${inter.className} flex flex-col items-center`}>{children}</body>
    </html>
  );
}
