import { SxProps } from "@mui/material";
import { Theme } from '@mui/material/styles';

export const sizeStyles: Record<string, SxProps<Theme>> = {
  small: { width: 200, height: 'auto', fontSize: 15 },
  medium: { width: 400, height: 'auto', fontSize: 17 },
  normal: { width: 400, height: 'auto', fontSize: 17 },
  large: { width: 600, height: 'auto', fontSize: 19 },
};

export const responsiveWidthStyles: SxProps<Theme> = {
  width: {
    xs: 150,
    sm: 400,
    md: 500,
    lg: 600,
    xl: 700,
  },
};

// Ortak label stili
export const labelBaseStyle = (theme: Theme) => ({
  fontWeight: 700,
  fontSize: 16,
  padding: "0 6px",
  zIndex: 2,
  letterSpacing: 0.2,
  // Label arka planı: hem light hem dark modda border üstünde net görünür
  background: theme.palette.mode === 'dark'
    ? 'rgba(35,39,47,0.85)'
    : 'rgba(255,255,255,0.85)',
  transition: "color 0.3s, background 0.3s, backdrop-filter 0.3s",
  "&.Mui-focused": { color: "#7c4dff" },
  "&.Mui-disabled": { color: "#666" },
  "&.Mui-error": { color: "#ef5350" },
  "&.MuiInputLabel-shrink, &.MuiInputLabel-shrunk": {
    transform: "translate(14px, -8px) scale(0.75)",
  },
});

// Tüm varyantlar için modern, tema uyumlu ve dark mode destekli stiller
export const premiumStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[6],
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.text.secondary,
  },
});

export const softStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    background: theme.palette.mode === 'dark' ? 'rgba(30,32,38,0.92)' : theme.palette.action.hover,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.divider}`,
    '&:hover': {
      background: theme.palette.mode === 'dark' ? 'rgba(40,44,54,0.98)' : theme.palette.action.selected,
      borderColor: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.primary.main,
    },
    '&.Mui-focused': {
      background: theme.palette.mode === 'dark' ? 'rgba(40,44,54,1)' : theme.palette.background.paper,
      borderColor: theme.palette.mode === 'dark' ? '#42a5f5' : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.text.secondary,
    background: theme.palette.mode === 'dark' ? 'rgba(35,39,47,0.98)' : 'rgba(255,255,255,0.85)',
  },
});

export const glassStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    background: theme.palette.mode === 'dark' ? 'rgba(40,40,40,0.7)' : 'rgba(255,255,255,0.7)',
    boxShadow: theme.shadows[1],
    backdropFilter: 'blur(4px)',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      boxShadow: theme.shadows[3],
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[6],
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.text.secondary,
  },
});

export const minimalStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius),
    background: theme.palette.mode === 'dark' ? 'rgba(30,32,38,0.92)' : 'none',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.divider}`,
    boxShadow: 'none',
    '&:hover': {
      borderColor: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.text.primary,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.mode === 'dark' ? '#42a5f5' : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.text.secondary,
    background: theme.palette.mode === 'dark' ? 'rgba(35,39,47,0.98)' : 'rgba(255,255,255,0.85)',
  },
});

export const neumorphStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    background: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark'
      ? '4px 4px 12px #222, -4px -4px 12px #444'
      : '4px 4px 12px #eee, -4px -4px 12px #fff',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[8],
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.text.secondary,
  },
});

export const underlineStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius),
    background: theme.palette.mode === 'dark' ? 'rgba(30,32,38,0.92)' : 'none',
    border: 'none',
    borderBottom: `2px solid ${theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.divider}`,
    boxShadow: 'none',
    '&:hover': {
      borderBottomColor: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.text.primary,
    },
    '&.Mui-focused': {
      borderBottomColor: theme.palette.mode === 'dark' ? '#42a5f5' : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.mode === 'dark' ? '#90caf9' : theme.palette.text.secondary,
    background: theme.palette.mode === 'dark' ? 'rgba(35,39,47,0.98)' : 'rgba(255,255,255,0.85)',
  },
});

export const darkStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
    border: `1.5px solid ${theme.palette.divider}`,
    '&:hover': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.text.primary,
  },
});

export const borderlessStyles = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    background: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[1],
    '&:hover': {
      boxShadow: theme.shadows[3],
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[6],
    },
  },
  '& .MuiInputLabel-root': {
    ...labelBaseStyle(theme),
    color: theme.palette.text.secondary,
  },
});

// HelperText, statusMessage, clear button ve adornment için dark mode renkleri
export const helperTextStyles = (theme: Theme) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.text.secondary,
  fontSize: 13,
  marginTop: 2,
});

export const statusMessageStyles = (theme: Theme, statusColor: string) => ({
  color: statusColor || (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main),
  fontWeight: 500,
  marginBottom: 2,
});

export const clearButtonStyles = (theme: Theme) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.action.active,
  '&:hover, &:focus': {
    background: theme.palette.action.hover,
  },
});

// Dinamik Dark Mode (theme üzerinden)
export const getDynamicDarkStyles = (theme: Theme): SxProps<Theme> => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 20,
    background: "linear-gradient(135deg, #23272f 80%, #2d3142 100%)",
    color: theme.palette.text.primary,
    border: "2px solid #42a5f5",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.45) inset, 0 1.5px 8px 0 #0008",
    backgroundClip: "padding-box",
    transition: "box-shadow 0.3s, border-color 0.3s, background 0.3s",
    "& input": {
      color: "#fff",
      fontWeight: 500,
      letterSpacing: 0.1,
      background: "transparent",
      "::placeholder": {
        color: "#8fa2c7",
        opacity: 1,
      },
    },
    "&:hover": {
      borderColor: "#7c4dff",
      boxShadow: "0 4px 32px 0 rgba(66,165,245,0.10) inset, 0 2px 12px 0 #0008",
      background: "linear-gradient(135deg, #23272f 80%, #2d3142 100%)",
    },
    "&.Mui-focused": {
      borderColor: "#7c4dff",
      background: "linear-gradient(135deg, #23272f 60%, #1a1d29 100%)",
      boxShadow:
        "0 0 0 3px #42a5f580, 0 4px 32px 0 rgba(66,165,245,0.10) inset",
    },
    "&.Mui-disabled": {
      background: "#23272f",
      color: "#666",
      borderColor: "#333",
      boxShadow: "none",
      opacity: 0.7,
    },
    "&.Mui-error": {
      borderColor: "#ef5350",
      boxShadow: "0 0 0 2px #ef535080",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 700,
    fontSize: 16,
    color: "#90caf9",
    background: "rgba(35,39,47,0.7)",
    padding: "0 6px",
    zIndex: 2,
    letterSpacing: 0.2,
    backdropFilter: "blur(2px)",
    transition: "color 0.3s, background 0.3s, backdrop-filter 0.3s",
    "&.Mui-focused": { color: "#7c4dff" },
    "&.Mui-disabled": { color: "#666" },
    "&.Mui-error": { color: "#ef5350" },
    "&.MuiInputLabel-shrink, &.MuiInputLabel-shrunk": {
      transform: "translate(14px, -8px) scale(0.75)",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: 13,
    color: "#8fa2c7",
    marginLeft: 0,
    marginTop: 4,
    fontWeight: 400,
    transition: "color 0.3s",
    "&.Mui-error": { color: "#ef5350" },
  },
  "& .MuiInputAdornment-root": {
    color: "#90caf9",
    fontSize: 20,
    transition: "color 0.3s",
  },
  "& .MuiIconButton-root": {
    color: "#90caf9",
    borderRadius: 10,
    padding: 2,
    transition: "color 0.3s, background 0.3s",
    "&:hover": {
      background: "#2d3142",
      color: "#7c4dff",
    },
  },
});

// Dinamik Light Mode (theme üzerinden)
export const getDynamicLightStyles = (theme: Theme): SxProps<Theme> => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1.5px solid ${theme.palette.divider}`,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s, border-color 0.2s",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      boxShadow: "0 4px 16px 0 rgba(25,118,210,0.10)",
    },
    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
      background: theme.palette.background.paper,
    },
    "&.Mui-disabled": {
      background: theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
      borderColor: theme.palette.divider,
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 2px ${theme.palette.error.main}40`,
    },
    "& .MuiOutlinedInput-input": {
      color: `${theme.palette.mode === "dark" ? "#fff" : "#222"} !important`,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    fontSize: 15,
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: "0 4px",
    zIndex: 2,
    "&.Mui-focused": { color: theme.palette.primary.main },
    "&.Mui-disabled": { color: theme.palette.text.disabled },
    "&.Mui-error": { color: theme.palette.error.main },
    "&.MuiInputLabel-shrink, &.MuiInputLabel-shrunk": {
      transform: "translate(14px, -8px) scale(0.75)",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: 13,
    color: theme.palette.text.secondary,
    marginLeft: 3,
    fontWeight: 400,
    "&.Mui-error": { color: theme.palette.error.main },
  },
  "& .MuiInputAdornment-root": {
    color: theme.palette.text.disabled,
    fontSize: 18,
  },
  "& .MuiIconButton-root": {
    color: theme.palette.text.disabled,
    borderRadius: 8,
    padding: 2,
    "&:hover": {
      background: theme.palette.action.hover,
      color: theme.palette.primary.main,
    },
  },
});
