import React, {
  useState,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { BcTextField } from "../BcTextField/BcTextField";
import { countryList, countryList as defaultCountryList } from "./utils";
import enTexts from "../i18n/i18n/en.json";
import trTexts from "../i18n/i18n/tr.json";
import { BcPhoneInputProps, CountryCode } from "./BcPhoneInput.types";
import type { CountryType } from "./types";
import { useBcPhoneInputLogic } from "./hooks/useBcPhoneInputLogic";
import { useBcPhoneInputValidation } from "./hooks/useBcPhoneInputValidation";
import { useBcPhoneInputFormatting } from "./hooks/useBcPhoneInputFormatting";
import { usePhoneAccessibility } from "./hooks/usePhoneAccessibility";
import { usePhonePerformance } from "./hooks/usePhonePerformance";
import { usePhoneMonitoring } from "./hooks/usePhoneMonitoring";
import { usePhoneSmartFeatures } from "./hooks/usePhoneSmartFeatures";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { countrySelectAppearances, countrySelectStyle } from "./styles";
import StarIcon from '@mui/icons-material/Star';

let FixedSizeList: any = null;
let isReactWindowLoading = false;

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcPhoneInput,
  tr: trTexts.BcPhoneInput,
};

type Locale = keyof typeof TEXTS;

const getText = (
  locale: Locale | undefined,
  key: string,
  fallbackLocale?: Locale
): string => {
  const safeLocale = locale || "en";
  return (
    TEXTS[safeLocale]?.[key] ||
    (fallbackLocale && TEXTS[fallbackLocale]?.[key]) ||
    TEXTS.en[key] ||
    key
  );
};

// Virtualized Menu List for large country lists
function VirtualizedMenuList({ items, getItemLabel, getItemKey, renderItem, height = 300, itemSize = 44, ...props }: {
  items: any[];
  getItemLabel: (item: any, index: number) => string;
  getItemKey: (item: any, index: number) => string | number;
  renderItem: (item: any, index: number) => React.ReactNode;
  height?: number;
  itemSize?: number;
}) {
  const [isLoaded, setIsLoaded] = React.useState(!!FixedSizeList);

  // Lazy load react-window if not already loaded
  React.useEffect(() => {
    if (!FixedSizeList && !isReactWindowLoading) {
      isReactWindowLoading = true;
      import('react-window').then(module => {
        FixedSizeList = module.FixedSizeList;
        setIsLoaded(true);
        isReactWindowLoading = false;
      }).catch(() => {
        isReactWindowLoading = false;
      });
    }
  }, []);

  // Fallback to regular rendering while loading or if react-window is not available
  if (!isLoaded || !FixedSizeList) {
    return (
      <div style={{ height, overflow: 'auto', maxWidth: 320 }}>
        {items.map((item, index) => (
          <div key={getItemKey(item, index)}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <FixedSizeList
      height={height}
      itemCount={items.length}
      itemSize={itemSize}
      width="100%"
      overscanCount={6}
      style={{ maxWidth: 320 }}
    >
      {({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style} key={getItemKey(items[index], index)}>
          {renderItem(items[index], index)}
        </div>
      )}
    </FixedSizeList>
  );
}

// Ülke kodunu emoji bayrağa çeviren yardımcı fonksiyon
function countryCodeToFlagEmoji(code: string): string {
  if (!code) return '';
  // ISO 3166-1 alpha-2 kodunu Unicode flag'e çevir
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export const BcPhoneInput = forwardRef<HTMLInputElement, BcPhoneInputProps>(
  (
    {
      // === TELEFON-SPECIFIC PROPS ===
      country = "TR",
      validatePhone,
      getMask,
      showMaskInPlaceholder = true,
      inputMode = "tel",
      showCountrySelect,
      fetchCountries,
      favoriteCountries = [],
      onCountryChange,

      // === GELİŞMİŞ ÖZELLİKLER ===
      enablePhoneFormatting = true,
      enableAdvancedValidation = true,
      enableAutoCountryDetection = false,
      enablePhoneSuggestions = true,
      enablePhoneHistory = true,

      // === ENTERPRISE FEATURES ===
      enableAccessibility = true,
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
      enablePerformance = false,
      enableMonitoring = false,
      enableSmartFeatures = false,
      enableSmartPlaceholder = false,
      enableSmartValidation = false,
      enableSmartSuggestions = false,
      enableSmartFormatting = false,
      enableSmartCountryDetection = false,
      enableLearning = false,
      enablePersonalization = false,
      enableContextualHelp = false,
      enableProgressiveDisclosure = false,
      enableAdaptiveUI = false,
      enableIntegration = false,
      integrationTimeout = 5000,
      integrationRetries = 3,
      integrationDelay = 1000,

      // === BcTextField PROPS ===
      appearance,
      disabled,
      locale = "en",
      fallbackLocale = "en",
      label,
      placeholder,
      statusMessage,
      autoFocus = false,
      ...rest
    },
    ref
  ) => {
    // === ENTERPRISE HOOK'LAR ===
    const accessibility = usePhoneAccessibility({
      enableScreenReaderSupport: enableAccessibility && enableScreenReaderSupport,
      enableKeyboardNavigation: enableAccessibility && enableKeyboardNavigation,
      enableHighContrast: enableAccessibility && enableHighContrast,
      enableReducedMotion: enableAccessibility && enableReducedMotion,
      enableFocusManagement: enableAccessibility && enableFocusManagement,
      enableARIALabels: enableAccessibility && enableARIALabels,
      enableLiveRegions: enableAccessibility && enableLiveRegions,
      enableSkipLinks: enableAccessibility && enableSkipLinks,
      enableTooltips: enableAccessibility && enableTooltips,
      enableErrorAnnouncements: enableAccessibility && enableErrorAnnouncements,
      enableStatusAnnouncements: enableAccessibility && enableStatusAnnouncements,
      enableProgressAnnouncements: enableAccessibility && enableProgressAnnouncements,
      locale,
      country,
      showCountrySelect,
    });

    const performance = usePhonePerformance({
      enablePerformanceTracking: enablePerformance,
      enableRenderTracking: enablePerformance,
      enableMemoryTracking: enablePerformance,
      enableNetworkTracking: enablePerformance,
      enableUserInteractionTracking: enablePerformance,
      enablePerformanceOptimization: enablePerformance,
      enableDebouncing: enablePerformance,
      enableThrottling: enablePerformance,
      enableCaching: enablePerformance,
      enableMemoization: enablePerformance,
    });

    const monitoring = usePhoneMonitoring({
      enableMonitoring: enableMonitoring,
      enableRealTimeMonitoring: enableMonitoring,
      enableAnalytics: enableMonitoring,
      enableErrorReporting: enableMonitoring,
      enablePerformanceMonitoring: enableMonitoring,
      enableUserBehaviorTracking: enableMonitoring,
      enableSecurityMonitoring: enableMonitoring,
      enableCustomEvents: enableMonitoring,
    });

    const smartFeatures = usePhoneSmartFeatures({
      enableSmartPlaceholder: enableSmartFeatures && enableSmartPlaceholder,
      enableSmartValidation: enableSmartFeatures && enableSmartValidation,
      enableSmartSuggestions: enableSmartFeatures && enableSmartSuggestions,
      enableSmartFormatting: enableSmartFeatures && enableSmartFormatting,
      enableSmartCountryDetection: enableSmartFeatures && enableSmartCountryDetection,
      enableLearning: enableSmartFeatures && enableLearning,
      enablePersonalization: enableSmartFeatures && enablePersonalization,
      enableContextualHelp: enableSmartFeatures && enableContextualHelp,
      enableProgressiveDisclosure: enableSmartFeatures && enableProgressiveDisclosure,
      enableAdaptiveUI: enableSmartFeatures && enableAdaptiveUI,
    });

    // Integration hook - currently not used in render but available for future use
    // const integration = usePhoneIntegration({
    //   enableFormIntegration: enableIntegration,
    //   enableValidationIntegration: enableIntegration,
    //   enableStateIntegration: enableIntegration,
    //   enableEventIntegration: enableIntegration,
    //   enableDataIntegration: enableIntegration,
    //   enableAPIIntegration: enableIntegration,
    //   enableStorageIntegration: enableIntegration,
    //   enableThemeIntegration: enableIntegration,
    //   enableI18nIntegration: enableIntegration,
    //   enableAccessibilityIntegration: enableIntegration,
    //   enablePerformanceIntegration: enableIntegration,
    //   enableMonitoringIntegration: enableMonitoring,
    //   enableTestingIntegration: enableIntegration,
    //   enableCustomIntegration: enableIntegration,
    // });

    // === CORE HOOK'LAR ===
    const phoneLogic = useBcPhoneInputLogic({
      defaultCountry: country,
      defaultPhone:
        (rest.value as string) || (rest.defaultValue as string) || "",
      countryList: defaultCountryList,
      favoriteCountries: [],
      enableAdvancedFeatures: enableSmartFeatures,
      formatting: {
        enableFormatting: enablePhoneFormatting,
        formatOnChange: true,
        formatOnBlur: false,
      },
      validation: {
        enableValidation: enableAdvancedValidation,
        enableSuggestions: enablePhoneSuggestions,
      },
      search: {
        enableSearch: false,
        debounceMs: performance.optimization.debounceMs,
        minSearchLength: 1,
      },
      history: {
        enableHistory: enablePhoneHistory,
        maxEntries: 100,
        enableFavorites: true,
      },
    });

    const phoneValidation = useBcPhoneInputValidation(
      phoneLogic.state.phone,
      phoneLogic.state.country,
      phoneLogic.selectedCountry ? [phoneLogic.selectedCountry] : [],
      {
        enableValidation: enableAdvancedValidation,
        enableSuggestions: enablePhoneSuggestions,
      }
    );

    const phoneFormatting = useBcPhoneInputFormatting(
      phoneLogic.state.phone,
      phoneLogic.state.country,
      phoneLogic.selectedCountry ? [phoneLogic.selectedCountry] : [],
      {
        enableFormatting: enablePhoneFormatting,
        formatOnChange: true,
        formatOnBlur: false,
      }
    );

    // === STATE ===
    const liveRegionRef = React.useRef<HTMLDivElement>(null);

    const phone = (rest.value as string) || (rest.defaultValue as string) || "";
    const isValid = validatePhone
      ? validatePhone(phone, country)
      : phoneValidation.validation.isValid;

    const [loadingCountries, setLoadingCountries] = useState(false);

    const [usedCountryList, setUsedCountryList] = useState<CountryType[]>(
      Array.isArray(countryList) ? countryList : defaultCountryList
    );
    const [recentCountries, setRecentCountries] = useState<string[]>([]);
    const [screenReaderMessage, setScreenReaderMessage] = useState<string>("");

    // === HANDLERS ===
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (enablePhoneFormatting) {
          newValue = phoneFormatting.formatOnChange(newValue, country);
        }
        if (!rest.value && rest.onChange) {
          rest.onChange({ ...e, target: { ...e.target, value: newValue } });
        }
      },
      [enablePhoneFormatting, rest, phoneFormatting, country]
    );

    // === I18N ===
    const i18nLabel = label || getText(locale, "label", fallbackLocale);
    const i18nStatusMessage =
      statusMessage || getText(locale, "invalidPhoneMessage", fallbackLocale);
    const phonePlaceholder =
      placeholder || getText(locale, "placeholder", fallbackLocale);

    // Dinamik veya async countryList desteği
    useEffect(() => {
      let isMounted = true;
      const loadCountries = async () => {
        setLoadingCountries(true);
        let list: CountryType[] = Array.isArray(countryList)
          ? countryList
          : defaultCountryList;
        if (countryList && countryList instanceof Promise) {
          list = await countryList;
        }
        if (fetchCountries) {
          try {
            const fetched = await fetchCountries();
            if (isMounted) setUsedCountryList(fetched);
          } catch (error) {
            console.warn("BcPhoneInput: Failed to fetch countries:", error);
            if (isMounted) setUsedCountryList(list);
          } finally {
            if (isMounted) setLoadingCountries(false);
          }
        } else {
          if (isMounted) setUsedCountryList(list);
          setLoadingCountries(false);
        }
      };
      loadCountries();
      return () => {
        isMounted = false;
      };
    }, [fetchCountries]);

    // Son kullanılan ülkeleri localStorage'dan yükle
    useEffect(() => {
      try {
        const stored = localStorage.getItem("bc-phoneinput-recent-countries");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setRecentCountries(parsed);
          }
        }
      } catch (error) {
        console.warn(
          "BcPhoneInput: Failed to load recent countries from localStorage:",
          error
        );
      }
    }, []);

    // Ülke değiştiğinde son kullanılanlara ekle
    useEffect(() => {
      if (!country) return;
      setRecentCountries((prev) => {
        const updated = [country, ...prev.filter((c) => c !== country)].slice(
          0,
          3
        );
        try {
          localStorage.setItem(
            "bc-phoneinput-recent-countries",
            JSON.stringify(updated)
          );
        } catch (error) {
          console.warn(
            "BcPhoneInput: Failed to save recent countries to localStorage:",
            error
          );
        }
        return updated;
      });
    }, [country]);

    // Favori, son kullanılan ve diğer ülkeleri grupla
    const groupedCountries = useMemo(() => {
      const all = usedCountryList;
      const favs = favoriteCountries
        .map((code) => all.find((c) => c.code === code))
        .filter(Boolean) as CountryType[];
      const recents = recentCountries
        .filter((code: string) => !favoriteCountries.includes(code as CountryCode))
        .map((code: string) => all.find((c) => c.code === code))
        .filter(Boolean) as CountryType[];
      const others = all.filter(
        (c) =>
          !favs.some((f) => f.code === c.code) &&
          !recents.some((r) => r.code === c.code)
      );
      return { favs, recents, others };
    }, [usedCountryList, favoriteCountries, recentCountries]);

    const handleCountryChange = useCallback((event: SelectChangeEvent<string>) => {
      const value = event.target.value as CountryCode;
      if (onCountryChange) {
        onCountryChange(value);
        // Ekran okuyucuya ülke kodu değişti mesajı gönder
        const selected = usedCountryList.find(c => c.code === value as string);
        if (selected) {
          const message = locale === 'tr' 
            ? `Ülke kodu değişti: ${selected.name}` 
            : `Country code changed: ${selected.name}`;
          setScreenReaderMessage(message);
        }
      }
    }, [onCountryChange, usedCountryList, locale]);


    const selectAppearance = (appearance && Object.prototype.hasOwnProperty.call(countrySelectAppearances, appearance)) ? appearance as keyof typeof countrySelectAppearances : undefined;
    const isDark = appearance === 'dark';

    const selectStyle = {
      ...countrySelectStyle,
      ...(selectAppearance ? countrySelectAppearances[selectAppearance] : {}),
      ...(disabled ? { background: '#eee', color: '#aaa', cursor: 'not-allowed' } : {}),
      minWidth: 90,
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
      marginLeft: 4,
      marginRight: 8,
      padding: 0,
      fontWeight: 500,
      fontSize: 15,
      display: 'flex',
      alignItems: 'center',
      color: isDark ? '#fff' : undefined,
      ...(appearance === 'underline' && {
        border: 'none',
        background: 'transparent',
        color: '#222',
        borderRadius: 0,
        minWidth: 90,
        fontWeight: 600,
        fontSize: 16,
        padding: 0,
      }),
      ...(isDark && {
        background: '#fff',
        color: '#222',
      }),
      '&.MuiInputBase-root-MuiInput-root-MuiSelect-root': {
        marginLeft: 0,
      },
    };


    // Select node as inputPrefix (only if showCountrySelect)
    const i18nFavorites = getText(locale, 'favorites', fallbackLocale) || 'Favorites';
    const i18nRecents = getText(locale, 'recents', fallbackLocale) || 'Recently Used';
    const i18nCountryLabel = getText(locale, 'countryLabel', fallbackLocale) || 'Ülke';

    let selectNode: React.ReactNode;
    if (showCountrySelect === "readonly") {
      const selected = usedCountryList.find((c) => c.code === country);
      selectNode = (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 14,
            mr: 1,
            ml: 0,
            color: "#222",
            userSelect: "none",
            minWidth: 60,
          }}
        >
          {selected ? `${selected.name} +${selected.dial}` : ""}
        </Box>
      );
    } else if (showCountrySelect) {
      // Sanal render için düzleştirilmiş ülke listesi (başlıklar dahil)
      const flatMenuItems: Array<{
        type: "header" | "country";
        label?: string;
        country?: CountryType;
      }> = [];
      if (groupedCountries.favs.length > 0) {
        flatMenuItems.push({ type: "header", label: i18nFavorites });
        groupedCountries.favs.forEach((c) =>
          flatMenuItems.push({ type: "country", country: c })
        );
      }
      if (groupedCountries.recents.length > 0) {
        flatMenuItems.push({ type: "header", label: i18nRecents });
        groupedCountries.recents.forEach((c) =>
          flatMenuItems.push({ type: "country", country: c })
        );
      }
      groupedCountries.others.forEach((c) =>
        flatMenuItems.push({ type: "country", country: c })
      );

      selectNode = (
        <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }}>
          <FormControl
            variant="standard"
            sx={{
              minWidth: 90,
              mr: 1,
              mt: 0.5,
              m: 0,
              p: 0,
              "& .MuiInputBase-root": { m: 0, p: 0 },
            }}
            disabled={disabled}
          >
            <Select
              value={country}
              onChange={handleCountryChange}
              label={i18nCountryLabel}
              size="small"
               sx={{
                 ...selectStyle,
                 marginLeft: 0,
                 marginRight: 0,
                 p: 0,
                 "&.MuiInputBase-root": { m: 0, p: 0 },
                 "& .MuiSelect-select": { 
                   pr: "18px", 
                   pl: 0,
                   paddingTop: 0,
                 },
               }}
              inputProps={{
                "aria-label": `${i18nCountryLabel} - Select country for phone number`,
                "aria-describedby":
                  typeof rest["aria-describedby"] === "string"
                    ? rest["aria-describedby"]
                    : undefined,
                "aria-required":
                  typeof rest.required === "boolean"
                    ? rest.required
                    : undefined,
                "aria-invalid": phone.length > 0 && !isValid ? true : undefined,
              }}
              disableUnderline
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: { minWidth: 120 },
                  ...(flatMenuItems.length > 50
                    ? {
                        component: React.forwardRef(function VirtualizedPaper(
                          props,
                          ref
                        ) {
                          return (
                            <div
                              ref={ref as React.Ref<HTMLDivElement>}
                              {...props}
                            >
                              <VirtualizedMenuList
                                items={flatMenuItems}
                                getItemLabel={(item) =>
                                  item.type === "header"
                                    ? item.label!
                                    : item.country!.code
                                }
                                getItemKey={(item, idx) =>
                                  item.type === "header"
                                    ? `header-${item.label}`
                                    : item.country!.code
                                }
                                renderItem={(item, idx) =>
                                  item.type === "header" ? (
                                    <MenuItem
                                      key={`header-${item.label}`}
                                      disabled
                                      sx={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        opacity: 0.7,
                                        pointerEvents: "none",
                                        borderTop:
                                          idx !== 0
                                            ? "1px solid #eee"
                                            : undefined,
                                        mt: idx !== 0 ? 1 : 0,
                                      }}
                                      aria-label={item.label}
                                    >
                                      {item.label}
                                    </MenuItem>
                                  ) : (
                                    <MenuItem
                                      key={item.country!.code}
                                      value={item.country!.code}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        pr: 0.5,
                                      }}
                                    >
                                      <Box
                                        component="span"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          fontWeight: 500,
                                          fontSize: 14,
                                          px: 0.25,
                                          py: 0.25,
                                          width: "100%",
                                        }}
                                      >
                                         {(item.country!.flag && item.country!.flag.trim() !== "") || countryCodeToFlagEmoji(item.country!.code) ? (
                                           <span
                                             style={{
                                               display: "flex",
                                               alignItems: "center",
                                               justifyContent: "center",
                                               width: 24,
                                               height: 24,
                                               background: "#f5f5f5",
                                               borderRadius: "50%",
                                               border: "1px solid #e0e0e0",
                                               fontSize: 16,
                                               marginRight: 6,
                                               flexShrink: 0,
                                               overflow: "hidden",
                                             }}
                                           >
                                             {item.country!.flag &&
                                             item.country!.flag.trim() !== "" ? (
                                               <img
                                                 src={item.country!.flag}
                                                 alt={`Flag of ${
                                                   item.country!.name
                                                 }`}
                                                 style={{
                                                   width: 20,
                                                   height: 20,
                                                   objectFit: "cover",
                                                   display: "block",
                                                 }}
                                               />
                                             ) : (
                                               countryCodeToFlagEmoji(
                                                 item.country!.code
                                               )
                                             )}
                                           </span>
                                         ) : null}
                                        <Box
                                          sx={{ fontWeight: 700, minWidth: 24 }}
                                        >
                                          {item.country!.code}
                                        </Box>
                                        <Box
                                          sx={{
                                            color: "#888",
                                            fontWeight: 500,
                                            minWidth: 28,
                                            ml: 0.5,
                                          }}
                                        >
                                          +{item.country!.dial}
                                        </Box>
                                        {groupedCountries.favs.some(
                                          (f) => f.code === item.country!.code
                                        ) && (
                                          <StarIcon
                                            data-testid="StarIcon"
                                            sx={{
                                              color: "#FFD700",
                                              fontSize: 18,
                                              ml: 0.5,
                                            }}
                                          />
                                        )}
                                      </Box>
                                    </MenuItem>
                                  )
                                }
                              />
                            </div>
                          );
                        }),
                      }
                    : {}),
                },
              }}
              renderValue={(selected) => {
                const selectedCountry = usedCountryList.find(
                  (c) => c.code === selected
                );
                return selectedCountry
                  ? `${selectedCountry.code} +${selectedCountry.dial}`
                  : "";
              }}
            >
              {loadingCountries ? (
                <MenuItem disabled>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  {getText(locale, "loading", fallbackLocale) ||
                    "Yükleniyor..."}
                </MenuItem>
              ) : (
                [
                  ...(groupedCountries.favs.length > 0
                    ? [
                        <MenuItem
                          key="fav-header"
                          disabled
                          sx={{
                            fontWeight: 700,
                            fontSize: 13,
                            opacity: 0.7,
                            pointerEvents: "none",
                          }}
                          aria-label={i18nFavorites}
                        >
                          {i18nFavorites}
                        </MenuItem>,
                        ...groupedCountries.favs.map((c) => (
                          <MenuItem
                            key={c.code}
                            value={c.code}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              pr: 0.5,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 500,
                                fontSize: 14,
                                px: 0.25,
                                py: 0.25,
                                width: "100%",
                              }}
                            >
                              {(c.flag && c.flag.trim() !== "") || countryCodeToFlagEmoji(c.code) ? (
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 24,
                                    height: 24,
                                    background: "#f5f5f5",
                                    borderRadius: "50%",
                                    border: "1px solid #e0e0e0",
                                    fontSize: 16,
                                    marginRight: 6,
                                    flexShrink: 0,
                                    overflow: "hidden",
                                  }}
                                >
                                  {c.flag && c.flag.trim() !== "" ? (
                                    <img
                                      src={c.flag}
                                      alt={`Flag of ${c.name}`}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                    />
                                  ) : (
                                    countryCodeToFlagEmoji(c.code)
                                  )}
                                </span>
                              ) : null}
                              <Box sx={{ fontWeight: 700, minWidth: 24 }}>
                                {c.code}
                              </Box>
                              <Box
                                sx={{
                                  color: "#888",
                                  fontWeight: 500,
                                  minWidth: 28,
                                  ml: 0.5,
                                }}
                              >
                                +{c.dial}
                              </Box>
                              <StarIcon
                                sx={{ color: "#FFD700", fontSize: 18, ml: 0.5 }}
                              />
                            </Box>
                          </MenuItem>
                        )),
                      ]
                    : []),
                  ...(groupedCountries.recents.length > 0
                    ? [
                        <MenuItem
                          key="recents-header"
                          disabled
                          sx={{
                            fontWeight: 700,
                            fontSize: 13,
                            opacity: 0.7,
                            pointerEvents: "none",
                            borderTop: "1px solid #eee",
                            mt: 1,
                          }}
                          aria-label={i18nRecents}
                        >
                          {i18nRecents}
                        </MenuItem>,
                        ...groupedCountries.recents.map((c) => (
                          <MenuItem
                            key={c.code}
                            value={c.code}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              pr: 0.5,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 500,
                                fontSize: 14,
                                px: 0.25,
                                py: 0.25,
                                width: "100%",
                              }}
                            >
                              {(c.flag && c.flag.trim() !== "") || countryCodeToFlagEmoji(c.code) ? (
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 24,
                                    height: 24,
                                    background: "#f5f5f5",
                                    borderRadius: "50%",
                                    border: "1px solid #e0e0e0",
                                    fontSize: 16,
                                    marginRight: 6,
                                    flexShrink: 0,
                                    overflow: "hidden",
                                  }}
                                >
                                  {c.flag && c.flag.trim() !== "" ? (
                                    <img
                                      src={c.flag}
                                      alt={`Flag of ${c.name}`}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                    />
                                  ) : (
                                    countryCodeToFlagEmoji(c.code)
                                  )}
                                </span>
                              ) : null}
                              <Box sx={{ fontWeight: 700, minWidth: 24 }}>
                                {c.code}
                              </Box>
                              <Box
                                sx={{
                                  color: "#888",
                                  fontWeight: 500,
                                  minWidth: 28,
                                  ml: 0.5,
                                }}
                              >
                                +{c.dial}
                              </Box>
                            </Box>
                          </MenuItem>
                        )),
                      ]
                    : []),
                  ...groupedCountries.others.map((c) => (
                    <MenuItem
                      key={c.code}
                      value={c.code}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        pr: 0.5,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 500,
                          fontSize: 14,
                          px: 0.25,
                          py: 0.25,
                          width: "100%",
                        }}
                      >
                        {(c.flag && c.flag.trim() !== "") || countryCodeToFlagEmoji(c.code) ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 24,
                              height: 24,
                              background: "#f5f5f5",
                              borderRadius: "50%",
                              border: "1px solid #e0e0e0",
                              fontSize: 16,
                              marginRight: 6,
                              flexShrink: 0,
                              overflow: "hidden",
                            }}
                          >
                            {c.flag && c.flag.trim() !== "" ? (
                              <img
                                src={c.flag}
                                alt={`Flag of ${c.name}`}
                                style={{
                                  width: 20,
                                  height: 20,
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            ) : (
                              countryCodeToFlagEmoji(c.code)
                            )}
                          </span>
                        ) : null}
                        <Box sx={{ fontWeight: 700, minWidth: 24 }}>
                          {c.code}
                        </Box>
                        <Box
                          sx={{
                            color: "#888",
                            fontWeight: 500,
                            minWidth: 28,
                            ml: 0.5,
                          }}
                        >
                          +{c.dial}
                        </Box>
                      </Box>
                    </MenuItem>
                  )),
                ]
              )}
            </Select>
          </FormControl>
        </Box>
      );
    }

    // === PERFORMANCE TRACKING ===
    useEffect(() => {
      if (enablePerformance) {
        performance.tracking.startRender();
        return () => {
          performance.tracking.endRender();
        };
      }
    }, [enablePerformance, performance.tracking]);

    // === MONITORING ===
    useEffect(() => {
      if (enableMonitoring) {
        monitoring.monitoring.trackComponentMount();
        return () => {
          monitoring.monitoring.trackComponentUnmount();
        };
      }
    }, [enableMonitoring, monitoring.monitoring]);

    // === SMART FEATURES ===
    const smartPlaceholder = useMemo(() => {
      if (enableSmartFeatures) {
        return smartFeatures.smartPlaceholder.generatePlaceholder(country);
      }
      return phonePlaceholder;
    }, [enableSmartFeatures, smartFeatures.smartPlaceholder, country, phonePlaceholder]);

    // === ACCESSIBILITY ===
    const accessibilityProps = useMemo(() => {
      if (!enableAccessibility) return {};
      
      return {
        'aria-label': accessibility.ariaLabel,
        'aria-describedby': accessibility.ariaDescribedBy,
        'aria-labelledby': accessibility.ariaLabelledBy,
        'aria-invalid': !isValid && phone.length > 0,
        'aria-required': rest.required,
        'aria-disabled': disabled,
        'data-testid': 'bc-phone-input',
        title: accessibility.screenReaderInstructions,
      };
    }, [enableAccessibility, accessibility, isValid, phone, disabled, rest.required]);

    // === RENDER ===
    return (
      <>
        <BcTextField
          {...rest}
          ref={ref}
          type="tel"
          value={phone}
          onChange={(e) => {
            handleChange(e as React.ChangeEvent<HTMLInputElement>);
            if (enablePerformance) {
              performance.tracking.trackInteraction('phone_change');
            }
            if (enableMonitoring) {
              monitoring.analytics.trackEvent('phone_input_change', {
                value: e.target.value,
                country,
              });
            }
          }}
          label={i18nLabel}
          placeholder={smartPlaceholder}
          status={phone.length > 0 && !isValid ? "error" : rest.status}
          {...(phone.length > 0 && !isValid
            ? { statusMessage: i18nStatusMessage }
            : {})}
          appearance={appearance}
          disabled={disabled}
          locale={locale}
          fallbackLocale={fallbackLocale}
          inputMode={inputMode}
          autoFocus={autoFocus}
          inputPrefix={selectNode}
          sx={{
            width: "300px",
            maxWidth: "100%",
            ...rest.sx,
          }}
          {...accessibilityProps}
        />

        {/* Accessibility */}
        {enableAccessibility && (
          <div
            ref={liveRegionRef}
            aria-live="polite"
            aria-atomic="true"
            style={{
              position: "absolute",
              left: -9999,
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            {screenReaderMessage}
          </div>
        )}
        
        {/* Performance metrics display (development only) */}
        {enablePerformance && process.env.NODE_ENV === 'development' && (
          <div style={{ 
            position: 'fixed', 
            top: 10, 
            right: 10, 
            background: 'rgba(0,0,0,0.8)', 
            color: 'white', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 9999
          }}>
            <div>Render: {performance.metrics.renderTime.toFixed(2)}ms</div>
            <div>Memory: {(performance.metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</div>
            <div>Interactions: {performance.metrics.userInteractions}</div>
          </div>
        )}
      </>
    );
  }
);

BcPhoneInput.displayName = "BcPhoneInput";
