# API examples (curl)

Assumes the backend runs on http://localhost:5000

Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

Get profile (protected)

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/profile
```

Update profile (protected)

```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"Alice Smith","email":"alice.smith@example.com","password":"newpass123"}'
```

Note: the update endpoint returns the updated `user` and a refreshed `token` when successful.
