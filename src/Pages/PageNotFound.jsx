import FuzzyText from '@/components/FuzzyText';
 import React from 'react'
import { Link } from 'react-router';
 
 function PageNotFound() {
   return (
     <div className='w-full h-screen flex flex-col items-center justify-center bg-linear-to-r from-gray-700 to-slate-800/90'>
       <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          fontSize='15em'
        >
          404
        </FuzzyText>
        <p className="my-10 text-2xl text-slate-200">Oops! Page not found</p>
        <Link to="/">
        <p className='underline text-lg underline-offset-4'>
          Return to Home
        </p>
        </Link>
          
     </div>
   )
 }
 
 export default PageNotFound
  
