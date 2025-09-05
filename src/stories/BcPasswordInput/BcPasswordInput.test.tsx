import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BcPasswordInput } from './BcPasswordInput';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock zxcvbn
jest.mock('zxcvbn', () => jest.fn(() => ({ score: 2 })));

describe('BcPasswordInput', () => {
  const defaultProps = {
    label: 'Password',
    placeholder: 'Enter your password',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    });

    it('renders with custom label and placeholder', () => {
      render(
        <BcPasswordInput
          label="Custom Password"
          placeholder="Enter your custom password"
        />
      );
      
      expect(screen.getByLabelText('Custom Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your custom password')).toBeInTheDocument();
    });

    it('renders with controlled value', () => {
      render(<BcPasswordInput {...defaultProps} value="test123" />);
      
      const input = screen.getByDisplayValue('test123');
      expect(input).toBeInTheDocument();
    });

    it('renders with uncontrolled value', () => {
      render(<BcPasswordInput {...defaultProps} defaultValue="default123" />);
      
      const input = screen.getByDisplayValue('default123');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Password Visibility Toggle', () => {
    it('shows password toggle button by default', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      expect(toggleButton).toBeInTheDocument();
    });

    it('hides password toggle button when showPasswordToggle is false', () => {
      render(<BcPasswordInput {...defaultProps} showPasswordToggle={false} />);
      
      const toggleButton = screen.queryByRole('button', { name: /show password/i });
      expect(toggleButton).not.toBeInTheDocument();
    });

    it('toggles password visibility when clicked', async () => {
      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const input = screen.getByDisplayValue('test123');
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      
      // Initially password should be hidden
      expect(input).toHaveAttribute('type', 'password');
      
      // Click to show password
      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      
      // Click to hide password again
      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('toggles password visibility with keyboard', async () => {
      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const input = screen.getByDisplayValue('test123');
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      
      // Focus and press Enter
      toggleButton.focus();
      await userEvent.keyboard('{Enter}');
      expect(input).toHaveAttribute('type', 'text');
      
      // Press Space
      await userEvent.keyboard(' ');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('Copy Button', () => {
    it('shows copy button when password has value', () => {
      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const copyButton = screen.getByRole('button', { name: /copy password/i });
      expect(copyButton).toBeInTheDocument();
    });

    it('hides copy button when showCopyButton is false', () => {
      render(<BcPasswordInput {...defaultProps} showCopyButton={false} defaultValue="test123" />);
      
      const copyButton = screen.queryByRole('button', { name: /copy password/i });
      expect(copyButton).not.toBeInTheDocument();
    });

    it('copies password to clipboard when clicked', async () => {
      const mockWriteText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const copyButton = screen.getByRole('button', { name: /copy password/i });
      await userEvent.click(copyButton);
      
      expect(mockWriteText).toHaveBeenCalledWith('test123');
    });

    it('shows copied message after copying', async () => {
      const mockWriteText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const copyButton = screen.getByRole('button', { name: /copy password/i });
      await userEvent.click(copyButton);
      
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    it('handles copy error gracefully', async () => {
      const mockWriteText = jest.fn().mockRejectedValue(new Error('Copy failed'));
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const copyButton = screen.getByRole('button', { name: /copy password/i });
      await userEvent.click(copyButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('BcPasswordInput: Failed to copy password:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Password Strength Bar', () => {
    it('shows strength bar by default', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      const strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toBeInTheDocument();
    });

    it('hides strength bar when showStrengthBar is false', () => {
      render(<BcPasswordInput {...defaultProps} showStrengthBar={false} />);
      
      const strengthBar = screen.queryByRole('progressbar');
      expect(strengthBar).not.toBeInTheDocument();
    });

    it('shows rules list', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      expect(screen.getByText('Rules')).toBeInTheDocument();
    });

    it('updates strength based on password', () => {
      const { rerender } = render(<BcPasswordInput {...defaultProps} value="" />);
      
      let strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveAttribute('aria-valuenow', '0');
      
      rerender(<BcPasswordInput {...defaultProps} value="Test123!" />);
      strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveAttribute('aria-valuenow', '4');
    });
  });

  describe('Password Rules', () => {
    it('shows default password rules', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      expect(screen.getByText(/Minimum length: 8/)).toBeInTheDocument();
      expect(screen.getByText('Require uppercase')).toBeInTheDocument();
      expect(screen.getByText('Require lowercase')).toBeInTheDocument();
      expect(screen.getByText('Require number')).toBeInTheDocument();
    });

    it('shows custom password rules', () => {
      const customRules = [
        {
          key: 'custom1',
          label: 'Custom rule 1',
          test: (password: string) => password.length > 5,
        },
        {
          key: 'custom2',
          label: 'Custom rule 2',
          test: (password: string) => password.includes('@'),
        },
      ];

      render(<BcPasswordInput {...defaultProps} customRules={customRules} />);
      
      expect(screen.getByText('Custom rule 1')).toBeInTheDocument();
      expect(screen.getByText('Custom rule 2')).toBeInTheDocument();
    });

    it('updates rule status based on password', () => {
      render(<BcPasswordInput {...defaultProps} value="Test123!" />);
      
      // All rules should be passed
      const checkmarks = screen.getAllByText('✔️');
      expect(checkmarks).toHaveLength(4); // minLength, uppercase, lowercase, number
    });

    it('shows checkmark when all rules are passed', () => {
      render(<BcPasswordInput {...defaultProps} value="Test123!" />);
      
      const strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveTextContent('✔️');
    });
  });

  describe('Async Validation', () => {
    it('shows loading state during async validation', async () => {
      const validatePassword = jest.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({ isValid: true }), 100))
      );

      render(
        <BcPasswordInput
          {...defaultProps}
          enableAsyncValidation
          validatePassword={validatePassword}
          showValidationStatus
        />
      );

      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'test123' } });

      // Should show loading state
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows validation result after async validation', async () => {
      const validatePassword = jest.fn().mockResolvedValue({
        isValid: false,
        message: 'Password is too weak',
      });

      render(
        <BcPasswordInput
          {...defaultProps}
          enableAsyncValidation
          validatePassword={validatePassword}
          showValidationStatus
        />
      );

      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'test123' } });

      await waitFor(() => {
        expect(screen.getByText('Password is too weak')).toBeInTheDocument();
      });
    });

    it('handles async validation error', async () => {
      const validatePassword = jest.fn().mockRejectedValue(new Error('Validation failed'));
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <BcPasswordInput
          {...defaultProps}
          enableAsyncValidation
          validatePassword={validatePassword}
          showValidationStatus
        />
      );

      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'test123' } });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('BcPasswordInput: Async validation failed:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Monitoring', () => {
    it('calls onChange monitoring callback', () => {
      const monitoring = {
        onChange: jest.fn(),
      };

      render(<BcPasswordInput {...defaultProps} monitoring={monitoring} />);

      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'test123' } });

      expect(monitoring.onChange).toHaveBeenCalledWith('test123');
    });

    it('calls onStrengthChange monitoring callback', () => {
      const monitoring = {
        onStrengthChange: jest.fn(),
      };

      render(<BcPasswordInput {...defaultProps} monitoring={monitoring} />);

      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'Test123!' } });

      expect(monitoring.onStrengthChange).toHaveBeenCalledWith(4);
    });

    it('calls onError monitoring callback on copy error', async () => {
      const monitoring = {
        onError: jest.fn(),
      };
      const mockWriteText = jest.fn().mockRejectedValue(new Error('Copy failed'));
      
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      render(<BcPasswordInput {...defaultProps} defaultValue="test123" monitoring={monitoring} />);

      const copyButton = screen.getByRole('button', { name: /copy password/i });
      await userEvent.click(copyButton);

      expect(monitoring.onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Internationalization', () => {
    it('uses Turkish translations when locale is tr', () => {
      render(<BcPasswordInput {...defaultProps} locale="tr" />);
      
      expect(screen.getByText('Şifre')).toBeInTheDocument();
      expect(screen.getByText('Şifrenizi girin')).toBeInTheDocument();
    });

    it('uses custom translations when provided', () => {
      const translations = {
        label: 'Custom Label',
        placeholder: 'Custom Placeholder',
        showPassword: 'Show Custom',
        hidePassword: 'Hide Custom',
      };

      render(<BcPasswordInput {...defaultProps} translations={translations} />);
      
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Custom Placeholder')).toBeInTheDocument();
    });

    it('falls back to fallback locale when translation is missing', () => {
      render(<BcPasswordInput {...defaultProps} locale="fr" fallbackLocale="en" />);
      
      // Should use English as fallback
      expect(screen.getByText('Password')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<BcPasswordInput {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes for strength bar', () => {
      render(<BcPasswordInput {...defaultProps} value="Test123!" />);
      
      const strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveAttribute('aria-valuenow', '4');
      expect(strengthBar).toHaveAttribute('aria-valuemin', '0');
      expect(strengthBar).toHaveAttribute('aria-valuemax', '4');
    });

    it('has proper ARIA attributes for rules', () => {
      render(<BcPasswordInput {...defaultProps} value="Test123!" />);
      
      const rules = screen.getAllByRole('checkbox');
      expect(rules).toHaveLength(4);
      
      rules.forEach(rule => {
        expect(rule).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('has proper ARIA attributes for buttons', () => {
      render(<BcPasswordInput {...defaultProps} defaultValue="test123" />);
      
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      const copyButton = screen.getByRole('button', { name: /copy password/i });
      
      expect(toggleButton).toHaveAttribute('tabIndex', '0');
      expect(copyButton).toHaveAttribute('tabIndex', '0');
    });

    it('announces password strength changes to screen readers', () => {
      render(<BcPasswordInput {...defaultProps} />);
      
      const liveRegion = screen.getByLabelText(/password strength/i);
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Integration with BcTextField', () => {
    it('passes through BcTextField props', () => {
      render(
        <BcPasswordInput
          {...defaultProps}
          disabled
          error
          helperText="Custom helper text"
          status="error"
          statusMessage="Custom status message"
        />
      );
      
      expect(screen.getByLabelText('Password')).toBeDisabled();
      expect(screen.getByText('Custom helper text')).toBeInTheDocument();
      expect(screen.getByText('Custom status message')).toBeInTheDocument();
    });

    it('handles clear button', async () => {
      render(<BcPasswordInput {...defaultProps} showClearButton value="test123" />);
      
      const input = screen.getByDisplayValue('test123');
      const clearButton = screen.getByRole('button', { name: /clear/i });
      
      await userEvent.click(clearButton);
      expect(input).toHaveValue('');
    });

    it('handles loading state', () => {
      render(<BcPasswordInput {...defaultProps} loading />);
      
      // Should show loading spinner
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty password gracefully', () => {
      render(<BcPasswordInput {...defaultProps} value="" />);
      
      const strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles very long password', () => {
      const longPassword = 'a'.repeat(1000);
      render(<BcPasswordInput {...defaultProps} value={longPassword} />);
      
      const input = screen.getByDisplayValue(longPassword);
      expect(input).toBeInTheDocument();
    });

    it('handles special characters in password', () => {
      const specialPassword = 'Test123!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<BcPasswordInput {...defaultProps} value={specialPassword} />);
      
      const input = screen.getByDisplayValue(specialPassword);
      expect(input).toBeInTheDocument();
    });

    it('handles zxcvbn strength calculation', () => {
      render(<BcPasswordInput {...defaultProps} useZxcvbnStrength value="test123" />);
      
      const strengthBar = screen.getByRole('progressbar');
      expect(strengthBar).toHaveAttribute('aria-valuemax', '5');
    });
  });
});