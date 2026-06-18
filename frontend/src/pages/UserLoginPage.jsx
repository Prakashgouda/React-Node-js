//UserLogin page
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const UserLoginPage = ({ onSwitchPage, onSuccess, onHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const isFormValid =
    email.trim() &&
    password.trim() &&
    password.length >= 6 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      return false;
    }
    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      return false;
    }
    if (value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });

    let hasError = false;
    if (!validateEmail(email)) {
      hasError = true;
    }
    if (!validatePassword(password)) {
      hasError = true;
    }
    if (hasError) {
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        const message = err || "Login failed";
        setErrors((prev) => ({ ...prev, password: message }));
      });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div style={{ marginBottom: 12 }}>
          <button
            className="auth-button"
            type="button"
            onClick={onHome}
            style={{
              background: "#6b7280",
              padding: "4px 8px",
              fontSize: "11px",
              border: "none",
              cursor: "pointer",
              borderRadius: 3,
              width: "fit-content",
            }}
          >
            ← Home
          </button>
        </div>
        <h1 className="auth-title">Login</h1>

        <p className="auth-subtitle">Welcome back. Please login to continue.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="auth-label">Email</span>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <p className="auth-error">{errors.email}</p>
          </label>
          <label className="auth-field">
            <span className="auth-label">Password</span>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              onBlur={(e) => validatePassword(e.target.value)}
              placeholder="Enter your password"
            />
            <p className="auth-error">{errors.password}</p>
          </label>

          <button className="auth-button" type="submit" disabled={!isFormValid}>
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don&apos;t have an account?
          <button className="auth-link" type="button" onClick={onSwitchPage}>
            Signup
          </button>
        </p>
      </section>
    </main>
  );
};
export default UserLoginPage;
