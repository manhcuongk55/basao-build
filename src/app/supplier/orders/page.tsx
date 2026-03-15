import Link from "next/link";
import { formatVnd } from "@/lib/data";

const ORDERS = [
  { id: "BSB-2026-X99", buyer: "Nguyễn Văn A", project: "Nhà phố 3 tầng – Q.1", items: [{ n: "Gạch 60×60 Foshan", q: "300 m²"}, {n: "Cửa nhôm 4 cánh", q: "1 bộ"}], value: 72_500_000, deposit: 21_750_000, status: "confirmed", date: "15/03/2026", address: "123 Lê Lợi, Q.1, TP.HCM", logistics: "Cainiao Network", eta: "27/03/2026" },
  { id: "BSB-2026-X87", buyer: "Trần Thị B", project: "Biệt thự Thảo Điền", items: [{n: "Cửa nhôm Foshan 4 cánh", q: "8 bộ"}], value: 34_000_000, deposit: 10_200_000, status: "shipped", date: "12/03/2026", address: "45 Nguyễn Văn Hưởng, Q.2", logistics: "J&T Express", eta: "22/03/2026" },
];
const ST: Record<string, { l: string; c: string }> = {
  confirmed: { l: "Đã xác nhận", c: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  shipped: { l: "Đang vận chuyển", c: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
};
export default function SupplierOrders() {
  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/supplier/dashboard" className="text-slate-400 hover:text-white text-sm">← Dashboard</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">ĐƠN HÀNG</span></div>
      </nav>
      <div className="space-y-6">
        {ORDERS.map(o => (
          <div key={o.id} className="glass-card p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-white">{o.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${ST[o.status].c}`}>{ST[o.status].l}</span>
                </div>
                <div className="text-slate-400 text-sm">{o.buyer} · {o.project}</div>
                <div className="text-xs text-slate-500 mt-1">Đặt ngày: {o.date} · ETA: <strong className="text-white">{o.eta}</strong></div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatVnd(o.value)}</div>
                <div className="text-xs text-slate-500">Đã cọc: <span className="text-amber-400 font-bold">{formatVnd(o.deposit)}</span> (Escrow)</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/[0.03] rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-2 uppercase tracking-widest">Sản phẩm</div>
                {o.items.map((it, i) => (
                  <div key={i} className="text-sm text-white">{it.n} <span className="text-slate-500">· {it.q}</span></div>
                ))}
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Địa chỉ giao</span><span className="text-white text-right max-w-[180px]">{o.address}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Đối tác logistics</span><span className="text-red-400 font-bold">{o.logistics}</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="premium-button py-2 px-5 text-sm">✅ Xác nhận đã xuất kho</button>
              <Link href="/track" className="px-5 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5">Theo dõi vận chuyển</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
