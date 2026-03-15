"use client";
import Link from "next/link";
import { useState } from "react";
import { formatVnd } from "@/lib/data";

const MOCK_SUPPLIER = {
  name: "TQ Building Direct",
  country: "CN",
  city: "Quảng Đông",
  rating: 4.6,
  verified: true,
  joined: "01/2026",
  products: 14,
  activeOrders: 3,
  monthRevenue: 245_000_000,
};

const RECENT_ORDERS = [
  { id: "BSB-2026-X99", buyer: "Nguyễn Văn A", items: "Gạch 60×60 × 300m²", value: 54_000_000, status: "confirmed", date: "15/03/2026" },
  { id: "BSB-2026-X87", buyer: "Trần Thị B", items: "Cửa nhôm Foshan × 4 bộ", value: 34_000_000, status: "shipped", date: "12/03/2026" },
  { id: "BSB-2026-X71", buyer: "Lê Văn C", items: "Gạch 60×60 × 100m²", value: 18_000_000, status: "delivered", date: "05/03/2026" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Đã xác nhận", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  shipped:   { label: "Đang giao",   color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  delivered: { label: "Đã giao",     color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
};

export default function SupplierDashboard() {
  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-6xl mx-auto">
      {/* Nav */}
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">NHÀ CUNG CẤP</span></div>
        <Link href="/supplier/products/new" className="premium-button py-2 px-5 text-sm">+ Thêm sản phẩm</Link>
      </nav>

      {/* Profile */}
      <div className="glass-card p-8 mb-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl">🇨🇳</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Nhà cung cấp đã xác minh</div>
            <h1 className="text-2xl font-bold text-white">{MOCK_SUPPLIER.name}</h1>
            <div className="text-sm text-slate-400">{MOCK_SUPPLIER.city} · Tham gia {MOCK_SUPPLIER.joined} · ⭐ {MOCK_SUPPLIER.rating}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/supplier/products" className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5">Quản lý SP</Link>
          <Link href="/supplier/orders" className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5">Đơn hàng</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { v: formatVnd(MOCK_SUPPLIER.monthRevenue), l: "Doanh thu tháng", color: "text-blue-400" },
          { v: String(MOCK_SUPPLIER.activeOrders), l: "Đơn đang xử lý", color: "text-amber-400" },
          { v: String(MOCK_SUPPLIER.products), l: "Sản phẩm đang bán", color: "text-white" },
          { v: "98%", l: "Tỷ lệ giao đúng hạn", color: "text-emerald-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5">
            <div className={`text-2xl font-bold ${s.color}`}>{s.v}</div>
            <div className="text-xs text-slate-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Order table */}
      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
          <Link href="/supplier/orders" className="text-sm text-blue-400 hover:underline">Xem tất cả →</Link>
        </div>
        <div className="space-y-3">
          {RECENT_ORDERS.map(o => (
            <div key={o.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white font-bold text-sm">{o.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${STATUS_MAP[o.status].color}`}>{STATUS_MAP[o.status].label}</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">{o.buyer} · {o.items}</div>
                <div className="text-xs text-slate-500">{o.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-bold text-white">{formatVnd(o.value)}</div>
                <Link href="/supplier/orders" className="text-xs text-blue-400 hover:underline">Chi tiết →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
