import 'jest-axe';

declare module 'jest-axe';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
} 