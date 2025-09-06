import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpIntegrationProps {
  enableIntegration?: boolean;
  onIntegrationError?: (error: Error) => void;
  onIntegrationSuccess?: (type: IntegrationType) => void;
  enableReactHookForm?: boolean;
  enableFormik?: boolean;
  enableRedux?: boolean;
  enableContext?: boolean;
  enableLocalStorage?: boolean;
  enableSessionStorage?: boolean;
  enableIndexedDB?: boolean;
  storageKey?: string;
  reduxAction?: (value: string) => void;
  contextValue?: (value: string) => void;
}

export type IntegrationType = 'react-hook-form' | 'formik' | 'redux' | 'context' | 'local-storage' | 'session-storage' | 'indexed-db';

export interface IntegrationState {
  isReactHookFormEnabled: boolean;
  isFormikEnabled: boolean;
  isReduxEnabled: boolean;
  isContextEnabled: boolean;
  isLocalStorageEnabled: boolean;
  isSessionStorageEnabled: boolean;
  isIndexedDBEnabled: boolean;
  lastIntegration: IntegrationType | null;
  integrationErrors: Error[];
  storedValue: string | null;
}

export const useOtpIntegration = ({
  enableIntegration = false,
  onIntegrationError,
  onIntegrationSuccess,
  enableReactHookForm = false,
  enableFormik = false,
  enableRedux = false,
  enableContext = false,
  enableLocalStorage = false,
  enableSessionStorage = false,
  enableIndexedDB = false,
  storageKey = 'otp-input-value',
  reduxAction,
  contextValue,
}: UseOtpIntegrationProps) => {
  const [state, setState] = useState<IntegrationState>({
    isReactHookFormEnabled: false,
    isFormikEnabled: false,
    isReduxEnabled: false,
    isContextEnabled: false,
    isLocalStorageEnabled: false,
    isSessionStorageEnabled: false,
    isIndexedDBEnabled: false,
    lastIntegration: null,
    integrationErrors: [],
    storedValue: null,
  });

  const indexedDBRef = useRef<IDBDatabase | null>(null);

  // Initialize integrations
  useEffect(() => {
    if (!enableIntegration) return;

    setState(prev => ({
      ...prev,
      isReactHookFormEnabled: enableReactHookForm,
      isFormikEnabled: enableFormik,
      isReduxEnabled: enableRedux,
      isContextEnabled: enableContext,
      isLocalStorageEnabled: enableLocalStorage,
      isSessionStorageEnabled: enableSessionStorage,
      isIndexedDBEnabled: enableIndexedDB,
    }));

    // Initialize IndexedDB
    if (enableIndexedDB) {
      initializeIndexedDB();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableIntegration, enableReactHookForm, enableFormik, enableRedux, enableContext, enableLocalStorage, enableSessionStorage, enableIndexedDB]);

  // Initialize IndexedDB
  const initializeIndexedDB = useCallback(async () => {
    try {
      const request = indexedDB.open('OTPInputDB', 1);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('otpValues')) {
          db.createObjectStore('otpValues', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        indexedDBRef.current = (event.target as IDBOpenDBRequest).result;
      };

      request.onerror = (event) => {
        const error = new Error('IndexedDB initialization failed');
        setState(prev => ({
          ...prev,
          integrationErrors: [...prev.integrationErrors, error],
        }));
        onIntegrationError?.(error);
      };
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [onIntegrationError]);

  // React Hook Form integration
  const integrateWithReactHookForm = useCallback((value: string, fieldName: string = 'otp') => {
    if (!enableIntegration || !enableReactHookForm) return;

    try {
      // This would typically be used with useController or register
      // For now, we'll just simulate the integration
      console.log('React Hook Form integration:', { fieldName, value });
      setState(prev => ({ ...prev, lastIntegration: 'react-hook-form' }));
      onIntegrationSuccess?.('react-hook-form');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableReactHookForm, onIntegrationSuccess, onIntegrationError]);

  // Formik integration
  const integrateWithFormik = useCallback((value: string, fieldName: string = 'otp') => {
    if (!enableIntegration || !enableFormik) return;

    try {
      // This would typically be used with Field component
      console.log('Formik integration:', { fieldName, value });
      setState(prev => ({ ...prev, lastIntegration: 'formik' }));
      onIntegrationSuccess?.('formik');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableFormik, onIntegrationSuccess, onIntegrationError]);

  // Redux integration
  const integrateWithRedux = useCallback((value: string) => {
    if (!enableIntegration || !enableRedux || !reduxAction) return;

    try {
      reduxAction(value);
      setState(prev => ({ ...prev, lastIntegration: 'redux' }));
      onIntegrationSuccess?.('redux');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableRedux, reduxAction, onIntegrationSuccess, onIntegrationError]);

  // Context integration
  const integrateWithContext = useCallback((value: string) => {
    if (!enableIntegration || !enableContext || !contextValue) return;

    try {
      contextValue(value);
      setState(prev => ({ ...prev, lastIntegration: 'context' }));
      onIntegrationSuccess?.('context');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableContext, contextValue, onIntegrationSuccess, onIntegrationError]);

  // Local Storage integration
  const integrateWithLocalStorage = useCallback((value: string) => {
    if (!enableIntegration || !enableLocalStorage) return;

    try {
      localStorage.setItem(storageKey, value);
      setState(prev => ({ ...prev, lastIntegration: 'local-storage', storedValue: value }));
      onIntegrationSuccess?.('local-storage');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableLocalStorage, storageKey, onIntegrationSuccess, onIntegrationError]);

  // Session Storage integration
  const integrateWithSessionStorage = useCallback((value: string) => {
    if (!enableIntegration || !enableSessionStorage) return;

    try {
      sessionStorage.setItem(storageKey, value);
      setState(prev => ({ ...prev, lastIntegration: 'session-storage', storedValue: value }));
      onIntegrationSuccess?.('session-storage');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableSessionStorage, storageKey, onIntegrationSuccess, onIntegrationError]);

  // IndexedDB integration
  const integrateWithIndexedDB = useCallback(async (value: string) => {
    if (!enableIntegration || !enableIndexedDB || !indexedDBRef.current) return;

    try {
      const transaction = indexedDBRef.current.transaction(['otpValues'], 'readwrite');
      const store = transaction.objectStore('otpValues');
      
      await store.put({ id: storageKey, value, timestamp: Date.now() });
      setState(prev => ({ ...prev, lastIntegration: 'indexed-db', storedValue: value }));
      onIntegrationSuccess?.('indexed-db');
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableIndexedDB, storageKey, onIntegrationSuccess, onIntegrationError]);

  // Universal integration method
  const integrate = useCallback((value: string, fieldName?: string) => {
    if (!enableIntegration) return;

    // React Hook Form
    if (enableReactHookForm) {
      integrateWithReactHookForm(value, fieldName);
    }

    // Formik
    if (enableFormik) {
      integrateWithFormik(value, fieldName);
    }

    // Redux
    if (enableRedux) {
      integrateWithRedux(value);
    }

    // Context
    if (enableContext) {
      integrateWithContext(value);
    }

    // Local Storage
    if (enableLocalStorage) {
      integrateWithLocalStorage(value);
    }

    // Session Storage
    if (enableSessionStorage) {
      integrateWithSessionStorage(value);
    }

    // IndexedDB
    if (enableIndexedDB) {
      integrateWithIndexedDB(value);
    }
  }, [
    enableIntegration,
    enableReactHookForm,
    enableFormik,
    enableRedux,
    enableContext,
    enableLocalStorage,
    enableSessionStorage,
    enableIndexedDB,
    integrateWithReactHookForm,
    integrateWithFormik,
    integrateWithRedux,
    integrateWithContext,
    integrateWithLocalStorage,
    integrateWithSessionStorage,
    integrateWithIndexedDB,
  ]);

  // Get stored value
  const getStoredValue = useCallback(async (): Promise<string | null> => {
    if (!enableIntegration) return null;

    try {
      // Try Local Storage first
      if (enableLocalStorage) {
        const value = localStorage.getItem(storageKey);
        if (value) return value;
      }

      // Try Session Storage
      if (enableSessionStorage) {
        const value = sessionStorage.getItem(storageKey);
        if (value) return value;
      }

      // Try IndexedDB
      if (enableIndexedDB && indexedDBRef.current) {
        const transaction = indexedDBRef.current.transaction(['otpValues'], 'readonly');
        const store = transaction.objectStore('otpValues');
        const request = store.get(storageKey);
        
        return new Promise((resolve) => {
          request.onsuccess = () => {
            resolve(request.result?.value || null);
          };
          request.onerror = () => {
            resolve(null);
          };
        });
      }

      return null;
    } catch (error) {
      onIntegrationError?.(error as Error);
      return null;
    }
  }, [enableIntegration, enableLocalStorage, enableSessionStorage, enableIndexedDB, storageKey, onIntegrationError]);

  // Clear stored value
  const clearStoredValue = useCallback(async () => {
    if (!enableIntegration) return;

    try {
      if (enableLocalStorage) {
        localStorage.removeItem(storageKey);
      }

      if (enableSessionStorage) {
        sessionStorage.removeItem(storageKey);
      }

      if (enableIndexedDB && indexedDBRef.current) {
        const transaction = indexedDBRef.current.transaction(['otpValues'], 'readwrite');
        const store = transaction.objectStore('otpValues');
        await store.delete(storageKey);
      }

      setState(prev => ({ ...prev, storedValue: null }));
    } catch (error) {
      onIntegrationError?.(error as Error);
    }
  }, [enableIntegration, enableLocalStorage, enableSessionStorage, enableIndexedDB, storageKey, onIntegrationError]);

  // Get integration status
  const getIntegrationStatus = useCallback(() => {
    if (!enableIntegration) return null;

    const activeIntegrations = [];
    if (state.isReactHookFormEnabled) activeIntegrations.push('React Hook Form');
    if (state.isFormikEnabled) activeIntegrations.push('Formik');
    if (state.isReduxEnabled) activeIntegrations.push('Redux');
    if (state.isContextEnabled) activeIntegrations.push('Context');
    if (state.isLocalStorageEnabled) activeIntegrations.push('Local Storage');
    if (state.isSessionStorageEnabled) activeIntegrations.push('Session Storage');
    if (state.isIndexedDBEnabled) activeIntegrations.push('IndexedDB');

    return {
      activeIntegrations,
      lastIntegration: state.lastIntegration,
      errorCount: state.integrationErrors.length,
      hasStoredValue: !!state.storedValue,
    };
  }, [enableIntegration, state]);

  return {
    ...state,
    integrate,
    getStoredValue,
    clearStoredValue,
    getIntegrationStatus,
  };
};
