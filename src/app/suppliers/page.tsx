"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_PRODUCTS, CATEGORIES, formatVnd } from "@/lib/data";

export default function SuppliersPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSuppliers = activeCategory === "all"
    ? MOCK_SUPPLIERS
    : MOCK_SUPPLIERS.filter(s => s.categories.includes(activeCategory));

  const filteredProducts = activeCategory === "all"
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-6xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">NHÀ CUNG CẤP</span></div>
        <Link href="/quote" className="premium-button py-2 px-5 text-sm">Báo giá ngay</Link>
      </nav>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              activeCategory === c.key
                ? "bg-blue-600 border-blue-500 text-white"
                : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
            }`}
          >
            <span>{c.icon}</span> {c.label}
            <span className="text-[10px] opacity-60">
              ({c.key === "all" ? MOCK_PRODUCTS.length : MOCK_PRODUCTS.filter(p => p.category === c.key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Supplier cards */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-2">Nhà cung cấp đã xác minh</h1>
        <p className="text-slate-400 text-sm mb-8">
          {filteredSuppliers.length} nhà cung cấp
          {activeCategory !== "all" && ` trong danh mục ${CATEGORIES.find(c => c.key === activeCategory)?.label}`}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map(s => (
            <div key={s.id} className="glass-card p-6 hover:border-blue-500/20 hover:translate-y-[-4px] transition-all flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.logo}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.city}</div>
                  </div>
                </div>
                {s.verified && (
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded-full font-bold">✓ Đã xác minh</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {s.categories.map(c => (
                  <span key={c} className="text-[10px] text-slate-400 border border-white/10 px-2 py-0.5 rounded">{c}</span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-slate-400">
                <span>⭐ {s.rating}</span>
                <span className={`text-[10px] font-bold ${s.country === "CN" ? "text-red-400" : "text-blue-400"}`}>
                  {s.country === "CN" ? "🇨🇳 Nhập TQ" : "🇻🇳 SX VN"}
                </span>
              </div>
              <div className="text-xs text-slate-500 border-t border-white/5 pt-3">🚚 {s.shipping} · ⚡ {s.leadTimeDays} ngày</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product listings */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeCategory === "all" ? "Tất cả sản phẩm" : CATEGORIES.find(c => c.key === activeCategory)?.label}
          </h2>
          <span className="text-sm text-slate-400">{filteredProducts.length} sản phẩm</span>
        </div>
        <div className="space-y-3">
          {filteredProducts.map(p => (
            <div key={p.id} className="glass-card px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-blue-500/10 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white">{p.name}</span>
                  {p.tag && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p.tag}</span>}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.origin === "CN" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                    {p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{p.supplierName} · {p.category} · MOQ: {p.moq} {p.unit}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500">/{p.unit}</span></div>
                  <div className="text-xs text-slate-500">⚡ Giao trong {p.leadDays} ngày</div>
                </div>
                <Link href="/quote" className="premium-button py-1.5 px-4 text-sm">Đặt ngay</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
