import { features } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("parkingSpots", 
    {
        name:args.name,
        location:args.location,
        status:args.status,
        images:args.images,
        price:args.price,
        description:args.description,
        spots:args.spots,
        contact:args.contact,
        features:args.features,
        hours:args.hours,
        
    });
    return newTaskId;
  },
});

export const fetchCars = query({
  args: {},
  handler: async (ctx, args) => {
    const cars = await ctx.db
    .query("parkingSpots")
    .order("desc")
    .collect()

    return Promise.all(
      cars.map(async (car) => ({
        ...car,
        images: await Promise.all(
          car?.images?.map(async (d) => await ctx.storage.getUrl(d))
        )        
      }))
    )
  },
});

export const fetchCarId = query({
    args: {
        id:v.id("parkingSpots")
    },
    handler: async (ctx, args) => {
      const cars = await ctx.db
      .query("parkingSpots")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .collect()
             
      
      return Promise.all(
        cars.map(async (car) => ({
          ...car,
          images: await Promise.all(
            car?.images?.map(async (d) => await ctx.storage.getUrl(d))
          )        
        }))
      )

    },
});

export const fetchCarById = query({
    args: {
        id:v.id("parkingSpots")
    },
    handler: async (ctx, args) => {
      const cars = ctx.db.get(args.id)
      return cars

    },
});

export const updateCar = mutation({
  args: {
    id:v.id("parkingSpots"),
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
  },
  handler: async (ctx, args) => {
    const {id} = args
    
    await ctx.db.replace(id,{
        name:args.name,
        location:args.location,
        status:args.status,
        images:args.images,
        price:args.price,
        description:args.description,
        spots:args.spots,
        contact:args.contact,
        features:args.features,
        hours:args.hours,
    })
  },
});

export const deleteCar = mutation({
  args: {
    id:v.id("parkingSpots"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});