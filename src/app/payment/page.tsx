"use client";
import Link from "next/link";
import { useState } from "react";
import { formatVnd, MOCK_PRODUCTS } from "@/lib/data";

// Mock BoM for demo
const ORDER_TOTAL = 161_300_000;
const DEPOSIT_PCT = 30;
const DEPOSIT = Math.round(ORDER_TOTAL * DEPOSIT_PCT / 100);
const REMAINING = ORDER_TOTAL - DEPOSIT;

const PAYMENT_METHODS = [
  { id: "bank", icon: "🏦", label: "Chuyển khoản ngân hàng", desc: "Vietcombank · Techcombank · MB Bank" },
  { id: "momo", icon: "💜", label: "Ví MoMo", desc: "Thanh toán nhanh qua QR" },
  { id: "credit", icon: "💳", label: "Build Credit (Nợ 0% lãi)", desc: "Trả sau khi nghiệm thu công trình" },
];

export default function PaymentPage() {
  const [method, setMethod] = useState("bank");
  const [paid, setPaid] = useState(false);

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-4xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/order" className="text-slate-400 hover:text-white text-sm">← Quay lại đơn hàng</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-emerald-400">THANH TOÁN</span></div>
        <Link href="/payment/history" className="text-slate-400 text-sm hover:text-white">Lịch sử →</Link>
      </nav>

      {!paid ? (
        <div className="space-y-6">
          {/* Escrow Banner */}
          <div className="glass-card p-6 border border-emerald-500/20 bg-emerald-500/[0.03]">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <div className="font-bold text-emerald-400 mb-1">Basao Escrow – Tiền giữ an toàn</div>
                <div className="text-slate-400 text-sm">Basao giữ tiền cọc đến khi hàng được xác nhận giao đến công trình. Nhà cung cấp chỉ nhận tiền sau khi anh/chị xác nhận.</div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng · <span className="font-mono text-blue-400">BSB-2026-X99</span></h2>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Giá trị BoM</span><span>{formatVnd(ORDER_TOTAL)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Phí vận chuyển & thông quan</span><span className="text-white">Đã bao gồm</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Phí nền tảng Basao</span><span className="text-emerald-400">Miễn phí</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                <span>Tổng cộng</span><span className="text-white">{formatVnd(ORDER_TOTAL)}</span>
              </div>
            </div>
          </div>

          {/* Staged payment */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-2">Lịch thanh toán</h2>
            <p className="text-slate-400 text-sm mb-6">Thanh toán theo 2 đợt – bảo vệ quyền lợi của anh/chị.</p>
            <div className="space-y-4">
              {[
                {
                  step: "Đợt 1 – Tiền cọc (ĐẶT HÀNG)",
                  pct: `${DEPOSIT_PCT}%`,
                  amount: DEPOSIT,
                  when: "Ngay hôm nay",
                  badge: "Thanh toán ngay",
                  color: "border-blue-500/30 bg-blue-500/5",
                  badgeColor: "bg-blue-600 text-white"
                },
                {
                  step: "Đợt 2 – Phần còn lại (KHI NHẬN HÀNG)",
                  pct: `${100 - DEPOSIT_PCT}%`,
                  amount: REMAINING,
                  when: "Sau khi xác nhận nhận hàng tại công trình",
                  badge: "Escrow – Chưa thu",
                  color: "border-white/10",
                  badgeColor: "bg-white/10 text-slate-400"
                },
              ].map((s, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${s.color}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">{s.step}</div>
                      <div className="text-xs text-slate-500 mt-1">{s.when}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{formatVnd(s.amount)}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${s.badgeColor}`}>{s.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${method === m.id ? "border-blue-500/50 bg-blue-500/5" : "border-white/10 hover:border-white/20"}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">{m.label}</div>
                    <div className="text-xs text-slate-500">{m.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 transition-all ${method === m.id ? "border-blue-500 bg-blue-500" : "border-white/20"}`} />
                </button>
              ))}
            </div>
          </div>

          {method === "bank" && (
            <div className="glass-card p-6 border border-blue-500/10">
              <div className="text-sm font-bold text-blue-400 mb-4">Thông tin chuyển khoản</div>
              <div className="space-y-2 text-sm font-mono">
                {[
                  ["Ngân hàng", "Vietcombank – Chi nhánh TP.HCM"],
                  ["Số tài khoản", "1234567890"],
                  ["Tên TK", "CONG TY TNHH BASAO BUILD"],
                  ["Số tiền", formatVnd(DEPOSIT)],
                  ["Nội dung", "COC BSB-2026-X99"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-500">{k}</span>
                    <span className="text-white font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {method === "momo" && (
            <div className="glass-card p-8 text-center border border-purple-500/10">
              <div className="text-6xl mb-4">📱</div>
              <div className="text-lg font-bold text-white mb-2">Quét mã QR để thanh toán</div>
              <div className="w-40 h-40 mx-auto bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-500 text-sm">QR Code Placeholder</div>
              <div className="text-sm text-slate-400 mt-4">Số tiền: <strong className="text-white">{formatVnd(DEPOSIT)}</strong></div>
            </div>
          )}

          {method === "credit" && (
            <div className="glass-card p-6 border border-amber-500/10 bg-amber-500/[0.03]">
              <div className="text-sm font-bold text-amber-400 mb-2">🏗️ Build Credit – Mua trước, trả sau</div>
              <div className="text-slate-400 text-sm space-y-2">
                <p>Hạn mức: <strong className="text-white">500M đ</strong> · Lãi suất 0% trong 60 ngày</p>
                <p>Điều kiện: Trust Score &gt; 80 · Đã hoàn thành ≥ 2 dự án trên Basao</p>
                <p>Phê duyệt trong: <strong className="text-white">2 giờ làm việc</strong></p>
              </div>
            </div>
          )}

          <button onClick={() => setPaid(true)} className="premium-button w-full py-4 text-lg">
            💳 Xác nhận đặt cọc {formatVnd(DEPOSIT)} ({DEPOSIT_PCT}%)
          </button>
        </div>
      ) : (
        <div className="glass-card p-12 text-center border border-emerald-500/20">
          <div className="text-6xl mb-6 animate-bounce">✅</div>
          <h2 className="text-3xl font-bold text-white mb-3">Thanh toán thành công!</h2>
          <p className="text-slate-400 mb-2">Đã đặt cọc <strong className="text-white">{formatVnd(DEPOSIT)}</strong> vào Basao Escrow.</p>
          <p className="text-slate-500 text-sm mb-8">Nhà cung cấp sẽ nhận tiền sau khi anh/chị xác nhận nhận hàng.</p>
          <div className="glass-card p-4 text-left mb-8 border border-emerald-500/10">
            {[["Mã giao dịch", "BSB-TXN-20260315-001"], ["Số tiền", formatVnd(DEPOSIT)], ["Trạng thái", "Escrow – Đang giữ"], ["Ngày", "15/03/2026 – 20:15"]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-slate-400">{k}</span><span className="text-white font-bold font-mono">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/track" className="premium-button py-3 px-8">Theo dõi đơn →</Link>
            <Link href="/payment/history" className="px-8 py-3 border border-white/10 rounded-full hover:bg-white/5">Lịch sử TT</Link>
          </div>
        </div>
      )}
    </main>
  );
}
