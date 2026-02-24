# Landing Page Copy - wmcp-annotate

## Hero Section

### Headline
**The WebMCP Adoption Toolkit**

### Subheadline
Make any website AI-agent ready. Open source tooling for the new W3C standard that's changing how agents interact with the web.

### CTA
[Get Started] [Read the Thesis]

---

## The Thesis

### Headline
**WebMCP is infrastructure. We need to treat it that way.**

In February 2026, Chrome shipped support for WebMCP — a W3C standard that lets websites declare structured tools for AI agents.

This isn't incremental. It's architectural.

Before WebMCP:
- Agents scraped DOM (fragile)
- Agents parsed screenshots (expensive)
- Every website needed custom automation

After WebMCP:
- Websites declare capabilities
- Agents discover and call tools directly
- Standard interface, universal compatibility

**The problem isn't the standard. It's adoption.**

Browser support exists. The spec is stable. But 99% of websites have zero WebMCP annotations.

Adoption needs tooling. That's why this exists.

---

## What wmcp-annotate Does

### Headline
**From any website to WebMCP-ready in minutes**

```bash
# 1. Scan — discover actionable elements
wmcp-annotate scan https://example.com

# 2. Suggest — generate tool definitions with AI
wmcp-annotate suggest https://example.com

# 3. Generate — output production code
wmcp-annotate generate https://example.com --format react

# 4. Validate — check spec compliance
wmcp-annotate validate https://example.com
```

Works with any AI provider. You bring your keys. No lock-in.

---

## Why Open Source?

### Headline
**Adoption > Revenue**

WebMCP adoption benefits everyone building AI agents. Gatekeeping the tooling slows the ecosystem.

This tool is MIT licensed. Fork it. Ship it. Make it better.

If you're using this in production and want to contribute back — PRs welcome.

If you're adopting WebMCP at scale and want to talk architecture — reach out.

---

## Technical Details

**Scanning:**
- Playwright-based (handles SPAs, JavaScript rendering)
- Discovers forms, buttons, links, API calls
- Configurable depth for multi-page analysis

**AI Integration:**
- Pluggable backends: Anthropic, OpenAI, Ollama, any OpenAI-compatible API
- User provides API keys
- Customizable model selection via `WMCP_MODEL`

**Code Generation:**
- JavaScript, TypeScript, React, Vue, Svelte
- Production-ready output
- Follows WebMCP spec exactly

**Validation:**
- Checks existing implementations against W3C spec
- CI-friendly exit codes
- Detailed compliance reports

---

## Who's Behind This

**Satyan Avatara**

Building at the intersection of AI infrastructure, web systems, and financial services.

I've spent years working on how AI systems interact with existing software. WebMCP is the first time I've seen a standard that feels genuinely right for the problem.

This tool exists because I needed it. I'm open sourcing it because the ecosystem needs it.

📧 rsatyan@gmail.com
🐙 github.com/rsatyan

---

## Get Started

```bash
npm install -g wmcp-annotate
wmcp-annotate scan https://your-site.com
```

**Resources:**
- [GitHub Repository](https://github.com/rsatyan/wmcp-annotate)
- [WebMCP Spec](https://webmcp.link)
- [Chrome 146 Release Notes](https://webmcp.link)

---

## Footer

MIT License | Built for the WebMCP ecosystem

Questions? rsatyan@gmail.com
