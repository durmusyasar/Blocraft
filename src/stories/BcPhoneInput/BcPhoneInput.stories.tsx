import { Meta, StoryObj } from "@storybook/react/*";
import  { useState } from "react";
import { BcPhoneInput } from "./BcPhoneInput";
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';
import { useForm, Controller } from "react-hook-form";
import { countryList as defaultCountryList } from "./utils";
import React from "react";
import { CountryCode } from './types';

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
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country1 as CountryCode} onCountryChange={setCountry1} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country2 as CountryCode} onCountryChange={setCountry2} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country3 as CountryCode} onCountryChange={setCountry3} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country4 as CountryCode} onCountryChange={setCountry4} locale={defaultLocale} />
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
    const country = watch('country') as CountryCode;
    const phone = watch('phone');
    const countryList = defaultCountryList;
    const selectedCountry = countryList.find(c => c.code === country);
    const dial = selectedCountry ? `+${selectedCountry.dial}` : '';

    const handleCountryChange = (newCountry: CountryCode) => {
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
        country={selectedCountry as CountryCode}
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
    const [country1, setCountry1] = React.useState<CountryCode>('TR');
    const [country2, setCountry2] = React.useState<CountryCode>('US');
    const [country3, setCountry3] = React.useState<CountryCode>('DE');
    const [country4, setCountry4] = React.useState<CountryCode>('GB');
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country1 as CountryCode} onCountryChange={c => setCountry1(c as CountryCode)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country2 as CountryCode} onCountryChange={c => setCountry2(c as CountryCode)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country3 as CountryCode} onCountryChange={c => setCountry3(c as CountryCode)} locale={defaultLocale} />
        <BcPhoneInput label={getText(defaultLocale, 'label')} country={country4 as CountryCode} onCountryChange={c => setCountry4(c as CountryCode)} locale={defaultLocale} />
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
        code: ('TR' as CountryCode), // veya uygun kodlar
        name: { tr: `Ülke ${i + 1}`, en: `Country ${i + 1}` },
        flag: '🏳️',
        dial: 1000 + i,
        mask: '(999) 999-9999'
      }));
      // TR ve US başa ekle
      bigList.unshift(
        { id: 1001, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
        { id: 1002, code: 'US' as CountryCode, name: { tr: 'Amerika', en: 'United States' }, flag: '🇺🇸', dial: 1, mask: '(999) 999-9999' }
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
          country={selectedCountry as CountryCode}
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