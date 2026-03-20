"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Product Data ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "passenger",
    en: "Passenger Elevator",
    vi: "Thang Máy Chở Khách",
    icon: "🏢",
    color: "blue",
    gradient: "from-blue-600 to-indigo-700",
    desc: "Thang máy chở khách tiêu chuẩn cho toà nhà văn phòng, chung cư, khách sạn, trung tâm thương mại. Thiết kế sang trọng, vận hành êm ái, an toàn tuyệt đối.",
    specs: [
      { label: "Tải trọng", value: "450 – 2.000 kg" },
      { label: "Tốc độ", value: "0.5 – 6.0 m/s" },
      { label: "Số tầng", value: "Tối đa 60 tầng" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Cửa tự động inverter", "Hệ thống cứu hộ ERO", "Điều khiển thông minh AI", "Tiết kiệm điện 30%"],
    badge: "Phổ biến nhất",
  },
  {
    id: "panoramic",
    en: "Panoramic Elevator",
    vi: "Thang Máy Toàn Cảnh",
    icon: "🔭",
    color: "violet",
    gradient: "from-violet-600 to-purple-700",
    desc: "Thang máy kính toàn cảnh tạo điểm nhấn kiến trúc độc đáo. Phù hợp trung tâm thương mại, khách sạn, resort, showroom cao cấp. Tầm nhìn 360° ấn tượng.",
    specs: [
      { label: "Tải trọng", value: "630 – 1.600 kg" },
      { label: "Tốc độ", value: "0.5 – 2.5 m/s" },
      { label: "Cabin", value: "Kính cường lực 10mm" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Kính cường lực 360°", "Khung nhôm anodized", "Chiếu sáng LED tích hợp", "Phong cách kiến trúc"],
    badge: "Cao cấp",
  },
  {
    id: "home",
    en: "Home Elevator",
    vi: "Thang Máy Gia Đình",
    icon: "🏡",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    desc: "Giải pháp thang máy nhỏ gọn cho nhà phố, biệt thự, villa. Lắp đặt linh hoạt, không cần hố pit sâu, tiết kiệm diện tích. Thiết kế theo yêu cầu gia đình.",
    specs: [
      { label: "Tải trọng", value: "150 – 400 kg" },
      { label: "Tốc độ", value: "0.15 – 0.5 m/s" },
      { label: "Pit tối thiểu", value: "100mm" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Không cần phòng máy", "Lắp đặt 7–10 ngày", "Nhiều lựa chọn cabin", "Điều khiển qua app"],
    badge: "Bán chạy",
  },
  {
    id: "freight",
    en: "Freight Elevator",
    vi: "Thang Máy Chở Hàng",
    icon: "📦",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    desc: "Thang máy tải hàng công suất lớn cho nhà xưởng, kho bãi, bệnh viện, siêu thị. Kết cấu chắc chắn, chu kỳ làm việc liên tục, độ bền cao trong môi trường công nghiệp.",
    specs: [
      { label: "Tải trọng", value: "500 – 10.000 kg" },
      { label: "Tốc độ", value: "0.25 – 1.0 m/s" },
      { label: "Cabin", value: "Thép không gỉ / sơn tĩnh điện" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Tải trọng siêu lớn 10T", "Cửa đôi thủy lực", "Sàn chịu lực công nghiệp", "Hoạt động 24/7"],
    badge: "Công nghiệp",
  },
  {
    id: "escalator",
    en: "Escalator",
    vi: "Thang Cuốn",
    icon: "↗️",
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    desc: "Thang cuốn thương mại cho trung tâm mua sắm, ga tàu điện ngầm, sân bay, siêu thị. Thiết kế tối ưu lưu lượng người, tiết kiệm năng lượng, vận hành êm ái.",
    specs: [
      { label: "Lưu lượng", value: "4.500 – 9.000 người/h" },
      { label: "Tốc độ", value: "0.5 m/s" },
      { label: "Góc nghiêng", value: "30° / 35°" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Tay vịn tự động làm sạch", "Hệ thống an toàn 12 lớp", "Tiết kiệm điện biến tần", "Vận hành liên tục"],
    badge: "Thương mại",
  },
  {
    id: "moving-walk",
    en: "Moving Walk",
    vi: "Thang Đi Bộ",
    icon: "🚶",
    color: "sky",
    gradient: "from-sky-500 to-cyan-600",
    desc: "Băng chuyền đi bộ ngang cho sân bay, trung tâm thương mại, bệnh viện, triển lãm. Giúp di chuyển dễ dàng trên khoảng cách dài, tăng trải nghiệm khách hàng.",
    specs: [
      { label: "Tốc độ", value: "0.5 m/s" },
      { label: "Chiều rộng", value: "800 / 1.000 mm" },
      { label: "Độ nghiêng", value: "0° – 12°" },
      { label: "Bảo hành", value: "5 năm" },
    ],
    features: ["Bề mặt chống trượt", "Tự động dừng an toàn", "Chiều dài không giới hạn", "Bảo trì dễ dàng"],
    badge: "Sân bay",
  },
];

const STATS = [
  { value: "2004", label: "Năm thành lập", icon: "📅" },
  { value: "20+", label: "Năm kinh nghiệm", icon: "🏆" },
  { value: "5.000+", label: "Thang máy đã lắp", icon: "🛗" },
  { value: "63", label: "Tỉnh thành phủ sóng", icon: "📍" },
  { value: "98%", label: "Khách hài lòng", icon: "⭐" },
  { value: "24/7", label: "Hỗ trợ bảo trì", icon: "🔧" },
];

const PARTNERS = ["Mitsubishi", "KONE", "Otis", "Schindler", "Fuji", "Hitachi"];

const PROCESS = [
  { n: "01", icon: "📞", t: "Tư vấn khảo sát", d: "Gặp gỡ, khảo sát công trình, tư vấn lựa chọn thang phù hợp — miễn phí" },
  { n: "02", icon: "📐", t: "Thiết kế & Báo giá", d: "Bản vẽ kỹ thuật chi tiết, báo giá minh bạch từng hạng mục" },
  { n: "03", icon: "✍️", t: "Ký hợp đồng", d: "Hợp đồng rõ ràng, cam kết tiến độ và tiêu chuẩn kỹ thuật" },
  { n: "04", icon: "🔨", t: "Thi công lắp đặt", d: "Đội kỹ thuật chuyên nghiệp lắp đặt đúng bản vẽ, đúng hẹn" },
  { n: "05", icon: "📋", t: "Kiểm định & Bàn giao", d: "Kiểm định theo TCVN, hoàn thiện hồ sơ, bàn giao vận hành" },
  { n: "06", icon: "🛡️", t: "Bảo trì dài hạn", d: "Bảo trì định kỳ 5 năm, hỗ trợ 24/7, linh kiện chính hãng" },
];

const COLOR_CONFIG: Record<string, { badge: string; border: string; btn: string; text: string; bg: string }> = {
  blue: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", border: "border-blue-500/30", btn: "bg-gradient-to-r from-blue-600 to-indigo-700", text: "text-blue-400", bg: "bg-blue-500/10" },
  violet: { badge: "bg-violet-500/10 text-violet-400 border-violet-500/20", border: "border-violet-500/30", btn: "bg-gradient-to-r from-violet-600 to-purple-700", text: "text-violet-400", bg: "bg-violet-500/10" },
  amber: { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", border: "border-amber-500/30", btn: "bg-gradient-to-r from-amber-500 to-orange-600", text: "text-amber-400", bg: "bg-amber-500/10" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", border: "border-emerald-500/30", btn: "bg-gradient-to-r from-emerald-600 to-teal-600", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  rose: { badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", border: "border-rose-500/30", btn: "bg-gradient-to-r from-rose-500 to-pink-600", text: "text-rose-400", bg: "bg-rose-500/10" },
  sky: { badge: "bg-sky-500/10 text-sky-400 border-sky-500/20", border: "border-sky-500/30", btn: "bg-gradient-to-r from-sky-500 to-cyan-600", text: "text-sky-400", bg: "bg-sky-500/10" },
};

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ product, onClose }: { product: string; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", note: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)" }}
      onClick={onClose}>
      <div className="w-full max-w-md relative rounded-3xl overflow-hidden"
        style={{ background: "rgba(10,18,40,0.98)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
        onClick={e => e.stopPropagation()}>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-2xl leading-none">×</button>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Yêu cầu đã gửi!</h3>
              <p className="text-slate-400 text-sm">Chuyên gia HTC Elevator sẽ liên hệ bạn trong <span className="text-emerald-400 font-bold">30 phút</span>.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-3xl mb-2">🛗</div>
                <h3 className="text-xl font-bold text-white">Tư vấn {product}</h3>
                <p className="text-slate-400 text-sm mt-1">Chuyên gia HTC sẽ liên hệ trong 30 phút.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Họ tên *</label>
                  <input required name="name" value={form.name} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Số điện thoại / Zalo *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="0975 406 815" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-wider">Ghi chú dự án</label>
                  <textarea name="note" value={form.note} onChange={handleChange} rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder="Số tầng, tải trọng yêu cầu, loại công trình..." />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a href="tel:+84966556876"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm text-slate-300 font-medium">
                    📞 Gọi ngay
                  </a>
                  <button type="submit"
                    className="py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95">
                    Gửi yêu cầu 🚀
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 justify-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Chuyên gia HTC online — phản hồi trong 30 phút
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HTCElevatorPage() {
  const [contactProduct, setContactProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#020617" }}>
      {contactProduct && <ContactModal product={contactProduct} onClose={() => setContactProduct(null)} />}

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Bg orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-blue-600/8 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-violet-600/8 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-900/10 blur-[180px] rounded-full" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Logo / brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
              🛗
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white tracking-tight">HTC <span className="text-blue-400">Elevator</span></div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Thành lập 2004 · 20+ năm kinh nghiệm</div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            CTCP Thang Máy & Đầu Tư HTC · Cung cấp · Lắp đặt · Bảo trì
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-black leading-[1.08] mb-5 tracking-tight">
            <span className="text-white">Giải pháp thang máy</span>
            <br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)" }}>
              toàn diện — tin cậy
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-5 leading-relaxed">
            Công ty Cổ phần Thang Máy và Đầu Tư HTC — đội ngũ kỹ sư, kỹ thuật viên giàu kinh nghiệm,
            cam kết mang đến <strong className="text-white">dịch vụ và sản phẩm hoàn hảo</strong>.
          </p>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-10">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 5.000+ thang máy đã lắp đặt</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 63 tỉnh thành trên cả nước</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Bảo hành 5 năm · Bảo trì 24/7</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => setContactProduct("Thang máy")}
              className="premium-button text-lg px-10 py-4">
              🛗 Tư vấn & Báo giá miễn phí
            </button>
            <a href="#products"
              className="px-10 py-4 rounded-full border border-white/15 hover:bg-white/5 transition-all text-lg text-slate-300 hover:text-white">
              Xem sản phẩm →
            </a>
            <a href="tel:+84966556876"
              className="px-10 py-4 rounded-full border border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-lg text-emerald-400">
              📞 0966 556 876
            </a>
          </div>

          {/* Scroll hint */}
          <div className="text-slate-600 text-xs flex flex-col items-center gap-1 animate-bounce">
            <span>Khám phá sản phẩm</span><span>↓</span>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-xl font-black text-white mb-1">{s.value}</div>
              <div className="text-[11px] text-slate-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden p-10 relative"
          style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />
          <div className="relative z-10 md:flex items-start gap-12">
            <div className="flex-1 mb-8 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Về Chúng Tôi
              </div>
              <h2 className="text-3xl font-black text-white mb-4">HTC Elevator<br /><span className="text-blue-400">20 năm đồng hành</span></h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Công ty Cổ phần Thang Máy và Đầu Tư HTC được thành lập năm 2004, là một trong những
                công ty đi đầu trong dịch vụ <strong className="text-white">Cung cấp, Lắp đặt và Bảo trì thang máy</strong> tại Việt Nam.
              </p>
              <p className="text-slate-400 leading-relaxed">
                HTC Elevator là nơi quy tụ đội ngũ kỹ sư, kỹ thuật viên với nhiều năm kinh nghiệm
                trong lĩnh vực thang máy, cùng với tập thể công nhân viên với sức trẻ nhiệt huyết,
                cống hiến, tinh thần làm việc trách nhiệm cao.
              </p>
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full md:w-64">
              {[
                { icon: "🏭", t: "Xưởng sản xuất", d: "tại Hà Nội & TP.HCM" },
                { icon: "🔧", t: "Đội bảo trì", d: "100+ kỹ thuật viên" },
                { icon: "📜", t: "Chứng chỉ", d: "ISO 9001:2015" },
                { icon: "🤝", t: "Đối tác", d: "6 thương hiệu lớn" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white text-xs font-bold mb-1">{item.t}</div>
                  <div className="text-[10px] text-slate-500">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-8 max-w-5xl mx-auto">
        <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-5">Đối tác thương hiệu toàn cầu</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {PARTNERS.map(p => (
            <div key={p} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-400"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-6xl mx-auto" id="products">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            6 Dòng Sản Phẩm
          </div>
          <h2 className="text-4xl font-black text-white mb-3">Bộ sưu tập Thang máy HTC</h2>
          <p className="text-slate-400 text-lg">Đa dạng giải pháp — phù hợp mọi công trình dân dụng và thương mại</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(prod => {
            const c = COLOR_CONFIG[prod.color];
            return (
              <div key={prod.id} className="relative rounded-3xl overflow-hidden flex flex-col group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Top bar */}
                <div className={`h-1 bg-gradient-to-r ${prod.gradient}`} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-3">{prod.icon}</div>
                      <h3 className="text-lg font-black text-white leading-tight">{prod.vi}</h3>
                      <p className={`text-xs font-semibold ${c.text} mt-0.5 uppercase tracking-widest`}>{prod.en}</p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold flex-shrink-0 ${c.badge}`}>
                      {prod.badge}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{prod.desc}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {prod.specs.map(s => (
                      <div key={s.label} className="p-2.5 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="text-[10px] text-slate-500 mb-0.5">{s.label}</div>
                        <div className={`text-xs font-bold ${c.text}`}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 mb-6 flex-1">
                    {prod.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.bg}`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button onClick={() => setContactProduct(prod.vi)}
                    className={`w-full py-3.5 rounded-2xl ${c.btn} text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg`}>
                    Báo giá {prod.vi} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-5xl mx-auto" id="process">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Quy Trình 6 Bước
          </div>
          <h2 className="text-4xl font-black text-white mb-3">Từ tư vấn đến vận hành</h2>
          <p className="text-slate-400 text-lg">Đội ngũ HTC đồng hành xuyên suốt — không bỏ sót bất kỳ giai đoạn nào</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROCESS.map((step) => (
            <div key={step.n} className="p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="text-[10px] text-blue-400 font-mono font-bold mb-1">BƯỚC {step.n}</div>
                  <h4 className="font-bold text-white text-sm">{step.t}</h4>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(10,18,40,0.95) 60%, rgba(109,40,217,0.12) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/8 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-6xl mb-5">🛗</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Sẵn sàng lắp thang máy?</h2>
            <p className="text-slate-400 text-lg mb-4 max-w-xl mx-auto">
              Khảo sát miễn phí · Báo giá trong 24h · Thi công đúng tiến độ · Bảo hành 5 năm
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-10">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Miễn phí khảo sát</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Linh kiện chính hãng</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Hỗ trợ hồ sơ kiểm định</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setContactProduct("Thang máy")}
                className="premium-button text-lg py-4 px-12">
                🛗 Tư vấn miễn phí ngay
              </button>
              <a href="tel:+84966556876"
                className="py-4 px-10 rounded-full border border-white/15 text-lg text-slate-300 hover:bg-white/5 transition-all hover:text-white">
                📞 0966 556 876
              </a>
              <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
                className="py-4 px-10 rounded-full border border-emerald-500/30 text-lg text-emerald-400 hover:bg-emerald-500/5 transition-all">
                💬 Zalo HTC
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 max-w-5xl mx-auto border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>🛗</div>
              <span className="font-black text-white">HTC <span className="text-blue-400">Elevator</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-3">
              Công ty CP Thang Máy và Đầu Tư HTC. Thành lập 2004. Cung cấp · Lắp đặt · Bảo trì thang máy toàn quốc.
            </p>
            <p className="text-slate-600 text-xs">📍 Hà Nội & TP. Hồ Chí Minh</p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {PRODUCTS.map(p => (
                <li key={p.id}>
                  <button onClick={() => setContactProduct(p.vi)}
                    className="hover:text-white transition-colors text-left">{p.icon} {p.vi}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="tel:+84966556876" className="hover:text-white transition-colors">📞 +84 96 655 6876</a></li>
              <li><a href="https://zalo.me/0966556876" className="hover:text-emerald-400 transition-colors">💬 Zalo tư vấn</a></li>
              <li className="text-slate-600">🕐 8:00 – 17:30 (T2–T7)</li>
              <li className="border-t border-white/5 pt-2 mt-2">
                <Link href="/agency" className="hover:text-violet-400 transition-colors">🏢 Basao Build Agency</Link>
              </li>
              <li>
                <Link href="/thi-cong" className="hover:text-amber-400 transition-colors">🏗️ Trang Thi Công</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-slate-600 text-xs">© 2024 HTC Elevator — CTCP Thang Máy & Đầu Tư HTC</p>
          <p className="text-slate-600 text-xs">Thành viên hệ sinh thái <span className="text-blue-400">Basao Build</span></p>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ───────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button onClick={() => setContactProduct("Thang máy")}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
          title="Tư vấn thang máy">
          🛗
        </button>
        <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all" title="Zalo">
          💬
        </a>
        <a href="tel:+84966556876"
          className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all animate-float" title="Gọi điện">
          📞
        </a>
      </div>
    </div>
  );
}
