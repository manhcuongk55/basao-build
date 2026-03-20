"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterKey = "all" | "xay-dung" | "noi-that" | "thang-may" | "thuong-mai";

// ─── Data ─────────────────────────────────────────────────────────────────────
const AGENCY_STATS = [
  { value: "12+", label: "Năm hoạt động", icon: "🏆" },
  { value: "500+", label: "Dự án hoàn thành", icon: "🏗️" },
  { value: "98%", label: "Tỷ lệ hài lòng", icon: "⭐" },
  { value: "150+", label: "Chuyên gia & KS", icon: "👷" },
  { value: "50+", label: "Tỷ giá trị thi công", icon: "💰" },
  { value: "24/7", label: "Hỗ trợ bảo hành", icon: "🛡️" },
];

const SERVICES = [
  {
    id: "xay-dung",
    icon: "🏗️",
    title: "Tổng Thầu Xây Dựng",
    subtitle: "General Contractor",
    color: "blue",
    gradient: "from-blue-600 to-indigo-700",
    desc: "Nhận thầu xây dựng trọn gói từ thiết kế kiến trúc đến hoàn thiện bàn giao. Chuyên nhà ở dân dụng, nhà phố, biệt thự, văn phòng thương mại.",
    features: [
      "Thiết kế kiến trúc & kết cấu",
      "Thi công phần thô & MEP",
      "Hoàn thiện nội – ngoại thất",
      "Giám sát chất lượng 3 lớp",
      "Cam kết tiến độ hợp đồng",
      "Bảo hành 10 năm",
    ],
    price: "Từ 3.2 triệu/m²",
    projects: "320+",
  },
  {
    id: "noi-that",
    icon: "🛋️",
    title: "Thiết Kế Nội Thất",
    subtitle: "Interior Design & Build",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    desc: "Tư vấn, thiết kế và thi công nội thất toàn diện. Xưởng sản xuất nội thất riêng 2.000m², kiểm soát chất lượng từ gốc đến hiện trường.",
    features: [
      "Thiết kế 2D/3D photorealistic",
      "Xưởng sản xuất 2.000m²",
      "100+ phong cách thiết kế",
      "Vật liệu nhập khẩu cao cấp",
      "Lắp đặt chuyên nghiệp",
      "Bảo hành 3 năm",
    ],
    price: "Từ 3.5 triệu/m²",
    projects: "128+",
  },
  {
    id: "thang-may",
    icon: "🛗",
    title: "Hệ Thống Thang Máy",
    subtitle: "Elevator Systems",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    desc: "Đối tác chính hãng Mitsubishi, KONE, Otis, Fuji. Cung cấp & lắp đặt toàn bộ hệ thống thang máy gia đình, thương mại, tải hàng.",
    features: [
      "Đối tác Mitsubishi · KONE · Otis",
      "Thang máy gia đình & thương mại",
      "Thang tải hàng & panorama",
      "Hỗ trợ hồ sơ kiểm định",
      "Thi công 7–14 ngày",
      "Bảo trì định kỳ 5 năm",
    ],
    price: "Từ 180 triệu/cabin",
    projects: "52+",
  },
  {
    id: "thuong-mai",
    icon: "🏢",
    title: "Không Gian Thương Mại",
    subtitle: "Commercial Fitout",
    color: "violet",
    gradient: "from-violet-600 to-purple-700",
    desc: "Thiết kế và thi công không gian thương mại, showroom, văn phòng, khách sạn. Tối ưu trải nghiệm khách hàng, tăng doanh số bán hàng.",
    features: [
      "Shophouse & showroom",
      "Khách sạn & resort",
      "Văn phòng & coworking",
      "Nhà hàng & F&B",
      "Thiết kế theo thương hiệu",
      "Bàn giao turn-key",
    ],
    price: "Từ 5 triệu/m²",
    projects: "40+",
  },
];

const PORTFOLIO = [
  {
    id: 1,
    name: "Biệt thự Thảo Điền",
    location: "Quận 2, TP.HCM",
    type: "xay-dung",
    label: "Xây Dựng",
    value: "12.5 tỷ",
    area: "320 m²",
    duration: "8 tháng",
    emoji: "🏡",
    style: "Hiện đại — Tối giản",
    tags: ["Biệt thự", "4 tầng", "Smart Home"],
    gradient: "from-blue-900/80 to-slate-900/80",
    accent: "blue",
  },
  {
    id: 2,
    name: "Chung cư Sunrise City",
    location: "Quận 7, TP.HCM",
    type: "noi-that",
    label: "Nội Thất",
    value: "4.2 tỷ",
    area: "180 m²",
    duration: "4 tháng",
    emoji: "🏠",
    style: "Indochine hiện đại",
    tags: ["Penthouse", "Luxury", "Full Pack"],
    gradient: "from-amber-900/80 to-slate-900/80",
    accent: "amber",
  },
  {
    id: 3,
    name: "Khách sạn Mũi Né Resort",
    location: "Bình Thuận",
    type: "thang-may",
    label: "Thang Máy",
    value: "1.8 tỷ",
    area: "12 cabin",
    duration: "3 tuần",
    emoji: "🏨",
    style: "Panorama · Kính toàn phần",
    tags: ["Khách sạn", "Panorama", "KONE"],
    gradient: "from-emerald-900/80 to-slate-900/80",
    accent: "emerald",
  },
  {
    id: 4,
    name: "Nhà phố Bình Thạnh",
    location: "Bình Thạnh, TP.HCM",
    type: "xay-dung",
    label: "Xây Dựng",
    value: "3.6 tỷ",
    area: "120 m²",
    duration: "6 tháng",
    emoji: "🏘️",
    style: "Tropical modern",
    tags: ["Nhà phố", "4 tầng", "Sân thượng"],
    gradient: "from-blue-900/80 to-slate-900/80",
    accent: "blue",
  },
  {
    id: 5,
    name: "Showroom Mercedes Benz",
    location: "Quận 1, TP.HCM",
    type: "thuong-mai",
    label: "Thương Mại",
    value: "8.5 tỷ",
    area: "1.200 m²",
    duration: "5 tháng",
    emoji: "🏢",
    style: "Corporate Luxury",
    tags: ["Showroom", "Auto", "Premium"],
    gradient: "from-violet-900/80 to-slate-900/80",
    accent: "violet",
  },
  {
    id: 6,
    name: "Office Tech Park Q.9",
    location: "Quận 9, TP.HCM",
    type: "noi-that",
    label: "Nội Thất",
    value: "2.8 tỷ",
    area: "450 m²",
    duration: "3 tháng",
    emoji: "🏙️",
    style: "Industrial Tech",
    tags: ["Văn phòng", "Open space", "Startup"],
    gradient: "from-amber-900/80 to-slate-900/80",
    accent: "amber",
  },
];

const TEAM = [
  {
    name: "KTS. Trần Minh Khoa",
    role: "Creative Director",
    experience: "18 năm kinh nghiệm",
    specialty: "Thiết kế kiến trúc & nội thất",
    avatar: "MK",
    color: "blue",
    awards: ["VIFA 2022", "Architecture Award HCM"],
  },
  {
    name: "KS. Nguyễn Đức Thành",
    role: "Chief Engineer",
    experience: "15 năm kinh nghiệm",
    specialty: "Kết cấu & giám sát công trình",
    avatar: "DT",
    color: "emerald",
    awards: ["ISO 9001:2015", "Top Engineer 2023"],
  },
  {
    name: "DS. Lê Thị Hà Linh",
    role: "Interior Lead",
    experience: "12 năm kinh nghiệm",
    specialty: "Nội thất cao cấp & thương mại",
    avatar: "HL",
    color: "amber",
    awards: ["Vietnam Interior Award", "Best Designer 2022"],
  },
  {
    name: "KS. Phạm Văn Hùng",
    role: "MEP Director",
    experience: "13 năm kinh nghiệm",
    specialty: "Hệ thống điện, nước, HVAC",
    avatar: "VH",
    color: "violet",
    awards: ["Certified MEP Engineer", "LEED Accredited"],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: "🤝",
    title: "Tiếp nhận & Tư vấn",
    desc: "Gặp gỡ, lắng nghe nhu cầu, khảo sát hiện trạng công trình miễn phí. Phân tích ngân sách và đề xuất giải pháp tối ưu.",
    duration: "1–3 ngày",
    color: "blue",
  },
  {
    step: "02",
    icon: "📐",
    title: "Thiết kế & Dự toán",
    desc: "Lên phác thảo ý tưởng, thiết kế bản vẽ chi tiết 2D/3D, lập bảng dự toán minh bạch từng hạng mục vật liệu.",
    duration: "7–14 ngày",
    color: "amber",
  },
  {
    step: "03",
    icon: "✍️",
    title: "Ký kết Hợp đồng",
    desc: "Ký hợp đồng rõ ràng, cam kết tiến độ và chất lượng. Điều khoản thanh toán theo từng giai đoạn thực tế.",
    duration: "1 ngày",
    color: "emerald",
  },
  {
    step: "04",
    icon: "🔨",
    title: "Triển khai Thi công",
    desc: "Đội ngũ kỹ sư, thợ lành nghề thi công theo bản vẽ. Giám sát 3 cấp, cập nhật tiến độ hàng tuần qua app.",
    duration: "Theo hợp đồng",
    color: "violet",
  },
  {
    step: "05",
    icon: "🔍",
    title: "Kiểm tra & Nghiệm thu",
    desc: "Kiểm tra nội bộ, mời chủ đầu tư nghiệm thu từng hạng mục. Sửa chữa hoàn toàn miễn phí nếu không đúng bản vẽ.",
    duration: "3–7 ngày",
    color: "blue",
  },
  {
    step: "06",
    icon: "🎉",
    title: "Bàn giao & Bảo hành",
    desc: "Bàn giao hồ sơ hoàn công, hướng dẫn vận hành. Kích hoạt chế độ bảo hành tự động, hỗ trợ 24/7.",
    duration: "1 ngày",
    color: "emerald",
  },
];

const TESTIMONIALS = [
  {
    name: "Anh Nguyễn Hữu Toàn",
    role: "CEO TechCorp Vietnam",
    avatar: "NT",
    color: "blue",
    rating: 5,
    project: "Văn phòng 500m² · Quận 1",
    quote:
      "Basao Build đã biến văn phòng của chúng tôi thành không gian làm việc đẳng cấp đúng nghĩa. Tiến độ nhanh hơn 2 tuần so với cam kết. Đội ngũ chuyên nghiệp, giao tiếp minh bạch từng ngày.",
  },
  {
    name: "Chị Trần Phương Anh",
    role: "Chủ nhà · Thảo Điền",
    avatar: "PA",
    color: "amber",
    rating: 5,
    project: "Biệt thự 320m² · Q.2",
    quote:
      "Từ bản vẽ 3D đến thực tế hoàn toàn khớp nhau. Điều mình trân trọng nhất là họ không phát sinh một đồng nào ngoài hợp đồng. Rất hiếm có đơn vị làm được điều này.",
  },
  {
    name: "Anh Phạm Đức Mạnh",
    role: "Nhà đầu tư BĐS",
    avatar: "DM",
    color: "emerald",
    rating: 5,
    project: "5 công trình nhà phố · TP.HCM",
    quote:
      "Đây là đối tác thầu xây dựng thứ 3 tôi hợp tác trong 5 năm qua, và là đơn vị đầu tiên tôi muốn ký tiếp hợp đồng dài hạn. Chất lượng nhất quán qua từng công trình.",
  },
];

const COLOR_CONFIG: Record<
  string,
  { badge: string; border: string; btn: string; text: string; bg: string; glow: string }
> = {
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    border: "border-blue-500/30",
    btn: "bg-gradient-to-r from-blue-600 to-indigo-700",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "bg-blue-500/20",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "border-amber-500/30",
    btn: "bg-gradient-to-r from-amber-500 to-orange-600",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "bg-amber-500/20",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    border: "border-emerald-500/30",
    btn: "bg-gradient-to-r from-emerald-600 to-teal-600",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "bg-emerald-500/20",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    border: "border-violet-500/30",
    btn: "bg-gradient-to-r from-violet-600 to-purple-700",
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "bg-violet-500/20",
  },
};

// ─── Contact Modal ─────────────────────────────────────────────────────────
function ContactModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [form, setForm] = useState({ name: "", phone: "", service: "xay-dung", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
    setTimeout(onClose, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg relative rounded-3xl overflow-hidden"
        style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-blue-500/10 blur-[80px] pointer-events-none" />

        <div className="relative p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-2xl leading-none transition-colors">×</button>

          {step === "done" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
              <h3 className="text-2xl font-bold text-white mb-3">Yêu cầu đã gửi!</h3>
              <p className="text-slate-400">Chuyên gia tư vấn sẽ liên hệ bạn trong vòng <span className="text-emerald-400 font-bold">30 phút</span>.</p>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  Tư vấn miễn phí
                </div>
                <h3 className="text-xl font-bold text-white">Gặp chuyên gia của chúng tôi</h3>
                <p className="text-slate-400 text-sm mt-1">Để lại thông tin, nhóm tư vấn sẽ gọi lại trong 30 phút.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Họ tên *</label>
                    <input required name="name" value={form.name} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Số điện thoại *</label>
                    <input required name="phone" value={form.phone} onChange={handleChange} type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="0975 406 815" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Dịch vụ cần tư vấn</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors">
                    <option value="xay-dung" className="bg-slate-900">🏗️ Tổng thầu xây dựng</option>
                    <option value="noi-that" className="bg-slate-900">🛋️ Thiết kế nội thất</option>
                    <option value="thang-may" className="bg-slate-900">🛗 Hệ thống thang máy</option>
                    <option value="thuong-mai" className="bg-slate-900">🏢 Không gian thương mại</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Mô tả dự án</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder="Loại công trình, diện tích, tiêu chuẩn, ngân sách dự kiến..." />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a href="tel:0975406815"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm text-slate-300 font-medium">
                    📞 Gọi ngay
                  </a>
                  <button type="submit"
                    className="py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                    Gửi yêu cầu 🚀
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 justify-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Đội tư vấn online — phản hồi trong 30 phút
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── Main Page ─────────────────────────────────────────────────────────────
export default function AgencyPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [showContact, setShowContact] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.type === activeFilter);

  const FILTER_OPTS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "xay-dung", label: "🏗️ Xây Dựng" },
    { key: "noi-that", label: "🛋️ Nội Thất" },
    { key: "thang-may", label: "🛗 Thang Máy" },
    { key: "thuong-mai", label: "🏢 Thương Mại" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#020617" }}>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/8 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-amber-600/6 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/10 blur-[200px] rounded-full" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Agency & Nhà Thầu Chuyên Nghiệp · Từ 2012
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            <span className="text-white">Chúng tôi xây</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #fbbf24 50%, #34d399 100%)" }}
            >
              không gian sống đẳng cấp
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-5 leading-relaxed">
            Basao Build Agency — tổng thầu thiết kế & thi công toàn diện.<br />
            12 năm, 500+ công trình, cam kết <strong className="text-white">không phát sinh chi phí ẩn</strong>.
          </p>

          {/* Proof bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-12">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> ISO 9001:2015</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 150+ kỹ sư & thợ lành nghề</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Bảo hành 10 năm</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Đối tác Mitsubishi · KONE</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setShowContact(true)}
              className="premium-button text-lg px-10 py-4"
            >
              🤝 Gặp chuyên gia ngay
            </button>
            <a
              href="#portfolio"
              className="px-10 py-4 rounded-full border border-white/15 hover:bg-white/5 transition-all text-lg text-slate-300 hover:text-white"
            >
              Xem công trình →
            </a>
            <a
              href="https://zalo.me/0975406815"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full border border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-lg text-emerald-400"
            >
              💬 Zalo tư vấn
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 text-slate-600 text-xs animate-bounce">
            <span>Cuộn để khám phá</span>
            <span className="text-lg">↓</span>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="px-6 py-16 max-w-6xl mx-auto" id="about">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AGENCY_STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[11px] text-slate-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto" id="services">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            4 Lĩnh Vực Chuyên Sâu
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">Dịch vụ của Agency</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Một đối tác — toàn bộ giải pháp xây dựng & nội thất từ A đến Z</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map(svc => {
            const c = COLOR_CONFIG[svc.color];
            return (
              <div
                key={svc.id}
                className="relative rounded-3xl overflow-hidden group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${svc.gradient}`} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className={`text-4xl mb-3`}>{svc.icon}</div>
                      <h3 className="text-xl font-bold text-white">{svc.title}</h3>
                      <p className={`text-xs font-semibold ${c.text} mt-0.5 uppercase tracking-widest`}>{svc.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-3 py-1.5 rounded-full border font-bold ${c.badge}`}>{svc.projects} dự án</div>
                      <div className="text-white font-bold text-sm mt-2">{svc.price}</div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{svc.desc}</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {svc.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.text.replace("text-", "bg-")}`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowContact(true)}
                    className={`w-full py-3.5 rounded-xl ${c.btn} text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg`}
                  >
                    Tư vấn {svc.title} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto" id="portfolio">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Portfolio · Công Trình Tiêu Biểu
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">500+ dự án hoàn thành</h2>
          <p className="text-slate-400 text-lg mb-10">Từ căn hộ đến biệt thự, từ văn phòng đến resort — chúng tôi đã làm được</p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {FILTER_OPTS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === opt.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "border border-white/10 text-slate-400 hover:bg-white/5"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(project => {
            const c = COLOR_CONFIG[project.accent] || COLOR_CONFIG.blue;
            return (
              <div
                key={project.id}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.3s",
                }}
              >
                {/* Thumbnail area */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <div className="text-7xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transition-all duration-500">{project.emoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  {/* Label */}
                  <div className={`absolute top-4 left-4 text-[10px] px-2.5 py-1 rounded-full border font-bold ${c.badge}`}>
                    {project.label}
                  </div>
                  {/* Value */}
                  <div className="absolute bottom-4 right-4 text-white font-black text-lg">{project.value}</div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-white mb-1">{project.name}</h3>
                  <p className="text-slate-500 text-xs mb-3">📍 {project.location}</p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 mb-4">
                    <span>📐 {project.area}</span>
                    <span>⏱️ {project.duration}</span>
                    <span className="col-span-2">🎨 {project.style}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${c.badge}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setShowContact(true)}
            className="premium-button text-base px-10 py-4"
          >
            Xem toàn bộ portfolio →
          </button>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto" id="process">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Quy Trình 6 Bước
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">Từ ý tưởng đến bàn giao</h2>
          <p className="text-slate-400 text-lg">Minh bạch, chuyên nghiệp, đúng hẹn trong từng giai đoạn</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROCESS_STEPS.map(step => {
            const c = COLOR_CONFIG[step.color];
            return (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`text-2xl w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono font-bold ${c.text} mb-1`}>BƯỚC {step.step}</div>
                    <h3 className="font-bold text-white text-sm">{step.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${c.badge}`}>
                  ⏱️ {step.duration}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto" id="team">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Đội Ngũ Lãnh Đạo
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">Chuyên gia đứng sau mỗi công trình</h2>
          <p className="text-slate-400 text-lg">150+ kỹ sư, kiến trúc sư và thợ lành nghề</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => {
            const c = COLOR_CONFIG[member.color];
            return (
              <div
                key={i}
                className="p-6 rounded-2xl text-center group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.3s",
                }}
              >
                <div className={`w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mx-auto mb-4 text-lg font-black ${c.text}`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{member.name}</h3>
                <p className={`text-xs font-semibold ${c.text} mb-1`}>{member.role}</p>
                <p className="text-slate-500 text-xs mb-2">{member.experience}</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{member.specialty}</p>
                <div className="space-y-1.5">
                  {member.awards.map(award => (
                    <div key={award} className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${c.badge}`}>
                      🏅 {award}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Khách Hàng Nói Gì
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">98% khách hàng hài lòng</h2>
          <p className="text-slate-400 text-lg">Uy tín xây dựng qua từng công trình, từng năm</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => {
            const c = COLOR_CONFIG[t.color];
            return (
              <div
                key={i}
                className="p-7 rounded-2xl relative"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="text-amber-400 text-lg mb-4">{"★".repeat(t.rating)}</div>
                <p className="text-slate-300 text-sm leading-[1.8] mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${c.badge} w-fit mb-5`}>
                  📁 {t.project}
                </div>
                <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                  <div className={`w-10 h-10 rounded-full ${c.bg} border ${c.border} flex items-center justify-center text-xs font-black ${c.text}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(5,150,105,0.1) 100%)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-6xl mb-6">🏗️</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Sẵn sàng bắt đầu dự án?
            </h2>
            <p className="text-slate-400 text-lg mb-4 max-w-xl mx-auto">
              Gặp chuyên gia tư vấn miễn phí. Nhận báo giá chi tiết trong 24 giờ.
              Không ràng buộc — không phí ẩn.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-10">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Tư vấn miễn phí</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Khảo sát thực tế tại nhà</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Báo giá chi tiết 24h</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContact(true)}
                className="premium-button text-lg py-4 px-12"
              >
                🤝 Tư vấn với chuyên gia
              </button>
              <a href="tel:0975406815"
                className="py-4 px-10 rounded-full border border-white/15 text-lg text-slate-300 hover:bg-white/5 transition-all hover:text-white">
                📞 0975 406 815
              </a>
              <a
                href="https://zalo.me/0975406815"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-10 rounded-full border border-emerald-500/30 text-lg text-emerald-400 hover:bg-emerald-500/5 transition-all"
              >
                💬 Zalo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ───────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-10 max-w-6xl mx-auto border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white">B</div>
              <span className="font-black text-white">BASAO <span className="text-blue-400">BUILD</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Đơn vị thi công thiết kế xây dựng chuyên nghiệp. 12 năm kinh nghiệm · 500+ công trình · Bảo hành tận tâm.</p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Tổng thầu xây dựng</button></li>
              <li><button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Thiết kế nội thất</button></li>
              <li><button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Hệ thống thang máy</button></li>
              <li><button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Không gian thương mại</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Nền tảng</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-white transition-colors">Trang chủ Basao Build</Link></li>
              <li><Link href="/thi-cong" className="hover:text-white transition-colors">Thi công chuyên sâu</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Báo giá tự động AI</Link></li>
              <li><Link href="/supplier" className="hover:text-white transition-colors">Cổng nhà cung cấp</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="tel:0975406815" className="hover:text-white transition-colors">📞 0975 406 815</a></li>
              <li><a href="https://zalo.me/0975406815" className="hover:text-emerald-400 transition-colors">💬 Zalo tư vấn</a></li>
              <li className="text-slate-600">📍 TP. Hồ Chí Minh</li>
              <li className="text-slate-600">🕐 8:00 – 18:00 (T2–T7)</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-slate-600 text-xs">© 2024 Basao Build Agency. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>ISO 9001:2015</span>
            <span>·</span>
            <span>Giấy phép XDDD số 123/GP-HCM</span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setShowContact(true)}
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-all"
          title="Tư vấn"
        >
          🤝
        </button>
        <a href="https://zalo.me/0975406815" target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all"
          title="Zalo">
          💬
        </a>
        <a href="tel:0975406815"
          className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all animate-float"
          title="Gọi điện">
          📞
        </a>
      </div>
    </div>
  );
}
