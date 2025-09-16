import { useMemo } from 'react';
import { BcPhoneInputProps } from '../BcPhoneInput.types';

export interface PhoneAccessibilityOptions {
  enableScreenReaderSupport?: boolean;
  enableKeyboardNavigation?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  enableFocusManagement?: boolean;
  enableARIALabels?: boolean;
  enableLiveRegions?: boolean;
  enableSkipLinks?: boolean;
  enableTooltips?: boolean;
  enableErrorAnnouncements?: boolean;
  enableStatusAnnouncements?: boolean;
  enableProgressAnnouncements?: boolean;
}

export interface PhoneAccessibilityReturn {
  screenReaderInstructions: string;
  ariaLabel: string;
  ariaDescribedBy: string;
  ariaLabelledBy: string;
  keyboardShortcuts: Record<string, string>;
  focusManagement: {
    autoFocus: boolean;
    tabIndex: number;
    role: string;
  };
  liveRegions: {
    status: string;
    progress: string;
    error: string;
  };
  skipLinks: {
    skipToInput: string;
    skipToCountrySelect: string;
  };
  tooltips: {
    inputTooltip: string;
    countrySelectTooltip: string;
    validationTooltip: string;
  };
  highContrast: boolean;
  reducedMotion: boolean;
}

export const usePhoneAccessibility = (props: BcPhoneInputProps): PhoneAccessibilityReturn => {
  const {
    enableScreenReaderSupport = true,
    enableKeyboardNavigation = true,
    enableHighContrast = false,
    enableReducedMotion = false,
    enableFocusManagement = true,
    enableARIALabels = true,
    enableLiveRegions = true,
    enableSkipLinks = false,
    enableTooltips = true,
    enableErrorAnnouncements = true,
    enableStatusAnnouncements = true,
    enableProgressAnnouncements = true,
    locale = 'en',
    country,
    showCountrySelect = true,
  } = props;

  return useMemo(() => {
    // Locale-aware screen reader instructions
    const screenReaderInstructions = enableScreenReaderSupport
      ? locale === 'tr'
        ? `Telefon numarası girişi${showCountrySelect ? ' ülke seçici ile' : ''}. Navigasyon için Tab, ülke seçimi için Enter, ülkeler arasında gezinmek için ok tuşlarını kullanın.`
        : `Phone number input${showCountrySelect ? ' with country selector' : ''}. Use Tab to navigate, Enter to select country, Arrow keys to browse countries.`
      : '';

    // Locale-aware ARIA labels
    const ariaLabel = enableARIALabels
      ? locale === 'tr'
        ? `Telefon numarası girişi${showCountrySelect ? ' ülke seçici ile' : ''}`
        : `Phone number input${showCountrySelect ? ' with country selector' : ''}`
      : '';

    const ariaDescribedBy = enableARIALabels
      ? `phone-input-description-${country || 'default'}`
      : '';

    const ariaLabelledBy = enableARIALabels
      ? `phone-input-label-${country || 'default'}`
      : '';

    const keyboardShortcuts: Record<string, string> = enableKeyboardNavigation
      ? locale === 'tr'
        ? {
            'Tab': 'Sonraki öğeye git',
            'Shift+Tab': 'Önceki öğeye git',
            'Enter': 'Ülke seç veya girişi onayla',
            'Escape': 'Ülke açılır menüsünü kapat',
            'Arrow Up': 'Önceki ülke',
            'Arrow Down': 'Sonraki ülke',
            'Space': 'Ülke açılır menüsünü aç',
            'Ctrl+A': 'Tüm metni seç',
            'Ctrl+C': 'Telefon numarasını kopyala',
            'Ctrl+V': 'Telefon numarasını yapıştır',
            'Delete': 'Girişi temizle',
            'Backspace': 'Karakteri sil',
          }
        : {
            'Tab': 'Navigate to next element',
            'Shift+Tab': 'Navigate to previous element',
            'Enter': 'Select country or confirm input',
            'Escape': 'Close country dropdown',
            'Arrow Up': 'Previous country',
            'Arrow Down': 'Next country',
            'Space': 'Open country dropdown',
            'Ctrl+A': 'Select all text',
            'Ctrl+C': 'Copy phone number',
            'Ctrl+V': 'Paste phone number',
            'Delete': 'Clear input',
            'Backspace': 'Delete character',
          }
      : {};

    const focusManagement = enableFocusManagement
      ? {
          autoFocus: false,
          tabIndex: 0,
          role: 'textbox',
        }
      : {
          autoFocus: false,
          tabIndex: -1,
          role: 'textbox',
        };

    const liveRegions = enableLiveRegions
      ? {
          status: enableStatusAnnouncements 
            ? (locale === 'tr' ? 'Telefon girişi durum güncellemeleri' : 'Phone input status updates')
            : '',
          progress: enableProgressAnnouncements 
            ? (locale === 'tr' ? 'Telefon girişi ilerleme güncellemeleri' : 'Phone input progress updates')
            : '',
          error: enableErrorAnnouncements 
            ? (locale === 'tr' ? 'Telefon girişi hata mesajları' : 'Phone input error messages')
            : '',
        }
      : {
          status: '',
          progress: '',
          error: '',
        };

    // Skip links functionality
    const skipLinks = enableSkipLinks
      ? {
          skipToInput: locale === 'tr' ? 'Telefon girişine atla' : 'Skip to phone input',
          skipToCountrySelect: showCountrySelect 
            ? (locale === 'tr' ? 'Ülke seçicisine atla' : 'Skip to country selector')
            : '',
        }
      : {
          skipToInput: '',
          skipToCountrySelect: '',
        };

    // Tooltips functionality
    const tooltips = enableTooltips
      ? {
          inputTooltip: locale === 'tr' 
            ? 'Telefon numaranızı girin' 
            : 'Enter your phone number',
          countrySelectTooltip: showCountrySelect 
            ? (locale === 'tr' ? 'Ülke seçin' : 'Select country')
            : '',
          validationTooltip: locale === 'tr'
            ? 'Geçerli bir telefon numarası girin'
            : 'Enter a valid phone number',
        }
      : {
          inputTooltip: '',
          countrySelectTooltip: '',
          validationTooltip: '',
        };

    return {
      screenReaderInstructions,
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      keyboardShortcuts,
      focusManagement,
      liveRegions,
      skipLinks,
      tooltips,
      highContrast: enableHighContrast,
      reducedMotion: enableReducedMotion,
    };
  }, [
    enableScreenReaderSupport, 
    enableKeyboardNavigation, 
    enableHighContrast, 
    enableReducedMotion, 
    enableFocusManagement, 
    enableARIALabels, 
    enableLiveRegions, 
    enableSkipLinks,
    enableTooltips,
    enableErrorAnnouncements, 
    enableStatusAnnouncements, 
    enableProgressAnnouncements, 
    country, 
    showCountrySelect,
    locale
  ]);
};
