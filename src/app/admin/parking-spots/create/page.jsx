"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {Label} from '@/components/ui/label'
import { z } from "zod"
import { ChevronLeft, Clock, ImagePlus, Loader2, MapPin, Save, Trash2,Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Loader } from "lucide-react"

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  address: z.string().min(5, { message: "Full address is required" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
  priceUnit: z.enum(["hour", "day", "month"], {
    required_error: "Please select a pricing unit",
  }),
  totalSpots: z.coerce.number().min(1, { message: "Total spots must be at least 1" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  openingHours: z.string().min(3, { message: "Opening hours are required" }),
  contactPhone: z.string().min(10, { message: "Valid contact phone is required" }),
  features: z.array(z.string()).min(1, { message: "Select at least one feature" }),
  status: z.enum(["active", "maintenance", "inactive"], {
    required_error: "Please select a status",
  }),
})

// Available features for parking spots
const availableFeatures = [
  "Security",
  "CCTV",
  "Covered",
  "24/7 Access",
  "Lighting",
  "Wheelchair Access",
  "EV Charging",
  "Valet",
  "Car Wash",
  "VIP Spaces",
  "Security Personnel",
  "Shopping Trolley Return",
]

export default function CreateParkingSpotPage() {
  const createParking = useMutation(api.parking.createTask)
  const generateUploadUrl = useMutation(api.parking.generateUploadUrl)

  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(false)
  const [storageIds, setStorageIds] = useState([])
  
  const [isLoading,setIsLoading] = useState(false)

  const [images, setImages] = useState([])
  const [name,setName] = useState('')
  const [location,setLocation] = useState('')
  const [price,setPrice] = useState(10)
  const [status,setStatus] = useState('')
  const [hours,setHours] = useState(2008)
  const [contact,setContact] = useState('')
  const [features,setFeatures] = useState('')
  const [description,setDescription] = useState('')
  const [spots,setSpots] = useState(4)
  
  

  const handleImageUpload = async (e) => {
    console.log(e.target.files);
    setImageLoading(true)
    const newImages = []
    if (e.target.files) {      
      for (let i = 0; i < e.target.files.length; i++) {
        const image = e.target.files[i]
        console.log(image.name);
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": image.type},
          body: image,
        });
        const { storageId } = await result.json();      
        setStorageIds(storageIds => [...storageIds, storageId])
        const urlSrc = URL.createObjectURL(image)        
        setImages(images => [...images,urlSrc])
      }
    }    
    setImageLoading(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()  
    const details = {
      name,
      location,      
      status,      
      price:Number(price),      
      spots:Number(spots),
      hours,
      contact,
      description,
      features:features.length > 1 ? features.split(",") : [''],
      images:storageIds.length > 1 ? storageIds.slice(1) : [''],
    }
    
    try {
      createParking(details)
      toast.success("Successful uploading")      
    } catch (error) {
      toast.error("Uploading failed",{description:error.message})
      console.log(error.message);
    }
  }

  

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 gap-1">
            <Link href="/admin/parking-spots">
              <ChevronLeft className="h-4 w-4" />
              Back to Parking Spots
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create Parking Spot</h1>
          <p className="text-muted-foreground">Add a new parking location to your inventory.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/parking-spots")}>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} disabled={isLoading} className="gap-1">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Parking Spot
              </>
            )}
          </Button>
        </div>
      </div>
      <Card>
          <CardHeader>
            <CardTitle>Parking Details</CardTitle>            
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Parking Name</Label>
                <Input id="name" placeholder="e.g. Nyakua parking" 
                onChange={(e) => {
                  setName(e.target.value) 
                }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Location</Label>
                <Input id="name" placeholder="e.g. Nairobi cbd" 
                onChange={(e) => {
                  setLocation(e.target.value) 
                }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Day (Ksh)</Label>
                <Input 
                id="price" type="number" placeholder="e.g. 150" 
                onChange={(e) => {
                  setPrice(e.target.value) 
                }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Spots</Label>
                <Input 
                id="year" type="number" placeholder="e.g. 50" 
                onChange={(e) => {
                  setSpots(e.target.value) 
                }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Hours</Label>
                <Input 
                id="mileage" type="text" placeholder="e.g. 24/7" 
                onChange={(e) => {
                  setHours(e.target.value) 
                }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Contact</Label>
                <Input 
                id="mileage" type="text" placeholder="e.g. 0712345678" 
                onChange={(e) => {
                  setContact(e.target.value) 
                }}
                />
              </div>
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Features</Label>
              <p>Please seperate features using comma</p>
              <Textarea
                id="description"
                placeholder="Enter car description and features..."
                onChange={(e) => {
                  setFeatures(e.target.value) 
                }}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter car description and features..."
                onChange={(e) => {
                  setDescription(e.target.value) 
                }}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Parking Images</Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Car image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    {imageLoading ? 
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Loader className="h-8 w-8 text-amber-400 animate-spin"/>
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer text-sm font-medium text-primary hover:underline"
                      >
                        Loading images
                      </Label>
                    </div>
                    :
                      <div className="flex flex-col items-center gap-1 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer text-sm font-medium text-primary hover:underline"
                      >
                        Upload Images
                      </Label>
                      </div>
                    }
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={imageLoading}                      
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>          
        </Card>
      
    </div>
  )
}
