import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Star, Heart, Zap, Target, Coffee } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Tip {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
}

const tips: Tip[] = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Practice Daily',
    content: 'Consistency is key! Even 30 minutes of coding every day is better than 3 hours once a week. Build a habit.',
    color: 'from-yellow-300 to-orange-300',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Use Meaningful Names',
    content: 'Choose variable names that describe their purpose. `age` is better than `a`. `student_names` is better than `sn`.',
    color: 'from-pink-300 to-rose-300',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Love Your Errors',
    content: 'Error messages are your friends! They tell you exactly what went wrong and where. Read them carefully.',
    color: 'from-red-300 to-pink-300',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'DRY Principle',
    content: "Don't Repeat Yourself! If you find yourself copying code, create a function instead.",
    color: 'from-blue-300 to-cyan-300',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Plan Before Coding',
    content: 'Take a moment to understand the problem. Write pseudocode or draw a flowchart before writing actual code.',
    color: 'from-green-300 to-emerald-300',
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'Take Breaks',
    content: 'Stuck on a problem? Step away for 10 minutes. A fresh perspective often brings the solution.',
    color: 'from-purple-300 to-violet-300',
  },
];

function TipCard({ tip, index }: { tip: Tip; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      id={`tip-card-${index}`}
      className="opacity-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transform: `translateY(${index % 2 === 1 ? '30px' : '0'})`,
      }}
    >
      <div
        className="glass-card rounded-3xl p-6 h-full transition-all duration-300 cursor-pointer"
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(20px)`
            : 'rotateX(0) rotateY(0) translateZ(0)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(255, 183, 197, 0.3)'
            : '0 8px 32px rgba(255, 183, 197, 0.15)',
        }}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white mb-4 shadow-lg transition-transform duration-300 ${
            isHovered ? 'scale-110 -translate-y-1' : ''
          }`}
        >
          {tip.icon}
        </div>

        {/* Content */}
        <h3 className="font-display text-xl font-semibold text-romantic-text mb-3">
          {tip.title}
        </h3>
        <p className="text-romantic-text-secondary text-sm leading-relaxed">
          {tip.content}
        </p>

        {/* Decorative sparkle */}
        <div
          className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${tip.color} transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

export default function Tips() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: '.tips-title',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.tips-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);

      // Cards animation
      tips.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `#tip-card-${index}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              `#tip-card-${index}`,
              { opacity: 0, scale: 0.8, rotation: -5 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
              }
            );
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="tips"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="tips-title text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-peach/30 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-peach-dark" />
            <span className="text-sm font-medium text-romantic-text">Study Wisdom</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-4">
            Tips & <span className="text-gradient">Tricks</span>
          </h2>
          <p className="text-lg text-romantic-text-secondary max-w-2xl mx-auto">
            Essential advice and best practices to help you learn Python more effectively and avoid common pitfalls.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
