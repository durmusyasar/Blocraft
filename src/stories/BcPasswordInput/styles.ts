import { SxProps, Theme } from '@mui/material/styles';

/**
 * Password strength meter styles
 */
export const passwordStrengthMeterStyles = (theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginTop: 0.5,
  } as SxProps<Theme>,
  
  meter: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
    position: 'relative',
  } as SxProps<Theme>,

  fill: {
  height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease, background-color 0.3s ease',
  } as SxProps<Theme>,
  
  label: {
    fontSize: 12,
    fontWeight: 500,
    minWidth: 60,
    textAlign: 'right',
  } as SxProps<Theme>,
});

/**
 * Password strength colors
 */
export const getPasswordStrengthColors = (theme: Theme, customColors?: Record<string, string>) => {
  const defaultColors = {
    veryWeak: '#f44336',
    weak: '#ff9800',
    fair: '#ffeb3b',
    good: '#4caf50',
    strong: '#2196f3',
  };
  
  const colors = { ...defaultColors, ...customColors };
  
  return {
    veryWeak: colors.veryWeak,
    weak: colors.weak,
    fair: colors.fair,
    good: colors.good,
    strong: colors.strong,
  };
};

/**
 * Password requirements styles
 */
export const passwordRequirementsStyles = (theme: Theme) => ({
  container: {
    marginTop: 1,
    padding: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
  } as SxProps<Theme>,
  
  title: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 0.5,
    color: theme.palette.text.primary,
  } as SxProps<Theme>,
  
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  } as SxProps<Theme>,
  
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    fontSize: 12,
    marginBottom: 0.25,
    color: theme.palette.text.secondary,
  } as SxProps<Theme>,
  
  itemValid: {
    color: theme.palette.success.main,
  } as SxProps<Theme>,
  
  itemInvalid: {
    color: theme.palette.error.main,
  } as SxProps<Theme>,
  
  icon: {
    fontSize: 14,
    width: 14,
    height: 14,
  } as SxProps<Theme>,
});

/**
 * Password toggle button styles
 */
export const passwordToggleStyles = (theme: Theme) => ({
  button: {
    padding: 0.5,
    minWidth: 'auto',
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
    },
  } as SxProps<Theme>,
  
  icon: {
    fontSize: 20,
    transition: 'transform 0.2s ease',
  } as SxProps<Theme>,
});

/**
 * Password generation button styles
 */
export const passwordGenerationStyles = (theme: Theme) => ({
  button: {
    marginTop: 1,
    padding: 0.75,
    fontSize: 12,
    textTransform: 'none',
    borderRadius: 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  } as SxProps<Theme>,
  
  icon: {
    marginRight: 0.5,
    fontSize: 16,
  } as SxProps<Theme>,
});

/**
 * Password security warning styles
 */
export const passwordSecurityWarningStyles = (theme: Theme) => ({
  container: {
    marginTop: 1,
    padding: 1,
    borderRadius: 1,
    border: '1px solid',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
  } as SxProps<Theme>,
  
  low: {
    backgroundColor: theme.palette.warning.light,
    borderColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  } as SxProps<Theme>,
  
  medium: {
    backgroundColor: theme.palette.warning.main,
    borderColor: theme.palette.warning.dark,
    color: theme.palette.warning.contrastText,
  } as SxProps<Theme>,
  
  high: {
    backgroundColor: theme.palette.error.light,
    borderColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  } as SxProps<Theme>,
  
  icon: {
    fontSize: 16,
    marginTop: 0.25,
  } as SxProps<Theme>,
  
  content: {
    flex: 1,
  } as SxProps<Theme>,
  
  message: {
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 0.25,
  } as SxProps<Theme>,
  
  suggestion: {
    fontSize: 11,
    opacity: 0.9,
  } as SxProps<Theme>,
});

/**
 * Password suggestions styles
 */
export const passwordSuggestionsStyles = (theme: Theme) => ({
  container: {
    marginTop: 1,
    maxHeight: 200,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    backgroundColor: theme.palette.background.paper,
  } as SxProps<Theme>,
  
  item: {
    padding: 0.75,
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  } as SxProps<Theme>,
  
  itemText: {
    fontSize: 12,
    fontFamily: 'monospace',
  } as SxProps<Theme>,
  
  itemStrength: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    marginTop: 0.25,
  } as SxProps<Theme>,
});

/**
 * Password history styles
 */
export const passwordHistoryStyles = (theme: Theme) => ({
  container: {
    marginTop: 1,
    maxHeight: 150,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    backgroundColor: theme.palette.background.paper,
  } as SxProps<Theme>,
  
  header: {
    padding: 0.75,
    backgroundColor: theme.palette.action.hover,
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.text.secondary,
  } as SxProps<Theme>,
  
  item: {
    padding: 0.5,
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  } as SxProps<Theme>,
  
  itemText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: theme.palette.text.primary,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,
  
  itemActions: {
    display: 'flex',
    gap: 0.25,
  } as SxProps<Theme>,
  
  actionButton: {
    padding: 0.25,
    minWidth: 'auto',
    fontSize: 10,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
  } as SxProps<Theme>,
});

/**
 * Password input specific styles
 */
export const passwordInputStyles = (theme: Theme) => ({
  container: {
    position: 'relative',
  } as SxProps<Theme>,
  
  input: {
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  } as SxProps<Theme>,
  
  adornment: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  } as SxProps<Theme>,
});

/**
 * Responsive password input styles
 */
export const responsivePasswordStyles = (theme: Theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiOutlinedInput-root': {
        fontSize: 16, // Prevent zoom on iOS
      },
    },
  } as SxProps<Theme>,
  
  strengthMeter: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 0.5,
    },
  } as SxProps<Theme>,
  
  requirements: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 11,
    },
  } as SxProps<Theme>,
});

/**
 * Dark mode password input styles
 */
export const darkModePasswordStyles = (theme: Theme) => ({
  strengthMeter: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  } as SxProps<Theme>,
  
  requirements: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.divider,
  } as SxProps<Theme>,
  
  suggestions: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.divider,
  } as SxProps<Theme>,
  
  history: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.divider,
  } as SxProps<Theme>,
});

/**
 * High contrast password input styles
 */
export const highContrastPasswordStyles = (theme: Theme) => ({
  strengthMeter: {
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
  } as SxProps<Theme>,
  
  requirements: {
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  } as SxProps<Theme>,
  
  toggleButton: {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      color: theme.palette.mode === 'dark' ? '#000' : '#fff',
    },
  } as SxProps<Theme>,
});

/**
 * Animation styles for password input
 */
export const passwordAnimationStyles = (theme: Theme) => ({
  strengthMeter: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } as SxProps<Theme>,
  
  requirements: {
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    '&.entering': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    '&.entered': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '&.exiting': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
  } as SxProps<Theme>,
  
  suggestions: {
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    '&.entering': {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    '&.entered': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '&.exiting': {
      opacity: 0,
      transform: 'translateY(10px)',
    },
  } as SxProps<Theme>,
});