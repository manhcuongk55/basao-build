"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, formatVnd, CATEGORIES } from "@/lib/data";

export default function AdminPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  // Mock analytics data
  const stats = {
    "7d":  { revenue: 892_000_000, orders: 34, newNcc: 3, newBuyers: 48, conversion: 8.2, avgOrder: 26_200_000 },
    "30d": { revenue: 3_240_000_000, orders: 127, newNcc: 12, newBuyers: 186, conversion: 9.1, avgOrder: 25_500_000 },
    "90d": { revenue: 8_760_000_000, orders: 342, newNcc: 28, newBuyers: 520, conversion: 8.8, avgOrder: 25_600_000 },
  };
  const s = stats[period];

  const topProducts = [
    { name: "Gạch 60×60 Foshan Premium", category: "Gạch & Đá", orders: 45, revenue: 810_000_000, growth: 23 },
    { name: "Sàn gỗ công nghiệp 12mm AC5", category: "Nội thất", orders: 38, revenue: 672_000_000, growth: 18 },
    { name: "Dây điện CVV 2×2.5mm²", category: "Điện nước", orders: 31, revenue: 387_500_000, growth: 42 },
    { name: "Bồn cầu 1 khối Inax", category: "Thiết bị nhà", orders: 28, revenue: 145_600_000, growth: 15 },
    { name: "Xi măng Hà Tiên PCB40", category: "Xi Măng & Vữa", orders: 27, revenue: 283_500_000, growth: -5 },
    { name: "Bản lề lá inox 4 inch", category: "Kim khí", orders: 24, revenue: 204_000_000, growth: 31 },
  ];

  const recentOrders = [
    { id: "#BB-2026-0341", buyer: "Nguyễn Văn Minh", project: "Nhà phố Q.7", total: 196_300_000, status: "shipping", date: "15/03" },
    { id: "#BB-2026-0340", buyer: "Trần Thị Lan", project: "Biệt thự Thảo Điền", total: 458_700_000, status: "escrow", date: "14/03" },
    { id: "#BB-2026-0339", buyer: "Phạm Dũng", project: "Nhà xưởng Bình Dương", total: 82_000_000, status: "delivered", date: "13/03" },
    { id: "#BB-2026-0338", buyer: "Lê Minh Tuấn", project: "Nhà cấp 4 Long An", total: 45_200_000, status: "delivered", date: "12/03" },
    { id: "#BB-2026-0337", buyer: "Võ Thanh Hải", project: "Căn hộ Vinhomes", total: 128_500_000, status: "processing", date: "12/03" },
  ];

  const orderStatusMap: Record<string, { label: string; color: string }> = {
    processing: { label: "Đang xử lý", color: "text-amber-400 bg-amber-500/10" },
    escrow: { label: "Escrow 🔒", color: "text-blue-400 bg-blue-500/10" },
    shipping: { label: "Đang giao", color: "text-cyan-400 bg-cyan-500/10" },
    delivered: { label: "Đã giao ✓", color: "text-emerald-400 bg-emerald-500/10" },
  };

  const categoryBreakdown = CATEGORIES.filter(c => c.key !== "all").map(c => {
    const products = MOCK_PRODUCTS.filter(p => p.category === c.key);
    const suppliers = MOCK_SUPPLIERS.filter(s => s.categories.includes(c.key));
    return { ...c, productCount: products.length, supplierCount: suppliers.length };
  });

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-7xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">ADMIN</span></div>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${period === p ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
            >
              {p === "7d" ? "7 ngày" : p === "30d" ? "30 ngày" : "90 ngày"}
            </button>
          ))}
        </div>
      </nav>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { v: formatVnd(s.revenue), l: "Doanh thu GMV", c: "text-emerald-400", icon: "💰" },
          { v: s.orders.toString(), l: "Đơn hàng", c: "text-blue-400", icon: "📦" },
          { v: formatVnd(s.avgOrder), l: "Đơn trung bình", c: "text-cyan-400", icon: "📊" },
          { v: s.newNcc.toString(), l: "NCC mới", c: "text-amber-400", icon: "🏭" },
          { v: s.newBuyers.toString(), l: "Buyer mới", c: "text-purple-400", icon: "👤" },
          { v: s.conversion + "%", l: "Tỷ lệ chuyển đổi", c: "text-rose-400", icon: "🎯" },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-4">
            <div className="text-xl mb-2">{kpi.icon}</div>
            <div className={`text-xl font-bold ${kpi.c}`}>{kpi.v}</div>
            <div className="text-[10px] text-slate-500 mt-1">{kpi.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="font-bold mb-4">📈 Top sản phẩm bán chạy</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left border-b border-white/5">
                  <th className="pb-3 font-normal">#</th>
                  <th className="pb-3 font-normal">Sản phẩm</th>
                  <th className="pb-3 font-normal text-right">Đơn</th>
                  <th className="pb-3 font-normal text-right">Doanh thu</th>
                  <th className="pb-3 font-normal text-right">Tăng trưởng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {topProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-all">
                    <td className="py-3 text-slate-500 font-mono">{i + 1}</td>
                    <td className="py-3">
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.category}</div>
                    </td>
                    <td className="py-3 text-right text-slate-300 font-mono">{p.orders}</td>
                    <td className="py-3 text-right font-bold text-white">{formatVnd(p.revenue)}</td>
                    <td className={`py-3 text-right text-sm font-bold ${p.growth > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {p.growth > 0 ? "↑" : "↓"} {Math.abs(p.growth)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="glass-card p-6">
          <h2 className="font-bold mb-4">📦 Danh mục</h2>
          <div className="space-y-3">
            {categoryBreakdown.map(c => (
              <div key={c.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span>{c.icon}</span>
                  <span className="text-sm text-white">{c.label}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {c.productCount} SP · {c.supplierCount} NCC
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <div className="text-sm text-slate-400">Tổng: <span className="text-white font-bold">{MOCK_PRODUCTS.length}</span> SP · <span className="text-white font-bold">{MOCK_SUPPLIERS.length}</span> NCC</div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="glass-card p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">🛒 Đơn hàng gần đây</h2>
          <Link href="/supplier/orders" className="text-xs text-blue-400 hover:underline">Xem tất cả →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-left border-b border-white/5">
                <th className="pb-3 font-normal">Mã đơn</th>
                <th className="pb-3 font-normal">Buyer</th>
                <th className="pb-3 font-normal">Dự án</th>
                <th className="pb-3 font-normal text-right">Giá trị</th>
                <th className="pb-3 font-normal text-right">Trạng thái</th>
                <th className="pb-3 font-normal text-right">Ngày</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {recentOrders.map(o => {
                const st = orderStatusMap[o.status];
                return (
                  <tr key={o.id} className="hover:bg-white/[0.02] transition-all">
                    <td className="py-3 text-blue-400 font-mono text-xs">{o.id}</td>
                    <td className="py-3 text-white font-semibold">{o.buyer}</td>
                    <td className="py-3 text-slate-400">{o.project}</td>
                    <td className="py-3 text-right font-bold text-white">{formatVnd(o.total)}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs">{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform health */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="glass-card p-6 border-l-4 border-l-emerald-500">
          <div className="text-emerald-400 font-bold text-sm mb-2">🟢 Escrow Health</div>
          <div className="text-2xl font-bold text-white mb-1">{formatVnd(1_280_000_000)}</div>
          <div className="text-xs text-slate-500">Tổng tiền đang giữ Escrow · 18 đơn active</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-blue-500">
          <div className="text-blue-400 font-bold text-sm mb-2">🚚 Logistics TQ</div>
          <div className="text-2xl font-bold text-white mb-1">6 đơn</div>
          <div className="text-xs text-slate-500">Đang vận chuyển từ TQ · Avg 12 ngày</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-amber-500">
          <div className="text-amber-400 font-bold text-sm mb-2">⏳ NCC Pending</div>
          <div className="text-2xl font-bold text-white mb-1">4 NCC</div>
          <div className="text-xs text-slate-500">Đang chờ xác minh MST · Avg 18h</div>
        </div>
      </div>
    </main>
  );
}
