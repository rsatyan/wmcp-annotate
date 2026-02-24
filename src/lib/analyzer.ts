import Anthropic from '@anthropic-ai/sdk';
import type { ScanResult, SuggestResult, ToolSuggestion, JsonSchema } from '../types.js';

class Analyzer {
  private client: Anthropic | null = null;

  private getClient(): Anthropic {
    if (!this.client) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is required');
      }
      this.client = new Anthropic({ apiKey });
    }
    return this.client;
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
    const client = this.getClient();
    
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
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type !== 'text') return null;

      const json = JSON.parse(content.text);
      
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
}

export const analyzer = new Analyzer();
