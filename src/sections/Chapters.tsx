import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen, Code, Database, Terminal, FileText, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Lesson {
  title: string;
  content: string;
  code?: string;
  whenToUse?: string;
}

interface Chapter {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  {
    id: 'chapter1',
    icon: <Terminal className="w-6 h-6" />,
    title: 'Chapter 1: Python Fundamentals',
    subtitle: 'Variables, types, operators, and control structures',
    lessons: [
      {
        title: 'Variables and Data Types',
        content: 'Variables are containers for storing data values. In Python, you don\'t need to declare the type - it\'s inferred automatically.',
        code: `# Variable assignment
nom = "Alice"      # String (str)
age = 20         # Integer (int)
poids = 55.5     # Float (float)
est_etudiant = True  # Boolean (bool)

# Display values
print(nom, age, poids, est_etudiant)`,
        whenToUse: 'Use variables to store data that you need to reuse or modify throughout your program.',
      },
      {
        title: 'Operators',
        content: 'Python supports arithmetic, comparison, and logical operators for performing calculations and making decisions.',
        code: `# Arithmetic operators
a, b = 10, 3
print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.33...
print(a // b)  # Integer division: 3
print(a % b)   # Modulo: 1
print(a ** b)  # Power: 1000

# Comparison operators
print(a > b)   # True
print(a == b)  # False`,
        whenToUse: 'Use arithmetic operators for calculations and comparison operators for conditions.',
      },
      {
        title: 'Conditional Statements (if/elif/else)',
        content: 'Conditional statements allow your program to make decisions based on conditions.',
        code: `note = 15

if note >= 16:
    print("Excellent!")
elif note >= 14:
    print("Très bien!")
elif note >= 12:
    print("Bien")
elif note >= 10:
    print("Passable")
else:
    print("Insuffisant")`,
        whenToUse: 'Use when you need to execute different code blocks based on different conditions.',
      },
      {
        title: 'Loops (for and while)',
        content: 'Loops allow you to repeat code. Use for when you know the number of iterations, while when you don\'t.',
        code: `# For loop - iterate over a sequence
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

fruits = ["pomme", "banane", "orange"]
for fruit in fruits:
    print(fruit)

# While loop - iterate while condition is true
compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1`,
        whenToUse: 'Use for loops for iterating over sequences. Use while loops when the number of iterations is unknown.',
      },
    ],
  },
  {
    id: 'chapter2',
    icon: <Database className="w-6 h-6" />,
    title: 'Chapter 2: Data Structures',
    subtitle: 'Lists, tuples, sets, dictionaries, and strings',
    lessons: [
      {
        title: 'Lists (list)',
        content: 'Lists are ordered, mutable collections that can contain elements of different types.',
        code: `# Creating lists
ma_liste = [1, 2, 3, "hello", 4.5]
liste_vide = []

# Accessing elements (index starts at 0)
print(ma_liste[0])   # 1
print(ma_liste[-1])  # 4.5 (last element)

# Modifying elements
ma_liste[0] = 100

# Common methods
ma_liste.append(6)       # Add to end
ma_liste.insert(0, 0)    # Insert at position
ma_liste.remove("hello") # Remove first occurrence
ma_liste.pop()           # Remove and return last element
ma_liste.sort()          # Sort in place

# Slicing
print(ma_liste[1:4])  # Elements from index 1 to 3`,
        whenToUse: 'Use lists when you need an ordered collection that can be modified.',
      },
      {
        title: 'Tuples (tuple)',
        content: 'Tuples are ordered, immutable collections. Once created, they cannot be modified.',
        code: `# Creating tuples
mon_tuple = (1, 2, 3)
tuple_un_seul = (5,)  # Note the comma!
tuple_sans_parenthèses = 1, 2, 3

# Accessing elements (same as lists)
print(mon_tuple[0])   # 1

# Tuples are immutable
# mon_tuple[0] = 100  # Error!

# Common operations
print(len(mon_tuple))           # Length
print(mon_tuple.count(2))       # Count occurrences
print(mon_tuple.index(3))       # Find index

# Unpacking
x, y, z = mon_tuple
print(x, y, z)  # 1 2 3

# Function returning multiple values
def min_max(a, b):
    return min(a, b), max(a, b)

minimum, maximum = min_max(5, 10)`,
        whenToUse: 'Use tuples for fixed data that should not change, like coordinates or function returns.',
      },
      {
        title: 'Sets (set)',
        content: 'Sets are unordered collections of unique elements. They support mathematical set operations.',
        code: `# Creating sets
mon_set = {1, 2, 3, 3, 3}  # Duplicates are removed
print(mon_set)  # {1, 2, 3}

set_vide = set()  # Not {} which creates a dict!

# Adding and removing
mon_set.add(4)
mon_set.remove(2)  # Error if not exists
mon_set.discard(10)  # No error if not exists

# Set operations
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A | B)  # Union: {1, 2, 3, 4, 5, 6}
print(A & B)  # Intersection: {3, 4}
print(A - B)  # Difference: {1, 2}
print(A ^ B)  # Symmetric difference: {1, 2, 5, 6}

# Membership test
print(2 in A)  # True`,
        whenToUse: 'Use sets when you need unique elements or want to perform set operations like union/intersection.',
      },
      {
        title: 'Dictionaries (dict)',
        content: 'Dictionaries store key-value pairs. Keys must be unique and immutable.',
        code: `# Creating dictionaries
mon_dict = {"nom": "Alice", "age": 20, "ville": "Paris"}
dict_vide = {}

# Accessing values
print(mon_dict["nom"])       # Alice
print(mon_dict.get("poids", "Inconnu"))  # Inconnu (default value)

# Modifying and adding
mon_dict["age"] = 21         # Modify existing
mon_dict["poids"] = 55       # Add new

# Common methods
print(mon_dict.keys())       # dict_keys(['nom', 'age', 'ville', 'poids'])
print(mon_dict.values())     # dict_values(['Alice', 21, 'Paris', 55])
print(mon_dict.items())      # dict_items([...])

# Iterating
for cle, valeur in mon_dict.items():
    print(f"{cle}: {valeur}")

# Removing
del mon_dict["poids"]
valeur = mon_dict.pop("age")  # Returns and removes`,
        whenToUse: 'Use dictionaries when you need to associate keys with values for fast lookup.',
      },
      {
        title: 'Strings (str)',
        content: 'Strings are sequences of characters. They are immutable but have many useful methods.',
        code: `# String creation
texte = "Bonjour le monde!"

# Accessing characters
print(texte[0])      # B
print(texte[-1])     # !
print(texte[0:7])    # Bonjour (slicing)

# Common methods
print(texte.upper())           # BONJOUR LE MONDE!
print(texte.lower())           # bonjour le monde!
print(texte.capitalize())      # Bonjour le monde!
print(texte.replace("monde", "Python"))  # Bonjour le Python!
print(texte.split())           # ['Bonjour', 'le', 'monde!']
print("-".join(["a", "b", "c"]))  # a-b-c

# String formatting
nom = "Alice"
age = 20
print(f"Je m'appelle {nom} et j'ai {age} ans.")

# Checking content
print(texte.startswith("Bon"))  # True
print("monde" in texte)         # True`,
        whenToUse: 'Use strings for text manipulation, formatting, and processing.',
      },
    ],
  },
  {
    id: 'chapter3',
    icon: <Code className="w-6 h-6" />,
    title: 'Chapter 3: Functions & Advanced Topics',
    subtitle: 'Functions, file handling, exceptions, and modules',
    lessons: [
      {
        title: 'Functions',
        content: 'Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values.',
        code: `# Function definition
def saluer(nom):
    """Display a greeting."""
    print(f"Bonjour, {nom}!")

# Function with return value
def carre(nombre):
    return nombre ** 2

# Function with default parameters
def puissance(base, exposant=2):
    return base ** exposant

# Function with multiple returns
def stats(a, b):
    return a + b, a - b, a * b

# Using functions
saluer("Alice")
resultat = carre(5)  # 25
print(puissance(3))      # 9 (3²)
print(puissance(2, 3))   # 8 (2³)
somme, diff, prod = stats(10, 3)

# Lambda functions
carre_lambda = lambda x: x ** 2
print(carre_lambda(4))  # 16`,
        whenToUse: 'Use functions to organize code, avoid repetition, and make programs modular.',
      },
      {
        title: 'File Handling',
        content: 'Python makes it easy to read from and write to files.',
        code: `# Writing to a file
with open("fichier.txt", "w") as f:
    f.write("Première ligne\\n")
    f.write("Deuxième ligne\\n")

# Reading from a file
with open("fichier.txt", "r") as f:
    contenu = f.read()           # Read entire file
    
with open("fichier.txt", "r") as f:
    lignes = f.readlines()       # Read as list of lines

with open("fichier.txt", "r") as f:
    for ligne in f:              # Read line by line
        print(ligne.strip())

# Appending to a file
with open("fichier.txt", "a") as f:
    f.write("Ligne ajoutée\\n")

# File modes: 'r' (read), 'w' (write), 'a' (append), 'x' (create)`,
        whenToUse: 'Use file handling to persist data, read configuration, or process large datasets.',
      },
      {
        title: 'Exception Handling',
        content: 'Exceptions handle errors gracefully without crashing your program.',
        code: `# Basic try-except
try:
    nombre = int(input("Entrez un nombre: "))
    resultat = 10 / nombre
    print(f"Résultat: {resultat}")
except ValueError:
    print("Ce n'est pas un nombre valide!")
except ZeroDivisionError:
    print("Impossible de diviser par zéro!")
except Exception as e:
    print(f"Erreur inattendue: {e}")

# try-except-else-finally
try:
    fichier = open("data.txt", "r")
    contenu = fichier.read()
except FileNotFoundError:
    print("Fichier non trouvé!")
else:
    print("Lecture réussie!")
    print(contenu)
finally:
    print("Ce bloc s'exécute toujours")
    # fichier.close()  # Cleanup code

# Raising exceptions
def verifier_age(age):
    if age < 0:
        raise ValueError("L'âge ne peut pas être négatif")
    return age`,
        whenToUse: 'Use exception handling to handle errors gracefully and provide meaningful feedback.',
      },
      {
        title: 'Modules',
        content: 'Modules allow you to organize code into separate files and reuse functionality.',
        code: `# Importing modules
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...

# Import specific items
from random import randint, choice
print(randint(1, 10))
print(choice(["pomme", "banane", "orange"]))

# Import with alias
import datetime as dt
maintenant = dt.datetime.now()

# Creating your own module
# In fichier 'mes_fonctions.py':
# def saluer(nom):
#     return f"Bonjour {nom}!"

# In main file:
# import mes_fonctions
# print(mes_fonctions.saluer("Alice"))

# Common built-in modules
import os          # Operating system interface
import sys         # System-specific parameters
import json        # JSON handling
import random      # Random number generation
import datetime    # Date and time`,
        whenToUse: 'Use modules to organize large projects and reuse code across different programs.',
      },
      {
        title: 'List Comprehensions',
        content: 'List comprehensions provide a concise way to create lists.',
        code: `# Basic list comprehension
carres = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
pairs = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else
resultats = ["pair" if x % 2 == 0 else "impair" for x in range(5)]
# ['pair', 'impair', 'pair', 'impair', 'pair']

# Nested list comprehension
matrice = [[i * j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Dictionary comprehension
carres_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
carres_set = {x**2 for x in range(20)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361}`,
        whenToUse: 'Use list comprehensions for concise, readable list creation instead of loops.',
      },
    ],
  },
];

export default function Chapters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      const titleTrigger = ScrollTrigger.create({
        trigger: '.chapters-title',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.chapters-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);

      // Animate chapter cards
      chapters.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `#chapter-card-${index}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              `#chapter-card-${index}`,
              { opacity: 0, y: 50, rotateX: 15 },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.15,
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
      id="chapters"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="chapters-title text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-light rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-purple-dark" />
            <span className="text-sm font-medium text-romantic-text">Course Content</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-romantic-text mb-4">
            Course <span className="text-gradient">Chapters</span>
          </h2>
          <p className="text-lg text-romantic-text-secondary max-w-2xl mx-auto">
            Everything you need to know for your Python exam, organized into clear, interactive lessons.
          </p>
        </div>

        {/* Chapters Accordion */}
        <div className="space-y-6">
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              id={`chapter-card-${chapterIndex}`}
              className="opacity-0"
              style={{ perspective: '1000px' }}
            >
              <div className="glass-card-strong rounded-3xl overflow-hidden hover-lift">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={chapter.id} className="border-none">
                    <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-DEFAULT to-purple-DEFAULT flex items-center justify-center text-white shadow-romantic group-hover:scale-110 transition-transform duration-300">
                          {chapter.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-romantic-text group-hover:text-pink-dark transition-colors">
                            {chapter.title}
                          </h3>
                          <p className="text-sm text-romantic-text-secondary mt-1">
                            {chapter.subtitle}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 mt-2">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="bg-romantic-bg/50 rounded-2xl p-5 border border-pink/20"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Layers className="w-4 h-4 text-pink-dark" />
                              <h4 className="font-semibold text-romantic-text">
                                {lesson.title}
                              </h4>
                            </div>
                            <p className="text-romantic-text-secondary text-sm mb-4 leading-relaxed">
                              {lesson.content}
                            </p>
                            {lesson.code && (
                              <div className="relative">
                                <div className="absolute top-2 right-2 flex gap-1">
                                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <pre className="code-block text-xs sm:text-sm">
                                  <code>{lesson.code}</code>
                                </pre>
                              </div>
                            )}
                            {lesson.whenToUse && (
                              <div className="mt-4 flex items-start gap-2 text-sm">
                                <FileText className="w-4 h-4 text-purple-dark mt-0.5 flex-shrink-0" />
                                <span className="text-romantic-text-secondary">
                                  <strong className="text-romantic-text">When to use:</strong>{' '}
                                  {lesson.whenToUse}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
