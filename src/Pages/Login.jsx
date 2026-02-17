import { Lock, Mail } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

function Login() {

  return (
    <div className='p-5 mt-10 flex justify-center bg-transparent'>
      <div className='w-full h-fit max-w-md borderborder-slate-300 bg-stone-300/70 dark:bg-gray-400/50 rounded-2xl shadow-xl' >
      
       <div className='text-center flex flex-col justify-center items-center my-15 pt-5'>
        <div className='w-7  h-10 rounded-full animate-bounce bg-red-600'></div>
        <h2 className='text-3xl p-2 dark:text-slate-50 text-shadow-2xs font-bold'>Login</h2>
        <p className='text-sm font-medium dark:text-slate-100 text-slate-600'>Enter your credentails to access your account</p>
       </div>

       <div className='px-4 font-bold '>
        <label 
        htmlFor="email">
          Email address
        </label>
        <div className='flex items-center border text-slate-600 border-slate-300 bg-slate-200 mt-1 mb-5 p-2 rounded-xl gap-2'>
          <Mail className='w-6 h-5  '/>
          <input
          className='text-slate-950 outline-none w-full' 
          name='email' 
          type="email" 
          placeholder={`name@example.com`} />
        </div>

        <label htmlFor="password">Password</label>
        <div className='flex items-center border border-slate-300 bg-slate-200 my-1 p-2 rounded-xl gap-2'>
          <Lock className='w-6 h-5 text-slate-600 '/>
          <input 
            className='text-slate-950 outline-none w-full' 
            name='password' 
            type="password" 
            placeholder={`Enter your password`} />
        </div>
        <div className='flex justify-end'>
          <a 
          className='text-sm font-medium hover:text-red-500/80 text-end transition-colors duration-200' 
          href="#">
            Forget Password ?
          </a>
        </div>
          <button 
          className='px-4 w-full text-center text-white py-1 bg-blue-600 hover:shadow-2xs hover:scale-103 transition-all duration-200 hover:shadow-blue-600 hover:bg-blue-700 rounded-xl text-xl font-bold my-5'>
            Login
          </button>

         <p className="text-center dark:text-gray-200 text-gray-700/90  mb-8 text-sm">
          Don’t have an account?{" "}
          <Link to="/SginIn">
          <span className="dark:text-white font-semibold cursor-pointer hover:underline">           
              sign Up           
          </span>
          </Link>
        </p>
       </div>
      </div>
    </div>
  )
}

export default Login
