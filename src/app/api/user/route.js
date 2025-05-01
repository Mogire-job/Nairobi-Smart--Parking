import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET (request){
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.getUserList()
    console.log(res);
    return Response.json(res)
  } catch (err) {
    return Response.json(err)
  }

}

