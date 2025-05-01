import { format } from "date-fns"

// Define interfaces for all data types
export interface ParkingSpot {
  id: number
  name: string
  location: string
  address: string
  price: number
  priceUnit: string
  rating: number
  noReviews: number
  distance: number
  available: number
  total: number
  images: string[]
  features: string[]
  description: string
  openingHours: string
  contactPhone: string
  reviews: Review[]
  status: "active" | "maintenance" | "inactive"
}

export interface Review {
  id: number
  name: string
  date: string
  rating: number
  comment: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  joinDate: string
  bookings: number
  totalSpent: number
  status: "active" | "inactive"
  vehicles: Vehicle[]
  lastBooking: string
}

export interface Vehicle {
  regNumber: string
  type: string
}

export interface Booking {
  id: string
  customer: {
    name: string
    phone: string
    email: string
  }
  parkingSpot: {
    id: number
    name: string
    location: string
  }
  vehicle: Vehicle
  dateTime: {
    date: string
    startTime: string
    endTime: string
    duration: number
  }
  payment: {
    amount: number
    status: "paid" | "pending" | "failed"
    method: string
  }
  status: "active" | "upcoming" | "completed" | "cancelled"
}

export interface DashboardStats {
  totalRevenue: number
  totalBookings: number
  totalCustomers: number
  totalParkingSpots: number
  occupancyRate: number
  revenueGrowth: number
  popularLocations: {
    location: string
    bookings: number
  }[]
  recentTransactions: {
    id: string
    customer: string
    amount: number
    date: string
    method: string
  }[]
}

// Mock data for parking spots
export const parkingSpots: ParkingSpot[] = [
  {
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
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
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
    status: "active",
  },
  {
    id: 2,
    name: "Westlands Secure Parking",
    location: "Westlands, Nairobi",
    address: "Waiyaki Way, Westlands",
    price: 150,
    priceUnit: "hour",
    rating: 4.6,
    noReviews: 98,
    distance: 1.2,
    available: 8,
    total: 30,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Security", "24/7 Access", "EV Charging", "CCTV", "Lighting"],
    description:
      "Conveniently located in Westlands, this parking facility offers secure parking with 24/7 access. Features include EV charging stations, CCTV surveillance, and professional security personnel. Perfect for shoppers and business professionals in the Westlands area.",
    openingHours: "24/7",
    contactPhone: "+254 700 111 111",
    reviews: [
      {
        id: 1,
        name: "David Njoroge",
        date: "1 week ago",
        rating: 5,
        comment: "Great parking facility with EV charging. Very convenient for my Tesla.",
      },
      {
        id: 2,
        name: "Lucy Wambui",
        date: "3 weeks ago",
        rating: 4,
        comment: "Secure and well-lit. I feel safe parking here even late at night.",
      },
    ],
    status: "active",
  },
  {
    id: 3,
    name: "Kilimani Parking Complex",
    location: "Kilimani, Nairobi",
    address: "Argwings Kodhek Road, Kilimani",
    price: 180,
    priceUnit: "hour",
    rating: 4.5,
    noReviews: 76,
    distance: 2.3,
    available: 15,
    total: 40,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["CCTV", "Covered", "Wheelchair Access", "Security", "Lighting"],
    description:
      "A modern parking complex in the upscale Kilimani area. This facility offers covered parking to protect your vehicle from the elements. With wheelchair accessibility and comprehensive security measures, it caters to all your parking needs.",
    openingHours: "6:00 - 22:00",
    contactPhone: "+254 700 222 222",
    reviews: [
      {
        id: 1,
        name: "Peter Kimani",
        date: "1 month ago",
        rating: 4,
        comment: "Clean and well-maintained. Appreciate the covered parking during rainy season.",
      },
      {
        id: 2,
        name: "Jane Muthoni",
        date: "2 months ago",
        rating: 5,
        comment: "The wheelchair accessibility is excellent. Staff are always helpful.",
      },
    ],
    status: "active",
  },
  {
    id: 4,
    name: "Upperhill Business Center",
    location: "Upperhill, Nairobi",
    address: "Hospital Road, Upperhill",
    price: 220,
    priceUnit: "hour",
    rating: 4.7,
    noReviews: 112,
    distance: 1.8,
    available: 20,
    total: 60,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Security", "CCTV", "Valet", "Covered", "Car Wash", "24/7 Access"],
    description:
      "Premium parking in Nairobi's business district of Upperhill. This facility offers valet parking and car wash services for busy professionals. With 24/7 access and tight security, it's the perfect solution for corporate clients and hospital visitors.",
    openingHours: "24/7",
    contactPhone: "+254 700 333 333",
    reviews: [
      {
        id: 1,
        name: "Robert Maina",
        date: "3 weeks ago",
        rating: 5,
        comment: "The valet service is excellent. Makes my hospital visits much less stressful.",
      },
      {
        id: 2,
        name: "Grace Akinyi",
        date: "1 month ago",
        rating: 4,
        comment: "Convenient location for business meetings in Upperhill. Car wash service is a plus.",
      },
    ],
    status: "active",
  },
  {
    id: 5,
    name: "Gigiri Embassy Parking",
    location: "Gigiri, Nairobi",
    address: "UN Avenue, Gigiri",
    price: 250,
    priceUnit: "hour",
    rating: 4.9,
    noReviews: 87,
    distance: 5.2,
    available: 5,
    total: 25,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Security", "CCTV", "24/7", "Covered", "VIP Spaces", "Security Personnel"],
    description:
      "High-security parking facility in the diplomatic district of Gigiri. With enhanced security measures and VIP spaces, this parking lot caters to embassy visitors and diplomatic personnel. The facility is monitored 24/7 with armed security guards.",
    openingHours: "24/7",
    contactPhone: "+254 700 444 444",
    reviews: [
      {
        id: 1,
        name: "Ambassador Johnson",
        date: "2 weeks ago",
        rating: 5,
        comment: "Excellent security measures. I feel confident leaving my diplomatic vehicle here.",
      },
      {
        id: 2,
        name: "UN Staff Member",
        date: "1 month ago",
        rating: 5,
        comment: "Convenient for UN compound visits. Security is top-notch.",
      },
    ],
    status: "active",
  },
  {
    id: 6,
    name: "Karen Shopping Center",
    location: "Karen, Nairobi",
    address: "Karen Road, Karen",
    price: 120,
    priceUnit: "hour",
    rating: 4.3,
    noReviews: 65,
    distance: 8.7,
    available: 30,
    total: 100,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Free for customers", "CCTV", "Security", "Open Air", "Shopping Trolley Return"],
    description:
      "Spacious parking at Karen Shopping Center. Free for the first 2 hours for customers of the shopping center. This open-air parking lot offers ample space and is monitored by CCTV cameras. Convenient shopping trolley return points are available throughout the parking area.",
    openingHours: "8:00 - 20:00",
    contactPhone: "+254 700 555 555",
    reviews: [
      {
        id: 1,
        name: "Susan Wangari",
        date: "1 week ago",
        rating: 4,
        comment: "Plenty of space and free if you're shopping. Very convenient.",
      },
      {
        id: 2,
        name: "Thomas Ochieng",
        date: "1 month ago",
        rating: 3,
        comment: "Gets crowded on weekends, but generally good for shopping trips.",
      },
    ],
    status: "maintenance",
  },
]

// Mock data for customers
export const customers: Customer[] = [
  {
    id: 1,
    name: "John Kamau",
    email: "john.kamau@example.com",
    phone: "+254 700 123 456",
    joinDate: "2023-10-15",
    bookings: 12,
    totalSpent: 24600,
    status: "active",
    vehicles: [{ regNumber: "KAA 123A", type: "Sedan" }],
    lastBooking: "2024-03-22",
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    email: "sarah.wanjiku@example.com",
    phone: "+254 700 234 567",
    joinDate: "2023-11-03",
    bookings: 8,
    totalSpent: 15200,
    status: "active",
    vehicles: [{ regNumber: "KBB 456B", type: "SUV" }],
    lastBooking: "2024-03-22",
  },
  {
    id: 3,
    name: "Michael Omondi",
    email: "michael.omondi@example.com",
    phone: "+254 700 345 678",
    joinDate: "2023-12-18",
    bookings: 5,
    totalSpent: 9500,
    status: "active",
    vehicles: [{ regNumber: "KCC 789C", type: "Sedan" }],
    lastBooking: "2024-03-21",
  },
  {
    id: 4,
    name: "Jane Muthoni",
    email: "jane.muthoni@example.com",
    phone: "+254 700 456 789",
    joinDate: "2024-01-05",
    bookings: 3,
    totalSpent: 5700,
    status: "active",
    vehicles: [{ regNumber: "KDD 012D", type: "Hatchback" }],
    lastBooking: "2024-03-21",
  },
  {
    id: 5,
    name: "David Njoroge",
    email: "david.njoroge@example.com",
    phone: "+254 700 567 890",
    joinDate: "2024-01-22",
    bookings: 4,
    totalSpent: 7600,
    status: "active",
    vehicles: [{ regNumber: "KEE 345E", type: "SUV" }],
    lastBooking: "2024-03-20",
  },
  {
    id: 6,
    name: "Lucy Wambui",
    email: "lucy.wambui@example.com",
    phone: "+254 700 678 901",
    joinDate: "2024-02-08",
    bookings: 2,
    totalSpent: 3800,
    status: "active",
    vehicles: [{ regNumber: "KFF 678F", type: "Sedan" }],
    lastBooking: "2024-03-20",
  },
  {
    id: 7,
    name: "Peter Kimani",
    email: "peter.kimani@example.com",
    phone: "+254 700 789 012",
    joinDate: "2024-02-15",
    bookings: 1,
    totalSpent: 1200,
    status: "active",
    vehicles: [{ regNumber: "KGG 901G", type: "Van" }],
    lastBooking: "2024-03-23",
  },
]

// Mock data for bookings
export const bookings: Booking[] = [
  {
    id: "B-12345",
    customer: {
      name: "John Kamau",
      phone: "+254 700 123 456",
      email: "john.kamau@example.com",
    },
    parkingSpot: {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 1,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

// Mock data for dashboard stats
export const dashboardStats: DashboardStats = {
  totalRevenue: 156000,
  totalBookings: 35,
  totalCustomers: 7,
  totalParkingSpots: 6,
  occupancyRate: 68,
  revenueGrowth: 12.5,
  popularLocations: [
    {
      location: "CBD",
      bookings: 15,
    },
    {
      location: "Westlands",
      bookings: 8,
    },
    {
      location: "Upperhill",
      bookings: 6,
    },
    {
      location: "Kilimani",
      bookings: 4,
    },
    {
      location: "Gigiri",
      bookings: 2,
    },
  ],
  recentTransactions: [
    {
      id: "T-12345",
      customer: "John Kamau",
      amount: 1650,
      date: "2024-03-22",
      method: "M-Pesa",
    },
    {
      id: "T-12344",
      customer: "Sarah Wanjiku",
      amount: 650,
      date: "2024-03-22",
      method: "Card",
    },
    {
      id: "T-12343",
      customer: "Michael Omondi",
      amount: 1850,
      date: "2024-03-21",
      method: "M-Pesa",
    },
    {
      id: "T-12342",
      customer: "Jane Muthoni",
      amount: 650,
      date: "2024-03-21",
      method: "M-Pesa",
    },
    {
      id: "T-12341",
      customer: "David Njoroge",
      amount: 1850,
      date: "2024-03-20",
      method: "Card",
    },
  ],
}

// Helper functions for data manipulation
export function getParkingSpotById(id: number): ParkingSpot | undefined {
  return parkingSpots.find((spot) => spot.id === id)
}

export function getCustomerById(id: number): Customer | undefined {
  return customers.find((customer) => customer.id === id)
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((booking) => booking.id === id)
}

export function getBookingsByCustomerId(customerId: number): Booking[] {
  const customer = getCustomerById(customerId)
  if (!customer) return []

  return bookings.filter((booking) => booking.customer.email === customer.email)
}

export function getBookingsByParkingSpotId(parkingSpotId: number): Booking[] {
  return bookings.filter((booking) => booking.parkingSpot.id === parkingSpotId)
}

export function formatCurrency(amount: number): string {
  return `KSh ${amount.toLocaleString()}`
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd MMM yyyy")
}

export function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  let hours = endHour - startHour
  let minutes = endMinute - startMinute

  if (minutes < 0) {
    hours -= 1
    minutes += 60
  }

  return hours + minutes / 60
}

export function calculatePrice(duration: number, pricePerHour: number): number {
  return Math.ceil(duration * pricePerHour)
}

// Search and filter functions
export function searchParkingSpots(query: string): ParkingSpot[] {
  const lowercaseQuery = query.toLowerCase()
  return parkingSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(lowercaseQuery) ||
      spot.location.toLowerCase().includes(lowercaseQuery) ||
      spot.address.toLowerCase().includes(lowercaseQuery) ||
      spot.features.some((feature) => feature.toLowerCase().includes(lowercaseQuery)),
  )
}

export function filterParkingSpotsByStatus(status: "active" | "maintenance" | "inactive" | "all"): ParkingSpot[] {
  if (status === "all") return parkingSpots
  return parkingSpots.filter((spot) => spot.status === status)
}

export function searchBookings(query: string): Booking[] {
  const lowercaseQuery = query.toLowerCase()
  return bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(lowercaseQuery) ||
      booking.customer.name.toLowerCase().includes(lowercaseQuery) ||
      booking.customer.phone.includes(query) ||
      booking.customer.email.toLowerCase().includes(lowercaseQuery) ||
      booking.parkingSpot.name.toLowerCase().includes(lowercaseQuery) ||
      booking.vehicle.regNumber.toLowerCase().includes(lowercaseQuery),
  )
}

export function filterBookingsByStatus(status: "active" | "upcoming" | "completed" | "cancelled" | "all"): Booking[] {
  if (status === "all") return bookings
  return bookings.filter((booking) => booking.status === status)
}

export function filterBookingsByDate(date: Date): Booking[] {
  const dateString = format(date, "yyyy-MM-dd")
  return bookings.filter((booking) => booking.dateTime.date === dateString)
}

export function searchCustomers(query: string): Customer[] {
  const lowercaseQuery = query.toLowerCase()
  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.email.toLowerCase().includes(lowercaseQuery) ||
      customer.phone.includes(query) ||
      customer.vehicles.some((vehicle) => vehicle.regNumber.toLowerCase().includes(lowercaseQuery)),
  )
}

export function filterCustomersByStatus(status: "active" | "inactive" | "all"): Customer[] {
  if (status === "all") return customers
  return customers.filter((customer) => customer.status === status)
}

export function filterCustomersByJoinDate(days: number): Customer[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return customers.filter((customer) => {
    const joinDate = new Date(customer.joinDate)
    return joinDate >= cutoffDate
  })
}

// Get new customers (joined in the last 30 days)
export const newCustomers = filterCustomersByJoinDate(30)

// Get top customers by spending
export const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5)

// Get most popular parking spots
export const popularParkingSpots = [...parkingSpots]
  .map((spot) => ({
    ...spot,
    bookingCount: getBookingsByParkingSpotId(spot.id).length,
  }))
  .sort((a, b) => b.bookingCount - a.bookingCount)

