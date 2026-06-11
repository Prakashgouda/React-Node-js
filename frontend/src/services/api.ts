export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export type AuthRequest = {
  name?: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
};

export async function postAuth(path: string, body: AuthRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Authentication request failed');
  }

  return data;
}
