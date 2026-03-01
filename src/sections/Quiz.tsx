import { useEffect, useRef, useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the output of: print(5 // 2)?',
    options: ['2.5', '2', '3', '2.0'],
    correctAnswer: 1,
    explanation: 'The // operator performs integer (floor) division, which returns 2 (not 2.5).',
  },
  {
    id: 2,
    question: 'Which of the following creates a tuple with a single element?',
    options: ['(5)', '(5,)', '[5]', '{5}'],
    correctAnswer: 1,
    explanation: 'A single-element tuple requires a trailing comma: (5,). Without the comma, (5) is just the number 5 in parentheses.',
  },
  {
    id: 3,
    question: 'What does the following code return? len({1, 2, 2, 3, 3, 3})',
    options: ['6', '3', '1', 'Error'],
    correctAnswer: 1,
    explanation: 'Sets automatically remove duplicates, so {1, 2, 2, 3, 3, 3} becomes {1, 2, 3} with length 3.',
  },
  {
    id: 4,
    question: 'What is the correct way to check if "apple" is in the list fruits = ["banana", "apple", "cherry"]?',
    options: ['fruits.has("apple")', '"apple" in fruits', 'fruits.contains("apple")', 'fruits.find("apple")'],
    correctAnswer: 1,
    explanation: 'The in operator is used to check membership in Python lists: "apple" in fruits returns True.',
  },
  {
    id: 5,
    question: 'What is the output of: print(list(range(2, 10, 2)))?',
    options: ['[2, 4, 6, 8, 10]', '[2, 4, 6, 8]', '[0, 2, 4, 6, 8]', '[2, 4, 6]'],
    correctAnswer: 1,
    explanation: 'range(2, 10, 2) starts at 2, ends before 10, with step 2: [2, 4, 6, 8].',
  },
  {
    id: 6,
    question: 'What happens if you try to modify a tuple after creation?',
    options: ['It works fine', 'TypeError is raised', 'The tuple is converted to a list', 'Nothing happens'],
    correctAnswer: 1,
    explanation: 'Tuples are immutable. Attempting to modify one raises a TypeError.',
  },
  {
    id: 7,
    question: 'What does d.get("key", "default") do if "key" is not in dictionary d?',
    options: ['Raises KeyError', 'Returns None', 'Returns "default"', 'Adds "key" to d'],
    correctAnswer: 2,
    explanation: 'The get() method returns the default value (second argument) if the key is not found.',
  },
  {
    id: 8,
    question: 'What is the result of: "hello" + str(5)?',
    options: ['"hello5"', '"hello 5"', 'TypeError', '"5hello"'],
    correctAnswer: 0,
    explanation: 'str(5) converts 5 to "5", then string concatenation gives "hello5".',
  },
  {
    id: 9,
    question: 'Which method removes and returns the last item from a list?',
    options: ['remove()', 'delete()', 'pop()', 'clear()'],
    correctAnswer: 2,
    explanation: 'pop() removes and returns the last item (or item at specified index).',
  },
  {
    id: 10,
    question: 'What is the output of: print(3 * [1, 2])?',
    options: ['[3, 6]', '[1, 2, 1, 2, 1, 2]', '[[1, 2], [1, 2], [1, 2]]', 'Error'],
    correctAnswer: 1,
    explanation: 'The * operator repeats the list: [1, 2] repeated 3 times gives [1, 2, 1, 2, 1, 2].',
  },
  {
    id: 11,
    question: 'What does the finally block in try-except do?',
    options: ['Executes only if no exception', 'Executes only if exception occurs', 'Always executes', 'Never executes'],
    correctAnswer: 2,
    explanation: 'The finally block always executes, whether an exception occurred or not.',
  },
  {
    id: 12,
    question: 'What is the correct file mode for appending to an existing file?',
    options: ['"r"', '"w"', '"a"', '"x"'],
    correctAnswer: 2,
    explanation: '"a" mode opens the file for appending (writing at the end without truncating).',
  },
  {
    id: 13,
    question: 'What does list comprehension [x**2 for x in range(5)] produce?',
    options: ['[0, 1, 4, 9, 16]', '[1, 4, 9, 16, 25]', '[0, 1, 2, 3, 4]', '[2, 4, 8, 16, 32]'],
    correctAnswer: 0,
    explanation: 'It squares each number from 0 to 4: [0², 1², 2², 3², 4²] = [0, 1, 4, 9, 16].',
  },
  {
    id: 14,
    question: 'What is A & B for sets A = {1, 2, 3} and B = {2, 3, 4}?',
    options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{}'],
    correctAnswer: 1,
    explanation: '& is the intersection operator, returning elements common to both sets: {2, 3}.',
  },
  {
    id: 15,
    question: 'What is the output of: print("Python"[1:4])?',
    options: ['"Pyt"', '"yth"', '"ytho"', '"Pyth"'],
    correctAnswer: 1,
    explanation: 'Slicing [1:4] includes indices 1, 2, 3: "y", "t", "h" = "yth".',
  },
];

const encouragements = [
  'Great start! Keep going!',
  'You\'re doing amazing!',
  'Fantastic progress!',
  'Excellent work!',
  'You\'re a Python star!',
  'Outstanding! Keep it up!',
];

export default function Quiz() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleTrigger = ScrollTrigger.create({
        trigger: '.quiz-title',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.quiz-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);

      const cardTrigger = ScrollTrigger.create({
        trigger: '.quiz-card',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.quiz-card',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
          );
        },
        once: true,
      });
      triggersRef.current.push(cardTrigger);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setAnswers([...answers, answerIndex]);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsFlipped(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsFlipped(false);
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isComplete = currentQuestion === questions.length - 1 && showResult;

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🌟 Outstanding! You're ready for the exam!";
    if (percentage >= 70) return "🎉 Great job! Keep practicing!";
    if (percentage >= 50) return "👍 Good effort! Review the chapters and try again!";
    return "📚 Keep studying! You'll get there!";
  };

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative">
        {/* Section Header */}
        <div className="quiz-title text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-light rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-purple-deep hover:text-purple-dark hover:scale-110 transition-all duration-300" />
            <span className="text-sm font-medium text-romantic-text">Test Your Knowledge</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-4">
            Interactive <span className="text-gradient">Quiz</span>
          </h2>
          <p className="text-lg text-romantic-text-secondary max-w-2xl mx-auto">
            Test your Python knowledge with {questions.length} multiple-choice questions. Instant feedback and explanations included!
          </p>
        </div>

        {/* Quiz Card */}
        <div className="quiz-card opacity-0" style={{ perspective: '2000px' }}>
          <div
            className={`glass-card-strong rounded-3xl overflow-hidden transition-all duration-500 ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
          >
            {!isComplete ? (
              <>
                {/* Progress Bar */}
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-romantic-text-secondary">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-pink-dark">
                      Score: {score}/{questions.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-pink/20" />
                </div>

                {/* Question */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-romantic-text mb-6">
                    {questions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectAnswer = index === questions[currentQuestion].correctAnswer;
                      let buttonClass =
                        'w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ';

                      if (showResult) {
                        if (isCorrectAnswer) {
                          buttonClass +=
                            'bg-green-100 border-green-400 text-green-800';
                        } else if (isSelected && !isCorrectAnswer) {
                          buttonClass += 'bg-red-100 border-red-400 text-red-800';
                        } else {
                          buttonClass +=
                            'bg-gray-50 border-gray-200 text-gray-400';
                        }
                      } else {
                        buttonClass +=
                          'bg-white border-pink/20 hover:border-pink-DEFAULT hover:bg-pink-light/50 text-romantic-text';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={showResult}
                          className={buttonClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult && isCorrectAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-600 hover:scale-110 transition-all duration-300" />
                            )}
                            {showResult && isSelected && !isCorrectAnswer && (
                              <XCircle className="w-5 h-5 text-red-600 hover:scale-110 transition-all duration-300" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {showResult && (
                    <div
                      className={`mt-6 p-4 rounded-xl animate-fade-in-up ${
                        isCorrect ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                            <span className="font-semibold text-green-700">
                              Correct!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600 animate-pulse" />
                            <span className="font-semibold text-red-700">
                              Incorrect
                            </span>
                          </>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {questions[currentQuestion].explanation}
                      </p>
                      {isCorrect && (
                        <p className="text-sm text-green-600 mt-2 font-medium">
                          {encouragements[Math.min(score - 1, encouragements.length - 1)]}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Next Button */}
                  {showResult && (
                    <Button
                      onClick={nextQuestion}
                      className="w-full mt-6 bg-gradient-to-r from-pink-DEFAULT to-purple-DEFAULT hover:from-pink-dark hover:to-purple-dark text-white"
                    >
                      {currentQuestion < questions.length - 1
                        ? 'Next Question'
                        : 'See Results'}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Results Screen */
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white animate-bounce" />
                </div>
                <h3 className="font-display text-3xl font-bold text-romantic-text mb-2">
                  Quiz Complete!
                </h3>
                <p className="text-lg text-romantic-text-secondary mb-6">
                  {getScoreMessage()}
                </p>

                <div className="bg-gradient-to-r from-pink-light to-purple-light rounded-2xl p-6 mb-6">
                  <div className="text-5xl font-bold text-gradient mb-2">
                    {score}/{questions.length}
                  </div>
                  <div className="text-romantic-text-secondary">
                    {Math.round((score / questions.length) * 100)}% Correct
                  </div>
                </div>

                {/* Question Review */}
                <div className="text-left mb-6">
                  <h4 className="font-semibold text-romantic-text mb-3">
                    Question Review:
                  </h4>
                  <div className="space-y-2">
                    {questions.map((q, i) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        {answers[i] === q.correctAnswer ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 animate-pulse" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 animate-pulse" />
                        )}
                        <span className="text-romantic-text-secondary">
                          Question {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
