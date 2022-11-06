import React from 'react'
import Navigation from './components/desktop/Navigation'
import Tables from './components/desktop/Tables'

import './style/desktop.css'

const Desktop = ({ user, logoutUser }) => {
  return (
    <div className="desktop">
      <Navigation user={user} logoutUser={logoutUser}/>
      <Tables />
    </div>
  )
}

export default Desktop