"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MATERIALS, calculateEstimate } from "./logic";

export default function EstimatorPage() {
  const [size, setSize] = useState<number>(100);
  const [selectedCategory, setSelectedCategory] = useState("Paint");

  const estimates = calculateEstimate(size, selectedCategory);

  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col items-center">
      <nav className="w-full max-w-4xl flex justify-between items-center mb-12">
        <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2">
          ← Back to Home
        </Link>
        <div className="font-bold text-xl tracking-tighter">BASAO <span className="text-blue-500">ESTIMATOR</span></div>
      </nav>

      <section className="w-full max-w-4xl glass-card p-10">
        <h1 className="text-3xl font-bold mb-8">AI Project Estimator</h1>
        
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2 uppercase tracking-widest font-bold">Project Area (m²)</label>
              <input 
                type="number" 
                value={size} 
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2 uppercase tracking-widest font-bold">Material Focus</label>
              <div className="flex flex-wrap gap-2">
                {["Paint", "Tiles", "Mortar", "Smart Home"].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg border transition-all ${selectedCategory === cat ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <div className="text-sm text-blue-400 font-bold mb-2 uppercase tracking-widest">Estimated Value</div>
            <div className="text-5xl font-bold text-white mb-4">
              {((size * 150000)).toLocaleString()} <span className="text-2xl text-slate-500">VND</span>
            </div>
            <div className="text-xs text-slate-400">Based on industry average high-quality standards.</div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 
            Bill of Materials (BoM)
          </h2>
          <div className="space-y-4">
            {MOCK_MATERIALS.filter(m => m.category === selectedCategory).map(material => (
              <div key={material.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all">
                <div>
                  <div className="font-bold text-white">{material.name}</div>
                  <div className="text-sm text-slate-500">{material.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-400">{(size / 10).toFixed(1)} {material.unit}</div>
                  <div className="text-xs text-slate-500">Verified Quality</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="premium-button w-full mt-12 py-4 text-xl">
          Lock Price with "7 Layers of Truth"
        </button>
      </section>
    </main>
  );
}
