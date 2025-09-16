import { useState, useCallback } from 'react';
import { CountryType } from '../types';

export interface UseAutoCountryDetectionProps {
  countryList: CountryType[];
  enableIPDetection?: boolean;
  enableGeolocation?: boolean;
  enableTimezoneDetection?: boolean;
  fallbackCountry?: string;
  onCountryDetected?: (country: string) => void;
}

export interface UseAutoCountryDetectionReturn {
  detectedCountry: string | null;
  isDetecting: boolean;
  detectionMethod: 'ip' | 'geolocation' | 'timezone' | 'none' | null;
  error: string | null;
  detectCountry: () => Promise<void>;
  clearDetection: () => void;
}

/**
 * Otomatik ülke tespiti hook'u
 * IP, geolocation ve timezone tabanlı ülke tespiti
 */
export const useAutoCountryDetection = ({
  countryList,
  enableIPDetection = true,
  enableGeolocation = true,
  enableTimezoneDetection = true,
  fallbackCountry = 'TR',
  onCountryDetected,
}: UseAutoCountryDetectionProps): UseAutoCountryDetectionReturn => {
  
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMethod, setDetectionMethod] = useState<'ip' | 'geolocation' | 'timezone' | 'none' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // IP tabanlı ülke tespiti
  const detectByIP = useCallback(async (): Promise<string | null> => {
    try {
      // Free IP geolocation API'leri
      const apis = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://api.country.is/',
      ];

      for (const api of apis) {
        try {
          const response = await fetch(api, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });

          if (!response.ok) continue;

          const data = await response.json();
          let countryCode: string | null = null;

          // Farklı API formatları için
          if (data.country_code) {
            countryCode = data.country_code;
          } else if (data.country) {
            countryCode = data.country;
          } else if (data.countryCode) {
            countryCode = data.countryCode;
          }

          if (countryCode) {
            // Ülke kodunun listemizde olup olmadığını kontrol et
            const country = countryList.find(c => c.code === countryCode);
            if (country) {
              return countryCode;
            }
          }
        } catch (apiError) {
          console.warn(`IP detection API failed: ${api}`, apiError);
          continue;
        }
      }

      return null;
    } catch (error) {
      console.warn('IP detection failed:', error);
      return null;
    }
  }, [countryList]);

  // Geolocation tabanlı ülke tespiti
  const detectByGeolocation = useCallback(async (): Promise<string | null> => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Reverse geocoding API
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (!response.ok) {
              resolve(null);
              return;
            }

            const data = await response.json();
            const countryCode = data.countryCode;
            
            if (countryCode) {
              const country = countryList.find(c => c.code === countryCode);
              if (country) {
                resolve(countryCode);
                return;
              }
            }
            
            resolve(null);
          } catch (error) {
            console.warn('Reverse geocoding failed:', error);
            resolve(null);
          }
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, [countryList]);

  // Timezone tabanlı ülke tespiti
  const detectByTimezone = useCallback((): string | null => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Timezone'dan ülke kodu çıkarma
      const timezoneToCountry: Record<string, string> = {
        'Europe/Istanbul': 'TR',
        'America/New_York': 'US',
        'America/Los_Angeles': 'US',
        'America/Chicago': 'US',
        'America/Denver': 'US',
        'America/Toronto': 'CA',
        'America/Vancouver': 'CA',
        'Europe/London': 'GB',
        'Europe/Berlin': 'DE',
        'Europe/Paris': 'FR',
        'Europe/Rome': 'IT',
        'Europe/Madrid': 'ES',
        'Europe/Amsterdam': 'NL',
        'Europe/Brussels': 'BE',
        'Europe/Zurich': 'CH',
        'Europe/Vienna': 'AT',
        'Europe/Stockholm': 'SE',
        'Europe/Oslo': 'NO',
        'Europe/Copenhagen': 'DK',
        'Europe/Helsinki': 'FI',
        'Europe/Warsaw': 'PL',
        'Europe/Prague': 'CZ',
        'Europe/Budapest': 'HU',
        'Europe/Bucharest': 'RO',
        'Europe/Sofia': 'BG',
        'Europe/Zagreb': 'HR',
        'Europe/Ljubljana': 'SI',
        'Europe/Bratislava': 'SK',
        'Europe/Vilnius': 'LT',
        'Europe/Riga': 'LV',
        'Europe/Tallinn': 'EE',
        'Europe/Dublin': 'IE',
        'Europe/Lisbon': 'PT',
        'Europe/Athens': 'GR',
        'Europe/Nicosia': 'CY',
        'Europe/Malta': 'MT',
        'Europe/Luxembourg': 'LU',
        'Europe/Reykjavik': 'IS',
        'Europe/Vaduz': 'LI',
        'Europe/Monaco': 'MC',
        'Europe/San_Marino': 'SM',
        'Europe/Vatican': 'VA',
        'Europe/Andorra': 'AD',
        'Asia/Tokyo': 'JP',
        'Asia/Seoul': 'KR',
        'Asia/Shanghai': 'CN',
        'Asia/Kolkata': 'IN',
        'Australia/Sydney': 'AU',
        'Australia/Melbourne': 'AU',
        'Pacific/Auckland': 'NZ',
        'Africa/Johannesburg': 'ZA',
        'America/Sao_Paulo': 'BR',
        'America/Argentina/Buenos_Aires': 'AR',
        'America/Santiago': 'CL',
        'America/Bogota': 'CO',
        'America/Mexico_City': 'MX',
        'America/Lima': 'PE',
        'America/Caracas': 'VE',
        'Europe/Moscow': 'RU',
        'Europe/Kiev': 'UA',
        'Europe/Minsk': 'BY',
        'Asia/Almaty': 'KZ',
        'Asia/Tashkent': 'UZ',
        'Asia/Bishkek': 'KG',
        'Asia/Dushanbe': 'TJ',
        'Asia/Ashgabat': 'TM',
        'Asia/Kabul': 'AF',
        'Asia/Karachi': 'PK',
        'Asia/Dhaka': 'BD',
        'Asia/Colombo': 'LK',
        'Asia/Kathmandu': 'NP',
        'Asia/Thimphu': 'BT',
        'Indian/Maldives': 'MV',
        'Asia/Jakarta': 'ID',
        'Asia/Kuala_Lumpur': 'MY',
        'Asia/Singapore': 'SG',
        'Asia/Bangkok': 'TH',
        'Asia/Ho_Chi_Minh': 'VN',
        'Asia/Phnom_Penh': 'KH',
        'Asia/Vientiane': 'LA',
        'Asia/Yangon': 'MM',
        'Asia/Manila': 'PH',
        'Asia/Brunei': 'BN',
        'Asia/Dili': 'TL',
        'Pacific/Fiji': 'FJ',
        'Pacific/Port_Moresby': 'PG',
        'Pacific/Guadalcanal': 'SB',
        'Pacific/Efate': 'VU',
        'Pacific/Noumea': 'NC',
        'Pacific/Tahiti': 'PF',
        'Pacific/Apia': 'WS',
        'Pacific/Tongatapu': 'TO',
        'Pacific/Tarawa': 'KI',
        'Pacific/Funafuti': 'TV',
        'Pacific/Nauru': 'NR',
        'Pacific/Palau': 'PW',
        'Pacific/Chuuk': 'FM',
        'Pacific/Majuro': 'MH',
        'Pacific/Saipan': 'MP',
        'Pacific/Guam': 'GU',
        'Pacific/Pago_Pago': 'AS',
        'America/St_Thomas': 'VI',
        'America/Puerto_Rico': 'PR',
        'America/Santo_Domingo': 'DO',
        'America/Port-au-Prince': 'HT',
        'America/Havana': 'CU',
        'America/Jamaica': 'JM',
        'America/Port_of_Spain': 'TT',
        'America/Barbados': 'BB',
        'America/Antigua': 'AG',
        'America/Dominica': 'DM',
        'America/Grenada': 'GD',
        'America/St_Kitts': 'KN',
        'America/St_Lucia': 'LC',
        'America/St_Vincent': 'VC',
        'America/Nassau': 'BS',
        'America/Belize': 'BZ',
        'America/Costa_Rica': 'CR',
        'America/Guatemala': 'GT',
        'America/Tegucigalpa': 'HN',
        'America/Managua': 'NI',
        'America/Panama': 'PA',
        'America/El_Salvador': 'SV',
        'America/La_Paz': 'BO',
        'America/Guayaquil': 'EC',
        'America/Guyana': 'GY',
        'America/Asuncion': 'PY',
        'America/Paramaribo': 'SR',
        'America/Montevideo': 'UY',
        'Africa/Cairo': 'EG',
        'Africa/Tripoli': 'LY',
        'Africa/Tunis': 'TN',
        'Africa/Algiers': 'DZ',
        'Africa/Casablanca': 'MA',
        'Africa/Khartoum': 'SD',
        'Africa/Juba': 'SS',
        'Africa/Addis_Ababa': 'ET',
        'Africa/Asmara': 'ER',
        'Africa/Djibouti': 'DJ',
        'Africa/Mogadishu': 'SO',
        'Africa/Nairobi': 'KE',
        'Africa/Kampala': 'UG',
        'Africa/Dar_es_Salaam': 'TZ',
        'Africa/Kigali': 'RW',
        'Africa/Bujumbura': 'BI',
        'Africa/Blantyre': 'MW',
        'Africa/Lusaka': 'ZM',
        'Africa/Harare': 'ZW',
        'Africa/Gaborone': 'BW',
        'Africa/Windhoek': 'NA',
        'Africa/Mbabane': 'SZ',
        'Africa/Maseru': 'LS',
        'Africa/Antananarivo': 'MG',
        'Indian/Mauritius': 'MU',
        'Indian/Mahe': 'SC',
        'Indian/Comoro': 'KM',
        'Indian/Mayotte': 'YT',
        'Indian/Reunion': 'RE',
        'Africa/Maputo': 'MZ',
        'Africa/Luanda': 'AO',
        'Africa/Kinshasa': 'CD',
        'Africa/Brazzaville': 'CG',
        'Africa/Douala': 'CM',
        'Africa/Bangui': 'CF',
        'Africa/Ndjamena': 'TD',
        'Africa/Niamey': 'NE',
        'Africa/Lagos': 'NG',
        'Africa/Porto-Novo': 'BJ',
        'Africa/Lome': 'TG',
        'Africa/Accra': 'GH',
        'Africa/Ouagadougou': 'BF',
        'Africa/Abidjan': 'CI',
        'Africa/Monrovia': 'LR',
        'Africa/Freetown': 'SL',
        'Africa/Conakry': 'GN',
        'Africa/Bissau': 'GW',
        'Africa/Banjul': 'GM',
        'Africa/Dakar': 'SN',
        'Africa/Bamako': 'ML',
        'Africa/Nouakchott': 'MR',
        'Atlantic/Cape_Verde': 'CV',
        'Africa/Sao_Tome': 'ST',
        'Africa/Malabo': 'GQ',
        'Africa/Libreville': 'GA',
        'Asia/Riyadh': 'SA',
        'Asia/Dubai': 'AE',
        'Asia/Muscat': 'OM',
        'Asia/Aden': 'YE',
        'Asia/Qatar': 'QA',
        'Asia/Bahrain': 'BH',
        'Asia/Kuwait': 'KW',
        'Asia/Baghdad': 'IQ',
        'Asia/Tehran': 'IR',
        'Asia/Jerusalem': 'IL',
        'Asia/Amman': 'JO',
        'Asia/Beirut': 'LB',
        'Asia/Damascus': 'SY',
        'Asia/Gaza': 'PS',
        'Asia/Hebron': 'PS',
      };

      const countryCode = timezoneToCountry[timezone];
      if (countryCode) {
        const country = countryList.find(c => c.code === countryCode);
        if (country) {
          return countryCode;
        }
      }

      return null;
    } catch (error) {
      console.warn('Timezone detection failed:', error);
      return null;
    }
  }, [countryList]);

  // Ana tespit fonksiyonu
  const detectCountry = useCallback(async (): Promise<void> => {
    setIsDetecting(true);
    setError(null);
    setDetectionMethod(null);

    try {
      let detected: string | null = null;
      let method: 'ip' | 'geolocation' | 'timezone' | 'none' = 'none';

      // 1. IP tabanlı tespit
      if (enableIPDetection && !detected) {
        try {
          detected = await detectByIP();
          if (detected) {
            method = 'ip';
          }
        } catch (error) {
          console.warn('IP detection failed:', error);
        }
      }

      // 2. Geolocation tabanlı tespit
      if (enableGeolocation && !detected) {
        try {
          detected = await detectByGeolocation();
          if (detected) {
            method = 'geolocation';
          }
        } catch (error) {
          console.warn('Geolocation detection failed:', error);
        }
      }

      // 3. Timezone tabanlı tespit
      if (enableTimezoneDetection && !detected) {
        try {
          detected = detectByTimezone();
          if (detected) {
            method = 'timezone';
          }
        } catch (error) {
          console.warn('Timezone detection failed:', error);
        }
      }

      // Sonuç
      if (detected) {
        setDetectedCountry(detected);
        setDetectionMethod(method);
        onCountryDetected?.(detected);
      } else {
        setDetectedCountry(fallbackCountry);
        setDetectionMethod('none');
        onCountryDetected?.(fallbackCountry);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ülke tespiti başarısız';
      setError(errorMessage);
      setDetectedCountry(fallbackCountry);
      setDetectionMethod('none');
      onCountryDetected?.(fallbackCountry);
    } finally {
      setIsDetecting(false);
    }
  }, [
    enableIPDetection,
    enableGeolocation,
    enableTimezoneDetection,
    detectByIP,
    detectByGeolocation,
    detectByTimezone,
    fallbackCountry,
    onCountryDetected,
  ]);

  // Tespiti temizle
  const clearDetection = useCallback(() => {
    setDetectedCountry(null);
    setDetectionMethod(null);
    setError(null);
  }, []);

  return {
    detectedCountry,
    isDetecting,
    detectionMethod,
    error,
    detectCountry,
    clearDetection,
  };
};

