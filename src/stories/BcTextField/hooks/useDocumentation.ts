import { useState, useCallback, useMemo } from 'react';

export interface DocumentationOptions {
  enableDocumentation?: boolean;
  enableInteractiveDocs?: boolean;
  enableAPIExplorer?: boolean;
  enableCodeExamples?: boolean;
  enableLiveDemos?: boolean;
  enablePlayground?: boolean;
  enableTutorials?: boolean;
  enableGuides?: boolean;
  enableAPIReference?: boolean;
  enableChangelog?: boolean;
  enableMigrationGuides?: boolean;
  enableBestPractices?: boolean;
  enableTroubleshooting?: boolean;
  enableFAQ?: boolean;
  enableGlossary?: boolean;
  enableSearchableDocumentation?: boolean;
  enableVersionedDocumentation?: boolean;
  enableMultiLanguageDocumentation?: boolean;
  enableOfflineDocumentation?: boolean;
  enablePrintableDocumentation?: boolean;
  documentationFormat?: 'markdown' | 'mdx' | 'html' | 'json';
  documentationTheme?: 'light' | 'dark' | 'auto';
  documentationLanguage?: 'en' | 'tr' | 'multi';
  documentationVersion?: string;
}

export interface DocumentationState {
  isDocumentationEnabled: boolean;
  isInteractiveDocsEnabled: boolean;
  isAPIExplorerEnabled: boolean;
  isCodeExamplesEnabled: boolean;
  isLiveDemosEnabled: boolean;
  isPlaygroundEnabled: boolean;
  isTutorialsEnabled: boolean;
  isGuidesEnabled: boolean;
  isAPIReferenceEnabled: boolean;
  isChangelogEnabled: boolean;
  isMigrationGuidesEnabled: boolean;
  isBestPracticesEnabled: boolean;
  isTroubleshootingEnabled: boolean;
  isFAQEnabled: boolean;
  isGlossaryEnabled: boolean;
  isSearchableDocumentationEnabled: boolean;
  isVersionedDocumentationEnabled: boolean;
  isMultiLanguageDocumentationEnabled: boolean;
  isOfflineDocumentationEnabled: boolean;
  isPrintableDocumentationEnabled: boolean;
  currentDocumentationFormat: string;
  currentDocumentationTheme: string;
  currentDocumentationLanguage: string;
  currentDocumentationVersion: string;
  documentationPages: Array<{
    id: string;
    title: string;
    slug: string;
    type: 'guide' | 'tutorial' | 'api' | 'example' | 'demo' | 'changelog' | 'migration' | 'faq';
    content: string;
    language: string;
    version: string;
    tags: string[];
    lastUpdated: number;
    author: string;
  }>;
  codeExamples: Array<{
    id: string;
    title: string;
    description: string;
    code: string;
    language: string;
    framework: string;
    tags: string[];
    createdAt: number;
  }>;
  liveDemos: Array<{
    id: string;
    title: string;
    description: string;
    component: string;
    props: Record<string, any>;
    code: string;
    tags: string[];
    createdAt: number;
  }>;
  apiEndpoints: Array<{
    id: string;
    name: string;
    method: string;
    path: string;
    description: string;
    parameters: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
      example?: any;
    }>;
    responses: Array<{
      status: number;
      description: string;
      example?: any;
    }>;
    examples: Array<{
      title: string;
      request: any;
      response: any;
    }>;
  }>;
  searchIndex: Array<{
    id: string;
    title: string;
    content: string;
    url: string;
    type: string;
    tags: string[];
  }>;
}

export interface DocumentationActions {
  createDocumentationPage: (title: string, slug: string, type: string, content: string, options?: any) => string;
  updateDocumentationPage: (pageId: string, updates: any) => void;
  deleteDocumentationPage: (pageId: string) => void;
  createCodeExample: (title: string, description: string, code: string, language: string, framework: string, tags?: string[]) => string;
  updateCodeExample: (exampleId: string, updates: any) => void;
  deleteCodeExample: (exampleId: string) => void;
  createLiveDemo: (title: string, description: string, component: string, props: Record<string, any>, code: string, tags?: string[]) => string;
  updateLiveDemo: (demoId: string, updates: any) => void;
  deleteLiveDemo: (demoId: string) => void;
  createAPIEndpoint: (name: string, method: string, path: string, description: string, parameters: any[], responses: any[], examples?: any[]) => string;
  updateAPIEndpoint: (endpointId: string, updates: any) => void;
  deleteAPIEndpoint: (endpointId: string) => void;
  searchDocumentation: (query: string) => any[];
  buildSearchIndex: () => void;
  getDocumentationPage: (pageId: string) => any;
  getDocumentationPages: (filter?: any) => any[];
  getCodeExample: (exampleId: string) => any;
  getCodeExamples: (filter?: any) => any[];
  getLiveDemo: (demoId: string) => any;
  getLiveDemos: (filter?: any) => any[];
  getAPIEndpoint: (endpointId: string) => any;
  getAPIEndpoints: (filter?: any) => any[];
  exportDocumentation: (format: string) => string;
  importDocumentation: (data: string, format: string) => void;
  generateAPIReference: (componentName: string, props: any[], methods: any[]) => string;
  generateChangelog: (version: string, changes: any[]) => string;
  generateMigrationGuide: (fromVersion: string, toVersion: string, changes: any[]) => string;
  generateTutorial: (title: string, steps: any[]) => string;
  generateGuide: (title: string, sections: any[]) => string;
  reset: () => void;
}

export function useDocumentation(options: DocumentationOptions = {}) {
  const {
    enableDocumentation = false,
    enableInteractiveDocs = true,
    enableAPIExplorer = true,
    enableCodeExamples = true,
    enableLiveDemos = true,
    enablePlayground = true,
    enableTutorials = true,
    enableGuides = true,
    enableAPIReference = true,
    enableChangelog = true,
    enableMigrationGuides = true,
    enableBestPractices = true,
    enableTroubleshooting = true,
    enableFAQ = true,
    enableGlossary = true,
    enableSearchableDocumentation = true,
    enableVersionedDocumentation = true,
    enableMultiLanguageDocumentation = true,
    enableOfflineDocumentation = false,
    enablePrintableDocumentation = false,
    documentationFormat = 'markdown',
    documentationTheme = 'auto',
    documentationLanguage = 'en',
    documentationVersion = '1.0.0',
  } = options;

  const [state, setState] = useState<DocumentationState>({
    isDocumentationEnabled: enableDocumentation,
    isInteractiveDocsEnabled: enableInteractiveDocs,
    isAPIExplorerEnabled: enableAPIExplorer,
    isCodeExamplesEnabled: enableCodeExamples,
    isLiveDemosEnabled: enableLiveDemos,
    isPlaygroundEnabled: enablePlayground,
    isTutorialsEnabled: enableTutorials,
    isGuidesEnabled: enableGuides,
    isAPIReferenceEnabled: enableAPIReference,
    isChangelogEnabled: enableChangelog,
    isMigrationGuidesEnabled: enableMigrationGuides,
    isBestPracticesEnabled: enableBestPractices,
    isTroubleshootingEnabled: enableTroubleshooting,
    isFAQEnabled: enableFAQ,
    isGlossaryEnabled: enableGlossary,
    isSearchableDocumentationEnabled: enableSearchableDocumentation,
    isVersionedDocumentationEnabled: enableVersionedDocumentation,
    isMultiLanguageDocumentationEnabled: enableMultiLanguageDocumentation,
    isOfflineDocumentationEnabled: enableOfflineDocumentation,
    isPrintableDocumentationEnabled: enablePrintableDocumentation,
    currentDocumentationFormat: documentationFormat,
    currentDocumentationTheme: documentationTheme,
    currentDocumentationLanguage: documentationLanguage,
    currentDocumentationVersion: documentationVersion,
    documentationPages: [],
    codeExamples: [],
    liveDemos: [],
    apiEndpoints: [],
    searchIndex: [],
  });

  // Build Search Index
  const buildSearchIndex = useCallback(() => {
    if (!enableDocumentation || !enableSearchableDocumentation) return;

    const searchIndex = [
      ...state.documentationPages.map(page => ({
        id: page.id,
        title: page.title,
        content: page.content,
        url: `/docs/${page.slug}`,
        type: page.type,
        tags: page.tags,
      })),
      ...state.codeExamples.map(example => ({
        id: example.id,
        title: example.title,
        content: example.description,
        url: `/examples/${example.id}`,
        type: 'example',
        tags: example.tags,
      })),
      ...state.liveDemos.map(demo => ({
        id: demo.id,
        title: demo.title,
        content: demo.description,
        url: `/demos/${demo.id}`,
        type: 'demo',
        tags: demo.tags,
      })),
    ];

    setState(prev => ({
      ...prev,
      searchIndex,
    }));
  }, [enableDocumentation, enableSearchableDocumentation, state.documentationPages, state.codeExamples, state.liveDemos]);


  // Create Documentation Page
  const createDocumentationPage = useCallback((title: string, slug: string, type: string, content: string, options: any = {}): string => {
    if (!enableDocumentation) return '';

    const pageId = `page-${Date.now()}`;
    const page = {
      id: pageId,
      title,
      slug,
      type: type as 'guide' | 'tutorial' | 'api' | 'example' | 'demo' | 'changelog' | 'migration' | 'faq',
      content,
      language: options.language || documentationLanguage,
      version: options.version || documentationVersion,
      tags: options.tags || [],
      lastUpdated: Date.now(),
      author: options.author || 'System',
    };

    setState(prev => ({
      ...prev,
      documentationPages: [...prev.documentationPages, page],
    }));

    // Update search index
    if (enableSearchableDocumentation) {
      buildSearchIndex();
    }

    return pageId;
  }, [enableDocumentation, documentationLanguage, documentationVersion, enableSearchableDocumentation, buildSearchIndex]);

  // Update Documentation Page
  const updateDocumentationPage = useCallback((pageId: string, updates: any) => {
    if (!enableDocumentation) return;

    setState(prev => ({
      ...prev,
      documentationPages: prev.documentationPages.map(page =>
        page.id === pageId
          ? { ...page, ...updates, lastUpdated: Date.now() }
          : page
      ),
    }));

    // Update search index
    if (enableSearchableDocumentation) {
      buildSearchIndex();
    }
  }, [buildSearchIndex, enableDocumentation, enableSearchableDocumentation]);

  // Delete Documentation Page
  const deleteDocumentationPage = useCallback((pageId: string) => {
    if (!enableDocumentation) return;

    setState(prev => ({
      ...prev,
      documentationPages: prev.documentationPages.filter(page => page.id !== pageId),
    }));

    // Update search index
    if (enableSearchableDocumentation) {
      buildSearchIndex();
    }
  }, [buildSearchIndex, enableDocumentation, enableSearchableDocumentation]);

  // Create Code Example
  const createCodeExample = useCallback((title: string, description: string, code: string, language: string, framework: string, tags: string[] = []): string => {
    if (!enableDocumentation || !enableCodeExamples) return '';

    const exampleId = `example-${Date.now()}`;
    const example = {
      id: exampleId,
      title,
      description,
      code,
      language,
      framework,
      tags,
      createdAt: Date.now(),
    };

    setState(prev => ({
      ...prev,
      codeExamples: [...prev.codeExamples, example],
    }));

    return exampleId;
  }, [enableDocumentation, enableCodeExamples]);

  // Update Code Example
  const updateCodeExample = useCallback((exampleId: string, updates: any) => {
    if (!enableDocumentation || !enableCodeExamples) return;

    setState(prev => ({
      ...prev,
      codeExamples: prev.codeExamples.map(example =>
        example.id === exampleId
          ? { ...example, ...updates }
          : example
      ),
    }));
  }, [enableDocumentation, enableCodeExamples]);

  // Delete Code Example
  const deleteCodeExample = useCallback((exampleId: string) => {
    if (!enableDocumentation || !enableCodeExamples) return;

    setState(prev => ({
      ...prev,
      codeExamples: prev.codeExamples.filter(example => example.id !== exampleId),
    }));
  }, [enableDocumentation, enableCodeExamples]);

  // Create Live Demo
  const createLiveDemo = useCallback((title: string, description: string, component: string, props: Record<string, any>, code: string, tags: string[] = []): string => {
    if (!enableDocumentation || !enableLiveDemos) return '';

    const demoId = `demo-${Date.now()}`;
    const demo = {
      id: demoId,
      title,
      description,
      component,
      props,
      code,
      tags,
      createdAt: Date.now(),
    };

    setState(prev => ({
      ...prev,
      liveDemos: [...prev.liveDemos, demo],
    }));

    return demoId;
  }, [enableDocumentation, enableLiveDemos]);

  // Update Live Demo
  const updateLiveDemo = useCallback((demoId: string, updates: any) => {
    if (!enableDocumentation || !enableLiveDemos) return;

    setState(prev => ({
      ...prev,
      liveDemos: prev.liveDemos.map(demo =>
        demo.id === demoId
          ? { ...demo, ...updates }
          : demo
      ),
    }));
  }, [enableDocumentation, enableLiveDemos]);

  // Delete Live Demo
  const deleteLiveDemo = useCallback((demoId: string) => {
    if (!enableDocumentation || !enableLiveDemos) return;

    setState(prev => ({
      ...prev,
      liveDemos: prev.liveDemos.filter(demo => demo.id !== demoId),
    }));
  }, [enableDocumentation, enableLiveDemos]);

  // Create API Endpoint
  const createAPIEndpoint = useCallback((name: string, method: string, path: string, description: string, parameters: any[], responses: any[], examples: any[] = []): string => {
    if (!enableDocumentation || !enableAPIExplorer) return '';

    const endpointId = `endpoint-${Date.now()}`;
    const endpoint = {
      id: endpointId,
      name,
      method,
      path,
      description,
      parameters,
      responses,
      examples,
    };

    setState(prev => ({
      ...prev,
      apiEndpoints: [...prev.apiEndpoints, endpoint],
    }));

    return endpointId;
  }, [enableDocumentation, enableAPIExplorer]);

  // Update API Endpoint
  const updateAPIEndpoint = useCallback((endpointId: string, updates: any) => {
    if (!enableDocumentation || !enableAPIExplorer) return;

    setState(prev => ({
      ...prev,
      apiEndpoints: prev.apiEndpoints.map(endpoint =>
        endpoint.id === endpointId
          ? { ...endpoint, ...updates }
          : endpoint
      ),
    }));
  }, [enableDocumentation, enableAPIExplorer]);

  // Delete API Endpoint
  const deleteAPIEndpoint = useCallback((endpointId: string) => {
    if (!enableDocumentation || !enableAPIExplorer) return;

    setState(prev => ({
      ...prev,
      apiEndpoints: prev.apiEndpoints.filter(endpoint => endpoint.id !== endpointId),
    }));
  }, [enableDocumentation, enableAPIExplorer]);

  // Search Documentation
  const searchDocumentation = useCallback((query: string): any[] => {
    if (!enableDocumentation || !enableSearchableDocumentation) return [];

    const lowerQuery = query.toLowerCase();
    return state.searchIndex.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [enableDocumentation, enableSearchableDocumentation, state.searchIndex]);

  // Get Documentation Page
  const getDocumentationPage = useCallback((pageId: string) => {
    return state.documentationPages.find(page => page.id === pageId);
  }, [state.documentationPages]);

  // Get Documentation Pages
  const getDocumentationPages = useCallback((filter?: any) => {
    if (filter) {
      return state.documentationPages.filter(page =>
        Object.keys(filter).every(key => page[key as keyof typeof page] === filter[key])
      );
    }
    return state.documentationPages;
  }, [state.documentationPages]);

  // Get Code Example
  const getCodeExample = useCallback((exampleId: string) => {
    return state.codeExamples.find(example => example.id === exampleId);
  }, [state.codeExamples]);

  // Get Code Examples
  const getCodeExamples = useCallback((filter?: any) => {
    if (filter) {
      return state.codeExamples.filter(example =>
        Object.keys(filter).every(key => example[key as keyof typeof example] === filter[key])
      );
    }
    return state.codeExamples;
  }, [state.codeExamples]);

  // Get Live Demo
  const getLiveDemo = useCallback((demoId: string) => {
    return state.liveDemos.find(demo => demo.id === demoId);
  }, [state.liveDemos]);

  // Get Live Demos
  const getLiveDemos = useCallback((filter?: any) => {
    if (filter) {
      return state.liveDemos.filter(demo =>
        Object.keys(filter).every(key => demo[key as keyof typeof demo] === filter[key])
      );
    }
    return state.liveDemos;
  }, [state.liveDemos]);

  // Get API Endpoint
  const getAPIEndpoint = useCallback((endpointId: string) => {
    return state.apiEndpoints.find(endpoint => endpoint.id === endpointId);
  }, [state.apiEndpoints]);

  // Get API Endpoints
  const getAPIEndpoints = useCallback((filter?: any) => {
    if (filter) {
      return state.apiEndpoints.filter(endpoint =>
        Object.keys(filter).every(key => endpoint[key as keyof typeof endpoint] === filter[key])
      );
    }
    return state.apiEndpoints;
  }, [state.apiEndpoints]);

  // Export Documentation
  const exportDocumentation = useCallback((format: string) => {
    const data = {
      documentationPages: state.documentationPages,
      codeExamples: state.codeExamples,
      liveDemos: state.liveDemos,
      apiEndpoints: state.apiEndpoints,
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else if (format === 'markdown') {
      let markdown = '# Documentation\n\n';
      
      state.documentationPages.forEach(page => {
        markdown += `## ${page.title}\n\n${page.content}\n\n`;
      });

      return markdown;
    }

    return JSON.stringify(data);
  }, [state]);

  // Import Documentation
  const importDocumentation = useCallback((data: string, format: string) => {
    try {
      if (format === 'json') {
        const imported = JSON.parse(data);
        setState(prev => ({
          ...prev,
          documentationPages: imported.documentationPages || prev.documentationPages,
          codeExamples: imported.codeExamples || prev.codeExamples,
          liveDemos: imported.liveDemos || prev.liveDemos,
          apiEndpoints: imported.apiEndpoints || prev.apiEndpoints,
        }));
      }
    } catch (error) {
      console.error('Failed to import documentation:', error);
    }
  }, []);

  // Generate API Reference
  const generateAPIReference = useCallback((componentName: string, props: any[], methods: any[]) => {
    return `# ${componentName} API Reference

## Props

${props.map(prop => `
### ${prop.name}
- **Type:** \`${prop.type}\`
- **Required:** ${prop.required ? 'Yes' : 'No'}
- **Default:** \`${prop.default || 'undefined'}\`
- **Description:** ${prop.description}
`).join('')}

## Methods

${methods.map(method => `
### ${method.name}
- **Parameters:** ${method.parameters?.map((p: any) => `\`${p.name}: ${p.type}\``).join(', ') || 'None'}
- **Returns:** \`${method.returns || 'void'}\`
- **Description:** ${method.description}
`).join('')}
`;
  }, []);

  // Generate Changelog
  const generateChangelog = useCallback((version: string, changes: any[]) => {
    return `# Changelog

## [${version}] - ${new Date().toISOString().split('T')[0]}

${changes.map(change => `
### ${change.type}
- ${change.description}
`).join('')}
`;
  }, []);

  // Generate Migration Guide
  const generateMigrationGuide = useCallback((fromVersion: string, toVersion: string, changes: any[]) => {
    return `# Migration Guide: ${fromVersion} → ${toVersion}

## Breaking Changes

${changes.filter(c => c.breaking).map(change => `
### ${change.title}
${change.description}

**Before:**
\`\`\`tsx
${change.before}
\`\`\`

**After:**
\`\`\`tsx
${change.after}
\`\`\`
`).join('')}

## New Features

${changes.filter(c => !c.breaking).map(change => `
### ${change.title}
${change.description}
`).join('')}
`;
  }, []);

  // Generate Tutorial
  const generateTutorial = useCallback((title: string, steps: any[]) => {
    return `# ${title}

${steps.map((step, index) => `
## Step ${index + 1}: ${step.title}

${step.description}

${step.code ? `\`\`\`tsx\n${step.code}\n\`\`\`` : ''}
`).join('')}
`;
  }, []);

  // Generate Guide
  const generateGuide = useCallback((title: string, sections: any[]) => {
    return `# ${title}

${sections.map(section => `
## ${section.title}

${section.content}

${section.examples?.map((example: any) => `
### Example: ${example.title}
${example.description}

\`\`\`tsx
${example.code}
\`\`\`
`).join('') || ''}
`).join('')}
`;
  }, []);

  // Reset
  const reset = useCallback(() => {
    setState({
      isDocumentationEnabled: enableDocumentation,
      isInteractiveDocsEnabled: enableInteractiveDocs,
      isAPIExplorerEnabled: enableAPIExplorer,
      isCodeExamplesEnabled: enableCodeExamples,
      isLiveDemosEnabled: enableLiveDemos,
      isPlaygroundEnabled: enablePlayground,
      isTutorialsEnabled: enableTutorials,
      isGuidesEnabled: enableGuides,
      isAPIReferenceEnabled: enableAPIReference,
      isChangelogEnabled: enableChangelog,
      isMigrationGuidesEnabled: enableMigrationGuides,
      isBestPracticesEnabled: enableBestPractices,
      isTroubleshootingEnabled: enableTroubleshooting,
      isFAQEnabled: enableFAQ,
      isGlossaryEnabled: enableGlossary,
      isSearchableDocumentationEnabled: enableSearchableDocumentation,
      isVersionedDocumentationEnabled: enableVersionedDocumentation,
      isMultiLanguageDocumentationEnabled: enableMultiLanguageDocumentation,
      isOfflineDocumentationEnabled: enableOfflineDocumentation,
      isPrintableDocumentationEnabled: enablePrintableDocumentation,
      currentDocumentationFormat: documentationFormat,
      currentDocumentationTheme: documentationTheme,
      currentDocumentationLanguage: documentationLanguage,
      currentDocumentationVersion: documentationVersion,
      documentationPages: [],
      codeExamples: [],
      liveDemos: [],
      apiEndpoints: [],
      searchIndex: [],
    });
  }, [
    enableDocumentation,
    enableInteractiveDocs,
    enableAPIExplorer,
    enableCodeExamples,
    enableLiveDemos,
    enablePlayground,
    enableTutorials,
    enableGuides,
    enableAPIReference,
    enableChangelog,
    enableMigrationGuides,
    enableBestPractices,
    enableTroubleshooting,
    enableFAQ,
    enableGlossary,
    enableSearchableDocumentation,
    enableVersionedDocumentation,
    enableMultiLanguageDocumentation,
    enableOfflineDocumentation,
    enablePrintableDocumentation,
    documentationFormat,
    documentationTheme,
    documentationLanguage,
    documentationVersion,
  ]);

  // Actions object
  const actions: DocumentationActions = useMemo(() => ({
    createDocumentationPage,
    updateDocumentationPage,
    deleteDocumentationPage,
    createCodeExample,
    updateCodeExample,
    deleteCodeExample,
    createLiveDemo,
    updateLiveDemo,
    deleteLiveDemo,
    createAPIEndpoint,
    updateAPIEndpoint,
    deleteAPIEndpoint,
    searchDocumentation,
    buildSearchIndex,
    getDocumentationPage,
    getDocumentationPages,
    getCodeExample,
    getCodeExamples,
    getLiveDemo,
    getLiveDemos,
    getAPIEndpoint,
    getAPIEndpoints,
    exportDocumentation,
    importDocumentation,
    generateAPIReference,
    generateChangelog,
    generateMigrationGuide,
    generateTutorial,
    generateGuide,
    reset,
  }), [
    createDocumentationPage,
    updateDocumentationPage,
    deleteDocumentationPage,
    createCodeExample,
    updateCodeExample,
    deleteCodeExample,
    createLiveDemo,
    updateLiveDemo,
    deleteLiveDemo,
    createAPIEndpoint,
    updateAPIEndpoint,
    deleteAPIEndpoint,
    searchDocumentation,
    buildSearchIndex,
    getDocumentationPage,
    getDocumentationPages,
    getCodeExample,
    getCodeExamples,
    getLiveDemo,
    getLiveDemos,
    getAPIEndpoint,
    getAPIEndpoints,
    exportDocumentation,
    importDocumentation,
    generateAPIReference,
    generateChangelog,
    generateMigrationGuide,
    generateTutorial,
    generateGuide,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
