import React from 'react';
import { render, screen,  waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BcPhoneInput } from './BcPhoneInput';
import type { CountryType } from './types';

expect.extend(toHaveNoViolations);

// Mock country data
const mockCountries: CountryType[] = [
  { code: 'TR', name: 'Turkey', dial: '90', flag: '🇹🇷' },
  { code: 'US', name: 'United States', dial: '1', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', dial: '49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '33', flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', dial: '44', flag: '🇬🇧' },
];

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('BcPhoneInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<BcPhoneInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<BcPhoneInput label="Phone Number" />);
      expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      render(<BcPhoneInput placeholder="Enter phone number" />);
      expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument();
    });

    it('renders with country select by default', () => {
      render(<BcPhoneInput />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('hides country select when showCountrySelect is false', () => {
      render(<BcPhoneInput showCountrySelect={false} />);
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('shows readonly country when showCountrySelect is readonly', () => {
      render(<BcPhoneInput showCountrySelect="readonly" country="TR" />);
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(screen.getByText('Turkey +90')).toBeInTheDocument();
    });
  });

  describe('Country Selection', () => {
    it('displays default country (TR)', () => {
      render(<BcPhoneInput countryList={mockCountries} />);
      expect(screen.getByDisplayValue('TR +90')).toBeInTheDocument();
    });

    it('changes country when selected', async () => {
      const onCountryChange = jest.fn();
      render(
        <BcPhoneInput 
          countryList={mockCountries} 
          onCountryChange={onCountryChange}
        />
      );
      
      const select = screen.getByRole('combobox');
      await userEvent.click(select);
      
      const usOption = screen.getByText('US');
      await userEvent.click(usOption);
      
      expect(onCountryChange).toHaveBeenCalledWith('US');
    });

    it('displays country flag and dial code in dropdown', async () => {
      render(<BcPhoneInput countryList={mockCountries} />);
      
      const select = screen.getByRole('combobox');
      await userEvent.click(select);
      
      expect(screen.getByText('TR')).toBeInTheDocument();
      expect(screen.getByText('+90')).toBeInTheDocument();
    });

    it('groups countries by favorites and recent', async () => {
      render(
        <BcPhoneInput 
          countryList={mockCountries}
          favoriteCountries={['US', 'DE']}
        />
      );
      
      const select = screen.getByRole('combobox');
      await userEvent.click(select);
      
      expect(screen.getByText('Favorites')).toBeInTheDocument();
    });
  });

  describe('Phone Input', () => {
    it('handles phone number input', async () => {
      const onChange = jest.fn();
      render(<BcPhoneInput onChange={onChange} />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '5551234567');
      
      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue('5551234567');
    });

    it('shows phone mask in placeholder', () => {
      render(<BcPhoneInput country="TR" showMaskInPlaceholder />);
      expect(screen.getByPlaceholderText(/\+90/)).toBeInTheDocument();
    });

    it('validates phone number format', async () => {
      render(<BcPhoneInput country="TR" />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '123'); // Invalid for Turkey
      
      await waitFor(() => {
        expect(screen.getByText(/Geçersiz telefon numarası|Invalid phone number/)).toBeInTheDocument();
      });
    });

    it('uses custom validation function', async () => {
      const validatePhone = jest.fn().mockReturnValue(false);
      render(<BcPhoneInput validatePhone={validatePhone} />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '5551234567');
      
      expect(validatePhone).toHaveBeenCalledWith('5551234567', 'TR');
    });
  });

  describe('Async Country Loading', () => {
    it('shows loading state when fetching countries', async () => {
      const fetchCountries = jest.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockCountries), 100))
      );
      
      render(<BcPhoneInput fetchCountries={fetchCountries} />);
      
      expect(screen.getByText(/Yükleniyor|Loading/)).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByText(/Yükleniyor|Loading/)).not.toBeInTheDocument();
      });
    });

    it('handles fetch countries error gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const fetchCountries = jest.fn().mockRejectedValue(new Error('Network error'));
      
      render(<BcPhoneInput fetchCountries={fetchCountries} />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'BcPhoneInput: Failed to fetch countries:',
          expect.any(Error)
        );
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('LocalStorage Integration', () => {
    it('loads recent countries from localStorage', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['US', 'DE']));
      
      render(<BcPhoneInput countryList={mockCountries} />);
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('bc-phoneinput-recent-countries');
    });

    it('saves recent countries to localStorage', async () => {
      const onCountryChange = jest.fn();
      render(
        <BcPhoneInput 
          countryList={mockCountries}
          onCountryChange={onCountryChange}
        />
      );
      
      const select = screen.getByRole('combobox');
      await userEvent.click(select);
      
      const usOption = screen.getByText('US');
      await userEvent.click(usOption);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'bc-phoneinput-recent-countries',
        JSON.stringify(['US'])
      );
    });
  });

  describe('Internationalization', () => {
    it('displays Turkish labels when locale is tr', () => {
      render(<BcPhoneInput locale="tr" />);
      expect(screen.getByText('Telefon')).toBeInTheDocument();
    });

    it('displays English labels when locale is en', () => {
      render(<BcPhoneInput locale="en" />);
      expect(screen.getByText('Phone')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BcPhoneInput label="Phone Number" required />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Phone Number');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <BcPhoneInput 
          label="Phone Number"
          countryList={mockCountries}
          showClearButton
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Integration with BcTextField', () => {
    it('passes through BcTextField props correctly', () => {
      render(
        <BcPhoneInput 
          showClearButton
          helperText="Enter your phone number"
          status="info"
        />
      );
      
      expect(screen.getByText('Enter your phone number')).toBeInTheDocument();
    });

    it('overrides type prop to tel', () => {
      render(<BcPhoneInput />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'tel');
    });
  });
});