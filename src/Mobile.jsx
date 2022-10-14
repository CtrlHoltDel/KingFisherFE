import React from 'react'
import { Routes, Route } from "react-router-dom";
import Admin from './screens/Admin';
import Account from './screens/Account';
import Tables from './screens/Tables';
import Players from './screens/Players';
import MobileNav from './components/MobileNav';
import useCache from './hooks/useCache';

const Mobile = ({ user, config, logout }) => {

  const {  loadingCurrentlySelected, selectedPlayer, notes, tendencies, recentSearches, updateSelectedPlayer, updateNotes } = useCache(user)

  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/m-account" element={<Account user={user} />} />
          <Route path="/m-admin" element={<Admin user={user} />} />
          <Route path="/m-tables" element={<Tables user={user} />} />
          <Route path="*" element={<Players user={user} config={config} loadingCurrentlySelected={loadingCurrentlySelected} selectedPlayer={selectedPlayer} notes={notes}
          tendencies={tendencies} updateSelectedPlayer={updateSelectedPlayer} recentSearches={recentSearches} updateNotes={updateNotes}/>} />
        </Routes>
      </div>
      <MobileNav user={user} isAdmin={user.admin} logout={logout}/>
    </>
  )
}

export default Mobile