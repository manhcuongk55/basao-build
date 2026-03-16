"use client";

import { useState } from "react";
import Link from "next/link";

const SUPPLIER_CATEGORIES = [
  "Sơn", "Gạch & Đá", "Xi Măng & Vữa", "Thép & Nhôm", "Nội thất", "Kim khí", "Điện nước", "Thiết bị nhà"
];

const PROVINCES = [
  "TP.HCM", "Hà Nội", "Đà Nẵng", "Bình Dương", "Đồng Nai", "Long An", "Hải Phòng", "Quảng Ninh"
];

export default function SupplierRegisterPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    companyName: "",
    representative: "",
    phone: "",
    email: "",
    taxCode: "",
    province: "",
    address: "",
    categories: [] as string[],
    origin: "VN" as "VN" | "CN",
    description: "",
    website: "",
    certifications: false,
  });

  function toggleCategory(cat: string) {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
  }

  if (step === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 max-w-lg text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold mb-4">Đăng ký thành công!</h1>
          <p className="text-slate-400 mb-2">Chào mừng <span className="text-white font-semibold">{form.companyName}</span> gia nhập Basao Build.</p>
          <p className="text-slate-500 text-sm mb-8">
            Đội ngũ Basao sẽ xác minh thông tin trong vòng 24h. Bạn sẽ nhận email xác nhận tại <span className="text-blue-400">{form.email}</span>.
          </p>
          <div className="glass-card p-4 mb-8 text-left">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-bold">Quy trình xác minh</div>
            <div className="space-y-2 text-sm">
              {[
                { s: "✅", t: "Đăng ký thông tin" },
                { s: "🔄", t: "Xác minh MST & giấy phép (24h)" },
                { s: "⏳", t: "Kích hoạt Cổng NCC" },
                { s: "⏳", t: "Upload sản phẩm & bắt đầu bán" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{item.s}</span>
                  <span className={i === 0 ? "text-white" : "text-slate-500"}>{item.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 border border-white/10 rounded-full text-sm hover:bg-white/5">Trang chủ</Link>
            <Link href="/supplier/dashboard" className="premium-button py-3 px-8">Vào Cổng NCC →</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-3xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-amber-400">ĐĂNG KÝ NCC</span></div>
        <Link href="/register" className="text-slate-400 hover:text-white text-sm">Đăng ký mua hàng →</Link>
      </nav>

      <div className="glass-card p-4 mb-8 border-l-4 border-l-amber-500">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏭</span>
          <div>
            <div className="font-bold text-white text-sm">Trở thành Nhà Cung Cấp trên Basao Build</div>
            <div className="text-xs text-slate-400">Tiếp cận trực tiếp chủ nhà & nhà thầu trên toàn quốc. Không phí gia nhập.</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Info */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-300">Thông tin doanh nghiệp</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Tên công ty / hộ kinh doanh *</label>
              <input required value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="VD: Công ty TNHH Nội Thất Hòa Phát" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Người đại diện *</label>
                <input required value={form.representative} onChange={e => setForm(p => ({ ...p, representative: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="Họ và tên" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Mã số thuế *</label>
                <input required value={form.taxCode} onChange={e => setForm(p => ({ ...p, taxCode: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="0312345678" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Số điện thoại *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="0909 xxx xxx" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="info@company.vn" />
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-300">Địa chỉ & Khu vực</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Xuất xứ hàng hóa</label>
              <div className="grid grid-cols-2 gap-3">
                {(["VN", "CN"] as const).map(o => (
                  <button key={o} type="button" onClick={() => setForm(p => ({ ...p, origin: o }))}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${form.origin === o ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
                  >
                    {o === "VN" ? "🇻🇳 Sản xuất tại Việt Nam" : "🇨🇳 Nhập khẩu từ Trung Quốc"}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Tỉnh/TP *</label>
                <select required value={form.province} onChange={e => setForm(p => ({ ...p, province: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
                  <option value="">Chọn tỉnh</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Địa chỉ kho/showroom</label>
                <input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="Số nhà, đường, quận" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-300">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SUPPLIER_CATEGORIES.map(cat => (
              <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all text-left ${form.categories.includes(cat) ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
              >
                {form.categories.includes(cat) ? "✓ " : ""}{cat}
              </button>
            ))}
          </div>
        </section>

        {/* Extra */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-300">Thông tin bổ sung</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Mô tả doanh nghiệp</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Giới thiệu ngắn về doanh nghiệp, năng lực sản xuất, chứng nhận..." />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Website (nếu có)</label>
              <input value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="https://company.vn" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-12 h-6 rounded-full transition-all relative ${form.certifications ? "bg-blue-600" : "bg-white/10"}`}
                onClick={() => setForm(p => ({ ...p, certifications: !p.certifications }))}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.certifications ? "left-6" : "left-0.5"}`}></div>
              </div>
              <span className="text-sm text-slate-300">Tôi có giấy chứng nhận ISO / TCVN / CE</span>
            </label>
          </div>
        </section>

        <button type="submit" className="premium-button w-full py-4 text-lg">
          🚀 Đăng ký trở thành Nhà Cung Cấp
        </button>

        <p className="text-center text-xs text-slate-500">
          Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính sách Basao Build.
        </p>
      </form>
    </main>
  );
}
