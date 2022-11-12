import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/common/LoginForm";
import { UserContext } from "./context/UserContext";
import Desktop from "./Desktop";
import useHandleWindow from "./hooks/useHandleWindow";
import useUser from "./hooks/useUser";
import Touch from "./Touch";

function App() {
  const { windowType, TOUCH_SIZE } = useHandleWindow();

  const {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    config,
  } = useUser();

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
