import React from 'react'

import HomeSearch from '../components/home/HomeSearch.jsx'
import HomeTrends from '../components/home/HomeTrends.jsx'
import HomeTrailers from '../components/home/HomeTrailers.jsx'
import HomePopular from '../components/home/HomePopular.jsx'

export default function HomePage() {
  return (
    <main>
      <HomeSearch />
      <HomeTrends />
      <HomeTrailers />
      <HomePopular />
    </main>
  )
}

