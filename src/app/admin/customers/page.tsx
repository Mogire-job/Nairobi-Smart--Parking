'use client'

import {
    ArrowUpDown,
    Car,
    Download,
    Filter,
    Loader,
    Mail,
    MoreHorizontal,
    Phone,
    Plus,
    Search,
    Star,
    UserPlus,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import {getAllUsers,banUser,unBanUser,updateRole} from '@/lib/users'
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
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { join } from "path"
  
  // Mock data for customers
  const customers = [
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
  
  export default function CustomersPage() {
  const [data,setData] = useState(null)
  const bookings = useQuery(api.booking.fetchReviews)
      
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch('/api/user')
      .then((res) => res.json())
      .then(data => {        
        setData(data.data)
      })
      
    }
    fetchUsers()
  },[])
  
  if (data == undefined || bookings == undefined) return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Loader className='animate-spin'/>
    </div>
  )

  const joinedData = data.map(customer => {
    const booking = bookings.filter(u => u.userId === customer.id);
    return {
      ...customer,
      booking: booking || null,  // attach user data inside the spot
    };
  });

  console.log(joinedData);
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">View and manage your customer database.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-1">
              <UserPlus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>
  
        {/* Search and Filter */}
        
  
        {/* Customers Table */}
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" className="gap-1 font-medium">
                      Customer
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="gap-1 font-medium">
                      Contact
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="gap-1 font-medium">
                      Vehicles
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="gap-1 font-medium">
                      Join Date
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="gap-1 font-medium">
                      Bookings
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>                  
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {joinedData?.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={customer.imageUrl}/>
                          <AvatarFallback>
                            {customer.firstName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.firstName}</div>
                          <div className="text-xs">{customer.lastName}</div>
                          {/* <div className="text-xs text-muted-foreground">
                            Last booking: {format(new Date(customer.lastBooking), "dd MMM yyyy")}
                          </div> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{customer.emailAddresses[0].emailAddress}</span>
                        </div>                        
                      </div>
                    </TableCell>
                    <TableCell>
                      
                      <div className="flex items-center gap-1 text-sm">
                        <Car className="h-3.5 w-3.5 text-muted-foreground" />
                        {customer?.booking.length > 0 && (
                          <span>
                            {customer?.booking[0].vehicleNo} {customer?.booking.vehicleType}
                          </span>
                        )} 
                      </div>                                          
                    </TableCell>
                    <TableCell>{format(new Date(customer.createdAt), "dd MMM yyyy")}</TableCell>

                    <TableCell>{customer?.booking.length}</TableCell>                    
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          customer.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }
                      >
                        {customer.status === "active" ? "Active" : "Inactive"}
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
                          {customer.publicMetadata.role == 'admin' ?
                            <Button
                            onClick={() => updateRole({
                              user:customer.id,
                              role:'user'
                            })}
                            >Become user</Button>
                            :
                            <Button
                            onClick={() => updateRole({
                              user:customer.id,
                              role:'admin'
                            })}
                            >Become admin</Button>
                            }
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                          {customer.banned == false ?
                            <Button
                            onClick={() => banUser(customer.id)}
                            className="bg-destructive text-white">Ban user</Button>                            
                            :
                            <Button
                            onClick={() => unBanUser(customer.id)}
                            className="bg-green-600 text-white">Unban user</Button>                            
                            }
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
              Showing <strong>{joinedData.length}</strong> of <strong>{joinedData.length}</strong> customers
            </div>
            
          </CardFooter>
        </Card>
  
        {/* Customer Stats */}
        <div className="grid gap-6 md:grid-cols-3">          
  
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())                  
                  .map((customer) => (
                    <div key={customer.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.imageUrl}/>
                        <AvatarFallback>
                          {customer.firstName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{customer.firstName}</div>
                        <div className="text-xs text-muted-foreground">
                          Joined {format(new Date(customer.createdAt), "dd MMM yyyy")}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-5xl font-bold text-primary">4.8</div>
                <div className="mt-2 flex items-center gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Based on 124 reviews</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-sm">5 stars</div>
                  <div className="flex-1 rounded-full bg-muted">
                    <div className="h-2 w-[85%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-sm">85%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">4 stars</div>
                  <div className="flex-1 rounded-full bg-muted">
                    <div className="h-2 w-[10%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-sm">10%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">3 stars</div>
                  <div className="flex-1 rounded-full bg-muted">
                    <div className="h-2 w-[3%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-sm">3%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">2 stars</div>
                  <div className="flex-1 rounded-full bg-muted">
                    <div className="h-2 w-[1%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-sm">1%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">1 star</div>
                  <div className="flex-1 rounded-full bg-muted">
                    <div className="h-2 w-[1%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-sm">1%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  