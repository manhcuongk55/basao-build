"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, CATEGORIES, formatVnd } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState<"all" | "VN" | "CN">("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "lead" | "rating">("price-asc");

  const q = query.toLowerCase().trim();

  let filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.supplierName.toLowerCase().includes(q);
    const matchesCat = selectedCat === "all" || p.category === selectedCat;
    const matchesOrigin = selectedOrigin === "all" || p.origin === selectedOrigin;
    return matchesQuery && matchesCat && matchesOrigin;
  });

  // Sort
  if (sortBy === "price-asc") filteredProducts.sort((a, b) => a.priceVnd - b.priceVnd);
  if (sortBy === "price-desc") filteredProducts.sort((a, b) => b.priceVnd - a.priceVnd);
  if (sortBy === "lead") filteredProducts.sort((a, b) => a.leadDays - b.leadDays);

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => {
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.categories.some(c => c.toLowerCase().includes(q));
    return matchesQuery;
  });

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-6xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">TÌM KIẾM</span></div>
        <Link href="/agent" className="text-emerald-400 hover:text-emerald-300 text-sm">🤖 Hỏi AI Agent →</Link>
      </nav>

      {/* Search bar */}
      <div className="glass-card p-6 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm vật liệu, nội thất, điện nước, thiết bị... (VD: gạch Foshan, sơn Kova, bồn cầu Inax)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-lg focus:border-blue-500 outline-none transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mt-4 items-center">
          {/* Category */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setSelectedCat(c.key)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${selectedCat === c.key ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10"></div>

          {/* Origin */}
          {(["all", "VN", "CN"] as const).map(o => (
            <button key={o} onClick={() => setSelectedOrigin(o)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${selectedOrigin === o ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
            >
              {o === "all" ? "Tất cả" : o === "VN" ? "🇻🇳 VN" : "🇨🇳 TQ"}
            </button>
          ))}

          <div className="h-6 w-px bg-white/10"></div>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[11px] text-slate-400 outline-none"
          >
            <option value="price-asc">Giá: Thấp → Cao</option>
            <option value="price-desc">Giá: Cao → Thấp</option>
            <option value="lead">Giao nhanh nhất</option>
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-400">
          {q ? <>Kết quả cho &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo; — </> : ""}
          <span className="text-white font-semibold">{filteredProducts.length}</span> sản phẩm
          {filteredSuppliers.length > 0 && q && <>, <span className="text-white font-semibold">{filteredSuppliers.length}</span> NCC</>}
        </div>
      </div>

      {/* Supplier results (if search active) */}
      {q && filteredSuppliers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-3">Nhà cung cấp</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {filteredSuppliers.slice(0, 3).map(s => (
              <Link key={s.id} href="/suppliers" className="glass-card p-4 hover:border-blue-500/20 transition-all flex items-center gap-3">
                <span className="text-2xl">{s.logo}</span>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{s.name}</div>
                  <div className="text-[11px] text-slate-500">{s.city} · ⭐ {s.rating} · {s.categories.join(", ")}</div>
                </div>
                {s.verified && <span className="text-[9px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded-full">✓</span>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product results */}
      <h2 className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-3">Sản phẩm</h2>
      {filteredProducts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-slate-400">Không tìm thấy sản phẩm phù hợp.</div>
          <div className="text-sm text-slate-500 mt-2">Thử từ khóa khác hoặc <Link href="/agent" className="text-emerald-400 hover:underline">hỏi AI Agent</Link>.</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="glass-card p-5 hover:translate-y-[-4px] transition-all flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{p.category}</span>
                <div className="flex gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.origin === "CN" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                    {p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                  </span>
                  {p.tag && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p.tag}</span>}
                </div>
              </div>
              <h3 className="font-bold text-white text-sm">{p.name}</h3>
              <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500 font-normal ml-1">/ {p.unit}</span></div>
              <div className="text-[11px] text-slate-500 flex justify-between mt-auto">
                <span>{p.supplierName}</span>
                <span>⚡ {p.leadDays} ngày</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
