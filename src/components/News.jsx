import React, { useEffect, useState } from 'react'
import { getNewsList } from '@/Api/cricBuzzApi'
import Loader from './Loader'
import Reveal from './Reveal'
function News() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(()=>{
        setLoading(true)
        getNewsList().then
        ((data)=>{
            console.log(data.storyList);
            setError(null);
            setData(data?.storyList);
        }).catch((err)=>{
            setError(err)
            console.log("Currently unavailable" ,err)
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    if (loading) return <Loader />;
    if (error) return  message={error};

    let showData = '';
    if(Array.isArray(data) && data.length > 0){
        showData = data.slice(0, 8).map((news)=>{
            if(news.story){
            return(
                <Reveal>
                <div className='card my-6 rounded w-full flex flex-col sm:flex-row items-center hover:scale-99 transition-all duration-200 h-fit'>                    
                    <img 
                    src={`https://www.cricbuzz.com/a/img/v1/275x152/i1/c${news?.story?.coverImage?.id}/player.jpg`}  
                    alt="" 
                    loading='lazy'
                    className='rounded sm:w-60 h-50 m-4 object-cover'/>
                    <div className='mt-5 w-full'>
                        <h4 className='text-xl font-bold pl-2 sm:pl-0 py-2'>{news?.story?.context}</h4>
                        <p className='mx-5 text-sm py-3 '>
                            {news?.story?.intro}
                        </p>
                        <button 
                        className=' text-white w-full h-10 mt-10 bg-gray-800 sm:rounded-xl'>
                            View more
                        </button>
                    </div>
                </div>
                </Reveal>
            )}
        })
    }

  return (
    <section className='w-full mt-10 p-8 max-w-200 '>
      <h3 className='heading-style text-3xl font-bold my-6'>Latest News</h3>
        {showData}
    </section>
  )
}

export default News
