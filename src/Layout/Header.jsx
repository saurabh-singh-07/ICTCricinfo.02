import { Menu, Moon, Sun, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import  Sidebar  from '@/Layout/Sidebar'
import {Link} from 'react-router'
function Header({sideBarShow, setSideBarShow}) {
    const [darkMode, setDarkMode] = useState( () => {
         return localStorage.getItem('theme') === 'dark'});
    
    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme','dark')

        }else{
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

    },[darkMode]);
    return (
        <>
            <header className='flex px-3 py-4 bg-linear-135 from-blue-700 to-blue-600 text-slate-200 items-center justify-between z-0'>
                
                <div className='flex space-x-3 font-bold'>
                    <button onClick={()=>setSideBarShow(!sideBarShow)}><Menu className='w-6 h-6 mt-1'/></button>
                    
                    <p className='text-2xl lg:text-3xl'><span className='text-amber-600 text-3xl lg:text-4xl text-shadow-2xs text-shadow-amber-700'>ICT</span>CricInfo.com</p>
                </div>
                <div className='flex space-x-6' >
                    <ul className={`space-x-6 text-xl hidden lg:flex font-medium ${!sideBarShow ? "flex" : "hidden"}`}>
                        <Link to='/'><li className='nav-item'>Home</li></Link>
                        <Link to='/dsfkj'><li className='nav-item'>About</li></Link>
                        <Link to='#'><li className='nav-item'>Setting</li></Link>
                    </ul>      
                        <button className='bg-blue-400 hover:bg-blue-500 transition-colors duration-200 p-1.5 rounded-xl hover:shadow-md' onClick={()=>setDarkMode(!darkMode)}>
                            {
                                darkMode  ?
                                <Sun/> : <Moon/>
                            }
                        </button>
                    <Link to="/login">
                        <div className='bg-blue-400 hover:bg-blue-500 transition-colors duration-200 p-1.5 rounded-xl hover:shadow-md'>
                            <User/>
                        </div> 
                    </Link>
                                   
                </div>
            </header>
        </>
    )
}

export default Header
