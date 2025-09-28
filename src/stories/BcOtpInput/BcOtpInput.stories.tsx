import React from "react";
import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { BcOtpInput } from "./BcOtpInput";
import enTexts from "../i18n/i18n/en.json";
import trTexts from "../i18n/i18n/tr.json";
import { object } from "prop-types";

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcOtpInput,
  tr: trTexts.BcOtpInput,
};
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || "en";
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

const defaultLocale =
  (
    window as unknown as {
      __STORYBOOK_ADDONS_CHANNEL__?: {
        data?: { globalsUpdated?: Array<{ globals?: { locale?: string } }> };
      };
    }
  )?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]?.globals?.locale ||
  "en";

const meta: Meta<typeof BcOtpInput> = {
  title: "Components/BcOtpInput",
  component: BcOtpInput,
  parameters: {
    layout: "centered",
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
    length: 6,
    appearance: "premium",
    inputShape: "square",
    inputSize: "medium",
    autoFocusNext: true,
    mask: false,
    autoClear: false,
    validationOptions: {
      enableAutoValidation: false,
    },
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
    length: {
      control: { type: "number", min: 4, max: 8, step: 1 },
      description: getText(defaultLocale, "lengthDescription"),
    },
    appearance: {
      control: { type: "select" },
      options: [
        "premium",
        "soft",
        "glass",
        "minimal",
        "neumorph",
        "underline",
        "dark",
        "borderless",
      ],
      description: getText(defaultLocale, "appearanceDescription"),
    },
    inputShape: {
      control: { type: "select" },
      options: ["square", "circle", "hexagon", "rounded"],
      description: getText(defaultLocale, "inputShapeDescription"),
    },
    inputSize: {
      control: { type: "select" },
      options: ["small", "medium", "large", "xlarge"],
      description: getText(defaultLocale, "inputSizeDescription"),
    },
    autoFocusNext: {
      control: { type: "boolean" },
      description: getText(defaultLocale, "autoFocusNextDescription"),
    },
    mask: {
      control: { type: "boolean" },
      description: getText(defaultLocale, "maskDescription"),
    },
    autoClear: {
      control: { type: "boolean" },
      description: getText(defaultLocale, "autoClearDescription"),
    },
    stylingOptions: {
      control: { type: "object" },
      description: getText(defaultLocale, "stylingOptionsDescription"),
    },
    accessibilityOptions:{
      control: { type: "object" },
      description: getText(defaultLocale, "accessibilityOptionsDescription"),
    },
    securityOptions: {
      control: { type: "object" },
      description: getText(defaultLocale, "securityOptionsDescription"),
    },
    analyticsOptions: {
      control: { type: "object" },
      description: getText(defaultLocale, "analyticsOptionsDescription"),
    },
    monitoring: {
      control: { type: "object" },
      description: getText(defaultLocale, "monitoringDescription"),
    },
    inputConfig: {
      control: { type: "object" },
      description: getText(defaultLocale, "inputConfigDescription"),
    },
    containerConfig: {
      control: { type: "object" },
      description: getText(defaultLocale, "containerConfigDescription"),
    },
    themeConfig: {
      control: { type: "object" },
      description: getText(defaultLocale, "themeConfigDescription"),
    },
    responsiveConfig: {
      control: { type: "object" },
      description: getText(defaultLocale, "responsiveConfigDescription"),
    },
    i18nConfig: {
      control: { type: "object" },
      description: getText(defaultLocale, "i18nConfigDescription"),
    },
    renderCustomInput: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomInputDescription"),
    },
    renderCustomContainer: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomContainerDescription"),
    },
    renderCustomValidation: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomValidationDescription"),
    },
    renderCustomLoading: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomLoadingDescription"),
    },
    renderCustomError: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomErrorDescription"),
    },
    renderCustomSuccess: {
      control: { type: "object" },
      description: getText(defaultLocale, "renderCustomSuccessDescription"),
    },
    ref: {
      control: { type: "object" },
      description: getText(defaultLocale, "refDescription"),
    },
    onFocus: {
      control: { type: "object" },
      description: getText(defaultLocale, "onFocusDescription"),
    },
    onBlur: {
      control: { type: "object" },
      description: getText(defaultLocale, "onBlurDescription"),
    },
    onKeyDown: {
      control: { type: "object" },
      description: getText(defaultLocale, "onKeyDownDescription"),
    },
    onKeyUp: {
      control: { type: "object" },
      description: getText(defaultLocale, "onKeyUpDescription"),
    },
    onPaste: {
      control: { type: "object" },
      description: getText(defaultLocale, "onPasteDescription"),
    },
    onClear: {
      control: { type: "object" },
      description: getText(defaultLocale, "onClearDescription"),
    },
    onRetry: {
      control: { type: "object" },
      description: getText(defaultLocale, "onRetryDescription"),
    },
    onResize: {
      control: { type: "object" },
      description: getText(defaultLocale, "onResizeDescription"),
    },
    onAccessibilityAction: {
      control: { type: "object" },
      description: getText(defaultLocale, "onAccessibilityActionDescription"),
    },
    validationOptions: {
      control: { type: "object" },
      description: getText(defaultLocale, "validationOptionsDescription"),
    },
    // MissingPropsTable'da gösterilen prop'lar - Controls panelinde gizli
    otpValue: {
      table: { disable: true },
    },
    onOtpChange: {
      table: { disable: true },
    },
    onOtpComplete: {
      table: { disable: true },
    },
    validateOtp: {
      table: { disable: true },
    },
    inputType: {
      table: { disable: true },
    },
    maskCharacter: {
      table: { disable: true },
    },
    autoFocus: {
      table: { disable: true },
    },
    clearDelay: {
      table: { disable: true },
    },
    animationOptions: {
      table: { disable: true },
    },
    interactionOptions: {
      table: { disable: true },
    },
    performanceOptions: {
      table: { disable: true },
    },
    status: {
      table: { disable: true },
    },
    statusMessage: {
      table: { disable: true },
    },
    helperText: {
      table: { disable: true },
    },
    showClearButton: {
      table: { disable: true },
    },
    disabled: {
      table: { disable: true },
    },
    locale: {
      table: { disable: true },
    },
    fallbackLocale: {
      table: { disable: true },
    },
    translations: {
      table: { disable: true },
    },
    sx: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BcOtpInput>;

// Default story
export const Default: Story = {
  args: {
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    length: 6,
    appearance: "premium",
    inputShape: "square",
    inputSize: "medium",
    autoFocusNext: true,
    mask: false,
    autoClear: false,
    validationOptions: {
      enableAutoValidation: false,
    },
    showClearButton: true,
  },
  render: (args) => {
    const [otpValue, setOtpValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleOtpChange = React.useCallback(
      (value: string) => setOtpValue(value),
      []
    );
    const handleOtpComplete = React.useCallback((value: string) => {
      console.log("OTP Completed:", value);
    }, []);

    return (
      <BcOtpInput
        {...args}
        otpValue={otpValue}
        onOtpChange={handleOtpChange}
        onOtpComplete={handleOtpComplete}
      />
    );
  },
};

// Missing Props Table / Eksik Prop'lar Tablosu - EN ÜSTTE (Kullanıcılar önce tüm prop'ları görebilir)
export const MissingPropsTable: Story = {
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    label: getText(defaultLocale, "label"),
    placeholder: getText(defaultLocale, "placeholder"),
    length: 6,
    appearance: "premium",
    inputShape: "square",
    inputSize: "medium",
    autoFocusNext: true,
    mask: false,
    autoClear: false,
    validationOptions: {
      enableAutoValidation: false,
    },
    showClearButton: true,
    locale: defaultLocale,
  },
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const itemsPerPage = 10;

    const missingProps = [
      // OTP Specific Props
      {
        name: "otpValue",
        type: "string",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsOtpValue"),
      },
      {
        name: "onOtpChange",
        type: "function",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsOnOtpChange"),
      },
      {
        name: "onOtpComplete",
        type: "function",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsOnOtpComplete"),
      },
      {
        name: "validateOtp",
        type: "function",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsValidateOtp"),
      },
      {
        name: "inputType",
        type: "string",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsInputType"),
      },
      {
        name: "maskCharacter",
        type: "string",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsMaskCharacter"),
      },
      {
        name: "autoFocus",
        type: "boolean",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsAutoFocus"),
      },
      {
        name: "clearDelay",
        type: "number",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsClearDelay"),
      },
      {
        name: "animationOptions",
        type: "object",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsAnimationOptions"),
      },
      {
        name: "interactionOptions",
        type: "object",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsInteractionOptions"),
      },
      {
        name: "validationOptions",
        type: "object",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsValidationOptions"),
      },
      {
        name: "performanceOptions",
        type: "object",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsPerformanceOptions"),
      },
      {
        name: "monitoringOptions",
        type: "object",
        category: getText(locale, "categoryOtpSpecific"),
        description: getText(locale, "missingPropsMonitoringOptions"),
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
        name: "responsiveWidth",
        type: "boolean",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsResponsiveWidth"),
      },
      {
        name: "translations",
        type: "object",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsTranslations"),
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
        name: "onKeyDown",
        type: "function",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsOnKeyDown"),
      },
      {
        name: "onKeyUp",
        type: "function",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsOnKeyUp"),
      },
      {
        name: "ref",
        type: "RefObject",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsRef"),
      },
      {
        name: "sx",
        type: "object",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsSx"),
      },
      {
        name: "className",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsClassName"),
      },
      {
        name: "id",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsId"),
      },
      {
        name: "testId",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsTestId"),
      },
      {
        name: "ariaLabel",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsAriaLabel"),
      },
      {
        name: "ariaDescribedBy",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsAriaDescribedBy"),
      },
      {
        name: "ariaLabelledBy",
        type: "string",
        category: getText(locale, "categoryBcTextFieldInherited"),
        description: getText(locale, "missingPropsAriaLabelledBy"),
      },
    ];

    const filteredProps = missingProps.filter(
      (prop) =>
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
            {getText(locale, "missingPropsTableDescription")}
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
          <input
            type="text"
            placeholder={
              getText(locale, "missingPropsSearchPlaceholder") ||
              "Search props..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
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
            {getText(locale, "missingPropsShowing") || "Showing"}{" "}
            {filteredProps.length}{" "}
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
        story: getText(defaultLocale, "missingPropsTableDescription"),
      },
    },
  },
};

// Different Sizes
export const DifferentSizes: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";

    // Her input için ayrı state
    const [smallValue, setSmallValue] = useState("");
    const [mediumValue, setMediumValue] = useState("");
    const [largeValue, setLargeValue] = useState("");
    const [xlargeValue, setXlargeValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleSmallChange = React.useCallback(
      (value: string) => setSmallValue(value),
      []
    );
    const handleMediumChange = React.useCallback(
      (value: string) => setMediumValue(value),
      []
    );
    const handleLargeChange = React.useCallback(
      (value: string) => setLargeValue(value),
      []
    );
    const handleXlargeChange = React.useCallback(
      (value: string) => setXlargeValue(value),
      []
    );

    // Args'tan otpValue ve onOtpChange prop'larını çıkar
    const { otpValue, onOtpChange, ...cleanArgs } = args;

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "sizeSmall")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            otpValue={smallValue}
            onOtpChange={handleSmallChange}
            length={6}
            inputSize="small"
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "sizeMedium")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            otpValue={mediumValue}
            onOtpChange={handleMediumChange}
            length={6}
            inputSize="medium"
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "sizeLarge")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            otpValue={largeValue}
            onOtpChange={handleLargeChange}
            length={6}
            inputSize="large"
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "sizeXLarge")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            otpValue={xlargeValue}
            onOtpChange={handleXlargeChange}
            length={6}
            inputSize="xlarge"
            locale={locale}
          />
        </Box>
      </Stack>
    );
  },
};

// Different Shapes
export const DifferentShapes: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";

    // Her input için ayrı state
    const [squareValue, setSquareValue] = useState("");
    const [circleValue, setCircleValue] = useState("");
    const [roundedValue, setRoundedValue] = useState("");
    const [hexagonValue, setHexagonValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleSquareChange = React.useCallback(
      (value: string) => setSquareValue(value),
      []
    );
    const handleCircleChange = React.useCallback(
      (value: string) => setCircleValue(value),
      []
    );
    const handleRoundedChange = React.useCallback(
      (value: string) => setRoundedValue(value),
      []
    );
    const handleHexagonChange = React.useCallback(
      (value: string) => setHexagonValue(value),
      []
    );

    // Args'tan otpValue ve onOtpChange prop'larını çıkar
    const { otpValue, onOtpChange, ...cleanArgs } = args;

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "shapeSquare")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            inputShape="square"
            otpValue={squareValue}
            onOtpChange={handleSquareChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "shapeCircle")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            inputShape="circle"
            otpValue={circleValue}
            onOtpChange={handleCircleChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "shapeRounded")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            inputShape="rounded"
            otpValue={roundedValue}
            onOtpChange={handleRoundedChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "shapeHexagon")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            inputShape="hexagon"
            otpValue={hexagonValue}
            onOtpChange={handleHexagonChange}
            locale={locale}
          />
        </Box>
      </Stack>
    );
  },
};

// Different Appearances
export const DifferentAppearances: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";

    // Her input için ayrı state
    const [premiumValue, setPremiumValue] = useState("");
    const [softValue, setSoftValue] = useState("");
    const [glassValue, setGlassValue] = useState("");
    const [minimalValue, setMinimalValue] = useState("");
    const [neumorphValue, setNeumorphValue] = useState("");
    const [underlineValue, setUnderlineValue] = useState("");
    const [darkValue, setDarkValue] = useState("");
    const [borderlessValue, setBorderlessValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handlePremiumChange = React.useCallback(
      (value: string) => setPremiumValue(value),
      []
    );
    const handleSoftChange = React.useCallback(
      (value: string) => setSoftValue(value),
      []
    );
    const handleGlassChange = React.useCallback(
      (value: string) => setGlassValue(value),
      []
    );
    const handleMinimalChange = React.useCallback(
      (value: string) => setMinimalValue(value),
      []
    );
    const handleNeumorphChange = React.useCallback(
      (value: string) => setNeumorphValue(value),
      []
    );
    const handleUnderlineChange = React.useCallback(
      (value: string) => setUnderlineValue(value),
      []
    );
    const handleDarkChange = React.useCallback(
      (value: string) => setDarkValue(value),
      []
    );
    const handleBorderlessChange = React.useCallback(
      (value: string) => setBorderlessValue(value),
      []
    );

    // Args'tan otpValue ve onOtpChange prop'larını çıkar
    const { otpValue, onOtpChange, ...cleanArgs } = args;

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "appearancePremium")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            appearance="premium"
            otpValue={premiumValue}
            onOtpChange={handlePremiumChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "appearanceSoft")}
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="soft"
            otpValue={softValue}
            onOtpChange={handleSoftChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "appearanceGlass")}
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="glass"
            otpValue={glassValue}
            onOtpChange={handleGlassChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "appearanceMinimal")}
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="minimal"
            otpValue={minimalValue}
            onOtpChange={handleMinimalChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Neumorph
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="neumorph"
            otpValue={neumorphValue}
            onOtpChange={handleNeumorphChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Underline
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="underline"
            otpValue={underlineValue}
            onOtpChange={handleUnderlineChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Dark
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="dark"
            otpValue={darkValue}
            onOtpChange={handleDarkChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Borderless
          </Typography>
          <BcOtpInput
            {...args}
            length={6}
            appearance="borderless"
            otpValue={borderlessValue}
            onOtpChange={handleBorderlessChange}
            locale={locale}
          />
        </Box>
      </Stack>
    );
  },
};

// Status States
export const StatusStates: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";

    // Her input için ayrı state
    const [successValue, setSuccessValue] = useState("");
    const [errorValue, setErrorValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleSuccessChange = React.useCallback(
      (value: string) => setSuccessValue(value),
      []
    );
    const handleErrorChange = React.useCallback(
      (value: string) => setErrorValue(value),
      []
    );

    // Args'tan otpValue ve onOtpChange prop'larını çıkar
    const { otpValue, onOtpChange, ...cleanArgs } = args;

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "statusSuccess")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            status="success"
            statusMessage={getText(locale, "statusSuccessMessage")}
            appearance="premium"
            otpValue={successValue}
            onOtpChange={handleSuccessChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "statusError")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            status="error"
            statusMessage={getText(locale, "statusErrorMessage")}
            appearance="premium"
            otpValue={errorValue}
            onOtpChange={handleErrorChange}
            locale={locale}
          />
        </Box>
      </Stack>
    );
  },
};

// Auto Focus Next Feature
export const AutoFocusNext: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";

    // Her input için ayrı state
    const [enabledValue, setEnabledValue] = useState("");
    const [disabledValue, setDisabledValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleEnabledChange = React.useCallback(
      (value: string) => setEnabledValue(value),
      []
    );
    const handleDisabledChange = React.useCallback(
      (value: string) => setDisabledValue(value),
      []
    );

    // Args'tan otpValue ve onOtpChange prop'larını çıkar
    const { otpValue, onOtpChange, ...cleanArgs } = args;

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "autoFocusNextEnabled")}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Bir kutu doldurulduğunda otomatik olarak sonraki kutuya geçer
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            autoFocusNext={true}
            label={getText(locale, "autoFocusNextEnabledLabel")}
            helperText={getText(locale, "autoFocusNextEnabledHelperText")}
            appearance="premium"
            otpValue={enabledValue}
            onOtpChange={handleEnabledChange}
            locale={locale}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {getText(locale, "autoFocusNextDisabled")}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {getText(locale, "autoFocusNextDisabledHelperText")}
          </Typography>
          <BcOtpInput
            {...cleanArgs}
            length={6}
            autoFocusNext={false}
            label={getText(locale, "autoFocusNextDisabledLabel")}
            helperText={getText(locale, "autoFocusNextDisabledHelperText")}
            appearance="premium"
            otpValue={disabledValue}
            onOtpChange={handleDisabledChange}
            locale={locale}
          />
        </Box>
      </Stack>
    );
  },
};

// Interactive example
export const InteractiveExample: Story = {
  render: (
    args,
    context: { globals?: { locale?: string }; locale?: string }
  ) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [otpValue, setOtpValue] = useState("");

    // Stable callbacks to prevent infinite re-renders
    const handleOtpChange = React.useCallback(
      (value: string) => setOtpValue(value),
      []
    );
    const handleOtpComplete = React.useCallback((value: string) => {
      console.log("OTP Completed:", value);
      alert(`OTP Completed: ${value}`);
    }, []);
    const validateOtp = React.useCallback((value: string) => {
      // Simple validation example
      return value === "123456" ? true : "OTP must be 123456";
    }, []);

    return (
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          {getText(locale, "componentTitle")}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {getText(locale, "helperText")}
        </Typography>
        <BcOtpInput
          {...args}
          length={6}
          otpValue={otpValue}
          onOtpChange={handleOtpChange}
          onOtpComplete={handleOtpComplete}
          validateOtp={validateOtp}
          appearance="premium"
          locale={locale}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Current OTP Value: <strong>{otpValue || "Empty"}</strong>
          </Typography>
        </Box>
      </Paper>
    );
  },
};
