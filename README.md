# Job Listing

A full-stack job board built as a beginner project with React and Spring Boot. Users can create an account, verify their email, browse and search jobs, and manage their own listings.

## Features

- Account registration, email verification, and JWT login.
- Browse listings and search by job title or company with case-insensitive partial matching.
- Individual listing pages with the company, location, tags, and full description.
- Create, edit, and delete listings, with backend ownership checks for edits and deletes.
- A My Listings page for managing your posts.
- A shared header with navigation, active links, and logout.
- Loading, empty, error, and success feedback, plus expired-session redirects.

## Tech stack

| Frontend | Backend | Database |
| --- | --- | --- |
| React, React Router, Vite, Tailwind CSS | Java, Spring Boot, Spring Security, Spring Data JPA, JavaMail, JWT, Maven | PostgreSQL |

## Project structure

```text
backend/
  src/main/java/com/example/joblisting/
    config/       Security, JWT filter, and email configuration
    controller/   Authentication and listing endpoints
    dto/          Request data
    mapper/       Listing mappings
    model/        User and listing entities
    repository/   Database queries
    response/     API response data
    service/      Authentication, email, and listing logic
  src/main/resources/application.properties
frontend/
  src/
    components/   Shared header
    helpers/      Token checks and authenticated requests
    pages/        Authentication and listing pages
    routes/       Public and protected route wrappers
```

## Local setup

### Requirements

- Node.js 20.19+ in the 20.x line, or 22.12+ in newer lines, and npm (matching the installed Vite package's engine requirement).
- Maven and a JDK compatible with the backend's compiler configuration.
- A running PostgreSQL server.
- A Gmail account configured with an app password for verification emails.

**Java configuration:** `backend/pom.xml` currently sets `java.version` to `27`, while the compiler plugin also declares source/target `25`. The last backend build attempt failed with `release version 27 not supported` on the installed JDK. Align the POM's Java settings with a JDK supported by the project's Spring Boot version before running the backend. Check the JDK Maven uses with `mvn -version`.

### 1. Create the database

In PostgreSQL, create a database, for example:

```sql
CREATE DATABASE joblisting;
```

The application uses `spring.jpa.hibernate.ddl-auto=update` to create or update tables on startup. The configured database user needs permission to manage those tables.

### 2. Configure and start the backend

From the project root, open a PowerShell terminal:

```powershell
cd backend

$env:SPRING_DATASOURCE_URL = "jdbc:postgresql://localhost:5432/joblisting"
$env:SPRING_DATASOURCE_USERNAME = "your_database_user"
$env:SPRING_DATASOURCE_PASSWORD = "your_database_password"
$env:SUPPORT_EMAIL = "your_email@gmail.com"
$env:APP_PASSWORD = "your_gmail_app_password"

# Generate a Base64-encoded 256-bit key for local JWT signing.
$jwtBytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($jwtBytes)
$rng.Dispose()
$env:JWT_SECRET_KEY = [Convert]::ToBase64String($jwtBytes)

mvn spring-boot:run
```

Replace the credential placeholders with your own values. These variables apply to the current terminal session; keep using the same JWT key across restarts if you want existing tokens to remain valid. Keep credentials outside committed source files.

The API runs at `http://localhost:8080`. Email is configured to use Gmail SMTP on port 587 with STARTTLS.

The project includes Maven wrapper scripts, but the Windows wrapper failed to start during local validation. The commands here use an installed Maven instead.

### 3. Start the frontend

Open a second terminal from the project root:

```powershell
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`. The frontend currently calls `http://localhost:8080` directly, and the backend allows the frontend origin `http://localhost:5173` through CORS. Keep these ports for local development, or update both the frontend request URLs and backend CORS configuration.

### 4. Try the app

1. Create an account from the login page.
2. Enter the verification code sent to your email, then log in.
3. Post a listing with a title, company, location, description, and optional tags.
4. Search for the title or company and click the job title to view its details.
5. Use My Listings to edit or delete your post.
6. Use Logout in the header to end the session in the browser.

## API routes

Listing routes require `Authorization: Bearer <token>`.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/auth/signup` | Register an account |
| POST | `/auth/verify` | Verify an account using an email code |
| POST | `/auth/login` | Log in and receive a JWT |
| POST | `/auth/resend` | Resend a verification code |
| GET | `/listing` | Get all listings |
| GET | `/listing?search=developer` | Search titles and companies |
| GET | `/listing/personal` | Get the signed-in user's listings |
| GET | `/listing/{listingId}` | Get one listing |
| POST | `/listing/post` | Create a listing |
| PUT | `/listing/{listingId}` | Update an owned listing |
| DELETE | `/listing/{listingId}` | Delete an owned listing |

Omitting `search`, or submitting only whitespace, returns all listings.

## Development checks

Run from `frontend/`:

```powershell
npm run build
npm run lint
```

Run from `backend/` after configuring Java and the required services:

```powershell
mvn compile
mvn test
```

The frontend production build and lint checks for the recently changed files passed during development. Backend compilation remains unverified because of the Java configuration mismatch described above. The backend includes a Spring context test, which needs the application configuration and services available.
