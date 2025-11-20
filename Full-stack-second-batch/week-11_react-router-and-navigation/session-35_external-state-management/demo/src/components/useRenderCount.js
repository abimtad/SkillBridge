import { useRef, useEffect } from 'react';

export function useRenderCount(label) {
  const renders = useRef(0);
  renders.current += 1;
  useEffect(() => {
    // Log after commit to avoid double counting in StrictMode initial mount
    console.log(`[render] ${label}:`, renders.current);
  });
  return renders.current;
}
