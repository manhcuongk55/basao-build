"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, formatVnd } from "@/lib/data";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["p4", "p9", "p12", "p19", "p25", "p27"]);

  const favorites = favoriteIds.map(id => MOCK_PRODUCTS.find(p => p.id === id)!).filter(Boolean);

  function removeFavorite(id: string) {
    setFavoriteIds(prev => prev.filter(x => x !== id));
  }

  const totalIfOrder = favorites.reduce((s, p) => s + p.priceVnd * p.moq, 0);

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-xl">❤️ Sản phẩm yêu thích</h1>
          <div className="text-xs text-slate-500 mt-1">{favorites.length} sản phẩm đã lưu</div>
        </div>
        <Link href="/search" className="text-xs text-blue-400 hover:underline">🔍 Tìm thêm →</Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-white">{favorites.length}</div>
          <div className="text-[10px] text-slate-500">Đã lưu</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{favorites.filter(p => p.origin === "VN").length} / {favorites.filter(p => p.origin === "CN").length}</div>
          <div className="text-[10px] text-slate-500">🇻🇳 VN / 🇨🇳 TQ</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-lg font-bold text-emerald-400">{formatVnd(totalIfOrder)}</div>
          <div className="text-[10px] text-slate-500">Tổng (MOQ mỗi SP)</div>
        </div>
      </div>

      {/* Product grid */}
      {favorites.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">💔</div>
          <div className="text-slate-400">Chưa có sản phẩm yêu thích nào.</div>
          <Link href="/search" className="premium-button py-2 px-6 text-sm mt-4 inline-block">🔍 Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(p => (
            <div key={p.id} className="glass-card p-5 flex flex-col gap-2 relative group">
              <button onClick={() => removeFavorite(p.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                title="Bỏ yêu thích"
              >✕</button>

              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{p.category}</span>
                <div className="flex gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.origin === "CN" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                    {p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                  </span>
                  {p.tag && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p.tag}</span>}
                </div>
              </div>
              <Link href={`/products/${p.id}`} className="font-bold text-white text-sm hover:text-blue-400 transition-colors">{p.name}</Link>
              <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500 font-normal ml-1">/ {p.unit}</span></div>
              <div className="text-[11px] text-slate-500 flex justify-between mt-auto">
                <span>{p.supplierName}</span>
                <span>⚡ {p.leadDays} ngày</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Link href="/order" className="flex-1 premium-button py-1.5 text-[11px] text-center">Đặt hàng</Link>
                <Link href={`/compare`} className="flex-1 py-1.5 border border-white/10 rounded-full text-[11px] text-center text-slate-400 hover:text-white hover:bg-white/5">So sánh</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
