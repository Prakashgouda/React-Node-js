import { useState } from "react";

const UserSignupPage = ({ onSwitchPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateName = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    return true;
  };

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

  const validateConfirmPassword = (value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password.",
      }));
      return false;
    }
    if (value !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let hasError = false;
    if (!validateName(name)) {
      hasError = true;
    }
    if (!validateEmail(email)) {
      hasError = true;
    }
    if (!validatePassword(password)) {
      hasError = true;
    }
    if (!validateConfirmPassword(confirmPassword)) {
      hasError = true;
    }
    if (hasError) {
      return;
    }

    console.log("Signup submit", { name, email, password });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Signup</h1>

        <p className="auth-subtitle">Create your account to get started.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="auth-label">Name</span>
            <input
              className="auth-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              onBlur={(e) => validateName(e.target.value)}
              placeholder="Your name"
            />
            <p className="auth-error">{errors.name}</p>
          </label>
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
              placeholder="Create a password"
            />
            <p className="auth-error">{errors.password}</p>
          </label>
          <label className="auth-field">
            <span className="auth-label">Confirm Password</span>
            <input
              className="auth-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              onBlur={(e) => validateConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
            />
            <p className="auth-error">{errors.confirmPassword}</p>
          </label>

          <button className="auth-button" type="submit">
            Signup
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?
          <button className="auth-link" type="button" onClick={onSwitchPage}>
            Login
          </button>
        </p>
      </section>
    </main>
  );
};

export default UserSignupPage;
