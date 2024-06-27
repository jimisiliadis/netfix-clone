import React from 'react'
import Hero from '../components/Hero.jsx'
import Movierow from '../components/Movierow.jsx'
import endpoints from '../services/movieService.js'

function Home() {
  return (
    <>
      <Hero />
      <Movierow title='upcoming' url={endpoints.upcoming}/>
      <Movierow title='trending' url={endpoints.trending}/>
      <Movierow title='top rated' url={endpoints.topRated}/>
      <Movierow title='comedy' url={endpoints.comedy}/>
      <Movierow title='popular' url={endpoints.popular}/>
    </>
  )
}

export default Home
