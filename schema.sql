-- SQL Schema for Matriuzon App (PostgreSQL)
-- Use this to set up your PostgreSQL database

-- Users table for registration and login
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies table for storing video metadata
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
);

-- Example movie insertion
INSERT INTO movies (title_ru, title_en, title_uz, description_ru, video_url, category, rating, year)
VALUES ('Начало', 'Inception', 'Inception', 'Захватывающий фильм о снах.', 'https://example.com/inception.mp4', 'Action', 8.8, 2010);
