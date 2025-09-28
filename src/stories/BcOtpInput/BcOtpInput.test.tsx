import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BcOtpInput } from './BcOtpInput';
import type { BcOtpInputProps } from './BcOtpInput.types';

// Mock theme
const theme = createTheme();

// Test wrapper with theme provider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

// Helper function to render component with theme
const renderWithTheme = (props: Partial<BcOtpInputProps> = {}) => {
  const defaultProps: BcOtpInputProps = {
    length: 6,
    label: 'OTP Code',
    ...props,
  };
  
  return render(
    <TestWrapper>
      <BcOtpInput {...defaultProps} />
    </TestWrapper>
  );
};

describe('BcOtpInput', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      renderWithTheme();
      
      expect(screen.getByLabelText(/otp code/i)).toBeInTheDocument();
      expect(screen.getByText('OTP Code')).toBeInTheDocument();
    });

    it('should render correct number of input fields', () => {
      renderWithTheme({ length: 4 });
      
      const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

    it('should render with custom label', () => {
      renderWithTheme({ label: 'Verification Code' });
      
      expect(screen.getByText('Verification Code')).toBeInTheDocument();
    });

    it('should render with helper text', () => {
      renderWithTheme({ helperText: 'Enter the code sent to your phone' });
      
      expect(screen.getByText('Enter the code sent to your phone')).toBeInTheDocument();
    });

    it('should render with status message', () => {
      renderWithTheme({ 
        status: 'error',
        statusMessage: 'Invalid code'
      });
      
      expect(screen.getByText('Invalid code')).toBeInTheDocument();
    });

    it('should render in disabled state', () => {
      renderWithTheme({ disabled: true });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('should render with loading state', () => {
      renderWithTheme({ loading: true });
      
      // Check for loading indicator
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle input changes', async () => {
    const handleChange = jest.fn();
      renderWithTheme({ onOtpChange: handleChange });
      
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], '1');
      
      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('should handle multiple character input', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ onOtpChange: handleChange });
      
      const inputs = screen.getAllByRole('textbox');
    
    // Type in first input
      await userEvent.type(inputs[0], '1');
      expect(handleChange).toHaveBeenCalledWith('1');
    
    // Type in second input
      await userEvent.type(inputs[1], '2');
      expect(handleChange).toHaveBeenCalledWith('12');
    });

    it('should handle paste event', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ 
        onOtpChange: handleChange,
        interactionOptions: {
          enablePasteSupport: true,
        }
      });
      
      const container = screen.getByLabelText(/otp code/i);
    
    // Mock clipboard data
      const clipboardData = {
        getData: jest.fn().mockReturnValue('123456')
      };
      
      fireEvent.paste(container, { clipboardData });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('123456');
      });
    });

    it('should handle keyboard navigation', async () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Focus first input
    inputs[0].focus();
      expect(inputs[0]).toHaveFocus();
      
      // Press right arrow
      fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
      expect(inputs[1]).toHaveFocus();
      
      // Press left arrow
      fireEvent.keyDown(inputs[1], { key: 'ArrowLeft' });
      expect(inputs[0]).toHaveFocus();
    });

    it('should handle backspace navigation', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ onOtpChange: handleChange });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type in first two inputs
      await userEvent.type(inputs[0], '1');
      await userEvent.type(inputs[1], '2');
      
      // Focus second input and press backspace
      inputs[1].focus();
      fireEvent.keyDown(inputs[1], { key: 'Backspace' });
      
      // Should move focus to first input and clear it
      expect(inputs[0]).toHaveFocus();
    });

    it('should handle home and end keys', async () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Focus middle input
      inputs[2].focus();
      
      // Press home key
      fireEvent.keyDown(inputs[2], { key: 'Home' });
      expect(inputs[0]).toHaveFocus();
      
      // Press end key
      fireEvent.keyDown(inputs[0], { key: 'End' });
      expect(inputs[inputs.length - 1]).toHaveFocus();
    });
  });

  describe('Validation', () => {
    it('should validate input with custom validator', async () => {
      const validateOtp = jest.fn().mockReturnValue(true);
      const handleComplete = jest.fn();
      
      renderWithTheme({ 
        validateOtp,
        onOtpComplete: handleComplete,
        validationOptions: {
          enableAutoValidation: true,
        }
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type complete OTP
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], (i + 1).toString());
      }
      
      await waitFor(() => {
        expect(validateOtp).toHaveBeenCalledWith('123456');
      });
      
      expect(handleComplete).toHaveBeenCalledWith('123456');
    });

    it('should show error state for invalid input', async () => {
      const validateOtp = jest.fn().mockReturnValue(false);
      
      renderWithTheme({ 
        validateOtp,
        validationOptions: {
          enableAutoValidation: true,
        }
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type complete OTP
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], (i + 1).toString());
      }
      
      await waitFor(() => {
        expect(screen.getByText(/invalid/i)).toBeInTheDocument();
      });
    });

    it('should handle async validation', async () => {
      const validateOtp = jest.fn().mockResolvedValue(true);
      
      renderWithTheme({ 
        validateOtp,
        validationOptions: {
          enableAutoValidation: true,
        }
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type complete OTP
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], (i + 1).toString());
      }
      
      await waitFor(() => {
        expect(validateOtp).toHaveBeenCalledWith('123456');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute('aria-label', `OTP digit ${index + 1}`);
      });
    });

    it('should have proper ARIA describedby', () => {
      renderWithTheme({ helperText: 'Enter verification code' });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-describedby');
      });
    });

    it('should have proper ARIA invalid state', () => {
      renderWithTheme({ status: 'error' });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should be keyboard navigable', async () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Tab through inputs
      await userEvent.tab();
      expect(inputs[0]).toHaveFocus();
      
      await userEvent.tab();
      expect(inputs[1]).toHaveFocus();
    });
  });

  describe('Masking', () => {
    it('should mask input when mask prop is true', () => {
      renderWithTheme({ mask: true });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('type', 'password');
      });
    });

    it('should use custom mask character', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ 
        mask: true,
        maskCharacter: '#',
        onOtpChange: handleChange
      });
      
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], '1');
      
      expect(inputs[0]).toHaveValue('#');
    });
  });

  describe('Auto-clear', () => {
    it('should auto-clear after specified delay', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ 
        autoClear: true,
        clearDelay: 100, // Short delay for testing
        onOtpChange: handleChange
      });
      
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], '1');
      
      expect(handleChange).toHaveBeenCalledWith('1');
      
      // Wait for auto-clear
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('');
      }, { timeout: 200 });
    });
  });

  describe('Input Types', () => {
    it('should handle number input type', async () => {
      renderWithTheme({ inputType: 'number' });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Try to type non-numeric character
      await userEvent.type(inputs[0], 'a');
      expect(inputs[0]).toHaveValue('');
      
      // Type numeric character
      await userEvent.type(inputs[0], '1');
      expect(inputs[0]).toHaveValue('1');
    });

    it('should handle text input type', async () => {
      renderWithTheme({ inputType: 'text' });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type alphabetic character
      await userEvent.type(inputs[0], 'a');
      expect(inputs[0]).toHaveValue('a');
      
      // Type numeric character
      await userEvent.type(inputs[1], '1');
      expect(inputs[1]).toHaveValue('1');
    });

    it('should handle alphanumeric input type', async () => {
      renderWithTheme({ inputType: 'alphanumeric' });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type alphanumeric characters
      await userEvent.type(inputs[0], 'a');
      await userEvent.type(inputs[1], '1');
      await userEvent.type(inputs[2], 'B');
      await userEvent.type(inputs[3], '2');
      
      expect(inputs[0]).toHaveValue('a');
      expect(inputs[1]).toHaveValue('1');
      expect(inputs[2]).toHaveValue('B');
      expect(inputs[3]).toHaveValue('2');
    });
  });

  describe('Focus Management', () => {
    it('should auto-focus first input when autoFocus is true', () => {
      renderWithTheme({ autoFocus: true });
      
      const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveFocus();
  });

    it('should focus next input after typing', async () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type in first input
      await userEvent.type(inputs[0], '1');
      
      // Focus should move to next input
      expect(inputs[1]).toHaveFocus();
    });

    it('should focus previous input on backspace', async () => {
      renderWithTheme();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type in first two inputs
      await userEvent.type(inputs[0], '1');
      await userEvent.type(inputs[1], '2');
      
      // Focus second input and press backspace
      inputs[1].focus();
      fireEvent.keyDown(inputs[1], { key: 'Backspace' });
      
      // Focus should move to first input
      expect(inputs[0]).toHaveFocus();
    });
  });

  describe('Clear Functionality', () => {
    it('should clear all inputs when clear button is clicked', async () => {
      const handleChange = jest.fn();
      renderWithTheme({ 
        showClearButton: true,
        onOtpChange: handleChange
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type in inputs
      await userEvent.type(inputs[0], '1');
      await userEvent.type(inputs[1], '2');
      
      // Click clear button
      const clearButton = screen.getByLabelText(/clear/i);
      await userEvent.click(clearButton);
      
      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should clear inputs when clear method is called', async () => {
    const handleChange = jest.fn();
      const { rerender } = renderWithTheme({ 
        otpValue: '123',
        onOtpChange: handleChange
      });
      
      // Clear by setting empty value
      rerender(
        <TestWrapper>
          <BcOtpInput length={6} label="OTP Code" otpValue="" onOtpChange={handleChange} />
        </TestWrapper>
      );
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should adapt to different screen sizes', () => {
      renderWithTheme({ inputSize: 'small' });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveStyle({ width: '40px', height: '40px' });
      });
    });

    it('should use different sizes for different inputSize props', () => {
      const { rerender } = renderWithTheme({ inputSize: 'medium' });
      
      let inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveStyle({ width: '48px', height: '48px' });
      });
      
      rerender(
        <TestWrapper>
          <BcOtpInput length={6} label="OTP Code" inputSize="large" />
        </TestWrapper>
      );
      
      inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveStyle({ width: '56px', height: '56px' });
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle validation errors gracefully', async () => {
      const validateOtp = jest.fn().mockRejectedValue(new Error('Network error'));
      
      renderWithTheme({ 
        validateOtp,
        validationOptions: {
          enableAutoValidation: true,
        }
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type complete OTP
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], (i + 1).toString());
      }
      
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    it('should handle invalid input gracefully', async () => {
    const handleChange = jest.fn();
      renderWithTheme({ 
        onOtpChange: handleChange,
        inputType: 'number'
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Try to type invalid characters
      await userEvent.type(inputs[0], 'abc');
      
      // Should not call onChange with invalid characters
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      
      const TestComponent = () => {
        renderSpy();
        return <BcOtpInput length={6} label="OTP Code" />;
      };
      
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );
      
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('should debounce validation calls', async () => {
      const validateOtp = jest.fn().mockReturnValue(true);
      
      renderWithTheme({ 
        validateOtp,
        validationOptions: {
          enableAutoValidation: true,
          validationDebounceMs: 100,
        }
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Type rapidly
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], (i + 1).toString());
      }
      
      // Wait for debounce
      await waitFor(() => {
        expect(validateOtp).toHaveBeenCalled();
      }, { timeout: 200 });
      
      // Should not be called for each character
      expect(validateOtp).toHaveBeenCalledTimes(1);
    });
  });
}); 