import type { Metadata, Viewport } from "next";
import "./globals.css";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { USER } from "@/features/portfolio/profile/data/user";
import {
  departureMono,
  sfProDisplay,
  fragmentMono,
} from "@/assets/fonts/fonts";
import { cookies } from "next/headers";
import clsx from "clsx";
import ThemeProvider, { Theme } from "@/context/ThemeProvider";
import TopBar from "@/features/topbar/topbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s - ${SITE_INFO.name}`,
    default: `${USER.displayName} - ${USER.jobTitle}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  applicationName: SITE_INFO.name,
  category: "technology",
  authors: [
    {
      name: "nullkaustubh",
      url: SITE_INFO.url,
    },
  ],
  creator: "nullkaustubh",
  publisher: USER.displayName,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Lets Google show full-size image and untruncated snippets in results.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    siteName: SITE_INFO.name,
    url: SITE_INFO.url,
    type: "profile",
    locale: "en_US",
    title: `${USER.displayName} - ${USER.jobTitle}`,
    description: SITE_INFO.description,
    firstName: `${USER.firstName}`,
    lastName: `${USER.lastName}`,
    username: `${USER.username}`,
    gender: `${USER.gender}`,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaustubh_sankhe",
    creator: "@kaustubh_sankhe", // Twitter username
    title: `${USER.displayName} - ${USER.jobTitle}`,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = (await cookies()).get("color-theme")?.value;
  const theme: Theme =
    savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

  return (
    <html
      lang="en"
      className={clsx(
        theme,
        "overflow-x-hidden antialiased",
        departureMono.variable,
        sfProDisplay.variable,
        fragmentMono.variable,
      )}
      data-color-theme={theme}
      style={{
        scrollbarGutter: "stable",
      }}
    >
      <body suppressHydrationWarning>
        <ThemeProvider initialTheme={theme}>
          <TopBar />
          {children}
          <Analytics />
        </ThemeProvider>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 px-4 sm:px-6 md:px-0 z-20">
          <div className="mx-auto md:max-w-4xl lg:max-w-4xl h-10 blur-gradient-bottom" />
        </div>
      </body>
    </html>
  );
}
