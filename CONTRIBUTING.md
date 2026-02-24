# Contributing to wmcp-annotate

Thanks for your interest in contributing! This project aims to accelerate WebMCP adoption across the web.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/wmcp-annotate.git
   cd wmcp-annotate
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build:
   ```bash
   npm run build
   ```

## Development

```bash
# Run in development mode
npm run dev scan https://example.com

# Run tests
npm test

# Lint
npm run lint
```

## Pull Requests

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Run tests and linting
4. Commit with a clear message
5. Push and open a PR

## Areas for Contribution

- **AI Provider Support**: Add new providers beyond Anthropic/OpenAI/Ollama
- **Framework Templates**: Improve generated code for React, Vue, Svelte
- **Scanning**: Better detection of dynamic elements, SPAs
- **Validation**: More comprehensive spec compliance checks
- **Documentation**: Examples, tutorials, guides

## Questions?

Open an issue or reach out to rsatyan@gmail.com.
