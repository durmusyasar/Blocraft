import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpSecurityProps {
  enableSecurity?: boolean;
  onSecurityViolation?: (violation: SecurityViolation) => void;
  onSecurityError?: (error: Error) => void;
  maxAttempts?: number;
  lockoutDuration?: number;
  encryptionKey?: string;
  enableAuditLog?: boolean;
}

export interface SecurityViolation {
  type: 'rate_limit' | 'suspicious_activity' | 'invalid_input' | 'session_expired';
  message: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityState {
  isLocked: boolean;
  attemptsRemaining: number;
  lockoutUntil: number | null;
  sessionId: string | null;
  lastActivity: number;
  violationCount: number;
  auditLog: SecurityViolation[];
}

export const useOtpSecurity = ({
  enableSecurity = false,
  onSecurityViolation,
  onSecurityError,
  maxAttempts = 5,
  lockoutDuration = 300000, // 5 minutes
  encryptionKey = 'default-key',
  enableAuditLog = true,
}: UseOtpSecurityProps) => {
  const [state, setState] = useState<SecurityState>({
    isLocked: false,
    attemptsRemaining: maxAttempts,
    lockoutUntil: null,
    sessionId: null,
    lastActivity: Date.now(),
    violationCount: 0,
    auditLog: [],
  });

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lockoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize session
  useEffect(() => {
    if (!enableSecurity) return;

    const sessionId = generateSessionId();
    setState(prev => ({ ...prev, sessionId }));

    const sessionTimeout = sessionTimeoutRef.current;
    const lockoutTimeout = lockoutTimeoutRef.current;

    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      if (lockoutTimeout) {
        clearTimeout(lockoutTimeout);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSecurity]);

  // Generate session ID
  const generateSessionId = useCallback(() => {
    return `otp_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Encrypt OTP value
  const encryptValue = useCallback((value: string): string => {
    if (!enableSecurity) return value;

    try {
      // Simple encryption (in production, use proper encryption)
      const encrypted = btoa(value + encryptionKey);
      return encrypted;
    } catch (error) {
      onSecurityError?.(error as Error);
      return value;
    }
  }, [enableSecurity, encryptionKey, onSecurityError]);

  // Decrypt OTP value
  const decryptValue = useCallback((encryptedValue: string): string => {
    if (!enableSecurity) return encryptedValue;

    try {
      const decrypted = atob(encryptedValue);
      return decrypted.replace(encryptionKey, '');
    } catch (error) {
      onSecurityError?.(error as Error);
      return encryptedValue;
    }
  }, [enableSecurity, encryptionKey, onSecurityError]);

  // Log security violation
  const logViolation = useCallback((type: SecurityViolation['type'], message: string, severity: SecurityViolation['severity'] = 'medium') => {
    if (!enableSecurity) return;

    const violation: SecurityViolation = {
      type,
      message,
      timestamp: Date.now(),
      severity,
    };

    setState(prev => ({
      ...prev,
      violationCount: prev.violationCount + 1,
      auditLog: enableAuditLog ? [...prev.auditLog.slice(-99), violation] : prev.auditLog,
    }));

    onSecurityViolation?.(violation);
  }, [enableSecurity, enableAuditLog, onSecurityViolation]);

  // Check rate limit
  const checkRateLimit = useCallback((inputValue: string): boolean => {
    if (!enableSecurity) return true;

    const now = Date.now();
    const timeSinceLastActivity = now - state.lastActivity;

    // Check if too many rapid inputs
    if (timeSinceLastActivity < 100) { // Less than 100ms between inputs
      logViolation('rate_limit', 'Too many rapid inputs detected', 'high');
      return false;
    }

    // Check for suspicious patterns
    if (inputValue.length > 0) {
      const suspiciousPatterns = [
        /(.)\1{3,}/, // Repeated characters
        /123456|654321|000000|111111/, // Common patterns
        /[^0-9]/, // Non-numeric characters in numeric mode
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(inputValue)) {
          logViolation('suspicious_activity', `Suspicious pattern detected: ${inputValue}`, 'medium');
          return false;
        }
      }
    }

    setState(prev => ({ ...prev, lastActivity: now }));
    return true;
  }, [enableSecurity, state.lastActivity, logViolation]);

  // Validate input
  const validateInput = useCallback((inputValue: string): boolean => {
    if (!enableSecurity) return true;

    // Check if locked
    if (state.isLocked) {
      logViolation('session_expired', 'Attempted input while locked', 'high');
      return false;
    }

    // Check rate limit
    if (!checkRateLimit(inputValue)) {
      return false;
    }

    // Check attempts remaining
    if (state.attemptsRemaining <= 0) {
      lockoutUser();
      return false;
    }

    return true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSecurity, state.isLocked, state.attemptsRemaining, checkRateLimit, logViolation]);

  // Lock user
  const lockoutUser = useCallback(() => {
    if (!enableSecurity) return;

    const lockoutUntil = Date.now() + lockoutDuration;
    
    setState(prev => ({
      ...prev,
      isLocked: true,
      lockoutUntil,
      attemptsRemaining: 0,
    }));

    logViolation('rate_limit', `User locked out for ${lockoutDuration / 1000} seconds`, 'critical');

    // Auto-unlock after duration
    lockoutTimeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLocked: false,
        lockoutUntil: null,
        attemptsRemaining: maxAttempts,
      }));
    }, lockoutDuration);
  }, [enableSecurity, lockoutDuration, maxAttempts, logViolation]);

  // Decrement attempts
  const decrementAttempts = useCallback(() => {
    if (!enableSecurity) return;

    setState(prev => {
      const newAttempts = prev.attemptsRemaining - 1;
      
      if (newAttempts <= 0) {
        lockoutUser();
      }

      return {
        ...prev,
        attemptsRemaining: newAttempts,
      };
    });
  }, [enableSecurity, lockoutUser]);

  // Reset attempts
  const resetAttempts = useCallback(() => {
    if (!enableSecurity) return;

    setState(prev => ({
      ...prev,
      attemptsRemaining: maxAttempts,
      isLocked: false,
      lockoutUntil: null,
    }));
  }, [enableSecurity, maxAttempts]);

  // Check session validity
  const isSessionValid = useCallback((): boolean => {
    if (!enableSecurity) return true;

    const now = Date.now();
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes

    if (now - state.lastActivity > sessionTimeout) {
      logViolation('session_expired', 'Session expired due to inactivity', 'medium');
      return false;
    }

    return true;
  }, [enableSecurity, state.lastActivity, logViolation]);

  // Get security status
  const getSecurityStatus = useCallback(() => {
    if (!enableSecurity) return null;

    if (state.isLocked) {
      const remainingTime = state.lockoutUntil ? Math.ceil((state.lockoutUntil - Date.now()) / 1000) : 0;
      return `Locked for ${remainingTime} seconds`;
    }

    if (state.attemptsRemaining < maxAttempts) {
      return `${state.attemptsRemaining} attempts remaining`;
    }

    return 'Security active';
  }, [enableSecurity, state.isLocked, state.lockoutUntil, state.attemptsRemaining, maxAttempts]);

  // Get audit log
  const getAuditLog = useCallback(() => {
    return state.auditLog;
  }, [state.auditLog]);

  // Clear audit log
  const clearAuditLog = useCallback(() => {
    setState(prev => ({ ...prev, auditLog: [] }));
  }, []);

  return {
    ...state,
    encryptValue,
    decryptValue,
    validateInput,
    decrementAttempts,
    resetAttempts,
    isSessionValid,
    getSecurityStatus,
    getAuditLog,
    clearAuditLog,
  };
};
