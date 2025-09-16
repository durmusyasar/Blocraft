import { useState, useCallback,useEffect } from 'react';
import { CountryType } from '../types';

export interface PhoneSuggestion {
  id: string;
  phone: string;
  formattedPhone: string;
  country: string;
  label: string;
  type: 'recent' | 'favorite' | 'similar' | 'contact';
  timestamp?: number;
  frequency?: number;
}

export interface UsePhoneSuggestionsProps {
  country: string;
  countryList: CountryType[];
  enableSuggestions?: boolean;
  maxSuggestions?: number;
  enableRecentHistory?: boolean;
  enableSimilarNumbers?: boolean;
  enableContactIntegration?: boolean;
  recentPhonesKey?: string;
  onSuggestionSelect?: (suggestion: PhoneSuggestion) => void;
}

export interface UsePhoneSuggestionsReturn {
  suggestions: PhoneSuggestion[];
  isLoading: boolean;
  getSuggestions: (query: string) => Promise<PhoneSuggestion[]>;
  addToHistory: (phone: string, country: string) => void;
  removeFromHistory: (phoneId: string) => void;
  clearHistory: () => void;
  getSimilarNumbers: (phone: string) => PhoneSuggestion[];
  searchContacts: (query: string) => Promise<PhoneSuggestion[]>;
}

/**
 * Telefon numarası önerileri hook'u
 * Geçmiş, benzer numaralar ve kişi entegrasyonu
 */
export const usePhoneSuggestions = ({
  country,
  countryList,
  enableSuggestions = true,
  maxSuggestions = 5,
  enableRecentHistory = true,
  enableSimilarNumbers = true,
  enableContactIntegration = false,
  recentPhonesKey = 'bc-phoneinput-recent-phones',
  onSuggestionSelect,
}: UsePhoneSuggestionsProps): UsePhoneSuggestionsReturn => {
  
  const [suggestions, setSuggestions] = useState<PhoneSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentPhones, setRecentPhones] = useState<PhoneSuggestion[]>([]);

  // Geçmiş telefon numaralarını yükle
  useEffect(() => {
    if (!enableRecentHistory) return;

    try {
      const stored = localStorage.getItem(recentPhonesKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentPhones(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load recent phones:', error);
    }
  }, [enableRecentHistory, recentPhonesKey]);

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


  // Geçmişe telefon numarası ekle
  const addToHistory = useCallback((phone: string, countryCode: string) => {
    if (!enableRecentHistory || !phone) return;

    const countryData = countryList.find(c => c.code === countryCode);
    const formattedPhone = formatPhoneNumber(phone, countryData?.mask || '(999) 999-9999');
    
    const newSuggestion: PhoneSuggestion = {
      id: `${countryCode}-${phone}`,
      phone,
      formattedPhone,
      country: countryCode,
      label: `${countryData?.name || countryCode} - ${formattedPhone}`,
      type: 'recent',
      timestamp: Date.now(),
      frequency: 1,
    };

    setRecentPhones(prev => {
      const filtered = prev.filter(p => p.id !== newSuggestion.id);
      const updated = [newSuggestion, ...filtered].slice(0, 10); // Son 10 numara
      
      try {
        localStorage.setItem(recentPhonesKey, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save recent phones:', error);
      }
      
      return updated;
    });
  }, [enableRecentHistory, countryList, formatPhoneNumber, recentPhonesKey]);

  // Geçmişten telefon numarası kaldır
  const removeFromHistory = useCallback((phoneId: string) => {
    setRecentPhones(prev => {
      const updated = prev.filter(p => p.id !== phoneId);
      
      try {
        localStorage.setItem(recentPhonesKey, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save recent phones:', error);
      }
      
      return updated;
    });
  }, [recentPhonesKey]);

  // Geçmişi temizle
  const clearHistory = useCallback(() => {
    setRecentPhones([]);
    
    try {
      localStorage.removeItem(recentPhonesKey);
    } catch (error) {
      console.warn('Failed to clear recent phones:', error);
    }
  }, [recentPhonesKey]);

  // Levenshtein distance hesaplama
  const levenshteinDistance = useCallback((str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }, []);


  // Benzer numaralar bul
  const getSimilarNumbers = useCallback((phone: string): PhoneSuggestion[] => {
    if (!enableSimilarNumbers || !phone || phone.length < 3) return [];

    const digits = phone.replace(/\D/g, '');
    const similar: PhoneSuggestion[] = [];

    // Geçmiş numaralardan benzer olanları bul
    recentPhones.forEach(recent => {
      const recentDigits = recent.phone.replace(/\D/g, '');
      
      // Levenshtein distance hesapla
      const distance = levenshteinDistance(digits, recentDigits);
      const similarity = 1 - (distance / Math.max(digits.length, recentDigits.length));
      
      if (similarity > 0.6) { // %60 benzerlik
        similar.push({
          ...recent,
          type: 'similar',
          label: `Benzer: ${recent.formattedPhone}`,
        });
      }
    });

    return similar.slice(0, 3);
  }, [enableSimilarNumbers, levenshteinDistance, recentPhones]);


  // Kişi arama (Web Contacts API)
  const searchContacts = useCallback(async (query: string): Promise<PhoneSuggestion[]> => {
    if (!enableContactIntegration || !(navigator as any).contacts) return [];

    try {
      const contacts = await (navigator as any).contacts.select(['name', 'tel'], { multiple: true });
      const suggestions: PhoneSuggestion[] = [];

      contacts.forEach((contact: any) => {
        if (contact.tel && contact.tel.length > 0) {
          contact.tel.forEach((tel: any) => {
            if (tel.value && tel.value.includes(query)) {
              const countryData = countryList.find(c => c.code === country);
              const formattedPhone = formatPhoneNumber(tel.value, countryData?.mask || '(999) 999-9999');
              
              suggestions.push({
                id: `contact-${contact.name}-${tel.value}`,
                phone: tel.value,
                formattedPhone,
                country,
                label: `${contact.name} - ${formattedPhone}`,
                type: 'contact',
              });
            }
          });
        }
      });

      return suggestions.slice(0, 3);
    } catch (error) {
      console.warn('Contact search failed:', error);
      return [];
    }
  }, [enableContactIntegration, country, countryList, formatPhoneNumber]);

  // Yaygın numara önerileri
  const getCommonSuggestions = useCallback((query: string, countryCode: string): PhoneSuggestion[] => {
    const commonNumbers: Record<string, string[]> = {
      'TR': ['112', '155', '110', '119', '177'],
      'US': ['911', '311', '411', '511', '811'],
      'GB': ['999', '101', '111', '112'],
      'DE': ['110', '112', '116117'],
      'FR': ['15', '17', '18', '112'],
    };

    const numbers = commonNumbers[countryCode] || [];
    const suggestions: PhoneSuggestion[] = [];

    numbers.forEach(number => {
      if (number.includes(query)) {
        const countryData = countryList.find(c => c.code === countryCode);
        const formattedPhone = formatPhoneNumber(number, countryData?.mask || '(999) 999-9999');
        
        suggestions.push({
          id: `common-${number}`,
          phone: number,
          formattedPhone,
          country: countryCode,
          label: `Yaygın: ${formattedPhone}`,
          type: 'common' as any,
        });
      }
    });

    return suggestions.slice(0, 2);
  }, [countryList, formatPhoneNumber]);


  // Ana öneri fonksiyonu
  const getSuggestions = useCallback(async (query: string): Promise<PhoneSuggestion[]> => {
    if (!enableSuggestions || !query || query.length < 1) {
      setSuggestions([]);
      return [];
    }

    setIsLoading(true);

    try {
      const allSuggestions: PhoneSuggestion[] = [];

      // 1. Geçmiş numaralar
      if (enableRecentHistory) {
        const recentSuggestions = recentPhones
          .filter(recent => 
            recent.phone.includes(query) || 
            recent.formattedPhone.includes(query) ||
            recent.label.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 2);
        
        allSuggestions.push(...recentSuggestions);
      }

      // 2. Benzer numaralar
      if (enableSimilarNumbers && query.length >= 3) {
        const similarSuggestions = getSimilarNumbers(query);
        allSuggestions.push(...similarSuggestions);
      }

      // 3. Kişi arama
      if (enableContactIntegration && query.length >= 2) {
        const contactSuggestions = await searchContacts(query);
        allSuggestions.push(...contactSuggestions);
      }

      // 4. Yaygın numara önerileri (ülkeye göre)
      const commonSuggestions = getCommonSuggestions(query, country);
      allSuggestions.push(...commonSuggestions);

      // Önerileri sırala ve sınırla
      const sortedSuggestions = allSuggestions
        .sort((a, b) => {
          // Önce türe göre (recent > favorite > similar > contact > common)
          const typeOrder = { recent: 0, favorite: 1, similar: 2, contact: 3, common: 4 };
          const typeDiff = typeOrder[a.type] - typeOrder[b.type];
          if (typeDiff !== 0) return typeDiff;

          // Sonra frekansa göre
          if (a.frequency && b.frequency) {
            return b.frequency - a.frequency;
          }

          // Son olarak timestamp'e göre
          if (a.timestamp && b.timestamp) {
            return b.timestamp - a.timestamp;
          }

          return 0;
        })
        .slice(0, maxSuggestions);

      setSuggestions(sortedSuggestions);
      return sortedSuggestions;
    } catch (error) {
      console.warn('Failed to get suggestions:', error);
      setSuggestions([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [enableSuggestions, enableRecentHistory, enableSimilarNumbers, enableContactIntegration, getCommonSuggestions, country, maxSuggestions, recentPhones, getSimilarNumbers, searchContacts]);


  return {
    suggestions,
    isLoading,
    getSuggestions,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getSimilarNumbers,
    searchContacts,
  };
};