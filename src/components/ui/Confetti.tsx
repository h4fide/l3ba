'use client';
import ReactConfetti from 'react-confetti';
import { useState, useEffect, useRef } from 'react';

export function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    function updateDimensions() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    }
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!isClient || dimensions.width === 0 || dimensions.height === 0) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
