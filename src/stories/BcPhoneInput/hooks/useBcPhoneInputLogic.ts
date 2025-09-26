import { useState, useCallback, useMemo, useEffect } from 'react';
import { BcPhoneInputOptions, BcPhoneInputState, BcPhoneInputActions } from '../BcPhoneInput.types';

/**
 * BcPhoneInput'in ana logic hook'u
 * Tüm telefon input mantığını yönetir
 */
export const useBcPhoneInputLogic = (options: BcPhoneInputOptions = {}) => {
  const {
    defaultCountry = 'TR',
    defaultPhone = '',
    countryList = [],
    favoriteCountries = [],
    enableAdvancedFeatures = false,
    enablePerformanceTracking = false,
    locale = 'en',
    onPhoneChange,
    onCountryChange,
    formatting = {},
    validation = {},
    search = {},
    history = {},
  } = options;

  // === STATE ===
  const [state, setState] = useState<BcPhoneInputState>({
    phone: defaultPhone,
    country: defaultCountry,
    loadingCountries: false,
    recentCountries: [],
    screenReaderMessage: '',
    phoneHistory: [],
    favoriteNumbers: [],
  });

  // === FAVORITE COUNTRIES ===
  const favoriteCountriesList = useMemo(() => {
    if (!enableAdvancedFeatures || favoriteCountries.length === 0) return [];
    return countryList.filter(country => favoriteCountries.includes(country.code));
  }, [enableAdvancedFeatures, countryList, favoriteCountries]);

  // Favorite countries options
  const favoriteCountriesOptions = useMemo(() => {
    return {
      enabled: enableAdvancedFeatures && favoriteCountries.length > 0,
      countries: favoriteCountries,
      count: favoriteCountries.length,
    };
  }, [enableAdvancedFeatures, favoriteCountries]);

  // === ADVANCED FEATURES STATUS ===
  const advancedFeaturesStatus = useMemo(() => {
    return {
      enabled: enableAdvancedFeatures,
      history: history.enableHistory,
      favorites: history.enableFavorites,
      search: search.enableSearch,
      validation: validation.enableValidation,
      formatting: formatting.enableFormatting,
    };
  }, [enableAdvancedFeatures, history, search, validation, formatting]);

  // Performance options
  const performanceOptions = useMemo(() => {
    return {
      enabled: enablePerformanceTracking,
      tracking: enablePerformanceTracking,
    };
  }, [enablePerformanceTracking]);

  // Performance tracking functions
  const trackPerformance = useCallback((action: string, data?: unknown) => {
    if (!enablePerformanceTracking) return;
    
    console.log(`Performance tracking - ${action}:`, data);
    // In a real implementation, this would send data to analytics
  }, [enablePerformanceTracking]);

  const trackPhoneChange = useCallback((phone: string, country: string) => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('phone_change', { phone, country, timestamp: Date.now() });
  }, [enablePerformanceTracking, trackPerformance]);

  const trackCountryChange = useCallback((country: string, phone: string) => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('country_change', { country, phone, timestamp: Date.now() });
  }, [enablePerformanceTracking, trackPerformance]);

  // Locale options
  const localeOptions = useMemo(() => {
    return {
      locale,
      isSet: !!locale,
      isDefault: locale === 'en',
    };
  }, [locale]);

  // Callback options
  const callbackOptions = useMemo(() => {
    return {
      onPhoneChange: !!onPhoneChange,
      onCountryChange: !!onCountryChange,
      hasCallbacks: !!(onPhoneChange || onCountryChange),
    };
  }, [onPhoneChange, onCountryChange]);

  // Advanced features options
  const advancedFeaturesOptions = useMemo(() => {
    return {
      enabled: enableAdvancedFeatures,
      history: history.enableHistory,
      favorites: history.enableFavorites,
      search: search.enableSearch,
      validation: validation.enableValidation,
      formatting: formatting.enableFormatting,
    };
  }, [enableAdvancedFeatures, history.enableHistory, history.enableFavorites, search.enableSearch, validation.enableValidation, formatting.enableFormatting]);

  // === ACTIONS ===
  const setPhone = useCallback((phone: string) => {
    setState(prev => ({ ...prev, phone }));
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange(phone, state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange(phone, state.country);
  }, [onPhoneChange, state.country, trackPhoneChange]);

  const setCountry = useCallback((country: string) => {
    setState(prev => ({ ...prev, country }));
    
    // Call onCountryChange callback if provided
    if (onCountryChange) {
      onCountryChange(country, state.phone);
    }
    
    // Track performance if enabled
    trackCountryChange(country, state.phone);
  }, [onCountryChange, state.phone, trackCountryChange]);

  const clearPhone = useCallback(() => {
    setState(prev => ({ ...prev, phone: '' }));
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange('', state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange('', state.country);
  }, [onPhoneChange, state.country, trackPhoneChange]);

  const refreshCountries = useCallback(() => {
    setState(prev => ({ ...prev, loadingCountries: true }));
    // Simulate async loading
    setTimeout(() => {
      setState(prev => ({ ...prev, loadingCountries: false }));
      
      // Call onCountryChange callback if provided
      if (onCountryChange) {
        onCountryChange(state.country, state.phone);
      }
      
      // Track performance if enabled
      trackCountryChange(state.country, state.phone);
    }, 1000);
  }, [onCountryChange, state.country, state.phone, trackCountryChange]);

  const addToHistory = useCallback((phone: string, country: string) => {
    if (!enableAdvancedFeatures || !history.enableHistory) return;
    
    setState(prev => ({
      ...prev,
      phoneHistory: [phone, ...prev.phoneHistory.filter(p => p !== phone)].slice(0, history.maxEntries || 100),
      recentCountries: [country, ...prev.recentCountries.filter(c => c !== country)].slice(0, 3),
    }));
    
    // Call callbacks if provided
    if (onPhoneChange) {
      onPhoneChange(phone, country);
    }
    if (onCountryChange) {
      onCountryChange(country, phone);
    }
    
    // Track performance if enabled
    trackPhoneChange(phone, country);
    trackCountryChange(country, phone);
  }, [enableAdvancedFeatures, history.enableHistory, history.maxEntries, onPhoneChange, onCountryChange, trackPhoneChange, trackCountryChange]);

  // === HISTORY OPTIONS ===
  const maxHistoryEntries = useMemo(() => {
    return history.maxEntries || 100;
  }, [history.maxEntries]);

  const maxRecentCountries = useMemo(() => {
    return 3; // Fixed value for recent countries
  }, []);

  // History options
  const historyOptions = useMemo(() => {
    return {
      enabled: history.enableHistory,
      maxEntries: history.maxEntries || 100,
      enableFavorites: history.enableFavorites,
    };
  }, [history.enableHistory, history.maxEntries, history.enableFavorites]);

  const toggleFavorite = useCallback((phone: string) => {
    if (!enableAdvancedFeatures || !history.enableFavorites) return;
    
    setState(prev => ({
      ...prev,
      favoriteNumbers: prev.favoriteNumbers.includes(phone)
        ? prev.favoriteNumbers.filter(p => p !== phone)
        : [...prev.favoriteNumbers, phone],
    }));
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange(phone, state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange(phone, state.country);
  }, [enableAdvancedFeatures, history.enableFavorites, onPhoneChange, state.country, trackPhoneChange]);

  const generateQRCode = useCallback((phone: string) => {
    if (!enableAdvancedFeatures) return null;
    // QR Code generation logic will be implemented in useQRCodeIntegration
    console.log('Generating QR Code for:', phone);
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange(phone, state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange(phone, state.country);
    
    return null; // Placeholder return
  }, [enableAdvancedFeatures, onPhoneChange, state.country, trackPhoneChange]);

  const toggleVoiceSearch = useCallback(() => {
    if (!enableAdvancedFeatures) return false;
    // Voice search logic will be implemented in useVoiceSearch
    console.log('Toggling voice search');
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange(state.phone, state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange(state.phone, state.country);
    
    return true; // Placeholder return
  }, [enableAdvancedFeatures, onPhoneChange, state.phone, state.country, trackPhoneChange]);

  const searchCountries = useCallback((query: string) => {
    if (!enableAdvancedFeatures || !search.enableSearch || !query) return countryList;
    
    const searchTerm = query.toLowerCase();
    const minLength = search.minSearchLength || 1;
    
    if (query.length < minLength) return countryList;
    
    // Debounce search if specified
    if (search.debounceMs && search.debounceMs > 0) {
      // This would be implemented with a debounced search in a real implementation
      console.log('Debounced search with', search.debounceMs, 'ms delay');
    }
    
    const filteredCountries = countryList.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm)
    );
    
    // Call onPhoneChange callback if provided
    if (onPhoneChange) {
      onPhoneChange(state.phone, state.country);
    }
    
    // Track performance if enabled
    trackPhoneChange(state.phone, state.country);
    
    return filteredCountries;
  }, [enableAdvancedFeatures, search.enableSearch, search.minSearchLength, search.debounceMs, countryList, onPhoneChange, state.phone, state.country, trackPhoneChange]);

  // === SEARCH OPTIONS ===
  const searchOptions = useMemo(() => {
    return {
      enabled: search.enableSearch,
      minLength: search.minSearchLength || 1,
      debounceMs: search.debounceMs || 0,
    };
  }, [search.enableSearch, search.minSearchLength, search.debounceMs]);

  const actions: BcPhoneInputActions = useMemo(() => ({
    setPhone,
    setCountry,
    clearPhone,
    refreshCountries,
    addToHistory,
    toggleFavorite,
    generateQRCode,
    toggleVoiceSearch,
    searchCountries,
  }), [setPhone, setCountry, clearPhone, refreshCountries, addToHistory, toggleFavorite, generateQRCode, toggleVoiceSearch, searchCountries]);

  // === COMPUTED VALUES ===
  const selectedCountry = useMemo(() => {
    return countryList.find(c => c.code === state.country) || countryList[0];
  }, [countryList, state.country]);

  // Default country options
  const defaultCountryOptions = useMemo(() => {
    return {
      code: defaultCountry,
      country: countryList.find(c => c.code === defaultCountry),
      isSet: !!defaultCountry,
      isSelected: state.country === defaultCountry,
    };
  }, [defaultCountry, countryList, state.country]);

  // Country list options
  const countryListOptions = useMemo(() => {
    return {
      countries: countryList,
      count: countryList.length,
      hasSelected: !!selectedCountry,
      selectedCode: selectedCountry?.code,
    };
  }, [countryList, selectedCountry]);

  const isValidPhone = useMemo(() => {
    if (!state.phone) return true;
    
    // Use custom validation rules if provided
    if (validation.enableValidation && validation.customRules) {
      return validation.customRules.every(rule => rule.test(state.phone, state.country));
    }
    
    // Basic phone validation
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(state.phone)) return false;
    
    // Country-specific validation
    if (selectedCountry && selectedCountry.mask) {
      const cleanPhone = state.phone.replace(/\D/g, '');
      const minLength = selectedCountry.mask.replace(/\D/g, '').length;
      return cleanPhone.length >= minLength;
    }
    
    return true;
  }, [state.phone, state.country, selectedCountry, validation]);

  // Validate phone number with custom validation
  const validatePhone = useCallback((phone: string, country?: string) => {
    if (!validation.enableValidation) return { isValid: true, message: '' };
    
    const targetCountry = country || selectedCountry?.code;
    if (!phone || !targetCountry) return { isValid: false, message: 'Phone number and country are required' };
    
    // Use custom validation rules if provided
    if (validation.customRules && validation.customRules.length > 0) {
      const failedRule = validation.customRules.find(rule => !rule.test(phone, targetCountry));
      if (failedRule) {
        return { isValid: false, message: failedRule.message || 'Invalid phone number format' };
      }
    }
    
    // Default validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return { isValid: false, message: 'Phone number must be between 7 and 15 digits' };
    }
    
    return { isValid: true, message: '' };
  }, [validation.enableValidation, validation.customRules, selectedCountry]);

  // Validation options
  const validationOptions = useMemo(() => {
    return {
      enabled: validation.enableValidation,
      customRules: validation.customRules || [],
    };
  }, [validation.enableValidation, validation.customRules]);

  // === VALIDATION MESSAGES ===
  const validationMessages = useMemo(() => {
    if (!validation.enableValidation || !validation.customRules) return [];
    
    return validation.customRules
      .filter(rule => !rule.test(state.phone, state.country))
      .map(rule => rule.message);
  }, [validation.enableValidation, validation.customRules, state.phone, state.country]);

  const formattedPhone = useMemo(() => {
    if (!state.phone || !formatting.enableFormatting) return state.phone;
    
    // Basic formatting logic
    const cleanPhone = state.phone.replace(/\D/g, '');
    if (!selectedCountry) return cleanPhone;
    
    // Apply country-specific formatting
    const mask = selectedCountry.mask || '(999) 999-9999';
    let formatted = '';
    let phoneIndex = 0;
    
    for (let i = 0; i < mask.length && phoneIndex < cleanPhone.length; i++) {
      if (mask[i] === '9') {
        formatted += cleanPhone[phoneIndex];
        phoneIndex++;
      } else {
        formatted += mask[i];
      }
    }
    
    return formatted;
  }, [state.phone, selectedCountry, formatting.enableFormatting]);

  // === FORMATTING OPTIONS ===
  const shouldFormatOnChange = useMemo(() => {
    return formatting.enableFormatting && formatting.formatOnChange;
  }, [formatting.enableFormatting, formatting.formatOnChange]);

  const shouldFormatOnBlur = useMemo(() => {
    return formatting.enableFormatting && formatting.formatOnBlur;
  }, [formatting.enableFormatting, formatting.formatOnBlur]);

  // Format phone number with custom formatting options
  const formatPhone = useCallback((phone: string, country?: string) => {
    if (!formatting.enableFormatting) return phone;
    
    const targetCountry = country ? countryList.find(c => c.code === country) : selectedCountry;
    if (!targetCountry?.mask) return phone;
    
    const cleanPhone = phone.replace(/\D/g, '');
    const mask = targetCountry.mask;
    let formatted = '';
    let phoneIndex = 0;
    
    for (let i = 0; i < mask.length && phoneIndex < cleanPhone.length; i++) {
      if (mask[i] === '9') {
        formatted += cleanPhone[phoneIndex];
        phoneIndex++;
      } else {
        formatted += mask[i];
      }
    }
    
    return formatted;
  }, [formatting.enableFormatting, selectedCountry, countryList]);

  // Formatting options
  const formattingOptions = useMemo(() => {
    return {
      enabled: formatting.enableFormatting,
      formatOnChange: formatting.formatOnChange,
      formatOnBlur: formatting.formatOnBlur,
    };
  }, [formatting.enableFormatting, formatting.formatOnChange, formatting.formatOnBlur]);

  // === EFFECTS ===
  
  // Load recent countries from localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableHistory) return;
    
    try {
      const stored = localStorage.getItem('bc-phoneinput-recent-countries');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setState(prev => ({ ...prev, recentCountries: parsed }));
        }
      }
    } catch (error) {
      console.warn('BcPhoneInput: Failed to load recent countries:', error);
    }
  }, [enableAdvancedFeatures, history.enableHistory]);

  // Performance tracking effect
  useEffect(() => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('component_mount', {
      phone: state.phone,
      country: state.country,
      timestamp: Date.now(),
    });
    
    return () => {
      trackPerformance('component_unmount', {
        phone: state.phone,
        country: state.country,
        timestamp: Date.now(),
      });
    };
  }, [enablePerformanceTracking, trackPerformance, state.phone, state.country]);

  // Save recent countries to localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableHistory || state.recentCountries.length === 0) return;
    
    try {
      localStorage.setItem('bc-phoneinput-recent-countries', JSON.stringify(state.recentCountries));
    } catch (error) {
      console.warn('BcPhoneInput: Failed to save recent countries:', error);
    }
  }, [enableAdvancedFeatures, history.enableHistory, state.recentCountries]);

  // Performance tracking for state changes
  useEffect(() => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('state_change', {
      phone: state.phone,
      country: state.country,
      timestamp: Date.now(),
    });
  }, [enablePerformanceTracking, trackPerformance, state.phone, state.country]);

  // Load phone history from localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableHistory) return;
    
    try {
      const stored = localStorage.getItem('bc-phoneinput-phone-history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setState(prev => ({ ...prev, phoneHistory: parsed }));
        }
      }
    } catch (error) {
      console.warn('BcPhoneInput: Failed to load phone history:', error);
    }
  }, [enableAdvancedFeatures, history.enableHistory]);

  // Performance tracking for phone history changes
  useEffect(() => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('phone_history_change', {
      historyCount: state.phoneHistory.length,
      timestamp: Date.now(),
    });
  }, [enablePerformanceTracking, trackPerformance, state.phoneHistory.length]);

  // Save phone history to localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableHistory || state.phoneHistory.length === 0) return;
    
    try {
      localStorage.setItem('bc-phoneinput-phone-history', JSON.stringify(state.phoneHistory));
    } catch (error) {
      console.warn('BcPhoneInput: Failed to save phone history:', error);
    }
  }, [enableAdvancedFeatures, history.enableHistory, state.phoneHistory]);

  // Performance tracking for favorite numbers changes
  useEffect(() => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('favorite_numbers_change', {
      favoriteCount: state.favoriteNumbers.length,
      timestamp: Date.now(),
    });
  }, [enablePerformanceTracking, trackPerformance, state.favoriteNumbers.length]);

  // Load favorite numbers from localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableFavorites) return;
    
    try {
      const stored = localStorage.getItem('bc-phoneinput-favorite-numbers');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setState(prev => ({ ...prev, favoriteNumbers: parsed }));
        }
      }
    } catch (error) {
      console.warn('BcPhoneInput: Failed to load favorite numbers:', error);
    }
  }, [enableAdvancedFeatures, history.enableFavorites]);

  // Performance tracking for favorite numbers loading
  useEffect(() => {
    if (!enablePerformanceTracking) return;
    
    trackPerformance('favorite_numbers_loaded', {
      favoriteCount: state.favoriteNumbers.length,
      timestamp: Date.now(),
    });
  }, [enablePerformanceTracking, trackPerformance, state.favoriteNumbers.length]);

  // Save favorite numbers to localStorage
  useEffect(() => {
    if (!enableAdvancedFeatures || !history.enableFavorites || state.favoriteNumbers.length === 0) return;
    
    try {
      localStorage.setItem('bc-phoneinput-favorite-numbers', JSON.stringify(state.favoriteNumbers));
    } catch (error) {
      console.warn('BcPhoneInput: Failed to save favorite numbers:', error);
    }
  }, [enableAdvancedFeatures, history.enableFavorites, state.favoriteNumbers]);

  return {
    state,
    actions,
    selectedCountry,
    isValidPhone,
    formattedPhone,
    favoriteCountriesList,
    validationMessages,
    shouldFormatOnChange,
    shouldFormatOnBlur,
    maxHistoryEntries,
    maxRecentCountries,
    advancedFeaturesStatus,
    searchOptions,
    formatPhone,
    formattingOptions,
    validatePhone,
    validationOptions,
    historyOptions,
    advancedFeaturesOptions,
    favoriteCountriesOptions,
    countryListOptions,
    defaultCountryOptions,
    performanceOptions,
    localeOptions,
    callbackOptions,
    trackPerformance,
    trackPhoneChange,
    trackCountryChange,
  };
};
