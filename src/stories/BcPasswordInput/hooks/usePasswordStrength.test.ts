import { renderHook, act } from '@testing-library/react';
import { usePasswordStrength } from './usePasswordStrength';

describe('usePasswordStrength', () => {
  it('should initialize with null strength result', () => {
    const { result } = renderHook(() => usePasswordStrength());

    expect(result.current.strengthResult).toBeNull();
  });

  it('should analyze password strength correctly', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('TestPassword123!');
    });

    expect(result.current.strengthResult).toBeDefined();
    expect(result.current.strengthResult?.strength).toBeDefined();
    expect(result.current.strengthResult?.score).toBeGreaterThan(0);
  });

  it('should return correct strength level for weak password', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('123');
    });

    expect(result.current.strengthResult?.strength).toBe('very-weak');
  });

  it('should return correct strength level for strong password', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('StrongPassword123!@#');
    });

    expect(result.current.strengthResult?.strength).toBe('strong');
  });

  it('should check requirements correctly', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('TestPassword123!');
    });

    const requirements = result.current.strengthResult?.requirements;
    expect(requirements).toBeDefined();
    expect(requirements?.minLength).toBe(true);
    expect(requirements?.uppercase).toBe(true);
    expect(requirements?.lowercase).toBe(true);
    expect(requirements?.numbers).toBe(true);
    expect(requirements?.specialChars).toBe(true);
  });

  it('should generate feedback for weak password', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('123');
    });

    const feedback = result.current.strengthResult?.feedback;
    expect(feedback).toBeDefined();
    expect(feedback?.length).toBeGreaterThan(0);
  });

  it('should generate suggestions for improvement', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('weak');
    });

    const suggestions = result.current.strengthResult?.suggestions;
    expect(suggestions).toBeDefined();
    expect(suggestions?.length).toBeGreaterThan(0);
  });

  it('should reset strength result', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('TestPassword123!');
    });

    expect(result.current.strengthResult).toBeDefined();

    act(() => {
      result.current.resetStrength();
    });

    expect(result.current.strengthResult).toBeNull();
  });

  it('should get correct strength color', () => {
    const { result } = renderHook(() => usePasswordStrength());

    const veryWeakColor = result.current.getStrengthColor('very-weak');
    const weakColor = result.current.getStrengthColor('weak');
    const fairColor = result.current.getStrengthColor('fair');
    const goodColor = result.current.getStrengthColor('good');
    const strongColor = result.current.getStrengthColor('strong');

    expect(veryWeakColor).toBe('#f44336');
    expect(weakColor).toBe('#ff9800');
    expect(fairColor).toBe('#ffeb3b');
    expect(goodColor).toBe('#4caf50');
    expect(strongColor).toBe('#2196f3');
  });

  it('should get correct strength label', () => {
    const { result } = renderHook(() => usePasswordStrength());

    const veryWeakLabel = result.current.getStrengthLabel('very-weak');
    const weakLabel = result.current.getStrengthLabel('weak');
    const fairLabel = result.current.getStrengthLabel('fair');
    const goodLabel = result.current.getStrengthLabel('good');
    const strongLabel = result.current.getStrengthLabel('strong');

    expect(veryWeakLabel).toBe('Çok Zayıf');
    expect(weakLabel).toBe('Zayıf');
    expect(fairLabel).toBe('Orta');
    expect(goodLabel).toBe('İyi');
    expect(strongLabel).toBe('Güçlü');
  });

  it('should work with custom strength config', () => {
    const customConfig = {
      minLength: 10,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    };

    const { result } = renderHook(() => usePasswordStrength(customConfig));

    act(() => {
      result.current.analyzePassword('Test123!');
    });

    const requirements = result.current.strengthResult?.requirements;
    expect(requirements?.minLength).toBe(false); // 8 chars < 10 min
  });

  it('should handle empty password', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('');
    });

    expect(result.current.strengthResult?.strength).toBe('very-weak');
    expect(result.current.strengthResult?.score).toBe(0);
  });

  it('should detect common password patterns', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('password');
    });

    const requirements = result.current.strengthResult?.requirements;
    expect(requirements?.noCommonPasswords).toBe(false);
  });

  it('should detect keyboard patterns', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('qwerty');
    });

    const requirements = result.current.strengthResult?.requirements;
    expect(requirements?.noCommonPasswords).toBe(false);
  });

  it('should detect repeated characters', () => {
    const { result } = renderHook(() => usePasswordStrength());

    act(() => {
      result.current.analyzePassword('aaa');
    });

    const requirements = result.current.strengthResult?.requirements;
    expect(requirements?.noPersonalInfo).toBe(true);
  });
});
