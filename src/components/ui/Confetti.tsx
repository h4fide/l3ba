'use client';
import ReactConfetti from 'react-confetti';
import { useState, useEffect } from 'react';

export function Confetti() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} />;
}
