"use client";

import { useState } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/data";

export default function SupplierAnalyticsPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const stats = {
    "7d": { revenue: 42_600_000, orders: 8, views: 340, conversion: 6.2, avgRating: 4.6, repeatRate: 32 },
    "30d": { revenue: 168_400_000, orders: 31, views: 1420, conversion: 7.1, avgRating: 4.5, repeatRate: 38 },
    "90d": { revenue: 482_000_000, orders: 89, views: 4200, conversion: 7.8, avgRating: 4.5, repeatRate: 42 },
  };
  const s = stats[period];

  const monthlyRevenue = [
    { month: "10", value: 38_000_000 },
    { month: "11", value: 52_000_000 },
    { month: "12", value: 68_000_000 },
    { month: "01", value: 95_000_000 },
    { month: "02", value: 112_000_000 },
    { month: "03", value: 168_400_000 },
  ];
  const maxValue = Math.max(...monthlyRevenue.map(m => m.value));

  const topProducts = [
    { name: "Gạch 60×60 Foshan Premium", sold: 45, revenue: 77_400_000, growth: 18 },
    { name: "Cửa nhôm Foshan 4 cánh", sold: 12, revenue: 43_200_000, growth: 25 },
    { name: "Tay nắm tủ hợp kim nhôm 128mm", sold: 280, revenue: 6_160_000, growth: 42 },
  ];

  const recentReviews = [
    { buyer: "Nguyễn Văn Minh", product: "Gạch 60×60 Foshan", rating: 5, comment: "Chất lượng tốt, giao đúng hẹn", date: "14/03" },
    { buyer: "Trần Thị Lan", product: "Cửa nhôm 4 cánh", rating: 4, comment: "Đẹp nhưng giao chậm 2 ngày", date: "12/03" },
    { buyer: "Phạm Dũng", product: "Gạch 60×60 Foshan", rating: 5, comment: "Rẻ hơn đại lý, Escrow an tâm", date: "10/03" },
  ];

  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-xl">📈 Phân tích doanh số</h1>
          <div className="text-xs text-slate-500 mt-1">TQ Building Direct · 🏭 NCC xác minh ✓</div>
        </div>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${period === p ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400"}`}
            >
              {p === "7d" ? "7 ngày" : p === "30d" ? "30 ngày" : "90 ngày"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { v: formatVnd(s.revenue), l: "Doanh thu", c: "text-emerald-400", icon: "💰" },
          { v: s.orders.toString(), l: "Đơn hàng", c: "text-blue-400", icon: "📦" },
          { v: s.views.toLocaleString(), l: "Lượt xem SP", c: "text-cyan-400", icon: "👁" },
          { v: s.conversion + "%", l: "Tỷ lệ đặt hàng", c: "text-amber-400", icon: "🎯" },
          { v: "⭐ " + s.avgRating, l: "Đánh giá TB", c: "text-amber-400", icon: "⭐" },
          { v: s.repeatRate + "%", l: "Khách quay lại", c: "text-purple-400", icon: "🔄" },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-4">
            <div className="text-lg mb-1">{kpi.icon}</div>
            <div className={`text-lg font-bold ${kpi.c}`}>{kpi.v}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{kpi.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue chart (bar) */}
        <div className="glass-card p-6">
          <h2 className="font-bold text-sm mb-4">Doanh thu theo tháng</h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyRevenue.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[9px] text-slate-500 font-mono">{formatVnd(m.value)}</div>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
                  style={{ height: `${(m.value / maxValue) * 100}%` }}
                ></div>
                <div className="text-[10px] text-slate-500">T{m.month}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-xs text-slate-500">
            Tổng 6 tháng: <span className="text-white font-bold">{formatVnd(monthlyRevenue.reduce((s, m) => s + m.value, 0))}</span>
          </div>
        </div>

        {/* Top products */}
        <div className="glass-card p-6">
          <h2 className="font-bold text-sm mb-4">Top sản phẩm bán chạy</h2>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">{i + 1}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-white">{p.name}</div>
                  <div className="text-[11px] text-slate-500">{p.sold} đã bán · {formatVnd(p.revenue)}</div>
                </div>
                <span className="text-emerald-400 text-xs font-bold">↑ {p.growth}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent reviews */}
      <div className="glass-card p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm">⭐ Đánh giá gần đây</h2>
          <Link href="/supplier/dashboard" className="text-xs text-blue-400 hover:underline">Dashboard →</Link>
        </div>
        <div className="space-y-3">
          {recentReviews.map((r, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.03] last:border-0">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white">{r.buyer[0]}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-white">{r.buyer}</span>
                  <span className="text-[10px] text-slate-600">{r.date}</span>
                </div>
                <div className="text-amber-400 text-xs mb-0.5">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <div className="text-xs text-slate-400">{r.product} — {r.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link href="/supplier/products" className="glass-card p-5 hover:border-blue-500/10 transition-all">
          <div className="text-xl mb-2">📦</div>
          <div className="font-bold text-sm text-white">Quản lý sản phẩm</div>
          <div className="text-[11px] text-slate-500 mt-1">Thêm, sửa, toggle SP</div>
        </Link>
        <Link href="/supplier/orders" className="glass-card p-5 hover:border-blue-500/10 transition-all">
          <div className="text-xl mb-2">🛒</div>
          <div className="font-bold text-sm text-white">Đơn hàng nhận</div>
          <div className="text-[11px] text-slate-500 mt-1">Xử lý đơn, xuất kho</div>
        </Link>
        <Link href="/messages" className="glass-card p-5 hover:border-blue-500/10 transition-all">
          <div className="text-xl mb-2">💬</div>
          <div className="font-bold text-sm text-white">Tin nhắn buyer</div>
          <div className="text-[11px] text-slate-500 mt-1">Trả lời báo giá, chốt đơn</div>
        </Link>
      </div>
    </div>
  );
}
