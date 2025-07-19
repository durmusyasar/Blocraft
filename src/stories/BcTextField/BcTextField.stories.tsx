import { Search } from "@mui/icons-material";
import { Box, Stack, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import React from "react";
import type { BcTextFieldProps } from "./BcTextField";
import { BcTextField } from "./BcTextField";
import { useForm, Controller } from 'react-hook-form';
import { Meta, StoryObj } from "@storybook/react/*";
import enTexts from '../i18n/i18n/en.json';
// @ts-ignore
import trTexts from '../i18n/i18n/tr.json';

const TEXTS: Record<string, Record<string, string>> = { en: enTexts.BcTextField, tr: trTexts.BcTextField };
type Locale = keyof typeof TEXTS;

const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || 'en';
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

// Storybook global locale decorator
const withLocale = (Story: any, context: any) => {
  const locale = context.locale || context.globals.locale;
  const storyProps = context.args || {};
  const hasLocale = storyProps.locale !== undefined;
  return <Story {...context} args={hasLocale ? storyProps : { ...storyProps, locale }} />;
};
// Get default locale from Storybook globals if available, else 'en'
const defaultLocale = (window as any)?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]?.globals?.locale || 'en';

const meta: Meta<BcTextFieldProps> = {
  title: "Components/BcTextField",
  component: BcTextField as any,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: getText(defaultLocale, 'componentDocsDescription'),
      },
    },
  },
  argTypes: {
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
    size: {
      description: getText(defaultLocale, 'sizeDescription'),
      control: "select",
      options: ["small", "medium", "normal", "large", undefined],
    },
    status: {
      description: getText(defaultLocale, 'statusDescription'),
      control: "select",
      options: ["error", "warning", "success", "info", undefined],
    },
    color: {
      description: getText(defaultLocale, 'colorDescription'),
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    responsiveWidth: {
      description: getText(defaultLocale, 'responsiveWidthDescription'),
      control: "boolean",
    },
    showClearButton: {
      description: getText(defaultLocale, 'showClearButtonDescription'),
      control: "boolean",
    },
    loading: {
      description: getText(defaultLocale, 'loadingDescription'),
      control: "boolean",
    },
    disabled: {
      description: getText(defaultLocale, 'disabledDescription'),
      control: "boolean",
    },
    type: {
      description: getText(defaultLocale, 'typeDescription'),
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    label: {
      description: getText(defaultLocale, 'labelDescription'),
      control: "text",
    },
    placeholder: {
      description: getText(defaultLocale, 'placeholderDescription'),
      control: "text",
    },
    helperText: {
      description: getText(defaultLocale, 'helperTextDescription'),
      control: "text",
    },
    error: {
      description: getText(defaultLocale, 'errorDescription'),
      control: "boolean",
    },
    statusMessage: {
      description: getText(defaultLocale, 'statusMessageDescription'),
      control: "text",
    },
    onClear: {
      description: getText(defaultLocale, 'onClearDescription'),
      action: "cleared",
    },
    onChange: {
      description: getText(defaultLocale, 'onChangeDescription'),
      action: "changed",
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
    enableAsyncValidation: {
      description: getText(defaultLocale, 'enableAsyncValidationDescription'),
      control: "boolean",
    },
    validateInput: {
      description: getText(defaultLocale, 'validateInputDescription'),
      control: false,
    },
    showValidationStatus: {
      description: getText(defaultLocale, 'showValidationStatusDescription'),
      control: "boolean",
    },
    validationDebounceMs: {
      description: getText(defaultLocale, 'validationDebounceMsDescription'),
      control: "number",
    },
    monitoring: {
      description: getText(defaultLocale, 'monitoringDescription'),
      control: false,
    },
    renderCustomIcon: {
      description: getText(defaultLocale, 'renderCustomIconDescription'),
      control: false,
    },
    renderHelperText: {
      description: getText(defaultLocale, 'renderHelperTextDescription'),
      control: false,
    },
    enableHighContrast: {
      description: getText(defaultLocale, 'enableHighContrastDescription'),
      control: "boolean",
    },
    enableReducedMotion: {
      description: getText(defaultLocale, 'enableReducedMotionDescription'),
      control: "boolean",
    },
    enableRTL: {
      description: getText(defaultLocale, 'enableRTLDescription'),
      control: "boolean",
    },
    fontSize: {
      description: getText(defaultLocale, 'fontSizeDescription'),
      control: "number",
    },
    autoFocus: {
      description: getText(defaultLocale, 'autoFocusDescription'),
      control: "boolean",
    },
    autoComplete: {
      description: getText(defaultLocale, 'autoCompleteDescription'),
      control: "text",
    },
    inputMode: {
      description: getText(defaultLocale, 'inputModeDescription'),
      control: "text",
    },
    pattern: {
      description: getText(defaultLocale, 'patternDescription'),
      control: "text",
    },
    maxLength: {
      description: getText(defaultLocale, 'maxLengthDescription'),
      control: "number",
    },
    minLength: {
      description: getText(defaultLocale, 'minLengthDescription'),
      control: "number",
    },
    spellCheck: {
      description: getText(defaultLocale, 'spellCheckDescription'),
      control: "boolean",
    },
    inputComponent: {
      description: getText(defaultLocale, 'inputComponentDescription'),
      control: false,
    },
    inputPrefix: {
      description: getText(defaultLocale, 'inputPrefixDescription'),
      control: "text",
    },
    inputSuffix: {
      description: getText(defaultLocale, 'inputSuffixDescription'),
      control: "text",
    },
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<BcTextFieldProps>;

// Temel kullanım
export const Default: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale;
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        helperText={getText(locale, 'helperText')}
        locale={locale}
      />
    );
  },
};

// Tüm görünümler
export const AllAppearances: Story = {
  render: (args: any) => (
    <Stack spacing={2}>
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
        <BcTextField
          key={appearance}
          {...args}
          appearance={appearance as any}
          label={appearance.charAt(0).toUpperCase() + appearance.slice(1)}
          placeholder={appearance}
        />
      ))}
    </Stack>
  ),
};

// Boyutlar
export const Sizes: Story = {
  render: (args: any) => (
    <Stack spacing={2} direction="row" alignItems="baseline">
      {["small", "medium", "normal", "large"].map((size) => (
        <BcTextField
          key={size}
          {...args}
          size={size as any}
          label={size.charAt(0).toUpperCase() + size.slice(1)}
          placeholder={size}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      ))}
    </Stack>
  ),
};

// Durumlar
export const Statuses: Story = {
  render: (args: any, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <Stack spacing={2}>
        {[
          { status: "error", statusMessage: getText(locale, 'statusError') + ': ' + getText(locale, 'statusMessage') },
          { status: "warning", statusMessage: getText(locale, 'statusWarning') + ': ' + getText(locale, 'statusMessage') },
          { status: "success", statusMessage: getText(locale, 'statusSuccess') + '!' },
          { status: "info", statusMessage: getText(locale, 'statusInfo') + ': ' + getText(locale, 'statusMessage') },
        ].map((s: { status: string; statusMessage: string }) => (
          <BcTextField
            key={s.status}
            {...args}
            label={s.status.charAt(0).toUpperCase() + s.status.slice(1)}
            status={s.status as BcTextFieldProps["status"]}
            statusMessage={s.statusMessage}
            placeholder={s.status}
            style={{ height: "auto" }}
            locale={locale}
          />
        ))}
      </Stack>
    );
  },
};

// Renkler
export const Colors: Story = {
  render: (args: any) => (
    <Stack spacing={2}>
      {[
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
      ].map((color) => (
        <BcTextField
          key={color}
          {...args}
          color={color as any}
          label={color.charAt(0).toUpperCase() + color.slice(1)}
          placeholder={color}
        />
      ))}
    </Stack>
  ),
};

// Yükleme durumu
export const Loading: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'loading')}
        placeholder={getText(locale, 'loading')}
        helperText={getText(locale, 'helperText')}
        locale={locale}
      />
    );
  },
};

// Şifre alanı
export const Password: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'password')}
        placeholder={getText(locale, 'password')}
        helperText={getText(locale, 'helperText')}
        locale={locale}
      />
    );
  },
};

// E-posta alanı
export const Email: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'emailValidation')}
        placeholder={getText(locale, 'emailValidation')}
        helperText={getText(locale, 'helperText')}
        locale={locale}
      />
    );
  },
};

// Temizleme butonu ile
export const WithClearButton: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        helperText={getText(locale, 'helperText')}
        showClearButton
        locale={locale}
      />
    );
  },
};

// Responsive genişlik
export const Responsive: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'responsive')}
        placeholder={getText(locale, 'responsive')}
        helperText={getText(locale, 'helperText')}
        responsiveWidth
        locale={locale}
      />
    );
  },
};

// Devre dışı durumu
export const Disabled: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'disabled')}
        placeholder={getText(locale, 'disabled')}
        helperText={getText(locale, 'helperText')}
        disabled
        locale={locale}
      />
    );
  },
};

// Hata durumu
export const WithError: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'statusError')}
        placeholder={getText(locale, 'statusError')}
        helperText={getText(locale, 'statusMessage')}
        error
        locale={locale}
      />
    );
  },
};

// Yardım metni ile
export const WithHelperText: Story = {
  render: (args, context) => {
    const locale = context?.globals?.locale ?? context?.locale ?? 'en';
    return (
      <BcTextField
        {...args}
        label={getText(locale, 'usernameValidation')}
        placeholder={getText(locale, 'usernameValidation')}
        helperText={getText(locale, 'minInput')}
        locale={locale}
      />
    );
  },
};

// Başlangıç adornment ile
export const WithStartAdornment: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    placeholder: getText(defaultLocale, 'placeholder'),
    helperText: getText(defaultLocale, 'helperText'),
    slotProps: {
      input: {
        startAdornment: <Search fontSize="small" />,
      },
    },
    locale: defaultLocale,
  },
};

// Özel end adornment
export const CustomEndAdornment: Story = {
  args: {
    label: getText(defaultLocale, 'customExport'),
    placeholder: getText(defaultLocale, 'customExport'),
    helperText: getText(defaultLocale, 'helperText'),
    renderEndAdornment: (defaultAdornment: React.ReactNode) => (
      <span style={{ color: '#1976d2' }}>Custom</span>
    ),
    locale: defaultLocale,
  },
};

// Çok satırlı
export const Multiline: Story = {
  args: {
    label: getText(defaultLocale, 'playgroundDocsDescription'),
    placeholder: getText(defaultLocale, 'playgroundDocsDescription'),
    helperText: getText(defaultLocale, 'helperText'),
    multiline: true,
    rows: 4,
    locale: defaultLocale,
  },
};

// Sayısal input
export const Number: Story = {
  args: {
    label: getText(defaultLocale, 'number'),
    placeholder: getText(defaultLocale, 'number'),
    helperText: getText(defaultLocale, 'minInput'),
    type: 'number',
    locale: defaultLocale,
  },
};

// URL input
export const URL: Story = {
  args: {
    label: getText(defaultLocale, 'url'),
    placeholder: 'https://example.com',
    helperText: getText(defaultLocale, 'helperText'),
    type: 'url',
    locale: defaultLocale,
  },
};

// Telefon input
export const Phone: Story = {
  args: {
    label: getText(defaultLocale, 'phone'),
    placeholder: '+90 555 123 4567',
    helperText: getText(defaultLocale, 'helperText'),
    type: 'tel',
    locale: defaultLocale,
  },
};

// Gelişmiş örnekler
export const AdvancedExamples: Story = {
  render: () => (
    <Stack spacing={3}>
      {/* Premium görünüm ile e-posta */}
      <BcTextField
        label={getText(defaultLocale, 'premium')}
        type="email"
        appearance="premium"
        color="primary"
        showClearButton
        placeholder={getText(defaultLocale, 'emailValidation')}
        helperText={getText(defaultLocale, 'playgroundHelperText')}
        locale={defaultLocale}
      />

      {/* Glass görünüm ile şifre */}
      <BcTextField
        label={getText(defaultLocale, 'glass')}
        type="password"
        appearance="glass"
        color="secondary"
        showClearButton
        placeholder={getText(defaultLocale, 'password')}
        helperText={getText(defaultLocale, 'playgroundHelperText')}
        locale={defaultLocale}
      />

      {/* Neumorph görünüm ile arama */}
      <BcTextField
        label={getText(defaultLocale, 'neumorph')}
        appearance="neumorph"
        color="info"
        showClearButton
        placeholder={getText(defaultLocale, 'label')}
        slotProps={{
          input: {
            startAdornment: <span>🔍</span>,
          },
        }}
        helperText={getText(defaultLocale, 'playgroundHelperText')}
        locale={defaultLocale}
      />

      {/* Dark görünüm ile çok satırlı */}
      <BcTextField
        label={getText(defaultLocale, 'dark')}
        appearance="dark"
        color="warning"
        multiline
        rows={3}
        placeholder={getText(defaultLocale, 'playgroundDocsDescription')}
        helperText={getText(defaultLocale, 'playgroundHelperText')}
        locale={defaultLocale}
      />
    </Stack>
  ),
};

// Form örneği
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <Box sx={{ maxWidth: 400, p: 2 }}>
        <Stack spacing={2}>
          <BcTextField
            label={getText(defaultLocale, 'label')}
            value={formData.name}
            onChange={handleChange("name")}
            placeholder={getText(defaultLocale, 'label')}
            appearance="premium"
            showClearButton
            locale={defaultLocale}
          />
          
          <BcTextField
            label={getText(defaultLocale, 'emailValidation')}
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder={getText(defaultLocale, 'emailValidation')}
            appearance="soft"
            showClearButton
            locale={defaultLocale}
          />
          
          <BcTextField
            label={getText(defaultLocale, 'password')}
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            placeholder={getText(defaultLocale, 'password')}
            appearance="glass"
            showClearButton
            locale={defaultLocale}
          />
          
          <BcTextField
            label={getText(defaultLocale, 'password') + ' ' + getText(defaultLocale, 'again')}
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder={getText(defaultLocale, 'password') + ' ' + getText(defaultLocale, 'again')}
            appearance="glass"
            showClearButton
            status={formData.password !== formData.confirmPassword && formData.confirmPassword ? "error" : undefined}
            statusMessage={formData.password !== formData.confirmPassword && formData.confirmPassword ? getText(defaultLocale, 'statusError') : undefined}
            locale={defaultLocale}
          />
        </Stack>
      </Box>
    );
  },
};

// --- Gelişmiş örnekler ---
export const I18nExample: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    placeholder: getText(defaultLocale, 'placeholder'),
    translations: { clearButtonLabel: getText(defaultLocale, 'clearButtonLabel'), helperText: getText(defaultLocale, 'helperText') },
    locale: defaultLocale,
    showClearButton: true,
    helperText: getText(defaultLocale, 'helperText'),
  },
};

export const AsyncValidationExample: Story = {
  args: {
    label: getText(defaultLocale, 'usernameValidation'),
    placeholder: getText(defaultLocale, 'minInput'),
    enableAsyncValidation: true,
    validateInput: async (v: string) => v.length > 2 ? { isValid: true, type: 'success', message: getText(defaultLocale, 'statusSuccess') } : { isValid: false, type: 'error', message: getText(defaultLocale, 'minInput') },
    showValidationStatus: true,
    validationDebounceMs: 300,
    helperText: getText(defaultLocale, 'minInput'),
    locale: defaultLocale,
  },
};

export const MonitoringExample: Story = {
  args: {
    label: getText(defaultLocale, 'monitoringDescription'),
    placeholder: getText(defaultLocale, 'monitoringDescription'),
    monitoring: {
      onChange: (v: string) => { console.log('Changed:', v); },
      onError: (e: Error) => { console.error('Error:', e); },
    },
    showClearButton: true,
    locale: defaultLocale,
  },
};

export const CustomRenderExample: Story = {
  args: {
    label: getText(defaultLocale, 'customExport'),
    placeholder: getText(defaultLocale, 'customExport'),
    status: 'success',
    statusMessage: getText(defaultLocale, 'statusSuccess'),
    renderCustomIcon: (status: string) => status === 'success' ? <span role="img" aria-label="success">🎉</span> : undefined,
    renderHelperText: (helper: React.ReactNode) => <span style={{ color: 'purple' }}>{helper}</span>,
    helperText: 'Custom helperText',
    locale: defaultLocale,
  },
};

export const AccessibilityExample: Story = {
  args: {
    label: "Erişilebilirlik",
    placeholder: "High contrast, reduced motion, RTL",
    enableHighContrast: true,
    enableReducedMotion: true,
    enableRTL: true,
    fontSize: 20,
    showClearButton: true,
  },
};

// Native input özellikleri örneği
export const NativeInputFeatures: Story = {
  args: {
    label: getText(defaultLocale, 'phone'),
    placeholder: '5xx xxx xx xx',
    autoFocus: false,
    autoComplete: 'tel',
    inputMode: 'tel',
    pattern: '[0-9]{10,11}',
    maxLength: 11,
    minLength: 10,
    spellCheck: false,
    locale: defaultLocale,
  },
};

// React Hook Form ile entegrasyon örneği
export const FormIntegration: Story = {
  render: () => {
    const { control, handleSubmit } = useForm();
    const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2));
    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, padding: 16 }}>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <BcTextField
              {...field}
              label={getText(defaultLocale, 'label')}
              placeholder={getText(defaultLocale, 'placeholder')}
              showClearButton
              locale={defaultLocale}
            />
          )}
        />
        <button type="submit" style={{ marginTop: 16 }}>Submit</button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'React Hook Form integration example with BcTextField.'
      }
    }
  }
};

export const PrefixSuffix: Story = {
  args: {
    label: getText(defaultLocale, 'phone'),
    placeholder: '5xx xxx xx xx',
    inputPrefix: <span style={{ color: '#888', marginRight: 4 }}>+90</span>,
    inputSuffix: <span style={{ color: '#888', marginLeft: 4 }}>.tr</span>,
    locale: defaultLocale,
  },
  parameters: {
    docs: {
      description: {
        story: 'inputPrefix and inputSuffix allow custom content at the start and end of the input.'
      }
    }
  }
};

export const ThemeModes: Story = {
  render: () => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ mb: 2 }}>
          <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </Box>
        <Stack spacing={2}>
          {["premium","soft","glass","minimal","neumorph","underline","dark","borderless"].map((appearance) => (
            <BcTextField
              key={appearance}
              appearance={appearance as any}
              label={appearance.charAt(0).toUpperCase() + appearance.slice(1)}
              placeholder={appearance}
              helperText={mode === 'dark' ? 'Dark mode' : 'Light mode'}
              locale={defaultLocale}
            />
          ))}
        </Stack>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All appearance variations in light and dark mode. You can switch theme with the button above.'
      }
    }
  }
};

export const Performance: Story = {
  render: () => {
    const [renderTime, setRenderTime] = React.useState<number | null>(null);
    React.useEffect(() => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        setRenderTime(end - start);
      };
    }, []);
    const [values, setValues] = React.useState(() => Array(100).fill(''));
    const handleChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(v => {
        const copy = [...v];
        copy[i] = e.target.value;
        return copy;
      });
    };
    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <b>{getText(defaultLocale, 'performanceTotalInputs')}:</b> 100<br />
          <b>{getText(defaultLocale, 'performanceRenderTime')}:</b> {renderTime !== null ? renderTime.toFixed(2) + ' ms' : getText(defaultLocale, 'performanceCalculating')}
        </Box>
        <Stack spacing={1}>
          {values.map((val, i) => (
            <BcTextField
              key={i}
              label={getText(defaultLocale, 'label') + ' ' + (i + 1)}
              value={val}
              onChange={handleChange(i)}
              appearance={i % 8 === 0 ? 'premium' : i % 8 === 1 ? 'soft' : i % 8 === 2 ? 'glass' : i % 8 === 3 ? 'minimal' : i % 8 === 4 ? 'neumorph' : i % 8 === 5 ? 'underline' : i % 8 === 6 ? 'dark' : 'borderless'}
              size={i % 4 === 0 ? 'small' : i % 4 === 1 ? 'medium' : i % 4 === 2 ? 'normal' : 'large'}
              helperText={getText(defaultLocale, 'helperText') + ' ' + (i + 1)}
              locale={defaultLocale}
            />
          ))}
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, 'performanceStory')
      }
    }
  }
};
