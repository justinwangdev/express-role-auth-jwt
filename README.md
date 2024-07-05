# Express-Role-Auth-Template

## Overview

This project is a backend service built with Express.js that provides user authentication and authorization functionalities. It allows users to sign up, log in, and log out, and implements role-based access control using JWT (JSON Web Tokens) and custom middleware to manage permissions and secure API access.

## Features

- **User Authentication:**
  - User signup
  - User login
  - User logout
- **Authorization:**
  - Role-based access control
  - Middleware to block unauthorized API access

## Installation

1. Clone the repository & install dependencies:

```bash
git clone https://github.com/justinwangdev/express-role-auth-jwt.git
cd express-role-auth-jwt
npm install
```

2. Initialize Database

- Using Postgre by default
- To use other databases, edit `/prisma/schema.prisma`

3. Create a .env file in the root directory and add your environment variables:`
DATABASE_URL="Your Url",
DIRECT_URL="Your Url",
JWT_SECRET="Your Secret",
CORS_ORIGIN="Your Frontend"
`

4. (Optional) Seeding the database with example users data:

```bash
npx prisma db seed
```

## Usage

- Start dev server
```bash
npm run dev
```

- Start server
```bash
npm run start
```

- The service will be running on port 9000

## API Endpoints

- User Signup:
    - `POST /api/auth/register`
    - Request Body:`{ "email":"user@example.com", "password":"userpassword"}`


- User Login:
    - `POST /api/auth/login`
    - Request Body:`{ "email":"user@example.com", "password":"userpassword"}`

- Protected Route:
    - 1. `GET /example/all`
      2. `GET /example/user`
      3. `GET /example/mod`
      4. `GET /example/admin`
    - Headers: `{ "Authorization": "Bearer <token>" }`

