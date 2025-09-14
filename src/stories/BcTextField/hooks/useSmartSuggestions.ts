import { useState, useCallback, useEffect } from 'react';

export interface SuggestionItem {
  id: string;
  text: string;
  type: 'recent' | 'favorite' | 'trending' | 'recommended' | 'custom';
  category?: string;
  icon?: string;
  metadata?: Record<string, any>;
  timestamp?: number;
  frequency?: number;
}

export interface UseSmartSuggestionsProps {
  enableSmartSuggestions?: boolean;
  enableRecentHistory?: boolean;
  enableFavorites?: boolean;
  enableTrending?: boolean;
  enableRecommendations?: boolean;
  maxHistoryItems?: number;
  maxFavorites?: number;
  maxTrending?: number;
  maxRecommendations?: number;
  suggestionDebounceMs?: number;
  enableLearning?: boolean;
  enablePersonalization?: boolean;
  onSuggestionSelect?: (suggestion: SuggestionItem) => void;
  onSuggestionAdd?: (suggestion: SuggestionItem) => void;
  onSuggestionRemove?: (suggestionId: string) => void;
}

export interface UseSmartSuggestionsReturn {
  suggestions: SuggestionItem[];
  recentHistory: SuggestionItem[];
  favorites: SuggestionItem[];
  trending: SuggestionItem[];
  recommendations: SuggestionItem[];
  isLoading: boolean;
  searchSuggestions: (query: string) => void;
  addToHistory: (text: string, metadata?: Record<string, any>) => void;
  addToFavorites: (suggestion: SuggestionItem) => void;
  removeFromFavorites: (suggestionId: string) => void;
  clearHistory: () => void;
  clearFavorites: () => void;
  getSuggestionsByType: (type: SuggestionItem['type']) => SuggestionItem[];
  updateSuggestionFrequency: (suggestionId: string) => void;
  getPersonalizedSuggestions: (query: string) => SuggestionItem[];
}

/**
 * Smart Suggestions hook'u
 * Akıllı öneriler ve kişiselleştirme
 */
export const useSmartSuggestions = ({
  enableSmartSuggestions = true,
  enableRecentHistory = true,
  enableFavorites = true,
  enableTrending = false,
  enableRecommendations = false,
  maxHistoryItems = 50,
  maxFavorites = 20,
  maxTrending = 10,
  maxRecommendations = 15,
  suggestionDebounceMs = 300,
  enableLearning = true,
  enablePersonalization = true,
  onSuggestionSelect,
  onSuggestionAdd,
  onSuggestionRemove,
}: UseSmartSuggestionsProps): UseSmartSuggestionsReturn => {
  
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [recentHistory, setRecentHistory] = useState<SuggestionItem[]>([]);
  const [favorites, setFavorites] = useState<SuggestionItem[]>([]);
  const [trending, setTrending] = useState<SuggestionItem[]>([]);
  const [recommendations, setRecommendations] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!enableSmartSuggestions) return;
    
    try {
      // Load recent history
      if (enableRecentHistory) {
        const storedHistory = localStorage.getItem('bc-textfield-recent-history');
        if (storedHistory) {
          const parsed = JSON.parse(storedHistory);
          if (Array.isArray(parsed)) {
            setRecentHistory(parsed.slice(0, maxHistoryItems));
          }
        }
      }
      
      // Load favorites
      if (enableFavorites) {
        const storedFavorites = localStorage.getItem('bc-textfield-favorites');
        if (storedFavorites) {
          const parsed = JSON.parse(storedFavorites);
          if (Array.isArray(parsed)) {
            setFavorites(parsed.slice(0, maxFavorites));
          }
        }
      }
      
      // Load trending (mock data)
      if (enableTrending) {
        const mockTrending: SuggestionItem[] = [
          { id: 'trend-1', text: 'React hooks', type: 'trending', category: 'development' },
          { id: 'trend-2', text: 'TypeScript', type: 'trending', category: 'development' },
          { id: 'trend-3', text: 'Material-UI', type: 'trending', category: 'ui' },
        ];
        setTrending(mockTrending.slice(0, maxTrending));
      }
      
      // Load recommendations (mock data)
      if (enableRecommendations) {
        const mockRecommendations: SuggestionItem[] = [
          { id: 'rec-1', text: 'Custom components', type: 'recommended', category: 'development' },
          { id: 'rec-2', text: 'Form validation', type: 'recommended', category: 'development' },
          { id: 'rec-3', text: 'Accessibility', type: 'recommended', category: 'ui' },
        ];
        setRecommendations(mockRecommendations.slice(0, maxRecommendations));
      }
    } catch (error) {
      console.warn('Failed to load smart suggestions data:', error);
    }
  }, [enableSmartSuggestions, enableRecentHistory, enableFavorites, enableTrending, enableRecommendations, maxHistoryItems, maxFavorites, maxTrending, maxRecommendations]);

  // Save data to localStorage
  const saveToStorage = useCallback((key: string, data: SuggestionItem[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  }, []);

  // Search suggestions
  const searchSuggestions = useCallback((query: string) => {
    if (!enableSmartSuggestions || !query.trim()) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate async search
    setTimeout(() => {
      const allSuggestions: SuggestionItem[] = [];
      
      // Add recent history matches
      if (enableRecentHistory) {
        const historyMatches = recentHistory.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        allSuggestions.push(...historyMatches);
      }
      
      // Add favorites matches
      if (enableFavorites) {
        const favoriteMatches = favorites.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        allSuggestions.push(...favoriteMatches);
      }
      
      // Add trending matches
      if (enableTrending) {
        const trendingMatches = trending.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        allSuggestions.push(...trendingMatches);
      }
      
      // Add recommendations matches
      if (enableRecommendations) {
        const recommendationMatches = recommendations.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        allSuggestions.push(...recommendationMatches);
      }
      
      // Remove duplicates and sort by frequency/timestamp
      const uniqueSuggestions = allSuggestions.reduce((acc, current) => {
        const existing = acc.find(item => item.text === current.text);
        if (!existing) {
          acc.push(current);
        } else if (current.frequency && current.frequency > (existing.frequency || 0)) {
          const index = acc.indexOf(existing);
          acc[index] = current;
        }
        return acc;
      }, [] as SuggestionItem[]);
      
      // Sort by type priority and frequency
      const sortedSuggestions = uniqueSuggestions.sort((a, b) => {
        const typePriority = { recent: 4, favorite: 3, recommended: 2, trending: 1, custom: 0 };
        const aPriority = typePriority[a.type] || 0;
        const bPriority = typePriority[b.type] || 0;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        return (b.frequency || 0) - (a.frequency || 0);
      });
      
      setSuggestions(sortedSuggestions.slice(0, 10));
      setIsLoading(false);
    }, suggestionDebounceMs);
  }, [
    enableSmartSuggestions,
    enableRecentHistory,
    enableFavorites,
    enableTrending,
    enableRecommendations,
    recentHistory,
    favorites,
    trending,
    recommendations,
    suggestionDebounceMs
  ]);

  // Add to history
  const addToHistory = useCallback((text: string, metadata?: Record<string, any>) => {
    if (!enableRecentHistory || !enableSmartSuggestions) return;
    
    const newItem: SuggestionItem = {
      id: `history-${Date.now()}`,
      text,
      type: 'recent',
      metadata,
      timestamp: Date.now(),
      frequency: 1,
    };
    
    setRecentHistory(prev => {
      const filtered = prev.filter(item => item.text !== text);
      const updated = [newItem, ...filtered].slice(0, maxHistoryItems);
      saveToStorage('bc-textfield-recent-history', updated);
      return updated;
    });
  }, [enableRecentHistory, enableSmartSuggestions, maxHistoryItems, saveToStorage]);

  // Add to favorites
  const addToFavorites = useCallback((suggestion: SuggestionItem) => {
    if (!enableFavorites || !enableSmartSuggestions) return;
    
    const favoriteItem: SuggestionItem = {
      ...suggestion,
      type: 'favorite',
      timestamp: Date.now(),
    };
    
    setFavorites(prev => {
      const filtered = prev.filter(item => item.id !== suggestion.id);
      const updated = [favoriteItem, ...filtered].slice(0, maxFavorites);
      saveToStorage('bc-textfield-favorites', updated);
      return updated;
    });
    
    onSuggestionAdd?.(favoriteItem);
  }, [enableFavorites, enableSmartSuggestions, maxFavorites, onSuggestionAdd, saveToStorage]);

  // Remove from favorites
  const removeFromFavorites = useCallback((suggestionId: string) => {
    if (!enableFavorites || !enableSmartSuggestions) return;
    
    setFavorites(prev => {
      const updated = prev.filter(item => item.id !== suggestionId);
      saveToStorage('bc-textfield-favorites', updated);
      return updated;
    });
    
    onSuggestionRemove?.(suggestionId);
  }, [enableFavorites, enableSmartSuggestions, onSuggestionRemove, saveToStorage]);

  // Clear history
  const clearHistory = useCallback(() => {
    if (!enableRecentHistory) return;
    
    setRecentHistory([]);
    saveToStorage('bc-textfield-recent-history', []);
  }, [enableRecentHistory, saveToStorage]);

  // Clear favorites
  const clearFavorites = useCallback(() => {
    if (!enableFavorites) return;
    
    setFavorites([]);
    saveToStorage('bc-textfield-favorites', []);
  }, [enableFavorites, saveToStorage]);

  // Get suggestions by type
  const getSuggestionsByType = useCallback((type: SuggestionItem['type']): SuggestionItem[] => {
    switch (type) {
      case 'recent':
        return recentHistory;
      case 'favorite':
        return favorites;
      case 'trending':
        return trending;
      case 'recommended':
        return recommendations;
      default:
        return [];
    }
  }, [recentHistory, favorites, trending, recommendations]);

  // Update suggestion frequency
  const updateSuggestionFrequency = useCallback((suggestionId: string) => {
    if (!enableLearning || !enableSmartSuggestions) return;
    
    setRecentHistory(prev => {
      const updated = prev.map(item => 
        item.id === suggestionId 
          ? { ...item, frequency: (item.frequency || 0) + 1 }
          : item
      );
      saveToStorage('bc-textfield-recent-history', updated);
      return updated;
    });
  }, [enableLearning, enableSmartSuggestions, saveToStorage]);

  // Get personalized suggestions
  const getPersonalizedSuggestions = useCallback((query: string): SuggestionItem[] => {
    if (!enablePersonalization || !enableSmartSuggestions) return [];
    
    // Simple personalization based on user history and favorites
    const allItems = [...recentHistory, ...favorites];
    const personalized = allItems
      .filter(item => item.text.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
      .slice(0, 5);
    
    return personalized;
  }, [enablePersonalization, enableSmartSuggestions, recentHistory, favorites]);

  return {
    suggestions,
    recentHistory,
    favorites,
    trending,
    recommendations,
    isLoading,
    searchSuggestions,
    addToHistory,
    addToFavorites,
    removeFromFavorites,
    clearHistory,
    clearFavorites,
    getSuggestionsByType,
    updateSuggestionFrequency,
    getPersonalizedSuggestions,
  };
};
