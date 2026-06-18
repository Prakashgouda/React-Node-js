import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../store/authSlice";

const API_BASE = import.meta.env.VITE_APP_API_BASE || "http://localhost:5000";

const WelcomePage = ({ onHome }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(null);

  const isDirty = useMemo(
    () =>
      profile &&
      (form.name.trim() !== (profile.name || "").trim() ||
        form.email.trim() !== (profile.email || "").trim() ||
        (form.password && form.password.trim().length > 0)),
    [profile, form],
  );

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${API_BASE}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.message || "Failed to load profile");
        setProfile(data.user);
        setForm({
          name: data.user.name || "",
          email: data.user.email || "",
          password: "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) return null;

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
        <h1 className="auth-title">Welcome, {user.name}!</h1>
        <p className="auth-subtitle">You are logged in with {user.email}.</p>

        <div style={{ marginTop: 12 }}>
          {loading && <p>Loading profile...</p>}
          {error && <p className="auth-error">{error}</p>}
          {profile && !editing && (
            <div>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(profile.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <div style={{ marginTop: 12 }}>
                <button
                  className="auth-button"
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {profile && editing && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // client-side validation
                setFormErrors({ name: "", email: "", password: "" });
                let hasError = false;
                if (!form.name || !form.name.trim()) {
                  setFormErrors((s) => ({ ...s, name: "Name is required." }));
                  hasError = true;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!form.email || !emailRegex.test(form.email)) {
                  setFormErrors((s) => ({
                    ...s,
                    email: "Enter a valid email.",
                  }));
                  hasError = true;
                }
                if (
                  form.password &&
                  form.password.length > 0 &&
                  form.password.length < 6
                ) {
                  setFormErrors((s) => ({
                    ...s,
                    password: "Password must be at least 6 characters.",
                  }));
                  hasError = true;
                }
                if (hasError) return;
                setSaving(true);
                setError(null);
                try {
                  const res = await fetch(`${API_BASE}/api/profile`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name: form.name,
                      email: form.email,
                      password: form.password || undefined,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok)
                    throw new Error(data.message || "Failed to update profile");
                  setProfile(data.user);
                  // update global auth state and localStorage; accept refreshed token if provided
                  const newToken = data.token || token;
                  dispatch(
                    setCredentials({ user: data.user, token: newToken }),
                  );
                  if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    if (data.token) localStorage.setItem("token", data.token);
                  }
                  setEditing(false);
                  setForm((f) => ({ ...f, password: "" }));
                  setSuccess("Profile updated");
                  setTimeout(() => setSuccess(null), 3000);
                } catch (err) {
                  setError(err.message);
                } finally {
                  setSaving(false);
                }
              }}
            >
              <label className="auth-field">
                <span className="auth-label">Name</span>
                <input
                  className="auth-input"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setFormErrors((s) => ({ ...s, name: "" }));
                  }}
                />
                <p className="auth-error">{formErrors.name}</p>
              </label>
              <label className="auth-field">
                <span className="auth-label">Email</span>
                <input
                  className="auth-input"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setFormErrors((s) => ({ ...s, email: "" }));
                  }}
                />
                <p className="auth-error">{formErrors.email}</p>
              </label>
              <label className="auth-field">
                <span className="auth-label">New Password (optional)</span>
                <input
                  className="auth-input"
                  type="password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setFormErrors((s) => ({ ...s, password: "" }));
                  }}
                />
                <p className="auth-error">{formErrors.password}</p>
              </label>
              {error && <p className="auth-error">{error}</p>}
              {success && <div className="toast">{success}</div>}
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button
                  className="auth-button"
                  type="submit"
                  disabled={saving || !isDirty}
                  style={{ flex: 1, padding: "8px 12px", fontSize: "14px" }}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  className="auth-button"
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: profile.name,
                      email: profile.email,
                      password: "",
                    });
                    setFormErrors({ name: "", email: "", password: "" });
                  }}
                  style={{ flex: 1, padding: "8px 12px", fontSize: "14px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            <button
              className="auth-button"
              type="button"
              onClick={onHome}
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: "14px",
                background: "#6b7280",
              }}
            >
              Back
            </button>
            <button
              className="auth-button"
              type="button"
              onClick={() => dispatch(logout())}
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: "14px",
                background: "#ef4444",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;
