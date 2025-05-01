import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  parkingSpots: defineTable({
    name: v.string(),
    location: v.string(),
    status: v.string(),
    images: v.optional(v.array(v.union(v.id("_storage"),v.string()))),
    price: v.number(),
    description: v.string(),
    spots: v.number(),
    hours: v.string(),
    contact: v.string(),
    features: v.array(v.string()),    
  }),
  booking: defineTable({
    userId:v.string(),
    parkingSpotId:v.id("parkingSpots"), 
    date: v.string(),    
    phone: v.string(),
    status: v.optional(v.string()),
    vehicleNo: v.string(),
    vehicleType: v.string(),    
  }).index("by_user", ["userId"]),
});