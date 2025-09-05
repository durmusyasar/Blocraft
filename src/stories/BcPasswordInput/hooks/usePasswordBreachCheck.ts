import { useCallback, useState } from 'react';

export interface PasswordBreachCheckResult {
  isBreached: boolean;
  breachCount: number | null;
  isLoading: boolean;
  error: string | null;
  checkPassword: (password: string) => Promise<void>;
}

export function usePasswordBreachCheck(): PasswordBreachCheckResult {
  const [isBreached, setIsBreached] = useState(false);
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPassword = useCallback(async (password: string) => {
    if (!password) {
      setIsBreached(false);
      setBreachCount(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Hash the password using SHA-1 (first 5 characters for HaveIBeenPwned API)
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', passwordData);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const hashPrefix = hashHex.substring(0, 5).toUpperCase();
      const hashSuffix = hashHex.substring(5).toUpperCase();

      // Check against HaveIBeenPwned API
      const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
      
      if (!response.ok) {
        throw new Error('Failed to check password breach');
      }

      const responseData = await response.text();
      const lines = responseData.split('\n');
      
      for (const line of lines) {
        const [suffix, count] = line.split(':');
        if (suffix === hashSuffix) {
          setIsBreached(true);
          setBreachCount(parseInt(count, 10));
          return;
        }
      }

      setIsBreached(false);
      setBreachCount(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setIsBreached(false);
      setBreachCount(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isBreached,
    breachCount,
    isLoading,
    error,
    checkPassword
  };
}
