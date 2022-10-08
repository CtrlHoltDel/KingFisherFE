import { useState } from "react";
import Header from "./components/Header";
import Tables from "./features/tables/Tables";
import SplashPage from "./screens/SplashPage";
import "./style/index.css"

function App() {

  const [user, setUser] = useState(null)
  const logoutUser = () => setUser(null)

  if(!user) return <SplashPage setUser={setUser}/>

  return (
    <div className="App">
      <Header logoutUser={logoutUser}/>
      <Tables />
    </div>
  );
}

export default App;
