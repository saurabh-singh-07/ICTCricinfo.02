import React, { useEffect, useState } from 'react'
import Score from './score'
import { Dot, MapPin } from 'lucide-react'
import { useParams } from 'react-router'
import { getMatchInfo , getScoreCard} from '@/Api/cricBuzzApi'
import { formatDateOnly } from '@/utils/dateUtils';

function ScoreCard() {
    const [data, setData] = useState()
    const [score, setScore] =useState([]);
    const {id } = useParams();
    console.log(id)

    useEffect(()=>{
      getMatchInfo(id)
      .then(data => {
      setData(data)
      console.log(data);
      })
      .catch(err => {
      console.error(err);
      });

      getScoreCard(id)
      .then(data => {
      setScore(data?.scorecard);
      status = data?.status;
      console.log(data);
      })
      .catch(err => {
      console.error(err);
    });
    },[])
    const team1 = data?.team1;
    const team2 = data?.team2;
    console.log("re-render");
    
  return (
    <div className='px-5 flex flex-col items-center'>
        <div className='dark:bg-gray-600/60 bg-gray-400/60 p-3 my-10 rounded-xl shadow-xl w-full max-w-200 h-50 '>
          <div className='flex justify-between px-3 item-center'>
            {
              data?.state !== "Complete" ?
              <span className='bg-red-500 px-3 font-bold md:text-lg rounded-md flex items-center'>Live</span> :
              <span className='bg-green-500 px-3 font-bold md:text-lg rounded-md flex items-center'>Result</span>
            }
            <p className='text-xs font-medium md:text-sm pb-3'>{data?.seriesname}</p>
          </div>

          <div className='flex justify-between my-5 px-5'>
            <div className='w-40 flex text-center font-semibold flex-col'>
              <span className='text-lg text-slate-800 font-bold '>{team1?.teamname}</span>
                {score[0]?.score} / {score[0]?.wickets} ({score[0]?.overs} Ov)
            </div>
            <div className='w-40 flex text-center font-semibold flex-col '>
              <span className='text-lg text-slate-800 font-bold'>{team2?.teamname}</span>
              {
                Array.isArray(score) && score.length > 1 ? <span>{score[1]?.score} / {score[1]?.wickets} ({score[1]?.overs} Ov)</span>
                : <span className='text-lg font-bold'>Yet to bat</span>
              }
            </div>
          </div>
          <div className='text-center md:text-lg font-semibold'>
            <span>{data?.status}</span>
            {
              data?.state !== "Complete" ?
              <p>Runrate : {score[0]?.runrate}</p> : <p>{data?.shortstatus}</p>
            }       
          </div>
        </div>
        <Score score={score} team1={team1?.teamname} team2={team2?.teamname} />
    </div>
  )
}

export default ScoreCard
