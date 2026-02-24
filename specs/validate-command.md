# Spec: Validate Command

## JTBD
As a developer, I want to validate my existing WebMCP implementation against the W3C spec, so I can ensure compatibility with AI agents.

## Command
```bash
wmcp-annotate validate <url> [options]

Options:
  --output, -o      Output file
  --format, -f      Output format: json, table, markdown
  --strict          Fail on warnings (not just errors)
  --ci              Exit code 1 on any issues (for CI)
```

## Behavior

### Input
- URL of site with WebMCP implementation

### Process
1. Launch browser with WebMCP flag enabled
2. Navigate to URL
3. Query `navigator.modelContext.tools` or equivalent
4. For each registered tool, validate:
   - Name follows conventions (camelCase, no spaces)
   - Description is present and meaningful
   - inputSchema is valid JSON Schema
   - Required fields are specified
   - Types are correct
   - Execute handler is async function
   - ReadOnly hint is appropriate
5. Test tool execution (optional, with --test flag)
6. Generate report

### Output
```json
{
  "url": "https://example.com",
  "validatedAt": "2026-02-24T03:00:00Z",
  "summary": {
    "total": 5,
    "valid": 4,
    "warnings": 1,
    "errors": 0
  },
  "tools": [
    {
      "name": "searchProducts",
      "status": "valid",
      "checks": {
        "nameConvention": "pass",
        "descriptionPresent": "pass",
        "schemaValid": "pass",
        "handlerAsync": "pass"
      }
    },
    {
      "name": "checkout",
      "status": "warning",
      "checks": {
        "nameConvention": "pass",
        "descriptionPresent": "warning",
        "schemaValid": "pass",
        "handlerAsync": "pass"
      },
      "issues": [
        {
          "level": "warning",
          "code": "DESCRIPTION_TOO_SHORT",
          "message": "Description should be at least 20 characters",
          "suggestion": "Add more detail about what this tool does"
        }
      ]
    }
  ]
}
```

### Validation Rules

| Rule | Level | Description |
|------|-------|-------------|
| NAME_FORMAT | error | Name must be camelCase, alphanumeric |
| NAME_LENGTH | warning | Name should be 3-50 characters |
| DESCRIPTION_MISSING | error | Description is required |
| DESCRIPTION_TOO_SHORT | warning | Description < 20 chars |
| SCHEMA_INVALID | error | inputSchema must be valid JSON Schema |
| SCHEMA_NO_DESCRIPTION | warning | Properties should have descriptions |
| HANDLER_NOT_ASYNC | error | Execute must be async function |
| HANDLER_MISSING | error | Execute handler is required |
| READONLY_HINT | warning | Consider marking read-only tools |

## Tests
1. Valid implementation → all pass
2. Missing description → error reported
3. Invalid schema → error reported
4. Sync handler → error reported
5. --ci flag → exits 1 on errors
6. --strict flag → exits 1 on warnings

## CI Integration Example
```yaml
# .github/workflows/webmcp.yml
- name: Validate WebMCP
  run: npx wmcp-annotate validate ${{ env.DEPLOY_URL }} --ci
```
