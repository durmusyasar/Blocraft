import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  customRules?: Array<{ key: string; label: string; test: (password: string) => boolean }>;
}

export class BcPasswordInputTestUtils {
  /**
   * Generate test passwords based on requirements
   */
  static generateTestPassword(requirements: PasswordRequirements): string {
    const { minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial } = requirements;
    
    let password = '';
    let charset = '';
    
    // Build character set
    if (requireLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (requireUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (requireNumber) charset += '0123456789';
    if (requireSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Ensure at least one character from each required category
    if (requireLowercase) password += 'a';
    if (requireUppercase) password += 'A';
    if (requireNumber) password += '1';
    if (requireSpecial) password += '!';
    
    // Fill remaining length
    const remainingLength = Math.max(0, minLength - password.length);
    for (let i = 0; i < remainingLength; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Generate invalid test passwords
   */
  static generateInvalidTestPassword(requirements: PasswordRequirements): string {
    const { minLength } = requirements;
    
    // Generate password that doesn't meet requirements
    if (requirements.requireUppercase) {
      return 'a'.repeat(minLength); // Only lowercase
    }
    if (requirements.requireLowercase) {
      return 'A'.repeat(minLength); // Only uppercase
    }
    if (requirements.requireNumber) {
      return 'aA'.repeat(Math.floor(minLength / 2)); // No numbers
    }
    if (requirements.requireSpecial) {
      return 'aA1'.repeat(Math.floor(minLength / 3)); // No special chars
    }
    
    return 'a'.repeat(minLength - 1); // Too short
  }

  /**
   * Simulate password input for testing
   */
  static async simulatePasswordInput(
    input: HTMLElement,
    password: string,
    options: { delay?: number } = {}
  ): Promise<void> {
    const { delay = 0 } = options;
    
    // Clear existing value
    input.focus();
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Type password character by character
    for (let i = 0; i < password.length; i++) {
      const event = new KeyboardEvent('keydown', { key: password[i] });
      input.dispatchEvent(event);
      
      const inputEvent = new Event('input', { bubbles: true });
      (input as HTMLInputElement).value += password[i];
      input.dispatchEvent(inputEvent);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  /**
   * Test password strength calculation
   */
  static testPasswordStrength(password: string, requirements: PasswordRequirements): {
    score: number;
    passed: boolean;
    failedRules: string[];
  } {
    const failedRules: string[] = [];
    let score = 0;
    
    // Length check
    if (password.length >= requirements.minLength) {
      score += 20;
    } else {
      failedRules.push('minLength');
    }
    
    // Character variety checks
    if (requirements.requireUppercase && /[A-Z]/.test(password)) {
      score += 20;
    } else if (requirements.requireUppercase) {
      failedRules.push('requireUppercase');
    }
    
    if (requirements.requireLowercase && /[a-z]/.test(password)) {
      score += 20;
    } else if (requirements.requireLowercase) {
      failedRules.push('requireLowercase');
    }
    
    if (requirements.requireNumber && /[0-9]/.test(password)) {
      score += 20;
    } else if (requirements.requireNumber) {
      failedRules.push('requireNumber');
    }
    
    if (requirements.requireSpecial && /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
      score += 20;
    } else if (requirements.requireSpecial) {
      failedRules.push('requireSpecial');
    }
    
    // Custom rules
    if (requirements.customRules) {
      for (const rule of requirements.customRules) {
        if (rule.test(password)) {
          score += 10;
        } else {
          failedRules.push(rule.key);
        }
      }
    }
    
    return {
      score,
      passed: failedRules.length === 0,
      failedRules
    };
  }

  /**
   * Test accessibility features
   */
  static testAccessibility(container: HTMLElement): {
    hasAriaLabels: boolean;
    hasAriaDescribedBy: boolean;
    hasRoleAttributes: boolean;
    hasKeyboardSupport: boolean;
  } {
    const input = container.querySelector('input');
    const strengthBar = container.querySelector('[role="progressbar"]');
    const rulesList = container.querySelector('ul');
    
    return {
      hasAriaLabels: !!input?.getAttribute('aria-label'),
      hasAriaDescribedBy: !!input?.getAttribute('aria-describedby'),
      hasRoleAttributes: !!strengthBar && !!rulesList,
      hasKeyboardSupport: !!input?.getAttribute('tabIndex')
    };
  }

  /**
   * Test performance metrics
   */
  static async testPerformance(
    renderFn: () => void,
    iterations: number = 100
  ): Promise<{
    averageRenderTime: number;
    minRenderTime: number;
    maxRenderTime: number;
  }> {
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      renderFn();
      const end = performance.now();
      times.push(end - start);
    }
    
    const averageRenderTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minRenderTime = Math.min(...times);
    const maxRenderTime = Math.max(...times);
    
    return {
      averageRenderTime,
      minRenderTime,
      maxRenderTime
    };
  }
}

/**
 * Custom render function with theme provider
 */
export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const theme = createTheme();
  
  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(ThemeProvider, { theme }, children);
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Test data generators
 */
export const TestDataGenerators = {
  validPasswords: [
    'Password123!',
    'MySecurePass1@',
    'Test1234#',
    'StrongPass99$'
  ],
  
  invalidPasswords: [
    '123', // Too short
    'password', // No uppercase, number, special
    'PASSWORD', // No lowercase, number, special
    'Password', // No number, special
    'Password123' // No special
  ],
  
  edgeCases: [
    '', // Empty
    'a'.repeat(1000), // Very long
    '🚀🌟💫', // Emojis
    'Test123!@#$%^&*()_+-=[]{}|;:,.<>?', // All special chars
    'Test123!'.repeat(10) // Repeated pattern
  ]
};
