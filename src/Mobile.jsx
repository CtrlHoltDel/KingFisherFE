import React from 'react'
import { Routes, Route } from "react-router-dom";
import Admin from './screens/Admin';
import Account from './screens/Account';
import Tables from './screens/Tables';
import Players from './screens/Players';
import MobileNav from './components/MobileNav';

const Mobile = ({ user, config, logout }) => {
  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/m-account" element={<Account user={user} />} />
          <Route path="/m-admin" element={<Admin user={user} />} />
          <Route path="/m-tables" element={<Tables user={user} />} />
          <Route path="*" element={<Players user={user} config={config}/>} />
        </Routes>
      </div>
      <MobileNav user={user} isAdmin={user.admin} logout={logout}/>
    </>
  )
}

export default Mobile