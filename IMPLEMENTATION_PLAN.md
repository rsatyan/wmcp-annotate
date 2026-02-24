# IMPLEMENTATION_PLAN.md - wmcp-annotate

## Overview
Build `wmcp-annotate` CLI tool for WebMCP adoption.

## Status
🔵 IN PROGRESS

---

## Phase 1: Project Setup (Day 1)

### Task 1.1: Initialize project ⬜
- [ ] Create package.json with name "wmcp-annotate"
- [ ] Set up TypeScript config (strict mode)
- [ ] Add dependencies: playwright, commander, @anthropic-ai/sdk, handlebars, ajv
- [ ] Add dev dependencies: vitest, typescript, eslint, prettier
- [ ] Create src/ directory structure
- [ ] Add npm scripts: build, test, dev, lint

### Task 1.2: CLI scaffolding ⬜
- [ ] Create src/index.ts with Commander setup
- [ ] Add scan, suggest, generate, validate command stubs
- [ ] Add global options (--output, --format, --verbose)
- [ ] Add version and help commands
- [ ] Test: `wmcp-annotate --help` works

### Task 1.3: Types definition ⬜
- [ ] Create src/types.ts with interfaces:
  - ScanResult, ScannedElement
  - ToolSuggestion, ToolDefinition
  - ValidationResult, ValidationIssue
- [ ] Export all types

---

## Phase 2: Scan Command (Day 1-2)

### Task 2.1: Scanner core ⬜
- [ ] Create src/lib/scanner.ts
- [ ] Implement launchBrowser() with Playwright
- [ ] Implement scanPage(url) → identifies forms, buttons, links
- [ ] Handle SPA wait (networkidle)
- [ ] Extract element metadata (selector, label, inputs)

### Task 2.2: API interception ⬜
- [ ] Intercept fetch/XHR requests
- [ ] Capture API endpoints and parameters
- [ ] Add to scan results

### Task 2.3: Scan command integration ⬜
- [ ] Connect scanner to CLI command
- [ ] Add --depth option for multi-page crawl
- [ ] Add --output and --format options
- [ ] Test with 3 different websites

---

## Phase 3: Suggest Command (Day 2-3)

### Task 3.1: Analyzer core ⬜
- [ ] Create src/lib/analyzer.ts
- [ ] Implement Claude API integration
- [ ] Create prompt template for tool analysis
- [ ] Parse AI response into ToolSuggestion[]

### Task 3.2: Schema generation ⬜
- [ ] Generate JSON Schema from form inputs
- [ ] Handle different input types (text, number, select, checkbox)
- [ ] Add descriptions from labels/placeholders
- [ ] Set required fields correctly

### Task 3.3: Suggest command integration ⬜
- [ ] Connect analyzer to CLI command
- [ ] Add --scan-file option to use existing scan
- [ ] Cache results (1 hour TTL)
- [ ] Add rate limiting for free tier

---

## Phase 4: Generate Command (Day 3-4)

### Task 4.1: Generator core ⬜
- [ ] Create src/lib/generator.ts
- [ ] Create Handlebars templates:
  - templates/js-esm.hbs
  - templates/ts.hbs
  - templates/react.hbs
- [ ] Implement template rendering

### Task 4.2: Code generation ⬜
- [ ] Generate valid navigator.modelContext.registerTool() code
- [ ] Add execute handler stubs with implementation hints
- [ ] Add TypeScript types for TS output
- [ ] Add React hook wrapper for React output

### Task 4.3: Generate command integration ⬜
- [ ] Connect generator to CLI command
- [ ] Add --suggest-file option
- [ ] Add --format option (js, ts, react, vue)
- [ ] Test generated code is valid

---

## Phase 5: Validate Command (Day 4-5)

### Task 5.1: Validator core ⬜
- [ ] Create src/lib/validator.ts
- [ ] Query navigator.modelContext.tools from page
- [ ] Implement validation rules from spec
- [ ] Return structured ValidationResult

### Task 5.2: Validation rules ⬜
- [ ] NAME_FORMAT: camelCase check
- [ ] DESCRIPTION_MISSING/TOO_SHORT
- [ ] SCHEMA_INVALID: JSON Schema validation
- [ ] HANDLER_NOT_ASYNC
- [ ] READONLY_HINT

### Task 5.3: Validate command integration ⬜
- [ ] Connect validator to CLI command
- [ ] Add --strict and --ci flags
- [ ] Generate report in multiple formats
- [ ] Exit codes for CI

---

## Phase 6: Polish & Publish (Day 5-6)

### Task 6.1: Documentation ⬜
- [ ] Write comprehensive README.md
- [ ] Add usage examples for each command
- [ ] Add CI integration examples
- [ ] Add troubleshooting section

### Task 6.2: Testing ⬜
- [ ] Add unit tests for each module
- [ ] Add integration tests with real websites
- [ ] Achieve 80%+ code coverage
- [ ] Add test fixtures

### Task 6.3: Publishing ⬜
- [ ] Set up npm publish workflow
- [ ] Create GitHub repository
- [ ] Add GitHub Actions CI
- [ ] Publish v1.0.0 to npm
- [ ] Add badges to README

---

## Phase 7: Marketing Launch (Day 6-7)

### Task 7.1: Content ⬜
- [ ] Write Dev.to article
- [ ] Create demo video
- [ ] Write Twitter thread
- [ ] Prepare HN post

### Task 7.2: Launch ⬜
- [ ] Post to Hacker News
- [ ] Tweet announcement
- [ ] Post to Dev.to
- [ ] Share in AI/dev communities

### Task 7.3: Outreach ⬜
- [ ] Email 50 potential enterprise customers
- [ ] Reach out to WebMCP early adopters
- [ ] Contact AI agent builders

---

## Completion Checklist
- [ ] All commands working
- [ ] Tests passing
- [ ] Published to npm
- [ ] Documentation complete
- [ ] Marketing launched
- [ ] First paying customers

---

## Notes
(Add learnings and blockers here)

---

**STATUS: PLANNING_COMPLETE**
