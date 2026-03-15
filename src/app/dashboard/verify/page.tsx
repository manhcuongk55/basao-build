"use client";

import { useState } from "react";
import Link from "next/link";

const TRUTH_LAYERS = [
  { id: 1, name: "Identity Truth", status: "Verified", icon: "👤", color: "text-emerald-400" },
  { id: 2, name: "Asset Truth", status: "Verified", icon: "📦", color: "text-emerald-400" },
  { id: 3, name: "Legal Truth", status: "Processing", icon: "⚖️", color: "text-amber-400" },
  { id: 4, name: "Agent Truth", status: "Verified", icon: "🤝", color: "text-emerald-400" },
  { id: 5, name: "Transaction Truth", status: "Pending", icon: "💰", color: "text-slate-500" },
  { id: 6, name: "Spatial Truth", status: "Verified", icon: "📍", color: "text-emerald-400" },
  { id: 7, name: "Content Truth", status: "Verified", icon: "🛡️", color: "text-emerald-400" },
];

export default function VerificationPage() {
  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col items-center">
      <nav className="w-full max-w-5xl flex justify-between items-center mb-16">
        <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2">
          ← Dashboard
        </Link>
        <div className="font-bold text-xl tracking-tighter">BASAO <span className="text-emerald-500">TRUST GATEWAY</span></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold">Dr. Nguyen Van A</div>
            <div className="text-xs text-slate-500">Certified Architect</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-emerald-500/50 flex items-center justify-center text-xl">👨‍💼</div>
        </div>
      </nav>

      <section className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 glass-card p-8 border-l-4 border-l-emerald-500">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">7 Layers of Truth</h1>
            <p className="text-slate-400 leading-relaxed max-w-xl">
              Verification protocol for Project ID: <span className="text-white font-mono">BSB-2026-X99</span>. 
              Ensuring 100% material authenticity and logistics integrity.
            </p>
          </div>
          <div className="w-full md:w-64 glass-card p-8 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-bold">Trust Score</div>
            <div className="text-5xl font-bold text-emerald-400">92%</div>
            <div className="text-[10px] text-emerald-500/50 mt-2 font-mono">B-TRUTH SEAL ACTIVE</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUTH_LAYERS.map((layer) => (
            <div key={layer.id} className="glass-card p-6 group hover:translate-y-[-4px] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{layer.icon}</div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${layer.color.replace('text', 'border')}`}>
                  {layer.status.toUpperCase()}
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">{layer.name}</h3>
              <p className="text-[10px] text-slate-500 leading-tight">Protocol L{layer.id} Verification Checksum: ...{Math.random().toString(36).substring(7)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card p-10 bg-emerald-500/[0.02]">
          <h2 className="text-2xl font-bold mb-8">Verification Timeline</h2>
          <div className="space-y-8 relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-white/5"></div>
            <TimelineItem 
              time="14:23 - Mar 15, 2026" 
              title="Identity Truth Verified" 
              desc="National ID and Professional Certificate linked via B-Chain." 
            />
            <TimelineItem 
              time="11:45 - Mar 15, 2026" 
              title="Asset Truth Mapped" 
              desc="150kg Industrial Mortar (Batch #RM-992) geo-tagged at Factory Gate." 
            />
            <TimelineItem 
              time="09:12 - Mar 15, 2026" 
              title="Spatial Truth Logged" 
              desc="Construction site GPS coordinates verified for Project BSB-2026-X99." 
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function TimelineItem({ time, title, desc }: { time: string, title: string, desc: string }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_theme(colors.emerald.500)]"></div>
      <div className="text-[10px] text-emerald-500 font-mono mb-1">{time}</div>
      <div className="font-bold text-white mb-1">{title}</div>
      <div className="text-sm text-slate-400">{desc}</div>
    </div>
  );
}
