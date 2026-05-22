import { useGameStore } from '../store/useGameStore';

export const ClientReviewModal = () => {
  const review = useGameStore((state) => state.activeReview);
  const dismiss = useGameStore((state) => state.dismissReview);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const t = useGameStore((state) => state.t);

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        {/* Client Identity */}
        <div className="text-center space-y-2">
           <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-zinc-700">👤</div>
           <h2 className="text-xl font-black text-zinc-100 tracking-tight">{review.company}</h2>
           <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t('freelance.board')}</p>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center gap-2">
           {[...Array(5)].map((_, i) => (
             <span key={i} className={"text-3xl " + (i < review.stars ? "text-yellow-500" : "text-zinc-800")}>
               ★
             </span>
           ))}
        </div>

        {/* Review Message */}
        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
           <p className="text-zinc-200 text-sm leading-relaxed italic text-center">
             "{review.message}"
           </p>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
           <div className="text-center space-y-1">
              <p className="text-[9px] uppercase text-zinc-500 font-black tracking-tighter">
                {review.isFailure ? t('freelance.penalty') : 'REWARD'}
              </p>
              <p className={"text-lg font-mono font-bold " + (review.isFailure ? "text-red-500" : "text-emerald-500")}>
                {review.isFailure ? "-" : "+"}{fCurrency(review.isFailure ? review.penalty : review.reward)}
              </p>
           </div>
           <div className="text-center space-y-1">
              <p className="text-[9px] uppercase text-zinc-500 font-black tracking-tighter">
                REPUTATION
              </p>
              <p className={"text-lg font-mono font-bold " + (review.isFailure ? "text-red-500" : "text-emerald-500")}>
                {review.isFailure ? "-" : "+"}{review.isFailure ? review.repLoss : review.reputation}
              </p>
           </div>
        </div>

        <button 
          onClick={dismiss}
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
        >
          {t('common.dismiss')}
        </button>

        <div className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.3em] text-center">
          Burnout_Client_Feedback_Verified
        </div>
      </div>
    </div>
  );
};
