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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-romantic mb-6 border border-white/60">
            <Sparkles className="w-4 h-4 text-pink-deep hover:text-crimson-love hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer" />
            <span className="text-sm font-medium text-romantic-text">Keep Learning</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-romantic-text mb-4">
            Made with <span className="text-red-400">love</span> for Python learners
          </h2>
          
          <p className="text-romantic-text-secondary max-w-xl mx-auto">
            Remember: Every expert was once a beginner. Keep practicing, stay curious, 
            and you'll master Python in no time!
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
              className="px-4 py-2 bg-white/60 hover:bg-white rounded-full text-sm text-romantic-text hover:text-pink-dark transition-all duration-300 shadow-sm hover:shadow-romantic"
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
              <span>© 2025 Python Exam Prep</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-400 fill-red-400 hover:scale-125 hover:text-red-500 transition-all duration-300 animate-pulse cursor-pointer" /> for YOU
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="group text-romantic-text-secondary hover:text-pink-dark transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Coming soon!');
                }}
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-all duration-300" />
              </a>
              <a
                href="#"
                className="group text-romantic-text-secondary hover:text-pink-dark transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Contact: pythonprep@example.com');
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
