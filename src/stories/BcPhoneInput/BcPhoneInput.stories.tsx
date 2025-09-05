import { Meta, StoryObj } from "@storybook/react/*";
import  { useState } from "react";
import { BcPhoneInput } from "./BcPhoneInput";
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';
import { useForm, Controller } from "react-hook-form";
import { countryList as defaultCountryList } from "./utils";
import React from "react";

const TEXTS: Record<string, Record<string, string>> = { en: enTexts.BcPhoneInput, tr: trTexts.BcPhoneInput };
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || 'en';
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

const withLocale = (Story: any, context: any) => {
  const locale = context.locale || context.globals.locale;
  const storyProps = context.args || {};
  const hasLocale = storyProps.locale !== undefined;
  return <Story {...context} args={hasLocale ? storyProps : { ...storyProps, locale }} />;
};
const defaultLocale = (window as any)?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]?.globals?.locale || 'en';

const meta: Meta<typeof BcPhoneInput> = {
  title: "Components/BcPhoneInput",
  component: BcPhoneInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: getText(defaultLocale, 'componentDocsDescription'),
      },
    },
  },
  argTypes: {
    label: {
      description: getText(defaultLocale, 'labelDescription'),
      control: "text",
    },
    placeholder: {
      description: getText(defaultLocale, 'placeholderDescription'),
      control: "text",
    },
    country: {
      description: getText(defaultLocale, 'countryDescription'),
      control: "text",
    },
    onCountryChange: {
      description: getText(defaultLocale, 'onCountryChangeDescription'),
      action: "countryChanged",
    },
    showCountrySelect: {
      description: getText(defaultLocale, 'showCountrySelectDescription'),
      control: "boolean",
    },
    helperText: {
      description: getText(defaultLocale, 'helperTextDescription'),
      control: "text",
    },
    status: {
      description: "Status indicator",
      control: "select",
      options: ["error", "warning", "success", "info", undefined],
    },
    statusMessage: {
      description: getText(defaultLocale, 'statusMessageDescription'),
      control: "text",
    },
    showClearButton: {
      description: getText(defaultLocale, 'clearButtonLabelDescription'),
      control: "boolean",
    },
    disabled: {
      description: getText(defaultLocale, 'disabledDescription'),
      control: "boolean",
    },
    responsiveWidth: {
      description: getText(defaultLocale, 'responsiveWidthDescription'),
      control: "boolean",
    },
    appearance: {
      description: getText(defaultLocale, 'appearanceDescription'),
      control: "select",
      options: [
        "premium",
        "soft",
        "glass",
        "minimal",
        "neumorph",
        "underline",
        "dark",
        "borderless",
        undefined,
      ],
    },
    enableRTL: {
      description: getText(defaultLocale, 'enableRTLDescription'),
      control: "boolean",
    },
    enableHighContrast: {
      description: getText(defaultLocale, 'enableHighContrastDescription'),
      control: "boolean",
    },
    translations: {
      description: getText(defaultLocale, 'translationsDescription'),
      control: "object",
    },
    locale: {
      description: getText(defaultLocale, 'localeDescription'),
      control: "text",
    },
    fallbackLocale: {
      description: getText(defaultLocale, 'fallbackLocaleDescription'),
      control: "text",
    },
    favoriteCountries: {
      description: getText(defaultLocale, 'favoriteCountriesDescription'),
      control: "object",
    },
    // Yeni gelişmiş özellikler
    enableAdvancedMonitoring: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableAdvancedMonitoringDescription'),
    },
    enableMobileOptimizations: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableMobileOptimizationsDescription'),
    },
    enableAdvancedI18n: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableAdvancedI18nDescription'),
    },
    enableThemeAwareStyles: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableThemeAwareStylesDescription'),
    },
    enableKeyboardShortcuts: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableKeyboardShortcutsDescription'),
    },
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<typeof BcPhoneInput>;

export const Default: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    placeholder: getText(defaultLocale, 'placeholder'),
  },
};

export const WithCountrySelect: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    helperText: getText(defaultLocale, 'helperText'),
    locale: defaultLocale,
  },
};

export const DifferentCountries: Story = {
  render: () => {
    const [country1, setCountry1] = useState("TR");
    const [country2, setCountry2] = useState("US");
    const [country3, setCountry3] = useState("DE");
    const [country4, setCountry4] = useState("GB");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country1} onCountryChange={setCountry1} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country2} onCountryChange={setCountry2} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country3} onCountryChange={setCountry3} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country4} onCountryChange={setCountry4} locale={defaultLocale} />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <BcPhoneInput
        label={getText(defaultLocale, 'label')}
        value={val}
        onChange={e => setVal(e.target.value)}
        helperText={getText(defaultLocale, 'helperText')}
        locale={defaultLocale}
      />
    );
  },
};

export const WithStatus: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    status: "info",
    statusMessage: getText(defaultLocale, 'statusMessage'),
    helperText: getText(defaultLocale, 'helperText'),
    locale: defaultLocale,
  },
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        "premium",
        "soft",
        "glass",
        "minimal",
        "neumorph",
        "underline",
        "dark",
        "borderless",
      ].map((appearance) => (
        <BcPhoneInput
          key={appearance}
          label={getText(defaultLocale, 'label')}
          appearance={appearance as any}
          placeholder={getText(defaultLocale, 'placeholder')}
          locale={defaultLocale}
        />
      ))}
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    responsiveWidth: true,
    placeholder: getText(defaultLocale, 'placeholder'),
    locale: defaultLocale,
  },
};

export const Disabled: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    disabled: true,
    defaultValue: "5551234567",
    helperText: getText(defaultLocale, 'helperText'),
    locale: defaultLocale,
  },
};

export const WithClearButton: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    showClearButton: true,
    helperText: getText(defaultLocale, 'helperText'),
    locale: defaultLocale,
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <BcPhoneInput label={getText(defaultLocale, 'label')} value="" locale={defaultLocale} />
      <BcPhoneInput label={getText(defaultLocale, 'label')} value={"5".repeat(20)} locale={defaultLocale} />
      <BcPhoneInput label={getText(defaultLocale, 'label')} value="" country="DE" locale={defaultLocale} />
    </div>
  ),
};

export const AllAppearances: Story = {
  render: () => {
    const appearances = [
      "premium",
      "soft",
      "glass",
      "minimal",
      "neumorph",
      "underline",
      "dark",
      "borderless",
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {appearances.map((appearance) => (
          <div key={appearance} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{appearance}</div>
            <BcPhoneInput
              label={getText(defaultLocale, 'label')}
              appearance={appearance as any}
              country="TR"
              placeholder={getText(defaultLocale, 'placeholder')}
              locale={defaultLocale}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const RTL: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    enableRTL: true,
    placeholder: getText(defaultLocale, 'placeholder'),
    locale: defaultLocale,
  },
};

export const HighContrast: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    enableHighContrast: true,
    locale: defaultLocale,
  },
};

export const WithTranslations: Story = {
  args: {
    label: undefined,
    translations: {
      label: getText(defaultLocale, 'label'),
      clearButtonLabel: getText(defaultLocale, 'clearButtonLabel'),
      statusMessage: getText(defaultLocale, 'invalidPhoneMessage'),
    },
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
  },
};

export const RHFPhoneInputExample: Story = {
  render: () => {
    const { control, setValue, watch } = useForm({
      defaultValues: {
        country: 'TR',
        phone: '+90',
      },
    });
    const country = watch('country') as string;
    const phone = watch('phone');
    const countryList = defaultCountryList;
    const selectedCountry = countryList.find(c => c.code === country);
    const dial = selectedCountry ? `+${selectedCountry.dial}` : '';

    const handleCountryChange = (newCountry: string) => {
      const newDial = countryList.find(c => c.code === newCountry)?.dial;
      setValue('country', newCountry);
      setValue('phone', `+${newDial}`);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      if (!val.startsWith(dial)) {
        val = dial + val.replace(/^\+\d+/, '');
      }
      setValue('phone', val);
    };

    return (
      <form>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <BcPhoneInput
              {...field}
              country={country}
              onCountryChange={handleCountryChange}
              value={phone}
              onChange={handlePhoneChange}
              countryList={countryList}
              label="Telefon"
              placeholder="Telefon numarası"
            />
          )}
        />
      </form>
    );
  },
};

// Favori ve son kullanılan ülke örneği
export const FavoritesAndRecents = {
  render: (args: any, context: any) => {
    const [selectedCountry, setSelectedCountry] = React.useState('TR');
    const [value, setValue] = React.useState('');
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcPhoneInput
        {...args}
        label={args.label || (locale === 'tr' ? 'Telefon' : 'Phone')}
        favoriteCountries={['TR', 'US']}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={e => setValue(e.target.value)}
        locale={locale}
        placeholder={args.placeholder || (locale === 'tr' ? 'Telefon numarası' : 'Phone number')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Favorites and recently used countries are shown at the top of the country select. Try changing the country to see "Recents" update. Başlıklar i18n ile otomatik çevirilir.'
      }
    }
  }
};

// Çoklu BcPhoneInput örneği (örnek kullanım)
export const MultipleInputs = {
  render: (args: any, context: any) => {
    const defaultLocale = context?.globals?.locale ?? context?.locale ?? 'en';
    const [country1, setCountry1] = React.useState<string>('TR');
    const [country2, setCountry2] = React.useState<string>('US');
    const [country3, setCountry3] = React.useState<string>('DE');
    const [country4, setCountry4] = React.useState<string>('GB');
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country1} onCountryChange={c => setCountry1(c)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country2} onCountryChange={c => setCountry2(c)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country3} onCountryChange={c => setCountry3(c)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country4} onCountryChange={c => setCountry4(c)} locale={defaultLocale} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple BcPhoneInput components with different country states. State types are CountryCode for full TypeScript safety.'
      }
    }
  }
};

// Büyük ülke listesiyle performans testi
export const PerformanceTest = {
  render: (args: any, context: any) => {
    const [countries, setCountries] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCountry, setSelectedCountry] = React.useState('TR');
    const [value, setValue] = React.useState('');
    const [renderTime, setRenderTime] = React.useState<number | null>(null);
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    React.useEffect(() => {
      const start = performance.now();
      // 1000 ülke simüle et
      const bigList = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        code: ('TR' as string), // veya uygun kodlar
        name: { tr: `Ülke ${i + 1}`, en: `Country ${i + 1}` },
        flag: '🏳️',
        dial: 1000 + i,
        mask: '(999) 999-9999'
      }));
      // TR ve US başa ekle
      bigList.unshift(
        { id: 1001, code: 'TR' as string, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
        { id: 1002, code: 'US' as string, name: { tr: 'Amerika', en: 'United States' }, flag: '🇺🇸', dial: 1, mask: '(999) 999-9999' }
      );
      setTimeout(() => {
        setCountries(bigList);
        setLoading(false);
        setRenderTime(performance.now() - start);
      }, 800); // Async fetch simülasyonu
    }, []);
    return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <b>{locale === 'tr' ? 'Ülke sayısı' : 'Country count'}:</b> {countries.length}<br />
          <b>{locale === 'tr' ? 'Render süresi' : 'Render time'}:</b> {renderTime !== null ? renderTime.toFixed(2) + ' ms' : (locale === 'tr' ? 'Hesaplanıyor...' : 'Calculating...')}
        </div>
        <BcPhoneInput
          {...args}
          label={args.label || (locale === 'tr' ? 'Telefon' : 'Phone')}
          countryList={countries}
          country={selectedCountry}
          onCountryChange={setSelectedCountry}
          value={value}
          onChange={e => setValue(e.target.value)}
          locale={locale}
          placeholder={args.placeholder || (locale === 'tr' ? 'Telefon numarası' : 'Phone number')}
          disabled={loading}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story simulates a country list with 1000+ items and async loading. Render time is measured. Büyük veriyle performans testi için kullanılır.'
      }
    }
  }
};

// Async country loading example
export const AsyncCountryLoading = {
  render: (args: any, context: any) => {
    const [selectedCountry, setSelectedCountry] = React.useState('TR');
    const [value, setValue] = React.useState('');
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    
    const fetchCountries = React.useCallback(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return defaultCountryList;
    }, []);

    return (
      <BcPhoneInput
        {...args}
        label={args.label || (locale === 'tr' ? 'Telefon' : 'Phone')}
        fetchCountries={fetchCountries}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={e => setValue(e.target.value)}
        locale={locale}
        placeholder={args.placeholder || (locale === 'tr' ? 'Telefon numarası' : 'Phone number')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows async country loading with 2 second delay. Countries are fetched from an API. Asenkron ülke yükleme örneği.'
      }
    }
  }
};

// Custom validation example
export const CustomValidation = {
  render: (args: any, context: any) => {
    const [selectedCountry, setSelectedCountry] = React.useState('TR');
    const [value, setValue] = React.useState('');
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    
    const validatePhone = React.useCallback((phone: string, country: string) => {
      if (country === 'TR') {
        return phone.length >= 10 && phone.startsWith('5');
      }
      if (country === 'US') {
        return phone.length === 10;
      }
      return phone.length >= 8;
    }, []);

    return (
      <BcPhoneInput
        {...args}
        label={args.label || (locale === 'tr' ? 'Telefon' : 'Phone')}
        validatePhone={validatePhone}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={e => setValue(e.target.value)}
        locale={locale}
        placeholder={args.placeholder || (locale === 'tr' ? 'Telefon numarası' : 'Phone number')}
        helperText={locale === 'tr' ? 'TR: 5 ile başlayan 10 haneli, US: 10 haneli' : 'TR: 10 digits starting with 5, US: 10 digits'}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom phone validation rules. TR numbers must start with 5 and be 10 digits, US numbers must be exactly 10 digits. Özel telefon doğrulama kuralları.'
      }
    }
  }
};

// Advanced Monitoring Feature
export const AdvancedMonitoring: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAdvancedMonitoring={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          📊 {getText(locale, 'advancedMonitoringDescription')}
        </div>
      </div>
    );
  },
};

// Mobile Optimizations Feature
export const MobileOptimizations: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableMobileOptimizations={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          📱 {getText(locale, 'mobileOptimizationsDescription')}
        </div>
      </div>
    );
  },
};

// Advanced i18n Feature
export const AdvancedI18n: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAdvancedI18n={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🌍 {getText(locale, 'advancedI18nDescription')}
        </div>
      </div>
    );
  },
};

// Theme Aware Styles Feature
export const ThemeAwareStyles: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableThemeAwareStyles={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🎨 {getText(locale, 'themeAwareStylesDescription')}
        </div>
      </div>
    );
  },
};

// Keyboard Shortcuts Feature
export const KeyboardShortcuts: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableKeyboardShortcuts={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          ⌨️ {getText(locale, 'keyboardShortcutsDescription')}
        </div>
      </div>
    );
  },
};

// All Advanced Features Combined
export const AllAdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAdvancedMonitoring={true}
          enableMobileOptimizations={true}
          enableAdvancedI18n={true}
          enableThemeAwareStyles={true}
          enableKeyboardShortcuts={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🚀 {getText(locale, 'allAdvancedFeaturesDescription')}
        </div>
      </div>
    );
  },
}; 