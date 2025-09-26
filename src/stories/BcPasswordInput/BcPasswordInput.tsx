import React, { forwardRef, useCallback, useState, useMemo, useEffect } from 'react';
import { IconButton, Box, Tooltip, LinearProgress, Typography, Chip, Fade, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, Refresh, ContentCopy, Check } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { BcTextField } from '../BcTextField/BcTextField';
import { BcPasswordInputProps } from './types';
import { usePasswordVisibility } from './hooks/usePasswordVisibility';
import { usePasswordStrength } from './hooks/usePasswordStrength';
import { usePasswordGeneration } from './hooks/usePasswordGeneration';
import { passwordToggleStyles } from './styles';
import { getTranslation } from '../i18n/i18nHelpers';

/**
 * BcPasswordInput component - extends BcTextField with password-specific features
 */
export const BcPasswordInput = forwardRef<HTMLInputElement, BcPasswordInputProps>(
  (props, ref) => {
    const {
      showPasswordToggle = true,
      passwordToggleLabel,
      enablePasswordGeneration = false,
      enableStrengthIndicator = false,
      showStrengthMeter = false,
      showRequirements: showRequirementsProp = false,
      strengthConfig,
      onStrengthChange,
      generationOptions,
      onPasswordGenerated,
      value,
      onChange,
      onFocus,
      onBlur,
      passwordTranslations,
      locale = 'en',
      enableBreachDetection = false,
      enableCommonPasswordCheck = true,
      enablePatternDetection = true,
      enableKeyboardPatternCheck = true,
      enableRepeatedCharCheck = true,
      enableSequentialCharCheck = true,
      enableDictionaryCheck = false,
      breachDetectionApi,
      commonPasswordsList,
      dictionaryWords,
      onSecurityWarning,
      ...bcTextFieldProps
    } = props;

    const theme = useTheme();
    const [password, setPassword] = useState<string>((value as string) ?? '');
    const [isCopied, setIsCopied] = useState(false);
    const [showRequirements, setShowRequirements] = useState(showRequirementsProp);

    // Password visibility hook
    const visibility = usePasswordVisibility({
      defaultVisible: false,
      rememberVisibility: false,
    });

    // Password strength hook
    const strength = usePasswordStrength(strengthConfig);

    // Password generation hook
    const passwordGenerator = usePasswordGeneration();

    // Translation helper
    const t = useCallback((key: string, fallback?: string) => {
      const translations = passwordTranslations as Record<string, string> | undefined;
      return getTranslation(key, locale, translations, 'en') || fallback || key;
    }, [locale, passwordTranslations]);

    // Security analysis
    const analyzeSecurity = useCallback((password: string) => {
      if (!password) return;

      const warnings: Array<{ message: string; severity: 'low' | 'medium' | 'high' }> = [];

      // Common password check
      if (enableCommonPasswordCheck) {
        const commonPasswords = commonPasswordsList || [
          'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
          'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master'
        ];
        
        if (commonPasswords.some((common: string) => password.toLowerCase().includes(common.toLowerCase()))) {
          warnings.push({
            message: t('securityWarning.commonPassword', 'Yaygın şifre kalıpları kullanılmış'),
            severity: 'high'
          });
        }
      }

      // Pattern detection
      if (enablePatternDetection) {
        if (/(.)\1{2,}/.test(password)) {
          warnings.push({
            message: t('securityWarning.repeatedChars', 'Tekrarlanan karakterler tespit edildi'),
            severity: 'medium'
          });
        }
      }

      // Repeated character check
      if (enableRepeatedCharCheck) {
        if (/(.)\1{2,}/.test(password)) {
          warnings.push({
            message: t('securityWarning.repeatedChars', 'Tekrarlanan karakterler tespit edildi'),
            severity: 'medium'
          });
        }
      }

      // Keyboard pattern check
      if (enableKeyboardPatternCheck) {
        const keyboardPatterns = ['qwerty', 'asdf', 'zxcv', '1234567890', '0987654321'];
        if (keyboardPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
          warnings.push({
            message: t('securityWarning.keyboardPattern', 'Klavye sıralaması tespit edildi'),
            severity: 'medium'
          });
        }
      }

      // Sequential character check
      if (enableSequentialCharCheck) {
        if (/123|234|345|456|567|678|789|890|012|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
          warnings.push({
            message: t('securityWarning.sequentialChars', 'Ardışık karakterler tespit edildi'),
            severity: 'low'
          });
        }
      }

      // Dictionary check
      if (enableDictionaryCheck && dictionaryWords) {
        const words = dictionaryWords.map((word: string) => word.toLowerCase());
        const passwordLower = password.toLowerCase();
        const foundWords = words.filter((word: string) => passwordLower.includes(word));
        
        if (foundWords.length > 0) {
          warnings.push({
            message: t('securityWarning.dictionaryWords', 'Sözlük kelimeleri tespit edildi'),
            severity: 'medium'
          });
        }
      }

      // Breach detection
      if (enableBreachDetection) {
        // Simulate breach detection check
        const checkBreach = async () => {
          try {
            if (breachDetectionApi) {
              const response = await fetch(breachDetectionApi, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password }),
              });
              
              if (response.ok) {
                const result = await response.json();
                if (result.breached) {
                  warnings.push({
                    message: t('securityWarning.breachDetected', 'Bu şifre veri ihlali veritabanında bulundu'),
                    severity: 'high'
                  });
                }
              }
            } else {
              // Fallback: Check against common breached passwords
              const breachedPasswords = [
                'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
                'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master',
                '1234567890', 'password1', 'qwerty123', 'welcome123'
              ];
              
              if (breachedPasswords.includes(password.toLowerCase())) {
                warnings.push({
                  message: t('securityWarning.breachDetected', 'Bu şifre veri ihlali veritabanında bulundu'),
                  severity: 'high'
                });
              }
            }
          } catch (error) {
            console.warn('Breach detection failed:', error);
          }
        };
        
        checkBreach();
      }

      // Report warnings
      warnings.forEach(warning => {
        if (onSecurityWarning) {
          onSecurityWarning(warning.message, warning.severity);
        }
      });
    }, [
      enableCommonPasswordCheck,
      enablePatternDetection,
      enableKeyboardPatternCheck,
      enableSequentialCharCheck,
      enableDictionaryCheck,
      enableRepeatedCharCheck,
      enableBreachDetection,
      commonPasswordsList,
      dictionaryWords,
      breachDetectionApi,
      onSecurityWarning,
      t
    ]);


    // Handle password change
    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      
      // Show requirements when user starts typing
      if (newPassword.length > 0) {
        setShowRequirements(true);
      } else {
        setShowRequirements(false);
      }
      
      // Analyze password strength if enabled
      if (enableStrengthIndicator && newPassword) {
        const strengthResult = strength.analyzePassword(newPassword);
        if (onStrengthChange) {
          onStrengthChange(strengthResult.strength, strengthResult.score);
        }
      }

      // Analyze security if enabled
      if (newPassword) {
        analyzeSecurity(newPassword);
      }
      
      if (onChange) {
        onChange(e);
      }
    }, [onChange, enableStrengthIndicator, strength, onStrengthChange, analyzeSecurity]);

    // Handle visibility toggle
    const handleVisibilityToggle = useCallback(() => {
      visibility.toggleVisibility();
    }, [visibility]);

    // Handle password generation
    const handlePasswordGeneration = useCallback(() => {
      const generatedPassword = passwordGenerator.generatePassword();
      setPassword(generatedPassword);
      setShowRequirements(true);
      
      if (onPasswordGenerated) {
        onPasswordGenerated(generatedPassword);
      }
      
      // Analyze generated password strength
      if (enableStrengthIndicator) {
        const strengthResult = strength.analyzePassword(generatedPassword);
        if (onStrengthChange) {
          onStrengthChange(strengthResult.strength, strengthResult.score);
        }
      }
    }, [passwordGenerator, onPasswordGenerated, enableStrengthIndicator, strength, onStrengthChange]);

    // Handle password copy
    const handlePasswordCopy = useCallback(async () => {
      try {
        await passwordGenerator.copyToClipboard(password);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy password:', error);
      }
    }, [passwordGenerator, password]);

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        // Ctrl/Cmd + H: Toggle visibility
        if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
          event.preventDefault();
          handleVisibilityToggle();
        }
        
        // Ctrl/Cmd + C: Copy password
        if ((event.ctrlKey || event.metaKey) && event.key === 'c' && password) {
          event.preventDefault();
          handlePasswordCopy();
        }
        
        // Ctrl/Cmd + G: Generate password
        if ((event.ctrlKey || event.metaKey) && event.key === 'g' && enablePasswordGeneration) {
          event.preventDefault();
          handlePasswordGeneration();
        }
        
        // Escape: Clear password
        if (event.key === 'Escape' && password) {
          event.preventDefault();
          setPassword('');
          setShowRequirements(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [password, enablePasswordGeneration, handleVisibilityToggle, handlePasswordCopy, handlePasswordGeneration]);

    // Render password toggle button
    const renderPasswordToggle = useCallback(() => {
      if (!showPasswordToggle) return null;

      const toggleLabel = passwordToggleLabel || (visibility.isVisible ? t('hidePassword', 'Şifreyi gizle') : t('showPassword', 'Şifreyi göster'));

      return (
        <Tooltip title={toggleLabel}>
          <IconButton
            onClick={handleVisibilityToggle}
            sx={passwordToggleStyles(theme).button}
            aria-label={toggleLabel}
            aria-pressed={visibility.isVisible}
            aria-expanded={visibility.isVisible}
            role="button"
            tabIndex={0}
          >
            {visibility.isVisible ? (
              <VisibilityOff 
                sx={passwordToggleStyles(theme).icon}
                aria-hidden="true"
              />
            ) : (
              <Visibility 
                sx={passwordToggleStyles(theme).icon}
                aria-hidden="true"
              />
            )}
          </IconButton>
        </Tooltip>
      );
    }, [showPasswordToggle, passwordToggleLabel, visibility.isVisible, t, handleVisibilityToggle, theme]);

    // Render password generation button
    const renderPasswordGenerator = useCallback(() => {
      if (!enablePasswordGeneration) return null;

      const generateLabel = t('generatePassword', 'Güçlü şifre üret');

      return (
        <Tooltip title={generateLabel}>
          <IconButton
            onClick={handlePasswordGeneration}
            size="small"
            sx={passwordToggleStyles(theme).button}
            aria-label={generateLabel}
            role="button"
            tabIndex={0}
          >
            <Refresh 
              fontSize="small" 
              aria-hidden="true"
            />
          </IconButton>
        </Tooltip>
      );
    }, [enablePasswordGeneration, t, handlePasswordGeneration, theme]);

    // Render password copy button
    const renderPasswordCopy = useCallback(() => {
      if (!password) return null;

      const copyLabel = isCopied ? t('copied', 'Kopyalandı!') : t('copyPassword', 'Şifreyi kopyala');

      return (
        <Tooltip title={copyLabel}>
          <IconButton
            onClick={handlePasswordCopy}
            size="small"
            sx={{
              ...passwordToggleStyles(theme).button,
              color: isCopied ? theme.palette.success.main : theme.palette.text.secondary,
            }}
            aria-label={copyLabel}
            role="button"
            tabIndex={0}
          >
            {isCopied ? (
              <Check 
                fontSize="small" 
                aria-hidden="true"
              />
            ) : (
              <ContentCopy 
                fontSize="small" 
                aria-hidden="true"
              />
            )}
          </IconButton>
        </Tooltip>
      );
    }, [password, isCopied, t, handlePasswordCopy, theme]);

    // Render password strength meter
    const renderPasswordStrengthMeter = () => {
      if (!showStrengthMeter || !strength.strengthResult) return null;

      const { strength: strengthLevel, score } = strength.strengthResult;
      const color = strength.getStrengthColor(strengthLevel);
      const label = strength.getStrengthLabel(strengthLevel);

      return (
        <Box sx={{ mt: 1 }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
            role="progressbar"
            aria-label={t('strengthLabel', 'Şifre gücü') + `: ${label}`}
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <LinearProgress
              variant="determinate"
              value={score}
              sx={{
                flexGrow: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.palette.grey[300],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ minWidth: 60, textAlign: 'right' }}
              aria-live="polite"
            >
              {label}
            </Typography>
          </Box>
        </Box>
      );
    };

    // Render password requirements
    const renderPasswordRequirements = () => {
      if (!showRequirements || !strength.strengthResult) return null;

      const { requirements } = strength.strengthResult;

      return (
        <Collapse in={showRequirements} timeout={300}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              {t('requirementsLabel', 'Şifre Gereksinimleri')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {Object.entries(requirements).map(([key, passed]) => (
                <Fade in={true} timeout={300} key={key}>
                  <Chip
                    label={getRequirementLabel(key)}
                    size="small"
                    color={passed ? 'success' : 'error'}
                    variant={passed ? 'filled' : 'outlined'}
                    sx={{ 
                      fontSize: '0.7rem',
                      transition: 'all 0.3s ease',
                      transform: passed ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                </Fade>
              ))}
            </Box>
          </Box>
        </Collapse>
      );
    };

    // Get requirement label
    const getRequirementLabel = (key: string): string => {
      const labels: Record<string, string> = {
        minLength: t('requirements.minLength', 'Min. 8 karakter'),
        uppercase: t('requirements.uppercase', 'Büyük harf'),
        lowercase: t('requirements.lowercase', 'Küçük harf'),
        numbers: t('requirements.numbers', 'Rakam'),
        specialChars: t('requirements.specialChars', 'Özel karakter'),
        noCommonPasswords: t('requirements.noCommonPasswords', 'Yaygın değil'),
        noPersonalInfo: t('requirements.noPersonalInfo', 'Kişisel bilgi yok'),
      };
      return labels[key] || key;
    };

    // Memoized input suffix to prevent unnecessary re-renders
    const inputSuffix = useMemo(() => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {renderPasswordToggle()}
        {renderPasswordCopy()}
        {renderPasswordGenerator()}
      </Box>
    ), [renderPasswordToggle, renderPasswordCopy, renderPasswordGenerator]);

    // Compose input props
    const inputProps = useMemo(() => ({
      ...bcTextFieldProps,
      type: visibility.isVisible ? 'text' : 'password',
      value: password,
      onChange: handlePasswordChange,
      onFocus,
      onBlur,
      inputSuffix,
    }), [bcTextFieldProps, visibility.isVisible, password, handlePasswordChange, onFocus, onBlur, inputSuffix]);

    return (
      <>
        <BcTextField
          ref={ref}
          {...inputProps}
        />
        {renderPasswordStrengthMeter()}
        {renderPasswordRequirements()}
      </>
    );
  }
);

BcPasswordInput.displayName = 'BcPasswordInput';