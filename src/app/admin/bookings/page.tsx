"use client"

import { useEffect, useState } from "react"
import {
  ArrowUpDown,
  Calendar,
  Car,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  Loader,
  MapPin,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { AvatarImage } from "@radix-ui/react-avatar"

// Mock data for bookings
const bookings = [
  {
    id: "B-12345",
    customer: {
      name: "John Kamau",
      phone: "+254 700 123 456",
      email: "john.kamau@example.com",
    },
    parkingSpot: {
      name: "CBD Parking Plaza",
      location: "Central Business District",
    },
    vehicle: {
      regNumber: "KAA 123A",
      type: "Sedan",
    },
    dateTime: {
      date: "2024-03-22",
      startTime: "09:00",
      endTime: "17:00",
      duration: 8,
    },
    payment: {
      amount: 1650,
      status: "paid",
      method: "M-Pesa",
    },
    status: "active",
  },
  {
    id: "B-12344",
    customer: {
      name: "Sarah Wanjiku",
      phone: "+254 700 234 567",
      email: "sarah.wanjiku@example.com",
    },
    parkingSpot: {
      name: "Westlands Secure Parking",
      location: "Westlands",
    },
    vehicle: {
      regNumber: "KBB 456B",
      type: "SUV",
    },
    dateTime: {
      date: "2024-03-22",
      startTime: "10:30",
      endTime: "14:30",
      duration: 4,
    },
    payment: {
      amount: 650,
      status: "paid",
      method: "Card",
    },
    status: "active",
  },
  {
    id: "B-12343",
    customer: {
      name: "Michael Omondi",
      phone: "+254 700 345 678",
      email: "michael.omondi@example.com",
    },
    parkingSpot: {
      name: "Kilimani Parking Complex",
      location: "Kilimani",
    },
    vehicle: {
      regNumber: "KCC 789C",
      type: "Sedan",
    },
    dateTime: {
      date: "2024-03-21",
      startTime: "08:00",
      endTime: "18:00",
      duration: 10,
    },
    payment: {
      amount: 1850,
      status: "paid",
      method: "M-Pesa",
    },
    status: "completed",
  },
  {
    id: "B-12342",
    customer: {
      name: "Jane Muthoni",
      phone: "+254 700 456 789",
      email: "jane.muthoni@example.com",
    },
    parkingSpot: {
      name: "CBD Parking Plaza",
      location: "Central Business District",
    },
    vehicle: {
      regNumber: "KDD 012D",
      type: "Hatchback",
    },
    dateTime: {
      date: "2024-03-21",
      startTime: "12:00",
      endTime: "15:00",
      duration: 3,
    },
    payment: {
      amount: 650,
      status: "paid",
      method: "M-Pesa",
    },
    status: "completed",
  },
  {
    id: "B-12341",
    customer: {
      name: "David Njoroge",
      phone: "+254 700 567 890",
      email: "david.njoroge@example.com",
    },
    parkingSpot: {
      name: "Upperhill Business Center",
      location: "Upperhill",
    },
    vehicle: {
      regNumber: "KEE 345E",
      type: "SUV",
    },
    dateTime: {
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "17:00",
      duration: 8,
    },
    payment: {
      amount: 1850,
      status: "paid",
      method: "Card",
    },
    status: "completed",
  },
  {
    id: "B-12340",
    customer: {
      name: "Lucy Wambui",
      phone: "+254 700 678 901",
      email: "lucy.wambui@example.com",
    },
    parkingSpot: {
      name: "Gigiri Embassy Parking",
      location: "Gigiri",
    },
    vehicle: {
      regNumber: "KFF 678F",
      type: "Sedan",
    },
    dateTime: {
      date: "2024-03-20",
      startTime: "10:00",
      endTime: "16:00",
      duration: 6,
    },
    payment: {
      amount: 1550,
      status: "paid",
      method: "M-Pesa",
    },
    status: "completed",
  },
  {
    id: "B-12339",
    customer: {
      name: "Peter Kimani",
      phone: "+254 700 789 012",
      email: "peter.kimani@example.com",
    },
    parkingSpot: {
      name: "Karen Shopping Center",
      location: "Karen",
    },
    vehicle: {
      regNumber: "KGG 901G",
      type: "Van",
    },
    dateTime: {
      date: "2024-03-23",
      startTime: "09:00",
      endTime: "12:00",
      duration: 3,
    },
    payment: {
      amount: 410,
      status: "pending",
      method: "M-Pesa",
    },
    status: "upcoming",
  },
]

export default function BookingsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const bookings = useQuery(api.booking.fetchReviews)
  const [users,setUsers] = useState([])
  useEffect(() => {
      const fetchUsers = async () => {
        await fetch('/api/user')
        .then((res) => res.json())
        .then(data => {        
          setUsers(data.data)
        })
        
      }
      fetchUsers()
    },[])
    

  if (bookings == undefined || users.length < 1) return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <Loader className='animate-spin'/>
    </div>
  )

  const joinedData = bookings.map(b => {
    const user = users.filter(u => b.userId === u.id);
    return {
      ...b,
      user: user || null,  // attach user data inside the spot
    };
  });

  console.log(joinedData);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">View and manage all parking bookings.</p>
        </div>
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      

      {/* Bookings Table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Button variant="ghost" className="gap-1 font-medium">
                    Location
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="gap-1 font-medium">
                    Vehicle
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="gap-1 font-medium">
                    Customer
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                
                <TableHead>
                  <Button variant="ghost" className="gap-1 font-medium">
                    Date & Time
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>                
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {joinedData.map((booking) => (
                <TableRow key={booking._id}>                                    
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.parkingSpot.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{booking.parkingSpot.location}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.vehicleNo}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{booking.vehicleType}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Avatar>
                        <AvatarImage src={booking.user[0].imageUrl}/>                        
                      </Avatar>
                      <p>{booking.user[0].firstName}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{booking.vehicleType}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{format(new Date(booking.date), "dd MMM yyyy")}</div>                    
                  </TableCell>
                 
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        booking.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : booking.status === "upcoming"
                            ? "bg-blue-500/10 text-blue-500"
                            : booking.status === "completed"
                              ? "bg-gray-500/10 text-gray-500"
                              : "bg-red-500/10 text-red-500"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Mark as Completed</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <X className="mr-2 h-4 w-4" />
                          <span>Cancel Booking</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{joinedData.length}</strong> of <strong>{joinedData.length}</strong> bookings
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

