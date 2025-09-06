import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

// Test theme
const testTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={testTheme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Test utilities
const testUtils = {
  // Mock OTP validation
  mockValidation: (shouldPass: boolean = true) => 
    jest.fn().mockResolvedValue(shouldPass),
  
  // Mock monitoring callbacks
  mockMonitoring: () => ({
    onChange: jest.fn(),
    onComplete: jest.fn(),
    onClear: jest.fn(),
    onError: jest.fn(),
    onPerformance: jest.fn(),
  }),
  
  // Mock biometric authentication
  mockBiometric: () => ({
    isSupported: true,
    authenticate: jest.fn().mockResolvedValue('123456'),
  }),
  
  // Mock camera
  mockCamera: () => ({
    isSupported: true,
    startCamera: jest.fn().mockResolvedValue(undefined),
    stopCamera: jest.fn(),
  }),
  
  // Mock NFC
  mockNFC: () => ({
    isSupported: true,
    readNFC: jest.fn().mockResolvedValue('123456'),
  }),
  
  // Mock Bluetooth
  mockBluetooth: () => ({
    isSupported: true,
    connectToDevice: jest.fn().mockResolvedValue(undefined),
  }),
  
  // Mock voice input
  mockVoiceInput: () => ({
    isSupported: true,
    startListening: jest.fn(),
    stopListening: jest.fn(),
  }),
  
  // Mock SMS
  mockSMS: () => ({
    isSupported: true,
    sendSMS: jest.fn().mockResolvedValue(undefined),
  }),
  
  // Mock QR Code
  mockQRCode: () => ({
    generateQRCode: jest.fn().mockResolvedValue('data:image/png;base64,test'),
  }),
  
  // Mock security
  mockSecurity: () => ({
    validateInput: jest.fn().mockReturnValue(true),
    encryptValue: jest.fn().mockImplementation(v => v),
    decryptValue: jest.fn().mockImplementation(v => v),
  }),
  
  // Mock performance
  mockPerformance: () => ({
    measurePerformance: jest.fn(),
    getPerformanceStatus: jest.fn().mockReturnValue({
      renderCount: 0,
      averageRenderTime: 0,
      memoryUsage: 0,
    }),
  }),
  
  // Mock analytics
  mockAnalytics: () => ({
    trackEvent: jest.fn(),
    trackUserInteraction: jest.fn(),
    trackError: jest.fn(),
    trackPerformance: jest.fn(),
  }),
  
  // Mock data management
  mockData: () => ({
    saveData: jest.fn().mockResolvedValue(undefined),
    loadData: jest.fn().mockResolvedValue(null),
    clearData: jest.fn().mockResolvedValue(undefined),
  }),
  
  // Mock integration
  mockIntegration: () => ({
    integrate: jest.fn(),
    getStoredValue: jest.fn().mockResolvedValue(null),
    clearStoredValue: jest.fn().mockResolvedValue(undefined),
  }),
  
  // Mock UI
  mockUI: () => ({
    showSkeletonLoading: jest.fn(),
    triggerMicroInteraction: jest.fn(),
    handleHover: jest.fn(),
    handleFocus: jest.fn(),
  }),
  
  // Mock mobile
  mockMobile: () => ({
    triggerHapticFeedback: jest.fn(),
    getMobileStyles: jest.fn().mockReturnValue({}),
    getTouchHandlers: jest.fn().mockReturnValue({}),
  }),
  
  // Mock accessibility
  mockAccessibility: () => ({
    getInputProps: jest.fn().mockReturnValue({}),
    getAriaProps: jest.fn().mockReturnValue({}),
    announce: jest.fn(),
  }),
  
  // Mock animations
  mockAnimations: () => ({
    triggerFocusAnimation: jest.fn(),
    triggerSuccessAnimation: jest.fn(),
    triggerErrorAnimation: jest.fn(),
  }),
  
  // Mock customization
  mockCustomization: () => ({
    getContainerStyles: jest.fn().mockReturnValue({}),
    getInputStyles: jest.fn().mockReturnValue({}),
  }),
  
  // Mock responsive
  mockResponsive: () => ({
    getContainerStyles: jest.fn().mockReturnValue({}),
    getInputStyles: jest.fn().mockReturnValue({}),
  }),
  
  // Mock appearance
  mockAppearance: () => ({
    getContainerStyles: jest.fn().mockReturnValue({}),
    getBorderColor: jest.fn().mockReturnValue('#e0e0e0'),
  }),
  
  // Mock i18n
  mockI18n: () => ({
    getLabelStyles: jest.fn().mockReturnValue({}),
    getHelperTextStyles: jest.fn().mockReturnValue({}),
    getStatusMessageStyles: jest.fn().mockReturnValue({}),
  }),
  
  // Mock keyboard
  mockKeyboard: () => ({
    handleKeyDown: jest.fn(),
    handleArrowLeft: jest.fn(),
    handleArrowRight: jest.fn(),
    handleArrowUp: jest.fn(),
    handleArrowDown: jest.fn(),
    handleBackspace: jest.fn(),
    handleEnter: jest.fn(),
  }),
  
  // Mock focus
  mockFocus: () => ({
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  }),
  
  // Mock paste
  mockPaste: () => ({
    handlePaste: jest.fn(),
  }),
  
  // Mock validation state
  mockValidationState: () => ({
    validationResult: null,
    isValidating: false,
  }),
  
  // Mock input
  mockInput: () => ({
    handleChange: jest.fn(),
    handleKeyDown: jest.fn(),
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  }),
  
  // Mock metrics
  mockMetrics: () => ({
    recordInput: jest.fn(),
    recordKeyboardNavigation: jest.fn(),
    getMetrics: jest.fn().mockReturnValue({
      totalInputs: 0,
      totalCompletions: 0,
      averageInputTime: 0,
    }),
  }),
  
  // Mock debug
  mockDebug: () => ({
    logInteraction: jest.fn(),
    logValidation: jest.fn(),
    logError: jest.fn(),
    getDebugInfo: jest.fn().mockReturnValue({
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      totalInteractions: 0,
      validationAttempts: 0,
      errors: [],
      performance: {
        mountTime: Date.now(),
        totalLifecycle: 0,
      },
    }),
  }),
  
  // Mock monitoring data
  mockMonitoringData: () => ({
    getMonitoringData: jest.fn().mockReturnValue({
      totalInteractions: 0,
      totalErrors: 0,
      averageResponseTime: 0,
      lastActivity: Date.now(),
    }),
  }),
  
  // Mock status icon
  mockStatusIcon: () => ({
    getStatusIconAndColor: jest.fn().mockReturnValue({
      statusIcon: null,
      statusColor: '#1976d2',
    }),
  }),
  
  // Mock translations
  mockTranslations: () => ({
    getTranslationsObject: jest.fn().mockReturnValue({}),
  }),
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export { testUtils };
