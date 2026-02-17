import React, { useEffect, useRef } from 'react'
import Mainimage from '@/assets/Main-img.png'
import ScorecardImage from '@/assets/Scorecard-img.png'
import playerProfileImage from '@/assets/playerProfile.png'
import { Link, Outlet } from 'react-router'
import { Radio, Users } from 'lucide-react'
import { HashLink } from 'react-router-hash-link'
import { motion } from "framer-motion";
import { AIChatWidget } from '@/components/AiChatWidget'

function FrontPage() {
  const cardRef = useRef([]);

  useEffect(() =>{
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry)=> {
        if(entry.isIntersecting){
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0")
        }else{
          entry.target.classList.remove("opacity-100", "translate-y-0")
          entry.target.classList.add("opacity-0", "translate-y-10")
        }
      });
    },
      {threshold : 0.5, rootMargin: "0px 0px -100px 0px"}
    );
    cardRef.current.forEach((el)=>{
      if(el) observer.observe(el);
    })
    
    return () => {
      cardRef.current.forEach((el) =>{
        if(el) observer.unobserve(el);
      })
    };
  }, []);
  return (
    <div
    className='flex flex-col items-center justify-center ease-out transform-all duration-700'>
        <div 
        className={` overflow-hidden relative bg-center w-full max-w-400 h-200 border-x border-slate-400 brightness-40 z-10 shadow-[0px_0px_60px_40px_rgba(0,0,0,0.35)] `}>
          <img
          src={Mainimage}
          alt='Crcket image'
          className='absolute inset-0 w-full h-full object-cover'
          />
        </div>
        {/* content */}
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
         className='absolute z-11 w-full max-w-280 h-200 top-18'>
          <div className='mt-20'>    
            <h1
            style={{ fontFamily: "Montserrat" }}
            className='text-center text-slate-50 space-y-5 font-black text-4xl md:text-5xl lg:text-6xl pt-20'>
                Welcome to <span className='bg-linear-to-r from-blue-500 to-green-400 bg-clip-text text-transparent'>ICTCricInfo</span>
            </h1>
            <p 
            style={{fontFamily: "system-ui"}}
            className='text-md md:text-lg p-5 pt-10 m-5 text-slate-100 font-meium'>
                Your ultimate destination for all things cricket! Stay updated with stats, images, video, player statistics, and in-depth analysis of your favorite teams and players. Whether you're a casual fan or a die-hard cricket enthusiast, ICTCricInfo has something for everyone. Explore historical data, and expert opinions to enhance your cricketing experience. Join our community and never miss a moment of the action!
            </p>
          </div>
          <div className='text-white flex justify-center space-x-10 font-bold md:text-xl mt-25 lg:mt-40'>
            <button 
            className='btn-style bg-amber-600  px-6 my-5 shadow-amber-600 py-5'> 
              <HashLink
               
              className='flex items-center'
              smooth to="#Live-matches">
                <div className="relative flex pr-3 items-center">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-white opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-white"></span>
                </div>
                Live Matches
              </HashLink>
            </button>
            <button 
            className='btn-style bg-slate-200 text-slate-700  px-6 my-5 border border-slate-300 shadow-stone-100  py-4'> 
              <HashLink 
        
              className='flex items-center gap-x-3'
              smooth to="#player-stats">
                <Users/> Player Stats
              </HashLink>
            </button>
          </div>
        </motion.div>
       
      <div>
         {/* Cricket matchs section */}
          <section id='Live-matches' className='w-full pt-25 px-5 sm:px-15 flex flex-col justify-center items-center'>
            <div className='bg-slate-800/60 p-4 rounded-xl '>
              <div>
                <h2 className='text-start my-5 text-4xl dark:text-slate-50 flex items-center font-semibold'> <Radio className='w-10 h-10 mx-2 p-1 rounded-xl bg-amber-600'/>Cricket live Matchs</h2>
              </div>
              
              <div 
              ref={(el) => (cardRef.current[0] = el)} 
              className='flex relative shadow-2xl flex-col justify-center pb-20 rounded-xl w-full max-w-180 h-110 sm:h-130 transition-all translate-x-0 duration-500'>
                <img
                src={ScorecardImage} 
                loading="eager"
                alt='cricket live matches img'
                className='absolute inset-0 rounded-xl w-full max-w-180 h-110 sm:h-130 brightness-85 object-cover'/>
                <div className='relative top-20 h-full'>
                  <h3 
                  className='text-3xl text-center pt-20 font-bold text-slate-50 text-shadow-xs'>
                    Complete Match Overview
                  </h3>
                  <p 
                  className='text-lg px-5 text-center font-medium text-slate-200'>
                    View full scorecards, player performances, and key match moments with accurate statistics.
                  </p>
                  <Link to="/Matchs-section">
                    <div 
                    className='absolute flex rounded-b-xl justify-center py-5 w-full text-slate-200 bg-gray-950/60 shadow-[0_-6px_16px_-4px_rgba(0,0,0,0.55)] bottom-0'>         
                      <button 
                      className='text-xl font-bold'>
                        View
                      </button>                
                    </div>
                  </Link>
                </div>
                
              </div>
            </div>
          </section> 

          {/* cricket section */}
          <section id='player-stats' className='w-full py-30 px-5 sm:px-20 flex justify-center items-center'>
            <div className='bg-slate-800/60  p-5 rounded-xl '>
              <div>
                <h2 className='text-start my-5 text-4xl dark:text-slate-50 flex items-center font-semibold'> 
                  <Users className='w-10 h-10 mx-2 p-1 rounded-xl bg-amber-600'/>Cricket Players Stats</h2>
              </div>
              <div 
              ref={(el) => (cardRef.current[1] = el)} 
              className=' flex relative shadow-2xl flex-col justify-center pb-20 w-full max-w-180 h-110 sm:h-150 transition-all translate-x-0 duration-500'>
                <img
                src={playerProfileImage}
                loading="eager" 
                alt='cricket live matches img'
                className='absolute inset-0 w-full max-w-180 h-110 sm:h-150 rounded-xl brightness-75 object-cover'/>
                <div className='relative top-20  z-10 h-full'>
                  <h3 
                  className='text-3xl pt-20 text-center font-bold text-slate-50 text-shadow-xs'>
                    Player Profile & Career Stats
                  </h3>
                  <p 
                  className='text-lg px-5 text-center font-medium text-slate-200'>
                    Explore detailed player information, performance statistics, and career highlights in one place.
                  </p>
                  <Link to="/PlayerSection">
                  <div 
                  className='absolute flex rounded-b-xl justify-center py-5 w-full text-slate-200 bg-gray-950/60 shadow-[0_-6px_16px_-4px_rgba(0,0,0,0.55)] bottom-0'>
                    <button 
                    className='text-xl  font-bold'>
                      View
                    </button>
                  </div>
                  </Link>
                </div>
                
              </div>
            </div>
            <div>            
              <AIChatWidget/>
            </div>
        </section>      
      </div>
      <Outlet/>
    </div>
  )
}

export default FrontPage
