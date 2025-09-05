import { Meta, StoryObj } from "@storybook/react/*";
import { BcPasswordInput } from './BcPasswordInput';
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';

const TEXTS: Record<string, Record<string, string>> = { en: enTexts.BcPasswordInput, tr: trTexts.BcPasswordInput };
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
const defaultLocale = (window as any)?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]?.globals?.locale || 'en';


const meta: Meta<typeof BcPasswordInput> = {
  title: 'Components/BcPasswordInput',
  component: BcPasswordInput,
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
      control: 'text',
      description: getText(defaultLocale, 'labelDescription'),
    },
    placeholder: {
      control: 'text',
      description: getText(defaultLocale, 'placeholderDescription'),
    },
    showStrengthBar: {
      control: 'boolean',
      description: getText(defaultLocale, 'showStrengthBarDescription'),
    },
    minLength: {
      control: { type: 'number', min: 1, max: 50 },
      description: getText(defaultLocale, 'minLengthDescription'),
    },
    requireUppercase: {
      control: 'boolean',
      description: getText(defaultLocale, 'requireUppercaseDescription'),
    },
    requireLowercase: {
      control: 'boolean',
      description: getText(defaultLocale, 'requireLowercaseDescription'),
    },
    requireNumber: {
      control: 'boolean',
      description: getText(defaultLocale, 'requireNumberDescription'),
    },
    requireSpecial: {
      control: 'boolean',
      description: getText(defaultLocale, 'requireSpecialDescription'),
    },
    showPasswordToggle: {
      control: 'boolean',
      description: getText(defaultLocale, 'showPasswordToggleDescription'),
    },
    showCopyButton: {
      control: 'boolean',
      description: getText(defaultLocale, 'showCopyButtonDescription'),
    },
    useZxcvbnStrength: {
      control: 'boolean',
      description: getText(defaultLocale, 'useZxcvbnStrengthDescription'),
    },
    enableAsyncValidation: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableAsyncValidationDescription'),
    },
    showValidationStatus: {
      control: 'boolean',
      description: getText(defaultLocale, 'showValidationStatusDescription'),
    },
    validationDebounceMs: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: getText(defaultLocale, 'validationDebounceMsDescription'),
    },
    locale: {
      control: 'select',
      options: ['en', 'tr'],
      description: getText(defaultLocale, 'localeDescription'),
    },
    appearance: {
      control: 'select',
      options: ['premium', 'soft', 'glass', 'minimal', 'neumorph', 'underline', 'dark', 'borderless'],
      description: getText(defaultLocale, 'appearanceDescription'),
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: getText(defaultLocale, 'sizeDescription'),
    },
    status: {
      control: 'select',
      options: ['error', 'warning', 'success', 'info'],
      description: getText(defaultLocale, 'statusDescription'),
    },
    disabled: {
      control: 'boolean',
      description: getText(defaultLocale, 'disabledDescription'),
    },
    loading: {
      control: 'boolean',
      description: getText(defaultLocale, 'loadingDescription'),
    },
    responsiveWidth: {
      control: 'boolean',
      description: getText(defaultLocale, 'responsiveWidthDescription'),
    },
    onStrengthChange: {
      description: getText(defaultLocale, 'onStrengthChangeDescription'),
      action: 'strengthChanged',
    },
    onChange: {
      description: getText(defaultLocale, 'onChangeDescription'),
      action: 'changed',
    },
    onClear: {
      description: getText(defaultLocale, 'onClearDescription'),
      action: 'cleared',
    },
    translations: {
      description: getText(defaultLocale, 'translationsDescription'),
      control: 'object',
    },
    fallbackLocale: {
      description: getText(defaultLocale, 'fallbackLocaleDescription'),
      control: 'text',
    },
    monitoring: {
      description: getText(defaultLocale, 'monitoringDescription'),
      control: false,
    },
    // Yeni gelişmiş özellikler
    enablePasswordGenerator: {
      control: 'boolean',
      description: getText(defaultLocale, 'enablePasswordGeneratorDescription'),
    },
    enableBreachCheck: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableBreachCheckDescription'),
    },
    enableKeyboardShortcuts: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableKeyboardShortcutsDescription'),
    },
    enableAdvancedScoring: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableAdvancedScoringDescription'),
    },
    enableThemeAwareStyles: {
      control: 'boolean',
      description: getText(defaultLocale, 'enableThemeAwareStylesDescription'),
    },
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
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<typeof BcPasswordInput>;

// Default story
export const Default: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <BcPasswordInput
        {...args}
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        locale={locale}
      />
    );
  },
};

// With different appearances
export const Appearances: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          <BcPasswordInput
            key={appearance}
            label={getText(locale, 'label')}
            appearance={appearance as any}
            placeholder={getText(locale, 'placeholder')}
            locale={locale}
          />
        ))}
      </div>
    );
  },
};

// With different sizes
export const Sizes: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {["small", "normal", "large"].map((size) => (
          <BcPasswordInput
            key={size}
            label={getText(locale, 'label')}
            size={size as any}
            placeholder={getText(locale, 'placeholder')}
            locale={locale}
          />
        ))}
      </div>
    );
  },
};

// With different statuses
export const Statuses: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { status: "error", statusMessage: getText(locale, 'statusMessage') },
        { status: "warning", statusMessage: getText(locale, 'statusMessage') },
        { status: "success", statusMessage: getText(locale, 'statusMessage') },
        { status: "info", statusMessage: getText(locale, 'statusMessage') },
      ].map((s: { status: string; statusMessage: string }) => (
        <BcPasswordInput
          key={s.status}
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          status={s.status as any}
          statusMessage={s.statusMessage}
          locale={locale}
        />
      ))}
    </div>
    );
  },
};

// With different password requirements
export const PasswordRequirements: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        minLength={6}
        requireUppercase={false}
        requireLowercase={false}
        requireNumber={false}
        requireSpecial={false}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        minLength={8}
        requireUppercase={true}
        requireLowercase={true}
        requireNumber={true}
        requireSpecial={false}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        minLength={12}
        requireUppercase={true}
        requireLowercase={true}
        requireNumber={true}
        requireSpecial={true}
        locale={locale}
      />
    </div>
    );
  },
};

// With custom rules
export const CustomRules: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        customRules={[
          {
            key: 'noCommonWords',
            label: locale === 'tr' ? 'Yaygın kelimeler yok' : 'No common words',
            test: (password) => !password.toLowerCase().includes('password'),
          },
          {
            key: 'noSequential',
            label: locale === 'tr' ? 'Ardışık karakterler yok' : 'No sequential characters',
            test: (password) => !password.includes('123') && !password.includes('abc'),
          },
          {
            key: 'noRepeating',
            label: locale === 'tr' ? 'Tekrarlanan karakterler yok' : 'No repeating characters',
            test: (password) => !/(.)\1{2,}/.test(password),
          },
        ]}
        locale={locale}
      />
    </div>
    );
  },
};

// With zxcvbn strength
export const ZxcvbnStrength: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        useZxcvbnStrength={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        useZxcvbnStrength={false}
        locale={locale}
      />
    </div>
    );
  },
};

// With async validation
export const AsyncValidation: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const validatePassword = async (password: string) => {
      // Simulate API call with abort signal
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      
      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 1000);
          controller.signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('AbortError'));
          });
        });
        
        if (password.length < 8) {
          return { 
            isValid: false, 
            message: locale === 'tr' ? 'Şifre en az 8 karakter olmalı' : 'Password must be at least 8 characters' 
          };
        }
        
        if (!password.match(/[A-Z]/)) {
          return { 
            isValid: false, 
            message: locale === 'tr' ? 'Şifre büyük harf içermeli' : 'Password must contain uppercase letter' 
          };
        }
        
        if (!password.match(/[a-z]/)) {
          return { 
            isValid: false, 
            message: locale === 'tr' ? 'Şifre küçük harf içermeli' : 'Password must contain lowercase letter' 
          };
        }
        
        if (!password.match(/[0-9]/)) {
          return { 
            isValid: false, 
            message: locale === 'tr' ? 'Şifre rakam içermeli' : 'Password must contain number' 
          };
        }
        
        return { 
          isValid: true, 
          message: locale === 'tr' ? 'Şifre geçerli' : 'Password is valid' 
        };
      } catch (error) {
        if (error instanceof Error && error.message === 'AbortError') {
          throw error; // Re-throw AbortError
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAsyncValidation={true}
          validatePassword={validatePassword}
          showValidationStatus={true}
          validationDebounceMs={500}
          locale={locale}
        />
      </div>
    );
  },
};

// With monitoring
export const Monitoring: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const monitoring = {
      onChange: (value: string) => console.log('onChange', value),
      onStrengthChange: (strength: number) => console.log('onStrengthChange', strength),
      onError: (error: Error) => console.log('onError', error),
      onPerformance: (metrics: any) => console.log('onPerformance', metrics),
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          monitoring={monitoring}
          locale={locale}
        />
      </div>
    );
  },
};

// With different states
export const States: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        disabled={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        loading={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        showClearButton={true}
        locale={locale}
      />
    </div>
    );
  },
};

// With different button configurations
export const ButtonConfigurations: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        showPasswordToggle={true}
        showCopyButton={true}
        showClearButton={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        showPasswordToggle={false}
        showCopyButton={true}
        showClearButton={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        showPasswordToggle={true}
        showCopyButton={false}
        showClearButton={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        showPasswordToggle={false}
        showCopyButton={false}
        showClearButton={false}
        locale={locale}
      />
    </div>
    );
  },
};

// Internationalization
export const Internationalization: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText('en', 'label')}
        placeholder={getText('en', 'placeholder')}
        locale="en"
      />
      <BcPasswordInput
        label={getText('tr', 'label')}
        placeholder={getText('tr', 'placeholder')}
        locale="tr"
      />
      <BcPasswordInput
        label={getText('en', 'label')}
        placeholder={getText('en', 'placeholder')}
        translations={{
          label: getText('tr', 'label'),
          placeholder: getText('tr', 'placeholder'),
          showPassword: getText('tr', 'showPassword'),
          hidePassword: getText('tr', 'hidePassword'),
          copyPassword: getText('tr', 'copyPassword'),
          copied: getText('tr', 'copied'),
        }}
        locale="tr"
      />
    </div>
  ),
};

// Responsive design
export const Responsive: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: '600px' }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        responsiveWidth={true}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        responsiveWidth={false}
        locale={locale}
      />
    </div>
    );
  },
};

// Edge cases
export const EdgeCases: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        value=""
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        value={'a'.repeat(100)}
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        value="Test123!@#$%^&*()_+-=[]{}|;:,.<>?"
        locale={locale}
      />
      <BcPasswordInput
        label={getText(locale, 'label')}
        placeholder={getText(locale, 'placeholder')}
        value="Test123!🚀🌟💫"
        locale={locale}
      />
    </div>
    );
  },
};

// Performance test
export const PerformanceTest: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const startTime = performance.now();
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {locale === 'tr' ? 'Render süresi' : 'Render time'}: {Math.round(performance.now() - startTime)}ms
        </div>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          locale={locale}
        />
      </div>
    );
  },
};

// Form integration
export const FormIntegration: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log('formSubmit', Object.fromEntries(formData));
    };

    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          name="password"
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          required
          locale={locale}
        />
        <BcPasswordInput
          name="confirmPassword"
          label={getText(locale, 'label') + (locale === 'tr' ? ' (Onayla)' : ' (Confirm)')}
          placeholder={getText(locale, 'placeholder') + (locale === 'tr' ? ' (Onayla)' : ' (Confirm)')}
          required
          locale={locale}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          {locale === 'tr' ? 'Gönder' : 'Submit'}
        </button>
      </form>
    );
  },
};

// RTL, High Contrast, Disabled
export const RTLHighContrastDisabled: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableRTL={true}
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableHighContrast={true}
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          disabled={true}
          defaultValue="disabled123"
          locale={locale}
        />
      </div>
    );
  },
};

// Advanced Features
export const AdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          showStrengthBar={true}
          useZxcvbnStrength={true}
          showPasswordToggle={true}
          showCopyButton={true}
          showClearButton={true}
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAsyncValidation={true}
          showValidationStatus={true}
          validatePassword={async (password) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { isValid: password.length >= 8, message: password.length >= 8 ? 'Valid' : 'Too short' };
          }}
          locale={locale}
        />
      </div>
    );
  },
};

// Custom Rules Advanced
export const CustomRulesAdvanced: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          customRules={[
            {
              key: 'noCommonWords',
              label: locale === 'tr' ? 'Yaygın kelimeler yok' : 'No common words',
              test: (password) => !password.toLowerCase().includes('password') && !password.toLowerCase().includes('123456'),
            },
            {
              key: 'noSequential',
              label: locale === 'tr' ? 'Ardışık karakterler yok' : 'No sequential characters',
              test: (password) => !password.includes('123') && !password.includes('abc') && !password.includes('qwe'),
            },
            {
              key: 'noRepeating',
              label: locale === 'tr' ? 'Tekrarlanan karakterler yok' : 'No repeating characters',
              test: (password) => !/(.)\1{2,}/.test(password),
            },
            {
              key: 'noPersonalInfo',
              label: locale === 'tr' ? 'Kişisel bilgi yok' : 'No personal information',
              test: (password) => !password.toLowerCase().includes('john') && !password.toLowerCase().includes('doe'),
            },
          ]}
          locale={locale}
        />
      </div>
    );
  },
};

// Monitoring and Analytics
export const MonitoringAnalytics: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const monitoring = {
      onChange: (value: string) => console.log('Password changed:', value.length, 'characters'),
      onStrengthChange: (strength: number) => console.log('Strength changed:', strength),
      onError: (error: Error) => console.error('Password error:', error),
      onPerformance: (metrics: any) => console.log('Performance metrics:', metrics),
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          monitoring={monitoring}
          showStrengthBar={true}
          locale={locale}
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          {locale === 'tr' ? 'Konsola bakın - tüm etkileşimler loglanıyor' : 'Check console - all interactions are logged'}
        </div>
      </div>
    );
  },
};

// Accessibility Features
export const AccessibilityFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          showStrengthBar={true}
          helperText={locale === 'tr' ? 'Ekran okuyucu için optimize edilmiş' : 'Optimized for screen readers'}
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableHighContrast={true}
          helperText={locale === 'tr' ? 'Yüksek kontrast modu' : 'High contrast mode'}
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableReducedMotion={true}
          helperText={locale === 'tr' ? 'Azaltılmış animasyon' : 'Reduced motion'}
          locale={locale}
        />
      </div>
    );
  },
};

// Theme Integration
export const ThemeIntegration: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          color="primary"
          appearance="premium"
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          color="secondary"
          appearance="soft"
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          color="success"
          appearance="glass"
          locale={locale}
        />
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          color="error"
          appearance="minimal"
          locale={locale}
        />
      </div>
    );
  },
};

// Password Generator Feature
export const PasswordGenerator: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enablePasswordGenerator={true}
          showStrengthBar={true}
          useZxcvbnStrength={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          💡 {getText(locale, 'passwordGeneratorDescription')}
        </div>
      </div>
    );
  },
};

// Breach Check Feature
export const BreachCheck: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableBreachCheck={true}
          showStrengthBar={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🔍 {getText(locale, 'breachCheckDescription')}
        </div>
      </div>
    );
  },
};

// Advanced Scoring Feature
export const AdvancedScoring: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAdvancedScoring={true}
          showStrengthBar={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          📊 {getText(locale, 'advancedScoringDescription')}
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
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableKeyboardShortcuts={true}
          showStrengthBar={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          ⌨️ {getText(locale, 'keyboardShortcutsDescription')}
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
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableMobileOptimizations={true}
          showStrengthBar={true}
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
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enableAdvancedI18n={true}
          showStrengthBar={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🌍 {getText(locale, 'advancedI18nDescription')}
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
        <BcPasswordInput
          label={getText(locale, 'label')}
          placeholder={getText(locale, 'placeholder')}
          enablePasswordGenerator={true}
          enableBreachCheck={true}
          enableKeyboardShortcuts={true}
          enableAdvancedScoring={true}
          enableThemeAwareStyles={true}
          enableAdvancedMonitoring={true}
          enableMobileOptimizations={true}
          enableAdvancedI18n={true}
          showStrengthBar={true}
          useZxcvbnStrength={true}
          showPasswordToggle={true}
          showCopyButton={true}
          showClearButton={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🚀 {getText(locale, 'allAdvancedFeaturesDescription')}
        </div>
      </div>
    );
  },
}; 