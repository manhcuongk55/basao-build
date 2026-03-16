import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_PRODUCTS, CATEGORIES, formatVnd } from "@/lib/data";

export default function Home() {
  const vnSuppliers = MOCK_SUPPLIERS.filter(s => s.country === "VN").length;
  const cnSuppliers = MOCK_SUPPLIERS.filter(s => s.country === "CN").length;

  // Pick 1 product from each new category + 2 construction for variety
  const featuredIds = ["p1", "p4", "p5", "p7", "p9", "p12", "p15", "p19", "p25", "p27", "p16", "p21"];
  const featured = featuredIds.map(id => MOCK_PRODUCTS.find(p => p.id === id)!).filter(Boolean).slice(0, 12);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center font-bold text-white text-sm">B</div>
          <span className="font-bold text-lg tracking-tight">BASAO <span className="text-blue-400">BUILD</span></span>
        </div>
        <div className="hidden md:flex gap-5 text-sm text-slate-400">
          <Link href="/suppliers" className="hover:text-white transition-colors">Nhà cung cấp</Link>
          <Link href="/quote" className="hover:text-white transition-colors">Báo giá</Link>
          <Link href="/agent" className="hover:text-white transition-colors text-emerald-400">🤖 AI Agent</Link>
          <Link href="/logistics" className="hover:text-white transition-colors text-red-400">🇨🇳 Logistics TQ</Link>
          <Link href="/payment" className="hover:text-white transition-colors">Thanh toán</Link>
          <Link href="/register" className="hover:text-white transition-colors">Đăng ký</Link>
          <Link href="/supplier/dashboard" className="hover:text-white transition-colors text-amber-400">Cổng NCC</Link>
        </div>
        <Link href="/quote" className="premium-button py-2 text-sm">Báo giá ngay →</Link>
      </nav>

      <div className="pt-20">
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

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/quote" className="premium-button text-lg px-10 py-4">
                <span>🧮</span> AI Báo Giá Ngay
              </Link>
              <Link href="/suppliers" className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-lg backdrop-blur-sm text-center">
                Xem nhà cung cấp
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { v: vnSuppliers + "+", l: "Nhà cung cấp VN" },
                { v: cnSuppliers + "+", l: "Kho TQ trực tiếp" },
                { v: MOCK_PRODUCTS.length + "+", l: "Sản phẩm" },
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
              <Link key={c.key} href="/suppliers" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-sm text-slate-300">
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
              { step: "02", icon: "🤖", title: "AI báo giá", desc: "Tự động chọn vật liệu, nội thất, kim khí, điện nước tối ưu." },
              { step: "03", icon: "✅", title: "Xác nhận & đặt", desc: "Đặt hàng thẳng từ nhà máy VN hoặc kho TQ." },
              { step: "04", icon: "🚚", title: "Giao tận công trình", desc: "Logistics theo dõi real-time, xác nhận khi nhận." },
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

        {/* Featured products - expanded */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
            <Link href="/suppliers" className="text-sm text-blue-400 hover:underline">Xem tất cả {MOCK_PRODUCTS.length}+ sản phẩm →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(p => (
              <div key={p.id} className="glass-card p-5 hover:translate-y-[-4px] transition-all flex flex-col gap-3">
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
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-white/5 py-10 text-center text-slate-600 text-xs italic">
        &ldquo;Bát Nhã soi tâm – Trí tuệ dẫn đường.&rdquo; · Basao Build 2026
      </footer>
    </main>
  );
}
