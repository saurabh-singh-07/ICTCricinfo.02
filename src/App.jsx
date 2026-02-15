import { useState, Suspense, lazy, } from 'react'
import Header from './Layout/Header'
import Sidebar  from './Layout/Sidebar'
import FrontPage from './Pages/FrontPage'
import ScoreCard from './Pages/ScoreCard/ScoreCard'
import Footer from './Layout/Footer'
import { Routes , Route,useLocation } from 'react-router'
import { AnimatePresence,motion } from "framer-motion";
import Loader from './components/Loader'
import SignIn from './Pages/SginIn'
const Login = lazy(()=> import ( './Pages/Login'))
const PageNotFound = lazy(()=> import ( './Pages/PageNotFound'))
const PlayerProfileSection = lazy(()=> import ( './Pages/ProfileSection/PlayerProfileSection'))
const MatchSection = lazy(()=> import ('./Pages/MatchSection/MatchSection'))
const UpcomingMatch = lazy(()=> import ( './Pages/MatchSection/UpcomingMatch'))
const RecentMatch = lazy(()=> import ( './Pages/MatchSection/RecentMatch'))
const PlayerProfile = lazy(()=> import ( './Pages/ProfileSection/PlayerProfile'))
const Score = lazy(()=> import ( './Pages/ScoreCard/score'))

function App() {
  const [sideBarShow, setSideBarShow] = useState(false)
  
  const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
     className='min-h-screen bg-radial from-slate-200 via-gray-200 to-indigo-100 dark:from-slate-700/90 dark:to-slate-800/90 dark:via-slate-600/90 transition-all duration-500'>
      <div className='flex min-h-screen overflow-hidden'>
        <Sidebar 
          sideBarShow={sideBarShow}
          setSideBarShow={setSideBarShow}/>
        <div className='flex-1 flex flex-col '>
          <Header
          sideBarShow = {sideBarShow}
          setSideBarShow = {setSideBarShow}/>
            <main className='bg-transparent flex justify-center flex-col'>
            <AnimatePresence mode="wait">
            <Suspense fallback={<Loader/>}>
             <Routes location={location} key={location.pathname}>
                <Route path="/" element={<FrontPage/>} ></Route>
                  <Route path="/Matchs-section" element={<MatchSection/>}>
                    <Route path="/Matchs-section/Upcomming-Matchs" element={<UpcomingMatch/>}/>
                    <Route index element={<RecentMatch/>}/>
                  </Route>
                  <Route path='/Matchs-section/:id' element={<ScoreCard/>}/>
                  <Route path="/PlayerSection" element={<PlayerProfileSection/>}/>
                    <Route path = "/PlayerSection/:id" element={<PlayerProfile/>}/>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/SginIn" element={<SignIn/>}/>
                  <Route path="/*" element={<PageNotFound/>}></Route>
              </Routes> 
              </Suspense>
            </AnimatePresence>
            
            </main>
            
        </div>
      </div>
      <footer className='bg-gray-900/90 dark:bg-gray-900/50 text-slate-200 p-5 shadow-[0_-6px_16px_-4px_rgba(0,0,0,0.25)] border-t border-slate-500/40'>
        <Footer/>
      </footer>
    </motion.div>
  )
}

export default App
