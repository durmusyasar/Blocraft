import { useState, useEffect } from 'react';

function useReducedMotion(force?: boolean) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (force) {
      setReduced(true);
      return;
    }
    const match = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(match.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, [force]);
  return reduced;
}

export default useReducedMotion;
