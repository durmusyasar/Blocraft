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
  generateComponent: (name: string, props: any[], config: any) => string;
  generateHook: (name: string, options: any[], config: any) => string;
  generateStory: (componentName: string, stories: any[], config: any) => string;
  generateTest: (componentName: string, tests: any[], config: any) => string;
  generateTypes: (componentName: string, types: any[], config: any) => string;
  generateDocumentation: (componentName: string, docs: any, config: any) => string;
  generateTemplate: (templateName: string, config: any) => string;
  generateSnippet: (snippetName: string, config: any) => string;
  getGeneratedCode: (id?: string) => any;
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
  const generateComponent = useCallback((name: string, props: any[], config: any): string => {
    if (!enableCodeGeneration || !enableComponentGeneration) return '';

    const componentCode = `
import React from 'react';

export interface ${name}Props {
  ${props.map(prop => `${prop.name}${prop.optional ? '?' : ''}: ${prop.type};`).join('\n  ')}
}

export const ${name}: React.FC<${name}Props> = ({
  ${props.map(prop => prop.name).join(',\n  ')}
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
  const generateHook = useCallback((name: string, options: any[], config: any): string => {
    if (!enableCodeGeneration || !enableHookGeneration) return '';

    const hookCode = `
import { useState, useCallback, useMemo } from 'react';

export interface ${name}Options {
  ${options.map(option => `${option.name}${option.optional ? '?' : ''}: ${option.type};`).join('\n  ')}
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
  const generateStory = useCallback((componentName: string, stories: any[], config: any): string => {
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

${stories.map(story => `
export const ${story.name}: Story = {
  args: {
    ${Object.entries(story.args || {}).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(',\n    ')}
  },
};`).join('\n')}
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
  const generateTest = useCallback((componentName: string, tests: any[], config: any): string => {
    if (!enableCodeGeneration || !enableTestGeneration) return '';

    const testCode = `
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  ${tests.map((test: any) => `
  it('${test.description}', () => {
    render(<${componentName} ${Object.entries(test.props || {}).map(([key, value]) => `${key}={${JSON.stringify(value)}}`).join(' ')} />);
    ${test.assertions?.map((assertion: any) => `expect(${assertion.target}).${assertion.matcher}(${assertion.expected ? JSON.stringify(assertion.expected) : ''});`).join('\n    ') || '// Add assertions here'}
  });`).join('\n')}
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
  const generateTypes = useCallback((componentName: string, types: any[], config: any): string => {
    if (!enableCodeGeneration || !enableTypeGeneration) return '';

    const typeCode = `
export interface ${componentName}Props {
  ${types.map(type => `${type.name}${type.optional ? '?' : ''}: ${type.type};`).join('\n  ')}
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
  const generateDocumentation = useCallback((componentName: string, docs: any, config: any): string => {
    if (!enableCodeGeneration || !enableDocumentationGeneration) return '';

    const docCode = `
# ${componentName}

${docs?.description || `A description of the ${componentName} component.`}

## Props

${docs?.props?.map((prop: any) => `
### ${prop.name}
- **Type:** \`${prop.type}\`
- **Required:** ${prop.required ? 'Yes' : 'No'}
- **Default:** \`${prop.default || 'undefined'}\`
- **Description:** ${prop.description || 'No description provided.'}
`).join('\n') || 'No props documented.'}

## Examples

\`\`\`tsx
import { ${componentName} } from './${componentName}';

function Example() {
  return (
    <${componentName}
      ${docs?.examples?.[0]?.props?.map((prop: any) => `${prop.name}="${prop.value}"`).join('\n      ') || ''}
    />
  );
}
\`\`\`

## API

${docs?.methods?.map((method: any) => `
### ${method.name}
- **Parameters:** ${method.parameters?.map((param: any) => `\`${param.name}: ${param.type}\``).join(', ') || 'None'}
- **Returns:** \`${method.returns || 'void'}\`
- **Description:** ${method.description || 'No description provided.'}
`).join('\n') || 'No methods documented.'}
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
  const generateTemplate = useCallback((templateName: string, config: any): string => {
    if (!enableCodeGeneration || !enableTemplateGeneration) return '';

    const templateCode = config.template || `// Template: ${templateName}`;
    
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
  const generateSnippet = useCallback((snippetName: string, config: any): string => {
    if (!enableCodeGeneration || !enableSnippetGeneration) return '';

    const snippetCode = config.snippet || `// Snippet: ${snippetName}`;
    
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
