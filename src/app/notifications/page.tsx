"use client";

import { useState } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "order" | "payment" | "ncc" | "system" | "message" | "promo";
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "order", title: "Đơn #BB-2026-0341 đang giao", body: "Gạch Foshan 200m² đã xuất kho Cainiao. Dự kiến 12/03 → 24/03.", time: "2 giờ trước", read: false, link: "/track" },
  { id: "n2", type: "payment", title: "Escrow đã giữ cọc 30%", body: "58,890,000đ đã giữ an toàn cho đơn #BB-2026-0341. Giải ngân khi xác nhận nhận hàng.", time: "3 giờ trước", read: false, link: "/payment/history" },
  { id: "n3", type: "message", title: "TQ Building Direct đã trả lời", body: "\"Giá gạch 60×60 hiện tại 172,000đ cho đơn 200m² trở lên...\"", time: "5 giờ trước", read: false, link: "/messages" },
  { id: "n4", type: "ncc", title: "NCC mới: Thiết Bị Inax VN", body: "Nhà cung cấp thiết bị vệ sinh Inax đã xác minh MST. Xem sản phẩm mới.", time: "1 ngày trước", read: true, link: "/suppliers" },
  { id: "n5", type: "promo", title: "Flash Sale: Sàn gỗ giảm 15%", body: "Sàn gỗ công nghiệp 12mm AC5 từ 210,000đ → 178,500đ/m². Đến 20/03.", time: "1 ngày trước", read: true, link: "/products/p12" },
  { id: "n6", type: "order", title: "Đơn #BB-2026-0339 đã giao", body: "Nhà xưởng Bình Dương — 82,000,000đ. Xác nhận nhận hàng để giải ngân.", time: "2 ngày trước", read: true, link: "/track" },
  { id: "n7", type: "system", title: "Cập nhật: So sánh SP mới", body: "Tính năng so sánh sản phẩm side-by-side đã sẵn sàng. Thử ngay!", time: "3 ngày trước", read: true, link: "/compare" },
  { id: "n8", type: "payment", title: "Escrow giải ngân thành công", body: "45,200,000đ đã chuyển cho NCC Kim Khí Việt Tiệp. Đơn #BB-2026-0338.", time: "4 ngày trước", read: true, link: "/payment/history" },
  { id: "n9", type: "ncc", title: "Yongkang Hardware cập nhật giá", body: "Tay nắm tủ hợp kim nhôm 128mm giảm từ 25,000đ → 22,000đ/cái.", time: "5 ngày trước", read: true, link: "/products/p20" },
  { id: "n10", type: "promo", title: "AI Agent mới: Bóc tách BoM", body: "Nhập mô tả dự án bằng tiếng Việt → AI tự sinh BoM 8 hạng mục.", time: "1 tuần trước", read: true, link: "/agent" },
];

const TYPE_MAP: Record<string, { icon: string; color: string; label: string }> = {
  order: { icon: "📦", color: "text-blue-400 bg-blue-500/10", label: "Đơn hàng" },
  payment: { icon: "💳", color: "text-emerald-400 bg-emerald-500/10", label: "Thanh toán" },
  ncc: { icon: "🏭", color: "text-amber-400 bg-amber-500/10", label: "NCC" },
  system: { icon: "⚙️", color: "text-slate-400 bg-slate-500/10", label: "Hệ thống" },
  message: { icon: "💬", color: "text-cyan-400 bg-cyan-500/10", label: "Tin nhắn" },
  promo: { icon: "🔥", color: "text-rose-400 bg-rose-500/10", label: "Khuyến mãi" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-xl">🔔 Thông báo</h1>
          <div className="text-xs text-slate-500 mt-1">{unreadCount} chưa đọc</div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-blue-400 hover:text-blue-300">Đánh dấu tất cả đã đọc</button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[{ key: "all", label: "Tất cả" }, ...Object.entries(TYPE_MAP).map(([k, v]) => ({ key: k, label: v.icon + " " + v.label }))].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${filter === f.key ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:text-white"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map(n => {
          const t = TYPE_MAP[n.type];
          return (
            <Link key={n.id} href={n.link || "#"} onClick={() => markRead(n.id)}
              className={`block glass-card p-4 transition-all hover:border-blue-500/10 ${!n.read ? "border-l-2 border-l-blue-500 bg-blue-500/[0.02]" : ""}`}
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${t.color}`}>{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className={`font-bold text-sm ${!n.read ? "text-white" : "text-slate-300"}`}>{n.title}</h3>
                    <span className="text-[10px] text-slate-600 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                </div>
                {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
