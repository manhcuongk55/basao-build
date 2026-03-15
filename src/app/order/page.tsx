import Link from "next/link";
import { formatVnd } from "@/lib/data";

const ORDER_ITEMS = [
  { name: "Sơn ngoại thất Kova Nano", supplier: "Sơn Kova Vietnam 🇻🇳", qty: 6, unit: "Thùng 18L", price: 2_400_000 },
  { name: "Sơn nội thất Kova Silk", supplier: "Sơn Kova Vietnam 🇻🇳", qty: 14, unit: "Thùng 18L", price: 1_800_000 },
  { name: "Gạch 60×60 Foshan Premium", supplier: "TQ Building Direct 🇨🇳", qty: 300, unit: "m²", price: 180_000 },
  { name: "Xi Măng Hà Tiên PCB40", supplier: "Xi Măng Hà Tiên 1 🇻🇳", qty: 180, unit: "Bao 50kg", price: 105_000 },
  { name: "Thép CB300-V Ø14", supplier: "Foshan Steel & Alu 🇨🇳", qty: 12, unit: "Tấn", price: 14_200_000 },
];

export default function OrderPage() {
  const total = ORDER_ITEMS.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-4xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/quote" className="text-slate-400 hover:text-white text-sm">← Quay lại báo giá</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">XÁC NHẬN ĐƠN</span></div>
      </nav>

      <div className="space-y-6">
        {/* Delivery details */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Thông tin công trình</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Địa chỉ công trình</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white">123 Đường Lê Lợi, Quận 1, TP.HCM</div>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Liên hệ tại công trình</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white">Nguyễn Văn A – 0912 345 678</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Dự án</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white">Nhà phố 3 tầng – Quận 1</div>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Ghi chú</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-slate-500 italic">Cổng hẻm cao 2.5m. Giao sáng 7–11h.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Danh sách đặt hàng</h2>
          <div className="space-y-3">
            {ORDER_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div>
                  <div className="font-semibold text-white text-sm">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.supplier} · {item.qty} {item.unit}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{formatVnd(item.qty * item.price)}</div>
                  <div className="text-xs text-slate-500">{formatVnd(item.price)}/{item.unit}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 flex justify-between items-center">
            <div className="text-slate-400">Tổng cộng</div>
            <div className="text-3xl font-bold text-blue-400">{formatVnd(total)}</div>
          </div>
        </div>

        {/* Payment & logistics note */}
        <div className="glass-card p-6 bg-amber-500/[0.02] border-amber-500/10">
          <div className="text-sm font-bold text-amber-400 mb-3">📦 Ghi chú vận chuyển</div>
          <div className="text-slate-400 text-sm space-y-2">
            <p>🇻🇳 <strong className="text-white">Lô hàng VN</strong> (Sơn, Xi Măng): Giao trong 2–5 ngày sau khi xác nhận.</p>
            <p>🇨🇳 <strong className="text-white">Lô hàng TQ</strong> (Gạch, Thép): Tập kết kho Quảng Đông → đường biển → cảng Cát Lái → công trình. Tổng thời gian 12–15 ngày.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="premium-button flex-1 py-4 text-lg">✅ Xác nhận đặt hàng</button>
          <Link href="/track" className="flex-1 py-4 text-center rounded-full border border-white/10 hover:bg-white/5 transition-all">
            Theo dõi đơn hiện tại →
          </Link>
        </div>
      </div>
    </main>
  );
}
