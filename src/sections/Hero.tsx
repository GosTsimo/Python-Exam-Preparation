import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out', delay: 0.6 }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1 }
      );

      // Blob animations
      gsap.fromTo(
        blob1Ref.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.8, ease: 'elastic.out(1, 0.5)', delay: 0 }
      );

      gsap.fromTo(
        blob2Ref.current,
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.8, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('chapters');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-light via-romantic-bg to-purple-light" />
      
      {/* Floating blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-DEFAULT to-pink-dark opacity-60 blob float"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-DEFAULT to-purple-dark opacity-60 blob-2 float-delayed"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-peach-DEFAULT rounded-full animate-pulse-soft" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-DEFAULT rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-DEFAULT rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-romantic mb-8 animate-fade-in-up border border-white/60">
          <Sparkles className="w-4 h-4 text-pink-deep hover:text-crimson-love transition-all duration-300 hover:scale-110 hover:rotate-12" />
          <span className="text-sm font-medium text-romantic-text">Your Python Learning Journey</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-romantic-text mb-6 leading-tight"
        >
          Python Exam{' '}
          <span className="text-gradient">Preparation</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-romantic-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Master Python with confidence and elegance. Your journey to exam success starts here with 
          interactive lessons, exercises, and quizzes designed to make learning delightful.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <Button
            onClick={scrollToContent}
            size="lg"
            className="group relative px-8 py-6 text-lg font-medium bg-gradient-to-r from-pink-DEFAULT to-purple-DEFAULT hover:from-pink-dark hover:to-purple-dark text-white rounded-2xl shadow-romantic-lg hover:shadow-romantic-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Learning
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 group-hover:text-white transition-all duration-300 text-white/90" />
            </span>
            {/* Liquid fill effect */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '3', label: 'Chapters' },
            { value: '25+', label: 'Exercises' },
            { value: '15+', label: 'Quiz Questions' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-sm text-romantic-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-romantic-bg to-transparent" />
    </section>
  );
}
