"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, CATEGORIES, formatVnd } from "@/lib/data";

export default function SupplierProductsPage() {
  const supplierId = "s6"; // Mock: Nội Thất Hòa Phát
  const [products, setProducts] = useState(
    MOCK_PRODUCTS.map(p => ({ ...p, active: true }))
  );
  const [filterCat, setFilterCat] = useState("all");

  const myProducts = products.filter(p =>
    (filterCat === "all" || p.category === filterCat)
  );

  function toggleActive(id: string) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }

  const activeCount = products.filter(p => p.active).length;
  const inactiveCount = products.filter(p => !p.active).length;

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-6xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/supplier/dashboard" className="text-slate-400 hover:text-white text-sm">← Dashboard</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">SẢN PHẨM</span></div>
        <Link href="/supplier/products/new" className="premium-button py-2 px-5 text-sm">+ Thêm sản phẩm</Link>
      </nav>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-white">{products.length}</div>
          <div className="text-xs text-slate-500">Tổng sản phẩm</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{activeCount}</div>
          <div className="text-xs text-slate-500">Đang bán</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-slate-500">{inactiveCount}</div>
          <div className="text-xs text-slate-500">Tạm ẩn</div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilterCat("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterCat === "all" ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
        >
          Tất cả ({products.length})
        </button>
        {CATEGORIES.filter(c => c.key !== "all").map(c => {
          const count = products.filter(p => p.category === c.key).length;
          if (count === 0) return null;
          return (
            <button
              key={c.key}
              onClick={() => setFilterCat(c.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterCat === c.key ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
            >
              {c.icon} {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Product list */}
      <div className="space-y-3">
        {myProducts.map(p => (
          <div key={p.id} className={`glass-card px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${!p.active ? "opacity-50" : ""}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-bold text-white">{p.name}</span>
                {p.tag && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p.tag}</span>}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.origin === "CN" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                  {p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                  {p.active ? "● Đang bán" : "○ Tạm ẩn"}
                </span>
              </div>
              <div className="text-xs text-slate-500">{p.category} · MOQ: {p.moq} {p.unit} · Giao: {p.leadDays} ngày</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500">/{p.unit}</span></div>
              </div>
              <button
                onClick={() => toggleActive(p.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${p.active ? "border border-red-500/30 text-red-400 hover:bg-red-500/10" : "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"}`}
              >
                {p.active ? "Ẩn SP" : "Hiện SP"}
              </button>
              <Link href="/supplier/products/new" className="px-4 py-1.5 rounded-lg text-xs font-bold border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Sửa
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
