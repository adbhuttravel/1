
"use client";

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    const momentumFactor = 0.8; 

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * momentumFactor;
      followerY += (mouseY - followerY) * momentumFactor;

      if (follower) {
          follower.style.setProperty('--follower-x', `${followerX}`);
          follower.style.setProperty('--follower-y', `${followerY}`);
      }
      rafId.current = requestAnimationFrame(animate);
    };
    
    const onMouseEnter = () => follower?.classList.add('is-active');
    const onMouseLeave = () => follower?.classList.remove('is-active');

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      if(rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={followerRef}
        className="custom-cursor-follower"
      />
    </div>
  );
}
