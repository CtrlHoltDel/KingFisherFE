import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/common/LoginForm";
import { UserContext } from "./context/UserContext";
import Desktop from "./Desktop";
import useHandleWindow from "./hooks/useHandleWindow";
import useUser from "./hooks/useUser";
import Touch from "./Touch";

import loadingIcon from "./assets/loading.svg";
import { APIping } from "./api/actions";

function App() {
  const { windowType, TOUCH_SIZE } = useHandleWindow();
  const [serverCheck, setServerCheck] = useState(true);

  const {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    config,
  } = useUser();

  useEffect(() => {
    const checkServer = async () => {
      const { success, error } = await APIping()
      if(error){
        console.log(error)
      } else {
        console.log(success)
        setServerCheck(false)
      }
    }

    checkServer()
  }, [])


  if (serverCheck)
    return (
      <div className="server-ping-screen">
        <img src={loadingIcon} alt="loading-icon"></img>
      </div>
    );

  if (!user) return <LoginForm handleSetUser={handleLogin} />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          handleLogin,
          logoutUser,
          selectGroup,
          currentlySelectedGroup,
          config,
        }}
      >
        <div className="App">
          {windowType === TOUCH_SIZE ? (
            <Touch
              user={user}
              logoutUser={logoutUser}
              selectGroup={selectGroup}
              currentlySelectedGroup={currentlySelectedGroup}
            />
          ) : (
            <Desktop
              user={user}
              currentlySelectedGroup={currentlySelectedGroup}
              selectGroup={selectGroup}
            />
          )}
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
