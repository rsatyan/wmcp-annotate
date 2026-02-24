# 🚀 wmcp-annotate Launch Checklist

**Status:** Ready to launch  
**Date:** February 24, 2026

---

## ✅ Completed

- [x] Core CLI implementation (scan, suggest, generate, validate)
- [x] TypeScript build passing
- [x] Package.json configured for npm
- [x] README.md with full documentation
- [x] Landing page HTML (`docs/index.html`)
- [x] Social posts written (LinkedIn, Twitter/X, HN)
- [x] Email outreach templates ready

---

## 🔐 Needs Your Action (npm publish)

Run these commands:

```bash
cd ~/workspace/projects/wmcp-annotate

# 1. Login to npm (one-time)
npm login

# 2. Publish to npm registry
npm publish --access public

# 3. Verify it's live
npm info wmcp-annotate
```

---

## 📱 Social Media Posts (Copy & Post)

### LinkedIn (Post Now)
```
Google just changed how AI agents interact with websites. Is your site ready?

Two weeks ago, Google and Microsoft shipped WebMCP in Chrome 146—a W3C standard that lets websites declare structured tools for AI agents.

Instead of AI scraping your DOM or analyzing screenshots (expensive, fragile), WebMCP lets you tell agents exactly what your site can do.

The problem? 99% of sites don't have these annotations yet.

So we built wmcp-annotate.

One command:

npx wmcp-annotate generate https://your-site.com

It scans your site, uses AI to suggest tool definitions, and generates ready-to-use code.

Think of it as "making your website API-first for AI."

We're launching today. Open source core, Pro tier for teams.

→ GitHub: https://github.com/avatarconsulting/wmcp-annotate
→ Try it: npm install -g wmcp-annotate

If you're building AI agents or want your SaaS to be agent-friendly, this is the fastest path.

Questions? Drop them below.

#AI #WebDevelopment #Automation #AIAgents #WebMCP
```

### Twitter/X Thread (Post Now)
```
🧵 Google just shipped the biggest change to web automation since Selenium.

WebMCP is now in Chrome 146.

Here's what it means and how to get your site ready in 5 minutes:

---

WebMCP lets websites declare "tools" that AI agents can call directly.

No more:
- DOM scraping
- Screenshot analysis (2000+ tokens each!)
- Broken automation when CSS changes

---

Instead, your site says:
"Here's a searchProducts tool. It takes a query string. Here's how to call it."

The AI agent calls the tool. Gets structured data back. Done.

---

The catch? 99% of websites don't have WebMCP annotations.

Someone needs to add them.

---

Enter: wmcp-annotate

We built a CLI that:
1. Scans your site
2. Identifies forms/buttons/APIs
3. Uses AI to generate tool definitions
4. Outputs ready-to-use code

---

npx wmcp-annotate generate https://your-site.com

That's it. You get JavaScript you can copy-paste into your app.

---

Open source core. Free to use.
Pro tier ($49/mo) for unlimited AI + CI integration.

Try it: npm install -g wmcp-annotate
GitHub: https://github.com/avatarconsulting/wmcp-annotate
```

### Hacker News (Submit to Show HN)

**Title:** Show HN: wmcp-annotate – Make any website AI-agent ready with WebMCP

**URL:** https://github.com/avatarconsulting/wmcp-annotate

**Text:**
```
Two weeks ago, Google and Microsoft shipped WebMCP in Chrome 146 (https://webmcp.link). It's a W3C standard that lets websites declare structured tools for AI agents—no more DOM scraping or screenshot parsing.

We built wmcp-annotate to help developers adopt it quickly.

What it does:
- Scans any website and identifies forms, buttons, API calls
- Uses Claude to generate meaningful tool definitions
- Outputs ready-to-use JS/TS/React code
- Validates existing implementations

Usage:
npm install -g wmcp-annotate
wmcp-annotate generate https://your-site.com --format typescript

Why this matters:
AI agents currently waste ~2000 tokens per screenshot to understand a page. With WebMCP, it's ~100 tokens to call a declared tool. That's 95% cost reduction. Plus, the automation is stable—no more broken scripts when CSS changes.

Business model:
Open source CLI (MIT). Pro tier ($49/mo) for unlimited AI analysis and CI integration. Enterprise ($499/mo) for teams.

We're a small consulting firm (Avatar Consulting) that does AI transformation for banks. This came out of client work—everyone wanted their internal tools to be agent-accessible.

Would love feedback on the tool and the approach.
```

---

## 🌐 Landing Page

The HTML is ready at: `docs/index.html`

**To deploy:**

Option A - GitHub Pages:
```bash
# Push to gh-pages branch
git subtree push --prefix docs origin gh-pages
```

Option B - Vercel:
```bash
cd docs
vercel --prod
```

Option C - Just serve the HTML file anywhere

---

## 📧 Email Outreach (Week 1)

Target list in `marketing/email-outreach.md`. Key targets:

1. **AI/ML Newsletter authors** - TheSequence, Import AI, Last Week in AI
2. **Dev tool journalists** - The Changelog, Dev.to editors
3. **VC contacts** - especially those who funded browser/AI tools
4. **SaaS founders** - tweet about AI compatibility

---

## 📊 Success Metrics (Week 1)

- [ ] npm downloads > 500
- [ ] GitHub stars > 100
- [ ] HN front page (or close)
- [ ] 3+ inbound leads for Pro/Enterprise
- [ ] 5+ mentions in tweets/posts

---

## 🎯 Post-Launch (Week 2+)

1. **Blog post:** "How we built wmcp-annotate" (dev story)
2. **Tutorial video:** 5-min demo on YouTube
3. **Integrations:** VS Code extension, GitHub Action
4. **Partnerships:** Reach out to Playwright, Puppeteer, browser-use

---

**Questions?** Text me or drop them in Command Center.

— Edison 💡
