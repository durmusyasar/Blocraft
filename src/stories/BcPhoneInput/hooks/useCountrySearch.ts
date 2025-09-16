import { useState, useMemo, useCallback } from 'react';
import { CountryType } from '../types';

export interface UseCountrySearchProps {
  countryList: CountryType[];
  favoriteCountries: string[];
  recentCountries: string[];
  enableSearch?: boolean;
  searchDebounceMs?: number;
  minSearchLength?: number;
}

export interface UseCountrySearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCountries: {
    favs: CountryType[];
    recents: CountryType[];
    others: CountryType[];
  };
  isSearching: boolean;
  clearSearch: () => void;
  searchResults: CountryType[];
  highlightMatch: (text: string, query: string) => string;
}

/**
 * Ülke arama ve filtreleme hook'u
 * Select içinde arama özelliği sağlar
 */
export const useCountrySearch = ({
  countryList,
  favoriteCountries,
  recentCountries,
  enableSearch = true,
  searchDebounceMs = 300,
  minSearchLength = 1,
}: UseCountrySearchProps): UseCountrySearchReturn => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Arama sorgusunu güncelle
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length >= minSearchLength);
  }, [minSearchLength]);

  // Arama temizle
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  // Metin içinde eşleşmeyi vurgula
  const highlightMatch = useCallback((text: string, query: string): string => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }, []);

  // Ülkeleri filtrele
  const filteredCountries = useMemo(() => {
    if (!enableSearch || !searchQuery || searchQuery.length < minSearchLength) {
      // Arama yoksa normal gruplandırma
      const favs = favoriteCountries
        .map(code => countryList.find(c => c.code === code))
        .filter(Boolean) as CountryType[];
      
      const recents = recentCountries
        .filter(code => !favoriteCountries.includes(code))
        .map(code => countryList.find(c => c.code === code))
        .filter(Boolean) as CountryType[];
      
      const others = countryList.filter(
        c => !favs.some(f => f.code === c.code) && 
             !recents.some(r => r.code === c.code)
      );
      
      return { favs, recents, others };
    }

    // Arama varsa filtrele
    const query = searchQuery.toLowerCase();
    const searchResults = countryList.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.dial.toString().includes(query)
    );

    // Arama sonuçlarını gruplandır
    const favs = searchResults.filter(c => favoriteCountries.includes(c.code));
    const recents = searchResults.filter(c => 
      recentCountries.includes(c.code) && !favoriteCountries.includes(c.code)
    );
    const others = searchResults.filter(c => 
      !favoriteCountries.includes(c.code) && !recentCountries.includes(c.code)
    );

    return { favs, recents, others };
  }, [
    enableSearch,
    searchQuery,
    minSearchLength,
    countryList,
    favoriteCountries,
    recentCountries
  ]);

  // Tüm arama sonuçları
  const searchResults = useMemo(() => {
    if (!enableSearch || !searchQuery || searchQuery.length < minSearchLength) {
      return [];
    }
    
    const query = searchQuery.toLowerCase();
    return countryList.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.dial.toString().includes(query)
    );
  }, [enableSearch, searchQuery, minSearchLength, countryList]);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    filteredCountries,
    isSearching,
    clearSearch,
    searchResults,
    highlightMatch,
  };
};

