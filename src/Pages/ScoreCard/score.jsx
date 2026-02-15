import React, { useState } from "react";

const Score = ({ score, team1, team2 }) => {
  const [toggle, setToggle] = useState(0)
  return (
    <div className='card w-full max-w-200 my-5 px-5 pt-5 pb-1 transition-all duration-200'>
    
      <h2 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-4">Scorecard</h2>
      <div className="space-x-6">
        <button 
        onClick={()=>setToggle(0)}
        className={`text-xl border border-green-600 px-4 py-2 rounded-xl font-semibold text-gray-700 dark:text-slate-100 mb-4 ${toggle === 0 ?"bg-green-500/20" : null}`} >
          {score[0]?.batteamname}
        </button>
        <button 
        onClick={()=>setToggle(1)}
        className={`text-xl font-semibold border border-green-600 px-4 py-2 rounded-xl text-gray-700 dark:text-slate-100 mb-4 ${toggle === 1 ? "bg-green-500/20" : null}`} >
          {score[1]?.batteamname}
        </button>
      </div>
      
      {/* Batting Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:text-slate-300 text-slate-600 dark:bg-gray-800">
            <tr>
              <th className="p-1 text-left">Batter</th>
              <th className="p-1 text-left">Dismissal</th>
              <th className="p-1">R</th>
              <th className="p-1">B</th>
              <th className="p-1">4s</th>
              <th className="p-1">6s</th>
              <th className="p-1">SR</th>
            </tr>
          </thead>
          <tbody>
            {score[toggle]?.batsman?.map((player) => (
              <tr key={player.id} className="border-t dark:text-slate-400 text-slate-500 dark:border-gray-700">
                <td className="p-2 font-medium">{player?.name}</td>
                <td className="p-2 text-gray-600 dark:text-gray-400">
                  {player?.outdec}
                </td>
                <td className="p-2 text-center">{player?.runs}</td>
                <td className="p-2 text-center">{player?.balls}</td>
                <td className="p-2 text-center">{player?.fours}</td>
                <td className="p-2 text-center">{player?.sixes}</td>
                <td className="p-2 text-center">{player?.strkrate}</td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>

      {/* Extras & Total */}
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Extras:</strong>{score?.extras?.total}</p>
        <p className="font-semibold">
          Total: {score[toggle]?.score}/{score[toggle]?.wickets} ({score[toggle]?.overs} ov)
        </p>
      </div>

      {/* Yet to Bat */}
      <div className="mt-3 dark:text-slate-300 text-slate-600 text-sm">
        <strong>Yet to Bat:</strong>{" "}
        
      </div>

      {/* Bowling Table */}
      <h3 className="mt-6 mb-2 font-semibold text-gray-800 dark:text-white">
        Bowling
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full  text-sm border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:text-slate-300 text-slate-600 dark:bg-gray-800">
            <tr>
              <th className="p-2 text-left">Bowler</th>
              <th className="p-2">O</th>
              <th className="p-2">M</th>
              <th className="p-2">R</th>
              <th className="p-2">W</th>
              <th className="p-2">Econ</th>
            </tr>
          </thead>
          <tbody>
            {score[toggle]?.bowler?.map((player) => ( 
              <tr key={player.id} className="border-t dark:text-slate-400 text-slate-500 dark:border-gray-700">
                <td className="p-2 font-medium">{player?.name}</td>
                <td className="p-2 text-center">{player?.overs}</td>
                <td className="p-2 text-center">{player?.maidens}</td>
                <td className="p-2 text-center">{player?.runs}</td>
                <td className="p-2 text-center">{player?.wickets}</td>
                <td className="p-2 text-center">{player?.economy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Score;
