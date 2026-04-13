import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// PostgreSQL Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function initDB() {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database.');
    client.release();
    
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title_ru VARCHAR(255) NOT NULL,
        title_en VARCHAR(255) NOT NULL,
        title_uz VARCHAR(255) NOT NULL,
        description_ru TEXT,
        description_en TEXT,
        description_uz TEXT,
        video_url TEXT,
        thumbnail_url TEXT,
        category VARCHAR(50),
        rating DECIMAL(3,1),
        year INT,
        duration VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
    console.log('Falling back to in-memory storage for development...');
  }
}

// Auth Routes
// Auth Routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    res.json({ message: 'User registered successfully' });

  } catch (err: any) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Database error' });
  }
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none'
});

    res.json({ email: user.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Movies API
app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Vite Integration
async function startServer() {
  await initDB();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.use((req, res, next) => {
  const userId = req.session?.userId || req.ip;

  onlineUsers.set(userId, Date.now());

  next();
});
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Vite middleware integrated.');
  });
}

console.log('Starting server...');
startServer().catch(err => {
  console.error('Failed to start server:', err);
});

app.get('/api/online', (req, res) => {
  const now = Date.now();

  const activeUsers = [...onlineUsers.values()].filter(
    time => now - time < 5 * 60 * 1000
  );

  res.json({ online: activeUsers.length });
});
