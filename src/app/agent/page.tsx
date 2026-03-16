"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, formatVnd, generateQuote, type ProjectInputs } from "@/lib/data";

interface Message {
  id: number;
  role: "user" | "agent";
  text: string;
  timestamp: string;
  bom?: { name: string; qty: number; unit: string; price: number; origin: string; lead: number }[];
  totalVnd?: number;
}

const SUGGESTIONS = [
  "Tôi muốn xây nhà phố 3 tầng, 80m², tiêu chuẩn trung cấp",
  "Báo giá vật liệu cho biệt thự 2 tầng 120m²",
  "Tìm gạch Foshan 60×60 giá tốt nhất",
  "So sánh gạch VN và gạch TQ",
  "Tôi cần nội thất cho căn hộ 70m²",
];

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function agentRespond(userText: string): Message {
  const lower = userText.toLowerCase();

  // Parse project request
  if (lower.includes("nhà phố") || lower.includes("biệt thự") || lower.includes("nhà cấp") || lower.includes("căn hộ") || lower.includes("xây") || lower.includes("báo giá")) {
    let type: ProjectInputs["type"] = "Nhà phố";
    if (lower.includes("biệt thự")) type = "Biệt thự";
    if (lower.includes("nhà cấp 4") || lower.includes("cap 4")) type = "Nhà cấp 4";
    if (lower.includes("căn hộ")) type = "Căn hộ";

    const areaMatch = lower.match(/(\d+)\s*m/);
    const area = areaMatch ? parseInt(areaMatch[1]) : 80;
    const floorMatch = lower.match(/(\d+)\s*tầng/);
    const floors = floorMatch ? parseInt(floorMatch[1]) : type === "Nhà cấp 4" ? 1 : 3;

    let standard: ProjectInputs["standard"] = "Trung cấp";
    if (lower.includes("cao cấp") || lower.includes("premium")) standard = "Cao cấp";
    if (lower.includes("cơ bản") || lower.includes("tiết kiệm")) standard = "Cơ bản";

    const inputs: ProjectInputs = { type, area, floors, standard };
    const quote = generateQuote(inputs);
    const total = quote.reduce((s, i) => s + i.totalVnd, 0);

    return {
      id: Date.now(),
      role: "agent",
      text: `📋 **Basao AI đã bóc tách BoM cho dự án:**\n\n🏠 ${type} · ${floors} tầng · ${area}m²/tầng · ${standard}\n📐 Tổng diện tích sàn: ${area * floors}m²\n\nDưới đây là danh mục vật tư & thiết bị tối ưu từ ${MOCK_SUPPLIERS.length} nhà cung cấp VN + TQ:`,
      timestamp: getTime(),
      bom: quote.map(q => ({
        name: q.product.name,
        qty: q.quantity,
        unit: q.product.unit,
        price: q.totalVnd,
        origin: q.product.origin,
        lead: q.product.leadDays,
      })),
      totalVnd: total,
    };
  }

  // Search for product
  if (lower.includes("tìm") || lower.includes("gạch") || lower.includes("sơn") || lower.includes("thép") || lower.includes("nội thất") || lower.includes("điện") || lower.includes("kim khí")) {
    const matches = MOCK_PRODUCTS.filter(p => 
      lower.includes(p.category.toLowerCase()) || 
      lower.includes(p.name.toLowerCase().split(" ")[0])
    ).slice(0, 4);

    if (matches.length > 0) {
      const list = matches.map(p => `• **${p.name}** — ${formatVnd(p.priceVnd)}/${p.unit} (${p.origin === "CN" ? "🇨🇳 TQ" : "🇻🇳 VN"}) — ${p.supplierName}`).join("\n");
      return {
        id: Date.now(), role: "agent", timestamp: getTime(),
        text: `🔍 Tìm thấy ${matches.length} sản phẩm phù hợp:\n\n${list}\n\n💡 Muốn tôi thêm vào báo giá? Hoặc mô tả dự án để tôi bóc tách BoM đầy đủ.`,
      };
    }
  }

  // Compare
  if (lower.includes("so sánh")) {
    return {
      id: Date.now(), role: "agent", timestamp: getTime(),
      text: `📊 **So sánh hàng VN vs TQ:**\n\n| | 🇻🇳 VN | 🇨🇳 TQ |\n|---|---|---|\n| Gạch 60×60 | 260,000đ/m² | **180,000đ/m²** |\n| Giao hàng | 5 ngày | 12–15 ngày |\n| Bảo hành | Có | Qua Basao |\n| MOQ | 50m² | 100m² |\n\n💡 Hàng TQ rẻ hơn ~30% nhưng cần chờ 12+ ngày. Basao Escrow bảo vệ tiền cọc đến khi nhận hàng.`,
    };
  }

  // Default
  return {
    id: Date.now(), role: "agent", timestamp: getTime(),
    text: `Tôi là **Basao AI Agent** — trợ lý mua hàng xây dựng. Tôi có thể:\n\n🧮 **Bóc tách BoM** — Mô tả dự án, tôi sinh báo giá đầy đủ 8 hạng mục\n🔍 **Tìm sản phẩm** — Từ ${MOCK_PRODUCTS.length} SP của ${MOCK_SUPPLIERS.length} NCC VN + TQ\n📊 **So sánh giá** — VN vs TQ, NCC A vs NCC B\n🚚 **Tư vấn logistics** — Chọn đối tác vận chuyển TQ tối ưu\n\nVí dụ: *"Tôi muốn xây nhà phố 3 tầng, 80m², tiêu chuẩn trung cấp"*`,
  };
}

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0, role: "agent", timestamp: getTime(),
      text: `Xin chào! 👋 Tôi là **Basao AI Agent** — trợ lý mua hàng xây dựng thông minh.\n\nHãy mô tả dự án của bạn, tôi sẽ tự động bóc tách vật liệu, tìm nhà cung cấp tốt nhất, và tạo báo giá.`,
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: msg, timestamp: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = agentRespond(msg);
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-slate-400 hover:text-white text-sm">← Trang chủ</Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">🤖</div>
          <div>
            <div className="font-bold text-white text-sm">Basao AI Agent</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online · Trợ lý mua hàng
            </div>
          </div>
        </div>
        <Link href="/quote" className="text-sm text-slate-400 hover:text-white">Báo giá thủ công →</Link>
      </nav>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto pt-20 pb-40 px-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${msg.role === "user" ? "bg-blue-600 rounded-2xl rounded-br-md px-4 py-3" : "glass-card p-4"}`}>
                <div className="text-sm text-white whitespace-pre-line leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
                {msg.bom && (
                  <div className="mt-4 border-t border-white/10 pt-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-slate-500 text-left border-b border-white/5">
                            <th className="pb-2 font-normal">Hạng mục</th>
                            <th className="pb-2 font-normal text-right">Nguồn</th>
                            <th className="pb-2 font-normal text-right">SL</th>
                            <th className="pb-2 font-normal text-right">Thành tiền</th>
                            <th className="pb-2 font-normal text-right">Giao</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                          {msg.bom.map((item, i) => (
                            <tr key={i}>
                              <td className="py-1.5 text-white font-medium">{item.name}</td>
                              <td className="py-1.5 text-right">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${item.origin === "CN" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                                  {item.origin === "CN" ? "TQ" : "VN"}
                                </span>
                              </td>
                              <td className="py-1.5 text-right text-slate-300 font-mono">{item.qty} {item.unit}</td>
                              <td className="py-1.5 text-right font-bold text-white">{formatVnd(item.price)}</td>
                              <td className="py-1.5 text-right text-emerald-400">{item.lead}d</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {msg.totalVnd && (
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
                        <span className="text-slate-400 text-xs">Tổng ước tính</span>
                        <span className="text-lg font-bold text-blue-400">{formatVnd(msg.totalVnd)}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Link href="/order" className="premium-button py-1.5 px-4 text-xs">Đặt hàng →</Link>
                      <Link href="/payment" className="py-1.5 px-4 border border-white/10 rounded-full text-xs hover:bg-white/5">Thanh toán Escrow</Link>
                    </div>
                  </div>
                )}
                <div className="text-[10px] text-slate-500 mt-2 text-right">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-card px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="fixed bottom-[88px] left-0 right-0 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => handleSend(s)} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-300 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 nav-blur border-t border-white/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Mô tả dự án hoặc hỏi về vật liệu..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-blue-500 outline-none transition-all text-sm"
          />
          <button onClick={() => handleSend()} className="premium-button px-6 py-3 text-sm" disabled={isTyping}>
            Gửi →
          </button>
        </div>
      </div>
    </main>
  );
}
