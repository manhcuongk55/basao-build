"use client";

import Link from "next/link";
import { formatVnd } from "@/lib/data";

const SHOWCASE_PROJECTS = [
  {
    id: 1,
    title: "Minimalist Villa - Thảo Điền",
    type: "Biệt thự phố",
    area: "320m²",
    location: "Quận 2, TP.HCM",
    savings: "420,000,000đ",
    investment: "5.2 tỷ",
    tags: ["Foshan Tiles", "Aluminum Doors", "Smart Home"],
    description: "Công trình sử dụng 100% gạch ốp lát và cửa nhôm nhập khẩu trực tiếp từ NCC Foshan qua Basao Build. Tiết kiệm 35% so với báo giá đại lý nội địa.",
    status: "Hoàn thiện 2025"
  },
  {
    id: 2,
    title: "Penthouse Horizon",
    type: "Căn hộ cao cấp",
    area: "145m²",
    location: "Quận 7, TP.HCM",
    savings: "135,000,000đ",
    investment: "2.1 tỷ",
    tags: ["Interior", "Lighting", "BPT Land"],
    description: "Nội thất gỗ óc chó và hệ thống chiếu sáng thông minh được cung cấp bởi các NCC Việt Nam xác minh ✓ trên nền tảng.",
    status: "Hoàn thiện 2026"
  },
  {
    id: 3,
    title: "Nhà phố Indochine",
    type: "Nhà phố",
    area: "210m²",
    location: "Hải Châu, Đà Nẵng",
    savings: "185,000,000đ",
    investment: "3.4 tỷ",
    tags: ["Ceramics", "Wood Flooring", "Hardware"],
    description: "Sự kết hợp hoàn hảo giữa vật liệu truyền thống Việt Nam và phụ kiện kim khí Yongkang (Trung Quốc).",
    status: "Hoàn thiện 2026"
  }
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-bold text-3xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
          Công trình thực tế (Showcase)
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Cảm hứng từ những công trình đã hoàn thiện sử dụng giải pháp vật tư từ Basao Build. 
          Minh chứng cho sự TIẾT KIỆM và CHẤT LƯỢNG.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {SHOWCASE_PROJECTS.map(project => (
          <div key={project.id} className="glass-card flex flex-col group overflow-hidden">
            {/* Project Image Placeholder */}
            <div className="h-48 bg-white/5 relative flex items-center justify-center overflow-hidden border-b border-white/5">
              <div className="text-slate-600 text-xs font-bold uppercase tracking-widest">{project.type}</div>
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 rounded-full text-[9px] font-bold text-white shadow-lg shadow-emerald-500/20">
                Tiết kiệm: {project.savings}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors uppercase pr-2">{project.title}</h2>
                <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{project.status}</span>
              </div>
              
              <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
                <div className="text-center">
                  <div className="text-[10px] text-slate-600 uppercase mb-0.5">Diện tích</div>
                  <div className="text-sm font-bold text-white">{project.area}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-600 uppercase mb-0.5">Tổng đầu tư</div>
                  <div className="text-sm font-bold text-white">{project.investment}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="glass-card p-12 text-center border-emerald-500/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
        <h2 className="font-bold text-2xl text-white mb-4">Bạn đang chuẩn bị xây nhà?</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
          Hàng trăm công trình đã được tối ưu chi phí qua Basao Build. Hãy để AI Agent giúp bạn bắt đầu dự án mơ ước ngay hôm nay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cost-calculator" className="premium-button py-4 px-8 text-sm font-bold">Tính giá nhanh</Link>
          <Link href="/agent" className="py-4 px-8 border border-white/10 rounded-full text-sm font-bold hover:bg-white/5 transition-all">Chat với AI Agent</Link>
        </div>
      </div>
    </div>
  );
}
