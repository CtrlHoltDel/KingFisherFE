import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/common/LoginForm";
import Desktop from "./Desktop";
import useHandleWindow from "./hooks/useHandleWindow";
import useUser from "./hooks/useUser";
import Touch from "./Touch";

import loading from "./assets/loading.svg";

function App() {
  const {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    selectedPlayer,
    selectPlayer,
    addNoteToPlayer,
    generalLoading,
    updateType,
  } = useUser();
  const { windowType, TOUCH_SIZE } = useHandleWindow();

  if (!user) return <LoginForm handleSetUser={handleLogin} />;

  return (
    <BrowserRouter>
      <div className="App">
        {generalLoading && (
          <img className="corner-load" src={loading} alt="loading-icon"></img>
        )}
        {windowType === TOUCH_SIZE ? (
          <Touch
            user={user}
            logoutUser={logoutUser}
            selectGroup={selectGroup}
            currentlySelectedGroup={currentlySelectedGroup}
            selectPlayer={selectPlayer}
            selectedPlayer={selectedPlayer}
            addNoteToPlayer={addNoteToPlayer}
            updateType={updateType}
          />
        ) : (
          <Desktop
            user={user}
            logoutUser={logoutUser}
            currentlySelectedGroup={currentlySelectedGroup}
            selectGroup={selectGroup}
            selectedPlayer={selectedPlayer}
            selectPlayer={selectPlayer}
            addNoteToPlayer={addNoteToPlayer}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
