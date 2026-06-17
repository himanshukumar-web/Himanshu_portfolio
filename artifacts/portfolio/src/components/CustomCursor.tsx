import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHover = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const isClickable = 
          window.getComputedStyle(hoveredElement).cursor === 'pointer' ||
          hoveredElement.tagName.toLowerCase() === 'a' ||
          hoveredElement.tagName.toLowerCase() === 'button';
        setIsHovering(isClickable);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    const hoverInterval = setInterval(checkHover, 100);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      clearInterval(hoverInterval);
    };
  }, [position.x, position.y]);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTrailingPosition = () => {
      setTrailingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(updateTrailingPosition);
    };
    
    animationFrameId = requestAnimationFrame(updateTrailingPosition);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't show custom cursor on touch devices
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Primary dot */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
        }}
      />
      
      {/* Trailing ring */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{ 
          transform: `translate3d(${trailingPosition.x}px, ${trailingPosition.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none',
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
