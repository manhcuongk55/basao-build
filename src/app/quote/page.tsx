"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectInputs, generateQuote, formatVnd, QuoteLineItem } from "@/lib/data";

const PROJECT_TYPES: ProjectInputs["type"][] = ["Nhà phố", "Biệt thự", "Nhà cấp 4", "Căn hộ"];
const STANDARDS: ProjectInputs["standard"][] = ["Cơ bản", "Trung cấp", "Cao cấp"];

export default function QuotePage() {
  const [step, setStep] = useState<"input" | "result">("input");
  const [inputs, setInputs] = useState<ProjectInputs>({
    type: "Nhà phố",
    area: 80,
    floors: 3,
    standard: "Trung cấp",
  });
  const [quote, setQuote] = useState<QuoteLineItem[]>([]);

  function handleGenerate() {
    const q = generateQuote(inputs);
    setQuote(q);
    setStep("result");
  }

  const totalVnd = quote.reduce((s, i) => s + i.totalVnd, 0);
  const cnItems = quote.filter(i => i.product.origin === "CN");
  const cnTotal = cnItems.reduce((s, i) => s + i.totalVnd, 0);
  const savings = cnTotal * 0.15; // estimated 15% savings vs buying locally

  return (
    <main className="min-h-screen px-6 py-10 pt-20 max-w-5xl mx-auto">
      {/* Nav */}
      <nav className="mb-10 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">AI BÁO GIÁ</span></div>
        <Link href="/suppliers" className="text-slate-400 hover:text-white text-sm">Nhà cung cấp →</Link>
      </nav>

      {step === "input" && (
        <div className="glass-card p-10 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Nhập thông số dự án</h1>
          <p className="text-slate-400 mb-8 text-sm">AI sẽ tự động chọn vật liệu tối ưu từ nhà cung cấp VN &amp; TQ.</p>

          <div className="space-y-8">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 block">Loại công trình</label>
              <div className="grid grid-cols-2 gap-3">
                {PROJECT_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setInputs(p => ({ ...p, type: t }))}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${inputs.type === t ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Diện tích mỗi tầng (m²)</label>
                <input
                  type="number"
                  value={inputs.area}
                  onChange={e => setInputs(p => ({ ...p, area: +e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-bold focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 block">Số tầng</label>
                <input
                  type="number"
                  value={inputs.floors}
                  onChange={e => setInputs(p => ({ ...p, floors: +e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-bold focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 block">Tiêu chuẩn hoàn thiện</label>
              <div className="grid grid-cols-3 gap-3">
                {STANDARDS.map(s => (
                  <button
                    key={s}
                    onClick={() => setInputs(p => ({ ...p, standard: s }))}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${inputs.standard === s ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:border-white/30"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-sm text-slate-400">
              📐 Tổng diện tích sàn: <span className="text-white font-bold">{inputs.area * inputs.floors} m²</span>
            </div>

            <button onClick={handleGenerate} className="premium-button w-full py-4 text-lg">
              🤖 Tạo báo giá tự động
            </button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="glass-card p-8 border-l-4 border-l-blue-500">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div>
                <div className="text-sm text-slate-400 mb-1">Báo giá cho: <span className="text-white font-semibold">{inputs.type} {inputs.floors} tầng · {inputs.area * inputs.floors}m² · {inputs.standard}</span></div>
                <h2 className="text-4xl font-bold text-white">Tổng: <span className="text-blue-400">{formatVnd(totalVnd)}</span></h2>
                <div className="text-sm text-emerald-400 mt-1">💡 Tiết kiệm ước tính {formatVnd(savings)} so với mua qua đại lý</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("input")} className="px-5 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5">Chỉnh sửa</button>
                <Link href="/order" className="premium-button py-2 px-6 text-sm">Đặt hàng →</Link>
              </div>
            </div>
          </div>

          {/* Quote line items */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6">Danh mục vật liệu (BoM)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 text-left border-b border-white/5">
                    <th className="pb-3 font-normal">Vật liệu</th>
                    <th className="pb-3 font-normal text-right">Nguồn</th>
                    <th className="pb-3 font-normal text-right">Số lượng</th>
                    <th className="pb-3 font-normal text-right">Đơn giá</th>
                    <th className="pb-3 font-normal text-right">Thành tiền</th>
                    <th className="pb-3 font-normal text-right">Giao hàng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {quote.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-all">
                      <td className="py-3">
                        <div className="font-semibold text-white">{item.product.name}</div>
                        <div className="text-xs text-slate-500">{item.product.supplierName}</div>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.product.origin === "CN" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                          {item.product.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-300 font-mono">{item.quantity} {item.product.unit}</td>
                      <td className="py-3 text-right text-slate-400">{formatVnd(item.product.priceVnd)}</td>
                      <td className="py-3 text-right font-bold text-white">{formatVnd(item.totalVnd)}</td>
                      <td className="py-3 text-right text-emerald-400 text-xs">{item.product.leadDays} ngày</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10">
                    <td colSpan={4} className="pt-4 text-slate-400">Tổng cộng</td>
                    <td className="pt-4 text-right text-xl font-bold text-blue-400">{formatVnd(totalVnd)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Logistics info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6 border border-emerald-500/10">
              <div className="text-sm font-bold text-emerald-400 mb-2">🇻🇳 Hàng VN</div>
              <div className="text-slate-400 text-sm">Giao trực tiếp từ kho nhà máy. Thời gian: <strong className="text-white">2–5 ngày</strong>.</div>
            </div>
            <div className="glass-card p-6 border border-red-500/10">
              <div className="text-sm font-bold text-red-400 mb-2">🇨🇳 Hàng TQ nhập khẩu</div>
              <div className="text-slate-400 text-sm">Tập kết tại kho Quảng Đông → vận chuyển thương mại → giao tận công trình. Thời gian: <strong className="text-white">12–15 ngày</strong>.</div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link href="/track" className="px-6 py-3 border border-white/10 rounded-full text-sm hover:bg-white/5">Theo dõi đơn</Link>
            <Link href="/order" className="premium-button py-3 px-8">Xác nhận & Đặt hàng</Link>
          </div>
        </div>
      )}
    </main>
  );
}
