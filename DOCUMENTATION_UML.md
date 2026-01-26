# UML Documentation - DZ Volunteer

This document contains the UML diagrams representing the system architecture and logic.

## 1. Use Case Diagram
Describes the interactions between the different actors and the system.

```mermaid
useCaseDiagram
    actor "Volunteer" as V
    actor "Organization" as O
    actor "Administrator" as A

    V --> (Search Missions)
    V --> (Apply to Mission)
    V --> (Manage Profile & Skills)
    
    O --> (Create/Edit Mission)
    O --> (Approve Application)
    O --> (Validate Volunteering Hours)
    
    A --> (Verify Skills)
    A --> (Delete Users)
```

## 2. Component Diagram
Shows the high-level architecture of the application.

```mermaid
graph TD
    subgraph Frontend
        React[React Vite App]
        CSS[Vanilla CSS]
    end
    
    subgraph Backend
        Express[Express API]
        Prisma[Prisma ORM]
        JWT[JWT Auth]
    end
    
    subgraph External
        PostGres[(PostgreSQL Database)]
        Cloudinary[Cloudinary CDN]
    end
    
    React -- REST API --> Express
    Express -- Query --> Prisma
    Prisma -- SQL --> PostGres
    Express -- Auth --> JWT
    React -- Asset URL --> Cloudinary
```

## 3. Sequence Diagram (Mission Application)
Shows the process of a volunteer applying for a mission and getting approved.

```mermaid
sequenceDiagram
    participant V as Volunteer
    participant B as Backend API
    participant DB as Database
    participant O as Organization

    V->>B: POST /api/applications/apply
    Note over V,B: Includes Motivation Message
    B->>DB: Create Application (Status: PENDING)
    B-->>V: Success Response
    
    O->>B: GET /api/organization/missions/:id/applicants
    B->>DB: Fetch PENDING applications
    B-->>O: List of Volunteers
    
    O->>B: PUT /api/organization/missions/applications/:id
    Note over O,B: Action: APPROVED
    B->>DB: Update Application + Increment volunteersAccepted
    B-->>O: Success
```

## 4. Class Diagram (Data Model)
Visual representation of the Prisma schema.

```mermaid
classDiagram
    User "1" -- "0..1" Organization : has
    User "1" -- "0..1" Volunteer : has
    Organization "1" -- "*" Mission : creates
    Volunteer "1" -- "*" Application : submits
    Mission "1" -- "*" Application : receives
    Volunteer "1" -- "*" VolunteerSkill : possesses
    Skill "1" -- "*" VolunteerSkill : listed in
    Mission "1" -- "*" MissionSkill : requires
    Skill "1" -- "*" MissionSkill : listed in

    class User {
        String email
        String password
        Enum role
    }
    class Volunteer {
        String firstName
        String lastName
        Int totalHours
    }
    class Organization {
        String name
        String location
    }
    class Mission {
        String title
        DateTime startDate
        Int volunteersNeeded
    }
    class Application {
        Enum status
        String message
    }
```
