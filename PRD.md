# PRD: wmcp-annotate

## Product Overview

**wmcp-annotate** is a CLI tool that automatically analyzes websites and generates WebMCP tool annotations, enabling AI agents to interact with any web application through the new W3C WebMCP standard.

## Problem Statement

Google and Microsoft shipped WebMCP in Chrome 146 (February 2026) as a W3C standard. This protocol lets websites declare structured tools that AI agents can call directly—no DOM scraping, 89% token reduction vs screenshots.

**The problem:** 99% of websites don't have WebMCP annotations yet. Developers need to:
1. Understand the WebMCP spec
2. Identify which UI elements should become tools
3. Write the JavaScript registration code
4. Test and validate the implementation

This is manual, error-prone, and slow. Most teams won't do it.

## Solution

**wmcp-annotate** automates WebMCP adoption:
1. **Scan** any website and identify actionable elements (forms, buttons, links, APIs)
2. **Suggest** WebMCP tool definitions with proper schemas
3. **Generate** ready-to-use JavaScript code
4. **Validate** existing WebMCP implementations
5. **Inject** annotations into React/Vue/Svelte/vanilla codebases

## ICP (Ideal Customer Profile)

### Primary: Web Development Teams
- Frontend engineers at SaaS companies
- Agencies building client sites
- Enterprise IT teams modernizing internal apps

### Secondary: AI Agent Builders
- Teams building AI agents that need to interact with websites
- Automation engineers
- RPA modernization projects

## Key Features

### v1.0 (MVP - 2 weeks)
1. **Scan mode**: Analyze any URL, identify actionable elements
2. **Suggest mode**: Generate WebMCP tool definitions as JSON
3. **Generate mode**: Output ready-to-use JavaScript code
4. **Validate mode**: Check existing WebMCP implementations for compliance

### v1.1 (Week 3-4)
5. **Inject mode**: Add annotations to React/Vue/Svelte projects
6. **CI integration**: GitHub Actions / GitLab CI support
7. **Report mode**: Generate compliance reports

### v2.0 (Month 2)
8. **Watch mode**: Monitor sites for changes, suggest updates
9. **Catalog integration**: Publish to wmcp-catalog registry
10. **Enterprise**: Team workspaces, audit logs, SSO

## Non-Features (Out of Scope)
- Browser extension (use CLI instead)
- Visual editor (code-first approach)
- Hosting/proxy services
- WebMCP runtime (browser handles that)

## Technical Architecture

### CLI Structure
```
wmcp-annotate <command> [options]

Commands:
  scan <url>          Analyze a website for WebMCP opportunities
  suggest <url>       Generate tool definition suggestions
  generate <url>      Output JavaScript registration code
  validate <url>      Check WebMCP compliance
  inject <dir>        Add annotations to codebase
  report <url>        Generate compliance report

Options:
  --output, -o        Output file (default: stdout)
  --format, -f        Output format: json, js, ts, react, vue
  --config, -c        Config file path
  --verbose, -v       Verbose output
  --headless          Run browser in headless mode (default: true)
```

### Core Components
1. **Scanner**: Playwright-based crawler that identifies forms, buttons, links, API calls
2. **Analyzer**: AI-powered analysis to determine tool semantics
3. **Generator**: Template engine for JS/TS/React/Vue output
4. **Validator**: WebMCP spec compliance checker
5. **Injector**: AST-based code modification for existing projects

### Tech Stack
- **Runtime**: Node.js 20+
- **Browser**: Playwright
- **AI**: Claude API for semantic analysis
- **Parser**: TypeScript compiler API for injection
- **CLI**: Commander.js
- **Testing**: Vitest

## Success Metrics

### Week 1
- [ ] CLI scaffolding complete
- [ ] Scan command working on 3 test sites
- [ ] Suggest command generating valid schemas

### Week 2
- [ ] Generate command outputting working JS
- [ ] Validate command checking compliance
- [ ] 10 beta users testing

### Month 1
- [ ] 100 GitHub stars
- [ ] 50 npm weekly downloads
- [ ] 5 paying enterprise customers
- [ ] $5K MRR

### Month 3
- [ ] 1000 GitHub stars
- [ ] 500 npm weekly downloads
- [ ] 20 paying customers
- [ ] $25K MRR

## Pricing

### Open Source (Free)
- Scan, suggest, generate commands
- Community support
- Rate-limited AI analysis (10/day)

### Pro ($49/month)
- Unlimited AI analysis
- Inject command
- CI integration
- Email support

### Enterprise ($499/month)
- Team workspaces
- Audit logs
- SSO/SAML
- Priority support
- Custom integrations

## Go-to-Market

### Week 1: Launch
- [ ] Ship to npm
- [ ] Post on Hacker News
- [ ] Twitter/X announcement
- [ ] Dev.to article: "Make Your Site AI-Agent Ready in 5 Minutes"

### Week 2: Community
- [ ] Discord server
- [ ] GitHub discussions
- [ ] YouTube demo video
- [ ] Reach out to 50 AI agent builders

### Month 1: Revenue
- [ ] ProductHunt launch
- [ ] Paid ads on dev newsletters
- [ ] Partner with WebMCP early adopters
- [ ] Enterprise outreach (50 companies)

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebMCP spec changes | High | Version lock, follow W3C group |
| Competition from Google | High | Move fast, focus on DX |
| Low adoption | Medium | Strong content marketing |
| AI analysis quality | Medium | Human review option, feedback loop |

## Team

- **Edison** (Avatar Consulting): Product strategy, marketing
- **Atlas**: Implementation lead
- **Cipher**: Technical architecture
- **Aria**: Documentation, content

## Timeline

| Week | Milestone |
|------|-----------|
| 1 | CLI scaffold, scan/suggest commands |
| 2 | Generate/validate commands, beta launch |
| 3 | Inject command, CI integration |
| 4 | ProductHunt launch, enterprise outreach |

## Appendix

### WebMCP Reference
- Spec: https://webmcp.link
- Chrome flags: chrome://flags → WebMCP
- W3C Community Group: Web Machine Learning CG

### Competitive Landscape
- No direct competitors yet (first mover advantage)
- Indirect: Puppeteer, Playwright (low-level), browser extensions
