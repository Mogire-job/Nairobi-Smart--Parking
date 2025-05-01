"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Car, Check, Clock, Download, Home, MapPin, QrCode, Share } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("ref") || "NP12345678"

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your parking spot has been successfully reserved. Details have been sent to your phone.
        </p>
      </div>

      <Card className="mb-8 overflow-hidden">
        <div className="bg-primary px-6 py-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">CBD Parking Plaza</h2>
              <p className="text-primary-foreground/80">Central Business District, Nairobi</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Booking ID</div>
              <div className="font-mono">{bookingId}</div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Friday, March 22, 2024</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>09:00 - 17:00 (8 hours)</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Vehicle</div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span>KAA 123A (Sedan)</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Level 2, Zone B</span>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="mb-2 text-center text-sm font-medium">Check-in QR Code</div>
            <div className="relative mb-2 h-48 w-48 overflow-hidden rounded-lg bg-white p-2">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="QR Code"
                width={200}
                height={200}
                className="h-full w-full"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Show this QR code at the entrance for contactless check-in
            </p>
          </div>

          <div className="rounded-md bg-muted p-4">
            <div className="mb-2 font-medium">Payment Summary</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Parking Fee (8 hours)</span>
                <span className="text-sm">KSh 1,600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service Fee</span>
                <span className="text-sm">KSh 50</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total Paid</span>
                <span>KSh 1,650</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-4 bg-muted/30 px-6 py-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="gap-2">
            <Share className="h-4 w-4" />
            Share Details
          </Button>
          <Button variant="outline" className="gap-2">
            <QrCode className="h-4 w-4" />
            Save to Wallet
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">Important Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Check-in:</strong> Scan the QR code at the entrance barrier or show it to the attendant.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Directions:</strong> Use the in-app navigation to find the exact location of your parking spot.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Cancellation:</strong> Free cancellation up to 1 hour before your booking time.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Support:</strong> Call 0700 000 000 if you need any assistance during your parking experience.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/bookings" className="gap-2">
            <Clock className="h-4 w-4" />
            View My Bookings
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

