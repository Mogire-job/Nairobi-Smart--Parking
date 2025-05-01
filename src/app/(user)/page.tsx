import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Car, Clock, CreditCard, MapPin, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pb-16 pt-24 md:pb-24 md:pt-32 px-20">
        <div className="container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find and Book Parking in Nairobi with Ease
            </h1>
            <p className="text-xl text-muted-foreground">
              Nai Park helps you discover, reserve, and pay for parking spots across Nairobi in seconds.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/search">Find Parking Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-video w-full max-w-lg rounded-lg bg-muted shadow-xl md:ml-auto">
            <Image
              src="https://plus.unsplash.com/premium_photo-1720122990982-016b23b40d65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwcGFya2lpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Nai Park App Interface"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      {/* <section className="container -mt-8 md:-mt-16 max-w-5xl mx-auto px-3">
        <Card className="border-primary/10 bg-card/95 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle>Quick Search</CardTitle>
            <CardDescription>Find available parking spots near your destination</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Enter location or landmark" className="pl-10" />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>
      </section> */}

      {/* Features Section */}
      <section className="container py-16 md:py-24 max-w-5xl mx-auto px-3">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Nai Park?</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            We make parking in Nairobi simple, secure, and stress-free with our innovative features.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Real-Time Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                See which parking spots are available right now, with live updates as spaces fill up or become vacant.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Easy Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pay securely via M-Pesa and other methods. No need for cash or waiting in payment queues.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Guaranteed Spots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your reserved spot is guaranteed. No more driving around looking for parking or worrying about full
                lots.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Star className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Loyalty Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Earn points with every booking and redeem them for free parking, discounts, and other perks.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Car className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Multiple Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access hundreds of parking spots across Nairobi, from CBD to residential areas and shopping centers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Navigation Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get turn-by-turn directions to your parking spot, making it easy to find even in unfamiliar areas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Parking Spots */}
      <section className="bg-muted/50 py-16 md:py-24 px-5">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Parking Spots</h2>
              <p className="mt-2 text-muted-foreground">Popular and highly-rated parking locations in Nairobi</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/search">
                View All Locations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "CBD Parking Plaza",
                location: "Central Business District",
                price: "KSh 200/hour",
                rating: 4.8,
                reviews: 124,
                image: "https://images.unsplash.com/photo-1582069768435-d41ecb2dd2ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
              },
              {
                name: "Westlands Secure Parking",
                location: "Westlands",
                price: "KSh 150/hour",
                rating: 4.6,
                reviews: 98,
                image: "https://images.unsplash.com/photo-1576421092266-cb93079b3e82?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
              },
              {
                name: "Kilimani Parking Complex",
                location: "Kilimani",
                price: "KSh 180/hour",
                rating: 4.7,
                reviews: 112,
                image: "https://images.unsplash.com/photo-1712405294399-0a121ea8a5e0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhciUyMHBhcmtpaW5nfGVufDB8fDB8fHww",
              },
            ].map((spot, index) => (
              <Card key={index} className="overflow-hidden pt-0">
                <div className="relative h-48">
                  <Image src={spot.image || "/placeholder.svg"} alt={spot.name} fill className="object-cover" />
                  <div className="absolute right-2 top-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {spot.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{spot.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" /> {spot.location}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                    <span>
                      {spot.rating} ({spot.reviews} reviews)
                    </span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/parking/${index}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16 md:py-24 max-w-5xl mx-auto px-3">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            Booking a parking spot with Nai Park is quick and easy. Follow these simple steps:
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: 1,
              title: "Search",
              description: "Enter your destination or browse the map to find available parking spots near you.",
              icon: MapPin,
            },
            {
              step: 2,
              title: "Book",
              description: "Select your preferred parking spot, choose your time slot, and confirm your booking.",
              icon: Clock,
            },
            {
              step: 3,
              title: "Park",
              description: "Use the app to navigate to your spot, scan the QR code on arrival, and enjoy your day!",
              icon: Car,
            },
          ].map((item) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
              <item.icon className="my-4 h-10 w-10 text-primary" />
              <p className="text-muted-foreground">{item.description}</p>
              {item.step < 3 && (
                <ArrowRight className="absolute -right-4 top-8 hidden h-8 w-8 text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/search">Find Parking Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-16 md:py-24 max-w-5xl mx-auto px-3">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Don't just take our word for it. Here's what Nai Park users have to say about their experience.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Kamau",
                location: "Nairobi CBD",
                quote:
                  "Nai Park has saved me so much time and stress. I used to spend 30 minutes looking for parking, now I book in seconds!",
                rating: 5,
              },
              {
                name: "Sarah Wanjiku",
                location: "Westlands",
                quote:
                  "The real-time availability feature is a game-changer. I always know exactly where I can park before I even leave home.",
                rating: 5,
              },
              {
                name: "Michael Omondi",
                location: "Kilimani",
                quote:
                  "M-Pesa integration makes payments so easy, and the loyalty program has already earned me free parking twice!",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-primary/10">
                <CardHeader>
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24 max-w-5xl mx-auto px-3">
        <div className="rounded-lg bg-primary p-8 text-primary-foreground md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Park Smarter?</h2>
            <p className="mb-8 text-primary-foreground/90">
              Join thousands of Nairobians who have simplified their parking experience with Nai Park.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/search">Find Parking Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/register">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

