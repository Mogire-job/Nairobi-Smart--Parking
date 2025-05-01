"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Car, Check, ChevronLeft, Clock, Info, Loader, MapPin, Phone, Shield, Star } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import axios from "axios"
import { toast } from "sonner"

// Mock data for a single parking spot
const parkingSpot = {
  id: 1,
  name: "CBD Parking Plaza",
  location: "Central Business District, Nairobi",
  address: "Kimathi Street, Nairobi CBD",
  price: 200,
  priceUnit: "hour",
  rating: 4.8,
  noReviews: 124,
  distance: 0.5,
  available: 12,
  total: 50,
  images: [
    "https://images.unsplash.com/photo-1582069768435-d41ecb2dd2ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1576421092266-cb93079b3e82?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1712405294399-0a121ea8a5e0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",    
  ],
  features: ["Security", "CCTV", "Covered", "24/7 Access", "Lighting", "Wheelchair Access"],
  description:
    "Located in the heart of Nairobi's CBD, this secure parking facility offers convenient access to major businesses, government offices, and shopping centers. With 24/7 security and CCTV surveillance, your vehicle remains safe while you go about your business.",
  openingHours: "24/7",
  contactPhone: "+254 700 000 000",
  reviews: [
    {
      id: 1,
      name: "John Kamau",
      date: "2 weeks ago",
      rating: 5,
      comment: "Very secure and convenient location. The staff are professional and helpful.",
    },
    {
      id: 2,
      name: "Sarah Wanjiku",
      date: "1 month ago",
      rating: 4,
      comment: "Good parking spot in the CBD. Clean and well-maintained.",
    },
    {
      id: 3,
      name: "Michael Omondi",
      date: "2 months ago",
      rating: 5,
      comment: "I use this parking lot regularly. It's always reliable and secure.",
    },
  ],
}

export default function ParkingDetailPage() {
  const {user} = useUser()
  const params = useParams()
  const createBooking = useMutation(api.booking.createReview)
  const parkingSpots = useQuery(api.parking.fetchCarId,{id:params.id})
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [vehicleNo, setVehicleNo] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [phone, setPhone] = useState("")
  const [startDate, setStartDate] = useState<string>("09:00")
  const [endDate, setEndDate] = useState<string>("17:00")
  
  const [isLoading,setIsLoading] = useState(false)

  if (parkingSpots == undefined) return (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Loader className='animate-spin'/>
        </div>
  )
  const parkingSpot = parkingSpots[0]

  // Calculate duration and total price
  const calculateDuration = () => {
    if (!startDate || !endDate) return 0

    const [startHour, startMinute] = startDate.split(":").map(Number)
    const [endHour, endMinute] = endDate.split(":").map(Number)

    let hours = endHour - startHour
    let minutes = endMinute - startMinute

    if (minutes < 0) {
      hours -= 1
      minutes += 60
    }

    return hours + minutes / 60
  }

  const duration = calculateDuration()
  const totalPrice = Math.max(0, Math.ceil(duration * parkingSpot.price))

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const data = {
      phoneNumber:phone,
      amount:1
    }

    const bookingDetails = {
      userId:user?.id,
      parkingSpotId:parkingSpot?._id,
      date:String(date),
      phone,
      vehicleType,
      vehicleNo,
      status:'active'     
    }
    try {
      
      // await axios.post("/api/initiate-payment", JSON.parse(JSON.stringify(data)))
      
      await createBooking(bookingDetails)    
      toast.success("Successful booking")
      setIsLoading(false)
    } catch (error) {
      toast.error("There was an error. Try again later",{description:error.message})      
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto px-5">
      <Button variant="ghost" className="mb-6 gap-2" asChild>
        <Link href="/search">
          <ChevronLeft className="h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div>
          {/* Image Gallery */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div className="relative col-span-2 row-span-1 aspect-[2/1]">
                <Image
                  src={parkingSpot.images[0] || "/placeholder.svg"}
                  alt={parkingSpot.name}
                  fill
                  className="object-cover"
                />
              </div>
              {parkingSpot.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${parkingSpot.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Parking Details */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{parkingSpot.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{parkingSpot.location}</span>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>
                      {parkingSpot.rating} ({parkingSpot.noReviews} reviews)
                    </span>
                  </div> */}
                </div>
              </div>
              <Badge variant="outline" className="text-lg font-semibold">
                KSh {parkingSpot.price} per hour
              </Badge>
            </div>

            <p className="mb-6 text-muted-foreground">{parkingSpot.description}</p>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Availability</div>
                  <div className="text-sm text-muted-foreground">
                    {parkingSpot.spots} of {parkingSpot.spots} spots available
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Opening Hours</div>
                  <div className="text-sm text-muted-foreground">{parkingSpot.hours}</div>
                </div>
              </div>
              {/* <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm text-muted-foreground">{parkingSpot.address}</div>
                </div>
              </div> */}
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-sm text-muted-foreground">{parkingSpot.contact}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-xl font-semibold">Features & Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {parkingSpot.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm"
                  >
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

      
        </div>

        {/* Booking Card */}
        <div className="md:sticky md:top-20">
          <Card>
            <CardHeader>
              <CardTitle>Book This Parking Spot</CardTitle>
              <CardDescription>Select your date and time to reserve</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle-reg">Phone Number</Label>
                <Input
                  id="vehicle-reg"
                  placeholder="0123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-reg">Vehicle Registration Number</Label>
                <Input
                  id="vehicle-reg"
                  placeholder="e.g., KAA 123A"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <select
                  onChange={(value) => setVehicleType(value)}
                  id="vehicle-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="sedan"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium">Start Time</div>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <option key={`${hour}:00`} value={`${hour}:00`}>
                          {`${hour}:00`}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">End Time</div>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <option key={`${hour}:00`} value={`${hour}:00`}>
                          {`${hour}:00`}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-medium">Duration</div>
                  <div>{duration.toFixed(1)} hours</div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-medium">Rate</div>
                  <div>
                    KSh {parkingSpot.price} per hour
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <div>Total</div>
                  <div>KSh {totalPrice}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm">
                <Info className="h-4 w-4 text-primary" />
                <span>Free cancellation up to 1 hour before your booking</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
              disabled={user == undefined ? true : false}
              className="w-full" size="lg" onClick={handlePayment} >
                {isLoading ? <Loader className="animate-spin"/> : "Reserve Now"}                
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secure booking · No reservation fees</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

