import type React from "react"
import Navbar from "@/components/global/navbar"
import Footer from "@/components/global/footer"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    
    <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    </div>
        
  )
}

