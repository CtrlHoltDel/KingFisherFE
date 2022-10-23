import LoginForm from "./components/LoginForm";
import Desktop from "./Desktop";
import useHandleWindow from "./hooks/useHandleWindow";
import useUser from "./hooks/useUser";
import Touch from "./Touch";

function App() {
  const { user, handleLogin } = useUser();
  const { windowType, TOUCH_SIZE } = useHandleWindow();

  if (!user) return <LoginForm handleLogin={handleLogin} />;

  return (
    <div className="App">
      {windowType === TOUCH_SIZE ? <Touch /> : <Desktop />}
    </div>
  );
}

export default App;
