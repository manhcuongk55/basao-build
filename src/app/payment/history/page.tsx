import Link from "next/link";
import { formatVnd } from "@/lib/data";

const HISTORY = [
  { id: "BSB-TXN-001", order: "BSB-2026-X99", type: "Tiền cọc 30%", amount: 48_390_000, method: "Chuyển khoản", status: "escrow", date: "15/03/2026" },
  { id: "BSB-TXN-002", order: "BSB-2026-X81", type: "Thanh toán đầy đủ", amount: 95_000_000, method: "MoMo", status: "released", date: "01/03/2026" },
  { id: "BSB-TXN-003", order: "BSB-2026-X67", type: "Hoàn tiền", amount: -15_000_000, method: "Hoàn trả", status: "refunded", date: "20/02/2026" },
];
const ST: Record<string, { l: string; c: string }> = {
  escrow: { l: "Đang giữ (Escrow)", c: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  released: { l: "Đã giải ngân", c: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  refunded: { l: "Đã hoàn tiền", c: "text-red-400 bg-red-500/10 border-red-500/20" },
};
export default function PaymentHistory() {
  const net = HISTORY.reduce((s, t) => s + t.amount, 0);
  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-4xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/payment" className="text-slate-400 hover:text-white text-sm">← Thanh toán</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-emerald-400">LỊCH SỬ</span></div>
      </nav>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { v: formatVnd(128_390_000), l: "Tổng đã thanh toán", c: "text-white" },
          { v: formatVnd(48_390_000), l: "Đang trong Escrow", c: "text-amber-400" },
          { v: formatVnd(15_000_000), l: "Đã hoàn trả", c: "text-red-400" },
        ].map((s, i) => <div key={i} className="glass-card p-5 text-center"><div className={`text-xl font-bold ${s.c}`}>{s.v}</div><div className="text-xs text-slate-500 mt-1">{s.l}</div></div>)}
      </div>
      <div className="glass-card p-8 space-y-3">
        <h2 className="text-xl font-bold mb-4">Giao dịch</h2>
        {HISTORY.map(t => (
          <div key={t.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-white text-sm font-bold">{t.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${ST[t.status].c}`}>{ST[t.status].l}</span>
              </div>
              <div className="text-sm text-slate-400 mt-1">{t.type} · {t.order} · {t.method}</div>
              <div className="text-xs text-slate-500">{t.date}</div>
            </div>
            <div className={`text-lg font-bold ${t.amount < 0 ? "text-red-400" : "text-white"}`}>{t.amount < 0 ? "-" : "+"}{formatVnd(Math.abs(t.amount))}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
