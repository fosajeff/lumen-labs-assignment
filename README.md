# lumen-labs-assignment

This repository contains a Node.js (Express) API built using **TypeORM**, **Typescript** and connected to a **PostgreSQL** database. It is my solution for the lumen labs assessment test with description below.

Application description:
This test assignment will have you build an application with the following REST endpoints (I added the methods I implemented):
```api
1. POST /signup 
Sign up to the system (username, password)
2. POST /login
Logs in an existing user with a password
3. GET /me
Get the currently logged in user information (username and number of followers)
4. PUT /me/update-password
Update the current users password
5. GET /user/:id/
List username & number of followers of a user
6. PUT /user/:id/follow
Like a user
7. PUT /user/:id/unfollow
Un-Like a user
8. GET /most-followed
List users in a most liked to least liked
```
## Prerequisites

- Node.js 20.11.0 (LTS)
- PostgreSQL (installed and running)

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/fosajeff/lumen-labs-assignment.git
   cd lumen-labs-assignment

2. **Clone the Repository**:
   ```javascript
   npm install

3. **Start the Development Server**:
   ```javascript
   npm run dev

4. **API Endpoints**:
    - Base URL: http://localhost:5000

## Scripts
-  ```javascript npm run dev ``` : Start the development server.
-  ```javascript npm run test ``` : Run tests (write tests in test folder).
-  ```javascript npm run build ``` : Build the production-ready code (output in dist folder).

## Environment Variables
```env
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_ACCESS_TOKEN_KEY=
JWT_EXPIRES_AT=
```

Thank you!
