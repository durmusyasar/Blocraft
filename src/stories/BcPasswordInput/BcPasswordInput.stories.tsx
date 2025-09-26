
import React from 'react';
import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BcPasswordInput } from './BcPasswordInput';
import { BcTextField } from '../BcTextField/BcTextField';
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcPasswordInput,
  tr: trTexts.BcPasswordInput,
};
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || "en";
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

const defaultLocale = "en";

const meta: Meta<typeof BcPasswordInput> = {
  title: 'Components/BcPasswordInput',
  component: BcPasswordInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          getText(defaultLocale, "componentDocsDescription") +
          " " +
          getText(defaultLocale, "inheritanceDescription"),
      },
    },
  },
  args: {
    // EN ÖNEMLİ 10 PROP - Controls panelinde gösterilecek
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: true,
    enableStrengthIndicator: true,
    showStrengthMeter: true,
    enablePasswordValidation: true,
    showRequirements: true,
    enablePasswordHistory: true,
    enablePasswordSuggestions: true,
  },
  argTypes: {
    // EN ÖNEMLİ 10 PROP - Controls panelinde gösterilecek
    label: {
      description: getText(defaultLocale, "labelDescription"),
      control: "text",
    },
    placeholder: {
      description: getText(defaultLocale, "placeholderDescription"),
      control: "text",
    },
    showPasswordToggle: {
      description: getText(defaultLocale, "showPasswordToggleDescription"),
      control: "boolean",
    },
    enablePasswordGeneration: {
      description: getText(defaultLocale, "enablePasswordGeneratorDescription"),
      control: "boolean",
    },
    enableStrengthIndicator: {
      description: getText(defaultLocale, "showStrengthBarDescription"),
      control: "boolean",
    },
    showStrengthMeter: {
      description: getText(defaultLocale, "showStrengthBarDescription"),
      control: "boolean",
    },
    enablePasswordValidation: {
      description: getText(defaultLocale, "enableAsyncValidationDescription"),
      control: "boolean",
    },
    showRequirements: {
      description: getText(defaultLocale, "showValidationStatusDescription"),
      control: "boolean",
    },
    enablePasswordHistory: {
      description: getText(defaultLocale, "enablePasswordHistoryDescription"),
      control: "boolean",
    },
    enablePasswordSuggestions: {
      description: getText(defaultLocale, "enablePasswordSuggestionsDescription"),
      control: "boolean",
    },

    // MissingPropsTable'da gösterilen prop'lar - Controls panelinde gizli
    onStrengthChange: {
      table: { disable: true },
    },
    customValidationRules: {
      table: { disable: true },
    },
    validationDebounceMs: {
      table: { disable: true },
    },
    showValidationMessages: {
      table: { disable: true },
    },
    onPasswordGenerated: {
      table: { disable: true },
    },
    onSecurityWarning: {
      table: { disable: true },
    },
    onVisibilityChange: {
      table: { disable: true },
    },
    customStrengthColors: {
      table: { disable: true },
    },
    onPasswordHistoryChange: {
      table: { disable: true },
    },
    customSuggestions: {
      table: { disable: true },
    },
    onSuggestionSelect: {
      table: { disable: true },
    },
    passwordToggleAriaLabel: {
      table: { disable: true },
    },
    strengthMeterAriaLabel: {
      table: { disable: true },
    },
    requirementsAriaLabel: {
      table: { disable: true },
    },
    breachDetectionApi: {
      table: { disable: true },
    },
    commonPasswordsList: {
      table: { disable: true },
    },
    dictionaryWords: {
      table: { disable: true },
    },
    enableBreachDetection: {
      table: { disable: true },
    },
    enableCommonPasswordCheck: {
      table: { disable: true },
    },
    enablePatternDetection: {
      table: { disable: true },
    },
    enableKeyboardPatternCheck: {
      table: { disable: true },
    },
    enableRepeatedCharCheck: {
      table: { disable: true },
    },
    enableSequentialCharCheck: {
      table: { disable: true },
    },
    enableDictionaryCheck: {
      table: { disable: true },
    },
    passwordTranslations: {
      table: { disable: true },
    },
    locale: {
      table: { disable: true },
    },
    onFocus: {
      table: { disable: true },
    },
    onBlur: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    ref: {
      table: { disable: true },
    },
    passwordToggleLabel: {
      table: { disable: true },
    },
    passwordTogglePosition: {
      table: { disable: true },
    },
    rememberPasswordVisibility: {
      table: { disable: true },
    },
    strengthConfig: {
      table: { disable: true },
    },
    generationOptions: {
      table: { disable: true },
    },
    securityFeatures: {
      table: { disable: true },
    },
    analytics: {
      table: { disable: true },
    },
    defaultVisible: {
      table: { disable: true },
    },
    strengthDisplayMode: {
      table: { disable: true },
    },
    strengthColorScheme: {
      table: { disable: true },
    },
    appearance: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    color: {
      table: { disable: true },
    },
    disabled: {
      table: { disable: true },
    },
    fallbackLocale: {
      table: { disable: true },
    },
    showClearButton: {
      table: { disable: true },
    },
    responsiveWidth: {
      table: { disable: true },
    },
    enableRTL: {
      table: { disable: true },
    },
    enableHighContrast: {
      table: { disable: true },
    },
    requirementsPosition: {
      table: { disable: true },
    },
    requirementsStyle: {
      table: { disable: true },
    },
    maxHistoryItems: {
      table: { disable: true },
    },
    suggestionSource: {
      table: { disable: true },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BcPasswordInput>;

// Default story
export const Default: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: false,
    enableStrengthIndicator: false,
    showStrengthMeter: false,
    enablePasswordValidation: false,
    showRequirements: false,
    showClearButton: true,
  },
};

// Missing Props Table / Eksik Prop'lar Tablosu - EN ÜSTTE (Kullanıcılar önce tüm prop'ları görebilir)
export const MissingPropsTable: Story = {
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: true,
    enableStrengthIndicator: true,
    showStrengthMeter: true,
    enablePasswordValidation: true,
    showRequirements: true,
    enablePasswordHistory: true,
    enablePasswordSuggestions: true,
    enableBreachDetection: false,
    enableCommonPasswordCheck: true,
    enablePatternDetection: true,
    enableKeyboardPatternCheck: true,
    enableRepeatedCharCheck: true,
    enableSequentialCharCheck: true,
    enableDictionaryCheck: true,
    responsiveWidth: false,
    enableRTL: false,
    enableHighContrast: false,
    showClearButton: false,
    locale: defaultLocale,
  },
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const itemsPerPage = 10;

    const missingProps = [
      // Password Specific Props
      {
        name: "onStrengthChange",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnStrengthChange"),
      },
      {
        name: "customValidationRules",
        type: "PasswordValidationRule[]",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsCustomValidationRules"),
      },
      {
        name: "validationDebounceMs",
        type: "number",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsValidationDebounceMs"),
      },
      {
        name: "showValidationMessages",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsShowValidationMessages"),
      },
      {
        name: "onPasswordGenerated",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnPasswordGenerated"),
      },
      {
        name: "onSecurityWarning",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnSecurityWarning"),
      },
      {
        name: "onVisibilityChange",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnVisibilityChange"),
      },
      {
        name: "customStrengthColors",
        type: "object",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsCustomStrengthColors"),
      },
      {
        name: "onPasswordHistoryChange",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnPasswordHistoryChange"),
      },
      {
        name: "customSuggestions",
        type: "string[]",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsCustomSuggestions"),
      },
      {
        name: "onSuggestionSelect",
        type: "function",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsOnSuggestionSelect"),
      },
      {
        name: "passwordToggleAriaLabel",
        type: "string",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsPasswordToggleAriaLabel"),
      },
      {
        name: "strengthMeterAriaLabel",
        type: "string",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsStrengthMeterAriaLabel"),
      },
      {
        name: "requirementsAriaLabel",
        type: "string",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsRequirementsAriaLabel"),
      },
      {
        name: "breachDetectionApi",
        type: "string",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsBreachDetectionApi"),
      },
      {
        name: "commonPasswordsList",
        type: "string[]",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsCommonPasswordsList"),
      },
      {
        name: "dictionaryWords",
        type: "string[]",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsDictionaryWords"),
      },
      {
        name: "enableBreachDetection",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableBreachDetection"),
      },
      {
        name: "enableCommonPasswordCheck",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableCommonPasswordCheck"),
      },
      {
        name: "enablePatternDetection",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnablePatternDetection"),
      },
      {
        name: "enableKeyboardPatternCheck",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableKeyboardPatternCheck"),
      },
      {
        name: "enableRepeatedCharCheck",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableRepeatedCharCheck"),
      },
      {
        name: "enableSequentialCharCheck",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableSequentialCharCheck"),
      },
      {
        name: "enableDictionaryCheck",
        type: "boolean",
        category: getText(locale, "categoryPasswordSpecific"),
        description: getText(locale, "missingPropsEnableDictionaryCheck"),
      },

      // BcTextField Inherited Props
      {
        name: "appearance",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsAppearance"),
      },
      {
        name: "size",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsSize"),
      },
      {
        name: "color",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsColor"),
      },
      {
        name: "disabled",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsDisabled"),
      },
      {
        name: "fallbackLocale",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsFallbackLocale"),
      },
      {
        name: "locale",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsLocale"),
      },
      {
        name: "showClearButton",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsShowClearButton"),
      },
      {
        name: "responsiveWidth",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsResponsiveWidth"),
      },
      {
        name: "enableRTL",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsEnableRTL"),
      },
      {
        name: "enableHighContrast",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsEnableHighContrast"),
      },
      {
        name: "passwordTranslations",
        type: "object",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsPasswordTranslations"),
      },
      {
        name: "onFocus",
        type: "function",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsOnFocus"),
      },
      {
        name: "onBlur",
        type: "function",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsOnBlur"),
      },
      {
        name: "value",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsValue"),
      },
      {
        name: "onChange",
        type: "function",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsOnChange"),
      },
      {
        name: "ref",
        type: "RefObject",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsRef"),
      },
    ];

    const filteredProps = missingProps.filter(prop =>
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProps.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProps = filteredProps.slice(startIndex, endIndex);

    const getTypeColor = (type: string) => {
      switch (type.toLowerCase()) {
        case "string":
          return "#e3f2fd";
        case "number":
          return "#f3e5f5";
        case "boolean":
          return "#e8f5e8";
        case "function":
          return "#fff3e0";
        case "object":
          return "#ffebee";
        case "array":
          return "#f1f8e9";
        default:
          return "#f5f5f5";
      }
    };

    const getTypeIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case "string":
          return "🔤";
        case "number":
          return "#️⃣";
        case "boolean":
          return "☑️";
        case "function":
          return "⚙️";
        case "object":
          return "📦";
        case "array":
          return "📋";
        default:
          return "❓";
      }
    };

    return (
      <div
        style={{
          padding: 24,
          background: "#f8f9fa",
          borderRadius: 8,
          border: "1px solid #e9ecef",
        }}
      >
        <div
          style={{
            marginBottom: 16,
            padding: "12px 16px",
            background: "#e3f2fd",
            borderRadius: 6,
            border: "1px solid #bbdefb",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1976d2",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {getText(locale, "missingPropsTableStoryDescription")}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
            }}
          >
            📋 {getText(locale, "missingPropsTableTitle")}
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage(1)}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: locale === "en" ? "#007bff" : "white",
                color: locale === "en" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              English
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: locale === "tr" ? "#007bff" : "white",
                color: locale === "tr" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Türkçe
            </button>
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <BcTextField
            {...args}
            placeholder={getText(locale, "missingPropsSearchPlaceholder") || "Search props..."}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            locale={locale}
            style={{
              width: "100%",
            }}
          />
        </div>
        
        <div
          style={{
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsPropName") || "Prop Name"}
                </th>
                <th
                  style={{
                    padding: "15px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsType") || "Type"}
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsCategory") || "Category"}
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsDescription") || "Description"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProps.map((prop, index) => (
                <tr
                  key={prop.name}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "500",
                      color: "#212529",
                    }}
                  >
                    <code
                      style={{
                        background: "#f8f9fa",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {prop.name}
                    </code>
                  </td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        background: getTypeColor(prop.type),
                        color: "#495057",
                      }}
                    >
                      {getTypeIcon(prop.type)} {prop.type}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "#6c757d" }}>
                    {prop.category}
                  </td>
                  <td style={{ padding: "16px", color: "#6c757d" }}>
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ color: "#6c757d", fontSize: "14px" }}>
            {getText(locale, "missingPropsShowing") || "Showing"} {filteredProps.length}{" "}
            {getText(locale, "missingPropsProps") || "props"} ({startIndex + 1}-
            {Math.min(endIndex, filteredProps.length)})
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: currentPage === 1 ? "#f8f9fa" : "white",
                color: currentPage === 1 ? "#6c757d" : "#495057",
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              {getText(locale, "missingPropsPrevious") || "Previous"}
            </button>
            <span
              style={{
                padding: "8px 16px",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: currentPage === totalPages ? "#f8f9fa" : "white",
                color: currentPage === totalPages ? "#6c757d" : "#495057",
                borderRadius: "4px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              {getText(locale, "missingPropsNext") || "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, "missingPropsTableStoryDescription"),
      },
    },
  },
}; 

// With strength indicator
export const WithStrengthIndicator: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: false,
    enableStrengthIndicator: true,
    showStrengthMeter: true,
    showRequirements: true,
  },
};

// With password generation
export const WithPasswordGeneration: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: true,
    enableStrengthIndicator: true,
    showStrengthMeter: true,
    showRequirements: true,
  },
};

// With security features
export const WithSecurityFeatures: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: true,
    enableStrengthIndicator: true,
    showStrengthMeter: true,
    showRequirements: true,
  },
};

// With clear button
export const WithClearButton: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    showPasswordToggle: true,
    enablePasswordGeneration: false,
    enableStrengthIndicator: false,
    showStrengthMeter: false,
    enablePasswordValidation: false,
    showRequirements: false,
    showClearButton: true,
  },
};

// Interactive example
export const InteractiveExample: Story = {
  render: (args) => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');
    const locale = args.locale || defaultLocale;

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    const handleStrengthChange = (strength: string, score: number) => {
      setStrength(`${strength} (${score}%)`);
    };

    return (
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          {getText(locale, "componentTitle")}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {getText(locale, "helperText")}
        </Typography>
        <BcPasswordInput
          label={getText(locale, "label")}
          placeholder={getText(locale, "placeholder")}
          value={password}
          onChange={handlePasswordChange}
          onStrengthChange={handleStrengthChange}
          showPasswordToggle={true}
          enablePasswordGeneration={true}
          enableStrengthIndicator={true}
          showStrengthMeter={true}
          showRequirements={true}
          showClearButton={true}
        />
        {strength && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {getText(locale, "strengthBar")}: {strength}
            </Typography>
          </Box>
        )}
      </Paper>
    );
  },
};

// Appearance Examples - Görünüm Örnekleri
export const AppearanceExamples: Story = {
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [selectedAppearance, setSelectedAppearance] = React.useState<string>("premium");

    const appearances = [
      { value: "premium", label: "Premium", description: "Lüks ve modern görünüm" },
      { value: "soft", label: "Soft", description: "Yumuşak ve rahat görünüm" },
      { value: "glass", label: "Glass", description: "Cam efekti ile şeffaf görünüm" },
      { value: "minimal", label: "Minimal", description: "Sade ve minimal tasarım" },
      { value: "neumorph", label: "Neumorph", description: "Neumorphism tasarım stili" },
      { value: "underline", label: "Underline", description: "Alt çizgili basit görünüm" },
      { value: "dark", label: "Dark", description: "Koyu tema uyumlu görünüm" },
      { value: "borderless", label: "Borderless", description: "Çerçevesiz temiz görünüm" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#495057" }}>
            🎨 {getText(locale, "appearanceExamplesTitle") || "Appearance Examples"}
          </h2>
          <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
            {getText(locale, "appearanceExamplesDescription") || "BcPasswordInput component'inin farklı görünüm stillerini keşfedin"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ fontWeight: "600", color: "#495057" }}>
            {getText(locale, "selectAppearance") || "Select Appearance:"}
          </label>
          <select
            value={selectedAppearance}
            onChange={(e) => setSelectedAppearance(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              maxWidth: "300px"
            }}
          >
            {appearances.map((appearance) => (
              <option key={appearance.value} value={appearance.value}>
                {appearance.label} - {appearance.description}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {appearances.map((appearance) => (
            <div
              key={appearance.value}
              style={{
                padding: "20px",
                border: selectedAppearance === appearance.value ? "2px solid #1976d2" : "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: selectedAppearance === appearance.value ? "#f3f8ff" : "#ffffff",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#495057" }}>
                    {appearance.label}
                  </h3>
                  {selectedAppearance === appearance.value && (
                    <span style={{ 
                      padding: "2px 8px", 
                      backgroundColor: "#1976d2", 
                      color: "white", 
                      borderRadius: "12px", 
                      fontSize: "12px" 
                    }}>
                      Selected
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
                  {appearance.description}
                </p>
                <BcPasswordInput
                  {...args}
                  appearance={appearance.value as "premium" | "soft" | "glass" | "minimal" | "neumorph" | "underline" | "dark" | "borderless"}
                  label={getText(locale, "appearanceExampleLabel") || "Password Input"}
                  placeholder={getText(locale, "appearanceExamplePlaceholder") || "Enter your password..."}
                  helperText={getText(locale, "appearanceExampleHelperText") || `This is the ${appearance.label.toLowerCase()} appearance style`}
                  showClearButton={true}
                  showPasswordToggle={true}
                  enablePasswordGeneration={true}
                  enableStrengthIndicator={true}
                  showStrengthMeter={true}
                  showRequirements={true}
                  locale={locale}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          padding: "16px", 
          backgroundColor: "#e3f2fd", 
          borderRadius: "8px", 
          border: "1px solid #bbdefb" 
        }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#1976d2", fontSize: "16px" }}>
            💡 {getText(locale, "appearanceTipsTitle") || "Usage Tips"}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#1976d2", fontSize: "14px" }}>
            <li>{getText(locale, "appearanceTip1") || "Premium: Use for important forms and premium features"}</li>
            <li>{getText(locale, "appearanceTip2") || "Soft: Great for user-friendly interfaces and forms"}</li>
            <li>{getText(locale, "appearanceTip3") || "Glass: Perfect for modern, overlay-style designs"}</li>
            <li>{getText(locale, "appearanceTip4") || "Minimal: Ideal for clean, distraction-free interfaces"}</li>
            <li>{getText(locale, "appearanceTip5") || "Neumorph: Use for contemporary, tactile designs"}</li>
            <li>{getText(locale, "appearanceTip6") || "Underline: Best for simple, space-efficient layouts"}</li>
            <li>{getText(locale, "appearanceTip7") || "Dark: Perfect for dark theme applications"}</li>
            <li>{getText(locale, "appearanceTip8") || "Borderless: Great for seamless, integrated designs"}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "BcPasswordInput component'inin tüm appearance seçeneklerini gösteren interaktif örnekler. Her görünüm stilinin nasıl göründüğünü ve ne zaman kullanılması gerektiğini keşfedin.",
      },
    },
  },
};

