# wmcp-annotate

> The missing bridge between today's web and tomorrow's AI agents

[![npm version](https://badge.fury.io/js/wmcp-annotate.svg)](https://www.npmjs.com/package/wmcp-annotate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## The WebMCP Moment

In February 2026, Google and Microsoft quietly shipped one of the most significant changes to web architecture since REST APIs: **WebMCP** (Web Model Context Protocol).

This W3C standard fundamentally changes how AI agents interact with websites. Instead of fragile DOM scraping or expensive screenshot analysis, websites can now declare structured tools that agents call directly.

**The implications are massive:**
- 89% reduction in tokens for web interactions
- Stable automation that doesn't break when CSS changes
- A new primitive for agent-to-web communication

But here's the problem: the standard exists, browsers support it, yet **99% of websites have zero WebMCP annotations**.

Someone needs to bridge that gap. That's why I built `wmcp-annotate`.

## What This Tool Does

`wmcp-annotate` analyzes any website and generates WebMCP tool annotations automatically:

```bash
# Scan a site and discover actionable elements
wmcp-annotate scan https://example.com

# Generate WebMCP tool definitions using AI
wmcp-annotate suggest https://example.com

# Output production-ready code
wmcp-annotate generate https://example.com --format typescript
```

It's the fastest path from "website" to "AI-agent ready."

## Installation

```bash
npm install -g wmcp-annotate
```

## AI Provider Configuration

The `suggest` command uses AI to generate intelligent tool definitions. Configure your preferred provider:

**Anthropic:**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

**OpenAI:**
```bash
export OPENAI_API_KEY=sk-...
```

**Any OpenAI-compatible API (Groq, Together, Fireworks, etc.):**
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

You bring your own keys. You control your costs.

## Commands

### `scan`
Discovers forms, buttons, links, and API endpoints. No AI required.

```bash
wmcp-annotate scan https://example.com --depth 3 --output scan.json
```

### `suggest`
Uses AI to generate semantic tool definitions from scan results.

```bash
wmcp-annotate suggest https://example.com --output tools.json
```

### `generate`
Outputs production code for React, Vue, Svelte, or vanilla JS.

```bash
wmcp-annotate generate https://example.com --format react
```

### `validate`
Checks existing WebMCP implementations for spec compliance.

```bash
wmcp-annotate validate https://example.com --ci
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

WebMCP adoption needs to happen fast. The standard is ready. The browsers are ready. The AI agents are ready. The only bottleneck is tooling.

By open-sourcing `wmcp-annotate`, I'm betting that:
1. Community contributions will make it better faster
2. Broad adoption creates a healthier ecosystem
3. The real value is in what gets built on top of WebMCP, not in gatekeeping the tools

If you're building AI agents, internal tools, or thinking about web automation—this is the moment to pay attention.

## Contributing

PRs welcome. Issues welcome. Ideas welcome.

If you're working on WebMCP adoption in your organization and want to chat, reach out.

## Author

**Satyan Avatara**  
📧 rsatyan@gmail.com

Building at the intersection of AI, web infrastructure, and financial services.

## License

MIT — use it, fork it, ship it.
