"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AutoSlider({ sliderData }: { sliderData: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const isDragging = useRef(false);
  const isDraggingClick = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    const singleSetWidth = el.scrollWidth / 3;
    
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.05;

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && !isDragging.current) {
        el.scrollLeft += speed * delta;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    if (el.scrollLeft === 0) {
        el.scrollLeft = el.scrollWidth / 3;
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isDraggingClick.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
    setTimeout(() => { isDraggingClick.current = false }, 50);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => { isDraggingClick.current = false }, 50);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2; 
    if (Math.abs(x - startX.current) > 5) {
        isDraggingClick.current = true;
    }
    if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <div 
      className="slider-container fade-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div 
         ref={scrollRef}
         onScroll={handleScroll}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onMouseMove={onMouseMove}
         className="slider-track-native" 
         style={{
            display: 'flex',
            width: '100%',
            overflowX: 'auto',
            scrollBehavior: 'auto',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch'
         }}
      >
        <style>{`
          .slider-track-native::-webkit-scrollbar { display: none; }
          .slider-track-native { cursor: grab; }
          .slider-track-native:active { cursor: grabbing; }
        `}</style>
        
        {[0, 1, 2].map((setIndex) => (
            <div key={setIndex} style={{ display: 'flex', gap: '25px', flexShrink: 0, paddingRight: '25px' }}>
                {sliderData.map((item: any, idx: number) => (
                    <Link 
                      href={`/room/${item.id}`} 
                      key={`slide-${setIndex}-${idx}`}
                      style={{ flexShrink: 0, textDecoration: 'none', color: 'inherit' }} 
                      draggable={false}
                      onClick={(e) => {
                        if (isDraggingClick.current) {
                            e.preventDefault();
                        }
                      }}
                    >
                      <div className="slide-card" style={{ userSelect: 'none' }}>
                        <img src={item.image_url || item.main_image} alt={item.title} draggable={false} />
                        <div className="slide-info">
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.location}</p>
                          </div>
                          <span className="slide-price">
                            {item.has_offer ? (
                              <span className="text-orange-600 font-bold">
                                {item.offer_price} <span className="line-through text-gray-400 text-sm">{item.base_price}</span>
                              </span>
                            ) : (
                              item.base_price || item.price
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                ))}
            </div>
        ))}
      </div>
    </div>
  );
}
