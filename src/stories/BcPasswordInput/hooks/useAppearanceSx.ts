export function getAppearanceSx(base: Record<string, unknown>, colorKey: string, getColor: (key: string) => string) {
  const baseObj = base as Record<string, Record<string, unknown>>;
  
  return {
    ...base,
    "& .MuiOutlinedInput-root": {
      ...(baseObj["& .MuiOutlinedInput-root"] || {}),
      borderColor: getColor(colorKey),
      "&.Mui-focused": {
        ...(baseObj["& .MuiOutlinedInput-root"]?.["&.Mui-focused"] || {}),
        borderColor: getColor(colorKey),
      },
      "&.Mui-error": {
        ...(baseObj["& .MuiOutlinedInput-root"]?.["&.Mui-error"] || {}),
        borderColor: getColor(colorKey),
      },
    },
    "& .MuiInputLabel-root": {
      ...(baseObj["& .MuiInputLabel-root"] || {}),
      color: getColor(colorKey),
      "&.Mui-focused": {
        ...(baseObj["& .MuiInputLabel-root"]?.["&.Mui-focused"] || {}),
        color: getColor(colorKey),
      },
      "&.Mui-error": {
        ...(baseObj["& .MuiInputLabel-root"]?.["&.Mui-error"] || {}),
        color: getColor(colorKey),
      },
    },
  };
}
