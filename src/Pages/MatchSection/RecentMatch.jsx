import { useEffect, useState } from "react";
import { getRecentMatches } from "@/Api/cricBuzzApi";
import { useNavigate } from "react-router";
import { formatDate } from '@/utils/dateUtils';

function RecentMatch() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    const navigate = useNavigate();
    useEffect(()=>{
      getRecentMatches()
      .then(data => {
        setData(data?.typeMatches[0]?.seriesMatches[0]?.seriesAdWrapper?.matches);
        console.log(data?.typeMatches[0]?.seriesMatches[0]?.seriesAdWrapper?.matches)
        
      })
      .catch(err =>{
        console.error('api error hai bhai', err)
        setError(err)
      })
    }, [])
      console.log("re-render");
    let showMatchData = ''
    if (error) {
  return (
    <>
      <p 
      className='flex mt-40 text-xl font-semibold justify-center h-screen' 
      style={{ color: "red" }}>
        {error}
      </p>
    </> 
  )}
    if(Array.isArray(data) && data.length > 0){
        showMatchData = data.map((match) =>{
          const matchInfo = match.matchInfo; 
          const team1Score = match?.matchScore?.team1Score?.inngs1;
          const team2Score = match?.matchScore?.team2Score?.inngs1;
          
          return(         
            <div 
            key={matchInfo.matchId}
            onClick={() => navigate(`/Matchs-section/${matchInfo.matchId}`)}
            className='w-[90%] max-w-140 h-fit p-5 space-y-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 dark:hover:shadow-gray-800 hover:scale-102  hover:shadow-slate-500 dark:bg-radial dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-900/90 my-4 dark:text-white bg-slate-200 '>
           {/*formet and ground  */}
              <div className="flex justify-between" >
                <h3 className='text-xs text-start md:text-sm font-medium text-slate-600 dark:text-slate-300'>
                  {matchInfo.matchFormat}, {matchInfo.venueInfo.ground}
                </h3>
                <span className='text-sm font-medium'>{formatDate(matchInfo.startDate)}</span>
              </div>
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
                  <p className='mx-2 md:text-sm text-xs dark:text-slate-300 text-slate-600'>
                    {team1Score?.runs}/{team1Score?.wickets} ({team1Score?.overs} ov)
                  </p>
                  </div>
                  <div className='text-lg md:text-xl font-semibold'>vs</div>
                  <div className="w-30 md:w-35">
                    <div> 
                      <img className='w-10 md:w-15 h-8 md:h-10 rounded'  
                        src={`https://www.cricbuzz.com/a/img/v1/152x152/i1/c${matchInfo?.team2?.imageId}/player.jpg`} 
                        alt={matchInfo?.team2?.teamSName} 
                        loading="eager"/> 
                    </div>
                    <p className='text-sm md:text-md font-medium m-1'>{matchInfo?.team2?.teamName}</p>
                    <p className='mx-2 text-xs md:text-sm dark:text-slate-300 text-slate-600'>
                      {team2Score?.runs}/{team2Score?.wickets} ({team2Score?.overs} ov)
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
    <div className="flex flex-col items-center lg:grid md:ml-10 lg:grid-cols-2">
    {showMatchData}   
    </div>
  )
}

export default RecentMatch