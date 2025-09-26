export function getAppearanceSx(base: Record<string, unknown>, colorKey: string, getColor: (key: string) => string) {
  const baseSx = base as Record<string, unknown>;
  return {
    ...baseSx,
    "& .MuiOutlinedInput-root": {
      ...(baseSx["& .MuiOutlinedInput-root"] as Record<string, unknown>),
      borderColor: getColor(colorKey),
      "&.Mui-focused": {
        ...((baseSx["& .MuiOutlinedInput-root"] as Record<string, unknown>)?.["&.Mui-focused"] as Record<string, unknown>),
        borderColor: getColor(colorKey),
      },
      "&.Mui-error": {
        ...((baseSx["& .MuiOutlinedInput-root"] as Record<string, unknown>)?.["&.Mui-error"] as Record<string, unknown>),
        borderColor: getColor(colorKey),
      },
    },
    "& .MuiInputLabel-root": {
      ...(baseSx["& .MuiInputLabel-root"] as Record<string, unknown>),
      color: getColor(colorKey),
      "&.Mui-focused": {
        ...((baseSx["& .MuiInputLabel-root"] as Record<string, unknown>)?.["&.Mui-focused"] as Record<string, unknown>),
        color: getColor(colorKey),
      },
      "&.Mui-error": {
        ...((baseSx["& .MuiInputLabel-root"] as Record<string, unknown>)?.["&.Mui-error"] as Record<string, unknown>),
        color: getColor(colorKey),
      },
    },
  };
} 