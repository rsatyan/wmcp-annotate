# AGENTS.md - wmcp-annotate

## Project Overview
CLI tool to automatically analyze websites and generate WebMCP tool annotations.

## Tech Stack
- Node.js 20+
- TypeScript
- Playwright (browser automation)
- Commander.js (CLI)
- Vitest (testing)
- Claude API (AI analysis)

## Commands

### Install dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Run locally
```bash
npm run dev -- scan https://example.com
```

### Lint
```bash
npm run lint
```

## Backpressure Commands
Run these after each implementation task:

```bash
# Build check
npm run build

# Type check
npx tsc --noEmit

# Tests
npm test

# Lint
npm run lint
```

## File Structure
```
wmcp-annotate/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── commands/
│   │   ├── scan.ts       # Scan command
│   │   ├── suggest.ts    # Suggest command
│   │   ├── generate.ts   # Generate command
│   │   └── validate.ts   # Validate command
│   ├── lib/
│   │   ├── scanner.ts    # Playwright scanning logic
│   │   ├── analyzer.ts   # AI analysis
│   │   ├── generator.ts  # Code generation
│   │   └── validator.ts  # Compliance checking
│   ├── templates/        # Output templates
│   └── types.ts          # TypeScript types
├── tests/
│   ├── scan.test.ts
│   ├── suggest.test.ts
│   ├── generate.test.ts
│   └── validate.test.ts
├── specs/                # Requirements specs
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables
```bash
ANTHROPIC_API_KEY=sk-ant-...  # For AI analysis
WMCP_RATE_LIMIT=10            # Free tier limit
```

## Key Dependencies
- playwright: browser automation
- commander: CLI framework
- @anthropic-ai/sdk: AI analysis
- handlebars: template engine
- ajv: JSON Schema validation

## Coding Standards
- Use TypeScript strict mode
- Async/await for all async operations
- Error handling with specific error types
- JSDoc comments for public APIs
- 100% test coverage for core logic

## Learnings
(Updated during development)
- 
