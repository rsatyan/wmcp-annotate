# Social Media Posts - wmcp-annotate

## LinkedIn Post

---

**Google just changed how AI agents interact with websites. Is your site ready?**

Two weeks ago, Google and Microsoft shipped WebMCP in Chrome 146—a W3C standard that lets websites declare structured tools for AI agents.

Instead of AI scraping your DOM or analyzing screenshots (expensive, fragile), WebMCP lets you tell agents exactly what your site can do.

The problem? 99% of sites don't have these annotations yet.

So we built wmcp-annotate.

One command:
```
npx wmcp-annotate generate https://your-site.com
```

It scans your site, uses AI to suggest tool definitions, and generates ready-to-use code.

Think of it as "making your website API-first for AI."

We're launching today. Open source core, Pro tier for teams.

→ GitHub: [link]
→ Try it: npm install -g wmcp-annotate

If you're building AI agents or want your SaaS to be agent-friendly, this is the fastest path.

Questions? Drop them below.

#AI #WebDevelopment #Automation #AIAgents #WebMCP

---

## Twitter/X Thread

---

🧵 Google just shipped the biggest change to web automation since Selenium.

WebMCP is now in Chrome 146.

Here's what it means and how to get your site ready in 5 minutes:

(1/10)

---

WebMCP lets websites declare "tools" that AI agents can call directly.

No more:
- DOM scraping
- Screenshot analysis (2000+ tokens each!)
- Broken automation when CSS changes

(2/10)

---

Instead, your site says:

"Here's a searchProducts tool. It takes a query string. Here's how to call it."

The AI agent calls the tool. Gets structured data back. Done.

(3/10)

---

This is huge for:
- AI assistants browsing for users
- Automation workflows
- Agent-to-agent commerce
- Accessibility

(4/10)

---

The catch?

99% of websites don't have WebMCP annotations.

Someone needs to add them.

(5/10)

---

Enter: wmcp-annotate

We built a CLI that:
1. Scans your site
2. Identifies forms/buttons/APIs
3. Uses AI to generate tool definitions
4. Outputs ready-to-use code

(6/10)

---

```bash
npx wmcp-annotate generate https://your-site.com
```

That's it.

You get JavaScript you can copy-paste into your app.

(7/10)

---

We also added:

- TypeScript support
- React/Vue hooks
- CI validation
- Compliance reports

(8/10)

---

Open source core. Free to use.

Pro tier ($49/mo) for unlimited AI + CI integration.

Enterprise for teams ($499/mo).

(9/10)

---

Try it now:

npm install -g wmcp-annotate

GitHub: [link]
Docs: wmcp-annotate.dev

If you're building AI agents, this is essential.

(10/10)

---

## Hacker News Post

---

**Title:** Show HN: wmcp-annotate – Make any website AI-agent ready with WebMCP

**Text:**

Hey HN,

Two weeks ago, Google and Microsoft shipped WebMCP in Chrome 146 (https://webmcp.link). It's a W3C standard that lets websites declare structured tools for AI agents—no more DOM scraping or screenshot parsing.

We built wmcp-annotate to help developers adopt it quickly.

**What it does:**
- Scans any website and identifies forms, buttons, API calls
- Uses Claude to generate meaningful tool definitions
- Outputs ready-to-use JS/TS/React code
- Validates existing implementations

**Usage:**
```
npm install -g wmcp-annotate
wmcp-annotate generate https://your-site.com --format typescript
```

**Why this matters:**

AI agents currently waste ~2000 tokens per screenshot to understand a page. With WebMCP, it's ~100 tokens to call a declared tool. That's 95% cost reduction.

Plus, the automation is stable—no more broken scripts when CSS changes.

**Business model:**

Open source CLI (MIT). Pro tier ($49/mo) for unlimited AI analysis and CI integration. Enterprise ($499/mo) for teams.

We're a small consulting firm (Avatar Consulting) that does AI transformation for banks. This came out of client work—everyone wanted their internal tools to be agent-accessible.

Would love feedback on the tool and the approach. What's missing?

GitHub: [link]
