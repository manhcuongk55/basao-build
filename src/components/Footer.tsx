import Link from "next/link";

const FOOTER_LINKS = {
  "Marketplace": [
    { href: "/search", label: "Tìm kiếm SP" },
    { href: "/suppliers", label: "Nhà cung cấp" },
    { href: "/compare", label: "So sánh SP" },
    { href: "/quote", label: "Báo giá AI" },
    { href: "/agent", label: "AI Agent" },
  ],
  "Giao dịch": [
    { href: "/order", label: "Đặt hàng" },
    { href: "/payment", label: "Thanh toán Escrow" },
    { href: "/logistics", label: "Logistics TQ" },
    { href: "/track", label: "Theo dõi đơn" },
    { href: "/projects", label: "Dự án của tôi" },
  ],
  "Nhà cung cấp": [
    { href: "/register/supplier", label: "Đăng ký NCC" },
    { href: "/supplier/dashboard", label: "Cổng NCC" },
    { href: "/supplier/products", label: "Quản lý SP" },
    { href: "/supplier/orders", label: "Quản lý đơn" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center font-bold text-white text-sm">B</div>
              <span className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">BUILD</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Nền tảng kết nối nhà sản xuất vật liệu, nội thất, kim khí, điện nước trực tiếp đến chủ nhà & nhà thầu.
            </p>
            <div className="flex gap-3 text-slate-500">
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full">🇻🇳 VN</span>
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full">🇨🇳 TQ</span>
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full">Escrow 🔒</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-600">© 2026 Basao Build · Basao Truth Infrastructure</div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="cursor-pointer hover:text-white">Điều khoản</span>
            <span className="cursor-pointer hover:text-white">Chính sách</span>
            <span className="cursor-pointer hover:text-white">Liên hệ</span>
          </div>
          <div className="text-[10px] text-slate-600 italic">&ldquo;Bát Nhã soi tâm — Trí tuệ dẫn đường.&rdquo;</div>
        </div>
      </div>
    </footer>
  );
}
