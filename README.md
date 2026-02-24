# wmcp-annotate

> The missing bridge between today's web and tomorrow's AI agents

[![npm version](https://badge.fury.io/js/wmcp-annotate.svg)](https://www.npmjs.com/package/wmcp-annotate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## The WebMCP Moment

In February 2026, Google and Microsoft shipped WebMCP in Chrome 146 — a W3C standard that lets websites declare structured tools for AI agents.

This isn't incremental. It's architectural.

**Before WebMCP:** Agents scraped DOM (fragile) or parsed screenshots (expensive).
**After WebMCP:** Websites declare capabilities. Agents call tools directly.

The problem isn't the standard. It's adoption. **99% of websites have zero WebMCP annotations.**

That's why this exists.

## Installation

```bash
npm install -g wmcp-annotate
```

**Zero additional setup required.** Works instantly for static HTML sites.

### Quick Run (no install)

```bash
npx github:rsatyan/wmcp-annotate scan https://example.com
```

> **Note:** Requires npm 10+ for npx from GitHub. Update with `npm install -g npm@latest` if needed.

## Quick Start

```bash
# Scan a website (instant, no dependencies)
wmcp-annotate scan https://example.com

# Generate WebMCP tool definitions with AI
wmcp-annotate suggest https://example.com

# Output production-ready code
wmcp-annotate generate https://example.com --format typescript
```

## Commands

### `scan` — Analyze a website

Discovers forms, buttons, links, and interactive elements.

```bash
# Default: Fast HTML parsing (works for most sites)
wmcp-annotate scan https://example.com

# For JavaScript-heavy SPAs (requires Playwright setup)
wmcp-annotate scan https://react-app.com --browser
```

**Output:**
```json
{
  "url": "https://example.com",
  "elements": [
    {
      "type": "form",
      "selector": "#search",
      "label": "Search",
      "inputs": [{ "name": "q", "type": "text" }]
    }
  ]
}
```

### `suggest` — Generate tool definitions

Uses AI to create meaningful WebMCP tool definitions from scan results.

```bash
wmcp-annotate suggest https://example.com
wmcp-annotate suggest --scan-file scan.json --output tools.json
```

Requires an AI provider (see [Configuration](#ai-provider-configuration)).

### `generate` — Output production code

Creates ready-to-use JavaScript/TypeScript code.

```bash
wmcp-annotate generate https://example.com --format js
wmcp-annotate generate https://example.com --format typescript
wmcp-annotate generate https://example.com --format react
```

### `validate` — Check compliance

Validates existing WebMCP implementations against the spec.

```bash
wmcp-annotate validate https://example.com
wmcp-annotate validate https://example.com --ci  # Exit 1 on issues
```

## AI Provider Configuration

The `suggest` command requires an AI provider. Configure one:

**OpenAI:**
```bash
export OPENAI_API_KEY=sk-...
```

**Anthropic:**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm install @anthropic-ai/sdk  # Required for Anthropic
```

**OpenAI-compatible APIs (Groq, Together, etc.):**
```bash
export OPENAI_API_KEY=your_key
export OPENAI_BASE_URL=https://api.groq.com/openai
export WMCP_MODEL=llama-3.3-70b-versatile
```

**Ollama (local, free):**
```bash
export OLLAMA_HOST=http://localhost:11434
export WMCP_MODEL=llama3
```

## Browser Mode (for SPAs)

By default, `wmcp-annotate` uses fast HTML parsing which works for 80%+ of websites.

For JavaScript-heavy single-page apps (React, Vue, Angular), use `--browser` mode:

```bash
# One-time setup
npm install playwright
npx playwright install chromium

# Scan with browser engine
wmcp-annotate scan https://react-app.com --browser
```

## Example Output

```typescript
navigator.modelContext.registerTool({
  name: "searchProducts",
  description: "Search the product catalog by keyword",
  readOnly: true,
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search terms" }
    },
    required: ["query"]
  },
  async execute({ query }) {
    const form = document.querySelector('#search-form');
    form.querySelector('input[name="q"]').value = query;
    form.submit();
  }
});
```

## Why Open Source?

WebMCP adoption benefits everyone building AI agents. Gatekeeping the tooling slows the ecosystem.

This tool is MIT licensed. Fork it. Ship it. Make it better.

## Author

**Satyan Avatara**  
📧 rsatyan@gmail.com

Building at the intersection of AI, web infrastructure, and financial services.

## License

MIT — use it, fork it, ship it.
