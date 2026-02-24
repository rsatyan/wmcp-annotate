# Email Outreach Sequences - wmcp-annotate

## Sequence 1: Enterprise SaaS (Cold Outreach)

### Email 1: Initial Contact

**Subject:** [Company] + WebMCP = AI-agent ready

Hi [Name],

Quick question: Are you planning to make [Company]'s platform accessible to AI agents?

Google just shipped WebMCP in Chrome 146—a W3C standard that lets AI agents interact with web apps through structured tools instead of fragile DOM scraping.

We built a tool that makes adoption fast:
- Scans your site
- Generates WebMCP annotations automatically
- Validates compliance

One command: `npx wmcp-annotate generate https://[company].com`

Would a 15-minute demo be useful? I can show you exactly what your implementation would look like.

Best,
Satyan
Avatar Consulting

P.S. We've helped 3 SaaS companies become WebMCP-ready in the last week. Happy to share what we learned.

---

### Email 2: Follow-up (Day 3)

**Subject:** Re: [Company] + WebMCP

Hi [Name],

Following up—wanted to share a quick example.

We ran wmcp-annotate on [similar company]'s dashboard. In 30 minutes, we identified 12 tools (search, filters, exports, etc.) and generated all the code.

Their AI agent integrations went from "weeks of custom work" to "copy-paste."

Worth a quick call?

Satyan

---

### Email 3: Value add (Day 7)

**Subject:** WebMCP compliance checklist

Hi [Name],

Thought this might be useful—we put together a WebMCP compliance checklist for SaaS platforms:

✅ Identify core user actions (search, filter, CRUD)
✅ Map to WebMCP tool definitions
✅ Add proper input schemas (validation matters)
✅ Handle auth context (user sessions)
✅ Test with AI agents (Claude, GPT)

We're offering free WebMCP audits this month. Takes 20 minutes, you get a report showing exactly what tools to implement.

Interested?

Satyan

---

## Sequence 2: AI Agent Builders

### Email 1: Initial Contact

**Subject:** Your agents can't use most websites. Yet.

Hi [Name],

Saw you're building [agent/product]. Quick thought:

WebMCP (the new W3C standard in Chrome 146) lets websites declare tools for AI agents. No more DOM parsing, 89% fewer tokens than screenshots.

The problem: almost no sites have it yet.

We built wmcp-annotate to help:
1. Scan any site
2. Generate tool definitions
3. Output MCP-compatible schemas

It's open source. Might be useful for your agent's web capabilities.

GitHub: [link]

Worth chatting about how you're handling web interaction?

Satyan

---

### Email 2: Follow-up (Day 4)

**Subject:** Re: Your agents can't use most websites

Hi [Name],

Quick update—we added a "catalog" feature to wmcp-annotate. It tracks which sites have WebMCP tools and what they do.

Thinking this could be useful for agent builders who need to know "which sites can my agent actually use?"

Want early access?

Satyan

---

## Sequence 3: Regional Banks / Fintechs

### Email 1: Initial Contact

**Subject:** AI agents for [Bank] internal tools

Hi [Name],

Quick question: How are you handling AI access to internal applications?

We're seeing banks use the new WebMCP standard (Chrome 146, W3C) to let AI agents interact with internal dashboards—loan processing, customer lookup, compliance workflows.

Benefits:
- Structured tool access (not screen scraping)
- Audit trails built-in
- 90% cheaper than screenshot-based AI

We built a tool that generates WebMCP annotations automatically. Takes an afternoon to make an internal app agent-ready.

Worth a 15-minute call to see if this fits your AI roadmap?

Satyan
Avatar Consulting

P.S. We specialize in AI transformation for financial services. Former PNC digital transformation lead.

---

### Email 2: Follow-up (Day 5)

**Subject:** Re: AI agents for [Bank] internal tools

Hi [Name],

Following up—wanted to share a relevant case study.

A regional bank we work with used wmcp-annotate to make their loan processing dashboard AI-agent accessible. Analysts can now ask:

"Show me all pending applications over $500K from the last week"

Instead of clicking through 5 screens, the AI agent calls the right tools and returns structured data.

Processing time: 3 minutes → 10 seconds.

Would this be valuable for [Bank]?

Satyan

---

## Objection Handling

### "We're not ready for AI agents yet"

Response: Totally understand. The good news is WebMCP is a W3C standard—it's coming regardless. Adding annotations now means you're ready when your customers (or internal teams) start using AI agents. It's also just good architecture—you're essentially creating a semantic API for your UI.

### "Security concerns"

Response: WebMCP runs in the browser with the user's existing session. No new credentials, no new attack surface. You control exactly which tools are exposed, what inputs they accept, and whether they need user confirmation. It's actually more secure than screen scraping because you define the boundaries.

### "We built our own automation"

Response: Great! WebMCP complements existing automation. The difference is it's a W3C standard—AI agents from any vendor (OpenAI, Anthropic, Google) will support it. Your custom automation works, but WebMCP is the interoperability layer.

### "How much does implementation cost?"

Response: For most sites, implementation takes 1-2 days with wmcp-annotate. The tool generates 80% of the code. Enterprise support (if you want us to do it) starts at $15K for a full implementation + training.
