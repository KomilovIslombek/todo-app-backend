# Todo App Backend

A Node.js and Express REST API scaffold for the backend of a todo application. The project currently provides a health check and an initial user-registration route; user data is still mocked and is not stored in a database.

## Project status

This is an early-stage development scaffold, not a production-ready API.

| Area | Current status |
| --- | --- |
| HTTP server | Express 5 server with JSON request parsing |
| Health check | Implemented at `GET /health` |
| API versioning | Routes are mounted under `/api/v1` |
| User registration | Request validation is wired; controller returns a hard-coded mock user |
| Get user | Placeholder response only; no user lookup is performed |
| Database and migrations | Not configured |
| Authentication and authorization | Not implemented |
| Automated tests | No test script or test suite configured yet |
| API documentation | This README; no OpenAPI specification yet |

## Requirements

- Node.js and npm
- Git, if you want to work with branches or contribute changes

Use a current Node.js LTS release. This project does not currently declare a specific minimum Node.js version.

## Getting started

1. Clone the repository and enter its directory:

   ```powershell
   git clone <repository-url>
   Set-Location <repository-directory>
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create your local environment file from the template:

   ```powershell
   Copy-Item .env.example .env
   ```

   `.env` is excluded from Git. Keep real secrets and local credentials there; do not commit them.

4. Start the development server:

   ```powershell
   npm run dev
   ```

   The server defaults to port `5000`. To run the non-watching server, use `npm start`.

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `PORT` | No | `5000` | HTTP port used by the server |
| `NODE_ENV` | No | Not set | Environment label shown in the startup log |

See [`.env.example`](./.env.example) for the local template. No database connection variables are needed yet because database integration has not been implemented.

## API

The API is served from `http://localhost:5000` by default.

### Health check

`GET /health`

Returns a basic liveness response:

```json
{
  "status": "UP",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

The timestamp is generated for each response.

### Register user (mock)

`POST /api/v1/users`

Request body:

```json
{
  "username": "alex",
  "email": "alex@example.com",
  "password": "example-password"
}
```

The request is validated against the current Zod schema: `username` must contain at least 3 characters, `email` must be a valid email address, and `password` must contain at least 8 characters. A successful request returns HTTP `201` with a mock user object. The controller currently does not save the user or password.

Example response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "usr_9823412",
    "username": "alex",
    "email": "alex@example.com",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

Try it with PowerShell:

```powershell
$body = @{
  username = "alex"
  email = "alex@example.com"
  password = "example-password"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/v1/users `
  -ContentType "application/json" -Body $body
```

### Get user (placeholder)

`GET /api/v1/users/:id`

This currently returns a placeholder message containing the requested ID. It does not retrieve a real user.

## Project structure

```text
src/
  app.js                         Express app, middleware, health check, and routes
  server.js                      Environment loading and HTTP server lifecycle
  controllers/
    user.controller.js           User endpoint handlers (registration is mocked)
  middlewares/
    validate.middleware.js       Zod request validation middleware
  routes/
    index.js                     Versioned API route composition
    user.routes.js               User endpoint definitions
  validations/
    user.validation.js           User request schemas
```

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the server with Nodemon |
| `npm start` | Start the server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Apply ESLint fixes |
| `npm run format` | Format files with Prettier |

There is no `npm test` command yet. Add automated tests before relying on behavior changes, especially when implementing persistence and authentication.

## Suggested implementation stages

The following is a proposed roadmap, not a list of completed features:

1. **Baseline and quality** — preserve this scaffold, add automated tests, and document API behavior.
2. **Service layer** — move user/business logic out of route controllers and cover it with tests.
3. **Database** — choose a database and data-access approach, define the user and todo models, add migrations, and configure local development.
4. **User persistence** — replace the mock registration response with database-backed creation and implement user lookup.
5. **Security and error handling** — hash passwords, add authentication/authorization, centralize error responses, and validate configuration.
6. **Todo endpoints** — implement create, read, update, and delete operations with ownership checks.
7. **Delivery readiness** — add API documentation, integration tests, CI checks, and deployment configuration.

Treat the database, authentication, and deployment choices as open design decisions until they are selected for the project.

## Git workflow

Keep `main` as the stable baseline. Save meaningful milestones as commits, and do new work on short-lived branches. For example:

```powershell
git switch -c feat/user-service-database
```

Commit related changes with clear messages, then merge the feature branch into `main` after reviewing and testing it. Push the initial `main` branch to GitHub first; push a feature branch when you are ready to back it up or open a pull request:

```powershell
git push -u origin main
git push -u origin feat/user-service-database
```

## License

The package currently declares the ISC license. Add a `LICENSE` file before publishing if you intend to distribute the project under that license.
