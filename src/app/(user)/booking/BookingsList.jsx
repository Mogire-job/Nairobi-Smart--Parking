'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Car, Loader, MapIcon, Phone } from 'lucide-react'
import { format } from "date-fns"

const BookingsList = ({user}) => {
    const bookings = useQuery(api.booking.fetchReviewId,{userId:user})
    if (bookings == undefined) return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Loader className='animate-spin'/>
        </div>
    )
  return (
    <div className='flex flex-col gap-4.5'>
        {bookings.map((d) => (
            <div key={d._id} className='shadow-md rounded-md hover:bg-slate-900 hover:text-white p-2 relative'>
                <div className='space-y-1'>
                    <p className='font-semibold text-lg'>{d.parkingSpot.name}</p>
                    <div className='flex items-center gap-2'>
                        <MapIcon/>
                        <p className='text-sm font-semibold'>{d.parkingSpot.location}</p>
                    </div>
                </div>
                <div className='flex gap-4 pt-4'>
                    <div className='flex items-center gap-2'>
                        <Car/>
                        <p>{d.vehicleNo}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Phone/>                        
                        <p>{d.parkingSpot.contact}</p>
                    </div>
                </div>
                <p className='absolute text-sm font-semibold top-0 right-2.5'>{format(new Date(d._creationTime), "dd MMM yyyy")}</p>                
                
            </div>
        ))}
    </div>
  )
}

export default BookingsList