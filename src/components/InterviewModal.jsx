import { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { INTERVIEW_QUESTIONS, CLIENT_PREFERENCES, GET_FEEDBACK } from '../data/interviewData';

export const InterviewModal = () => {
  const pending = useGameStore((state) => state.pendingApplication);
  const acceptContract = useGameStore((state) => state.acceptContract);
  const rejectPending = useGameStore((state) => state.rejectPending);
  const addLog = useGameStore((state) => state.addLog);
  const t = useGameStore((state) => state.t);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState([]);

  // Initialize interview only when modal opens
  useEffect(() => {
    let timer;
    if (pending?.status === 'interview' && activeQuestions.length === 0) {
      timer = setTimeout(() => {
        const shuffled = [...INTERVIEW_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 2);
        setActiveQuestions(shuffled);
      }, 0);
    }
    
    if ((!pending || pending.status !== 'interview') && activeQuestions.length > 0) {
      timer = setTimeout(() => {
        setActiveQuestions([]);
        setCurrentStep(0);
        setSelectedVibes([]);
        setIsFinished(false);
      }, 0);
    }
    return () => timer && clearTimeout(timer);
  }, [pending, activeQuestions.length]);

  if (pending?.status !== 'interview' || activeQuestions.length === 0) return null;

  const clientType = pending.contract.client;
  const targetVibe = CLIENT_PREFERENCES[clientType] || 'flexible';

  const handleAnswer = (vibe) => {
    const newVibes = [...selectedVibes, vibe];
    setSelectedVibes(newVibes);

    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      const matches = newVibes.filter(v => v === targetVibe).length;
      const successChance = (matches * 40) + 30; 
      
      // Moved roll into the async flow to satisfy purity rules
      setTimeout(() => {
        const roll = Math.random() * 100;
        if (roll < successChance) {
          const feedback = GET_FEEDBACK(newVibes[0], clientType);
          addLog('INTERVIEW: ' + feedback);
          acceptContract(pending.contract);
        } else {
          addLog('INTERVIEW: ' + t('interview.failMsg'));
          rejectPending();
        }
      }, 1500);
    }
  };

  const currentQ = activeQuestions[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-10 rounded-3xl max-w-lg w-full shadow-2xl space-y-8">
        
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl">👤</div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">{pending.contract.client}</h2>
            <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">● {t('interview.connected')}</p>
          </div>
        </div>

        {isFinished ? (
          <div className="py-10 text-center space-y-4">
            <div className="text-zinc-500 text-xs uppercase tracking-widest">{t('interview.evaluating')}</div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div className="text-zinc-200 text-lg font-medium leading-relaxed italic">
                "{currentQ?.text}"
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {currentQ?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.vibe)}
                    className="bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 p-5 rounded-2xl text-left text-sm transition-all active:scale-95 group flex items-center justify-between"
                  >
                    <span className="text-zinc-400 group-hover:text-zinc-100">{opt.text}</span>
                    <span className="text-zinc-800 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">{t('common.select')}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center text-[9px] text-zinc-600 uppercase font-black tracking-widest">
              <span>{currentStep + 1} / {activeQuestions.length} {t('interview.scenario')}</span>
              <span className="bg-zinc-800 px-2 py-1 rounded">Burnout_Protocol_SECURE</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
