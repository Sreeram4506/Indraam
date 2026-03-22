import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth inertial scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Style for the scrollbar to match the design
    const style = document.createElement('style');
    style.textContent = `
      html.lenis {
        height: auto;
      }
      
      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }
      
      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      
      .lenis.lenis-stopped {
        overflow: hidden;
      }
      
      .lenis.lenis-scrolling iframe {
        pointer-events: none;
      }
      
      ::-webkit-scrollbar {
        width: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #080808;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.18);
        border: 2px solid #080808;
        border-radius: 20px;
        transition: background 0.3s;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.28);
      }
    `;
    document.head.appendChild(style);

    return () => {
      lenis.destroy();
      document.head.removeChild(style);
    };
  }, []);
};
