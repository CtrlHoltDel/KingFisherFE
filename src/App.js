import { useState } from "react";
import Header from "./components/Header";
import Tables from "./features/tables/Tables";
import LoginForm from "./screens/LoginForm";
import "./style/index.css"

function App() {

  const [user, setUser] = useState({ username: "Ryan" })

  const logoutUser = () => setUser(null)

  if(!user) return <LoginForm setUser={setUser}/>

  return (
    <div className="App">
      <Header logoutUser={logoutUser}/>
      <Tables />
    </div>
  );
}

export default App;
