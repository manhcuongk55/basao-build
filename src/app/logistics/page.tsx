"use client";
import Link from "next/link";
import { useState } from "react";

const CN_PARTNERS = [
  {
    id: "cainiao", name: "Cainiao Network", logo: "🟠", desc: "Mạng logistics của Alibaba – hơn 50 tuyến xuyên biên giới TQ → VN",
    transit: "10–14 ngày", rate: "28.000 đ/kg", coverage: "Toàn quốc", verified: true,
    features: ["Kho tự động Quảng Đông", "Theo dõi real-time", "Hải quan nhanh 24h", "Bảo hiểm hàng hóa"],
  },
  {
    id: "jt", name: "J&T Express Xuyên Biên Giới", logo: "🔴", desc: "Chuyên hàng thương mại TQ → VN, tích hợp với mọi sàn TMĐT lớn",
    transit: "7–10 ngày", rate: "32.000 đ/kg", coverage: "Toàn quốc", verified: true,
    features: ["Giao hàng D2D (door to site)", "Theo dõi RFID", "Lấy hàng tận kho TQ", "Thanh toán hải quan tự động"],
  },
  {
    id: "yto", name: "YTO Express", logo: "🟡", desc: "Đặc chuyên vật liệu nặng: gạch, thép, thiết bị xây dựng",
    transit: "12–18 ngày", rate: "22.000 đ/kg", coverage: "TP.HCM, HN, ĐN", verified: false,
    features: ["Phù hợp hàng cồng kềnh", "Container LCL/FCL", "Xe nâng tại công trình", "Giá rẻ nhất thị trường"],
  },
];

const BOOK_STEPS = [
  "Đặt hàng trên Basao Build",
  "Nhà cung cấp TQ đóng gói & giao kho Cainiao/J&T",
  "Hải quan xuất khẩu TQ (~1 ngày)",
  "Vận chuyển đường biển / đường bộ (~8–12 ngày)",
  "Hải quan nhập khẩu VN (~1–2 ngày)",
  "Giao đến công trình (trong VN ~1–3 ngày)",
];

export default function LogisticsPage() {
  const [selected, setSelected] = useState("cainiao");
  const [booked, setBooked] = useState(false);

  const partner = CN_PARTNERS.find(p => p.id === selected)!;

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-red-400">LOGISTICS 🇨🇳→🇻🇳</span></div>
        <Link href="/track" className="text-slate-400 text-sm hover:text-white">Theo dõi đơn →</Link>
      </nav>

      {/* Banner */}
      <div className="glass-card p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 blur-[80px] rounded-full" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            Tích hợp đối tác logistics TQ
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Kho TQ → Công trình VN</h1>
          <p className="text-slate-400 max-w-2xl">Basao Build tích hợp trực tiếp với các đối tác logistics hàng đầu TQ. Hàng nhập khẩu được theo dõi real-time, thông quan nhanh, giao thẳng đến công trình.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Partner selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Đối tác vận chuyển</h2>
          {CN_PARTNERS.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${selected === p.id ? "border-red-500/40 bg-red-500/5" : "border-white/10 hover:border-white/20 glass-card"}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.logo}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    {p.verified && <span className="text-[10px] text-emerald-400">✓ Đối tác xác minh</span>}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${selected === p.id ? "border-red-500 bg-red-500" : "border-white/20"}`} />
              </div>
              <div className="text-xs text-slate-500 mb-3">{p.desc}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["⏱", p.transit], ["💰", p.rate], ["📍", p.coverage]].map(([icon, v], i) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg py-1.5 px-2">
                    <div className="text-[10px] text-slate-500 mb-0.5">{icon}</div>
                    <div className="text-xs font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Detail & booking */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Tính năng & Đặt lịch</h2>

          <div className="glass-card p-6">
            <div className="font-bold text-white mb-4">Dịch vụ của {partner.name}</div>
            <div className="space-y-2">
              {partner.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 text-xs">✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div className="glass-card p-6 space-y-4">
            <div className="font-bold text-white">Thông tin lô hàng từ TQ</div>
            {[
              { l: "Địa chỉ kho TQ", val: "Số 88, Khu CN Nanhai, Quảng Đông" },
              { l: "Loại hàng", val: "Gạch 60×60 Foshan Premium + Cửa nhôm" },
              { l: "Khối lượng ước tính", val: "3.2 Tấn (300m² gạch + 4 bộ cửa)" },
              { l: "Địa chỉ công trình VN", val: "123 Lê Lợi, Q.1, TP.HCM" },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">{f.l}</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm">{f.val}</div>
              </div>
            ))}

            <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
              <div className="text-xs text-slate-400 mb-3">Ước tính cho đơn BSB-2026-X99</div>
              {[
                ["Đối tác", partner.name],
                ["Thời gian transit", partner.transit],
                ["Phí vận chuyển ước tính", "2.800.000 đ (TQ – VN)"],
                ["Phí thông quan", "1.200.000 đ"],
                ["Bảo hiểm hàng hóa", "800.000 đ"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-white/5 text-sm">
                  <span className="text-slate-500">{k}</span>
                  <span className="text-white font-bold">{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 font-bold">
                <span className="text-slate-300">Tổng phí logistics</span>
                <span className="text-red-400">4.800.000 đ</span>
              </div>
            </div>

            {!booked ? (
              <button onClick={() => setBooked(true)} className="premium-button w-full py-3">🚢 Đặt lịch vận chuyển</button>
            ) : (
              <div className="text-center p-6 border border-emerald-500/20 rounded-2xl bg-emerald-500/5">
                <div className="text-3xl mb-2">🎉</div>
                <div className="font-bold text-emerald-400">Đã đặt lịch thành công!</div>
                <div className="text-sm text-slate-400 mt-1">{partner.name} sẽ liên hệ nhà máy Foshan trong 2h.</div>
                <Link href="/track" className="text-blue-400 text-sm hover:underline mt-2 block">Theo dõi ngay →</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flow */}
      <div className="glass-card p-8 mt-8">
        <h2 className="text-xl font-bold mb-6">Hành trình vận chuyển xuyên biên giới</h2>
        <div className="flex flex-wrap gap-3 items-center">
          {BOOK_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                <div className="text-[10px] text-slate-400 text-center mt-2 max-w-[80px] leading-tight">{s}</div>
              </div>
              {i < BOOK_STEPS.length - 1 && <div className="text-slate-700 text-xl mt-[-16px]">→</div>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
