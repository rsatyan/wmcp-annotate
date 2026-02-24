# wmcp-annotate

> Make any website AI-agent ready in 5 minutes

[![npm version](https://badge.fury.io/js/wmcp-annotate.svg)](https://www.npmjs.com/package/wmcp-annotate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**wmcp-annotate** automatically analyzes websites and generates [WebMCP](https://webmcp.link) tool annotations, enabling AI agents to interact with any web application through the new W3C standard.

## Why?

Google and Microsoft shipped [WebMCP in Chrome 146](https://webmcp.link) (February 2026). This W3C standard lets websites declare structured tools that AI agents can call directly—no DOM scraping, 89% token reduction vs screenshots.

**The problem:** 99% of websites don't have WebMCP annotations yet.

**The solution:** `wmcp-annotate` automates the entire process.

## Quick Start

```bash
# Install
npm install -g wmcp-annotate

# Scan a website
wmcp-annotate scan https://your-site.com

# Get AI-powered tool suggestions
wmcp-annotate suggest https://your-site.com

# Generate ready-to-use code
wmcp-annotate generate https://your-site.com --format typescript

# Validate your implementation
wmcp-annotate validate https://your-site.com
```

## Commands

### `scan` - Analyze a website

Identifies forms, buttons, links, and API calls that could become WebMCP tools.

```bash
wmcp-annotate scan https://example.com
wmcp-annotate scan https://example.com --depth 3 --output scan.json
```

### `suggest` - Get tool definitions

AI-powered analysis to generate WebMCP tool definitions.

```bash
wmcp-annotate suggest https://example.com
wmcp-annotate suggest --scan-file scan.json --output suggestions.json
```

### `generate` - Create implementation code

Outputs ready-to-use JavaScript/TypeScript code.

```bash
wmcp-annotate generate https://example.com --format js
wmcp-annotate generate https://example.com --format typescript
wmcp-annotate generate https://example.com --format react
```

**Output example:**

```typescript
navigator.modelContext.registerTool({
  name: "searchProducts",
  description: "Search for products by keyword",
  readOnly: true,
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search keywords" }
    },
    required: ["query"]
  },
  async execute({ query }) {
    // Auto-generated implementation
    const form = document.querySelector('#search-form');
    form.querySelector('input[name="query"]').value = query;
    form.submit();
    // ...
  }
});
```

### `validate` - Check compliance

Validates your WebMCP implementation against the W3C spec.

```bash
wmcp-annotate validate https://example.com
wmcp-annotate validate https://example.com --strict --ci
```

**CI Integration:**

```yaml
# .github/workflows/webmcp.yml
- name: Validate WebMCP
  run: npx wmcp-annotate validate ${{ env.DEPLOY_URL }} --ci
```

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Open Source** | Free | Scan, generate, validate. 10 AI suggestions/day |
| **Pro** | $49/mo | Unlimited AI, inject command, CI integration |
| **Enterprise** | $499/mo | Team workspaces, SSO, audit logs, priority support |

## Contact

For enterprise licensing, custom integrations, or support:

📧 [rsatyan@gmail.com](mailto:rsatyan@gmail.com)

## Why wmcp-annotate?

- **First mover**: Built for the WebMCP standard from day one
- **AI-powered**: Smart tool suggestions, not just DOM parsing
- **Framework support**: React, Vue, Svelte, vanilla JS
- **CI-ready**: GitHub Actions integration out of the box

## Contributing

We welcome contributions! Open an issue or submit a PR.

## License

MIT
