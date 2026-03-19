import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Enable smooth scrolling
    html.style.scrollBehavior = 'smooth';
    body.style.scrollBehavior = 'smooth';

    // Add custom easing for more natural feel
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 0;
      }
      
      body {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #080808;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;
    document.head.appendChild(style);

    return () => {
      html.style.scrollBehavior = '';
      body.style.scrollBehavior = '';
      document.head.removeChild(style);
    };
  }, []);
};
