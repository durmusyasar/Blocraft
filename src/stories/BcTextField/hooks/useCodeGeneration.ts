import { useState, useCallback, useMemo } from 'react';

export interface CodeGenerationOptions {
  enableCodeGeneration?: boolean;
  enableComponentGeneration?: boolean;
  enableHookGeneration?: boolean;
  enableStoryGeneration?: boolean;
  enableTestGeneration?: boolean;
  enableTypeGeneration?: boolean;
  enableDocumentationGeneration?: boolean;
  enableTemplateGeneration?: boolean;
  enableSnippetGeneration?: boolean;
  codeStyle?: 'typescript' | 'javascript' | 'jsx' | 'tsx';
  codeFormat?: 'prettier' | 'eslint' | 'custom';
  outputFormat?: 'single-file' | 'multi-file' | 'zip' | 'tar';
}

export interface CodeGenerationState {
  isCodeGenerationEnabled: boolean;
  currentCodeStyle: string;
  currentCodeFormat: string;
  currentOutputFormat: string;
  generatedCode: Array<{
    id: string;
    type: 'component' | 'hook' | 'story' | 'test' | 'type' | 'documentation';
    name: string;
    content: string;
    language: string;
    createdAt: number;
  }>;
  codeTemplates: Record<string, string>;
  codeSnippets: Record<string, string>;
}

export interface CodeGenerationActions {
  generateComponent: (name: string, props: unknown[], config: unknown) => string;
  generateHook: (name: string, options: unknown[], config: unknown) => string;
  generateStory: (componentName: string, stories: unknown[], config: unknown) => string;
  generateTest: (componentName: string, tests: unknown[], config: unknown) => string;
  generateTypes: (componentName: string, types: unknown[], config: unknown) => string;
  generateDocumentation: (componentName: string, docs: unknown, config: unknown) => string;
  generateTemplate: (templateName: string, config: unknown) => string;
  generateSnippet: (snippetName: string, config: unknown) => string;
  getGeneratedCode: (id?: string) => unknown;
  clearGeneratedCode: () => void;
  exportCode: (format: string) => string;
  importCode: (code: string) => void;
  reset: () => void;
}

export function useCodeGeneration(options: CodeGenerationOptions = {}) {
  const {
    enableCodeGeneration = false,
    enableComponentGeneration = true,
    enableHookGeneration = true,
    enableStoryGeneration = true,
    enableTestGeneration = true,
    enableTypeGeneration = true,
    enableDocumentationGeneration = true,
    enableTemplateGeneration = true,
    enableSnippetGeneration = true,
    codeStyle = 'typescript',
    codeFormat = 'prettier',
    outputFormat = 'single-file',
  } = options;

  const [state, setState] = useState<CodeGenerationState>({
    isCodeGenerationEnabled: enableCodeGeneration,
    currentCodeStyle: codeStyle,
    currentCodeFormat: codeFormat,
    currentOutputFormat: outputFormat,
    generatedCode: [],
    codeTemplates: {},
    codeSnippets: {},
  });

  // Generate Component
  const generateComponent = useCallback((name: string, props: unknown[], config: unknown): string => {
    if (!enableCodeGeneration || !enableComponentGeneration) return '';

    const componentCode = `
import React from 'react';

export interface ${name}Props {
    ${props.map((prop: unknown) => {
      const propObj = prop as Record<string, unknown>;
      return `${String(propObj.name)}${propObj.optional ? '?' : ''}: ${String(propObj.type)};`;
    }).join('\n  ')}
}

export const ${name}: React.FC<${name}Props> = ({
  ${props.map((prop: unknown) => {
    const propObj = prop as Record<string, unknown>;
    return String(propObj.name);
  }).join(',\n  ')}
}) => {
  return (
    <div>
      {/* ${name} component */}
    </div>
  );
};

${name}.displayName = '${name}';
`;

    const id = `component-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'component',
        name,
        content: componentCode,
        language: codeStyle,
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableComponentGeneration, codeStyle]);

  // Generate Hook
  const generateHook = useCallback((name: string, options: unknown[], config: unknown): string => {
    if (!enableCodeGeneration || !enableHookGeneration) return '';

    const hookCode = `
import { useState, useCallback, useMemo } from 'react';

export interface ${name}Options {
  ${options.map((option: unknown) => {
    const optionObj = option as Record<string, unknown>;
    return `${String(optionObj.name)}${optionObj.optional ? '?' : ''}: ${String(optionObj.type)};`;
  }).join('\n  ')}
}

export interface ${name}State {
  // Add state properties here
}

export interface ${name}Actions {
  // Add action methods here
}

export function ${name}(options: ${name}Options = {}) {
  const [state, setState] = useState<${name}State>({
    // Initialize state
  });

  const actions: ${name}Actions = useMemo(() => ({
    // Implement actions
  }), []);

  return {
    state,
    actions,
  };
}
`;

    const id = `hook-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'hook',
        name,
        content: hookCode,
        language: codeStyle,
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableHookGeneration, codeStyle]);

  // Generate Story
  const generateStory = useCallback((componentName: string, stories: unknown[], config: unknown): string => {
    if (!enableCodeGeneration || !enableStoryGeneration) return '';

    const storyCode = `
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add argTypes here
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

${stories.map((story: unknown) => {
  const storyObj = story as Record<string, unknown>;
  const argsObj = storyObj.args as Record<string, unknown> || {};
  return `
export const ${String(storyObj.name)}: Story = {
  args: {
    ${Object.entries(argsObj).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(',\n    ')}
  },
};`;
}).join('\n')}
`;

    const id = `story-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'story',
        name: `${componentName}.stories`,
        content: storyCode,
        language: codeStyle,
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableStoryGeneration, codeStyle]);

  // Generate Test
  const generateTest = useCallback((componentName: string, tests: unknown[], config: unknown): string => {
    if (!enableCodeGeneration || !enableTestGeneration) return '';

    const testCode = `
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  ${tests.map((test: unknown) => {
    const testObj = test as Record<string, unknown>;
    const propsObj = testObj.props as Record<string, unknown> || {};
    const assertions = testObj.assertions as Array<Record<string, unknown>> || [];
    
    return `
  it('${String(testObj.description)}', () => {
    render(<${componentName} ${Object.entries(propsObj).map(([key, value]) => `${key}={${JSON.stringify(value)}}`).join(' ')} />);
    ${assertions.map((assertion: Record<string, unknown>) => 
      `expect(${String(assertion.target)}).${String(assertion.matcher)}(${assertion.expected ? JSON.stringify(assertion.expected) : ''});`
    ).join('\n    ') || '// Add assertions here'}
  });`;
  }).join('\n')}
});
`;

    const id = `test-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'test',
        name: `${componentName}.test`,
        content: testCode,
        language: codeStyle,
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableTestGeneration, codeStyle]);

  // Generate Types
  const generateTypes = useCallback((componentName: string, types: unknown[], config: unknown): string => {
    if (!enableCodeGeneration || !enableTypeGeneration) return '';

    const typeCode = `
export interface ${componentName}Props {
  ${types.map((type: unknown) => {
    const typeObj = type as Record<string, unknown>;
    return `${String(typeObj.name)}${typeObj.optional ? '?' : ''}: ${String(typeObj.type)};`;
  }).join('\n  ')}
}

export interface ${componentName}State {
  // Add state types here
}

export interface ${componentName}Actions {
  // Add action types here
}

export type ${componentName}Theme = 'light' | 'dark' | 'auto';
export type ${componentName}Size = 'small' | 'medium' | 'large';
export type ${componentName}Variant = 'primary' | 'secondary' | 'tertiary';
`;

    const id = `types-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'type',
        name: `${componentName}.types`,
        content: typeCode,
        language: codeStyle,
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableTypeGeneration, codeStyle]);

  // Generate Documentation
  const generateDocumentation = useCallback((componentName: string, docs: unknown, config: unknown): string => {
    if (!enableCodeGeneration || !enableDocumentationGeneration) return '';

    const docsObj = docs as Record<string, unknown>;
    const props = docsObj.props as Array<Record<string, unknown>> || [];
    const examples = docsObj.examples as Array<Record<string, unknown>> || [];
    const methods = docsObj.methods as Array<Record<string, unknown>> || [];

    const docCode = `
# ${componentName}

${String(docsObj.description || `A description of the ${componentName} component.`)}

## Props

${props.map((prop: Record<string, unknown>) => `
### ${String(prop.name)}
- **Type:** \`${String(prop.type)}\`
- **Required:** ${prop.required ? 'Yes' : 'No'}
- **Default:** \`${String(prop.default || 'undefined')}\`
- **Description:** ${String(prop.description || 'No description provided.')}
`).join('\n') || 'No props documented.'}

## Examples

\`\`\`tsx
import { ${componentName} } from './${componentName}';

function Example() {
  return (
    <${componentName}
      ${examples[0]?.props ? (examples[0].props as Array<Record<string, unknown>>).map((prop: Record<string, unknown>) => 
        `${String(prop.name)}="${String(prop.value)}"`).join('\n      ') : ''}
    />
  );
}
\`\`\`

## API

${methods.map((method: Record<string, unknown>) => {
  const parameters = method.parameters as Array<Record<string, unknown>> || [];
  return `
### ${String(method.name)}
- **Parameters:** ${parameters.map((param: Record<string, unknown>) => 
    `\`${String(param.name)}: ${String(param.type)}\``).join(', ') || 'None'}
- **Returns:** \`${String(method.returns || 'void')}\`
- **Description:** ${String(method.description || 'No description provided.')}
`;
}).join('\n') || 'No methods documented.'}
`;

    const id = `docs-${Date.now()}`;
    setState(prev => ({
      ...prev,
      generatedCode: [...prev.generatedCode, {
        id,
        type: 'documentation',
        name: `${componentName}.md`,
        content: docCode,
        language: 'markdown',
        createdAt: Date.now(),
      }],
    }));

    return id;
  }, [enableCodeGeneration, enableDocumentationGeneration]);

  // Generate Template
  const generateTemplate = useCallback((templateName: string, config: unknown): string => {
    if (!enableCodeGeneration || !enableTemplateGeneration) return '';

    const configObj = config as Record<string, unknown>;
    const templateCode = String(configObj.template || `// Template: ${templateName}`);
    
    setState(prev => ({
      ...prev,
      codeTemplates: {
        ...prev.codeTemplates,
        [templateName]: templateCode,
      },
    }));

    return templateName;
  }, [enableCodeGeneration, enableTemplateGeneration]);

  // Generate Snippet
  const generateSnippet = useCallback((snippetName: string, config: unknown): string => {
    if (!enableCodeGeneration || !enableSnippetGeneration) return '';

    const configObj = config as Record<string, unknown>;
    const snippetCode = String(configObj.snippet || `// Snippet: ${snippetName}`);
    
    setState(prev => ({
      ...prev,
      codeSnippets: {
        ...prev.codeSnippets,
        [snippetName]: snippetCode,
      },
    }));

    return snippetName;
  }, [enableCodeGeneration, enableSnippetGeneration]);

  // Get Generated Code
  const getGeneratedCode = useCallback((id?: string) => {
    if (id) {
      return state.generatedCode.find(code => code.id === id);
    }
    return state.generatedCode;
  }, [state.generatedCode]);

  // Clear Generated Code
  const clearGeneratedCode = useCallback(() => {
    setState(prev => ({
      ...prev,
      generatedCode: [],
    }));
  }, []);

  // Export Code
  const exportCode = useCallback((format: string) => {
    return JSON.stringify({
      generatedCode: state.generatedCode,
      codeTemplates: state.codeTemplates,
      codeSnippets: state.codeSnippets,
    });
  }, [state]);

  // Import Code
  const importCode = useCallback((code: string) => {
    try {
      const imported = JSON.parse(code);
      setState(prev => ({
        ...prev,
        generatedCode: imported.generatedCode || prev.generatedCode,
        codeTemplates: imported.codeTemplates || prev.codeTemplates,
        codeSnippets: imported.codeSnippets || prev.codeSnippets,
      }));
    } catch (error) {
      console.error('Failed to import code:', error);
    }
  }, []);

  // Reset
  const reset = useCallback(() => {
    setState({
      isCodeGenerationEnabled: enableCodeGeneration,
      currentCodeStyle: codeStyle,
      currentCodeFormat: codeFormat,
      currentOutputFormat: outputFormat,
      generatedCode: [],
      codeTemplates: {},
      codeSnippets: {},
    });
  }, [enableCodeGeneration, codeStyle, codeFormat, outputFormat]);

  // Actions object
  const actions: CodeGenerationActions = useMemo(() => ({
    generateComponent,
    generateHook,
    generateStory,
    generateTest,
    generateTypes,
    generateDocumentation,
    generateTemplate,
    generateSnippet,
    getGeneratedCode,
    clearGeneratedCode,
    exportCode,
    importCode,
    reset,
  }), [
    generateComponent,
    generateHook,
    generateStory,
    generateTest,
    generateTypes,
    generateDocumentation,
    generateTemplate,
    generateSnippet,
    getGeneratedCode,
    clearGeneratedCode,
    exportCode,
    importCode,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
