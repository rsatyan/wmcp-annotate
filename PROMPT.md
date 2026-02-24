# PROMPT.md - wmcp-annotate

## Goal
Build a production-ready CLI tool called `wmcp-annotate` that helps developers make their websites WebMCP-compatible.

## Context
WebMCP (Web Model Context Protocol) is a new W3C standard shipped in Chrome 146 (February 2026) by Google and Microsoft. It lets websites declare structured tools that AI agents can call directly.

**Problem:** 99% of websites don't have WebMCP annotations. Developers need tooling to adopt the standard quickly.

**Solution:** `wmcp-annotate` automates the process of scanning, suggesting, generating, and validating WebMCP tool definitions.

## Requirements
Read these spec files for detailed requirements:
- `specs/scan-command.md` - Scan websites for actionable elements
- `specs/suggest-command.md` - AI-powered tool definition suggestions
- `specs/generate-command.md` - Generate JavaScript/TypeScript code
- `specs/validate-command.md` - Validate WebMCP compliance

## Current Task
Check `IMPLEMENTATION_PLAN.md` for the current task. Complete it, run tests, update the plan, and commit.

## Rules
1. Follow the tech stack in AGENTS.md
2. Run backpressure commands after each task
3. Write tests before or with implementation
4. Keep code clean and well-documented
5. Commit after each completed task
6. Update IMPLEMENTATION_PLAN.md with progress

## WebMCP Reference
```javascript
// Declarative (HTML)
<form data-mcp-tool="searchProducts" data-mcp-description="Search products">
  <input name="query" data-mcp-required />
</form>

// Imperative (JavaScript)
navigator.modelContext.registerTool({
  name: "searchProducts",
  description: "Search for products",
  readOnly: true,
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" }
    },
    required: ["query"]
  },
  async execute({ query }) {
    // Implementation
    return { content: [{ type: "text", text: "results" }] };
  }
});
```

## Success Criteria
- All 4 commands working (scan, suggest, generate, validate)
- Tests passing
- Published to npm as `wmcp-annotate`
- README with examples
- Working on real websites
