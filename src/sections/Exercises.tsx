import { useEffect, useRef, useState } from 'react';
import { Code2, Lightbulb, Eye, EyeOff, CheckCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Tabs component imported for future use
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Exercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
  solution: string;
  explanation: string;
}

const exercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Sum of List',
    difficulty: 'Easy',
    description: 'Write a function `somme_liste` that takes a list of numbers and returns the sum of its elements.',
    hint: 'Use a variable to accumulate the sum, iterate through the list with a for loop, and add each element.',
    solution: `def somme_liste(nombres):
    total = 0
    for nombre in nombres:
        total += nombre
    return total

# Or using built-in sum()
def somme_liste_v2(nombres):
    return sum(nombres)

# Test
print(somme_liste([1, 2, 3, 4, 5]))  # 15`,
    explanation: 'We initialize a total to 0, then iterate through each number in the list, adding it to the total. Python also has a built-in sum() function that does this.',
  },
  {
    id: 'ex2',
    title: 'Find Maximum',
    difficulty: 'Easy',
    description: 'Write a function `max_liste` that finds the maximum element in a list without using the built-in max() function.',
    hint: 'Start by assuming the first element is the maximum, then compare with each other element.',
    solution: `def max_liste(nombres):
    if not nombres:
        return None
    
    maximum = nombres[0]
    for nombre in nombres[1:]:
        if nombre > maximum:
            maximum = nombre
    return maximum

# Test
print(max_liste([3, 7, 2, 9, 1]))  # 9`,
    explanation: 'We start with the first element as our current maximum, then iterate through the rest of the list, updating the maximum whenever we find a larger value.',
  },
  {
    id: 'ex3',
    title: 'Filter Even Numbers',
    difficulty: 'Easy',
    description: 'Write a function `filtrer_pairs` that returns a new list containing only the even numbers from the input list.',
    hint: 'Use the modulo operator % to check if a number is even (number % 2 == 0).',
    solution: `def filtrer_pairs(nombres):
    pairs = []
    for nombre in nombres:
        if nombre % 2 == 0:
            pairs.append(nombre)
    return pairs

# Or using list comprehension
def filtrer_pairs_v2(nombres):
    return [n for n in nombres if n % 2 == 0]

# Test
print(filtrer_pairs([1, 2, 3, 4, 5, 6]))  # [2, 4, 6]`,
    explanation: 'We check each number with the modulo operator. If number % 2 equals 0, the number is even and we add it to our result list.',
  },
  {
    id: 'ex4',
    title: 'Remove Duplicates (Keep Order)',
    difficulty: 'Medium',
    description: 'Write a function that removes duplicates from a list while preserving the original order of elements.',
    hint: 'Use a new list to store unique elements. Check if an element is already in the new list before adding it.',
    solution: `def supprimer_doublons(liste):
    resultat = []
    for element in liste:
        if element not in resultat:
            resultat.append(element)
    return resultat

# Or using dict (Python 3.7+)
def supprimer_doublons_v2(liste):
    return list(dict.fromkeys(liste))

# Test
print(supprimer_doublons([1, 2, 2, 3, 1, 4]))  # [1, 2, 3, 4]`,
    explanation: 'We create a new list and only add elements that are not already present. This preserves the first occurrence order.',
  },
  {
    id: 'ex5',
    title: 'Calculate Median',
    difficulty: 'Medium',
    description: 'Write a function that calculates the median of a list of numbers. The median is the middle value (or average of two middle values).',
    hint: 'First sort the list. If the length is odd, return the middle element. If even, return the average of the two middle elements.',
    solution: `def calculer_mediane(nombres):
    if not nombres:
        return None
    
    tries = sorted(nombres)
    n = len(tries)
    milieu = n // 2
    
    if n % 2 == 1:  # Odd length
        return tries[milieu]
    else:  # Even length
        return (tries[milieu - 1] + tries[milieu]) / 2

# Test
print(calculer_mediane([3, 1, 2]))      # 2
print(calculer_mediane([1, 2, 3, 4]))   # 2.5`,
    explanation: 'After sorting, for odd-length lists we take the middle element. For even-length lists, we average the two middle elements.',
  },
  {
    id: 'ex6',
    title: 'Matrix Transpose',
    difficulty: 'Hard',
    description: 'Write a function that calculates the transpose of a matrix (rows become columns and vice versa).',
    hint: 'The element at position [i][j] in the original matrix goes to position [j][i] in the transposed matrix.',
    solution: `def transposer(matrice):
    if not matrice:
        return []
    
    lignes = len(matrice)
    colonnes = len(matrice[0])
    
    # Create result with swapped dimensions
    resultat = []
    for j in range(colonnes):
        nouvelle_ligne = []
        for i in range(lignes):
            nouvelle_ligne.append(matrice[i][j])
        resultat.append(nouvelle_ligne)
    
    return resultat

# Or using list comprehension
def transposer_v2(matrice):
    return [[ligne[i] for ligne in matrice] 
            for i in range(len(matrice[0]))]

# Test
m = [[1, 2, 3], [4, 5, 6]]
print(transposer(m))  # [[1, 4], [2, 5], [3, 6]]`,
    explanation: 'We iterate through columns first, then rows, building new rows from the columns of the original matrix.',
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      id={`exercise-card-${index}`}
      className="opacity-0 glass-card-strong rounded-3xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-pink-light to-purple-light border-b border-pink/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-DEFAULT to-purple-DEFAULT flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-romantic-text">
                {exercise.title}
              </h3>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                  exercise.difficulty
                )}`}
              >
                {exercise.difficulty}
              </span>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Done</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Description */}
        <p className="text-romantic-text-secondary leading-relaxed">
          {exercise.description}
        </p>

        {/* Hint Section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-sm font-medium text-purple-dark hover:text-purple-700 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && (
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 animate-fade-in-up">
              <p className="text-sm text-yellow-800">{exercise.hint}</p>
            </div>
          )}
        </div>

        {/* Solution Section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 text-sm font-medium text-pink-dark hover:text-pink-700 transition-colors"
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className="space-y-3 animate-fade-in-up">
              <div className="relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <pre className="code-block text-xs sm:text-sm">
                  <code>{exercise.solution}</code>
                </pre>
              </div>
              <div className="p-4 bg-purple-light/50 rounded-xl">
                <p className="text-sm text-romantic-text-secondary">
                  <strong className="text-romantic-text">Explanation:</strong>{' '}
                  {exercise.explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mark as Complete */}
        {!isCompleted && showSolution && (
          <Button
            onClick={() => setIsCompleted(true)}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Complete
          </Button>
        )}
        {isCompleted && (
          <Button
            variant="outline"
            onClick={() => {
              setIsCompleted(false);
              setShowSolution(false);
              setShowHint(false);
            }}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Exercises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: '.exercises-title',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.exercises-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);

      // Cards animation
      exercises.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `#exercise-card-${index}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              `#exercise-card-${index}`,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                delay: index * 0.08,
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
      id="exercises"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="exercises-title text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <Code2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Practice Time</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-4">
            Interactive <span className="text-gradient">Exercises</span>
          </h2>
          <p className="text-lg text-romantic-text-secondary max-w-2xl mx-auto">
            Practice makes perfect! Work through these exercises at your own pace. Use hints when stuck, and check solutions to learn.
          </p>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
