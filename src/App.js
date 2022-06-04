import { useState } from "react";
import Header from "./components/Header";
import Tables from "./features/tables/Tables";
import LoginForm from "./screens/LoginForm";
import "./style/index.css"

function App() {

  const [user, setUser] = useState({ username: "Ryan" })

  if(!user) return <LoginForm setUser={setUser}/>

  return (
    <div className="App">
      <Header />
      <Tables />
    </div>
  );
}

export default App;
