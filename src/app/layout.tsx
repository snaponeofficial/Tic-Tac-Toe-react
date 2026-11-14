import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tic Tac Toe",
  description: "A polished, responsive two-player Tic-Tac-Toe game.",
  applicationName: "Tic Tac Toe",
  authors: [{ name: "Christian Louie Illahi", url: "https://louie.niprosoft.xyz/" }],
  creator: "Christian Louie Illahi",
  keywords: ["tic tac toe", "browser game", "two player game", "Next.js game"],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Tic Tac Toe",
    description: "A polished, responsive two-player Tic-Tac-Toe game.",
    type: "website",
    siteName: "Tic Tac Toe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Toe",
    description: "A polished, responsive two-player Tic-Tac-Toe game.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080B14",
};

const themeScript = `
  try {
    const savedTheme = JSON.parse(localStorage.getItem("tic-tac-toe-theme") || '"dark"');
    document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
  } catch { document.documentElement.dataset.theme = "dark"; }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
