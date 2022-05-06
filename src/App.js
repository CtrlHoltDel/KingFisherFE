import { useState } from "react";
import Header from "./components/Header";
import LoginForm from "./screens/LoginForm";
import "./style/index.css"

function App() {

  const [user, setUser] = useState(null)

  if(!user) return <LoginForm setUser={setUser}/>

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
