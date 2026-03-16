"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/data";

const STYLES = [
  { id: "modern", name: "Hiện đại", multiplier: 1, desc: "Tối giản, kính, bê tông, màu trung tính" },
  { id: "classic", name: "Tân cổ điển", multiplier: 1.25, desc: "Phào chỉ, chi tiết cầu kỳ, sang trọng" },
  { id: "indochine", name: "Đông Dương (Indochine)", multiplier: 1.15, desc: "Họa tiết truyền thống, vật liệu tự nhiên" },
  { id: "minimalist", name: "Tối giản (Minimalist)", multiplier: 0.95, desc: "Hạn chế đồ đạc, tập trung công năng" },
];

const PACKAGES = [
  { id: "basic", name: "Tiết kiệm", pricePerM2: 5500000, desc: "Vật liệu tầm trung, bền, phổ thông" },
  { id: "standard", name: "Tiêu chuẩn", pricePerM2: 7000000, desc: "Vật liệu cao cấp, thương hiệu lớn" },
  { id: "premium", name: "Cao cấp", pricePerM2: 9500000, desc: "Vật liệu nhập khẩu, tinh xảo" },
];

export default function CostCalculatorPage() {
  const [area, setArea] = useState<number>(100);
  const [floors, setFloors] = useState<number>(2);
  const [style, setStyle] = useState(STYLES[0]);
  const [pkg, setPkg] = useState(PACKAGES[1]);
  const [includeFurniture, setIncludeFurniture] = useState(true);

  const totalArea = area * floors;
  const buildCost = totalArea * pkg.pricePerM2 * style.multiplier;
  const furnitureCost = includeFurniture ? buildCost * 0.15 : 0;
  const totalCost = buildCost + furnitureCost;

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-bold text-3xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Dự toán chi phí xây nhà 2026
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Công cụ tính toán sơ bộ dựa trên dữ liệu giá vật liệu thực tế từ 1,000+ NCC trên Basao Build. 
          Giúp bạn chuẩn bị tài chính tốt nhất trước khi bắt đầu.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-8">
          <section className="glass-card p-6 space-y-6">
            <h2 className="font-bold text-lg border-b border-white/5 pb-3">🏗️ Thông số công trình</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-bold">Diện tích sàn (m²)</label>
                <input 
                  type="number" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-bold">Số tầng</label>
                <input 
                  type="number" 
                  value={floors} 
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-slate-500 uppercase font-bold">Phong cách kiến trúc</label>
              <div className="grid grid-cols-2 gap-3">
                {STYLES.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setStyle(s)}
                    className={`p-4 rounded-xl border text-left transition-all ${style.id === s.id ? "bg-blue-600/10 border-blue-500" : "bg-white/5 border-white/10 hover:border-white/20"}`}
                  >
                    <div className="font-bold text-sm text-white">{s.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-slate-500 uppercase font-bold">Gói vật liệu & thi công</label>
              <div className="grid grid-cols-3 gap-3">
                {PACKAGES.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setPkg(p)}
                    className={`p-4 rounded-xl border text-center transition-all ${pkg.id === p.id ? "bg-blue-600/10 border-blue-500" : "bg-white/5 border-white/10 hover:border-white/20"}`}
                  >
                    <div className="font-bold text-sm text-white">{p.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{formatVnd(p.pricePerM2)}/m²</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="furniture" 
                checked={includeFurniture} 
                onChange={() => setIncludeFurniture(!includeFurniture)}
                className="w-4 h-4 rounded border-white/10 bg-white/5"
              />
              <label htmlFor="furniture" className="text-sm text-slate-300">Bao gồm nội thất cơ bản (ước tính +15%)</label>
            </div>
          </section>

          <section className="glass-card p-6 border-emerald-500/10">
            <h3 className="font-bold text-sm mb-4">💡 Mẹo tiết kiệm cùng Basao Build</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Đặt hàng trực tiếp từ NCC Foshan (Trung Quốc) có thể giảm 20-30% chi phí gạch & thiết bị vệ sinh.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                SỬ dụng AI Agent để bóc tách BoM chính xác giúp tránh lãng phí 10-15% vật tư tại công trình.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Chủ nhà tự quản lý vật tư qua Basao có thể tiết kiệm phí quản lý 5-7% so với thuê trọn gói.
              </li>
            </ul>
          </section>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 border-blue-500/20 bg-gradient-to-br from-blue-600/5 to-transparent sticky top-24">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-6">Tổng mức đầu tư</h2>
            <div className="text-4xl font-bold text-white mb-2">{formatVnd(totalCost)}</div>
            <div className="text-xs text-slate-500 mb-8 italic">* Giá trị ước tính dựa trên {totalArea}m² xây dựng</div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-slate-400">Chi phí thi công & phần thô</span>
                <span className="text-white font-mono">{formatVnd(buildCost * 0.4)}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-slate-400">Vật liệu hoàn thiện</span>
                <span className="text-white font-mono">{formatVnd(buildCost * 0.6)}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-slate-400">Nội thất rời</span>
                <span className="text-white font-mono">{formatVnd(furnitureCost)}</span>
              </div>
            </div>

            <Link href="/agent" className="premium-button w-full block text-center py-4 text-sm font-bold mb-3">
              🤖 Bóc tách BoM chi tiết cùng AI Agent
            </Link>
            <p className="text-[10px] text-slate-500 text-center">
              AI sẽ dựa trên hồ sơ thiết kế của bạn để đưa ra khối lượng vật tư chính xác và kết nối NCC giá gốc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
