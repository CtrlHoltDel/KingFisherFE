import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/common/LoginForm";
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
  } = useUser();

  if (!user) return <LoginForm handleSetUser={handleLogin} />;

  return (
    <BrowserRouter>
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
            logoutUser={logoutUser}
            currentlySelectedGroup={currentlySelectedGroup}
            selectGroup={selectGroup}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
