import React from 'react';
import { render, RenderOptions, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';

export interface OtpTestConfig {
  length?: number;
  inputType?: 'number' | 'text';
  mask?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export class BcOtpInputTestUtils {
  /**
   * Generate test OTP values
   */
  static generateTestOtp(length: number = 6, inputType: 'number' | 'text' = 'number'): string {
    if (inputType === 'number') {
      return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  /**
   * Generate invalid test OTP
   */
  static generateInvalidOtp(length: number = 6, inputType: 'number' | 'text' = 'number'): string {
    if (inputType === 'number') {
      // Generate with letters (invalid for number type)
      return 'ABC123';
    }
    
    // Generate with special characters (invalid for both types)
    return 'ABC@#$';
  }

  /**
   * Simulate OTP input for testing
   */
  static async simulateOtpInput(
    container: HTMLElement,
    otp: string,
    options: { delay?: number } = {}
  ): Promise<void> {
    const { delay = 0 } = options;
    const inputs = container.querySelectorAll('input');
    
    // Clear existing values
    inputs.forEach(input => {
      fireEvent.change(input, { target: { value: '' } });
    });
    
    // Type OTP character by character
    for (let i = 0; i < otp.length && i < inputs.length; i++) {
      const input = inputs[i];
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: otp[i] } });
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Simulate paste operation
   */
  static async simulatePaste(
    container: HTMLElement,
    pastedOtp: string
  ): Promise<void> {
    const firstInput = container.querySelector('input');
    if (!firstInput) return;

    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => pastedOtp,
      },
    });
  }

  /**
   * Simulate keyboard navigation
   */
  static async simulateKeyboardNavigation(
    container: HTMLElement,
    key: 'ArrowLeft' | 'ArrowRight' | 'Backspace' | 'Enter' | 'Tab'
  ): Promise<void> {
    const activeElement = document.activeElement as HTMLInputElement;
    if (!activeElement) return;

    fireEvent.keyDown(activeElement, { key });
  }

  /**
   * Test OTP validation
   */
  static testOtpValidation(otp: string, length: number, inputType: 'number' | 'text'): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Length check
    if (otp.length !== length) {
      errors.push(`Expected length ${length}, got ${otp.length}`);
    }
    
    // Type check
    if (inputType === 'number' && !/^[0-9]+$/.test(otp)) {
      errors.push('Expected numeric input');
    }
    
    if (inputType === 'text' && !/^[0-9a-zA-Z]+$/.test(otp)) {
      errors.push('Expected alphanumeric input');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
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
    hasScreenReaderSupport: boolean;
  } {
    const inputs = container.querySelectorAll('input');
    const hasAriaLabels = Array.from(inputs).every(input => 
      input.getAttribute('aria-label') || input.getAttribute('aria-labelledby')
    );
    const hasAriaDescribedBy = Array.from(inputs).some(input => 
      input.getAttribute('aria-describedby')
    );
    const hasRoleAttributes = Array.from(inputs).every(input => 
      input.getAttribute('role') === 'textbox'
    );
    const hasKeyboardSupport = Array.from(inputs).every(input => 
      input.getAttribute('tabIndex') !== null
    );
    const hasScreenReaderSupport = container.querySelector('[aria-live]') !== null;

    return {
      hasAriaLabels,
      hasAriaDescribedBy,
      hasRoleAttributes,
      hasKeyboardSupport,
      hasScreenReaderSupport,
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
      maxRenderTime,
    };
  }

  /**
   * Test focus management
   */
  static testFocusManagement(container: HTMLElement): {
    canFocusFirst: boolean;
    canFocusLast: boolean;
    canNavigateWithArrows: boolean;
    canTabThrough: boolean;
  } {
    const inputs = Array.from(container.querySelectorAll('input')) as HTMLInputElement[];
    
    // Test focus first
    inputs[0]?.focus();
    const canFocusFirst = document.activeElement === inputs[0];
    
    // Test focus last
    inputs[inputs.length - 1]?.focus();
    const canFocusLast = document.activeElement === inputs[inputs.length - 1];
    
    // Test arrow navigation
    inputs[0]?.focus();
    fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
    const canNavigateWithArrows = document.activeElement === inputs[1];
    
    // Test tab navigation
    inputs[0]?.focus();
    fireEvent.keyDown(inputs[0], { key: 'Tab' });
    const canTabThrough = document.activeElement === inputs[1];
    
    return {
      canFocusFirst,
      canFocusLast,
      canNavigateWithArrows,
      canTabThrough,
    };
  }

  /**
   * Test status handling
   */
  static testStatusHandling(container: HTMLElement, status: 'error' | 'warning' | 'success' | 'info'): {
    hasStatusIcon: boolean;
    hasStatusColor: boolean;
    hasStatusMessage: boolean;
  } {
    const statusIcons = container.querySelectorAll('[data-testid*="status-icon"]');
    const inputs = container.querySelectorAll('input');
    const statusMessages = container.querySelectorAll('[data-testid*="status-message"]');
    
    const hasStatusIcon = statusIcons.length > 0;
    const hasStatusColor = Array.from(inputs).some(input => 
      input.style.borderColor !== '' && input.style.borderColor !== 'rgb(204, 204, 204)'
    );
    const hasStatusMessage = statusMessages.length > 0;
    
    return {
      hasStatusIcon,
      hasStatusColor,
      hasStatusMessage,
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
export const OtpTestDataGenerators = {
  validOtps: {
    numeric: ['123456', '000000', '999999', '1234567890'],
    alphanumeric: ['ABC123', 'XYZ789', '123ABC', 'A1B2C3'],
  },
  
  invalidOtps: {
    tooShort: ['123', 'AB', '1'],
    tooLong: ['123456789012345', 'ABCDEFGHIJKLMNOP'],
    wrongType: ['ABC123', 'XYZ789'], // For numeric input
    specialChars: ['123@#$', 'ABC!@#'],
  },
  
  edgeCases: {
    empty: '',
    spaces: '1 2 3 4 5 6',
    mixedCase: 'AbC123',
    unicode: '🚀🌟💫',
    veryLong: '1'.repeat(100),
  }
};

/**
 * Mock functions for testing
 */
export const MockFunctions = {
  onChange: jest.fn(),
  onComplete: jest.fn(),
  onClear: jest.fn(),
  onError: jest.fn(),
  onPerformance: jest.fn(),
  validateOtp: jest.fn(),
};

/**
 * Test configurations
 */
export const TestConfigs = {
  basic: {
    length: 6,
    inputType: 'number' as const,
    mask: false,
    autoFocus: false,
  },
  
  advanced: {
    length: 8,
    inputType: 'text' as const,
    mask: true,
    autoFocus: true,
    autoValidate: true,
    autoClear: true,
  },
  
  mobile: {
    length: 4,
    inputType: 'number' as const,
    mask: false,
    autoFocus: true,
    enableMobileOptimizations: true,
  },
  
  accessibility: {
    length: 6,
    inputType: 'number' as const,
    mask: false,
    autoFocus: true,
    enableKeyboardShortcuts: true,
  },
};
