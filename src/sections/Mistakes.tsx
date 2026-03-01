import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Mistake {
  title: string;
  description: string;
  wrong: string;
  correct: string;
  explanation: string;
}

const mistakes: Mistake[] = [
  {
    title: 'Modifying a Tuple',
    description: 'Tuples are immutable - you cannot change their elements!',
    wrong: `mon_tuple = (1, 2, 3)
mon_tuple[0] = 10  # ERROR!`,
    correct: `mon_tuple = (1, 2, 3)
# Create a new tuple instead
nouveau_tuple = (10,) + mon_tuple[1:]
# Or convert to list
liste = list(mon_tuple)
liste[0] = 10
mon_tuple = tuple(liste)`,
    explanation: 'Tuples are designed to be immutable. If you need to modify data, use a list instead, or create a new tuple.',
  },
  {
    title: 'Using = instead of ==',
    description: 'A single = is for assignment, double == is for comparison!',
    wrong: `x = 5
if x = 10:  # SyntaxError!
    print("x is 10")`,
    correct: `x = 5
if x == 10:  # Correct comparison
    print("x is 10")
else:
    print("x is not 10")`,
    explanation: '= assigns a value to a variable. == checks if two values are equal. This is a very common exam trap!',
  },
  {
    title: 'Forgetting the Colon',
    description: 'Python requires colons at the end of control structure lines.',
    wrong: `if x > 5  # Missing colon!
    print("x is greater than 5")`,
    correct: `if x > 5:  # Don't forget the colon!
    print("x is greater than 5")`,
    explanation: 'Always remember the colon (:) after if, elif, else, for, while, def, and class statements.',
  },
  {
    title: 'Modifying List While Iterating',
    description: 'Never modify a list while iterating over it!',
    wrong: `nombres = [1, 2, 3, 4, 5]
for n in nombres:
    if n % 2 == 0:
        nombres.remove(n)  # DANGER!`,
    correct: `nombres = [1, 2, 3, 4, 5]
# Create a new list instead
pairs = [n for n in nombres if n % 2 == 0]
# Or use filter
impairs = list(filter(lambda x: x % 2 != 0, nombres))`,
    explanation: 'Modifying a list while iterating causes skipped elements and unexpected behavior. Create a new list instead.',
  },
  {
    title: 'Integer Division vs Float Division',
    description: 'In Python 3, / always returns a float, // returns an integer.',
    wrong: `# Expecting integer result
resultat = 5 / 2  # Returns 2.5, not 2!`,
    correct: `resultat = 5 // 2   # Returns 2 (integer division)
resultat = 5 / 2    # Returns 2.5 (float division)
resultat = int(5/2) # Returns 2 (convert to int)`,
    explanation: 'Use // for integer division (floor division) when you need a whole number result.',
  },
  {
    title: 'Mutable Default Arguments',
    description: 'Default arguments are evaluated only once when the function is defined!',
    wrong: `def ajouter_element(element, liste=[]):
    liste.append(element)
    return liste

print(ajouter_element(1))  # [1]
print(ajouter_element(2))  # [1, 2] - Surprise!`,
    correct: `def ajouter_element(element, liste=None):
    if liste is None:
        liste = []
    liste.append(element)
    return liste

print(ajouter_element(1))  # [1]
print(ajouter_element(2))  # [2] - Correct!`,
    explanation: 'Never use mutable default arguments like lists or dictionaries. Use None and initialize inside the function.',
  },
];

function MistakeCard({ mistake, index }: { mistake: Mistake; index: number }) {
  const [showCorrect, setShowCorrect] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`mistake-card-${index}`}
      className="opacity-0 glass-card-strong rounded-3xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-red-100 to-orange-100 border-b border-red-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-400 flex items-center justify-center text-white">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-romantic-text">
              {mistake.title}
            </h3>
            <p className="text-sm text-red-600">{mistake.description}</p>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowCorrect(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !showCorrect
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <XCircle className="w-4 h-4" />
            Wrong
          </button>
          <button
            onClick={() => setShowCorrect(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Correct
          </button>
        </div>

        {/* Code Block */}
        <div className="relative">
          <div
            className={`rounded-xl overflow-hidden transition-all duration-500 ${
              showCorrect ? 'code-correct' : 'code-wrong'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a]">
              <span className="text-xs text-gray-400">
                {showCorrect ? 'correct.py' : 'wrong.py'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(showCorrect ? mistake.correct : mistake.wrong)}
                className="h-8 text-gray-400 hover:text-white hover:bg-white/10"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <pre className="code-block text-xs sm:text-sm !rounded-t-none">
              <code>{showCorrect ? mistake.correct : mistake.wrong}</code>
            </pre>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-4 p-4 bg-purple-light/50 rounded-xl">
          <div className="flex items-start gap-2">
            <Eye className="w-4 h-4 text-purple-dark mt-0.5 flex-shrink-0" />
            <p className="text-sm text-romantic-text-secondary">{mistake.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Mistakes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: '.mistakes-title',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.mistakes-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);

      // Cards animation
      mistakes.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `#mistake-card-${index}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              `#mistake-card-${index}`,
              { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
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
      id="mistakes"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mistakes-title text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">Exam Warnings</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-4">
            Common <span className="text-gradient">Mistakes</span> & Traps
          </h2>
          <p className="text-lg text-romantic-text-secondary max-w-2xl mx-auto">
            Learn from others' mistakes! These are the most common errors students make in Python exams.
          </p>
        </div>

        {/* Mistakes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mistakes.map((mistake, index) => (
            <MistakeCard key={index} mistake={mistake} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
