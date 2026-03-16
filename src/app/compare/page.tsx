"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, formatVnd } from "@/lib/data";

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["p3", "p4"]); // Gạch VN vs TQ

  function toggleProduct(id: string) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // Max 3
      return [...prev, id];
    });
  }

  const compareProducts = selected.map(id => MOCK_PRODUCTS.find(p => p.id === id)!).filter(Boolean);

  const attributes = [
    { key: "price", label: "Đơn giá", render: (p: typeof MOCK_PRODUCTS[0]) => formatVnd(p.priceVnd) + " / " + p.unit },
    { key: "origin", label: "Xuất xứ", render: (p: typeof MOCK_PRODUCTS[0]) => p.origin === "CN" ? "🇨🇳 Trung Quốc" : "🇻🇳 Việt Nam" },
    { key: "supplier", label: "Nhà cung cấp", render: (p: typeof MOCK_PRODUCTS[0]) => p.supplierName },
    { key: "moq", label: "MOQ (đặt tối thiểu)", render: (p: typeof MOCK_PRODUCTS[0]) => `${p.moq} ${p.unit}` },
    { key: "lead", label: "Thời gian giao", render: (p: typeof MOCK_PRODUCTS[0]) => `${p.leadDays} ngày` },
    { key: "tag", label: "Tag", render: (p: typeof MOCK_PRODUCTS[0]) => p.tag || "—" },
    { key: "total100", label: "Giá cho 100 đơn vị", render: (p: typeof MOCK_PRODUCTS[0]) => formatVnd(p.priceVnd * 100) },
  ];

  // Find best values for highlighting
  const cheapest = compareProducts.length > 1 ? compareProducts.reduce((a, b) => a.priceVnd < b.priceVnd ? a : b).id : "";
  const fastest = compareProducts.length > 1 ? compareProducts.reduce((a, b) => a.leadDays < b.leadDays ? a : b).id : "";

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-6xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/suppliers" className="text-slate-400 hover:text-white text-sm">← Nhà cung cấp</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">SO SÁNH</span></div>
        <Link href="/search" className="text-slate-400 hover:text-white text-sm">🔍 Tìm kiếm →</Link>
      </nav>

      {/* Product selector */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-bold mb-3 text-sm text-slate-400 uppercase tracking-widest">Chọn sản phẩm so sánh (tối đa 3)</h2>
        <div className="flex flex-wrap gap-2">
          {MOCK_PRODUCTS.map(p => (
            <button key={p.id} onClick={() => toggleProduct(p.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selected.includes(p.id) ? "bg-blue-600 border-blue-500 text-white" : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {p.origin === "CN" ? "🇨🇳" : "🇻🇳"} {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      {compareProducts.length >= 2 ? (
        <div className="glass-card p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-left text-slate-500 font-normal w-40">Thuộc tính</th>
                  {compareProducts.map(p => (
                    <th key={p.id} className="pb-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.origin === "CN" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                          {p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                        </span>
                        <span className="font-bold text-white text-sm">{p.name}</span>
                        <span className="text-[10px] text-slate-500">{p.category}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {attributes.map(attr => (
                  <tr key={attr.key} className="hover:bg-white/[0.02]">
                    <td className="py-3 text-slate-400">{attr.label}</td>
                    {compareProducts.map(p => {
                      const isBestPrice = attr.key === "price" && p.id === cheapest;
                      const isBestLead = attr.key === "lead" && p.id === fastest;
                      const highlight = isBestPrice || isBestLead;
                      return (
                        <td key={p.id} className={`py-3 text-center font-semibold ${highlight ? "text-emerald-400" : "text-white"}`}>
                          {attr.render(p)}
                          {highlight && <span className="ml-1 text-[9px]">✓ Tốt nhất</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings calculation */}
          {compareProducts.length === 2 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="glass-card p-4 bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-emerald-400">💡 Tiết kiệm khi chọn sản phẩm giá tốt hơn</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Cho đơn hàng 100 {compareProducts[0].unit}: chênh lệch{" "}
                      <span className="text-white font-bold">{formatVnd(Math.abs(compareProducts[0].priceVnd - compareProducts[1].priceVnd) * 100)}</span>
                    </div>
                  </div>
                  <Link href="/order" className="premium-button py-2 px-4 text-xs">Đặt hàng →</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">⚖️</div>
          <div className="text-slate-400">Chọn ít nhất 2 sản phẩm để so sánh.</div>
        </div>
      )}
    </main>
  );
}
