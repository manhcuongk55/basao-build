"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    title: "Mua hàng & Đặt hàng",
    icon: "🛒",
    items: [
      { q: "Basao Build là gì?", a: "Basao Build là nền tảng B2B2C kết nối nhà sản xuất vật liệu xây dựng, nội thất, kim khí, điện nước trực tiếp đến chủ nhà và nhà thầu — bỏ qua trung gian, giá gốc nhà máy." },
      { q: "Làm sao để đặt hàng?", a: "Bước 1: Nhập thông số dự án (diện tích, số tầng, tiêu chuẩn) → AI tự bóc tách BoM 8 hạng mục. Bước 2: Chọn NCC VN hoặc TQ. Bước 3: Xác nhận & thanh toán qua Escrow. Bước 4: Nhận hàng tận công trình." },
      { q: "MOQ (đặt tối thiểu) là bao nhiêu?", a: "MOQ tùy theo NCC và sản phẩm. Gạch thường từ 50m², sơn từ 5 thùng, thép từ 10 cây. Xem MOQ cụ thể trên trang chi tiết sản phẩm hoặc hỏi AI Agent." },
      { q: "Có thể so sánh giá VN và TQ không?", a: "Có! Truy cập trang So sánh (/compare) để chọn tối đa 3 sản phẩm so sánh side-by-side: giá, thời gian giao, MOQ, xuất xứ." },
    ],
  },
  {
    title: "Thanh toán Escrow",
    icon: "🔒",
    items: [
      { q: "Basao Escrow hoạt động thế nào?", a: "Escrow là cơ chế giữ tiền trung gian: Buyer đặt cọc 30% → Basao giữ an toàn → NCC giao hàng → Buyer xác nhận nhận hàng → Basao giải ngân cho NCC. Bảo vệ cả hai bên." },
      { q: "Khi nào tiền được giải ngân?", a: "Tiền giải ngân khi Buyer xác nhận đã nhận hàng đúng chất lượng trên hệ thống. Nếu có tranh chấp, đội Basao sẽ trọng tài trong 48h." },
      { q: "Phương thức thanh toán được hỗ trợ?", a: "Chuyển khoản ngân hàng (VCB, BIDV, Techcombank, MBBank), ví điện tử (MoMo, ZaloPay), và thẻ tín dụng (Visa/Mastercard). Hàng TQ chấp nhận thanh toán CNY qua Basao." },
    ],
  },
  {
    title: "Logistics & Vận chuyển",
    icon: "🚚",
    items: [
      { q: "Hàng TQ giao mất bao lâu?", a: "Từ 10-18 ngày từ kho Foshan/Yongkang về TP.HCM qua đối tác Cainiao/J&T Express. Tracking real-time trên trang /track." },
      { q: "Hàng VN giao mất bao lâu?", a: "Hàng VN giao từ 1-3 ngày nội thành TP.HCM, 3-5 ngày các tỉnh. Đối tác logistics VN: GHTK, Viettel Post." },
      { q: "Phí vận chuyển tính thế nào?", a: "Phí ship tùy khối lượng, khoảng cách. Hàng TQ: ~15-25 CNY/CBM. Hàng VN: miễn phí cho đơn >10 triệu nội thành." },
    ],
  },
  {
    title: "Nhà cung cấp (NCC)",
    icon: "🏭",
    items: [
      { q: "Làm sao để đăng ký NCC?", a: "Truy cập /register/supplier → Nhập MST, thông tin công ty, danh mục SP, chứng nhận (ISO, test reports). Basao xác minh trong 24h." },
      { q: "NCC được xác minh thế nào?", a: "Basao kiểm tra: MST hợp lệ, giấy phép kinh doanh, chứng nhận chất lượng (ISO 9001, test reports), review từ buyer. NCC đạt sẽ có badge ✓." },
      { q: "Phí cho NCC là bao nhiêu?", a: "Đăng SP miễn phí. Basao thu hoa hồng 3-5% trên mỗi đơn thành công. Không phí ẩn." },
    ],
  },
  {
    title: "AI Agent",
    icon: "🤖",
    items: [
      { q: "AI Agent làm được gì?", a: "Chat bằng tiếng Việt → AI tự bóc tách BoM 8 hạng mục (sơn, gạch, xi măng, thép, nội thất, kim khí, điện nước, thiết bị). Tìm SP, so sánh giá VN/TQ, tư vấn logistics." },
      { q: "AI Agent có chính xác không?", a: "AI Agent được train trên dữ liệu thực từ hàng nghìn dự án xây dựng VN. Độ chính xác ước tính ~85-90%. Nên kiểm tra lại với nhà thầu trước khi đặt hàng." },
    ],
  },
];

export default function HelpPage() {
  const [openSection, setOpenSection] = useState<number>(0);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQ, setSearchQ] = useState("");

  const q = searchQ.toLowerCase();
  const filteredSections = FAQ_SECTIONS.map(section => ({
    ...section,
    items: section.items.filter(item => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)),
  })).filter(s => s.items.length > 0);

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-bold text-2xl mb-3">❓ Trung tâm hỗ trợ</h1>
        <p className="text-slate-400 text-sm">Câu hỏi thường gặp về Basao Build</p>
      </div>

      {/* Search */}
      <div className="glass-card p-4 mb-8">
        <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Tìm câu hỏi... (VD: escrow, MOQ, vận chuyển)"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
      </div>

      {/* FAQ sections */}
      <div className="space-y-4">
        {filteredSections.map((section, si) => (
          <div key={si} className="glass-card overflow-hidden">
            <button onClick={() => setOpenSection(openSection === si ? -1 : si)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-bold text-white">{section.title}</span>
                <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{section.items.length}</span>
              </div>
              <span className={`text-slate-500 transition-transform ${openSection === si ? "rotate-180" : ""}`}>▼</span>
            </button>
            {openSection === si && (
              <div className="px-5 pb-5 space-y-2">
                {section.items.map((item, ii) => {
                  const key = si * 100 + ii;
                  return (
                    <div key={ii} className="border border-white/5 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenItem(openItem === key ? null : key)}
                        className="w-full p-4 flex justify-between items-start text-left hover:bg-white/[0.02]"
                      >
                        <span className="text-sm text-white font-semibold pr-4">{item.q}</span>
                        <span className={`text-slate-500 text-xs flex-shrink-0 transition-transform ${openItem === key ? "rotate-180" : ""}`}>▼</span>
                      </button>
                      {openItem === key && (
                        <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="glass-card p-8 mt-8 text-center border-blue-500/10">
        <h2 className="font-bold text-lg mb-2">Không tìm thấy câu trả lời?</h2>
        <p className="text-sm text-slate-400 mb-6">Liên hệ đội ngũ Basao hoặc chat trực tiếp với AI Agent.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/agent" className="premium-button py-3 px-6 text-sm">🤖 Hỏi AI Agent</Link>
          <Link href="/messages" className="py-3 px-6 border border-white/10 rounded-full text-sm hover:bg-white/5">💬 Chat hỗ trợ</Link>
          <a href="mailto:support@basao.build" className="py-3 px-6 border border-white/10 rounded-full text-sm text-slate-400 hover:bg-white/5 hover:text-white">📧 Email</a>
        </div>
      </div>
    </div>
  );
}
