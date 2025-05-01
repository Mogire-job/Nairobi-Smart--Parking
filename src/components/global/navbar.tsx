"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const routes = [
  { name: "Home", path: "/" },
  { name: "Find Parking", path: "/search" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 17h6" />
                <path d="M12 6v7" />
              </svg>
            </div>
            <span className="hidden font-bold sm:inline-block">Nai Park</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            <SignedOut >
              <div className='flex items-center gap-6'>
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.path ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}

                <SignInButton>
                  <Button>
                    <User/>
                    SignIn
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className='flex items-center gap-6'>
                <Link href='/booking'>Bookings</Link>
                <Link href='/search'>Search</Link>
                <UserButton/>
              </div>
            </SignedIn>
          </nav>
        </div>
        
      </div>
    </header>
  )
}

