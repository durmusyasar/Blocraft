import { useState, useCallback, useEffect, useRef } from 'react';

export interface AutoCompleteOption {
  value: string;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
  disabled?: boolean;
}

export interface UseAutoCompleteProps {
  enableAutoComplete?: boolean;
  options?: AutoCompleteOption[];
  fetchOptions?: (query: string) => Promise<AutoCompleteOption[]>;
  minQueryLength?: number;
  maxSuggestions?: number;
  debounceMs?: number;
  enableCategories?: boolean;
  enableIcons?: boolean;
  enableKeyboardNavigation?: boolean;
  onSelect?: (option: AutoCompleteOption) => void;
  onQueryChange?: (query: string) => void;
}

export interface UseAutoCompleteReturn {
  suggestions: AutoCompleteOption[];
  isOpen: boolean;
  selectedIndex: number;
  isLoading: boolean;
  query: string;
  showSuggestions: (query: string) => void;
  hideSuggestions: () => void;
  selectOption: (option: AutoCompleteOption) => void;
  selectByIndex: (index: number) => void;
  navigateUp: () => void;
  navigateDown: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  getFilteredOptions: (query: string) => AutoCompleteOption[];
  clearSuggestions: () => void;
}

/**
 * Auto Complete hook'u
 * Akıllı otomatik tamamlama özellikleri
 */
export const useAutoComplete = ({
  enableAutoComplete = true,
  options = [],
  fetchOptions,
  minQueryLength = 1,
  maxSuggestions = 10,
  debounceMs = 300,
  enableCategories = true,
  enableIcons = true,
  enableKeyboardNavigation = true,
  onSelect,
  onQueryChange,
}: UseAutoCompleteProps): UseAutoCompleteReturn => {
  
  const [suggestions, setSuggestions] = useState<AutoCompleteOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Filter options locally
  const getFilteredOptions = useCallback((searchQuery: string): AutoCompleteOption[] => {
    if (!enableAutoComplete || !searchQuery || searchQuery.length < minQueryLength) return [];
    
    const query = searchQuery.toLowerCase();
    let filtered = options.filter(option => 
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query) ||
      (option.description && option.description.toLowerCase().includes(query))
    );

    // Use enableCategories to sort by category
    if (enableCategories) {
      filtered = filtered.sort((a, b) => {
        if (a.category && b.category) {
          return a.category.localeCompare(b.category);
        }
        return 0;
      });
    }

    // Use enableIcons to prioritize options with icons
    if (enableIcons) {
      filtered = filtered.sort((a, b) => {
        if (a.icon && !b.icon) return -1;
        if (!a.icon && b.icon) return 1;
        return 0;
      });
    }

    return filtered;
  }, [enableAutoComplete, options, minQueryLength, enableCategories, enableIcons]);

  // Debounced search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(async () => {
      if (searchQuery.length < minQueryLength) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        let newSuggestions: AutoCompleteOption[] = [];
        
        if (fetchOptions) {
          // Cancel previous request
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          
          abortControllerRef.current = new AbortController();
          newSuggestions = await fetchOptions(searchQuery);
        } else {
          newSuggestions = getFilteredOptions(searchQuery);
        }
        
        setSuggestions(newSuggestions.slice(0, maxSuggestions));
        setIsOpen(newSuggestions.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('AutoComplete fetch error:', error);
        }
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  }, [debounceMs, minQueryLength, fetchOptions, maxSuggestions, getFilteredOptions]);


  // Show suggestions
  const showSuggestions = useCallback((searchQuery: string) => {
    if (!enableAutoComplete) return;
    
    setQuery(searchQuery);
    onQueryChange?.(searchQuery);
    debouncedSearch(searchQuery);
  }, [enableAutoComplete, debouncedSearch, onQueryChange]);

  // Hide suggestions
  const hideSuggestions = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  // Select option
  const selectOption = useCallback((option: AutoCompleteOption) => {
    if (option.disabled) return;
    
    onSelect?.(option);
    hideSuggestions();
  }, [onSelect, hideSuggestions]);

  // Select by index
  const selectByIndex = useCallback((index: number) => {
    if (index >= 0 && index < suggestions.length) {
      selectOption(suggestions[index]);
    }
  }, [suggestions, selectOption]);

  // Navigate up
  const navigateUp = useCallback(() => {
    if (!enableKeyboardNavigation || !isOpen) return;
    
    setSelectedIndex(prev => 
      prev <= 0 ? suggestions.length - 1 : prev - 1
    );
  }, [enableKeyboardNavigation, isOpen, suggestions.length]);

  // Navigate down
  const navigateDown = useCallback(() => {
    if (!enableKeyboardNavigation || !isOpen) return;
    
    setSelectedIndex(prev => 
      prev >= suggestions.length - 1 ? 0 : prev + 1
    );
  }, [enableKeyboardNavigation, isOpen, suggestions.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enableKeyboardNavigation || !isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        navigateDown();
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateUp();
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectByIndex(selectedIndex);
        }
        break;
      case 'Escape':
        e.preventDefault();
        hideSuggestions();
        break;
    }
  }, [enableKeyboardNavigation, isOpen, selectedIndex, navigateDown, navigateUp, selectByIndex, hideSuggestions]);

  // Clear suggestions
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setIsLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    suggestions,
    isOpen,
    selectedIndex,
    isLoading,
    query,
    showSuggestions,
    hideSuggestions,
    selectOption,
    selectByIndex,
    navigateUp,
    navigateDown,
    handleKeyDown,
    getFilteredOptions,
    clearSuggestions,
  };
};
