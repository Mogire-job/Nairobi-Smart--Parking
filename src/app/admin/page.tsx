import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  if (user == undefined) redirect('/')
  if (user.publicMetadata.role != 'admin') redirect('/')
  redirect('/admin/parking-spots')
  
}

export default page