import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";
import { BcOtpInput } from "./BcOtpInput";
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';

const TEXTS: Record<string, Record<string, string>> = { en: enTexts.BcOtpInput, tr: trTexts.BcOtpInput };
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

const meta: Meta<typeof BcOtpInput> = {
  title: "Components/BcOtpInput",
  component: BcOtpInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: getText(defaultLocale, 'componentDocsDescription'),
      },
    },
  },
  argTypes: {
    length: {
      control: "number",
      description: getText(defaultLocale, 'lengthDescription'),
    },
    label: {
      control: "text",
      description: getText(defaultLocale, 'labelDescription'),
    },
    placeholder: {
      control: "text",
      description: getText(defaultLocale, 'placeholderDescription'),
    },
    helperText: {
      control: "text",
      description: getText(defaultLocale, 'helperTextDescription'),
    },
    statusMessage: {
      control: "text",
      description: getText(defaultLocale, 'statusMessageDescription'),
    },
    appearance: {
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
      description: getText(defaultLocale, 'appearanceDescription'),
    },
    status: {
      control: "select",
      options: ["error", "warning", "success", "info", undefined],
      description: getText(defaultLocale, 'statusDescription'),
    },
    loading: {
      control: "boolean",
      description: getText(defaultLocale, 'loadingDescription'),
    },
    disabled: {
      control: "boolean",
      description: getText(defaultLocale, 'disabledDescription'),
    },
    responsiveWidth: {
      control: "boolean",
      description: getText(defaultLocale, 'responsiveWidthDescription'),
    },
    autoFocus: {
      control: "boolean",
      description: getText(defaultLocale, 'autoFocusDescription'),
    },
    mask: {
      control: "boolean",
      description: getText(defaultLocale, 'maskDescription'),
    },
    inputType: {
      control: "select",
      options: ["number", "text"],
      description: getText(defaultLocale, 'inputTypeDescription'),
    },
    autoClear: {
      control: "boolean",
      description: getText(defaultLocale, 'autoClearDescription'),
    },
    autoValidate: {
      control: "boolean",
      description: getText(defaultLocale, 'autoValidateDescription'),
    },
    validationDebounceMs: {
      control: "number",
      description: getText(defaultLocale, 'validationDebounceMsDescription'),
    },
    monitoring: {
      control: "object",
      description: getText(defaultLocale, 'monitoringDescription'),
    },
    // Advanced features
    enableAdvancedFeatures: {
      control: "boolean",
      description: getText(defaultLocale, 'enableAdvancedFeaturesDescription'),
    },
    enableKeyboardShortcuts: {
      control: "boolean",
      description: getText(defaultLocale, 'enableKeyboardShortcutsDescription'),
    },
    enableAutoComplete: {
      control: "boolean",
      description: getText(defaultLocale, 'enableAutoCompleteDescription'),
    },
    enableHapticFeedback: {
      control: "boolean",
      description: getText(defaultLocale, 'enableHapticFeedbackDescription'),
    },
    enableAdvancedMonitoring: {
      control: "boolean",
      description: getText(defaultLocale, 'enableAdvancedMonitoringDescription'),
    },
    enableMobileOptimizations: {
      control: "boolean",
      description: getText(defaultLocale, 'enableMobileOptimizationsDescription'),
    },
    enableAdvancedI18n: {
      control: "boolean",
      description: getText(defaultLocale, 'enableAdvancedI18nDescription'),
    },
    enableThemeAwareStyles: {
      control: "boolean",
      description: getText(defaultLocale, 'enableThemeAwareStylesDescription'),
    },
    locale: {
      control: "text",
      description: getText(defaultLocale, 'localeDescription'),
    },
    fallbackLocale: {
      control: "text",
      description: getText(defaultLocale, 'fallbackLocaleDescription'),
    },
    translations: {
      control: "object",
      description: getText(defaultLocale, 'translationsDescription'),
    },
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<typeof BcOtpInput>;

export const Default: Story = {
  args: {
    length: 6,
    label: getText(defaultLocale, 'label'),
    helperText: getText(defaultLocale, 'helperText'),
    autoFocus: true,
    locale: defaultLocale,
  },
};

export const Controlled: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const [val, setVal] = useState("");
    return (
      <BcOtpInput
        length={6}
        label={getText(locale, 'label')}
        value={val}
        onChange={setVal}
        helperText={getText(locale, 'helperText')}
        locale={locale}
      />
    );
  },
};

export const Statuses: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          status="error"
          statusMessage={getText(locale, 'otpInvalid')}
          locale={locale}
        />
        <BcOtpInput
          label={getText(locale, 'label')}
          status="warning"
          statusMessage={getText(locale, 'otpError')}
          locale={locale}
        />
        <BcOtpInput
          label={getText(locale, 'label')}
          status="success"
          statusMessage={getText(locale, 'otpValid')}
          locale={locale}
        />
        <BcOtpInput
          label={getText(locale, 'label')}
          status="info"
          statusMessage={getText(locale, 'helperText')}
          locale={locale}
        />
      </div>
    );
  },
};

export const Appearances: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
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
          <BcOtpInput
            key={appearance}
            label={appearance.charAt(0).toUpperCase() + appearance.slice(1)}
            appearance={appearance as any}
            locale={locale}
          />
        ))}
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    label: getText(defaultLocale, 'otpLoading'),
    loading: true,
    locale: defaultLocale,
  },
};

export const Masked: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    mask: true,
    helperText: getText(defaultLocale, 'maskDescription'),
    locale: defaultLocale,
  },
};

export const Disabled: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    disabled: true,
    defaultValue: "123456",
    locale: defaultLocale,
  },
};

export const Responsive: Story = {
  args: {
    label: getText(defaultLocale, 'label'),
    responsiveWidth: true,
    locale: defaultLocale,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args: any, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "16px" }}>
        <BcOtpInput {...args} locale={locale} />
      </div>
    );
  },
};

export const EdgeCases: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
        <BcOtpInput length={4} label={getText(locale, 'length') + " 4"} locale={locale} />
        <BcOtpInput length={8} label={getText(locale, 'length') + " 8 (" + getText(locale, 'inputType') + ")"} inputType="text" locale={locale} />
        <BcOtpInput length={6} label={getText(locale, 'mask') + " " + getText(locale, 'disabled')} mask disabled status="error" statusMessage={getText(locale, 'otpError')} locale={locale} />
      </div>
    );
  },
};

// Advanced Features Stories
export const KeyboardShortcuts: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
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

export const AutoComplete: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
          enableAutoComplete={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🔄 {getText(locale, 'enableAutoCompleteDescription')}
        </div>
      </div>
    );
  },
};

export const HapticFeedback: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
          enableHapticFeedback={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          📳 {getText(locale, 'enableHapticFeedbackDescription')}
        </div>
      </div>
    );
  },
};

export const AdvancedMonitoring: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const [monitoringData, setMonitoringData] = useState<any[]>([]);
    
    const monitoring = {
      onChange: (value: string) => {
        setMonitoringData(prev => [...prev, { 
          type: 'change', 
          value, 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      },
      onComplete: (value: string) => {
        setMonitoringData(prev => [...prev, { 
          type: 'complete', 
          value, 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      },
      onError: (error: Error) => {
        setMonitoringData(prev => [...prev, { 
          type: 'error', 
          error: error.message, 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      },
      onPerformance: (metrics: any) => {
        setMonitoringData(prev => [...prev, { 
          type: 'performance', 
          metrics, 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
          enableAdvancedMonitoring={true}
          monitoring={monitoring}
          locale={locale}
        />
        
        <div style={{ 
          fontSize: 12, 
          color: '#666',
          padding: 12,
          background: '#f5f5f5',
          borderRadius: 4,
          maxHeight: 200,
          overflow: 'auto'
        }}>
          <strong>📊 Monitoring Data:</strong>
          {monitoringData.length === 0 ? (
            <div>No events yet. Start typing to see monitoring data...</div>
          ) : (
            <div style={{ marginTop: 8 }}>
              {monitoringData.slice(-10).map((event, idx) => (
                <div key={idx} style={{ 
                  marginBottom: 4, 
                  padding: 4, 
                  background: '#fff', 
                  borderRadius: 2,
                  fontSize: 11
                }}>
                  <strong>{event.type}:</strong> {event.value || event.error || JSON.stringify(event.metrics)} 
                  <span style={{ color: '#999' }}> ({event.timestamp})</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ fontSize: 12, color: '#666' }}>
          📊 {getText(locale, 'enableAdvancedMonitoringDescription')}
        </div>
      </div>
    );
  },
};

export const MobileOptimizations: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
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

export const AdvancedI18n: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
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

export const ThemeAwareStyles: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
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

export const ValidationExamples: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    // Basit validation fonksiyonu
    const validateOtp = (otp: string) => {
      if (otp.length !== 6) return false;
      // 123456 geçerli, diğerleri geçersiz
      return otp === "123456";
    };

    // Async validation fonksiyonu
    const validateOtpAsync = async (otp: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      return otp === "654321";
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 500 }}>
        <div>
          <h3>✅ Basit Validation (123456 geçerli)</h3>
          <BcOtpInput
            label={getText(locale, 'label')}
            value={value1}
            onChange={setValue1}
            validateOtp={validateOtp}
            autoValidate={true}
            helperText={getText(locale, 'helperText')}
            locale={locale}
          />
        </div>

        <div>
          <h3>⏳ Async Validation (654321 geçerli, 1 saniye bekleme)</h3>
          <BcOtpInput
            label={getText(locale, 'label')}
            value={value2}
            onChange={setValue2}
            validateOtp={validateOtpAsync}
            autoValidate={true}
            helperText={getText(locale, 'helperText')}
            locale={locale}
          />
        </div>

        <div>
          <h3>🎯 Manuel Validation (Enter tuşu ile doğrula)</h3>
          <BcOtpInput
            label={getText(locale, 'label')}
            value={value3}
            onChange={setValue3}
            validateOtp={validateOtp}
            autoValidate={false}
            helperText="Enter tuşuna basarak doğrulayın"
            locale={locale}
          />
        </div>

        <div style={{ fontSize: 12, color: '#666', padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
          <strong>Test Senaryoları:</strong><br/>
          • İlk input: 123456 yazın (✅ başarılı)<br/>
          • İkinci input: 654321 yazın (⏳ yükleniyor, sonra ✅ başarılı)<br/>
          • Üçüncü input: 123456 yazıp Enter'a basın (✅ başarılı)
        </div>
      </div>
    );
  },
};

export const AllAdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label={getText(locale, 'label')}
          helperText={getText(locale, 'helperText')}
          enableAdvancedFeatures={true}
          enableKeyboardShortcuts={true}
          enableAutoComplete={true}
          enableHapticFeedback={true}
          enableAdvancedMonitoring={true}
          enableMobileOptimizations={true}
          enableAdvancedI18n={true}
          enableThemeAwareStyles={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🚀 {getText(locale, 'allAdvancedFeaturesDescription')}
        </div>
      </div>
    );
  },
};

// New Professional Stories
export const EnhancedAccessibility: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Enhanced Accessibility"
          helperText="High contrast, reduced motion, voice input, screen reader support"
          enableHighContrast={true}
          enableReducedMotion={true}
          enableVoiceInput={true}
          enableScreenReaderAnnouncements={true}
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          ♿ Enhanced accessibility features enabled
        </div>
      </div>
    );
  },
};

export const AdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Advanced Features"
          helperText="Biometric, QR Code, SMS integration"
          enableBiometric={true}
          enableQRCode={true}
          enableSMS={true}
          phoneNumber="+1234567890"
          qrCodeData="123456"
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🔐 Biometric, 📱 QR Code, 📧 SMS integration
        </div>
      </div>
    );
  },
};

export const DeveloperExperience: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Developer Experience"
          helperText="Debug mode and metrics enabled - check console"
          enableDebug={true}
          enableMetrics={true}
          onDebugLog={(message, data) => console.log('Debug:', message, data)}
          onPerformanceIssue={(issue) => console.warn('Performance Issue:', issue)}
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🛠️ Debug mode and metrics enabled
        </div>
      </div>
    );
  },
};

export const Customization: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Customization"
          helperText="Custom shapes, colors, gradients, and effects"
          inputShape="circle"
          inputSize="large"
          customTheme="dark"
          enableCustomColors={true}
          primaryColor="#ff6b6b"
          secondaryColor="#4ecdc4"
          enableGradient={true}
          enableGlow={true}
          enableShadow={true}
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🎨 Custom shapes, colors, gradients, and effects
        </div>
      </div>
    );
  },
};

export const Animations: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const [val, setVal] = useState("");
    const [status, setStatus] = useState<"error" | "warning" | "success" | "info" | undefined>();
    
    const handleComplete = (value: string) => {
      setStatus('success');
      setTimeout(() => setStatus(undefined), 2000);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Animations"
          helperText="Enhanced animations and transitions"
          enableAnimations={true}
          animationDuration={500}
          enableSuccessAnimation={true}
          enableErrorAnimation={true}
          enableLoadingAnimation={true}
          enableFocusAnimation={true}
          value={val}
          onChange={setVal}
          onComplete={handleComplete}
          status={status}
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          ✨ Enhanced animations and transitions
        </div>
      </div>
    );
  },
};

export const ProfessionalShowcase: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? 'en';
    const [val, setVal] = useState("");
    const [status, setStatus] = useState<"error" | "warning" | "success" | "info" | undefined>();
    
    const handleComplete = (value: string) => {
      setStatus('success');
      setTimeout(() => setStatus(undefined), 3000);
    };
    
    const handleValidation = async (value: string) => {
      // Simulate async validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return value === '123456';
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BcOtpInput
          label="Professional OTP Input"
          helperText="Complete professional implementation with all features"
          // All professional features enabled
          enableAdvancedFeatures={true}
          enableKeyboardShortcuts={true}
          enableAutoComplete={true}
          enableHapticFeedback={true}
          enableAdvancedMonitoring={true}
          enableMobileOptimizations={true}
          enableAdvancedI18n={true}
          enableThemeAwareStyles={true}
          enableHighContrast={false}
          enableReducedMotion={false}
          enableVoiceInput={true}
          enableScreenReaderAnnouncements={true}
          enableBiometric={true}
          enableQRCode={true}
          enableSMS={true}
          phoneNumber="+1234567890"
          enableDebug={false}
          enableMetrics={true}
          enableAnimations={true}
          animationDuration={300}
          enableSuccessAnimation={true}
          enableErrorAnimation={true}
          enableLoadingAnimation={true}
          enableFocusAnimation={true}
          inputShape="rounded"
          inputSize="medium"
          customTheme="auto"
          enableCustomColors={true}
          primaryColor="#1976d2"
          enableGradient={false}
          enableGlow={true}
          enableShadow={true}
          value={val}
          onChange={setVal}
          onComplete={handleComplete}
          validateOtp={handleValidation}
          status={status}
          autoValidate={true}
          length={6}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          🚀 Complete professional implementation with all features
        </div>
      </div>
    );
  },
};