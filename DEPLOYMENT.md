# Deployment Guide - DZ Volunteer

This guide explains how to deploy the DZ Volunteer platform.

## 1. Backend Deployment (Render / Railway / Heroku)

### Prerequisites
- A PostgreSQL database (e.g., Supabase or Render External DB).
- A Cloudinary account.

### Steps
1. Push your code to GitHub.
2. Create a new "Web Service" on your hosting provider.
3. Connect your GitHub repository.
4. Set the **Root Directory** to `BACKEND`.
5. Configure the following **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: A long random string.
   - `CLOUDINARY_CLOUD_NAME`: From Cloudinary dashboard.
   - `CLOUDINARY_API_KEY`: From Cloudinary dashboard.
   - `CLOUDINARY_API_SECRET`: From Cloudinary dashboard.
6. Build Command: `npm install && npx prisma generate`
7. Start Command: `npm start`

---

## 2. Frontend Deployment (Vercel / Netlify)

### Steps
1. Create a new project on Vercel.
2. Select your GitHub repository.
3. Set the **Root Directory** to `FRONTEND`.
4. Set the **Framework Preset** to `Vite`.
5. Configure the **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://dz-api.onrender.com`).
6. Click **Deploy**.

---

## 3. Local Deployment (Docker)
If you have Docker installed, you can launch the entire system with one command:
```bash
docker-compose up --build
```
Access the app at `http://localhost`.
