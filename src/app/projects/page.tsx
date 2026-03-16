"use client";

import { useState } from "react";
import Link from "next/link";
import { formatVnd, generateQuote, type ProjectInputs } from "@/lib/data";

interface Project {
  id: string;
  name: string;
  type: ProjectInputs["type"];
  area: number;
  floors: number;
  standard: ProjectInputs["standard"];
  status: "draft" | "quoted" | "ordered" | "delivered";
  createdAt: string;
  totalVnd: number;
  items: number;
}

const MOCK_PROJECTS: Project[] = [
  { id: "pj1", name: "Nhà phố Q.7 — Giai đoạn 1", type: "Nhà phố", area: 80, floors: 3, standard: "Trung cấp", status: "ordered", createdAt: "12/03/2026", totalVnd: 196_300_000, items: 8 },
  { id: "pj2", name: "Biệt thự Thảo Điền", type: "Biệt thự", area: 150, floors: 2, standard: "Cao cấp", status: "quoted", createdAt: "08/03/2026", totalVnd: 458_700_000, items: 8 },
  { id: "pj3", name: "Nội thất căn hộ Vinhomes", type: "Căn hộ", area: 70, floors: 1, standard: "Trung cấp", status: "draft", createdAt: "15/03/2026", totalVnd: 0, items: 0 },
];

const STATUS_MAP = {
  draft: { label: "Bản nháp", color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  quoted: { label: "Đã báo giá", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ordered: { label: "Đã đặt hàng", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  delivered: { label: "Đã giao", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", type: "Nhà phố" as ProjectInputs["type"], area: 80, floors: 3, standard: "Trung cấp" as ProjectInputs["standard"] });

  function createProject() {
    const quote = generateQuote(newProject);
    const total = quote.reduce((s, i) => s + i.totalVnd, 0);
    const pj: Project = {
      id: `pj${Date.now()}`,
      name: newProject.name || `${newProject.type} ${newProject.area}m² ${newProject.floors} tầng`,
      type: newProject.type,
      area: newProject.area,
      floors: newProject.floors,
      standard: newProject.standard,
      status: "quoted",
      createdAt: new Date().toLocaleDateString("vi-VN"),
      totalVnd: total,
      items: quote.length,
    };
    setProjects(prev => [pj, ...prev]);
    setShowNew(false);
    setNewProject({ name: "", type: "Nhà phố", area: 80, floors: 3, standard: "Trung cấp" });
  }

  const totalValue = projects.filter(p => p.status !== "draft").reduce((s, p) => s + p.totalVnd, 0);
  const orderedCount = projects.filter(p => p.status === "ordered" || p.status === "delivered").length;

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">DỰ ÁN CỦA TÔI</span></div>
        <button onClick={() => setShowNew(!showNew)} className="premium-button py-2 px-5 text-sm">+ Dự án mới</button>
      </nav>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { v: projects.length.toString(), l: "Tổng dự án", c: "text-white" },
          { v: orderedCount.toString(), l: "Đã đặt hàng", c: "text-blue-400" },
          { v: formatVnd(totalValue), l: "Tổng giá trị", c: "text-emerald-400" },
          { v: projects.filter(p => p.status === "draft").length.toString(), l: "Bản nháp", c: "text-slate-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className={`text-2xl font-bold ${s.c}`}>{s.v}</div>
            <div className="text-[10px] text-slate-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* New project form */}
      {showNew && (
        <div className="glass-card p-6 mb-6 border-l-4 border-l-blue-500">
          <h2 className="font-bold mb-4">Tạo dự án mới</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 block">Tên dự án</label>
              <input value={newProject.name} onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="VD: Nhà phố Q.7" />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 block">Loại công trình</label>
              <select value={newProject.type} onChange={e => setNewProject(p => ({ ...p, type: e.target.value as ProjectInputs["type"] }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none">
                {(["Nhà phố", "Biệt thự", "Nhà cấp 4", "Căn hộ"] as const).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 block">Diện tích (m²)</label>
              <input type="number" value={newProject.area} onChange={e => setNewProject(p => ({ ...p, area: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 block">Số tầng</label>
                <input type="number" value={newProject.floors} onChange={e => setNewProject(p => ({ ...p, floors: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 block">Tiêu chuẩn</label>
                <select value={newProject.standard} onChange={e => setNewProject(p => ({ ...p, standard: e.target.value as ProjectInputs["standard"] }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none">
                  {(["Cơ bản", "Trung cấp", "Cao cấp"] as const).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={createProject} className="premium-button py-2 px-6 text-sm">🧮 Tạo & Báo giá</button>
            <button onClick={() => setShowNew(false)} className="py-2 px-6 border border-white/10 rounded-full text-sm hover:bg-white/5">Hủy</button>
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="space-y-4">
        {projects.map(pj => {
          const st = STATUS_MAP[pj.status];
          return (
            <div key={pj.id} className="glass-card p-6 hover:border-blue-500/10 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{pj.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${st.color}`}>{st.label}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex gap-4">
                    <span>{pj.type} · {pj.floors} tầng · {pj.area * pj.floors}m²</span>
                    <span>Tiêu chuẩn: {pj.standard}</span>
                    <span>Tạo: {pj.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {pj.totalVnd > 0 && (
                    <div className="text-right">
                      <div className="font-bold text-blue-400 text-lg">{formatVnd(pj.totalVnd)}</div>
                      <div className="text-[11px] text-slate-500">{pj.items} hạng mục</div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {pj.status === "draft" && <Link href="/quote" className="premium-button py-1.5 px-4 text-xs">Báo giá</Link>}
                    {pj.status === "quoted" && <Link href="/order" className="premium-button py-1.5 px-4 text-xs">Đặt hàng →</Link>}
                    {pj.status === "ordered" && <Link href="/track" className="py-1.5 px-4 rounded-full border border-blue-500/30 text-blue-400 text-xs hover:bg-blue-500/10">Theo dõi</Link>}
                    {pj.status === "delivered" && <Link href="/payment/history" className="py-1.5 px-4 rounded-full border border-emerald-500/30 text-emerald-400 text-xs hover:bg-emerald-500/10">Hóa đơn</Link>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
