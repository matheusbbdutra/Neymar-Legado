import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const EndingCredit = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const njrRef = useRef<HTMLHeadingElement | null>(null);
  const storyRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !pinRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        scrub: true,
      }
    });

    // Set initial states
    gsap.set([njrRef.current, storyRef.current], { opacity: 0, scale: 0.95 });

    // Sequence animations
    tl.to(njrRef.current, { opacity: 1, scale: 1, duration: 1.5 })
      .to(njrRef.current, { opacity: 0, scale: 1.05, duration: 1.5, delay: 1 })
      .to(storyRef.current, { opacity: 1, scale: 1, duration: 1.5 })
      .to(storyRef.current, { opacity: 0, scale: 1.05, duration: 1.5, delay: 1.5 });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black" 
      style={{ height: '300vh' }}
    >
      <div 
        ref={pinRef} 
        className="h-screen w-full flex items-center justify-center bg-black overflow-hidden relative select-none"
      >
        {/* Cinematic ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />

        {/* NJR Text */}
        <h1 
          ref={njrRef} 
          className="absolute text-6xl md:text-9xl font-black tracking-[0.3em] text-white text-center leading-none"
        >
          NJR
        </h1>

        {/* Subtitle text */}
        <h2 
          ref={storyRef} 
          className="absolute text-xl sm:text-2xl md:text-3xl font-light tracking-[0.4em] text-gray-400 text-center uppercase"
        >
          The Story Continues.
        </h2>
      </div>
    </div>
  );
};
