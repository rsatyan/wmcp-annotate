# Spec: Suggest Command

## JTBD
As a developer, I want to get AI-powered suggestions for WebMCP tool definitions based on my site's elements, so I can quickly understand what tools to implement.

## Command
```bash
wmcp-annotate suggest <url> [options]

Options:
  --scan-file, -s   Use existing scan output instead of live scan
  --output, -o      Output file
  --format, -f      Output format: json, yaml
```

## Behavior

### Input
- URL to analyze (or existing scan file)

### Process
1. Run scan (or load scan file)
2. For each identified element:
   - Analyze semantic meaning using AI
   - Determine appropriate tool name (camelCase, descriptive)
   - Generate inputSchema (JSON Schema)
   - Write human-readable description
   - Identify if read-only (no confirmation needed)
3. Group tools logically
4. Add metadata (version, author hints)

### Output
```json
{
  "version": "1.0.0",
  "tools": [
    {
      "name": "searchProducts",
      "description": "Search for products by keyword, category, or filters",
      "readOnly": true,
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search keywords"
          },
          "category": {
            "type": "string",
            "enum": ["electronics", "clothing", "home"],
            "description": "Product category filter"
          },
          "maxPrice": {
            "type": "number",
            "description": "Maximum price filter"
          }
        },
        "required": ["query"]
      },
      "sourceElement": {
        "type": "form",
        "selector": "#search-form"
      }
    },
    {
      "name": "addToCart",
      "description": "Add a product to the shopping cart",
      "readOnly": false,
      "inputSchema": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "description": "Product identifier"
          },
          "quantity": {
            "type": "integer",
            "default": 1,
            "minimum": 1
          }
        },
        "required": ["productId"]
      },
      "sourceElement": {
        "type": "button",
        "selector": ".add-to-cart"
      }
    }
  ]
}
```

## AI Analysis Prompt
```
Given this website element:
- Type: {type}
- Label: {label}
- Inputs: {inputs}
- Context: {context}

Generate a WebMCP tool definition:
1. Tool name (camelCase, action-oriented verb)
2. Description (1-2 sentences, what it does)
3. Is it read-only? (search/view = yes, create/update/delete = no)
4. Input schema (JSON Schema with descriptions)

Follow WebMCP spec conventions.
```

## Tests
1. Form → generates tool with input schema matching form fields
2. Button → generates action tool
3. Search form → marks as readOnly: true
4. Checkout button → marks as readOnly: false
5. Complex form → handles nested fields

## Rate Limiting
- Free tier: 10 suggestions/day
- Pro tier: unlimited
- Cache results for same URL (1 hour TTL)
