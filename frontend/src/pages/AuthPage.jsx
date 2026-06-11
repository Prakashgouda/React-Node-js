import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  // DEBUG: Set a breakpoint in handleChange to inspect form input updates.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const path = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body = {
      email: form.email,
      password: form.password,
    };

    if (mode === 'signup') {
      body.name = form.name;
    }

    // DEBUG: Break here to inspect the request body before it is sent to the backend.
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to submit form.');
        return;
      }

      setToken(data.token);
      setMessage(`${mode === 'login' ? 'Logged in' : 'Signed up'} successfully!`);
      setForm({ name: '', email: '', password: '' });
      localStorage.setItem('authToken', data.token);
    } catch (fetchError) {
      setError('Unable to connect to the server.');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Login' : 'Signup'}</h1>

        <div className="toggle-row">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>
          )}

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
          </label>

          <button type="submit" className="submit-button">
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {token && (
          <div className="token-box">
            <strong>Token:</strong>
            <code>{token}</code>
          </div>
        )}
      </div>
    </main>
  );
}

export default AuthPage;
