"use client"
import { useUser } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import BookingsList from './BookingsList'

export default function BookingPage() {
  const {user} = useUser()
  if (user == undefined) return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <Loader className='animate-spin'/>
    </div>
  )

  console.log(user);

  return (
    <div className="container py-8 max-w-5xl mx-auto px-5">    
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My bookings</h1>
        <p className="mt-2 text-muted-foreground">Oversee all of your past and present bookings</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        <BookingsList user={user.id}/>       
      </div>
    </div>
  )
}

