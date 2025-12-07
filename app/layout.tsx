import type { Metadata, Viewport } from "next";
import "./globals.css";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { USER } from "@/features/profile/data/user";
import { departureMono, sfProDisplay } from "@/assets/fonts/fonts";

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
  authors: [
    {
      name: "nullkaustubh",
      url: SITE_INFO.url,
    },
  ],
  creator: "nullkaustubh",
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "profile",
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
    creator: "@kaustubh_sankhe", // Twitter username
    images: [SITE_INFO.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.dark,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${departureMono.variable} ${sfProDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
