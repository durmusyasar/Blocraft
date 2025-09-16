import { useState, useCallback, useEffect, useMemo } from 'react';
import { CountryType } from '../types';

export interface PhoneHistoryEntry {
  id: string;
  phone: string;
  formattedPhone: string;
  country: string;
  countryName: string;
  timestamp: number;
  frequency: number;
  lastUsed: number;
  isFavorite: boolean;
  tags?: string[];
  notes?: string;
}

export interface UsePhoneHistoryProps {
  countryList: CountryType[];
  enableHistory?: boolean;
  maxHistoryEntries?: number;
  historyKey?: string;
  enableFavorites?: boolean;
  enableTags?: boolean;
  enableNotes?: boolean;
  onHistoryUpdate?: (history: PhoneHistoryEntry[]) => void;
}

export interface UsePhoneHistoryReturn {
  history: PhoneHistoryEntry[];
  favorites: PhoneHistoryEntry[];
  recent: PhoneHistoryEntry[];
  addToHistory: (phone: string, country: string, tags?: string[], notes?: string) => void;
  removeFromHistory: (id: string) => void;
  updateHistoryEntry: (id: string, updates: Partial<PhoneHistoryEntry>) => void;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
  clearFavorites: () => void;
  searchHistory: (query: string) => PhoneHistoryEntry[];
  getHistoryByCountry: (country: string) => PhoneHistoryEntry[];
  getHistoryByTag: (tag: string) => PhoneHistoryEntry[];
  exportHistory: () => string;
  importHistory: (data: string) => boolean;
  getStatistics: () => {
    totalEntries: number;
    totalFavorites: number;
    mostUsedCountry: string;
    mostUsedPhone: string;
    averageFrequency: number;
  };
}

/**
 * Telefon numarası geçmişi hook'u
 * Daha önce girilen numaralar ve detaylı geçmiş yönetimi
 */
export const usePhoneHistory = ({
  countryList,
  enableHistory = true,
  maxHistoryEntries = 100,
  historyKey = 'bc-phoneinput-phone-history',
  enableFavorites = true,
  enableTags = true,
  enableNotes = true,
  onHistoryUpdate,
}: UsePhoneHistoryProps): UsePhoneHistoryReturn => {
  
  const [history, setHistory] = useState<PhoneHistoryEntry[]>([]);

  // Geçmişi yükle
  useEffect(() => {
    if (!enableHistory) return;

    try {
      const stored = localStorage.getItem(historyKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load phone history:', error);
    }
  }, [enableHistory, historyKey]);

  // Geçmişi kaydet
  const saveHistory = useCallback((newHistory: PhoneHistoryEntry[]) => {
    if (!enableHistory) return;

    try {
      localStorage.setItem(historyKey, JSON.stringify(newHistory));
      onHistoryUpdate?.(newHistory);
    } catch (error) {
      console.warn('Failed to save phone history:', error);
    }
  }, [enableHistory, historyKey, onHistoryUpdate]);

  // Telefon numarasını formatla
  const formatPhoneNumber = useCallback((phone: string, mask: string): string => {
    const digits = phone.replace(/\D/g, '');
    const maskChars = mask.split('');
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < maskChars.length && digitIndex < digits.length; i++) {
      if (maskChars[i] === '9') {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += maskChars[i];
      }
    }

    return formatted;
  }, []);

  // Geçmişe ekle
  const addToHistory = useCallback((
    phone: string, 
    country: string, 
    tags: string[] = [], 
    notes: string = ''
  ) => {
    if (!enableHistory || !phone) return;

    const countryData = countryList.find(c => c.code === country);
    const formattedPhone = formatPhoneNumber(phone, countryData?.mask || '(999) 999-9999');
    const id = `${country}-${phone.replace(/\D/g, '')}`;
    const now = Date.now();

    setHistory(prev => {
      const existingIndex = prev.findIndex(entry => entry.id === id);
      
      if (existingIndex >= 0) {
        // Mevcut entry'yi güncelle
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          frequency: updated[existingIndex].frequency + 1,
          lastUsed: now,
          tags: enableTags ? Array.from(new Set([...updated[existingIndex].tags || [], ...tags])) : undefined,
          notes: enableNotes ? (notes || updated[existingIndex].notes) : undefined,
        };
        
        // Sıralama: en son kullanılan en üstte
        updated.sort((a, b) => b.lastUsed - a.lastUsed);
        
        // Maksimum entry sayısını kontrol et
        const limited = updated.slice(0, maxHistoryEntries);
        saveHistory(limited);
        return limited;
      } else {
        // Yeni entry oluştur
        const newEntry: PhoneHistoryEntry = {
          id,
          phone,
          formattedPhone,
          country,
          countryName: countryData?.name || country,
          timestamp: now,
          frequency: 1,
          lastUsed: now,
          isFavorite: false,
          tags: enableTags ? tags : undefined,
          notes: enableNotes ? notes : undefined,
        };

        const updated = [newEntry, ...prev].slice(0, maxHistoryEntries);
        saveHistory(updated);
        return updated;
      }
    });
  }, [
    enableHistory,
    countryList,
    formatPhoneNumber,
    maxHistoryEntries,
    enableTags,
    enableNotes,
    saveHistory,
  ]);

  // Geçmişten kaldır
  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(entry => entry.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, [saveHistory]);

  // Geçmiş entry'sini güncelle
  const updateHistoryEntry = useCallback((id: string, updates: Partial<PhoneHistoryEntry>) => {
    setHistory(prev => {
      const updated = prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      );
      saveHistory(updated);
      return updated;
    });
  }, [saveHistory]);

  // Favori durumunu değiştir
  const toggleFavorite = useCallback((id: string) => {
    if (!enableFavorites) return;

    setHistory(prev => {
      const updated = prev.map(entry => 
        entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
      );
      saveHistory(updated);
      return updated;
    });
  }, [enableFavorites, saveHistory]);

  // Geçmişi temizle
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(historyKey);
    } catch (error) {
      console.warn('Failed to clear phone history:', error);
    }
  }, [historyKey]);

  // Favorileri temizle
  const clearFavorites = useCallback(() => {
    setHistory(prev => {
      const updated = prev.map(entry => ({ ...entry, isFavorite: false }));
      saveHistory(updated);
      return updated;
    });
  }, [saveHistory]);

  // Geçmişte ara
  const searchHistory = useCallback((query: string): PhoneHistoryEntry[] => {
    if (!query) return history;

    const lowerQuery = query.toLowerCase();
    return history.filter(entry => 
      entry.phone.toLowerCase().includes(lowerQuery) ||
      entry.formattedPhone.toLowerCase().includes(lowerQuery) ||
      entry.countryName.toLowerCase().includes(lowerQuery) ||
      entry.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      entry.notes?.toLowerCase().includes(lowerQuery)
    );
  }, [history]);

  // Ülkeye göre geçmiş
  const getHistoryByCountry = useCallback((country: string): PhoneHistoryEntry[] => {
    return history.filter(entry => entry.country === country);
  }, [history]);

  // Etikete göre geçmiş
  const getHistoryByTag = useCallback((tag: string): PhoneHistoryEntry[] => {
    return history.filter(entry => entry.tags?.includes(tag));
  }, [history]);

  // Geçmişi dışa aktar
  const exportHistory = useCallback((): string => {
    const exportData = {
      version: '1.0',
      timestamp: Date.now(),
      entries: history,
    };
    return JSON.stringify(exportData, null, 2);
  }, [history]);

  // Geçmişi içe aktar
  const importHistory = useCallback((data: string): boolean => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.entries && Array.isArray(parsed.entries)) {
        setHistory(parsed.entries);
        saveHistory(parsed.entries);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Failed to import phone history:', error);
      return false;
    }
  }, [saveHistory]);

  // İstatistikler
  const getStatistics = useCallback(() => {
    const totalEntries = history.length;
    const totalFavorites = history.filter(entry => entry.isFavorite).length;
    
    // En çok kullanılan ülke
    const countryCounts = history.reduce((acc, entry) => {
      acc[entry.country] = (acc[entry.country] || 0) + entry.frequency;
      return acc;
    }, {} as Record<string, number>);
    const mostUsedCountry = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    // En çok kullanılan telefon
    const mostUsedPhone = history
      .sort((a, b) => b.frequency - a.frequency)[0]?.formattedPhone || '';

    // Ortalama frekans
    const averageFrequency = history.length > 0 
      ? history.reduce((sum, entry) => sum + entry.frequency, 0) / history.length 
      : 0;

    return {
      totalEntries,
      totalFavorites,
      mostUsedCountry,
      mostUsedPhone,
      averageFrequency: Math.round(averageFrequency * 100) / 100,
    };
  }, [history]);

  // Favoriler ve son kullanılanlar
  const favorites = useMemo(() => 
    history.filter(entry => entry.isFavorite)
      .sort((a, b) => b.lastUsed - a.lastUsed),
    [history]
  );

  const recent = useMemo(() => 
    history
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, 10),
    [history]
  );

  return {
    history,
    favorites,
    recent,
    addToHistory,
    removeFromHistory,
    updateHistoryEntry,
    toggleFavorite,
    clearHistory,
    clearFavorites,
    searchHistory,
    getHistoryByCountry,
    getHistoryByTag,
    exportHistory,
    importHistory,
    getStatistics,
  };
};
