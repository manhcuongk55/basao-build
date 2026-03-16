"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "homeowner" as "homeowner" | "contractor" | "designer",
    province: "",
    projectType: "",
  });

  const ROLES = [
    { key: "homeowner", label: "🏠 Chủ nhà", desc: "Đang xây hoặc sửa nhà" },
    { key: "contractor", label: "👷 Nhà thầu", desc: "Thi công nhiều công trình" },
    { key: "designer", label: "🎨 Thiết kế / Kiến trúc", desc: "Tư vấn & chọn vật liệu" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
  }

  if (step === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 max-w-lg text-center">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-3xl font-bold mb-4">Chào mừng, {form.fullName}!</h1>
          <p className="text-slate-400 mb-8">Tài khoản đã được tạo. Bắt đầu báo giá và đặt hàng vật liệu ngay.</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/quote" className="premium-button py-3 text-center">🧮 Báo giá ngay</Link>
            <Link href="/suppliers" className="py-3 border border-white/10 rounded-full text-sm hover:bg-white/5 text-center">Xem NCC</Link>
          </div>
          <Link href="/register/supplier" className="text-sm text-amber-400 hover:underline">Bạn là nhà cung cấp? Đăng ký NCC →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-2xl mx-auto">
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">ĐĂNG KÝ</span></div>
        <Link href="/register/supplier" className="text-amber-400 hover:text-amber-300 text-sm">Đăng ký NCC →</Link>
      </nav>

      <div className="glass-card p-10">
        <h1 className="text-3xl font-bold mb-2">Tạo tài khoản</h1>
        <p className="text-slate-400 text-sm mb-8">Đăng ký miễn phí — bắt đầu đặt vật liệu giá gốc.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Họ và tên *</label>
            <input required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="Nguyễn Văn A" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Số điện thoại *</label>
              <input required type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="0909 xxx xxx" />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="email@example.com" />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 block">Bạn là *</label>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(r => (
                <button key={r.key} type="button" onClick={() => setForm(p => ({ ...p, role: r.key as typeof form.role }))}
                  className={`py-4 px-3 rounded-xl border text-center transition-all ${form.role === r.key ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
                >
                  <div className="text-xl mb-1">{r.label.split(" ")[0]}</div>
                  <div className="text-xs font-bold">{r.label.split(" ").slice(1).join(" ")}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="premium-button w-full py-4 text-lg">
            Tạo tài khoản miễn phí
          </button>

          <p className="text-center text-xs text-slate-500">
            Đã có tài khoản? <span className="text-blue-400 cursor-pointer">Đăng nhập</span>
          </p>
        </form>
      </div>
    </main>
  );
}
