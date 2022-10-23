import React from 'react'
import Navigation from './components/touch/Navigation'
import "./style/touch.css"


const Touch = () => {
  return (
    <div className="touch-container">
        <div className='touch-container__content'>Content Goes Here</div>
        <nav className="touch-container__nav">
          <Navigation />
        </nav>
    </div>
  )
}

export default Touch