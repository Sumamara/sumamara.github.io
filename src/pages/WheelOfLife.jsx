import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, RefreshCcw, Zap, Moon, Heart, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// --- Configuration Data ---
const categories = [
  {
    id: 'energy',
    title: 'Energy Levels',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    gradient: 'from-yellow-400 to-orange-500',
    icon: Zap,
    productLink: '/products/energy',
    productName: 'How to Have More Energy',
    questions: [
      { id: 'e1', text: 'I wake up feeling refreshed and ready for the day.' },
      { id: 'e2', text: 'I maintain steady energy levels without an afternoon crash.' },
      { id: 'e3', text: 'I can get through the day without relying heavily on caffeine.' },
      { id: 'e4', text: 'I feel physically capable of doing the activities I enjoy.' },
      { id: 'e5', text: 'My mind feels sharp and clear throughout the day.' },
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Quality',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    gradient: 'from-indigo-400 to-purple-500',
    icon: Moon,
    productLink: '/products/sleep',
    productName: 'How to Sleep Better',
    questions: [
      { id: 's1', text: 'I fall asleep within 20 minutes of going to bed.' },
      { id: 's2', text: 'I sleep through the night without frequent waking.' },
      { id: 's3', text: 'I have a consistent sleep schedule (bedtime and wake time).' },
      { id: 's4', text: 'I wake up naturally or easily with an alarm.' },
      { id: 's5', text: 'My bedroom environment is optimized for rest (dark, cool, quiet).' },
    ]
  },
  {
    id: 'stress',
    title: 'Stress Management',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    gradient: 'from-pink-400 to-rose-500',
    icon: Heart,
    productLink: '/products/stress',
    productName: 'How to Stop Being Stressed',
    questions: [
      { id: 'st1', text: 'I feel calm and in control when facing unexpected challenges.' },
      { id: 'st2', text: 'I have effective ways to decompress after a long day.' },
      { id: 'st3', text: 'I rarely feel overwhelmed by my to-do list.' },
      { id: 'st4', text: 'I can quiet my mind when I want to relax.' },
      { id: 'st5', text: 'I handle high-pressure situations without panic.' },
    ]
  },
  {
    id: 'procrastination',
    title: 'Procrastination',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    gradient: 'from-green-400 to-teal-500',
    icon: Target,
    productLink: '/products/procrastination',
    productName: 'How to Stop Procrastinating',
    questions: [
      { id: 'p1', text: 'I start important tasks well before their deadlines.' },
      { id: 'p2', text: 'I break big projects into manageable steps easily.' },
      { id: 'p3', text: 'I stay focused on one task until it is complete.' },
      { id: 'p4', text: 'I rarely get distracted by social media while working.' },
      { id: 'p5', text: 'I feel satisfied with my daily productivity levels.' },
    ]
  }
];

// --- Sub-components ---

const WheelChart = ({ scores }) => {
  // SVG Configuration
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const axisLength = 120;
  
  // Calculate points based on scores (0-10)
  // Axes: 0=Energy(Top), 1=Sleep(Right), 2=Stress(Bottom), 3=Procrastination(Left)
  const getPoint = (value, angleIndex) => {
    const angle = (angleIndex * 90 - 90) * (Math.PI / 180); // Start at top (-90deg)
    const r = (value / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const points = [
    getPoint(scores.energy || 0, 0),
    getPoint(scores.sleep || 0, 1),
    getPoint(scores.stress || 0, 2),
    getPoint(scores.procrastination || 0, 3),
  ];

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  // Background Webs (Levels 2, 4, 6, 8, 10)
  const webs = [2, 4, 6, 8, 10].map(level => {
    const webPoints = [0, 1, 2, 3].map(i => getPoint(level, i)).map(p => `${p.x},${p.y}`).join(' ');
    return <polygon key={level} points={webPoints} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
  });

  return (
    <div className="relative flex justify-center items-center py-8">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Circles/Webs */}
        {webs}
        
        {/* Axes */}
        {[0, 1, 2, 3].map(i => {
           const end = getPoint(12, i); // Extend slightly beyond max
           return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="2" />;
        })}

        {/* The Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          points={polygonPath}
          fill="url(#gradient)"
          stroke="#f97316"
          strokeWidth="3"
        />
        
        {/* Gradients definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            animate={{ r: 6 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            cx={p.x}
            cy={p.y}
            fill="#fff"
            stroke="#f97316"
            strokeWidth="3"
          />
        ))}

        {/* Labels */}
        <text x={center} y={center - axisLength - 10} textAnchor="middle" className="text-xs font-bold fill-gray-500 uppercase">Energy</text>
        <text x={center + axisLength + 10} y={center} textAnchor="start" dominantBaseline="middle" className="text-xs font-bold fill-gray-500 uppercase">Sleep</text>
        <text x={center} y={center + axisLength + 20} textAnchor="middle" className="text-xs font-bold fill-gray-500 uppercase">Stress</text>
        <text x={center - axisLength - 10} y={center} textAnchor="end" dominantBaseline="middle" className="text-xs font-bold fill-gray-500 uppercase">Procrastination</text>
      </svg>
    </div>
  );
};

// --- Main Page Component ---

const WheelOfLife = () => {
  const [step, setStep] = useState('intro'); // intro, assessment, results
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentRating, setCurrentRating] = useState(5);

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  // Calculate scores on the fly
  const scores = useMemo(() => {
    const result = {};
    categories.forEach(cat => {
      const catQuestions = cat.questions;
      let sum = 0;
      let count = 0;
      catQuestions.forEach(q => {
        if (answers[q.id]) {
          sum += answers[q.id];
          count++;
        }
      });
      // Score out of 10
      result[cat.id] = count > 0 ? (sum / count) : 0;
    });
    return result;
  }, [answers]);

  const handleStart = () => {
    setStep('assessment');
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setCurrentRating(5);
  };

  const handleNext = () => {
    // Save current answer
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: currentRating }));

    // Check if more questions in this category
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Reset slider visual for next question (optional, keeps flow smoother if we keep previous value or reset to 5)
      // setCurrentRating(5); 
    } 
    // Check if more categories
    else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setCurrentRating(5);
    } 
    // Finished
    else {
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Ideally load previous answer if exists
      const prevQId = currentCategory.questions[currentQuestionIndex - 1].id;
      if (answers[prevQId]) setCurrentRating(answers[prevQId]);
    } else if (currentCategoryIndex > 0) {
      const prevCatIndex = currentCategoryIndex - 1;
      const prevCat = categories[prevCatIndex];
      setCurrentCategoryIndex(prevCatIndex);
      setCurrentQuestionIndex(prevCat.questions.length - 1);
      
      const prevQId = prevCat.questions[prevCat.questions.length - 1].id;
      if (answers[prevQId]) setCurrentRating(answers[prevQId]);
    } else {
      setStep('intro');
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStep('intro');
  };

  // Recommendations Logic
  const recommendations = useMemo(() => {
    // Sort categories by lowest score first
    return [...categories]
      .map(cat => ({ ...cat, score: scores[cat.id] || 0 }))
      .sort((a, b) => a.score - b.score);
  }, [scores]);

  return (
    <>
      <Helmet>
        <title>Wheel of Life Assessment - Transform Life</title>
        <meta name="description" content="Assess your life balance across Energy, Sleep, Stress, and Productivity. Get your personalized score and recommendations." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            {/* INTRO VIEW */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <RefreshCcw className="w-10 h-10 text-white animate-spin-slow" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Wheel of Life Assessment
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Discover which areas of your life are thriving and which need attention. 
                  This interactive tool measures your Energy, Sleep, Stress, and Productivity levels 
                  to provide personalized transformation recommendations.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className={`p-3 rounded-full ${cat.bgColor}`}>
                        <cat.icon className={`w-6 h-6 ${cat.color}`} />
                      </div>
                      <span className="font-semibold text-gray-700 text-sm">{cat.title}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleStart} 
                  size="lg"
                  className="bg-gray-900 hover:bg-orange-600 text-white text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Assessment
                </Button>
              </motion.div>
            )}

            {/* ASSESSMENT VIEW */}
            {step === 'assessment' && (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Header / Progress */}
                <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${currentCategory.bgColor}`}>
                       <currentCategory.icon className={`w-5 h-5 ${currentCategory.color}`} />
                     </div>
                     <span className="font-bold text-gray-900">{currentCategory.title}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestionIndex + 1} of {currentCategory.questions.length}
                  </span>
                </div>
                
                {/* Category Progress Bar */}
                <div className="h-1 w-full bg-gray-100">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${currentCategory.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / currentCategory.questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question Area */}
                <div className="p-8 md:p-16 text-center min-h-[400px] flex flex-col justify-center">
                   <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                   >
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
                       {currentQuestion.text}
                     </h2>

                     <div className="max-w-xl mx-auto mb-16">
                       <div className="flex justify-between text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                         <span>Strongly Disagree</span>
                         <span>Strongly Agree</span>
                       </div>
                       <div className="relative pt-6 pb-2">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 font-bold text-3xl text-orange-500">
                           {currentRating}
                         </div>
                         <Slider
                           value={[currentRating]}
                           min={1}
                           max={10}
                           step={1}
                           onValueChange={(val) => setCurrentRating(val[0])}
                           className="py-4"
                         />
                         <div className="flex justify-between text-xs text-gray-300 mt-2 px-1">
                           {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
                         </div>
                       </div>
                     </div>
                   </motion.div>

                   <div className="flex justify-between items-center max-w-xl mx-auto w-full">
                     <Button variant="ghost" onClick={handlePrev} className="text-gray-400 hover:text-gray-900">
                       <ChevronLeft className="mr-2 w-4 h-4" /> Back
                     </Button>
                     <Button 
                       onClick={handleNext}
                       className="bg-gray-900 hover:bg-orange-600 text-white px-8 rounded-full"
                     >
                       Next <ChevronRight className="ml-2 w-4 h-4" />
                     </Button>
                   </div>
                </div>
              </motion.div>
            )}

            {/* RESULTS VIEW */}
            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Your Balance Profile</h2>
                    <p className="text-gray-600">See how your life areas interact and where to focus.</p>
                  </div>

                  <WheelChart scores={scores} />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                    {categories.map(cat => (
                      <div key={cat.id} className="text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">{cat.title}</span>
                        <span className={`text-2xl font-bold ${cat.color}`}>
                          {scores[cat.id]?.toFixed(1)}<span className="text-sm text-gray-400">/10</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Primary Recommendation */}
                  <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium mb-6">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>Recommended Focus Area</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Your Score Indicates a Need for: <br/>
                        <span className="text-orange-400">{recommendations[0].title} Improvement</span>
                      </h3>
                      <p className="text-gray-300 mb-8 max-w-md">
                        Based on your answers, focusing on your {recommendations[0].title.toLowerCase()} will yield the biggest positive impact on your overall quality of life right now.
                      </p>
                      
                      <Link to={recommendations[0].productLink}>
                        <Button className="bg-white text-gray-900 hover:bg-orange-50 font-bold py-6 px-8 rounded-xl text-lg w-full sm:w-auto">
                          View {recommendations[0].title} Program <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Secondary Recommendation */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col">
                    <span className="text-sm font-bold text-gray-400 uppercase mb-4">Also Recommended</span>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{recommendations[1].productName}</h4>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      Your second lowest score was in {recommendations[1].title}. Don't neglect this area!
                    </p>
                    <Link to={recommendations[1].productLink}>
                      <Button variant="outline" className="w-full border-2 hover:bg-gray-50">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="text-center pt-8">
                   <Button variant="ghost" onClick={handleRestart} className="text-gray-500 hover:text-orange-600">
                     <RefreshCcw className="mr-2 w-4 h-4" /> Retake Assessment
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default WheelOfLife;
