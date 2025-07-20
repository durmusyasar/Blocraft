export const countrySelectStyle = {
  height: 40,
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "#fafafa",
  fontSize: 15,
  padding: "0 8px",
  minWidth: 90,
  display: "flex",
  alignItems: "center",
  gap: 6,
  outline: 'none',
  transition: 'border-color 0.2s',
  ':focus': {
    border: '2px solid #1976d2', // MUI primary
    background: '#fff',
  },
  ':disabled': {
    background: '#eee',
    color: '#aaa',
    cursor: 'not-allowed',
  },
  // MUI Select ve FormControl için yükseklik uyumu
  '& .MuiInputBase-root': {
    height: 40,
    minHeight: 40,
    boxSizing: 'border-box',
    padding: 0,
    alignItems: 'center',
  },
  '& .MuiSelect-select': {
    height: 40,
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    boxSizing: 'border-box',
  },
};

// Responsive ve appearance varyasyonları için örnek stiller:
export const countrySelectAppearances = {
  premium: {
    border: '2px solid #FFD700',
    background: '#FFFBEA',
  },
  soft: {
    border: '1px solid #90caf9',
    background: '#e3f2fd',
  },
  dark: {
    border: '1px solid #333',
    background: '#222',
    color: '#fff',
  },
  borderless: {
    border: 'none',
    background: 'transparent',
  },
  glass: {
    border: '1px solid #b3e5fc',
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(4px)',
  },
  minimal: {
    border: '1px solid #eee',
    background: '#fff',
  },
  neumorph: {
    border: '1px solid #e0e0e0',
    background: '#f5f5f5',
    boxShadow: '2px 2px 6px #e0e0e0, -2px -2px 6px #fff',
  },
  underline: {
    border: 'none',
    borderBottom: '2px solid #1976d2',
    background: '#fff',
  },
}; 