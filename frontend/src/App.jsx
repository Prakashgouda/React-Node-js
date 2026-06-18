import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/UserLoginPage.jsx";
import Signup from "./pages/UserSignupPage.jsx";
import Welcome from "./pages/WelcomePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { logout } from "./store/authSlice.js";

function App() {
  const [screen, setScreen] = useState("home");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleNavigate = (page) => {
    if (page === "logout") {
      dispatch(logout());
      setScreen("home");
    } else {
      setScreen(page);
    }
  };

  const handleHome = () => {
    setScreen("home");
  };

  const handleLoginSuccess = () => {
    setScreen("home");
  };

  const handleSignupSuccess = () => {
    setScreen("home");
  };

  return (
    <div>
      {screen === "home" && <HomePage onNavigate={handleNavigate} />}
      {screen === "login" && (
        <Login
          onSwitchPage={() => setScreen("signup")}
          onSuccess={handleLoginSuccess}
          onHome={handleHome}
        />
      )}
      {screen === "signup" && (
        <Signup
          onSwitchPage={() => setScreen("login")}
          onSuccess={handleSignupSuccess}
          onHome={handleHome}
        />
      )}
      {screen === "profile" && user && <Welcome onHome={handleHome} />}
    </div>
  );
}

export default App;
