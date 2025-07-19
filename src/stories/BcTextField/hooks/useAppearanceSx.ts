export function getAppearanceSx(base: any, colorKey: string, getColor: (key: string) => string) {
  return {
    ...base,
    "& .MuiOutlinedInput-root": {
      ...base["& .MuiOutlinedInput-root"],
      borderColor: getColor(colorKey),
      "&.Mui-focused": {
        ...base["& .MuiOutlinedInput-root"]?.["&.Mui-focused"],
        borderColor: getColor(colorKey),
      },
      "&.Mui-error": {
        ...base["& .MuiOutlinedInput-root"]?.["&.Mui-error"],
        borderColor: getColor(colorKey),
      },
    },
    "& .MuiInputLabel-root": {
      ...base["& .MuiInputLabel-root"],
      color: getColor(colorKey),
      "&.Mui-focused": {
        ...base["& .MuiInputLabel-root"]?.["&.Mui-focused"],
        color: getColor(colorKey),
      },
      "&.Mui-error": {
        ...base["& .MuiInputLabel-root"]?.["&.Mui-error"],
        color: getColor(colorKey),
      },
    },
  };
} 