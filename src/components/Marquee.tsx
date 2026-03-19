import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = 20 }) => {
  return (
    <div className="w-full overflow-hidden py-2 border-y border-white/10 uppercase tracking-[0.2em] text-[10px]">
      <div 
        className="marquee-content"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 px-4 items-center">
          {Array(20).fill(0).map((_, i) => (
            <span key={i} className="mx-4">{text} •</span>
          ))}
        </div>
        <div className="flex shrink-0 px-4 items-center">
          {Array(20).fill(0).map((_, i) => (
            <span key={i} className="mx-4">{text} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
