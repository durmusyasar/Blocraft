import { useEffect, useCallback } from 'react';

export interface KeyboardShortcutsOptions {
  onTogglePassword: () => void;
  onCopyPassword: () => void;
  onClearPassword: () => void;
  onGeneratePassword: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onTogglePassword,
  onCopyPassword,
  onClearPassword,
  onGeneratePassword,
  enabled = true
}: KeyboardShortcutsOptions) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    // Only handle shortcuts when focus is on password input or its container
    const target = e.target as HTMLElement;
    const isPasswordInput = target.tagName === 'INPUT' && target.getAttribute('type') === 'password';
    const isPasswordContainer = target.closest('[data-password-input]');
    
    if (!isPasswordInput && !isPasswordContainer) return;

    // Ctrl/Cmd + H: Toggle password visibility
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      onTogglePassword();
    }
    
    // Ctrl/Cmd + C: Copy password (when input is focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && isPasswordInput) {
      e.preventDefault();
      onCopyPassword();
    }
    
    // Ctrl/Cmd + Delete: Clear password
    if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
      e.preventDefault();
      onClearPassword();
    }
    
    // Ctrl/Cmd + G: Generate new password
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
      e.preventDefault();
      onGeneratePassword();
    }
    
    // Escape: Clear password
    if (e.key === 'Escape') {
      e.preventDefault();
      onClearPassword();
    }
  }, [enabled, onTogglePassword, onCopyPassword, onClearPassword, onGeneratePassword]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);

  return {
    shortcuts: {
      'Ctrl/Cmd + H': 'Toggle password visibility',
      'Ctrl/Cmd + C': 'Copy password',
      'Ctrl/Cmd + Delete': 'Clear password',
      'Ctrl/Cmd + G': 'Generate new password',
      'Escape': 'Clear password'
    }
  };
}
