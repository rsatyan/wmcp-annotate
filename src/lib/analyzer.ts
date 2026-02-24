import type { ScanResult, SuggestResult, ToolSuggestion } from '../types.js';

type AIProvider = 'anthropic' | 'openai' | 'ollama';

interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model: string;
  baseUrl?: string;
}

class Analyzer {
  private config: AIConfig | null = null;

  private getConfig(): AIConfig {
    if (this.config) return this.config;

    // Check for Anthropic
    if (process.env.ANTHROPIC_API_KEY) {
      this.config = {
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: process.env.WMCP_MODEL || 'claude-sonnet-4-20250514',
      };
      return this.config;
    }

    // Check for OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.config = {
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.WMCP_MODEL || 'gpt-4o',
        baseUrl: process.env.OPENAI_BASE_URL,
      };
      return this.config;
    }

    // Check for Ollama (local)
    if (process.env.OLLAMA_HOST || process.env.WMCP_OLLAMA) {
      this.config = {
        provider: 'ollama',
        model: process.env.WMCP_MODEL || 'llama3',
        baseUrl: process.env.OLLAMA_HOST || 'http://localhost:11434',
      };
      return this.config;
    }

    throw new Error(
      'No AI provider configured. Set one of:\n' +
      '  - ANTHROPIC_API_KEY (for Claude)\n' +
      '  - OPENAI_API_KEY (for GPT-4, or any OpenAI-compatible API)\n' +
      '  - OLLAMA_HOST (for local Ollama)\n' +
      '\nOptionally set WMCP_MODEL to specify the model.'
    );
  }

  async suggest(scanResult: ScanResult): Promise<SuggestResult> {
    const tools: ToolSuggestion[] = [];
    
    for (const element of scanResult.elements) {
      const suggestion = await this.analyzeElement(element);
      if (suggestion) {
        tools.push(suggestion);
      }
    }
    
    return {
      version: '1.0.0',
      url: scanResult.url,
      suggestedAt: new Date().toISOString(),
      tools,
    };
  }

  private async analyzeElement(element: any): Promise<ToolSuggestion | null> {
    const config = this.getConfig();
    
    const prompt = `Analyze this website element and generate a WebMCP tool definition.

Element:
- Type: ${element.type}
- Label: ${element.label}
- Selector: ${element.selector}
${element.inputs ? `- Inputs: ${JSON.stringify(element.inputs)}` : ''}

Generate a WebMCP tool definition with:
1. name: camelCase, action-oriented verb (e.g., searchProducts, addToCart)
2. description: 1-2 sentences explaining what it does
3. readOnly: true if it's a search/view action, false for create/update/delete
4. inputSchema: JSON Schema for the inputs

Respond with valid JSON only:
{
  "name": "...",
  "description": "...",
  "readOnly": true/false,
  "inputSchema": { ... }
}`;

    try {
      const responseText = await this.callAI(config, prompt);
      const json = JSON.parse(responseText);
      
      return {
        name: json.name,
        description: json.description,
        readOnly: json.readOnly,
        inputSchema: json.inputSchema,
        sourceElement: {
          type: element.type,
          selector: element.selector,
        },
      };
    } catch (error) {
      console.error('Analysis failed for element:', element.selector, error);
      return null;
    }
  }

  private async callAI(config: AIConfig, prompt: string): Promise<string> {
    switch (config.provider) {
      case 'anthropic':
        return this.callAnthropic(config, prompt);
      case 'openai':
        return this.callOpenAI(config, prompt);
      case 'ollama':
        return this.callOllama(config, prompt);
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  }

  private async callAnthropic(config: AIConfig, prompt: string): Promise<string> {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: config.apiKey });
    
    const response = await client.messages.create({
      model: config.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    return content.text;
  }

  private async callOpenAI(config: AIConfig, prompt: string): Promise<string> {
    const url = `${config.baseUrl || 'https://api.openai.com'}/v1/chat/completions`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callOllama(config: AIConfig, prompt: string): Promise<string> {
    const url = `${config.baseUrl}/api/generate`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }
}

export const analyzer = new Analyzer();
