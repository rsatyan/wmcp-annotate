# Spec: Scan Command

## JTBD
As a developer, I want to scan any website and identify elements that could become WebMCP tools, so I can understand what annotations my site needs.

## Command
```bash
wmcp-annotate scan <url> [options]

Options:
  --depth <n>       How many pages deep to crawl (default: 1)
  --output, -o      Output file
  --format, -f      Output format: json, table, markdown
  --verbose, -v     Show detailed progress
```

## Behavior

### Input
- URL of website to scan
- Optional: crawl depth, output preferences

### Process
1. Launch headless browser (Playwright)
2. Navigate to URL
3. Wait for page load (network idle)
4. Identify actionable elements:
   - Forms (with inputs, selects, textareas)
   - Buttons (submit, action buttons)
   - Links (navigation, actions)
   - AJAX/fetch calls (intercepted)
5. For each element, extract:
   - Type (form, button, link, api)
   - Selector (CSS/XPath)
   - Visible text/label
   - Input fields (for forms)
   - Current values
6. If depth > 1, follow links and repeat

### Output
```json
{
  "url": "https://example.com",
  "scannedAt": "2026-02-24T02:45:00Z",
  "elements": [
    {
      "type": "form",
      "id": "search-form",
      "selector": "#search-form",
      "label": "Search",
      "inputs": [
        {
          "name": "query",
          "type": "text",
          "label": "Search query",
          "required": true
        }
      ],
      "submitButton": {
        "selector": "#search-form button[type=submit]",
        "label": "Search"
      }
    },
    {
      "type": "button",
      "selector": ".add-to-cart",
      "label": "Add to Cart",
      "context": "product-page"
    }
  ],
  "apiCalls": [
    {
      "method": "GET",
      "url": "/api/products",
      "params": ["category", "limit"]
    }
  ]
}
```

## Tests
1. Scan a simple static site → finds forms and links
2. Scan a SPA (React) → finds dynamic elements
3. Scan with depth=2 → follows links
4. Scan site with API calls → intercepts fetch/XHR
5. Handle errors (404, timeout, blocked)

## Edge Cases
- Sites that block headless browsers → retry with stealth
- SPAs that need interaction to reveal elements → basic interaction
- Infinite scroll → limit to visible content
- Auth-required pages → accept cookies/headers option
