import React, { useState, useMemo, useEffect, forwardRef } from "react";
import { BcTextField } from "../BcTextField/BcTextField";
import type { BcTextFieldProps } from "../BcTextField/BcTextField";
import { countryList as defaultCountryList, getPhoneMask, isPhoneValid, getCountryName } from "./utils";
import { countrySelectStyle, countrySelectAppearances } from "./styles";
import { Select, MenuItem, FormControl, Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import enTexts from '../i18n/i18n/en.json';
import trTexts from '../i18n/i18n/tr.json';
import type { CountryType, CountryCode } from "./types";

const TEXTS: Record<string, Record<string, string>> = { en: enTexts.BcPhoneInput, tr: trTexts.BcPhoneInput };
type Locale = keyof typeof TEXTS;
const getText = (locale: Locale | undefined, key: string, fallbackLocale?: Locale): string => {
  const safeLocale = locale || 'en';
  return TEXTS[safeLocale]?.[key] || (fallbackLocale && TEXTS[fallbackLocale]?.[key]) || TEXTS.en[key] || key;
};

/**
 * BcPhoneInputProps
 * @property country - Seçili ülke kodu (CountryCode)
 * @property onCountryChange - Ülke değiştiğinde çağrılır
 * @property countryList - Ülke listesi veya Promise
 * @property favoriteCountries - Favori ülke kodları
 * @property showCountrySelect - Select gösterilsin mi / 'readonly'
 * @property validatePhone - Telefon doğrulama fonksiyonu
 * @property getMask - Mask fonksiyonu
 * @property showMaskInPlaceholder - Mask placeholderda gösterilsin mi
 * @property inputMode - inputMode (örn. 'tel')
 * @property autoFocus - Otomatik odaklanma
 * @property locale - Dil kodu
 * @property fallbackLocale - Yedek dil kodu
 * @property ...rest - Diğer BcTextFieldProps
 */
export interface BcPhoneInputProps extends Omit<BcTextFieldProps, "type"> {
  /** Seçili ülke kodu (ISO 3166-1 alpha-2) */
  country?: CountryCode;
  /** Ülke değiştiğinde çağrılır */
  onCountryChange?: (country: CountryCode) => void;
  /** Dil kodu */
  locale?: Locale;
  /** Yedek dil kodu */
  fallbackLocale?: Locale;
  /** Ülke listesi veya Promise */
  countryList?: CountryType[] | Promise<CountryType[]>;
  /** Ülkeleri async olarak getirir */
  fetchCountries?: () => Promise<CountryType[]>;
  /** Select gösterilsin mi / 'readonly' */
  showCountrySelect?: boolean | 'readonly';
  /** Telefon doğrulama fonksiyonu */
  validatePhone?: (phone: string, country: CountryCode) => boolean;
  /** Mask fonksiyonu */
  getMask?: (country: CountryCode) => string;
  /** Mask placeholderda gösterilsin mi */
  showMaskInPlaceholder?: boolean;
  /** inputMode (örn. 'tel') */
  inputMode?: 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /** Otomatik odaklanma */
  autoFocus?: boolean;
  /** Favori ülke kodları */
  favoriteCountries?: CountryCode[];
}

export const BcPhoneInput = forwardRef<HTMLInputElement, BcPhoneInputProps>(
  (
    {
      country = "TR" as CountryCode,
      onCountryChange,
      appearance,
      disabled,
      locale = 'en',
      fallbackLocale = 'en',
      label,
      placeholder,
      statusMessage,
      countryList,
      fetchCountries,
      showCountrySelect = true,
      validatePhone,
      getMask,
      showMaskInPlaceholder = true,
      inputMode = 'tel',
      autoFocus = false,
      favoriteCountries = [],
      ...rest
    },
    ref
  ) => {
    const [usedCountryList, setUsedCountryList] = useState<CountryType[]>(Array.isArray(countryList) ? countryList : defaultCountryList);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [screenReaderMessage, setScreenReaderMessage] = useState<string>("");
    const liveRegionRef = React.useRef<HTMLDivElement>(null);
    const [recentCountries, setRecentCountries] = useState<string[]>([]);

    // Dinamik veya async countryList desteği
    useEffect(() => {
      let isMounted = true;
      const loadCountries = async () => {
        setLoadingCountries(true);
        let list: CountryType[] = Array.isArray(countryList) ? countryList : defaultCountryList;
        if (countryList && countryList instanceof Promise) {
          list = await countryList;
        }
        if (fetchCountries) {
          try {
            const fetched = await fetchCountries();
            if (isMounted) setUsedCountryList(fetched);
          } catch {
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
      return () => { isMounted = false; };
    }, [countryList, fetchCountries]);

    // Son kullanılan ülkeleri localStorage'dan yükle
    useEffect(() => {
      try {
        const stored = localStorage.getItem('bc-phoneinput-recent-countries');
        if (stored) setRecentCountries(JSON.parse(stored));
      } catch {}
    }, []);

    // Ülke değiştiğinde son kullanılanlara ekle
    useEffect(() => {
      if (!country) return;
      setRecentCountries(prev => {
        const updated = [country, ...prev.filter(c => c !== country)].slice(0, 3);
        try {
          localStorage.setItem('bc-phoneinput-recent-countries', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, [country]);

    // Favori, son kullanılan ve diğer ülkeleri grupla
    const groupedCountries = useMemo(() => {
      const all = usedCountryList;
      const favs = favoriteCountries
        .map(code => all.find(c => c.code === code))
        .filter(Boolean) as CountryType[];
      const recents = recentCountries
        .filter(code => !favoriteCountries.includes(code as CountryCode))
        .map(code => all.find(c => c.code === (code as CountryCode)))
        .filter(Boolean) as CountryType[];
      const others = all.filter(
        c => !favs.some(f => f.code === c.code) && !recents.some(r => r.code === c.code)
      );
      return { favs, recents, others };
    }, [usedCountryList, favoriteCountries, recentCountries]);

    // Live region mesajını 2sn sonra temizle
    useEffect(() => {
      if (screenReaderMessage) {
        const timer = setTimeout(() => setScreenReaderMessage("") , 2000);
        return () => clearTimeout(timer);
      }
    }, [screenReaderMessage]);

    const [value, setValue] = useState(rest.defaultValue ?? "");
    const isControlled = rest.value !== undefined;
    const phone = isControlled ? (rest.value as string) : value as string;

    // Mask ve validasyon özelleştirilebilir
    const mask = useMemo(() => {
      if (getMask) return getMask(country);
      return getPhoneMask(country, usedCountryList);
    }, [country, usedCountryList, getMask]);

    const isValid = useMemo(() => {
      if (validatePhone) return validatePhone(phone, country);
      return isPhoneValid(phone, country, usedCountryList);
    }, [phone, country, usedCountryList, validatePhone]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setValue(e.target.value);
      if (rest.onChange) rest.onChange(e);
    };

    const handleCountryChange = (event: SelectChangeEvent<CountryCode>) => {
      const value = event.target.value as CountryCode;
      if (onCountryChange) {
        onCountryChange(value);
        // Ekran okuyucuya ülke kodu değişti mesajı gönder
        const selected = usedCountryList.find(c => c.code === value);
        if (selected) {
          setScreenReaderMessage(`Ülke kodu değişti: ${getCountryName(selected.name, locale)}`);
        }
      }
    };

    // Select için appearance ve disabled stillerini uygula
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

    // i18n label, placeholder, statusMessage
    const i18nLabel = label || getText(locale, 'label', fallbackLocale);
    const i18nPlaceholder = showMaskInPlaceholder ? (mask || placeholder) : (placeholder || mask);
    const i18nStatusMessage = statusMessage || getText(locale, 'invalidPhoneMessage', fallbackLocale) || 'Geçersiz telefon numarası';
    const i18nCountryLabel = getText(locale, 'countryLabel', fallbackLocale) || 'Ülke';

    // i18n başlıklar
    const i18nFavorites = getText(locale, 'favorites', fallbackLocale) || 'Favorites';
    const i18nRecents = getText(locale, 'recents', fallbackLocale) || 'Recent';

    // Select node as inputPrefix (only if showCountrySelect)
    let selectNode: React.ReactNode = undefined;
    if (showCountrySelect === 'readonly') {
      const selected = usedCountryList.find(c => c.code === country);
      selectNode = (
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 14, mr: 1, ml: 0, color: '#222', userSelect: 'none', minWidth: 60 }}>
          {selected ? `${getCountryName(selected.name, locale)} +${selected.dial}` : ''}
        </Box>
      );
    } else if (showCountrySelect) {
      selectNode = (
        <Box sx={{ display: 'flex', alignItems: 'center', m: 0, p: 0 }}>
          <FormControl
            variant="standard"
            sx={{
              minWidth: 90,
              mr: 1,
              mt: 0.5,
              m: 0,
              p: 0,
              '& .MuiInputBase-root': { m: 0, p: 0 },
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
                '&.MuiInputBase-root': { m: 0, p: 0 },
                '& .MuiSelect-select': { pr: '18px', pl: 0 },
              }}
              inputProps={{
                'aria-label': i18nCountryLabel,
                'aria-describedby': typeof rest['aria-describedby'] === 'string' ? rest['aria-describedby'] : undefined,
                'aria-required': typeof rest.required === 'boolean' ? rest.required : undefined,
                'aria-invalid': phone.length > 0 && !isValid ? true : undefined,
              }}
              disableUnderline
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: { minWidth: 120 }
                }
              }}
              renderValue={(selected) => {
                const selectedCountry = usedCountryList.find(c => c.code === selected);
                return selectedCountry ? `${selectedCountry.code} +${selectedCountry.dial}` : '';
              }}
            >
              {loadingCountries ? (
                <MenuItem disabled>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  {getText(locale, 'loading', fallbackLocale) || 'Yükleniyor...'}
                </MenuItem>
              ) : (
                [
                  ...(groupedCountries.favs.length > 0
                    ? [
                        <MenuItem key="fav-header" disabled sx={{ fontWeight: 700, fontSize: 13, opacity: 0.7, pointerEvents: 'none' }} aria-label={i18nFavorites}>{i18nFavorites}</MenuItem>,
                        ...groupedCountries.favs.map(c => (
                          <MenuItem key={c.code} value={c.code} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 0.5 }}>
                            <Box
                              component="span"
                              sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                color: isDark ? '#fff' : appearance === 'underline' ? '#222' : undefined,
                                background: isDark ? '#222' : 'transparent',
                                borderRadius: appearance === 'underline' ? 0 : 4,
                                px: 0,
                              }}
                            >
                              {c.code} +{c.dial}
                            </Box>
                          </MenuItem>
                        ))
                      ]
                    : []),
                  ...(groupedCountries.recents.length > 0
                    ? [
                        <MenuItem key="recent-header" disabled sx={{ fontWeight: 700, fontSize: 13, opacity: 0.7, pointerEvents: 'none' }} aria-label={i18nRecents}>{i18nRecents}</MenuItem>,
                        ...groupedCountries.recents.map(c => (
                          <MenuItem key={c.code} value={c.code} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 0.5 }}>
                            <Box
                              component="span"
                              sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                color: isDark ? '#fff' : appearance === 'underline' ? '#222' : undefined,
                                background: isDark ? '#222' : 'transparent',
                                borderRadius: appearance === 'underline' ? 0 : 4,
                                px: 0,
                              }}
                            >
                              {c.code} +{c.dial}
                            </Box>
                          </MenuItem>
                        ))
                      ]
                    : []),
                  ...groupedCountries.others.map(c => (
                    <MenuItem key={c.code} value={c.code} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 0.5 }}>
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: isDark ? '#fff' : appearance === 'underline' ? '#222' : undefined,
                          background: isDark ? '#222' : 'transparent',
                          borderRadius: appearance === 'underline' ? 0 : 4,
                          px: 0,
                        }}
                      >
                        {c.code} +{c.dial}
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

    return (
      <>
        <BcTextField
          {...rest}
          ref={ref}
          type="tel"
          value={phone}
          onChange={handleChange}
          showClearButton={rest.showClearButton}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          status={phone.length > 0 && !isValid ? "error" : rest.status}
          {...(phone.length > 0 && !isValid ? { statusMessage: i18nStatusMessage } : {})}
          appearance={appearance}
          disabled={disabled}
          locale={locale}
          fallbackLocale={fallbackLocale}
          inputPrefix={selectNode}
          sx={{ '& .MuiInputAdornment-root': { m: 0, p: 0 } }}
          aria-label={typeof i18nLabel === 'string' ? i18nLabel : undefined}
          aria-describedby={typeof rest['aria-describedby'] === 'string' ? rest['aria-describedby'] : undefined}
          aria-required={typeof rest.required === 'boolean' ? rest.required : undefined}
          aria-invalid={phone.length > 0 && !isValid ? true : undefined}
          inputMode={inputMode}
          autoFocus={autoFocus}
        />
        {/* Ekran okuyucu için live region */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
        >
          {screenReaderMessage}
        </div>
      </>
    );
  }
);

BcPhoneInput.displayName = "BcPhoneInput"; 