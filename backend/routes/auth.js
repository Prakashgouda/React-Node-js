const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// DEBUG: Set breakpoints on the signup and login route handlers below.
// In VS Code, open this file and click to the left of a line number.
// Then run the backend with the Node debugger to inspect req.body and response values.

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const existingUser = users.find((user) => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists with that email.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email: normalizedEmail,
    password: hashedPassword,
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({
    message: 'Signup successful',
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const user = users.find((item) => item.email === normalizedEmail);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // DEBUG: Login succeeded. Break here to inspect the generated token and returned user data.
  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;
