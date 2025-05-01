"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Clock, Filter, ListFilter, Loader, MapPin, Search, Star, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

// Mock data for parking spots
const parkingSpots = [
  {
    id: 1,
    name: "CBD Parking Plaza",
    location: "Central Business District",
    price: 200,
    priceUnit: "hour",
    rating: 4.8,
    reviews: 124,
    distance: 0.5,
    available: 12,
    total: 50,
    image: "https://images.unsplash.com/photo-1693054367370-41ccf4dc8674?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    features: ["Security", "CCTV", "Covered"],
  },
  {
    id: 2,
    name: "Westlands Secure Parking",
    location: "Westlands",
    price: 150,
    priceUnit: "hour",
    rating: 4.6,
    reviews: 98,
    distance: 1.2,
    available: 8,
    total: 30,
    image: "https://plus.unsplash.com/premium_photo-1724766409767-120f58295b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    features: ["Security", "24/7", "EV Charging"],
  },
  {
    id: 3,
    name: "Kilimani Parking Complex",
    location: "Kilimani",
    price: 180,
    priceUnit: "hour",
    rating: 4.7,
    reviews: 112,
    distance: 0.8,
    available: 15,
    total: 40,
    image: "https://images.unsplash.com/photo-1615050375254-db93e6e4bc88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    features: ["CCTV", "Covered", "Wheelchair Access"],
  },
  {
    id: 4,
    name: "Upperhill Business Center",
    location: "Upperhill",
    price: 220,
    priceUnit: "hour",
    rating: 4.5,
    reviews: 87,
    distance: 1.5,
    available: 20,
    total: 60,
    image: "https://plus.unsplash.com/premium_photo-1661962667495-c9dd5c790758?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
    features: ["Security", "CCTV", "Valet"],
  },
  {
    id: 5,
    name: "Gigiri Embassy Parking",
    location: "Gigiri",
    price: 250,
    priceUnit: "hour",
    rating: 4.9,
    reviews: 145,
    distance: 3.2,
    available: 5,
    total: 25,
    image: "https://images.unsplash.com/photo-1621395189638-dc2aae7cd308?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc4fHxjYXIlMjBwYXJraWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    features: ["Security", "CCTV", "24/7", "Covered"],
  },
  {
    id: 6,
    name: "Karen Shopping Center",
    location: "Karen",
    price: 120,
    priceUnit: "hour",
    rating: 4.4,
    reviews: 76,
    distance: 5.7,
    available: 30,
    total: 100,
    image: "https://images.unsplash.com/photo-1731681822131-cd7e66ee0738?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkxfHxjYXIlMjBwYXJraWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    features: ["Free for customers", "CCTV"],
  },
]

export default function SearchPage() {
  const parkingSpots = useQuery(api.parking.fetchCars)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("distance")


  if (parkingSpots == undefined) return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Loader className='animate-spin'/>
      </div>
  )
  // Filter parking spots based on search and filters
  const filteredSpots = parkingSpots.filter((spot) => {
    // Filter by search query
    if (
      searchQuery &&
      !spot.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !spot.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by price range
    if (spot.price < priceRange[0] || spot.price > priceRange[1]) {
      return false
    }

    // Filter by selected features
    if (selectedFeatures.length > 0 && !selectedFeatures.every((feature) => spot.features.includes(feature))) {
      return false
    }

    return true
  })

  // Sort filtered spots
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "availability":
        return b.available - a.available
      case "distance":
      default:
        return a.distance - b.distance
    }
  })

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto px-5">
      <h1 className="mb-6 text-3xl font-bold">Find Parking in Nairobi</h1>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by location or parking name"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="availability">Availability</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your parking search</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-4">
                <h3 className="font-medium">Price Range (KSh per hour)</h3>
                <div className="space-y-2">
                  <Slider value={priceRange} min={0} max={300} step={10} onValueChange={setPriceRange} />
                  <div className="flex items-center justify-between">
                    <span>KSh {priceRange[0]}</span>
                    <span>KSh {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Features</h3>
                <div className="grid gap-3">
                  {["Security", "CCTV", "Covered", "24/7", "EV Charging", "Valet", "Wheelchair Access"].map(
                    (feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 300])
                    setSelectedFeatures([])
                  }}
                >
                  Reset Filters
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* View Tabs */}
      <Tabs defaultValue="list">
        <div className="mb-6 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <ListFilter className="h-4 w-4" />
              List View
            </TabsTrigger>            
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {sortedSpots.length} of {parkingSpots.length} parking spots
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedSpots.map((spot) => (
              <Card key={spot._id} className="overflow-hidden pt-0">
                <div className="relative h-48">
                  <Image src={spot.images[0] || "/placeholder.svg"} alt={spot.name} fill className="object-cover" />
                  <div className="absolute right-2 top-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      KSh {spot.price}/ day
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{spot.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" /> {spot.location}
                      </CardDescription>
                    </div>
                    {/* <div className="flex items-center text-sm">
                      <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                      <span>{spot.rating}</span>
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {spot.spots}/{spot.spots} spots
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{spot.distance} km away</span>
                    </div> */}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {spot.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Available 24/7</span>
                  </div>
                  <Button asChild>
                    <Link href={`/parking/${spot._id}`}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <div className="rounded-lg border bg-muted/40 p-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Interactive map view would be displayed here, showing all parking locations
                </p>
              </div>
              {/* Map would be implemented here with a mapping library like Google Maps or Mapbox */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

