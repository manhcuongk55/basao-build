import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_PRODUCTS, CATEGORIES, formatVnd } from "@/lib/data";

export default function Home() {
  const vnSuppliers = MOCK_SUPPLIERS.filter(s => s.country === "VN").length;
  const cnSuppliers = MOCK_SUPPLIERS.filter(s => s.country === "CN").length;

  const featuredIds = ["p1", "p4", "p5", "p7", "p9", "p12", "p15", "p19", "p25", "p27", "p16", "p21"];
  const featured = featuredIds.map(id => MOCK_PRODUCTS.find(p => p.id === id)!).filter(Boolean).slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 py-24 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Vật liệu · Nội thất · Kim khí · Điện nước · Thiết bị
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Đặt mọi thứ xây &amp; trang trí nhà<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">thẳng từ nhà máy đến công trình</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vật liệu xây dựng · Nội thất · Kim khí · Điện nước · Thiết bị trong nhà — tất cả từ nhà máy VN &amp; kho TQ, giao tận công trình. Không qua trung gian.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/quote" className="premium-button text-lg px-10 py-4">
              <span>🧮</span> AI Báo Giá Ngay
            </Link>
            <Link href="/agent" className="px-10 py-4 rounded-full border border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-lg text-emerald-400 text-center">
              🤖 Chat AI Agent
            </Link>
            <Link href="/suppliers" className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-lg backdrop-blur-sm text-center">
              Xem sản phẩm
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {[
              { v: vnSuppliers + "+", l: "NCC Việt Nam" },
              { v: cnSuppliers + "+", l: "Kho TQ trực tiếp" },
              { v: MOCK_PRODUCTS.length + "+", l: "Sản phẩm" },
              { v: "8", l: "Danh mục" },
              { v: "0 đ", l: "Phí trung gian" },
            ].map((s, i) => (
              <div key={i} className="glass-card py-4 px-2 text-center">
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-[10px] text-slate-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-6 max-w-5xl mx-auto mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.filter(c => c.key !== "all").map(c => (
            <Link key={c.key} href="/search" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-sm text-slate-300">
              <span>{c.icon}</span> {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-center text-slate-300">Cách hoạt động</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: "01", icon: "📐", title: "Nhập thông số", desc: "Loại nhà, DT, số tầng, tiêu chuẩn hoàn thiện." },
            { step: "02", icon: "🤖", title: "AI bóc tách BoM", desc: "Tự động chọn vật liệu, nội thất, kim khí, điện nước tối ưu từ 8 hạng mục." },
            { step: "03", icon: "✅", title: "Xác nhận & Escrow", desc: "Đặt hàng NCC, cọc 30% giữ an toàn qua Basao Escrow." },
            { step: "04", icon: "🚚", title: "Giao tận công trình", desc: "Logistics VN/TQ real-time, giải ngân khi xác nhận nhận hàng." },
          ].map(s => (
            <div key={s.step} className="glass-card p-6 hover:border-blue-500/20 transition-all">
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="text-[10px] text-blue-400 font-mono mb-2">BƯỚC {s.step}</div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
          <Link href="/search" className="text-sm text-blue-400 hover:underline">Xem tất cả {MOCK_PRODUCTS.length}+ sản phẩm →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="glass-card p-5 hover:translate-y-[-4px] transition-all flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-500 uppercase tracking-widest">{p.category}</span>
                <div className="flex gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.origin === "CN" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                    {p.origin === "CN" ? "🇨🇳 Nhập TQ" : "🇻🇳 Sản xuất VN"}
                  </span>
                  {p.tag && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p.tag}</span>}
                </div>
              </div>
              <h3 className="font-bold text-white">{p.name}</h3>
              <div className="font-bold text-blue-400">{formatVnd(p.priceVnd)}<span className="text-xs text-slate-500 font-normal ml-1">/ {p.unit}</span></div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>{p.supplierName}</span>
                <span>⚡ {p.leadDays} ngày</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-center">Khách hàng nói gì</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Nguyễn Văn Minh", role: "Chủ nhà · Q.7", quote: "Gạch Foshan rẻ hơn đại lý 30%, giao đúng hẹn 12 ngày. Escrow giữ tiền an toàn, yên tâm mua hàng TQ.", rating: 5, saved: "13.2M" },
            { name: "Trần Thị Lan", role: "Nhà thầu · Thảo Điền", quote: "AI báo giá bóc tách đầy đủ 8 hạng mục trong 2 giây. Tiết kiệm 2 ngày so với tính tay. Agent chat rất tiện.", rating: 5, saved: "42M" },
            { name: "Phạm Hoàng Dũng", role: "Kiến trúc sư · Q.1", quote: "Khách hàng rất hài lòng khi biết giá mua trực tiếp từ nhà máy. So sánh VN/TQ trực quan. Platform chuyên nghiệp.", rating: 4, saved: "28M" },
          ].map((t, i) => (
            <div key={i} className="glass-card p-6">
              <div className="text-amber-400 mb-3">{"★".repeat(t.rating)}</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[10px] text-slate-500">{t.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-sm">-{t.saved}</div>
                  <div className="text-[10px] text-slate-500">Tiết kiệm</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 border-blue-500/10">
          <h2 className="text-3xl font-bold mb-4">Bắt đầu dự án của bạn</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Đặt vật liệu giá gốc, AI bóc tách BoM tự động, Escrow bảo vệ thanh toán, logistics xuyên biên giới.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="premium-button py-4 px-10 text-lg">🧮 Báo giá miễn phí</Link>
            <Link href="/register" className="py-4 px-10 border border-white/10 rounded-full text-lg hover:bg-white/5">Tạo tài khoản</Link>
            <Link href="/register/supplier" className="py-4 px-10 border border-amber-500/20 rounded-full text-lg text-amber-400 hover:bg-amber-500/5">🏭 Đăng ký NCC</Link>
          </div>
        </div>
      </section>
    </>
  );
}
