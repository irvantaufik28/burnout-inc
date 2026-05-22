import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { PRODUCT_TYPES, TARGET_MARKETS, FOCUS_PRIORITIES } from '../data/productData';

export const ProductModal = () => {
  const isOpen = useGameStore((state) => state.isCreatingProduct);
  const toggle = useGameStore((state) => state.toggleCreateModal);
  const create = useGameStore((state) => state.createProduct);

  const [form, setForm] = useState({
    name: 'Untitled Tool',
    type: PRODUCT_TYPES[0],
    market: TARGET_MARKETS[0],
    focus: FOCUS_PRIORITIES[0]
  });

  if (!isOpen) return null;

  const Selector = ({ label, options, field }) => (
    <div className="space-y-2">
      <label className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setForm({ ...form, [field]: opt })}
            className={"text-xs py-2 px-3 rounded-lg border transition-all " + 
                       (form[field] === opt ? "bg-zinc-100 text-zinc-950 border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700")}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-lg w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Product Blueprint</h2>
            <p className="text-zinc-500 text-sm">Define your market strategy and priority.</p>
          </div>
          <button onClick={() => toggle(false)} className="text-zinc-500 hover:text-white">✕</button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">Project Name</label>
            <input 
              type="text" 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-600 text-zinc-100"
            />
          </div>

          <Selector label="Category" options={PRODUCT_TYPES} field="type" />
          <Selector label="Target Market" options={TARGET_MARKETS} field="market" />
          <Selector label="Priority" options={FOCUS_PRIORITIES} field="focus" />
        </div>

        <button 
          onClick={() => create(form)}
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 rounded-xl transition-all active:scale-95"
        >
          Initialize Development
        </button>
      </div>
    </div>
  );
};
