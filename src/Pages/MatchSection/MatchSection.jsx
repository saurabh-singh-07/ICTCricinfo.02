import { NavLink, Outlet, useNavigate } from 'react-router'
import { getLiveMatches } from '@/Api/cricBuzzApi'
import { useState, useEffect } from 'react'
import { formatDate } from '@/utils/dateUtils';

function MatchSection() {
  const [data , setData] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    getLiveMatches()
    .then((data) =>{
     console.log(data);  
     setData(data?.typeMatches[0]?.seriesMatches[0]?.seriesAdWrapper?.matches)
    
    })
    .catch((err) =>{
      console.log("Error feching ",err.message);
      
    })
  },[])

  let showMatchData = 'no matches'
  if(Array.isArray(data) && data.length > 0){
    showMatchData = data.map((match) =>{
      const matchInfo = match.matchInfo; 
      const team1Score = match?.matchScore?.team1Score?.inngs1;
      const team2Score = match?.matchScore?.team2Score?.inngs1;
      
      return(         
        <div 
        key={matchInfo.matchId}
        onClick={() => navigate(`/Matchs-section/${matchInfo.matchId}`)}
        className='w-[90%] max-w-140 h-fit p-3 md:p-5 space-y-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 dark:hover:shadow-gray-800 hover:scale-102  hover:shadow-slate-500 dark:bg-radial dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-900/90 my-4 dark:text-white bg-slate-200 '>
                    
          <div className="flex justify-between" >
            <h3 className='text-xs text-start md:text-sm font-medium text-slate-600 dark:text-slate-300'>
              {matchInfo.matchFormat}, {matchInfo.venueInfo.ground}
            </h3>
            <span className='text-sm font-medium'>{formatDate(matchInfo.startDate)}</span>
          </div>
          <div className='flex items-center justify-between ml-4 mr-10 md:mx-10 '>
              <div>
              <div> 
                <img className='w-10 h-8 md:w-15 md:h-10 rounded-xl'  
                  src={`https://www.cricbuzz.com/a/img/v1/152x152/i1/c${matchInfo?.team1?.imageId}/player.jpg`} 
                  alt={matchInfo?.team1?.teamSName} /> 
              </div>
              <p className='text-md md:text-lg font-medium m-1'>
                {matchInfo?.team1?.teamName}
              </p>
              <p className='mx-2 md:text-sm text-xs dark:text-slate-300 text-slate-600'>
                {team1Score?.runs}/{team1Score?.wickets} ({team1Score?.overs} ov)
              </p>
              </div>
              <div className='text-lg md:text-xl font-semibold'>vs</div>
              <div>
                <div> 
                  <img className='w-10 md:w-15 h-8 md:h-10 rounded-xl'  
                    src={`https://www.cricbuzz.com/a/img/v1/152x152/i1/c${matchInfo?.team2?.imageId}/player.jpg`} 
                    alt={matchInfo?.team2?.teamSName} /> 
                </div>
                <p className='text-md md:text-lg font-medium m-1'>{matchInfo?.team2?.teamName}</p>
                <p className='mx-2 text-xs md:text-sm dark:text-slate-300 text-slate-600'>
                  {
                    Array.isArray(match) && match.length > 1 ?
                    <span>{team2Score?.runs}/{team2Score?.wickets} ({team2Score?.overs} ov)</span> :
                    <span>yet to bat</span>
                  }
                </p> 
              </div>
          </div>
          <div className='text-md md:text-lg font-medium '>
            {matchInfo.status}
          </div>
        </div>
      )}
   )
  }
  return (
    <>
    <div>
      <div className='m-10'>
        <h2 className=' text-2xl md:text-3xl font-bold flex gap-x-2 items-center '>
          <div className="relative flex items-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
          </div>
          <span className='bg-linear-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent'>Live Matches</span>
        </h2>
      </div>
      <div className='mt-10 grid grid-cols-1 mx-2 md:mx-10 lg:grid-cols-2'>
        {showMatchData}
      </div>
    </div>
    
    <div className='flex mx-5 md:mx-10 gap-x-10 p-3 font-semibold text-lg '>
        <NavLink className='border border-green-500 px-4 py-2 rounded-xl bg-green-500/10' to = "">
            Recent Matchs
        </NavLink>
        
        <NavLink to = "Upcomming-Matchs">
            Upcomming Matchs
        </NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default MatchSection
