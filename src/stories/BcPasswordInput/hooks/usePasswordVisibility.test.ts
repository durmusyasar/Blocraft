import { renderHook, act } from '@testing-library/react';
import { usePasswordVisibility } from './usePasswordVisibility';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('usePasswordVisibility', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('should initialize with default visible state', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    expect(result.current.isVisible).toBe(false);
  });

  it('should initialize with custom default visible state', () => {
    const { result } = renderHook(() => usePasswordVisibility({ defaultVisible: true }));

    expect(result.current.isVisible).toBe(true);
  });

  it('should toggle visibility', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    expect(result.current.isVisible).toBe(false);

    act(() => {
      result.current.toggleVisibility();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.toggleVisibility();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should set visibility directly', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    act(() => {
      result.current.setVisibility(true);
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.setVisibility(false);
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should reset visibility to default', () => {
    const { result } = renderHook(() => usePasswordVisibility({ defaultVisible: false }));

    act(() => {
      result.current.setVisibility(true);
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.resetVisibility();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should call onVisibilityChange callback', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() => 
      usePasswordVisibility({ onVisibilityChange })
    );

    act(() => {
      result.current.toggleVisibility();
    });

    expect(onVisibilityChange).toHaveBeenCalledWith(true);

    act(() => {
      result.current.toggleVisibility();
    });

    expect(onVisibilityChange).toHaveBeenCalledWith(false);
  });

  it('should save to localStorage when rememberVisibility is enabled', () => {
    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: true,
        storageKey: 'test-password-visibility'
      })
    );

    act(() => {
      result.current.toggleVisibility();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-password-visibility',
      'true'
    );
  });

  it('should load from localStorage when rememberVisibility is enabled', () => {
    localStorageMock.getItem.mockReturnValue('true');

    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: true,
        storageKey: 'test-password-visibility'
      })
    );

    expect(result.current.isVisible).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-password-visibility');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: true,
        storageKey: 'test-password-visibility'
      })
    );

    act(() => {
      result.current.toggleVisibility();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save password visibility state to localStorage:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should handle localStorage parse errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: true,
        storageKey: 'test-password-visibility'
      })
    );

    expect(result.current.isVisible).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to load password visibility state from localStorage:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should return correct toggle props', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    const toggleProps = result.current.getToggleProps();

    expect(toggleProps.type).toBe('password');
    expect(toggleProps['aria-label']).toBe('Şifreyi göster');
    expect(toggleProps['aria-pressed']).toBe(false);

    act(() => {
      result.current.toggleVisibility();
    });

    const newToggleProps = result.current.getToggleProps();

    expect(newToggleProps.type).toBe('text');
    expect(newToggleProps['aria-label']).toBe('Şifreyi gizle');
    expect(newToggleProps['aria-pressed']).toBe(true);
  });

  it('should return correct toggle button props', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    const buttonProps = result.current.getToggleButtonProps();

    expect(buttonProps['aria-label']).toBe('Şifreyi göster');
    expect(buttonProps['aria-pressed']).toBe(false);
    expect(buttonProps['aria-expanded']).toBe(false);
    expect(buttonProps.title).toBe('Şifreyi göster');
  });

  it('should return correct visibility icon props', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    const iconProps = result.current.getVisibilityIconProps();

    expect(iconProps['aria-hidden']).toBe(true);
    expect(iconProps.style?.transition).toBe('transform 0.2s ease');
    expect(iconProps.style?.transform).toBe('rotate(180deg)');

    act(() => {
      result.current.toggleVisibility();
    });

    const newIconProps = result.current.getVisibilityIconProps();

    expect(newIconProps.style?.transform).toBe('rotate(0deg)');
  });

  it('should not save to localStorage when rememberVisibility is disabled', () => {
    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: false,
        storageKey: 'test-password-visibility'
      })
    );

    act(() => {
      result.current.toggleVisibility();
    });

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should not load from localStorage when rememberVisibility is disabled', () => {
    localStorageMock.getItem.mockReturnValue('true');

    const { result } = renderHook(() => 
      usePasswordVisibility({ 
        rememberVisibility: false,
        storageKey: 'test-password-visibility'
      })
    );

    expect(result.current.isVisible).toBe(false);
    expect(localStorageMock.getItem).not.toHaveBeenCalled();
  });
});
