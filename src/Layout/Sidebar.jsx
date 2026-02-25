import { 
        Contact, 
        Home, 
        LayoutDashboard,  
        LogIn,  
        Radio,  
        Settings, 
         User, 
         Users, 
         X, 
        } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

function Sidebar({sideBarShow, setSideBarShow}) {
  const sidebarItems = [
    
    {title: "Home", logo: Home , link : "/" },
    {title: "About", logo: User , link : "#"},
    {title: "Contact", logo: Contact , link : "#"},
    {title: "Settings", logo: Settings , link : "#"},
    {title: "Player Info", logo : Users, link : "/PlayerSection"},
    {title: "Live Matchs", logo : Radio, link : "/Matchs-section/Live-Matchs"}
  ]
  return (
    <div className={` h-screen bg-linear-to-r from-slate-50 to-indigo-50  dark:from-slate-800 dark:to-slate-900 border-r border-slate-600 flex flex-col transition-all  duration-300 z-50 fixed top-0 left-0
    ${sideBarShow ? "w-60 lg:w-68" : "w-0"}`}>
      {sideBarShow && (
        <nav className='h-screen'>
          <div className='w-full h-17 flex items-center justify-center border border-slate-800 dark:border-slate-700'>
            <p className='text-4xl pr-6 text-amber-600 font-bold '>
              ICT
              <span className='text-2xl text-slate-900/50 dark:text-gray-200 font-medium'>
                CricInfo
              </span>
              <button className='absolute border border-slate-500 p-1 rounded top-5 right-2' onClick={()=>setSideBarShow(!sideBarShow)}><X className='w-6 text-slate-900/50 dark:text-gray-200 h-6 mt-1'/></button>

            </p>
          </div>
          <div className='p-3'>
            <div className='flex space-x-3 justify-center dark:text-slate-300  bg-linear-0  from-blue-700 to-indigo-500 rounded-xl p-2.5 shadow-blue-400 shadow-sm w-full text-2xl font-semibold '>
              <LayoutDashboard className='w-8 h-8 '/>
              <span>Dashboard</span>
          </div>
          </div>
          <div className='flex flex-col space-y-7 p-4'>
          {
            sidebarItems.map((item,index)=>{
              return(
                <div className='flex items-center h-10 space-x-5 text-lg dark:text-slate-400 text-slate-800 font-medium hover:dark:bg-slate-800 hover:bg-slate-200 hover:rounded' key={index}>
                  <item.logo className=' w-6 h-6'/>
                  <Link to={item.link}><span >{item.title}</span></Link>
                </div>
              )
            })
          }
          </div>
        </nav>
        
      )}
      {
        sideBarShow && (
          <div className='flex space-x-4 p-4 dark:text-slate-300 text-slate-900/50 border dark:border-slate-500 border-slate-800 font-semibold text-xl '>
            <LogIn className='w-6 h-7'/>
            <Link to="/SginIn"><span>Login/signup</span></Link>
          </div>
        )
      }
      
    </div>
  )
}

export default Sidebar
