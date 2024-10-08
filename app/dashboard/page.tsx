import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function page() {
  return (

    <div className='p-10 bg-black'>
      <h2 className='font-bold text-2xl text-white'>Dashboard</h2>
      <h2 className='text-gray-500'>Start Your Mockup Ai Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>
      {/* Previous Interview List */}
      <InterviewList />
    </div>
  )
}

export default page