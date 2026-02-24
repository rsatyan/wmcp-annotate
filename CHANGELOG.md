# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2026-02-24

### Fixed
- **Spec compliance**: Generated code now uses `annotations.readOnlyHint` instead of `readOnly` (per WebMCP spec)
- **Spec compliance**: Execute callback now includes `client` parameter (per WebMCP spec)
- Validated against official spec at webmachinelearning.github.io/webmcp/

## [1.0.2] - 2026-02-24

### Added
- `--browser` flag now available on `suggest` and `generate` commands (not just `scan`)
- SPAs can now be processed end-to-end: `wmcp-annotate generate https://spa.com --browser`

## [1.0.1] - 2026-02-24

### Changed
- **Switched to Cheerio for default scanning** — Zero browser dependencies, instant startup
- Playwright is now optional (use `--browser` flag for JavaScript-heavy SPAs)
- Moved `@anthropic-ai/sdk` to optional — only needed if using Anthropic as AI provider

### Fixed
- npx installation now works without additional setup
- Reduced install size from ~200MB to ~5MB

## [1.0.0] - 2026-02-24

### Added
- Initial release
- `scan` command - Analyze websites for actionable elements
- `suggest` command - AI-powered WebMCP tool generation
- `generate` command - Output code for JS/TS/React/Vue/Svelte
- `validate` command - Check WebMCP spec compliance
- Multi-provider AI support (Anthropic, OpenAI, Ollama, OpenAI-compatible APIs)
