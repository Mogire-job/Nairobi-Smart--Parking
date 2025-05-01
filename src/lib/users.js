'use server'
import { auth, clerkClient } from '@clerk/nextjs/server'

export const getAllUsers = async () => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.getUserList()
    console.log(res);
    return res
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}

export const banUser = async (user) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.banUser(user)
    console.log(res);    
    return "banned"
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}

export const unBanUser = async (user) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.unbanUser(user)
    console.log(res);    
    return "banned"
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}

export const updateRole = async ({user,role}) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUserMetadata(user,{
      publicMetadata:{
        role:role
      }
    })
    console.log(res);    
    return "role change"
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}