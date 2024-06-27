import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints, { createImageUrl } from '../services/movieService';

function Hero() {

    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(endpoints.popular).then((response) => {
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            console.log(randomMovie.title);
            setMovie(randomMovie);
        })
    }, []);

    const truncate = (str, length) => {
        if (!str) return "";

        return str.length > length ? str.slice(0, length) + '...' : str
    };

    if (!movie)
        return (
            <>
            <p>Fetching movie....</p>
            </>
    );

    const {title, backdrop_path, release_date, overview } = movie;

  return (
    <div className='w-full h-[550px] lg:h-[850px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black' />
            <img 
              className='w-full h-full object-cover object-top'
                src={createImageUrl(backdrop_path, "original")} 
                alt={title} 
            />

            <div className='absolute w-full top-[30%] sm:top-[15%] lg:top-[25%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-6xl '>{title}</h1>
                <div className='mt-8 mb-4'>
                    <button className='capitalize border-2 rounded-2xl bg-gray-300 text-black py-2 px-5'>
                        Play
                    </button>
                    <button className='capitalize border-2 rounded-2xl border-gray-300 py-2 px-5 ml-4'>
                        Watch later
                    </button>
                </div>
                <p className='text-gray-400 text-sm'>{release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview, 165)}</p>
            </div>
      </div>
    </div>
  )
};

export default Hero
 