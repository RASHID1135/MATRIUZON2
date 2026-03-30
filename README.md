# Matriuzon - Full Stack Movie App

This project is a full-stack movie application with a React frontend (Vite) and an Express backend, using MySQL for data persistence.

## Features
- User Registration & Login (JWT Auth)
- Movie Listing from Database
- Multi-language support (RU, EN, UZ)
- Responsive Design (Tailwind CSS)

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Create a PostgreSQL database named `matriuzon_db`.
   - Run the SQL commands in `schema.sql` to create the tables.
   - Update your `.env` file with your `DATABASE_URL` (see `.env.example`).

3. **Run the App:**
   ```bash
   npm run dev
   ```

## Deployment to GitHub

1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Create a repo on GitHub and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Deployment to Render

1. **Create a PostgreSQL Database** on [Render](https://render.com).
2. **Create a Web Service** on Render.
3. **Connect your GitHub Repository**.
4. **Configure Settings:**
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. **Add Environment Variables:**
   - `DATABASE_URL`: Copy the **Internal Database URL** from your Render PostgreSQL dashboard.
   - `JWT_SECRET`: A random secret string
   - `NODE_ENV`: `production`
