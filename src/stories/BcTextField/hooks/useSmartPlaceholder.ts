import { useState, useCallback, useMemo, useEffect } from 'react';

export interface PlaceholderContext {
  fieldName?: string;
  fieldType?: string;
  userContext?: Record<string, any>;
  formContext?: Record<string, any>;
  locale?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface PlaceholderTemplate {
  id: string;
  name: string;
  template: string;
  context: string[];
  priority: number;
  enabled: boolean;
  conditions?: (context: PlaceholderContext) => boolean;
  customFunction?: (context: PlaceholderContext) => string;
}

export interface UseSmartPlaceholderProps {
  enableSmartPlaceholder?: boolean;
  enableContextualPlaceholders?: boolean;
  enableTimeBasedPlaceholders?: boolean;
  enablePersonalizedPlaceholders?: boolean;
  enableLearning?: boolean;
  customTemplates?: PlaceholderTemplate[];
  placeholderContext?: PlaceholderContext;
  onPlaceholderGenerated?: (placeholder: string, context: PlaceholderContext) => void;
}

export interface UseSmartPlaceholderReturn {
  smartPlaceholder: string;
  isGenerating: boolean;
  generatePlaceholder: (context?: PlaceholderContext) => string;
  addTemplate: (template: PlaceholderTemplate) => void;
  removeTemplate: (templateId: string) => void;
  updateTemplate: (templateId: string, updates: Partial<PlaceholderTemplate>) => void;
  getTemplates: () => PlaceholderTemplate[];
  clearPlaceholder: () => void;
  getPlaceholderHistory: () => string[];
  getPlaceholderStatistics: () => {
    totalTemplates: number;
    enabledTemplates: number;
    disabledTemplates: number;
    averagePriority: number;
  };
}

/**
 * Smart Placeholder hook'u
 * Akıllı placeholder ve bağlamsal öneriler
 */
export const useSmartPlaceholder = ({
  enableSmartPlaceholder = true,
  enableContextualPlaceholders = true,
  enableTimeBasedPlaceholders = true,
  enablePersonalizedPlaceholders = true,
  enableLearning = true,
  customTemplates = [],
  placeholderContext = {},
  onPlaceholderGenerated,
}: UseSmartPlaceholderProps): UseSmartPlaceholderReturn => {
  
  const [smartPlaceholder, setSmartPlaceholder] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [placeholderHistory, setPlaceholderHistory] = useState<string[]>([]);
  const [templates, setTemplates] = useState<PlaceholderTemplate[]>([]);

  // Default placeholder templates
  const defaultTemplates: PlaceholderTemplate[] = useMemo(() => [
    {
      id: 'email-basic',
      name: 'Email Basic',
      template: 'Enter your email address',
      context: ['email'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'email-personalized',
      name: 'Email Personalized',
      template: 'Hi {name}, enter your email address',
      context: ['email'],
      priority: 2,
      enabled: true,
      conditions: (context) => !!context.userContext?.name,
    },
    {
      id: 'password-basic',
      name: 'Password Basic',
      template: 'Enter your password',
      context: ['password'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'password-strong',
      name: 'Password Strong',
      template: 'Create a strong password (8+ characters)',
      context: ['password'],
      priority: 2,
      enabled: true,
    },
    {
      id: 'name-basic',
      name: 'Name Basic',
      template: 'Enter your full name',
      context: ['name', 'fullName'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'name-first',
      name: 'Name First',
      template: 'Enter your first name',
      context: ['firstName'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'name-last',
      name: 'Name Last',
      template: 'Enter your last name',
      context: ['lastName'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'phone-basic',
      name: 'Phone Basic',
      template: 'Enter your phone number',
      context: ['phone', 'phoneNumber'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'phone-formatted',
      name: 'Phone Formatted',
      template: 'Enter phone number (e.g., +1 234 567 8900)',
      context: ['phone', 'phoneNumber'],
      priority: 2,
      enabled: true,
    },
    {
      id: 'address-basic',
      name: 'Address Basic',
      template: 'Enter your address',
      context: ['address'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'address-street',
      name: 'Address Street',
      template: 'Enter street address',
      context: ['street', 'streetAddress'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'address-city',
      name: 'Address City',
      template: 'Enter city',
      context: ['city'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'address-zip',
      name: 'Address ZIP',
      template: 'Enter ZIP code',
      context: ['zip', 'zipCode', 'postalCode'],
      priority: 1,
      enabled: true,
    },
    {
      id: 'time-morning',
      name: 'Time Morning',
      template: 'Good morning! Enter your {fieldName}',
      context: ['*'],
      priority: 3,
      enabled: true,
      conditions: (context) => context.timeOfDay === 'morning',
    },
    {
      id: 'time-afternoon',
      name: 'Time Afternoon',
      template: 'Good afternoon! Enter your {fieldName}',
      context: ['*'],
      priority: 3,
      enabled: true,
      conditions: (context) => context.timeOfDay === 'afternoon',
    },
    {
      id: 'time-evening',
      name: 'Time Evening',
      template: 'Good evening! Enter your {fieldName}',
      context: ['*'],
      priority: 3,
      enabled: true,
      conditions: (context) => context.timeOfDay === 'evening',
    },
    {
      id: 'time-night',
      name: 'Time Night',
      template: 'Good night! Enter your {fieldName}',
      context: ['*'],
      priority: 3,
      enabled: true,
      conditions: (context) => context.timeOfDay === 'night',
    },
    {
      id: 'season-spring',
      name: 'Season Spring',
      template: 'Spring is here! Enter your {fieldName}',
      context: ['*'],
      priority: 4,
      enabled: true,
      conditions: (context) => context.season === 'spring',
    },
    {
      id: 'season-summer',
      name: 'Season Summer',
      template: 'Summer vibes! Enter your {fieldName}',
      context: ['*'],
      priority: 4,
      enabled: true,
      conditions: (context) => context.season === 'summer',
    },
    {
      id: 'season-autumn',
      name: 'Season Autumn',
      template: 'Autumn colors! Enter your {fieldName}',
      context: ['*'],
      priority: 4,
      enabled: true,
      conditions: (context) => context.season === 'autumn',
    },
    {
      id: 'season-winter',
      name: 'Season Winter',
      template: 'Winter wonderland! Enter your {fieldName}',
      context: ['*'],
      priority: 4,
      enabled: true,
      conditions: (context) => context.season === 'winter',
    },
  ], []);

  // Initialize templates
  useEffect(() => {
    setTemplates([...defaultTemplates, ...customTemplates]);
  }, [defaultTemplates, customTemplates]);

  // Get current time context
  const getTimeContext = useCallback((): Partial<PlaceholderContext> => {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();
    
    let timeOfDay: PlaceholderContext['timeOfDay'];
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    let season: PlaceholderContext['season'];
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';
    
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()] as PlaceholderContext['dayOfWeek'];
    
    return { timeOfDay, season, dayOfWeek };
  }, []);

  // Generate placeholder
  const generatePlaceholder = useCallback((context?: PlaceholderContext): string => {
    if (!enableSmartPlaceholder) return '';
    
    setIsGenerating(true);
    
    try {
      const fullContext: PlaceholderContext = {
        ...placeholderContext,
        ...getTimeContext(),
        ...context,
      };
      
      // Find applicable templates
      const applicableTemplates = templates
        .filter(template => template.enabled)
        .filter(template => {
          // Check if template applies to current field
          if (template.context.includes('*')) return true;
          if (fullContext.fieldName && template.context.includes(fullContext.fieldName)) return true;
          if (fullContext.fieldType && template.context.includes(fullContext.fieldType)) return true;
          return false;
        })
        .filter(template => {
          // Check conditions
          if (template.conditions) {
            return template.conditions(fullContext);
          }
          return true;
        })
        .sort((a, b) => a.priority - b.priority);
      
      if (applicableTemplates.length === 0) {
        return '';
      }
      
      // Select best template
      const selectedTemplate = applicableTemplates[0];
      
      let placeholder = selectedTemplate.template;
      
      // Apply custom function if available
      if (selectedTemplate.customFunction) {
        placeholder = selectedTemplate.customFunction(fullContext);
      } else {
        // Replace placeholders
        placeholder = placeholder
          .replace(/{name}/g, fullContext.userContext?.name || 'there')
          .replace(/{fieldName}/g, fullContext.fieldName || 'information')
          .replace(/{fieldType}/g, fullContext.fieldType || 'field')
          .replace(/{locale}/g, fullContext.locale || 'en');
      }
      
      // Add to history
      if (enableLearning) {
        setPlaceholderHistory(prev => [placeholder, ...prev].slice(0, 10));
      }
      
      onPlaceholderGenerated?.(placeholder, fullContext);
      
      return placeholder;
    } finally {
      setIsGenerating(false);
    }
  }, [
    enableSmartPlaceholder,
    placeholderContext,
    getTimeContext,
    templates,
    enableLearning,
    onPlaceholderGenerated
  ]);

  // Add template
  const addTemplate = useCallback((template: PlaceholderTemplate) => {
    setTemplates(prev => [...prev, template]);
  }, []);

  // Remove template
  const removeTemplate = useCallback((templateId: string) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
  }, []);

  // Update template
  const updateTemplate = useCallback((templateId: string, updates: Partial<PlaceholderTemplate>) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, ...updates } : template
    ));
  }, []);

  // Get templates
  const getTemplates = useCallback((): PlaceholderTemplate[] => {
    return [...templates];
  }, [templates]);

  // Clear placeholder
  const clearPlaceholder = useCallback(() => {
    setSmartPlaceholder('');
  }, []);

  // Get placeholder history
  const getPlaceholderHistory = useCallback((): string[] => {
    return [...placeholderHistory];
  }, [placeholderHistory]);

  // Get placeholder statistics
  const getPlaceholderStatistics = useCallback(() => {
    const totalTemplates = templates.length;
    const enabledTemplates = templates.filter(template => template.enabled).length;
    const disabledTemplates = totalTemplates - enabledTemplates;
    const averagePriority = templates.length > 0 
      ? templates.reduce((sum, template) => sum + template.priority, 0) / templates.length
      : 0;
    
    return {
      totalTemplates,
      enabledTemplates,
      disabledTemplates,
      averagePriority,
    };
  }, [templates]);

  return {
    smartPlaceholder,
    isGenerating,
    generatePlaceholder,
    addTemplate,
    removeTemplate,
    updateTemplate,
    getTemplates,
    clearPlaceholder,
    getPlaceholderHistory,
    getPlaceholderStatistics,
  };
};
