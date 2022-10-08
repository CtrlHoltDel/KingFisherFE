import React from 'react'
import { Link } from "react-router-dom";

import { GiFishing, GiPokerHand } from 'react-icons/gi'
import { MdAccountCircle, MdAdminPanelSettings } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'

import '../style/mobile/mobile.css'

const MobileNav = ({ isAdmin, logout }) => {
  
  return (
    <nav className="mobile-nav">
      <Link to="/players">
        <button>
          <GiFishing />
          <p>Players</p>
        </button>
      </Link>
      <button>
        <GiPokerHand />
        <p>Tables</p>
      </button>
      <Link to="/account">
        <button>
          <MdAccountCircle />
          <p>Account</p>
        </button>
      </Link>
      {isAdmin &&       
        <Link to="/admin">
          <button>
            <MdAdminPanelSettings />
            <p>Admin</p>
          </button>
        </Link>
      }
      <button onClick={logout}>
        <AiOutlineLogout />
        <p>Log Out</p>
      </button>
    </nav>
  )
}

export default MobileNav