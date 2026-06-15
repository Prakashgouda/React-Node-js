import { useState } from "react";
import Login from "./pages/UserLoginPage.jsx";
import Signup from "./pages/UserSignupPage.jsx";

function App() {
  const [screen, setScreen] = useState("login");

  return (
    <div>
      {screen === "login" ? (
        <Login onSwitchPage={() => setScreen("signup")} />
      ) : (
        <Signup onSwitchPage={() => setScreen("login")} />
      )}
    </div>
  );
}

export default App;
