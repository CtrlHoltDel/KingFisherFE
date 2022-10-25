import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="touch-container__nav">
      <Link to="/m/players">
          <button>Players</button>
      </Link>
      <Link to="/m/groups">
          <button>Groups</button>
      </Link>
      <Link to="/m/account">
          <button>Account</button>
      </Link>
    </nav>
  )
}

export default Navigation