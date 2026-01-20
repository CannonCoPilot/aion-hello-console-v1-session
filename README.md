# Aion Hello Console v1

A text transformation API demonstrating TDD practices and session continuity.

**Purpose**: PRD-V1 Session Continuity Test — AC-01 Validation for Project Aion

## Features

- **slugify**: Convert text to URL-friendly slugs
- **reverse**: Reverse character order
- **uppercase**: Convert to uppercase
- **wordCount**: Count words with proper pluralization

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## API

### Health Check
```
GET /health
```

### Transform Text
```
POST /api/transform
Content-Type: application/json

{
  "text": "Hello World",
  "operation": "slugify"
}
```

**Operations**: `slugify`, `reverse`, `uppercase`, `wordCount`

## Testing

```bash
npm test          # Unit + integration tests
npm run test:e2e  # Playwright E2E tests
npm run test:all  # All tests
```

## Project Structure

```
src/
├── index.js           # Server entry point
├── api/app.js         # Express application
└── utils/transform.js # Transform functions
tests/
├── unit/              # Unit tests (vitest)
├── integration/       # API tests (supertest)
└── e2e/               # Browser tests (playwright)
```

## AC-01 Validation

This project was built across 3 sessions to validate session continuity:

| Session | Phases | Focus |
|---------|--------|-------|
| 1 | 1-2 | Pre-flight, TDD Setup |
| 2 | 3-4 | Implementation, Validation |
| 3 | 5-6 | Deployment, Documentation |

## License

MIT
