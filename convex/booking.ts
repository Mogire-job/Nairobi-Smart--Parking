import { features } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createReview = mutation({
  args: {
    userId:v.string(),
    parkingSpotId:v.id("parkingSpots"),        
    date: v.string(),
    phone: v.string(),
    vehicleNo: v.string(),
    vehicleType: v.string(),   
    status: v.optional(v.string()),   
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("booking", 
    {
        userId:args.userId,        
        parkingSpotId:args.parkingSpotId,        
        date:args.date,       
        phone:args.phone,        
        vehicleNo:args.vehicleNo,        
        vehicleType:args.vehicleType,                      
        status:args.status,                      
    });
    return newTaskId;
  },
});

export const fetchReviews = query({
  args: {},
  handler: async (ctx, args) => {
    const bookings = await ctx.db
    .query("booking")
    .order("desc")
    .collect()

    return Promise.all(
      bookings.map(async (booking) => {
        const parkingSpot = await ctx.db.get(booking.parkingSpotId);
        return {
          ...booking,
          parkingSpot
        };
      })
    );
  },
});

export const fetchReviewId = query({
    args: {
        userId:v.string()
    },
    handler: async (ctx, args) => {
      const bookings = await ctx.db
      .query("booking")
      .withIndex("by_user", (q) => q.eq("userId",args.userId))
      .collect()
             
      
      return Promise.all(
        bookings.map(async (booking) => {
          const parkingSpot = await ctx.db.get(booking.parkingSpotId);
          return {
            ...booking,
            parkingSpot
          };
        })
      );

    },
});


export const deleteReview = mutation({
  args: {
    id:v.id("booking"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});

