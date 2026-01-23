# dzVolunteer Backend - API Endpoints Documentation

**Base URL:** `http://localhost:5000/api`

---

## 🔐 AUTHENTICATION ROUTES

### 1. Register Volunteer
- **Method:** `POST`
- **URL:** `/auth/register/volunteer`
- **Auth:** None (Public)
- **Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```
- **Success Response (201):**
```json
{
  "message": "Volunteer registered",
  "volunteer": {
    "id": "volunteer_id",
    "userId": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2026-01-23T10:00:00Z"
  }
}
```

### 2. Register Organization
- **Method:** `POST`
- **URL:** `/auth/register/organization`
- **Auth:** None (Public)
- **Body:**
```json
{
  "name": "Red Crescent",
  "email": "org@example.com",
  "password": "Password123"
}
```
- **Success Response (201):**
```json
{
  "message": "Organization registered",
  "organization": {
    "id": "org_id",
    "userId": "user_id",
    "name": "Red Crescent"
  }
}
```

### 3. Login
- **Method:** `POST`
- **URL:** `/auth/login`
- **Auth:** None (Public)
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123",
  "role": "volunteer"
}
```
- **Success Response (200):**
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "role": "VOLUNTEER"
  }
}
```

### 4. Admin Login
- **Method:** `POST`
- **URL:** `/auth/login`
- **Auth:** None (Public)
- **Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin_password",
  "role": "admin"
}
```

### 5. Google Auth
- **Method:** `POST`
- **URL:** `/auth/google`
- **Auth:** None (Public)
- **Body:**
```json
{
  "token": "google_id_token"
}
```

### 6. Forgot Password
- **Method:** `POST`
- **URL:** `/auth/forgot-password`
- **Auth:** None (Public)
- **Body:**
```json
{
  "email": "john@example.com"
}
```
- **Success Response (200):**
```json
{
  "message": "Password reset email sent"
}
```

### 7. Reset Password
- **Method:** `POST`
- **URL:** `/auth/reset-password`
- **Auth:** None (Public)
- **Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewPassword123"
}
```

### 8. Get Profile
- **Method:** `GET`
- **URL:** `/auth/profile`
- **Auth:** Required (Bearer Token)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "id": "user_id",
  "email": "john@example.com",
  "role": "VOLUNTEER",
  "organization": null,
  "volunteer": {
    "id": "volunteer_id",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## 🏢 ORGANIZATION ROUTES

### 1. Get All Organizations
- **Method:** `GET`
- **URL:** `/organizations?search=Red&limit=20&offset=0`
- **Auth:** None (Public)
- **Query Params:**
  - `search` (optional): Search organizations by name or description
  - `limit` (optional): Number of results (default: 20)
  - `offset` (optional): Pagination offset (default: 0)
- **Success Response (200):**
```json
{
  "data": [
    {
      "id": "org_id",
      "userId": "user_id",
      "name": "Red Crescent",
      "description": "Humanitarian organization",
      "_count": {
        "missions": 5
      }
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}
```

### 2. Get Organization by ID
- **Method:** `GET`
- **URL:** `/organizations/{id}`
- **Auth:** None (Public)
- **Success Response (200):**
```json
{
  "id": "org_id",
  "userId": "user_id",
  "name": "Red Crescent",
  "description": "Humanitarian organization",
  "mission": "Help people in need",
  "missions": [
    {
      "id": "mission_id",
      "title": "Blood Donation Drive",
      "isPublished": true
    }
  ]
}
```

### 3. Update Organization
- **Method:** `PUT`
- **URL:** `/organizations/{id}`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Body:**
```json
{
  "name": "Red Crescent Updated",
  "description": "Updated description",
  "mission": "Updated mission statement",
  "history": "Organization history",
  "contact": "contact@example.com",
  "website": "https://example.com",
  "logoUrl": "https://example.com/logo.png"
}
```
- **Success Response (200):**
```json
{
  "id": "org_id",
  "name": "Red Crescent Updated",
  "description": "Updated description"
}
```

### 4. Upload Organization Profile Photo
- **Method:** `PUT`
- **URL:** `/organizations/profile/photo`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
- **Body:** Form-data with file field `photo`
- **Success Response (200):**
```json
{
  "message": "Profile photo uploaded successfully",
  "photo": "/uploads/organizations/filename.jpg"
}
```

---

## 👤 VOLUNTEER ROUTES

### 1. Get All Volunteers
- **Method:** `GET`
- **URL:** `/volunteers`
- **Auth:** None (Public)
- **Success Response (200):**
```json
[
  {
    "id": "volunteer_id",
    "userId": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "skills": []
  }
]
```

### 2. Get My Profile
- **Method:** `GET`
- **URL:** `/volunteers/me`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "id": "volunteer_id",
  "userId": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Passionate volunteer",
  "interests": ["healthcare", "education"],
  "totalHoursVolunteered": 50
}
```

### 3. Update My Profile
- **Method:** `PATCH`
- **URL:** `/volunteers/me`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Passionate volunteer",
  "interests": ["healthcare", "education", "environment"],
  "availabilities": "Weekends"
}
```
- **Success Response (200):**
```json
{
  "id": "volunteer_id",
  "firstName": "John",
  "bio": "Passionate volunteer"
}
```

### 4. Delete My Account
- **Method:** `DELETE`
- **URL:** `/volunteers/me`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "message": "Compte supprimé"
}
```

---

## 🎯 MISSION ROUTES - PUBLIC

### 1. Get All Missions
- **Method:** `GET`
- **URL:** `/missions`
- **Auth:** None (Public)
- **Success Response (200):**
```json
[
  {
    "id": "mission_id",
    "organizationId": "org_id",
    "title": "Blood Donation Drive",
    "description": "Help save lives by donating blood",
    "location": "Algiers",
    "startDate": "2026-02-01T09:00:00Z",
    "endDate": "2026-02-01T17:00:00Z",
    "volunteersNeeded": 10,
    "volunteersAccepted": 5,
    "isPublished": true,
    "isArchived": false,
    "skills": [],
    "organization": {
      "name": "Red Crescent",
      "email": "contact@redcrescent.org"
    }
  }
]
```

### 2. Get Mission by ID
- **Method:** `GET`
- **URL:** `/missions/{id}`
- **Auth:** None (Public)
- **Success Response (200):**
```json
{
  "id": "mission_id",
  "title": "Blood Donation Drive",
  "description": "Help save lives",
  "location": "Algiers",
  "startDate": "2026-02-01T09:00:00Z",
  "endDate": "2026-02-01T17:00:00Z",
  "volunteersNeeded": 10,
  "skills": [
    {
      "id": "mission_skill_id",
      "skill": {
        "id": "skill_id",
        "name": "Medical Knowledge",
        "description": "Basic medical knowledge required"
      },
      "levelRequired": "intermediate",
      "mustBeVerified": true
    }
  ],
  "organization": {
    "id": "org_id",
    "name": "Red Crescent"
  }
}
```

### 3. Search Missions
- **Method:** `GET`
- **URL:** `/missions/search?q=blood&city=Algiers`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Query Params:**
  - `q` (optional): Search keyword
  - `city` (optional): Filter by city/location
- **Success Response (200):**
```json
[
  {
    "id": "mission_id",
    "title": "Blood Donation Drive",
    "description": "Help save lives",
    "location": "Algiers"
  }
]
```

---

## 🏢 MISSION ROUTES - ORGANIZATION

### 1. Create Mission
- **Method:** `POST`
- **URL:** `/organization/missions`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
- **Body:**
```json
{
  "title": "Blood Donation Drive",
  "description": "Help save lives by donating blood",
  "location": "Algiers",
  "startDate": "2026-02-01T09:00:00Z",
  "endDate": "2026-02-01T17:00:00Z",
  "volunteersNeeded": 10,
  "sdgId": 3,
  "skills": [
    {
      "skillId": "skill_id",
      "levelRequired": "intermediate",
      "mustBeVerified": true
    }
  ]
}
```
- **Success Response (201):**
```json
{
  "message": "Mission created",
  "mission": {
    "id": "mission_id",
    "organizationId": "org_id",
    "title": "Blood Donation Drive",
    "volunteersNeeded": 10,
    "isPublished": false,
    "skills": []
  }
}
```

### 2. Update Mission
- **Method:** `PUT`
- **URL:** `/organization/missions/{id}`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Body:**
```json
{
  "title": "Blood Donation Drive - Updated",
  "description": "Updated description",
  "volunteersNeeded": 15,
  "isPublished": true
}
```
- **Success Response (200):**
```json
{
  "message": "Mission updated",
  "updated": {
    "id": "mission_id",
    "title": "Blood Donation Drive - Updated"
  }
}
```

### 3. Delete Mission
- **Method:** `DELETE`
- **URL:** `/organization/missions/{id}`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "message": "Mission deleted"
}
```

### 4. Get Mission Applicants
- **Method:** `GET`
- **URL:** `/organization/missions/{id}/applicants`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
[
  {
    "id": "application_id",
    "volunteerId": "volunteer_id",
    "status": "PENDING",
    "appliedAt": "2026-01-20T10:00:00Z",
    "volunteer": {
      "id": "volunteer_id",
      "userId": "user_id",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

### 5. Update Application Status
- **Method:** `PUT`
- **URL:** `/organization/missions/applications/{applicationId}`
- **Auth:** Required (Bearer Token - Organization only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Body:**
```json
{
  "status": "APPROVED"
}
```
- **Success Response (200):**
```json
{
  "message": "Application APPROVED",
  "updated": {
    "id": "application_id",
    "status": "APPROVED",
    "volunteerId": "volunteer_id"
  }
}
```

### 6. Archive Mission
- **Method:** `PUT`
- **URL:** `/missions/archive/{id}`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "id": "mission_id",
  "isArchived": true
}
```

---

## 📋 APPLICATION ROUTES

### 1. Apply to Mission
- **Method:** `POST`
- **URL:** `/applications/missions/{missionId}/apply`
- **Auth:** Required (Bearer Token - Volunteer only)
- **Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
- **Body:**
```json
{
  "message": "I'm interested in this mission"
}
```
- **Success Response (201):**
```json
{
  "id": "application_id",
  "volunteerId": "volunteer_id",
  "missionId": "mission_id",
  "status": "PENDING",
  "appliedAt": "2026-01-23T10:00:00Z"
}
```

---

## 🌍 SDG (Sustainable Development Goals) ROUTES

### 1. Import SDGs from XML
- **Method:** `POST`
- **URL:** `/sdgs/import`
- **Auth:** Required (Bearer Token - Admin only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "message": "SDGs imported",
  "count": 17
}
```

### 2. Get Missions by SDG
- **Method:** `GET`
- **URL:** `/sdgs/missions?sdgId=3`
- **Auth:** None (Public)
- **Query Params:**
  - `sdgId` (required): SDG ID (1-17)
- **Success Response (200):**
```json
[
  {
    "id": "mission_id",
    "title": "Health Mission",
    "sdgId": 3,
    "location": "Algiers"
  }
]
```

---

## 👨‍💼 ADMIN ROUTES

### 1. Verify Volunteer Skill
- **Method:** `PUT`
- **URL:** `/admin/skills/verify`
- **Auth:** Required (Bearer Token - Admin only)
- **Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
- **Body:**
```json
{
  "volunteerSkillId": "skill_verification_id",
  "status": "VERIFIED"
}
```
- **Success Response (200):**
```json
{
  "message": "Skill verification updated",
  "updated": {
    "id": "skill_verification_id",
    "status": "VERIFIED",
    "verifiedAt": "2026-01-23T10:00:00Z"
  }
}
```

### 2. Delete User
- **Method:** `DELETE`
- **URL:** `/admin/users/{userId}`
- **Auth:** Required (Bearer Token - Admin only)
- **Headers:**
```
Authorization: Bearer <token>
```
- **Success Response (200):**
```json
{
  "message": "User deleted"
}
```

---

## 🔑 How to Get Bearer Token

1. **Register or Login** using one of the auth endpoints
2. **Copy the token** from the response
3. **Add to Postman** in the Authorization tab:
   - Type: `Bearer Token`
   - Token: Paste the token here

Or add as header:
```
Authorization: Bearer <your_token_here>
```

---

## 🚨 Important Notes

1. **Admin Credentials** (for login):
   - Email: `admin@example.com` (or from env `ADMIN_EMAIL`)
   - Password: From env `ADMIN_PASSWORD`

2. **JWT Token Expiry**: 7 days

3. **Dates Format**: ISO 8601 (e.g., `2026-02-01T09:00:00Z`)

4. **File Uploads**: Use `multipart/form-data` for photo uploads

5. **Error Responses**: All errors return appropriate HTTP status codes with error messages

---

## ✅ All Endpoints Summary

| Method | Path | Auth | Role |
|--------|------|------|------|
| POST | `/auth/register/volunteer` | No | - |
| POST | `/auth/register/organization` | No | - |
| POST | `/auth/login` | No | - |
| POST | `/auth/forgot-password` | No | - |
| POST | `/auth/reset-password` | No | - |
| GET | `/auth/profile` | Yes | Any |
| GET | `/organizations` | No | - |
| GET | `/organizations/{id}` | No | - |
| PUT | `/organizations/{id}` | Yes | ORG |
| PUT | `/organizations/profile/photo` | Yes | ORG |
| GET | `/volunteers` | No | - |
| GET | `/volunteers/me` | Yes | VOL |
| PATCH | `/volunteers/me` | Yes | VOL |
| DELETE | `/volunteers/me` | Yes | VOL |
| GET | `/missions` | No | - |
| GET | `/missions/{id}` | No | - |
| GET | `/missions/search` | Yes | VOL |
| PUT | `/missions/archive/{id}` | Yes | VOL |
| POST | `/organization/missions` | Yes | ORG |
| PUT | `/organization/missions/{id}` | Yes | ORG |
| DELETE | `/organization/missions/{id}` | Yes | ORG |
| GET | `/organization/missions/{id}/applicants` | Yes | ORG |
| PUT | `/organization/missions/applications/{applicationId}` | Yes | ORG |
| POST | `/applications/missions/{missionId}/apply` | Yes | VOL |
| POST | `/sdgs/import` | Yes | ADMIN |
| GET | `/sdgs/missions` | No | - |
| PUT | `/admin/skills/verify` | Yes | ADMIN |
| DELETE | `/admin/users/{userId}` | Yes | ADMIN |
