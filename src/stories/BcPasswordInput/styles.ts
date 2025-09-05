export const strengthColors = [
  '#e57373', // zayıf (kırmızı)
  '#ffb74d', // orta (turuncu)
  '#81c784', // güçlü (yeşil)
  '#64b5f6', // çok güçlü (mavi)
];

export const barContainerStyle = {
  height: 8,
  borderRadius: 4,
  background: '#eee',
  marginTop: 8,
  marginBottom: 4,
  width: '100%',
  overflow: 'hidden',
};

export const barStyle = (score: number) => ({
  height: '100%',
  width: `${(score / 4) * 100}%`,
  background: strengthColors[score - 1] || strengthColors[0],
  transition: 'width 0.3s',
});

// Güç barı için renk geçişi (gradient)
export const barGradient = (score: number) => {
  // 1: kırmızı, 2: turuncu, 3: sarı, 4: yeşil, 5: mavi
  const stops = [
    '#e57373', // kırmızı
    '#ffb74d', // turuncu
    '#fff176', // sarı
    '#81c784', // yeşil
    '#64b5f6', // mavi
  ];
  const idx = Math.max(0, Math.min(score - 1, stops.length - 1));
  return `linear-gradient(90deg, ${stops.slice(0, idx + 1).join(', ')})`;
};

// Tüm kurallar sağlandığında animasyonlu onay kutusu
export const allPassedCheckStyle = {
  display: 'inline-block',
  color: '#4caf50',
  fontSize: 22,
  marginLeft: 8,
  animation: 'pop 0.4s cubic-bezier(.4,2,.6,1)'
};

// Keyframes (kullanıcı kendi global css'ine eklemeli)
// @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } } 