# Architecture

## Overview

Aion Hello Console is a minimal Express.js application demonstrating TDD-driven development with a clean separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                                │
│                    (Browser/curl)                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Server                            │
│                     (src/index.js)                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   API Layer                              ││
│  │                 (src/api/app.js)                         ││
│  │                                                          ││
│  │  Routes:                                                 ││
│  │  - GET  /health         → Health check                   ││
│  │  - POST /api/transform  → Text transformation            ││
│  │  - GET  /*              → Static files (public/)         ││
│  └──────────────────────────┬──────────────────────────────┘│
│                              │                               │
│  ┌──────────────────────────▼──────────────────────────────┐│
│  │                  Utility Layer                           ││
│  │              (src/utils/transform.js)                    ││
│  │                                                          ││
│  │  Functions:                                              ││
│  │  - slugify(text)    → URL-friendly slug                  ││
│  │  - reverse(text)    → Reversed characters                ││
│  │  - uppercase(text)  → Uppercased text                    ││
│  │  - wordCount(text)  → Word count string                  ││
│  │  - transform(text, op) → Dispatcher                      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Design Decisions

### Separation of Concerns

| Layer | Responsibility | Location |
|-------|----------------|----------|
| Entry Point | Server bootstrap | `src/index.js` |
| API | HTTP handling, routing, validation | `src/api/app.js` |
| Utils | Pure business logic | `src/utils/transform.js` |
| Static | Frontend assets | `public/` |

### Factory Pattern

`createApp()` returns a configured Express instance, enabling:
- Test isolation (fresh app per test)
- Flexible configuration
- Clean dependency injection

### Error Handling

- Input validation at API layer (400 errors)
- Business logic errors caught and returned as JSON
- Unknown operations rejected with descriptive messages

## Test Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     Test Pyramid                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                        ▲                                     │
│                       ╱ ╲                                    │
│                      ╱ E2E╲     Playwright (tests/e2e/)      │
│                     ╱─────╲                                  │
│                    ╱ Integ ╲    Supertest (tests/integration)│
│                   ╱─────────╲                                │
│                  ╱   Unit    ╲   Vitest (tests/unit/)        │
│                 ╱─────────────╲                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Coverage

| Layer | Tests | Framework |
|-------|-------|-----------|
| Unit | Transform functions, edge cases | Vitest |
| Integration | API endpoints, error paths | Supertest |
| E2E | Browser workflows | Playwright |

## Data Flow

```
Request → Validation → Transform → Response

POST /api/transform
  │
  ├─ Missing text?     → 400 { error: "Missing required field: text" }
  ├─ Missing operation? → 400 { error: "Missing required field: operation" }
  ├─ Unknown operation? → 400 { error: "Unknown operation: X" }
  │
  └─ Success           → 200 { result: "...", timestamp: "..." }
```

## Dependencies

| Package | Purpose |
|---------|---------|
| express | HTTP server |
| cors | Cross-origin support |
| vitest | Unit test runner |
| supertest | HTTP assertion |
| @playwright/test | E2E testing |

## Session Continuity Context

This architecture was designed and implemented across 3 development sessions as part of PRD-V1 validation for Project Aion AC-01 (Session Continuity).

- **Session 1**: Scaffolding, TDD red phase
- **Session 2**: Implementation, validation
- **Session 3**: Deployment, documentation
