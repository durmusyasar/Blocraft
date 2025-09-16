import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";
import { BcPhoneInput } from "./BcPhoneInput";
import { CountryCode } from "./BcPhoneInput.types";
import enTexts from "../i18n/i18n/en.json";
import trTexts from "../i18n/i18n/tr.json";
import { useForm, Controller } from "react-hook-form";
import { countryList as defaultCountryList } from "./utils";
import React from "react";

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcPhoneInput,
  tr: trTexts.BcPhoneInput,
};
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || "en";
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

const withLocale = (Story: any, context: any) => {
  const locale = context.locale || context.globals.locale;
  const storyProps = context.args || {};
  const hasLocale = storyProps.locale !== undefined;
  return (
    <Story
      {...context}
      args={hasLocale ? storyProps : { ...storyProps, locale }}
    />
  );
};
const defaultLocale =
  (window as any)?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]
    ?.globals?.locale || "en";

const meta: Meta<typeof BcPhoneInput> = {
  title: "Components/BcPhoneInput",
  component: BcPhoneInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          getText(defaultLocale, "componentDocsDescription") +
          " " +
          getText(defaultLocale, "inheritanceDescription"),
      },
    },
  },
  argTypes: {
    // === BcTextField'den inherit edilen temel props ===
    appearance: {
      description: getText(defaultLocale, "appearanceDescription"),
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
      table: { category: "BcTextField Inherited" },
    },
    size: {
      description: getText(defaultLocale, "sizeDescription"),
      control: "select",
      options: ["small", "medium", "large", undefined],
      table: { category: "BcTextField Inherited" },
    },
    color: {
      description: getText(defaultLocale, "colorDescription"),
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        undefined,
      ],
      table: { category: "BcTextField Inherited" },
    },
    disabled: {
      description: getText(defaultLocale, "disabledDescription"),
      control: "boolean",
      table: { category: "BcTextField Inherited" },
    },
    responsiveWidth: {
      description: getText(defaultLocale, "responsiveWidthDescription"),
      control: "boolean",
      table: { category: "BcTextField Inherited" },
    },
    enableRTL: {
      description: getText(defaultLocale, "enableRTLDescription"),
      control: "boolean",
      table: { category: "BcTextField Inherited" },
    },
    enableHighContrast: {
      description: getText(defaultLocale, "enableHighContrastDescription"),
      control: "boolean",
      table: { category: "BcTextField Inherited" },
    },
    showClearButton: {
      description: getText(defaultLocale, "clearButtonLabelDescription"),
      control: "boolean",
      table: { category: "BcTextField Inherited" },
    },
    locale: {
      description: getText(defaultLocale, "localeDescription"),
      control: "text",
      table: { category: "BcTextField Inherited" },
    },
    fallbackLocale: {
      description: getText(defaultLocale, "fallbackLocaleDescription"),
      control: "text",
      table: { category: "BcTextField Inherited" },
    },

    // === BcPhoneInput özel props ===
    country: {
      description: getText(defaultLocale, "countryDescription"),
      control: "text",
      table: { category: "Phone Specific" },
    },
    onCountryChange: {
      description: getText(defaultLocale, "onCountryChangeDescription"),
      action: "countryChanged",
      table: { category: "Phone Specific" },
    },
    showCountrySelect: {
      description: getText(defaultLocale, "showCountrySelectDescription"),
      control: "boolean",
      table: { category: "Phone Specific" },
    },
    favoriteCountries: {
      description: getText(defaultLocale, "favoriteCountriesDescription"),
      control: "object",
      table: { category: "Phone Specific" },
    },
    validatePhone: {
      description: getText(defaultLocale, "validatePhoneDescription"),
      table: { category: "Phone Specific" },
    },
    getMask: {
      description: getText(defaultLocale, "getMaskDescription"),
      table: { category: "Phone Specific" },
    },
    showMaskInPlaceholder: {
      description: getText(defaultLocale, "showMaskInPlaceholderDescription"),
      control: "boolean",
      table: { category: "Phone Specific" },
    },
    // === Gelişmiş özellikler ===
    enablePhoneFormatting: {
      control: "boolean",
      description: getText(defaultLocale, "enablePhoneFormattingDescription"),
      table: { category: "Advanced Features" },
    },
    enableAdvancedValidation: {
      control: "boolean",
      description: getText(
        defaultLocale,
        "enableAdvancedValidationDescription"
      ),
      table: { category: "Advanced Features" },
    },
    enableAutoCountryDetection: {
      control: "boolean",
      description: getText(
        defaultLocale,
        "enableAutoCountryDetectionDescription"
      ),
      table: { category: "Advanced Features" },
    },
    enablePhoneSuggestions: {
      control: "boolean",
      description: getText(defaultLocale, "enablePhoneSuggestionsDescription"),
      table: { category: "Advanced Features" },
    },
    enablePhoneHistory: {
      control: "boolean",
      description: getText(defaultLocale, "enablePhoneHistoryDescription"),
      table: { category: "Advanced Features" },
    },
    enableAccessibility: {
      control: "boolean",
      description: "Enterprise accessibility features including screen reader support, keyboard navigation, ARIA labels, and high contrast mode",
      table: { category: "Enterprise Features" },
    },
    enablePerformance: {
      control: "boolean",
      description: "Performance tracking and optimization features including render time monitoring, memory usage tracking, and user interaction analytics",
      table: { category: "Enterprise Features" },
    },
    enableMonitoring: {
      control: "boolean",
      description: "Enterprise monitoring and analytics including real-time tracking, error reporting, user behavior analytics, and security monitoring",
      table: { category: "Enterprise Features" },
    },
    enableSmartFeatures: {
      control: "boolean",
      description: "AI-powered smart features including smart placeholder generation, contextual validation, personalized suggestions, and adaptive UI",
      table: { category: "Enterprise Features" },
    },
    enableIntegration: {
      control: "boolean",
      description: "Enterprise integration hooks for form systems, validation frameworks, state management, event systems, and external APIs",
      table: { category: "Enterprise Features" },
    },
    enableSmartPlaceholder: {
      control: "boolean",
      description: "Smart placeholder generation based on context and user behavior",
      table: { category: "Smart Features" },
    },
    enableSmartValidation: {
      control: "boolean",
      description: "Smart validation with contextual rules and learning capabilities",
      table: { category: "Smart Features" },
    },
    enableSmartSuggestions: {
      control: "boolean",
      description: "Smart suggestions based on user history and patterns",
      table: { category: "Smart Features" },
    },
    enableSmartFormatting: {
      control: "boolean",
      description: "Smart formatting based on user preferences and context",
      table: { category: "Smart Features" },
    },
    enableSmartCountryDetection: {
      control: "boolean",
      description: "Smart country detection using IP, timezone, and user history",
      table: { category: "Smart Features" },
    },
    enableLearning: {
      control: "boolean",
      description: "Learning capabilities to adapt to user behavior",
      table: { category: "Smart Features" },
    },
    enablePersonalization: {
      control: "boolean",
      description: "Personalization features based on user preferences",
      table: { category: "Smart Features" },
    },
    enableContextualHelp: {
      control: "boolean",
      description: "Contextual help and guidance based on user context",
      table: { category: "Smart Features" },
    },
    enableProgressiveDisclosure: {
      control: "boolean",
      description: "Progressive disclosure of features based on user experience",
      table: { category: "Smart Features" },
    },
    enableScreenReaderSupport: {
      control: "boolean",
      description: "Screen reader support for accessibility",
      table: { category: "Accessibility Features" },
    },
    enableKeyboardNavigation: {
      control: "boolean",
      description: "Keyboard navigation support",
      table: { category: "Accessibility Features" },
    },
    enableReducedMotion: {
      control: "boolean",
      description: "Reduced motion support for accessibility",
      table: { category: "Accessibility Features" },
    },
    enableFocusManagement: {
      control: "boolean",
      description: "Focus management for accessibility",
      table: { category: "Accessibility Features" },
    },
    enableARIALabels: {
      control: "boolean",
      description: "ARIA labels and attributes for screen readers",
      table: { category: "Accessibility Features" },
    },
    enableLiveRegions: {
      control: "boolean",
      description: "Live regions for dynamic content announcements",
      table: { category: "Accessibility Features" },
    },
    enableSkipLinks: {
      control: "boolean",
      description: "Skip links for keyboard navigation",
      table: { category: "Accessibility Features" },
    },
    enableTooltips: {
      control: "boolean",
      description: "Tooltips for additional information",
      table: { category: "Accessibility Features" },
    },
    enableErrorAnnouncements: {
      control: "boolean",
      description: "Error announcements for screen readers",
      table: { category: "Accessibility Features" },
    },
    enableStatusAnnouncements: {
      control: "boolean",
      description: "Status announcements for screen readers",
      table: { category: "Accessibility Features" },
    },
    enableProgressAnnouncements: {
      control: "boolean",
      description: "Progress announcements for screen readers",
      table: { category: "Accessibility Features" },
    },
    integrationTimeout: {
      control: { type: "number", min: 1000, max: 30000, step: 1000 },
      description: "Integration timeout in milliseconds",
      table: { category: "Integration Features" },
    },
    integrationRetries: {
      control: { type: "number", min: 0, max: 10, step: 1 },
      description: "Number of retries for failed integration operations",
      table: { category: "Integration Features" },
    },
    integrationDelay: {
      control: { type: "number", min: 100, max: 5000, step: 100 },
      description: "Delay between retries in milliseconds",
      table: { category: "Integration Features" },
    },
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<typeof BcPhoneInput>;


export const Default: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showCountrySelect: true,
  },
};

export const WithCountrySelect: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    helperText: getText(defaultLocale, "helperText"),
    locale: defaultLocale,
  },
};

export const DifferentCountries: Story = {
  render: () => {
    const [country1, setCountry1] = useState("TR" as CountryCode);
    const [country2, setCountry2] = useState("US" as CountryCode);
    const [country3, setCountry3] = useState("DE" as CountryCode);
    const [country4, setCountry4] = useState("GB" as CountryCode);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country1}
          onCountryChange={setCountry1}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country2}
          onCountryChange={setCountry2}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country3}
          onCountryChange={setCountry3}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country4}
          onCountryChange={setCountry4}
          locale={defaultLocale}
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <BcPhoneInput
        label={getText(defaultLocale, "label")}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText={getText(defaultLocale, "helperText")}
        locale={defaultLocale}
      />
    );
  },
};

export const WithStatus: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    status: "info",
    statusMessage: getText(defaultLocale, "statusMessage"),
    helperText: getText(defaultLocale, "helperText"),
    locale: defaultLocale,
  },
};

export const Responsive: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    responsiveWidth: true,
    placeholder: getText(defaultLocale, "placeholder"),
    locale: defaultLocale,
  },
};

export const Disabled: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    disabled: true,
    defaultValue: "5551234567",
    helperText: getText(defaultLocale, "helperText"),
    locale: defaultLocale,
  },
};

export const WithClearButton: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    showClearButton: true,
    helperText: getText(defaultLocale, "helperText"),
    locale: defaultLocale,
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <BcPhoneInput
        label={getText(defaultLocale, "label")}
        value=""
        locale={defaultLocale}
      />
      <BcPhoneInput
        label={getText(defaultLocale, "label")}
        value={"5".repeat(20)}
        locale={defaultLocale}
      />
      <BcPhoneInput
        label={getText(defaultLocale, "label")}
        value=""
        country="DE"
        locale={defaultLocale}
      />
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
            <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>
              {appearance}
            </div>
            <BcPhoneInput
              label={getText(defaultLocale, "label")}
              appearance={appearance as any}
              country="TR"
              placeholder={getText(defaultLocale, "placeholder")}
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
    label: getText(defaultLocale, "label"),
    enableRTL: true,
    placeholder: getText(defaultLocale, "placeholder"),
    locale: defaultLocale,
  },
};

export const HighContrast: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    enableHighContrast: true,
    locale: defaultLocale,
  },
};

export const WithTranslations: Story = {
  args: {
    label: undefined,
    translations: {
      label: getText(defaultLocale, "label"),
      clearButtonLabel: getText(defaultLocale, "clearButtonLabel"),
      statusMessage: getText(defaultLocale, "invalidPhoneMessage"),
    },
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
  },
};

export const RHFPhoneInputExample: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const { control, setValue, watch } = useForm({
      defaultValues: {
        country: "TR" as CountryCode,
        phone: "+90",
      },
    });
    const country = watch("country") as CountryCode;
    const phone = watch("phone");
    const countryList = defaultCountryList;
    const selectedCountry = countryList.find((c) => c.code === country);
    const dial = selectedCountry ? `+${selectedCountry.dial}` : "";

    const handleCountryChange = (newCountry: CountryCode) => {
      const newDial = countryList.find((c) => c.code === newCountry)?.dial;
      setValue("country", newCountry);
      setValue("phone", `+${newDial}`);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      if (!val.startsWith(dial)) {
        val = dial + val.replace(/^\+\d+/, "");
      }
      setValue("phone", val);
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
              label={getText(locale, "label")}
              placeholder={getText(locale, "placeholder")}
              locale={locale}
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
    const [selectedCountry, setSelectedCountry] = React.useState("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";
    return (
      <BcPhoneInput
        {...args}
        label={args.label || (locale === "tr" ? "Telefon" : "Phone")}
        favoriteCountries={["TR", "US"]}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale={locale}
        placeholder={getText(locale, "placeholder")}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText("en", "favoritesAndRecentsStoryDescription"),
      },
    },
  },
};

// Çoklu BcPhoneInput örneği (örnek kullanım)
export const MultipleInputs = {
  render: (args: any, context: any) => {
    const defaultLocale = context?.globals?.locale ?? context?.locale ?? "en";
    const [country1, setCountry1] = React.useState<CountryCode>("TR");
    const [country2, setCountry2] = React.useState<CountryCode>("US");
    const [country3, setCountry3] = React.useState<CountryCode>("DE");
    const [country4, setCountry4] = React.useState<CountryCode>("GB");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country1}
          onCountryChange={(c) => setCountry1(c)}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country2}
          onCountryChange={(c) => setCountry2(c)}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country3}
          onCountryChange={(c) => setCountry3(c)}
          locale={defaultLocale}
        />
        <BcPhoneInput
          label={getText(defaultLocale, "label")}
          country={country4}
          onCountryChange={(c) => setCountry4(c)}
          locale={defaultLocale}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText("en", "multipleInputsStoryDescription"),
      },
    },
  },
};

// Büyük ülke listesiyle performans testi
export const PerformanceTest = {
  render: (args: any, context: any) => {
    const [countries, setCountries] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCountry, setSelectedCountry] = React.useState("TR");
    const [value, setValue] = React.useState("");
    const [renderTime, setRenderTime] = React.useState<number | null>(null);
    const locale = context?.globals?.locale ?? context?.locale ?? "en";
    React.useEffect(() => {
      const start = performance.now();
      // 1000 ülke simüle et
      const bigList = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        code: "TR" as string, // veya uygun kodlar
        name: { tr: `Ülke ${i + 1}`, en: `Country ${i + 1}` },
        flag: "🏳️",
        dial: 1000 + i,
        mask: "(999) 999-9999",
      }));
      // TR ve US başa ekle
      bigList.unshift(
        {
          id: 1001,
          code: "TR" as string,
          name: { tr: "Türkiye", en: "Turkey" },
          flag: "🇹🇷",
          dial: 90,
          mask: "(999) 999-9999",
        },
        {
          id: 1002,
          code: "US" as string,
          name: { tr: "Amerika", en: "United States" },
          flag: "🇺🇸",
          dial: 1,
          mask: "(999) 999-9999",
        }
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
          <b>{locale === "tr" ? "Ülke sayısı" : "Country count"}:</b>{" "}
          {countries.length}
          <br />
          <b>{locale === "tr" ? "Render süresi" : "Render time"}:</b>{" "}
          {renderTime !== null
            ? renderTime.toFixed(2) + " ms"
            : locale === "tr"
            ? "Hesaplanıyor..."
            : "Calculating..."}
        </div>
        <BcPhoneInput
          {...args}
          label={args.label || getText(locale, 'label')}
          countryList={countries}
          country={selectedCountry}
          onCountryChange={setSelectedCountry}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          locale={locale}
          placeholder={
            args.placeholder || getText(locale, 'placeholder')
          }
          disabled={loading}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText("en", "performanceTestStoryDescription"),
      },
    },
  },
};

// Async country loading example
export const AsyncCountryLoading = {
  render: (args: any, context: any) => {
    const [selectedCountry, setSelectedCountry] = React.useState("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";

    const fetchCountries = React.useCallback(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return defaultCountryList;
    }, []);

    return (
      <BcPhoneInput
        {...args}
        label={args.label || getText(locale, 'label')}
        fetchCountries={fetchCountries}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale={locale}
        placeholder={
          args.placeholder || getText(locale, 'placeholder')
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText("en", "asyncCountryLoadingStoryDescription"),
      },
    },
  },
};

// Custom validation example
export const CustomValidation = {
  render: (args: any, context: any) => {
    const [selectedCountry, setSelectedCountry] = React.useState("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";

    const validatePhone = React.useCallback(
      (phone: string, country: string) => {
        if (country === "TR") {
          return phone.length >= 10 && phone.startsWith("5");
        }
        if (country === "US") {
          return phone.length === 10;
        }
        return phone.length >= 8;
      },
      []
    );

    return (
      <BcPhoneInput
        {...args}
        label={args.label || getText(locale, 'label')}
        validatePhone={validatePhone}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale={locale}
        placeholder={
          args.placeholder || getText(locale, 'placeholder')
        }
        helperText={
          getText(locale, 'helperText')
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText("en", "customValidationStoryDescription"),
      },
    },
  },
};

// Advanced Monitoring Feature
export const AdvancedMonitoring: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          📊 {getText(locale, "advancedMonitoringDescription")}
        </div>
      </div>
    );
  },
};

// Mobile Optimizations Feature
export const MobileOptimizations: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          📱 {getText(locale, "mobileOptimizationsDescription")}
        </div>
      </div>
    );
  },
};

// Advanced i18n Feature
export const AdvancedI18n: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🌍 {getText(locale, "advancedI18nDescription")}
        </div>
      </div>
    );
  },
};

// Theme Aware Styles Feature
export const ThemeAwareStyles: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🎨 {getText(locale, "themeAwareStylesDescription")}
        </div>
      </div>
    );
  },
};

// Keyboard Shortcuts Feature
export const KeyboardShortcuts: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          ⌨️ {getText(locale, "keyboardShortcutsDescription")}
        </div>
      </div>
    );
  },
};

// All Advanced Features Combined
export const AllAdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🚀 {getText(locale, "allAdvancedFeaturesDescription")}
        </div>
      </div>
    );
  },
};

// New Professional Features
export const PhoneFormatting: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneFormattingLabel")}
          placeholder={getText(locale, "phoneFormattingPlaceholder")}
          enablePhoneFormatting={true}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          📱 {getText(locale, "phoneFormattingDescription")}
        </div>
      </div>
    );
  },
};

export const VoiceSearch: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "voiceSearchLabel")}
          placeholder={getText(locale, "voiceSearchPlaceholder")}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🎤 {getText(locale, "voiceSearchDescription")}
        </div>
      </div>
    );
  },
};

export const QRCodeIntegration: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "qrCodeIntegrationLabel")}
          placeholder={getText(locale, "qrCodeIntegrationPlaceholder")}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          📱 {getText(locale, "qrCodeIntegrationDescription")}
        </div>
      </div>
    );
  },
};

export const AdvancedValidation: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "advancedValidationLabel")}
          placeholder={getText(locale, "advancedValidationPlaceholder")}
          enableAdvancedValidation={true}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          ✅ {getText(locale, "advancedValidationDescription")}
        </div>
      </div>
    );
  },
};

export const AutoCountryDetection: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "autoCountryDetectionLabel")}
          placeholder={getText(locale, "autoCountryDetectionPlaceholder")}
          enableAutoCountryDetection={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🌍 {getText(locale, "autoCountryDetectionDescription")}
        </div>
      </div>
    );
  },
};

export const PhoneSuggestions: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneSuggestionsLabel")}
          placeholder={getText(locale, "phoneSuggestionsPlaceholder")}
          enablePhoneSuggestions={true}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          💡 {getText(locale, "phoneSuggestionsDescription")}
        </div>
      </div>
    );
  },
};

export const PhoneHistory: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneHistoryLabel")}
          placeholder={getText(locale, "phoneHistoryPlaceholder")}
          enablePhoneHistory={true}
          country="TR"
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          📚 {getText(locale, "phoneHistoryDescription")}
        </div>
      </div>
    );
  },
};

export const ProfessionalShowcase: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "professionalShowcaseLabel")}
          placeholder={getText(locale, "professionalShowcasePlaceholder")}
          enablePhoneFormatting={true}
          enableAdvancedValidation={true}
          enableAutoCountryDetection={true}
          enablePhoneSuggestions={true}
          enablePhoneHistory={true}
          country="TR"
          favoriteCountries={["TR", "US", "GB", "DE", "FR"]}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          🚀 {getText(locale, "professionalShowcaseDescription")}
        </div>
      </div>
    );
  },
};

// showCountrySelect ile mask placeholder örneği
export const WithCountrySelectAndMask: Story = {
  render: (args) => {
    const [selectedCountry, setSelectedCountry] = useState("TR" as CountryCode);
    const [phoneValue, setPhoneValue] = useState("");
    const locale = args.locale || "tr";

    // Ülke maskelerini tanımla
    const countryMasks = {
      TR: "(###) ### ## ##",
      US: "(###) ###-####",
      GB: "#### ### ####",
      DE: "### ########",
      FR: "## ## ## ## ##",
      IT: "### ### ####",
      ES: "### ## ## ##",
      NL: "## ########",
      CA: "(###) ###-####",
      AU: "#### ### ###",
      JP: "###-####-####",
      KR: "###-####-####",
      CN: "### #### ####",
      IN: "##### #####",
      BR: "(##) #####-####",
      RU: "(###) ###-##-##",
      SA: "## ### ####",
      AE: "## ### ####",
      EG: "## #### ####",
      ZA: "## ### ####",
    };

    // Seçilen ülkenin maskesini al
    const currentMask = countryMasks[selectedCountry as keyof typeof countryMasks] || "### ### ####";

    // Mask'i placeholder olarak formatla
    const maskPlaceholder = currentMask.replace(/#/g, "0");

    const handleCountryChange = (country: CountryCode) => {
      setSelectedCountry(country);
      setPhoneValue(""); // Ülke değiştiğinde telefon numarasını temizle
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneValue(e.target.value);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <BcPhoneInput
          {...args}
          country={selectedCountry}
          value={phoneValue}
          onChange={handlePhoneChange}
          placeholder={maskPlaceholder}
          showCountrySelect={true} // BcPhoneInput'un kendi country select'ini kullan
          onCountryChange={handleCountryChange}
          locale={locale}
          enablePhoneFormatting={true}
          getMask={() => countryMasks[selectedCountry as keyof typeof countryMasks] || "### ### ####"}
          sx={{
            width: "100%",
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "withCountrySelectAndMaskStoryDescription"),
      },
    },
  },
};

// enablePhoneFormatting prop story
export const WithPhoneFormatting: Story = {
  args: {
    label: getText(defaultLocale, "phoneFormattingLabel"),
    placeholder: getText(defaultLocale, "phoneFormattingPlaceholder"),
    enablePhoneFormatting: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enablePhoneFormattingStoryDescription"),
      },
    },
  },
};

// enableAdvancedValidation prop story
export const WithAdvancedValidation: Story = {
  args: {
    label: getText(defaultLocale, "advancedValidationLabel"),
    placeholder: getText(defaultLocale, "advancedValidationPlaceholder"),
    enableAdvancedValidation: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enableAdvancedValidationStoryDescription"),
      },
    },
  },
};

// enableAutoCountryDetection prop story
export const WithAutoCountryDetection: Story = {
  args: {
    label: getText(defaultLocale, "autoCountryDetectionLabel"),
    placeholder: getText(defaultLocale, "autoCountryDetectionPlaceholder"),
    enableAutoCountryDetection: true,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enableAutoCountryDetectionStoryDescription"),
      },
    },
  },
};

// enablePhoneSuggestions prop story
export const WithPhoneSuggestions: Story = {
  args: {
    label: getText(defaultLocale, "phoneSuggestionsLabel"),
    placeholder: getText(defaultLocale, "phoneSuggestionsPlaceholder"),
    enablePhoneSuggestions: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enablePhoneSuggestionsStoryDescription"),
      },
    },
  },
};

// enablePhoneHistory prop story
export const WithPhoneHistory: Story = {
  args: {
    label: getText(defaultLocale, "phoneHistoryLabel"),
    placeholder: getText(defaultLocale, "phoneHistoryPlaceholder"),
    enablePhoneHistory: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enablePhoneHistoryStoryDescription"),
      },
    },
  },
};

// getMask prop story
export const WithCustomMask: Story = {
  render: (args) => {
    const [phone, setPhone] = useState("");
    const locale = args.locale || "tr";

    const getMask = (country: string) => {
      const masks = {
        TR: "(###) ### ## ##",
        US: "(###) ###-####",
        GB: "#### ### ####",
        DE: "### ########",
        FR: "## ## ## ## ##",
      };
      return masks[country as keyof typeof masks] || "### ### ####";
    };

    return (
      <BcPhoneInput
        {...args}
        label={getText(locale, "label")}
        placeholder={getText(locale, "placeholder")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        getMask={getMask}
        enablePhoneFormatting={true}
        locale={locale}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "getMaskStoryDescription"),
      },
    },
  },
};

// showMaskInPlaceholder prop story
export const WithMaskInPlaceholder: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: "(000) 000 00 00",
    showMaskInPlaceholder: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "showMaskInPlaceholderStoryDescription"),
      },
    },
  },
};

// favoriteCountries prop story
export const WithFavoriteCountries: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    favoriteCountries: ["TR", "US", "GB", "DE", "FR"],
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "favoriteCountriesStoryDescription"),
      },
    },
  },
};

// fetchCountries prop story
export const WithAsyncCountryLoading: Story = {
  render: (args) => {
    const [phone, setPhone] = useState("");
    const locale = args.locale || "tr";

    const fetchCountries = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return defaultCountryList.slice(0, 10); // Return first 10 countries
    };

    return (
      <BcPhoneInput
        {...args}
        label={getText(locale, "label")}
        placeholder={getText(locale, "placeholder")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fetchCountries={fetchCountries}
        locale={locale}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "fetchCountriesStoryDescription"),
      },
    },
  },
};

// validatePhone prop story
export const WithCustomValidation: Story = {
  render: (args) => {
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("TR" as CountryCode);
    const locale = args.locale || "tr";

    const validatePhone = (phoneNumber: string, countryCode: CountryCode) => {
      let isValid = false;
      let errorMessage = "";
      
      if (countryCode === "TR") {
        // Turkish phone validation: should start with 5 and be 10 digits
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        isValid = cleanPhone.length === 10 && cleanPhone.startsWith("5");
        errorMessage = isValid ? "" : "Turkish phone numbers must start with 5 and be 10 digits";
      } else if (countryCode === "US") {
        // US phone validation: should be 10 digits
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        isValid = cleanPhone.length === 10;
        errorMessage = isValid ? "" : "US phone numbers must be 10 digits";
      } else {
        // Default validation
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        isValid = cleanPhone.length >= 10;
        errorMessage = isValid ? "" : "Phone number must be at least 10 digits";
      }
      
      return {
        isValid,
        errorMessage: isValid ? undefined : errorMessage,
        warningMessage: undefined,
        successMessage: isValid ? "Valid phone number" : undefined,
        rules: [
          {
            name: "country_specific",
            passed: isValid,
            message: errorMessage || "Valid phone number format"
          }
        ]
      };
    };

    return (
      <BcPhoneInput
        {...args}
        label={getText(locale, "label")}
        placeholder={getText(locale, "placeholder")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        country={country}
        onCountryChange={setCountry}
        validatePhone={validatePhone}
        locale={locale}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "validatePhoneStoryDescription"),
      },
    },
  },
};

// Enterprise Features Stories
export const WithAccessibility: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enableAccessibility: true,
    enableScreenReaderSupport: true,
    enableKeyboardNavigation: true,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFocusManagement: true,
    enableARIALabels: true,
    enableLiveRegions: true,
    enableSkipLinks: false,
    enableTooltips: true,
    enableErrorAnnouncements: true,
    enableStatusAnnouncements: true,
    enableProgressAnnouncements: true,
    country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "accessibilityStoryDescription"),
      },
    },
  },
};

export const WithPerformance: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enablePerformance: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "performanceStoryDescription"),
      },
    },
  },
};

export const WithMonitoring: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enableMonitoring: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "monitoringStoryDescription"),
      },
    },
  },
};

export const WithSmartFeatures: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enableSmartFeatures: true,
    enableSmartPlaceholder: true,
    enableSmartValidation: true,
    enableSmartSuggestions: true,
    enableSmartFormatting: true,
    enableSmartCountryDetection: true,
    enableLearning: true,
    enablePersonalization: true,
    enableContextualHelp: true,
    enableProgressiveDisclosure: true,
    enableAdaptiveUI: true,
    country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "smartFeaturesStoryDescription"),
      },
    },
  },
};

export const WithIntegration: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enableIntegration: true,
    integrationTimeout: 5000,
    integrationRetries: 3,
    integrationDelay: 1000,
    country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "integrationStoryDescription"),
      },
    },
  },
};

export const EnterpriseShowcase: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    enableAccessibility: true,
    enablePerformance: true,
    enableMonitoring: true,
    enableSmartFeatures: true,
    enableIntegration: true,
        country: "TR" as CountryCode,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "enterpriseShowcaseStoryDescription"),
      },
    },
  },
};