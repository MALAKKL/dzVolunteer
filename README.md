# DZ Volunteer - Algerian Volunteering Platform

![CI/CD Status](https://img.shields.io/github/actions/workflow/status/USER_NAME/REPO_NAME/main.yml?branch=main&label=Build%20%26%20Test&style=flat-square)
![License](https://img.shields.io/badge/license-ISC-green?style=flat-square)

DZ Volunteer is a modern platform designed to connect passionate volunteers with impactful organizations across Algeria. Our mission is to digitize and simplify the process of community service, from mission discovery to skill validation.

## 🚀 Key Features

- **For Volunteers:** 
  - Discover missions based on SDGs (Sustainable Development Goals) and skills.
  - Track volunteering hours and impact.
  - Get professional skills verified by administrators.
- **For Organizations:** 
  - Post and manage volunteer missions.
  - Approve applications and validate participant hours.
  - Search for skilled volunteers.
- **For Administrators:** 
  - Verify skill certificates and manage platform integrity.

## 🛠️ Technology Stack

- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL.
- **Frontend:** React (Vite), Vanilla CSS, React Icons.
- **Infrastructure:** Docker, JWT Auth, Cloudinary (Image CDN).

## 📂 Project Structure

- `/BACKEND`: Express API with Prisma schema and logic.
- `/FRONTEND`: React application.
- `ARCHITECTURE_DECISIONS.md`: Justification of technical choices.
- `DEPLOYMENT.md`: Step-by-step installation guide.
- `docker-compose.yml`: Local orchestration.

## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dzvolunteer.git
   cd dzvolunteer
   ```

2. **Run with Docker (Recommended):**
   ```bash
   docker-compose up --build
   ```

3. **Manual Setup:**
   See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on setting up Backend and Frontend manually.

## 📄 Documentation
- [Architecture Decisions](./ARCHITECTURE_DECISIONS.md)
- [Deployment Guide](./DEPLOYMENT.md)

---
Developed as part of the Advanced Software Engineering curriculum.