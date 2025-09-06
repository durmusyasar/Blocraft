// i18n helpers for translations and formatting

export function getDefaultTranslations(locale: string) {
  const translations: Record<string, Record<string, string>> = {
    'tr': {
      loadingText: 'Yükleniyor...',
      noOptionsText: 'Sonuç yok',
      recentSearchesLabel: 'Son Aramalar',
      screenReaderInstructions: 'Otomatik tamamlama alanı. Yazmaya başlayın ve önerileri görmek için aşağı ok tuşunu kullanın.',
      screenReaderLoadingText: 'Arama yapılıyor, lütfen bekleyin.',
      screenReaderNoOptionsText: 'Sonuç bulunamadı.',
      screenReaderSelectedText: 'Seçildi:',
      screenReaderGroupText: 'Grup:',
      screenReaderRecentSearchText: 'Son arama:',
      validationLoadingText: 'Doğrulanıyor...',
      minInputLengthText: 'En az {min} karakter girin',
      errorText: 'Hata',
      successText: 'Başarı',
      warningText: 'Uyarı',
      infoText: 'Bilgi'
    },
    'en': {
      loadingText: 'Loading...',
      noOptionsText: 'No results',
      recentSearchesLabel: 'Recent Searches',
      screenReaderInstructions: 'Autocomplete field. Start typing and use arrow keys to see suggestions.',
      screenReaderLoadingText: 'Searching, please wait.',
      screenReaderNoOptionsText: 'No results found.',
      screenReaderSelectedText: 'Selected:',
      screenReaderGroupText: 'Group:',
      screenReaderRecentSearchText: 'Recent search:',
      validationLoadingText: 'Validating...',
      minInputLengthText: 'Enter at least {min} characters',
      errorText: 'Error',
      successText: 'Success',
      warningText: 'Warning',
      infoText: 'Info'
    },
    'de': {
      loadingText: 'Lädt...',
      noOptionsText: 'Keine Ergebnisse',
      recentSearchesLabel: 'Letzte Suchen',
      screenReaderInstructions: 'Autovervollständigungsfeld. Beginnen Sie mit der Eingabe und verwenden Sie die Pfeiltasten für Vorschläge.',
      screenReaderLoadingText: 'Suche läuft, bitte warten.',
      screenReaderNoOptionsText: 'Keine Ergebnisse gefunden.',
      screenReaderSelectedText: 'Ausgewählt:',
      screenReaderGroupText: 'Gruppe:',
      screenReaderRecentSearchText: 'Letzte Suche:',
      validationLoadingText: 'Wird validiert...',
      minInputLengthText: 'Mindestens {min} Zeichen eingeben',
      errorText: 'Fehler',
      successText: 'Erfolg',
      warningText: 'Warnung',
      infoText: 'Info'
    },
    'fr': {
      loadingText: 'Chargement...',
      noOptionsText: 'Aucun résultat',
      recentSearchesLabel: 'Recherches récentes',
      screenReaderInstructions: 'Champ de saisie automatique. Commencez à taper et utilisez les flèches pour voir les suggestions.',
      screenReaderLoadingText: 'Recherche en cours, veuillez patienter.',
      screenReaderNoOptionsText: 'Aucun résultat trouvé.',
      screenReaderSelectedText: 'Sélectionné:',
      screenReaderGroupText: 'Groupe:',
      screenReaderRecentSearchText: 'Recherche récente:',
      validationLoadingText: 'Validation...',
      minInputLengthText: 'Saisissez au moins {min} caractères',
      errorText: 'Erreur',
      successText: 'Succès',
      warningText: 'Avertissement',
      infoText: 'Info'
    }
  };

  return translations[locale] || translations['en'];
}

export function getTranslation(
  key: string,
  locale: string,
  customTranslations?: Record<string, string>,
  fallbackLocale: string = 'en',
  params?: Record<string, any>
) {
  let translation: string;

  // First check custom translations
  if (customTranslations?.[key]) {
    translation = customTranslations[key];
  } else {
    // Then check default translations for current locale
    const defaultTranslations = getDefaultTranslations(locale);
    if (defaultTranslations[key]) {
      translation = defaultTranslations[key];
    } else {
      // Finally fallback to fallback locale
      const fallbackTranslations = getDefaultTranslations(fallbackLocale);
      translation = fallbackTranslations[key] || key;
    }
  }

  // Apply interpolation if params are provided
  if (params && typeof translation === 'string') {
    return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }

  return translation;
}

export function formatTranslation(template: string, params: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
} 