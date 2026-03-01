import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections
import Hero from './sections/Hero';
import Chapters from './sections/Chapters';
import Tips from './sections/Tips';
import Mistakes from './sections/Mistakes';
import Exercises from './sections/Exercises';
import Quiz from './sections/Quiz';
import Footer from './sections/Footer';

// Navigation
import { BookOpen, Lightbulb, AlertTriangle, Code2, HelpCircle, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'chapters', label: 'Chapters', icon: BookOpen },
  { id: 'tips', label: 'Tips', icon: Lightbulb },
  { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle },
  { id: 'exercises', label: 'Exercises', icon: Code2 },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
];

function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine active section
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="glass-card-strong rounded-full px-2 py-2 flex items-center gap-1 shadow-romantic-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-DEFAULT to-purple-DEFAULT text-white shadow-romantic'
                    : 'text-romantic-text-secondary hover:text-romantic-text hover:bg-pink-light/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-pink-DEFAULT to-purple-DEFAULT text-white shadow-romantic-xl flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
}

// Import useState for Navigation
import { useState } from 'react';

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-romantic-bg overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <Chapters />
        <Tips />
        <Mistakes />
        <Exercises />
        <Quiz />
        <Footer />
      </main>
    </div>
  );
}

export default App;
