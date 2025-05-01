'use client'

import Link from "next/link"
import {
  BarChart3,
  CalendarClock,
  Car,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs"

export default function AdminLayout({ children }) {
  const {user} = useUser()
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <div className="rounded-md bg-primary p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 17h6" />
              <path d="M12 6v7" />
            </svg>
          </div>
          <span>Nai Park Admin</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          
          <UserButton/>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 py-2">
              
              <NavLink href="/admin/parking-spots" icon={MapPin}>
                Parking Spots
              </NavLink>
              <NavLink href="/admin/bookings" icon={CalendarClock}>
                Bookings
              </NavLink>              
              <NavLink href="/admin/customers" icon={Users}>
                Customers
              </NavLink>
              
            </nav>
            <Separator className="my-4" />
            <div className="mt-auto">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <UserButton/>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{user?.firstName}</p>
                    <p className="text-xs text-muted-foreground">Parking Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}


function NavLink({ href, icon: Icon, children }) {
  // In a real app, you'd use a router hook to determine if the link is active
  const isActive = false

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  )
}

