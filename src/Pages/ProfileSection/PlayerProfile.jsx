import axios from 'axios';
import { Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function PlayerProfile() {
  const [data, setData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null)
  const [toggleStats, setToggleStats] = useState('batting')
  const [error, setError] = useState('')
  
  const {id } = useParams();
  
  async function getData() {
    const url = "https://saurabh-singh-07.github.io/CricketApi/db.json";
    const response = await axios.get(url);
    return response.data;
  }
  useEffect(()=>{
     getData()
     .then(data => {
       setData(data.players[id]);
       console.log(data.players[id]) 
       setPlayerStats(data.players[id].stats)
    
        
     })
     .catch(err =>{
       console.error('api error hai bhai', err) 
       setError('Something went wrong')  
     })
  }, [])
  
  return (
      <div className='flex justify-center'>
        {error && <p>{error}</p>}
        {data && (
        <div className='flex justify-center items-center w-full max-w-300 p-5 min-h-screen'>
          <div 
          className='bg-slate-200 space-y-10 dark:bg-slate-800 w-full min-h-screen rounded shadow '>
            {/* Profile  */}
            <div className='bg-cover bg-center absolute w-full max-w-290 md:h-65 brightness-75 rounded'
            style={{backgroundImage : `url(${data.bgImage})`}}>
            </div>
            <div 
            className='flex relative flex-col md:flex-row items-center justify-center md:justify-between py-5 rounded '>            
              <div className='w-50 h-50 flex mx-4 overflow-hidden border-2 border-slate-700 rounded-full shadow-md'>
                <img className='object-cover bg-center w-50 h-60' src={data.profileImage}  alt={data.name} /></div>
              <div className='flex flex-col text-slate-200 justify-center items-center p-4'>
                <h2 className='text-3xl font-bold '>{data.name}</h2>
                <p className='text-lg font-semibold'>{data.country} | <span className='text-[20px]'>{data.role}</span></p>
                <p className='text-lg'>INTL CAREER: {data.career}</p>
              </div>
            </div>
            {/* Info */}
            <div className='grid grid-cols-2 m-2 card rounded p-4 space-y-6 space-x-2 text-xl '>
              <div>
                <p >FULL NAME</p>
                <b className='text-lg'>{data.fullName}</b>
              </div>
              <div>
                <p className='flex gap-2'><Calendar/>Date of Birth</p>
                <b className='text-lg'>{data.dob}</b>
              </div>
              <div>
                <p>Age</p>
                <b className='text-lg'>{data.age}</b>
              </div>
              <div>
                <p>Batting Style</p>
                <b className='text-lg'>{data.battingStyle}</b>
              </div>
              <div>
                <p>Bowling Style</p>
                <b className='text-lg'>{data.bowlingStyle}</b>
              </div>
              <div>
                <p>Height</p>
                <b className='text-lg'>{data.height}</b>
              </div>
              <div>
                <p>Career</p>
                <b className='text-lg'>{data.career}</b>
              </div>
              
            </div>
            {/* About */}
            <div className='text-center mt-10 space-y-4'>     
                <h2 className='text-3xl font-bold dark:text-slate-200 text-slate-800/90'>About</h2>
                <p className='dark:text-slate-300 text-slate-700/80 px-6'>{data.about}</p>       
            </div>
            {/* stats */}
            
            <div className="overflow-x-auto">
              {/* talble heading */}
              <div className='text-2xl space-y-6 px-4 py-5 font-semibold dark:text-slate-50 text-slate-800'>
                <h3 className='text-center underline underline-offset-3'>Stats</h3>
                <div className='space-x-4 px-3 py-2 bg-white dark:bg-slate-950/40 w-full flex justify-around rounded-xl border border-slate-400/60'>
                  <button 
                  onClick={() => setToggleStats('batting')} 
                  className={` w-full py-1 rounded-xl 
                  ${toggleStats === 'batting' ? 'bg-green-600/90 text-slate-50' :null }`}>
                    Batting 
                  </button>
                  <button 
                  onClick={() => setToggleStats('bowling')}
                  className={` w-full py-1 rounded-xl
                  ${toggleStats === 'bowling' ? 'bg-green-600/90 text-slate-50' : null}`}>
                    Bowling 
                  </button>
                  <button 
                  onClick={() => setToggleStats('feilding')} 
                  className={`active:bg-green-600/90 w-full py-1 rounded-xl
                  ${toggleStats === 'feilding' ? 'bg-green-600/90 text-slate-50' : null}`}>
                    Feilding 
                  </button>
                </div>               
              </div>
              {/*players batting stats */}
              {
                toggleStats && (toggleStats === 'batting' ?
                <table className="min-w-full border border-gray-100 text-sm text-center transition-all duration-200">
                  <thead className="tableHeading">
                    <tr>
                      <th className="tableHeadingElem ">Format</th>
                      <th className="tableHeadingElem">Test</th>
                      <th className="tableHeadingElem ">Odi</th>
                      <th className="tableHeadingElem ">T20</th>
                      <th className="tableHeadingElem ">IPL</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Match</td>
                          <td className="tableBody">{playerStats.batting.tests.matchs}</td>
                          <td className="tableBody">{playerStats.batting.odis.matchs}</td>
                          <td className="tableBody">{playerStats.batting.t20s.matchs}</td>
                          <td className="tableBody">{playerStats.batting.ipl.matchs}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody ">inning</td>
                          <td className="tableBody">{playerStats.batting.tests.innings}</td>
                          <td className="tableBody">{playerStats.batting.odis.innings}</td>
                          <td className="tableBody">{playerStats.batting.t20s.innings}</td>
                          <td className="tableBody">{playerStats.batting.ipl.innings}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Runs</td>
                          <td className="tableBody">{playerStats.batting.tests.runs}</td>
                          <td className="tableBody ">{playerStats.batting.tests.runs}</td>
                          <td className="tableBody ">{playerStats.batting.tests.runs}</td>
                          <td className="tableBody ">{playerStats.batting.tests.runs}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody ">Ball Faced</td>
                          <td className="tableBody ">{playerStats.batting.tests.ballFaced}</td>
                          <td className="tableBody">{playerStats.batting.odis.ballFaced}</td>
                          <td className="tableBody ">{playerStats.batting.t20s.ballFaced}</td>
                          <td className="tableBody ">{playerStats.batting.ipl.ballFaced}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Highest</td>
                          <td className="tableBody">{playerStats.batting.tests.highest}</td>
                          <td className="tableBody">{playerStats.batting.odis.highest}</td>
                          <td className="tableBody">{playerStats.batting.t20s.highest}</td>
                          <td className="tableBody">{playerStats.batting.ipl.highest}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Average</td>
                          <td className="tableBody">{playerStats.batting.tests.avg}</td>
                          <td className="tableBody">{playerStats.batting.odis.avg}</td>
                          <td className="tableBody">{playerStats.batting.t20s.avg}</td>
                          <td className="tableBody">{playerStats.batting.ipl.avg}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Sr</td>
                          <td className="tableBody">{playerStats.batting.tests.sr}</td>
                          <td className="tableBody">{playerStats.batting.odis.sr}</td>
                          <td className="tableBody">{playerStats.batting.t20s.sr}</td>
                          <td className="tableBody">{playerStats.batting.ipl.sr}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Not Out</td>
                          <td className="tableBody">{playerStats.batting.tests.notOut}</td>
                          <td className="tableBody">{playerStats.batting.odis.notOut}</td>
                          <td className="tableBody">{playerStats.batting.t20s.notOut}</td>
                          <td className="tableBody">{playerStats.batting.ipl.notOut}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody ">Fours</td>
                          <td className="tableBody ">{playerStats.batting.tests.fours}</td>
                          <td className="tableBody">{playerStats.batting.odis.fours}</td>
                          <td className="tableBody ">{playerStats.batting.t20s.fours}</td>
                          <td className="tableBody ">{playerStats.batting.ipl.fours}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody">Sixs</td>
                          <td className="tableBody">{playerStats.batting.tests.sixs}</td>
                          <td className="tableBody">{playerStats.batting.odis.sixs}</td>
                          <td className="tableBody">{playerStats.batting.t20s.sixs}</td>
                          <td className="tableBody">{playerStats.batting.ipl.sixs}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody ">50s</td>
                          <td className="tableBody ">{playerStats.batting.tests.fifty}</td>
                          <td className="tableBody ">{playerStats.batting.odis.fifty}</td>
                          <td className="tableBody ">{playerStats.batting.t20s.fifty}</td>
                          <td className="tableBody ">{playerStats.batting.ipl.fifty}</td>      
                        </tr>
                        <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                          <td className="tableBody ">100s</td>
                          <td className="tableBody ">{playerStats.batting.tests.hundreds}</td>
                          <td className="tableBody ">{playerStats.batting.odis.hundreds}</td>
                          <td className="tableBody ">{playerStats.batting.t20s.hundreds}</td>
                          <td className="tableBody">{playerStats.batting.ipl.hundreds}</td>      
                        </tr>
                  </tbody>
                </table> : null
              )}
              {/* player bowling stats */}
              {
                toggleStats && (toggleStats === 'bowling' ? 
                  <table className="min-w-full border border-gray-100 text-sm text-center transition-all duration-200">
                    <thead className="tableHeading">
                      <tr>
                        <th className="tableHeadingElem ">Format</th>
                        <th className="tableHeadingElem">Test</th>
                        <th className="tableHeadingElem ">Odi</th>
                        <th className="tableHeadingElem ">T20</th>
                        <th className="tableHeadingElem ">IPL</th>
                      </tr>
                    </thead>
                    <tbody>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Match</td>
                            <td className="tableBody">{playerStats.bowling.test.matchs}</td>
                            <td className="tableBody">{playerStats.bowling.odis.matchs}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.matchs}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.matchs}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody ">inning</td>
                            <td className="tableBody">{playerStats.bowling.test.innings}</td>
                            <td className="tableBody">{playerStats.bowling.odis.innings}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.innings}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.innings}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Runs</td>
                            <td className="tableBody">{playerStats.bowling.test.runs}</td>
                            <td className="tableBody ">{playerStats.bowling.odis.runs}</td>
                            <td className="tableBody ">{playerStats.bowling.t20s.runs}</td>
                            <td className="tableBody ">{playerStats.bowling.ipl.runs}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody ">Wickets</td>
                            <td className="tableBody ">{playerStats.bowling.test.wicket}</td>
                            <td className="tableBody">{playerStats.bowling.odis.wicket}</td>
                            <td className="tableBody ">{playerStats.bowling.t20s.wicket}</td>
                            <td className="tableBody ">{playerStats.bowling.ipl.wicket}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody ">Balls</td>
                            <td className="tableBody ">{playerStats.bowling.test.balls}</td>
                            <td className="tableBody ">{playerStats.bowling.odis.balls}</td>
                            <td className="tableBody ">{playerStats.bowling.t20s.balls}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.balls}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">BB</td>
                            <td className="tableBody">{playerStats.bowling.test.BB}</td>
                            <td className="tableBody">{playerStats.bowling.odis.BB}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.BB}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.BB}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Average</td>
                            <td className="tableBody">{playerStats.bowling.test.avg}</td>
                            <td className="tableBody">{playerStats.bowling.odis.avg}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.avg}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.avg}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Sr</td>
                            <td className="tableBody">{playerStats.bowling.test.sr}</td>
                            <td className="tableBody">{playerStats.bowling.odis.sr}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.sr}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.sr}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Econ</td>
                            <td className="tableBody">{playerStats.bowling.test.econ}</td>
                            <td className="tableBody">{playerStats.bowling.odis.econ}</td>
                            <td className="tableBody">{playerStats.bowling.t20s.econ}</td>
                            <td className="tableBody">{playerStats.bowling.ipl.econ}</td>      
                          </tr>
                          {/* <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody ">4W</td>
                            <td className="tableBody ">{battingData.test.fours}</td>
                            <td className="tableBody">{battingData.odis.fours}</td>
                            <td className="tableBody ">{battingData.t20s.fours}</td>
                            <td className="tableBody ">{battingData.ipl.fours}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">5w</td>
                            <td className="tableBody">{battingData.test.sixs}</td>
                            <td className="tableBody">{battingData.odis.sixs}</td>
                            <td className="tableBody">{battingData.t20s.sixs}</td>
                            <td className="tableBody">{battingData.ipl.sixs}</td>      
                          </tr> */}
                    </tbody>
                  </table>
                 : null )
              }
              {
                toggleStats && (toggleStats === 'feilding' ? 
                  <table className="min-w-full border border-gray-100 text-sm text-center transition-all duration-200">
                    <thead className="tableHeading">
                      <tr>
                        <th className="tableHeadingElem ">Format</th>
                        <th className="tableHeadingElem">Test</th>
                        <th className="tableHeadingElem ">Odi</th>
                        <th className="tableHeadingElem ">T20</th>
                        <th className="tableHeadingElem ">IPL</th>
                      </tr>
                    </thead>
                    <tbody>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Catch</td>
                            <td className="tableBody">{playerStats.feilding.test.catchs}</td>
                            <td className="tableBody">{playerStats.feilding.odi.catchs}</td>
                            <td className="tableBody">{playerStats.feilding.t20s.catchs}</td>
                            <td className="tableBody">{playerStats.feilding.ipl.catchs}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody ">Run Out</td>
                            <td className="tableBody">{playerStats.feilding.test.runOut}</td>
                            <td className="tableBody">{playerStats.feilding.odi.runOut}</td>
                            <td className="tableBody">{playerStats.feilding.t20s.runOut}</td>
                            <td className="tableBody">{playerStats.feilding.ipl.runOut}</td>      
                          </tr>
                          <tr className="hover:bg-gray-100 hover:dark:bg-gray-900/30">
                            <td className="tableBody">Stumping</td>
                            <td className="tableBody">{playerStats.feilding.test.stumping}</td>
                            <td className="tableBody ">{playerStats.feilding.odi.stumping}</td>
                            <td className="tableBody ">{playerStats.feilding.t20s.stumping}</td>
                            <td className="tableBody ">{playerStats.feilding.ipl.stumping}</td>      
                          </tr>                                              
                    </tbody>
                  </table> 
                : null
                ) 
              }
            </div>
          </div>
        </div>
        )}
      </div>
  )
}

export default PlayerProfile
