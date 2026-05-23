import { Heart, Code, Sparkles, Github, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-light/50 via-romantic-bg to-romantic-bg" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-pink/10 rounded-full blur-2xl" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-romantic mb-6 border border-pink-DEFAULT/20">
            <Sparkles className="w-4 h-4 text-purple-deep hover:text-pink-DEFAULT hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer" />
            <span className="text-sm font-medium text-romantic-text">Keep Learning</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-6 flex flex-wrap items-center justify-center gap-4">
            Made with 
            <div className="relative group cursor-pointer inline-block">
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse" />
              {/* 3D Heart SVG */}
              <Heart 
                className="w-12 h-12 text-red-500 fill-red-500 relative z-10 
                          drop-shadow-[0_8px_8px_rgba(220,38,38,0.8)] 
                          transition-transform duration-500 group-hover:scale-130 
                          hover:-translate-y-2 animate-bounce flex-shrink-0" 
                strokeWidth={1.5}
              />
              {/* Funny hover message */}
              <div className="absolute -top-10 -right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-bold text-pink-600 shadow-xl whitespace-nowrap transform rotate-6 scale-90 group-hover:scale-100 pointer-events-none z-20 border border-pink-200">
                Queen FATI 👑💕
              </div>
            </div>
            for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 uppercase tracking-widest relative px-2">
              YOUUUU
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse" />
            </span>
          </h2>
          
          <p className="text-romantic-text-secondary max-w-xl mx-auto text-lg leading-relaxed">
            Every expert was once a beginner...<br/>
            <span className="font-medium text-romantic-text">404: Girl like FATI not found 😌✨</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { label: 'Chapters', id: 'chapters' },
            { label: 'Tips', id: 'tips' },
            { label: 'Mistakes', id: 'mistakes' },
            { label: 'Exercises', id: 'exercises' },
            { label: 'Quiz', id: 'quiz' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-2 bg-white/70 hover:bg-gradient-to-r hover:from-pink-DEFAULT hover:to-purple-DEFAULT rounded-full text-sm text-romantic-text hover:text-white transition-all duration-300 shadow-sm hover:shadow-romantic hover:scale-105"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Motivational Quote */}
        <div className="glass-card rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="group w-10 h-10 rounded-full bg-gradient-to-br from-pink-DEFAULT to-purple-DEFAULT hover:from-pink-deep hover:to-purple-deep flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-love-glow">
              <Code className="w-5 h-5 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
            </div>
            <div>
              <p className="text-romantic-text italic mb-2">
                "The only way to learn a new programming language is by writing programs in it."
              </p>
              <p className="text-sm text-romantic-text-secondary">
                — Dennis Ritchie
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-romantic-text-secondary">
              <span>© {new Date().getFullYear()} Python Exam Prep</span>
              <span>•</span>
              <span className="flex items-center gap-2">
                Codé avec passion, mais surtout pour <span className="font-bold text-pink-500 animate-pulse text-base">FATI</span> ✨
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/GosTsimo/Python-Exam-Preparation"
                className="group p-2 rounded-full bg-white/10 hover:bg-pink-DEFAULT text-romantic-text hover:text-white transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Coming soon!');
                }}
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-all duration-300" />
              </a>
              <a
                href="https://www.oundir.tech/"
                className="group p-2 rounded-full bg-white/10 hover:bg-purple-DEFAULT text-romantic-text hover:text-white transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Contact: Oundir@oundir.tech');
                }}
              >
                <Mail className="w-5 h-5 group-hover:-rotate-12 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-xs text-romantic-text-secondary/60">
            Good luck on your exam! You've got this! 🌟
          </p>
        </div>
      </div>
    </footer>
  );
}
