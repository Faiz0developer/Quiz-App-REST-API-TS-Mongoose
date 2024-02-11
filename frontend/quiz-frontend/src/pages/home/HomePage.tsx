import React from 'react'

import Hero from './components/Hero'
import '../../styles/home.css'
import AllPublishQuizSection from './components/AllPublishQuizSection'

const HomePage:React.FC = () => {
  return (
    <div className="pb-10 relative">
      <Hero/>
      <AllPublishQuizSection/>
    </div>
  )
}

export default HomePage