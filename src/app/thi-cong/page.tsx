"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
type ServiceKey = "thang-may" | "noi-that" | "xay-dung";

interface QuoteResult {
  min: number;
  max: number;
  note: string;
}

// ─── Quote Logic ─────────────────────────────────────────────────────────────
const ELEVATOR_PRICES: Record<string, Record<string, [number, number]>> = {
  "2": { "200-500": [180, 280], "500-1000": [200, 320], "1000+": [250, 400] },
  "3": { "200-500": [220, 360], "500-1000": [260, 420], "1000+": [320, 520] },
  "4": { "200-500": [280, 450], "500-1000": [340, 560], "1000+": [420, 680] },
  "6+": { "200-500": [380, 620], "500-1000": [460, 780], "1000+": [580, 950] },
};

const INTERIOR_PRICES: Record<string, Record<string, number>> = {
  "can-ho": { "basic": 3500, "medium": 6500, "luxury": 12000 },
  "biet-thu": { "basic": 4500, "medium": 8000, "luxury": 18000 },
  "van-phong": { "basic": 2800, "medium": 5000, "luxury": 9500 },
  "thuong-mai": { "basic": 3000, "medium": 5500, "luxury": 11000 },
};

const CONSTRUCTION_PRICES: Record<string, Record<string, number>> = {
  "nha-cap-4": { "basic": 3200, "medium": 4800, "luxury": 7000 },
  "nha-pho": { "basic": 5500, "medium": 7500, "luxury": 11000 },
  "biet-thu": { "basic": 7000, "medium": 10000, "luxury": 16000 },
  "van-phong": { "basic": 6000, "medium": 8500, "luxury": 14000 },
};

function calcElevatorQuote(floors: string, capacity: string): QuoteResult {
  const range = ELEVATOR_PRICES[floors]?.[capacity] ?? [200, 350];
  return {
    min: range[0],
    max: range[1],
    note: "Đã bao gồm lắp đặt, hố thang, kiểm định",
  };
}

function calcInteriorQuote(type: string, standard: string, area: number): QuoteResult {
  const pricePerM2 = INTERIOR_PRICES[type]?.[standard] ?? 5000;
  const total = pricePerM2 * area;
  return {
    min: Math.round(total * 0.9),
    max: Math.round(total * 1.15),
    note: "Bao gồm thiết kế, vật liệu và thi công hoàn thiện",
  };
}

function calcConstructionQuote(type: string, standard: string, area: number): QuoteResult {
  const pricePerM2 = CONSTRUCTION_PRICES[type]?.[standard] ?? 6000;
  const total = pricePerM2 * area;
  return {
    min: Math.round(total * 0.9),
    max: Math.round(total * 1.1),
    note: "Bao gồm phần thô, MEP cơ bản và hoàn thiện",
  };
}

function formatM(val: number) {
  if (val >= 1000) return `${(val / 1000).toFixed(1)} tỷ`;
  return `${val} triệu`;
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { v: "500+", l: "Dự án hoàn thành" },
  { v: "98%", l: "Khách hài lòng" },
  { v: "12+", l: "Năm kinh nghiệm" },
  { v: "24/7", l: "Hỗ trợ bảo hành" },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    key: "thang-may" as ServiceKey,
    icon: "🛗",
    title: "Thi Công Thang Máy",
    color: "blue",
    desc: "Cung cấp & lắp đặt thang máy gia đình, thương mại, tải hàng. Nhập khẩu chính hãng, bảo hành 5 năm, bảo trì định kỳ.",
    tags: ["Thang máy gia đình", "Thang tải hàng", "Thang thủy lực", "Thang panorama"],
    highlights: [
      { icon: "🏆", text: "Đối tác chính hãng Mitsubishi, KONE, Otis" },
      { icon: "🔧", text: "Đội kỹ thuật lắp đặt 50+ chuyên gia" },
      { icon: "📋", text: "Hỗ trợ hồ sơ kiểm định, đăng kiểm" },
      { icon: "⚡", text: "Thi công nhanh 7–14 ngày" },
    ],
  },
  {
    key: "noi-that" as ServiceKey,
    icon: "🛋️",
    title: "Thiết Kế Nội Thất",
    color: "amber",
    desc: "Tư vấn, thiết kế & thi công nội thất căn hộ, biệt thự, văn phòng, showroom. Phong cách hiện đại, Đông Dương, tối giản.",
    tags: ["Căn hộ chung cư", "Biệt thự", "Văn phòng", "Thương mại"],
    highlights: [
      { icon: "🎨", text: "100+ mẫu thiết kế độc quyền" },
      { icon: "🏭", text: "Xưởng sản xuất nội thất riêng" },
      { icon: "📐", text: "Bản vẽ 3D miễn phí trước thi công" },
      { icon: "✅", text: "Bảo hành nội thất 3 năm" },
    ],
  },
  {
    key: "xay-dung" as ServiceKey,
    icon: "🏗️",
    title: "Thi Công Xây Dựng",
    color: "emerald",
    desc: "Nhận thầu xây dựng trọn gói nhà ở dân dụng, nhà phố, biệt thự, văn phòng. Cam kết đúng tiến độ, đúng bản vẽ, bàn giao 100%.",
    tags: ["Nhà cấp 4", "Nhà phố", "Biệt thự", "Văn phòng-thương mại"],
    highlights: [
      { icon: "📅", text: "Cam kết tiến độ bằng hợp đồng" },
      { icon: "🧱", text: "Vật liệu đạt chuẩn TCVN" },
      { icon: "🔍", text: "Giám sát chất lượng mỗi giai đoạn" },
      { icon: "🤝", text: "Bảo hành công trình 10 năm" },
    ],
  },
];

const COLOR_MAP: Record<string, { badge: string; border: string; glow: string; btn: string; text: string; bg: string }> = {
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    border: "hover:border-blue-500/30",
    glow: "bg-blue-600/5",
    btn: "bg-gradient-to-r from-blue-600 to-blue-800",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "hover:border-amber-500/30",
    glow: "bg-amber-600/5",
    btn: "bg-gradient-to-r from-amber-600 to-amber-800",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    border: "hover:border-emerald-500/30",
    glow: "bg-emerald-600/5",
    btn: "bg-gradient-to-r from-emerald-600 to-emerald-800",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
};

const PROJECTS = [
  { name: "Chung cư Sunrise City Q.7", type: "Thang máy + Nội thất", value: "4.2 tỷ", img: "🏢", status: "Hoành thành" },
  { name: "Biệt thự Thảo Điền Q.2", type: "Xây dựng trọn gói", value: "12.5 tỷ", img: "🏡", status: "Hoàn thành" },
  { name: "Văn phòng Tech Corp Q.1", type: "Nội thất văn phòng", value: "2.8 tỷ", img: "🏙️", status: "Đang thi công" },
  { name: "Nhà phố Bình Thạnh", type: "Xây dựng nhà phố 4T", value: "3.6 tỷ", img: "🏠", status: "Hoàn thành" },
  { name: "Khách sạn Mui Ne Resort", type: "Thang máy panorama", value: "1.8 tỷ", img: "🏨", status: "Hoàn thành" },
  { name: "Shophouse Vinhomes Q.9", type: "Nội thất thương mại", value: "5.1 tỷ", img: "🏬", status: "Đang thi công" },
];

const TESTIMONIALS = [
  { name: "Nguyễn Hữu Toàn", role: "Chủ nhà · Quận 7", avatar: "NT", quote: "Thang máy lắp xong trong 10 ngày, chạy êm hơn mong đợi. Đội kỹ thuật chuyên nghiệp, hướng dẫn tận tình. Sẽ giới thiệu thêm bạn bè.", service: "Thang Máy", rating: 5, color: "blue" },
  { name: "Trần Thị Phương Anh", role: "Chủ căn hộ · Thảo Điền", avatar: "PA", quote: "Thiết kế 3D chuẩn đẹp, thi công đúng như bản vẽ. Nguyên liệu chất lượng, giá hợp lý. Căn hộ của mình được nhiều người khen.", service: "Nội Thất", rating: 5, color: "amber" },
  { name: "Phạm Đức Mạnh", role: "Nhà thầu · Bình Dương", avatar: "DM", quote: "Đặt thầu xây nhà phố 4 tầng. Tiến độ đúng 6 tháng như cam kết. Chất lượng kiểm tra từng giai đoạn. Thanh toán rõ ràng.", service: "Xây Dựng", rating: 5, color: "emerald" },
];

// ─── Lead Modal ─────────────────────────────────────────────────────────────
function LeadModal({ service, onClose }: { service: ServiceKey | null; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const svc = SERVICES.find(s => s.key === service);

  if (!svc) return null;
  const c = COLOR_MAP[svc.color];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="glass-card p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white text-2xl">×</button>
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white mb-2">Đã nhận yêu cầu!</h3>
            <p className="text-slate-400">Nhân viên tư vấn sẽ gọi lại trong vòng <span className="text-emerald-400 font-bold">30 phút</span>.</p>
          </div>
        ) : (
          <>
            <div className={`text-3xl mb-2`}>{svc.icon}</div>
            <h3 className="text-xl font-bold text-white mb-1">Tư vấn {svc.title}</h3>
            <p className="text-slate-400 text-sm mb-6">Để lại thông tin, chúng tôi gọi lại trong 30 phút.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block uppercase tracking-wider">Họ tên *</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block uppercase tracking-wider">Số điện thoại / Zalo *</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="0975 406 815" type="tel" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block uppercase tracking-wider">Ghi chú dự án</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="Nhà phố 3 tầng, cần tư vấn thang máy gia đình..." />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="tel:+84966556876" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm text-slate-300">
                  📞 Gọi ngay
                </a>
                <button type="submit" className={`py-3 rounded-xl ${c.btn} text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95`}>
                  Gửi yêu cầu 🚀
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 text-center justify-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Tư vấn viên online — phản hồi trong 30 phút
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Quote Tab ──────────────────────────────────────────────────────────────
function QuoteCalculator() {
  const [tab, setTab] = useState<ServiceKey>("thang-may");
  const [result, setResult] = useState<QuoteResult | null>(null);

  // Elevator state
  const [elFloors, setElFloors] = useState("3");
  const [elCapacity, setElCapacity] = useState("500-1000");

  // Interior state
  const [intType, setIntType] = useState("can-ho");
  const [intStd, setIntStd] = useState("medium");
  const [intArea, setIntArea] = useState(80);

  // Construction state
  const [conType, setConType] = useState("nha-pho");
  const [conStd, setConStd] = useState("medium");
  const [conArea, setConArea] = useState(120);

  const handleCalc = () => {
    if (tab === "thang-may") setResult(calcElevatorQuote(elFloors, elCapacity));
    else if (tab === "noi-that") setResult(calcInteriorQuote(intType, intStd, intArea));
    else setResult(calcConstructionQuote(conType, conStd, conArea));
  };

  const tabMeta: Record<ServiceKey, { icon: string; color: string; label: string }> = {
    "thang-may": { icon: "🛗", color: "blue", label: "Thang Máy" },
    "noi-that": { icon: "🛋️", color: "amber", label: "Nội Thất" },
    "xay-dung": { icon: "🏗️", color: "emerald", label: "Xây Dựng" },
  };

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto" id="bao-gia">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          Báo Giá Tự Động
        </div>
        <h2 className="text-3xl font-bold mb-3">Tính chi phí ngay</h2>
        <p className="text-slate-400">Nhập thông số, nhận báo giá ước tính trong vài giây. Hoàn toàn miễn phí.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {(Object.keys(tabMeta) as ServiceKey[]).map(k => {
          const m = tabMeta[k];
          const active = tab === k;
          const c = COLOR_MAP[m.color];
          return (
            <button key={k} onClick={() => { setTab(k); setResult(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${active ? `${c.btn} text-white shadow-lg` : "border border-white/10 text-slate-400 hover:bg-white/5"}`}>
              {m.icon} {m.label}
            </button>
          );
        })}
      </div>

      <div className="glass-card p-8">
        {/* Elevator Form */}
        {tab === "thang-may" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Số tầng công trình</label>
              <div className="grid grid-cols-4 gap-3">
                {["2", "3", "4", "6+"].map(f => (
                  <button key={f} onClick={() => setElFloors(f)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${elFloors === f ? "bg-blue-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-blue-500/30"}`}>
                    {f} tầng
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Tải trọng (kg)</label>
              <div className="grid grid-cols-3 gap-3">
                {[["200-500", "200–500 kg\n(Gia đình nhỏ)"], ["500-1000", "500–1.000 kg\n(Gia đình, VP)"], ["1000+", "1.000 kg+\n(Tải hàng, CT lớn)"]].map(([v, l]) => (
                  <button key={v} onClick={() => setElCapacity(v)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${elCapacity === v ? "bg-blue-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-blue-500/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interior Form */}
        {tab === "noi-that" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Loại công trình</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[["can-ho", "🏠 Căn hộ"], ["biet-thu", "🏡 Biệt thự"], ["van-phong", "🏢 Văn phòng"], ["thuong-mai", "🏬 Thương mại"]].map(([v, l]) => (
                  <button key={v} onClick={() => setIntType(v)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${intType === v ? "bg-amber-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-amber-500/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Tiêu chuẩn hoàn thiện</label>
              <div className="grid grid-cols-3 gap-3">
                {[["basic", "🪨 Cơ bản\n3–5tr/m²"], ["medium", "⭐ Trung cao cấp\n6–9tr/m²"], ["luxury", "💎 Cao cấp\n10tr+/m²"]].map(([v, l]) => (
                  <button key={v} onClick={() => setIntStd(v)}
                    className={`py-3 rounded-xl text-xs text-center font-bold transition-all ${intStd === v ? "bg-amber-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-amber-500/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Diện tích: <span className="text-amber-400 font-bold">{intArea} m²</span></label>
              <input type="range" min={30} max={1000} step={10} value={intArea}
                onChange={e => setIntArea(Number(e.target.value))}
                className="w-full accent-amber-500" />
              <div className="flex justify-between text-xs text-slate-600 mt-1"><span>30 m²</span><span>1,000 m²</span></div>
            </div>
          </div>
        )}

        {/* Construction Form */}
        {tab === "xay-dung" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Loại công trình</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[["nha-cap-4", "🏠 Nhà cấp 4"], ["nha-pho", "🏘️ Nhà phố"], ["biet-thu", "🏡 Biệt thự"], ["van-phong", "🏢 Văn phòng"]].map(([v, l]) => (
                  <button key={v} onClick={() => setConType(v)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${conType === v ? "bg-emerald-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-emerald-500/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Tiêu chuẩn thi công</label>
              <div className="grid grid-cols-3 gap-3">
                {[["basic", "🪨 Tiết kiệm\n3.5–5.5tr/m²"], ["medium", "⭐ Trung cấp\n6–9tr/m²"], ["luxury", "💎 Cao cấp\n10–16tr/m²"]].map(([v, l]) => (
                  <button key={v} onClick={() => setConStd(v)}
                    className={`py-3 rounded-xl text-xs text-center font-bold transition-all ${conStd === v ? "bg-emerald-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-emerald-500/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Diện tích xây dựng: <span className="text-emerald-400 font-bold">{conArea} m²</span></label>
              <input type="range" min={50} max={2000} step={10} value={conArea}
                onChange={e => setConArea(Number(e.target.value))}
                className="w-full accent-emerald-500" />
              <div className="flex justify-between text-xs text-slate-600 mt-1"><span>50 m²</span><span>2,000 m²</span></div>
            </div>
          </div>
        )}

        {/* Calc Button */}
        <button onClick={handleCalc}
          className={`w-full mt-8 py-4 rounded-2xl ${COLOR_MAP[tabMeta[tab].color].btn} text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg`}>
          🧮 Tính Chi Phí Ngay
        </button>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-6 rounded-2xl border ${COLOR_MAP[tabMeta[tab].color].bg} ${COLOR_MAP[tabMeta[tab].color].border} border-opacity-30`}>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Ước tính chi phí</div>
            <div className="text-4xl font-black text-white mb-1">
              {formatM(result.min)} – {formatM(result.max)}
            </div>
            <div className="text-slate-400 text-sm mt-2 mb-4">{result.note}</div>
            <div className="text-xs text-slate-600 mb-4">* Báo giá chính xác sau khi khảo sát thực tế. Giá có thể thay đổi theo vật liệu, khu vực, thời điểm.</div>
            <div className="flex gap-3">
              <a href="tel:+84966556876" className="flex-1 py-3 rounded-xl border border-white/10 text-center text-sm hover:bg-white/5 transition-all">
                📞 Gọi tư vấn
              </a>
              <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
                className={`flex-1 py-3 rounded-xl ${COLOR_MAP[tabMeta[tab].color].btn} text-white text-center text-sm font-bold transition-all hover:opacity-90`}>
                💬 Zalo ngay
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ThiCongPage() {
  const [leadService, setLeadService] = useState<ServiceKey | null>(null);

  return (
    <>
      {leadService && <LeadModal service={leadService} onClose={() => setLeadService(null)} />}

      {/* Hero */}
      <section className="relative px-6 py-24 text-center max-w-5xl mx-auto overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-amber-600/8 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-emerald-600/8 blur-[80px] rounded-full" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            Thang Máy · Nội Thất · Xây Dựng
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Đơn vị thi công<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-amber-300 to-emerald-400">
              uy tín — trọn gói
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tư vấn · Thiết kế · Thi công · Bảo hành — một đội ngũ 12 năm kinh nghiệm.
            <br />Báo giá tự động, minh bạch. Không phát sinh chi phí ẩn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#bao-gia" className="premium-button text-lg px-10 py-4">
              🧮 Báo Giá Miễn Phí
            </a>
            <button onClick={() => setLeadService("thang-may")}
              className="px-10 py-4 rounded-full border border-blue-500/30 hover:bg-blue-500/5 transition-all text-lg text-blue-400">
              📞 Tư vấn ngay
            </button>
            <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 rounded-full border border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-lg text-emerald-400">
              💬 Zalo tư vấn
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s, i) => (
              <div key={i} className="glass-card py-5 px-3 text-center">
                <div className="text-3xl font-black text-white">{s.v}</div>
                <div className="text-[11px] text-slate-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Dịch vụ của chúng tôi</h2>
          <p className="text-slate-400">3 mảng chuyên sâu, 1 đơn vị — đồng hành từ thiết kế đến bàn giao</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map(svc => {
            const c = COLOR_MAP[svc.color];
            return (
              <div key={svc.key} className={`glass-card p-7 flex flex-col gap-4 ${c.border} transition-all group cursor-default`}>
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-3xl`}>{svc.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map(t => (
                    <span key={t} className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${c.badge}`}>{t}</span>
                  ))}
                </div>
                <div className="space-y-2 border-t border-white/5 pt-4">
                  {svc.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                      <span>{h.icon}</span> {h.text}
                    </div>
                  ))}
                </div>
                <button onClick={() => setLeadService(svc.key)}
                  className={`w-full py-3 rounded-xl ${c.btn} text-white font-semibold text-sm mt-auto transition-all hover:scale-[1.02] active:scale-95`}>
                  Tư vấn {svc.title} →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote Calculator */}
      <QuoteCalculator />

      {/* Projects */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Dự án tiêu biểu</h2>
          <p className="text-slate-400">500+ công trình hoàn thành trên toàn quốc</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={i} className="glass-card p-6 hover:border-white/20 transition-all group">
              <div className="text-4xl mb-4">{p.img}</div>
              <h3 className="font-bold text-white mb-1">{p.name}</h3>
              <div className="text-sm text-slate-400 mb-3">{p.type}</div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-bold">{p.value}</span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${p.status === "Đang thi công" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="glass-card p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Tại sao chọn chúng tôi?</h2>
            <p className="text-slate-400">Cam kết minh bạch — Chất lượng đến từng chi tiết</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔒", title: "Hợp đồng rõ ràng", desc: "Ký kết từng giai đoạn, thanh toán theo tiến độ thực tế. Không phát sinh ẩn." },
              { icon: "🏆", title: "12 năm kinh nghiệm", desc: "Đội ngũ kỹ sư, kiến trúc sư công trình dày dặn kinh nghiệm từ 2012." },
              { icon: "📊", title: "Báo giá minh bạch", desc: "Bảng giá chi tiết từng hạng mục. Khách hàng biết tiền đi đâu từng đồng." },
              { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Thang máy 5 năm, nội thất 3 năm, công trình xây dựng 10 năm." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Quy trình làm việc</h2>
          <p className="text-slate-400">Từ tư vấn đến bàn giao — chuyên nghiệp, đúng hẹn</p>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { n: "01", icon: "📞", t: "Tư vấn", d: "Nghe yêu cầu, khảo sát thực tế miễn phí" },
            { n: "02", icon: "📐", t: "Thiết kế", d: "Bản vẽ 2D/3D, báo giá chi tiết từng hạng mục" },
            { n: "03", icon: "✍️", t: "Ký hợp đồng", d: "Hợp đồng rõ ràng, bảo lãnh tiến độ & chất lượng" },
            { n: "04", icon: "🔨", t: "Thi công", d: "Giám sát nghiêm ngặt, cập nhật tiến độ hàng tuần" },
            { n: "05", icon: "🎉", t: "Bàn giao", d: "Nghiệm thu hoàn công, kích hoạt bảo hành fulltime" },
          ].map(s => (
            <div key={s.n} className="glass-card p-5 text-center hover:border-blue-500/20 transition-all">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-[10px] text-blue-400 font-mono mb-1">BƯỚC {s.n}</div>
              <h4 className="font-bold text-white text-sm mb-2">{s.t}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Khách hàng nói gì</h2>
          <p className="text-slate-400">Hơn 500 khách hàng tin tưởng — 98% hài lòng</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => {
            const c = COLOR_MAP[t.color];
            return (
              <div key={i} className={`glass-card p-6 ${c.border} transition-all`}>
                <div className="text-amber-400 mb-3">{"★".repeat(t.rating)}</div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center text-xs font-bold ${c.text}`}>{t.avatar}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-[10px] text-slate-500">{t.role}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${c.badge}`}>{t.service}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center border-blue-500/10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-blue-600/8 blur-[80px] rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="text-5xl mb-4">🏗️</div>
            <h2 className="text-3xl font-bold mb-4">Bắt đầu dự án của bạn</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Gặp tư vấn viên, nhận báo giá chính xác miễn phí. Đội ngũ online 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#bao-gia" className="premium-button py-4 px-10 text-lg">🧮 Báo giá miễn phí</a>
              <button onClick={() => setLeadService("thang-may")}
                className="py-4 px-10 border border-blue-500/30 rounded-full text-lg text-blue-400 hover:bg-blue-500/5 transition-all">
                📞 Gọi tư vấn viên
              </button>
              <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
                className="py-4 px-10 border border-emerald-500/20 rounded-full text-lg text-emerald-400 hover:bg-emerald-500/5 transition-all">
                💬 Zalo ngay
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-600">
              <span>✅ Tư vấn hoàn toàn miễn phí</span>
              <span>✅ Khảo sát thực tế tại nhà</span>
              <span>✅ Báo giá trong 24 giờ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a href="https://zalo.me/0966556876" target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all"
          title="Zalo">
          💬
        </a>
        <a href="tel:+84966556876"
          className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all animate-float"
          title="Gọi điện">
          📞
        </a>
      </div>
    </>
  );
}
