import { useState } from "react";
import SplashPage from "./screens/SplashPage";
import "./style/index.css"

function App() {

  const [user, setUser] = useState({
    "username": "newuser",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjIwLCJ1c2VybmFtZSI6Im5ld3VzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCQwVVZaQXBMRnQyNHdUc3NNNy9naVJPWkVmMEtnbWQyM1NaSXIuWEhWLmpaWTdaTVY0TE9sMiIsImFkbWluIjp0cnVlLCJ2YWxpZGF0ZWQiOnRydWUsInVfY3JlYXRlZF9hdCI6IjIwMjItMTAtMDhUMTc6MTg6MTAuNDMxWiJ9LCJpYXQiOjE2NjUyNTAxMDN9.7yK2ahvM-pXFTCTMiT66QGa2wXZrt1MdGIgn4Ouz_GU",
    "admin": true,
    "validated": true
  })
  const logoutUser = () => setUser(null)

  if(!user) return <SplashPage setUser={setUser}/>

  return (
    <div className="App">
      <button onClick={logoutUser}>Log Out</button>
    </div>
  );
}

export default App;
