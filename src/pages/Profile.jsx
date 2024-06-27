import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { createImageUrl } from '../services/movieService';
import { arrayRemove, doc, updateDoc, onSnapshot } from 'firebase/firestore';

function Profile() {
  const [uniqueMovies, setUniqueMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) {
          const movies = doc.data().favShows;
          // Filter out duplicates based on id and title
          const uniqueMoviesMap = new Map();
          movies.forEach(movie => uniqueMoviesMap.set(`${movie.id}_${movie.title}`, movie));
          // Set the unique movies array
          setUniqueMovies(Array.from(uniqueMoviesMap.values()));
        }
      });

      return unsubscribe;
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + offset;
  }

  const handleRemoveShow = async (movie) => {
    const userDoc = doc(db, 'users', user.email);
  
    // Remove the movie from the local state
    setUniqueMovies(prevMovies => prevMovies.filter(prevMovie => prevMovie.id !== movie.id));
  
    // Update the Firestore document to remove the movie
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  if (!user) {
    return (
      <>
        <p>Feching shows....</p>
      </>
    );
  }

  return (
    <div>
      <div>
        <img
          className='bloc w-full h-[500px] object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/efd52ccd-0212-4d90-89c5-e45ff45bb0b0/GR-el-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="//"
        />
        <div className='bg-black/60 top-0 left-0 fixed w-full h-[500px]' />
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>
            My Shows
          </h1>
          <p className='text-lg  text-gray-400'>{user.email}</p>
        </div>
      </div>

      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Favorite Shows</h2>

      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={() => slide(-500)}
          className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40}
        />
        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {uniqueMovies.map(({ id, title, backdrop_path, poster_path }) => (
            <div key={`${id}_${title}`} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
              <img
                className='w-full h-40 block object-cover object-top'
                src={createImageUrl(backdrop_path ?? poster_path, "w500")}
                alt={title}
              />
              <div className='absolute top-0 left-0 w-full h-40 bg-black opacity-0 hover:opacity-80 '>
                <p className='whitespace-normal text-sm  md:text-base flex justify-center items-center h-full font-nsans-bold m-4'>
                  {title}
                </p>

                <p>
                  <AiOutlineClose 
                    size={30} 
                    className='absolute top-2 right-2'
                    onClick={() => handleRemoveShow({ id, title, backdrop_path, poster_path })}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40}
        />
      </div>

    </div>
  );
}

export default Profile;