# BcOtpInput Component

**BcOtpInput** is a professional, feature-rich OTP (One-Time Password) input component built on top of **BcTextField**. It provides a seamless user experience for entering verification codes with advanced features like keyboard navigation, paste support, real-time validation, and accessibility compliance.

## 🚀 Features

### Core Features
- ✅ **Multiple Input Boxes**: Individual input fields for each character
- ✅ **Single Character Input**: Each box accepts only one character
- ✅ **Auto-focus Navigation**: Automatically moves focus to next input
- ✅ **Keyboard Navigation**: Arrow keys, Tab, Home, End support
- ✅ **Paste Support**: Automatic distribution of pasted content
- ✅ **Real-time Validation**: Instant feedback on input validity
- ✅ **Auto-clear**: Automatic clearing after specified delay
- ✅ **Masking**: Password-style masking for security
- ✅ **Responsive Design**: Adapts to different screen sizes

### Advanced Features
- 🎨 **Multiple Appearances**: Premium, Soft, Glass, Minimal, Neumorph, Underline, Dark, Borderless
- 🔧 **Customizable Shapes**: Square, Circle, Hexagon, Rounded
- 📏 **Size Options**: Small, Medium, Large, Extra Large
- 🎭 **Animation Support**: Focus, Success, Error, Typing animations
- ♿ **Accessibility**: ARIA labels, screen reader support, keyboard navigation
- 🌐 **Internationalization**: Multi-language support with i18n
- 🔒 **Security**: Anti-keylog protection, secure input handling
- 📊 **Analytics**: Usage tracking, performance monitoring
- 🎯 **Performance**: Optimized rendering, debounced validation

## 📦 Installation

```bash
npm install @mui/material @mui/system
```

## 🎯 Basic Usage

```tsx
import React, { useState } from 'react';
import { BcOtpInput } from './components/BcOtpInput/BcOtpInput';

function MyComponent() {
  const [otpValue, setOtpValue] = useState('');

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const handleOtpComplete = (value: string) => {
    console.log('OTP completed:', value);
  };

  return (
    <BcOtpInput
      length={6}
      otpValue={otpValue}
      onOtpChange={handleOtpChange}
      onOtpComplete={handleOtpComplete}
      label="Enter OTP Code"
      helperText="Enter the 6-digit code sent to your device"
    />
  );
}
```

## 🎨 Appearance Examples

### Premium Style
```tsx
<BcOtpInput
  length={6}
  appearance="premium"
  inputShape="rounded"
  inputSize="large"
  animationOptions={{
    enableAnimations: true,
    enableFocusAnimation: true,
  }}
/>
```

### Glass Style
```tsx
<BcOtpInput
  length={6}
  appearance="glass"
  inputShape="circle"
  stylingOptions={{
    enableGlow: true,
    enableGradient: true,
  }}
/>
```

### Minimal Style
```tsx
<BcOtpInput
  length={6}
  appearance="minimal"
  inputShape="square"
  animationOptions={{
    enableAnimations: false,
  }}
/>
```

## 🔧 Advanced Configuration

### With Validation
```tsx
<BcOtpInput
  length={6}
  otpValue={otpValue}
  onOtpChange={setOtpValue}
  validateOtp={(value) => value === '123456'}
  validationOptions={{
    enableAutoValidation: true,
    validationDebounceMs: 300,
  }}
  onOtpComplete={(value) => {
    if (value === '123456') {
      console.log('Valid OTP!');
    } else {
      console.log('Invalid OTP!');
    }
  }}
/>
```

### With Security Features
```tsx
<BcOtpInput
  length={6}
  mask={true}
  maskCharacter="*"
  autoClear={true}
  clearDelay={5000}
  securityOptions={{
    enableAntiKeylog: true,
    enableSecureInput: true,
    enableScreenCapture: false,
  }}
/>
```

### With Accessibility
```tsx
<BcOtpInput
  length={6}
  accessibilityOptions={{
    enableHighContrast: true,
    enableScreenReader: true,
    enableKeyboardNavigation: true,
    enableVoiceInput: true,
  }}
  interactionOptions={{
    enableKeyboardNavigation: true,
    enablePasteSupport: true,
  }}
/>
```

### With Analytics
```tsx
<BcOtpInput
  length={6}
  analyticsOptions={{
    enableUsageTracking: true,
    enableErrorTracking: true,
    enablePerformanceTracking: true,
  }}
  monitoring={{
    onInputChange: (value, index, timestamp) => {
      console.log('Input changed:', { value, index, timestamp });
    },
    onValidation: (isValid, value, timestamp) => {
      console.log('Validation result:', { isValid, value, timestamp });
    },
    onComplete: (value, timestamp) => {
      console.log('OTP completed:', { value, timestamp });
    },
  }}
/>
```

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of OTP input boxes |
| `otpValue` | `string` | `''` | Current OTP value |
| `onOtpChange` | `(value: string) => void` | - | Callback when OTP value changes |
| `onOtpComplete` | `(value: string) => void` | - | Callback when OTP is completed |
| `validateOtp` | `(value: string) => boolean \| string \| Promise<boolean \| string>` | - | Validation function |
| `inputType` | `'number' \| 'text' \| 'alphanumeric'` | `'number'` | Input type restriction |
| `inputShape` | `'square' \| 'circle' \| 'hexagon' \| 'rounded'` | `'square'` | Shape of input boxes |
| `inputSize` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Size of input boxes |
| `mask` | `boolean` | `false` | Whether to mask input |
| `maskCharacter` | `string` | `'*'` | Character to use for masking |
| `autoFocus` | `boolean` | `false` | Whether to auto-focus first input |
| `autoClear` | `boolean` | `false` | Whether to auto-clear after delay |
| `clearDelay` | `number` | `3000` | Auto-clear delay in milliseconds |

### Animation Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableAnimations` | `boolean` | `true` | Enable animations |
| `animationDuration` | `number` | `300` | Animation duration in ms |
| `enableSuccessAnimation` | `boolean` | `true` | Enable success animations |
| `enableErrorAnimation` | `boolean` | `true` | Enable error animations |
| `enableFocusAnimation` | `boolean` | `true` | Enable focus animations |
| `enableTypingAnimation` | `boolean` | `true` | Enable typing animations |

### Styling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `inputShape` | `OtpInputShape` | `'square'` | Shape of input boxes |
| `inputSize` | `OtpInputSize` | `'medium'` | Size of input boxes |
| `enableCustomColors` | `boolean` | `false` | Enable custom colors |
| `primaryColor` | `string` | `'#1976d2'` | Primary color |
| `secondaryColor` | `string` | `'#424242'` | Secondary color |
| `enableGradient` | `boolean` | `false` | Enable gradient backgrounds |
| `enableGlow` | `boolean` | `false` | Enable glow effects |
| `enableShadow` | `boolean` | `true` | Enable shadow effects |

### Accessibility Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableHighContrast` | `boolean` | `false` | Enable high contrast mode |
| `enableReducedMotion` | `boolean` | `false` | Enable reduced motion |
| `enableScreenReader` | `boolean` | `true` | Enable screen reader support |
| `enableKeyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `enableVoiceInput` | `boolean` | `false` | Enable voice input |
| `enableHapticFeedback` | `boolean` | `false` | Enable haptic feedback |

### Security Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableMasking` | `boolean` | `false` | Enable input masking |
| `maskCharacter` | `string` | `'*'` | Mask character |
| `enableAutoClear` | `boolean` | `false` | Enable auto-clear |
| `clearDelay` | `number` | `3000` | Clear delay in ms |
| `enableSecureInput` | `boolean` | `false` | Enable secure input |
| `enableAntiKeylog` | `boolean` | `false` | Enable anti-keylog protection |
| `enableScreenCapture` | `boolean` | `true` | Enable screen capture |
| `enableCopyPaste` | `boolean` | `true` | Enable copy/paste |

### Validation Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableAutoValidation` | `boolean` | `false` | Enable auto-validation |
| `validationDebounceMs` | `number` | `300` | Validation debounce delay |
| `enableRealTimeValidation` | `boolean` | `true` | Enable real-time validation |
| `enableAsyncValidation` | `boolean` | `false` | Enable async validation |
| `validateOnBlur` | `boolean` | `true` | Validate on blur |
| `validateOnComplete` | `boolean` | `true` | Validate on completion |
| `customValidationRules` | `Array<(value: string) => boolean \| string>` | `[]` | Custom validation rules |
| `enableRetryValidation` | `boolean` | `false` | Enable retry validation |
| `maxRetryAttempts` | `number` | `3` | Maximum retry attempts |

### Interaction Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableKeyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `enablePasteSupport` | `boolean` | `true` | Enable paste support |
| `enableAutoFocus` | `boolean` | `false` | Enable auto-focus |
| `enableAutoComplete` | `boolean` | `false` | Enable auto-complete |
| `enableSmartPaste` | `boolean` | `true` | Enable smart paste |
| `enableBulkInput` | `boolean` | `true` | Enable bulk input |
| `enableGestureInput` | `boolean` | `false` | Enable gesture input |
| `enableTouchInput` | `boolean` | `true` | Enable touch input |
| `enableMouseInput` | `boolean` | `true` | Enable mouse input |

### Performance Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableVirtualization` | `boolean` | `false` | Enable virtualization |
| `enableLazyLoading` | `boolean` | `false` | Enable lazy loading |
| `enableMemoization` | `boolean` | `true` | Enable memoization |
| `enableDebouncing` | `boolean` | `true` | Enable debouncing |
| `debounceMs` | `number` | `300` | Debounce delay in ms |
| `enableThrottling` | `boolean` | `false` | Enable throttling |
| `throttleMs` | `number` | `100` | Throttle delay in ms |
| `enableBatchUpdates` | `boolean` | `false` | Enable batch updates |
| `batchSize` | `number` | `10` | Batch size |

### Analytics Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableUsageTracking` | `boolean` | `false` | Enable usage tracking |
| `enableErrorTracking` | `boolean` | `true` | Enable error tracking |
| `enablePerformanceTracking` | `boolean` | `true` | Enable performance tracking |
| `enableUserBehaviorTracking` | `boolean` | `false` | Enable user behavior tracking |
| `enableAccessibilityTracking` | `boolean` | `false` | Enable accessibility tracking |
| `customEvents` | `Array<string>` | `[]` | Custom events to track |
| `trackingId` | `string` | `''` | Tracking ID |

### Monitoring Callbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onInputChange` | `(value: string, index: number, timestamp: number) => void` | Called when input changes |
| `onValidation` | `(isValid: boolean, value: string, timestamp: number) => void` | Called when validation occurs |
| `onFocus` | `(index: number, timestamp: number) => void` | Called when input is focused |
| `onBlur` | `(index: number, timestamp: number) => void` | Called when input is blurred |
| `onComplete` | `(value: string, timestamp: number) => void` | Called when OTP is completed |
| `onError` | `(error: string, timestamp: number) => void` | Called when error occurs |
| `onSuccess` | `(value: string, timestamp: number) => void` | Called when validation succeeds |
| `onRetry` | `(attempts: number, timestamp: number) => void` | Called when retry occurs |
| `onKeyboardNavigation` | `(direction: 'left' \| 'right' \| 'up' \| 'down', timestamp: number) => void` | Called when keyboard navigation occurs |
| `onPaste` | `(pastedValue: string, timestamp: number) => void` | Called when paste occurs |
| `onClear` | `(timestamp: number) => void` | Called when input is cleared |
| `onResize` | `(width: number, height: number, timestamp: number) => void` | Called when component is resized |
| `onAccessibilityAction` | `(action: string, timestamp: number) => void` | Called when accessibility action occurs |
| `onPerformanceMetric` | `(metric: string, value: number, timestamp: number) => void` | Called when performance metric is recorded |

## 🎯 Examples

### Basic OTP Input
```tsx
<BcOtpInput
  length={6}
  label="Verification Code"
  helperText="Enter the code sent to your phone"
/>
```

### With Validation
```tsx
<BcOtpInput
  length={6}
  validateOtp={(value) => value === '123456'}
  validationOptions={{
    enableAutoValidation: true,
  }}
  onOtpComplete={(value) => {
    if (value === '123456') {
      console.log('Valid!');
    } else {
      console.log('Invalid!');
    }
  }}
/>
```

### With Custom Styling
```tsx
<BcOtpInput
  length={6}
  appearance="glass"
  inputShape="circle"
  inputSize="large"
  stylingOptions={{
    enableGradient: true,
    enableGlow: true,
    primaryColor: '#ff6b6b',
    secondaryColor: '#4ecdc4',
  }}
  animationOptions={{
    enableAnimations: true,
    animationDuration: 500,
  }}
/>
```

### With Security Features
```tsx
          <BcOtpInput
            length={6}
  mask={true}
  autoClear={true}
  clearDelay={5000}
  securityOptions={{
    enableAntiKeylog: true,
    enableSecureInput: true,
    enableScreenCapture: false,
  }}
/>
```

### With Accessibility
```tsx
<BcOtpInput
  length={6}
  accessibilityOptions={{
    enableHighContrast: true,
    enableScreenReader: true,
    enableKeyboardNavigation: true,
  }}
  interactionOptions={{
    enableKeyboardNavigation: true,
    enablePasteSupport: true,
  }}
/>
```

### With Analytics
```tsx
<BcOtpInput
  length={6}
  analyticsOptions={{
    enableUsageTracking: true,
    enableErrorTracking: true,
    enablePerformanceTracking: true,
  }}
  monitoring={{
    onInputChange: (value, index, timestamp) => {
      analytics.track('otp_input_change', { value, index, timestamp });
    },
    onValidation: (isValid, value, timestamp) => {
      analytics.track('otp_validation', { isValid, value, timestamp });
    },
    onComplete: (value, timestamp) => {
      analytics.track('otp_complete', { value, timestamp });
    },
  }}
/>
```

## 🎨 Styling

### Custom CSS Classes
```css
.bc-otp-input {
  /* Container styles */
}

.bc-otp-input .otp-container {
  /* Input container styles */
}

.bc-otp-input .otp-input {
  /* Individual input styles */
}

.bc-otp-input .otp-input:focus {
  /* Focus styles */
}

.bc-otp-input .otp-input:disabled {
  /* Disabled styles */
}

.bc-otp-input .otp-input.error {
  /* Error styles */
}

.bc-otp-input .otp-input.success {
  /* Success styles */
}
```

### Theme Integration
```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiBcOtpInput: {
      styleOverrides: {
        root: {
          '& .otp-input': {
            borderRadius: '8px',
            border: '2px solid #e0e0e0',
            '&:focus': {
              borderColor: '#1976d2',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
          },
        },
      },
    },
  },
});
```

## ♿ Accessibility

### ARIA Labels
The component automatically provides proper ARIA labels for screen readers:

```tsx
<BcOtpInput
  length={6}
  label="Verification Code"
  helperText="Enter the 6-digit code sent to your device"
  // Automatically generates:
  // - aria-label for each input
  // - aria-describedby for helper text
  // - aria-invalid for error states
  // - aria-busy for loading states
/>
```

### Keyboard Navigation
- **Tab**: Move between inputs
- **Arrow Keys**: Navigate between inputs
- **Home**: Go to first input
- **End**: Go to last input
- **Backspace**: Clear current input and move to previous
- **Delete**: Clear current input and move to next

### Screen Reader Support
```tsx
<BcOtpInput
  length={6}
  accessibilityOptions={{
    enableScreenReader: true,
    enableHighContrast: true,
  }}
  // Provides:
  // - Proper ARIA labels
  // - Live regions for status updates
  // - High contrast mode
  // - Screen reader announcements
/>
```

## 🌐 Internationalization

### Basic i18n Support
```tsx
<BcOtpInput
  length={6}
  locale="tr"
  fallbackLocale="en"
  translations={{
    tr: {
      label: "Doğrulama Kodu",
      helperText: "Cihazınıza gönderilen 6 haneli kodu girin",
      error: "Geçersiz kod",
      success: "Kod doğrulandı",
    },
    en: {
      label: "Verification Code",
      helperText: "Enter the 6-digit code sent to your device",
      error: "Invalid code",
      success: "Code verified",
    },
  }}
/>
```

### RTL Support
```tsx
<BcOtpInput
  length={6}
  locale="ar"
  enableRTL={true}
  // Automatically handles:
  // - Right-to-left text direction
  // - RTL keyboard navigation
  // - RTL layout adjustments
/>
```

## 🔒 Security

### Anti-Keylog Protection
```tsx
<BcOtpInput
  length={6}
  securityOptions={{
    enableAntiKeylog: true,
    enableSecureInput: true,
    enableScreenCapture: false,
  }}
  // Provides:
  // - Random input delays
  // - Secure input handling
  // - Screen capture protection
/>
```

### Input Masking
```tsx
<BcOtpInput
  length={6}
  mask={true}
  maskCharacter="*"
  // Masks input for security
/>
```

### Auto-clear
```tsx
<BcOtpInput
  length={6}
  autoClear={true}
  clearDelay={5000}
  // Automatically clears input after 5 seconds
/>
```

## 📊 Performance

### Optimization Features
- **Memoization**: Prevents unnecessary re-renders
- **Debouncing**: Reduces validation calls
- **Virtualization**: Handles large numbers of inputs
- **Lazy Loading**: Loads components on demand
- **Batch Updates**: Groups multiple updates

### Performance Monitoring
```tsx
<BcOtpInput
  length={6}
  performanceOptions={{
    enablePerformanceTracking: true,
    enableMemoization: true,
    enableDebouncing: true,
    debounceMs: 300,
  }}
  monitoring={{
    onPerformanceMetric: (metric, value, timestamp) => {
      console.log(`${metric}: ${value}ms at ${timestamp}`);
    },
  }}
/>
```

## 🧪 Testing

### Unit Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BcOtpInput } from './BcOtpInput';

test('should handle input changes', async () => {
  const handleChange = jest.fn();
  render(<BcOtpInput length={6} onOtpChange={handleChange} />);
  
  const inputs = screen.getAllByRole('textbox');
  await userEvent.type(inputs[0], '1');
  
  expect(handleChange).toHaveBeenCalledWith('1');
});
```

### Integration Tests
```tsx
test('should validate input with custom validator', async () => {
  const validateOtp = jest.fn().mockReturnValue(true);
  render(<BcOtpInput length={6} validateOtp={validateOtp} />);
  
  const inputs = screen.getAllByRole('textbox');
  
  for (let i = 0; i < inputs.length; i++) {
    await userEvent.type(inputs[i], (i + 1).toString());
  }
  
  expect(validateOtp).toHaveBeenCalledWith('123456');
});
```

### Accessibility Tests
```tsx
test('should have proper ARIA labels', () => {
  render(<BcOtpInput length={6} />);
  
  const inputs = screen.getAllByRole('textbox');
  inputs.forEach((input, index) => {
    expect(input).toHaveAttribute('aria-label', `OTP digit ${index + 1}`);
  });
});
```

## 🐛 Troubleshooting

### Common Issues

#### Input not focusing
```tsx
// Ensure autoFocus is enabled
<BcOtpInput
  length={6}
  autoFocus={true}
  interactionOptions={{
    enableKeyboardNavigation: true,
  }}
/>
```

#### Validation not working
```tsx
// Enable auto-validation
<BcOtpInput
  length={6}
  validateOtp={(value) => value === '123456'}
  validationOptions={{
    enableAutoValidation: true,
    validationDebounceMs: 300,
  }}
/>
```

#### Styling not applying
```tsx
// Check theme integration
import { ThemeProvider } from '@mui/material/styles';

<ThemeProvider theme={theme}>
  <BcOtpInput
    length={6}
    appearance="premium"
    stylingOptions={{
      enableCustomColors: true,
      primaryColor: '#1976d2',
    }}
  />
</ThemeProvider>
```

#### Accessibility issues
```tsx
// Enable accessibility features
          <BcOtpInput
            length={6}
  accessibilityOptions={{
    enableScreenReader: true,
    enableHighContrast: true,
    enableKeyboardNavigation: true,
  }}
/>
```

## 📝 Changelog

### Version 1.0.0
- Initial release
- Basic OTP input functionality
- Multiple appearances and shapes
- Keyboard navigation
- Paste support
- Validation system
- Accessibility support
- i18n support
- Security features
- Performance optimizations
- Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built on top of Material-UI
- Inspired by modern OTP input designs
- Accessibility guidelines from WCAG 2.1
- Performance best practices from React documentation

---

**BcOtpInput** - Professional OTP Input Component for React Applications