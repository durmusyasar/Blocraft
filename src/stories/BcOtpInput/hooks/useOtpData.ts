import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpDataProps {
  enableDataManagement?: boolean;
  onDataError?: (error: Error) => void;
  onDataSuccess?: (operation: DataOperation) => void;
  enableLocalStorage?: boolean;
  enableSessionStorage?: boolean;
  enableIndexedDB?: boolean;
  enableCache?: boolean;
  enableSync?: boolean;
  storageKey?: string;
  cacheExpiry?: number;
  syncInterval?: number;
  maxCacheSize?: number;
}

export type DataOperation = 'save' | 'load' | 'clear' | 'sync' | 'cache' | 'export' | 'import';

export interface DataState {
  isLocalStorageEnabled: boolean;
  isSessionStorageEnabled: boolean;
  isIndexedDBEnabled: boolean;
  isCacheEnabled: boolean;
  isSyncEnabled: boolean;
  lastOperation: DataOperation | null;
  dataErrors: Error[];
  cacheSize: number;
  lastSync: number | null;
  isSyncing: boolean;
}

export interface CacheItem {
  key: string;
  value: unknown;
  timestamp: number;
  expiry: number;
}

export const useOtpData = ({
  enableDataManagement = false,
  onDataError,
  onDataSuccess,
  enableLocalStorage = true,
  enableSessionStorage = true,
  enableIndexedDB = false,
  enableCache = true,
  enableSync = false,
  storageKey = 'otp-input-data',
  cacheExpiry = 300000, // 5 minutes
  syncInterval = 60000, // 1 minute
  maxCacheSize = 100,
}: UseOtpDataProps) => {
  const [state, setState] = useState<DataState>({
    isLocalStorageEnabled: false,
    isSessionStorageEnabled: false,
    isIndexedDBEnabled: false,
    isCacheEnabled: false,
    isSyncEnabled: false,
    lastOperation: null,
    dataErrors: [],
    cacheSize: 0,
    lastSync: null,
    isSyncing: false,
  });

  const cacheRef = useRef<Map<string, CacheItem>>(new Map());
  const indexedDBRef = useRef<IDBDatabase | null>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize data management
  /*useEffect(() => {
    if (!enableDataManagement) return;

    setState(prev => ({
      ...prev,
      isLocalStorageEnabled: enableLocalStorage,
      isSessionStorageEnabled: enableSessionStorage,
      isIndexedDBEnabled: enableIndexedDB,
      isCacheEnabled: enableCache,
      isSyncEnabled: enableSync,
    }));

    // Initialize IndexedDB
    if (enableIndexedDB) {
      initializeIndexedDB();
    }

    // Start sync interval
    if (enableSync) {
      startSyncInterval();
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableDataManagement, enableLocalStorage, enableSessionStorage, enableIndexedDB, enableCache, enableSync]);
*/
  // Initialize IndexedDB
  const initializeIndexedDB = useCallback(async () => {
    try {
      const request = indexedDB.open('OTPDataDB', 1);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('otpData')) {
          db.createObjectStore('otpData', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        indexedDBRef.current = (event.target as IDBOpenDBRequest).result;
      };

      request.onerror = (event) => {
        const error = new Error('IndexedDB initialization failed');
        setState(prev => ({
          ...prev,
          dataErrors: [...prev.dataErrors, error],
        }));
        onDataError?.(error);
      };
    } catch (error) {
      onDataError?.(error as Error);
    }
  }, [onDataError]);

  // Start sync interval
  const startSyncInterval = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
    }

    syncIntervalRef.current = setInterval(() => {
      syncData();
    }, syncInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncInterval]);

  // Save data
  const saveData = useCallback(async (key: string, value: unknown, options?: { expiry?: number }) => {
    if (!enableDataManagement) return;

    try {
      const data = {
        key,
        value,
        timestamp: Date.now(),
        expiry: options?.expiry || cacheExpiry,
      };

      // Local Storage
      if (enableLocalStorage) {
        localStorage.setItem(`${storageKey}-${key}`, JSON.stringify(data));
      }

      // Session Storage
      if (enableSessionStorage) {
        sessionStorage.setItem(`${storageKey}-${key}`, JSON.stringify(data));
      }

      // IndexedDB
      if (enableIndexedDB && indexedDBRef.current) {
        const transaction = indexedDBRef.current.transaction(['otpData'], 'readwrite');
        const store = transaction.objectStore('otpData');
        await store.put(data);
      }

      // Cache
      if (enableCache) {
        cacheRef.current.set(key, data);
        setState(prev => ({ ...prev, cacheSize: cacheRef.current.size }));
      }

      setState(prev => ({ ...prev, lastOperation: 'save' }));
      onDataSuccess?.('save');
    } catch (error) {
      onDataError?.(error as Error);
    }
  }, [enableDataManagement, enableLocalStorage, enableSessionStorage, enableIndexedDB, enableCache, storageKey, cacheExpiry, onDataSuccess, onDataError]);

  // Load data
  const loadData = useCallback(async (key: string): Promise<unknown> => {
    if (!enableDataManagement) return null;

    try {
      // Try cache first
      if (enableCache && cacheRef.current.has(key)) {
        const cached = cacheRef.current.get(key);
        if (cached && Date.now() - cached.timestamp < cached.expiry) {
          setState(prev => ({ ...prev, lastOperation: 'load' }));
          onDataSuccess?.('load');
          return cached.value;
        } else {
          cacheRef.current.delete(key);
        }
      }

      // Try Local Storage
      if (enableLocalStorage) {
        const stored = localStorage.getItem(`${storageKey}-${key}`);
        if (stored) {
          const data = JSON.parse(stored);
          if (Date.now() - data.timestamp < data.expiry) {
            // Update cache
            if (enableCache) {
              cacheRef.current.set(key, data);
            }
            setState(prev => ({ ...prev, lastOperation: 'load' }));
            onDataSuccess?.('load');
            return data.value;
          }
        }
      }

      // Try Session Storage
      if (enableSessionStorage) {
        const stored = sessionStorage.getItem(`${storageKey}-${key}`);
        if (stored) {
          const data = JSON.parse(stored);
          if (Date.now() - data.timestamp < data.expiry) {
            // Update cache
            if (enableCache) {
              cacheRef.current.set(key, data);
            }
            setState(prev => ({ ...prev, lastOperation: 'load' }));
            onDataSuccess?.('load');
            return data.value;
          }
        }
      }

      // Try IndexedDB
      if (enableIndexedDB && indexedDBRef.current) {
        const transaction = indexedDBRef.current.transaction(['otpData'], 'readonly');
        const store = transaction.objectStore('otpData');
        const request = store.get(key);
        
        return new Promise((resolve) => {
          request.onsuccess = () => {
            const data = request.result;
            if (data && Date.now() - data.timestamp < data.expiry) {
              // Update cache
              if (enableCache) {
                cacheRef.current.set(key, data);
              }
              setState(prev => ({ ...prev, lastOperation: 'load' }));
              onDataSuccess?.('load');
              resolve(data.value);
            } else {
              resolve(null);
            }
          };
          request.onerror = () => resolve(null);
        });
      }

      return null;
    } catch (error) {
      onDataError?.(error as Error);
      return null;
    }
  }, [enableDataManagement, enableCache, enableLocalStorage, enableSessionStorage, enableIndexedDB, storageKey, onDataSuccess, onDataError]);

  // Clear data
  const clearData = useCallback(async (key?: string) => {
    if (!enableDataManagement) return;

    try {
      if (key) {
        // Clear specific key
        if (enableLocalStorage) {
          localStorage.removeItem(`${storageKey}-${key}`);
        }
        if (enableSessionStorage) {
          sessionStorage.removeItem(`${storageKey}-${key}`);
        }
        if (enableIndexedDB && indexedDBRef.current) {
          const transaction = indexedDBRef.current.transaction(['otpData'], 'readwrite');
          const store = transaction.objectStore('otpData');
          await store.delete(key);
        }
        if (enableCache) {
          cacheRef.current.delete(key);
        }
      } else {
        // Clear all data
        if (enableLocalStorage) {
          Object.keys(localStorage).forEach(k => {
            if (k.startsWith(storageKey)) {
              localStorage.removeItem(k);
            }
          });
        }
        if (enableSessionStorage) {
          Object.keys(sessionStorage).forEach(k => {
            if (k.startsWith(storageKey)) {
              sessionStorage.removeItem(k);
            }
          });
        }
        if (enableIndexedDB && indexedDBRef.current) {
          const transaction = indexedDBRef.current.transaction(['otpData'], 'readwrite');
          const store = transaction.objectStore('otpData');
          await store.clear();
        }
        if (enableCache) {
          cacheRef.current.clear();
        }
      }

      setState(prev => ({ ...prev, lastOperation: 'clear', cacheSize: cacheRef.current.size }));
      onDataSuccess?.('clear');
    } catch (error) {
      onDataError?.(error as Error);
    }
  }, [enableDataManagement, enableLocalStorage, enableSessionStorage, enableIndexedDB, enableCache, storageKey, onDataSuccess, onDataError]);

  // Sync data
  const syncData = useCallback(async () => {
    if (!enableDataManagement || !enableSync) return;

    setState(prev => ({ ...prev, isSyncing: true }));

    try {
      // This would typically sync with a remote server
      // For now, we'll just simulate the sync
      console.log('Syncing data...');
      
      setState(prev => ({ 
        ...prev, 
        lastSync: Date.now(),
        isSyncing: false,
        lastOperation: 'sync' 
      }));
      onDataSuccess?.('sync');
    } catch (error) {
      setState(prev => ({ ...prev, isSyncing: false }));
      onDataError?.(error as Error);
    }
  }, [enableDataManagement, enableSync, onDataSuccess, onDataError]);

  // Export data
  const exportData = useCallback(async (format: 'json' | 'csv' = 'json') => {
    if (!enableDataManagement) return null;

    try {
      const data: Record<string, unknown> = {};

      // Collect data from all sources
      if (enableLocalStorage) {
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith(storageKey)) {
            const stored = localStorage.getItem(k);
            if (stored) {
              const parsed = JSON.parse(stored);
              data[k.replace(`${storageKey}-`, '')] = parsed.value;
            }
          }
        });
      }

      if (format === 'json') {
        return JSON.stringify(data, null, 2);
      } else if (format === 'csv') {
        const csv = Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n');
        return `key,value\n${csv}`;
      }

      setState(prev => ({ ...prev, lastOperation: 'export' }));
      onDataSuccess?.('export');
    } catch (error) {
      onDataError?.(error as Error);
      return null;
    }
  }, [enableDataManagement, enableLocalStorage, storageKey, onDataSuccess, onDataError]);

  // Import data
  const importData = useCallback(async (data: string, format: 'json' | 'csv' = 'json') => {
    if (!enableDataManagement) return;

    try {
      let parsedData: Record<string, unknown> = {};

      if (format === 'json') {
        parsedData = JSON.parse(data);
      } else if (format === 'csv') {
        const lines = data.split('\n');
        lines.forEach((line, index) => {
          if (index > 0 && line.trim()) {
            const [key, value] = line.split(',');
            parsedData[key] = value;
          }
        });
      }

      // Save imported data
      for (const [key, value] of Object.entries(parsedData)) {
        await saveData(key, value);
      }

      setState(prev => ({ ...prev, lastOperation: 'import' }));
      onDataSuccess?.('import');
    } catch (error) {
      onDataError?.(error as Error);
    }
  }, [enableDataManagement, saveData, onDataSuccess, onDataError]);

  // Get data status
  const getDataStatus = useCallback(() => {
    if (!enableDataManagement) return null;

    return {
      isLocalStorageEnabled: state.isLocalStorageEnabled,
      isSessionStorageEnabled: state.isSessionStorageEnabled,
      isIndexedDBEnabled: state.isIndexedDBEnabled,
      isCacheEnabled: state.isCacheEnabled,
      isSyncEnabled: state.isSyncEnabled,
      lastOperation: state.lastOperation,
      errorCount: state.dataErrors.length,
      cacheSize: state.cacheSize,
      lastSync: state.lastSync,
      isSyncing: state.isSyncing,
    };
  }, [enableDataManagement, state]);

  return {
    ...state,
    saveData,
    loadData,
    clearData,
    syncData,
    exportData,
    importData,
    getDataStatus,
  };
};
