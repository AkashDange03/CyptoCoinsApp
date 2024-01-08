import React from 'react'
import { coinphoto } from '../assets'

function Home() {
  return (
    <div className='h-[100vh]  flex flex-col justify-center items-center bg-black text-white '>
    <div><img src={coinphoto} alt=""  className='w-[600px] h-[600px]' /></div>
    </div>
  )
}

export default Home