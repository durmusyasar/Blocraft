import React from "react";

export const ClearButton = ({ onClick, disabled, ...rest }: { onClick: () => void; disabled?: boolean; [key: string]: unknown }) => (
  <button
    type="button"
    tabIndex={0}
    aria-label="Temizle"
    disabled={disabled}
    onClick={onClick}
    onKeyDown={e => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
    style={{
      background: 'none',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0,
      margin: 0,
      outline: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      minWidth: 28,
      minHeight: 28,
      fontSize: 20,
      lineHeight: 1,
      borderRadius: '50%',
      transition: 'background 0.2s',
      boxSizing: 'border-box',
    }}
    onMouseOver={e => { e.currentTarget.style.background = '#f0f0f0'; }}
    onFocus={e => { e.currentTarget.style.background = '#e0e0e0'; }}
    onMouseOut={e => { e.currentTarget.style.background = 'none'; }}
    onBlur={e => { e.currentTarget.style.background = 'none'; }}
    {...rest}
  >
    <span aria-hidden="true" style={{ fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
      ×
    </span>
  </button>
);
