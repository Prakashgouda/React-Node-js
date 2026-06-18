import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HomePage = ({ onNavigate }) => {
  const user = useSelector((state) => state.auth.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div style={{ textAlign: "center" }}>
          <h1 className="auth-title">Welcome</h1>
          <p className="auth-subtitle">
            {isLoggedIn
              ? `Hello, ${user.name}! You are successfully logged in.`
              : "Manage your profile securely and easily"}
          </p>

          {isLoggedIn ? (
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <button
                className="auth-button"
                type="button"
                onClick={() => onNavigate("profile")}
              >
                Go to Profile
              </button>
              <button
                className="auth-button"
                type="button"
                onClick={() => onNavigate("logout")}
                style={{ background: "#ef4444" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <button
                className="auth-button"
                type="button"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
              <button
                className="auth-button"
                type="button"
                onClick={() => onNavigate("signup")}
                style={{ background: "#10b981" }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          <p>
            🔒 Your data is securely stored in MongoDB
            <br />
            ✅ Password encrypted with bcryptjs
            <br />
            🎫 Authentication via JWT tokens
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
