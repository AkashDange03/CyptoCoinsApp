import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
   <>
    <nav className="sticky top-0 w-auto z-10 bg-slate-900 text-white flex flex-row items-center justify-between  md:justify-around p-4 border-black border-2 text-lg ">
        <div className='font-bold ml-2'>
            CryPto
        </div>
        <main className='w-[60%] md:w-[20%] gap-2 flex flex-row justify-between md:mr-2'>
            <Link to="/">Home</Link>
            <Link to="/exchange">Exchange</Link>
            <Link to="/coins">Coins</Link>
        </main>
    </nav>
   </>
  )
}

export default Nav