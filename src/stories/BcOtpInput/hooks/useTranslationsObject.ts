export const getTranslationsObject = (translations?: Record<string, string>): Record<string, string> => {
  if (!translations || typeof translations !== 'object') {
    return {};
  }
  
  // If translations has a BcOtpInput property, use it
  if ('BcOtpInput' in translations && typeof translations.BcOtpInput === 'object') {
    return translations.BcOtpInput as Record<string, string>;
  }
  
  // Otherwise return the translations as is
  return translations;
};
