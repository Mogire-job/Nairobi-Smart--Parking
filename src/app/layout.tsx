import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/global/theme-provider"
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ConvexClientProvider } from "@/components/global/ConvexClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nai Park - Find Parking in Nairobi",
  description: "Find and book parking spots in Nairobi easily with Nai Park",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ConvexClientProvider>
              {children}
            <Toaster/>
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

