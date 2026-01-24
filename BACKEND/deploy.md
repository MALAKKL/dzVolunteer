# 🚀 dzVolunteer Deployment Guide

Follow these steps to put your project live for free!

## 1. Setup Your Database (Free)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Go to **Project Settings > Database** and copy the **Transaction Connection String**.
3. It will look like: `postgresql://postgres.[ID]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

## 2. Setup Image Storage (Free & Persistent)
1. Create an account on [Cloudinary](https://cloudinary.com/).
2. Get your:
   - `Cloud Name`
   - `API Key`
   - `API Secret`

## 3. Deploy Backend (Render.com)
1. Connect your GitHub repository.
2. Create a **Web Service**.
3. **Build Command**: `cd BACKEND && npm install && npx prisma generate`
4. **Start Command**: `cd BACKEND && node src/index.js`
5. **Add Environment Variables**:
   - `DATABASE_URL`: (From Supabase)
   - `JWT_SECRET`: (Any random string)
   - `CLOUDINARY_CLOUD_NAME`: (From Cloudinary)
   - `CLOUDINARY_API_KEY`: (From Cloudinary)
   - `CLOUDINARY_API_SECRET`: (From Cloudinary)
   - `NODE_ENV`: `production`

## 4. Deploy Frontend (Vercel)
1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Vercel will auto-detect Vite.
3. **Environment Variables**:
   - `VITE_API_URL`: Your **Render Backend URL** (e.g., `https://dz-backend.onrender.com`)

---

### ✅ Automatic Table Builder Script
Before you deploy, run this command in your local terminal to ensure your Supabase database is ready:

```bash
# In the BACKEND folder
# Change DATABASE_URL in .env to your Supabase link first
npx prisma migrate dev --name init
```
