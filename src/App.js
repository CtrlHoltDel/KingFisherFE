import MobileNav from "./components/MobileNav";
import SplashPage from "./screens/SplashPage";
import "./style/index.css"

import useUser from "./hooks/useUser";

import Mobile from "./Mobile";


function App() {

  const { user, logout, login, config } = useUser()

  if(!user) return <SplashPage login={login}/>

  return (
    <div className="App">
      <div className="body-container-mobile">
        <Mobile user={user} logout={logout} login={login} config={config}/>
      </div>
    </div>
  );
}

export default App;
