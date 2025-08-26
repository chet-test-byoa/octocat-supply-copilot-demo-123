---
mode: 'agent'
description: 'Demo: Improve API Test Coverage - Add Unit Tests for Missing Routes.'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'findTestFiles', 'githubRepo', 'problems', 'runCommands', 'runTasks', 'search', 'terminalLastCommand', 'testFailure', 'usages', 'playwright', 'github-remote']
---

## 📝 Before Running This Prompt

**Customize the following placeholders with your target route:**

1. Replace `[ROUTE_NAME]` with the route name (e.g., `product`)
2. Replace `[ENTITY_NAME]` with the entity name in PascalCase (e.g., `Product`)
3. Replace `[entity_name_lowercase]` with the entity name in lowercase (e.g., `product`)
4. Replace `[entity_name_plural_lowercase]` with the plural entity name in lowercase (e.g., `products`)

**Available routes to choose from:**
- `branch`, `delivery`, `headquarters`, `order`, `orderDetail`, `orderDetailDelivery`, `product`, `supplier`

# 🧪 Demo: Add Unit Tests for [ROUTE_NAME] Route

## 📊 Current State
- Only **1 test file exists**: `branch.test.ts`

## 🎯 Objective
Increase API test coverage by implementing comprehensive unit tests for the [ROUTE_NAME] route.

## 📋 Missing Test Files

### 🔗 Route Tests (High Priority)
The following route file needs complete test coverage:

- [ ] `src/routes/[ROUTE_NAME].test.ts`

## ✅ Test Coverage Requirements

### For the Route Test File:
- **CRUD Operations:**
  - ✅ GET all entities
  - ✅ GET single entity by ID
  - ✅ POST create new entity
  - ✅ PUT update existing entity
  - ✅ DELETE entity by ID

- **Error Scenarios:**
  - ❌ 404 for non-existent entities
  - ❌ 400 for invalid request payloads
  - ❌ 422 for validation errors
  - ❌ Edge cases (malformed IDs, empty requests)

## 🛠️ Implementation Guidelines

### Use Existing Pattern
Follow the pattern established in `src/routes/branch.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
```

### Test Structure Template
```typescript
describe('[ENTITY_NAME] API', () => {
    beforeEach(() => {
        // Setup app and reset data
    });

    it('should create a new [entity_name_lowercase]', async () => { /* POST test */ });
    it('should get all [entity_name_plural_lowercase]', async () => { /* GET all test */ });
    it('should get a [entity_name_lowercase] by ID', async () => { /* GET by ID test */ });
    it('should update a [entity_name_lowercase] by ID', async () => { /* PUT test */ });
    it('should delete a [entity_name_lowercase] by ID', async () => { /* DELETE test */ });
    it('should return 404 for non-existing [entity_name_lowercase]', async () => { /* Error test */ });
});
```

## 🔧 Running Tests

```bash
# Run all tests
npm run test:api

# Run tests with coverage
npm run test:api -- -- --coverage

# Run specific test file
npm run test:api -- src/routes/[ROUTE_NAME].test.ts
```

## 📈 Success Criteria
- [ ] Add route test file for [ROUTE_NAME]
- [ ] All tests passing in CI/CD

## 🚀 Getting Started
1. Start with `[ROUTE_NAME].test.ts` - copy `branch.test.ts` pattern
2. Implement basic CRUD tests first
3. Add error scenarios incrementally
4. Run coverage after implementation to track progress
5. Follow ERD relationships for cross-entity testing

## 📚 Related Files
- ERD Diagram: `api/ERD.png`
- Existing test: `api/src/routes/branch.test.ts`
- Test config: `api/vitest.config.ts`
- Coverage report: `api/coverage/index.html`

## Test Coverage