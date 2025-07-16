import { Search } from "@mui/icons-material";
import { Box, Stack, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import type { Meta, StoryObj} from "@storybook/react";
import React from "react";
import type { BcTextFieldProps } from "./BcTextField";
import { BcTextField } from "./BcTextField";
import { useForm, Controller, type ControllerRenderProps } from 'react-hook-form';

const meta: Meta<BcTextFieldProps> = {
  title: "Components/BcTextField",
  component: BcTextField as any,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Framework-level, highly customizable Material-UI TextField replacement.\nSupports appearance, size, status, loading, clear, password, email, responsive, and more.",
      },
    },
  },
  argTypes: {
    appearance: {
      description: "Görünüm stili",
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
      description: "Boyut",
      control: "select",
      options: ["small", "medium", "normal", "large", undefined],
    },
    status: {
      description: "Durum göstergesi",
      control: "select",
      options: ["error", "warning", "success", "info", undefined],
    },
    color: {
      description: "Renk teması",
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    responsiveWidth: {
      description: "Responsive genişlik",
      control: "boolean",
    },
    showClearButton: {
      description: "Temizleme butonu göster",
      control: "boolean",
    },
    loading: {
      description: "Yükleme durumu",
      control: "boolean",
    },
    disabled: {
      description: "Devre dışı",
      control: "boolean",
    },
    type: {
      description: "Input tipi",
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    label: {
      description: "Etiket",
      control: "text",
    },
    placeholder: {
      description: "Placeholder",
      control: "text",
    },
    helperText: {
      description: "Yardım metni",
      control: "text",
    },
    error: {
      description: "Hata durumu",
      control: "boolean",
    },
    statusMessage: {
      description: "Durum mesajı",
      control: "text",
    },
    onClear: {
      description: "Temizleme butonuna tıklandığında çağrılır",
      action: "cleared",
    },
    onChange: {
      description: "Değer değiştiğinde çağrılır",
      action: "changed",
    },
    translations: {
      description: "Çoklu dil/i18n çevirileri",
      control: "object",
    },
    locale: {
      description: "Dil kodu (ör: 'tr', 'en')",
      control: "text",
    },
    fallbackLocale: {
      description: "Yedek dil kodu",
      control: "text",
    },
    enableAsyncValidation: {
      description: "Asenkron doğrulama aktif",
      control: "boolean",
    },
    validateInput: {
      description: "Asenkron doğrulama fonksiyonu",
      control: false,
    },
    showValidationStatus: {
      description: "Doğrulama durumunu göster",
      control: "boolean",
    },
    validationDebounceMs: {
      description: "Doğrulama debounce süresi (ms)",
      control: "number",
    },
    monitoring: {
      description: "Monitoring callback objesi",
      control: false,
    },
    renderCustomIcon: {
      description: "Durum ikonunu özelleştir",
      control: false,
    },
    renderHelperText: {
      description: "helperText'i özelleştir",
      control: false,
    },
    enableHighContrast: {
      description: "Yüksek kontrast modu",
      control: "boolean",
    },
    enableReducedMotion: {
      description: "Hareket azaltma modu",
      control: "boolean",
    },
    enableRTL: {
      description: "Sağdan sola yazım desteği",
      control: "boolean",
    },
    fontSize: {
      description: "Yazı tipi boyutu",
      control: "number",
    },
    autoFocus: {
      description: "Otomatik odaklanma (autoFocus)",
      control: "boolean",
    },
    autoComplete: {
      description: "Tarayıcı otomatik tamamlama (autoComplete)",
      control: "text",
    },
    inputMode: {
      description: "Input mode (örn. numeric, text, email)",
      control: "text",
    },
    pattern: {
      description: "Regex pattern (örn. [0-9]{6})",
      control: "text",
    },
    maxLength: {
      description: "Maksimum karakter sayısı",
      control: "number",
    },
    minLength: {
      description: "Minimum karakter sayısı",
      control: "number",
    },
    spellCheck: {
      description: "Yazım denetimi (spellCheck)",
      control: "boolean",
    },
    inputComponent: {
      description: "Özel input bileşeni (örn. react-number-format)",
      control: false,
    },
    inputPrefix: {
      description: "Input başına özel içerik",
      control: "text",
    },
    inputSuffix: {
      description: "Input sonuna özel içerik",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<BcTextFieldProps>;

// Temel kullanım
export const Default: Story = {
  args: {
    label: "Ad Soyad",
    placeholder: "Adınızı girin",
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
  render: (args: any) => (
    <Stack spacing={2}>
      {[
        { status: "error", statusMessage: "Hata: Zorunlu alan" },
        { status: "warning", statusMessage: "Uyarı: Zayıf şifre" },
        { status: "success", statusMessage: "Başarılı!" },
        { status: "info", statusMessage: "Bilgi: E-posta opsiyonel" },
      ].map((s: { status: string; statusMessage: string }) => (
        <BcTextField
          key={s.status}
          {...args}
          label={s.status.charAt(0).toUpperCase() + s.status.slice(1)}
          status={s.status as BcTextFieldProps["status"]}
          statusMessage={s.statusMessage}
          placeholder={s.status}
          style={{ height: "auto" }}
        />
      ))}
    </Stack>
  ),
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
  args: {
    label: "Yükleniyor...",
    loading: true,
    placeholder: "Veri bekleniyor",
  },
};

// Şifre alanı
export const Password: Story = {
  args: {
    label: "Şifre",
    type: "password",
    placeholder: "Şifrenizi girin",
    showClearButton: true,
  },
};

// E-posta alanı
export const Email: Story = {
  args: {
    label: "E-posta",
    type: "email",
    placeholder: "E-posta adresi",
    showClearButton: true,
  },
};

// Temizleme butonu ile
export const WithClearButton: Story = {
  args: {
    label: "Arama",
    placeholder: "Bir şeyler yazın...",
    showClearButton: true,
  },
};

// Responsive genişlik
export const Responsive: Story = {
  args: {
    label: "Responsive",
    responsiveWidth: true,
    placeholder: "Ekrana göre genişlik",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args: any) => (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", py: 4 }}>
      <BcTextField {...args} sx={{ maxWidth: 600, width: "100%" }} />
    </Box>
  ),
};

// Devre dışı durumu
export const Disabled: Story = {
  args: {
    label: "Devre Dışı",
    disabled: true,
    placeholder: "Bu alan devre dışı",
    defaultValue: "Devre dışı değer",
  },
};

// Hata durumu
export const WithError: Story = {
  args: {
    label: "Hatalı Giriş",
    error: true,
    helperText: "Bu alan zorunludur",
    placeholder: "Hatalı giriş",
  },
};

// Yardım metni ile
export const WithHelperText: Story = {
  args: {
    label: "Kullanıcı Adı",
    helperText: "En az 3 karakter olmalıdır",
    placeholder: "Kullanıcı adınızı girin",
  },
};

// Başlangıç adornment ile
export const WithStartAdornment: Story = {
  args: {
    label: "Arama",
    placeholder: "Kelime...",
    slotProps: {
      input: {
        startAdornment: <Search fontSize="small" />,
      },
    },
  },
};

// Özel end adornment
export const CustomEndAdornment: Story = {
  args: {
    label: "Özel End Adornment",
    placeholder: "Özel ikon...",
    renderEndAdornment: (defaultAdornment: React.ReactNode) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <span style={{ color: "#1976d2" }}>Özel</span>
        {defaultAdornment}
      </Box>
    ),
  },
};

// Çok satırlı
export const Multiline: Story = {
  args: {
    label: "Açıklama",
    multiline: true,
    rows: 4,
    placeholder: "Açıklamanızı yazın...",
    showClearButton: true,
    sx: { minHeight: 120 },
  },
};

// Sayısal input
export const Number: Story = {
  args: {
    label: "Yaş",
    type: "number",
    placeholder: "Yaşınızı girin",
    helperText: "0-120 arası bir değer girin",
  },
};

// URL input
export const URL: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
    helperText: "Geçerli bir URL girin",
  },
};

// Telefon input
export const Phone: Story = {
  args: {
    label: "Telefon",
    type: "tel",
    placeholder: "+90 555 123 4567",
    helperText: "Uluslararası format kullanın",
  },
};

// Gelişmiş örnekler
export const AdvancedExamples: Story = {
  render: () => (
    <Stack spacing={3}>
      {/* Premium görünüm ile e-posta */}
      <BcTextField
        label="Premium E-posta"
        type="email"
        appearance="premium"
        color="primary"
        showClearButton
        placeholder="premium@email.com"
        helperText="Premium görünüm ile e-posta validasyonu"
      />

      {/* Glass görünüm ile şifre */}
      <BcTextField
        label="Glass Şifre"
        type="password"
        appearance="glass"
        color="secondary"
        showClearButton
        placeholder="Şifrenizi girin"
        helperText="Glass görünüm ile şifre alanı"
      />

      {/* Neumorph görünüm ile arama */}
      <BcTextField
        label="Neumorph Arama"
        appearance="neumorph"
        color="info"
        showClearButton
        placeholder="Arama yapın..."
        slotProps={{
          input: {
            startAdornment: <Search fontSize="small" />,
          },
        }}
        helperText="Neumorph görünüm ile arama alanı"
      />

      {/* Dark görünüm ile çok satırlı */}
      <BcTextField
        label="Dark Açıklama"
        appearance="dark"
        color="warning"
        multiline
        rows={3}
        placeholder="Açıklamanızı yazın..."
        helperText="Dark görünüm ile çok satırlı alan"
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
            label="Ad Soyad"
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Adınızı ve soyadınızı girin"
            appearance="premium"
            showClearButton
          />
          
          <BcTextField
            label="E-posta"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="E-posta adresinizi girin"
            appearance="soft"
            showClearButton
          />
          
          <BcTextField
            label="Şifre"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            placeholder="Şifrenizi girin"
            appearance="glass"
            showClearButton
          />
          
          <BcTextField
            label="Şifre Tekrar"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Şifrenizi tekrar girin"
            appearance="glass"
            showClearButton
            status={formData.password !== formData.confirmPassword && formData.confirmPassword ? "error" : undefined}
            statusMessage={formData.password !== formData.confirmPassword && formData.confirmPassword ? "Şifreler eşleşmiyor" : undefined}
          />
        </Stack>
      </Box>
    );
  },
};

// --- Gelişmiş örnekler ---
export const I18nExample: Story = {
  args: {
    label: "İsim",
    placeholder: "Adınızı girin",
    translations: { clearButtonLabel: "Temizle", helperText: "Zorunlu alan." },
    locale: "tr",
    showClearButton: true,
    helperText: "Zorunlu alan.",
  },
};

export const AsyncValidationExample: Story = {
  args: {
    label: "Kullanıcı Adı",
    placeholder: "En az 3 karakter",
    enableAsyncValidation: true,
    validateInput: async (v: string) => v.length > 2 ? { isValid: true, type: 'success', message: 'Geçerli' } : { isValid: false, type: 'error', message: 'En az 3 karakter' },
    showValidationStatus: true,
    validationDebounceMs: 300,
    helperText: "En az 3 karakter olmalı",
  },
};

export const MonitoringExample: Story = {
  args: {
    label: "Loglanan Alan",
    placeholder: "Değişiklikler console'a loglanır",
    monitoring: {
      onChange: (v: string) => { console.log('Değişti:', v); },
      onError: (e: Error) => { console.error('Hata:', e); },
    },
    showClearButton: true,
  },
};

export const CustomRenderExample: Story = {
  args: {
    label: "Özel İkon ve Yardım",
    placeholder: "Duruma göre ikon ve yardım metni",
    status: "success",
    statusMessage: "Başarılı!",
    renderCustomIcon: (status: string) => status === 'success' ? <span role="img" aria-label="success">🎉</span> : undefined,
    renderHelperText: (helper: React.ReactNode) => <span style={{ color: 'purple' }}>{helper}</span>,
    helperText: "Custom helperText",
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
    label: "Telefon",
    placeholder: "5xx xxx xx xx",
    autoFocus: false,
    autoComplete: "tel",
    inputMode: "tel",
    pattern: "[0-9]{10,11}",
    maxLength: 11,
    minLength: 10,
    spellCheck: false,
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
          render={({ field }: { field: ControllerRenderProps<any, string> }) => (
            <BcTextField
              {...field}
              label="Ad Soyad"
              placeholder="Adınızı girin"
              showClearButton
            />
          )}
        />
        <button type="submit" style={{ marginTop: 16 }}>Gönder</button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'React Hook Form ile BcTextField entegrasyonu örneği.'
      }
    }
  }
};

export const PrefixSuffix: Story = {
  args: {
    label: "Telefon",
    placeholder: "5xx xxx xx xx",
    inputPrefix: <span style={{ color: '#888', marginRight: 4 }}>+90</span>,
    inputSuffix: <span style={{ color: '#888', marginLeft: 4 }}>.tr</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'inputPrefix ve inputSuffix ile input başına ve sonuna özel içerik eklenebilir.'
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
            />
          ))}
        </Stack>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Light ve dark modda tüm appearance varyasyonları. Üstteki buton ile tema değiştirilebilir.'
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
          <b>Toplam input sayısı:</b> 100<br />
          <b>Render süresi:</b> {renderTime !== null ? renderTime.toFixed(2) + ' ms' : 'Hesaplanıyor...'}
        </Box>
        <Stack spacing={1}>
          {values.map((val, i) => (
            <BcTextField
              key={i}
              label={`Alan ${i + 1}`}
              value={val}
              onChange={handleChange(i)}
              appearance={i % 8 === 0 ? 'premium' : i % 8 === 1 ? 'soft' : i % 8 === 2 ? 'glass' : i % 8 === 3 ? 'minimal' : i % 8 === 4 ? 'neumorph' : i % 8 === 5 ? 'underline' : i % 8 === 6 ? 'dark' : 'borderless'}
              size={i % 4 === 0 ? 'small' : i % 4 === 1 ? 'medium' : i % 4 === 2 ? 'normal' : 'large'}
              helperText={`Yardım metni ${i + 1}`}
            />
          ))}
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '100 adet BcTextField ile büyük formda render performansı ölçümü. Render süresi üstte gösterilir.'
      }
    }
  }
};
