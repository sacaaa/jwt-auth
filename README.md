# Project Overview
This is a demo application showcasing the functionality of **JSON Web Tokens (JWT)** for authentication and authorization. Built with **Angular** (frontend), **Tailwind CSS** (styling), and **Spring Boot** (backend).

## Features
- **JWT Functionality:**
  - Token-based user authentication.
  - Validation of JWTs for secure access to protected routes.
- **"Remember Me" Functionality:**
  - Sessions handled using both Local Storage and Session Storage for enhanced user experience.
- **Responsive UI:**
  - Built with Tailwind CSS for mobile-first, fully responsive design.

---

## How to Run

### Backend (Spring Boot)
1. Navigate to the backend directory.
2. Use Maven to build and run the application:
   ```bash
   mvn spring-boot:run
   ```
3. The server will start on `http://localhost:8080` by default.

### Frontend (Angular)
1. Navigate to the frontend directory.
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
4. Access the application at `http://localhost:4200`.

---

## Additional Notes
- **Remember Me:** When enabled, the application securely stores session tokens in either Local Storage or Session Storage based on user preference.
- **JWT Functionality:** The backend issues JWTs upon successful login, which the frontend uses for secure communication with protected endpoints.

