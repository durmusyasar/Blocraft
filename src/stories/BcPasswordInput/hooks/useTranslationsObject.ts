export function getTranslationsObject(translations: any): Record<string, string> | undefined {
  if (translations && typeof translations === 'object' && !Array.isArray(translations)) {
    if (Object.prototype.toString.call(translations) === '[object Object]') {
      return translations as Record<string, string>;
    }
  }
  return undefined;
}
