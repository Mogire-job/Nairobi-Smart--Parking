'use client'
import Image from "next/image"
import { ArrowUpDown, Edit, Filter, Loader, MapPin, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useState } from "react"

// Mock data for parking spots
const parkingSpots = [
  {
    id: 1,
    name: "CBD Parking Plaza",
    location: "Central Business District",
    address: "Kimathi Street, Nairobi CBD",
    totalSpots: 50,
    availableSpots: 12,
    pricePerHour: 200,
    features: ["Security", "CCTV", "Covered"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Westlands Secure Parking",
    location: "Westlands",
    address: "Waiyaki Way, Westlands",
    totalSpots: 30,
    availableSpots: 8,
    pricePerHour: 150,
    features: ["Security", "24/7", "EV Charging"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Kilimani Parking Complex",
    location: "Kilimani",
    address: "Argwings Kodhek Road, Kilimani",
    totalSpots: 40,
    availableSpots: 15,
    pricePerHour: 180,
    features: ["CCTV", "Covered", "Wheelchair Access"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Upperhill Business Center",
    location: "Upperhill",
    address: "Hospital Road, Upperhill",
    totalSpots: 60,
    availableSpots: 20,
    pricePerHour: 220,
    features: ["Security", "CCTV", "Valet"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Gigiri Embassy Parking",
    location: "Gigiri",
    address: "UN Avenue, Gigiri",
    totalSpots: 25,
    availableSpots: 5,
    pricePerHour: 250,
    features: ["Security", "CCTV", "24/7", "Covered"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Karen Shopping Center",
    location: "Karen",
    address: "Karen Road, Karen",
    totalSpots: 100,
    availableSpots: 30,
    pricePerHour: 120,
    features: ["Free for customers", "CCTV"],
    status: "maintenance",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ParkingSpotsPage() {
  const parkingSpots = useQuery(api.parking.fetchCars)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const deleteCar = useMutation(api.parking.deleteCar)
  // Filter and search parking spots
  
  if (parkingSpots == undefined) return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Loader className='animate-spin'/>
    </div>
  )
  console.log(parkingSpots);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parking Spots</h1>
          <p className="text-muted-foreground">Manage your parking locations and their details.</p>
        </div>
        <Link href='/admin/parking-spots/create'>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Parking Spot
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search parking spots..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {/* Parking Spots Views */}
      <Tabs defaultValue="table">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">Showing {parkingSpots.length} parking spots</div>
        </div>

        {/* Table View */}
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <Button variant="ghost" className="gap-1 font-medium">
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="gap-1 font-medium">
                        Location
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-center">
                      <Button variant="ghost" className="gap-1 font-medium">
                        Capacity
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-center">
                      <Button variant="ghost" className="gap-1 font-medium">
                        Price
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parkingSpots.map((spot) => (
                    <TableRow key={spot._id}>
                      <TableCell className="font-medium">{spot.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{spot.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{spot.spots}</span>
                        <span className="text-muted-foreground">/{spot.spots}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        KSh {spot.price}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={
                            spot.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : spot.status === "maintenance"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }
                        >
                          {spot.status === "active"
                            ? "Active"
                            : spot.status === "maintenance"
                              ? "Maintenance"
                              : "Inactive"}
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
                            <Link href={`/admin/parking-spots/edit/${spot._id}`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                            </Link>                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                            onClick={() => deleteCar({id:spot._id}) }
                            className="text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
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
                Showing <strong>{parkingSpots.length}</strong> of <strong>{parkingSpots.length}</strong> parking spots
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
        </TabsContent>

        {/* Grid View */}
        <TabsContent value="grid" className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parkingSpots.map((spot) => (
              <Card key={spot._id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={spot.images[0] || "/placeholder.svg"} alt={spot.name} fill className="object-cover" />
                  <div className="absolute right-2 top-2">
                    <Badge
                      variant="outline"
                      className={
                        spot.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : spot.status === "maintenance"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }
                    >
                      {spot.status === "active" ? "Active" : spot.status === "maintenance" ? "Maintenance" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{spot.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {spot.location}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/parking-spots/edit/${spot._id}`}>
                        
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        </Link>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                        onClick={() => deleteCar({id:spot._id}) }
                        className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-medium">
                        {spot.spots}/{spot.spots} spots
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium">
                        KSh {spot.price} per day
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {spot.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                    {spot.features.length > 3 && <Badge variant="outline">+{spot.features.length - 3} more</Badge>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                <Link href={`/admin/parking-spots/edit/${spot._id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                </Link>
                  
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

