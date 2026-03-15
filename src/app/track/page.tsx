import Link from "next/link";

const TRACKING_STEPS = [
  { label: "Đơn hàng xác nhận", time: "15/03/2026 – 10:32", done: true, icon: "✅", detail: "Nhà cung cấp đã nhận và xác nhận đơn hàng." },
  { label: "Xuất kho nhà máy", time: "15/03/2026 – 14:00", done: true, icon: "🏭", detail: "Hàng VN: Xi Măng, Sơn – đã xuất kho TP.HCM." },
  { label: "Đang vận chuyển trong nước", time: "16/03/2026 – 08:15", done: true, icon: "🚛", detail: "Xe tải 8 tấn đang trên quốc lộ 1A. Dự kiến đến nơi lúc 17:00." },
  { label: "Tập kết kho Quảng Đông (TQ)", time: "15/03/2026 – 09:00", done: true, icon: "🇨🇳", detail: "Gạch Foshan và Cửa nhôm đã vào kho trung chuyển Quảng Đông." },
  { label: "Thông quan XK", time: "16/03/2026 – 11:30", done: true, icon: "📋", detail: "Hồ sơ hải quan đã được duyệt. Đang chờ lên container." },
  { label: "Đang vận chuyển quốc tế", time: "17/03/2026 – Dự kiến", done: false, icon: "🚢", detail: "Container lên tàu, dự kiến đến cảng Cát Lái – TP.HCM ngày 24/03." },
  { label: "Thông quan NK tại VN", time: "24/03/2026 – Dự kiến", done: false, icon: "🛃", detail: "" },
  { label: "Giao đến công trình", time: "26/03/2026 – Dự kiến", done: false, icon: "📍", detail: "Giao đến: 123 Đường Lê Lợi, Q.1, TP.HCM." },
];

export default function TrackPage() {
  const doneCount = TRACKING_STEPS.filter(s => s.done).length;
  const progress = Math.round((doneCount / TRACKING_STEPS.length) * 100);

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-emerald-400">THEO DÕI ĐƠN</span></div>
        <Link href="/quote" className="premium-button py-2 px-5 text-sm">Báo giá mới</Link>
      </nav>

      {/* Order header */}
      <div className="glass-card p-8 mb-8 border-l-4 border-l-blue-500">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-widest">Mã đơn hàng</div>
            <div className="font-mono text-xl font-bold text-white">BSB-2026-X99</div>
            <div className="text-sm text-slate-400 mt-2">Nhà phố 3 tầng · 80m² · Trung cấp</div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">247.3M</div>
              <div className="text-xs text-slate-500">Giá trị đơn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{progress}%</div>
              <div className="text-xs text-slate-500">Hoàn thành</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Xác nhận đơn</span>
            <span>Giao đến công trình</span>
          </div>
        </div>
      </div>

      {/* Shipment split */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-6 border border-blue-500/10">
          <div className="font-bold text-blue-400 mb-1 text-sm">🇻🇳 Lô hàng VN</div>
          <div className="text-white font-semibold">Xi Măng + Sơn</div>
          <div className="text-xs text-slate-500 mt-1">Đang giao · Dự kiến: <strong className="text-white">hôm nay 17:00</strong></div>
        </div>
        <div className="glass-card p-6 border border-red-500/10">
          <div className="font-bold text-red-400 mb-1 text-sm">🇨🇳 Lô hàng TQ (đường biển)</div>
          <div className="text-white font-semibold">Gạch Foshan + Cửa Nhôm</div>
          <div className="text-xs text-slate-500 mt-1">Trên biển · Dự kiến: <strong className="text-white">24/03/2026</strong></div>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card p-8">
        <h2 className="text-xl font-bold mb-8">Hành trình vận chuyển</h2>
        <div className="relative space-y-0">
          <div className="absolute left-5 top-3 bottom-3 w-px bg-white/5"></div>
          {TRACKING_STEPS.map((step, i) => (
            <div key={i} className={`relative pl-14 pb-8 ${i === TRACKING_STEPS.length - 1 ? "pb-0" : ""}`}>
              {/* dot */}
              <div className={`absolute left-[13px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]
                ${step.done
                  ? "bg-emerald-500 shadow-[0_0_12px_theme(colors.emerald.500)]"
                  : "bg-slate-800 border border-white/10"}`}>
                {step.done ? "✓" : ""}
              </div>
              <div className={`${step.done ? "opacity-100" : "opacity-40"}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-lg">{step.icon}</span>
                  <span className={`font-bold ${step.done ? "text-white" : "text-slate-400"}`}>{step.label}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">{step.time}</div>
                {step.detail && <div className="text-sm text-slate-400">{step.detail}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
