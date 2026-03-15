"use client";

import Link from "next/link";

const MOCK_COMMISSIONS = [
  { project: "Villa A - Quan 2", material: "Premium Paint (18 buckets)", amount: 4320000, status: "Paid" },
  { project: "Office Tower - BT", material: "Ceramic Tiles (850 m2)", amount: 47600000, status: "Processing" },
  { project: "Townhouse - GV", material: "Ready-mix Mortar (200 bags)", amount: 1680000, status: "Pending" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-16 flex flex-col items-center">
      {/* Header */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-12">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          BASAO <span className="text-blue-500">BUILD</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/estimator" className="text-sm text-slate-400 hover:text-white transition-colors">Project Estimator</Link>
          <Link href="/dashboard/verify" className="text-sm text-slate-400 hover:text-white transition-colors">Trust Gateway</Link>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-xs flex items-center justify-center">T</div>
            <span className="text-sm font-semibold">Thợ Vĩnh</span>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-6xl space-y-8">
        {/* Profile + Trust Score */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 glass-card p-8 flex gap-6 items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-4xl shrink-0">👷</div>
            <div>
              <div className="text-sm text-slate-400 mb-1">BASAO BUILD – CERTIFIED COLLABORATOR</div>
              <h1 className="text-2xl font-bold">Nguyễn Văn Vĩnh</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Thi công hoàn thiện", "Sơn nước", "Ốp lát"].map(tag => (
                  <span key={tag} className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center border-emerald-500/20">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Trust Score</div>
            <div className="text-5xl font-bold text-emerald-400 leading-none">96</div>
            <div className="text-[10px] text-emerald-500/70 mt-2 font-mono">B-CERTIFIED ✓</div>
            <Link href="/dashboard/verify" className="text-xs text-blue-400 hover:underline mt-3">View 7 Layers →</Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Commission", value: "₫53.6M", sub: "This month" },
            { label: "Active Projects", value: "3", sub: "Ongoing" },
            { label: "Referrals", value: "27", sub: "Clients referred" },
            { label: "Commission Rate", value: "5.5%", sub: "Current tier: Silver" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-5 group hover:border-blue-500/20 transition-all">
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs font-bold text-slate-300">{s.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Commission History */}
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Commission History</h2>
            <button className="premium-button py-1.5 text-xs px-4">Refer New Project</button>
          </div>
          <div className="space-y-3">
            {MOCK_COMMISSIONS.map((c, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all gap-2">
                <div>
                  <div className="font-bold text-white text-sm">{c.project}</div>
                  <div className="text-xs text-slate-500">{c.material}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-emerald-400 text-sm">+{c.amount.toLocaleString()} ₫</div>
                    <div className="text-[10px] text-slate-500">Commission earned</div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    c.status === "Paid" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" :
                    c.status === "Processing" ? "border-amber-500/30 text-amber-400 bg-amber-500/5" :
                    "border-slate-500/30 text-slate-500 bg-slate-500/5"
                  }`}>{c.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/estimator" className="glass-card p-6 hover:border-blue-500/30 hover:translate-y-[-4px] transition-all flex flex-col gap-4">
            <div className="text-4xl">🤖</div>
            <div>
              <div className="font-bold text-white mb-1">AI Project Estimator</div>
              <div className="text-sm text-slate-400">Generate a verified BoM for your next project.</div>
            </div>
          </Link>
          <Link href="/dashboard/verify" className="glass-card p-6 hover:border-emerald-500/30 hover:translate-y-[-4px] transition-all flex flex-col gap-4">
            <div className="text-4xl">🛡️</div>
            <div>
              <div className="font-bold text-white mb-1">Truth Gateway</div>
              <div className="text-sm text-slate-400">Verify yourself or your materials through 7 Layers.</div>
            </div>
          </Link>
          <div className="glass-card p-6 hover:border-amber-500/30 hover:translate-y-[-4px] transition-all flex flex-col gap-4 cursor-pointer">
            <div className="text-4xl">💰</div>
            <div>
              <div className="font-bold text-white mb-1">Build Wallet</div>
              <div className="text-sm text-slate-400">Access credit lines and manage your earnings.</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-slate-600 text-xs italic">
        &ldquo;Bát Nhã soi tâm – Trí tuệ dẫn đường.&rdquo; · Basao Build 2026
      </footer>
    </main>
  );
}
