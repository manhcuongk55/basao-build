"use client";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["Sơn", "Gạch & Đá", "Xi Măng & Vữa", "Thiết bị", "Thép & Nhôm", "Nội thất", "Điện nước"];
const UNITS = ["m²", "m³", "kg", "Tấn", "Bộ", "Cái", "Thùng 18L", "Bao 50kg", "Cuộn", "m dài"];

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: "", category: CATEGORIES[0], origin: "CN", price: "", unit: UNITS[0],
    moq: "", leadDays: "", stock: "", description: "", certified: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-4xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/supplier/dashboard" className="text-slate-400 hover:text-white text-sm">← Dashboard</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">ĐĂNG SẢN PHẨM</span></div>
        <span className="text-xs text-slate-500">TQ Building Direct</span>
      </nav>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Thông tin sản phẩm</h2>
          <div className="space-y-5">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">Tên sản phẩm *</label>
              <input
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="VD: Gạch 60×60 Foshan Premium"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">Danh mục *</label>
                <select
                  value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">Xuất xứ *</label>
                <div className="flex gap-3 h-[54px]">
                  {["VN", "CN"].map(o => (
                    <button key={o} onClick={() => setForm(p => ({...p, origin: o}))}
                      className={`flex-1 rounded-xl border text-sm font-bold transition-all ${form.origin === o ? (o === "CN" ? "bg-red-600/20 border-red-500 text-red-300" : "bg-blue-600/20 border-blue-500 text-blue-300") : "border-white/10 text-slate-400 hover:border-white/30"}`}>
                      {o === "CN" ? "🇨🇳 Trung Quốc" : "🇻🇳 Việt Nam"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">Mô tả sản phẩm</label>
              <textarea
                value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))}
                rows={3} placeholder="Đặc tính kỹ thuật, tiêu chuẩn chất lượng, ứng dụng..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & inventory */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Giá & Tồn kho</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Đơn giá (VNĐ) *", key: "price", placeholder: "180000" },
              { label: "Đơn vị *", key: "unit", isSelect: true },
              { label: "Số lượng tối thiểu (MOQ)", key: "moq", placeholder: "100" },
              { label: "Tồn kho hiện tại", key: "stock", placeholder: "5000" },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">{f.label}</label>
                {f.isSelect ? (
                  <select
                    value={form.unit} onChange={e => setForm(p => ({...p, unit: e.target.value}))}
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                  >
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                ) : (
                  <input
                    type="number" value={(form as any)[f.key]} placeholder={f.placeholder}
                    onChange={e => setForm(p => ({...p, [f.key!]: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">Thời gian giao hàng (ngày)</label>
            <div className="flex gap-3">
              {["7", "10", "12", "15", "20"].map(d => (
                <button key={d} onClick={() => setForm(p => ({...p, leadDays: d}))}
                  className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${form.leadDays === d ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}>
                  {d} ngày
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Hình ảnh sản phẩm</h2>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`aspect-square rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all
                ${i === 0 ? "border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10" : "border-white/10 hover:border-white/20 bg-white/[0.02]"}`}>
                <div className="text-center">
                  <div className="text-2xl mb-1">{i === 0 ? "📷" : "+"}</div>
                  <div className="text-[10px] text-slate-500">{i === 0 ? "Ảnh chính" : "Thêm ảnh"}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-500 mt-3">Tối đa 8 ảnh · JPG/PNG · Tối thiểu 800×800px</div>
        </div>

        {/* Certification */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <div className="font-bold text-white">Xác minh Basao Build (7 Lớp Sự Thật)</div>
            <div className="text-xs text-slate-400 mt-1">Sản phẩm đã qua kiểm định → tăng 3× tỷ lệ chuyển đổi</div>
          </div>
          <button
            onClick={() => setForm(p => ({...p, certified: !p.certified}))}
            className={`w-14 h-7 rounded-full transition-all relative ${form.certified ? "bg-emerald-500" : "bg-white/10"}`}>
            <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${form.certified ? "left-8" : "left-1"}`} />
          </button>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <button onClick={handleSave}
            className={`flex-1 py-4 rounded-full font-bold text-lg transition-all ${saved ? "bg-emerald-600 text-white" : "premium-button"}`}>
            {saved ? "✅ Đã lưu thành công!" : "Đăng sản phẩm"}
          </button>
          <button className="px-8 py-4 border border-white/10 rounded-full hover:bg-white/5 text-slate-400">
            Lưu nháp
          </button>
        </div>

        {saved && (
          <div className="glass-card p-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm">
            ✅ Sản phẩm đã được đăng thành công! Đang chờ duyệt trong 2–4 giờ.{" "}
            <Link href="/supplier/products" className="underline">Xem danh sách →</Link>
          </div>
        )}
      </div>
    </main>
  );
}
