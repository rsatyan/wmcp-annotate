import fs from 'fs/promises';

export async function writeOutput(data: unknown, options: { output?: string; format?: string }): Promise<void> {
  const output = options.format === 'yaml' 
    ? toYaml(data)
    : JSON.stringify(data, null, 2);
  
  if (options.output) {
    await fs.writeFile(options.output, output, 'utf-8');
  } else {
    console.log(output);
  }
}

export async function readInput<T>(path: string): Promise<T> {
  const content = await fs.readFile(path, 'utf-8');
  return JSON.parse(content) as T;
}

function toYaml(data: unknown, indent = 0): string {
  // Simple YAML conversion
  const spaces = '  '.repeat(indent);
  
  if (Array.isArray(data)) {
    return data.map(item => `${spaces}- ${toYaml(item, indent + 1).trim()}`).join('\\n');
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${spaces}${key}:\\n${toYaml(value, indent + 1)}`;
        }
        return `${spaces}${key}: ${JSON.stringify(value)}`;
      })
      .join('\\n');
  }
  
  return JSON.stringify(data);
}
