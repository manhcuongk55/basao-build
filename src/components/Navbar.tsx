"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/agency", label: "🏢 Agency", highlight: "text-violet-400" },
  { href: "/htc-elevator", label: "🛗 HTC Elevator", highlight: "text-blue-400" },
  { href: "/thi-cong", label: "🏗️ Thi Công", highlight: "text-amber-400" },
  { href: "/search", label: "🔍 Tìm kiếm" },
  { href: "/suppliers", label: "Nhà cung cấp" },
  { href: "/quote", label: "Báo giá" },
  { href: "/agent", label: "🤖 AI Agent", highlight: "text-emerald-400" },
  { href: "/compare", label: "So sánh" },
  { href: "/projects", label: "Dự án" },
  { href: "/logistics", label: "🇨🇳 Logistics TQ", highlight: "text-red-400" },
  { href: "/payment", label: "Thanh toán" },
  { href: "/messages", label: "💬 Tin nhắn" },
  { href: "/admin", label: "Admin", highlight: "text-amber-400" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on agent page (has its own header)
  if (pathname === "/agent") return null;

  return (
    <>
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 h-14 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center font-bold text-white text-xs">B</div>
          <span className="font-bold text-sm tracking-tight">BASAO <span className="text-blue-400">BUILD</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-4 text-sm text-slate-400">
          {NAV_LINKS.slice(0, 8).map(link => (
            <Link key={link.href} href={link.href}
              className={`hover:text-white transition-colors ${link.highlight || ""} ${pathname === link.href ? "text-white font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/favorites" className="hidden md:block text-slate-400 hover:text-red-400 transition-colors" title="Yêu thích">❤️</Link>
          <Link href="/notifications" className="relative text-slate-400 hover:text-white" title="Thông báo">
            <span className="text-sm">🔔</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </Link>
          <Link href="/messages" className="relative md:hidden">
            <span className="text-lg">💬</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          </Link>
          <Link href="/quote" className="hidden md:block premium-button py-1.5 px-4 text-xs">Báo giá →</Link>
          <Link href="/register" className="hidden md:block text-xs text-slate-400 hover:text-white border border-white/10 rounded-full py-1.5 px-4">Đăng ký</Link>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1 p-1">
            <span className={`w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-[3px]" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 pt-14 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative bg-slate-900/95 border-b border-white/5 max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-sm transition-all ${
                    pathname === link.href ? "bg-blue-600/10 text-white font-semibold" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  } ${link.highlight || ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                <Link href="/notifications" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-slate-400 hover:bg-white/5">🔔 Thông báo</Link>
                <Link href="/favorites" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-red-400 hover:bg-red-500/5">❤️ Yêu thích</Link>
                <Link href="/help" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-slate-400 hover:bg-white/5">❓ Trợ giúp</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-slate-400 hover:bg-white/5">👤 Đăng ký / Đăng nhập</Link>
                <Link href="/register/supplier" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-amber-400 hover:bg-amber-500/5">🏭 Đăng ký NCC</Link>
                <Link href="/supplier/dashboard" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl text-sm text-slate-400 hover:bg-white/5">📊 Cổng NCC</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
