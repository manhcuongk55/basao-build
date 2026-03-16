"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, formatVnd } from "@/lib/data";

const MOCK_REVIEWS = [
  { id: 1, author: "Nguyễn Văn Minh", role: "Chủ nhà", rating: 5, date: "10/03/2026", comment: "Gạch đẹp, giao đúng hẹn 12 ngày. Đóng gói cẩn thận, không vỡ viên nào. Sẽ đặt tiếp cho phase 2.", project: "Nhà phố Q.7" },
  { id: 2, author: "Trần Thị Lan", role: "Nhà thầu", rating: 4, date: "05/03/2026", comment: "Chất lượng gạch tốt, giá cạnh tranh hơn đại lý 18%. Giao hàng chậm hơn dự kiến 2 ngày do hải quan.", project: "Biệt thự Thảo Điền" },
  { id: 3, author: "Phạm Hoàng Dũng", role: "Kiến trúc sư", rating: 5, date: "28/02/2026", comment: "Surface finish rất đều, không bị cong vênh. Khách hàng của tôi rất hài lòng. Recommend.", project: "Showroom Q.1" },
  { id: 4, author: "Lê Minh Tuấn", role: "Chủ nhà", rating: 4, date: "20/02/2026", comment: "Đặt 120m², giao đủ. Giá tốt hơn mua ở VN. Escrow giữ tiền an toàn, yên tâm.", project: "Nhà cấp 4 Long An" },
];

export default function ProductDetailPage() {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", author: "" });
  const [submitted, setSubmitted] = useState(false);

  // Use first product as demo since we don't have async params
  const product = MOCK_PRODUCTS[3]; // Gạch 60×60 Foshan Premium
  const supplier = MOCK_SUPPLIERS.find(s => s.id === product.supplierId);
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  const avgRating = (MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1);

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/suppliers" className="text-slate-400 hover:text-white text-sm">← Nhà cung cấp</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">SẢN PHẨM</span></div>
        <Link href="/quote" className="premium-button py-2 px-5 text-sm">Báo giá ngay</Link>
      </nav>

      {/* Product Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product image placeholder */}
          <div className="w-full md:w-80 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-6xl border border-white/5">
            🧱
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest">{product.category}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${product.origin === "CN" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                {product.origin === "CN" ? "🇨🇳 Nhập TQ" : "🇻🇳 Sản xuất VN"}
              </span>
              {product.tag && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{product.tag}</span>}
            </div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold text-blue-400">{formatVnd(product.priceVnd)}<span className="text-sm text-slate-500 font-normal ml-1">/ {product.unit}</span></div>
              <div className="flex items-center gap-1 text-amber-400">
                {"★".repeat(Math.round(+avgRating))}
                <span className="text-sm text-slate-400 ml-1">{avgRating} ({MOCK_REVIEWS.length} đánh giá)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "MOQ", value: `${product.moq} ${product.unit}` },
                { label: "Giao hàng", value: `${product.leadDays} ngày` },
                { label: "Nhà cung cấp", value: supplier?.name || "" },
                { label: "Kho", value: supplier?.city || "" },
              ].map(item => (
                <div key={item.label} className="text-sm">
                  <span className="text-slate-500">{item.label}: </span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href="/quote" className="premium-button py-3 px-8">🛒 Thêm vào báo giá</Link>
              <Link href="/order" className="py-3 px-6 border border-white/10 rounded-full text-sm hover:bg-white/5">Đặt hàng trực tiếp</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier trust card */}
      {supplier && (
        <div className="glass-card p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{supplier.logo}</span>
            <div>
              <div className="font-bold text-white">{supplier.name}</div>
              <div className="text-xs text-slate-500">{supplier.city} · ⭐ {supplier.rating} · {supplier.verified ? "✓ Đã xác minh 7 Lớp" : ""}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Basao Escrow 🔒</span>
            <span className="text-[10px] px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">Bảo hành chất lượng</span>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="glass-card p-8 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Đánh giá từ người mua ({MOCK_REVIEWS.length})</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-400">{avgRating}</span>
            <span className="text-amber-400">{"★".repeat(Math.round(+avgRating))}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {MOCK_REVIEWS.map(r => (
            <div key={r.id} className="border-b border-white/5 pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{r.author}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{r.role}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{r.project} · {r.date}</div>
                </div>
                <div className="text-amber-400 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Write review */}
        {!submitted ? (
          <div className="border-t border-white/10 pt-6">
            <h3 className="font-bold text-sm mb-4">Viết đánh giá</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                {[1,2,3,4,5].map(star => (
                  <button key={star} onClick={() => setNewReview(p => ({ ...p, rating: star }))}
                    className={`text-2xl transition-all ${star <= newReview.rating ? "text-amber-400" : "text-slate-600"}`}
                  >★</button>
                ))}
              </div>
              <input value={newReview.author} onChange={e => setNewReview(p => ({ ...p, author: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="Họ tên" />
              <textarea value={newReview.comment} onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none resize-none" rows={3} placeholder="Nhận xét về sản phẩm..." />
              <button onClick={() => setSubmitted(true)} className="premium-button py-2 px-6 text-sm">Gửi đánh giá</button>
            </div>
          </div>
        ) : (
          <div className="border-t border-white/10 pt-6 text-center text-emerald-400 text-sm">
            ✅ Cảm ơn bạn đã đánh giá! Nhận xét sẽ hiển thị sau khi xác minh.
          </div>
        )}
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Sản phẩm cùng danh mục</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="glass-card p-5 hover:translate-y-[-4px] transition-all">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">{p.category}</div>
                <h3 className="font-bold text-white mb-2">{p.name}</h3>
                <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500 font-normal ml-1">/ {p.unit}</span></div>
                <div className="text-[11px] text-slate-500 mt-2">{p.supplierName} · ⚡ {p.leadDays} ngày</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
