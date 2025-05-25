import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PeterLeafChillVibes - Your Ultimate Relaxation Destination",
  description:
    "Discover premium cannabis accessories, reggae merchandise, and chill vibes. Designed by Peter Olympus Phiri, Founder of Olytech.",
  keywords: ["cannabis accessories", "reggae merchandise", "chill vibes", "Peter Phiri", "Olytech", "relaxation"],
  authors: [{ name: "Peter Olympus Phiri" }],
  creator: "Peter Olympus Phiri",
  publisher: "Olytech",
  robots: "index, follow",
  openGraph: {
    title: "PeterLeafChillVibes - Your Ultimate Relaxation Destination",
    description: "Discover premium cannabis accessories, reggae merchandise, and chill vibes.",
    url: "https://peterleafchillvibes.vercel.app",
    siteName: "PeterLeafChillVibes",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeterLeafChillVibes - Your Ultimate Relaxation Destination",
    description: "Discover premium cannabis accessories, reggae merchandise, and chill vibes.",
    creator: "@PeterPhiri",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
