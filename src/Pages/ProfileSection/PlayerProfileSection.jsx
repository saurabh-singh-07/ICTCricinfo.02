import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { Users } from 'lucide-react';
import {motion } from "framer-motion";
import Reveal from '@/components/Reveal';
import Loader from '@/components/Loader';


function PlayerProfileSection() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    async function getData() {
        const url = "https://saurabh-singh-07.github.io/CricketApi/db.json";
        const response = await axios.get(url);
        return response.data;
    }
    useEffect(()=>{
        setLoading(true)
        getData()
        .then(data => {
        setData(data.players);
        console.log(data.players);    
     })
     .catch(err =>{
        setLoading(true)
        console.error('api error hai bhai', err)
        setError("Failed to laod data");  
     })
     .finally(()=>{
      setLoading(false)
     })
   }, [])
if (loading) return <Loader />;
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
if(Array.isArray(data) && data.length > 1 ){
    showMatchData = data.map((player)=>{
        return (
              <Reveal>
                <div key={player.id} className='p-10'>
                  <div className='flex flex-col items-center justify-center w-70 h-90 dark:bg-radial dark:from-gray-800/40 dark:via-gray-800/90 dark:to-gray-900/90 bg-slate-300 shadow hover:shadow-xl hover:scale-103 transition-all duration-200 rounded-xl '>
                      <h3 className='dark:text-slate-200 font-bold px-4 mt-5 text-2xl'>{player.name}</h3>
                     <div className='overflow-hidden rounded-xl m-4 '>
                      <img 
                      className='object-cover rounded-xl w-50 h-60'
                      src={player.profileImage} 
                      loading="lazy" 
                      alt={`${player.name} Image`} />
                    </div>
                    <button
                    onClick={() => navigate(`/PlayerSection/${player.id-1}`)}
                    className='bg-linear-150 from-blue-600 to-indigo-400 mb-4 px-4 py-1 text-lg font-medium rounded-xl hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.55)] hover:shadow-blue-600 hover:scale-105 w-35 transition-all duration-200 dark:text-slate-300 shadow-blue-700'>
                      View
                    </button>
                  </div>
                </div>
              </Reveal>
        ) 
    })
}
  return (
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='lg:flex flex-col items-center'>
          <h2 className='text-3xl font-bold my-10 flex items-center justify-center dark:text-slate-100 text-slate-800'>
            <Users className='mx-3 w-10 h-10 p-2 rounded-xl bg-amber-600'/>
          Popular Indian Cricket Players</h2>
          <div 
          className='mx-10 bg-stone-300/40 dark:bg-slate-600/30 text-slate-800/90 dark:text-stone-300 p-3 rounded-xl shadow-md'>
            <p 
            className='text-center px-5 md:px-10 text-lg font-medium'>
              Your ultimate destination for all things cricket! Stay updated with stats, player statistics, and in-depth analysis of your favorite teams and players. Whether you're a casual fan or a die-hard cricket enthusiast, ICTCricInfo has something for everyone. Explore hsitorical data, and experience. Join our community and never miss a moment of the action!
            </p>
          </div>
          <div className='flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-3'>     
            {showMatchData}
          </div>
        </motion.div>
      
      
  )
}

export default PlayerProfileSection
