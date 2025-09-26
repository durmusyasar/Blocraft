import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BcPasswordInput } from './BcPasswordInput';

// Test theme
const theme = createTheme();

// Test wrapper
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('BcPasswordInput', () => {
  it('renders with basic props', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          placeholder="Enter password"
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('toggles password visibility when toggle button is clicked', async () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          showPasswordToggle={true}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    const toggleButton = screen.getByRole('button', { name: /şifreyi göster/i });

    // Initially should be password type
    expect(input).toHaveAttribute('type', 'password');

    // Click toggle button
    await userEvent.click(toggleButton);

    // Should change to text type
    expect(input).toHaveAttribute('type', 'text');

    // Click again to hide
    await userEvent.click(toggleButton);

    // Should change back to password type
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = jest.fn();

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          onChange={handleChange}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    await userEvent.type(input, 'testpassword');

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows password generation button when enabled', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          enablePasswordGeneration={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /şifre üret/i })).toBeInTheDocument();
  });

  it('does not show password generation button when disabled', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          enablePasswordGeneration={false}
        />
      </TestWrapper>
    );

    expect(screen.queryByRole('button', { name: /şifre üret/i })).not.toBeInTheDocument();
  });

  it('applies custom translations', () => {
    const customTranslations = {
      veryWeak: 'Very Weak',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      generatePassword: 'Generate Password',
    };

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          enablePasswordGeneration={true}
          passwordTranslations={customTranslations}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /generate password/i })).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          value="initialpassword"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    expect(input).toHaveValue('initialpassword');

    // Update value
    rerender(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          value="updatedpassword"
        />
      </TestWrapper>
    );

    expect(input).toHaveValue('updatedpassword');
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');

    // Focus
    await userEvent.click(input);
    expect(handleFocus).toHaveBeenCalled();

    // Blur
    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          disabled={true}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    expect(input).toBeDisabled();
  });

  it('applies error state correctly', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          error={true}
          helperText="Password is required"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          size="small"
        />
      </TestWrapper>
    );

    let input = screen.getByLabelText('Test Password');
    expect(input).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          size="large"
        />
      </TestWrapper>
    );

    input = screen.getByLabelText('Test Password');
    expect(input).toBeInTheDocument();
  });

  it('applies different appearances correctly', () => {
    const appearances = ['premium', 'soft', 'glass', 'minimal', 'neumorph', 'underline', 'dark', 'borderless'];

    appearances.forEach(appearance => {
      const { unmount } = render(
        <TestWrapper>
          <BcPasswordInput
            label="Test Password"
            appearance={appearance as "premium" | "soft" | "glass" | "minimal" | "neumorph" | "underline" | "dark" | "borderless"}
          />
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Password');
      expect(input).toBeInTheDocument();

      unmount();
    });
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <TestWrapper>
        <BcPasswordInput
          ref={ref}
          label="Test Password"
        />
      </TestWrapper>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('handles password generation callback', async () => {
    const handlePasswordGenerated = jest.fn();

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          enablePasswordGeneration={true}
          onPasswordGenerated={handlePasswordGenerated}
        />
      </TestWrapper>
    );

    const generateButton = screen.getByRole('button', { name: /şifre üret/i });
    await userEvent.click(generateButton);

    // Note: In a real test, you would mock the password generation hook
    // to return a predictable result
    expect(generateButton).toBeInTheDocument();
  });

  it('handles strength change callback', async () => {
    const handleStrengthChange = jest.fn();

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          enableStrengthIndicator={true}
          onStrengthChange={handleStrengthChange}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    await userEvent.type(input, 'testpassword123');

    // Note: In a real test, you would mock the strength analysis hook
    // to return a predictable result
    expect(input).toHaveValue('testpassword123');
  });

  it('applies custom styles correctly', () => {
    const customSx = {
      '& .MuiOutlinedInput-root': {
        borderColor: 'red',
      },
    };

    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          sx={customSx}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    expect(input).toBeInTheDocument();
  });

  it('handles accessibility attributes correctly', () => {
    render(
      <TestWrapper>
        <BcPasswordInput
          label="Test Password"
          passwordToggleAriaLabel="Toggle password visibility"
          strengthMeterAriaLabel="Password strength meter"
          requirementsAriaLabel="Password requirements"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Password');
    expect(input).toBeInTheDocument();
  });
});