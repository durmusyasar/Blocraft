import { useState, useEffect } from 'react';

function useHighContrast(force?: boolean) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  useEffect(() => {
    if (force) {
      setIsHighContrast(true);
      return;
    }
    const match = window.matchMedia('(forced-colors: active), (prefers-contrast: more)');
    setIsHighContrast(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsHighContrast(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, [force]);
  return isHighContrast;
}

export default useHighContrast;
