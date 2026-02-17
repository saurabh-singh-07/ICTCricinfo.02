import React, { useEffect, useState } from 'react'
import { getUpcomingMatches } from '@/Api/cricBuzzApi';
import { formatDate } from '@/utils/dateUtils';
import {  MapPin } from 'lucide-react';
import Loader from '@/components/Loader';

function UpcomingMatch() {
const [data, setData] = useState([]);
const [error, setError] = useState('')
const [loading, setLoading] = useState(true)
useEffect(()=>{
  setLoading(true)
  getUpcomingMatches()
  .then(data => {
    setData(data?.typeMatches[0]?.seriesMatches[0]?.seriesAdWrapper?.matches);
    console.log(data)  
  })
  .catch(err =>{
    console.error('api error hai bhai', err)
    setError('Please Try again Later..')
  })
  .finally(()=>{
    setLoading(false);
  })
}, [])
  console.log("re-render");
  if(loading) return <Loader/>
  if(error) return {error}
let showMatchData = 'Loading...'
if(Array.isArray(data) && data.length > 0){
        showMatchData = data.map((match) =>{
          const matchInfo = match.matchInfo; 
          
          return(         
            <div 
            key={matchInfo?.matchId}
            className='w-[90%] max-w-140 h-fit p-5 space-y-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 dark:hover:shadow-gray-800 hover:scale-102  hover:shadow-slate-500 dark:bg-radial dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-900/90 my-4 dark:text-white bg-slate-200 '>
           {/*formet and series  */}
              <div className="flex justify-between" >
                <h3 className='text-xs text-start md:text-sm font-medium text-slate-600 dark:text-slate-300'>
                  {match?.seriesName}
                </h3>
                <span className='text-sm font-medium'>{formatDate(matchInfo?.startDate)}</span>
              </div>
              {/* Teams name and short details */}
              <div className='flex items-center ml-10 gap-x-10 md:gap-x-20'>
                  <div className="w-30 md:w-35">
                  <div> 
                    <img className='w-10 md:w-15 h-8 md:h-10 rounded'  
                      src={`https://www.cricbuzz.com/a/img/v1/152x152/i1/c${matchInfo?.team1?.imageId}/player.jpg`} 
                      alt={matchInfo?.team1?.teamSName} 
                       loading="eager"/> 
                  </div>
                  <p className='text-sm md:tast-md font-medium m-1'>
                    {matchInfo?.team1?.teamName}
                  </p>
                 
                  </div>
                  <div className='text-lg md:text-xl font-semibold'>vs</div>
                  <div className="w-30 md:w-35">
                    <div> 
                      <img className='md:w-15 w-10 h-8 md:h-10 rounded'  
                        src={`https://www.cricbuzz.com/a/img/v1/152x152/i1/c${matchInfo?.team2?.imageId}/player.jpg`} 
                        alt={matchInfo?.team2?.teamSName} 
                         loading="eager"/> 
                    </div>
                    <p className='text-sm md:text-md font-medium m-1'>{matchInfo?.team2?.teamName}</p>
                  </div>
              </div>
             
              <div className='text-md md:text-lg font-medium '>
                {matchInfo?.status}
              </div>
              <div className='text-md -mt-3 md:text-lg flex items-center font-medium '>
                <MapPin className='w-4 h-4'/> {matchInfo?.venueInfo?.ground}, {matchInfo?.venueInfo?.city}
              </div>
            </div>
          )}
       )
      }
  return (
    <div className='flex flex-col items-center lg:grid lg:grid-cols-2 lg:ml-20 lg:pl-10'>     
    {
        Array.isArray(data) && data.length > 0 ? showMatchData : <p className='flex items-center justify-center h-100'>{error}</p>
    }
    </div>
  )
}

export default UpcomingMatch
