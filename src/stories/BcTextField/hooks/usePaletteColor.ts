import { useTheme } from '@mui/material/styles';

export function usePaletteColor() {
  const theme = useTheme();
  const isPaletteColor = (c: string | undefined): c is ("primary" | "secondary" | "success" | "error" | "info" | "warning") =>
    ["primary", "secondary", "success", "error", "info", "warning"].includes(c || "");

  const getColor = (key: string) => {
    const paletteValue = theme.palette[key as keyof typeof theme.palette];
    if (
      paletteValue &&
      typeof paletteValue === "object" &&
      "main" in paletteValue
    ) {
      return (paletteValue as { main: string }).main;
    }
    if (typeof paletteValue === "string") {
      return paletteValue;
    }
    return theme.palette.primary.main;
  };

  return { isPaletteColor, getColor };
} 