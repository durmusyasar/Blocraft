import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";
import { BcPhoneInput } from "./BcPhoneInput";
import { CountryCode } from "./BcPhoneInput.types";
import enTexts from "../i18n/i18n/en.json";
import trTexts from "../i18n/i18n/tr.json";
import { useForm, Controller } from "react-hook-form";
import { countryList as defaultCountryList } from "./utils";
import React from "react";
import { BcTextField } from "../BcTextField/BcTextField";

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcPhoneInput,
  tr: trTexts.BcPhoneInput,
};
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || "en";
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

const withLocale = (Story: React.ComponentType<Record<string, unknown>>, context: { locale?: string; globals?: { locale?: string }; args?: Record<string, unknown> }) => {
  const locale = context.locale || context.globals?.locale;
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
  (window as { __STORYBOOK_ADDONS_CHANNEL__?: { data?: { globalsUpdated?: Array<{ globals?: { locale?: string } }> } } })?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]
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
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    country: "TR",
    showCountrySelect: true,
    enablePhoneFormatting: true,
    enableAdvancedValidation: true,
    enableAutoCountryDetection: false,
    enablePhoneSuggestions: true,
    enablePhoneHistory: true,
    enableAccessibility: true,
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
    country: {
      description: getText(defaultLocale, "countryDescription"),
      control: "text",
    },
    showCountrySelect: {
      description: getText(defaultLocale, "showCountrySelectDescription"),
      control: "boolean",
    },
    enablePhoneFormatting: {
      description: getText(defaultLocale, "enablePhoneFormattingDescription"),
      control: "boolean",
    },
    enableAdvancedValidation: {
      description: getText(defaultLocale, "enableAdvancedValidationDescription"),
      control: "boolean",
    },
    enableAutoCountryDetection: {
      description: getText(defaultLocale, "enableAutoCountryDetectionDescription"),
      control: "boolean",
    },
    enablePhoneSuggestions: {
      description: getText(defaultLocale, "enablePhoneSuggestionsDescription"),
      control: "boolean",
    },
    enablePhoneHistory: {
      description: getText(defaultLocale, "enablePhoneHistoryDescription"),
      control: "boolean",
    },
    enableAccessibility: {
      description: getText(defaultLocale, "enableAccessibilityDescription"),
      control: "boolean",
    },

    // MissingPropsTable'da gösterilen prop'lar - Controls panelinde gizli
    countryList: {
      table: { disable: true },
    },
    fetchCountries: {
      table: { disable: true },
    },
    onCountryChange: {
      table: { disable: true },
    },
    validatePhone: {
      table: { disable: true },
    },
    getMask: {
      table: { disable: true },
    },
    showMaskInPlaceholder: {
      table: { disable: true },
    },
    favoriteCountries: {
      table: { disable: true },
    },
    inputMode: {
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
    locale: {
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
    enableSmartPlaceholder: {
      table: { disable: true },
    },
    enableSmartValidation: {
      table: { disable: true },
    },
    enableSmartSuggestions: {
      table: { disable: true },
    },
    enableSmartFormatting: {
      table: { disable: true },
    },
    enableSmartCountryDetection: {
      table: { disable: true },
    },
    enableLearning: {
      table: { disable: true },
    },
    enablePersonalization: {
      table: { disable: true },
    },
    enableContextualHelp: {
      table: { disable: true },
    },
    enableProgressiveDisclosure: {
      table: { disable: true },
    },
    enableAdaptiveUI: {
      table: { disable: true },
    },
    enablePerformance: {
      table: { disable: true },
    },
    enableMonitoring: {
      table: { disable: true },
    },
    enableSmartFeatures: {
      table: { disable: true },
    },
    enableIntegration: {
      table: { disable: true },
    },
    enableSecurity: {
      table: { disable: true },
    },
    enableTesting: {
      table: { disable: true },
    },
    enableScreenReaderSupport: {
      table: { disable: true },
    },
    enableKeyboardNavigation: {
      table: { disable: true },
    },
    enableReducedMotion: {
      table: { disable: true },
    },
    enableFocusManagement: {
      table: { disable: true },
    },
    enableARIALabels: {
      table: { disable: true },
    },
    enableLiveRegions: {
      table: { disable: true },
    },
    enableSkipLinks: {
      table: { disable: true },
    },
    enableTooltips: {
      table: { disable: true },
    },
    enableErrorAnnouncements: {
      table: { disable: true },
    },
    enableStatusAnnouncements: {
      table: { disable: true },
    },
    enableProgressAnnouncements: {
      table: { disable: true },
    },
    integrationTimeout: {
      table: { disable: true },
    },
    integrationRetries: {
      table: { disable: true },
    },
    integrationDelay: {
      table: { disable: true },
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

// Missing Props Table / Eksik Prop'lar Tablosu - EN ÜSTTE (Kullanıcılar önce tüm prop'ları görebilir)
export const MissingPropsTable: Story = {
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    country: "TR",
    showCountrySelect: true,
    enablePhoneFormatting: true,
    enableAdvancedValidation: true,
    enableAutoCountryDetection: false,
    enablePhoneSuggestions: true,
    enablePhoneHistory: true,
    enableAccessibility: true,
  },
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const itemsPerPage = 10;

    const missingProps = [
      // Phone Specific Props
      {
        name: "countryList",
        type: "CountryType[] | Promise<CountryType[]>",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsCountryList"),
      },
      {
        name: "fetchCountries",
        type: "() => Promise<CountryType[]>",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsFetchCountries"),
      },
      {
        name: "onCountryChange",
        type: "(country: CountryCode) => void",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsOnCountryChange"),
      },
      {
        name: "validatePhone",
        type: "(phone: string, country: CountryCode) => boolean",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsValidatePhone"),
      },
      {
        name: "getMask",
        type: "(country: string) => string",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsGetMask"),
      },
      {
        name: "showMaskInPlaceholder",
        type: "boolean",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsShowMaskInPlaceholder"),
      },
      {
        name: "favoriteCountries",
        type: "CountryCode[]",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsFavoriteCountries"),
      },
      {
        name: "inputMode",
        type: "tel | numeric",
        category: getText(locale, "categoryPhoneSpecific"),
        description: getText(locale, "missingPropsInputMode"),
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

      // Advanced Features
      {
        name: "enableSmartPlaceholder",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableSmartPlaceholder"),
      },
      {
        name: "enableSmartValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableSmartValidation"),
      },
      {
        name: "enableSmartSuggestions",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableSmartSuggestions"),
      },
      {
        name: "enableSmartFormatting",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableSmartFormatting"),
      },
      {
        name: "enableSmartCountryDetection",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableSmartCountryDetection"),
      },
      {
        name: "enableLearning",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableLearning"),
      },
      {
        name: "enablePersonalization",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnablePersonalization"),
      },
      {
        name: "enableContextualHelp",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableContextualHelp"),
      },
      {
        name: "enableProgressiveDisclosure",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableProgressiveDisclosure"),
      },
      {
        name: "enableAdaptiveUI",
        type: "boolean",
        category: getText(locale, "categoryAdvancedFeatures"),
        description: getText(locale, "missingPropsEnableAdaptiveUI"),
      },

      // Enterprise Features
      {
        name: "enablePerformance",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnablePerformance"),
      },
      {
        name: "enableMonitoring",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnableMonitoring"),
      },
      {
        name: "enableSmartFeatures",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnableSmartFeatures"),
      },
      {
        name: "enableIntegration",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnableIntegration"),
      },
      {
        name: "enableSecurity",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnableSecurity"),
      },
      {
        name: "enableTesting",
        type: "boolean",
        category: getText(locale, "categoryEnterpriseFeatures"),
        description: getText(locale, "missingPropsEnableTesting"),
      },

      // Accessibility Features
      {
        name: "enableScreenReaderSupport",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableScreenReaderSupport"),
      },
      {
        name: "enableKeyboardNavigation",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableKeyboardNavigation"),
      },
      {
        name: "enableReducedMotion",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableReducedMotion"),
      },
      {
        name: "enableFocusManagement",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableFocusManagement"),
      },
      {
        name: "enableARIALabels",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableARIALabels"),
      },
      {
        name: "enableLiveRegions",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableLiveRegions"),
      },
      {
        name: "enableSkipLinks",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableSkipLinks"),
      },
      {
        name: "enableTooltips",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableTooltips"),
      },
      {
        name: "enableErrorAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableErrorAnnouncements"),
      },
      {
        name: "enableStatusAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableStatusAnnouncements"),
      },
      {
        name: "enableProgressAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibilityFeatures"),
        description: getText(locale, "missingPropsEnableProgressAnnouncements"),
      },

      // Integration Features
      {
        name: "integrationTimeout",
        type: "number",
        category: getText(locale, "categoryIntegrationFeatures"),
        description: getText(locale, "missingPropsIntegrationTimeout"),
      },
      {
        name: "integrationRetries",
        type: "number",
        category: getText(locale, "categoryIntegrationFeatures"),
        description: getText(locale, "missingPropsIntegrationRetries"),
      },
      {
        name: "integrationDelay",
        type: "number",
        category: getText(locale, "categoryIntegrationFeatures"),
        description: getText(locale, "missingPropsIntegrationDelay"),
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
            {getText(locale, "missingPropsTableStoryDescription") || "Complete list of ALL props for BcPhoneInput component. All props are available in the component but hidden from the controls panel for better performance and cleaner interface."}
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
            📋 {getText(locale, "missingPropsTableTitle") || "Missing Props Table"}
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              appearance={appearance as any}
              country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args: Record<string, unknown>, context: { globals?: { locale?: string }; locale?: string }) => {
    const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";
    return (
      <BcPhoneInput
        {...args}
        label={(args.label as string) || (locale === "tr" ? "Telefon" : "Phone")}
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
  render: (args: Record<string, unknown>, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args: Record<string, unknown>, context: { globals?: { locale?: string }; locale?: string }) => {
    const [countries, setCountries] = React.useState<Array<{ id: number; code: string; name: { tr: string; en: string }; flag: string; dial: number; mask: string }>>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>("TR");
    const [value, setValue] = React.useState("");
    const [renderTime, setRenderTime] = React.useState<number | null>(null);
    const locale = context?.globals?.locale ?? context?.locale ?? "en";
    
    React.useEffect(() => {
      let isMounted = true;
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
      
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setCountries(bigList);
          setLoading(false);
          setRenderTime(performance.now() - start);
        }
      }, 800); // Async fetch simülasyonu
      
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
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
          label={(args.label as string) || getText(locale, 'label')}
          countryList={countries.map(country => ({
            code: country.code as CountryCode,
            name: country.name[locale as 'tr' | 'en'] || country.name.en,
            flag: country.flag,
            dial: country.dial
          }))}
          country={selectedCountry}
          onCountryChange={setSelectedCountry}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          locale={locale}
          placeholder={
            (args.placeholder as string) || getText(locale, 'placeholder')
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
  render: (args: Record<string, unknown>, context: { globals?: { locale?: string }; locale?: string }) => {
    const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";

    const fetchCountries = React.useCallback(async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return defaultCountryList;
      } catch (error) {
        console.warn('Country loading failed:', error);
        return defaultCountryList; // Fallback to default list
      }
    }, []);

    return (
      <BcPhoneInput
        {...args}
        label={(args.label as string) || getText(locale, 'label')}
        fetchCountries={fetchCountries}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale={locale}
        placeholder={
          (args.placeholder as string) || getText(locale, 'placeholder')
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
  render: (args: Record<string, unknown>, context: { globals?: { locale?: string }; locale?: string }) => {
    const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>("TR");
    const [value, setValue] = React.useState("");
    const locale = context?.globals?.locale ?? context?.locale ?? "en";

    const validatePhone = React.useCallback(
      (phone: string, country: CountryCode) => {
        if (country === "TR") {
          return {
            isValid: phone.length >= 10 && phone.startsWith("5"),
            errorMessage: phone.length < 10 || !phone.startsWith("5") ? "Invalid Turkish phone number" : "",
            rules: []
          };
        }
        if (country === "US") {
          return {
            isValid: phone.length === 10,
            errorMessage: phone.length !== 10 ? "Invalid US phone number" : "",
            rules: []
          };
        }
        return {
          isValid: phone.length >= 8,
          errorMessage: phone.length < 8 ? "Phone number too short" : "",
          rules: []
        };
      },
      []
    );

    return (
      <BcPhoneInput
        {...args}
        label={(args.label as string) || getText(locale, 'label')}
        validatePhone={validatePhone}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale={locale}
        placeholder={
          (args.placeholder as string) || getText(locale, 'placeholder')
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneFormattingLabel")}
          placeholder={getText(locale, "phoneFormattingPlaceholder")}
          enablePhoneFormatting={true}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "voiceSearchLabel")}
          placeholder={getText(locale, "voiceSearchPlaceholder")}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "qrCodeIntegrationLabel")}
          placeholder={getText(locale, "qrCodeIntegrationPlaceholder")}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "advancedValidationLabel")}
          placeholder={getText(locale, "advancedValidationPlaceholder")}
          enableAdvancedValidation={true}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneSuggestionsLabel")}
          placeholder={getText(locale, "phoneSuggestionsPlaceholder")}
          enablePhoneSuggestions={true}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcPhoneInput
          label={getText(locale, "phoneHistoryLabel")}
          placeholder={getText(locale, "phoneHistoryPlaceholder")}
          enablePhoneHistory={true}
          country={"TR" as CountryCode}
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
  render: (args, context: { globals?: { locale?: string }; locale?: string }) => {
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
          country={"TR" as CountryCode}
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
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        return defaultCountryList.slice(0, 10); // Return first 10 countries
      } catch (error) {
        console.warn('Country loading failed:', error);
        return defaultCountryList.slice(0, 10); // Fallback
      }
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