"use client";

import Link from "next/link";

const PARTNER_TYPES = [
  {
    title: "Kiến trúc sư (KTS)",
    icon: "📐",
    benefits: [
      "Số hóa hồ sơ thiết kế thành BoM vật tư tự động",
      "Tiếp cận thư viện 10,000+ sản phẩm 3D/Texture thực tế",
      "Hoa hồng giới thiệu NCC minh bạch 3-5%",
      "Hỗ trợ kỹ thuật từ các chuyên gia sản phẩm NCC",
    ]
  },
  {
    title: "Nhà thầu xây dựng",
    icon: "🏗️",
    benefits: [
      "Mua vật tư giá gốc nhà máy, tối ưu lợi nhuận",
      "Quản lý đơn hàng tập trung cho nhiều công trình",
      "Thanh toán Escrow bảo vệ dòng tiền thi công",
      "Nhận badge \"Nhà thầu uy tín\" từ Basao Build",
    ]
  },
  {
    title: "Đơn vị vận tải",
    icon: "🚚",
    benefits: [
      "Quản lý chuyến hàng xuyên biên giới TQ-VN",
      "Tối ưu tải trọng xe với các đơn hàng gom",
      "Hệ thống tracking tự động cho khách hàng",
      "Thanh toán cước phí nhanh chóng",
    ]
  }
];

const SUCCESS_STORIES = [
  {
    name: "KTS. Hoàng Nam",
    role: "Giám đốc Nam Design",
    text: "Trước đây tôi mất 1 tuần để báo giá vật liệu cho khách. Giờ dùng BoM của Basao, tôi chỉ mất 30 phút. Khách hàng tin tưởng hơn vì giá gốc minh bạch.",
    avatar: "H"
  },
  {
    name: "Cty Xây Dựng Mekong",
    role: "Nhà thầu trọn gói",
    text: "Mua gạch Foshan qua Basao giúp chúng tôi tiết kiệm 40 triệu mỗi căn nhà phố. Đây là lợi thế cạnh tranh cực lớn của Mekong hiện nay.",
    avatar: "M"
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-bold text-3xl mb-4 text-white">Chương trình Đối tác Basao Build</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Cùng xây dựng hệ sinh thái Minh bạch - An toàn cho ngành xây dựng Việt Nam.
          Hợp tác cùng chúng tôi để tăng thu nhập và tối ưu quy trình làm việc.
        </p>
      </div>

      {/* Partner types */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {PARTNER_TYPES.map((type, i) => (
          <div key={i} className="glass-card p-8 flex flex-col items-center text-center">
            <div className="text-5xl mb-6">{type.icon}</div>
            <h2 className="font-bold text-xl text-white mb-6">{type.title}</h2>
            <ul className="space-y-4 mb-8 text-left">
              {type.benefits.map((b, bi) => (
                <li key={bi} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                  <span className="text-blue-400">⚡</span> {b}
                </li>
              ))}
            </ul>
            <button className="mt-auto w-full py-3 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              Đăng ký ngay
            </button>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="font-bold text-2xl text-white mb-8">Tại sao nên trở thành đối tác?</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">💰</div>
              <div>
                <h3 className="font-bold text-white mb-2">Tăng thêm thu nhập</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Nhận hoa hồng giới thiệu từ các NCC hàng đầu Việt Nam và Trung Quốc một cách minh bạch, tự động.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">⚙️</div>
              <div>
                <h3 className="font-bold text-white mb-2">Công cụ quản lý 4.0</h3>
                <p className="text-sm text-slate-400 leading-relaxed">App riêng cho đối tác để theo dõi đơn hàng, quản lý BoM và doanh thu hoa hồng theo thời gian thực.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">⭐</div>
              <div>
                <h3 className="font-bold text-white mb-2">Uy tín thương hiệu</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Được Basao Build bảo chứng chất lượng và giới thiệu đến 50,000+ chủ nhà đang sử dụng nền tảng.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 bg-blue-600/5 border-blue-500/10 h-fit">
          <h3 className="font-bold text-lg text-white mb-6">Mô hình hoa hồng điển hình</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm text-slate-400">Công trình biệt thự</span>
              <span className="text-white font-mono">~3.5 - 5 tỷ</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm text-slate-400">Giá trị vật tư qua Basao</span>
              <span className="text-white font-mono">1.2 - 1.8 tỷ</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5 text-emerald-400 font-bold">
              <span>Hoa hồng đối tác (3%)</span>
              <span className="font-mono">36,000,000đ - 54,000,000đ</span>
            </div>
          </div>
          <Link href="/register" className="premium-button w-full block text-center py-4 text-sm font-bold">Bắt đầu hợp tác</Link>
        </div>
      </div>

      {/* Success stories */}
      <h2 className="font-bold text-2xl text-center text-white mb-10">Chia sẻ từ đối tác</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {SUCCESS_STORIES.map((s, i) => (
          <div key={i} className="glass-card p-8">
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">{s.avatar}</div>
              <div>
                <div className="font-bold text-white">{s.name}</div>
                <div className="text-[10px] text-blue-400 uppercase tracking-widest">{s.role}</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic">"{s.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
