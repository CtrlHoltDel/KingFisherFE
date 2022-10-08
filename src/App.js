import { useState } from "react";
import MobileNav from "./components/MobileNav";
import SplashPage from "./screens/SplashPage";
import "./style/index.css"

import { Routes, Route, Link } from "react-router-dom";
import Players from "./screens/Players";
import Admin from "./screens/Admin";
import Account from "./screens/Account";
import NotFound from "./screens/NotFound";
import useUser from "./hooks/useUser";


function App() {

  const { user, logout, login } = useUser()

  if(!user) return <SplashPage login={login}/>

  return (
    <div className="App">
      <Routes>
        <Route path="/account" element={<Account user={user} />} />
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="*" element={<Players user={user} />} />
      </Routes>
      <MobileNav user={user} isAdmin={user.admin} logout={logout}/>
    </div>
  );
}

export default App;
