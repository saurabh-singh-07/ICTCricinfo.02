import { Lock } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

function Footer() {
  return (
    <>
      <div className='w-full h-35 flex flex-col items-center md:flex-row md:justify-around border-b border-slate-500'>
        <div>
          <h3 className='text-center text-4xl font-bold'><span className='text-amber-600'>ICT</span>CricLinfo.com</h3>
          <p className='text-lg text-slate-300'>Your ultimate destination for Indian Cricket</p>
        </div>
        <ul className='flex my-5 md:my-0 gap-8 text-slate-200 font-medium'>
          <li className='hover:text-amber-600 hover:text-shadow-2xs hover:scale-110 transition-all duration-100  hover:text-shadow-amber-700'>
            <NavLink to ="/Matchs-section">Live Matches</NavLink>
          </li>
          <li className='hover:text-amber-600 hover:scale-110 transition-all duration-100  hover:text-shadow-2xs hover:text-shadow-amber-700'>
            <NavLink to ="/">Home</NavLink>
          </li>
          <li className='hover:text-amber-600 hover:scale-110 transition-all duration-100  hover:text-shadow-2xs hover:text-shadow-amber-700'>
            <NavLink to ="/Matchs-section">About</NavLink>
          </li>
          <li className='hover:text-amber-600 hover:text-shadow-2xs hover:scale-110 transition-all duration-100  hover:text-shadow-amber-700'>
            <NavLink to ="/Live-Matchs">Players Info</NavLink>
          </li>
        </ul>
      </div>
      <div className='flex flex-col md:flex-col items-center justify-around h-40 text-slate-300'>
        <p className='flex items-center gap-x-1'>© 2026 ICTCInfo.com. All rights reserved <Lock className='w-4 h-4'/></p>
        <p>Made with 🩷 using React js</p>
      </div>
    </>
  )
}

export default Footer
